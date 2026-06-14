import { type ActivePiece, pieceCells } from "./pieces";

export const COLS = 10;
export const ROWS = 20;
/** Extra rows above the visible playfield used for spawn / collision checks. */
export const HIDDEN_ROWS = 4;
export const TOTAL_ROWS = ROWS + HIDDEN_ROWS;

/** 0 = empty; otherwise the PieceId character (or any truthy string). */
export type Cell = "" | string;

export type Board = Cell[][];

export function createBoard(): Board {
  return Array.from({ length: TOTAL_ROWS }, () => Array<Cell>(COLS).fill(""));
}

export function cloneBoard(b: Board): Board {
  return b.map((row) => row.slice());
}

/** True if every cell of the piece sits on an empty in-bounds cell. */
export function isValid(board: Board, piece: ActivePiece): boolean {
  for (const [c, r] of pieceCells(piece)) {
    if (c < 0 || c >= COLS) return false;
    if (r < 0 || r >= TOTAL_ROWS) return false;
    if (board[r][c]) return false;
  }
  return true;
}

/** Locks the piece into a NEW board (does not mutate input). */
export function lockPiece(board: Board, piece: ActivePiece): Board {
  const next = cloneBoard(board);
  for (const [c, r] of pieceCells(piece)) {
    if (r >= 0 && r < TOTAL_ROWS && c >= 0 && c < COLS) {
      next[r][c] = piece.id;
    }
  }
  return next;
}

export interface ClearResult {
  board: Board;
  linesCleared: number;
  /** absolute row indices (in TOTAL_ROWS coords) that were cleared, top→down. */
  clearedRows: number[];
}

/** Removes full rows and shifts the remainder down. */
export function clearFullLines(board: Board): ClearResult {
  const cleared: number[] = [];
  for (let r = 0; r < TOTAL_ROWS; r++) {
    if (board[r].every((c) => c !== "")) cleared.push(r);
  }
  if (cleared.length === 0) {
    return { board, linesCleared: 0, clearedRows: [] };
  }
  const remaining = board.filter((_, r) => !cleared.includes(r));
  const empties = Array.from({ length: cleared.length }, () =>
    Array<Cell>(COLS).fill(""),
  );
  return {
    board: [...empties, ...remaining],
    linesCleared: cleared.length,
    clearedRows: cleared,
  };
}

/** Moves the piece straight down until it would collide; returns new piece. */
export function dropToBottom(board: Board, piece: ActivePiece): ActivePiece {
  let cur = piece;
  while (true) {
    const candidate = { ...cur, row: cur.row + 1 };
    if (!isValid(board, candidate)) return cur;
    cur = candidate;
  }
}
