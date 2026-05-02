# Batch 02 — Characters Extras (×10)

3 оставшихся персонажа + 7 альтернативных поз для самых частых героев.

| # | id | Файл назначения |
|---|---|---|
| 1 | sphinx | `characters/sphinx/sphinx-base.png` |
| 2 | kitsune | `characters/kitsune/kitsune-base.png` |
| 3 | tanuki | `characters/tanuki/tanuki-base.png` |
| 4 | lena-thinking | `characters/lena/lena-thinking.png` |
| 5 | lena-victory | `characters/lena/lena-victory.png` |
| 6 | tsukiko-pointing | `characters/tsukiko/tsukiko-pointing.png` |
| 7 | kuro-explain | `characters/kuro/kuro-explain.png` |
| 8 | cinglong-coiled | `characters/cinglong/cinglong-coiled.png` |
| 9 | hana-flying | `characters/hana/hana-flying.png` |
| 10 | sphinx-front | `characters/sphinx/sphinx-front.png` |

---

## Mega-prompt (sheet mode)

```
A unified character reference sheet, arranged as a clean 5×2 grid (5 columns, 2 rows), on a milky white #F8FAFC background with subtle hairline borders. All ten illustrations in the SAME ART STYLE: soft hand-painted Studio Ghibli warmth meets Sailor Moon brightness, gentle cel-shading, watercolour textures, sumi-e ink accents. Palette: deep indigo #1E3A8A, silver #E2E8F0, imperial gold #F59E0B, scarlet #E11D48, milky white #F8FAFC, browns. Each centred in cell, no captions, no text, no labels.

Cell 1 — SPHINX HATOR: a regal Egyptian sphinx-cat in classic recumbent pose with paws extended forward, sleek golden-tan fur with subtle hieroglyph-like sumi-e patterns on flanks, small Egyptian headpiece with single golden disc between ears (Hathor's sun disc), wise golden eyes, symmetrical front-facing.

Cell 2 — KITSUNE: an elegant snow-white nine-tailed fox spirit, sitting regally with all nine fluffy tails fanned out behind in a graceful arc, each tail tipped with a small golden flame-glow, large amber eyes wise and slightly mischievous, tall pointed ears with golden inner-fur, small red ribbon at neck.

Cell 3 — TANUKI: a round-bellied Japanese raccoon dog standing on hind legs with mid-mischief grin, brown-and-cream fur, dark facial mask, fluffy striped tail, small straw conical hat tilted to one side, holding a folded paper fan, tiny coin purse at belt.

Cell 4 — LENA THINKING: same 12-year-old girl as in batch 1 (chestnut braids with silver ribbons, navy school cape, silver star brooch, glowing wrist emblem), in a thinking pose: one hand on chin, looking up and to the side with curious expression, three-quarters view.

Cell 5 — LENA VICTORY: same Lena, in a triumphant pose with both arms slightly raised, bright joyful smile, the wrist emblem glowing extra-brightly, soft golden sparkles around her.

Cell 6 — TSUKIKO POINTING: the snow-white moon-cat from batch 1 (silver crescent on forehead), now standing on her hind legs in a teaching pose, one front paw extended forward as if pointing at something invisible, alert intelligent expression.

Cell 7 — KURO EXPLAINING: the black detective cat (deerstalker hat) from batch 1, now standing on hind legs gesturing with both paws as if explaining something, magnifying glass tucked under one arm, animated speaking expression with mouth slightly open.

Cell 8 — CINGLONG COILED: the small teal serpentine dragon from batch 1, now coiled gracefully around an invisible vertical axis (as if around the letter x), three full turns, body forming a relaxed spiral, tail at bottom, head looking outward at viewer, golden eyes calm.

Cell 9 — HANA FLYING: the small pink fairy from batch 1, now in dynamic flight pose with arms extended sideways like a dancer, kimono sleeves trailing, surrounded by a gentle storm of cherry-blossom petals.

Cell 10 — SPHINX FRONT VIEW: the same sphinx as cell 1 but viewed from a low front-three-quarters angle to show her face more prominently, paws still extended, slightly dramatic golden lighting from below, deeper wise expression.

Maintain identical style, lighting, line weight, and palette across all 10 cells. Transparent or pure white backgrounds within each cell. No readable text anywhere.
```

---

## Sequential prompts (×10)

Style prefix (одинаковый ко всем): `soft hand-painted Studio Ghibli x Sailor Moon, watercolour, sumi-e accents, palette of deep indigo, silver, imperial gold, scarlet on white; transparent background, no text --ar 1:1 --style raw`

```
1. A regal Egyptian sphinx-cat in classic recumbent pose with paws extended forward, sleek golden-tan fur with hieroglyph-like sumi-e patterns on flanks, small Egyptian headpiece with single golden disc between ears, wise golden eyes, symmetrical front-facing composition, transparent background, [STYLE PREFIX]

2. An elegant snow-white nine-tailed fox spirit, sitting regally with all nine fluffy tails fanned out behind in graceful arc, each tail tipped with small golden flame-glow, large amber wise mischievous eyes, tall pointed ears with golden inner-fur, small red ribbon at neck, transparent background, [STYLE PREFIX]

3. A round-bellied Japanese tanuki (raccoon dog) standing on hind legs with mid-mischief grin, brown-and-cream fur, dark facial mask, fluffy striped tail, small straw conical hat tilted, holding a folded paper fan, tiny coin purse at belt, transparent background, [STYLE PREFIX]

4. A 12-year-old girl with two dark chestnut braids tied with silver ribbons, hazel eyes, wearing navy school cape with silver star brooch over white turtleneck and grey skirt, softly glowing silver circular emblem on right wrist, in a thinking pose: one hand on chin looking up with curious expression, three-quarters view, transparent background, [STYLE PREFIX]

5. Same girl as previous (chestnut braids, navy cape, silver emblem on wrist), in a triumphant pose with both arms slightly raised, bright joyful smile, the wrist emblem glowing extra brightly with soft golden sparkles around her, transparent background, [STYLE PREFIX]

6. An elegant snow-white long-haired cat with glowing silver crescent-moon mark on forehead, pale teal eyes, standing on hind legs in a teaching pose with one front paw extended forward as if pointing at something invisible, alert intelligent expression, transparent background, [STYLE PREFIX]

7. A sleek black short-haired cat with tiny dark deerstalker detective hat, standing on hind legs gesturing with both paws as if explaining, magnifying glass tucked under one arm, animated speaking expression with mouth slightly open, golden-yellow eyes, transparent background, [STYLE PREFIX]

8. A small slender East-Asian serpentine dragon (Haku-style), teal scales, golden whiskers and mane, two small antlers, coiled gracefully three turns around an invisible vertical axis, tail at bottom, head looking outward at viewer, calm golden eyes, transparent background, [STYLE PREFIX]

9. A small palm-sized fairy in pink-and-white kimono with cherry-blossom pattern, long pink hair with petals woven in, in dynamic flight pose with arms extended sideways like a dancer, kimono sleeves trailing, surrounded by a gentle storm of pink cherry-blossom petals, transparent background, [STYLE PREFIX]

10. A regal Egyptian sphinx-cat in recumbent pose with paws extended, sleek golden-tan fur with hieroglyph patterns, small Egyptian headpiece with golden Hathor sun-disc, viewed from low front-three-quarters angle to emphasize face, dramatic golden lighting from below, deep wise expression, transparent background, [STYLE PREFIX]
```

---

## После генерации

См. инструкцию в [batch-01](batch-01-characters-main.md#после-генерации). Переименовать → разложить по папкам → отметить в `generation-log.md`.
