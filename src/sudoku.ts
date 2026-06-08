export type Grid = number[];

export interface PuzzleSize {
  size: number;
  boxRows: number;
  boxCols: number;
}

export const SIZE_9: PuzzleSize = { size: 9, boxRows: 3, boxCols: 3 };
export const SIZE_6: PuzzleSize = { size: 6, boxRows: 2, boxCols: 3 };
export const SIZE_4: PuzzleSize = { size: 4, boxRows: 2, boxCols: 2 };

export type Difficulty = "easy" | "standard" | "hard";

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function boxIndex(r: number, c: number, p: PuzzleSize): number {
  return Math.floor(r / p.boxRows) * p.boxRows + Math.floor(c / p.boxCols);
}

export function isValidPlacement(
  grid: Grid,
  r: number,
  c: number,
  val: number,
  p: PuzzleSize
): boolean {
  const n = p.size;
  for (let i = 0; i < n; i++) {
    if (grid[r * n + i] === val) return false;
    if (grid[i * n + c] === val) return false;
  }
  const br = Math.floor(r / p.boxRows) * p.boxRows;
  const bc = Math.floor(c / p.boxCols) * p.boxCols;
  for (let i = 0; i < p.boxRows; i++) {
    for (let j = 0; j < p.boxCols; j++) {
      if (grid[(br + i) * n + (bc + j)] === val) return false;
    }
  }
  return true;
}

function solve(grid: Grid, p: PuzzleSize, countLimit = 2): number {
  const n = p.size;
  let idx = -1;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === 0) { idx = i; break; }
  }
  if (idx === -1) return 1;
  const r = Math.floor(idx / n);
  const c = idx % n;
  let count = 0;
  const nums = shuffle([...Array(n).keys()].map((x) => x + 1));
  for (const v of nums) {
    if (isValidPlacement(grid, r, c, v, p)) {
      grid[idx] = v;
      count += solve(grid, p, countLimit - count);
      if (count >= countLimit) {
        grid[idx] = 0;
        return count;
      }
    }
  }
  grid[idx] = 0;
  return count;
}

export function solveOne(grid: Grid, p: PuzzleSize): Grid | null {
  const g = [...grid];
  const n = p.size;
  let idx = -1;
  for (let i = 0; i < g.length; i++) if (g[i] === 0) { idx = i; break; }
  if (idx === -1) return g;
  const r = Math.floor(idx / n);
  const c = idx % n;
  for (let v = 1; v <= n; v++) {
    if (isValidPlacement(g, r, c, v, p)) {
      g[idx] = v;
      const res = solveOne(g, p);
      if (res) return res;
      g[idx] = 0;
    }
  }
  return null;
}

function generateFull(p: PuzzleSize): Grid {
  const grid: Grid = new Array(p.size * p.size).fill(0);
  fill(grid, 0, p);
  return grid;
}

function fill(grid: Grid, idx: number, p: PuzzleSize): boolean {
  if (idx >= grid.length) return true;
  if (grid[idx] !== 0) return fill(grid, idx + 1, p);
  const n = p.size;
  const r = Math.floor(idx / n);
  const c = idx % n;
  const nums = shuffle([...Array(n).keys()].map((x) => x + 1));
  for (const v of nums) {
    if (isValidPlacement(grid, r, c, v, p)) {
      grid[idx] = v;
      if (fill(grid, idx + 1, p)) return true;
      grid[idx] = 0;
    }
  }
  return false;
}

const CLUE_RATIO: Record<Difficulty, Record<number, number>> = {
  easy:     { 4: 11, 6: 22, 9: 42 },
  standard: { 4: 8,  6: 17, 9: 32 },
  hard:     { 4: 6,  6: 14, 9: 26 },
};

export interface Puzzle {
  puzzle: Grid;
  solution: Grid;
  size: PuzzleSize;
}

export function generatePuzzle(p: PuzzleSize, diff: Difficulty): Puzzle {
  const solution = generateFull(p);
  const puzzle = [...solution];
  const total = p.size * p.size;
  const targetClues = CLUE_RATIO[diff][p.size];
  const removeOrder = shuffle([...Array(total).keys()]);
  let clues = total;
  // For 4x4, uniqueness check; for 9x9, also enforce uniqueness but cap attempts
  const maxAttempts = p.size === 9 ? total : total;
  let attempts = 0;
  for (const idx of removeOrder) {
    if (clues <= targetClues) break;
    if (attempts++ > maxAttempts * 2) break;
    const saved = puzzle[idx];
    puzzle[idx] = 0;
    const copy = [...puzzle];
    const count = solve(copy, p, 2);
    if (count !== 1) {
      puzzle[idx] = saved;
    } else {
      clues--;
    }
  }
  return { puzzle, solution, size: p };
}

export function findConflicts(grid: Grid, p: PuzzleSize): Set<number> {
  const n = p.size;
  const bad = new Set<number>();
  // rows/cols/boxes
  const check = (cells: number[]) => {
    const seen = new Map<number, number[]>();
    for (const i of cells) {
      const v = grid[i];
      if (!v) continue;
      if (!seen.has(v)) seen.set(v, []);
      seen.get(v)!.push(i);
    }
    for (const arr of seen.values()) {
      if (arr.length > 1) arr.forEach((i) => bad.add(i));
    }
  };
  for (let r = 0; r < n; r++) {
    const row: number[] = [];
    for (let c = 0; c < n; c++) row.push(r * n + c);
    check(row);
  }
  for (let c = 0; c < n; c++) {
    const col: number[] = [];
    for (let r = 0; r < n; r++) col.push(r * n + c);
    check(col);
  }
  for (let br = 0; br < n; br += p.boxRows) {
    for (let bc = 0; bc < n; bc += p.boxCols) {
      const box: number[] = [];
      for (let i = 0; i < p.boxRows; i++)
        for (let j = 0; j < p.boxCols; j++)
          box.push((br + i) * n + (bc + j));
      check(box);
    }
  }
  return bad;
}

export function isSolved(grid: Grid, p: PuzzleSize): boolean {
  if (grid.some((v) => v === 0)) return false;
  return findConflicts(grid, p).size === 0;
}

export { boxIndex };
