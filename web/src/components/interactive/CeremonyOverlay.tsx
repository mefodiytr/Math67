/**
 * Полноэкранная церемония загорания Луны после финала модуля.
 *
 * Анимация (последовательная, через Framer Motion):
 *  1. Затемнение фона + цветная аура модуля (0.0–0.6s)
 *  2. «Восьмая Луна загорелась» — текст из ничего (0.4–1.0s)
 *  3. Артефакт «прилетает» в центр с pop-эффектом (0.8–1.5s)
 *  4. Звёзды разлетаются от артефакта (1.0–2.5s)
 *  5. Описание модуля (1.5–2.0s)
 *  6. Кнопки (2.0+s)
 */
import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MODULES, ARTIFACTS, CHARACTERS } from "../../data/world.ts";
import { assetUrl, placeholderSVG } from "../../lib/assets.ts";

const RU_ORDINAL: Record<number, string> = {
  1: "Первая",
  2: "Вторая",
  3: "Третья",
  4: "Четвёртая",
  5: "Пятая",
  6: "Шестая",
  7: "Седьмая",
  8: "Восьмая",
  9: "Девятая",
  10: "Десятая",
  11: "Одиннадцатая",
  12: "Двенадцатая",
};

interface Props {
  moduleId: number;
  onClose: () => void;
}

export default function CeremonyOverlay({ moduleId, onClose }: Props): JSX.Element | null {
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) return null;

  const artifact = mod.artifactId
    ? ARTIFACTS.find((a) => a.id === mod.artifactId)
    : undefined;
  const curator = CHARACTERS.find((c) => c.id === mod.primaryCuratorId);

  // Текст «Восьмая Луна»
  const ordinal = mod.id >= 1 && mod.id <= 9 ? RU_ORDINAL[mod.id] : null;

  const heading = useMemo(() => {
    if (mod.id === 0) return "Карта Адепта получена";
    if (ordinal) return `${ordinal} Луна загорелась`;
    if (mod.id === 10) return "Перо Адепта в твоих руках";
    if (mod.id === 11) return "Кристалл Аксиом сияет";
    if (mod.id === 12) return "Печать Адепта Девяти Лун";
    return `Модуль ${mod.id} пройден`;
  }, [mod.id, ordinal]);

  const artifactImg = artifact ? assetUrl("artifacts", artifact.id) : null;
  const artifactFallback = artifact
    ? placeholderSVG(artifact.nameRu, artifact.colour)
    : null;

  // Esc / клик по фону → закрыть
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Звёзды для конфетти-кругом
  const stars = useMemo(() => {
    const arr: { angle: number; distance: number; size: number; delay: number; color: string }[] = [];
    const count = 28;
    const colours = ["#E2E8F0", "#F59E0B", "#F8FAFC", mod.primaryColour];
    for (let i = 0; i < count; i++) {
      arr.push({
        angle: (i / count) * 360 + Math.random() * 12 - 6,
        distance: 200 + Math.random() * 220,
        size: 4 + Math.random() * 4,
        delay: 0.9 + Math.random() * 0.7,
        color: colours[i % colours.length],
      });
    }
    return arr;
  }, [mod.primaryColour]);

  return (
    <AnimatePresence>
      <motion.div
        key="ceremony"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ceremony-heading"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-9m-bg-deep/95 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Цветная радиальная аура модуля */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${mod.primaryColour}40 0%, transparent 50%)`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Звёзды-конфетти */}
        {stars.map((s, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              boxShadow: `0 0 8px ${s.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: Math.cos((s.angle * Math.PI) / 180) * s.distance,
              y: Math.sin((s.angle * Math.PI) / 180) * s.distance,
              opacity: [0, 1, 0],
              scale: [0, 1, 0.6],
            }}
            transition={{
              duration: 2,
              delay: s.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Контент */}
        <motion.div
          className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-6 px-6 text-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.25, delayChildren: 0.4 },
            },
          }}
        >
          {/* «Восьмая Луна» */}
          <motion.p
            className="text-xs uppercase tracking-[0.4em] text-9m-fog"
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            Модуль {mod.id} · {mod.shortTitle}
          </motion.p>

          <motion.h2
            id="ceremony-heading"
            className="font-display text-3xl font-medium leading-tight md:text-4xl"
            style={{ color: mod.primaryColour }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {heading}
          </motion.h2>

          {/* Артефакт */}
          {artifact && (
            <motion.div
              className="relative my-2"
              variants={{
                hidden: { opacity: 0, scale: 0.4, rotate: -20 },
                show: { opacity: 1, scale: 1, rotate: 0 },
              }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: 0.6,
              }}
            >
              <motion.div
                className="absolute inset-0 -z-10 rounded-full blur-2xl"
                style={{ backgroundColor: artifact.colour, opacity: 0.5 }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <img
                src={artifactImg!}
                data-fallback={artifactFallback!}
                alt={artifact.nameRu}
                className="h-40 w-40 object-contain drop-shadow-2xl md:h-48 md:w-48"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  if (el.src !== el.dataset.fallback) {
                    el.src = el.dataset.fallback!;
                  }
                }}
              />
            </motion.div>
          )}

          {/* Название артефакта */}
          {artifact && (
            <motion.p
              className="font-display text-lg text-9m-silver md:text-xl"
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              {artifact.nameRu}
            </motion.p>
          )}

          {/* Подпись от куратора */}
          {curator && (
            <motion.p
              className="max-w-sm text-sm italic text-9m-silver/75"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1 },
              }}
              transition={{ duration: 0.6 }}
            >
              «{getCuratorLine(mod.id)}»
              <br />
              <span className="text-xs not-italic text-9m-fog">
                — {curator.nameRu}
              </span>
            </motion.p>
          )}

          {/* Кнопки */}
          <motion.div
            className="mt-4 flex flex-wrap justify-center gap-3"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <a href="/collection" className="btn btn-primary">
              🌙 К коллекции
            </a>
            {mod.id < 12 && (
              <a href={`/module/${mod.id + 1}`} className="btn">
                Следующий модуль →
              </a>
            )}
            <button type="button" onClick={onClose} className="btn">
              Закрыть
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/** Реплики кураторов для церемонии. */
function getCuratorLine(moduleId: number): string {
  switch (moduleId) {
    case 0:
      return "Добро пожаловать в Феликсию, Ленcая.";
    case 1:
      return "Лепесток-доля у тебя в ладони. Ты видишь часть и целое.";
    case 2:
      return "Простые числа — атомы математики. Ты их теперь различаешь.";
    case 3:
      return "Знак x уже не пугает. Это — твой союзник.";
    case 4:
      return "Весы стоят ровно. Уравнение — твой инструмент.";
    case 5:
      return "Пара (x, y) — это место, где живут идеи.";
    case 6:
      return "Треугольник — самая прочная фигура. Ты её знаешь.";
    case 7:
      return "Площадь, периметр, объём — мир измерим.";
    case 8:
      return "Перебор, дерево, Дирихле. Хаос — теперь упорядочен.";
    case 9:
      return "Среднее, медиана, мода. Данные говорят — ты слушаешь.";
    case 10:
      return "Пять шагов и любая история — твоя.";
    case 11:
      return "Доказательство — это тишина истины.";
    case 12:
      return "Ты Адепт. Можешь идти дальше — в седьмой класс.";
    default:
      return "Твой путь продолжается.";
  }
}
