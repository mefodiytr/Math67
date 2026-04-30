# Презентация — Модуль 2. Делимость, простые числа и теория чисел

**Формат:** 16:9, 12 слайдов, ~30 минут.
**Префикс стиля:** см. `README.md`.

---

## Слайд 1 — Титул

**Описание:** обложка с темой числа.

**Текст:**
> **Модуль 2**
> Делимость, простые числа и теория чисел.
> *Скрытая структура любого числа.*

**Инфографика:** большая стилизованная цифра «60», под ней — дерево факторизации с ветвями (2, 2, 3, 5).

**Стиль:** глубокий синий фон, цветные узлы дерева.

**Промт GPT Image:**
> *[style prefix] Cover illustration: a large stylised number "60" at the top half. Beneath it, a clean factor tree with branches splitting into smaller circles, each circle labelled with a placeholder digit (2, 2, 3, 5). The branches are thin teal lines, each leaf circle a different palette colour. Deep blue background, no extra text, leave the top third clear.*

---

## Слайд 2 — Цели модуля

**Текст:**
> **К концу модуля ты:**
> – знаешь признаки делимости от 2 до 11;
> – находишь НОД и НОК уверенно;
> – работаешь с остатками;
> – доказываешь простые утверждения о числах.

**Инфографика:** четыре «значка-достижения» (медальки) в ряд.

**Стиль:** иконки контурные, цвет — переход от синего к фиолетовому.

**Промт GPT Image:**
> *[style prefix] Four flat-design achievement medals arranged horizontally on a white background. Each medal is a different palette colour with a thin ribbon, and a small unique outline icon at the centre: a divisibility symbol, two intersecting circles, a remainder dot, a quill writing a check. Soft drop shadows, rounded shapes, no text.*

---

## Слайд 3 — Что такое делимость

**Текст:**
> **Делимость**
> Число *a* делится на *b*, если *a = b · k* для некоторого целого *k*.
> Без остатка.
> *«b делит a»* = *b ∣ a*.

**Инфографика:** ряд из *a* кружков, разбитый на *k* групп по *b*.

**Стиль:** мягкие пастельные кружки, чёткие группировки.

**Промт GPT Image:**
> *[style prefix] A neat horizontal arrangement of small soft pastel circles grouped into 4 equal clusters of 3 circles each, separated by gentle vertical dividers. Above the row, two thin curly bracket lines highlight one cluster as the "group". White background, modern educational infographic tone, no text.*

---

## Слайд 4 — Признаки делимости

**Описание:** шпаргалка-таблица.

**Текст:**
> **Признаки делимости**
> На 2 — последняя цифра чётная.
> На 3 — сумма цифр делится на 3.
> На 4 — последние 2 цифры делятся на 4.
> На 5 — оканчивается на 0 или 5.
> На 9 — сумма цифр делится на 9.
> На 11 — знакочередующая сумма цифр делится на 11.

**Инфографика:** табличка-«меню» с эмодзи-иконками для каждой строки (но без эмодзи — стилизованные значки).

**Стиль:** карточки-«бейджи» с числом 2, 3, 4, 5, 9, 11.

**Промт GPT Image:**
> *[style prefix] A vertical stack of six small badges on a clean white card. Each badge is a coloured circle with a different palette colour, and to the right of each is a thin horizontal divider line. The card has rounded corners and a soft shadow. No text inside the badges — leave space for digit overlays.*

---

## Слайд 5 — Простые и составные

**Текст:**
> **Простое vs составное**
> *Простое:* делится только на 1 и на себя (≥ 2).
> *Составное:* у него есть «не такие» делители.
> 1 — **не простое и не составное**.

**Инфографика:** «решето Эратосфена» 1–30: простые подсвечены, составные перечёркнуты.

**Стиль:** клетка-сетка 5×6, выделение цветом.

**Промт GPT Image:**
> *[style prefix] A clean 5x6 grid of identical small rounded squares on a white background. Some squares are filled with a soft teal colour and have a thin glow (these are "highlighted"); others are pale grey with a faint diagonal line through them. Modern educational infographic style, no digits inside the squares.*

---

## Слайд 6 — Разложение на множители

**Текст:**
> **Каждое натуральное число > 1 раскладывается на простые единственным способом.**
> *Основная теорема арифметики.*
> 360 = 2³ · 3² · 5.

**Инфографика:** дерево факторизации для 360 — 360 → (8, 45) → (2,4) (9,5) → (2,2,2,3,3,5).

**Стиль:** дерево с круглыми узлами, листья — простые числа в особом цвете.

**Промт GPT Image:**
> *[style prefix] A stylised factor tree starting from a single large circle at the top, branching down into pairs of smaller circles, then splitting again until the bottom row of small leaf circles. The leaf circles are a brighter teal accent; intermediate circles are deep blue outlines; branches are thin lines. White background, no readable digits inside circles.*

