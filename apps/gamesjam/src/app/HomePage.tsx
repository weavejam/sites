import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GAMES, COMING_SOON } from "../games/registry";
import { type Locale, isLocale } from "../i18n/locales";
import { useDocumentTitle } from "../shell/useDocumentTitle";

export function HomePage() {
  const { t } = useTranslation();
  const params = useParams();
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  useDocumentTitle(t("home.heading"));

  return (
    <section className="px-4 sm:px-6 py-6 max-w-5xl w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t("home.heading")}
        </h1>
        <p className="text-jam-muted mt-2">{t("home.subheading")}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {GAMES.map((g) => (
          <Link
            key={g.slug}
            to={`/${locale}/${g.urlSlug[locale]}`}
            className="group relative rounded-2xl bg-jam-surface border border-jam-border overflow-hidden p-4 flex flex-col gap-2 active:scale-[0.98] transition"
          >
            <div className="text-5xl">{g.badge}</div>
            <div className="font-bold">{t(g.titleKey)}</div>
            <div className="text-xs text-jam-muted line-clamp-2">{t(g.descriptionKey)}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-jam-primary">
              ▶ {t("game.play")}
            </div>
          </Link>
        ))}
        {COMING_SOON.map((g) => (
          <div
            key={g.titleKey}
            className="rounded-2xl bg-jam-surface/60 border border-dashed border-jam-border overflow-hidden p-4 flex flex-col gap-2 opacity-60"
            aria-disabled="true"
          >
            <div className="text-5xl grayscale">{g.badge}</div>
            <div className="font-bold">{t(g.titleKey)}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-jam-muted">
              {t("game.comingSoon")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
