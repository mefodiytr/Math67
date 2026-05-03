/**
 * Каноническая структура мира «Феликсия — Академия Девяти Лун».
 * Источник: ../../stories/, ../../assets/*/​_index.yaml, world-bible.md
 */

import type { ModuleInfo, CharacterInfo, ArtifactInfo, LocationInfo } from "@/lib/types.ts";

// ───────────────────────── 13 модулей ─────────────────────────

export const MODULES: ModuleInfo[] = [
  {
    id: 0,
    slug: "diagnostics",
    title: "Диагностика и математический профиль",
    shortTitle: "Прибытие",
    locationId: "00-academy-gate",
    primaryCuratorId: "tsukiko",
    primaryColour: "#E2E8F0",
    lessonsCount: 5,
    tagline: "Знакомство с Феликсией. Карта навыков.",
  },
  {
    id: 1,
    slug: "numbers-fractions",
    title: "Числа, дроби, проценты",
    shortTitle: "Сад Дробей",
    locationId: "01-garden-of-fractions",
    primaryCuratorId: "hana",
    artifactId: "moon-stone-01-fractions",
    primaryColour: "#F472B6",
    lessonsCount: 15,
    tagline: "Дроби, проценты, точность вычислений.",
  },
  {
    id: 2,
    slug: "primes",
    title: "Делимость и простые числа",
    shortTitle: "Пещера Простых",
    locationId: "02-cave-of-primes",
    primaryCuratorId: "cinglong",
    artifactId: "moon-stone-02-primes",
    primaryColour: "#0EA5E9",
    lessonsCount: 12,
    tagline: "Делимость, простые числа, теория чисел.",
  },
  {
    id: 3,
    slug: "algebra",
    title: "Алгебраическое мышление",
    shortTitle: "Башня Знаков",
    locationId: "03-tower-of-signs",
    primaryCuratorId: "maneki",
    artifactId: "moon-stone-03-signs",
    primaryColour: "#F59E0B",
    lessonsCount: 15,
    tagline: "Переменные, выражения, преобразования.",
  },
  {
    id: 4,
    slug: "equations",
    title: "Уравнения и неравенства",
    shortTitle: "Замок Весов",
    locationId: "04-castle-of-balance",
    primaryCuratorId: "tsukiko",
    artifactId: "moon-stone-04-balance",
    primaryColour: "#E2E8F0",
    lessonsCount: 18,
    tagline: "Уравнения, неравенства, текстовые задачи.",
  },
  {
    id: 5,
    slug: "graphs",
    title: "Функции и графики",
    shortTitle: "Звёздная Карта",
    locationId: "05-star-map",
    primaryCuratorId: "seirin",
    artifactId: "moon-stone-05-stars",
    primaryColour: "#E11D48",
    lessonsCount: 15,
    tagline: "Координаты, графики, функции.",
  },
  {
    id: 6,
    slug: "triangles",
    title: "Геометрия I: углы и треугольники",
    shortTitle: "Храм Треугольников",
    locationId: "06-temple-of-triangles",
    primaryCuratorId: "cinglong",
    artifactId: "moon-stone-06-triangles",
    primaryColour: "#F59E0B",
    lessonsCount: 17,
    tagline: "Углы, треугольники, доказательства.",
  },
  {
    id: 7,
    slug: "valley",
    title: "Геометрия II: площади, объём",
    shortTitle: "Долина Измерений",
    locationId: "07-valley-of-measures",
    primaryCuratorId: "baihu",
    artifactId: "moon-stone-07-valley",
    primaryColour: "#10B981",
    lessonsCount: 15,
    tagline: "Площади, окружность, объёмы.",
  },
  {
    id: 8,
    slug: "labyrinth",
    title: "Комбинаторика и логика",
    shortTitle: "Лабиринт Фонариков",
    locationId: "08-labyrinth-lanterns",
    primaryCuratorId: "kuro",
    artifactId: "moon-stone-08-labyrinth",
    primaryColour: "#7C3AED",
    lessonsCount: 12,
    tagline: "Перебор, дерево, Дирихле, инвариант.",
  },
  {
    id: 9,
    slug: "observatory",
    title: "Вероятность и статистика",
    shortTitle: "Ночная Обсерватория",
    locationId: "09-night-observatory",
    primaryCuratorId: "tsukiko",
    artifactId: "moon-stone-09-observatory",
    primaryColour: "#1E3A8A",
    lessonsCount: 12,
    tagline: "Среднее, медиана, вероятность, дерево.",
  },
  {
    id: 10,
    slug: "forest",
    title: "Текстовые задачи повышенной сложности",
    shortTitle: "Лес Историй",
    locationId: "10-forest-of-stories",
    primaryCuratorId: "kitsune",
    artifactId: "feather-of-adept",
    primaryColour: "#10B981",
    lessonsCount: 17,
    tagline: "Движение, работа, смеси, пять шагов.",
  },
  {
    id: 11,
    slug: "mirrors",
    title: "Доказательства и логика",
    shortTitle: "Зал Девяти Зеркал",
    locationId: "11-hall-of-mirrors",
    primaryCuratorId: "kuro",
    artifactId: "crystal-of-axioms",
    primaryColour: "#E2E8F0",
    lessonsCount: 12,
    tagline: "Утверждение, контрпример, инвариант.",
  },
  {
    id: 12,
    slug: "bridge",
    title: "Pre-Algebra → Algebra 1",
    shortTitle: "Мост Алой Луны",
    locationId: "12-bridge-of-crimson-moon",
    primaryCuratorId: "tsukiko",
    artifactId: "seal-of-adept",
    primaryColour: "#7F1D1D",
    lessonsCount: 18,
    tagline: "Системы, парабола, факторизация.",
  },
];

