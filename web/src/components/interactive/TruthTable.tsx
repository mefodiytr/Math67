/**
 * Таблица истинности — заполни И / ИЛИ / НЕ.
 * Полезно для модуля 11 (Зал Девяти Зеркал).
 *
 * Ученик кликает по ячейкам последнего столбца, переключая И / Л.
 * Можно дать несколько столбцов с разными выражениями — ученик заполняет каждый.
 */
import { useEffect, useState } from "react";
import {
  getTaskAttempt,
  setTaskAttempt,
  type TaskStatus,
} from "../../lib/progress.ts";

type Bit = 0 | 1; // 0 = Л, 1 = И

export interface TruthTableProps {
  /** Имена входных переменных, например ["A", "B"] */
  vars: string[];
  /** Ожидаемые столбцы: { имя: значения сверху-вниз для всех 2^n строк } */
  columns: { name: string; values: Bit[] }[];
  /** Какие столбцы — для заполнения учеником (по индексу в columns) */
  fillIn?: number[];
  moduleId?: number;
  lessonId?: number;
  taskNumber?: string;
  label?: string;
}

export default function TruthTable({
  vars,
  columns,
  fillIn,
  moduleId,
  lessonId,
  taskNumber,
  label,
}: TruthTableProps): JSX.Element {
  const fillSet = new Set(fillIn ?? [columns.length - 1]);
  const n = vars.length;
  const rows = 1 << n;

  // Входные данные — генерируются автоматически (00, 01, 10, 11, ...)
  const inputs: Bit[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: Bit[] = [];
    for (let j = n - 1; j >= 0; j--) {
      row.push(((i >> j) & 1) as Bit);
    }
    inputs.push(row);
  }

  // Ответы ученика по [colIdx][rowIdx] → Bit | null
  const [answers, setAnswers] = useState<(Bit | null)[][]>(() =>
    columns.map((c, ci) =>
      fillSet.has(ci) ? Array.from({ length: rows }, () => null as Bit | null) : c.values
    )
  );
  const [status, setStatus] = useState<TaskStatus>("unanswered");

  useEffect(() => {
    if (!moduleId || !lessonId || !taskNumber) return;
    const prev = getTaskAttempt(moduleId, lessonId, taskNumber);
    if (prev.status === "correct" && prev.lastAnswer) {
      try {
        const parsed = JSON.parse(prev.lastAnswer);
        if (Array.isArray(parsed)) setAnswers(parsed);
      } catch {}
      setStatus("correct");
    }
  }, [moduleId, lessonId, taskNumber]);

  function toggle(col: number, row: number): void {
    if (status === "correct") return;
    if (!fillSet.has(col)) return;
    setAnswers((prev) => {
      const next = prev.map((c) => [...c]);
      const cur = next[col][row];
      next[col][row] = cur === null ? 1 : cur === 1 ? 0 : null;
      return next;
    });
    setStatus("unanswered");
  }

  function check(): void {
    let ok = true;
    for (let ci = 0; ci < columns.length; ci++) {
      if (!fillSet.has(ci)) continue;
      for (let ri = 0; ri < rows; ri++) {
        if (answers[ci][ri] !== columns[ci].values[ri]) {
          ok = false;
          break;
        }
      }
      if (!ok) break;
    }
    const newStatus: TaskStatus = ok ? "correct" : "wrong";
    setStatus(newStatus);
    if (moduleId && lessonId && taskNumber) {
      const cur = getTaskAttempt(moduleId, lessonId, taskNumber);
      setTaskAttempt(moduleId, lessonId, taskNumber, {
        status: newStatus,
        attempts: (cur.attempts ?? 0) + 1,
        lastAnswer: JSON.stringify(answers),
      });
    }
  }

  function reset(): void {
    setAnswers(
      columns.map((c, ci) =>
        fillSet.has(ci) ? Array.from({ length: rows }, () => null as Bit | null) : c.values
      )
    );
    setStatus("unanswered");
  }

  function bitText(b: Bit | null): string {
    if (b === null) return "?";
    return b === 1 ? "И" : "Л";
  }

  function bitClass(b: Bit | null, isFillin: boolean): string {
    let base = "h-10 w-12 border border-9m-silver/15 text-center font-display text-base";
    if (isFillin) {
      base += " cursor-pointer transition-colors";
    }
    if (b === 1) base += " bg-9m-gold/15 text-9m-gold";
    else if (b === 0) base += " bg-9m-fog/10 text-9m-silver/80";
    else base += " bg-9m-bg-deep/40 text-9m-fog";
    return base;
  }

  return (
    <div className="my-3 rounded-md border border-9m-silver/15 bg-9m-bg-deep/40 p-4">
      {label && <p className="mb-3 text-sm text-9m-fog">{label}</p>}

      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              {vars.map((v) => (
                <th
                  key={v}
                  className="h-10 w-12 border border-9m-silver/30 bg-9m-charcoal/60 text-center font-display text-base text-9m-silver"
                >
                  {v}
                </th>
              ))}
              {columns.map((c, ci) => (
                <th
                  key={c.name}
                  className="h-10 min-w-[3rem] border border-9m-silver/30 bg-9m-charcoal/60 px-2 text-center font-display text-base text-9m-silver"
                >
                  {c.name}
                  {fillSet.has(ci) && <span className="ml-1 text-9m-gold">*</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inputs.map((row, ri) => (
              <tr key={ri}>
                {row.map((b, vi) => (
                  <td key={vi} className={bitClass(b, false)}>
                    {bitText(b)}
                  </td>
                ))}
                {columns.map((_, ci) => {
                  const isFill = fillSet.has(ci);
                  const v = answers[ci][ri];
                  return (
                    <td
                      key={ci}
                      className={bitClass(v, isFill)}
                      onClick={() => toggle(ci, ri)}
                      role={isFill ? "button" : undefined}
                      aria-label={
                        isFill
                          ? `Ячейка строки ${ri + 1}, столбца ${columns[ci].name}`
                          : undefined
                      }
                    >
                      {bitText(v)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-9m-fog">
        * — столбцы для заполнения. Клик меняет: ? → И → Л → ?
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        {status !== "correct" && (
          <button type="button" onClick={check} className="btn">
            Проверить
          </button>
        )}
        <button type="button" onClick={reset} className="btn">
          ↻ Очистить
        </button>
        <span className="ml-auto">
          {status === "correct" && <span className="text-9m-gold">✓ Все верно</span>}
          {status === "wrong" && <span className="text-9m-scarlet">✗ Есть ошибки</span>}
          {status === "unanswered" && (
            <span className="text-9m-fog">Заполни ячейки и нажми «Проверить»</span>
          )}
        </span>
      </div>
    </div>
  );
}
