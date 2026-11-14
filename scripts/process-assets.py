"""Builds web-ready assets in public/assets from the untouched originals in
design-source/originals. Run: python3 scripts/process-assets.py"""
import json, os
from PIL import Image
import numpy as np

SRC = "design-source/originals"
OUT = "public/assets"
manifest = {}

def trim(im, pad=6, thr=16):
    a = np.array(im)[..., 3]
    box = Image.fromarray(((a > thr) * 255).astype("uint8")).getbbox()
    l, t, r, b = box
    return im.crop((max(l - pad, 0), max(t - pad, 0), min(r + pad, im.width), min(b + pad, im.height)))

def dehaze(im, lo=120, hi=235):
    """Remove a soft semi-transparent glow by remapping the alpha levels."""
    arr = np.array(im).astype("float32")
    a = arr[..., 3]
    arr[..., 3] = np.clip((a - lo) / (hi - lo), 0, 1) * 255
    return Image.fromarray(arr.astype("uint8"), "RGBA")

def clean_alpha(im, lo=12):
    """Drop near-invisible stray pixels so trimming and edges are clean."""
    arr = np.array(im)
    arr[arr[..., 3] < lo] = 0
    return Image.fromarray(arr, "RGBA")

def hue_shift(im, target_deg, lo=245, hi=312, sat_scale=1.0, val_scale=1.0):
    """Recolour only the violet range of an icon to a section accent hue."""
    rgba = np.array(im).astype("float32") / 255
    rgb, alpha = rgba[..., :3], rgba[..., 3:]
    mx, mn = rgb.max(-1), rgb.min(-1)
    d = mx - mn
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    h = np.zeros_like(mx)
    m = d > 1e-6
    rm, gm, bm = m & (mx == r), m & (mx == g) & (mx != r), m & (mx == b) & (mx != r) & (mx != g)
    h[rm] = ((g - b)[rm] / d[rm]) % 6
    h[gm] = (b - r)[gm] / d[gm] + 2
    h[bm] = (r - g)[bm] / d[bm] + 4
    h *= 60
    s = np.where(mx > 0, d / np.maximum(mx, 1e-6), 0)
    v = mx
    centre = (lo + hi) / 2
    half = (hi - lo) / 2
    w = np.clip(1.25 - np.abs(h - centre) / half, 0, 1) * np.clip(s / 0.18, 0, 1)
    nh = (h + (target_deg - centre) * w) % 360
    ns = np.clip(s * (1 + (sat_scale - 1) * w), 0, 1)
    nv = np.clip(v * (1 + (val_scale - 1) * w), 0, 1)
    c = nv * ns
    hp = nh / 60
    x = c * (1 - np.abs(hp % 2 - 1))
    z = np.zeros_like(c)
    idx = np.floor(hp).astype(int) % 6
    table = [(c, x, z), (x, c, z), (z, c, x), (z, x, c), (x, z, c), (c, z, x)]
    out = np.zeros_like(rgb)
    for i, (rr, gg, bb) in enumerate(table):
        sel = idx == i
        out[sel] = np.stack([rr, gg, bb], -1)[sel]
    out += (nv - c)[..., None]
    return Image.fromarray((np.concatenate([out, alpha], -1) * 255).round().astype("uint8"), "RGBA")

def save(im, key, rel, max_side, quality=90):
    im = im.copy()
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    path = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6, alpha_quality=100)
    manifest[key] = {"src": "/assets/" + rel, "width": im.width, "height": im.height}
    print(f"{rel:42} {im.width}x{im.height} {os.path.getsize(path)//1024}KB")

def cutout(src, **kw):
    return trim(clean_alpha(Image.open(os.path.join(SRC, src)).convert("RGBA")), **kw)

# Brand
logo = cutout("logo/jamool-logo.png")
save(logo, "logo", "brand/jamool-logo.webp", 640, 92)
sq = Image.new("RGBA", (max(logo.size),) * 2, (0, 0, 0, 0))
sq.paste(logo, ((sq.width - logo.width) // 2, (sq.height - logo.height) // 2))
sq.resize((256, 256), Image.LANCZOS).save("src/app/icon.png")

# Characters (official cut-outs)
for key, src in {
    "jamool": "characters/jamool.png",
    "jamoolAlt": "characters/jamool1.png",
    "thaloob": "characters/thaloob.png",
    "zizou": "characters/zizou.png",
    "noor": "characters/noor.png",
}.items():
    name = "jamool-alt" if key == "jamoolAlt" else key
    save(cutout(src), key, f"characters/{name}.webp", 960)
maha = trim(dehaze(Image.open(f"{SRC}/characters/maha.png").convert("RGBA")))
save(maha, "maha", "characters/maha.webp", 960)
save(cutout("characters/Cheerful Floating Robot Zizou-6.png"), "zizouStar", "characters/zizou-star.webp", 640)

# Section icons. Violet-dominant originals get a section accent (variants only;
# originals stay untouched) so the eight sections do not all read as purple.
ICONS = {
    "stories": ("stories.png", None),
    "learn": ("learning.png", None),
    "surahs": ("surahs.png", dict(target_deg=174, sat_scale=0.95, val_scale=0.92)),
    "games": ("games.png", dict(target_deg=216, sat_scale=1.0, val_scale=1.05)),
    "art": ("art.png", dict(target_deg=356, sat_scale=1.3, val_scale=1.22)),
    "values": ("values.png", None),
    "competitions": ("competitions.png", dict(target_deg=368, sat_scale=0.95, val_scale=1.12)),
    "media": ("Playful Content and Video Icon.png", None),
}
for key, (src, shift) in ICONS.items():
    im = cutout("icons/" + src)
    save(im, key + "IconOriginal", f"icons/original/{key}.webp", 512)
    save(hue_shift(im, **shift) if shift else im, key + "Icon", f"icons/{key}.webp", 512)

# Illustrations
save(cutout("characters/Cheerful Cartoon Friends Group Cutout-3.png"), "friendsGroup", "illustrations/friends-group.webp", 1200)
save(cutout("characters/Colourful Cartoon Mascot Team-4.png", thr=40), "friendsLineup", "illustrations/friends-lineup.webp", 1600)
oasis = Image.open(f"{SRC}/characters/Jamool Friends at the Desert Oasis.png").convert("RGB")  # flatten faulty alpha
path = f"{OUT}/illustrations/oasis-scene.webp"
oasis.save(path, "WEBP", quality=84, method=6)
manifest["oasisScene"] = {"src": "/assets/illustrations/oasis-scene.webp", "width": oasis.width, "height": oasis.height}

json.dump(manifest, open("src/lib/asset-manifest.json", "w"), indent=2)
