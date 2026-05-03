/**
 * Шкала 1–5 в виде ряда круглых кнопок-чисел.
 * Управляемая (controlled): get value from prop, call onChange on click.
 */
import type { ReactElement } from "react";

export interface RatingScaleProps {
  value?: number;
  onChange?: (v: number) => void;
  /** Подпись для ARIA / placeholder */
  label?: string;
  /** Заблокирована (read-only) */
  disabled?: boolean;
}

export default function RatingScale({
  value,
  onChange,
  label,
  disabled = false,
}: RatingScaleProps): ReactElement {
  return (
    <div
      className="inline-flex items-center gap-1.5"
      role="radiogroup"
      aria-label={label}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const selected = value === n;
        const colour = ratingColour(n);
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange?.(n)}
            className={`h-8 w-8 rounded-full border-2 font-display text-sm transition-all ${
              selected
                ? "scale-110 text-9m-charcoal"
                : "border-9m-silver/25 bg-9m-charcoal/30 text-9m-silver/60 hover:border-9m-silver/50"
            } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            style={
              selected
                ? { backgroundColor: colour, borderColor: colour }
                : undefined
            }
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

function ratingColour(n: number): string {
  if (n <= 1) return "#E11D48"; // алый
  if (n === 2) return "#FBBF24"; // янтарь
  if (n === 3) return "#F59E0B"; // золото
  if (n === 4) return "#10B981"; // зелень
  return "#0EA5E9"; // бирюза для 5
}
