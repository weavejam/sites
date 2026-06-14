"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
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

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map(parseFloat)
    .filter((n) => Number.isFinite(n));
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
}

interface PopVarResult {
  count: number;
  sum: number;
  mean: number;
  variance: number;
  stdDev: number;
  min: number;
  max: number;
  range: number;
}

function computePopVariance(nums: number[]): PopVarResult {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const variance = nums.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);
  const sorted = [...nums].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[n - 1];
  return { count: n, sum, mean, variance, stdDev, min, max, range: max - min };
}

export default function PopulationVarianceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.population-variance-calculator");

  const [numbersText, setNumbersText] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const numbers = React.useMemo(
    () => parseNumbers(numbersText),
    [numbersText]
  );
  const hasEnough = numbers.length >= 1;

  const result: PopVarResult | null = React.useMemo(() => {
    if (!touched || !hasEnough) return null;
    return computePopVariance(numbers);
  }, [touched, hasEnough, numbers]);

  function reset() {
    setNumbersText("");
    setTouched(false);
  }

  function loadExample(vals: string) {
    setNumbersText(vals);
    setTouched(true);
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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
    }
    return arr;
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

  const resultRows: [string, number][] = result
    ? [
        ["result.count", result.count],
        ["result.sum", result.sum],
        ["result.mean", result.mean],
        ["result.variance", result.variance],
        ["result.stdDev", result.stdDev],
        ["result.min", result.min],
        ["result.max", result.max],
        ["result.range", result.range],
      ]
    : [];

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
          <div className="space-y-2">
            <Label htmlFor="pvc-numbers">{t("field.dataSet")}</Label>
            <textarea
              id="pvc-numbers"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px] font-mono"
              value={numbersText}
              placeholder={t("placeholder.numbers")}
              onChange={(e) => {
                setNumbersText(e.target.value);
                setTouched(false);
              }}
            />
            <p className="text-xs text-zinc-500">
              {t("field.dataSetHint")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("2, 4, 4, 4, 5, 5, 7, 9")}
            >
              {t("examples.loadSample1")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("10, 20, 30, 40, 50")}
            >
              {t("examples.loadSample2")}
            </Button>
          </div>

          {touched && !hasEnough && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {resultRows.map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between rounded border border-zinc-200 bg-white px-3 py-2"
                  >
                    <span className="text-sm text-zinc-600">
                      {t(key as never)}
                    </span>
                    <span className="font-semibold text-zinc-900">
                      {fmt(val)}
                    </span>
                  </div>
                ))}
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
