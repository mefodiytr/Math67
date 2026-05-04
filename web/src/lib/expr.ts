/**
 * Маленький парсер арифметических выражений для авто-проверки задач.
 *
 * Поддержка:
 *   • Числа: 12, 0.5, 1/2 (как операция деления)
 *   • Операторы: +, −, *, /, ^ (степень)
 *   • Юникод-операторы: · × — − ÷ : (нормализуются)
 *   • Степени-надстрочные: ²  ³  ⁴ ... ⁹ (преобразуются в ^N)
 *   • Скобки ()
 *   • Унарный минус
 *
 * НЕ поддерживается: переменные, функции (sin, sqrt и т.п.).
 *
 * Если выражение невалидно — eval возвращает null.
 */

export type ExprResult =
  | { ok: true; value: number; digitsUsed: number[] }
  | { ok: false; error: string };

const SUPERSCRIPT_TO_DIGIT: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
};

/**
 * Нормализация: юникодные операторы → ASCII, надстрочные → ^N, и пр.
 */
export function normalizeExpression(s: string): string {
  let out = s.trim();
  // Множитель: · × * (всё → *)
  out = out.replace(/[·×•]/g, "*");
  // Деление: ÷ : / (всё → /)
  out = out.replace(/[÷:]/g, "/");
  // Минус: − (U+2212), – (U+2013), — (U+2014) → -
  out = out.replace(/[−–—]/g, "-");
  // Запятая как десятичный разделитель → точка
  // (Но не запятая внутри функций — функций нет, так что OK.)
  out = out.replace(/,/g, ".");
  // Надстрочные степени: a² → a^2, ²³ → ^23
  out = out.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (m) => {
    const digits = m
      .split("")
      .map((c) => SUPERSCRIPT_TO_DIGIT[c] ?? c)
      .join("");
    return `^${digits}`;
  });
  // Невидимые символы
  out = out.replace(/[​-‍﻿ ]/g, "");
  return out;
}

// ─────────────────────────── tokenizer ───────────────────────────

type TokKind = "num" | "+" | "-" | "*" | "/" | "^" | "(" | ")";
interface Tok {
  kind: TokKind;
  value?: number;
  /** Если это число — сохраняем оригинальные цифры (для проверки «использованы только заданные») */
  digits?: number[];
}

function tokenize(s: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (c === "+" || c === "-" || c === "*" || c === "/" || c === "^" || c === "(" || c === ")") {
      toks.push({ kind: c });
      i++;
      continue;
    }
    if (/\d/.test(c) || c === ".") {
      let j = i;
      const digits: number[] = [];
      while (j < s.length && /[\d.]/.test(s[j])) {
        if (/\d/.test(s[j])) digits.push(parseInt(s[j], 10));
        j++;
      }
      const numStr = s.slice(i, j);
      const num = parseFloat(numStr);
      if (isNaN(num)) throw new Error(`Не число: «${numStr}»`);
      toks.push({ kind: "num", value: num, digits });
      i = j;
      continue;
    }
    throw new Error(`Непонятный символ: «${c}»`);
  }
  return toks;
}

// ─────────────────────────── parser (recursive descent) ────────────

/*
 * expr   := term (('+' | '-') term)*
 * term   := pow (('*' | '/') pow)*
 * pow    := unary ('^' unary)*    // правоассоциативно
 * unary  := ('-' | '+') unary | atom
 * atom   := number | '(' expr ')'
 */

class Parser {
  private pos = 0;
  digitsUsed: number[] = [];

  constructor(private toks: Tok[]) {}

  parse(): number {
    const v = this.expr();
    if (this.pos !== this.toks.length) {
      throw new Error("Лишний хвост в выражении");
    }
    return v;
  }

  private peek(): Tok | undefined {
    return this.toks[this.pos];
  }
  private next(): Tok {
    const t = this.toks[this.pos++];
    if (!t) throw new Error("Неожиданный конец выражения");
    return t;
  }

  private expr(): number {
    let v = this.term();
    while (this.peek()?.kind === "+" || this.peek()?.kind === "-") {
      const op = this.next().kind;
      const r = this.term();
      v = op === "+" ? v + r : v - r;
    }
    return v;
  }
  private term(): number {
    let v = this.pow();
    while (this.peek()?.kind === "*" || this.peek()?.kind === "/") {
      const op = this.next().kind;
      const r = this.pow();
      if (op === "*") v *= r;
      else {
        if (r === 0) throw new Error("Деление на 0");
        v /= r;
      }
    }
    return v;
  }
  private pow(): number {
    let v = this.unary();
    if (this.peek()?.kind === "^") {
      this.next();
      const r = this.pow(); // право-ассоциативно
      v = Math.pow(v, r);
    }
    return v;
  }
  private unary(): number {
    const k = this.peek()?.kind;
    if (k === "-") {
      this.next();
      return -this.unary();
    }
    if (k === "+") {
      this.next();
      return this.unary();
    }
    return this.atom();
  }
  private atom(): number {
    const t = this.next();
    if (t.kind === "num") {
      if (t.digits) this.digitsUsed.push(...t.digits);
      return t.value!;
    }
    if (t.kind === "(") {
      const v = this.expr();
      const close = this.next();
      if (close.kind !== ")") throw new Error("Ожидалась «)»");
      return v;
    }
    throw new Error(`Неожиданный токен: «${t.kind}»`);
  }
}

// ─────────────────────────── public API ──────────────────────────

/**
 * Безопасно вычислить арифметическое выражение.
 * При ошибке возвращает { ok: false, error }.
 */
export function evalExpression(input: string): ExprResult {
  if (!input.trim()) return { ok: false, error: "Пусто" };
  let normalized: string;
  try {
    normalized = normalizeExpression(input);
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
  let toks: Tok[];
  try {
    toks = tokenize(normalized);
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
  if (toks.length === 0) return { ok: false, error: "Пусто" };
  try {
    const parser = new Parser(toks);
    const value = parser.parse();
    if (!isFinite(value)) {
      return { ok: false, error: "Бесконечность" };
    }
    return { ok: true, value, digitsUsed: parser.digitsUsed };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Проверка «равно ли выражение целевому значению» (с допуском).
 */
export function exprEquals(input: string, target: number, eps = 1e-6): boolean {
  const r = evalExpression(input);
  if (!r.ok) return false;
  return Math.abs(r.value - target) < eps;
}

/**
 * Проверка «использует ли выражение все заданные цифры (мультимножество)».
 * requiredDigits: например, [1, 2, 3, 4] — нужно по одному вхождению каждой.
 */
export function usesDigits(
  input: string,
  requiredDigits: number[]
): { ok: boolean; missing: number[]; extra: number[] } {
  const r = evalExpression(input);
  if (!r.ok) return { ok: false, missing: requiredDigits, extra: [] };

  // Сравниваем мультимножества
  const need = countBy(requiredDigits);
  const have = countBy(r.digitsUsed);
  const missing: number[] = [];
  const extra: number[] = [];
  for (const d of new Set([...Object.keys(need), ...Object.keys(have)])) {
    const dn = parseInt(d, 10);
    const dif = (have[d] ?? 0) - (need[d] ?? 0);
    if (dif < 0) {
      for (let i = 0; i < -dif; i++) missing.push(dn);
    } else if (dif > 0) {
      for (let i = 0; i < dif; i++) extra.push(dn);
    }
  }
  return { ok: missing.length === 0 && extra.length === 0, missing, extra };
}

function countBy(arr: number[]): Record<string, number> {
  const m: Record<string, number> = {};
  for (const v of arr) m[String(v)] = (m[String(v)] ?? 0) + 1;
  return m;
}
