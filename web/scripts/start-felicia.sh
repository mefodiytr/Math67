#!/usr/bin/env bash
#
# Запуск Felicia в локальной сети — автоопределение LAN IP.
# Слушаем только на одном LAN-интерфейсе, а не на всех 0.0.0.0,
# чтобы Astro не печатал портянку Docker/VPN-адресов.
#
# Переменные:
#   LAN_IP  — явно задать IP (например, LAN_IP=192.168.200.184 pnpm felicia)
#   PORT    — порт (по умолчанию 4321)
#   MODE    — preview | dev (по умолчанию preview)

set -euo pipefail

cd "$(dirname "$0")/.."  # web/

PORT="${PORT:-4321}"
MODE="${MODE:-preview}"
HOST="${LAN_IP:-}"

if [[ -z "$HOST" ]]; then
  # Берём первый IPv4 из приватных диапазонов RFC1918,
  # исключая loopback, docker/bridge/veth, tailscale, wireguard, tun.
  HOST=$(
    ip -4 -o addr show 2>/dev/null \
      | awk '$2 !~ /^(lo|docker|br-|veth|tailscale|tun|wg)/ {print $4}' \
      | cut -d/ -f1 \
      | grep -E '^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)' \
      | head -n1
  ) || true

  if [[ -z "$HOST" ]]; then
    HOST="0.0.0.0"
    echo "[felicia] ⚠ LAN IP не найден автоматически, fallback на 0.0.0.0"
    echo "[felicia]   Можно явно: LAN_IP=192.168.x.y pnpm felicia"
  fi
fi

if [[ "$MODE" == "dev" ]]; then
  echo "[felicia] dev-сервер на http://$HOST:$PORT/"
  exec pnpm exec astro dev --host "$HOST" --port "$PORT"
else
  # preview — production-like раздача из dist/
  if [[ ! -d dist ]]; then
    echo "[felicia] dist/ не найден, делаю pnpm build…"
    pnpm exec astro build
  fi
  echo "[felicia] preview на http://$HOST:$PORT/"
  exec pnpm exec astro preview --host "$HOST" --port "$PORT"
fi
