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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface WeibullResult {
  pdf: number;
  cdf: number;
  reliability: number;
  hazard: number;
  mean: number;
  median: number;
  mode: number;
  variance: number;
  stdDev: number;
}

// Gamma function approximation (Lanczos)
function gamma(z: number): number {
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  z -= 1;
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

function computeWeibull(k: number, lambda: number, x: number): WeibullResult | null {
  if (k <= 0 || lambda <= 0 || x < 0) return null;
  const xOverL = x / lambda;
  const pdf =
    x === 0
      ? k === 1
        ? 1 / lambda
        : k < 1
        ? Infinity
        : 0
      : (k / lambda) * Math.pow(xOverL, k - 1) * Math.exp(-Math.pow(xOverL, k));
  const cdf = x === 0 ? 0 : 1 - Math.exp(-Math.pow(xOverL, k));
  const reliability = 1 - cdf;
  const hazard = x === 0 ? (k === 1 ? 1 / lambda : k < 1 ? Infinity : 0) : (k / lambda) * Math.pow(xOverL, k - 1);
  const mean = lambda * gamma(1 + 1 / k);
  const median = lambda * Math.pow(Math.LN2, 1 / k);
  const mode = k > 1 ? lambda * Math.pow((k - 1) / k, 1 / k) : 0;
  const variance =
    lambda * lambda * (gamma(1 + 2 / k) - Math.pow(gamma(1 + 1 / k), 2));
  return {
    pdf: Number.isFinite(pdf) ? pdf : NaN,
    cdf,
    reliability,
    hazard: Number.isFinite(hazard) ? hazard : NaN,
    mean,
    median,
    mode,
    variance,
    stdDev: Math.sqrt(variance),
  };
}

function fmt(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function WeibullDistributionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.weibull-distribution-calculator");
  const [k, setK] = React.useState("");
  const [lambda, setLambda] = React.useState("");
  const [x, setX] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const kNum = parseFloat(k);
  const lambdaNum = parseFloat(lambda);
  const xNum = parseFloat(x);

  const result = React.useMemo<WeibullResult | null>(() => {
    if (!Number.isFinite(kNum) || !Number.isFinite(lambdaNum) || !Number.isFinite(xNum))
      return null;
    return computeWeibull(kNum, lambdaNum, xNum);
  }, [kNum, lambdaNum, xNum]);

  function reset() {
    setK(""); setLambda(""); setX("");
    setTouched(false);
  }

  function loadExample(vals: { k: string; lambda: string; x: string }) {
    setK(vals.k); setLambda(vals.lambda); setX(vals.x);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
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

  const showError = touched && result === null;

  const resultRows: { label: string; value: string }[] = result
    ? [
        { label: t("result.pdf"), value: fmt(result.pdf) },
        { label: t("result.cdf"), value: fmt(result.cdf) },
        { label: t("result.reliability"), value: fmt(result.reliability) },
        { label: t("result.hazard"), value: fmt(result.hazard) },
        { label: t("result.mean"), value: fmt(result.mean) },
        { label: t("result.median"), value: fmt(result.median) },
        { label: t("result.mode"), value: fmt(result.mode) },
        { label: t("result.variance"), value: fmt(result.variance) },
        { label: t("result.stdDev"), value: fmt(result.stdDev) },
      ]
    : [];

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="wb-k">{t("field.k")}</Label>
              <Input
                id="wb-k"
                type="number"
                inputMode="decimal"
                value={k}
                placeholder={t("placeholder.k")}
                onChange={(e) => { setK(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wb-lambda">{t("field.lambda")}</Label>
              <Input
                id="wb-lambda"
                type="number"
                inputMode="decimal"
                value={lambda}
                placeholder={t("placeholder.lambda")}
                onChange={(e) => { setLambda(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wb-x">{t("field.x")}</Label>
              <Input
                id="wb-x"
                type="number"
                inputMode="decimal"
                value={x}
                placeholder={t("placeholder.x")}
                onChange={(e) => { setX(e.target.value); setTouched(true); }}
              />
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {resultRows.map((row, i) => (
                  <div key={i}>
                    <div className="text-xs text-zinc-500">{row.label}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
            onClick={() => loadExample({ k: "2.1", lambda: "8500", x: "7000" })}>
            {t("examples.loadBearing")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample({ k: "1.8", lambda: "12", x: "15" })}>
            {t("examples.loadWind")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample({ k: "1", lambda: "500", x: "500" })}>
            {t("examples.loadExponential")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
