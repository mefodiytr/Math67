# Batch 03 — Moon Stones + Feather (×10)

9 Лунных Камней (по одному на модуль 1..9) + Перо Адепта.

| # | id | Файл назначения |
|---|---|---|
| 1 | moon-stone-01-fractions | `artifacts/moon-stone-01-fractions.png` |
| 2 | moon-stone-02-primes | `artifacts/moon-stone-02-primes.png` |
| 3 | moon-stone-03-signs | `artifacts/moon-stone-03-signs.png` |
| 4 | moon-stone-04-balance | `artifacts/moon-stone-04-balance.png` |
| 5 | moon-stone-05-stars | `artifacts/moon-stone-05-stars.png` |
| 6 | moon-stone-06-triangles | `artifacts/moon-stone-06-triangles.png` |
| 7 | moon-stone-07-valley | `artifacts/moon-stone-07-valley.png` |
| 8 | moon-stone-08-labyrinth | `artifacts/moon-stone-08-labyrinth.png` |
| 9 | moon-stone-09-observatory | `artifacts/moon-stone-09-observatory.png` |
| 10 | feather-of-adept | `artifacts/feather-of-adept.png` |

---

## Mega-prompt (sheet mode)

```
A unified artifact reference sheet, arranged as a clean 5×2 grid (5 columns, 2 rows), on a deep indigo #1E3A8A atmospheric background with subtle dark hairline borders separating each cell. All ten artifacts illustrated in the SAME ART STYLE: soft hand-painted Studio Ghibli warmth meets Sailor Moon brightness, watercolour glow, sumi-e ink accents, magical luminescent quality. Each artifact centred in its cell, hovering slightly with soft auras, no captions, no text, no labels. Each artifact is small, polished, and clearly readable as a magical token.

Cell 1 — MOON STONE OF FRACTIONS: a smooth half-sphere drop-shaped stone, polished translucent rose-quartz pink, with delicate sumi-e brushstroke patterns of cherry-blossom petals frozen inside as if suspended. Soft pink-and-gold aura.

Cell 2 — MOON STONE OF PRIMES: a perfectly cut octahedron crystal (eight triangular faces), translucent teal and deep indigo with softly glowing inner core. Tiny silver pinpoints of light scattered inside like prime stars. Soft cyan aura.

Cell 3 — MOON STONE OF SIGNS: a polished sphere of warm amber-gold colour with a single elegant sumi-e brushstroke forming the italic letter x etched on its surface, glowing with soft inner teal light. Faint golden aura.

Cell 4 — MOON STONE OF BALANCE: a polished lotus-shaped stone weight in silver with subtle indigo veining, five symmetrical lotus-petal segments rising from a circular base, joining at a small point on top. Soft silver-lunar aura suggesting perfect balance.

Cell 5 — MOON STONE OF STARS: an eight-pointed star (octogram) gem, faceted like a precious stone, glowing with deep scarlet inner light, subtle golden halo, each of the 8 points slightly tapered. Tiny golden star-sparkles around it.

Cell 6 — MOON STONE OF TRIANGLES: a polished tetrahedron (four equilateral triangle faces), translucent gold with forest-green inner glow, subtle Pythagorean triangle pattern visible on one face. Soft golden aura.

Cell 7 — MOON STONE OF THE VALLEY: a polished cube with subtly cracked surfaces (looking like measurement lines, not damage), translucent forest green with teal inner glow, faint sumi-e brushstroke measurement marks on each face. Soft green-teal aura.

Cell 8 — MOON STONE OF THE LABYRINTH: a stone shaped like a fork in a path — small Y-shaped stone with three smooth rounded ends, translucent violet-purple with subtle inner amber lantern glow, sumi-e ink swirls suggesting branching paths. Soft violet-amber aura.

Cell 9 — MOON STONE OF THE OBSERVATORY: a seven-pointed star (heptagram) gem with each point slightly different in size suggesting a radar-chart shape, translucent indigo-and-silver with cool inner glow. Tiny silver star-sparkles around it.

Cell 10 — FEATHER OF THE ADEPT: a single elegant white feather, long and slender, with delicate barbs catching soft moonlight. Along the central shaft, NINE evenly-spaced tiny silver crescent-moon marks glow softly. Tip of the feather faintly luminous as if dipped in starlight ink. Vertical orientation, slight tilt.

Maintain identical style, lighting, line weight and luminescent quality across all 10 cells. Each artifact has a transparent or near-transparent background within its cell so it can be cropped easily. No readable text anywhere.
```

---

## Sequential prompts (×10)

Style prefix: `soft hand-painted Studio Ghibli x Sailor Moon, watercolour glow, sumi-e accents, magical luminescent token, transparent background, no text --ar 1:1 --style raw`

```
1. A small magical artifact: a smooth half-sphere drop-shaped stone, polished translucent rose-quartz pink, with delicate sumi-e brushstroke patterns of cherry-blossom petals frozen suspended inside. Soft pink-and-gold aura. Centred composition, hovering slightly. Transparent background. [STYLE PREFIX]

2. A small magical artifact: a perfectly cut octahedron crystal with eight triangular faces, translucent teal and deep indigo, softly glowing inner core, tiny silver pinpoints scattered inside like prime stars. Soft cyan aura. Centred composition, hovering. Transparent background. [STYLE PREFIX]

3. A small magical artifact: a polished sphere of warm amber-gold with a single elegant sumi-e brushstroke forming the italic letter x etched on the surface, glowing with soft inner teal light. Faint golden aura. Centred. Transparent background. [STYLE PREFIX]

4. A small magical artifact: a polished lotus-shaped stone weight in silver with subtle indigo veining, five symmetrical lotus-petal segments rising from a circular base joining at a small point on top. Soft silver-lunar aura. Centred. Transparent background. [STYLE PREFIX]

5. A small magical artifact: an eight-pointed octogram star gem, faceted, glowing with deep scarlet inner light, subtle golden halo, each point slightly tapered. Tiny golden star-sparkles around it. Front view, centred. Transparent background. [STYLE PREFIX]

6. A small magical artifact: a polished tetrahedron with four equilateral triangle faces, translucent gold with forest-green inner glow, subtle Pythagorean triangle pattern on one face. Soft golden aura. Centred, slight rotation showing three faces. Transparent background. [STYLE PREFIX]

7. A small magical artifact: a polished cube with subtly cracked surfaces (lines look like measurement marks not damage), translucent forest green with teal inner glow, sumi-e brushstroke measurement marks on each face. Soft green-teal aura. Centred. Transparent background. [STYLE PREFIX]

8. A small magical artifact: a Y-shaped fork-of-paths stone with three smooth rounded ends, translucent violet-purple with subtle inner amber lantern glow, sumi-e ink swirls suggesting branching paths. Soft violet-amber aura. Centred. Transparent background. [STYLE PREFIX]

9. A small magical artifact: a seven-pointed heptagram star gem with each point slightly different in size suggesting a radar chart, translucent indigo-and-silver with cool inner glow. Tiny silver star-sparkles around it. Front view, centred. Transparent background. [STYLE PREFIX]

10. A single elegant white feather, long and slender, vertical orientation slightly tilted, delicate barbs catching soft moonlight, with NINE evenly-spaced tiny silver crescent-moon marks glowing softly along the central shaft. Tip of feather faintly luminous as if dipped in starlight ink. Soft silver-indigo aura. Transparent background. [STYLE PREFIX]
```

---

## После генерации

См. [batch-01](batch-01-characters-main.md#после-генерации). Все 10 артефактов кладутся в `assets/artifacts/`.
