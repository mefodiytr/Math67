# Batch 04 — Crystal + Seal + 8 Emblem stages 00..07 (×10)

Кристалл Аксиом, Печать Адепта и первые 8 стадий эмблемы (от пустой до 7 Лун).

| # | id | Файл назначения |
|---|---|---|
| 1 | crystal-of-axioms | `artifacts/crystal-of-axioms.png` |
| 2 | seal-of-adept | `artifacts/seal-of-adept.png` |
| 3 | emblem-stage-00 | `emblems/stage-00.png` |
| 4 | emblem-stage-01 | `emblems/stage-01.png` |
| 5 | emblem-stage-02 | `emblems/stage-02.png` |
| 6 | emblem-stage-03 | `emblems/stage-03.png` |
| 7 | emblem-stage-04 | `emblems/stage-04.png` |
| 8 | emblem-stage-05 | `emblems/stage-05.png` |
| 9 | emblem-stage-06 | `emblems/stage-06.png` |
| 10 | emblem-stage-07 | `emblems/stage-07.png` |

---

## Mega-prompt (sheet mode)

```
A unified emblem-and-artifact reference sheet, arranged as a clean 5×2 grid (5 columns, 2 rows), on a deep indigo #1E3A8A atmospheric background with subtle dark hairline borders separating each cell. All ten artifacts in the SAME ART STYLE: soft hand-painted Studio Ghibli warmth meets Sailor Moon brightness, watercolour glow, sumi-e ink accents, magical luminescent quality. Each item centred in its cell, hovering slightly. No captions, no text, no labels.

Cell 1 — CRYSTAL OF AXIOMS: a perfectly cut hexagonal prism crystal (six rectangular faces, two hexagonal ends), pure transparent quartz refracting soft light. Inside, faintly visible thin sumi-e brushstrokes forming abstract logical symbols (∀, ⇒, ¬), blurred and dreamlike. Subtle prismatic light scatter around it.

Cell 2 — SEAL OF THE ADEPT (the grand final emblem): a softly glowing silver circular medallion. Inside the silver ring — 9 evenly-spaced crescent-moon engravings glowing in different colours (lotus pink, teal, gold, silver, scarlet, gold, green, violet, indigo). Above the moons — a small white feather mark. To the side — a tiny six-faceted crystal mark. AROUND the entire silver ring — a glowing crimson ring (the Seal proper) with soft fiery aura.

Cell 3 — EMBLEM STAGE 00 (empty): a polished silver circular medallion with NO active engravings yet. 9 evenly-spaced faint crescent-moon outlines etched as silhouettes only, barely visible in matte silver. Subtle silver shimmer around the medallion.

Cell 4 — EMBLEM STAGE 01: same silver medallion, but the FIRST crescent (12-o'clock position, position 1) glows softly with lotus pink #F472B6 light. Other 8 are tarnished silver, faint. Soft pink-silver aura.

Cell 5 — EMBLEM STAGE 02: same medallion. TWO crescents glow: position 1 lotus pink, position 2 teal #0EA5E9. Other 7 tarnished. Soft pink-teal aura.

Cell 6 — EMBLEM STAGE 03: same medallion. THREE crescents glow: 1-pink, 2-teal, 3-imperial gold #F59E0B. Other 6 tarnished. Mixed aura.

Cell 7 — EMBLEM STAGE 04: same medallion. FOUR glow: 1-pink, 2-teal, 3-gold, 4-bright silver. Other 5 tarnished. Soft lunar aura.

Cell 8 — EMBLEM STAGE 05: same medallion. FIVE glow: 1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet #E11D48. Other 4 tarnished. Subtle scarlet-gold aura.

Cell 9 — EMBLEM STAGE 06: same medallion. SIX glow: 1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet, 6-warm gold. Other 3 tarnished. Warm golden aura.

Cell 10 — EMBLEM STAGE 07: same medallion. SEVEN glow: 1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet, 6-gold, 7-forest green #10B981. Other 2 tarnished. Rich multi-colour aura.

The 9 crescent-moon positions on the medallion are arranged equally around the inner perimeter (40° apart), starting at 12-o'clock and going clockwise. Each crescent has a fixed module-colour assignment (1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet, 6-gold, 7-green, 8-violet, 9-indigo), so each stage of the emblem looks like a sequential progression. Maintain identical medallion design, lighting and silver ring across all 8 emblem cells.

Transparent or near-transparent backgrounds within each cell. No readable text anywhere.
```

---

## Sequential prompts (×10)

Style prefix: `soft hand-painted Studio Ghibli x Sailor Moon, watercolour glow, sumi-e accents, magical luminescent token, transparent background, no text --ar 1:1 --style raw`

```
1. A perfectly cut hexagonal prism crystal with six rectangular faces and two hexagonal ends, pure transparent quartz refracting soft light, faintly visible thin sumi-e brushstrokes inside forming abstract logical symbols, blurred dreamlike. Subtle prismatic light scatter. Centred composition, hovering, three-quarters view. Transparent background. [STYLE PREFIX]

2. The grand final emblem: silver circular medallion with 9 evenly-spaced crescent-moon engravings glowing in 9 different module colours (lotus pink, teal, gold, silver, scarlet, gold, green, violet, indigo); a small white feather mark above the centre; a tiny six-faceted crystal mark opposite the feather; AROUND the entire silver ring a glowing crimson ring with soft fiery aura. Centred, front view. Transparent background. [STYLE PREFIX]

3. A silver circular medallion seen from front, polished silver but inner area empty: 9 evenly-spaced faint crescent-moon outlines etched as silhouettes only, barely visible in matte silver. Subtle silver shimmer. Centred. Transparent background. [STYLE PREFIX]

4. A silver circular medallion with 9 crescent-moon engravings around inner perimeter; the FIRST crescent (top, position 1) glows softly with lotus pink light; other 8 crescents tarnished silver and barely visible. Soft pink-silver aura. Centred. Transparent background. [STYLE PREFIX]

5. Silver circular medallion with 9 crescents; TWO glow: position 1 lotus pink, position 2 teal; other 7 tarnished silver. Soft pink-teal aura. Centred. Transparent background. [STYLE PREFIX]

6. Silver circular medallion with 9 crescents; THREE glow: 1-pink, 2-teal, 3-imperial gold; other 6 tarnished. Mixed aura. Centred. Transparent background. [STYLE PREFIX]

7. Silver circular medallion with 9 crescents; FOUR glow: 1-pink, 2-teal, 3-gold, 4-bright silver; other 5 tarnished. Soft lunar aura. Centred. Transparent background. [STYLE PREFIX]

8. Silver circular medallion with 9 crescents; FIVE glow: 1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet; other 4 tarnished. Scarlet-gold aura. Centred. Transparent background. [STYLE PREFIX]

9. Silver circular medallion with 9 crescents; SIX glow: 1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet, 6-warm gold; other 3 tarnished. Warm golden aura. Centred. Transparent background. [STYLE PREFIX]

10. Silver circular medallion with 9 crescents; SEVEN glow: 1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet, 6-gold, 7-forest green; other 2 tarnished. Rich multi-colour aura. Centred. Transparent background. [STYLE PREFIX]
```

---

## После генерации

См. [batch-01](batch-01-characters-main.md#после-генерации). Crystal/Seal → `assets/artifacts/`. Emblems → `assets/emblems/`.
