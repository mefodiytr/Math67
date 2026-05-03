/**
 * Парсер существующих уроков из ../lessons/module-NN/lesson-MM-*.md
 *
 * Уроки имеют регулярную структуру (см. world-bible.md / любой готовый урок).
 * Парсим их в типизированную структуру `Lesson` для рендера на сайте.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import type {
  Lesson,
  TaskSection,
  Task,
  Difficulty,
  EnglishBlock,
  SphinxFinal,
} from "./types.ts";
import { parseAnswers, detectAnswerType } from "./answers.ts";

// Корень контента (относительно web/, поднимаемся на уровень выше)
const CONTENT_ROOT = new URL("../../../lessons", import.meta.url).pathname;

// ───────────────────────── helpers ─────────────────────────

const STAR = /★/g;

function countStars(text: string): number {
  const m = text.match(STAR);
  return m ? m.length : 0;
}

/** "★★★ Strong" → 3 (clamped to 1..4) */
function difficultyFromHeading(heading: string): Difficulty {
  const n = countStars(heading);
  if (n === 0) return 1;
  if (n > 4) return 4;
  return n as Difficulty;
}

/** Из имени файла "lesson-12-final.md" → { number: 12, slug: "final" } */
function parseFilename(filename: string): { number: number; slug: string } | null {
  const m = filename.match(/^lesson-(\d{2})-(.+)\.md$/);
  if (!m) return null;
  return {
    number: parseInt(m[1], 10),
    slug: m[2],
  };
}

