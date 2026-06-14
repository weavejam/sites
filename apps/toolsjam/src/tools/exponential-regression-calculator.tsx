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

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", { maximumFractionDigits: 8 });
}

interface RegressionResult {
  a: number;
  b: number;
  rSquared: number;
  correlation: number;
  predictedY: number | null;
  equation: string;
}

function parseDataPoints(raw: string): { x: number; y: number }[] | null {
  const lines = raw.trim().split(/\n+/);
  const points: { x: number; y: number }[] = [];
  for (const line of lines) {
    const parts = line.trim().split(/[\s,]+/);
    if (parts.length < 2) return null;
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (!Number.isFinite(x) || !Number.isFinite(y) || y <= 0) return null;
    points.push({ x, y });
  }
  return points.length >= 3 ? points : null;
}

// Exponential regression y = a * b^x using least squares on ln(y) = ln(a) + x*ln(b)
function computeRegression(points: { x: number; y: number }[], predX: number | null): RegressionResult | null {
  const n = points.length;
  const lnY = points.map((p) => Math.log(p.y));
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumLnY = lnY.reduce((s, v) => s + v, 0);
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
  const sumXLnY = points.reduce((s, p, i) => s + p.x * lnY[i], 0);

  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return null;

  const lnB = (n * sumXLnY - sumX * sumLnY) / denom;
  const lnA = (sumLnY - lnB * sumX) / n;
  const a = Math.exp(lnA);
  const b = Math.exp(lnB);

  // R² on original y values
  const yMean = points.reduce((s, p) => s + p.y, 0) / n;
  const ssTot = points.reduce((s, p) => s + (p.y - yMean) ** 2, 0);
  const ssRes = points.reduce((s, p) => s + (p.y - a * Math.pow(b, p.x)) ** 2, 0);
  const rSquared = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
  const correlation = Math.sqrt(Math.max(0, rSquared)) * (lnB >= 0 ? 1 : -1);

  const predictedY = predX !== null && Number.isFinite(predX) ? a * Math.pow(b, predX) : null;

  const bStr = formatNum(b);
  const equation = `y = ${formatNum(a)} × ${bStr}^x`;

  return { a, b, rSquared, correlation, predictedY, equation };
}

export default function ExponentialRegressionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.exponential-regression-calculator");
  const [dataPoints, setDataPoints] = React.useState("1 1.6\n2 2.5\n3 3.8\n4 5.9\n5 9.1");
  const [predXVal, setPredXVal] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<RegressionResult | null>(() => {
    if (!touched) return null;
    const points = parseDataPoints(dataPoints);
    if (!points) return null;
    const predX = predXVal !== "" ? parseFloat(predXVal) : null;
    return computeRegression(points, predX);
  }, [touched, dataPoints, predXVal]);

  function reset() {
    setDataPoints("1 1.6\n2 2.5\n3 3.8\n4 5.9\n5 9.1");
    setPredXVal("");
    setTouched(false);
  }

  function loadExample(points: string) {
    setDataPoints(points);
    setTouched(true);
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
            <Label htmlFor="er-data">{t("field.dataPoints")}</Label>
            <textarea
              id="er-data"
              className="w-full min-h-[160px] rounded-md border border-zinc-200 bg-white p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-900"
              value={dataPoints}
              placeholder={t("field.dataPointsPlaceholder")}
              onChange={(e) => { setDataPoints(e.target.value); setTouched(true); }}
              aria-label={t("field.dataPoints")}
            />
            <p className="text-xs text-zinc-500">{t("field.dataPointsHint")}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="er-predx">{t("field.predictX")}</Label>
            <Input
              id="er-predx"
              type="number"
              inputMode="decimal"
              value={predXVal}
              placeholder={t("field.predictXPlaceholder")}
              onChange={(e) => setPredXVal(e.target.value)}
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

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-base font-semibold text-zinc-900">{result.equation}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.a")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.a)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.b")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.b)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.rSquared")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.rSquared)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.correlation")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.correlation)}</div>
                </div>
              </div>
              {result.predictedY !== null && (
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.predictedY")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.predictedY)}</div>
                </div>
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
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1 2\n2 4.1\n3 7.9\n4 16.2\n5 33.0")}>
            {t("examples.loadBacteria")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0 1000\n1 1050\n2 1102.5\n3 1157.6\n4 1215.5")}>
            {t("examples.loadCompoundInterest")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0 100\n10 82\n20 67\n30 55\n40 45")}>
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
