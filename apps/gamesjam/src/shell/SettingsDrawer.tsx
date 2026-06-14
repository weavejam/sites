import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSettings, type ThemeMode } from "./SettingsStore";
import { changeLocale } from "../i18n";
import { LOCALES, type Locale } from "../i18n/locales";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ open, onClose }: Props) {
  const { t } = useTranslation();
  const s = useSettings();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:max-w-sm bg-jam-surface border-l border-jam-border transition-transform duration-200 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label={t("settings.title")}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <header className="flex items-center justify-between px-4 py-3 border-b border-jam-border">
          <h2 className="font-bold text-lg">{t("settings.title")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-md hover:bg-jam-surface-2"
          >
            {t("settings.close")}
          </button>
        </header>
        <div className="overflow-y-auto p-4 flex flex-col gap-6 text-sm">
          <Section title={t("settings.audio")}>
            <Slider
              label={t("settings.master")}
              value={s.masterVolume}
              onChange={s.setMasterVolume}
            />
            <ToggleRow
              label={t("settings.music")}
              on={s.musicEnabled}
              onChange={s.setMusicEnabled}
            />
            <Slider
              label={t("settings.music")}
              value={s.musicVolume}
              onChange={s.setMusicVolume}
              disabled={!s.musicEnabled}
            />
            <ToggleRow
              label={t("settings.sfx")}
              on={s.sfxEnabled}
              onChange={s.setSfxEnabled}
            />
            <Slider
              label={t("settings.sfx")}
              value={s.sfxVolume}
              onChange={s.setSfxVolume}
              disabled={!s.sfxEnabled}
            />
          </Section>

          <Section title={t("settings.appearance")}>
            <SegRow
              label={t("settings.theme")}
              value={s.theme}
              options={
                [
                  ["system", t("settings.themeSystem")],
                  ["light", t("settings.themeLight")],
                  ["dark", t("settings.themeDark")],
                ] as [ThemeMode, string][]
              }
              onChange={s.setTheme}
            />
            <SegRow
              label={t("settings.language")}
              value={s.language}
              options={LOCALES.map((l) => [l, l === "en" ? "EN" : "中文"] as [Locale, string])}
              onChange={(l) => {
                s.onLanguageChange(l);
                void changeLocale(l);
              }}
            />
          </Section>

          <Section title={t("settings.controls")}>
            <ToggleRow
              label={t("settings.touchHud")}
              on={s.showTouchHud}
              onChange={s.setShowTouchHud}
            />
          </Section>
        </div>
      </aside>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-xs uppercase tracking-wider text-jam-muted mb-2">{title}</div>
      <div className="flex flex-col gap-3 bg-jam-surface-2 rounded-xl p-3">{children}</div>
    </section>
  );
}

function Slider({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1 ${disabled ? "opacity-50" : ""}`}>
      <span className="flex justify-between">
        <span>{label}</span>
        <span className="tabular-nums text-jam-muted">{Math.round(value * 100)}</span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(value * 100)}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
        className="accent-jam-primary"
      />
    </label>
  );
}

function ToggleRow({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (on: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={`h-6 w-11 rounded-full relative transition ${on ? "bg-jam-primary" : "bg-jam-border"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? "left-5" : "left-0.5"}`}
        />
      </button>
    </label>
  );
}

function SegRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: [T, string][];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span>{label}</span>
      <div className="flex bg-jam-bg rounded-lg p-1 gap-1">
        {options.map(([v, lbl]) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex-1 px-2 py-1.5 text-sm rounded-md transition ${value === v ? "bg-jam-primary text-jam-bg font-medium" : "text-jam-muted hover:text-jam-text"}`}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}
