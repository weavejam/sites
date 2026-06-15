import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { buildAlternates } from "@/components/seo/alternates";
import {
  categories,
  categoryFromSlug,
  categorySlug,
} from "@/data/categories";
import { allTools, toolsByCategory } from "@/data/tools";
import { isLocale, locales, type Locale } from "@/i18n/locales";

export const dynamicParams = false;

// Build-time check: webpack eagerly resolves the dynamic import in
// loadToolMessages, so any tool present in the data registry but missing
// messages/tool/<id>/en.json (e.g. a half-ported tool) breaks `next build`.
// We filter generateStaticParams to only emit pages for tools that have an
// English messages file on disk.
function hasMessages(id: string): boolean {
  return existsSync(
    path.join(process.cwd(), "messages", "tool", id, "en.json"),
  );
}

export function generateStaticParams() {
  const out: { locale: string; category: string; slug: string }[] = [];
  for (const l of locales) {
    for (const c of categories) {
      for (const t of toolsByCategory[c.id]) {
        if (!hasMessages(t.id)) continue;
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

  // Load only this tool's messages (~8 KB) and wrap the tool subtree in a
  // nested NextIntlClientProvider.  The shared messages from the layout's
  // provider stay in scope above this subtree — nothing in the Tool component
  // tree uses shared keys, so the nested provider doesn't need to merge them.
  const toolMessages = await loadToolMessages(tool.id, typed);
  const messages: AbstractIntlMessages = {
    tool: { [tool.id]: toolMessages },
  };
  return (
    <NextIntlClientProvider locale={typed} messages={messages}>
      <Component locale={typed} />
    </NextIntlClientProvider>
  );
}

async function loadToolMessages(
  id: string,
  locale: Locale,
): Promise<AbstractIntlMessages> {
  try {
    return (
      await import(`../../../../../messages/tool/${id}/${locale}.json`)
    ).default as AbstractIntlMessages;
  } catch {
    // Fall back to English if the locale file is missing (mid-translation
    // tools may not have all 10 locales yet).
    return (
      await import(`../../../../../messages/tool/${id}/en.json`)
    ).default as AbstractIntlMessages;
  }
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
