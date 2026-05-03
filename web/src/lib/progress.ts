/**
 * Прогресс ученицы: хранится в localStorage.
 * Один пользователь (Лена) — один ключ, один объект.
 *
 * В Phase 6 переедет на бэкенд. Сейчас — просто client-side.
 */

const STORAGE_KEY = "9moons.progress.v1";

export interface LessonProgress {
  /** Сколько задач решено правильно */
  solvedCount: number;
  /** Всего задач в уроке (если известно) */
  totalCount: number;
  /** Процент выполнения 0..100 */
  percent: number;
  /** Дата последнего захода (ISO) */
  lastVisited: string;
  /** Урок завершён (по решению учителя или по 80%+ задач) */
  completed: boolean;
}

export interface ModuleProgress {
  /** Финальный урок пройден → загорается Луна модуля */
  completed: boolean;
  /** Дата получения артефакта */
  completedAt?: string;
}

export interface CourseProgress {
  /** Прогресс по урокам: ключ = "M.L" (например, "8.12") */
  lessons: Record<string, LessonProgress>;
  /** Прогресс по модулям: ключ = id модуля ("0".."12") */
  modules: Record<string, ModuleProgress>;
  /** Текущий урок (последний открытый) */
  currentLesson?: { moduleId: number; lessonId: number };
}

const EMPTY: CourseProgress = {
  lessons: {},
  modules: {},
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadProgress(): CourseProgress {
  if (!isBrowser()) return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return EMPTY;
  }
}

export function saveProgress(p: CourseProgress): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // ignore quota errors
  }
}

export function lessonKey(moduleId: number, lessonId: number): string {
  return `${moduleId}.${lessonId}`;
}

export function getLessonProgress(
  moduleId: number,
  lessonId: number
): LessonProgress | null {
  const all = loadProgress();
  return all.lessons[lessonKey(moduleId, lessonId)] ?? null;
}

export function setLessonProgress(
  moduleId: number,
  lessonId: number,
  p: Partial<LessonProgress>
): void {
  const all = loadProgress();
  const key = lessonKey(moduleId, lessonId);
  const prev = all.lessons[key] ?? {
    solvedCount: 0,
    totalCount: 0,
    percent: 0,
    lastVisited: new Date().toISOString(),
    completed: false,
  };
  all.lessons[key] = { ...prev, ...p };
  all.currentLesson = { moduleId, lessonId };
  saveProgress(all);
}

export function getModuleProgress(moduleId: number): ModuleProgress {
  const all = loadProgress();
  return all.modules[String(moduleId)] ?? { completed: false };
}

export function setModuleCompleted(moduleId: number): void {
  const all = loadProgress();
  all.modules[String(moduleId)] = {
    completed: true,
    completedAt: new Date().toISOString(),
  };
  saveProgress(all);
}

/** Сколько модулей завершено — для прогресс-бара эмблемы */
export function countCompletedModules(p?: CourseProgress): number {
  const data = p ?? loadProgress();
  return Object.values(data.modules).filter((m) => m.completed).length;
}

/** Стадия эмблемы (0..12) на основе текущего прогресса */
export function emblemStage(p?: CourseProgress): number {
  const data = p ?? loadProgress();
  // Считаем, что эмблема прокачивается шагами, как в stories/:
  //  - после модулей 1..9 → stage = N
  //  - после модуля 10 → stage 10 (добавляется Перо)
  //  - после модуля 11 → stage 11 (Кристалл)
  //  - после модуля 12 → stage 12 (Печать)
  let stage = 0;
  for (let i = 1; i <= 12; i++) {
    if (data.modules[String(i)]?.completed) stage = i;
  }
  return stage;
}

export function resetProgress(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
}
