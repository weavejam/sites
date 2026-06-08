export type Lang = "zh" | "en";

type Entry = string | ((arg: any) => string);

const dict: Record<Lang, Record<string, Entry>> = {
  zh: {
    title: "数独 · Sudoku",
    size4: "四宫 4×4",
    size6: "六宫 6×6",
    size9: "九宫 9×9",
    easy: "简单",
    standard: "标准",
    hard: "困难",
    new: "新游戏",
    hint: "提示",
    solve: "显示答案",
    stats: "记录",
    pause: "⏸ 暂停",
    resume: "▶ 继续",
    undo: "撤销",
    redo: "重做",
    notes: "笔记",
    daily: "今日挑战",
    share: "📤 分享",
    themeDark: "🌙",
    themeLight: "☀️",
    langSwitch: "EN",
    selectCell: "选择一格，输入数字开始游戏。",
    finished: "🎉 完成！",
    conflicts: (n: number) => `有冲突 (${n})`,
    correctSoFar: (n: number) => `目前都正确，还有 ${n} 格未填。`,
    wrongCount: (n: number) => `有 ${n} 格错误`,
    confirmSolve: "显示完整答案？这次不会计入记录。",
    paused: "已暂停",
    clickResume: "点击继续",
    statRecords: "战绩",
    streakCurrent: "连续打卡",
    streakLongest: "最长连击",
    totalWins: "累计胜场",
    perfectGames: "完美胜场",
    last28: "近 28 天打卡",
    bestTimes: "最佳成绩",
    achievementsTitle: "成就",
    dailyDone: "今日挑战已完成 ✨",
    notForRecord: "使用「显示答案」完成的局不计入记录。",
    days: (n: number) => `${n} 天`,
    win: (t: string) => `🎉 完成 · ${t}`,
    newRecord: (prev: string) => `🏆 打破纪录！原 ${prev}`,
    firstRecord: "🏆 首条纪录！",
    dailyCheckIn: (n: number) => `✅ 今日打卡 · 连续 ${n} 天`,
    perfect: "✨ 完美！0 错误",
    mistakes: (n: number) => `失误 ${n} 次`,
    dailyChallengeWin: "🌟 今日挑战完成",
    shareTitleWin: "数独战绩",
    shareTime: "用时",
    shareMode: "模式",
    shareMistakes: "失误",
    shareDate: "日期",
    sharePerfect: "完美局 ✨",
    shareCopied: "已复制成绩到剪贴板",
    shareImageDl: "已下载成绩图",
    shareNoWin: "完成一局后再分享哦",
    achNames: "",
  },
  en: {
    title: "Sudoku",
    size4: "4×4",
    size6: "6×6",
    size9: "9×9",
    easy: "Easy",
    standard: "Standard",
    hard: "Hard",
    new: "New",
    hint: "Hint",
    solve: "Reveal",
    stats: "Stats",
    pause: "⏸ Pause",
    resume: "▶ Resume",
    undo: "Undo",
    redo: "Redo",
    notes: "Notes",
    daily: "Daily",
    share: "📤 Share",
    themeDark: "🌙",
    themeLight: "☀️",
    langSwitch: "中",
    selectCell: "Pick a cell and type a number.",
    finished: "🎉 Done!",
    conflicts: (n: number) => `${n} conflict(s)`,
    correctSoFar: (n: number) => `All correct so far. ${n} empty cell(s) left.`,
    wrongCount: (n: number) => `${n} wrong cell(s)`,
    confirmSolve: "Reveal the full answer? This game won't count.",
    paused: "Paused",
    clickResume: "Click to resume",
    statRecords: "Stats",
    streakCurrent: "Current streak",
    streakLongest: "Longest streak",
    totalWins: "Total wins",
    perfectGames: "Perfect wins",
    last28: "Last 28 days",
    bestTimes: "Best times",
    achievementsTitle: "Achievements",
    dailyDone: "Daily done ✨",
    notForRecord: "Games finished via Reveal don't count.",
    days: (n: number) => `${n} day(s)`,
    win: (t: string) => `🎉 Done · ${t}`,
    newRecord: (prev: string) => `🏆 New record! Old ${prev}`,
    firstRecord: "🏆 First record!",
    dailyCheckIn: (n: number) => `✅ Daily check-in · ${n}-day streak`,
    perfect: "✨ Perfect! 0 mistakes",
    mistakes: (n: number) => `${n} mistake(s)`,
    dailyChallengeWin: "🌟 Daily challenge cleared",
    shareTitleWin: "Sudoku result",
    shareTime: "Time",
    shareMode: "Mode",
    shareMistakes: "Mistakes",
    shareDate: "Date",
    sharePerfect: "Perfect ✨",
    shareCopied: "Result copied to clipboard",
    shareImageDl: "Result image downloaded",
    shareNoWin: "Finish a game first",
    achNames: "",
  },
};

let current: Lang =
  (localStorage.getItem("shudu-lang") as Lang) ||
  (navigator.language?.startsWith("zh") ? "zh" : "en");

export function getLang(): Lang { return current; }
export function setLang(l: Lang) {
  current = l;
  localStorage.setItem("shudu-lang", l);
  document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
}

type Entry2 = string | ((arg: any) => string);

export function t(key: string, arg?: any): string {
  const v = (dict[current][key] ?? dict.zh[key]) as Entry2 | undefined;
  if (v === undefined) return key;
  if (typeof v === "function") return v(arg);
  return v;
}
