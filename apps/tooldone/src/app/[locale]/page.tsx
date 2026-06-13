import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
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
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { categories, categorySlug } from "@/data/categories";
import { isLocale, type Locale } from "@/i18n/locales";
import { notFound } from "next/navigation";

const ICONS: Record<string, LucideIcon> = {
  Calculator, Zap, TestTube, Leaf, ChartColumn, DollarSign, Heart, ArrowLeftRight, Hammer, Ellipsis,
};

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("category");
  const typed = locale as Locale;
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 w-full">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
        <p className="text-zinc-600 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        <p className="text-zinc-500 mt-4 max-w-3xl mx-auto">{t("description")}</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => {
          const Icon = ICONS[c.icon] ?? Ellipsis;
          return (
            <Link key={c.id} href={`/${typed}/${categorySlug(c.id, typed)}`} className="block group">
              <Card className="h-full transition-all group-hover:shadow-md group-hover:border-zinc-400">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <Icon className="w-10 h-10 text-zinc-700" />
                  <CardTitle>{tc(c.id)}</CardTitle>
                  <CardDescription>{tc(`${c.id}_desc`)}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
