/**
 * Парсер методичек учителя из ../teacher-guides/module-NN/lesson-MM-guide.md.
 *
 * Извлекает:
 *   • Темы для шкал 1–5 (из блока «Дневник» / «Карта модуля»)
 *   • Цели урока
 *   • «Где ломается» — типичные ошибки
 *   • Решения задач
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const GUIDE_ROOT = new URL("../../../teacher-guides", import.meta.url).pathname;

export interface TeacherGuide {
  moduleId: number;
  lessonId: number;
  /** Темы из шкал 1–5 (в порядке появления) */
  themes: string[];
  /** Цели урока (Markdown) */
  goals?: string;
  /** «Где ломается» — типичные ошибки */
  pitfalls?: string;
  /** Решения */
  solutions?: string;
  /** Тайминг (Markdown / таблица) */
  timing?: string;
  /** Сырая методичка (для фолбэка отображения целиком) */
  raw: string;
}

// ───────────────── helpers ─────────────────

function parseFilename(filename: string): { lesson: number } | null {
  const m = filename.match(/^lesson-(\d{2})-guide\.md$/);
  if (!m) return null;
  return { lesson: parseInt(m[1], 10) };
}

function splitSections(md: string): { topHeading: string | null; sections: { heading: string; body: string }[] } {
  const lines = md.split("\n");
  const sections: { heading: string; body: string }[] = [];
  let topHeading: string | null = null;
  let currentHeading: string | null = null;
  let currentBody: string[] = [];

  const flush = () => {
    if (currentHeading !== null) {
      sections.push({ heading: currentHeading, body: currentBody.join("\n").trim() });
    }
  };

  for (const line of lines) {
    if (line.startsWith("# ") && topHeading === null) {
      topHeading = line.slice(2).trim();
      continue;
    }
    if (line.startsWith("## ")) {
      flush();
      currentHeading = line.slice(3).trim();
      currentBody = [];
    } else {
      if (currentHeading !== null) currentBody.push(line);
    }
  }
  flush();
  return { topHeading, sections };
}

/**
 * Извлекает названия тем из строк вида:
 *
 *   Перебор:                              [1 2 3 4 5]
 *   Дерево вариантов:                     [1 2 3 4 5]
 */
function extractThemes(text: string): string[] {
  const themes: string[] = [];
  const seen = new Set<string>();
  const rx = /^([^:\n]+):\s*\[1\s+2\s+3\s+4\s+5\]/gmu;
  let m: RegExpExecArray | null;
  while ((m = rx.exec(text)) !== null) {
    const name = m[1]
      .trim()
      // убираем «Урок NN.MM» если попался
      .replace(/^Урок\s+\d+(\.\d+)?$/i, "")
      .trim();
    if (!name) continue;
    if (!seen.has(name)) {
      seen.add(name);
      themes.push(name);
    }
  }
  return themes;
}

// ───────────────── main ─────────────────

export function parseGuideFile(absPath: string): TeacherGuide | null {
  let md: string;
  try {
    md = readFileSync(absPath, "utf-8");
  } catch {
    return null;
  }

  const filename = basename(absPath);
  const fileMeta = parseFilename(filename);
  if (!fileMeta) return null;

  const moduleDir = absPath.split("/").slice(-2, -1)[0];
  const modMatch = moduleDir.match(/^module-(\d{2})$/);
  if (!modMatch) return null;
  const moduleId = parseInt(modMatch[1], 10);

  const { sections } = splitSections(md);

  const guide: TeacherGuide = {
    moduleId,
    lessonId: fileMeta.lesson,
    themes: extractThemes(md),
    raw: md,
  };

  for (const sec of sections) {
    const h = sec.heading.toLowerCase();
    if (h.startsWith("цели")) guide.goals = sec.body;
    else if (h.includes("где «ломается»") || h.includes("где ломается") || h.startsWith("где «"))
      guide.pitfalls = sec.body;
    else if (h.startsWith("решен")) guide.solutions = sec.body;
    else if (h.startsWith("тайминг")) guide.timing = sec.body;
  }

  return guide;
}

export function loadGuide(moduleId: number, lessonId: number): TeacherGuide | null {
  const dir = join(GUIDE_ROOT, `module-${String(moduleId).padStart(2, "0")}`);
  const prefix = `lesson-${String(lessonId).padStart(2, "0")}-`;
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith("-guide.md"));
  } catch {
    return null;
  }
  if (files.length === 0) return null;
  return parseGuideFile(join(dir, files[0]));
}

export function loadModuleGuides(moduleId: number): TeacherGuide[] {
  const dir = join(GUIDE_ROOT, `module-${String(moduleId).padStart(2, "0")}`);
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => /^lesson-\d{2}-.+-guide\.md$/.test(f));
  } catch {
    return [];
  }
  files.sort();
  return files
    .map((f) => parseGuideFile(join(dir, f)))
    .filter((g): g is TeacherGuide => g !== null);
}

/** Дефолтные темы, если в методичке шкал нет (для уроков без блока «Дневник»). */
export function defaultThemes(): string[] {
  return ["Понимание идеи", "Решение задач", "Сложность для ученицы"];
}
