import Phaser from "phaser";
import {
  COLS,
  ROWS,
  HIDDEN_ROWS,
  TOTAL_ROWS,
  type Board,
  type Cell,
  createBoard,
  clearFullLines,
  isValid,
  lockPiece,
  dropToBottom,
} from "./board";
import {
  type ActivePiece,
  type PieceId,
  pieceCells,
  createBag,
  PIECE_SHAPES,
} from "./pieces";
import { tryRotate, spawnPiece } from "./rotation";
import {
  type ScoreState,
  INITIAL_SCORE,
  applyClear,
  detectTSpin,
  dropPoints,
  gravityForLevel,
} from "./scoring";
import { audio } from "../../../shell/AudioManager";

const PIECE_COLORS: Record<PieceId, number> = {
  I: 0x5cf0ff,
  O: 0xffd35c,
  T: 0xb45cff,
  S: 0x5cff8b,
  Z: 0xff5c5c,
  J: 0x5c8bff,
  L: 0xff9b5c,
};

const NEXT_COUNT = 5;
const LOCK_DELAY_MS = 500;
const MAX_LOCK_RESETS = 15;
const HARD_DROP_BGM_KEY = "korobeiniki";
const FLASH_MS = 120;

export interface ScoreUpdate {
  score: number;
  best: number;
  level: number;
  lines: number;
}

export interface PlaySceneCallbacks {
  onScore: (s: ScoreUpdate) => void;
  onGameOver: (final: ScoreUpdate, isNewBest: boolean) => void;
  /** Called whenever lifecycle changes ("playing" | "paused" | "over"). */
  onState: (state: "playing" | "paused" | "over") => void;
  getBest: () => number;
  submitBest: (score: number) => boolean;
}

export class PlayScene extends Phaser.Scene {
  private board: Board = createBoard();
  private active: ActivePiece | null = null;
  private holdPiece: PieceId | null = null;
  private holdUsed = false;
  private nextQueue: PieceId[] = [];
  private bag = createBag();
  private score: ScoreState = { ...INITIAL_SCORE };

  // Visuals
  private boardGfx!: Phaser.GameObjects.Graphics;
  private pieceGfx!: Phaser.GameObjects.Graphics;
  private ghostGfx!: Phaser.GameObjects.Graphics;
  private holdGfx!: Phaser.GameObjects.Graphics;
  private nextGfx!: Phaser.GameObjects.Graphics;

  // Line-clear visual flash
  private flashRows: number[] = [];
  private flashUntil = 0;

  // Layout
  private cellSize = 24;
  private boardX = 0;
  private boardY = 0;
  private sideX = 0; // right column start

  // Timing
  private gravityTimer = 0;
  private lockTimer = 0;
  private lockResets = 0;
  private softDropping = false;

  // State machine
  private state: "playing" | "paused" | "over" = "playing";
  private lastMoveWasRotation = false;
  private lastKickIndex = 0;

  private callbacks!: PlaySceneCallbacks;

  constructor() {
    super("PlayScene");
  }

  init(data: PlaySceneCallbacks) {
    this.callbacks = data;
  }

  create() {
    this.computeLayout();
    this.boardGfx = this.add.graphics();
    this.ghostGfx = this.add.graphics();
    this.pieceGfx = this.add.graphics();
    this.holdGfx = this.add.graphics();
    this.nextGfx = this.add.graphics();

    this.scale.on("resize", this.onResize, this);
    this.input.keyboard?.on("keydown", this.onKey, this);
    this.input.keyboard?.on("keyup", this.onKeyUp, this);

    audio.playBgm(HARD_DROP_BGM_KEY);
    this.resetGame();
    this.draw();
    this.emitScore();
  }

  shutdown() {
    audio.stopBgm();
    this.scale.off("resize", this.onResize, this);
    this.input.keyboard?.off("keydown", this.onKey, this);
    this.input.keyboard?.off("keyup", this.onKeyUp, this);
  }

  private resetGame() {
    this.board = createBoard();
    this.bag = createBag();
    this.nextQueue = [];
    this.refillQueue();
    this.holdPiece = null;
    this.holdUsed = false;
    this.score = { ...INITIAL_SCORE };
    this.gravityTimer = 0;
    this.lockTimer = 0;
    this.lockResets = 0;
    this.softDropping = false;
    this.state = "playing";
    this.callbacks.onState("playing");
    this.spawnFromQueue();
  }

