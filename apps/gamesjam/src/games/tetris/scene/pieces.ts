export type PieceId = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

/** Rotation index 0..3 (0 = spawn, 1 = R, 2 = 180, 3 = L). */
export type Rotation = 0 | 1 | 2 | 3;

/** Cell offsets (col, row) relative to piece origin, for each rotation. */
export type PieceShape = readonly (readonly [number, number][])[];

/**
 * Standard SRS shapes. Origins:
 * - I uses 4x4 bounding-box convention (origin top-left of box).
 * - O is a 2x2 around origin.
 * - J/L/S/T/Z use 3x3 with origin at top-left of box.
 *
 * All coordinates are (col, row) within the bounding box.
 */
export const PIECE_SHAPES: Record<PieceId, PieceShape> = {
  // I — 4x4 bounding box
  I: [
    [[0, 1], [1, 1], [2, 1], [3, 1]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[0, 2], [1, 2], [2, 2], [3, 2]],
    [[1, 0], [1, 1], [1, 2], [1, 3]],
  ],
  // O — 2x2 (rotation has no effect)
  O: [
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]],
  ],
  T: [
    [[1, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [2, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [1, 2]],
    [[1, 0], [0, 1], [1, 1], [1, 2]],
  ],
  S: [
    [[1, 0], [2, 0], [0, 1], [1, 1]],
    [[1, 0], [1, 1], [2, 1], [2, 2]],
    [[1, 1], [2, 1], [0, 2], [1, 2]],
    [[0, 0], [0, 1], [1, 1], [1, 2]],
  ],
  Z: [
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[2, 0], [1, 1], [2, 1], [1, 2]],
    [[0, 1], [1, 1], [1, 2], [2, 2]],
    [[1, 0], [0, 1], [1, 1], [0, 2]],
  ],
  J: [
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [2, 0], [1, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [2, 2]],
    [[1, 0], [1, 1], [0, 2], [1, 2]],
  ],
  L: [
    [[2, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 2]],
    [[0, 1], [1, 1], [2, 1], [0, 2]],
    [[0, 0], [1, 0], [1, 1], [1, 2]],
  ],
};

export const ALL_PIECES: readonly PieceId[] = ["I", "O", "T", "S", "Z", "J", "L"];

/** 7-bag random generator — each bag yields a permutation of all 7 pieces. */
export function createBag(rng: () => number = Math.random): () => PieceId {
  let queue: PieceId[] = [];
  const refill = () => {
    const arr = [...ALL_PIECES];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    queue = arr;
  };
  return () => {
    if (queue.length === 0) refill();
    return queue.shift()!;
  };
}

export interface ActivePiece {
  id: PieceId;
  rotation: Rotation;
  /** column of the piece's bounding-box origin in the playfield */
  col: number;
  /** row of the piece's bounding-box origin (0 = top, increasing downwards) */
  row: number;
}

/** Returns the absolute cell coordinates of an active piece in (col,row). */
export function pieceCells(p: ActivePiece): [number, number][] {
  return PIECE_SHAPES[p.id][p.rotation].map(([c, r]) => [p.col + c, p.row + r]);
}

/** Returns the bounding-box size for a piece. */
export function pieceBoxSize(id: PieceId): number {
  if (id === "I") return 4;
  if (id === "O") return 2;
  return 3;
}
