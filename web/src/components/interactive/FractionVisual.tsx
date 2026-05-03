/**
 * Визуальный виджет для дробей (Модуль 1).
 *
 * Два режима:
 *   • mode="show"   — показывает дробь num/den (для теории и иллюстрации)
 *   • mode="answer" — ученик кликает по сегментам, чтобы закрасить
 *                     столько, сколько нужно (numTarget/denTarget). Проверяется.
 *
 * Форма: shape="pie" (круг) или "bar" (прямоугольник).
 */
import { useEffect, useState } from "react";
import {
  getTaskAttempt,
  setTaskAttempt,
  type TaskStatus,
} from "../../lib/progress.ts";

export interface FractionVisualProps {
  /** Знаменатель: на сколько частей делим */
  den: number;
  /** Числитель (для show-режима — что закрашено; для answer — целевое значение) */
  num?: number;
  /** Целевая дробь — для answer-режима (если не задана, используется num) */
  numTarget?: number;
  denTarget?: number;
  shape?: "pie" | "bar";
  mode?: "show" | "answer";
  /** Если answer — куда сохранять прогресс */
  moduleId?: number;
  lessonId?: number;
  taskNumber?: string;
  /** Подпись над виджетом */
  label?: string;
}

export default function FractionVisual({
  den,
  num = 0,
  numTarget,
  denTarget,
  shape = "pie",
  mode = "show",
  moduleId,
  lessonId,
  taskNumber,
  label,
}: FractionVisualProps): JSX.Element {
  const targetNum = numTarget ?? num;
  const targetDen = denTarget ?? den;

  // Множество выбранных сегментов (1-индексированных)
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set(mode === "show" ? Array.from({ length: num }, (_, i) => i + 1) : [])
  );
  const [status, setStatus] = useState<TaskStatus>("unanswered");

  // Восстановление прогресса
  useEffect(() => {
    if (mode !== "answer" || !moduleId || !lessonId || !taskNumber) return;
    const prev = getTaskAttempt(moduleId, lessonId, taskNumber);
    if (prev.status === "correct" && prev.lastAnswer) {
      try {
        const parsed = JSON.parse(prev.lastAnswer);
        if (Array.isArray(parsed)) setSelected(new Set(parsed));
      } catch {}
      setStatus("correct");
    }
  }, [mode, moduleId, lessonId, taskNumber]);

  const sectors = Array.from({ length: den }, (_, i) => i + 1);

  function toggle(i: number): void {
    if (mode !== "answer" || status === "correct") return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    setStatus("unanswered");
  }

  function check(): void {
    if (mode !== "answer") return;
    const ok = selected.size === targetNum && targetDen === den;
    const newStatus: TaskStatus = ok ? "correct" : "wrong";
    setStatus(newStatus);
    if (moduleId && lessonId && taskNumber) {
      const cur = getTaskAttempt(moduleId, lessonId, taskNumber);
      setTaskAttempt(moduleId, lessonId, taskNumber, {
        status: newStatus,
        attempts: (cur.attempts ?? 0) + 1,
        lastAnswer: JSON.stringify([...selected]),
      });
    }
  }

  function reset(): void {
    setSelected(new Set());
    setStatus("unanswered");
  }

  const PIE_R = 90;
  const PIE_C = 100;

  return (
    <div className="my-3 rounded-md border border-9m-silver/15 bg-9m-bg-deep/40 p-4">
      {label && (
        <p className="mb-3 text-sm text-9m-fog">{label}</p>
      )}

      <div className="flex flex-wrap items-center gap-6">
        {shape === "pie" ? (
          <svg viewBox="0 0 200 200" className="h-44 w-44">
            <circle cx={PIE_C} cy={PIE_C} r={PIE_R} fill="rgba(15,23,42,0.5)" />
            {sectors.map((i) => {
              const a0 = ((i - 1) / den) * 2 * Math.PI - Math.PI / 2;
              const a1 = (i / den) * 2 * Math.PI - Math.PI / 2;
              const x0 = PIE_C + PIE_R * Math.cos(a0);
              const y0 = PIE_C + PIE_R * Math.sin(a0);
              const x1 = PIE_C + PIE_R * Math.cos(a1);
              const y1 = PIE_C + PIE_R * Math.sin(a1);
              const isSel = selected.has(i);
              const large = (a1 - a0) > Math.PI ? 1 : 0;
              const path = `M ${PIE_C} ${PIE_C} L ${x0} ${y0} A ${PIE_R} ${PIE_R} 0 ${large} 1 ${x1} ${y1} Z`;
              return (
                <path
                  key={i}
                  d={path}
                  fill={isSel ? "#F472B6" : "rgba(226,232,240,0.05)"}
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  className={`transition-colors ${
                    mode === "answer" && status !== "correct" ? "cursor-pointer hover:opacity-90" : ""
                  }`}
                  onClick={() => toggle(i)}
                />
              );
            })}
          </svg>
        ) : (
          /* shape === "bar" */
          <div className="flex h-32 w-full max-w-md overflow-hidden rounded border-2 border-9m-silver/40">
            {sectors.map((i) => {
              const isSel = selected.has(i);
              return (
                <div
                  key={i}
                  className={`flex-1 border-r border-9m-silver/20 transition-colors last:border-r-0 ${
                    isSel ? "bg-9m-lotus" : "bg-9m-bg-deep/30"
                  } ${mode === "answer" && status !== "correct" ? "cursor-pointer hover:opacity-90" : ""}`}
                  onClick={() => toggle(i)}
                  role={mode === "answer" ? "button" : undefined}
                  aria-label={`Сегмент ${i} из ${den}`}
                />
              );
            })}
          </div>
        )}

        {/* Дробь как текст */}
        <div className="flex flex-col items-center font-display">
          <span className="text-3xl text-9m-silver">{selected.size}</span>
          <span className="my-1 h-px w-10 bg-9m-silver"></span>
          <span className="text-3xl text-9m-silver">{den}</span>
        </div>
      </div>

      {/* Управление в режиме answer */}
      {mode === "answer" && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {status !== "correct" ? (
            <button type="button" onClick={check} className="btn">
              Проверить
            </button>
          ) : null}
          <button type="button" onClick={reset} className="btn">
            ↻ Очистить
          </button>
          <span className="ml-auto">
            {status === "correct" && (
              <span className="text-9m-gold">✓ Верно</span>
            )}
            {status === "wrong" && (
              <span className="text-9m-scarlet">
                ✗ Должно быть {targetNum} из {targetDen}, у тебя {selected.size}
              </span>
            )}
            {status === "unanswered" && (
              <span className="text-9m-fog">Закрась нужное число секторов</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