/** Из заголовка "# Урок 8.12 — Великий Фонарь. Финал" вытащить "Великий Фонарь. Финал" */
function extractShortTitle(title: string): string {
  // Убираем префикс "Урок N.M —" / "Урок N.M -" / "Урок N.M"
  return title
    .replace(/^Урок\s+\d+\.\d+\s*[—–-]?\s*/u, "")
    .replace(/^# /, "")
    .trim();
}

// ───────────────────────── section splitter ─────────────────────────

interface RawSection {
  level: number; // 1, 2, 3
  heading: string; // без "##"
  body: string; // содержимое до следующего заголовка того же или большего уровня
}

/**
 * Разбивает Markdown на секции по `## …` заголовкам.
 * Игнорирует `# …` (это title) и `### …` (внутренние).
 */
function splitSections(md: string): { topHeading: string | null; sections: RawSection[] } {
  const lines = md.split("\n");
  const sections: RawSection[] = [];
  let topHeading: string | null = null;
  let currentHeading: string | null = null;
  let currentBody: string[] = [];

  const flush = () => {
    if (currentHeading !== null) {
      sections.push({
        level: 2,
        heading: currentHeading,
        body: currentBody.join("\n").trim(),
      });
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

// ───────────────────────── task extractor ─────────────────────────

/**
 * Из тела секции с задачами вытаскивает нумерованные пункты.
 * Поддерживает много-строчные задачи.
 */
function extractTasks(body: string, difficulty: Difficulty, sectionName: string): Task[] {
  // Линии, начинающиеся с "1. ", "2. ", ..., возможно с продолжением (>= 2 пробела)
  const lines = body.split("\n");
  const tasks: Task[] = [];
  let current: { number: string; lines: string[] } | null = null;

  const numericLine = /^(\d+)\.\s+(.*)$/;

  for (const line of lines) {
    const m = line.match(numericLine);
    if (m) {
      if (current) {
        tasks.push({
          number: current.number,
          text: current.lines.join("\n").trim(),
          difficulty,
          section: sectionName,
        });
      }
      current = { number: m[1], lines: [m[2]] };
    } else if (current) {
      // Строка-продолжение (если не пустая и не блок-разделитель)
      if (line.trim() === "") {
        current.lines.push("");
      } else if (/^\s+/.test(line) || /^>/.test(line.trim())) {
        // Продолжение задачи: отступ или цитата
        current.lines.push(line);
      } else {
        // Похоже, текст вышел за рамки списка
        current.lines.push(line);
      }
    }
  }
  if (current) {
    tasks.push({
      number: current.number,
      text: current.lines.join("\n").trim(),
      difficulty,
      section: sectionName,
    });
  }

  return tasks;
}

// ───────────────────────── english block ─────────────────────────

const ENGLISH_TRANSLATION_RX = /\[Перевод:\s*«?([^\]]+?)»?\]/u;

function parseEnglishBlock(body: string): EnglishBlock {
  const trMatch = body.match(ENGLISH_TRANSLATION_RX);
  const translation = trMatch ? trMatch[1].trim() : "";
  const text = body.replace(ENGLISH_TRANSLATION_RX, "").trim();
  return { text, teacherTranslation: translation };
}

// ───────────────────────── sphinx ─────────────────────────

function parseSphinx(heading: string, body: string): SphinxFinal {
  return {
    heading,
    text: body.trim(),
  };
}

// ───────────────────────── answers (under <details>) ─────────────────────────

function extractAnswers(md: string): string | undefined {
  const match = md.match(/<details>[\s\S]*?<summary>\s*Ответы\s*<\/summary>([\s\S]*?)<\/details>/u);
  if (!match) return undefined;
  return match[1].trim();
}

// ───────────────────────── duration ─────────────────────────

const DURATION_RX = /Длительность:\s*(\d+)\s*мин/u;

function extractDuration(md: string): number | undefined {
  const m = md.match(DURATION_RX);
  return m ? parseInt(m[1], 10) : undefined;
}

// ───────────────────────── curator ─────────────────────────

const CURATOR_RX = /Куратор[ы]?:\s*([^.\n]+)/u;
const CURATOR_NAMES_TO_IDS: Record<string, string> = {
  Цукико: "tsukiko",
  Манэки: "maneki",
  Хана: "hana",
  Цинлун: "cinglong",
  Куро: "kuro",
  Бакэнэко: "bakeneko",
  Сфинкс: "sphinx",
  "Сфинкс Хатор": "sphinx",
  Кицунэ: "kitsune",
  Тануки: "tanuki",
  Сэйрин: "seirin",
  Хэйхи: "heihime",
  Байху: "baihu",
};

function extractCurator(md: string): string | undefined {
  const m = md.match(CURATOR_RX);
  if (!m) return undefined;
  const raw = m[1].trim();
  // Берём первого упомянутого
  for (const [name, id] of Object.entries(CURATOR_NAMES_TO_IDS)) {
    if (raw.includes(name)) return id;
  }
  return undefined;
}

// ───────────────────────── main parser ─────────────────────────

export function parseLessonFile(absPath: string): Lesson | null {
  const md = readFileSync(absPath, "utf-8");
  const filename = basename(absPath);
  const fileMeta = parseFilename(filename);
  if (!fileMeta) return null;

  // Извлекаем moduleId из имени родительской папки: "module-08" → 8
  const moduleDir = absPath.split("/").slice(-2, -1)[0]; // "module-08"
  const modMatch = moduleDir.match(/^module-(\d{2})$/);
  if (!modMatch) return null;
  const moduleId = parseInt(modMatch[1], 10);

  const { topHeading, sections } = splitSections(md);
  const title = topHeading ?? `Урок ${moduleId}.${fileMeta.number}`;
  const shortTitle = extractShortTitle(title);

  const lesson: Lesson = {
    moduleId,
    lessonId: fileMeta.number,
    slug: fileMeta.slug,
    title,
    shortTitle,
    duration: extractDuration(md),
    curator: extractCurator(md),
    sections: [],
    rawMarkdown: md,
  };

  for (const sec of sections) {
    const heading = sec.heading;
    const headingLower = heading.toLowerCase();

    // Sphinx — особая
    if (heading.includes("Sphinx") || /★★★★/.test(heading)) {
      lesson.sphinx = parseSphinx(heading, sec.body);
      continue;
    }

    // English
    if (/^english/i.test(heading)) {
      lesson.english = parseEnglishBlock(sec.body);
      continue;
    }

    // Сюжет
    if (heading === "Сюжет" || headingLower.startsWith("сюжет")) {
      lesson.story = sec.body;
      continue;
    }

    // Идея / Главное / Что узнаем
    if (
      heading === "Идея" ||
      heading.startsWith("Идея") ||
      heading === "Что узнаем" ||
      heading === "Главное"
    ) {
      lesson.idea = sec.body;
      continue;
    }

    // Кошачий факт
    if (heading.includes("Кошачий факт") || heading.includes("Миф")) {
      lesson.catFact = sec.body;
      continue;
    }

    // Рефлексия
    if (heading.startsWith("Рефлексия")) {
      lesson.reflection = sec.body;
      continue;
    }

    // Домашка
    if (heading.startsWith("Домашка") || heading.includes("Домашний")) {
      lesson.homework = sec.body;
      continue;
    }

    // Часть I/II/III/IV/V — задачи
    if (/^Часть\s+[IVX]+/u.test(heading) || /★/.test(heading)) {
      const difficulty = difficultyFromHeading(heading);
      const name = heading
        .replace(/^Часть\s+[IVX]+\s*[—-]?\s*/u, "")
        .replace(/\s*\(★+\)/g, "")
        .replace(/\s*★+/g, "")
        .trim();

      const tasks = extractTasks(sec.body, difficulty, name);
      const taskSection: TaskSection = {
        heading,
        name,
        difficulty,
        tasks,
      };
      lesson.sections.push(taskSection);
      continue;
    }
  }

  lesson.answers = extractAnswers(md);

  // Привязываем ответы к задачам
  if (lesson.answers) {
    const parsed = parseAnswers(lesson.answers);
    for (const sec of lesson.sections) {
      for (const t of sec.tasks) {
        const ans = parsed.byNumber[t.number];
        if (ans) {
          t.expectedAnswer = ans;
          t.answerType = detectAnswerType(ans, t.text);
        }
      }
    }
    if (lesson.sphinx && parsed.sphinx) {
      lesson.sphinx.expectedAnswer = parsed.sphinx;
      lesson.sphinx.answerType = detectAnswerType(parsed.sphinx, lesson.sphinx.text);
    }
  }

  return lesson;
}

// ───────────────────────── batch loader ─────────────────────────

export function listLessonFiles(): string[] {
  const result: string[] = [];
  const moduleDirs = readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^module-\d{2}$/.test(d.name))
    .map((d) => join(CONTENT_ROOT, d.name));

  for (const dir of moduleDirs) {
    const files = readdirSync(dir).filter((f) => /^lesson-\d{2}-.+\.md$/.test(f));
    files.sort();
    for (const f of files) result.push(join(dir, f));
  }
  return result;
}

export function loadAllLessons(): Lesson[] {
  return listLessonFiles()
    .map((f) => {
      try {
        return parseLessonFile(f);
      } catch (err) {
        console.error("[parse-lesson] failed:", f, err);
        return null;
      }
    })
    .filter((l): l is Lesson => l !== null);
}

export function loadLesson(moduleId: number, lessonId: number): Lesson | null {
  const moduleDir = join(CONTENT_ROOT, `module-${String(moduleId).padStart(2, "0")}`);
  const prefix = `lesson-${String(lessonId).padStart(2, "0")}-`;
  let files: string[] = [];
  try {
    files = readdirSync(moduleDir).filter((f) => f.startsWith(prefix) && f.endsWith(".md"));
  } catch {
    return null;
  }
  if (files.length === 0) return null;
  return parseLessonFile(join(moduleDir, files[0]));
}

export function loadModule(moduleId: number): Lesson[] {
  const moduleDir = join(CONTENT_ROOT, `module-${String(moduleId).padStart(2, "0")}`);
  let files: string[] = [];
  try {
    files = readdirSync(moduleDir).filter((f) => /^lesson-\d{2}-.+\.md$/.test(f));
  } catch {
    return [];
  }
  files.sort();
  return files
    .map((f) => parseLessonFile(join(moduleDir, f)))
    .filter((l): l is Lesson => l !== null);
}
