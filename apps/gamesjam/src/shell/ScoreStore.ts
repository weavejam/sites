import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScoreState {
  /** Map of `${gameSlug}` → best score. */
  best: Record<string, number>;
  /** Returns true if this is a new best (then persisted). */
  submit: (gameSlug: string, score: number) => boolean;
  getBest: (gameSlug: string) => number;
}

export const useScores = create<ScoreState>()(
  persist(
    (set, get) => ({
      best: {},
      submit: (gameSlug, score) => {
        const prev = get().best[gameSlug] ?? 0;
        if (score <= prev) return false;
        set({ best: { ...get().best, [gameSlug]: score } });
        return true;
      },
      getBest: (gameSlug) => get().best[gameSlug] ?? 0,
    }),
    { name: "gamesjam:scores", version: 1 },
  ),
);
