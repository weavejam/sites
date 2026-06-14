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

interface RegressionResult {
  n: number;
  slope: number;
  intercept: number;
  r: number;
  r2: number;
  se: number;
  equation: string;
}

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => Number.isFinite(n));
}

function computeRegression(xs: number[], ys: number[]): RegressionResult | null {
  const n = xs.length;
  if (n < 2 || n !== ys.length) return null;

  const xMean = xs.reduce((a, b) => a + b, 0) / n;
  const yMean = ys.reduce((a, b) => a + b, 0) / n;

  let Sxy = 0, Sxx = 0, Syy = 0;
  for (let i = 0; i < n; i++) {
    Sxy += (xs[i] - xMean) * (ys[i] - yMean);
    Sxx += (xs[i] - xMean) ** 2;
    Syy += (ys[i] - yMean) ** 2;
  }

  if (Sxx === 0) return null;

  const slope = Sxy / Sxx;
  const intercept = yMean - slope * xMean;
  const r = Syy === 0 ? 0 : Sxy / Math.sqrt(Sxx * Syy);
  const r2 = r * r;

  const residuals = xs.map((x, i) => ys[i] - (intercept + slope * x));
  const sse = residuals.reduce((a, b) => a + b * b, 0);
  const se = n > 2 ? Math.sqrt(sse / (n - 2)) : 0;

  const slopeStr = slope >= 0 ? `+ ${fmt(slope)}` : `- ${fmt(Math.abs(slope))}`;
  const equation = `ŷ = ${fmt(intercept)} ${slopeStr}x`;

  return { n, slope, intercept, r, r2, se, equation };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function LinearRegressionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.linear-regression-calculator");
  const [xInput, setXInput] = React.useState("");
  const [yInput, setYInput] = React.useState("");
  const [predictX, setPredictX] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const xs = React.useMemo(() => parseNumbers(xInput), [xInput]);
  const ys = React.useMemo(() => parseNumbers(yInput), [yInput]);

  const result = React.useMemo<RegressionResult | null>(() => {
    if (xs.length < 2 || ys.length < 2) return null;
    return computeRegression(xs, ys);
  }, [xs, ys]);

  const predictedY = React.useMemo<number | null>(() => {
    if (!result) return null;
    const px = parseFloat(predictX);
    if (!Number.isFinite(px)) return null;
    return result.intercept + result.slope * px;
  }, [result, predictX]);

  function reset() {
    setXInput("");
    setYInput("");
    setPredictX("");
    setTouched(false);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
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

  const showError = touched && (xs.length < 2 || ys.length < 2 || xs.length !== ys.length);

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
              <Label htmlFor="lr-x">{t("field.xValues")}</Label>
              <Input
                id="lr-x"
                value={xInput}
                placeholder={t("placeholder.values")}
                onChange={(e) => { setXInput(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lr-y">{t("field.yValues")}</Label>
              <Input
                id="lr-y"
                value={yInput}
                placeholder={t("placeholder.values")}
                onChange={(e) => { setYInput(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lr-px">{t("field.predictX")}</Label>
            <Input
              id="lr-px"
              type="number"
              inputMode="decimal"
              value={predictX}
              placeholder={t("placeholder.optional")}
              onChange={(e) => setPredictX(e.target.value)}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="rounded border border-zinc-200 bg-white px-3 py-2 font-mono text-sm">
                {result.equation}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.slope")}</div>
                  <div className="text-xl font-semibold">{fmt(result.slope)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.intercept")}</div>
                  <div className="text-xl font-semibold">{fmt(result.intercept)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.r")}</div>
                  <div className="text-xl font-semibold">{fmt(result.r)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.r2")}</div>
                  <div className="text-xl font-semibold">{fmt(result.r2)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.se")}</div>
                  <div className="text-xl font-semibold">{fmt(result.se)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.n")}</div>
                  <div className="text-xl font-semibold">{result.n}</div>
                </div>
              </div>
              {predictedY !== null && (
                <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm">
                  <span className="font-medium">{t("result.predictedY")}: </span>
                  <span className="font-semibold">{fmt(predictedY)}</span>
                  {" "}
                  <span className="text-zinc-500">{t("result.forX", { x: predictX })}</span>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
