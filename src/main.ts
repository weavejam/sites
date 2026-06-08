import "./style.css";
import {
  generatePuzzle,
  findConflicts,
  isSolved,
  SIZE_4,
  SIZE_6,
  SIZE_9,
  type Difficulty,
  type Puzzle,
  type PuzzleSize,
} from "./sudoku";
import {
  loadStats,
  saveStats,
  recordWin,
  recordKey,
  formatTime,
  getStreak,
  lastNDays,
  todayISO,
} from "./stats";
import { confetti, showToast } from "./celebrate";
import { mulberry32, seedForDate } from "./daily";
import { t, setLang, getLang } from "./i18n";
import {
  ACHIEVEMENTS,
  evaluateAchievements,
  localizedName,
  localizedDesc,
} from "./achievements";
import { copyShareText, downloadShareImage, type ShareData } from "./share";

const stats = loadStats();

type Screen = "home" | "game";

interface Move {
  idx: number;
  prevVal: number;
  newVal: number;
  prevNotes: number[];
  newNotes: number[];
  countedMistake: boolean;
}

interface State {
  size: PuzzleSize;
  difficulty: Difficulty;
  puzzle: Puzzle;
  current: number[];
  notes: number[][];
  givens: boolean[];
  selected: number | null;
  finished: boolean;
  revealed: boolean;
  noteMode: boolean;
  mistakes: number;
  history: Move[];
  future: Move[];
  isDaily: boolean;
  dailyDate?: string;
  hintsUsed: number;
  elapsedAtPause: number;
  resumeAt: number;
}

const STORAGE_KEY = "shudu-state-v2";
const THEME_KEY = "shudu-theme";

function sizeFromN(n: number): PuzzleSize {
  return n === 4 ? SIZE_4 : n === 6 ? SIZE_6 : SIZE_9;
}

function makeState(size: PuzzleSize, difficulty: Difficulty, isDaily = false): State {
  const n = size.size;
  const rng = isDaily
    ? mulberry32(seedForDate(todayISO(), n, difficulty))
    : Math.random;
  const puzzle = generatePuzzle(size, difficulty, rng);
  return {
    size,
    difficulty,
    puzzle,
    current: [...puzzle.puzzle],
    notes: Array.from({ length: n * n }, () => []),
    givens: puzzle.puzzle.map((v) => v !== 0),
    selected: null,
    finished: false,
    revealed: false,
    noteMode: false,
    mistakes: 0,
    history: [],
    future: [],
    isDaily,
    dailyDate: isDaily ? todayISO() : undefined,
    hintsUsed: 0,
    elapsedAtPause: 0,
    resumeAt: Date.now(),
  };
}

function loadState(): State | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    const s = sizeFromN(obj.size?.size ?? 9);
    return {
      ...obj,
      size: s,
      notes: obj.notes ?? Array.from({ length: s.size * s.size }, () => []),
      history: obj.history ?? [],
      future: obj.future ?? [],
      mistakes: obj.mistakes ?? 0,
      isDaily: !!obj.isDaily,
      hintsUsed: obj.hintsUsed ?? 0,
      resumeAt: Date.now(),
      elapsedAtPause: obj.elapsedAtPause ?? 0,
      selected: null,
    } as State;
  } catch {
    return null;
  }
}

