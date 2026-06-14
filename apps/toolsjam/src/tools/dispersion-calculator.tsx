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

interface DispersionResult {
  count: number;
  mean: number;
  median: number;
  range: number;
  sampleVariance: number;
  populationVariance: number;
  sampleStdDev: number;
  populationStdDev: number;
  q1: number;
  q3: number;
  iqr: number;
  cv: number;
  mad: number;
}

function fmt(n: number, dp = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(dp);
}

function parseNumbers(text: string): number[] {
  return text
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => Number.isFinite(n));
}

function percentile(sorted: number[], p: number): number {
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

function computeDispersion(values: number[]): DispersionResult | null {
  const n = values.length;
  if (n < 2) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const median = percentile(sorted, 50);
  const range = sorted[n - 1] - sorted[0];
  const ss = values.reduce((a, b) => a + (b - mean) ** 2, 0);
  const sampleVariance = ss / (n - 1);
  const populationVariance = ss / n;
  const sampleStdDev = Math.sqrt(sampleVariance);
  const populationStdDev = Math.sqrt(populationVariance);
  const q1 = percentile(sorted, 25);
  const q3 = percentile(sorted, 75);
  const iqr = q3 - q1;
  const cv = mean !== 0 ? (sampleStdDev / Math.abs(mean)) * 100 : NaN;
  const diffs = values.map((v) => Math.abs(v - median)).sort((a, b) => a - b);
  const mad = percentile(diffs, 50);
  return {
    count: n,
    mean,
    median,
    range,
    sampleVariance,
    populationVariance,
    sampleStdDev,
    populationStdDev,
    q1,
    q3,
    iqr,
    cv,
    mad,
  };
}

export default function DispersionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dispersion-calculator");
  const [data, setData] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const values = React.useMemo(() => parseNumbers(data), [data]);
  const result = React.useMemo(
    () => (touched && values.length >= 2 ? computeDispersion(values) : null),
    [touched, values]
  );

  const showError = touched && values.length < 2;

  function loadExample(d: string) {
    setData(d);
    setTouched(true);
  }

  function reset() {
    setData("");
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
            <Label htmlFor="disp-data">{t("field.data")}</Label>
            <textarea
              id="disp-data"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm resize-y"
              value={data}
              placeholder={t("placeholder.data")}
              onChange={(e) => {
                setData(e.target.value);
                setTouched(false);
              }}
            />
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500 mb-3">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.count")}</div>
                  <div className="font-semibold">{result.count}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.mean")}</div>
                  <div className="font-semibold">{fmt(result.mean)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.median")}</div>
                  <div className="font-semibold">{fmt(result.median)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.range")}</div>
                  <div className="font-semibold">{fmt(result.range)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.sampleVariance")}</div>
                  <div className="font-semibold">{fmt(result.sampleVariance)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.populationVariance")}</div>
                  <div className="font-semibold">{fmt(result.populationVariance)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.sampleStdDev")}</div>
                  <div className="font-semibold">{fmt(result.sampleStdDev)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.populationStdDev")}</div>
                  <div className="font-semibold">{fmt(result.populationStdDev)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.q1")}</div>
                  <div className="font-semibold">{fmt(result.q1)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.q3")}</div>
                  <div className="font-semibold">{fmt(result.q3)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.iqr")}</div>
                  <div className="font-semibold">{fmt(result.iqr)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.cv")}</div>
                  <div className="font-semibold">{Number.isFinite(result.cv) ? fmt(result.cv, 2) + "%" : "—"}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.mad")}</div>
                  <div className="font-semibold">{fmt(result.mad)}</div>
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
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
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
            onClick={() => loadExample("85, 92, 78, 88, 76, 95, 89, 72")}
          >
            {t("examples.loadScores")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1.2, -0.5, 2.1, 0.8, -1.9, 1.5, 2.5, -0.2, 0.3, 1.7, -1.1, 2.3")}
          >
            {t("examples.loadStocks")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("502, 499, 505, 498, 501, 503, 497, 500")}
          >
            {t("examples.loadQuality")}
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