export function getModule(id: number): ModuleInfo | undefined {
  return MODULES.find((m) => m.id === id);
}

// ───────────────────────── 13 хранителей ─────────────────────────

export const CHARACTERS: CharacterInfo[] = [
  {
    id: "lena",
    nameRu: "Лена",
    nameAlt: "Ленcая",
    archetype: "Главная героиня, 12 лет",
    appearsIn: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    primaryColour: "#1E3A8A",
  },
  {
    id: "tsukiko",
    nameRu: "Цукико",
    archetype: "Лунная кошка-наставница",
    appearsIn: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    primaryColour: "#E2E8F0",
  },
  {
    id: "maneki",
    nameRu: "Манэки",
    archetype: "Кот-привратник",
    appearsIn: [1, 3, 4, 7, 10, 11, 12],
    primaryColour: "#F59E0B",
  },
  {
    id: "hana",
    nameRu: "Хана",
    archetype: "Фея сакуры",
    appearsIn: [1, 6, 7, 8, 10, 12],
    primaryColour: "#F472B6",
  },
  {
    id: "cinglong",
    nameRu: "Цинлун",
    archetype: "Лазурный дракон",
    appearsIn: [3, 4, 7, 8, 10, 12],
    primaryColour: "#0EA5E9",
  },
  {
    id: "seirin",
    nameRu: "Сэйрин",
    archetype: "Алая фея-колокольчик",
    appearsIn: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    primaryColour: "#E11D48",
  },
  {
    id: "heihime",
    nameRu: "Хэйхи",
    archetype: "Чёрная пантера-инженер",
    appearsIn: [1, 7],
    primaryColour: "#0F172A",
  },
  {
    id: "baihu",
    nameRu: "Байху",
    archetype: "Белый тигр-капитан",
    appearsIn: [7],
    primaryColour: "#F8FAFC",
  },
  {
    id: "kuro",
    nameRu: "Куро",
    archetype: "Кот-детектив",
    appearsIn: [8, 11, 12],
    primaryColour: "#0F172A",
  },
  {
    id: "bakeneko",
    nameRu: "Бакэнэко",
    archetype: "Двухвостая кошка-оборотень",
    appearsIn: [8, 9, 11],
    primaryColour: "#94A3B8",
  },
  {
    id: "sphinx",
    nameRu: "Сфинкс",
    archetype: "Хранитель загадок (★★★★)",
    appearsIn: [8, 11, 12],
    primaryColour: "#F59E0B",
  },
  {
    id: "kitsune",
    nameRu: "Кицунэ",
    archetype: "Девятихвостая лиса-сказительница",
    appearsIn: [10, 12],
    primaryColour: "#F8FAFC",
  },
  {
    id: "tanuki",
    nameRu: "Тануки",
    archetype: "Енот-обманщик",
    appearsIn: [10],
    primaryColour: "#92400E",
  },
];

export function getCharacter(id: string): CharacterInfo | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

// ───────────────────────── 12 артефактов ─────────────────────────

