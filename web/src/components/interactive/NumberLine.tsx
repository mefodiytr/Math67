/**
 * Числовая прямая с кликабельными точками.
 * Полезно для модулей 1, 3 (отрицательные, дроби).
 *
 * Режимы:
 *   • mode="show"   — отображение точек (statics).
 *   • mode="answer" — ученик кликает в нужное место, проверяется по target.
 */
import { useEffect, useRef, useState } from "react";
import {
  getTaskAttempt,
  setTaskAttempt,
  type TaskStatus,
} from "../../lib/progress.ts";

export interface NumberLineProps {
  min: number;
  max: number;
  /** Шаг разметки делений (1 / 0.5 / 0.25) */
  step?: number;
  /** Подразметка (например, шаг 0.1 для красоты) */
  fineStep?: number;
  /** Заранее отмеченные точки (show-режим) */
  marks?: number[];
  /** Целевая точка (answer-режим) */
  target?: number;
  /** Допуск проверки (по умолчанию step/2) */
  tolerance?: number;
  mode?: "show" | "answer";
  moduleId?: number;
  lessonId?: number;
  taskNumber?: string;
  label?: string;
}

export default function NumberLine({
  min,
  max,
  step = 1,
  fineStep,
  marks = [],
  target,
  tolerance,
  mode = "show",
  moduleId,
  lessonId,
  taskNumber,
  label,
}: NumberLineProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const [userValue, setUserValue] = useState<number | null>(null);
  const [status, setStatus] = useState<TaskStatus>("unanswered");

  // Восстановление
  useEffect(() => {
    if (mode !== "answer" || !moduleId || !lessonId || !taskNumber) return;
    const prev = getTaskAttempt(moduleId, lessonId, taskNumber);
    if (prev.status === "correct" && prev.lastAnswer) {
      const v = parseFloat(prev.lastAnswer);
      if (!isNaN(v)) setUserValue(v);
      setStatus("correct");
    }
  }, [mode, moduleId, lessonId, taskNumber]);

  const W = 600;
  const H = 80;
  const PAD = 30;
  const innerW = W - 2 * PAD;
  const range = max - min;

  function xFor(v: number): number {
    return PAD + ((v - min) / range) * innerW;
  }

  // Деления
  const ticks: number[] = [];
  for (let v = min; v <= max + 1e-9; v += step) ticks.push(round(v));
  const fineTicks: number[] = [];
  if (fineStep) {
    for (let v = min; v <= max + 1e-9; v += fineStep) {
      const r = round(v);
      if (Math.abs(r - Math.round(r / step) * step) > 1e-9) fineTicks.push(r);
    }
  }

  function handleClick(e: React.MouseEvent<SVGSVGElement>): void {
    if (mode !== "answer" || status === "correct") return;
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const local = pt.matrixTransform(ctm.inverse());
    const ratio = (local.x - PAD) / innerW;
    const v = min + ratio * range;
    // Snap к шагу
    const snap = step / 2;
    const snapped = Math.round(v / snap) * snap;
    const bounded = Math.max(min, Math.min(max, snapped));
    setUserValue(bounded);
    setStatus("unanswered");
  }

  function check(): void {
    if (mode !== "answer" || userValue === null || target === undefined) return;
    const tol = tolerance ?? step / 2;
    const ok = Math.abs(userValue - target) < tol + 1e-9;
    const newStatus: TaskStatus = ok ? "correct" : "wrong";
    setStatus(newStatus);
    if (moduleId && lessonId && taskNumber) {
      const cur = getTaskAttempt(moduleId, lessonId, taskNumber);
      setTaskAttempt(moduleId, lessonId, taskNumber, {
        status: newStatus,
        attempts: (cur.attempts ?? 0) + 1,
        lastAnswer: String(userValue),
      });
    }
  }

  return (
    <div className="my-3 rounded-md border border-9m-silver/15 bg-9m-bg-deep/40 p-4">
      {label && <p className="mb-3 text-sm text-9m-fog">{label}</p>}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={`block w-full ${mode === "answer" && status !== "correct" ? "cursor-crosshair" : ""}`}
        onClick={handleClick}
      >
        {/* Главная линия */}
        <line
          x1={PAD}
          y1={H / 2}
          x2={W - PAD}
          y2={H / 2}
          stroke="#E2E8F0"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        {/* Стрелочки */}
        <polygon
          points={`${W - PAD},${H / 2} ${W - PAD - 8},${H / 2 - 5} ${W - PAD - 8},${H / 2 + 5}`}
          fill="#E2E8F0"
          fillOpacity="0.5"
        />

        {/* Тонкие деления */}
        {fineTicks.map((v, i) => {
          const x = xFor(v);
          return (
            <line
              key={`f${i}`}
              x1={x}
              y1={H / 2 - 4}
              x2={x}
              y2={H / 2 + 4}
              stroke="#94A3B8"
              strokeOpacity="0.25"
            />
          );
        })}

        {/* Главные деления + подписи */}
        {ticks.map((v, i) => {
          const x = xFor(v);
          return (
            <g key={i}>
              <line
                x1={x}
                y1={H / 2 - 8}
                x2={x}
                y2={H / 2 + 8}
                stroke="#E2E8F0"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={H / 2 + 24}
                fontSize="11"
                fill="#E2E8F0"
                fillOpacity="0.7"
                textAnchor="middle"
              >
                {formatNum(v)}
              </text>
            </g>
          );
        })}

        {/* Заданные метки (show) */}
        {marks.map((v, i) => {
          const x = xFor(v);
          return (
            <g key={`m${i}`}>
              <circle cx={x} cy={H / 2} r="6" fill="#0EA5E9" />
              <text
                x={x}
                y={H / 2 - 14}
                fontSize="11"
                fill="#0EA5E9"
                textAnchor="middle"
              >
                {formatNum(v)}
              </text>
            </g>
          );
        })}

        {/* Точка ученицы (answer) */}
        {userValue !== null && (
          <g>
            <circle
              cx={xFor(userValue)}
              cy={H / 2}
              r="8"
              fill={
                status === "correct"
                  ? "#F59E0B"
                  : status === "wrong"
                    ? "#E11D48"
                    : "#F472B6"
              }
              stroke="#0F172A"
              strokeWidth="2"
            />
            <text
              x={xFor(userValue)}
              y={H / 2 - 16}
              fontSize="11"
              fill="#F472B6"
              textAnchor="middle"
            >
              {formatNum(userValue)}
            </text>
          </g>
        )}
      </svg>

      {mode === "answer" && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {status !== "correct" && (
            <button type="button" onClick={check} className="btn" disabled={userValue === null}>
              Проверить
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setUserValue(null);
              setStatus("unanswered");
            }}
            className="btn"
          >
            ↻ Очистить
          </button>
          <span className="ml-auto">
            {status === "correct" && <span className="text-9m-gold">✓ Верно</span>}
            {status === "wrong" && (
              <span className="text-9m-scarlet">
                ✗ Промах. Попробуй ближе.
              </span>
            )}
            {status === "unanswered" && (
              <span className="text-9m-fog">Кликни на нужную точку</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}

function round(v: number): number {
  return Math.round(v * 1e6) / 1e6;
}
function formatNum(v: number): string {
  if (Number.isInteger(v)) return String(v);
  return String(round(v));
}
