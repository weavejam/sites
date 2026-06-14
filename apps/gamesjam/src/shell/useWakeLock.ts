import { useEffect, useRef } from "react";

/** Holds a WakeLock while `active` is true. No-op on unsupported browsers. */
export function useWakeLock(active: boolean) {
  const sentinelRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    const request = async () => {
      try {
        const wl = (navigator as Navigator & {
          wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinel> };
        }).wakeLock;
        if (!wl) return;
        const sentinel = await wl.request("screen");
        if (cancelled) {
          await sentinel.release().catch(() => {});
          return;
        }
        sentinelRef.current = sentinel;
        sentinel.addEventListener("release", () => {
          sentinelRef.current = null;
        });
      } catch {
        // ignored — surface not critical
      }
    };

    void request();
    const onVisibility = () => {
      if (document.visibilityState === "visible" && !sentinelRef.current) {
        void request();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      sentinelRef.current?.release().catch(() => {});
      sentinelRef.current = null;
    };
  }, [active]);
}

interface WakeLockSentinel extends EventTarget {
  release(): Promise<void>;
}
