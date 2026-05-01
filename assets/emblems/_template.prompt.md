# Emblem Template — общий каркас для всех 13 стадий

> Этот файл — **шаблон**. Конкретные стадии — `stage-NN.prompt.md`.

## Геометрия (всегда одинакова)

- Силуэт: серебряная (silver #E2E8F0) **окружность**.
- Внутри: **9 полумесяцев**, расположенных равномерно по кругу (каждый занимает 40°).
- Полумесяцы пронумерованы от 1 до 9 **по часовой стрелке начиная сверху**.
- Размер: 1024×1024, центрированная композиция, прозрачный фон.

## Состояние сегментов

| Стадия | Активные полумесяцы (горят цветом) | Неактивные (тусклые, серые) |
|---|---|---|
| stage-00 | — | 1..9 |
| stage-01 | 1 | 2..9 |
| stage-02 | 1, 2 | 3..9 |
| stage-03 | 1..3 | 4..9 |
| ... | ... | ... |
| stage-09 | 1..9 | — |

## Цвета активных полумесяцев (соответствие модулям)

| # | Модуль | Цвет |
|---|---|---|
| 1 | Сад Дробей | lotus pink #F472B6 |
| 2 | Простые | teal #0EA5E9 |
| 3 | Знаки | imperial gold #F59E0B |
| 4 | Весы | silver #E2E8F0 |
| 5 | Звёзды | scarlet #E11D48 |
| 6 | Треугольники | imperial gold #F59E0B |
| 7 | Долина | forest green #10B981 |
| 8 | Лабиринт | violet #7C3AED |
| 9 | Обсерватория | deep indigo #1E3A8A |

## Дополнительные элементы (extras)

- **stage-10**: добавляется **маленький белый перо-знак** в центре эмблемы (или сверху).
- **stage-11**: добавляется **маленький шестигранный кристалл-знак** (рядом с пером).
- **stage-12**: вокруг всей эмблемы — **алое кольцо** (Печать).

## Базовый промт (переиспользовать в каждом stage)

A soft hand-painted illustration in the spirit of Studio Ghibli warmth meets Sailor Moon brightness, with sumi-e ink accents. Watercolour glow. A close-up emblem on a deep indigo softly atmospheric background-ring (so the silver shines): a **silver circular medallion** ring with **nine evenly-spaced crescent-moon engravings** around its inner perimeter. <... здесь подставь стадию: какие полумесяцы горят и какими цветами + extras ...>. Centred composition, front view, slightly luminous aura. Clean minimal design, like a magical pocket watch. Soft glow.

Transparent background. No readable text, no logos, no signatures.

## Зачем 13 стадий

В каждом уроке можно показывать **прогресс** ученицы: «после прошлого финального урока эмблема выглядит так». Это **мотивация** — видеть, как заполняется круг.