function saveState(s: State) {
  try {
    const snapshot: State = { ...s, elapsedAtPause: elapsedMs(s) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {}
}

function clearSavedState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

function elapsedMs(s: State): number {
  if (s.finished) return s.elapsedAtPause;
  return s.elapsedAtPause + (Date.now() - s.resumeAt);
}

let state: State | null = loadState();
let screen: Screen = state && !state.finished ? "game" : "home";

// ---------- Theme ----------
function applyTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const dark = saved
    ? saved === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}
function toggleTheme() {
  const cur = document.documentElement.dataset.theme;
  const next = cur === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  document.documentElement.dataset.theme = next;
  rebuild();
}
applyTheme();

const app = document.querySelector<HTMLDivElement>("#app")!;

function rebuild() {
  if (screen === "home") buildHome();
  else buildGame();
}

// ---------- Home ----------
function buildHome() {
  const dailyDoneToday = !!stats.dailyCompleted[todayISO()];
  const sizes = [
    { n: 4, key: "size4" },
    { n: 6, key: "size6" },
    { n: 9, key: "size9" },
  ];
  const diffs: Difficulty[] = ["easy", "standard", "hard"];

  const hasResume = state && !state.finished;
  const resumeBanner = hasResume
    ? `<button class="resume-banner" id="resume-btn">
        <span class="left">
          <span class="lbl">${getLang() === "zh" ? "继续游戏" : "Resume"}</span>
          <span class="meta">${state!.size.size}×${state!.size.size} · ${t(state!.difficulty)} · ${formatTime(elapsedMs(state!))}</span>
        </span>
        <span class="arrow">→</span>
      </button>`
    : "";

  const sizeBlocks = sizes
    .map(({ n, key }) => {
      const cards = diffs
        .map((d) => {
          const rec = stats.records[recordKey(n, d)];
          const best = rec ? `<span class="best">🏆 ${formatTime(rec.timeMs)}</span>` : `<span class="best dim">—</span>`;
          return `<button class="diff-card" data-size="${n}" data-diff="${d}">
            <span class="dname">${t(d)}</span>
            ${best}
          </button>`;
        })
        .join("");
      return `
        <div class="size-block">
          <div class="size-label">${t(key)}</div>
          <div class="diff-row">${cards}</div>
        </div>
      `;
    })
    .join("");

  app.innerHTML = `
    <div class="home">
      <h1 class="big-title">${t("title")}</h1>
      <p class="subtitle">${getLang() === "zh" ? "选择模式开始挑战" : "Pick a mode to play"}</p>

      ${resumeBanner}

      <button class="daily-card ${dailyDoneToday ? "done" : ""}" id="daily-card">
        <div class="dc-left">
          <div class="dc-title">🌟 ${t("daily")}</div>
          <div class="dc-date">${todayISO()}</div>
        </div>
        <div class="dc-right">
          ${dailyDoneToday
            ? `<span class="dc-done">✓ ${formatTime(stats.dailyCompleted[todayISO()].timeMs)}</span>`
            : `<span class="dc-go">→</span>`}
        </div>
      </button>

      <div class="size-list">${sizeBlocks}</div>

      <div class="home-footer">
        <button class="home-action" id="home-stats">📊 ${t("stats")}</button>
        <div class="spacer"></div>
        <button class="icon-btn" id="theme-btn" title="theme">${
          document.documentElement.dataset.theme === "dark" ? t("themeLight") : t("themeDark")
        }</button>
        <button class="icon-btn" id="lang-btn" title="language">${t("langSwitch")}</button>
      </div>
    </div>

    ${statsModalHtml()}
  `;
  wireHome();
}

function wireHome() {
  document.querySelector("#resume-btn")?.addEventListener("click", () => {
    if (!state || state.finished) return;
    screen = "game";
    rebuild();
  });
  document.querySelector("#daily-card")!.addEventListener("click", () => {
    const today = todayISO();
    if (stats.dailyCompleted[today]) {
      showToast(t("dailyDone"));
      return;
    }
    state = makeState(SIZE_9, "standard", true);
    saveState(state);
    screen = "game";
    rebuild();
  });
  document.querySelectorAll<HTMLButtonElement>(".diff-card").forEach((b) => {
    b.addEventListener("click", () => {
      const n = Number(b.dataset.size);
      const d = b.dataset.diff as Difficulty;
      state = makeState(sizeFromN(n), d);
      saveState(state);
      screen = "game";
      rebuild();
    });
  });
  document.querySelector("#home-stats")!.addEventListener("click", openStats);
  document.querySelector("#theme-btn")!.addEventListener("click", toggleTheme);
  document.querySelector("#lang-btn")!.addEventListener("click", () => {
    setLang(getLang() === "zh" ? "en" : "zh");
    rebuild();
  });
  wireStatsModal();
}

// ---------- Game ----------
function buildGame() {
  if (!state) { screen = "home"; rebuild(); return; }
  const s = state;
  app.innerHTML = `
    <div class="game">
      <div class="game-head">
        <button class="back" id="back-btn" title="back">←</button>
        <div class="mode-badge">
          ${s.size.size}×${s.size.size} · ${t(s.difficulty)}
          ${s.isDaily ? '<span class="daily-tag">🌟</span>' : ''}
        </div>
        <span class="timer" id="timer">00:00</span>
      </div>

      <div class="status">
        <span id="status-msg">${t("selectCell")}</span>
        <span id="meta"></span>
      </div>

      <div class="board-wrap">
        <div class="board" id="board"></div>
      </div>

      <div class="pad" id="pad"></div>

      <div class="tools">
        <button class="tool" id="undo-btn" title="${t("undo")}">↶<span class="lbl">${t("undo")}</span></button>
        <button class="tool" id="redo-btn" title="${t("redo")}">↷<span class="lbl">${t("redo")}</span></button>
        <button class="tool" id="notes-btn" title="${t("notes")}">✏️<span class="lbl">${t("notes")}</span></button>
        <button class="tool" id="hint-btn" title="${t("hint")}">💡<span class="lbl">${t("hint")}</span></button>
      </div>

      <div class="win-overlay" id="win-overlay" hidden></div>
    </div>

    ${statsModalHtml()}
  `;
  wireGame();
  render();
}

function wireGame() {
  document.querySelector("#back-btn")!.addEventListener("click", () => {
    screen = "home";
    rebuild();
  });
  document.querySelector("#undo-btn")!.addEventListener("click", undo);
  document.querySelector("#redo-btn")!.addEventListener("click", redo);
  document.querySelector("#notes-btn")!.addEventListener("click", () => {
    if (!state) return;
    state.noteMode = !state.noteMode;
    render();
  });
  document.querySelector("#hint-btn")!.addEventListener("click", onHint);
  wireStatsModal();
}

// ---------- Render game ----------
function render() {
  if (!state) return;
  const n = state.size.size;
  const boardEl = document.querySelector<HTMLDivElement>("#board")!;
  boardEl.className = `board size-${n}`;
  boardEl.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  boardEl.innerHTML = "";

  const conflicts = findConflicts(state.current, state.size);
  const sel = state.selected;
  const selVal = sel !== null ? state.current[sel] : 0;
  const selR = sel !== null ? Math.floor(sel / n) : -1;
  const selC = sel !== null ? sel % n : -1;
  const selBox =
    sel !== null
      ? Math.floor(selR / state.size.boxRows) * state.size.boxRows * 100 +
        Math.floor(selC / state.size.boxCols)
      : -2;

  for (let i = 0; i < n * n; i++) {
    const r = Math.floor(i / n);
    const c = i % n;
    const v = state.current[i];
    const cell = document.createElement("div");
    cell.className = "cell";
    if (state.givens[i]) cell.classList.add("given");
    else if (v !== 0) cell.classList.add("user");
    if (conflicts.has(i)) cell.classList.add("error");
    const b =
      Math.floor(r / state.size.boxRows) * state.size.boxRows * 100 +
      Math.floor(c / state.size.boxCols);
    if (sel !== null && (r === selR || c === selC || b === selBox)) cell.classList.add("peer");
    if (v !== 0 && selVal !== 0 && v === selVal && i !== sel) cell.classList.add("same");
    if (i === sel) cell.classList.add("selected");
    if ((c + 1) % state.size.boxCols === 0 && c !== n - 1) cell.classList.add("box-right");
    if ((r + 1) % state.size.boxRows === 0 && r !== n - 1) cell.classList.add("box-bottom");

    if (v !== 0) {
      cell.textContent = String(v);
    } else if (state.notes[i] && state.notes[i].length > 0) {
      const notesArr = state.notes[i];
      const notesEl = document.createElement("div");
      notesEl.className = "notes";
      notesEl.style.gridTemplateColumns = `repeat(${state.size.boxCols}, 1fr)`;
      for (let nv = 1; nv <= n; nv++) {
        const span = document.createElement("span");
        span.textContent = notesArr.includes(nv) ? String(nv) : "";
        notesEl.appendChild(span);
      }
      cell.appendChild(notesEl);
    }
    cell.addEventListener("click", () => {
      if (!state) return;
      state.selected = i;
      render();
    });
    boardEl.appendChild(cell);
  }

  // pad
  const padEl = document.querySelector<HTMLDivElement>("#pad")!;
  padEl.innerHTML = "";
  const row = document.createElement("div");
  row.className = "row";
  row.style.gridTemplateColumns = `repeat(${n + 1}, 1fr)`;
  for (let v = 1; v <= n; v++) {
    const b = document.createElement("button");
    b.textContent = String(v);
    b.addEventListener("click", () => inputNumber(v));
    row.appendChild(b);
  }
  const erase = document.createElement("button");
  erase.textContent = "⌫";
  erase.className = "erase";
  erase.addEventListener("click", () => inputNumber(0));
  row.appendChild(erase);
  padEl.appendChild(row);

  // meta + status
  const metaEl = document.querySelector<HTMLSpanElement>("#meta")!;
  const statusEl = document.querySelector<HTMLSpanElement>("#status-msg")!;
  const filled = state.current.filter((v) => v !== 0).length;
  const best = stats.records[recordKey(n, state.difficulty)];
  const parts: string[] = [`${filled}/${n * n}`];
  if (best) parts.push(`🏆 ${formatTime(best.timeMs)}`);
  if (state.mistakes > 0) parts.push(`✗ ${state.mistakes}`);
  if (state.hintsUsed > 0) parts.push(`💡 ${state.hintsUsed}`);
  metaEl.textContent = parts.join(" · ");

  if (state.finished) {
    statusEl.innerHTML = `<span class="win">${t("finished")}</span>`;
  } else if (conflicts.size > 0) {
    statusEl.innerHTML = `<span class="err">${t("conflicts", conflicts.size)}</span>`;
  } else if (state.noteMode) {
    statusEl.textContent = "✏️ " + t("notes");
  } else {
    statusEl.textContent = t("selectCell");
  }

  document.querySelector("#notes-btn")?.classList.toggle("toggle-on", state.noteMode);
  const hintBtn = document.querySelector("#hint-btn");
  if (hintBtn) {
    if (state.isDaily) hintBtn.classList.add("disabled");
    else hintBtn.classList.remove("disabled");
  }
}

// ---------- Actions ----------
function inputNumber(v: number) {
  if (!state) return;
  if (state.selected === null || state.finished) return;
  if (state.givens[state.selected]) return;
  const idx = state.selected;
  const n = state.size.size;
  if (v < 0 || v > n) return;

  if (state.noteMode && v !== 0) {
    const prevNotes = [...state.notes[idx]];
    const set = new Set(prevNotes);
    if (set.has(v)) set.delete(v);
    else set.add(v);
    const newNotes = [...set].sort((a, b) => a - b);
    pushMove({
      idx, prevVal: state.current[idx], newVal: state.current[idx],
      prevNotes, newNotes, countedMistake: false,
    });
    state.notes[idx] = newNotes;
    saveState(state);
    render();
    return;
  }

  const prevVal = state.current[idx];
  const prevNotes = [...state.notes[idx]];
  let counted = false;
  if (v !== 0 && v !== prevVal) {
    if (v !== state.puzzle.solution[idx]) {
      state.mistakes += 1;
      counted = true;
    }
  }
  state.current[idx] = v;
  if (v !== 0) state.notes[idx] = [];
  pushMove({
    idx, prevVal, newVal: v, prevNotes, newNotes: [...state.notes[idx]], countedMistake: counted,
  });
  if (isSolved(state.current, state.size)) finishGame();
  saveState(state);
  render();
}

function pushMove(m: Move) {
  if (!state) return;
  state.history.push(m);
  if (state.history.length > 500) state.history.shift();
  state.future = [];
}

function undo() {
  if (!state || state.history.length === 0 || state.finished) return;
  const m = state.history.pop()!;
  state.current[m.idx] = m.prevVal;
  state.notes[m.idx] = [...m.prevNotes];
  if (m.countedMistake) state.mistakes = Math.max(0, state.mistakes - 1);
  state.future.push(m);
  saveState(state);
  render();
}
function redo() {
  if (!state || state.future.length === 0 || state.finished) return;
  const m = state.future.pop()!;
  state.current[m.idx] = m.newVal;
  state.notes[m.idx] = [...m.newNotes];
  if (m.countedMistake) state.mistakes += 1;
  state.history.push(m);
  if (isSolved(state.current, state.size)) finishGame();
  saveState(state);
  render();
}

function onHint() {
  if (!state || state.finished) return;
  if (state.isDaily) {
    showToast(getLang() === "zh" ? "🌟 今日挑战禁用提示" : "🌟 Daily challenge: hints disabled");
    return;
  }
  const sol = state.puzzle.solution;
  const empties: number[] = [];
  if (state.selected !== null && state.current[state.selected] === 0) {
    empties.push(state.selected);
  } else {
    for (let i = 0; i < state.current.length; i++) if (state.current[i] === 0) empties.push(i);
  }
  if (empties.length === 0) return;
  const idx = empties[Math.floor(Math.random() * empties.length)];
  const prevVal = state.current[idx];
  const prevNotes = [...state.notes[idx]];
  state.current[idx] = sol[idx];
  state.notes[idx] = [];
  state.givens[idx] = true;
  state.hintsUsed += 1;
  state.elapsedAtPause += 30_000;
  pushMove({ idx, prevVal, newVal: sol[idx], prevNotes, newNotes: [], countedMistake: false });
  state.selected = idx;
  showToast(getLang() === "zh" ? "💡 提示 · 罚时 +30s" : "💡 Hint · +30s penalty", 2000);
  if (isSolved(state.current, state.size)) finishGame();
  saveState(state);
  render();
}

function finishGame() {
  if (!state || state.finished) return;
  const elapsed = elapsedMs(state);
  state.finished = true;
  state.elapsedAtPause = elapsed;
  if (state.revealed) {
    saveState(state);
    return;
  }
  const outcome = recordWin(
    stats, state.size.size, state.difficulty, elapsed, state.mistakes, state.isDaily, state.hintsUsed
  );
  const newAch = evaluateAchievements(stats, {
    size: state.size.size,
    difficulty: state.difficulty,
    timeMs: elapsed,
    mistakes: state.mistakes,
    isDaily: state.isDaily,
    hintsUsed: state.hintsUsed,
  });
  saveStats(stats);
  saveState(state);

  showWinOverlay({
    elapsed,
    newRecord: outcome.newRecord,
    prevRecord: outcome.previousRecord?.timeMs,
    firstOfDay: outcome.firstOfDay,
    streakAfter: outcome.streakAfter,
    perfect: outcome.perfect,
    newAchievements: newAch,
  });
}

interface WinInfo {
  elapsed: number;
  newRecord: boolean;
  prevRecord?: number;
  firstOfDay: boolean;
  streakAfter: number;
  perfect: boolean;
  newAchievements: string[];
}

function showWinOverlay(info: WinInfo) {
  if (!state) return;
  const s = state;
  const overlay = document.querySelector<HTMLDivElement>("#win-overlay")!;
  const badges: string[] = [];
  if (info.newRecord) {
    badges.push(`<div class="badge new-record">🏆 ${
      info.prevRecord ? t("newRecord", formatTime(info.prevRecord)) : t("firstRecord")
    }</div>`);
  }
  if (info.perfect) badges.push(`<div class="badge perfect">${t("perfect")}</div>`);
  if (s.isDaily) badges.push(`<div class="badge daily">🌟 ${t("dailyChallengeWin")}</div>`);
  if (info.firstOfDay) badges.push(`<div class="badge daily">${t("dailyCheckIn", info.streakAfter)}</div>`);

  // achievements row
  const achHtml = info.newAchievements.length
    ? `<div class="ach-row">${info.newAchievements.map((id) => {
        const a = ACHIEVEMENTS.find((x) => x.id === id);
        if (!a) return "";
        return `<div class="ach-pop" title="${localizedDesc(a)}"><span class="ic">${a.icon}</span><span class="nm">${localizedName(a)}</span></div>`;
      }).join("")}</div>`
    : "";

  // mini best-times table for this size
  const best = stats.records[recordKey(s.size.size, s.difficulty)];
  const yourTime = formatTime(info.elapsed);

  overlay.hidden = false;
  overlay.innerHTML = `
    <div class="win-card">
      <div class="win-emoji">🎉</div>
      <div class="win-title">${t("finished")}</div>
      <div class="win-time">${yourTime}</div>
      <div class="win-mode">${s.size.size}×${s.size.size} · ${t(s.difficulty)}${s.isDaily ? " · 🌟" : ""}</div>
      <div class="win-meta">
        ${s.mistakes > 0 ? `<span>✗ ${s.mistakes}</span>` : ""}
        ${s.hintsUsed > 0 ? `<span>💡 ${s.hintsUsed} (+${s.hintsUsed * 30}s)</span>` : ""}
      </div>
      ${badges.join("")}
      ${achHtml}
      ${best ? `<div class="win-best">${t("bestTimes")}: 🏆 ${formatTime(best.timeMs)}</div>` : ""}
      <div class="win-actions">
        <button class="win-btn primary" id="win-share">📤 ${t("share")}</button>
        <button class="win-btn" id="win-again">🔄 ${t("new")}</button>
        <button class="win-btn" id="win-home">🏠</button>
      </div>
      <button class="win-stats-link" id="win-stats">${t("stats")} →</button>
    </div>
  `;
  document.querySelector("#win-share")!.addEventListener("click", () => onShare());
  document.querySelector("#win-again")!.addEventListener("click", () => {
    state = makeState(s.size, s.difficulty, s.isDaily && !stats.dailyCompleted[todayISO()]);
    saveState(state);
    rebuild();
  });
  document.querySelector("#win-home")!.addEventListener("click", () => {
    clearSavedState();
    screen = "home";
    rebuild();
  });
  document.querySelector("#win-stats")!.addEventListener("click", openStats);

  confetti(info.newRecord || s.isDaily ? 3000 : 2000);
  if (info.newAchievements.length > 0) setTimeout(() => confetti(1500), 1200);
}

function onShare() {
  if (!state || !state.finished || state.revealed) {
    showToast(t("shareNoWin"));
    return;
  }
  const data: ShareData = {
    size: state.size.size,
    difficulty: state.difficulty,
    timeMs: elapsedMs(state),
    mistakes: state.mistakes,
    hintsUsed: state.hintsUsed,
    isDaily: state.isDaily,
    date: todayISO(),
  };
  copyShareText(data);
  setTimeout(() => downloadShareImage(data), 200);
}

// ---------- Stats modal ----------
function statsModalHtml(): string {
  return `
    <div class="modal" id="stats-modal" hidden>
      <div class="modal-backdrop"></div>
      <div class="modal-card">
        <div class="modal-head">
          <h2>${t("statRecords")}</h2>
          <button class="modal-close" id="stats-close">✕</button>
        </div>
        <div class="modal-body" id="stats-body"></div>
      </div>
    </div>
  `;
}

function wireStatsModal() {
  const modal = document.querySelector<HTMLDivElement>("#stats-modal")!;
  document.querySelector("#stats-close")!.addEventListener("click", () => (modal.hidden = true));
  modal.querySelector(".modal-backdrop")!.addEventListener("click", () => (modal.hidden = true));
}

function openStats() {
  const sizes = [
    { label: "4×4", size: 4 },
    { label: "6×6", size: 6 },
    { label: "9×9", size: 9 },
  ];
  const diffs: { key: Difficulty; label: string }[] = [
    { key: "easy", label: t("easy") },
    { key: "standard", label: t("standard") },
    { key: "hard", label: t("hard") },
  ];
  const { current, longest } = getStreak(stats.completed);
  const today = todayISO();
  const days = lastNDays(28);
  const heatmap = days.map((d) => {
    const done = stats.completed.includes(d);
    const isDaily = !!stats.dailyCompleted[d];
    const cls = ["dot"];
    if (done) cls.push("done");
    if (isDaily) cls.push("daily");
    if (d === today) cls.push("today");
    return `<span class="${cls.join(" ")}" title="${d}${done ? " ✓" : ""}${isDaily ? " 🌟" : ""}"></span>`;
  }).join("");

  let table = `<table class="rec-table"><thead><tr><th></th>`;
  for (const d of diffs) table += `<th>${d.label}</th>`;
  table += `</tr></thead><tbody>`;
  for (const s of sizes) {
    table += `<tr><th>${s.label}</th>`;
    for (const d of diffs) {
      const r = stats.records[recordKey(s.size, d.key)];
      table += `<td>${r ? formatTime(r.timeMs) : "—"}</td>`;
    }
    table += `</tr>`;
  }
  table += `</tbody></table>`;

  const unlocked = new Set(stats.achievements);
  const achHtml = ACHIEVEMENTS.map((a) => {
    const got = unlocked.has(a.id);
    return `<div class="ach ${got ? "got" : "locked"}" title="${localizedDesc(a)}">
      <div class="icon">${a.icon}</div>
      <div class="name">${localizedName(a)}</div>
      <div class="desc">${localizedDesc(a)}</div>
    </div>`;
  }).join("");

  const body = document.querySelector<HTMLDivElement>("#stats-body")!;
  body.innerHTML = `
    <div class="stat-row">
      <div class="stat-card"><div class="lbl">${t("streakCurrent")}</div><div class="val">${t("days", current)}</div></div>
      <div class="stat-card"><div class="lbl">${t("streakLongest")}</div><div class="val">${t("days", longest)}</div></div>
      <div class="stat-card"><div class="lbl">${t("totalWins")}</div><div class="val">${stats.totalWins}</div></div>
      <div class="stat-card"><div class="lbl">${t("perfectGames")}</div><div class="val">${stats.perfectWins}</div></div>
    </div>
    <h3>${t("last28")}</h3>
    <div class="heatmap">${heatmap}</div>
    <h3>${t("bestTimes")}</h3>
    ${table}
    <h3>${t("achievementsTitle")} (${unlocked.size}/${ACHIEVEMENTS.length})</h3>
    <div class="ach-grid">${achHtml}</div>
    <p class="hint">${t("notForRecord")}</p>
  `;
  document.querySelector<HTMLDivElement>("#stats-modal")!.hidden = false;
}

// ---------- Keyboard ----------
document.addEventListener("keydown", (e) => {
  const modal = document.querySelector<HTMLDivElement>("#stats-modal");
  if (modal && !modal.hidden) {
    if (e.key === "Escape") modal.hidden = true;
    return;
  }
  if (screen !== "game" || !state) return;

  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
    e.preventDefault();
    if (e.shiftKey) redo(); else undo();
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
    e.preventDefault(); redo(); return;
  }
  if (e.key === "n" || e.key === "N") { state.noteMode = !state.noteMode; render(); return; }
  if (e.key === "Escape") { screen = "home"; rebuild(); return; }
  if (state.selected === null) return;
  const n = state.size.size;
  const r = Math.floor(state.selected / n);
  const c = state.selected % n;
  if (e.key >= "1" && e.key <= "9") {
    const v = Number(e.key);
    if (v <= n) inputNumber(v);
    return;
  }
  if (e.key === "0" || e.key === "Backspace" || e.key === "Delete") {
    inputNumber(0); return;
  }
  let nr = r, nc = c;
  if (e.key === "ArrowUp") nr = Math.max(0, r - 1);
  else if (e.key === "ArrowDown") nr = Math.min(n - 1, r + 1);
  else if (e.key === "ArrowLeft") nc = Math.max(0, c - 1);
  else if (e.key === "ArrowRight") nc = Math.min(n - 1, c + 1);
  else return;
  e.preventDefault();
  state.selected = nr * n + nc;
  render();
});

// ---------- Timer ----------
setInterval(() => {
  if (screen !== "game" || !state) return;
  const el = document.querySelector<HTMLSpanElement>("#timer");
  if (!el) return;
  el.textContent = formatTime(elapsedMs(state));
}, 500);

// ---------- PWA ----------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

rebuild();
