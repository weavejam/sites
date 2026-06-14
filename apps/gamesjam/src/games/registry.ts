import type { Locale } from "../i18n/locales";

export type GameSlug = "tetris";

export interface GameDef {
  slug: GameSlug;
  /** translation key under `tetris.*` etc. */
  titleKey: string;
  descriptionKey: string;
  /** localized URL slug under each locale */
  urlSlug: Record<Locale, string>;
  status: "live" | "soon";
  /** simple emoji or short label for the card thumbnail (until we have art). */
  badge: string;
}

export const GAMES: GameDef[] = [
  {
    slug: "tetris",
    titleKey: "tetris.title",
    descriptionKey: "tetris.description",
    urlSlug: { en: "tetris", "zh-CN": "eluosi-fangkuai" },
    status: "live",
    badge: "🟦",
  },
];

export const COMING_SOON = [
  { titleKey: "soon.snake", badge: "🐍" },
  { titleKey: "soon.2048", badge: "🔢" },
  { titleKey: "soon.breakout", badge: "🧱" },
] as const;

export function findGameByUrlSlug(locale: Locale, slug: string): GameDef | undefined {
  return GAMES.find((g) => g.urlSlug[locale] === slug);
}