---

## Слайд 7 — НОД и НОК

**Текст:**
> **НОД** — наибольший общий делитель.
> **НОК** — наименьшее общее кратное.
> Связь: **НОД(a,b) · НОК(a,b) = a · b**.

**Инфографика:** диаграмма Венна с двумя пересекающимися кругами «делители 24» и «делители 36», в пересечении — общий делитель; рядом — линия с метками кратных.

**Стиль:** Venn-диаграмма + числовая прямая.

**Промт GPT Image:**
> *[style prefix] Two large overlapping circles (Venn diagram) on a white background, with the overlap area highlighted in a soft teal tint. Below the Venn diagram, a horizontal number line with evenly spaced tick marks and three small filled dots that mark common multiples. Friendly modern infographic style, no text.*

---

## Слайд 8 — Остатки

**Текст:**
> **Остаток — это память числа.**
> 17 = 5 · 3 + 2 → остаток 2.
> Остатки от деления на *n* образуют **цикл**:
> 0, 1, 2, …, n−1, 0, 1, 2, …

**Инфографика:** круговой циферблат с делениями 0–4 (для делителя 5), стрелка указывает на 2.

**Стиль:** «часы остатков».

**Промт GPT Image:**
> *[style prefix] A modern minimalistic clock-like circular dial with 5 evenly spaced tick marks around the perimeter (no numbers shown). A single thin teal arrow points outward from the centre toward one of the marks. Soft drop shadow, white background, modern educational tone.*

---

## Слайд 9 — Последняя цифра степени

**Текст:**
> **Last digit trick**
> 7¹ → 7,  7² → 9,  7³ → 3,  7⁴ → 1.
> Цикл длины 4.
> 7²⁰²⁶ → остаток 2 от деления 2026 на 4 → последняя цифра **9**.

**Инфографика:** круговая диаграмма-цикл: 7 → 9 → 3 → 1 → 7.

**Стиль:** замкнутая стрелочная петля.

**Промт GPT Image:**
> *[style prefix] A circular cycle diagram with four equally spaced nodes connected by thin curved arrows in a clockwise loop. Each node is a soft pastel circle in different palette colours (deep blue, teal, mint, violet). White background, clean modern educational style, no text inside the nodes.*

---

## Слайд 10 — Cambridge English

**Текст:**
> **Vocabulary**
> *factor, multiple, prime, composite,*
> *common factor, common multiple,*
> *highest common factor (HCF),*
> *lowest common multiple (LCM),*
> *remainder, divisible by, prime factorisation.*

**Инфографика:** карточка-словарик в виде «приложения» с переключателем RU/EN.

**Стиль:** UI-card.

**Промт GPT Image:**
> *[style prefix] A clean modern UI card resembling a vocabulary app screen, with a small RU/EN toggle switch in the top-right corner. The body of the card has horizontal placeholder lines (no readable text) suggesting a list. Soft shadows, rounded corners, deep blue title bar, white body. Educational app aesthetic.*

---

## Слайд 11 — Challenge

**Текст:**
> **Challenge**
> Докажи, что *n³ − n* делится на 6 для любого целого *n*.
> *Подсказка:* распиши как *n(n−1)(n+1)*.

**Инфографика:** три последовательных кубика, на них *n−1, n, n+1*; стрелка на «6».

**Стиль:** изометрические кубики.

**Промт GPT Image:**
> *[style prefix] Three identical isometric cubes lined up in a row, each in a slightly different teal-to-violet gradient. Above the cubes, a thin curly bracket joins them. To the right, a softly glowing badge with the digit 6 printed crisply in deep blue. Clean white background, soft shadows.*

---

## Слайд 12 — Итоги

**Текст:**
> **Итоги модуля**
> ✓ Признаки делимости — в кармане.
> ✓ НОД / НОК — как инструмент.
> ✓ Остатки — твой новый рычаг.
> ✓ Первое настоящее доказательство.

**Инфографика:** рюкзак с торчащими «инструментами» (циркуль, линейка, маленькое дерево факторизации, циферблат остатков).

**Стиль:** дружелюбный итоговый кадр.

**Промт GPT Image:**
> *[style prefix] A flat-design backpack with several abstract math "tools" peeking out: a small factor tree, a tiny circular remainders dial, a ruler, a compass. Cream and teal palette, white background, soft drop shadow, friendly educational tone, no text.*

---

## Технические заметки

- Слайд 9 (циклы) — особенно важен; разрешается «оживить» анимированной стрелкой в реальном показе.
- Слайд 11 — для разбора задачи отвести 7–10 минут.
