import { formatTime } from "./stats";
import { t } from "./i18n";
import { showToast } from "./celebrate";

export interface ShareData {
  size: number;
  difficulty: string;
  timeMs: number;
  mistakes: number;
  isDaily: boolean;
  date: string;
}

export function shareText(d: ShareData): string {
  const mode = `${d.size}×${d.size} ${t(d.difficulty)}`;
  const perfect = d.mistakes === 0 ? ` ${t("sharePerfect")}` : "";
  const daily = d.isDaily ? " 🌟" : "";
  return `${t("shareTitleWin")}${daily}
${t("shareMode")}: ${mode}
${t("shareTime")}: ${formatTime(d.timeMs)}
${t("shareMistakes")}: ${d.mistakes}${perfect}
${d.date}
https://shudu.weavejam.com`;
}

export async function copyShareText(d: ShareData) {
  const txt = shareText(d);
  try {
    await navigator.clipboard.writeText(txt);
    showToast(t("shareCopied"));
  } catch {
    // fallback: open prompt
    window.prompt("Copy:", txt);
  }
}

export function downloadShareImage(d: ShareData) {
  const w = 720, h = 960;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  // background gradient
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#4f46e5");
  g.addColorStop(1, "#7c3aed");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

  // card
  ctx.fillStyle = "#fff";
  roundRect(ctx, 40, 80, w - 80, h - 160, 28);
  ctx.fill();

  ctx.fillStyle = "#1f2233";
  ctx.font = "700 48px system-ui,-apple-system,'Segoe UI','PingFang SC',sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${d.isDaily ? "🌟 " : ""}${t("shareTitleWin")}`, w / 2, 180);

  ctx.font = "500 28px system-ui,sans-serif";
  ctx.fillStyle = "#6b6f80";
  ctx.fillText(d.date, w / 2, 230);

  // big time
  ctx.fillStyle = "#4f46e5";
  ctx.font = "800 140px system-ui,sans-serif";
  ctx.fillText(formatTime(d.timeMs), w / 2, 420);

  // mode pill
  ctx.fillStyle = "#eef2ff";
  roundRect(ctx, w / 2 - 160, 480, 320, 70, 35);
  ctx.fill();
  ctx.fillStyle = "#4f46e5";
  ctx.font = "600 32px system-ui,sans-serif";
  ctx.fillText(`${d.size}×${d.size} · ${t(d.difficulty)}`, w / 2, 526);

  // mistakes row
  ctx.font = "500 30px system-ui,sans-serif";
  ctx.fillStyle = "#1f2233";
  const mLine = d.mistakes === 0 ? t("sharePerfect") : `${t("shareMistakes")}: ${d.mistakes}`;
  ctx.fillText(mLine, w / 2, 620);

  // mini board preview pattern
  ctx.strokeStyle = "#c9cbd6";
  ctx.lineWidth = 2;
  const bx = w / 2 - 120, by = 660, bs = 240;
  for (let i = 0; i <= 9; i++) {
    ctx.beginPath();
    ctx.moveTo(bx + (i * bs) / 9, by);
    ctx.lineTo(bx + (i * bs) / 9, by + bs);
    ctx.moveTo(bx, by + (i * bs) / 9);
    ctx.lineTo(bx + bs, by + (i * bs) / 9);
    ctx.stroke();
  }
  ctx.strokeStyle = "#4f46e5";
  ctx.lineWidth = 4;
  ctx.strokeRect(bx, by, bs, bs);

  ctx.fillStyle = "#6b6f80";
  ctx.font = "500 22px system-ui,sans-serif";
  ctx.fillText("shudu.weavejam.com", w / 2, h - 60);

  c.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sudoku-${d.date}-${d.size}x${d.size}.png`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t("shareImageDl"));
  }, "image/png");
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
