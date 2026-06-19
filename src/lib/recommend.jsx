// src/lib/recommend.js
import products from '../data/products.json'

// ─────────────────────────────────────────────────────────────────────────
// 1. ACTIVITY TAG MAPPING
// Maps questionnaire step keys + selected option labels to catalog activity
// tags (the columns in the Excel sheets: Hiking, Mountaineering, Climbing...).
// These are matched against `answers`, which is { [stepKey]: optionLabel }.
//
// NOTE: rules are intentionally specific-before-general. A product's tag
// score accumulates +1 per matching rule, so a more specific rule (e.g.
// "Ski Mountaineering") layered on top of a general one ("Skiing") naturally
// gives ski-mountaineering products a boost over plain resort skis, without
// needing an explicit priority system.
// ─────────────────────────────────────────────────────────────────────────
const TAG_RULES = [
  // Winter sports — skiing
  { match: { skiing_type: 'Resort' }, tags: ['Skiing'] },
  { match: { skiing_type: 'Freeride' }, tags: ['Freeriding', 'Skiing'] },
  { match: { skiing_type: 'Ski Mountaineering' }, tags: ['Ski Touring', 'Speed Mountaineering', 'Mountaineering'] },
  { match: { skiing_type: 'Cross-Country' }, tags: ['Skiing', 'Trailrunning'] },

  // Snowboarding — catalog has no snowboard-specific tag; closest proxy is Freeriding
  { match: { wintersport_type: 'Snowboarding' }, tags: ['Freeriding'] },

  // Snowshoeing — proxy via Hiking/Trekking since catalog has no snowshoe tag
  { match: { wintersport_type: 'Snowshoeing' }, tags: ['Hiking', 'Trekking'] },

  // Ice climbing
  { match: { wintersport_type: 'Ice Climbing' }, tags: ['Ice & Mixed Climbing', 'Alpine Climbing'] },

  // Mountains/Outdoors
  { match: { mountains_type: 'Trekking' }, tags: ['Trekking', 'Hiking'] },
  { match: { mountains_type: 'Mountaineering' }, tags: ['Mountaineering', 'Expedition'] },
  { match: { mountains_type: 'Climbing' }, tags: ['Climbing', 'Alpine Climbing'] },
  { match: { mountains_type: 'Bouldering' }, tags: ['Climbing'] },
  { match: { mountains_type: 'Camping' }, tags: ['Hiking', 'Everyday'] },
  // Indoor climbing/bouldering doesn't need technical outdoor gear — de-prioritize
  // alpine tags by matching only on the general activity, not the terrain branch.
  { match: { climbing_where: 'Indoor' }, tags: ['Climbing'] },
  { match: { bouldering_where: 'Indoor' }, tags: ['Climbing'] },

  // Running
  { match: { running_type: 'Running' }, tags: ['Trailrunning', 'Everyday'] },
  { match: { running_type: 'Trail Running' }, tags: ['Trailrunning', 'Hiking'] },
  { match: { running_type: 'Triathlon' }, tags: ['Trailrunning', 'Everyday'] },

  // Biking — catalog is apparel-only with no bike-specific tags. Use 'Everyday'
  // as a broad-coverage fallback so bikers at least see general performance wear.
  { match: { start: 'Biking' }, tags: ['Everyday'] },

  // Other
  { match: { other_type: 'Yoga & Pilates' }, tags: ['Everyday'] },
  { match: { other_type: 'Fitness/Gym' }, tags: ['Everyday'] },
  { match: { other_type: 'Soccer' }, tags: ['Everyday'] },
  { match: { other_type: 'Basketball' }, tags: ['Everyday'] },
  { match: { other_type: 'Swimmer' }, tags: ['Everyday'] },
  { match: { other_type: 'Sportswear/Leisure' }, tags: ['Everyday'] },
]

