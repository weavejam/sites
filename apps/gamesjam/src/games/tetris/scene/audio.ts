/** Asset table for Tetris audio. Paths are served from /public. */
export const TETRIS_SFX = [
  { key: "move",        src: "/games/tetris/audio/move.mp3" },
  { key: "rotate",      src: "/games/tetris/audio/rotate.mp3" },
  { key: "lock",        src: "/games/tetris/audio/lock.mp3" },
  { key: "hardDrop",    src: "/games/tetris/audio/hardDrop.mp3" },
  { key: "hold",        src: "/games/tetris/audio/hold.mp3" },
  { key: "lineClear",   src: "/games/tetris/audio/lineClear.mp3" },
  { key: "collapse",    src: "/games/tetris/audio/collapse.mp3" },
  { key: "levelUp",     src: "/games/tetris/audio/levelUp.mp3" },
  { key: "inputFailed", src: "/games/tetris/audio/inputFailed.mp3" },
  { key: "backToBack",  src: "/games/tetris/audio/backToBackTetris.mp3" },
  { key: "win",         src: "/games/tetris/audio/win.mp3" },
  { key: "gameOver",    src: "/games/tetris/audio/blockout.mp3" },
] as const;

export const TETRIS_BGM = [
  { key: "korobeiniki",        src: "/games/tetris/audio/tetris_theme_music.mp3" },
  { key: "korobeiniki-br",     src: "/games/tetris/audio/Korobeiniki-BR-01.mp3" },
  { key: "korobeiniki-cn",     src: "/games/tetris/audio/Korobeiniki-CN-01.mp3" },
  { key: "korobeiniki-folk",   src: "/games/tetris/audio/Korobeiniki-FVR-01.mp3" },
] as const;
