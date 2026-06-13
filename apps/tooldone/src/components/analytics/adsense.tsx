import Script from "next/script";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/site";

/** AdSense site-wide loader. Flag-gated until the AdSense application is
 *  approved. After approval, set NEXT_PUBLIC_ADSENSE_ENABLED=1 +
 *  NEXT_PUBLIC_ADSENSE_CLIENT to the publisher id. */
export function AdSenseLoader() {
  if (!ADSENSE_ENABLED) return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

/** Placeholder ad slot. Drop into a layout where an ad belongs; renders nothing
 *  until AdSense is enabled. `slot` should be the ad-unit id from the AdSense
 *  dashboard (a numeric string). */
export function AdSlot({ slot, className }: { slot: string; className?: string }) {
  if (!ADSENSE_ENABLED) return null;
  return (
    <ins
      className={`adsbygoogle ${className ?? ""}`.trim()}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
