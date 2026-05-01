# `layouts/` — шаблоны композиции

Шаблоны для **сборки** финальных артефактов из атомов.

## Структура

```
layouts/
├── slide/                ← шаблоны слайдов (Slidev / Marp / HTML)
│   ├── title-hero.html
│   ├── concept-explain.html
│   ├── formula-card.html
│   ├── sphinx-challenge.html
│   ├── english-block.html
│   └── artifact-reveal.html
├── book-page/            ← шаблоны страниц книги (Typst)
│   ├── chapter-opener.typ
│   ├── lesson-spread.typ
│   └── solutions-page.typ
├── handout/              ← раздатки (Typst)
│   ├── methodology-card.typ
│   └── homework-sheet.typ
└── poster/               ← постеры и сертификаты (Typst)
    ├── felicia-map.typ
    └── certificate.typ
```

## Принципы шаблонов

1. **Параметризованы**: получают данные из YAML-манифеста.
2. **Используют атомы**: ссылаются на `../assets/...`.
3. **Отделены от контента**: дизайн меняется без правок уроков.

## Пример (slide/title-hero.html — концепт)

```html
<section class="slide" data-layout="title-hero">
  <img src="{{background}}" class="bg" />
  {{#characters}}
  <img src="{{img}}" class="char {{position}}" />
  {{/characters}}
  <h1 class="title">{{title}}</h1>
</section>
```

## Пример (book-page/lesson-spread.typ — концепт)

```typst
#let lesson-spread(lesson) = [
  #page-break()
  = #lesson.title
  
  #grid(columns: (1fr, 1fr),
    [
      #image("../assets/locations/" + lesson.location + ".png")
      #lesson.story
    ],
    [
      == Идея
      #lesson.idea
      == Задачи
      #for task in lesson.tasks [#task]
    ]
  )
]
```

## Стек инструментов

| Формат | Шаблон | Чем рендерится |
|---|---|---|
| Слайды HTML | `slide/*.html` | **Slidev** или **Marp** |
| Слайды PDF | то же | через тот же инструмент |
| Книга PDF | `book-page/*.typ` | **Typst** |
| Раздатки | `handout/*.typ` | **Typst** |
| Постеры | `poster/*.typ` | **Typst** |

## Зачем разделять

При смене дизайна (например, новый бренд / другой язык / печать на A5 вместо A4) нужно поменять **только шаблоны**, не трогая ни уроков, ни атомов.
