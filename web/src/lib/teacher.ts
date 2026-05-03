/**
 * Учительский журнал. Хранит записи дневника по урокам в localStorage.
 *
 * Один учитель = одно устройство. В Phase 6 переедет на бэкенд.
 */

const STORAGE_KEY = "9moons.teacher.v1";

export interface DiaryEntry {
  /** Шкалы 1..5 по темам урока (тема → оценка) */
  ratings: Record<string, number>;
  /** Свободная заметка учителя */
  note: string;
  /** ISO-таймстемп последнего сохранения */
  savedAt: string;
}

export interface TeacherJournal {
  /** Записи дневника по ключу "M.L" (например, "8.12") */
  diaries: Record<string, DiaryEntry>;
  /** Имя учителя (для будущих экспортов) */
  teacherName?: string;
  /** Имя ученицы (по умолчанию «Лена») */
  studentName?: string;
}

const EMPTY: TeacherJournal = { diaries: {} };

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadJournal(): TeacherJournal {
  if (!isBrowser()) return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return EMPTY;
  }
}

export function saveJournal(j: TeacherJournal): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(j));
  } catch {}
}

export function diaryKey(moduleId: number, lessonId: number): string {
  return `${moduleId}.${lessonId}`;
}

export function getDiary(moduleId: number, lessonId: number): DiaryEntry | null {
  return loadJournal().diaries[diaryKey(moduleId, lessonId)] ?? null;
}

export function setDiary(
  moduleId: number,
  lessonId: number,
  entry: Pick<DiaryEntry, "ratings" | "note">
): void {
  const j = loadJournal();
  j.diaries[diaryKey(moduleId, lessonId)] = {
    ratings: entry.ratings,
    note: entry.note,
    savedAt: new Date().toISOString(),
  };
  saveJournal(j);
}

export function deleteDiary(moduleId: number, lessonId: number): void {
  const j = loadJournal();
  delete j.diaries[diaryKey(moduleId, lessonId)];
  saveJournal(j);
}

/** Среднее по всем темам в записи (или null, если пусто). */
export function averageRating(entry: DiaryEntry | null | undefined): number | null {
  if (!entry) return null;
  const vals = Object.values(entry.ratings).filter((v) => typeof v === "number");
  if (vals.length === 0) return null;
  return vals.reduce((s, v) => s + v, 0) / vals.length;
}

// ─────────────────────── CSV-экспорт ───────────────────────

/** Все записи журнала в виде CSV-строки. */
export function exportCSV(j: TeacherJournal): string {
  // Собираем все встречавшиеся темы (заголовки колонок)
  const allThemes = new Set<string>();
  for (const e of Object.values(j.diaries)) {
    for (const k of Object.keys(e.ratings)) allThemes.add(k);
  }
  const themes = [...allThemes].sort();

  const headers = ["Урок", "Дата", ...themes, "Среднее", "Заметка"];

  const rows: string[][] = [];
  const sortedKeys = Object.keys(j.diaries).sort((a, b) => {
    const [ma, la] = a.split(".").map(Number);
    const [mb, lb] = b.split(".").map(Number);
    if (ma !== mb) return ma - mb;
    return la - lb;
  });

  for (const key of sortedKeys) {
    const e = j.diaries[key];
    const ratings = themes.map((t) => (e.ratings[t] !== undefined ? String(e.ratings[t]) : ""));
    const avg = averageRating(e);
    rows.push([
      key,
      formatDate(e.savedAt),
      ...ratings,
      avg !== null ? avg.toFixed(2) : "",
      escapeCSV(e.note),
    ]);
  }

  const csv = [headers.map(escapeCSV).join(","), ...rows.map((r) => r.join(","))].join("\n");
  // BOM для корректного открытия в Excel
  return "﻿" + csv;
}

function escapeCSV(s: string): string {
  if (s == null) return "";
  const str = String(s);
  if (/[",\n;]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toISOString().slice(0, 10);
  } catch {
    return iso;
  }
}

/** Скачать журнал как файл. Только в браузере. */
export function downloadJournalCSV(): void {
  if (!isBrowser()) return;
  const csv = exportCSV(loadJournal());
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `9moons-journal-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
