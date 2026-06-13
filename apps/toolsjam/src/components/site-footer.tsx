import Link from "next/link";
import { useTranslations } from "next-intl";
import { defaultLocale, locales, localeNames, type Locale } from "@/i18n/locales";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-zinc-500">
        <div>© {year} ToolsJam — {t("tagline")}</div>
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </footer>
  );
}

function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l === defaultLocale ? "" : l}`}
          className={
            "px-2 py-1 rounded border text-xs " +
            (l === currentLocale
              ? "border-zinc-900 text-zinc-900 bg-zinc-100"
              : "border-zinc-200 hover:bg-zinc-50")
          }
          hrefLang={l}
        >
          {localeNames[l]}
        </Link>
      ))}
    </div>
  );
}
