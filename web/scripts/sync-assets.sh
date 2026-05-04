#!/usr/bin/env bash
#
# Копирует ../assets/ в web/public/assets/ перед сборкой Astro.
# Включает только изображения (PNG/SVG/WebP) — не Markdown-промты.
#
# Запускается автоматически из package.json (predev / prebuild).
# Не падает, если в ../assets/ нет картинок (на старте PNG ещё не сгенерены).

set -euo pipefail

cd "$(dirname "$0")/.."  # web/

SRC="../assets"
DST="public/assets"

if [[ ! -d "$SRC" ]]; then
  echo "[sync-assets] Источник $SRC не найден. Пропускаю."
  exit 0
fi

mkdir -p "$DST"

if command -v rsync >/dev/null 2>&1; then
  # Предпочтительный путь: rsync с фильтрами
  rsync -a \
    --include='*/' \
    --include='*.png' \
    --include='*.jpg' \
    --include='*.jpeg' \
    --include='*.webp' \
    --include='*.svg' \
    --exclude='*' \
    "$SRC/" "$DST/"
else
  # Fallback на чистый shell, если rsync не установлен.
  echo "[sync-assets] rsync не найден, использую cp-fallback."
  cd "$SRC"
  while IFS= read -r -d '' f; do
    rel="${f#./}"
    target="../web/$DST/$rel"
    mkdir -p "$(dirname "$target")"
    cp -f "$f" "$target"
  done < <(find . -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.webp' -o -name '*.svg' \) -print0)
  cd - >/dev/null
fi

count=$(find "$DST" -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.webp' -o -name '*.svg' \) 2>/dev/null | wc -l | tr -d ' ')
echo "[sync-assets] Скопировано изображений: $count → $DST/"