export const ARTIFACTS: ArtifactInfo[] = [
  { id: "moon-stone-01-fractions", nameRu: "Лунный Камень Дробей", fromModule: 1, shape: "drop-hemisphere", colour: "#F472B6" },
  { id: "moon-stone-02-primes", nameRu: "Лунный Камень Простых", fromModule: 2, shape: "octahedron", colour: "#0EA5E9" },
  { id: "moon-stone-03-signs", nameRu: "Лунный Камень Знаков", fromModule: 3, shape: "sphere-with-x", colour: "#F59E0B" },
  { id: "moon-stone-04-balance", nameRu: "Лунный Камень Весов", fromModule: 4, shape: "lotus-weight", colour: "#E2E8F0" },
  { id: "moon-stone-05-stars", nameRu: "Лунный Камень Звёзд", fromModule: 5, shape: "octogram", colour: "#E11D48" },
  { id: "moon-stone-06-triangles", nameRu: "Лунный Камень Треугольников", fromModule: 6, shape: "tetrahedron", colour: "#F59E0B" },
  { id: "moon-stone-07-valley", nameRu: "Лунный Камень Долины", fromModule: 7, shape: "cube", colour: "#10B981" },
  { id: "moon-stone-08-labyrinth", nameRu: "Лунный Камень Лабиринта", fromModule: 8, shape: "fork-of-paths", colour: "#7C3AED" },
  { id: "moon-stone-09-observatory", nameRu: "Лунный Камень Обсерватории", fromModule: 9, shape: "seven-pointed-star", colour: "#1E3A8A" },
  { id: "feather-of-adept", nameRu: "Перо Адепта", fromModule: 10, shape: "white-feather", colour: "#F8FAFC" },
  { id: "crystal-of-axioms", nameRu: "Кристалл Аксиом", fromModule: 11, shape: "hexagonal-crystal", colour: "#E2E8F0" },
  { id: "seal-of-adept", nameRu: "Печать Адепта Девяти Лун", fromModule: 12, shape: "crimson-ring", colour: "#7F1D1D" },
];

export function getArtifact(id: string): ArtifactInfo | undefined {
  return ARTIFACTS.find((a) => a.id === id);
}

// ───────────────────────── 13 локаций ─────────────────────────

export const LOCATIONS: LocationInfo[] = [
  { id: "00-academy-gate", nameRu: "Зал Адептов", module: 0, palette: ["#1E3A8A", "#E2E8F0"] },
  { id: "01-garden-of-fractions", nameRu: "Сад Дробей", module: 1, palette: ["#F472B6", "#FEF3C7"] },
  { id: "02-cave-of-primes", nameRu: "Пещера Простых", module: 2, palette: ["#0EA5E9", "#1E3A8A"] },
  { id: "03-tower-of-signs", nameRu: "Башня Знаков", module: 3, palette: ["#F59E0B", "#0F172A"] },
  { id: "04-castle-of-balance", nameRu: "Замок Весов", module: 4, palette: ["#E2E8F0", "#1E3A8A"] },
  { id: "05-star-map", nameRu: "Звёздная Карта", module: 5, palette: ["#E11D48", "#1E3A8A"] },
  { id: "06-temple-of-triangles", nameRu: "Храм Треугольников", module: 6, palette: ["#F59E0B", "#10B981"] },
  { id: "07-valley-of-measures", nameRu: "Долина Измерений", module: 7, palette: ["#10B981", "#0EA5E9"] },
  { id: "08-labyrinth-lanterns", nameRu: "Лабиринт Фонариков", module: 8, palette: ["#FBBF24", "#1E3A8A"] },
  { id: "09-night-observatory", nameRu: "Ночная Обсерватория", module: 9, palette: ["#1E3A8A", "#E2E8F0"] },
  { id: "10-forest-of-stories", nameRu: "Лес Историй", module: 10, palette: ["#10B981", "#7F1D1D"] },
  { id: "11-hall-of-mirrors", nameRu: "Зал Девяти Зеркал", module: 11, palette: ["#E2E8F0", "#1E3A8A"] },
  { id: "12-bridge-of-crimson-moon", nameRu: "Мост Алой Луны", module: 12, palette: ["#7F1D1D", "#F59E0B"] },
];

export function getLocation(id: string): LocationInfo | undefined {
  return LOCATIONS.find((l) => l.id === id);
}

// ───────────────────────── позиции на карте ─────────────────────────
/**
 * Координаты островов на главной карте мира (viewBox 1000×600).
 * Подобраны вручную: путь идёт слева-вверх → вправо-вниз спиралью.
 */
export const ISLAND_POSITIONS: Record<number, { x: number; y: number }> = {
  0: { x: 130, y: 100 },
  1: { x: 250, y: 180 },
  2: { x: 400, y: 130 },
  3: { x: 540, y: 200 },
  4: { x: 680, y: 130 },
  5: { x: 820, y: 200 },
  6: { x: 870, y: 340 },
  7: { x: 720, y: 420 },
  8: { x: 560, y: 470 },
  9: { x: 410, y: 410 },
  10: { x: 270, y: 470 },
  11: { x: 130, y: 380 },
  12: { x: 500, y: 540 },
};
