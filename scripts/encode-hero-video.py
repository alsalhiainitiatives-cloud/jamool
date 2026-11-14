"""Builds the hero loop from a generated clip.

- keeps the first 37 frames and plays them forward then backward (seamless)
- adds a strip under the picture: the clip was generated on a 16:9 canvas
  that cuts the ring around the yellow circle and the ground shadows, so the
  ring is completed there and the last row fades out instead of ending hard
- shifts the colours so the background matches the page as browsers render
  it (video and still images decode slightly differently, hence two shifts)
- writes WebM, MP4 and the poster to public/assets/video/

usage: python3 scripts/encode-hero-video.py <source.mp4>
"""
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "assets", "video")
FRAMES = 37
EXTRA = 36  # rows added under the 720-row picture
VIDEO_SHIFT = (4, 1, 13)
POSTER_SHIFT = (2, 1, 6)
# Circle and ring, measured on the source frame (pixels).
CX, CY = 639.2, 396.3
RING_INNER, RING_OUTER = 329.0, 334.5
RING_COLOUR = np.array([107, 90, 139], float)


def ring_coverage(height, width, top):
    """Anti-aliased coverage of the ring for rows top..top+height."""
    ss = 4
    y, x = np.mgrid[0 : height * ss, 0 : width * ss]
    d = np.hypot((x + 0.5) / ss - CX, (y + 0.5) / ss + top - CY)
    inside = ((d >= RING_INNER) & (d <= RING_OUTER)).astype(float)
    return inside.reshape(height, ss, width, ss).mean(axis=(1, 3))[..., None]


def extend(frame, coverage):
    h, w, _ = frame.shape
    bg = np.median(np.concatenate([frame[-40:, :24].reshape(-1, 3), frame[-40:, -24:].reshape(-1, 3)]), axis=0)
    strip = np.empty((EXTRA, w, 3), float)
    last = frame[-1].astype(float)
    for i in range(EXTRA):
        keep = max(0.0, 1 - i / 14) ** 2
        strip[i] = last * keep + bg * (1 - keep)
    strip = strip * (1 - coverage) + RING_COLOUR * coverage
    return np.concatenate([frame.astype(float), strip])


def shifted(image, shift):
    return Image.fromarray(np.clip(image + np.array(shift, float), 0, 255).astype(np.uint8))


os.makedirs(OUT, exist_ok=True)
with tempfile.TemporaryDirectory() as tmp:
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", SRC, "-frames:v", str(FRAMES), os.path.join(tmp, "src%03d.png")], check=True)
    frames = [np.array(Image.open(os.path.join(tmp, f"src{i + 1:03d}.png")).convert("RGB")) for i in range(FRAMES)]
    coverage = ring_coverage(EXTRA, frames[0].shape[1], frames[0].shape[0])
    extended = [extend(f, coverage) for f in frames]
    order = list(range(FRAMES)) + list(range(FRAMES - 2, 0, -1))
    for n, i in enumerate(order):
        shifted(extended[i], VIDEO_SHIFT).save(os.path.join(tmp, f"out{n:03d}.png"))
    shifted(extended[0], POSTER_SHIFT).save(os.path.join(OUT, "hero-friends-poster.webp"), quality=88, method=6)

    common = ["ffmpeg", "-v", "error", "-y", "-framerate", "24", "-i", os.path.join(tmp, "out%03d.png"), "-an"]
    tags = ["-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv"]
    subprocess.run(common + tags + ["-c:v", "libx264", "-preset", "slow", "-crf", "24", "-movflags", "+faststart", os.path.join(OUT, "hero-friends.mp4")], check=True)
    subprocess.run(common + tags + ["-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", "-row-mt", "1", os.path.join(OUT, "hero-friends.webm")], check=True)

h, w, _ = extended[0].shape
print(f"{w}x{h}, {len(order)} frames")
for name in sorted(os.listdir(OUT)):
    print(name, os.path.getsize(os.path.join(OUT, name)) // 1024, "kB")
