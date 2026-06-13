import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { buildAlternates } from "@/components/seo/alternates";
import {
  categories,
  categoryFromSlug,
  categorySlug,
} from "@/data/categories";
import { allTools, toolsByCategory } from "@/data/tools";
import { isLocale, locales, type Locale } from "@/i18n/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  const out: { locale: string; category: string; slug: string }[] = [];
  for (const l of locales) {
    for (const c of categories) {
      for (const t of toolsByCategory[c.id]) {
        out.push({ locale: l, category: c.slugs[l], slug: t.slugs[l] });
      }
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  if (!isLocale(locale)) return {};
  const typed = locale as Locale;
  const cat = categoryFromSlug(category, typed);
  if (!cat) return {};
  const tool = allTools.find(
    (x) => x.category === cat.id && x.slugs[typed] === slug,
  );
  if (!tool) return {};
  const pathByLocale: Partial<Record<Locale, string>> = {};
  for (const l of locales) {
    pathByLocale[l] = `/${categorySlug(cat.id, l)}/${tool.slugs[l]}`;
  }
  return {
    title: tool.titles[typed],
    description: tool.descriptions[typed],
    alternates: buildAlternates({ pathByLocale, currentLocale: typed }),
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const typed = locale as Locale;
  const cat = categoryFromSlug(category, typed);
  if (!cat) notFound();
  const tool = allTools.find(
    (x) => x.category === cat.id && x.slugs[typed] === slug,
  );
  if (!tool) notFound();

  const Component = await loadToolComponent(tool.id);
  if (!Component) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center text-zinc-500">
        This tool is being prepared. Check back soon.
      </div>
    );
  }
  return <Component locale={typed} />;
}

async function loadToolComponent(
  id: string,
): Promise<((props: { locale: Locale }) => React.ReactNode) | null> {
  try {
    const mod = await import(`@/tools/${id}`);
    return mod.default ?? null;
  } catch {
    return null;
  }
}
