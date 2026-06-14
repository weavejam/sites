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

function parseNumbers(s: string): number[] {
  return s
    .split(/[\s,;\n]+/)
    .map((v) => v.trim())
    .filter((v) => v !== "")
    .map(Number)
    .filter((v) => Number.isFinite(v));
}

interface SEMResult {
  n: number;
  mean: number;
  variance: number;
  sd: number;
  sem: number;
}

function computeSEM(nums: number[]): SEMResult | null {
  const n = nums.length;
  if (n < 2) return null;
  const mean = nums.reduce((a, b) => a + b, 0) / n;
  const sumSqDiff = nums.reduce((a, v) => a + (v - mean) ** 2, 0);
  const variance = sumSqDiff / (n - 1);
  const sd = Math.sqrt(variance);
  const sem = sd / Math.sqrt(n);
  return { n, mean, variance, sd, sem };
}

function fmt(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function StandardDeviationOfSampleMeanCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations(
    "tool.standard-deviation-of-sample-mean-calculator"
  );

  const [dataStr, setDataStr] = React.useState("");
  const [calculated, setCalculated] = React.useState(false);

  const nums = React.useMemo(() => parseNumbers(dataStr), [dataStr]);
  const valid = nums.length >= 2;

  const result = React.useMemo<SEMResult | null>(() => {
    if (!valid) return null;
    return computeSEM(nums);
  }, [valid, nums]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  function reset() {
    setDataStr("");
    setCalculated(false);
  }

  function loadExample(data: string) {
    setDataStr(data);
    setCalculated(true);
  }

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
            <Label htmlFor="sdsm-data">{t("field.data")}</Label>
            <textarea
              id="sdsm-data"
              className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex min-h-[6rem] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-24"
              value={dataStr}
              placeholder={t("placeholder.data")}
              onChange={(e) => {
                setDataStr(e.target.value);
                setCalculated(false);
              }}
            />
            <p className="text-xs text-zinc-500">{t("field.dataHint")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setCalculated(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {calculated && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {calculated && valid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-800">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 text-sm">
                {(
                  [
                    ["result.n", result.n],
                    ["result.mean", result.mean],
                    ["result.variance", result.variance],
                    ["result.sd", result.sd],
                    ["result.sem", result.sem],
                  ] as [string, number][]
                ).map(([key, val]) => (
                  <div
                    key={key}
                    className="rounded border border-zinc-200 bg-white p-3"
                  >
                    <div className="text-xs text-zinc-500">{t(key as never)}</div>
                    <div className="text-lg font-semibold">{fmt(val)}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("85, 92, 78, 88, 90")}
            >
              {t("examples.loadScores")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                loadExample("5.01, 4.98, 5.03, 4.99, 5.00")
              }
            >
              {t("examples.loadBearing")}
            </Button>
          </div>
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
