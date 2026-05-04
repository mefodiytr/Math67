# Деплой `9moons.30000.ru`

Sets up на Debian-сервере **mikl** (или любом другом).

> **Хотите просто запустить сайт в локальной сети** (доступ с планшета по
> `http://mikl:4321/`)? Это — другой сценарий, см. [`local-network.md`](local-network.md).
> Текущий файл — про **публичный домен** с TLS.

## Один раз на сервере

```bash
# 1. nginx и certbot
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx rsync

# 2. Корневая папка для сайта
sudo mkdir -p /var/www/9moons.30000.ru
sudo chown -R "$USER":www-data /var/www/9moons.30000.ru
sudo chmod -R 755 /var/www/9moons.30000.ru

# 3. ACME challenge для Let's Encrypt
sudo mkdir -p /var/www/letsencrypt
sudo chown -R www-data:www-data /var/www/letsencrypt

# 4. Скопировать nginx-конфиг (с локальной машины):
#    scp web/deploy/nginx.conf mikl:/tmp/9moons.conf
#    ssh mikl
sudo mv /tmp/9moons.conf /etc/nginx/sites-available/9moons.30000.ru
sudo ln -s /etc/nginx/sites-available/9moons.30000.ru \
           /etc/nginx/sites-enabled/9moons.30000.ru

# 5. Проверка и перезагрузка
sudo nginx -t
sudo systemctl reload nginx

# 6. TLS-сертификат
sudo certbot --nginx -d 9moons.30000.ru --redirect \
  --agree-tos --email YOUR_EMAIL@example.com --no-eff-email
```

После этого сертификаты Let's Encrypt будут автообновляться через `certbot.timer`.

## DNS

В панели управления домена `30000.ru` создай **A-запись**:

```
9moons    A    <IP вашего сервера mikl>
```

Подожди ~5-10 минут пока DNS распространится.

## Локально: настройка SSH

В `~/.ssh/config` добавь:

```
Host mikl
  HostName <IP сервера>
  User <твой пользователь>
  IdentityFile ~/.ssh/id_ed25519
```

Тогда `bash deploy/deploy.sh` будет работать без аргументов.

При желании создай `web/deploy/.env`:

```bash
DEPLOY_HOST=mikl
DEPLOY_PATH=/var/www/9moons.30000.ru
```

## Релиз

С локальной машины:

```bash
cd web
bash deploy/deploy.sh
# или: pnpm run deploy
```

Скрипт:
1. Соберёт `dist/` через `pnpm build`.
2. Зальёт `rsync`-ом на сервер с `--delete-after` (старые файлы удалятся).
3. Перезагрузит nginx (если есть sudo).

## Проверка

```bash
curl -I https://9moons.30000.ru
# HTTP/2 200
```

## Откат

Astro генерирует **полностью статичный сайт**. Если что-то сломалось — откатиться можно так:

```bash
# на сервере, до деплоя — забэкапили
sudo cp -r /var/www/9moons.30000.ru /var/www/9moons.backup-$(date +%F)
```

Или через git: вернуться на предыдущий коммит, пересобрать, redeploy.
