import type { Config } from "tailwindcss";

/**
 * Канонические цвета курса.
 * Источник: ../assets/prompts/colour-palette.md
 */
const palette = {
  // Основные
  indigo: "#1E3A8A", // глубокий индиго — фон, ночь, академия
  silver: "#E2E8F0", // серебро луны — Цукико, эмблема
  teal: "#0EA5E9", // бирюза моря — формулы, Цинлун
  scarlet: "#E11D48", // алый колокольчик — Сэйрин, Печать
  lotus: "#F472B6", // лотос-розовый — Хана
  gold: "#F59E0B", // императорский золотой — Сфинкс, ★★★★
  forest: "#10B981", // лес-зелёный — дракон, природа
  charcoal: "#0F172A", // уголь — Куро, текст
  milk: "#F8FAFC", // молочный — страницы, светлый фон
  // Расширенная
  fog: "#94A3B8", // туман
  crimson: "#7F1D1D", // багряный — Алая Луна
  amber: "#FBBF24", // янтарь — фонари
  slate: "#1F2937", // сланец
  jasmine: "#FEF3C7", // жасмин
};

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Семантические алиасы
        "9m-bg": palette.indigo,
        "9m-bg-deep": palette.charcoal,
        "9m-fg": palette.silver,
        "9m-mute": palette.fog,
        "9m-paper": palette.milk,

        // Палитра
        "9m-indigo": palette.indigo,
        "9m-silver": palette.silver,
        "9m-teal": palette.teal,
        "9m-scarlet": palette.scarlet,
        "9m-lotus": palette.lotus,
        "9m-gold": palette.gold,
        "9m-forest": palette.forest,
        "9m-charcoal": palette.charcoal,
        "9m-milk": palette.milk,
        "9m-fog": palette.fog,
        "9m-crimson": palette.crimson,
        "9m-amber": palette.amber,
        "9m-slate": palette.slate,
        "9m-jasmine": palette.jasmine,

        // Уровни задач
        "9m-core": palette.silver,
        "9m-strong": palette.teal,
        "9m-advanced": palette.lotus,
        "9m-sphinx": palette.gold,
      },
      fontFamily: {
        sans: [
          "InterVariable",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: ["IBM Plex Serif", "Georgia", "serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
      backgroundImage: {
        "moonlight":
          "radial-gradient(ellipse at top, rgba(226,232,240,0.08) 0%, transparent 60%)",
        "crimson-moon":
          "radial-gradient(circle at 50% 30%, rgba(225,29,72,0.18) 0%, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 32px rgba(226,232,240,0.15)",
        "glow-gold": "0 0 32px rgba(245,158,11,0.25)",
        "glow-scarlet": "0 0 32px rgba(225,29,72,0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "lift": "lift 0.3s ease-out",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        lift: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-2px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
