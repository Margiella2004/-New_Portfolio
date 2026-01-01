#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="movies_for_portfolio"
FPS=18
WIDTH=640
MAX_COLORS=96

for base in Intro secondcube thirdcube fourthcube; do
  input="${SRC_DIR}/${base}.mov"
  output="${SRC_DIR}/${base}.gif"

  if [[ ! -f "${input}" ]]; then
    echo "Missing ${input}, skipping."
    continue
  fi

  ffmpeg -y -i "${input}" \
    -vf "fps=${FPS},scale=${WIDTH}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=${MAX_COLORS}:stats_mode=diff[p];[s1][p]paletteuse=dither=sierra2_4a" \
    -loop 0 \
    "${output}"
done
