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

interface RocPoint {
  threshold: number;
  fpr: number;
  tpr: number;
}

interface RocResult {
  auc: number;
  points: RocPoint[];
  optimalThreshold: number;
  optimalFpr: number;
  optimalTpr: number;
}

function parseRocData(raw: string): { score: number; label: number }[] | null {
  const lines = raw.trim().split("\n").filter((l) => l.trim() !== "");
  if (lines.length < 2) return null;
  const parsed = lines.map((line) => {
    const parts = line.trim().split(/[\s,;]+/);
    if (parts.length < 2) return null;
    const score = parseFloat(parts[0]);
    const label = parseInt(parts[1], 10);
    if (!Number.isFinite(score)) return null;
    if (label !== 0 && label !== 1) return null;
    return { score, label };
  });
  if (parsed.some((p) => p === null)) return null;
  return parsed as { score: number; label: number }[];
}

function calcRoc(data: { score: number; label: number }[]): RocResult | null {
  const positives = data.filter((d) => d.label === 1).length;
  const negatives = data.filter((d) => d.label === 0).length;
  if (positives === 0 || negatives === 0) return null;

  // Sort by score descending
  const sorted = [...data].sort((a, b) => b.score - a.score);

  // Build ROC curve
  const thresholds = [...new Set(sorted.map((d) => d.score))].sort((a, b) => b - a);
  const points: RocPoint[] = [{ threshold: Infinity, fpr: 0, tpr: 0 }];

  for (const threshold of thresholds) {
    const predicted = sorted.map((d) => d.score >= threshold);
    const tp = predicted.filter((p, i) => p && sorted[i].label === 1).length;
    const fp = predicted.filter((p, i) => p && sorted[i].label === 0).length;
    const tpr = tp / positives;
    const fpr = fp / negatives;
    points.push({ threshold, fpr, tpr });
  }
  points.push({ threshold: -Infinity, fpr: 1, tpr: 1 });

  // AUC via trapezoidal rule
  let auc = 0;
  for (let i = 1; i < points.length; i++) {
    auc +=
      (points[i].fpr - points[i - 1].fpr) *
      (points[i].tpr + points[i - 1].tpr) /
      2;
  }

  // Optimal threshold: Youden's J (maximize TPR - FPR)
  let bestJ = -Infinity;
  let optimalIdx = 1;
  for (let i = 1; i < points.length - 1; i++) {
    const j = points[i].tpr - points[i].fpr;
    if (j > bestJ) {
      bestJ = j;
      optimalIdx = i;
    }
  }

  return {
    auc,
    points,
    optimalThreshold: points[optimalIdx].threshold,
    optimalFpr: points[optimalIdx].fpr,
    optimalTpr: points[optimalIdx].tpr,
  };
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

export default function RocCurveCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.roc-curve-calculator");
  const [input, setInput] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const data = React.useMemo(() => parseRocData(input), [input]);
  const result = React.useMemo(
    () => (touched && data ? calcRoc(data) : null),
    [touched, data]
  );

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

  const showError = touched && !data;

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
            <Label htmlFor="roc-data">{t("field.dataInput")}</Label>
            <textarea
              id="roc-data"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 font-mono h-48"
              placeholder={t("placeholder.dataInput")}
              value={input}
              onChange={(e) => { setInput(e.target.value); setTouched(false); }}
            />
            <p className="text-xs text-zinc-500">{t("field.dataInputHint")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => { setInput(""); setTouched(false); }}
            >
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded border border-blue-300 bg-blue-50 p-3">
                  <div className="text-xs text-blue-600">{t("result.auc")}</div>
                  <div className="text-2xl font-bold text-blue-700">{fmt(result.auc, 4)}</div>
                  <div className="text-xs text-blue-500 mt-1">
                    {result.auc >= 0.9
                      ? t("result.aucExcellent")
                      : result.auc >= 0.8
                      ? t("result.aucGood")
                      : result.auc >= 0.7
                      ? t("result.aucFair")
                      : t("result.aucPoor")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.optimalThreshold")}</div>
                  <div className="text-xl font-semibold">{fmt(result.optimalThreshold, 3)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.sensitivity")}</div>
                  <div className="text-xl font-semibold">{fmt(result.optimalTpr * 100, 1)}%</div>
                  <div className="text-xs text-zinc-400">
                    {t("result.specificity")}: {fmt((1 - result.optimalFpr) * 100, 1)}%
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto max-h-64">
                <table className="w-full border-collapse text-sm">
                  <thead className="sticky top-0 bg-zinc-50">
                    <tr className="border-b border-zinc-200">
                      <th className="px-3 py-2 text-left font-semibold">{t("result.threshold")}</th>
                      <th className="px-3 py-2 text-left font-semibold">{t("result.fpr")}</th>
                      <th className="px-3 py-2 text-left font-semibold">{t("result.tpr")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.points
                      .filter((_, i) => i > 0 && i < result.points.length - 1)
                      .map((pt, i) => (
                        <tr
                          key={i}
                          className={`border-b border-zinc-100 ${
                            pt.threshold === result.optimalThreshold
                              ? "bg-blue-50 font-medium"
                              : ""
                          }`}
                        >
                          <td className="px-3 py-1">{fmt(pt.threshold, 3)}</td>
                          <td className="px-3 py-1">{fmt(pt.fpr, 4)}</td>
                          <td className="px-3 py-1">{fmt(pt.tpr, 4)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
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
