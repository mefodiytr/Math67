# slides/ — готовые презентации (.pptx)

Здесь лежат **бинарные** PowerPoint-презентации, собранные по описаниям из MD-файлов.

## Структура

```
slides/
├── README.md
├── presentations/                  ← обзорные презентации модулей
│   └── 00-diagnostics.pptx
└── lesson-presentations/           ← презентации по урокам
    └── module-00/
        └── lesson-01-zal-chisel.pptx
```

Структура **зеркальна** структуре MD-описаний — так пары находятся быстро.

## Что уже готово

| Готовый .pptx | Описание (MD) |
|---|---|
| [`presentations/00-diagnostics.pptx`](presentations/00-diagnostics.pptx) | [`../presentations/00-diagnostics-slides.md`](../presentations/00-diagnostics-slides.md) |
| [`lesson-presentations/module-00/lesson-01-zal-chisel.pptx`](lesson-presentations/module-00/lesson-01-zal-chisel.pptx) | [`../lesson-presentations/module-00/lesson-01-slides.md`](../lesson-presentations/module-00/lesson-01-slides.md) |

## Соответствие MD ↔ PPTX

| Что описывает MD | Куда кладём PPTX |
|---|---|
| Обзорная презентация модуля | `slides/presentations/NN-slug.pptx` |
| Презентация урока | `slides/lesson-presentations/module-NN/lesson-MM-slug.pptx` |

Базовое имя `.pptx` соответствует **имени MD без суффикса `-slides`**.

| MD | PPTX |
|---|---|
| `presentations/00-diagnostics-slides.md` | `slides/presentations/00-diagnostics.pptx` |
| `lesson-presentations/module-00/lesson-01-slides.md` | `slides/lesson-presentations/module-00/lesson-01-zal-chisel.pptx` |

> Имя `.pptx` для урока соответствует базовому имени файла из [`../lessons/module-NN/`](../lessons/) (например, `lesson-01-zal-chisel.md` → `lesson-01-zal-chisel.pptx`).

## Как добавлять новые

Когда готова новая презентация:

1. Положи `.pptx` в **зеркальный путь** к её MD-описанию.
2. Назови файл по slug урока (например, `lesson-02-sad-drobei.pptx`).
3. Обнови таблицу в этом README (раздел «Что уже готово»).
4. Закоммить:

```bash
git add slides/
git commit -m "Add PPTX: <название урока>"
```

## Размеры

Презентации содержат сгенерированные изображения и могут весить 10–30 МБ. Это нормально для git и push, но:

- если репозиторий разрастётся свыше нескольких сотен МБ, имеет смысл включить **git LFS** для `*.pptx`;
- настройка LFS делается одной командой: `git lfs track "*.pptx"`;
- лимит файла в git без LFS — около 100 МБ (мягкий лимит на GitHub).

## Связи

- **MD-описания** обзорных презентаций → [`../presentations/`](../presentations/)
- **MD-описания** поурочных презентаций → [`../lesson-presentations/`](../lesson-presentations/)
- **Стилевод** для изображений → [`../world-bible.md`](../world-bible.md)
