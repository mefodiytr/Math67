/**
 * Универсальный «само-проверочный» виджет для открытых задач
 * (доказательства, «расставь скобки», «нарисуй», «придумай»).
 *
 * UX:
 *   1. Ученик пишет своё решение в textarea (опционально).
 *   2. Нажимает «Сохранить» — ответ запоминается в localStorage.
 *   3. Нажимает «✓ Решила» / «✗ Не получилось» — статус идёт в прогресс.
 *   4. Если в уроке есть ответ — может открыть «Показать решение» и сравнить.
 */
import { useEffect, useState } from "react";
import {
  getTaskAttempt,
  setTaskAttempt,
  type TaskStatus,
} from "../../lib/progress.ts";

export interface SelfCheckProps {
  moduleId: number;
  lessonId: number;
  taskNumber: string;
  expectedAnswer?: string;
  /** Подсказка-плейсхолдер в textarea */
  placeholder?: string;
}

export default function SelfCheck({
  moduleId,
  lessonId,
  taskNumber,
  expectedAnswer,
  placeholder = "Напиши решение или ответ здесь…",
}: SelfCheckProps): JSX.Element {
  const [status, setStatus] = useState<TaskStatus>("unanswered");
  const [showAnswer, setShowAnswer] = useState(false);
  const [draft, setDraft] = useState("");
  const [savedDraft, setSavedDraft] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    const prev = getTaskAttempt(moduleId, lessonId, taskNumber);
    setStatus(prev.status);
    if (prev.lastAnswer) {
      setDraft(prev.lastAnswer);
      setSavedDraft(prev.lastAnswer);
    }
  }, [moduleId, lessonId, taskNumber]);

  function persist(s: TaskStatus, answer?: string): void {
    const cur = getTaskAttempt(moduleId, lessonId, taskNumber);
    setTaskAttempt(moduleId, lessonId, taskNumber, {
      status: s,
      attempts: (cur.attempts ?? 0) + (s !== "unanswered" ? 1 : 0),
      lastAnswer: answer ?? cur.lastAnswer,
    });
  }

  function saveDraft(): void {
    persist(status, draft);
    setSavedDraft(draft);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1500);
  }

  function mark(s: TaskStatus): void {
    setStatus(s);
    persist(s, draft);
  }

  const hasUnsavedChanges = draft !== savedDraft;

  return (
    <div className="mt-3 space-y-2 rounded-md border border-9m-silver/15 bg-9m-bg-deep/40 p-3">
      <textarea
        rows={2}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-md border border-9m-silver/15 bg-9m-charcoal/50 p-2 text-sm text-9m-silver placeholder:text-9m-fog/50 focus:border-9m-silver/40 focus:outline-none"
      />

      <div className="flex flex-wrap items-center gap-2 text-sm">
        {/* Сохранить ответ */}
        <button
          type="button"
          onClick={saveDraft}
          disabled={!hasUnsavedChanges && !justSaved}
          className={`btn ${justSaved ? "border-9m-teal/60 text-9m-teal" : ""} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {justSaved ? "✓ Сохранено" : "💾 Сохранить"}
        </button>

        {/* Показать решение */}
        {expectedAnswer && !showAnswer && (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="btn"
          >
            🗝 Показать решение
          </button>
        )}

        {/* Самопроверка справа */}
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => mark("correct")}
            className={`btn ${status === "correct" ? "border-9m-gold/60 text-9m-gold" : ""}`}
            aria-pressed={status === "correct"}
            title="Я решила правильно"
          >
            ✓ Решила
          </button>
          <button
            type="button"
            onClick={() => mark("wrong")}
            className={`btn ${status === "wrong" ? "border-9m-scarlet/60 text-9m-scarlet" : ""}`}
            aria-pressed={status === "wrong"}
            title="Не получилось — потом разберём"
          >
            ✗ Не получилось
          </button>
        </div>
      </div>

      {/* Решение (после нажатия) */}
      {showAnswer && expectedAnswer && (
        <div className="rounded bg-9m-charcoal/60 p-3 text-sm text-9m-silver/90">
          <p className="mb-1 text-xs uppercase tracking-widest text-9m-fog">
            Решение / ответ
          </p>
          <div className="prose-lesson text-sm">{expectedAnswer}</div>
        </div>
      )}

      {/* Подсказка статуса */}
      {!showAnswer && !expectedAnswer && status === "unanswered" && (
        <p className="text-xs text-9m-fog">
          Открытая задача. Напиши решение в поле выше и отметь статус.
          Точный ответ — в методичке учителя.
        </p>
      )}
    </div>
  );
}
