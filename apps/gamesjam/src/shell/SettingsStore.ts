import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Locale, detectLocale } from "../i18n/locales";

interface SettingsState {
  masterVolume: number; // 0..1
  musicVolume: number;
  sfxVolume: number;
  musicEnabled: boolean;
  sfxEnabled: boolean;
  language: Locale;
  showTouchHud: boolean;
  setMasterVolume: (v: number) => void;
  setMusicVolume: (v: number) => void;
  setSfxVolume: (v: number) => void;
  setMusicEnabled: (on: boolean) => void;
  setSfxEnabled: (on: boolean) => void;
  onLanguageChange: (l: Locale) => void;
  setShowTouchHud: (on: boolean) => void;
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(pointer: coarse)").matches ?? false;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      masterVolume: 0.7,
      musicVolume: 0.6,
      sfxVolume: 0.8,
      musicEnabled: true,
      sfxEnabled: true,
      language: detectLocale(),
      showTouchHud: isTouchDevice(),
      setMasterVolume: (v) => set({ masterVolume: clamp(v) }),
      setMusicVolume: (v) => set({ musicVolume: clamp(v) }),
      setSfxVolume: (v) => set({ sfxVolume: clamp(v) }),
      setMusicEnabled: (on) => set({ musicEnabled: on }),
      setSfxEnabled: (on) => set({ sfxEnabled: on }),
      onLanguageChange: (language) => set({ language }),
      setShowTouchHud: (on) => set({ showTouchHud: on }),
    }),
    { name: "gamesjam:settings", version: 2 },
  ),
);

function clamp(v: number) {
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}
