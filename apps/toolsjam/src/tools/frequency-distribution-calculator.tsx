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

// ── math helpers ──────────────────────────────────────────────────────────

function parseNumbers(raw: string): number[] {
  return raw
    .split(/[\s,;\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

interface FreqRow {
  lower: number;
  upper: number;
  midpoint: number;
  frequency: number;
  relativeFreq: number;
  cumFreq: number;
}

interface FreqResult {
  rows: FreqRow[];
  mean: number;
  median: number;
  stdDev: number;
  count: number;
  min: number;
  max: number;
  classWidth: number;
}

function buildFreqDistribution(data: number[], numClasses: number): FreqResult {
  const n = data.length;
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal;
  // Use Sturges-inspired width, rounded to avoid floating point class gaps
  const rawWidth = range / numClasses;
  // Round up to a nice number
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawWidth || 1)));
  const classWidth = Math.ceil(rawWidth / magnitude) * magnitude || magnitude;

  const rows: FreqRow[] = [];
  for (let i = 0; i < numClasses; i++) {
    const lower = minVal + i * classWidth;
    const upper = lower + classWidth;
    const isLast = i === numClasses - 1;
    const freq = data.filter((v) =>
      isLast ? v >= lower && v <= upper : v >= lower && v < upper
    ).length;
    rows.push({
      lower,
      upper,
      midpoint: (lower + upper) / 2,
      frequency: freq,
      relativeFreq: freq / n,
      cumFreq: 0,
    });
  }

  let cumulative = 0;
  for (const row of rows) {
    cumulative += row.frequency;
    row.cumFreq = cumulative;
  }

  // Mean from midpoints
  const mean = rows.reduce((s, r) => s + r.midpoint * r.frequency, 0) / n;
  // Std dev from midpoints
  const variance = rows.reduce((s, r) => s + r.frequency * Math.pow(r.midpoint - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  // Approximate median: find class containing n/2
  let medianClass: FreqRow | null = null;
  let cumBefore = 0;
  for (const row of rows) {
    if (row.cumFreq >= n / 2) {
      medianClass = row;
      break;
    }
    cumBefore = row.cumFreq;
  }
  let median = mean;
  if (medianClass) {
    median = medianClass.lower + ((n / 2 - cumBefore) / medianClass.frequency) * classWidth;
  }

  return { rows, mean, median, stdDev, count: n, min: minVal, max: maxVal, classWidth };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

function fmtPct(n: number): string {
  return fmt(n * 100, 2) + "%";
}

interface ExampleItem { input: string; output: string; note?: string }

// ── component ─────────────────────────────────────────────────────────────

export default function FrequencyDistributionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.frequency-distribution-calculator");
  const [dataInput, setDataInput] = React.useState("");
  const [numClasses, setNumClasses] = React.useState("5");
  const [touched, setTouched] = React.useState(false);

  const nums = React.useMemo(() => parseNumbers(dataInput), [dataInput]);
  const k = parseInt(numClasses, 10);

  const valid =
    nums.length >= 2 &&
    Number.isInteger(k) && k >= 2 && k <= 50;

  const result = React.useMemo<FreqResult | null>(() => {
    if (!valid) return null;
    try {
      return buildFreqDistribution(nums, k);
    } catch {
      return null;
    }
  }, [valid, nums, k]);

  function reset() {
    setDataInput(""); setNumClasses("5"); setTouched(false);
  }

  function loadExample(data: string, classes: string) {
    setDataInput(data); setNumClasses(classes); setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
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

  const showError = touched && !valid;

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
        <p className="text-sm text-zinc-500">{t("intro")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("card.title")}</CardTitle>
          <CardDescription>{t("card.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fdc-data">{t("field.dataSet")}</Label>
            <textarea
              id="fdc-data"
              rows={4}
              className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              placeholder={t("placeholder.data")}
              value={dataInput}
              onChange={(e) => { setDataInput(e.target.value); setTouched(true); }}
            />
            <p className="text-xs text-zinc-500">{t("field.dataHint")}</p>
          </div>

          <div className="space-y-2 max-w-xs">
            <Label htmlFor="fdc-classes">{t("field.numClasses")}</Label>
            <Input
              id="fdc-classes" type="number" inputMode="numeric" min="2" max="50"
              value={numClasses}
              onChange={(e) => { setNumClasses(e.target.value); setTouched(true); }}
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

          {result && touched && !showError && (
            <div className="space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50">
                      <th className="px-3 py-2 font-semibold">{t("result.colClass")}</th>
                      <th className="px-3 py-2 font-semibold">{t("result.colMidpoint")}</th>
                      <th className="px-3 py-2 font-semibold">{t("result.colFreq")}</th>
                      <th className="px-3 py-2 font-semibold">{t("result.colRelFreq")}</th>
                      <th className="px-3 py-2 font-semibold">{t("result.colCumFreq")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, i) => (
                      <tr key={i} className="border-b border-zinc-100">
                        <td className="px-3 py-2 text-zinc-800">
                          [{fmt(row.lower, 4)}, {fmt(row.upper, 4)})
                        </td>
                        <td className="px-3 py-2 text-zinc-800">{fmt(row.midpoint, 4)}</td>
                        <td className="px-3 py-2 font-medium text-zinc-900">{row.frequency}</td>
                        <td className="px-3 py-2 text-zinc-800">{fmtPct(row.relativeFreq)}</td>
                        <td className="px-3 py-2 text-zinc-800">{row.cumFreq}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.statCount")}</div>
                  <div className="font-semibold text-zinc-900">{result.count}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.statMean")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.mean)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.statMedian")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.median)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.statStdDev")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.stdDev)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.statMin")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.min)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.statMax")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.max)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.statClassWidth")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.classWidth)}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
            onClick={() => loadExample("82,90,75,68,88,75,95,100,72,85,91,78,84,88,77,95,65,80,73,86", "5")}>
            {t("examples.loadScores")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("150,220,180,190,250,160,200,210,170,240,195,175,215,185,230,205,165,225,235,190,200,180,210,245,155,235,190,220,175,195", "6")}>
            {t("examples.loadSales")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("35,42,38,50,45,48,36,39,47,41,43,46,40,37,44,49,38,42,45,36", "5")}>
            {t("examples.loadPlants")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
