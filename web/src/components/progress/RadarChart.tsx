/**
 * Радарная диаграмма прогресса по 12 модулям курса (исключая Модуль 0).
 *
 * Источник данных:
 *   • Если по модулю есть записи дневника учителя → среднее всех средних / 5 → доля.
 *   • Иначе доля пройденных уроков (lessons[M.L].completed) от total.
 *
 * Каждая ось 0..1 (нормализовано). Чтобы было понятнее — рисуем уровни 0.2/0.4/.../1.0.
 */
import { useEffect, useState } from "react";
import { MODULES } from "../../data/world.ts";
import { loadProgress } from "../../lib/progress.ts";
import { loadJournal, averageRating } from "../../lib/teacher.ts";

interface AxisData {
  moduleId: number;
  label: string;
  colour: string;
  value: number; // 0..1
  source: "teacher" | "lessons" | "empty";
}

export default function RadarChart(): JSX.Element {
  const [data, setData] = useState<AxisData[]>(() => buildData());

  // Перезагружаем при возврате фокуса / событии storage
  useEffect(() => {
    const refresh = () => setData(buildData());
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const W = 480;
  const H = 480;
  const cx = W / 2;
  const cy = H / 2;
  const R = 170;
  const N = data.length;

  function pointAt(i: number, value: number): { x: number; y: number } {
    const angle = -Math.PI / 2 + (i / N) * 2 * Math.PI;
    const r = value * R;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  }

  // Концентрические уровни 0.2..1.0
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Полигон значений
  const polygon = data
    .map((d, i) => {
      const p = pointAt(i, d.value);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");

  const totalCovered =
    data.reduce((s, d) => s + d.value, 0) / N;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full max-w-md">
        {/* Концентрические уровни */}
        {levels.map((lv, li) => (
          <polygon
            key={lv}
            points={data
              .map((_, i) => {
                const p = pointAt(i, lv);
                return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
              })
              .join(" ")}
            fill="none"
            stroke="#94A3B8"
            strokeOpacity={li === levels.length - 1 ? 0.4 : 0.15}
            strokeWidth="1"
          />
        ))}

        {/* Лучи к каждой оси */}
        {data.map((d, i) => {
          const p = pointAt(i, 1);
          return (
            <line
              key={d.moduleId}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="#94A3B8"
              strokeOpacity="0.18"
            />
          );
        })}

        {/* Полигон значений */}
        <polygon
          points={polygon}
          fill="rgba(245,158,11,0.18)"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Точки на концах */}
        {data.map((d, i) => {
          const p = pointAt(i, d.value);
          if (d.value === 0) return null;
          return (
            <circle
              key={d.moduleId}
              cx={p.x}
              cy={p.y}
              r="4"
              fill={d.colour}
              stroke="#0F172A"
              strokeWidth="1"
            />
          );
        })}

        {/* Подписи модулей */}
        {data.map((d, i) => {
          const p = pointAt(i, 1.13);
          const angle = -Math.PI / 2 + (i / N) * 2 * Math.PI;
          const anchor =
            Math.cos(angle) > 0.2
              ? "start"
              : Math.cos(angle) < -0.2
                ? "end"
                : "middle";
          return (
            <g key={`l${d.moduleId}`}>
              <text
                x={p.x}
                y={p.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize="11"
                fill="#E2E8F0"
                fillOpacity="0.85"
              >
                <tspan
                  x={p.x}
                  dy="-0.4em"
                  fill={d.colour}
                  fillOpacity="0.9"
                  fontWeight="600"
                >
                  {d.moduleId}
                </tspan>
                <tspan x={p.x} dy="1.2em">
                  {d.label}
                </tspan>
              </text>
            </g>
          );
        })}
      </svg>

      <div className="text-center text-sm text-9m-fog">
        <p>
          Общее покрытие: <strong className="text-9m-gold">{Math.round(totalCovered * 100)}%</strong>
        </p>
        <p className="mt-1 text-xs">
          Источник: средний балл из дневника учителя; если нет — доля
          посещённых уроков.
        </p>
      </div>
    </div>
  );
}

function buildData(): AxisData[] {
  const lessonProgress = typeof window !== "undefined" ? loadProgress() : { lessons: {}, modules: {}, tasks: {} };
  const journal = typeof window !== "undefined" ? loadJournal() : { diaries: {} };

  const result: AxisData[] = [];
  // Модули 1..12 — без 0 (диагностика)
  for (const m of MODULES.slice(1)) {
    // Учитель: средние всех записей дневника по этому модулю
    const teacherEntries = Object.entries(journal.diaries ?? {})
      .filter(([k]) => k.startsWith(`${m.id}.`));
    const teacherAvgs = teacherEntries
      .map(([, e]) => averageRating(e))
      .filter((v): v is number => v !== null);

    let value = 0;
    let source: AxisData["source"] = "empty";

    if (teacherAvgs.length > 0) {
      const avg = teacherAvgs.reduce((s, v) => s + v, 0) / teacherAvgs.length;
      value = Math.min(1, avg / 5);
      source = "teacher";
    } else {
      // Fallback: процент пройденных уроков в модуле
      const visited = Object.entries(lessonProgress.lessons ?? {}).filter(
        ([k, v]) => k.startsWith(`${m.id}.`) && v.completed
      ).length;
      if (m.lessonsCount > 0) {
        value = Math.min(1, visited / m.lessonsCount);
        if (value > 0) source = "lessons";
      }
    }

    result.push({
      moduleId: m.id,
      label: m.shortTitle.split(" ").slice(0, 2).join(" "),
      colour: m.primaryColour,
      value,
      source,
    });
  }
  return result;
}
