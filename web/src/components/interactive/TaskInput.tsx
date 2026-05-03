/**
 * Интерактивный ввод ответа для одной задачи.
 *
 * Используется как Astro-остров (client:load), так что весь стейт — в самом компоненте
 * + синхронизация с localStorage через @lib/progress.ts.
 */
import { useEffect, useRef, useState } from "react";
import {
  getTaskAttempt,
  setTaskAttempt,
  type TaskStatus,
} from "../../lib/progress.ts";
import { checkAnswer, type AnswerType } from "../../lib/answers.ts";

export interface TaskInputProps {
  moduleId: number;
  lessonId: number;
  taskNumber: string;
  expectedAnswer: string;
  answerType: AnswerType;
}

export default function TaskInput({
  moduleId,
  lessonId,
  taskNumber,
  expectedAnswer,
  answerType,
}: TaskInputProps): JSX.Element {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<TaskStatus>("unanswered");
  const [shake, setShake] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Восстанавливаем состояние из localStorage при монтировании
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

    const ok = checkAnswer(trimmed, expectedAnswer, answerType);
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (ok) {
      setStatus("correct");
      setHint(null);
      setTaskAttempt(moduleId, lessonId, taskNumber, {
        status: "correct",
        attempts: nextAttempts,
        lastAnswer: trimmed,
      });
    } else {
      setStatus("wrong");
      setShake(true);
      setTimeout(() => setShake(false), 450);
      setHint(getHint(nextAttempts, answerType));
      setTaskAttempt(moduleId, lessonId, taskNumber, {
        status: "wrong",
        attempts: nextAttempts,
        lastAnswer: trimmed,
      });
    }
  }

  function handleReset(): void {
    setStatus("unanswered");
    setHint(null);
    setValue("");
    setShowAnswer(false);
    inputRef.current?.focus();
  }

  // Стили рамки в зависимости от статуса
  const ringClass =
    status === "correct"
      ? "ring-2 ring-9m-gold/70"
      : status === "wrong"
        ? "ring-2 ring-9m-scarlet/60"
        : "ring-1 ring-9m-silver/15";

  const inputDisabled = status === "correct";
  const inputType = answerType === "numeric" ? "text" : "text";
  const inputMode: "decimal" | "text" =
    answerType === "numeric" ? "decimal" : "text";

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-3 flex flex-wrap items-center gap-2 rounded-md bg-9m-bg-deep/40 p-2 transition-all ${ringClass} ${
        shake ? "animate-shake" : ""
      }`}
    >
      <input
        ref={inputRef}
        type={inputType}
        inputMode={inputMode}
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
        placeholder={placeholderFor(answerType)}
        aria-label={`Ответ на задачу ${taskNumber}`}
        className="flex-1 min-w-0 rounded bg-9m-charcoal/70 px-3 py-2 text-9m-silver outline-none placeholder:text-9m-fog/60 focus:bg-9m-charcoal disabled:opacity-70"
      />

      {status !== "correct" ? (
        <button
          type="submit"
          className="btn"
          aria-label="Проверить ответ"
        >
          Проверить
        </button>
      ) : (
        <button
          type="button"
          onClick={handleReset}
          className="btn"
          aria-label="Решить ещё раз"
        >
          ↻ Решить ещё
        </button>
      )}

      {/* Статус-сообщение */}
      <div className="flex w-full items-center justify-between gap-2">
        <div className="text-sm">
          {status === "correct" && (
            <span className="inline-flex items-center gap-1 text-9m-gold">
              ✓ Верно{attempts > 1 && ` · ${attempts} попыт${attemptsPlural(attempts)}`}
            </span>
          )}
          {status === "wrong" && (
            <span className="inline-flex items-center gap-1 text-9m-scarlet">
              ✗ {hint ?? "Попробуй ещё"}
            </span>
          )}
          {status === "unanswered" && attempts === 0 && (
            <span className="text-9m-fog">Введи ответ и нажми «Проверить»</span>
          )}
        </div>

        {status === "wrong" && attempts >= 3 && !showAnswer && (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="text-xs text-9m-fog underline-offset-2 hover:text-9m-silver hover:underline"
          >
            Показать ответ
          </button>
        )}
      </div>

      {showAnswer && (
        <div className="w-full rounded bg-9m-charcoal/50 p-2 text-sm text-9m-silver/85">
          Ответ: <strong className="text-9m-gold">{expectedAnswer}</strong>
        </div>
      )}
    </form>
  );
}

function getHint(attempts: number, type: AnswerType): string {
  if (type === "numeric") {
    if (attempts === 1) return "Не совсем. Проверь арифметику.";
    if (attempts === 2) return "Внимательно: знаки, скобки, единицы.";
    return "Попробуй разобрать на меньшие шаги.";
  }
  if (type === "choice") {
    if (attempts === 1) return "Не верно. Подумай ещё.";
    return "Перечитай условие — там подсказка.";
  }
  return "Не верно.";
}

function placeholderFor(type: AnswerType): string {
  if (type === "numeric") return "число (или 5/8)";
  if (type === "choice") return "Да / Нет";
  return "ответ";
}

function attemptsPlural(n: number): string {
  if (n === 1) return "ка";
  if (n >= 2 && n <= 4) return "ки";
  return "ок";
}
