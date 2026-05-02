# Batch 06 — Finale: 3 last locations + 5 final emblems + 2 hero scenes (×10)

Закрывающий батч: оставшиеся локации модулей 10..12 + старшие стадии эмблемы + 2 «героических» сцены для обложек.

| # | id | Файл назначения |
|---|---|---|
| 1 | 10-forest-of-stories | `locations/10-forest-of-stories.png` |
| 2 | 11-hall-of-mirrors | `locations/11-hall-of-mirrors.png` |
| 3 | 12-bridge-of-crimson-moon | `locations/12-bridge-of-crimson-moon.png` |
| 4 | emblem-stage-08 | `emblems/stage-08.png` |
| 5 | emblem-stage-09 | `emblems/stage-09.png` |
| 6 | emblem-stage-10 | `emblems/stage-10.png` |
| 7 | emblem-stage-11 | `emblems/stage-11.png` |
| 8 | emblem-stage-12 | `emblems/stage-12.png` |
| 9 | hero-lena-with-emblem | `hero/lena-with-emblem.png` |
| 10 | hero-group-portrait | `hero/group-portrait.png` |

> Папка `assets/hero/` создаётся автоматически при сохранении.

---

## Mega-prompt (sheet mode)

```
A unified finale reference sheet, arranged as a clean 5×2 grid (5 columns, 2 rows). Mixed-content cells: locations (full backgrounds, 16:9), emblems (transparent), heroes (transparent). All in the SAME ART STYLE: soft hand-painted Studio Ghibli warmth meets Sailor Moon brightness, watercolour textures, sumi-e ink accents, atmospheric magical lighting. No captions, no text, no labels.

Cell 1 — FOREST OF STORIES (location, full background): an ancient deep forest at twilight, tall mossy trees with twisted trunks rising out of soft drifting mist, leaves and bark with faint glow as if each tree holds a story, small softly luminous wisps floating between trees, soft scarlet shafts of late sun piercing the canopy, barely visible winding path leading deeper. NO characters.

Cell 2 — HALL OF MIRRORS (location, full background): vast circular marble hall with high vaulted ceiling, around the perimeter NINE tall slender silver-framed mirrors set into stone arches evenly spaced and glowing faintly with cool silver light, polished dark stone pedestal in centre of hall, sumi-e brushwork etched into floor in concentric circles, cool moonlit atmosphere through high windows. NO characters.

Cell 3 — BRIDGE OF CRIMSON MOON (location, full background): a long majestic stone bridge arching gracefully across a vast cosmic chasm between two floating islands, warm-toned stone with carved East-Asian railings, above the bridge a giant CRIMSON full moon dominates the sky casting deep red-gold glow, eighteen evenly-spaced bridge stones along the path subtly glowing, far end fades to hopeful golden horizon, cool indigo cosmic mist below. NO characters.

Cell 4 — EMBLEM STAGE 08 (transparent): silver circular medallion with 9 crescent-moon engravings; EIGHT crescents glow in module colours (1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet, 6-gold, 7-green, 8-violet); only one crescent (position 9) still tarnished. Rich aura with violet warmth.

Cell 5 — EMBLEM STAGE 09 (transparent): same medallion. ALL NINE crescents glow brightly in their module colours (1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet, 6-gold, 7-green, 8-violet, 9-deep indigo). Magnificent multi-colour halo.

Cell 6 — EMBLEM STAGE 10 (transparent): same fully-lit medallion with 9 glowing crescents PLUS a small white feather mark just above centre of the medallion glowing softly with silver-white light, delicate sumi-e brushstroke style. Mixed multi-colour aura with cool silver-white addition.

Cell 7 — EMBLEM STAGE 11 (transparent): same fully-lit medallion with 9 glowing crescents and the white feather mark above; ADD a small hexagonal clear crystal mark opposite the feather, six-faceted prism etched in silver with soft prismatic light scatter. Both extras glow softly.

Cell 8 — EMBLEM STAGE 12 / SEAL OF THE ADEPT (transparent): the grand final form. Same fully-lit medallion with 9 glowing crescents, feather, and crystal — AND around the entire silver ring a glowing CRIMSON ring (the Seal proper) framing everything with soft fiery aura that radiates outward. Peak brightness — moment of completion.

Cell 9 — HERO LENA WITH EMBLEM (transparent): the 12-year-old girl Lena (chestnut shoulder-length braids with silver ribbons, navy school cape with silver star brooch, white turtleneck, grey skirt) standing in a hopeful three-quarters pose, looking forward; her right wrist's silver circular emblem glows brightly with all 9 moons + feather + crystal + crimson ring (the full Seal of the Adept). Soft golden-crimson aura around her. Full body shot.

Cell 10 — HERO GROUP PORTRAIT (transparent): a heroic group portrait featuring twelve guardian characters arranged in a balanced composition — Lena (centre, slightly forward), Tsukiko (white moon-cat, beside Lena), Maneki (ginger maneki-neko), Hana (pink fairy hovering), Cinglong (teal serpentine dragon coiling), Seirin (scarlet fairy), Heihime (black panther), Baihu (white tiger), Kuro (black detective cat), Bakeneko (silver two-tailed cat), Sphinx (golden Egyptian cat), Kitsune (nine-tailed fox), Tanuki (round raccoon dog). All gathered in a harmonious group. Studio Ghibli warmth meets Sailor Moon brightness. Full-cast composition.

Maintain identical art style, lighting and watercolour quality across all 10 cells. Locations have full backgrounds; emblems and heroes have transparent / near-transparent backgrounds. No readable text anywhere.
```

