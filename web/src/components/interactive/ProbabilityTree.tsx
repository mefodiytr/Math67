/**
 * Дерево вероятностей — отображение и (опционально) проверка.
 *
 * Простая модель:
 *   • Корень с N ветвями (level 1).
 *   • Каждая ветвь level 1 может иметь N ветвей (level 2).
 *   • Каждая ветвь имеет вероятность.
 *   • Вычисляется P(пути) = произведение вероятностей вдоль пути.
 *
 * В answer-режиме ученик вводит вероятности листьев (в процентах или дробях),
 * и проверяется, что они складываются в правильное значение целевого события.
 */
export interface ProbBranch {
  /** Метка ветви (например "О" для орла) */
  label: string;
  /** Вероятность ветви (например 0.5) */
  p: number;
  /** Дочерние ветви (опционально) */
  children?: ProbBranch[];
}

export interface ProbabilityTreeProps {
  branches: ProbBranch[];
  label?: string;
  /** Целевое событие — массив путей, чьи P суммируются */
  highlightPaths?: string[][];
}

export default function ProbabilityTree({
  branches,
  label,
  highlightPaths,
}: ProbabilityTreeProps): JSX.Element {
  // Считаем все листья и их P
  type Leaf = { path: string[]; p: number };
  const leaves: Leaf[] = [];
  function walk(b: ProbBranch[], path: string[], p: number): void {
    for (const br of b) {
      const np = p * br.p;
      const npath = [...path, br.label];
      if (!br.children || br.children.length === 0) {
        leaves.push({ path: npath, p: np });
      } else {
        walk(br.children, npath, np);
      }
    }
  }
  walk(branches, [], 1);

  // Highlight
  const highlightSet = new Set(
    (highlightPaths ?? []).map((p) => p.join("|"))
  );
  const highlightTotal = leaves
    .filter((l) => highlightSet.has(l.path.join("|")))
    .reduce((sum, l) => sum + l.p, 0);

  // Layout: вертикально, уровни как колонки
  const W = 600;
  const ROW_H = 40;
  const COL_W = 140;
  const totalRows = leaves.length;
  const H = Math.max(180, totalRows * ROW_H + 40);

  // Координаты каждого листа
  const leafY: number[] = leaves.map(
    (_, i) => 30 + i * ROW_H + ROW_H / 2
  );

  // Рекурсивный layout: возвращает y-координату центра группы
  type Node = { x: number; y: number; label: string; p: number; isLeaf: boolean };
  const nodes: Node[] = [];
  const edges: { x1: number; y1: number; x2: number; y2: number; highlighted: boolean }[] = [];
  let leafIdx = 0;

  function layout(b: ProbBranch[], level: number, parentX: number, parentY: number, parentPath: string[]): number {
    const x = (level + 1) * COL_W;
    const ys: number[] = [];

    for (const br of b) {
      const childPath = [...parentPath, br.label];
      let y: number;
      if (!br.children || br.children.length === 0) {
        y = leafY[leafIdx];
        nodes.push({ x, y, label: br.label, p: br.p, isLeaf: true });
        leafIdx++;
      } else {
        y = layout(br.children, level + 1, x, 0, childPath);
        nodes.push({ x, y, label: br.label, p: br.p, isLeaf: false });
      }
      ys.push(y);
      // edge от parent к этому узлу
      const isHighlighted = isPrefix(childPath, [...highlightSet].map((s) => s.split("|")));
      edges.push({
        x1: parentX,
        y1: parentY === 0 ? y : parentY,
        x2: x - 12,
        y2: y,
        highlighted: isHighlighted,
      });
    }
    // y центрировки группы: среднее
    return ys.reduce((s, v) => s + v, 0) / ys.length;
  }

  function isPrefix(path: string[], all: string[][]): boolean {
    return all.some(
      (p) =>
        p.length >= path.length &&
        path.every((s, i) => p[i] === s)
    );
  }

  const rootY = layout(branches, 0, 30, 0, []);
  // Переставляем edges с корнем на правильный rootY
  for (const e of edges) {
    if (e.x1 === 30 && e.y1 === 0) e.y1 = rootY;
  }

  return (
    <div className="my-3 rounded-md border border-9m-silver/15 bg-9m-bg-deep/40 p-4">
      {label && <p className="mb-3 text-sm text-9m-fog">{label}</p>}

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full max-w-2xl">
        {/* Корень */}
        <circle cx={30} cy={rootY} r="6" fill="#0EA5E9" />
        <text x={20} y={rootY + 4} fontSize="11" fill="#0EA5E9" textAnchor="end">
          старт
        </text>

        {/* Ребра */}
        {edges.map((e, i) => (
          <g key={i}>
            <line
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke={e.highlighted ? "#F59E0B" : "rgba(226,232,240,0.4)"}
              strokeWidth={e.highlighted ? 2 : 1.5}
            />
          </g>
        ))}

        {/* Узлы */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r="5"
              fill={n.isLeaf ? "#F472B6" : "#94A3B8"}
            />
            {/* Метка ветви */}
            <text
              x={n.x - 14}
              y={n.y - 8}
              fontSize="11"
              fill="#E2E8F0"
              textAnchor="end"
            >
              {n.label}
            </text>
            {/* P */}
            <text
              x={n.x - 14}
              y={n.y + 14}
              fontSize="10"
              fill="#0EA5E9"
              textAnchor="end"
            >
              p={fmt(n.p)}
            </text>
            {/* P пути для листа */}
            {n.isLeaf && (
              <text x={n.x + 12} y={n.y + 4} fontSize="11" fill="#F472B6">
                P = {fmt(leaves[i - (nodes.length - leaves.length)]?.p ?? 0)}
              </text>
            )}
          </g>
        ))}
      </svg>

      {highlightPaths && highlightPaths.length > 0 && (
        <p className="mt-3 text-sm">
          <span className="text-9m-fog">Сумма выделенных путей:</span>{" "}
          <strong className="text-9m-gold">P = {fmt(highlightTotal)}</strong>
        </p>
      )}
    </div>
  );
}

function fmt(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(3).replace(/\.?0+$/, "");
}
