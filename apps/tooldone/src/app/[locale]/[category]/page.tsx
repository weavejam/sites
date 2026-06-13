import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { buildAlternates } from "@/components/seo/alternates";
import {
  categories,
  categoryFromSlug,
  categorySlug,
  type CategoryId,
} from "@/data/categories";
import { toolsByCategory } from "@/data/tools";
import { isLocale, locales, type Locale } from "@/i18n/locales";

export function generateStaticParams() {
  const out: { locale: string; category: string }[] = [];
  for (const l of locales) {
    for (const c of categories) out.push({ locale: l, category: c.slugs[l] });
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale)) return {};
  const typed = locale as Locale;
  const cat = categoryFromSlug(category, typed);
  if (!cat) return {};
  const tc = await getTranslations({ locale: typed, namespace: "category" });
  const title = tc(cat.id);
  const description = tc(`${cat.id}_desc`);
  const pathByLocale: Partial<Record<Locale, string>> = {};
  for (const l of locales) pathByLocale[l] = `/${categorySlug(cat.id, l)}`;
  return {
    title,
    description,
    alternates: buildAlternates({ pathByLocale, currentLocale: typed }),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const typed = locale as Locale;
  const cat = categoryFromSlug(category, typed);
  if (!cat) notFound();
  const tc = await getTranslations("category");
  const tools = toolsByCategory[cat.id as CategoryId] ?? [];
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 w-full">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{tc(cat.id)}</h1>
        <p className="text-zinc-600 max-w-3xl">{tc(`${cat.id}_desc`)}</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/${typed}/${categorySlug(cat.id, typed)}/${tool.slugs[typed]}`}
            className="block group"
          >
            <Card className="h-full group-hover:shadow-md group-hover:border-zinc-400 transition-all">
              <CardContent className="p-5">
                <CardTitle className="text-base mb-1">{tool.titles[typed]}</CardTitle>
                <CardDescription className="line-clamp-3">{tool.descriptions[typed]}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
        {tools.length === 0 && (
          <p className="col-span-full text-center text-zinc-500 py-12">No tools yet.</p>
        )}
      </div>
    </div>
  );
}
