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

function quartile(sorted: number[], q: number): number {
  const n = sorted.length;
  const pos = q * (n - 1);
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

interface OutlierResult {
  sorted: number[];
  q1: number;
  q3: number;
  iqr: number;
  lowerBound: number;
  upperBound: number;
  outliers: number[];
  clean: number[];
}

function compute(data: number[], multiplier: number): OutlierResult {
  const sorted = [...data].sort((a, b) => a - b);
  const q1 = quartile(sorted, 0.25);
  const q3 = quartile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerBound = q1 - multiplier * iqr;
  const upperBound = q3 + multiplier * iqr;
  const outliers = sorted.filter((v) => v < lowerBound || v > upperBound);
  const clean = sorted.filter((v) => v >= lowerBound && v <= upperBound);
  return { sorted, q1, q3, iqr, lowerBound, upperBound, outliers, clean };
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(4)).toString();
}

const METHOD_OPTIONS = ["1.5", "3.0"];

// ── component ─────────────────────────────────────────────────────────────

export default function OutlierCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.outlier-calculator");
  const [dataStr, setDataStr] = React.useState("");
  const [method, setMethod] = React.useState("1.5");
  const [touched, setTouched] = React.useState(false);

  const parsed = React.useMemo(() => {
    if (!dataStr.trim()) return null;
    const parts = dataStr.split(",").map((s) => s.trim()).filter((s) => s !== "");
    const nums = parts.map(Number);
    if (nums.some((n) => !Number.isFinite(n))) return null;
    if (nums.length < 4) return null;
    return nums;
  }, [dataStr]);

  const result = React.useMemo<OutlierResult | null>(() => {
    if (!parsed) return null;
    return compute(parsed, parseFloat(method));
  }, [parsed, method]);

  function loadExample(val: string) {
    setDataStr(val);
    setTouched(true);
  }

  function reset() {
    setDataStr("");
    setMethod("1.5");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  const showError = touched && !parsed;

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
            <Label htmlFor="oc-data">{t("field.data")}</Label>
            <Input
              id="oc-data"
              type="text"
              value={dataStr}
              placeholder={t("placeholder.data")}
              onChange={(e) => { setDataStr(e.target.value); setTouched(true); }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="oc-method">{t("field.method")}</Label>
            <select
              id="oc-method"
              value={method}
              className="flex h-9 w-full max-w-xs rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
              onChange={(e) => { setMethod(e.target.value); setTouched(true); }}
            >
              {METHOD_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v === "1.5" ? t("type.mild") : t("type.extreme")}
                </option>
              ))}
            </select>
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

          {result !== null && touched && parsed && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {([
                  ["result.q1", fmt(result.q1)],
                  ["result.q3", fmt(result.q3)],
                  ["result.iqr", fmt(result.iqr)],
                  ["result.lowerBound", fmt(result.lowerBound)],
                  ["result.upperBound", fmt(result.upperBound)],
                  ["result.outlierCount", result.outliers.length.toString()],
                ] as [string, string][]).map(([key, val]) => (
                  <div key={key} className="rounded border border-zinc-200 bg-white p-3">
                    <div className="text-xs text-zinc-500">{t(key as never)}</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">{val}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-zinc-700">{t("result.outliersLabel")}</div>
                <div className="text-zinc-900 font-mono text-sm">
                  {result.outliers.length === 0
                    ? t("result.noOutliers")
                    : result.outliers.join(", ")}
                </div>
                <div className="text-sm font-medium text-zinc-700 mt-2">{t("result.cleanDataLabel")}</div>
                <div className="text-zinc-700 font-mono text-sm">
                  {result.clean.join(", ")}
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("formula")}</p>
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
            onClick={() => loadExample("10, 12, 14, 15, 16, 18, 20, 50")}>
            {t("examples.loadBasic")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1, 25, 28, 30, 32, 35, 38, 100")}>
            {t("examples.loadMultiple")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("10, 20, 30, 40, 50, 60, 70, 80")}>
            {t("examples.loadNone")}
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
