# Style Prefix — каноническая «обёртка» для всех промтов

Этот префикс **должен предшествовать** каждому промту в `assets/`. Он обеспечивает **визуальное единство** всех 500+ изображений курса.

## Канонический префикс (RU + EN)

### Полная версия (для лоадеров типа GPT Image, DALL·E 3)

```
A soft hand-painted illustration in the spirit of Studio Ghibli warmth meets Sailor Moon brightness, with subtle East-Asian sumi-e ink accents. Watercolour textures, gentle cel-shading, dreamy atmospheric lighting. Palette: deep indigo #1E3A8A, silver #E2E8F0, teal #0EA5E9, scarlet #E11D48, lotus pink #F472B6, imperial gold #F59E0B, forest green #10B981, charcoal #0F172A on milky white #F8FAFC. Composition: clean, airy, with negative space. No readable text, no logos, no signatures, no captions, no UI elements.
```

### Короткая версия (для Midjourney v6+)

```
soft Ghibli-Sailor Moon hybrid, watercolour + sumi-e ink accents, palette of deep indigo, silver, teal, scarlet, lotus pink, imperial gold, forest green; airy composition, no text --style raw --ar 1:1
```

## Правила

### Всегда
- Тёплая мягкая подсветка («golden hour» / лунный свет).
- Аккуратный **cel-shading** + **акварельные подложки**.
- **Sumi-e** штрихи на контурах (особенно на фонах).
- **Симметричная** или **уравновешенная** композиция.
- **Negative space** — не «забивать» кадр.

### Никогда
- ❌ Текст, надписи, логотипы, водяные знаки.
- ❌ Перья, ангелочки, сердечки, эмодзи.
- ❌ «Сахарный» chibi-стиль с гипертрофированными глазами.
- ❌ Гипер-реализм, фотореализм, 3D-рендер.
- ❌ Кровь, насилие, мрачные сцены.
- ❌ Гендерные стереотипы.
- ❌ Случайные западные сказочные мотивы (драконы Disney и т.п.).

## Формат финального промта

Каждый файл `*.prompt.md` имеет структуру:

```markdown
# <id> — <название>

**Категория:** characters | artifacts | locations | emblems
**Используется в:** список модулей/уроков
**Размер:** 1024×1024 / 1920×1080
**Фон:** прозрачный / сплошной

## Промт (final)

[STYLE PREFIX]

<специфичная часть про этого героя/артефакт/локацию>

## Заметки

- варианты позы / цвета / угла
- что попробовать, если выйдет плохо
```

## Версионирование

При изменении префикса — **bump** версии в этом файле:

| Версия | Дата | Изменение |
|---|---|---|
| v1.0 | 2026-05 | Первая каноническая версия |

При смене префикса **не перегенерируем** старые ассеты — они остаются в v1.0 для консистентности.
