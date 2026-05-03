#!/usr/bin/env bash
#
# Копирует ../assets/ в web/public/assets/ перед сборкой Astro.
# Включает только изображения (PNG/SVG/WebP) — не Markdown-промты.
#
# Запускается автоматически из package.json (predev / prebuild).

set -euo pipefail

cd "$(dirname "$0")/.."  # web/

SRC="../assets"
DST="public/assets"

if [[ ! -d "$SRC" ]]; then
  echo "[sync-assets] Источник $SRC не найден. Пропускаю."
  exit 0
fi

mkdir -p "$DST"

# Копируем только изображения, исключая *.prompt.md и _index.yaml
rsync -a \
  --include='*/' \
  --include='*.png' \
  --include='*.jpg' \
  --include='*.jpeg' \
  --include='*.webp' \
  --include='*.svg' \
  --exclude='*' \
  "$SRC/" "$DST/"

count=$(find "$DST" -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.webp' -o -name '*.svg' \) | wc -l | tr -d ' ')
echo "[sync-assets] Скопировано изображений: $count → $DST/"
