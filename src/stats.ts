import type { Difficulty } from "./sudoku";

export type RecordKey = string;

export interface BestRecord {
  timeMs: number;
  date: string;
  mistakes: number;
}

export interface DailyEntry {
  size: number;
  diff: Difficulty;
  timeMs: number;
  mistakes: number;
}

export interface Stats {
  records: Record<RecordKey, BestRecord>;
  completed: string[];
  totalWins: number;
  perfectWins: number;
  achievements: string[];
  dailyCompleted: Record<string, DailyEntry>;
  sizesWon: Record<string, boolean>;
  currentStreak: number;
}

const KEY = "shudu-stats-v2";
const LEGACY_KEY = "shudu-stats-v1";

function defaults(): Stats {
  return {
    records: {},
    completed: [],
    totalWins: 0,
    perfectWins: 0,
    achievements: [],
    dailyCompleted: {},
    sizesWon: {},
    currentStreak: 0,
  };
}

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      return { ...defaults(), ...s };
    }
  } catch {}
  return defaults();
}

export function saveStats(s: Stats) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

export function todayISO(): string {
  const d = new Date();
  return toISO(d);
}

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getStreak(completed: string[]): { current: number; longest: number } {
  if (completed.length === 0) return { current: 0, longest: 0 };
  const set = new Set(completed);
  let current = 0;
  const start = new Date();
  if (!set.has(toISO(start))) start.setDate(start.getDate() - 1);
  while (set.has(toISO(start))) {
    current++;
    start.setDate(start.getDate() - 1);
  }
  const sorted = [...set].sort();
  let longest = 0, run = 0, prev: Date | null = null;
  for (const iso of sorted) {
    const cur = fromISO(iso);
    if (prev && cur.getTime() - prev.getTime() === 86400000) run++;
    else run = 1;
    longest = Math.max(longest, run);
    prev = cur;
  }
  return { current, longest };
}

export function recordKey(size: number, difficulty: string): RecordKey {
  return `${size}-${difficulty}`;
}

export interface WinOutcome {
  newRecord: boolean;
  previousRecord?: BestRecord;
  firstOfDay: boolean;
  streakAfter: number;
  totalWins: number;
  perfect: boolean;
}

export function recordWin(
  stats: Stats,
  size: number,
  difficulty: Difficulty,
  timeMs: number,
  mistakes: number,
  isDaily: boolean
): WinOutcome {
  const key = recordKey(size, difficulty);
  const today = todayISO();
  const prev = stats.records[key];
  const newRecord = !prev || timeMs < prev.timeMs;
  if (newRecord) stats.records[key] = { timeMs, date: today, mistakes };
  const firstOfDay = !stats.completed.includes(today);
  if (firstOfDay) stats.completed.push(today);
  stats.completed.sort();
  stats.totalWins += 1;
  if (mistakes === 0) stats.perfectWins += 1;
  stats.sizesWon[String(size)] = true;
  if (isDaily && !stats.dailyCompleted[today]) {
    stats.dailyCompleted[today] = { size, diff: difficulty, timeMs, mistakes };
  }
  stats.currentStreak = getStreak(stats.completed).current;
  saveStats(stats);
  return {
    newRecord,
    previousRecord: prev,
    firstOfDay,
    streakAfter: stats.currentStreak,
    totalWins: stats.totalWins,
    perfect: mistakes === 0,
  };
}

export function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export function lastNDays(n: number): string[] {
  const arr: string[] = [];
  const d = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const x = new Date(d);
    x.setDate(d.getDate() - i);
    arr.push(toISO(x));
  }
  return arr;
}
