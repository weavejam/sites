import { Howl, Howler } from "howler";
import { useSettings } from "./SettingsStore";

export interface SfxDef {
  /** key used by callers */
  key: string;
  /** url under /public */
  src: string;
}

export interface BgmDef {
  key: string;
  src: string;
  /** loop start in seconds */
  loopFrom?: number;
}

interface LoadedSfx {
  howl: Howl;
}

interface LoadedBgm {
  howl: Howl;
}

class AudioManager {
  private sfx = new Map<string, LoadedSfx>();
  private bgm = new Map<string, LoadedBgm>();
  private currentBgmKey: string | null = null;
  private unlockBound = false;
  private unsub: (() => void) | null = null;

  init() {
    if (this.unsub) return;
    const apply = (s: ReturnType<typeof useSettings.getState>) => {
      Howler.volume(s.masterVolume);
      // Re-apply per-howl music volume.
      for (const [key, b] of this.bgm) {
        const vol = s.musicEnabled ? s.musicVolume : 0;
        b.howl.volume(vol);
        if (!s.musicEnabled && key === this.currentBgmKey) b.howl.pause();
      }
    };
    apply(useSettings.getState());
    this.unsub = useSettings.subscribe(apply);

    // iOS unlock — Howler does this automatically on first input,
    // but ensure context resumes.
    if (typeof document !== "undefined" && !this.unlockBound) {
      this.unlockBound = true;
      const resume = () => {
        if (typeof Howler.ctx !== "undefined" && Howler.ctx.state === "suspended") {
          void Howler.ctx.resume();
        }
      };
      document.addEventListener("pointerdown", resume, { passive: true });
      document.addEventListener("keydown", resume);
    }

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", this.onVisibility);
    }
  }

  destroy() {
    this.unsub?.();
    this.unsub = null;
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.onVisibility);
    }
    for (const b of this.bgm.values()) b.howl.unload();
    for (const s of this.sfx.values()) s.howl.unload();
    this.bgm.clear();
    this.sfx.clear();
    this.currentBgmKey = null;
  }

  private onVisibility = () => {
    if (typeof document === "undefined") return;
    if (document.hidden) {
      for (const b of this.bgm.values()) b.howl.pause();
    } else {
      const s = useSettings.getState();
      if (s.musicEnabled && this.currentBgmKey) {
        const b = this.bgm.get(this.currentBgmKey);
        b?.howl.play();
      }
    }
  };

  loadSfx(defs: SfxDef[]) {
    const settings = useSettings.getState();
    for (const def of defs) {
      if (this.sfx.has(def.key)) continue;
      const howl = new Howl({
        src: [def.src],
        volume: settings.sfxEnabled ? settings.sfxVolume : 0,
        preload: true,
      });
      this.sfx.set(def.key, { howl });
    }
  }

  loadBgm(defs: BgmDef[]) {
    const settings = useSettings.getState();
    for (const def of defs) {
      if (this.bgm.has(def.key)) continue;
      const howl = new Howl({
        src: [def.src],
        volume: settings.musicEnabled ? settings.musicVolume : 0,
        loop: true,
        preload: true,
      });
      this.bgm.set(def.key, { howl });
    }
  }

  playSfx(key: string) {
    const s = useSettings.getState();
    if (!s.sfxEnabled) return;
    const entry = this.sfx.get(key);
    if (!entry) return;
    entry.howl.volume(s.sfxVolume);
    entry.howl.play();
  }

  playBgm(key: string) {
    const s = useSettings.getState();
    const entry = this.bgm.get(key);
    if (!entry) return;
    if (this.currentBgmKey && this.currentBgmKey !== key) {
      this.bgm.get(this.currentBgmKey)?.howl.stop();
    }
    this.currentBgmKey = key;
    entry.howl.volume(s.musicEnabled ? s.musicVolume : 0);
    if (s.musicEnabled && !entry.howl.playing()) entry.howl.play();
  }

  stopBgm() {
    if (!this.currentBgmKey) return;
    this.bgm.get(this.currentBgmKey)?.howl.stop();
    this.currentBgmKey = null;
  }

  pauseAll() {
    for (const b of this.bgm.values()) b.howl.pause();
  }

  resumeBgm() {
    if (!this.currentBgmKey) return;
    const s = useSettings.getState();
    if (!s.musicEnabled) return;
    this.bgm.get(this.currentBgmKey)?.howl.play();
  }
}

export const audio = new AudioManager();
