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

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function quantile(sorted: number[], p: number): number {
  const n = sorted.length;
  if (n === 0) return NaN;
  const pos = p * (n - 1);
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (pos - lo) * (sorted[hi] - sorted[lo]);
}

interface FenceResult {
  sorted: number[];
  q1: number;
  q3: number;
  iqr: number;
  lowerFence: number;
  upperFence: number;
  outliers: number[];
  n: number;
}

function computeFences(dataStr: string): FenceResult | null {
  const vals = dataStr.split(/[\s,]+/).map((v) => parseFloat(v.trim())).filter((v) => Number.isFinite(v));
  if (vals.length < 4) return null;
  const sorted = [...vals].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const q3 = quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);
  return { sorted, q1, q3, iqr, lowerFence, upperFence, outliers, n: sorted.length };
}

export default function UpperAndLowerFenceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.upper-and-lower-fence-calculator");
  const [dataStr, setDataStr] = React.useState("");
  const [calculated, setCalculated] = React.useState(false);

  const result = React.useMemo<FenceResult | null>(() => {
    if (!calculated) return null;
    return computeFences(dataStr);
  }, [calculated, dataStr]);

  function reset() {
    setDataStr("");
    setCalculated(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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
            <Label htmlFor="fence-data">{t("field.data")}</Label>
            <Input
              id="fence-data"
              type="text"
              value={dataStr}
              placeholder={t("placeholder.data")}
              onChange={(e) => { setDataStr(e.target.value); setCalculated(false); }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setCalculated(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {calculated && !result && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
                <div className="text-sm font-semibold text-zinc-700">{t("result.heading")}</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <StatRow label={t("result.n")} value={String(result.n)} />
                  <StatRow label={t("result.q1")} value={fmt(result.q1)} />
                  <StatRow label={t("result.q3")} value={fmt(result.q3)} />
                  <StatRow label={t("result.iqr")} value={fmt(result.iqr)} />
                  <StatRow label={t("result.lowerFence")} value={fmt(result.lowerFence)} highlight="blue" />
                  <StatRow label={t("result.upperFence")} value={fmt(result.upperFence)} highlight="blue" />
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-semibold text-zinc-700 mb-2">{t("result.outliersHeading")}</div>
                {result.outliers.length === 0 ? (
                  <p className="text-sm text-green-700">{t("result.noOutliers")}</p>
                ) : (
                  <p className="text-sm text-red-700 font-medium">
                    {result.outliers.join(", ")}
                  </p>
                )}
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

function StatRow({ label, value, highlight }: { label: string; value: string; highlight?: string }) {
  return (
    <div className={`flex items-center justify-between rounded border px-3 py-2 ${
      highlight === "blue" ? "border-blue-200 bg-blue-50" : "border-zinc-200 bg-white"
    }`}>
      <span className="text-sm text-zinc-600">{label}</span>
      <span className={`font-semibold ${highlight === "blue" ? "text-blue-800" : "text-zinc-900"}`}>{value}</span>
    </div>
  );
}
