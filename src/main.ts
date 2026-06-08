import "./style.css";
import {
  generatePuzzle,
  findConflicts,
  isSolved,
  solveOne,
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

function makeState(
  size: PuzzleSize,
  difficulty: Difficulty,
  isDaily = false
): State {
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
    const s: PuzzleSize =
      obj.size?.size === 4 ? SIZE_4 : obj.size?.size === 6 ? SIZE_6 : SIZE_9;
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

function elapsedMs(s: State): number {
  if (s.finished) return s.elapsedAtPause;
  return s.elapsedAtPause + (Date.now() - s.resumeAt);
}

let state: State = loadState() ?? makeState(SIZE_9, "standard");

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
  rebuildUI();
}
applyTheme();

// ---------- UI construction ----------
const app = document.querySelector<HTMLDivElement>("#app")!;

function buildShell() {
  app.innerHTML = `
    <header>
      <h1>${t("title")}</h1>
      <div class="head-right">
        <span class="sub" id="timer">00:00</span>
        <button class="icon-btn" id="theme-btn" title="theme">${
          document.documentElement.dataset.theme === "dark" ? t("themeLight") : t("themeDark")
        }</button>
        <button class="icon-btn" id="lang-btn" title="language">${t("langSwitch")}</button>
      </div>
    </header>
    <div class="controls">
      <div class="group" id="size-group">
        <button data-size="4">${t("size4")}</button>
        <button data-size="6">${t("size6")}</button>
        <button data-size="9">${t("size9")}</button>
      </div>
      <div class="group" id="diff-group">
        <button data-diff="easy">${t("easy")}</button>
        <button data-diff="standard">${t("standard")}</button>
        <button data-diff="hard">${t("hard")}</button>
      </div>
      <button class="action primary" id="new-btn">${t("new")}</button>
      <button class="action" id="daily-btn">${t("daily")}</button>
      <button class="action" id="check-btn">${t("check")}</button>
      <button class="action" id="hint-btn">${t("hint")}</button>
      <button class="action" id="undo-btn">${t("undo")}</button>
      <button class="action" id="redo-btn">${t("redo")}</button>
      <button class="action" id="notes-btn">${t("notes")}</button>
      <button class="action" id="solve-btn">${t("solve")}</button>
      <button class="action" id="share-btn">${t("share")}</button>
      <button class="action" id="stats-btn">${t("stats")}</button>
    </div>
    <div class="status">
      <span id="status-msg">${t("selectCell")}</span>
      <span id="meta"></span>
    </div>
    <div class="board-wrap">
      <div class="board" id="board"></div>
    </div>
    <div class="pad" id="pad"></div>
    <footer>© weavejam · 数独 Sudoku</footer>

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
  wireEvents();
}

function wireEvents() {
  document.querySelectorAll<HTMLButtonElement>("#size-group button").forEach((b) => {
    b.addEventListener("click", () => {
      const n = Number(b.dataset.size);
      const sz = n === 4 ? SIZE_4 : n === 6 ? SIZE_6 : SIZE_9;
      if (sz.size === state.size.size) return;
      state = makeState(sz, state.difficulty);
      saveState(state);
      render();
    });
  });
  document.querySelectorAll<HTMLButtonElement>("#diff-group button").forEach((b) => {
    b.addEventListener("click", () => {
      const d = b.dataset.diff as Difficulty;
      if (d === state.difficulty && !state.isDaily) return;
      state = makeState(state.size, d);
      saveState(state);
      render();
    });
  });

  document.querySelector("#new-btn")!.addEventListener("click", () => {
    state = makeState(state.size, state.difficulty);
    saveState(state);
    render();
  });
  document.querySelector("#daily-btn")!.addEventListener("click", () => {
    state = makeState(SIZE_9, "standard", true);
    saveState(state);
    render();
  });
  document.querySelector("#check-btn")!.addEventListener("click", onCheck);
  document.querySelector("#hint-btn")!.addEventListener("click", onHint);
  document.querySelector("#undo-btn")!.addEventListener("click", undo);
  document.querySelector("#redo-btn")!.addEventListener("click", redo);
  document.querySelector("#notes-btn")!.addEventListener("click", () => {
    state.noteMode = !state.noteMode;
    render();
  });
  document.querySelector("#solve-btn")!.addEventListener("click", onSolve);
  document.querySelector("#share-btn")!.addEventListener("click", onShare);
  document.querySelector("#stats-btn")!.addEventListener("click", openStats);
  document.querySelector("#theme-btn")!.addEventListener("click", toggleTheme);
  document.querySelector("#lang-btn")!.addEventListener("click", () => {
    setLang(getLang() === "zh" ? "en" : "zh");
    rebuildUI();
  });

  const modal = document.querySelector<HTMLDivElement>("#stats-modal")!;
  document.querySelector("#stats-close")!.addEventListener("click", () => (modal.hidden = true));
  modal.querySelector(".modal-backdrop")!.addEventListener("click", () => (modal.hidden = true));
}

function rebuildUI() {
  buildShell();
  render();
}

// ---------- Render ----------
function render() {
  const n = state.size.size;
  // toggles
  document.querySelectorAll<HTMLElement>("#size-group button").forEach((b) => {
    b.classList.toggle("active", Number(b.dataset.size) === n);
  });
  document.querySelectorAll<HTMLElement>("#diff-group button").forEach((b) => {
    b.classList.toggle("active", b.dataset.diff === state.difficulty);
  });
  document.querySelector("#notes-btn")!.classList.toggle("toggle-on", state.noteMode);
  document.querySelector("#daily-btn")!.classList.toggle("toggle-on", state.isDaily);

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
      const notes = state.notes[i];
      const notesEl = document.createElement("div");
      notesEl.className = "notes";
      notesEl.style.gridTemplateColumns = `repeat(${state.size.boxCols}, 1fr)`;
      for (let nv = 1; nv <= n; nv++) {
        const s = document.createElement("span");
        s.textContent = notes.includes(nv) ? String(nv) : "";
        notesEl.appendChild(s);
      }
      cell.appendChild(notesEl);
    }

    cell.addEventListener("click", () => {
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
  if (state.isDaily) parts.push("🌟");
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
}

// ---------- Actions ----------
function inputNumber(v: number) {
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
      idx,
      prevVal: state.current[idx],
      newVal: state.current[idx],
      prevNotes,
      newNotes,
      countedMistake: false,
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
    idx,
    prevVal,
    newVal: v,
    prevNotes,
    newNotes: [...state.notes[idx]],
    countedMistake: counted,
  });

  if (isSolved(state.current, state.size)) finishGame();
  saveState(state);
  render();
}

function pushMove(m: Move) {
  state.history.push(m);
  if (state.history.length > 500) state.history.shift();
  state.future = [];
}

function undo() {
  if (state.history.length === 0 || state.finished) return;
  const m = state.history.pop()!;
  state.current[m.idx] = m.prevVal;
  state.notes[m.idx] = [...m.prevNotes];
  if (m.countedMistake) state.mistakes = Math.max(0, state.mistakes - 1);
  state.future.push(m);
  saveState(state);
  render();
}
function redo() {
  if (state.future.length === 0 || state.finished) return;
  const m = state.future.pop()!;
  state.current[m.idx] = m.newVal;
  state.notes[m.idx] = [...m.newNotes];
  if (m.countedMistake) state.mistakes += 1;
  state.history.push(m);
  if (isSolved(state.current, state.size)) finishGame();
  saveState(state);
  render();
}

function onCheck() {
  if (state.finished) return;
  const n = state.size.size;
  const sol = state.puzzle.solution;
  let wrong = 0;
  for (let i = 0; i < n * n; i++) {
    if (state.current[i] !== 0 && !state.givens[i] && state.current[i] !== sol[i]) wrong++;
  }
  const filled = state.current.filter((v) => v !== 0).length;
  const statusEl = document.querySelector<HTMLSpanElement>("#status-msg")!;
  if (wrong === 0 && filled === n * n) {
    finishGame();
    render();
  } else if (wrong === 0) {
    statusEl.textContent = t("correctSoFar", n * n - filled);
  } else {
    statusEl.innerHTML = `<span class="err">${t("wrongCount", wrong)}</span>`;
  }
}

function onHint() {
  if (state.finished) return;
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
  state.elapsedAtPause += 30_000; // +30s penalty
  pushMove({
    idx, prevVal, newVal: sol[idx], prevNotes, newNotes: [], countedMistake: false,
  });
  state.selected = idx;
  showToast(getLang() === "zh" ? `💡 提示 · 罚时 +30s` : `💡 Hint · +30s penalty`, 2000);
  if (isSolved(state.current, state.size)) finishGame();
  saveState(state);
  render();
}

function onSolve() {
  if (!confirm(t("confirmSolve"))) return;
  const elapsed = elapsedMs(state);
  const sol = solveOne(state.puzzle.puzzle, state.size) ?? state.puzzle.solution;
  state.current = [...sol];
  state.finished = true;
  state.revealed = true;
  state.elapsedAtPause = elapsed;
  saveState(state);
  render();
}

function finishGame() {
  if (state.finished) return;
  const elapsed = elapsedMs(state);
  state.finished = true;
  state.elapsedAtPause = elapsed;
  if (state.revealed) {
    saveState(state);
    return;
  }
  const outcome = recordWin(
    stats,
    state.size.size,
    state.difficulty,
    elapsed,
    state.mistakes,
    state.isDaily,
    state.hintsUsed
  );
  const newAch = evaluateAchievements(stats, {
    size: state.size.size,
    difficulty: state.difficulty,
    timeMs: elapsed,
    mistakes: state.mistakes,
    isDaily: state.isDaily,
    hintsUsed: state.hintsUsed,
  });
  // persist achievements update
  saveStats(stats);
  saveState(state);

  const lines: string[] = [t("win", formatTime(elapsed))];
  if (state.isDaily) lines.push(t("dailyChallengeWin"));
  if (outcome.newRecord) {
    lines.push(
      outcome.previousRecord ? t("newRecord", formatTime(outcome.previousRecord.timeMs)) : t("firstRecord")
    );
  }
  if (outcome.firstOfDay) lines.push(t("dailyCheckIn", outcome.streakAfter));
  if (outcome.perfect) lines.push(t("perfect"));
  else if (state.hintsUsed > 0) {
    lines.push(getLang() === "zh"
      ? `💡 提示 ${state.hintsUsed} 次（含 ${state.hintsUsed * 30}s 罚时）`
      : `💡 ${state.hintsUsed} hint(s) (+${state.hintsUsed * 30}s)`);
  }
  if (state.mistakes > 0) lines.push(t("mistakes", state.mistakes));
  showToast(lines.join("<br>"), 6000);
  if (outcome.newRecord || outcome.firstOfDay || outcome.perfect || state.isDaily) {
    confetti(outcome.newRecord || state.isDaily ? 3000 : 2000);
  }
  if (newAch.length > 0) {
    setTimeout(() => {
      const html = newAch
        .map((id) => {
          const a = ACHIEVEMENTS.find((x) => x.id === id)!;
          return `<div class="ach-toast"><span class="big">${a.icon}</span> ${localizedName(a)}</div>`;
        })
        .join("");
      showToast(html, 6000);
      confetti(1500);
    }, 1200);
  }
}

function onShare() {
  if (!state.finished || state.revealed) {
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
  // popup-ish: copy text + offer image download
  copyShareText(data);
  setTimeout(() => downloadShareImage(data), 200);
}

// ---------- Stats modal ----------
function openStats() {
  const sizes: { label: string; size: number }[] = [
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
  const heatmap = days
    .map((d) => {
      const done = stats.completed.includes(d);
      const isDaily = !!stats.dailyCompleted[d];
      const cls = ["dot"];
      if (done) cls.push("done");
      if (isDaily) cls.push("daily");
      if (d === today) cls.push("today");
      return `<span class="${cls.join(" ")}" title="${d}${done ? " ✓" : ""}${isDaily ? " 🌟" : ""}"></span>`;
    })
    .join("");

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
  const achHtml = ACHIEVEMENTS
    .map((a) => {
      const got = unlocked.has(a.id);
      return `<div class="ach ${got ? "got" : "locked"}" title="${localizedDesc(a)}">
        <div class="icon">${a.icon}</div>
        <div class="name">${localizedName(a)}</div>
        <div class="desc">${localizedDesc(a)}</div>
      </div>`;
    })
    .join("");

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
  const modal = document.querySelector<HTMLDivElement>("#stats-modal")!;
  if (!modal.hidden) {
    if (e.key === "Escape") modal.hidden = true;
    return;
  }
  if (e.key === " ") { return; }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
    e.preventDefault();
    if (e.shiftKey) redo(); else undo();
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
    e.preventDefault(); redo(); return;
  }
  if (e.key === "n" || e.key === "N") { state.noteMode = !state.noteMode; render(); return; }
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
    inputNumber(0);
    return;
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

// ---------- Timer tick ----------
const timerEl = () => document.querySelector<HTMLSpanElement>("#timer")!;
setInterval(() => {
  const el = timerEl();
  if (!el) return;
  el.textContent = formatTime(elapsedMs(state));
}, 500);

// ---------- PWA ----------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

// boot
buildShell();
render();
