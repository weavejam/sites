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

interface IQRResult {
  sorted: number[];
  n: number;
  min: number;
  max: number;
  q1: number;
  median: number;
  q3: number;
  iqr: number;
  lowerFence: number;
  upperFence: number;
  outliers: number[];
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

function quartile(sorted: number[], q: 0.25 | 0.5 | 0.75): number {
  const n = sorted.length;
  const pos = q * (n - 1);
  const low = Math.floor(pos);
  const high = Math.ceil(pos);
  if (low === high) return sorted[low];
  return sorted[low] + (sorted[high] - sorted[low]) * (pos - low);
}

function computeIQR(dataStr: string): IQRResult | null {
  const parts = dataStr
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length < 2) return null;
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isFinite(n))) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const q1 = quartile(sorted, 0.25);
  const median = quartile(sorted, 0.5);
  const q3 = quartile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);
  return {
    sorted,
    n: sorted.length,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    q1,
    median,
    q3,
    iqr,
    lowerFence,
    upperFence,
    outliers,
  };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function IqrCalculatorInterquartileRange(_props: { locale: Locale }) {
  const t = useTranslations("tool.iqr-calculator-interquartile-range");

  const [dataStr, setDataStr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<IQRResult | null>(() => {
    if (!touched) return null;
    return computeIQR(dataStr);
  }, [touched, dataStr]);

  function reset() {
    setDataStr("");
    setTouched(false);
  }

  function loadExample(val: string) {
    setDataStr(val);
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

  const faqItems: FaqItem[] = React.useMemo(() => {
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
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="iqr-data">{t("field.data")}</Label>
            <Input
              id="iqr-data"
              type="text"
              value={dataStr}
              placeholder={t("placeholder.data")}
              onChange={(e) => { setDataStr(e.target.value); setTouched(true); }}
            />
            <p className="text-xs text-zinc-500">{t("field.dataHint")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <div className="text-zinc-600">{t("result.n")}</div>
                <div className="font-semibold text-zinc-900">{result.n}</div>
                <div className="text-zinc-600">{t("result.min")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.min)}</div>
                <div className="text-zinc-600">{t("result.max")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.max)}</div>
                <div className="text-zinc-600">{t("result.q1")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.q1)}</div>
                <div className="text-zinc-600">{t("result.median")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.median)}</div>
                <div className="text-zinc-600">{t("result.q3")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.q3)}</div>
                <div className="text-zinc-600 font-semibold">{t("result.iqr")}</div>
                <div className="text-2xl font-bold text-zinc-900">{fmt(result.iqr)}</div>
                <div className="text-zinc-600">{t("result.lowerFence")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.lowerFence)}</div>
                <div className="text-zinc-600">{t("result.upperFence")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.upperFence)}</div>
              </div>
              {result.outliers.length > 0 ? (
                <div className="text-sm">
                  <span className="font-semibold text-red-600">{t("result.outliersLabel")}: </span>
                  <span className="text-zinc-700">{result.outliers.join(", ")}</span>
                </div>
              ) : (
                <div className="text-sm text-green-700 font-medium">{t("result.noOutliers")}</div>
              )}
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("2, 4, 4, 5, 6, 7, 8, 9")}>
            {t("examples.loadBasic")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49, 78, 108")}>
            {t("examples.loadOutliers")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("88, 92, 80, 78, 95, 84, 76, 90, 81, 85, 93")}>
            {t("examples.loadScores")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
