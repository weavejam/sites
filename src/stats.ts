export type RecordKey = string; // `${size}-${difficulty}`

export interface BestRecord {
  timeMs: number;
  date: string; // ISO yyyy-mm-dd
}

export interface Stats {
  records: Record<RecordKey, BestRecord>;
  completed: string[]; // ISO dates, unique sorted asc
  totalWins: number;
}

const KEY = "shudu-stats-v1";

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw) as Stats;
      return {
        records: s.records ?? {},
        completed: s.completed ?? [],
        totalWins: s.totalWins ?? 0,
      };
    }
  } catch {}
  return { records: {}, completed: [], totalWins: 0 };
}

export function saveStats(s: Stats) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}

export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getStreak(completed: string[]): { current: number; longest: number } {
  if (completed.length === 0) return { current: 0, longest: 0 };
  const set = new Set(completed);
  // current streak: count back from today (or yesterday) while present
  let current = 0;
  const d = new Date();
  // if today not done, streak could still continue if yesterday done? Conventional: streak only counts including today; if today missing it's 0 unless yesterday done -> we'll show "yesterday" too.
  // Simpler: count back starting from today; if today missing, start from yesterday.
  const start = new Date(d);
  if (!set.has(toISO(start))) start.setDate(start.getDate() - 1);
  while (set.has(toISO(start))) {
    current++;
    start.setDate(start.getDate() - 1);
  }
  // longest: scan
  const sorted = [...set].sort();
  let longest = 0, run = 0, prev: Date | null = null;
  for (const iso of sorted) {
    const cur = fromISO(iso);
    if (prev && (cur.getTime() - prev.getTime()) === 86400000) run++;
    else run = 1;
    longest = Math.max(longest, run);
    prev = cur;
  }
  return { current, longest };
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

export function recordKey(size: number, difficulty: string): RecordKey {
  return `${size}-${difficulty}`;
}

export interface WinOutcome {
  newRecord: boolean;
  previousRecord?: BestRecord;
  newRecordTime?: number;
  firstOfDay: boolean;
  streakAfter: number;
  totalWins: number;
}

export function recordWin(
  stats: Stats,
  size: number,
  difficulty: string,
  timeMs: number
): WinOutcome {
  const key = recordKey(size, difficulty);
  const today = todayISO();
  const prev = stats.records[key];
  const newRecord = !prev || timeMs < prev.timeMs;
  if (newRecord) {
    stats.records[key] = { timeMs, date: today };
  }
  const firstOfDay = !stats.completed.includes(today);
  if (firstOfDay) stats.completed.push(today);
  stats.completed.sort();
  stats.totalWins += 1;
  saveStats(stats);
  const { current } = getStreak(stats.completed);
  return {
    newRecord,
    previousRecord: prev,
    newRecordTime: newRecord ? timeMs : undefined,
    firstOfDay,
    streakAfter: current,
    totalWins: stats.totalWins,
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
