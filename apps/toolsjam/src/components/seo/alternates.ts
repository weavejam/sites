import { locales, type Locale } from "@/i18n/locales";
import { SITE_URL } from "@/lib/site";

/**
 * Build the per-page `<link rel="alternate" hrefLang>` map for SEO.
 * Pass the relative path (e.g. `/math/percentage-calculator`) for each
 * locale; missing entries are skipped.
 *
 * Returns an object usable directly in Next.js `metadata.alternates`.
 */
export function buildAlternates(opts: {
  pathByLocale: Partial<Record<Locale, string>>;
  currentLocale: Locale;
}) {
  const { pathByLocale, currentLocale } = opts;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    const p = pathByLocale[l];
    if (!p) continue;
    languages[l] = `${SITE_URL}/${l}${p.startsWith("/") ? p : `/${p}`}`;
  }
  // x-default → English
  if (pathByLocale.en) {
    languages["x-default"] = `${SITE_URL}/en${pathByLocale.en.startsWith("/") ? pathByLocale.en : `/${pathByLocale.en}`}`;
  }
  const canonical = languages[currentLocale];
  return { canonical, languages };
}
