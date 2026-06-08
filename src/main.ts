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

interface State {
  size: PuzzleSize;
  difficulty: Difficulty;
  puzzle: Puzzle;
  current: number[];
  givens: boolean[];
  selected: number | null;
  startedAt: number;
  finished: boolean;
}

const STORAGE_KEY = "shudu-state-v1";

function newGame(size: PuzzleSize, difficulty: Difficulty): State {
  const puzzle = generatePuzzle(size, difficulty);
  return {
    size,
    difficulty,
    puzzle,
    current: [...puzzle.puzzle],
    givens: puzzle.puzzle.map((v) => v !== 0),
    selected: null,
    startedAt: Date.now(),
    finished: false,
  };
}

function loadState(): State | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    const size: PuzzleSize =
      obj.size?.size === 4 ? SIZE_4 : obj.size?.size === 6 ? SIZE_6 : SIZE_9;
    return {
      size,
      difficulty: obj.difficulty,
      puzzle: obj.puzzle,
      current: obj.current,
      givens: obj.givens,
      selected: null,
      startedAt: obj.startedAt ?? Date.now(),
      finished: !!obj.finished,
    };
  } catch {
    return null;
  }
}

function saveState(s: State) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        size: s.size,
        difficulty: s.difficulty,
        puzzle: s.puzzle,
        current: s.current,
        givens: s.givens,
        startedAt: s.startedAt,
        finished: s.finished,
      })
    );
  } catch {}
}

let state: State = loadState() ?? newGame(SIZE_9, "standard");

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <header>
    <h1>数独 · Sudoku</h1>
    <span class="sub" id="timer">00:00</span>
  </header>
  <div class="controls">
    <div class="group" id="size-group">
      <button data-size="4">四宫 4×4</button>
      <button data-size="6">六宫 6×6</button>
      <button data-size="9">九宫 9×9</button>
    </div>
    <div class="group" id="diff-group">
      <button data-diff="easy">简单</button>
      <button data-diff="standard">标准</button>
      <button data-diff="hard">困难</button>
    </div>
    <button class="action primary" id="new-btn">新游戏</button>
    <button class="action" id="check-btn">检查</button>
    <button class="action" id="hint-btn">提示</button>
    <button class="action" id="solve-btn">显示答案</button>
  </div>
  <div class="status">
    <span id="status-msg">选择一格，输入数字开始游戏。</span>
    <span id="meta"></span>
  </div>
  <div class="board-wrap"><div class="board" id="board"></div></div>
  <div class="pad" id="pad"></div>
  <footer>© weavejam · 键盘可输入数字 / 退格清除 / 方向键移动</footer>
