import re


def extract_image_url(srcset: str) -> str:
    """Pull the largest image URL out of a raw srcset string.
    URLs themselves contain commas (e.g. f=auto,metadata=none), so we
    can't just split on ','. Instead find every '<url> <width>w' pair.
    """
    pairs = re.findall(r'(\S+?)\s+(\d+)w', srcset)
    if not pairs:
        raise ValueError("No 'url Nw' pairs found in input")
    pairs.sort(key=lambda p: int(p[1]))
    return pairs[-1][0]  # largest width


if __name__ == '__main__':
    import sys
    print("Paste the srcset (or full <img> tag), then press Ctrl+D on a new line:\n")
    srcset = sys.stdin.read()
    print("\n" + extract_image_url(srcset))