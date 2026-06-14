import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import zhCN from "./zh-CN.json";
import { DEFAULT_LOCALE, detectLocale, type Locale } from "./locales";

let started = false;

export function startI18n(initial?: Locale) {
  if (started) return;
  started = true;
  void i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      "zh-CN": { translation: zhCN },
    },
    lng: initial ?? detectLocale(),
    fallbackLng: DEFAULT_LOCALE,
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export async function changeLocale(locale: Locale) {
  await i18n.changeLanguage(locale);
  if (typeof window !== "undefined") {
    window.localStorage.setItem("gamesjam:locale", locale);
    document.documentElement.lang = locale;
  }
}

export { i18n };
