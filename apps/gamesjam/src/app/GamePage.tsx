import { lazy, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { findGameByUrlSlug } from "../games/registry";
import { type Locale, isLocale } from "../i18n/locales";
import { useDocumentTitle } from "../shell/useDocumentTitle";

const TetrisGame = lazy(() => import("../games/tetris/TetrisGame"));

export function GamePage() {
  const { t } = useTranslation();
  const params = useParams();
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const slug = params.gameSlug ?? "";

  const game = findGameByUrlSlug(locale, slug);
  useDocumentTitle(game ? t(game.titleKey) : "");
  if (!game) return <Navigate to={`/${locale}`} replace />;

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 py-2 flex items-center gap-2 text-sm">
        <Link to={`/${locale}`} className="text-jam-muted hover:text-jam-text">
          ← {t("game.back")}
        </Link>
        <span className="text-jam-muted">/</span>
        <span className="font-medium">{t(game.titleKey)}</span>
      </div>
      <Suspense fallback={<GameLoading />}>
        {game.slug === "tetris" && <TetrisGame />}
      </Suspense>
    </div>
  );
}

function GameLoading() {
  return (
    <div className="flex-1 grid place-items-center text-jam-muted">
      <div className="animate-pulse">…</div>
    </div>
  );
}
