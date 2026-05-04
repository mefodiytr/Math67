# 🌙 Felicia — шпаргалка: запустить на mikl для локальной сети

> Для разработки и доступа в локальной сети (планшет Лены + ноутбук в одной wifi).
> Публичный деплой на `9moons.30000.ru` — отдельная инструкция в [`README.md`](README.md).

## 0. Префлайт-чек

На локальной машине знаешь:

- **IP сервера** mikl (или resolved hostname в твоей сети)
- SSH-доступ к нему (ключи уже настроены)
- URL git-репо (тот, что для `git clone`)

Узнать IP сервера потом, уже на нём:

```bash
hostname -I    # покажет 192.168.x.y
```

---

## 1. Подключаемся

```bash
ssh mikl
```

(или `ssh user@<ip>`, как у тебя в `~/.ssh/config`)

---

## 2. Установка Node 20+ и pnpm (одноразово)

Astro 5 требует Node ≥ 20. Проверь:

```bash
node -v 2>/dev/null || echo "нет"
```

### Вариант A — глобально через apt (нужен sudo)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git rsync
sudo corepack enable     # активирует pnpm встроенный в node 20
pnpm -v                  # должно ответить версией
```

### Вариант B — без sudo, через nvm (совет если права рядового юзера)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
exec $SHELL              # перезагрузить шелл, чтобы nvm подхватился
nvm install 20
nvm alias default 20
corepack enable
pnpm -v
```

---

## 3. Клонируем как `Felicia`

Где-нибудь в домашке:

```bash
cd ~
git clone <git-url-репо> Felicia
cd Felicia/web
```

`<git-url-репо>` — тот URL `git@…:mefodiytr/math67.git` или
`http://…/git/mefodiytr/Math67.git`, который у тебя работает.

---

## 4. Установка зависимостей и сборка

```bash
cd ~/Felicia/web
pnpm install         # ~30-60 сек, один раз
pnpm build           # ~15-30 сек, сборка статики в ./dist/
```

Если `pnpm build` падает на ошибке `astro check` (TypeScript-strict) —
пропусти сначала чек:

```bash
pnpm exec astro build      # вместо pnpm build
```

В `dist/` теперь готовый статический сайт.

---

## 5. Запуск для локальной сети

Удобнее всего — через скрипт `pnpm felicia`. Он сам определит твой LAN-IP
(пропустит docker/tailscale/etc) и поднимет preview только на нём:

```bash
pnpm felicia
# [felicia] preview на http://192.168.200.184:4321/
```

### Если автоопределение взяло не тот IP

Зафиксируй явно:

```bash
LAN_IP=192.168.200.184 pnpm felicia
PORT=8080 pnpm felicia                    # сменить порт
LAN_IP=192.168.200.184 PORT=8080 pnpm felicia
```

### Dev-режим (с hot reload)

```bash
pnpm felicia:dev
```

### Если надо слушать на ВСЕХ интерфейсах (старый способ)

```bash
pnpm preview --port 4321        # слушает на 0.0.0.0:4321
```
Печатает портянку всех адресов машины — менее удобно.

---

## 6. Открываем с других устройств в локалке

С планшета / ноутбука Лены — в браузере:

```
http://<ip-mikl>:4321/
```

или, если в локалке резолвится имя:

```
http://mikl:4321/
http://mikl.local:4321/      # если есть mDNS/avahi
```

Узнать IP сервера прямо сейчас:

```bash
hostname -I | awk '{print $1}'
```

### Открыть порт во firewall (если включён ufw)

```bash
sudo ufw allow 4321/tcp
sudo ufw status
```

---

## 7. Запуск как сервис (чтобы не отвалилось при выходе) — опционально

Если хочешь, чтобы сайт жил после `Ctrl+C` / выхода из ssh — простой systemd unit.

```bash
sudo tee /etc/systemd/system/felicia.service > /dev/null <<EOF
[Unit]
Description=Felicia (Академия Девяти Лун)
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$HOME/Felicia/web
# Если ставил Node через nvm — указать прямой путь:
Environment="PATH=$HOME/.nvm/versions/node/v20.18.0/bin:/usr/bin:/bin"
ExecStart=$HOME/.nvm/versions/node/v20.18.0/bin/pnpm preview --port 4321
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

> ⚠ В `Environment=...PATH` и `ExecStart` подставь свою точную версию Node
> (узнай: `which node` и `which pnpm`).

Запустить:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now felicia
sudo systemctl status felicia          # проверка
journalctl -u felicia -f               # лайв-логи
```

Перезапуск:

```bash
sudo systemctl restart felicia
```

### Альтернатива — без systemd, через `tmux` / `screen`

```bash
sudo apt-get install -y tmux
tmux new -s felicia
cd ~/Felicia/web
pnpm preview --port 4321
# Ctrl+B, потом D — отсоединиться, сервер живёт.
# Вернуться: tmux attach -t felicia
```

---

## 8. Обновление сайта (когда будут изменения в репо)

```bash
cd ~/Felicia
git pull
cd web
pnpm install              # если появились новые зависимости
pnpm build                # пересборка
sudo systemctl restart felicia    # если как сервис
```

---

## 9. Troubleshooting

| Симптом | Что делать |
|---|---|
| `pnpm: command not found` | `corepack enable` или `npm install -g pnpm` |
| `EADDRINUSE :::4321` | Уже занят — поменяй порт `--port 4322` |
| Не открывается с другого устройства | `sudo ufw allow 4321/tcp`, проверь `hostname -I` |
| `Cannot find module 'katex'` и т.п. | `pnpm install` ещё раз, `rm -rf node_modules && pnpm install` |
| `astro check` ругается | Запусти без него: `pnpm exec astro build` |
| Старая страница после правки | Жёсткое обновление в браузере (`Ctrl+Shift+R`) |
| Отсутствуют картинки | Это нормально — PNG-ассетов ещё нет, виден SVG-плейсхолдер с инициалами |

---

## Минимальная последовательность (TL;DR)

```bash
# Один раз
ssh mikl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
exec $SHELL
nvm install 20 && corepack enable

# Каждый раз
git clone git@github.com:mefodiytr/math67.git ~/Felicia
cd ~/Felicia/web
pnpm install
pnpm felicia               # сам соберёт + поднимет на нужном IP
# Открыть на планшете: ссылка из вывода (http://192.168.x.y:4321/)
```
