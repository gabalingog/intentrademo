"""
build_catalog.py

Converts the Mammut catalog Excel workbook into products.json. Run this
yourself, in your own terminal/VS Code, any time the spreadsheet changes —
including when you add a brand-new sheet (e.g. "SHOES - all gender").
This file does not call out to any AI; it's a plain Python script.

Usage:
    pip install pandas openpyxl --break-system-packages
    python3 build_catalog.py path/to/mammut_catalog.xlsx path/to/products.json

How it adapts to new sheets automatically:
  - Every sheet shares a fixed set of "known" columns (product_name,
    category, subcategory, gender, price_usd, fit, focus_type,
    suitable_for, product_url, image_url, short_description, rating).
  - ANY other column in a sheet (Hiking, Skiing, windproof, etc.) is
    treated as a numeric activity-tag/trait rating and copied through
    automatically — so adding a SHOES tab with its own rating columns
    (e.g. "Grip", "Ankle Support") just works, no code changes needed.
  - If a sheet's `subcategory` column is blank for a row, it falls back
    to a cleaned-up version of the SHEET NAME itself (e.g. sheet
    "SHOES - all gender" -> subcategory "Shoes"), instead of relying on
    a hardcoded keyword list that has to be kept in sync by hand.

What this script does NOT do:
  - It doesn't change recommend.js. If you add a genuinely new product
    type (shoes, equipment, etc.), recommend.js's Focus-step filters
    (CLOTHES_SUBCATEGORY / OTHER_SUBCATEGORY) still need a matching
    entry pointing at the new subcategory string, or those products
    will sit in products.json but never get recommended. See the
    bottom of recommend.js for where that mapping lives.
"""
import sys
import re
import pandas as pd
import json

# Columns with fixed, known meanings — everything else in a sheet is
# treated as a numeric activity-tag/trait column.
KNOWN_COLS = {
    'product_name', 'category', 'subcategory', 'gender', 'price_usd',
    'jacket_code', 'focus_type', 'fit', 'suitable_for',
    'product_url', 'image_url', 'short_description', 'rating',
}


def clean_sheet_name_as_subcategory(sheet_name: str) -> str:
    """
    'SHOES - all gender' -> 'Shoes'
    'JACKETS & VESTS - clothing all ' -> 'Jackets & Vests'
    Strips anything after the first ' - ' or ' – ' separator, then
    title-cases words that aren't already mixed-case (so 'JACKETS &
    VESTS' becomes 'Jackets & Vests' but 'McKinley' would be left alone).
    """
    name = re.split(r'\s[-\u2013]\s', sheet_name)[0].strip()
    words = name.split(' ')
    cleaned = []
    for w in words:
        if w.isupper() or w.islower():
            cleaned.append(w.capitalize() if w.lower() != '&' else '&')
        else:
            cleaned.append(w)
    return ' '.join(cleaned)


def infer_accessory_type(name: str):
    n = name.lower()
    if 'sock' in n: return 'Socks'
    if 'glove' in n or 'mitten' in n: return 'Gloves'
    if 'hat' in n or 'cap' in n: return 'Headwear'
    if 'belt' in n: return 'Belt'
    return 'Accessory'


def detect_multi_subcat_sheets(xlsx_path, threshold=2):
    """
    A sheet's `subcategory` column is trusted (cell value used as-is) only
    if it contains at least `threshold` distinct non-null values that each
    appear on more than one row — e.g. Pants & Shorts has "Pants" used 15
    times and "Shorts" used 6 times, a real split worth preserving.
    A sheet where only 1-2 rows happen to have a stray value (everything
    else blank) does NOT qualify — those are typos/data-entry slips, and
    the sheet name is used for every row instead.
    """
    xl = pd.ExcelFile(xlsx_path)
    multi = set()
    for sheet in xl.sheet_names:
        df = xl.parse(sheet, usecols=lambda c: c == 'subcategory')
        if 'subcategory' not in df.columns:
            continue
        counts = df['subcategory'].dropna().value_counts()
        real_values = counts[counts > 1]  # appears more than once = real category, not a typo
        if len(real_values) >= threshold:
            multi.add(sheet)
    return multi


