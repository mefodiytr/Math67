#!/usr/bin/env bash
#
# Деплой 9moons.30000.ru на Debian-сервер.
#
# Использование (с локальной машины):
#   bash deploy/deploy.sh
#
# Переменные окружения (можно задать в deploy/.env или экспортировать):
#   DEPLOY_HOST   — SSH-хост (например, mikl или user@mikl)
#   DEPLOY_PATH   — куда класть на сервере (default: /var/www/9moons.30000.ru)
#   DEPLOY_USER   — необязательно, если уже в DEPLOY_HOST
#
# Что делает:
#   1) собирает сайт (npm/pnpm run build → dist/)
#   2) rsync dist/ → DEPLOY_HOST:DEPLOY_PATH/
#   3) (опц.) reload nginx

set -euo pipefail

# Загружаем .env если есть
if [[ -f deploy/.env ]]; then
  # shellcheck disable=SC1091
  source deploy/.env
fi

DEPLOY_HOST="${DEPLOY_HOST:-mikl}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/9moons.30000.ru}"

cd "$(dirname "$0")/.."  # web/

echo "==> Сборка сайта…"
if command -v pnpm >/dev/null 2>&1; then
  pnpm install --frozen-lockfile
  pnpm run build
elif command -v npm >/dev/null 2>&1; then
  npm ci
  npm run build
else
  echo "Не нашёл ни pnpm, ни npm. Установи Node.js + менеджер пакетов." >&2
  exit 1
fi

if [[ ! -d dist ]]; then
  echo "Сборка не создала папку dist/" >&2
  exit 1
fi

echo "==> Загрузка на $DEPLOY_HOST:$DEPLOY_PATH/"
# --delete-after — удаляет файлы, которых больше нет в dist, но только после успешной заливки.
# --omit-dir-times — не падать на правах папок.
rsync -avz \
  --delete-after \
  --omit-dir-times \
  --exclude='.git' \
  --exclude='node_modules' \
  ./dist/ \
  "$DEPLOY_HOST:$DEPLOY_PATH/"

echo "==> (опц.) Reload nginx"
ssh "$DEPLOY_HOST" "sudo nginx -t && sudo systemctl reload nginx" || \
  echo "  ⚠ nginx reload пропущен (нет sudo / nginx не настроен)."

echo "==> Готово. Открой: https://9moons.30000.ru"
