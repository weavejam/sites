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
  n: number;
  meanX: number;
  meanY: number;
  slope: number;
  intercept: number;
  r: number;
  r2: number;
}

function parseValues(raw: string): number[] | null {
  const parts = raw.split(/[\s,;]+/).filter((s) => s.trim() !== "");
  const nums = parts.map((p) => parseFloat(p));
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

function computeRegression(xs: number[], ys: number[]): RegressionResult {
  const n = xs.length;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;

  let ssXX = 0, ssXY = 0, ssYY = 0;
  for (let i = 0; i < n; i++) {
    ssXX += (xs[i] - meanX) ** 2;
    ssXY += (xs[i] - meanX) * (ys[i] - meanY);
    ssYY += (ys[i] - meanY) ** 2;
  }

  const slope = ssXX === 0 ? 0 : ssXY / ssXX;
  const intercept = meanY - slope * meanX;
  const r = ssXX === 0 || ssYY === 0 ? 0 : ssXY / Math.sqrt(ssXX * ssYY);
  const r2 = r * r;

  return { n, meanX, meanY, slope, intercept, r, r2 };
}

function fmt(n: number, dp = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(dp).replace(/\.?0+$/, "");
}

export default function ScatterPlotCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.scatter-plot-calculator");
  const [xRaw, setXRaw] = React.useState<string>("");
  const [yRaw, setYRaw] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<{ data: RegressionResult } | { error: string } | null>(() => {
    if (!touched) return null;
    const xs = parseValues(xRaw);
    const ys = parseValues(yRaw);
    if (!xs || !ys) return { error: t("error.invalidNumbers") };
    if (xs.length < 2 || ys.length < 2) return { error: t("error.tooFew") };
    if (xs.length !== ys.length) return { error: t("error.lengthMismatch") };
    return { data: computeRegression(xs, ys) };
  }, [touched, xRaw, yRaw, t]);

  function reset() {
    setXRaw("");
    setYRaw("");
    setTouched(false);
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
              <Label htmlFor="sp-x">{t("field.xValues")}</Label>
              <Input
                id="sp-x"
                type="text"
                value={xRaw}
                placeholder={t("placeholder.values")}
                onChange={(e) => { setXRaw(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sp-y">{t("field.yValues")}</Label>
              <Input
                id="sp-y"
                type="text"
                value={yRaw}
                placeholder={t("placeholder.values")}
                onChange={(e) => { setYRaw(e.target.value); setTouched(false); }}
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

          {result !== null && (
            "error" in result ? (
              <p className="text-sm text-red-600">{result.error}</p>
            ) : (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2 text-sm">
                <div className="font-semibold text-zinc-700">{t("result.heading")}</div>
                <div className="grid gap-1 sm:grid-cols-2">
                  <span className="text-zinc-500">{t("result.n")}:</span>
                  <span className="font-mono font-semibold">{result.data.n}</span>
                  <span className="text-zinc-500">{t("result.meanX")}:</span>
                  <span className="font-mono">{fmt(result.data.meanX)}</span>
                  <span className="text-zinc-500">{t("result.meanY")}:</span>
                  <span className="font-mono">{fmt(result.data.meanY)}</span>
                  <span className="text-zinc-500">{t("result.slope")}:</span>
                  <span className="font-mono font-semibold">{fmt(result.data.slope)}</span>
                  <span className="text-zinc-500">{t("result.intercept")}:</span>
                  <span className="font-mono font-semibold">{fmt(result.data.intercept)}</span>
                  <span className="text-zinc-500">{t("result.r")}:</span>
                  <span className="font-mono font-semibold">{fmt(result.data.r, 6)}</span>
                  <span className="text-zinc-500">{t("result.r2")}:</span>
                  <span className="font-mono">{fmt(result.data.r2, 6)}</span>
                </div>
                <div className="mt-2 text-zinc-600">
                  {t("result.equation")}: y = {fmt(result.data.slope)}x{" "}
                  {result.data.intercept >= 0
                    ? `+ ${fmt(result.data.intercept)}`
                    : `− ${fmt(Math.abs(result.data.intercept))}`}
                </div>
              </div>
            )
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
