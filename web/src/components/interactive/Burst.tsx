/**
 * Маленький burst-эффект из 12 искр для визуальной награды
 * при правильном ответе.
 *
 * Размещается через `position: relative` контейнером.
 * Сам компонент абсолютно позиционирован и не перехватывает клики.
 */
import { useEffect, useState, type CSSProperties } from "react";

interface Props {
  /** key — чтобы перезапустить анимацию при повторном burst */
  burstKey?: number;
}

const PARTICLES = 12;
const COLOURS = ["#F59E0B", "#FBBF24", "#E2E8F0", "#0EA5E9", "#F472B6"];

interface ParticleStyle extends CSSProperties {
  "--rot"?: string;
}

export default function Burst({ burstKey = 0 }: Props): JSX.Element | null {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1100);
    return () => clearTimeout(t);
  }, [burstKey]);

  if (!visible) return null;

  return (
    <div
      key={burstKey}
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      aria-hidden="true"
    >
      {Array.from({ length: PARTICLES }).map((_, i) => {
        const angle = (i / PARTICLES) * 360;
        const colour = COLOURS[i % COLOURS.length];
        const style: ParticleStyle = {
          backgroundColor: colour,
          boxShadow: `0 0 8px ${colour}`,
          animation: "burst-particle 0.85s cubic-bezier(0.2, 0.7, 0.4, 1) both",
          animationDelay: `${(i % 3) * 30}ms`,
          "--rot": `${angle}deg`,
        };
        return (
          <span
            key={i}
            className="absolute block h-2 w-2 rounded-full"
            style={style}
          />
        );
      })}
    </div>
  );
}
