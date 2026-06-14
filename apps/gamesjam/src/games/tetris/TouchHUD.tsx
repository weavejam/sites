import { useEffect, useRef } from "react";
import type { PlayScene } from "./scene/PlayScene";

type Cmd = Parameters<PlayScene["command"]>[0];

interface Props {
  onCommand: (cmd: Cmd) => void;
}

/**
 * On-screen control buttons + full-screen gesture layer.
 * - Swipe horizontally → left/right
 * - Swipe down (fast) → soft drop (held); release → soft up
 * - Swipe up (fast) → hard drop
 * - Tap (no swipe) → rotate CW
 * - Two-finger tap → rotate CCW
 * - Long press → hold
 */
export function TouchHUD({ onCommand }: Props) {
  const gestureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gestureRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let lastX = 0;
    let lastY = 0;
    let stepX = 0;
    let didMove = false;
    let softHeld = false;
    let twoFinger = false;
    let pressTimer: number | null = null;
    const TAP_RADIUS = 12;
    const STEP = 28;
    const SWIPE_FAST = 0.6; // px / ms
    const LONG_PRESS_MS = 350;

    const onStart = (e: TouchEvent) => {
      twoFinger = e.touches.length >= 2;
      if (twoFinger) {
        e.preventDefault();
        onCommand("rotateCCW");
        clearPress();
        return;
      }
      const t = e.touches[0];
      startX = lastX = t.clientX;
      startY = lastY = t.clientY;
      startTime = performance.now();
      stepX = 0;
      didMove = false;
      softHeld = false;
      clearPress();
      pressTimer = window.setTimeout(() => {
        onCommand("hold");
        didMove = true; // suppress tap
      }, LONG_PRESS_MS);
    };

    const onMove = (e: TouchEvent) => {
      if (twoFinger) return;
      const t = e.touches[0];
      const dx = t.clientX - lastX;
      const dy = t.clientY - lastY;
      lastX = t.clientX;
      lastY = t.clientY;
      // Detect motion: cancel long-press
      if (Math.abs(t.clientX - startX) > TAP_RADIUS || Math.abs(t.clientY - startY) > TAP_RADIUS) {
        clearPress();
        didMove = true;
      }
      // Horizontal stepping
      stepX += dx;
      while (stepX >= STEP) { onCommand("right"); stepX -= STEP; }
      while (stepX <= -STEP) { onCommand("left"); stepX += STEP; }
      // Soft drop while moving down
      if (dy > 4 && !softHeld) {
        softHeld = true;
        onCommand("softDown");
      }
    };

    const onEnd = (e: TouchEvent) => {
      clearPress();
      if (softHeld) onCommand("softUp");
      const dt = performance.now() - startTime;
      const dx = lastX - startX;
      const dy = lastY - startY;
      const dist = Math.hypot(dx, dy);
      const speed = dist / Math.max(dt, 1);
      if (twoFinger) { twoFinger = e.touches.length >= 2; return; }
      if (!didMove && dist < TAP_RADIUS) {
        onCommand("rotateCW");
      } else if (dy < -40 && speed > SWIPE_FAST && Math.abs(dx) < 40) {
        onCommand("hardDrop");
      }
      softHeld = false;
    };

    const clearPress = () => {
      if (pressTimer != null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };

    el.addEventListener("touchstart", onStart, { passive: false });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
      clearPress();
    };
  }, [onCommand]);

  return (
    <>
      {/* Full-canvas gesture catcher (pointer-events on, but transparent). */}
      <div ref={gestureRef} className="absolute inset-0 z-10" style={{ touchAction: "none" }} />

      {/* Visible button cluster — bottom of screen. */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-5 gap-2 px-3 pb-3 pt-2 select-none"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
      >
        <HudButton onPointerDown={() => onCommand("left")}>◀</HudButton>
        <HudButton onPointerDown={() => onCommand("softDown")} onPointerUp={() => onCommand("softUp")}>▼</HudButton>
        <HudButton onPointerDown={() => onCommand("hardDrop")} accent>⤓</HudButton>
        <HudButton onPointerDown={() => onCommand("rotateCW")} accent>⟳</HudButton>
        <HudButton onPointerDown={() => onCommand("hold")}>HOLD</HudButton>
        <HudButton onPointerDown={() => onCommand("right")} className="col-start-1">▶</HudButton>
        <HudButton onPointerDown={() => onCommand("rotateCCW")}>⟲</HudButton>
      </div>
    </>
  );
}

function HudButton({
  children,
  onPointerDown,
  onPointerUp,
  accent,
  className,
}: {
  children: React.ReactNode;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerUp?: (e: React.PointerEvent) => void;
  accent?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`h-12 rounded-xl font-bold text-jam-text active:scale-95 transition ${accent ? "bg-jam-primary text-jam-bg" : "bg-jam-surface-2/80 border border-jam-border"} ${className ?? ""}`}
      onPointerDown={(e) => { e.preventDefault(); onPointerDown?.(e); }}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ touchAction: "none" }}
    >
      {children}
    </button>
  );
}
