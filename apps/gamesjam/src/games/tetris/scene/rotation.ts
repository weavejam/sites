import {
  type ActivePiece,
  type PieceId,
  type Rotation,
  PIECE_SHAPES,
} from "./pieces";
import { type Board, isValid } from "./board";

/** Standard SRS kick offsets for J/L/S/T/Z. */
const SRS_JLSTZ: Record<string, [number, number][]> = {
  "0>1": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  "1>0": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  "1>2": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  "2>1": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  "2>3": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  "3>2": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  "3>0": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  "0>3": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
};

/** Standard SRS kick offsets for I. */
const SRS_I: Record<string, [number, number][]> = {
  "0>1": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  "1>0": [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  "1>2": [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
  "2>1": [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
  "2>3": [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  "3>2": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  "3>0": [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
  "0>3": [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
};

function nextRotation(r: Rotation, dir: 1 | -1 | 2): Rotation {
  return (((r + dir) % 4) + 4) % 4 as Rotation;
}

/**
 * Tries to rotate the piece using SRS wall-kicks.
 * Returns the new piece + the kick index used (0..4), or null if no kick worked.
 */
export function tryRotate(
  board: Board,
  piece: ActivePiece,
  dir: 1 | -1,
): { piece: ActivePiece; kick: number } | null {
  if (piece.id === "O") return { piece, kick: 0 };
  const from = piece.rotation;
  const to = nextRotation(from, dir);
  const key = `${from}>${to}`;
  const table = piece.id === "I" ? SRS_I : SRS_JLSTZ;
  const kicks = table[key];
  if (!kicks) return null;

  for (let i = 0; i < kicks.length; i++) {
    const [dc, dr] = kicks[i];
    // SRS specifies offset in (x, y) where +y is up; our board grows row down.
    const candidate: ActivePiece = {
      ...piece,
      rotation: to,
      col: piece.col + dc,
      row: piece.row - dr,
    };
    if (isValid(board, candidate)) return { piece: candidate, kick: i };
  }
  return null;
}

/** Spawn position for a new piece — center of board, top of buffer. */
export function spawnPiece(id: PieceId): ActivePiece {
  // 10-wide board, 3-wide spawn box → col 3; I (4-wide) → col 3 too (centered).
  const col = id === "O" ? 4 : 3;
  return { id, rotation: 0, col, row: 0 };
}

/**
 * Returns the four occupied corners around the T piece's center, used for
 * 3-corner T-spin detection. Coordinates returned are absolute.
 */
export function tCorners(piece: ActivePiece, board: Board): boolean[] {
  if (piece.id !== "T") return [];
  // Center cell of the 3x3 bounding box is at (col+1, row+1).
  const cx = piece.col + 1;
  const cy = piece.row + 1;
  const corners: [number, number][] = [
    [cx - 1, cy - 1],
    [cx + 1, cy - 1],
    [cx - 1, cy + 1],
    [cx + 1, cy + 1],
  ];
  return corners.map(([c, r]) => {
    if (c < 0 || c >= board[0].length || r < 0 || r >= board.length) return true; // wall counts as filled
    return !!board[r][c];
  });
}

// Re-export for tests
export { PIECE_SHAPES };
