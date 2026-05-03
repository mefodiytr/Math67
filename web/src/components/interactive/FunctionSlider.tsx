/**
 * Интерактивная функция y = ax² + bx + c (или y = kx + b) со слайдерами.
 * Полезно для модулей 5, 12 (графики, парабола).
 *
 * mode="explore" — без проверки, ученица крутит слайдеры и видит график
 * mode="match"   — заданы целевые a/b/c, надо подобрать (для будущих фаз)
 */
import { useState } from "react";

export interface FunctionSliderProps {
  /** "linear" → y = ax + b; "quadratic" → y = ax² + bx + c */
  type?: "linear" | "quadratic";
  /** Начальные значения */
  initialA?: number;
  initialB?: number;
  initialC?: number;
  /** Диапазон слайдеров */
  range?: [number, number];
  /** Размер сетки */
  xRange?: [number, number];
  yRange?: [number, number];
  step?: number;
  label?: string;
}

export default function FunctionSlider({
  type = "quadratic",
  initialA = 1,
  initialB = 0,
  initialC = 0,
  range = [-3, 3],
  xRange = [-5, 5],
  yRange = [-5, 5],
  step = 1,
  label,
}: FunctionSliderProps): JSX.Element {
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const [c, setC] = useState(initialC);

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

  // Формула
  const f = (x: number): number => {
    if (type === "linear") return a * x + b;
    return a * x * x + b * x + c;
  };

  // Точки для построения кривой
  const SAMPLES = 200;
  const path: string[] = [];
  let lastInside = false;
  for (let i = 0; i <= SAMPLES; i++) {
    const x = xRange[0] + (i / SAMPLES) * xSize;
    const y = f(x);
    const inside = y >= yRange[0] - 1 && y <= yRange[1] + 1;
    if (!inside) {
      lastInside = false;
      continue;
    }
    const px = xToPx(x);
    const py = yToPx(Math.max(yRange[0], Math.min(yRange[1], y)));
    if (!lastInside || path.length === 0) {
      path.push(`M ${px.toFixed(2)} ${py.toFixed(2)}`);
    } else {
      path.push(`L ${px.toFixed(2)} ${py.toFixed(2)}`);
    }
    lastInside = true;
  }

  const xTicks: number[] = [];
  for (let v = Math.ceil(xRange[0]); v <= xRange[1] + 1e-9; v++) xTicks.push(v);
  const yTicks: number[] = [];
  for (let v = Math.ceil(yRange[0]); v <= yRange[1] + 1e-9; v++) yTicks.push(v);

  // Текст уравнения
  const eqText =
    type === "linear"
      ? `y = ${num(a)}x ${signed(b)}`
      : `y = ${num(a)}x² ${signed(b)}x ${signed(c)}`;

  // Корни (для квадратичной)
  let rootsText: string | null = null;
  if (type === "quadratic" && a !== 0) {
    const D = b * b - 4 * a * c;
    if (D > 0) {
      const r1 = (-b - Math.sqrt(D)) / (2 * a);
      const r2 = (-b + Math.sqrt(D)) / (2 * a);
      rootsText = `Корни: x₁ = ${fmt(r1)}, x₂ = ${fmt(r2)}`;
    } else if (Math.abs(D) < 1e-9) {
      const r = -b / (2 * a);
      rootsText = `Один корень: x = ${fmt(r)}`;
    } else {
      rootsText = "Корней нет (D < 0)";
    }
  }

  return (
    <div className="my-3 rounded-md border border-9m-silver/15 bg-9m-bg-deep/40 p-4">
      {label && <p className="mb-3 text-sm text-9m-fog">{label}</p>}

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* График */}
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full max-w-md">
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

          {/* Подписи */}
          {xTicks.filter((v) => v !== 0).map((v) => (
            <text
              key={`tx${v}`}
              x={xToPx(v)}
              y={yToPx(0) + 14}
              fontSize="10"
              fill="#94A3B8"
              textAnchor="middle"
            >
              {v}
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
              {v}
            </text>
          ))}

          {/* Кривая */}
          <path
            d={path.join(" ")}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Слайдеры */}
        <div className="flex-1 space-y-3">
          <p className="font-display text-2xl text-9m-gold">{eqText}</p>
          {rootsText && (
            <p className="text-sm text-9m-silver/80">{rootsText}</p>
          )}

          <Slider label="a" value={a} onChange={setA} min={range[0]} max={range[1]} step={step} />
          <Slider label="b" value={b} onChange={setB} min={range[0]} max={range[1]} step={step} />
          {type === "quadratic" && (
            <Slider label="c" value={c} onChange={setC} min={range[0]} max={range[1]} step={step} />
          )}
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}): JSX.Element {
  return (
    <label className="flex items-center gap-3 text-sm text-9m-silver/85">
      <span className="w-6 font-display text-9m-gold">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 accent-9m-gold"
      />
      <span className="w-12 text-right text-9m-fog tabular-nums">
        {fmt(value)}
      </span>
    </label>
  );
}

function num(n: number): string {
  if (n === 1) return "";
  if (n === -1) return "−";
  return fmt(n);
}
function signed(n: number): string {
  if (n === 0) return "";
  return n > 0 ? `+ ${fmt(n)}` : `− ${fmt(Math.abs(n))}`;
}
function fmt(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/\.?0+$/, "");
}
