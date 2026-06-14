export const LOCALES = ["en", "zh-CN"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function detectLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem("gamesjam:locale");
  if (isLocale(stored)) return stored;
  const nav = window.navigator.language || "";
  if (nav.toLowerCase().startsWith("zh")) return "zh-CN";
  return DEFAULT_LOCALE;
}
