import { describe, it, expect } from "vitest";
import {
  ALL_PIECES,
  createBag,
  pieceCells,
  type PieceId,
} from "./pieces";
import {
  COLS,
  TOTAL_ROWS,
  createBoard,
  clearFullLines,
  isValid,
  lockPiece,
  dropToBottom,
} from "./board";
import { tryRotate, spawnPiece } from "./rotation";
import { applyClear, INITIAL_SCORE, gravityForLevel, dropPoints } from "./scoring";

// ---------- pieces / 7-bag ----------
describe("7-bag", () => {
  it("yields each piece exactly once per 7 draws", () => {
    let seed = 1;
    const rng = () => {
      // Mulberry32
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const next = createBag(rng);
    for (let trial = 0; trial < 50; trial++) {
      const draws: PieceId[] = [];
      for (let i = 0; i < 7; i++) draws.push(next());
      const sorted = [...draws].sort();
      expect(sorted).toEqual([...ALL_PIECES].sort());
    }
  });
});

// ---------- board ----------
describe("board collision", () => {
  it("rejects pieces outside columns", () => {
    const b = createBoard();
    expect(isValid(b, { id: "I", rotation: 0, col: -1, row: 0 })).toBe(false);
    expect(isValid(b, { id: "I", rotation: 0, col: 7, row: 0 })).toBe(false);
    expect(isValid(b, { id: "I", rotation: 0, col: 6, row: 0 })).toBe(true);
  });
  it("rejects pieces past floor", () => {
    const b = createBoard();
    // I piece rotation 0 has cells at y=1; max valid origin row is TOTAL_ROWS - 2.
    const maxRow = TOTAL_ROWS - 2;
    expect(isValid(b, { id: "I", rotation: 0, col: 0, row: maxRow })).toBe(true);
    expect(isValid(b, { id: "I", rotation: 0, col: 0, row: maxRow + 1 })).toBe(false);
  });
});

describe("line clearing", () => {
  it("clears a single full row and shifts above downwards", () => {
    const b = createBoard();
    // Fill the very last visible row.
    const lastRow = TOTAL_ROWS - 1;
    b[lastRow] = Array<string>(COLS).fill("X");
    // Drop a stray marker above for shift verification.
    b[lastRow - 1][0] = "Y";
    const { board, linesCleared, clearedRows } = clearFullLines(b);
    expect(linesCleared).toBe(1);
    expect(clearedRows).toEqual([lastRow]);
    expect(board[lastRow][0]).toBe("Y");
    expect(board[lastRow][1]).toBe("");
  });

  it("clears a tetris (4 lines at once)", () => {
    const b = createBoard();
    for (let r = TOTAL_ROWS - 4; r < TOTAL_ROWS; r++) {
      b[r] = Array<string>(COLS).fill("X");
    }
    const res = clearFullLines(b);
    expect(res.linesCleared).toBe(4);
    expect(res.board.every((row) => row.every((c) => c === ""))).toBe(true);
  });

  it("does nothing when no row is full", () => {
    const b = createBoard();
    b[TOTAL_ROWS - 1][0] = "X";
    const res = clearFullLines(b);
    expect(res.linesCleared).toBe(0);
    expect(res.board).toBe(b);
  });
});

describe("lock + drop", () => {
  it("drops a piece to the floor", () => {
    const b = createBoard();
    const p = spawnPiece("I");
    const landed = dropToBottom(b, p);
    expect(landed.row).toBeGreaterThan(p.row);
    const locked = lockPiece(b, landed);
    const filledCells = pieceCells(landed);
    for (const [c, r] of filledCells) expect(locked[r][c]).toBe("I");
  });
});

// ---------- rotation / SRS ----------
describe("SRS rotation", () => {
  it("O piece never moves", () => {
    const b = createBoard();
    const p = spawnPiece("O");
    const res = tryRotate(b, p, 1);
    expect(res?.piece).toEqual(p);
  });

  it("rotates every non-O piece on empty board through 4 turns", () => {
    const b = createBoard();
    for (const id of ALL_PIECES) {
      if (id === "O") continue;
      let p = spawnPiece(id);
      // Move into mid-board to avoid wall edges
      p = { ...p, row: 5 };
      for (let i = 0; i < 4; i++) {
        const res = tryRotate(b, p, 1);
        expect(res, `${id} should rotate CW from rot ${p.rotation}`).not.toBeNull();
        p = res!.piece;
      }
      expect(p.rotation).toBe(0);
    }
  });

  it("rotation succeeds via wall-kick when origin position is blocked", () => {
    const b = createBoard();
    // Fill column 0 with garbage so an L at col 0 can't sit in rotation 1's
    // leftmost cell without a kick.
    for (let r = 0; r < TOTAL_ROWS; r++) b[r][0] = "X";
    // Spawn an L at col 1 in rotation 1 (cells in 3x3: (1,0),(1,1),(1,2),(2,2)).
    const p = { id: "L" as const, rotation: 1 as const, col: 1, row: 5 };
    expect(isValid(b, p)).toBe(true);
    // Rotating CW from 1→2 with no kick puts cells incl col 0 → blocked.
    // SRS should kick right and still succeed.
    const res = tryRotate(b, p, 1);
    expect(res).not.toBeNull();
    expect(isValid(b, res!.piece)).toBe(true);
  });
});

// ---------- scoring ----------
describe("guideline scoring", () => {
  it("awards 100/300/500/800 × level for single/double/triple/tetris", () => {
    expect(applyClear(INITIAL_SCORE, { lines: 1, tSpin: false, tSpinMini: false }).score).toBe(100);
    expect(applyClear(INITIAL_SCORE, { lines: 2, tSpin: false, tSpinMini: false }).score).toBe(300);
    expect(applyClear(INITIAL_SCORE, { lines: 3, tSpin: false, tSpinMini: false }).score).toBe(500);
    expect(applyClear(INITIAL_SCORE, { lines: 4, tSpin: false, tSpinMini: false }).score).toBe(800);
    const lvl5 = { ...INITIAL_SCORE, level: 5 };
    expect(applyClear(lvl5, { lines: 1, tSpin: false, tSpinMini: false }).score).toBe(500);
  });

  it("scores T-spins (full and mini)", () => {
    expect(applyClear(INITIAL_SCORE, { lines: 1, tSpin: true, tSpinMini: false }).score).toBe(800);
    expect(applyClear(INITIAL_SCORE, { lines: 2, tSpin: true, tSpinMini: false }).score).toBe(1200);
    expect(applyClear(INITIAL_SCORE, { lines: 0, tSpin: true, tSpinMini: true }).score).toBe(100);
    expect(applyClear(INITIAL_SCORE, { lines: 1, tSpin: true, tSpinMini: true }).score).toBe(200);
  });

  it("back-to-back x1.5 only between difficult clears", () => {
    let s = applyClear(INITIAL_SCORE, { lines: 4, tSpin: false, tSpinMini: false });
    expect(s.backToBack).toBe(true);
    expect(s.score).toBe(800);
    // Next tetris: B2B 1200 + combo bonus (combo=1 → 50*1*1=50). Total = 800 + 1250.
    s = applyClear(s, { lines: 4, tSpin: false, tSpinMini: false });
    expect(s.score).toBe(800 + 1200 + 50);
    // A single still scores (with combo) but breaks B2B.
    s = applyClear(s, { lines: 1, tSpin: false, tSpinMini: false });
    expect(s.backToBack).toBe(false);
  });

  it("combo adds +50 × combo × level on consecutive clears", () => {
    let s = applyClear(INITIAL_SCORE, { lines: 1, tSpin: false, tSpinMini: false });
    expect(s.combo).toBe(0);
    s = applyClear(s, { lines: 1, tSpin: false, tSpinMini: false });
    // Second clear: 100 + 50*1*1 = 150 → total = 100 + 150 = 250
    expect(s.score).toBe(250);
    expect(s.combo).toBe(1);
  });

  it("combo resets on a no-line lock", () => {
    let s = applyClear(INITIAL_SCORE, { lines: 1, tSpin: false, tSpinMini: false });
    s = applyClear(s, { lines: 0, tSpin: false, tSpinMini: false });
    expect(s.combo).toBe(-1);
  });

  it("level rises every 10 lines", () => {
    let s = INITIAL_SCORE;
    for (let i = 0; i < 10; i++) {
      s = applyClear(s, { lines: 1, tSpin: false, tSpinMini: false });
    }
    expect(s.lines).toBe(10);
    expect(s.level).toBe(2);
  });
});

describe("gravity + drop points", () => {
  it("gravity decreases monotonically with level", () => {
    const prev = gravityForLevel(1);
    const after = gravityForLevel(5);
    expect(after).toBeLessThan(prev);
    // Level 1 is exactly 1 second (0.8 ^ 0 = 1).
    expect(prev).toBeCloseTo(1);
  });

  it("hard drop scores 2pt per cell, soft drop 1pt", () => {
    expect(dropPoints(5, "hard")).toBe(10);
    expect(dropPoints(5, "soft")).toBe(5);
  });
});
