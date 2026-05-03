/**
 * Координатная плоскость 2D — кликни/перетащи точку.
 * Полезно для модулей 5, 12.
 *
 * Режимы:
 *   • mode="show"   — показать набор точек / прямую (статика).
 *   • mode="point"  — ученик кликает в место с целевыми координатами (target).
 *   • mode="line"   — ученик ставит две точки, проверяется уравнение прямой.
 */
import { useEffect, useRef, useState } from "react";
import {
  getTaskAttempt,
  setTaskAttempt,
  type TaskStatus,
} from "../../lib/progress.ts";

export interface CoordinatePlaneProps {
  /** Диапазон по X (например, [-5, 5]) */
  xRange?: [number, number];
  yRange?: [number, number];
  /** Шаг сетки */
  step?: number;
  /** Точки для отображения (show) */
  points?: { x: number; y: number; label?: string; color?: string }[];
  /** Целевая точка (mode=point) */
  target?: { x: number; y: number };
  tolerance?: number;
  mode?: "show" | "point";
  moduleId?: number;
  lessonId?: number;
  taskNumber?: string;
  label?: string;
}

export default function CoordinatePlane({
  xRange = [-5, 5],
  yRange = [-5, 5],
  step = 1,
  points = [],
  target,
  tolerance,
  mode = "show",
  moduleId,
  lessonId,
  taskNumber,
  label,
}: CoordinatePlaneProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const [user, setUser] = useState<{ x: number; y: number } | null>(null);
  const [status, setStatus] = useState<TaskStatus>("unanswered");

  useEffect(() => {
    if (mode !== "point" || !moduleId || !lessonId || !taskNumber) return;
    const prev = getTaskAttempt(moduleId, lessonId, taskNumber);
    if (prev.status === "correct" && prev.lastAnswer) {
      try {
        const p = JSON.parse(prev.lastAnswer);
        if (typeof p.x === "number" && typeof p.y === "number") setUser(p);
      } catch {}
      setStatus("correct");
    }
  }, [mode, moduleId, lessonId, taskNumber]);

  const W = 400;
  const H = 400;
  const PAD = 30;
  const innerW = W - 2 * PAD;
  const innerH = H - 2 * PAD;
  const xSize = xRange[1] - xRange[0];
  const ySize = yRange[1] - yRange[0];

  function xToPx(x: number): number {
    return PAD + ((x - xRange[0]) / xSize) * innerW;
  }
  function yToPx(y: number): number {
    return PAD + ((yRange[1] - y) / ySize) * innerH;
  }
  function pxToCoords(px: number, py: number): { x: number; y: number } {
    const x = xRange[0] + ((px - PAD) / innerW) * xSize;
    const y = yRange[1] - ((py - PAD) / innerH) * ySize;
    // snap к шагу/2
    const snap = step / 2;
    return {
      x: Math.round(x / snap) * snap,
      y: Math.round(y / snap) * snap,
    };
  }

  const xTicks: number[] = [];
  for (let v = Math.ceil(xRange[0] / step) * step; v <= xRange[1] + 1e-9; v += step) {
    xTicks.push(round(v));
  }
  const yTicks: number[] = [];
  for (let v = Math.ceil(yRange[0] / step) * step; v <= yRange[1] + 1e-9; v += step) {
    yTicks.push(round(v));
  }

  function handleClick(e: React.MouseEvent<SVGSVGElement>): void {
    if (mode !== "point" || status === "correct") return;
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const local = pt.matrixTransform(ctm.inverse());
    const c = pxToCoords(local.x, local.y);
    if (
      c.x >= xRange[0] && c.x <= xRange[1] &&
      c.y >= yRange[0] && c.y <= yRange[1]
    ) {
      setUser(c);
      setStatus("unanswered");
    }
  }

  function check(): void {
    if (mode !== "point" || !user || !target) return;
    const tol = tolerance ?? step / 2;
    const ok = Math.abs(user.x - target.x) < tol + 1e-9 && Math.abs(user.y - target.y) < tol + 1e-9;
    const newStatus: TaskStatus = ok ? "correct" : "wrong";
    setStatus(newStatus);
    if (moduleId && lessonId && taskNumber) {
      const cur = getTaskAttempt(moduleId, lessonId, taskNumber);
      setTaskAttempt(moduleId, lessonId, taskNumber, {
        status: newStatus,
        attempts: (cur.attempts ?? 0) + 1,
        lastAnswer: JSON.stringify(user),
      });
    }
  }

  return (
    <div className="my-3 rounded-md border border-9m-silver/15 bg-9m-bg-deep/40 p-4">
      {label && <p className="mb-3 text-sm text-9m-fog">{label}</p>}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={`block w-full max-w-md ${mode === "point" && status !== "correct" ? "cursor-crosshair" : ""}`}
        onClick={handleClick}
      >
        {/* Сетка */}
        {xTicks.map((v) => (
          <line
            key={`gx${v}`}
            x1={xToPx(v)}
            y1={PAD}
            x2={xToPx(v)}
            y2={H - PAD}
            stroke="#94A3B8"
            strokeOpacity={v === 0 ? 0.6 : 0.18}
          />
        ))}
        {yTicks.map((v) => (
          <line
            key={`gy${v}`}
            x1={PAD}
            y1={yToPx(v)}
            x2={W - PAD}
            y2={yToPx(v)}
            stroke="#94A3B8"
            strokeOpacity={v === 0 ? 0.6 : 0.18}
          />
        ))}

        {/* Оси с подписями */}
        <text x={W - PAD + 4} y={yToPx(0) - 6} fontSize="11" fill="#E2E8F0" fillOpacity="0.7">x</text>
        <text x={xToPx(0) + 6} y={PAD - 8} fontSize="11" fill="#E2E8F0" fillOpacity="0.7">y</text>

        {/* Подписи делений (только X и Y кратные 1) */}
        {xTicks.filter((v) => v !== 0).map((v) => (
          <text
            key={`tx${v}`}
            x={xToPx(v)}
            y={yToPx(0) + 14}
            fontSize="10"
            fill="#94A3B8"
            textAnchor="middle"
          >
            {formatNum(v)}
          </text>
        ))}
        {yTicks.filter((v) => v !== 0).map((v) => (
          <text
            key={`ty${v}`}
            x={xToPx(0) - 6}
            y={yToPx(v) + 4}
            fontSize="10"
            fill="#94A3B8"
            textAnchor="end"
          >
            {formatNum(v)}
          </text>
        ))}
        <text x={xToPx(0) - 8} y={yToPx(0) + 14} fontSize="10" fill="#94A3B8" textAnchor="end">0</text>

        {/* Точки (show) */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={xToPx(p.x)} cy={yToPx(p.y)} r="5" fill={p.color ?? "#0EA5E9"} />
            {p.label && (
              <text
                x={xToPx(p.x) + 8}
                y={yToPx(p.y) - 6}
                fontSize="11"
                fill={p.color ?? "#0EA5E9"}
              >
                {p.label}
              </text>
            )}
          </g>
        ))}

        {/* Точка ученицы */}
        {user && (
          <g>
            <circle
              cx={xToPx(user.x)}
              cy={yToPx(user.y)}
              r="7"
              fill={
                status === "correct" ? "#F59E0B" : status === "wrong" ? "#E11D48" : "#F472B6"
              }
              stroke="#0F172A"
              strokeWidth="2"
            />
            <text
              x={xToPx(user.x) + 10}
              y={yToPx(user.y) - 10}
              fontSize="11"
              fill="#F472B6"
            >
              ({formatNum(user.x)}, {formatNum(user.y)})
            </text>
          </g>
        )}
      </svg>

      {mode === "point" && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {status !== "correct" && (
            <button type="button" onClick={check} className="btn" disabled={!user}>
              Проверить
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setUser(null);
              setStatus("unanswered");
            }}
            className="btn"
          >
            ↻ Очистить
          </button>
          <span className="ml-auto">
            {status === "correct" && <span className="text-9m-gold">✓ Верно</span>}
            {status === "wrong" && (
              <span className="text-9m-scarlet">✗ Не та точка. Попробуй ещё.</span>
            )}
            {status === "unanswered" && (
              <span className="text-9m-fog">Кликни в нужную точку</span>
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
