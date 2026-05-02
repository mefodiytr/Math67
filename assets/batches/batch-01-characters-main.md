# Batch 01 — Main Characters (×10)

Генерирует **10 главных персонажей** курса в едином стиле.

| # | id | Файл назначения |
|---|---|---|
| 1 | lena | `characters/lena/lena-base.png` |
| 2 | tsukiko | `characters/tsukiko/tsukiko-base.png` |
| 3 | maneki | `characters/maneki/maneki-base.png` |
| 4 | hana | `characters/hana/hana-base.png` |
| 5 | cinglong | `characters/cinglong/cinglong-base.png` |
| 6 | seirin | `characters/seirin/seirin-base.png` |
| 7 | heihime | `characters/heihime/heihime-base.png` |
| 8 | baihu | `characters/baihu/baihu-base.png` |
| 9 | kuro | `characters/kuro/kuro-base.png` |
| 10 | bakeneko | `characters/bakeneko/bakeneko-base.png` |

---

## Mega-prompt (sheet mode) — для ChatGPT / DALL·E 3 / GPT Image

```
A unified character reference sheet, arranged as a clean 5×2 grid (5 columns, 2 rows), on a milky white #F8FAFC background with subtle hairline borders separating each cell. All ten characters illustrated in the SAME ART STYLE: soft hand-painted Studio Ghibli warmth meets Sailor Moon brightness, gentle cel-shading, watercolour textures, subtle East-Asian sumi-e ink accents. Palette: deep indigo #1E3A8A, silver #E2E8F0, teal #0EA5E9, scarlet #E11D48, lotus pink #F472B6, imperial gold #F59E0B, forest green #10B981, charcoal #0F172A. Each character centred in their cell, full body or three-quarters, calm friendly poses, no captions, no text, no labels.

Cell 1 — LENA: a 12-year-old girl with two dark chestnut shoulder-length braids tied with silver ribbons, hazel eyes, navy school cape with a silver star brooch over a white turtleneck and grey skirt, knee socks. A softly glowing silver circular emblem on her right wrist. Three-quarters view, slight smile.

Cell 2 — TSUKIKO: an elegant snow-white long-haired cat with a glowing silver crescent-moon mark on her forehead, pale teal eyes, sitting regally with tail curled around paws.

Cell 3 — MANEKI: a plump round ginger maneki-neko (Japanese beckoning cat) with raised right paw, red collar with tiny golden bell, cheerful round face.

Cell 4 — HANA: a small palm-sized fairy in pink-and-white kimono with cherry-blossom pattern, long pink hair with petals woven in, translucent wings, holding one sakura petal.

Cell 5 — CINGLONG: a small slender East-Asian serpentine dragon (Haku-style), sea-wave teal scales, golden whiskers and mane, two small antlers, undulating mid-flight, no wings.

Cell 6 — SEIRIN: a small palm-sized fairy in scarlet-and-gold kimono with golden trim, black hair in a high ponytail with golden ornament, holding a tiny silver bell on a red cord, fiery-red translucent wings.

Cell 7 — HEIHIME: an elegant black panther in dark kimono with subtle pink lotus pattern, two large golden hoop earrings, sitting upright with paws folded, sharp golden eyes.

Cell 8 — BAIHU: a large majestic white tiger with charcoal stripes containing tiny silver stars (like constellations), bright pale-blue eyes, sitting in a regal posture.

Cell 9 — KURO: a sleek black short-haired cat in a tiny dark detective deerstalker hat, standing on hind legs in a confident pose, golden-yellow eyes, tiny magnifying glass under one arm.

Cell 10 — BAKENEKO: a slender silver-grey two-tailed cat (bakeneko) with both forked tails curving up behind, soft silvery sheen, mysterious bright violet eyes, faint moonlight halo.

Maintain identical style, lighting, line weight and palette across all 10 cells. No readable text anywhere.
```

**Размер:** запроси 2048×2048 или 2560×1024 (для 5×2 сетки). Каждая ячейка ≈ 512×1024.

---

## Sequential prompts (×10) — для Midjourney / SD batch

Style prefix (применяй ко всем): `soft hand-painted Studio Ghibli x Sailor Moon, watercolour, sumi-e accents, palette of deep indigo #1E3A8A, silver #E2E8F0, teal #0EA5E9, scarlet, lotus pink, imperial gold; transparent or milky white background, no text --ar 1:1 --style raw`

```
1. A 12-year-old girl with two dark chestnut shoulder-length braids tied with silver ribbons, hazel eyes, wearing a navy school cape with a silver star brooch over a white turtleneck and grey skirt, softly glowing silver circular emblem on her right wrist, three-quarters view, slight smile, full body, transparent background, [STYLE PREFIX]

2. An elegant snow-white long-haired cat with a glowing silver crescent-moon mark on the forehead, pale teal eyes, regal sitting pose with long fluffy tail curled around paws, transparent background, [STYLE PREFIX]

3. A plump round-bodied ginger maneki-neko (Japanese beckoning cat), sitting upright with raised right paw, red collar with tiny golden bell, cheerful round face with slit cat-eyes, transparent background, [STYLE PREFIX]

4. A palm-sized fairy hovering in air, long pink hair with cherry-blossom petals woven in, wearing a pink-and-white kimono with sakura pattern, translucent wings, holding one pink petal in cupped hand, transparent background, [STYLE PREFIX]

5. A small slender East-Asian serpentine dragon (Haku-style from Spirited Away), sea-wave teal scales with paler underbelly, golden whiskers and mane along spine, two small antlers, no wings, undulating gracefully mid-flight, transparent background, [STYLE PREFIX]

6. A palm-sized fairy in a scarlet-and-gold kimono with golden trim and red obi-belt, black hair in a high ponytail with golden ornament, holding a tiny silver bell on a red cord, fiery-red translucent wings, confident smile, transparent background, [STYLE PREFIX]

7. An elegant black panther in anthropomorphic posture, sitting upright wearing a flowing dark kimono with subtle pink lotus pattern, two large golden hoop earrings, sharp golden eyes, regal slight knowing smile, transparent background, [STYLE PREFIX]

8. A large majestic white tiger of the Chinese zodiac, snow-white fur with charcoal stripes containing tiny silver stars like constellations, bright pale-blue eyes, sitting in regal posture, faint starlight aura, transparent background, [STYLE PREFIX]

9. A sleek black short-haired cat with a tiny dark deerstalker detective hat perched on head, standing on hind legs in confident pose, round wide golden-yellow observant eyes, small magnifying glass under one arm, transparent background, [STYLE PREFIX]

10. A slender silver-grey two-tailed cat (bakeneko of Japanese folklore), both forked tails curving gracefully up behind in an arc, soft silvery sheen on fur with violet aura, bright slanted violet eyes, faint moonlight halo, transparent background, [STYLE PREFIX]
```

---

## После генерации

1. Если был **sheet mode** — разрежь на 10 PNG, переименуй по таблице сверху, разложи по папкам.
2. Если **sequential** — переименуй каждый файл по таблице.
3. Запиши в `assets/prompts/generation-log.md`:

```
### YYYY-MM-DD — batch-01-characters-main
- **Сервис:** GPT Image / Midjourney / DALL·E 3
- **Режим:** sheet / sequential
- **Файлы:** characters/{lena, tsukiko, maneki, hana, cinglong, seirin, heihime, baihu, kuro, bakeneko}-base.png
- **Заметки:** что вышло хорошо, что попробовать иначе
```