---

## Sequential prompts (×10)

Style prefix: `soft hand-painted Studio Ghibli x Sailor Moon, watercolour, sumi-e accents, no text --style raw`

```
1. An ancient deep forest at twilight: tall mossy trees with twisted trunks rising out of soft drifting mist, leaves and bark with faint glow as if each tree holds a story, small softly luminous wisps floating between trees, soft scarlet shafts of late sun piercing the canopy, barely visible winding path leading deeper. No characters. Wide cinematic landscape. [STYLE PREFIX] --ar 16:9

2. A vast circular marble hall with high vaulted ceiling: around the perimeter NINE tall slender silver-framed mirrors set into stone arches, evenly spaced, each mirror glowing faintly with cool silver light, polished dark stone pedestal in centre, sumi-e brushwork etched into floor in concentric circles, cool moonlit atmosphere through high windows. No characters. Wide interior. [STYLE PREFIX] --ar 16:9

3. A long majestic stone bridge arching across a vast cosmic chasm between two floating islands, warm-toned stone with carved East-Asian railings, above the bridge a giant CRIMSON full moon dominates the sky casting deep red-gold glow, eighteen evenly-spaced bridge stones subtly glow with warm light, far end fades to golden horizon, cool indigo cosmic mist below. No characters. [STYLE PREFIX] --ar 16:9

4. Silver circular medallion with 9 crescent-moon engravings; EIGHT glow in module colours (1-pink, 2-teal, 3-gold, 4-silver, 5-scarlet, 6-gold, 7-green, 8-violet); one (position 9) tarnished. Rich aura with violet warmth. Centred. Transparent background. [STYLE PREFIX] --ar 1:1

5. Silver circular medallion with all NINE crescents glowing brightly in their module colours (pink, teal, gold, silver, scarlet, gold, green, violet, indigo). Magnificent multi-colour halo. Centred. Transparent background. [STYLE PREFIX] --ar 1:1

6. Silver circular medallion with all 9 crescents glowing in module colours, PLUS a small white feather mark just above the centre glowing softly silver-white as a delicate sumi-e brushstroke. Multi-colour aura with silver-white addition. Centred. Transparent background. [STYLE PREFIX] --ar 1:1

7. Silver circular medallion with 9 glowing crescents, white feather mark above centre, PLUS a small hexagonal clear crystal mark opposite the feather (six-faceted prism etched in silver with prismatic light scatter). Both extras glow softly. Centred. Transparent background. [STYLE PREFIX] --ar 1:1

8. The grand final SEAL OF THE ADEPT emblem: silver circular medallion with all 9 crescents glowing brightly, white feather mark, hexagonal crystal mark, AND around the entire silver ring a glowing CRIMSON ring framing everything with soft fiery radiating aura. Peak brightness — moment of completion. Centred. Transparent background. [STYLE PREFIX] --ar 1:1

9. A 12-year-old girl with chestnut shoulder-length braids tied with silver ribbons, hazel eyes, wearing navy school cape with silver star brooch over white turtleneck and grey skirt; standing in a hopeful three-quarters pose looking forward; her right wrist's silver circular emblem glows brilliantly with 9 colourful moons + feather + crystal + crimson ring (full Seal of the Adept). Soft golden-crimson aura around her. Full body. Transparent background. [STYLE PREFIX] --ar 1:1

10. A heroic group portrait of twelve guardian characters arranged in a balanced composition: Lena (a 12-year-old girl with chestnut braids and navy cape, centre), Tsukiko (white moon-cat with silver crescent on forehead beside Lena), Maneki (round ginger maneki-neko), Hana (pink sakura fairy hovering), Cinglong (teal serpentine dragon coiling), Seirin (scarlet bell fairy), Heihime (elegant black panther in dark kimono), Baihu (large white tiger with starry stripes), Kuro (black detective cat in deerstalker hat), Bakeneko (silver two-tailed cat), Sphinx (golden Egyptian cat in recumbent pose), Kitsune (nine-tailed white fox spirit), Tanuki (round-bellied raccoon dog with straw hat). All in harmonious group composition. Full-cast portrait. Transparent background. [STYLE PREFIX] --ar 16:9
```

---

## После генерации

См. [batch-01](batch-01-characters-main.md#после-генерации). Локации → `locations/`. Эмблемы → `emblems/`. Hero-сцены → создай папку `assets/hero/` и положи туда (используется на обложках книги, сертификате, главной странице).
