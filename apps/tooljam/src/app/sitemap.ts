import type { MetadataRoute } from "next";
import { categories, categorySlug } from "@/data/categories";
import { allTools } from "@/data/tools";
import { locales } from "@/i18n/locales";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const l of locales) {
    out.push({ url: `${SITE_URL}/${l}`, changeFrequency: "weekly", priority: 1 });
    for (const c of categories) {
      out.push({
        url: `${SITE_URL}/${l}/${categorySlug(c.id, l)}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }
  for (const t of allTools) {
    for (const l of locales) {
      out.push({
        url: `${SITE_URL}/${l}/${categorySlug(t.category, l)}/${t.slugs[l]}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return out;
}