  /** Public commands — used by both keyboard and touch HUD. */
  public command(cmd:
    | "left" | "right" | "softDown" | "softUp" | "hardDrop"
    | "rotateCW" | "rotateCCW" | "hold" | "pause" | "resume" | "restart") {
    if (this.state === "over" && cmd !== "restart") return;
    switch (cmd) {
      case "left": this.tryMove(-1, 0); break;
      case "right": this.tryMove(1, 0); break;
      case "softDown": this.softDropping = true; break;
      case "softUp": this.softDropping = false; break;
      case "hardDrop": this.hardDrop(); break;
      case "rotateCW": this.tryRotateBy(1); break;
      case "rotateCCW": this.tryRotateBy(-1); break;
      case "hold": this.doHold(); break;
      case "pause": this.pauseGame(); break;
      case "resume": this.resumeGame(); break;
      case "restart": this.resetGame(); this.draw(); this.emitScore(); break;
    }
  }

  private pauseGame() {
    if (this.state !== "playing") return;
    this.state = "paused";
    audio.pauseAll();
    this.callbacks.onState("paused");
  }

  private resumeGame() {
    if (this.state !== "paused") return;
    this.state = "playing";
    audio.resumeBgm();
    this.callbacks.onState("playing");
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.repeat) {
      // Allow repeat for left/right/down
      if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowDown") {
        this.handleKey(e);
      }
      return;
    }
    this.handleKey(e);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") this.command("softUp");
  };

  private handleKey(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowLeft": this.command("left"); break;
      case "ArrowRight": this.command("right"); break;
      case "ArrowDown": this.command("softDown"); break;
      case "ArrowUp":
      case "x":
      case "X": this.command("rotateCW"); break;
      case "z":
      case "Z": this.command("rotateCCW"); break;
      case " ": this.command("hardDrop"); break;
      case "c":
      case "C":
      case "Shift": this.command("hold"); break;
      case "p":
      case "P":
      case "Escape":
        if (this.state === "playing") this.command("pause");
        else if (this.state === "paused") this.command("resume");
        break;
    }
  }

  private refillQueue() {
    while (this.nextQueue.length < NEXT_COUNT + 1) {
      this.nextQueue.push(this.bag());
    }
  }

  private spawnFromQueue() {
    const id = this.nextQueue.shift()!;
    this.refillQueue();
    const piece = spawnPiece(id);
    this.active = piece;
    this.lockTimer = 0;
    this.lockResets = 0;
    this.lastMoveWasRotation = false;
    this.lastKickIndex = 0;
    this.holdUsed = false;
    if (!isValid(this.board, piece)) {
      // Block out — game over
      this.endGame();
    }
  }

  private endGame() {
    this.state = "over";
    audio.stopBgm();
    audio.playSfx("gameOver");
    const newBest = this.callbacks.submitBest(this.score.score);
    this.callbacks.onGameOver(this.scoreUpdate(), newBest);
    this.callbacks.onState("over");
  }

  private scoreUpdate(): ScoreUpdate {
    return {
      score: this.score.score,
      best: this.callbacks.getBest(),
      level: this.score.level,
      lines: this.score.lines,
    };
  }

  private emitScore() {
    this.callbacks.onScore(this.scoreUpdate());
  }

  private tryMove(dx: number, dy: number): boolean {
    if (!this.active) return false;
    const cand = { ...this.active, col: this.active.col + dx, row: this.active.row + dy };
    if (!isValid(this.board, cand)) {
      if (dy === 0) audio.playSfx("inputFailed");
      return false;
    }
    this.active = cand;
    this.lastMoveWasRotation = false;
    if (dy === 0) audio.playSfx("move");
    this.resetLockTimer();
    return true;
  }

  private tryRotateBy(dir: 1 | -1) {
    if (!this.active) return;
    const res = tryRotate(this.board, this.active, dir);
    if (!res) {
      audio.playSfx("inputFailed");
      return;
    }
    this.active = res.piece;
    this.lastMoveWasRotation = true;
    this.lastKickIndex = res.kick;
    audio.playSfx("rotate");
    this.resetLockTimer();
  }

  private resetLockTimer() {
    if (!this.active) return;
    const below = { ...this.active, row: this.active.row + 1 };
    if (!isValid(this.board, below)) {
      // We are touching — reset lock timer if we still have resets left.
      if (this.lockResets < MAX_LOCK_RESETS) {
        this.lockTimer = 0;
        this.lockResets += 1;
      }
    } else {
      this.lockTimer = 0;
    }
  }

  private hardDrop() {
    if (!this.active) return;
    const start = this.active.row;
    const landed = dropToBottom(this.board, this.active);
    const cells = landed.row - start;
    this.active = landed;
    this.score.score += dropPoints(cells, "hard");
    audio.playSfx("hardDrop");
    this.lockNow();
  }

  private doHold() {
    if (!this.active || this.holdUsed) return;
    audio.playSfx("hold");
    const cur = this.active.id;
    if (this.holdPiece == null) {
      this.holdPiece = cur;
      this.spawnFromQueue();
    } else {
      const prev = this.holdPiece;
      this.holdPiece = cur;
      this.active = spawnPiece(prev);
    }
    this.holdUsed = true;
    this.lockTimer = 0;
    this.lockResets = 0;
  }

  private lockNow() {
    if (!this.active) return;
    const piece = this.active;
    const { tSpin, tSpinMini } = detectTSpin(
      piece,
      this.board,
      this.lastMoveWasRotation,
      this.lastKickIndex,
    );
    const lockedBoard = lockPiece(this.board, piece);
    const fullRows: number[] = [];
    for (let r = 0; r < lockedBoard.length; r++) {
      if (lockedBoard[r].every((c) => c !== "")) fullRows.push(r);
    }
    const cleared = clearFullLines(lockedBoard);
    this.board = cleared.board;

    if (fullRows.length > 0) {
      this.flashRows = fullRows;
      this.flashUntil = this.time.now + FLASH_MS;
    }

    const prevLevel = this.score.level;
    const prevBackToBack = this.score.backToBack;
    this.score = applyClear(this.score, {
      lines: cleared.linesCleared,
      tSpin,
      tSpinMini,
    });

    if (cleared.linesCleared > 0) {
      audio.playSfx("lineClear");
      if (cleared.linesCleared >= 4) {
        if (prevBackToBack) audio.playSfx("backToBack");
        else audio.playSfx("collapse");
      }
      if (this.score.level > prevLevel) audio.playSfx("levelUp");
    } else {
      audio.playSfx("lock");
    }

    // Lock-out: a piece came to rest entirely above the visible playfield.
    for (let r = 0; r < HIDDEN_ROWS; r++) {
      if (this.board[r].some((c) => c !== "")) {
        this.emitScore();
        this.endGame();
        return;
      }
    }

    this.spawnFromQueue();
    this.emitScore();
  }

  update(_time: number, delta: number) {
    if (this.state !== "playing" || !this.active) return;
    const gMs = (this.softDropping ? 0.05 : gravityForLevel(this.score.level)) * 1000;
    this.gravityTimer += delta;
    if (this.gravityTimer >= gMs) {
      this.gravityTimer = 0;
      const moved = this.tryFall();
      if (moved && this.softDropping) {
        this.score.score += dropPoints(1, "soft");
        this.emitScore();
      }
    }

    // Lock delay if touching ground.
    if (this.active) {
      const below = { ...this.active, row: this.active.row + 1 };
      if (!isValid(this.board, below)) {
        this.lockTimer += delta;
        if (this.lockTimer >= LOCK_DELAY_MS) {
          this.lockNow();
        }
      } else {
        this.lockTimer = 0;
      }
    }

    this.draw();
  }

  private tryFall(): boolean {
    if (!this.active) return false;
    const cand = { ...this.active, row: this.active.row + 1 };
    if (!isValid(this.board, cand)) return false;
    this.active = cand;
    this.lastMoveWasRotation = false;
    return true;
  }

  // --------------- LAYOUT + RENDER ---------------

  private onResize = () => {
    this.computeLayout();
    this.draw();
  };

  private computeLayout() {
    const W = this.scale.gameSize.width;
    const H = this.scale.gameSize.height;
    const sidePanelMin = 80;
    const cellByH = Math.floor((H - 40) / ROWS);
    const cellByW = Math.floor((W - sidePanelMin - 30) / COLS);
    this.cellSize = Math.max(12, Math.min(cellByH, cellByW, 40));
    const boardW = this.cellSize * COLS;
    const boardH = this.cellSize * ROWS;
    this.boardX = Math.max(10, Math.floor((W - boardW - sidePanelMin - 20) / 2));
    this.boardY = Math.max(10, Math.floor((H - boardH) / 2));
    this.sideX = this.boardX + boardW + 12;
  }

  private draw() {
    const cs = this.cellSize;
    const g = this.boardGfx.clear();

    // Frame
    g.lineStyle(2, 0x353555, 1);
    g.strokeRect(this.boardX - 1, this.boardY - 1, cs * COLS + 2, cs * ROWS + 2);

    // Subtle grid + locked cells
    for (let r = HIDDEN_ROWS; r < TOTAL_ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = this.board[r][c];
        const x = this.boardX + c * cs;
        const y = this.boardY + (r - HIDDEN_ROWS) * cs;
        if (cell) {
          this.drawCell(g, x, y, cs, PIECE_COLORS[cell as PieceId] ?? 0xffffff);
        } else {
          g.fillStyle(0x1b1b2e, 1);
          g.fillRect(x, y, cs, cs);
          g.lineStyle(1, 0x262640, 1);
          g.strokeRect(x + 0.5, y + 0.5, cs - 1, cs - 1);
        }
      }
    }

    // Line-clear flash overlay
    if (this.flashUntil > this.time.now && this.flashRows.length > 0) {
      const t = (this.flashUntil - this.time.now) / FLASH_MS;
      g.fillStyle(0xffffff, Math.max(0, Math.min(1, t)));
      for (const r of this.flashRows) {
        if (r < HIDDEN_ROWS) continue;
        const y = this.boardY + (r - HIDDEN_ROWS) * cs;
        g.fillRect(this.boardX, y, cs * COLS, cs);
      }
    }

    // Ghost
    this.ghostGfx.clear();
    if (this.active) {
      const ghost = dropToBottom(this.board, this.active);
      const color = PIECE_COLORS[ghost.id];
      for (const [c, r] of pieceCells(ghost)) {
        if (r < HIDDEN_ROWS) continue;
        const x = this.boardX + c * cs;
        const y = this.boardY + (r - HIDDEN_ROWS) * cs;
        this.ghostGfx.lineStyle(2, color, 0.6);
        this.ghostGfx.strokeRect(x + 2, y + 2, cs - 4, cs - 4);
      }
    }

    // Active piece
    this.pieceGfx.clear();
    if (this.active) {
      const color = PIECE_COLORS[this.active.id];
      for (const [c, r] of pieceCells(this.active)) {
        if (r < HIDDEN_ROWS) continue;
        const x = this.boardX + c * cs;
        const y = this.boardY + (r - HIDDEN_ROWS) * cs;
        this.drawCell(this.pieceGfx, x, y, cs, color);
      }
    }

    // Hold + Next previews
    this.drawPreviews();
  }

  private drawCell(g: Phaser.GameObjects.Graphics, x: number, y: number, cs: number, color: number) {
    g.fillStyle(color, 1);
    g.fillRect(x, y, cs, cs);
    g.fillStyle(0xffffff, 0.18);
    g.fillRect(x, y, cs, Math.max(2, cs * 0.18));
    g.lineStyle(1, 0x000000, 0.35);
    g.strokeRect(x + 0.5, y + 0.5, cs - 1, cs - 1);
  }

  private drawPreviews() {
    const cs = Math.floor(this.cellSize * 0.6);
    const panelX = this.sideX;
    let py = this.boardY;
    this.holdGfx.clear();
    this.nextGfx.clear();
    if (this.holdPiece) {
      this.drawMini(this.holdGfx, panelX, py, cs, this.holdPiece);
    } else {
      this.holdGfx.fillStyle(0x1b1b2e, 1);
      this.holdGfx.fillRect(panelX, py, cs * 4, cs * 3);
    }
    py += cs * 4;
    for (let i = 0; i < NEXT_COUNT; i++) {
      const id = this.nextQueue[i];
      if (!id) break;
      this.drawMini(this.nextGfx, panelX, py, cs, id);
      py += cs * 3.2;
    }
  }

  private drawMini(g: Phaser.GameObjects.Graphics, x: number, y: number, cs: number, id: PieceId) {
    const color = PIECE_COLORS[id];
    const shape = PIECE_SHAPES[id][0];
    for (const [c, r] of shape) {
      this.drawCell(g, x + c * cs, y + r * cs, cs, color);
    }
  }
}
