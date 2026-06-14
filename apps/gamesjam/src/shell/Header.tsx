import { Link, NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LOCALES, type Locale, isLocale } from "../i18n/locales";
import { changeLocale } from "../i18n";
import { useSettings } from "./SettingsStore";

interface Props {
  onOpenSettings: () => void;
}

export function Header({ onOpenSettings }: Props) {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 backdrop-blur bg-jam-bg/70 border-b border-jam-border">
      <NavLink to={`/${locale}`} className="flex items-center gap-2 text-jam-text">
        <span className="text-2xl">🎮</span>
        <span className="font-bold tracking-tight text-lg">{t("brand")}</span>
      </NavLink>

      <div className="flex items-center gap-1">
        <LocaleSwitcher current={i18n.language as Locale} />
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label={t("settings.title")}
          className="h-9 w-9 grid place-items-center rounded-full hover:bg-jam-surface-2 transition"
        >
          <GearIcon />
        </button>
      </div>
    </header>
  );
}

function LocaleSwitcher({ current }: { current: Locale }) {
  const { onLanguageChange } = useSettings();
  return (
    <select
      className="bg-jam-surface text-jam-text text-sm rounded-md border border-jam-border px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-jam-primary"
      value={current}
      onChange={(e) => {
        const next = e.target.value as Locale;
        void changeLocale(next);
        onLanguageChange(next);
      }}
      aria-label="Language"
    >
      {LOCALES.map((l) => (
        <option key={l} value={l}>
          {l === "en" ? "EN" : "中文"}
        </option>
      ))}
    </select>
  );
}

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06A2 2 0 1 1 4.17 16.93l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
    </svg>
  );
}
