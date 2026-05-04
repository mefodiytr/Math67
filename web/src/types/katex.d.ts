/**
 * KaTeX поставляет auto-render как отдельный модуль без типов в @types.
 * Объявляем минимальный shim, чтобы tsc не ругался на динамический import.
 */
declare module "katex/contrib/auto-render" {
  export interface AutoRenderOptions {
    delimiters?: { left: string; right: string; display?: boolean }[];
    ignoredTags?: string[];
    ignoredClasses?: string[];
    errorCallback?: (msg: string, err: Error) => void;
    throwOnError?: boolean;
    strict?: boolean | "ignore" | "warn" | "error";
    [key: string]: unknown;
  }
  const renderMathInElement: (
    element: HTMLElement | Document,
    options?: AutoRenderOptions,
  ) => void;
  export default renderMathInElement;
}
