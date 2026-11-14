"""Cuts a character parts sheet into pieces and lays them out as a puppet.

The sheet must have real transparency: every connected blob of opaque
pixels is one piece, numbered in scan order (run with --numbered to get an
image showing the numbers). The layout below maps those numbers to rig
pieces for Jamool.

usage: python3 scripts/build-rig.py <sheet> <outdir> [--export] [--numbered]
  preview.png   six assembled poses, for checking the layout
  --export      also writes one .webp per piece and rig.json
"""
import json
import os
import sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

sheet, out = sys.argv[1], sys.argv[2]
export = "--export" in sys.argv
im = Image.open(sheet).convert("RGBA")
arr = np.array(im)
lab, _ = ndi.label(arr[..., 3] > 40)
comps = []
for i, sl in enumerate(ndi.find_objects(lab), 1):
    area = int((lab[sl] == i).sum())
    if area >= 150:
        comps.append((i, sl[1].start, sl[0].start, sl[1].stop, sl[0].stop, area))
os.makedirs(out, exist_ok=True)
if "--numbered" in sys.argv:
    vis = Image.new("RGBA", im.size, (60, 60, 90, 255))
    vis.alpha_composite(im)
    d = ImageDraw.Draw(vis)
    for k, (_, x0, y0, x1, y1, _) in enumerate(comps):
        d.rectangle([x0, y0, x1, y1], outline=(255, 0, 0, 255))
        d.text((x0 + 2, y0 + 2), str(k), fill=(255, 255, 0, 255))
    vis.save(os.path.join(out, "numbered.png"))

W, H = 560, 880


def piece(k, flip=False):
    i, x0, y0, x1, y1, _ = comps[k]
    pad = 3
    x0, y0, x1, y1 = max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)
    region = arr[y0:y1, x0:x1].copy()
    own = ndi.binary_dilation(lab[y0:y1, x0:x1] == i, iterations=3)
    region[..., 3] = np.where(own, region[..., 3], 0)
    p = Image.fromarray(region)
    return p.transpose(Image.FLIP_LEFT_RIGHT) if flip else p


# name: (component, x, y, pivot-x, pivot-y)  — x/y = top-left on the canvas,
# pivot relative to the piece's own top-left. Listed back to front.
CX = 280
parts = [
    ("tail", 43, 22, 562, 205, 30),
    ("backpack", 23, 60, 372, 150, 60),
    ("leg-l", 41, 172, 628, 59, 20),
    ("leg-r", 42, 272, 628, 57, 20),
    ("toe-l", 44, 160, 640, 60, 20),
    ("toe-r", 45, 276, 650, 50, 20),
    ("body", 21, CX - 108, 318, 104, 330),
    ("arm-l", 8, 150, 428, 62, 12),
    ("arm-r", 22, 322, 428, 38, 12),
    ("wave-l", 18, 78, 380, 140, 92),
    ("wave-r", 3, 334, 330, 14, 104),
    ("head", 0, 96, 40, 190, 290),
]
# Face pieces sit on the head; positions are canvas pixels too.
EYE_Y, EYE_LX, EYE_RX = 178, 196, 292
face = {
    "eyes-open": [(1, EYE_LX, EYE_Y), (2, EYE_RX, EYE_Y)],
    "eyes-closed": [(6, EYE_LX + 2, EYE_Y + 22), (7, EYE_RX + 2, EYE_Y + 22)],
    "eyes-half": [(4, EYE_LX, EYE_Y + 12), (5, EYE_RX, EYE_Y + 12)],
    "eyes-left": [(12, EYE_LX, EYE_Y + 6), (11, EYE_RX, EYE_Y + 6)],
    "eyes-right": [(13, EYE_LX, EYE_Y + 6), (14, EYE_RX, EYE_Y + 6)],
    "eyes-wide": [(9, EYE_LX + 4, EYE_Y + 2), (10, EYE_RX + 2, EYE_Y + 2)],
    "eyes-joy": [(16, EYE_LX + 4, EYE_Y + 30), (17, EYE_RX + 4, EYE_Y + 30)],
    "brows-neutral": [(24, EYE_LX + 10, EYE_Y - 26), (25, EYE_RX + 8, EYE_Y - 26)],
    "brows-raised": [(19, EYE_LX + 16, EYE_Y - 40), (20, EYE_RX + 14, EYE_Y - 40)],
    "brows-angry": [(27, EYE_LX + 12, EYE_Y - 24), (26, EYE_RX + 10, EYE_Y - 24)],
    "brows-sad": [(29, EYE_LX + 12, EYE_Y - 26), (28, EYE_RX + 10, EYE_Y - 26)],
}
MOUTH_CX, MOUTH_Y = 281, 246
mouths = {"smile": 31, "oo": 33, "ah": 32, "laugh": 30, "eee": 36, "o": 35, "tongue": 37, "sad": 38}


