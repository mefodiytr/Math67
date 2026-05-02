# Batch 05 — Locations 0..9 (×10)

10 локаций модулей 0..9 (фоны без персонажей).

| # | id | Файл назначения |
|---|---|---|
| 1 | 00-academy-gate | `locations/00-academy-gate.png` |
| 2 | 01-garden-of-fractions | `locations/01-garden-of-fractions.png` |
| 3 | 02-cave-of-primes | `locations/02-cave-of-primes.png` |
| 4 | 03-tower-of-signs | `locations/03-tower-of-signs.png` |
| 5 | 04-castle-of-balance | `locations/04-castle-of-balance.png` |
| 6 | 05-star-map | `locations/05-star-map.png` |
| 7 | 06-temple-of-triangles | `locations/06-temple-of-triangles.png` |
| 8 | 07-valley-of-measures | `locations/07-valley-of-measures.png` |
| 9 | 08-labyrinth-lanterns | `locations/08-labyrinth-lanterns.png` |
| 10 | 09-night-observatory | `locations/09-night-observatory.png` |

---

## Mega-prompt (sheet mode)

```
A unified location reference sheet, arranged as a clean 5×2 grid (5 columns, 2 rows). Each cell contains a wide cinematic landscape illustration WITH FULL BACKGROUND (not transparent), 16:9 aspect within the cell. All ten landscapes in the SAME ART STYLE: soft hand-painted Studio Ghibli warmth meets Sailor Moon brightness, watercolour textures, gentle cel-shading, sumi-e ink accents on contours, atmospheric magical lighting, negative space sky. NO CHARACTERS in any cell — pure architecture and landscape. No captions, no text, no labels, no UI.

Cell 1 — ACADEMY GATE: a grand stone gate in East-Asian temple style with curved sweeping roof on a floating island, two silent stone-cat guardians on either side, nine subtle silver crescent moons arranged in circular pattern above the gate, deep indigo evening sky, silver light, soft mist at base.

Cell 2 — GARDEN OF FRACTIONS: a tranquil East-Asian zen garden with pink cherry-blossom trees in full bloom, raked white-pebble paths, small wooden bridges over a winding stream, floating petals, late afternoon golden-pink light, distant pagoda silhouette.

Cell 3 — CAVE OF PRIMES: interior of a vast crystalline cave, glowing teal-and-silver stalactites and stalagmites in clean geometric clusters, mirror-still underground pool reflecting the glow, floating cyan light orbs, deep indigo ambient.

Cell 4 — TOWER OF SIGNS: tall multi-tiered East-Asian pagoda rising into a starlit sky on a floating island, each tier glowing softly golden, small luminous variable symbols (x, y, z, n) drifting like fireflies as single sumi-e brushstrokes around the pagoda, twilight blue-gold sky.

Cell 5 — CASTLE OF BALANCE: grand fortress hall with vaulted East-Asian dragon-beam ceiling, an enormous beautifully crafted balance scale in centre with two large silver pans suspended from a central golden beam, perfectly level holding small stone weights, soft moonlight through tall narrow windows, polished dark stone floor.

Cell 6 — STAR MAP: floating wooden pier extending into a starry night sky over a deep cosmic sea, built like Japanese temple bridge, constellations forming a luminous coordinate grid above with tiny golden dots at intersection points, brighter scarlet-glow stars marking key points, reflections shimmer on dark water.

Cell 7 — TEMPLE OF TRIANGLES: serene Shinto temple complex on forested hilltop, triangular roof gables and pediments emphasised, traditional torii gate at entrance with top beam forming a clear triangle silhouette, stone lanterns in triangular forms along moss-covered path, late afternoon golden light through tall pine trees.

Cell 8 — VALLEY OF MEASURES: vast green valley between two gentle mountain ranges, cultivated rice fields divided into precise rectangular and triangular plots like a giant living mosaic, winding river with small wooden bridges, tall poles with subtle measurement marks along the river, soft summer light.

Cell 9 — LABYRINTH OF LANTERNS: vast bamboo grove forming a maze of narrow paths under starless evening sky, hundreds of small softly glowing warm-amber paper lanterns hanging from slender poles at every junction, bamboo walls casting soft sumi-e shadows, slight evening fog, in far distance one larger central paper lantern (the Great Lantern) glowing brightest.

Cell 10 — NIGHT OBSERVATORY: tall slender stone tower with copper-domed observatory at peak on a floating island under deep indigo midnight sky, dome partially open revealing great brass telescope pointing at luminous full moon, star charts on stone bench at base, clear constellations across sky, silver moon-glow.

Each cell has its own complete background. Maintain identical art style, lighting quality, line weight, watercolour textures and atmosphere across all 10 cells. NO characters anywhere. No readable text.
```

