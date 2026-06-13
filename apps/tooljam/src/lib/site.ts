// Site-wide constants. Edit env-specific values via environment variables in
// CI; defaults here keep `pnpm dev` working.

export const SITE_NAME = "ToolJam";
export const SITE_TAGLINE =
  "Free Online Calculation Tools & Converters · Multilingual";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tools.weavejam.com";

// GA4. Injected by scripts/new-site.ps1 or supplied via env at build time.
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-XXXXXXXXXX";

// AdSense. Wrapped in a feature flag so we can ship before the AdSense
// application is approved. Flip ADSENSE_ENABLED to "1" (or set in CI) once
// approved.
export const ADSENSE_ENABLED =
  (process.env.NEXT_PUBLIC_ADSENSE_ENABLED ?? "0") === "1";
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXXXXXXXXXXXXXX";
