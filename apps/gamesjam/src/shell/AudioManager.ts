import { Howl, Howler } from "howler";
import { useSettings } from "./SettingsStore";

export interface AudioDef {
  /** key used by callers */
  key: string;
  /** url under /public */
  src: string;
}

class AudioManager {
  private sfx = new Map<string, Howl>();
  private bgm = new Map<string, Howl>();
  private currentBgmKey: string | null = null;
  private unlockBound = false;
  private unsub: (() => void) | null = null;

  init() {
    if (this.unsub) return;
    const apply = (s: ReturnType<typeof useSettings.getState>) => {
      Howler.volume(s.masterVolume);
      for (const [key, howl] of this.bgm) {
        const vol = s.musicEnabled ? s.musicVolume : 0;
        howl.volume(vol);
        if (!s.musicEnabled && key === this.currentBgmKey) howl.pause();
      }
    };
    apply(useSettings.getState());
    this.unsub = useSettings.subscribe(apply);

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
    for (const h of this.bgm.values()) h.unload();
    for (const h of this.sfx.values()) h.unload();
    this.bgm.clear();
    this.sfx.clear();
    this.currentBgmKey = null;
  }

  private onVisibility = () => {
    if (typeof document === "undefined") return;
    if (document.hidden) {
      for (const h of this.bgm.values()) h.pause();
    }
    // We never auto-resume on visibility-gain — the game scene owns gameplay
    // state and will call `resumeBgm()` when (and if) the user resumes play.
  };

  loadSfx(defs: readonly AudioDef[]) {
    const settings = useSettings.getState();
    for (const def of defs) {
      if (this.sfx.has(def.key)) continue;
      this.sfx.set(def.key, new Howl({
        src: [def.src],
        volume: settings.sfxEnabled ? settings.sfxVolume : 0,
        preload: true,
      }));
    }
  }

  loadBgm(defs: readonly AudioDef[]) {
    const settings = useSettings.getState();
    for (const def of defs) {
      if (this.bgm.has(def.key)) continue;
      this.bgm.set(def.key, new Howl({
        src: [def.src],
        volume: settings.musicEnabled ? settings.musicVolume : 0,
        loop: true,
        preload: true,
      }));
    }
  }

  playSfx(key: string) {
    const s = useSettings.getState();
    if (!s.sfxEnabled) return;
    const howl = this.sfx.get(key);
    if (!howl) return;
    howl.volume(s.sfxVolume);
    howl.play();
  }

  playBgm(key: string) {
    const s = useSettings.getState();
    const howl = this.bgm.get(key);
    if (!howl) return;
    if (this.currentBgmKey && this.currentBgmKey !== key) {
      this.bgm.get(this.currentBgmKey)?.stop();
    }
    this.currentBgmKey = key;
    howl.volume(s.musicEnabled ? s.musicVolume : 0);
    if (s.musicEnabled && !howl.playing()) howl.play();
  }

  stopBgm() {
    if (!this.currentBgmKey) return;
    this.bgm.get(this.currentBgmKey)?.stop();
    this.currentBgmKey = null;
  }

  pauseAll() {
    for (const h of this.bgm.values()) h.pause();
  }

  resumeBgm() {
    if (!this.currentBgmKey) return;
    const s = useSettings.getState();
    if (!s.musicEnabled) return;
    this.bgm.get(this.currentBgmKey)?.play();
  }
}

export const audio = new AudioManager();
