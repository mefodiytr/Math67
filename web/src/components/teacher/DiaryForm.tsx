/**
 * Форма дневника учителя для одного урока.
 * Шкалы 1–5 по темам + текстовая заметка + сохранение в localStorage.
 */
import { useEffect, useState } from "react";
import RatingScale from "./RatingScale.tsx";
import { getDiary, setDiary, deleteDiary } from "../../lib/teacher.ts";

export interface DiaryFormProps {
  moduleId: number;
  lessonId: number;
  themes: string[];
}

export default function DiaryForm({
  moduleId,
  lessonId,
  themes,
}: DiaryFormProps): JSX.Element {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [note, setNote] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    const prev = getDiary(moduleId, lessonId);
    if (prev) {
      setRatings(prev.ratings);
      setNote(prev.note);
      setSavedAt(prev.savedAt);
    }
  }, [moduleId, lessonId]);

  function setRating(theme: string, v: number): void {
    setRatings((prev) => ({ ...prev, [theme]: v }));
  }

  function handleSave(): void {
    setDiary(moduleId, lessonId, { ratings, note });
    setSavedAt(new Date().toISOString());
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  function handleClear(): void {
    if (!confirm("Удалить запись дневника для этого урока?")) return;
    deleteDiary(moduleId, lessonId);
    setRatings({});
    setNote("");
    setSavedAt(null);
  }

  const filledCount = Object.keys(ratings).length;
  const avg =
    filledCount > 0
      ? Object.values(ratings).reduce((s, v) => s + v, 0) / filledCount
      : null;

  return (
    <div className="space-y-5">
      {/* Шкалы по темам */}
      <div className="space-y-3">
        {themes.length === 0 ? (
          <p className="text-sm text-9m-fog">
            Нет тем для оценки. Можно оставить только заметку.
          </p>
        ) : (
          themes.map((theme) => (
            <div
              key={theme}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <label className="text-9m-silver/90">{theme}</label>
              <RatingScale
                value={ratings[theme]}
                onChange={(v) => setRating(theme, v)}
                label={theme}
              />
            </div>
          ))
        )}
      </div>

      {/* Заметка */}
      <div>
        <label htmlFor="diary-note" className="mb-2 block text-sm text-9m-fog">
          Заметка к уроку (свободная)
        </label>
        <textarea
          id="diary-note"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Что получилось, что нет, что разобрать в следующий раз…"
          className="w-full rounded-md border border-9m-silver/15 bg-9m-charcoal/50 p-3 text-9m-silver placeholder:text-9m-fog/50 focus:border-9m-silver/40 focus:outline-none"
        />
      </div>

      {/* Среднее + кнопки */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-9m-fog">
          {avg !== null && (
            <>
              Среднее по уроку: <strong className="text-9m-gold">{avg.toFixed(2)}</strong>
              {filledCount > 0 && (
                <span> ({filledCount} из {themes.length || filledCount})</span>
              )}
            </>
          )}
          {savedAt && (
            <span className="ml-3 text-xs">
              Сохранено: {new Date(savedAt).toLocaleString("ru-RU")}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {savedAt && (
            <button
              type="button"
              onClick={handleClear}
              className="btn text-9m-fog hover:text-9m-scarlet"
            >
              ✕ Удалить запись
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            className={`btn btn-primary ${justSaved ? "border-9m-gold text-9m-gold" : ""}`}
          >
            {justSaved ? "✓ Сохранено" : "💾 Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
}