`;

const boardEl = document.querySelector<HTMLDivElement>("#board")!;
const padEl = document.querySelector<HTMLDivElement>("#pad")!;
const statusEl = document.querySelector<HTMLSpanElement>("#status-msg")!;
const metaEl = document.querySelector<HTMLSpanElement>("#meta")!;
const timerEl = document.querySelector<HTMLSpanElement>("#timer")!;

function render() {
  // size/diff groups
  document.querySelectorAll("#size-group button").forEach((b) => {
    b.classList.toggle(
      "active",
      Number((b as HTMLElement).dataset.size) === state.size.size
    );
  });
  document.querySelectorAll("#diff-group button").forEach((b) => {
    b.classList.toggle(
      "active",
      (b as HTMLElement).dataset.diff === state.difficulty
    );
  });

  const n = state.size.size;
  boardEl.className = `board size-${n}`;
  boardEl.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  boardEl.innerHTML = "";

  const conflicts = findConflicts(state.current, state.size);
  const selectedVal =
    state.selected !== null ? state.current[state.selected] : 0;
  const selR = state.selected !== null ? Math.floor(state.selected / n) : -1;
  const selC = state.selected !== null ? state.selected % n : -1;
  const selB =
    state.selected !== null
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
    if (state.selected !== null && (r === selR || c === selC || b === selB))
      cell.classList.add("peer");
    if (v !== 0 && selectedVal !== 0 && v === selectedVal && i !== state.selected)
      cell.classList.add("same");
    if (i === state.selected) cell.classList.add("selected");

    if ((c + 1) % state.size.boxCols === 0 && c !== n - 1)
      cell.classList.add("box-right");
    if ((r + 1) % state.size.boxRows === 0 && r !== n - 1)
      cell.classList.add("box-bottom");

    cell.textContent = v === 0 ? "" : String(v);
    cell.addEventListener("click", () => {
      state.selected = i;
      render();
    });
    boardEl.appendChild(cell);
  }

  // pad
  padEl.innerHTML = "";
  const padCount = n;
  const row = document.createElement("div");
  row.className = "row";
  row.style.gridTemplateColumns = `repeat(${padCount + 1}, 1fr)`;
  for (let v = 1; v <= padCount; v++) {
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

  // meta
  const filled = state.current.filter((v) => v !== 0).length;
  metaEl.textContent = `${filled}/${n * n}`;

  if (state.finished) {
    statusEl.innerHTML = `<span class="win">🎉 完成！</span>`;
  } else if (conflicts.size > 0) {
    statusEl.innerHTML = `<span class="err">有冲突 (${conflicts.size})</span>`;
  } else {
    statusEl.textContent = "选择一格，输入数字。";
  }
}

function inputNumber(v: number) {
  if (state.selected === null || state.finished) return;
  if (state.givens[state.selected]) return;
  const n = state.size.size;
  if (v < 0 || v > n) return;
  state.current[state.selected] = v;
  if (isSolved(state.current, state.size)) {
    state.finished = true;
  }
  saveState(state);
  render();
}

document.addEventListener("keydown", (e) => {
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

document.querySelectorAll<HTMLButtonElement>("#size-group button").forEach((b) => {
  b.addEventListener("click", () => {
    const n = Number(b.dataset.size);
    const s = n === 4 ? SIZE_4 : n === 6 ? SIZE_6 : SIZE_9;
    if (s.size === state.size.size) return;
    state = newGame(s, state.difficulty);
    saveState(state);
    render();
  });
});

document.querySelectorAll<HTMLButtonElement>("#diff-group button").forEach((b) => {
  b.addEventListener("click", () => {
    const d = b.dataset.diff as Difficulty;
    if (d === state.difficulty) return;
    state = newGame(state.size, d);
    saveState(state);
    render();
  });
});

document.querySelector("#new-btn")!.addEventListener("click", () => {
  state = newGame(state.size, state.difficulty);
  saveState(state);
  render();
});

document.querySelector("#check-btn")!.addEventListener("click", () => {
  const n = state.size.size;
  const sol = state.puzzle.solution;
  let wrong = 0;
  for (let i = 0; i < n * n; i++) {
    if (state.current[i] !== 0 && !state.givens[i] && state.current[i] !== sol[i]) {
      wrong++;
    }
  }
  const filled = state.current.filter((v) => v !== 0).length;
  if (wrong === 0 && filled === n * n) {
    state.finished = true;
    render();
  } else if (wrong === 0) {
    statusEl.textContent = `目前都正确，还有 ${n * n - filled} 格未填。`;
  } else {
    statusEl.innerHTML = `<span class="err">有 ${wrong} 格错误</span>`;
  }
});

document.querySelector("#hint-btn")!.addEventListener("click", () => {
  if (state.finished) return;
  const sol = state.puzzle.solution;
  const empties: number[] = [];
  if (state.selected !== null && state.current[state.selected] === 0) {
    empties.push(state.selected);
  } else {
    for (let i = 0; i < state.current.length; i++) {
      if (state.current[i] === 0) empties.push(i);
    }
  }
  if (empties.length === 0) return;
  const idx = empties[Math.floor(Math.random() * empties.length)];
  state.current[idx] = sol[idx];
  state.selected = idx;
  if (isSolved(state.current, state.size)) state.finished = true;
  saveState(state);
  render();
});

document.querySelector("#solve-btn")!.addEventListener("click", () => {
  if (!confirm("显示完整答案？")) return;
  const sol = solveOne(state.puzzle.puzzle, state.size) ?? state.puzzle.solution;
  state.current = [...sol];
  state.finished = true;
  saveState(state);
  render();
});

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
setInterval(() => {
  if (state.finished) return;
  timerEl.textContent = fmt(Date.now() - state.startedAt);
}, 1000);

render();
