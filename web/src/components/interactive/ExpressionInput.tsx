/**
 * Виджет для задач, где ответ — арифметическое выражение.
 * Парсит, вычисляет, проверяет:
 *   • совпадает ли результат с целевым (target) с допуском;
 *   • опционально: используются ли заданные цифры (для задач «расставь
 *     знаки между 1 2 3 4, чтобы получить 24» — там requiredDigits=[1,2,3,4]).
 *
 * Дополнительно показывает текущее вычисленное значение прямо рядом с полем
 * ввода («= 24»), чтобы ученица видела, что вводит.
 */
import { useEffect, useRef, useState } from "react";
import {
  getTaskAttempt,
  setTaskAttempt,
  bumpStreak,
  type TaskStatus,
} from "../../lib/progress.ts";
import { evalExpression, usesDigits } from "../../lib/expr.ts";
import Burst from "./Burst.tsx";

export interface ExpressionInputProps {
  moduleId: number;
  lessonId: number;
  taskNumber: string;
  /** Целевое значение, которое должно получиться */
  target: number;
  /** Какие цифры обязательны (мультимножество). Опционально. */
  requiredDigits?: number[];
  /** Допуск численного сравнения */
  tolerance?: number;
  /** Подсказка-плейсхолдер */
  placeholder?: string;
  /** Что показать после правильного ответа (например, ожидаемое выражение) */
  reveal?: string;
}

export default function ExpressionInput({
  moduleId,
  lessonId,
  taskNumber,
  target,
  requiredDigits,
  tolerance = 1e-6,
  placeholder = "Например: (1+2+3)·4",
  reveal,
}: ExpressionInputProps): JSX.Element {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<TaskStatus>("unanswered");
  const [shake, setShake] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy preview: текущее вычисление выражения
  const previewResult = (() => {
    if (!value.trim()) return null;
    const r = evalExpression(value);
    if (!r.ok) return null;
    return r.value;
  })();

  useEffect(() => {
    const prev = getTaskAttempt(moduleId, lessonId, taskNumber);
    setStatus(prev.status);
    setAttempts(prev.attempts);
    if (prev.lastAnswer) setValue(prev.lastAnswer);
  }, [moduleId, lessonId, taskNumber]);

  function handleSubmit(e?: React.FormEvent): void {
    if (e) e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    const r = evalExpression(trimmed);
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (!r.ok) {
      setStatus("wrong");
      shakeNow();
      setHint(`Не понял выражение: ${r.error}`);
      saveAttempt("wrong", trimmed, nextAttempts);
      return;
    }

    const numericOk = Math.abs(r.value - target) < tolerance;
    let digitsOk = true;
    let digitsHint = "";
    if (requiredDigits && requiredDigits.length > 0) {
      const d = usesDigits(trimmed, requiredDigits);
      digitsOk = d.ok;
      if (!digitsOk) {
        if (d.missing.length > 0) {
          digitsHint = `Нужны цифры: ${requiredDigits.join(", ")}, не хватает ${d.missing.join(", ")}`;
        } else if (d.extra.length > 0) {
          digitsHint = `Нужны только цифры ${requiredDigits.join(", ")}, у тебя лишние: ${d.extra.join(", ")}`;
        }
      }
    }

    if (numericOk && digitsOk) {
      setStatus("correct");
      setHint(null);
      saveAttempt("correct", trimmed, nextAttempts);
      setBurstKey((k) => k + 1);
      bumpStreak(true);
    } else {
      setStatus("wrong");
      shakeNow();
      if (!numericOk) {
        setHint(`Получилось ${formatNum(r.value)}, нужно ${formatNum(target)}`);
      } else {
        setHint(digitsHint);
      }
      saveAttempt("wrong", trimmed, nextAttempts);
      bumpStreak(false);
    }
  }

  function shakeNow(): void {
    setShake(true);
    setTimeout(() => setShake(false), 450);
  }

  function saveAttempt(s: TaskStatus, ans: string, n: number): void {
    setTaskAttempt(moduleId, lessonId, taskNumber, {
      status: s,
      attempts: n,
      lastAnswer: ans,
    });
  }

  function reset(): void {
    setStatus("unanswered");
    setHint(null);
    setValue("");
    setShowReveal(false);
    inputRef.current?.focus();
  }

  const ringClass =
    status === "correct"
      ? "ring-2 ring-9m-gold/70"
      : status === "wrong"
        ? "ring-2 ring-9m-scarlet/60"
        : "ring-1 ring-9m-silver/15";

  const inputDisabled = status === "correct";

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative mt-3 flex flex-wrap items-center gap-2 rounded-md bg-9m-bg-deep/40 p-2 transition-all ${ringClass} ${shake ? "animate-shake" : ""}`}
    >
      {status === "correct" && <Burst burstKey={burstKey} />}

      <input
        ref={inputRef}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (status !== "unanswered") setStatus("unanswered");
          if (hint) setHint(null);
        }}
        disabled={inputDisabled}
        placeholder={placeholder}
        aria-label={`Выражение для задачи ${taskNumber}`}
        className="flex-1 min-w-0 rounded bg-9m-charcoal/70 px-3 py-2 font-mono text-9m-silver outline-none placeholder:text-9m-fog/60 focus:bg-9m-charcoal disabled:opacity-70"
      />

      {/* Live-превью значения */}
      {previewResult !== null && status !== "correct" && (
        <span className="rounded bg-9m-charcoal/40 px-2 py-1 font-mono text-sm text-9m-teal">
          = {formatNum(previewResult)}
        </span>
      )}

      {status !== "correct" ? (
        <button type="submit" className="btn">
          Проверить
        </button>
      ) : (
        <button type="button" onClick={reset} className="btn">
          ↻ Решить ещё
        </button>
      )}

      <div className="flex w-full items-center justify-between gap-2 text-sm">
        <div>
          {status === "correct" && (
            <span className="inline-flex items-center gap-1 text-9m-gold">
              ✓ Верно! = {formatNum(target)}
              {attempts > 1 && ` · ${attempts} попыт${attemptsPlural(attempts)}`}
            </span>
          )}
          {status === "wrong" && (
            <span className="inline-flex items-center gap-1 text-9m-scarlet">
              ✗ {hint ?? "Попробуй ещё"}
            </span>
          )}
          {status === "unanswered" && (
            <span className="text-9m-fog">
              Цель: <strong className="text-9m-silver">= {formatNum(target)}</strong>
              {requiredDigits && requiredDigits.length > 0 && (
                <span className="ml-2 text-xs">
                  · использовать цифры: {requiredDigits.join(", ")}
                </span>
              )}
            </span>
          )}
        </div>

        {status === "wrong" && attempts >= 3 && reveal && !showReveal && (
          <button
            type="button"
            onClick={() => setShowReveal(true)}
            className="text-xs text-9m-fog underline-offset-2 hover:text-9m-silver hover:underline"
          >
            Показать пример решения
          </button>
        )}
      </div>

      {showReveal && reveal && (
        <div className="w-full rounded bg-9m-charcoal/50 p-2 font-mono text-sm text-9m-silver/85">
          Пример: <strong className="text-9m-gold">{reveal}</strong>
        </div>
      )}
    </form>
  );
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(4).replace(/\.?0+$/, "");
}
function attemptsPlural(n: number): string {
  if (n === 1) return "ка";
  if (n >= 2 && n <= 4) return "ки";
  return "ок";
}
