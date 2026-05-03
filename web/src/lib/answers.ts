/**
 * Парсер ответов из секции `<details><summary>Ответы</summary>...` урока.
 * А также проверка «введённого ответа» против эталона.
 *
 * Структура секции ответов в уроках обычно такая:
 *
 *   **Часть I:** 1) 12. 2) 5. 3) 120. 4) 10.
 *   **Часть II:** 5) 120. 6) 56. 7) Зависит. 8) C(10,4) = 210.
 *   **Sphinx:** На каждом — C(3, 2) = 3. На 5: 3⁵ = **243**.
 *   **English:** (a) 120. (b) 56. (c) 2. (d) Нет.
 *   **Домашка:** 1) 15. 2) 5. 3) Нет. 4) 11 не кратно 4 → первый.
 *
 * Нумерация задач сквозная через все «Части» (1..N), отдельно для Sphinx
 * и Домашки.
 */

export type AnswerType = "numeric" | "text" | "choice" | "self-check";

/**
 * Извлекает map "номер задачи → эталонный ответ".
 * Заголовки секций (`**Часть I:**`, `**Sphinx:**`, ...) убираются.
 *
 * Для Sphinx и Домашки — отдельные ключи: "sphinx", "homework".
 * Английские (a)/(b) — ключи "english.a", "english.b" и т.д.
 */
export function parseAnswers(answersBlock: string | undefined): {
  byNumber: Record<string, string>;
  sphinx?: string;
  english?: Record<string, string>;
  homework?: Record<string, string>;
} {
  if (!answersBlock) return { byNumber: {} };

  const result = {
    byNumber: {} as Record<string, string>,
    sphinx: undefined as string | undefined,
    english: undefined as Record<string, string> | undefined,
    homework: undefined as Record<string, string> | undefined,
  };

  // Разбиваем текст на блоки по жирным заголовкам секций.
  // Заголовок выглядит как "**Часть I:**" или "**Sphinx:**".
  const sections = answersBlock.split(/\*\*([^*]+):\*\*/g);
  // sections = [textBeforeFirst, header1, body1, header2, body2, ...]

  // Тексту до первого заголовка не присваиваем — он обычно пустой.
  for (let i = 1; i < sections.length; i += 2) {
    const header = sections[i].trim().toLowerCase();
    const body = (sections[i + 1] || "").trim();

    if (header.includes("sphinx")) {
      // Single text answer
      result.sphinx = stripTrailingPunct(body);
      continue;
    }

    if (header.includes("english")) {
      // (a) X. (b) Y. (c) Z.
      result.english = parseLetterAnswers(body);
      continue;
    }

    if (header.includes("домашк") || header.includes("homework")) {
      result.homework = parseNumberedAnswers(body);
      continue;
    }

    // Часть I, II, III, IV, V — добавляем в общий byNumber
    if (header.startsWith("часть") || /^\d/.test(header) || header.length === 0) {
      Object.assign(result.byNumber, parseNumberedAnswers(body));
    }
  }

  // Если заголовков не нашли совсем — пробуем по всему тексту.
  if (Object.keys(result.byNumber).length === 0 && !result.sphinx && !result.english) {
    Object.assign(result.byNumber, parseNumberedAnswers(answersBlock));
  }

  return result;
}

function parseNumberedAnswers(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  const matches = text.matchAll(/(\d+)\)\s+([^\n]+?)(?=\s+\d+\)|$)/g);
  for (const m of matches) {
    const num = m[1];
    const ans = stripTrailingPunct(m[2]);
    if (ans) result[num] = ans;
  }
  return result;
}

function parseLetterAnswers(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  const matches = text.matchAll(/\(([a-eA-E])\)\s+([^\n]+?)(?=\s+\([a-eA-E]\)|$)/g);
  for (const m of matches) {
    const letter = m[1].toLowerCase();
    const ans = stripTrailingPunct(m[2]);
    if (ans) result[letter] = ans;
  }
  return result;
}

function stripTrailingPunct(s: string): string {
  return s.trim().replace(/[\s.;]+$/u, "");
}

// ─────────────────── классификация типа ответа ──────────────────

const NUMERIC_RX = /^[+-]?\d+([.,]\d+)?(?:\s*[/⁄]\s*\d+([.,]\d+)?)?$/u;

/**
 * По эталонному ответу определяет, можно ли его проверить автоматически.
 * - "12" / "0.5" / "5/8" / "−3" → numeric
 * - "Да" / "Нет" → choice (yes/no)
 * - всё остальное → self-check (без авто-проверки)
 */
export function detectAnswerType(answer: string, _taskText?: string): AnswerType {
  const a = answer.trim();
  if (!a) return "self-check";

  // Числа и простые дроби
  if (NUMERIC_RX.test(a)) return "numeric";

  // Да/Нет/Истина/Ложь
  const lower = a.toLowerCase();
  if (["да", "нет", "истина", "ложь", "yes", "no", "true", "false"].includes(lower)) {
    return "choice";
  }

  // Очень короткий ответ из 1-2 слов без формул — pass через self-check, чтобы
  // ученица сама сверила (не пытаемся быть слишком умными).
  if (a.length < 12 && /^[\dА-Яа-яA-Za-z\s+\-=,.()/]+$/.test(a)) {
    // Если в ответе есть число и формула — лучше отдать numeric только если оно строгое.
    const onlyNum = NUMERIC_RX.test(a.replace(/^[xX\s=]+/, ""));
    if (onlyNum) return "numeric";
  }

  return "self-check";
}

// ─────────────────── нормализация и проверка ────────────────────

/** Приводит ответ к каноническому виду для сравнения. */
export function normalizeAnswer(s: string): string {
  return s
    .trim()
    .replace(/\s+/g, "")
    .replace(/,/g, ".")
    .replace(/[⁄]/g, "/") // unicode fraction slash
    .toLowerCase();
}

/**
 * Сравнивает ответ ученика с эталонным.
 * - numeric: с допуском на десятичные/дробь.
 * - choice / text: точное (после нормализации).
 */
export function checkAnswer(
  userInput: string,
  expected: string,
  type: AnswerType
): boolean {
  if (!userInput.trim() || !expected.trim()) return false;

  const u = normalizeAnswer(userInput);
  const e = normalizeAnswer(expected);
  if (u === e) return true;

  if (type === "numeric") {
    const uNum = parseFractionOrNumber(u);
    const eNum = parseFractionOrNumber(e);
    if (uNum !== null && eNum !== null) {
      return Math.abs(uNum - eNum) < 1e-6;
    }
  }

  return false;
}

/** Парсит "5/8" → 0.625, "0.5" → 0.5, "12" → 12. */
function parseFractionOrNumber(s: string): number | null {
  if (s.includes("/")) {
    const [a, b] = s.split("/");
    const num = parseFloat(a);
    const den = parseFloat(b);
    if (isNaN(num) || isNaN(den) || den === 0) return null;
    return num / den;
  }
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}
