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

type ExampleItem = {
  input: string;
  output: string;
  note?: string;
};

const GEMSTONES = [
  "diamond",
  "ruby",
  "sapphire",
  "emerald",
  "amethyst",
  "topaz",
  "garnet",
  "peridot",
  "aquamarine",
  "tanzanite",
  "opal",
  "pearl",
] as const;

type GemstoneKey = (typeof GEMSTONES)[number];

const SPECIFIC_GRAVITY: Record<GemstoneKey, number> = {
  diamond: 3.52,
  ruby: 4.0,
  sapphire: 4.0,
  emerald: 2.7,
  amethyst: 2.65,
  topaz: 3.53,
  garnet: 3.8,
  peridot: 3.34,
  aquamarine: 2.72,
  tanzanite: 3.35,
  opal: 2.15,
  pearl: 2.71,
};

function formatFixed(value: number, digits: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function MmToCaratConversion(_props: { locale: Locale }) {
  const t = useTranslations("tool.mm-to-carat-conversion");
  const [length, setLength] = React.useState("");
  const [width, setWidth] = React.useState("");
  const [depth, setDepth] = React.useState("");
  const [gemstone, setGemstone] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const lengthNum = parseFloat(length);
  const widthNum = parseFloat(width);
  const depthNum = parseFloat(depth);

  const dimensionsValid =
    length !== "" &&
    width !== "" &&
    depth !== "" &&
    Number.isFinite(lengthNum) &&
    Number.isFinite(widthNum) &&
    Number.isFinite(depthNum) &&
    lengthNum > 0 &&
    widthNum > 0 &&
    depthNum > 0;
  const gemstoneValid = GEMSTONES.includes(gemstone as GemstoneKey);

  const result = React.useMemo(() => {
    if (!dimensionsValid || !gemstoneValid) return null;
    const selectedGemstone = gemstone as GemstoneKey;
    const specificGravity = SPECIFIC_GRAVITY[selectedGemstone] ?? 3.5;
    const volume = lengthNum * widthNum * depthNum;
    const caratWeight = (volume * specificGravity) / 1000;
    return {
      volume,
      caratWeight,
      lowRange: caratWeight * 0.9,
      highRange: caratWeight * 1.1,
      specificGravity,
      selectedGemstone,
    };
  }, [depthNum, dimensionsValid, gemstone, gemstoneValid, lengthNum, widthNum]);

  function loadExample(
    nextLength: string,
    nextWidth: string,
    nextDepth: string,
    nextGemstone: GemstoneKey
  ) {
    setLength(nextLength);
    setWidth(nextWidth);
    setDepth(nextDepth);
    setGemstone(nextGemstone);
    setTouched(true);
  }

  function reset() {
    setLength("");
    setWidth("");
    setDepth("");
    setGemstone("");
    setTouched(false);
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
    const items: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(("faq.q" + i) as never);
        const a = t(("faq.q" + i + "_a") as never);
        if (q && a && !q.startsWith("tool.")) items.push({ q, a });
      } catch {
        break;
      }
    }
    return items;
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: t("tagline"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const showError = touched && (!dimensionsValid || !gemstoneValid);

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
              <Label htmlFor="mm-length">{t("field.length")}</Label>
              <Input
                id="mm-length"
                type="number"
                inputMode="decimal"
                value={length}
                placeholder={t("placeholder.length")}
                onChange={(event) => {
                  setLength(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mm-width">{t("field.width")}</Label>
              <Input
                id="mm-width"
                type="number"
                inputMode="decimal"
                value={width}
                placeholder={t("placeholder.width")}
                onChange={(event) => {
                  setWidth(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mm-depth">{t("field.depth")}</Label>
              <Input
                id="mm-depth"
                type="number"
                inputMode="decimal"
                value={depth}
                placeholder={t("placeholder.depth")}
                onChange={(event) => {
                  setDepth(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mm-gemstone">{t("field.gemstone")}</Label>
              <select
                id="mm-gemstone"
                value={gemstone}
                onChange={(event) => {
                  setGemstone(event.target.value);
                  setTouched(true);
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">{t("field.gemstonePlaceholder")}</option>
                {GEMSTONES.map((item) => (
                  <option key={item} value={item}>
                    {t(("gemstone." + item) as never)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && touched && (
            <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.weight", { value: formatFixed(result.caratWeight, 4) })}
              </div>
              <p className="text-sm text-zinc-600">
                {t("result.volume", { value: formatFixed(result.volume, 2) })}
              </p>
              <p className="text-sm text-zinc-600">
                {t("result.range", {
                  low: formatFixed(result.lowRange, 4),
                  high: formatFixed(result.highRange, 4),
                })}
              </p>
              <p className="text-xs text-zinc-500">
                {t("result.gemstone", {
                  name: t(("gemstone." + result.selectedGemstone) as never),
                  sg: formatFixed(result.specificGravity, 2),
                })}
              </p>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("6", "6", "4", "diamond")}
          >
            {t("examples.loadDiamond")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("5", "5", "4", "ruby")}
          >
            {t("examples.loadRuby")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("7", "5", "3", "emerald")}
          >
            {t("examples.loadEmerald")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
