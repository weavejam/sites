import type { Stats } from "./stats";
import type { Difficulty } from "./sudoku";
import { getLang } from "./i18n";

export interface Achievement {
  id: string;
  icon: string;
  nameZh: string;
  nameEn: string;
  descZh: string;
  descEn: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_win", icon: "🥇", nameZh: "初出茅庐", nameEn: "First Win", descZh: "完成第一局", descEn: "Complete your first game" },
  { id: "perfect_any", icon: "✨", nameZh: "无失误", nameEn: "Flawless", descZh: "零失误完成一局", descEn: "Finish a game with zero mistakes" },
  { id: "perfect_9_hard", icon: "💎", nameZh: "钻石手感", nameEn: "Diamond Hands", descZh: "9×9 困难零失误完成", descEn: "9×9 hard with zero mistakes" },
  { id: "speed_9_easy", icon: "⚡", nameZh: "闪电速度", nameEn: "Lightning", descZh: "9×9 简单 3 分钟内完成", descEn: "9×9 easy under 3 minutes" },
  { id: "speed_9_std", icon: "🚀", nameZh: "极速思考", nameEn: "Speed Thinker", descZh: "9×9 标准 5 分钟内完成", descEn: "9×9 standard under 5 minutes" },
  { id: "speed_9_hard", icon: "🔥", nameZh: "燃烧大脑", nameEn: "Brain on Fire", descZh: "9×9 困难 8 分钟内完成", descEn: "9×9 hard under 8 minutes" },
  { id: "wins_10", icon: "🎯", nameZh: "十连胜", nameEn: "Decimator", descZh: "累计 10 胜", descEn: "10 total wins" },
  { id: "wins_50", icon: "🏅", nameZh: "数独熟手", nameEn: "Veteran", descZh: "累计 50 胜", descEn: "50 total wins" },
  { id: "wins_100", icon: "🏆", nameZh: "数独大师", nameEn: "Grandmaster", descZh: "累计 100 胜", descEn: "100 total wins" },
  { id: "streak_3", icon: "🔥", nameZh: "三连击", nameEn: "On Fire", descZh: "连续打卡 3 天", descEn: "3-day streak" },
  { id: "streak_7", icon: "📅", nameZh: "一周热爱", nameEn: "Week Lover", descZh: "连续打卡 7 天", descEn: "7-day streak" },
  { id: "streak_30", icon: "🗓️", nameZh: "月度铁粉", nameEn: "Monthly Devotee", descZh: "连续打卡 30 天", descEn: "30-day streak" },
  { id: "daily_1", icon: "🌟", nameZh: "今日挑战者", nameEn: "Daily Challenger", descZh: "完成第一个今日挑战", descEn: "Complete your first daily challenge" },
  { id: "daily_7", icon: "🌠", nameZh: "挑战周冠", nameEn: "Daily Champion", descZh: "完成 7 个今日挑战", descEn: "Complete 7 daily challenges" },
  { id: "all_modes", icon: "🌈", nameZh: "全模式通关", nameEn: "All Rounder", descZh: "在 4×4 / 6×6 / 9×9 各胜一局", descEn: "Win in 4×4, 6×6 and 9×9" },
];

export function localizedName(a: Achievement): string {
  return getLang() === "zh" ? a.nameZh : a.nameEn;
}
export function localizedDesc(a: Achievement): string {
  return getLang() === "zh" ? a.descZh : a.descEn;
}

export interface WinContext {
  size: number;
  difficulty: Difficulty;
  timeMs: number;
  mistakes: number;
  isDaily: boolean;
}

// Returns IDs that were newly unlocked
export function evaluateAchievements(stats: Stats, ctx: WinContext): string[] {
  const have = new Set(stats.achievements);
  const newly: string[] = [];
  const unlock = (id: string) => {
    if (!have.has(id)) { have.add(id); newly.push(id); }
  };

  unlock("first_win");
  if (ctx.mistakes === 0) unlock("perfect_any");
  if (ctx.mistakes === 0 && ctx.size === 9 && ctx.difficulty === "hard") unlock("perfect_9_hard");
  if (ctx.size === 9 && ctx.difficulty === "easy" && ctx.timeMs <= 180_000) unlock("speed_9_easy");
  if (ctx.size === 9 && ctx.difficulty === "standard" && ctx.timeMs <= 300_000) unlock("speed_9_std");
  if (ctx.size === 9 && ctx.difficulty === "hard" && ctx.timeMs <= 480_000) unlock("speed_9_hard");

  if (stats.totalWins >= 10) unlock("wins_10");
  if (stats.totalWins >= 50) unlock("wins_50");
  if (stats.totalWins >= 100) unlock("wins_100");

  // streak achievements need to be checked by caller (need streak number); we set placeholders here
  if (stats.completed.length >= 3 && stats.currentStreak >= 3) unlock("streak_3");
  if (stats.currentStreak >= 7) unlock("streak_7");
  if (stats.currentStreak >= 30) unlock("streak_30");

  if (ctx.isDaily) unlock("daily_1");
  if (Object.keys(stats.dailyCompleted).length >= 7) unlock("daily_7");

  if (stats.sizesWon["4"] && stats.sizesWon["6"] && stats.sizesWon["9"]) unlock("all_modes");

  stats.achievements = [...have];
  return newly;
}
