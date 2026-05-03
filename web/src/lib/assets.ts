/**
 * Помощники для работы с ассетами курса (../assets/).
 *
 * При сборке assets копируются в web/public/assets/ через scripts/sync-assets.sh
 * (вызывается перед `astro build`/`astro dev`). На клиенте ссылаемся как /assets/...
 */

const PUBLIC_BASE = "/assets";

export type AssetCategory =
  | "characters"
  | "artifacts"
  | "locations"
  | "emblems"
  | "ui"
  | "hero";

/**
 * Путь к изображению ассета.
 *
 * @example
 *   assetUrl("characters", "lena", "base") → "/assets/characters/lena/lena-base.png"
 *   assetUrl("artifacts", "moon-stone-08-labyrinth") → "/assets/artifacts/moon-stone-08-labyrinth.png"
 *   assetUrl("locations", "08-labyrinth-lanterns") → "/assets/locations/08-labyrinth-lanterns.png"
 *   assetUrl("emblems", "stage-08") → "/assets/emblems/stage-08.png"
 */
export function assetUrl(
  category: AssetCategory,
  id: string,
  pose: string = "base"
): string {
  if (category === "characters") {
    return `${PUBLIC_BASE}/characters/${id}/${id}-${pose}.png`;
  }
  if (category === "emblems") {
    return `${PUBLIC_BASE}/emblems/${id}.png`;
  }
  // artifacts / locations / ui / hero — плоская структура
  return `${PUBLIC_BASE}/${category}/${id}.png`;
}

/**
 * Безопасный URL: возвращает либо реальный путь, либо `null`, если пользователь хочет fallback.
 * Сейчас всегда возвращает путь — fallback-логика на стороне компонента (через onerror).
 */
export function safeAssetUrl(
  category: AssetCategory,
  id: string,
  pose: string = "base"
): string {
  return assetUrl(category, id, pose);
}

/** SVG-плейсхолдер для случая, когда PNG ассета ещё не сгенерирован. */
export function placeholderSVG(label: string, colour: string): string {
  // data:image/svg+xml — компактный inline-fallback
  const text = label.slice(0, 2).toUpperCase();
  const safeLabel = text.replace(/[<>&"']/g, "");
  const safeColour = colour.replace(/[^#0-9a-fA-F]/g, "");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='30' fill='${safeColour}' fill-opacity='0.25' stroke='${safeColour}' stroke-width='1.5'/><text x='32' y='38' text-anchor='middle' font-family='sans-serif' font-size='18' font-weight='600' fill='${safeColour}'>${safeLabel}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