def centre_x(k, cx):
    _, x0, _, x1, _, _ = comps[k]
    return int(cx - (x1 - x0) / 2) - 3


def compose(eyes="eyes-open", brows="brows-neutral", mouth="smile", arms=("arm-l", "wave-r"), legs=("leg-l", "leg-r")):
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    skip = {"arm-l", "arm-r", "wave-l", "wave-r", "leg-l", "leg-r", "toe-l", "toe-r"} - set(arms) - set(legs)
    for name, k, x, y, _, _ in parts:
        if name in skip:
            continue
        canvas.alpha_composite(piece(k), (x - 3, y - 3))
    canvas.alpha_composite(piece(mouths[mouth]), (centre_x(mouths[mouth], MOUTH_CX), MOUTH_Y))
    for k, x, y in face[eyes] + face[brows]:
        canvas.alpha_composite(piece(k), (x - 3, y - 3))
    return canvas


variants = [
    dict(),
    dict(eyes="eyes-closed", mouth="laugh", arms=("wave-l", "wave-r")),
    dict(eyes="eyes-wide", brows="brows-raised", mouth="o", arms=("arm-l", "arm-r")),
    dict(eyes="eyes-left", brows="brows-sad", mouth="sad", arms=("arm-l", "arm-r"), legs=("toe-l", "toe-r")),
    dict(eyes="eyes-joy", brows="brows-raised", mouth="tongue"),
    dict(eyes="eyes-half", brows="brows-angry", mouth="eee", arms=("wave-l", "arm-r")),
]
sheet_img = Image.new("RGBA", (W * 3, H * 2), (49, 46, 153, 255))
for n, v in enumerate(variants):
    sheet_img.alpha_composite(compose(**v), ((n % 3) * W, (n // 3) * H))
sheet_img.save(os.path.join(out, "preview.png"))

if export:
    rig = {"width": W, "height": H, "parts": [], "face": {}, "mouths": {}}

    def save(name, k):
        p = piece(k)
        p.save(os.path.join(out, f"{name}.webp"), quality=92, method=6)
        return p.size

    for name, k, x, y, px, py in parts:
        w, h = save(name, k)
        rig["parts"].append({"name": name, "x": x - 3, "y": y - 3, "w": w, "h": h, "px": px + 3, "py": py + 3})
    for group, items in face.items():
        rig["face"][group] = []
        for side, (k, x, y) in zip("lr", items):
            w, h = save(f"{group}-{side}", k)
            rig["face"][group].append({"name": f"{group}-{side}", "x": x - 3, "y": y - 3, "w": w, "h": h})
    for name, k in mouths.items():
        w, h = save(f"mouth-{name}", k)
        rig["mouths"][name] = {"name": f"mouth-{name}", "x": centre_x(k, MOUTH_CX), "y": MOUTH_Y, "w": w, "h": h}
    json.dump(rig, open(os.path.join(out, "rig.json"), "w"), indent=1)
    print("exported", len(os.listdir(out)), "files")
