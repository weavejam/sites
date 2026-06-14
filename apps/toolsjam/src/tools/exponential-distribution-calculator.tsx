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

type CalcType = "pdf" | "cdfLessThan" | "cdfLessOrEqual" | "cdfGreaterThan" | "cdfGreaterOrEqual";

const CALC_TYPES: CalcType[] = ["pdf", "cdfLessThan", "cdfLessOrEqual", "cdfGreaterThan", "cdfGreaterOrEqual"];

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", { maximumFractionDigits: 8 });
}

interface CalcResult {
  pdf: number;
  cdfLessThan: number;
  cdfLessOrEqual: number;
  cdfGreaterThan: number;
  cdfGreaterOrEqual: number;
  mean: number;
  median: number;
  variance: number;
  stdDev: number;
}

function compute(lambda: number, x: number): CalcResult | null {
  if (!Number.isFinite(lambda) || lambda <= 0) return null;
  if (!Number.isFinite(x) || x < 0) return null;
  const pdf = lambda * Math.exp(-lambda * x);
  const cdfLessOrEqual = 1 - Math.exp(-lambda * x);
  const cdfLessThan = cdfLessOrEqual; // continuous distribution, P(X<x) = P(X≤x)
  const cdfGreaterOrEqual = Math.exp(-lambda * x);
  const cdfGreaterThan = cdfGreaterOrEqual;
  const mean = 1 / lambda;
  const median = Math.LN2 / lambda;
  const variance = 1 / (lambda * lambda);
  const stdDev = 1 / lambda;
  return { pdf, cdfLessThan, cdfLessOrEqual, cdfGreaterThan, cdfGreaterOrEqual, mean, median, variance, stdDev };
}

export default function ExponentialDistributionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.exponential-distribution-calculator");
  const [lambdaVal, setLambdaVal] = React.useState("");
  const [xVal, setXVal] = React.useState("");
  const [calcType, setCalcType] = React.useState<CalcType>("pdf");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched) return null;
    return compute(parseFloat(lambdaVal), parseFloat(xVal));
  }, [touched, lambdaVal, xVal]);

  function reset() {
    setLambdaVal(""); setXVal(""); setTouched(false); setCalcType("pdf");
  }

  function loadExample(lambda: string, x: string, type: CalcType) {
    setLambdaVal(lambda); setXVal(x); setCalcType(type); setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  const primaryResult = result ? result[calcType] : null;

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ed-lambda">{t("field.lambda")}</Label>
              <Input
                id="ed-lambda"
                type="number"
                inputMode="decimal"
                value={lambdaVal}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setLambdaVal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ed-x">{t("field.x")}</Label>
              <Input
                id="ed-x"
                type="number"
                inputMode="decimal"
                value={xVal}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setXVal(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {CALC_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => setCalcType(ct)}
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

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
                <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
                <div className="text-2xl font-semibold text-zinc-900">
                  {t(`type.${calcType}` as never)} = {formatNum(primaryResult!)}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                {(["pdf", "cdfLessThan", "cdfGreaterThan"] as CalcType[]).map((ct) => (
                  <div key={ct} className="rounded border border-zinc-100 p-3">
                    <div className="text-xs text-zinc-500">{t(`type.${ct}` as never)}</div>
                    <div className="font-medium">{formatNum(result[ct])}</div>
                  </div>
                ))}
                <div className="rounded border border-zinc-100 p-3">
                  <div className="text-xs text-zinc-500">{t("result.mean")}</div>
                  <div className="font-medium">{formatNum(result.mean)}</div>
                </div>
                <div className="rounded border border-zinc-100 p-3">
                  <div className="text-xs text-zinc-500">{t("result.median")}</div>
                  <div className="font-medium">{formatNum(result.median)}</div>
                </div>
                <div className="rounded border border-zinc-100 p-3">
                  <div className="text-xs text-zinc-500">{t("result.variance")}</div>
                  <div className="font-medium">{formatNum(result.variance)}</div>
                </div>
                <div className="rounded border border-zinc-100 p-3">
                  <div className="text-xs text-zinc-500">{t("result.stdDev")}</div>
                  <div className="font-medium">{formatNum(result.stdDev)}</div>
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
            onClick={() => loadExample("2", "0.5", "cdfLessThan")}>
            {t("examples.loadCustomerService")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0.0005", "2500", "cdfGreaterOrEqual")}>
            {t("examples.loadLightBulb")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0.1", "5", "pdf")}>
            {t("examples.loadRadioactive")}
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
