// Minimal GA4 wrapper. Safe no-op if gtag isn't loaded (e.g. blocked by adblock).
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  try {
    window.gtag?.("event", event, params);
  } catch {
    // swallow — analytics must never break the app
  }
}