// ─────────────────────────────────────────────────────────────────────────
// 2. NEED BOOSTS
// Secondary "performance trait" boosts driven by terrain/surface/temperature
// answers. Values here are the EXACT option labels used in questionnaire.jsx
// (cross-checked against the live FLOW object — several boosts in the old
// version referenced labels like 'Wet or muddy trails' / 'Dry trails' that
// don't exist anywhere in the questionnaire and therefore never fired).
// ─────────────────────────────────────────────────────────────────────────
const NEED_BOOSTS = [
  { values: ['Soft snow/powder', 'Powder', 'Deep'], keywords: ['warmth', 'packability'] },
  { values: ['Firm/Icy', 'Icy', 'Icy sections'], keywords: ['durability', 'water_impermeability'] },
  { values: ['Wet or muddy', 'Wet pavement'], keywords: ['waterproof', 'water_impermeability'] },
  { values: ['Cold', 'Very Cold', 'Extreme cold'], keywords: ['warmth', 'windproof'] },
  { values: ['Mostly warm'], keywords: ['breathability', 'lightweight'] },
  { values: ['Variable', 'Mixed conditions', 'Mixed Terrain', 'Mixed', 'Large day-night swings'], keywords: ['stretch', 'breathability'] },
  { values: ['Backcountry', 'High Alpine', 'Technical alpine', 'Mixed Alpine'], keywords: ['durability', 'warmth'] },
  { values: ['Long (15 km+)', 'Long-distance endurance'], keywords: ['breathability', 'lightweight'] },
  { values: ['Multi-Day'], keywords: ['durability', 'packability'] },
]

// ─────────────────────────────────────────────────────────────────────────
// 3. FOCUS STEP → SUBCATEGORY FILTER
// The catalog's `subcategory` field (after cleanup — see data notes at the
// bottom) is one of: 'Jackets & Vests', 'Tops', 'Pants', 'Shorts', 'Accessories'.
// `accessory_type` further splits Accessories into Socks / Gloves / Headwear /
// Belt / Accessory, derived from product names, so "Socks" can be targeted
// specifically without pulling in hats and gloves too.
// ─────────────────────────────────────────────────────────────────────────
const CLOTHES_SUBCATEGORY = {
  Tops: ['Tops'],
  Bottoms: ['Pants', 'Shorts'],
  'Base layers': ['Tops'],
  'Outer layers': ['Jackets & Vests'],
  Insulation: ['Jackets & Vests', 'Tops'],
  Socks: ['Accessories'], // narrowed further via accessory_type below
}
const OTHER_SUBCATEGORY = {
  Footwear: ['Shoes'], // added once the SHOES - all gender sheet existed in the catalog
  'Core Gear': ['Jackets & Vests', 'Pants', 'Tops'],
  Safety: ['Accessories'],
  'Add-Ons': ['Accessories'],
}
// accessory_type narrowing per focus item, applied only when subcategory is Accessories
const ACCESSORY_TYPE_FILTER = {
  Socks: ['Socks'],
  Safety: ['Gloves', 'Belt'], // closest proxies to "safety" in this catalog
  'Add-Ons': ['Headwear', 'Gloves', 'Belt', 'Accessory'],
}

const PDF_PER_ACTIVITY_FOCUS_OPTIONS = {
  // Documents the actual focus menu offered per activity per the PDF flow
  // chart (some activities omit Safety or Add-Ons). Not enforced in scoring,
  // kept here so the questionnaire UI and recommender stay traceable to spec.
}

function buildTagProfile(answers) {
  const tagScores = {}
  const needKeywords = new Set()

  for (const [stepKey, answerLabel] of Object.entries(answers)) {
    if (stepKey === 'focus') continue
    for (const rule of TAG_RULES) {
      const matches = Object.entries(rule.match).every(
        ([k, v]) => answers[k] === v
      )
      if (matches) {
        rule.tags.forEach(tag => { tagScores[tag] = (tagScores[tag] || 0) + 1 })
      }
    }
    for (const boost of NEED_BOOSTS) {
      if (boost.values.includes(answerLabel)) {
        boost.keywords.forEach(k => needKeywords.add(k))
      }
    }
  }

  return { tagScores, needKeywords }
}

function buildSubcategoryFilter(focus) {
  if (!focus) return null
  const subs = new Set()
  ;(focus.clothes || []).forEach(c => (CLOTHES_SUBCATEGORY[c] || []).forEach(s => subs.add(s)))
  ;(focus.other || []).forEach(o => (OTHER_SUBCATEGORY[o] || []).forEach(s => subs.add(s)))
  return subs.size > 0 ? subs : null
}

function buildAccessoryTypeFilter(focus) {
  if (!focus) return null
  const types = new Set()
  ;(focus.clothes || []).forEach(c => { if (ACCESSORY_TYPE_FILTER[c]) ACCESSORY_TYPE_FILTER[c].forEach(t => types.add(t)) })
  ;(focus.other || []).forEach(o => { if (ACCESSORY_TYPE_FILTER[o]) ACCESSORY_TYPE_FILTER[o].forEach(t => types.add(t)) })
  return types.size > 0 ? types : null
}

