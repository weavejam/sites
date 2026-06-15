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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number, decimals = 1): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

export default function PalletCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pallet-calculator");

  const [palletLength, setPalletLength] = React.useState("");
  const [palletWidth, setPalletWidth] = React.useState("");
  const [boxLength, setBoxLength] = React.useState("");
  const [boxWidth, setBoxWidth] = React.useState("");
  const [boxHeight, setBoxHeight] = React.useState("");
  const [maxStackHeight, setMaxStackHeight] = React.useState("");
  const [boxWeight, setBoxWeight] = React.useState("");
  const [maxPalletWeight, setMaxPalletWeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const plNum = parseFloat(palletLength);
  const pwNum = parseFloat(palletWidth);
  const blNum = parseFloat(boxLength);
  const bwNum = parseFloat(boxWidth);
  const bhNum = parseFloat(boxHeight);
  const mshNum = parseFloat(maxStackHeight);
  const bwtNum = parseFloat(boxWeight);
  const mpwNum = parseFloat(maxPalletWeight);

  const isPositive = (n: number) => Number.isFinite(n) && n > 0;

  const dimValid =
    isPositive(plNum) &&
    isPositive(pwNum) &&
    isPositive(blNum) &&
    isPositive(bwNum) &&
    isPositive(bhNum) &&
    isPositive(mshNum);

  const weightValid = isPositive(bwtNum) && isPositive(mpwNum);
  const allValid = dimValid && weightValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    if (blNum > plNum || bwNum > pwNum) return { error: "boxTooLarge" as const };

    const boxesPerLayerL = Math.floor(plNum / blNum);
    const boxesPerLayerW = Math.floor(pwNum / bwNum);
    const boxesPerLayer = boxesPerLayerL * boxesPerLayerW;

    if (boxesPerLayer === 0) return { error: "boxTooLarge" as const };

    const maxLayersByHeight = Math.floor(mshNum / bhNum);
    const maxBoxesByWeight = Math.floor(mpwNum / bwtNum);
    const maxLayersByWeight = Math.floor(maxBoxesByWeight / boxesPerLayer);

    const totalLayers = Math.min(maxLayersByHeight, maxLayersByWeight);
    const totalBoxes = boxesPerLayer * totalLayers;
    const totalWeight = totalBoxes * bwtNum;
    const palletArea = plNum * pwNum;
    const boxFootprint = blNum * bwNum;
    const utilizationPercent =
      palletArea > 0
        ? Math.min(100, (boxFootprint * boxesPerLayer) / palletArea) * 100
        : 0;

    return {
      boxesPerLayer,
      maxLayersByHeight,
      maxLayersByWeight,
      totalLayers,
      totalBoxes,
      totalWeight,
      palletArea,
      utilizationPercent,
    };
  }, [allValid, plNum, pwNum, blNum, bwNum, bhNum, mshNum, bwtNum, mpwNum]);

  function reset() {
    setPalletLength("");
    setPalletWidth("");
    setBoxLength("");
    setBoxWidth("");
    setBoxHeight("");
    setMaxStackHeight("");
    setBoxWeight("");
    setMaxPalletWeight("");
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
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
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
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const showError = touched && !allValid;

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
              <Label htmlFor="pc-pallet-l">{t("field.palletLength")}</Label>
              <Input
                id="pc-pallet-l"
                type="number"
                inputMode="decimal"
                value={palletLength}
                placeholder={t("field.placeholder.palletLength")}
                onChange={(e) => { setPalletLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-pallet-w">{t("field.palletWidth")}</Label>
              <Input
                id="pc-pallet-w"
                type="number"
                inputMode="decimal"
                value={palletWidth}
                placeholder={t("field.placeholder.palletWidth")}
                onChange={(e) => { setPalletWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-box-l">{t("field.boxLength")}</Label>
              <Input
                id="pc-box-l"
                type="number"
                inputMode="decimal"
                value={boxLength}
                placeholder={t("field.placeholder.boxLength")}
                onChange={(e) => { setBoxLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-box-w">{t("field.boxWidth")}</Label>
              <Input
                id="pc-box-w"
                type="number"
                inputMode="decimal"
                value={boxWidth}
                placeholder={t("field.placeholder.boxWidth")}
                onChange={(e) => { setBoxWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-box-h">{t("field.boxHeight")}</Label>
              <Input
                id="pc-box-h"
                type="number"
                inputMode="decimal"
                value={boxHeight}
                placeholder={t("field.placeholder.boxHeight")}
                onChange={(e) => { setBoxHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-max-h">{t("field.maxStackHeight")}</Label>
              <Input
                id="pc-max-h"
                type="number"
                inputMode="decimal"
                value={maxStackHeight}
                placeholder={t("field.placeholder.maxStackHeight")}
                onChange={(e) => { setMaxStackHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-box-wt">{t("field.boxWeight")}</Label>
              <Input
                id="pc-box-wt"
                type="number"
                inputMode="decimal"
                value={boxWeight}
                placeholder={t("field.placeholder.boxWeight")}
                onChange={(e) => { setBoxWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-max-wt">{t("field.maxPalletWeight")}</Label>
              <Input
                id="pc-max-wt"
                type="number"
                inputMode="decimal"
                value={maxPalletWeight}
                placeholder={t("field.placeholder.maxPalletWeight")}
                onChange={(e) => { setMaxPalletWeight(e.target.value); setTouched(true); }}
              />
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && "error" in result && (
            <p className="text-sm text-red-600">{t("error.boxTooLarge")}</p>
          )}

          {touched && result !== null && !("error" in result) && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.boxesPerLayer")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.boxesPerLayer}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalLayers")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.totalLayers}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalBoxes")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.totalBoxes}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalWeight")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.totalWeight, 0)} {t("result.weightUnit")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.maxLayersHeight")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.maxLayersByHeight}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.maxLayersWeight")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.maxLayersByWeight}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.palletArea")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNum(result.palletArea, 0)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.spaceUtilization")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNum(result.utilizationPercent, 1)}%
                  </div>
                </div>
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
