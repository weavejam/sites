import { tCorners } from "./rotation";
import type { ActivePiece } from "./pieces";
import type { Board } from "./board";

/** Outcome of locking a piece + clearing lines. */
export interface ClearKind {
  lines: number;
  /** True iff this was a T-spin (any T-spin, mini or full). */
  tSpin: boolean;
  /** True iff this was specifically a T-spin mini. */
  tSpinMini: boolean;
}

/** Decide T-spin kind for a freshly-locked piece. */
export function detectTSpin(
  piece: ActivePiece,
  board: Board,
  lastMoveWasRotation: boolean,
  lastKickIndex: number,
): { tSpin: boolean; tSpinMini: boolean } {
  if (piece.id !== "T" || !lastMoveWasRotation) {
    return { tSpin: false, tSpinMini: false };
  }
  const corners = tCorners(piece, board);
  const filled = corners.filter(Boolean).length;
  if (filled < 3) return { tSpin: false, tSpinMini: false };

  // Standard guideline: rotation index 0=spawn → "front" corners are the top two.
  // For minimal correctness we approximate: kick index 4 (large jump) marks T-spin (full).
  const isFull = lastKickIndex === 4;
  return { tSpin: true, tSpinMini: !isFull };
}

export interface ScoreState {
  score: number;
  lines: number;
  level: number;
  combo: number; // -1 if no active combo
  backToBack: boolean;
}

export const INITIAL_SCORE: ScoreState = {
  score: 0,
  lines: 0,
  level: 1,
  combo: -1,
  backToBack: false,
};

/**
 * Mutates a *copy* of state and returns it after applying one clear.
 * Always provide kind via lines + tSpin flags.
 */
export function applyClear(state: ScoreState, kind: ClearKind): ScoreState {
  const { lines, tSpin, tSpinMini } = kind;
  let added = 0;
  let isDifficult = false;

  if (tSpin) {
    isDifficult = lines > 0;
    if (tSpinMini) {
      added =
        lines === 0 ? 100 :
        lines === 1 ? 200 :
        /* mini double */ 400;
    } else {
      added =
        lines === 0 ? 400 :
        lines === 1 ? 800 :
        lines === 2 ? 1200 :
        /* triple */ 1600;
    }
  } else {
    switch (lines) {
      case 0: added = 0; break;
      case 1: added = 100; break;
      case 2: added = 300; break;
      case 3: added = 500; break;
      case 4: added = 800; isDifficult = true; break;
    }
  }

  let next: ScoreState = { ...state };

  if (state.backToBack && isDifficult && added > 0) {
    added = Math.floor(added * 1.5);
  }

  added *= state.level;

  // Combo bonus
  let combo = state.combo;
  if (lines > 0) {
    combo = combo + 1;
    if (combo > 0) added += 50 * combo * state.level;
  } else {
    combo = -1;
  }

  next.score = state.score + added;
  next.lines = state.lines + lines;
  next.combo = combo;
  next.backToBack = lines > 0 ? isDifficult : state.backToBack;
  next.level = 1 + Math.floor(next.lines / 10);

  return next;
}

/** Score awarded by hard-dropping `cells` rows. Soft drop gives 1pt/row. */
export function dropPoints(cells: number, kind: "soft" | "hard"): number {
  return kind === "hard" ? cells * 2 : cells;
}

/**
 * Returns gravity (seconds per row) for the given level.
 * Mirrors the official guideline up to level 20.
 */
export function gravityForLevel(level: number): number {
  const l = Math.max(1, Math.min(level, 20));
  // (0.8 - ((level-1) * 0.007)) ^ (level - 1)
  return Math.pow(0.8 - (l - 1) * 0.007, l - 1);
}
