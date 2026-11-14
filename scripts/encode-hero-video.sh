#!/usr/bin/env bash
# Builds the hero loop from a generated clip: keeps the first 37 frames,
# plays them forward then backward (a seamless loop), nudges the colours so
# the clip's background matches the page, and writes WebM + MP4 + poster.
#
# Browsers decode video and still images slightly differently, so the clip
# and the poster each take their own colour shift (found by measuring the
# rendered page background against them).
#
#   scripts/encode-hero-video.sh <source.mp4> [video r g b] [poster r g b]
set -euo pipefail
src="$1"
r="${2:-0}" g="${3:-0}" b="${4:-0}"
pr="${5:-0}" pg="${6:-0}" pb="${7:-0}"
out="$(dirname "$0")/../public/assets/video"
mkdir -p "$out"

graph="[0:v]trim=end_frame=37,setpts=PTS-STARTPTS,format=rgb24,\
lutrgb=r='clip(val+($r),0,255)':g='clip(val+($g),0,255)':b='clip(val+($b),0,255)',split[a][b];\
[b]reverse,trim=start_frame=1:end_frame=36,setpts=PTS-STARTPTS[rev];\
[a][rev]concat=n=2:v=1,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[o]"
tags=(-color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv)

ffmpeg -v error -y -i "$src" -filter_complex "$graph" -map "[o]" -an \
  -c:v libx264 -preset slow -crf 24 "${tags[@]}" -movflags +faststart "$out/hero-friends.mp4"
ffmpeg -v error -y -i "$src" -filter_complex "$graph" -map "[o]" -an \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 "${tags[@]}" "$out/hero-friends.webm"
ffmpeg -v error -y -i "$src" -frames:v 1 -vf "format=rgb24,lutrgb=r='clip(val+($pr),0,255)':g='clip(val+($pg),0,255)':b='clip(val+($pb),0,255)'" \
  -c:v libwebp -quality 88 "$out/hero-friends-poster.webp"
ls -la "$out"