---

## Sequential prompts (×10)

Style prefix: `wide cinematic landscape, soft hand-painted Studio Ghibli x Sailor Moon, watercolour textures, sumi-e ink accents, atmospheric magical lighting, negative space, NO CHARACTERS, no text --ar 16:9 --style raw`

```
1. The grand entrance to a floating-island Academy: tall stone gate in East-Asian temple style with curved sweeping roof, two silent stone-cat guardians sitting on either side, nine subtle silver crescent moons in a circular pattern above the gate, deep indigo evening sky with first stars, silver-blue light, soft mist at base. [STYLE PREFIX]

2. A tranquil East-Asian zen garden on a floating island: pink cherry-blossom trees in full bloom along raked white-pebble paths, small wooden bridges over a winding stream, floating petals drift, stone basins along the path subtly divided into segments, late afternoon golden-pink light, distant pagoda silhouette. [STYLE PREFIX]

3. Interior of a vast crystalline cave: glowing teal-and-silver stalactites hanging from ceiling, matching stalagmites rising from floor in clean geometric clusters, a mirror-still underground pool reflecting the glow, air-bubbles of soft cyan light floating, misty atmospheric depth. [STYLE PREFIX]

4. A tall multi-tiered East-Asian pagoda rising into a starlit sky on a floating island: each tier glowing softly with golden light, small softly luminous single-stroke variable symbols (x, y, z, n) drifting like fireflies around the pagoda, small stone garden at base, twilight blue sky with first stars. [STYLE PREFIX]

5. A grand fortress hall with vaulted East-Asian dragon-beam ceiling: in the centre an enormous beautifully crafted balance scale with two large silver pans suspended from a central golden beam, both pans perfectly level holding small stone weights, soft moonlight streams through tall narrow windows, polished dark stone floor that mirrors the scale, atmospheric haze. [STYLE PREFIX]

6. A floating wooden pier extending into a starry night sky over a deep cosmic sea, pier built like a Japanese temple bridge, constellations of stars forming a luminous coordinate grid above with tiny golden dots at intersection points like cosmic graph paper, a few brighter scarlet-glow stars marking key points, reflections shimmer on dark water below, soft cosmic mist. [STYLE PREFIX]

7. A serene Shinto temple complex on a forested hilltop: triangular roof gables and pediments emphasised throughout, traditional torii gate at the entrance with top beam forming a clear triangle silhouette against the sky, stone lanterns in triangular forms line a moss-covered path, late afternoon golden light filters through tall pine trees, subtle Pythagorean-triangle motifs etched into the temple stones. [STYLE PREFIX]

8. A vast green valley cradled between two gentle mountain ranges: patches of cultivated rice fields divided into precise rectangular and triangular plots like a giant living mosaic of measured shapes, a winding river traced with small wooden bridges, tall poles with subtle measurement-mark stripes along the river bank, soft summer light, gentle clouds. [STYLE PREFIX]

9. A vast bamboo grove forming a maze of narrow paths under a starless evening sky, at every junction in the bamboo paths a softly glowing paper lantern hangs from a slender pole — hundreds of small warm amber lights stretching into the misty distance, bamboo walls casting soft sumi-e ink shadows, slight evening fog drifts low, in the far distance one large central paper lantern (the Great Lantern) glowing brightest. [STYLE PREFIX]

10. A tall slender stone tower with a copper-domed observatory at its peak on a floating island under a deep indigo midnight sky, dome partially open revealing a great brass telescope pointing at a luminous full moon, star charts scattered on a stone bench at the tower's base, stars in clear constellations spread across the sky, soft silver moon-glow bathes the scene. [STYLE PREFIX]
```

---

## После генерации

См. [batch-01](batch-01-characters-main.md#после-генерации). Все кладутся в `assets/locations/`.
