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

interface LognormalResult {
  pdf: number;
  cdf: number;
  ccdf: number;
  mean: number;
  median: number;
  mode: number;
  variance: number;
  stdDev: number;
}

function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const p = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const r = 1 - p * Math.exp(-x * x);
  return x >= 0 ? r : -r;
}

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function computeLognormal(mu: number, sigma: number, x: number): LognormalResult | null {
  if (sigma <= 0 || x <= 0) return null;

  const ln_x = Math.log(x);
  const z = (ln_x - mu) / sigma;

  const pdf = (1 / (x * sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
  const cdf = normalCDF(z);
  const ccdf = 1 - cdf;

  const mean = Math.exp(mu + sigma * sigma / 2);
  const median = Math.exp(mu);
  const mode = Math.exp(mu - sigma * sigma);
  const variance = (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
  const stdDev = Math.sqrt(variance);

  return { pdf, cdf, ccdf, mean, median, mode, variance, stdDev };
}

function fmt(n: number, d = 6): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function LognormalDistributionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.lognormal-distribution-calculator");

  const [mu, setMu] = React.useState("");
  const [sigma, setSigma] = React.useState("");
  const [xVal, setXVal] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const muNum = parseFloat(mu);
  const sigmaNum = parseFloat(sigma);
  const xNum = parseFloat(xVal);

  const result = React.useMemo<LognormalResult | null>(() => {
    if (!Number.isFinite(muNum) || !Number.isFinite(sigmaNum) || !Number.isFinite(xNum)) return null;
    return computeLognormal(muNum, sigmaNum, xNum);
  }, [muNum, sigmaNum, xNum]);

  function reset() {
    setMu(""); setSigma(""); setXVal(""); setTouched(false);
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ln-mu">{t("field.mu")}</Label>
              <Input
                id="ln-mu"
                type="number"
                inputMode="decimal"
                value={mu}
                placeholder={t("placeholder.mu")}
                onChange={(e) => { setMu(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ln-sigma">{t("field.sigma")}</Label>
              <Input
                id="ln-sigma"
                type="number"
                inputMode="decimal"
                value={sigma}
                placeholder={t("placeholder.sigma")}
                onChange={(e) => { setSigma(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ln-x">{t("field.x")}</Label>
              <Input
                id="ln-x"
                type="number"
                inputMode="decimal"
                value={xVal}
                placeholder={t("placeholder.x")}
                onChange={(e) => { setXVal(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>

              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t("result.pointHeading")}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.pdf")}</div>
                    <div className="text-xl font-semibold">{fmt(result.pdf)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.cdf")}</div>
                    <div className="text-xl font-semibold">{fmt(result.cdf)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.ccdf")}</div>
                    <div className="text-xl font-semibold">{fmt(result.ccdf)}</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t("result.distHeading")}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.mean")}</div>
                    <div className="text-xl font-semibold">{fmt(result.mean)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.median")}</div>
                    <div className="text-xl font-semibold">{fmt(result.median)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.mode")}</div>
                    <div className="text-xl font-semibold">{fmt(result.mode)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.variance")}</div>
                    <div className="text-xl font-semibold">{fmt(result.variance)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.stdDev")}</div>
                    <div className="text-xl font-semibold">{fmt(result.stdDev)}</div>
                  </div>
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
