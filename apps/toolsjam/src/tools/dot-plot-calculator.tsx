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

interface DotPlotResult {
  values: number[];
  sorted: number[];
  freqMap: Map<number, number>;
  mean: number;
  median: number;
  mode: number[];
  range: number;
  min: number;
  max: number;
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

function computeDotPlot(values: number[]): DotPlotResult | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;
  const median = percentile(sorted, 50);
  const freqMap = new Map<number, number>();
  for (const v of values) freqMap.set(v, (freqMap.get(v) ?? 0) + 1);
  const maxFreq = Math.max(...freqMap.values());
  const mode = [...freqMap.entries()]
    .filter(([, c]) => c === maxFreq)
    .map(([v]) => v)
    .sort((a, b) => a - b);
  return {
    values,
    sorted,
    freqMap,
    mean,
    median,
    mode,
    range: sorted[sorted.length - 1] - sorted[0],
    min: sorted[0],
    max: sorted[sorted.length - 1],
  };
}

/** Render a text-based dot plot as rows of dots stacked above each x value */
function DotPlotViz({
  result,
  tooManyMsg,
  rangeLabel,
}: {
  result: DotPlotResult;
  tooManyMsg: (count: number) => string;
  rangeLabel: (min: number, max: number) => string;
}) {
  const { freqMap, min, max } = result;
  // Use a reasonable step to avoid too many columns
  const uniqueVals = [...freqMap.keys()].sort((a, b) => a - b);
  const maxCount = Math.max(...freqMap.values());

  const colWidth = 4;
  const cols = uniqueVals.map((v) => ({
    value: v,
    count: freqMap.get(v) ?? 0,
  }));

  const rows: React.ReactNode[] = [];
  for (let row = maxCount; row >= 1; row--) {
    rows.push(
      <div key={row} className="flex">
        {cols.map((col, ci) => (
          <div
            key={ci}
            className="text-center"
            style={{ width: `${colWidth}ch`, minWidth: `${colWidth}ch` }}
          >
            {col.count >= row ? (
              <span className="text-blue-600 font-bold">●</span>
            ) : (
              <span> </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // x-axis labels
  const xAxis = (
    <div className="flex border-t border-zinc-400 mt-1">
      {cols.map((col, ci) => (
        <div
          key={ci}
          className="text-center text-xs text-zinc-700 overflow-hidden"
          style={{ width: `${colWidth}ch`, minWidth: `${colWidth}ch` }}
        >
          {col.value}
        </div>
      ))}
    </div>
  );

  // If too many unique values, show a message instead
  if (uniqueVals.length > 40) {
    return (
      <div className="text-sm text-zinc-500 italic">
        {tooManyMsg(uniqueVals.length)}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto font-mono text-sm leading-5">
      {rows}
      {xAxis}
      <div className="text-xs text-zinc-500 mt-1">
        {rangeLabel(min, max)}
      </div>
    </div>
  );
}

export default function DotPlotCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dot-plot-calculator");
  const [data, setData] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const values = React.useMemo(() => parseNumbers(data), [data]);
  const result = React.useMemo(
    () => (touched && values.length > 0 ? computeDotPlot(values) : null),
    [touched, values]
  );

  const showError = touched && values.length === 0;

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
            <Label htmlFor="dp-data">{t("field.data")}</Label>
            <textarea
              id="dp-data"
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
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500 mb-3">
                  {t("result.plotHeading")}
                </div>
                <DotPlotViz
                  result={result}
                  tooManyMsg={(count) => t("result.tooManyValues", { count })}
                  rangeLabel={(min, max) => t("result.rangeLabel", { min, max })}
                />
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500 mb-3">
                  {t("result.statsHeading")}
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.count")}</div>
                    <div className="font-semibold">{result.values.length}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.mean")}</div>
                    <div className="font-semibold">{fmt(result.mean, 4)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.median")}</div>
                    <div className="font-semibold">{fmt(result.median, 4)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.mode")}</div>
                    <div className="font-semibold">{result.mode.join(", ")}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.range")}</div>
                    <div className="font-semibold">{fmt(result.range, 4)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.min")}</div>
                    <div className="font-semibold">{result.min}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.max")}</div>
                    <div className="font-semibold">{result.max}</div>
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
            onClick={() => loadExample("8, 7, 9, 8, 10, 7, 8, 9, 6, 8, 7, 9, 8, 5, 9")}
          >
            {t("examples.loadScores")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2, 1, -1, 0, 2, -1, -2, -1, 0, 1, 2, 3, 0, -1")}
          >
            {t("examples.loadTemps")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("3.5, 4.0, 3.5, 4.2, 3.8, 4.0, 3.5, 3.5, 4.1, 3.8")}
          >
            {t("examples.loadHeights")}
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