def build_records(xlsx_path):
    xl = pd.ExcelFile(xlsx_path)
    multi_subcat_sheets = detect_multi_subcat_sheets(xlsx_path)

    # First pass: collect every tag/trait column across ALL sheets, so every
    # product ends up with the same schema (missing columns become None)
    # rather than each sheet only having the keys it happens to define.
    all_tag_cols = []
    seen = set()
    for sheet in xl.sheet_names:
        df = xl.parse(sheet, nrows=0)  # headers only, fast
        for c in df.columns:
            if c not in KNOWN_COLS and c not in seen:
                seen.add(c)
                all_tag_cols.append(c)

    records = []
    for sheet in xl.sheet_names:
        df = xl.parse(sheet)
        sheet_default_subcat = clean_sheet_name_as_subcategory(sheet)

        for _, row in df.iterrows():
            if pd.isna(row.get('product_name')):
                continue

            # The sheet name is the source of truth for subcategory, not
            # the cell value. Some rows have stray text typed into their
            # `subcategory` cell (e.g. "Hiking" or "Mountaineering" instead
            # of "Shoes" — an activity name got typed in by mistake), which
            # would otherwise silently create bogus one-off subcategories.
            # If a sheet's `subcategory` column is reliably hand-curated
            # with real product-type values (true for Pants & Shorts, which
            # splits into "Pants" vs "Shorts" within one sheet), use the
            # cell value instead — detected by the sheet containing more
            # than one distinct non-null subcategory value.
            cell_subcat = row.get('subcategory')
            if sheet in multi_subcat_sheets and not pd.isna(cell_subcat):
                subcat = cell_subcat
            else:
                subcat = sheet_default_subcat
                if not pd.isna(cell_subcat) and cell_subcat != sheet_default_subcat:
                    print(f"  note: '{row['product_name']}' had subcategory "
                          f"'{cell_subcat}' in the sheet, using '{sheet_default_subcat}' instead "
                          f"(looks like a stray value, not a real split)")

            gender = row.get('gender') if 'gender' in row and not pd.isna(row.get('gender')) else None

            rec = {
                'product_name': row['product_name'],
                'category': row.get('category') if not pd.isna(row.get('category')) else 'Clothing',
                'subcategory': subcat,
                'accessory_type': infer_accessory_type(row['product_name']) if subcat == 'Accessories' else None,
                'gender': gender,
                'price_usd': float(row['price_usd']) if not pd.isna(row.get('price_usd')) else None,
                'fit': row.get('fit') if not pd.isna(row.get('fit')) else None,
                'focus_type': row.get('focus_type') if 'focus_type' in row and not pd.isna(row.get('focus_type')) else None,
                'suitable_for': [s.strip() for s in str(row.get('suitable_for')).split(',')] if not pd.isna(row.get('suitable_for')) else [],
                'product_url': row.get('product_url') if not pd.isna(row.get('product_url')) else None,
                'image_url': row.get('image_url') if not pd.isna(row.get('image_url')) else None,
                'short_description': row.get('short_description') if not pd.isna(row.get('short_description')) else None,
                'rating': float(row['rating']) if 'rating' in row and not pd.isna(row.get('rating')) else None,
            }

            # Every product gets every tag/trait key seen anywhere in the
            # workbook (None if this sheet doesn't have that column), so
            # the schema is identical across all 75+ products.
            for t in all_tag_cols:
                if t not in df.columns:
                    rec[t] = None
                    continue
                v = row.get(t)
                if v is None or pd.isna(v):
                    rec[t] = None
                else:
                    try:
                        rec[t] = float(v)
                    except (TypeError, ValueError):
                        rec[t] = None

            records.append(rec)

    return records


def dedup(records):
    """Some catalog exports contain exact-duplicate rows (same product_url).
    Keep whichever copy has more non-empty fields filled in."""
    def completeness(r):
        return sum(1 for v in r.values() if v not in (None, [], ''))

    best_by_key = {}
    for r in records:
        key = r['product_url'] or r['product_name']
        if key not in best_by_key or completeness(r) > completeness(best_by_key[key]):
            best_by_key[key] = r
    return list(best_by_key.values())


def main(xlsx_path, out_path):
    records = build_records(xlsx_path)
    print(f'parsed {len(records)} product rows from {xlsx_path}')

    records = dedup(records)
    print(f'{len(records)} unique products after dedup')

    by_subcat = {}
    for r in records:
        by_subcat[r['subcategory']] = by_subcat.get(r['subcategory'], 0) + 1
    print('products by subcategory:', by_subcat)

    missing_img = sum(1 for r in records if not r['image_url'])
    missing_rating = sum(1 for r in records if r['rating'] is None)
    print(f'missing image_url: {missing_img}/{len(records)}')
    print(f'missing rating: {missing_rating}/{len(records)}')

    with open(out_path, 'w') as f:
        json.dump(records, f, indent=2)
    print(f'wrote {out_path}')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: python3 build_catalog.py path/to/catalog.xlsx path/to/products.json')
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])