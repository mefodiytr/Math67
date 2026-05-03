/**
 * Канонические типы курса «Академия Девяти Лун».
 * Используются парсером уроков и UI-компонентами.
 */

export type Difficulty = 1 | 2 | 3 | 4;
//  1 = ★ Core | 2 = ★★ Strong | 3 = ★★★ Advanced | 4 = ★★★★ Sphinx

export interface Task {
  /** Номер задачи в исходном уроке (например, "5" или "11") */
  number: string;
  /** Текст условия в Markdown */
  text: string;
  /** Уровень сложности */
  difficulty: Difficulty;
  /** Номер секции внутри урока (Часть I → 1, Часть II → 2 и т.п.) */
  section?: string;
}

export interface TaskSection {
  /** Заголовок секции, как в уроке (например, "Часть I — Перебор и правила (★)") */
  heading: string;
  /** Очищенное название (без звёзд и римских цифр), например "Перебор и правила" */
  name: string;
  /** Уровень сложности всей секции */
  difficulty: Difficulty;
  /** Задачи внутри секции */
  tasks: Task[];
}

export interface EnglishBlock {
  /** Текст английского задания (a)/(b)/(c) — Markdown */
  text: string;
  /** Перевод для учителя */
  teacherTranslation: string;
}

export interface SphinxFinal {
  /** Заголовок (например, "Sphinx Final") */
  heading: string;
  /** Текст задачи в Markdown */
  text: string;
}

export interface Lesson {
  /** Номер модуля (0..12) */
  moduleId: number;
  /** Номер урока внутри модуля (1..18) */
  lessonId: number;
  /** Slug из имени файла, например "perebor" из "lesson-01-perebor.md" */
  slug: string;
  /** Полный заголовок: "Урок 8.12 — Великий Фонарь. Финал" */
  title: string;
  /** Краткое название без префикса "Урок N.M": "Великий Фонарь. Финал" */
  shortTitle: string;
  /** Длительность в минутах */
  duration?: number;
  /** ID куратора (lena, tsukiko, kuro, ...) */
  curator?: string;
  /** Сюжетный вступительный блок (Markdown) */
  story?: string;
  /** Идея / теория урока (Markdown) */
  idea?: string;
  /** Главные секции с задачами (Часть I, II, III, ...) */
  sections: TaskSection[];
  /** Sphinx Challenge (★★★★) */
  sphinx?: SphinxFinal;
  /** Cambridge English block */
  english?: EnglishBlock;
  /** Кошачий факт / миф */
  catFact?: string;
  /** Рефлексия */
  reflection?: string;
  /** Домашка (Markdown) */
  homework?: string;
  /** Ответы (под спойлером) */
  answers?: string;
  /** Сырая Markdown-версия урока (для дебага и финальных доработок) */
  rawMarkdown?: string;
}

export interface ModuleInfo {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  /** ID локации в assets/locations/ */
  locationId: string;
  /** Главный куратор модуля */
  primaryCuratorId: string;
  /** ID артефакта, получаемого в финале (если есть) */
  artifactId?: string;
  /** Доминирующий цвет модуля (hex) */
  primaryColour: string;
  /** Количество уроков */
  lessonsCount: number;
  /** Краткое описание для карточки */
  tagline: string;
}

export interface CharacterInfo {
  id: string;
  nameRu: string;
  nameAlt?: string;
  archetype: string;
  appearsIn: number[]; // module ids
  primaryColour: string;
}

export interface ArtifactInfo {
  id: string;
  nameRu: string;
  fromModule: number;
  shape: string;
  colour: string;
}

export interface LocationInfo {
  id: string;
  nameRu: string;
  module: number;
  palette: string[];
}
