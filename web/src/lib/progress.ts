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

export type TaskStatus = "unanswered" | "correct" | "wrong";

export interface TaskAttempt {
  /** Текущий статус */
  status: TaskStatus;
  /** Сколько раз пробовала (включая правильную) */
  attempts: number;
  /** Последний введённый ответ (для UX — показать, что было) */
  lastAnswer?: string;
  /** Когда был последний ответ */
  answeredAt?: string;
}

export interface StreakData {
  /** Текущая серия правильных ответов подряд */
  current: number;
  /** Лучшая серия за всё время */
  best: number;
  /** Когда обновлялся (ISO) */
  updatedAt?: string;
}

export interface CourseProgress {
  /** Прогресс по урокам: ключ = "M.L" (например, "8.12") */
  lessons: Record<string, LessonProgress>;
  /** Прогресс по модулям: ключ = id модуля ("0".."12") */
  modules: Record<string, ModuleProgress>;
  /** Прогресс по задачам: ключ = "M.L.N" (например, "8.12.5") */
  tasks: Record<string, TaskAttempt>;
  /** Серия правильных ответов */
  streak: StreakData;
  /** Текущий урок (последний открытый) */
  currentLesson?: { moduleId: number; lessonId: number };
}

const EMPTY: CourseProgress = {
  lessons: {},
  modules: {},
  tasks: {},
  streak: { current: 0, best: 0 },
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadProgress(): CourseProgress {
  if (!isBrowser()) return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return {
      ...EMPTY,
      ...parsed,
      lessons: parsed.lessons ?? {},
      modules: parsed.modules ?? {},
      tasks: parsed.tasks ?? {},
      streak: parsed.streak ?? { current: 0, best: 0 },
    };
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

export function taskKey(
  moduleId: number,
  lessonId: number,
  taskNumber: string
): string {
  return `${moduleId}.${lessonId}.${taskNumber}`;
}

export function getTaskAttempt(
  moduleId: number,
  lessonId: number,
  taskNumber: string
): TaskAttempt {
  const all = loadProgress();
  return (
    all.tasks[taskKey(moduleId, lessonId, taskNumber)] ?? {
      status: "unanswered",
      attempts: 0,
    }
  );
}

export function setTaskAttempt(
  moduleId: number,
  lessonId: number,
  taskNumber: string,
  attempt: Partial<TaskAttempt>
): void {
  const all = loadProgress();
  const key = taskKey(moduleId, lessonId, taskNumber);
  const prev = all.tasks[key] ?? {
    status: "unanswered" as TaskStatus,
    attempts: 0,
  };
  const next: TaskAttempt = {
    status: attempt.status ?? prev.status,
    attempts: attempt.attempts ?? prev.attempts,
    lastAnswer: attempt.lastAnswer ?? prev.lastAnswer,
    answeredAt: attempt.answeredAt ?? new Date().toISOString(),
  };
  all.tasks[key] = next;

  // Автоматически пересчитываем solvedCount урока:
  const correctTasks = Object.entries(all.tasks).filter(
    ([k, v]) => k.startsWith(`${moduleId}.${lessonId}.`) && v.status === "correct"
  ).length;
  const lk = lessonKey(moduleId, lessonId);
  const lp = all.lessons[lk] ?? {
    solvedCount: 0,
    totalCount: 0,
    percent: 0,
    lastVisited: new Date().toISOString(),
    completed: false,
  };
  lp.solvedCount = correctTasks;
  if (lp.totalCount > 0) {
    lp.percent = Math.round((correctTasks / lp.totalCount) * 100);
  }
  lp.lastVisited = new Date().toISOString();
  all.lessons[lk] = lp;
  all.currentLesson = { moduleId, lessonId };

  saveProgress(all);
}

/** Установить общее число задач в уроке (вызывается при загрузке страницы урока). */
export function setLessonTotal(
  moduleId: number,
  lessonId: number,
  totalCount: number
): void {
  const all = loadProgress();
  const lk = lessonKey(moduleId, lessonId);
  const lp = all.lessons[lk] ?? {
    solvedCount: 0,
    totalCount: 0,
    percent: 0,
    lastVisited: new Date().toISOString(),
    completed: false,
  };
  if (lp.totalCount !== totalCount) {
    lp.totalCount = totalCount;
    if (totalCount > 0) {
      lp.percent = Math.round((lp.solvedCount / totalCount) * 100);
    }
    all.lessons[lk] = lp;
    saveProgress(all);
  }
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

// ───────────────────── streak (серия правильных) ─────────────────────

/**
 * Обновляет серию правильных ответов. Вызывается каждым TaskInput /
 * ExpressionInput при `correct=true|false`.
 *  - correct=true  → current++ (и best обновляется если current > best)
 *  - correct=false → current сбрасывается до 0
 */
export function bumpStreak(correct: boolean): StreakData {
  const all = loadProgress();
  const s = all.streak ?? { current: 0, best: 0 };
  if (correct) {
    s.current += 1;
    if (s.current > s.best) s.best = s.current;
  } else {
    s.current = 0;
  }
  s.updatedAt = new Date().toISOString();
  all.streak = s;
  saveProgress(all);
  // Уведомляем UI через storage-event (он внутри той же вкладки не срабатывает,
  // поэтому шлём ещё custom-event)
  if (isBrowser()) {
    window.dispatchEvent(new CustomEvent("9moons:streak", { detail: s }));
  }
  return s;
}

export function getStreak(): StreakData {
  return loadProgress().streak ?? { current: 0, best: 0 };
}
