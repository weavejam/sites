// Generic Playwright e2e: for every registered tool, navigate to its
// English URL and run each fixture against the rendered page. Also asserts
// JSON-LD presence and hreflang tags for SEO health.
//
// Runs against the static export (next build && next export) on port 3100
// (see playwright.config.ts). The static export is the actual artifact we
// ship to Azure Storage, so this catches deploy-time issues that dev mode
// hides.

import { test, expect, type Page } from "@playwright/test";
import { allTools } from "../src/data/tools";
import { categorySlug } from "../src/data/categories";
import { fixturesByTool } from "../src/tools/_fixtures-barrel";
import type { FixtureAction } from "../src/tools/fixture";

const LOCALE = "en";

// next-intl logs MISSING_MESSAGE to console.error when a component probes a
// translation key that doesn't exist (some components use this pattern to
// auto-discover how many howto/faq entries are configured). It is not a
// shipping bug, but the SEO reviewer should still recommend a cleanup pass.
const IGNORE_ERROR_PATTERNS = [/MISSING_MESSAGE/];

async function applyAction(page: Page, action: FixtureAction) {
  if (action.kind === "click") {
    await page.getByRole("button", { name: action.label }).first().click();
  } else {
    await page.getByLabel(action.label, { exact: typeof action.label === "string" }).fill(action.value);
  }
}

for (const tool of allTools) {
  const cat = categorySlug(tool.category, LOCALE);
  const slug = tool.slugs[LOCALE];
  if (!cat || !slug) continue;
  const url = `/${LOCALE}/${cat}/${slug}/`;
  const fixtures = fixturesByTool[tool.id];

  test.describe(`${tool.id}`, () => {
    test(`shell: ${url} renders with SEO basics`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
      page.on("console", (msg) => {
        if (msg.type() !== "error") return;
        const text = msg.text();
        if (IGNORE_ERROR_PATTERNS.some((re) => re.test(text))) return;
        errors.push(`console.error: ${text}`);
      });
      await page.goto(url);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator("h1")).toHaveCount(1);
      const ldCount = await page.locator('script[type="application/ld+json"]').count();
      expect(ldCount).toBeGreaterThan(0);
      const hreflangs = await page.locator('link[rel="alternate"][hreflang]').count();
      expect(hreflangs).toBeGreaterThanOrEqual(2);
      expect(errors, errors.join("\n")).toEqual([]);
    });

    test(`fixtures: ${url}`, async ({ page }) => {
      if (!fixtures || fixtures.length === 0) {
        test.skip(true, `no fixtures for ${tool.id}`);
        return;
      }
      for (const fx of fixtures) {
        await page.goto(url);
        for (const action of fx.actions) await applyAction(page, action);
        const texts = Array.isArray(fx.expect.text) ? fx.expect.text : fx.expect.text != null ? [fx.expect.text] : [];
        const notTexts = Array.isArray(fx.expect.notText) ? fx.expect.notText : fx.expect.notText != null ? [fx.expect.notText] : [];
        for (const needle of texts as (string | RegExp)[]) {
          await expect(page.locator("body")).toContainText(needle);
        }
        for (const needle of notTexts as (string | RegExp)[]) {
          await expect(page.locator("body")).not.toContainText(needle);
        }
      }
    });
  });
}
