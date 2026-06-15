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

interface ConversionResult {
  whole: number;
  origNum: number;
  origDen: number;
  product: number;
  total: number;
  den: number;
}

export default function MixedNumberToImproperFractionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.mixed-number-to-improper-fraction-calculator");
  const [whole, setWhole] = React.useState("");
  const [numerator, setNumerator] = React.useState("");
  const [denominator, setDenominator] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [result, setResult] = React.useState<ConversionResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function handleCalculate() {
    setTouched(true);
    setError(null);
    setResult(null);

    const w = parseInt(whole || "0", 10);
    const n = parseInt(numerator || "0", 10);
    const d = parseInt(denominator || "1", 10);

    if (isNaN(w) || isNaN(n) || isNaN(d)) {
      setError(t("error.invalid"));
      return;
    }
    if (d === 0) {
      setError(t("error.invalidDenominator"));
      return;
    }

    const sign = w < 0 ? -1 : 1;
    const absW = Math.abs(w);
    const product = absW * d;
    const total = sign * (product + n);
    setResult({ whole: w, origNum: n, origDen: d, product, total, den: d });
  }

  function handleReset() {
    setWhole("");
    setNumerator("");
    setDenominator("");
    setTouched(false);
    setResult(null);
    setError(null);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
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
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mnifc-whole">{t("field.whole")}</Label>
              <Input
                id="mnifc-whole"
                type="number"
                inputMode="numeric"
                value={whole}
                placeholder={t("field.placeholder")}
                onChange={(e) => { setWhole(e.target.value); setTouched(false); setResult(null); setError(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mnifc-num">{t("field.numerator")}</Label>
              <Input
                id="mnifc-num"
                type="number"
                inputMode="numeric"
                value={numerator}
                placeholder={t("field.placeholder")}
                onChange={(e) => { setNumerator(e.target.value); setTouched(false); setResult(null); setError(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mnifc-den">{t("field.denominator")}</Label>
              <Input
                id="mnifc-den"
                type="number"
                inputMode="numeric"
                value={denominator}
                placeholder={t("field.denominatorPlaceholder")}
                onChange={(e) => { setDenominator(e.target.value); setTouched(false); setResult(null); setError(null); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleCalculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && touched && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.improperFraction", { num: result.total, den: result.den })}
              </div>
              <div className="space-y-1 text-sm text-zinc-600 border-t border-zinc-200 pt-3">
                <p className="font-medium text-zinc-700">{t("result.steps")}</p>
                <p>{t("result.step1", { absWhole: Math.abs(result.whole), den: result.den, product: result.product })}</p>
                <p>{t("result.step2", { product: result.product, num: result.origNum, absTotalNum: Math.abs(result.total), total: result.total })}</p>
                <p>{t("result.step3", { total: result.total, den: result.den })}</p>
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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
