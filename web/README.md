# `web/` — Академия Девяти Лун — интерактивный сайт

> Интерактивная веб-версия курса. Astro 4 + React + Tailwind CSS.
> Деплой: **[9moons.30000.ru](https://9moons.30000.ru)** (на BCAI / Debian).

## Что это

Сайт читает **Markdown-уроки** из `../lessons/` и `../teacher-guides/` своего же репо и
рендерит их как **интерактивные страницы**.

Контент остаётся в Markdown — единственный источник истины. Сайт — это **инструмент
просмотра и интерактива**, не отдельная база.

## Текущая фаза: **Phase 0 — фундамент**

| Готово | Что |
|---|---|
| ✅ | Astro 4 + Tailwind + React + MDX + KaTeX |
| ✅ | Парсер уроков (читает `../lessons/module-NN/lesson-MM-*.md`) |
| ✅ | Карта мира с 13 островами (SVG) |
| ✅ | Эмблема Лены в углу (SVG, прогресс из localStorage) |
| ✅ | Страница урока со всеми блоками (сюжет, идея, задачи, Sphinx, English, домашка, ответы) |
| ✅ | Страницы прогресса и коллекции (заглушки → Phase 3) |
| ✅ | nginx-конфиг + deploy-скрипт |
| ⏳ | Phase 1: дизайн карты, переходы, мобайл |
| ⏳ | Phase 2: интерактивные виджеты задач |

## Запуск

### Зависимости

- Node.js ≥ 20
- pnpm (рекомендуется) или npm

### Установка

```bash
cd web
pnpm install
```

### Разработка

```bash
pnpm dev
# открой http://localhost:4321
```

При первом запуске Astro прочитает все ~183 урока из `../lessons/` и пр规генерирует страницы.

### Сборка

```bash
pnpm build
# готовая статика в ./dist/
```

### Деплой на 9moons.30000.ru

```bash
pnpm run deploy
# ИЛИ: bash deploy/deploy.sh
```

См. подробности в [`deploy/README.md`](deploy/README.md).

## Структура

```
web/
├── astro.config.mjs              ← конфиг Astro (output: static)
├── tailwind.config.ts            ← палитра курса (9m-indigo, 9m-silver, ...)
├── tsconfig.json                 ← path aliases @/, @lib/, @components/
├── package.json
│
├── public/                       ← статика как есть
│   └── favicon.svg
│
├── src/
│   ├── styles/globals.css        ← Tailwind + кастомные классы (paper, badge-*, sumi-divider)
│   │
│   ├── data/world.ts             ← 13 модулей, 13 хранителей, 12 артефактов, 13 локаций
│   │
│   ├── lib/
│   │   ├── types.ts              ← Lesson, Task, TaskSection, Difficulty, ...
│   │   ├── parse-lesson.ts       ← читает ../lessons/*.md, возвращает Lesson
│   │   └── progress.ts           ← localStorage-обёртка (loadProgress, emblemStage, ...)
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro      ← header, footer, EmblemCorner
│   │
│   ├── components/
│   │   ├── world/
│   │   │   ├── WorldMap.astro    ← SVG-карта 13 островов
│   │   │   └── EmblemCorner.astro ← эмблема в правом нижнем углу
│   │   └── lesson/
│   │       ├── LessonView.astro     ← главный шаблон страницы урока
│   │       ├── DifficultyBadge.astro ← ★/★★/★★★/★★★★
│   │       └── Markdown.astro       ← inline-рендер MD (для блоков из урока)
│   │
│   └── pages/
│       ├── index.astro              ← карта мира
│       ├── module/[mid].astro       ← страница модуля + список уроков
│       ├── lesson/[mid]/[lid].astro ← страница урока
│       ├── progress.astro           ← прогресс (заглушка → Phase 6)
│       ├── collection.astro         ← артефакты
│       └── teacher/index.astro      ← учительский кабинет (заглушка → Phase 5)
│
└── deploy/
    ├── nginx.conf                ← готовая конфигурация для 9moons.30000.ru
    ├── deploy.sh                 ← rsync-скрипт
    └── README.md                 ← пошаговая инструкция первичной настройки сервера
```

## Палитра

Берётся из `../assets/prompts/colour-palette.md` и зашита в `tailwind.config.ts`:

```
9m-indigo   #1E3A8A   фон / ночь
9m-silver   #E2E8F0   текст / Цукико / эмблема
9m-teal     #0EA5E9   формулы
9m-scarlet  #E11D48   Сэйрин / Печать
9m-lotus    #F472B6   Хана
9m-gold     #F59E0B   Sphinx / ★★★★
9m-forest   #10B981   Цинлун / природа
9m-charcoal #0F172A   Куро / текст
9m-crimson  #7F1D1D   Алая Луна (Модуль 12)
```

## Прогресс ученика

Хранится **в localStorage** под ключом `9moons.progress.v1`:

```ts
{
  lessons: { "8.12": { solvedCount, totalCount, percent, lastVisited, completed } },
  modules: { "8": { completed: true, completedAt: "..." } },
  currentLesson: { moduleId: 8, lessonId: 12 }
}
```

Эмблема в углу автоматически загорается по мере прохождения модулей
(см. `src/components/world/EmblemCorner.astro`).

## Дальше (Phase 1+)

- 🎨 **Phase 1**: оживить карту мира (hover-эффекты, sumi-e декор), мобильная адаптация.
- 🧮 **Phase 2**: интерактивные виджеты — `NumericInput`, `MultipleChoice`, `FractionVisual`.
- 🌙 **Phase 3**: настоящая анимация эмблемы при завершении модуля.
- 📊 **Phase 4**: сложные виджеты — координатная плоскость, парабола, дерево вероятностей.
- 👩‍🏫 **Phase 5**: дневник учителя.

## Известные ограничения Phase 0

- Парсер уроков **не идеален** для уроков, в которых таблицы внутри задач — таблицы не рендерятся в `Markdown.astro`. Решим в Phase 2.
- Inline-формулы (`$...$`) рендерит KaTeX-runtime на клиенте, не SSR. Чуть медленнее, но проще.
- Нет авторизации — всё публично, прогресс на устройстве пользователя.
- Нет PDF-сертификата — Phase 6.

## Лицензия

Авторский курс для конкретной ученицы (Лена). См. корневой `../README.md`.
