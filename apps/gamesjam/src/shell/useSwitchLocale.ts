import { useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { type Locale, isLocale } from "../i18n/locales";
import { changeLocale } from "../i18n";
import { findGameByUrlSlug } from "../games/registry";
import { useSettings } from "./SettingsStore";

/**
 * Switches the UI language AND rewrites the URL to the same logical page under
 * the new locale (game pages remap to their localized slug). This keeps the URL
 * the source of truth so a reload restores the chosen language.
 */
export function useSwitchLocale() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const onLanguageChange = useSettings((s) => s.onLanguageChange);

  return useCallback(
    (next: Locale) => {
      void changeLocale(next);
      onLanguageChange(next);

      const currentLocale: Locale = isLocale(params.locale) ? params.locale : "en";
      if (next === currentLocale) return;

      const slug = params.gameSlug;
      if (slug) {
        const game = findGameByUrlSlug(currentLocale, slug);
        if (game) {
          navigate(`/${next}/${game.urlSlug[next]}${location.search}${location.hash}`);
          return;
        }
      }
      navigate(`/${next}${location.search}${location.hash}`);
    },
    [navigate, params.locale, params.gameSlug, location.search, location.hash, onLanguageChange],
  );
}
