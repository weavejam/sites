"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StackResult {
  fullStacks: number;
  remainder: number;
  totalSlots: number;
  shulker?: {
    itemsPerShulker: number;
    fullShulkers: number;
    hasPartial: boolean;
    partialSlots: number;
    shulkerCapacity: number;
  };
  inventory?: {
    slotUtilisation: string;
    inventoryCapacity: number;
  };
}

function calcStacks(
  itemCount: number,
  itemsPerStack: number,
  shulkerBoxes: number | null,
  inventorySlots: number | null
): StackResult {
  const fullStacks = Math.floor(itemCount / itemsPerStack);
  const remainder = itemCount % itemsPerStack;
  const totalSlots = Math.ceil(itemCount / itemsPerStack);

  const result: StackResult = { fullStacks, remainder, totalSlots };

  if (shulkerBoxes !== null && shulkerBoxes > 0) {
    const itemsPerShulker = 27 * itemsPerStack;
    const fullShulkers = Math.floor(itemCount / itemsPerShulker);
    const leftoverItems = itemCount % itemsPerShulker;
    const hasPartial = leftoverItems > 0;
    const partialSlots = hasPartial ? Math.ceil(leftoverItems / itemsPerStack) : 0;
    const shulkerCapacity = shulkerBoxes * itemsPerShulker;
    result.shulker = {
      itemsPerShulker,
      fullShulkers,
      hasPartial,
      partialSlots,
      shulkerCapacity,
    };
  }

  if (inventorySlots !== null && inventorySlots > 0) {
    const inventoryCapacity = inventorySlots * itemsPerStack;
    const usedSlots = Math.min(totalSlots, inventorySlots);
    const pct = ((usedSlots / inventorySlots) * 100).toFixed(1);
    result.inventory = {
      slotUtilisation: `${pct}%`,
      inventoryCapacity,
    };
  }

  return result;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function MinecraftStackCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.minecraft-stack-calculator");

  const [itemCount, setItemCount] = React.useState("");
  const [itemsPerStack, setItemsPerStack] = React.useState("64");
  const [shulkerBoxes, setShulkerBoxes] = React.useState("");
  const [inventorySlots, setInventorySlots] = React.useState("");
  const [errors, setErrors] = React.useState<string[]>([]);
  const [result, setResult] = React.useState<StackResult | null>(null);

  function validate(): boolean {
    const errs: string[] = [];
    const ic = parseInt(itemCount, 10);
    const ips = parseInt(itemsPerStack, 10);
    const sb = shulkerBoxes !== "" ? parseInt(shulkerBoxes, 10) : null;
    const is = inventorySlots !== "" ? parseInt(inventorySlots, 10) : null;

    if (!Number.isFinite(ic) || ic <= 0) errs.push("invalidCount");
    if (!Number.isFinite(ips) || ips < 1 || ips > 64) errs.push("invalidStack");
    if (sb !== null && (!Number.isFinite(sb) || sb < 0)) errs.push("invalidShulker");
    if (is !== null && (!Number.isFinite(is) || is < 0)) errs.push("invalidSlots");

    setErrors([...new Set(errs)]);
    return errs.length === 0;
  }

  function handleCalculate() {
    if (!validate()) return;
    const ic = parseInt(itemCount, 10);
    const ips = parseInt(itemsPerStack, 10);
    const sb = shulkerBoxes !== "" ? parseInt(shulkerBoxes, 10) : null;
    const is = inventorySlots !== "" ? parseInt(inventorySlots, 10) : null;
    setResult(calcStacks(ic, ips, sb, is));
  }

  function handleReset() {
    setItemCount("");
    setItemsPerStack("64");
    setShulkerBoxes("");
    setInventorySlots("");
    setErrors([]);
    setResult(null);
  }

  function loadExample(ic: string, ips: string, sb?: string, is?: string) {
    setItemCount(ic);
    setItemsPerStack(ips);
    setShulkerBoxes(sb ?? "");
    setInventorySlots(is ?? "");
    setErrors([]);
    setResult(null);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "GameApplication",
        operatingSystem: "Any",
        description: t("tagline"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
        <p className="text-sm text-zinc-500">{t("intro")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="msc-ic">{t("field.itemCount")}</Label>
              <Input
                id="msc-ic"
                type="number"
                inputMode="numeric"
                value={itemCount}
                placeholder={t("placeholder.count")}
                onChange={(e) => { setItemCount(e.target.value); setResult(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msc-ips">{t("field.itemsPerStack")}</Label>
              <Input
                id="msc-ips"
                type="number"
                inputMode="numeric"
                value={itemsPerStack}
                placeholder={t("placeholder.stack")}
                min={1}
                max={64}
                onChange={(e) => { setItemsPerStack(e.target.value); setResult(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msc-sb">{t("field.shulkerBoxes")}</Label>
              <Input
                id="msc-sb"
                type="number"
                inputMode="numeric"
                value={shulkerBoxes}
                placeholder={t("placeholder.shulker")}
                onChange={(e) => { setShulkerBoxes(e.target.value); setResult(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msc-is">{t("field.inventorySlots")}</Label>
              <Input
                id="msc-is"
                type="number"
                inputMode="numeric"
                value={inventorySlots}
                placeholder={t("placeholder.slots")}
                onChange={(e) => { setInventorySlots(e.target.value); setResult(null); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleCalculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map((e) => (
                <p key={e} className="text-sm text-red-600">
                  {t(`error.${e}` as never)}
                </p>
              ))}
            </div>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-semibold text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 text-sm">
                <div className="grid grid-cols-2 gap-x-4">
                  <span className="text-zinc-600">{t("result.fullStacks")}</span>
                  <span className="font-semibold text-zinc-900">{result.fullStacks.toLocaleString("en-US")}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <span className="text-zinc-600">{t("result.remainder")}</span>
                  <span className="font-semibold text-zinc-900">{result.remainder.toLocaleString("en-US")}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <span className="text-zinc-600">{t("result.totalSlots")}</span>
                  <span className="font-semibold text-zinc-900">{result.totalSlots.toLocaleString("en-US")}</span>
                </div>
                {result.shulker && (
                  <>
                    <hr className="border-zinc-200" />
                    <div className="grid grid-cols-2 gap-x-4">
                      <span className="text-zinc-600">{t("result.itemsPerShulker")}</span>
                      <span className="font-semibold text-zinc-900">{result.shulker.itemsPerShulker.toLocaleString("en-US")}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <span className="text-zinc-600">{t("result.fullShulkers")}</span>
                      <span className="font-semibold text-zinc-900">{result.shulker.fullShulkers.toLocaleString("en-US")}</span>
                    </div>
                    {result.shulker.hasPartial && (
                      <div className="grid grid-cols-2 gap-x-4">
                        <span className="text-zinc-600">{t("result.partialShulker")}</span>
                        <span className="font-semibold text-zinc-900">1 ({t("result.partialSlots", { n: result.shulker.partialSlots })})</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-x-4">
                      <span className="text-zinc-600">{t("result.shulkerCapacity")}</span>
                      <span className="font-semibold text-zinc-900">{result.shulker.shulkerCapacity.toLocaleString("en-US")}</span>
                    </div>
                  </>
                )}
                {result.inventory && (
                  <>
                    <hr className="border-zinc-200" />
                    <div className="grid grid-cols-2 gap-x-4">
                      <span className="text-zinc-600">{t("result.inventoryCapacity")}</span>
                      <span className="font-semibold text-zinc-900">{result.inventory.inventoryCapacity.toLocaleString("en-US")}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <span className="text-zinc-600">{t("result.slotUtilisation")}</span>
                      <span className="font-semibold text-zinc-900">{result.inventory.slotUtilisation}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("about.heading")}
        </h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("examples.heading")}
        </h2>
        <p className="text-zinc-600">{t("examples.intro")}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-3 py-2 font-semibold">{t("examples.colInput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colOutput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colNote")}</th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1000", "64")}>
            {t("examples.loadBasic")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("500", "16", "3")}>
            {t("examples.loadEnderPearl")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("10000", "64", "10", "36")}>
            {t("examples.loadLarge")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