// Catalog uses 'All gender' (not 'Unisex') for gender-neutral products.
// Mirrors questionnaire's GENDER_OPTIONS ('Women' | 'Men' | 'Unisex' | 'Kids'):
// the person's selection of 'Unisex' should match any product gender, while a
// specific selection should match that gender OR an 'All gender' product.
function genderMatches(productGender, selectedGender) {
  if (!selectedGender || selectedGender === 'Unisex') return true
  if (!productGender) return true // ungendered/missing data — don't over-filter
  if (selectedGender === 'Kids') return productGender === 'Kids'
  return productGender === selectedGender || productGender === 'All gender'
}

// Many catalog rows (all of Pants & Shorts, most of Accessories) have no
// activity-tag ratings at all — only a free-text `suitable_for` list. Without
// this fallback those products can never surface, regardless of relevance.
function textTagScore(product, tagScores) {
  if (!product.suitable_for || product.suitable_for.length === 0) return 0
  let score = 0
  for (const [tag, weight] of Object.entries(tagScores)) {
    if (product.suitable_for.includes(tag)) score += weight * 2 // flat boost, no per-product rating to scale by
  }
  return score
}

export function scoreProduct(product, profile, subcategoryFilter, accessoryTypeFilter, gender) {
  if (!genderMatches(product.gender, gender)) return -1
  if (subcategoryFilter && !subcategoryFilter.has(product.subcategory)) return -1
  if (
    accessoryTypeFilter &&
    product.subcategory === 'Accessories' &&
    product.accessory_type &&
    !accessoryTypeFilter.has(product.accessory_type)
  ) return -1

  let score = 0
  let matchedTags = 0

  for (const [tag, weight] of Object.entries(profile.tagScores)) {
    const val = product[tag]
    if (typeof val === 'number') {
      score += val * weight
      matchedTags++
    }
  }

  // Fallback for products with no numeric tag ratings (see textTagScore above)
  if (matchedTags === 0) {
    const textScore = textTagScore(product, profile.tagScores)
    if (textScore > 0) {
      score += textScore
      matchedTags++
    }
  }

  for (const keyword of profile.needKeywords) {
    const val = product[keyword]
    if (typeof val === 'number') score += val * 0.5
  }

  // Require at least one relevant activity match (numeric or text), otherwise
  // the product is irrelevant to what was asked.
  if (matchedTags === 0 && Object.keys(profile.tagScores).length > 0) return -1

  // `rating` is missing for ~55% of the catalog (all Pants & Shorts, most
  // Accessories). Treat missing rating as neutral (0) rather than letting it
  // poison the sum — JS `undefined/null * 1.5` would otherwise propagate NaN
  // and silently break the sort.
  score += (product.rating || 0) * 1.5
  return score
}

export function getRecommendations(answers, { limit = 12 } = {}) {
  const profile = buildTagProfile(answers)
  const focus = answers.focus || {}
  const subcategoryFilter = buildSubcategoryFilter(focus)
  const accessoryTypeFilter = buildAccessoryTypeFilter(focus)
  const gender = focus.gender

  const scored = products
    .map(p => ({ product: p, score: scoreProduct(p, profile, subcategoryFilter, accessoryTypeFilter, gender) }))
    .filter(s => s.score >= 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map(s => normalizeProduct(s.product))
}

// Subcategory-aware size placeholders. The catalog carries no real size
// inventory, so these stay static guesses — but showing "S–XXL" on a hat or
// belt was a visible bug in the previous version.
const SIZE_SETS = {
  'Jackets & Vests': ['S', 'M', 'L', 'XL', 'XXL'],
  Tops: ['S', 'M', 'L', 'XL', 'XXL'],
  Pants: ['S', 'M', 'L', 'XL', 'XXL'],
  Shorts: ['S', 'M', 'L', 'XL', 'XXL'],
  Accessories: ['One Size'],
  Shoes: ['7', '8', '9', '10', '11', '12'], // catalog has no real size run; placeholder US sizing
}

const FALLBACK_IMAGE = '/images/product-placeholder.png'

function normalizeProduct(p) {
  return {
    id: p.product_url,
    brand: p.subcategory === 'Accessories' && p.accessory_type ? p.accessory_type : p.subcategory,
    name: p.product_name,
    tagline: p.short_description || p.suitable_for?.join(', ') || '',
    price: p.price_usd,
    // image_url is null for ~80% of the catalog (TOPS, PANTS & SHORTS,
    // ACCESSORIES sheets carry no image data at all) — fall back to a
    // placeholder asset instead of rendering a broken <img>.
    image: p.image_url || FALLBACK_IMAGE,
    sizes: SIZE_SETS[p.subcategory] || ['One Size'],
    colors: ['Default'], // catalog has no color data; static placeholder
  }
}