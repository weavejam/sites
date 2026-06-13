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

type CalcType = "sample" | "population";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface StatsResult {
  count: number;
  sum: number;
  mean: number;
  variance: number;
  stdDev: number;
  min: number;
  max: number;
}

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => Number.isFinite(n));
}

function computeStats(values: number[], type: CalcType): StatsResult | null {
  const n = values.length;
  if (n === 0) return null;
  if (type === "sample" && n < 2) return null;
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const ss = values.reduce((a, b) => a + (b - mean) * (b - mean), 0);
  const divisor = type === "sample" ? n - 1 : n;
  const variance = ss / divisor;
  return {
    count: n,
    sum,
    mean,
    variance,
    stdDev: Math.sqrt(variance),
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function StandardDeviationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.standard-deviation-calculator");
  const [data, setData] = React.useState("");
  const [type, setType] = React.useState<CalcType>("sample");
  const [touched, setTouched] = React.useState(false);

  const values = React.useMemo(() => parseNumbers(data), [data]);
  const result = React.useMemo<StatsResult | null>(() => {
    return computeStats(values, type);
  }, [values, type]);

  function reset() {
    setData("");
    setTouched(false);
  }

  function loadExample(t2: CalcType, values2: string) {
    setType(t2);
    setData(values2);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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

  const showError = touched && result === null;

  const resultRows: { label: string; value: string }[] = result
    ? [
        { label: t("result.stdDev"), value: fmt(result.stdDev) },
        { label: t("result.variance"), value: fmt(result.variance) },
        { label: t("result.mean"), value: fmt(result.mean) },
        { label: t("result.count"), value: fmt(result.count) },
        { label: t("result.sum"), value: fmt(result.sum) },
        { label: t("result.min"), value: fmt(result.min) },
        { label: t("result.max"), value: fmt(result.max) },
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
            <Label htmlFor="sd-data">{t("field.data")}</Label>
            <textarea
              id="sd-data"
              className="border-input flex min-h-[100px] w-full rounded-md border bg-transparent px-3 py-2 font-mono text-sm shadow-xs outline-none focus-visible:border-zinc-400 focus-visible:ring-[3px] focus-visible:ring-zinc-200"
              value={data}
              placeholder={t("placeholder.data")}
              onChange={(e) => {
                setData(e.target.value);
                setTouched(true);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["sample", "population"] as CalcType[]).map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={type === ct ? "default" : "outline"}
                  onClick={() => {
                    setType(ct);
                    setTouched(true);
                  }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
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

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {resultRows.map((row, i) => (
                  <div key={i}>
                    <div className="text-xs text-zinc-500">{row.label}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
            onClick={() => loadExample("sample", "85, 92, 78, 88, 94")}
          >
            {t("examples.loadScores")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("population", "25, 30, 32, 45, 28, 38, 41")
            }
          >
            {t("examples.loadAges")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("sample", "15.5, 17.2, 14.8, 16.5, 18.1, 13.9, 15.7")
            }
          >
            {t("examples.loadTemps")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
