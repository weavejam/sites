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

interface RegressionResult {
  slope: number;
  intercept: number;
  r: number;
  rSquared: number;
  meanX: number;
  meanY: number;
}

function computeRegression(xs: number[], ys: number[]): RegressionResult | null {
  const n = xs.length;
  if (n < 2 || ys.length !== n) return null;

  const meanX = xs.reduce((s, v) => s + v, 0) / n;
  const meanY = ys.reduce((s, v) => s + v, 0) / n;

  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    sxy += dx * dy;
    sxx += dx * dx;
    syy += dy * dy;
  }

  if (sxx === 0) return null;

  const slope = sxy / sxx;
  const intercept = meanY - slope * meanX;
  const r = syy === 0 ? 0 : sxy / Math.sqrt(sxx * syy);
  const rSquared = r * r;

  return { slope, intercept, r, rSquared, meanX, meanY };
}

function parseValues(input: string): number[] | null {
  const parts = input
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (parts.length < 2) return null;
  const nums = parts.map((s) => Number(s));
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

function fmt(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function LeastSquaresRegressionLineCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.least-squares-regression-line-calculator");
  const [xInput, setXInput] = React.useState("");
  const [yInput, setYInput] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const xs = React.useMemo(() => parseValues(xInput), [xInput]);
  const ys = React.useMemo(() => parseValues(yInput), [yInput]);

  const result = React.useMemo<RegressionResult | null>(() => {
    if (!xs || !ys) return null;
    return computeRegression(xs, ys);
  }, [xs, ys]);

  const showError =
    touched &&
    (xs === null || ys === null || xs.length !== (ys?.length ?? -1) || result === null);

  function reset() {
    setXInput("");
    setYInput("");
    setTouched(false);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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
              <Label htmlFor="lsr-x">{t("field.xValues")}</Label>
              <Input
                id="lsr-x"
                type="text"
                value={xInput}
                placeholder={t("placeholder.xValues")}
                onChange={(e) => {
                  setXInput(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lsr-y">{t("field.yValues")}</Label>
              <Input
                id="lsr-y"
                type="text"
                value={yInput}
                placeholder={t("placeholder.yValues")}
                onChange={(e) => {
                  setYInput(e.target.value);
                  setTouched(true);
                }}
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-xl font-semibold text-zinc-900">
                {t("result.equation")}: ŷ = {fmt(result.slope)}x{" "}
                {result.intercept >= 0 ? "+" : "−"} {fmt(Math.abs(result.intercept))}
              </div>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.slope")}:
                  </span>{" "}
                  {fmt(result.slope)}
                </div>
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.intercept")}:
                  </span>{" "}
                  {fmt(result.intercept)}
                </div>
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.r")}:
                  </span>{" "}
                  {fmt(result.r)}
                </div>
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.rSquared")}:
                  </span>{" "}
                  {fmt(result.rSquared)}
                </div>
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.meanX")}:
                  </span>{" "}
                  {fmt(result.meanX)}
                </div>
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.meanY")}:
                  </span>{" "}
                  {fmt(result.meanY)}
                </div>
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
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
