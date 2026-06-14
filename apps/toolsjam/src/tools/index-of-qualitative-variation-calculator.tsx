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

interface IQVResult {
  iqv: number;
  n: number;
  k: number;
  observedPairs: number;
  possiblePairs: number;
  proportions: number[];
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

function computeIQV(freqStr: string): IQVResult | null {
  const parts = freqStr
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length < 2) return null;
  const freqs = parts.map(Number);
  if (freqs.some((f) => !Number.isFinite(f) || f < 0)) return null;
  const k = freqs.length;
  const n = freqs.reduce((a, b) => a + b, 0);
  if (n === 0) return null;
  const proportions = freqs.map((f) => f / n);
  const sumSqP = proportions.reduce((a, p) => a + p * p, 0);
  // IQV = (K / (K-1)) * (1 - Σpi²)
  const iqv = (k / (k - 1)) * (1 - sumSqP);
  const clampedIqv = Math.max(0, Math.min(1, iqv));
  // Observed pairs: N*(N-1)/2 - Σ fi*(fi-1)/2
  const totalPairs = (n * (n - 1)) / 2;
  const samePairs = freqs.reduce((a, f) => a + (f * (f - 1)) / 2, 0);
  const observedPairs = totalPairs - samePairs;
  // Possible pairs: N*(N-1)/2 * (K/(K-1)) ... or just total cross-category pairs
  // IQV = observed pairs / possible pairs
  // possible pairs = IQV denominator
  const possiblePairs = clampedIqv > 0 ? Math.round(observedPairs / clampedIqv) : totalPairs;
  return { iqv: clampedIqv, n, k, observedPairs, possiblePairs, proportions };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function IndexOfQualitativeVariationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.index-of-qualitative-variation-calculator");

  const [freqStr, setFreqStr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<IQVResult | null>(() => {
    if (!touched) return null;
    return computeIQV(freqStr);
  }, [touched, freqStr]);

  function reset() {
    setFreqStr("");
    setTouched(false);
  }

  function loadExample(val: string) {
    setFreqStr(val);
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
            <Label htmlFor="iqv-freqs">{t("field.frequencies")}</Label>
            <Input
              id="iqv-freqs"
              type="text"
              value={freqStr}
              placeholder={t("placeholder.frequencies")}
              onChange={(e) => { setFreqStr(e.target.value); setTouched(true); }}
            />
            <p className="text-xs text-zinc-500">{t("field.frequenciesHint")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-4xl font-bold text-zinc-900">{fmt(result.iqv)}</div>
              <div className="text-xs text-zinc-500">
                {result.iqv < 0.25
                  ? t("result.interpretation.low")
                  : result.iqv < 0.75
                  ? t("result.interpretation.moderate")
                  : t("result.interpretation.high")}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-zinc-600">{t("result.n")}</div>
                <div className="font-semibold text-zinc-900">{result.n}</div>
                <div className="text-zinc-600">{t("result.k")}</div>
                <div className="font-semibold text-zinc-900">{result.k}</div>
                <div className="text-zinc-600">{t("result.observedPairs")}</div>
                <div className="font-semibold text-zinc-900">{result.observedPairs.toLocaleString()}</div>
                <div className="text-zinc-600">{t("result.possiblePairs")}</div>
                <div className="font-semibold text-zinc-900">{result.possiblePairs.toLocaleString()}</div>
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("25, 25, 25, 25")}>
            {t("examples.loadMaxVariation")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("48, 35, 12, 5")}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("80, 20")}>
            {t("examples.loadSkewed")}
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
