import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowLeftRight,
  Calculator,
  ChartColumn,
  DollarSign,
  Ellipsis,
  Hammer,
  Heart,
  Leaf,
  TestTube,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { categories, categorySlug, type CategoryId } from "@/data/categories";
import type { Locale } from "@/i18n/locales";

const ICONS: Record<string, LucideIcon> = {
  Calculator,
  Zap,
  TestTube,
  Leaf,
  ChartColumn,
  DollarSign,
  Heart,
  ArrowLeftRight,
  Hammer,
  Ellipsis,
};
export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations("category");
  return (
    <nav className="w-full bg-black text-white shadow flex items-center justify-between px-6 h-16">
      <Link
        href={`/${locale}`}
        className="group flex items-center h-10 px-3 rounded-md transition-all hover:bg-white/10"
      >
        <span className="font-extrabold text-xl tracking-tight leading-none">
          <span className="text-white">Tools</span>
          <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 bg-clip-text text-transparent">
            Jam
          </span>
        </span>
      </Link>
      <div className="hidden lg:flex items-center gap-3 overflow-x-auto">
        {categories.map((c) => {
          const Icon = ICONS[c.icon] ?? Ellipsis;
          return (
            <Link
              key={c.id}
              href={`/${locale}/${categorySlug(c.id, locale)}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all font-medium text-sm whitespace-nowrap"
            >
              <Icon className="w-4 h-4" />
              {t(c.id)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Logo() {
  return null;
}

const _ = {} as Record<CategoryId, true>;
