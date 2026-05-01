# `tools/` — скрипты сборки и валидации

Тонкие скрипты, которые превращают атомы + манифесты + шаблоны в финальные PDF/PPTX/PNG.

## Планируемые скрипты

```
tools/
├── render-slides.ts          ← YAML → PDF/PPTX слайды
├── render-book.ts            ← lessons/*.md + atoms → PDF учебник
├── render-teacher-guide.ts   ← teacher-guides/*.md + atoms → PDF методичка
├── render-handouts.ts        ← раздатки A4
├── render-certificate.ts     ← сертификат для конкретной ученицы
└── validate-assets.ts        ← проверка целостности ссылок
```

## Что валидирует `validate-assets.ts`

1. Все `id` в `slides-yaml/` существуют в `assets/*/_index.yaml`.
2. Все упомянутые `*.png` файлы реально лежат на диске.
3. Лейаут, указанный в манифесте, существует в `layouts/`.
4. Цвет в YAML соответствует палитре.

## Зависимости

Скрипты — **TypeScript** (запуск через **Bun** или **tsx**).
Шаблоны:
- HTML/Vue для слайдов → **Slidev** (`npx slidev`).
- Typst для PDF → **typst** CLI.

## Идея запуска

```bash
# Собрать все слайды модуля 8
bun run tools/render-slides.ts --module 8

# Собрать учебник
bun run tools/render-book.ts --output build/book-student.pdf

# Сертификат для Лены
bun run tools/render-certificate.ts --student "Лена" --date "2026-06-01"

# Валидация перед коммитом
bun run tools/validate-assets.ts
```

## Когда писать скрипты

Не сейчас. Сначала:
1. Заполнить `assets/` промтами.
2. Сделать **один пилотный** YAML-манифест и шаблон.
3. Если концепт работает — писать автоматизацию.
