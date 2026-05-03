/**
 * Виджет для задач, которые **нельзя** проверить автоматически
 * (доказательства, открытые вопросы, объяснения).
 *
 * Ученик:
 *   1. Решает в тетради.
 *   2. Нажимает «Показать решение».
 *   3. Сравнивает.
 *   4. Отмечает «Решил сам / Не получилось» — это идёт в прогресс.
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
}

export default function SelfCheck({
  moduleId,
  lessonId,
  taskNumber,
  expectedAnswer,
}: SelfCheckProps): JSX.Element {
  const [status, setStatus] = useState<TaskStatus>("unanswered");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const prev = getTaskAttempt(moduleId, lessonId, taskNumber);
    setStatus(prev.status);
  }, [moduleId, lessonId, taskNumber]);

  function mark(s: TaskStatus): void {
    setStatus(s);
    setTaskAttempt(moduleId, lessonId, taskNumber, {
      status: s,
      attempts: 1,
    });
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-9m-silver/15 bg-9m-bg-deep/40 p-3 text-sm">
      {!showAnswer && expectedAnswer && (
        <button
          type="button"
          onClick={() => setShowAnswer(true)}
          className="btn"
        >
          🗝 Показать решение
        </button>
      )}
      {!expectedAnswer && (
        <span className="text-9m-fog">
          Реши в тетради. Проверь себя по разбору в методичке.
        </span>
      )}

      <div className="ml-auto flex gap-2">
        <button
          type="button"
          onClick={() => mark("correct")}
          className={`btn ${status === "correct" ? "border-9m-gold/60 text-9m-gold" : ""}`}
          aria-pressed={status === "correct"}
        >
          ✓ Решила
        </button>
        <button
          type="button"
          onClick={() => mark("wrong")}
          className={`btn ${status === "wrong" ? "border-9m-scarlet/60 text-9m-scarlet" : ""}`}
          aria-pressed={status === "wrong"}
        >
          ✗ Не получилось
        </button>
      </div>

      {showAnswer && expectedAnswer && (
        <div className="w-full rounded bg-9m-charcoal/60 p-3 text-sm text-9m-silver/90">
          <p className="mb-1 text-xs uppercase tracking-widest text-9m-fog">
            Решение
          </p>
          <div className="prose-lesson text-sm">{expectedAnswer}</div>
        </div>
      )}
    </div>
  );
}
