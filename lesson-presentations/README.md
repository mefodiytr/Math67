# lesson-presentations/ — описания слайдов уроков

Каждый файл — **описание презентации одного урока** в виде Markdown. Это **не сам PPTX**, а инструкция «как собрать», включая промты для генерации иллюстраций.

> Готовые .pptx файлы — в [`../slides/lesson-presentations/`](../slides/lesson-presentations/).

## Что описано на каждом слайде

```
## Слайд N — Название

Описание: что показывает слайд
Текст: содержимое слайда
Инфографика: что должно быть нарисовано
Стиль: палитра, акценты
Промт GPT Image: готовый промт для генерации
```

10–12 слайдов на один урок.

## Готовые модули

| Модуль | Папка | Презентаций |
|--------|-------|-------------|
| 0 — Диагностика | [module-00/](module-00/) | 5 |
| 1 — Сад Дробей | [module-01/](module-01/) | 15 |
| 2 — Пещера Простых | [module-02/](module-02/) | 12 |
| 3 — Башня Знаков | [module-03/](module-03/) | 15 |
| 4 — Замок Весов | [module-04/](module-04/) | 18 |
| 5 — Звёздная Карта | [module-05/](module-05/) | 15 |

**Итого: 80 описаний слайдов.**

## Промты для GPT Image

В каждом промте предполагается **префикс стиля** из [`../world-bible.md`](../world-bible.md):

> *Modern magical-academy illustration, 16:9, soft cell-shading with watercolour textures and faint sumi-e brush strokes. Style fusion of Studio Ghibli warmth and Sailor Moon brightness, Japanese and Chinese mythological motifs (white tiger Baihu, azure dragon Cinglong, beckoning cat Maneki-neko). Palette: deep blue #1E3A8A, silver moon #E2E8F0, sea teal #0EA5E9, scarlet bell #E11D48, lotus pink #F472B6, imperial gold #F59E0B, forest green #10B981. Friendly academic tone, no text in image, leave clean negative space for overlay.*

В файлах промт указан **после** этого префикса, обычно через `[style prefix]`.

## Соответствие MD ↔ PPTX

| Описание (MD) | Готовая презентация (.pptx) |
|---|---|
| `module-00/lesson-01-slides.md` | [`../slides/lesson-presentations/module-00/lesson-01-zal-chisel.pptx`](../slides/lesson-presentations/module-00/) |

Структура [`../slides/`](../slides/) **зеркальна** к этой папке.

## Связи

- **Конспекты уроков** → [`../lessons/`](../lessons/)
- **Методички** → [`../teacher-guides/`](../teacher-guides/)
- **Готовые .pptx** → [`../slides/`](../slides/)
- **Стилевод и палитра** → [`../world-bible.md`](../world-bible.md)
