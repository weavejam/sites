import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale } from "./locales";

// We only load the SHARED messages (home, category, footer) by default.
// Tool pages load their own messages explicitly and wrap their subtree in
// a nested NextIntlClientProvider — that keeps the client RSC payload small
// (~10 KB per page instead of 1+ MB).  See:
//   src/app/[locale]/[category]/[slug]/page.tsx
//   messages/shared/<locale>.json
//   messages/tool/<id>/<locale>.json
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : defaultLocale;
  const messages = (await import(`../../messages/shared/${locale}.json`)).default;
  return { locale, messages };
});

