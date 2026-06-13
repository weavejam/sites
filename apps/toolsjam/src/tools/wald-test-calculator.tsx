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

interface WaldResult {
  waldStat: number;
  zScore: number;
  pValue: number;
  reject: boolean;
  alpha: number;
}

// Normal distribution CDF approximation (Abramowitz & Stegun)
function normalCDF(x: number): number {
  if (x < 0) return 1 - normalCDF(-x);
  const t = 1 / (1 + 0.2316419 * x);
  const poly =
    t *
    (0.319381530 +
      t *
        (-0.356563782 +
          t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return 1 - (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x) * poly;
}

function computeWald(
  betaHat: number,
  beta0: number,
  se: number,
  alpha: number
): WaldResult | null {
  if (se <= 0 || alpha <= 0 || alpha >= 1) return null;
  const zScore = (betaHat - beta0) / se;
  const waldStat = zScore * zScore;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
  return {
    waldStat,
    zScore,
    pValue,
    reject: pValue < alpha,
    alpha,
  };
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function WaldTestCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.wald-test-calculator");
  const [betaHat, setBetaHat] = React.useState("");
  const [beta0, setBeta0] = React.useState("0");
  const [se, setSe] = React.useState("");
  const [alpha, setAlpha] = React.useState("0.05");
  const [touched, setTouched] = React.useState(false);

  const betaHatNum = parseFloat(betaHat);
  const beta0Num = parseFloat(beta0);
  const seNum = parseFloat(se);
  const alphaNum = parseFloat(alpha);

  const result = React.useMemo<WaldResult | null>(() => {
    if (
      !Number.isFinite(betaHatNum) ||
      !Number.isFinite(beta0Num) ||
      !Number.isFinite(seNum) ||
      !Number.isFinite(alphaNum)
    )
      return null;
    return computeWald(betaHatNum, beta0Num, seNum, alphaNum);
  }, [betaHatNum, beta0Num, seNum, alphaNum]);

  function reset() {
    setBetaHat("");
    setBeta0("0");
    setSe("");
    setAlpha("0.05");
    setTouched(false);
  }

  function loadExample(vals: {
    betaHat: string;
    beta0: string;
    se: string;
    alpha: string;
  }) {
    setBetaHat(vals.betaHat);
    setBeta0(vals.beta0);
    setSe(vals.se);
    setAlpha(vals.alpha);
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wald-bh">{t("field.betaHat")}</Label>
              <Input
                id="wald-bh"
                type="number"
                inputMode="decimal"
                value={betaHat}
                placeholder={t("placeholder.betaHat")}
                onChange={(e) => { setBetaHat(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wald-b0">{t("field.beta0")}</Label>
              <Input
                id="wald-b0"
                type="number"
                inputMode="decimal"
                value={beta0}
                placeholder={t("placeholder.beta0")}
                onChange={(e) => { setBeta0(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wald-se">{t("field.se")}</Label>
              <Input
                id="wald-se"
                type="number"
                inputMode="decimal"
                value={se}
                placeholder={t("placeholder.se")}
                onChange={(e) => { setSe(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wald-alpha">{t("field.alpha")}</Label>
              <Input
                id="wald-alpha"
                type="number"
                inputMode="decimal"
                value={alpha}
                placeholder={t("placeholder.alpha")}
                onChange={(e) => { setAlpha(e.target.value); setTouched(true); }}
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
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.waldStat")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.waldStat)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.zScore")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.zScore)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.pValue")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.pValue, 6)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.decision")}</div>
                  <div
                    className={`text-xl font-semibold ${result.reject ? "text-red-600" : "text-green-700"}`}
                  >
                    {result.reject
                      ? t("result.reject")
                      : t("result.failToReject")}
                  </div>
                </div>
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
            onClick={() => loadExample({ betaHat: "2.5", beta0: "0", se: "1.1", alpha: "0.05" })}>
            {t("examples.loadBasic")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample({ betaHat: "0.08", beta0: "0", se: "0.02", alpha: "0.05" })}>
            {t("examples.loadEducation")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample({ betaHat: "-0.5", beta0: "0", se: "0.2", alpha: "0.01" })}>
            {t("examples.loadDrug")}
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
