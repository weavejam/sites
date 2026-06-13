import type { Locale } from "@/i18n/locales";

export type CategoryId =
  | "math"
  | "physic"
  | "chemistry"
  | "biology"
  | "statistic"
  | "finance"
  | "health"
  | "conversion"
  | "construction"
  | "other";

export interface Category {
  id: CategoryId;
  icon: string; // lucide-react icon name
  slugs: Record<Locale, string>;
}

export const categories: Category[] = [
  {
    id: "math",
    icon: "Calculator",
    slugs: { en: "math", "zh-CN": "shuxue", "zh-TW": "shuxue", ja: "sugaku", ko: "suhak", es: "matematicas", fr: "mathematiques", de: "mathematik", pt: "matematica", ru: "matematika" },
  },
  {
    id: "physic",
    icon: "Zap",
    slugs: { en: "physic", "zh-CN": "wulixue", "zh-TW": "wulixue", ja: "butsuri", ko: "mulli", es: "fisica", fr: "physique", de: "physik", pt: "fisica", ru: "fizika" },
  },
  {
    id: "chemistry",
    icon: "TestTube",
    slugs: { en: "chemistry", "zh-CN": "huaxue", "zh-TW": "huaxue", ja: "kagaku", ko: "hwahak", es: "quimica", fr: "chimie", de: "chemie", pt: "quimica", ru: "khimiya" },
  },
  {
    id: "biology",
    icon: "Leaf",
    slugs: { en: "biology", "zh-CN": "shengwuxue", "zh-TW": "shengwuxue", ja: "seibutsu", ko: "saengmul", es: "biologia", fr: "biologie", de: "biologie", pt: "biologia", ru: "biologiya" },
  },
  {
    id: "statistic",
    icon: "ChartColumn",
    slugs: { en: "statistic", "zh-CN": "tongji", "zh-TW": "tongji", ja: "tokei", ko: "tonggye", es: "estadistica", fr: "statistique", de: "statistik", pt: "estatistica", ru: "statistika" },
  },
  {
    id: "finance",
    icon: "DollarSign",
    slugs: { en: "finance", "zh-CN": "jinrong", "zh-TW": "jinrong", ja: "kinyu", ko: "geumyung", es: "finanzas", fr: "finance", de: "finanzen", pt: "financas", ru: "finansy" },
  },
  {
    id: "health",
    icon: "Heart",
    slugs: { en: "health", "zh-CN": "jiankang", "zh-TW": "jiankang", ja: "kenko", ko: "geongang", es: "salud", fr: "sante", de: "gesundheit", pt: "saude", ru: "zdorove" },
  },
  {
    id: "conversion",
    icon: "ArrowLeftRight",
    slugs: { en: "conversion", "zh-CN": "zhuanhuan", "zh-TW": "zhuanhuan", ja: "henkan", ko: "byeonhwan", es: "conversion", fr: "conversion", de: "umrechnung", pt: "conversao", ru: "konvertatsiya" },
  },
  {
    id: "construction",
    icon: "Hammer",
    slugs: { en: "construction", "zh-CN": "jianzhu", "zh-TW": "jianzhu", ja: "kensetsu", ko: "geonseol", es: "construccion", fr: "construction", de: "bau", pt: "construcao", ru: "stroitelstvo" },
  },
  {
    id: "other",
    icon: "Ellipsis",
    slugs: { en: "other", "zh-CN": "qita", "zh-TW": "qita", ja: "sonota", ko: "gita", es: "otros", fr: "autres", de: "andere", pt: "outros", ru: "drugoe" },
  },
];

export const categoryById: Record<CategoryId, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;

export function categorySlug(id: CategoryId, locale: Locale): string {
  return categoryById[id].slugs[locale];
}

export function categoryFromSlug(slug: string, locale: Locale): Category | undefined {
  return categories.find((c) => c.slugs[locale] === slug);
}
