# `slides-yaml/` — машиночитаемые манифесты слайдов

YAML-манифесты для **сборки** слайдов скриптом. Идут **параллельно** с описаниями в `lesson-presentations/` (которые остаются для учителя как читаемая методическая часть).

## Зачем YAML рядом с MD

| Файл | Аудитория | Что внутри |
|---|---|---|
| `lesson-presentations/.../*.md` | **Учитель** | Что говорить, какой смысл, какие промты для генерации |
| `slides-yaml/.../*.yaml` | **Скрипт сборки** | id-ассетов, тексты, лейаут, формулы — машиночитаемо |

## Структура

```
slides-yaml/
├── README.md
└── module-NN/
    └── lesson-MM.yaml
```

## Формат файла

```yaml
lesson: 8.12
title: "Финал Лабиринта"
location: 08-labyrinth-lanterns

slides:
  - n: 1
    layout: title-hero                    # см. layouts/slide/
    title: "Урок 8.12. Великий Фонарь. Финал."
    background: 08-labyrinth-lanterns
    characters:
      - id: kuro
        pose: detective
        position: center-left
      - id: sphinx
        pose: regal
        position: center-right
      - id: bakeneko
        pose: base
        position: front-right

  - n: 8
    layout: sphinx-challenge
    title: "★★★★ 5 фонарей × C(3,2) = 243"
    formula: "C(3,2)^5 = 243"
    artifacts:
      - id: lantern-purple        # из assets/ui/decorations/

  - n: 10
    layout: artifact-reveal
    title: "Лунный Камень Лабиринта"
    artifact: moon-stone-08-labyrinth
    emblem: stage-08
    music: chime-soft             # для будущих видео
```

## Поля

- **n**: номер слайда (1..N).
- **layout**: одно из имён в `layouts/slide/`.
- **title**: текст-заголовок (Markdown).
- **subtitle**: опционально.
- **background**: id из `locations/_index.yaml`.
- **characters**: массив с `id`, `pose`, `position`.
- **artifacts**: массив id из `artifacts/_index.yaml`.
- **emblem**: id из `emblems/_index.yaml`.
- **formula**: KaTeX-строка для математики.
- **english**: блок с (a)/(b)/(c) и переводом.

## Валидация

`tools/validate-assets.ts` проверит, что все ссылки на id **существуют** в соответствующих `_index.yaml`.

## Миграция MD → YAML

Не нужно мигрировать всё сразу. Подход:
1. Один пилотный модуль (сейчас — Модуль 8).
2. Посмотреть, что генерируется красиво.
3. Раскатывать на остальные.
