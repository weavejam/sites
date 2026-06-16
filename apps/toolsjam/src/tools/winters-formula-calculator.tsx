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

interface FaqItem {
  q: string;
  a: string;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function parseData(raw: string): number[] | null {
  const parts = raw
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return null;
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

function holtwinters(
  data: number[],
  alpha: number,
  beta: number,
  gamma: number,
  s: number,
  h: number,
): number[] {
  const n = data.length;
  // Initialise level as mean of first season
  let L = data.slice(0, s).reduce((a, b) => a + b, 0) / s;
  // Initialise trend
  let T = 0;
  if (n >= 2 * s) {
    const mean2 = data.slice(s, 2 * s).reduce((a, b) => a + b, 0) / s;
    T = (mean2 - L) / s;
  }
  // Initialise seasonal factors
  const seasonal = data.slice(0, s).map((v) => (L !== 0 ? v / L : 1));

  for (let t = s; t < n; t++) {
    const prevL = L;
    const si = seasonal[(t - s) % s] || 1;
    L = alpha * (data[t] / si) + (1 - alpha) * (L + T);
    T = beta * (L - prevL) + (1 - beta) * T;
    seasonal[t % s] = gamma * (data[t] / L) + (1 - gamma) * si;
  }

  return Array.from({ length: h }, (_, i) => {
    const si = seasonal[(n + i) % s] || 1;
    return (L + (i + 1) * T) * si;
  });
}

function formatForecast(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

export default function WintersFormulaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.winters-formula-calculator");

  const [dataRaw, setDataRaw] = React.useState("");
  const [alpha, setAlpha] = React.useState("0.3");
  const [beta, setBeta] = React.useState("0.1");
  const [gamma, setGamma] = React.useState("0.2");
  const [seasonalPeriod, setSeasonalPeriod] = React.useState("12");
  const [forecastPeriods, setForecastPeriods] = React.useState("6");
  const [touched, setTouched] = React.useState(false);

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

  const result = React.useMemo<
    { forecast: number[]; error: string | null } | null
  >(() => {
    if (!touched) return null;
    const data = parseData(dataRaw);
    const a = parseFloat(alpha);
    const b = parseFloat(beta);
    const g = parseFloat(gamma);
    const sp = parseInt(seasonalPeriod, 10);
    const fp = parseInt(forecastPeriods, 10);

    if (!data) return { forecast: [], error: t("error.invalid") };
    if (
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      !Number.isFinite(g) ||
      a < 0 || a > 1 || b < 0 || b > 1 || g < 0 || g > 1
    )
      return { forecast: [], error: t("error.paramRange") };
    if (!Number.isFinite(sp) || sp < 2)
      return { forecast: [], error: t("error.periodMin") };
    if (!Number.isFinite(fp) || fp < 1)
      return { forecast: [], error: t("error.forecastMin") };
    if (data.length < 2 * sp)
      return { forecast: [], error: t("error.insufficient") };

    const forecast = holtwinters(data, a, b, g, sp, fp);
    return { forecast, error: null };
  }, [touched, dataRaw, alpha, beta, gamma, seasonalPeriod, forecastPeriods, t]);

  function loadScenario(
    data: string,
    a: string,
    b: string,
    g: string,
    sp: string,
    fp: string,
  ) {
    setDataRaw(data);
    setAlpha(a);
    setBeta(b);
    setGamma(g);
    setSeasonalPeriod(sp);
    setForecastPeriods(fp);
    setTouched(true);
  }

  function reset() {
    setDataRaw("");
    setAlpha("0.3");
    setBeta("0.1");
    setGamma("0.2");
    setSeasonalPeriod("12");
    setForecastPeriods("6");
    setTouched(false);
  }

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
          <div className="space-y-2">
            <Label htmlFor="wf-data">{t("field.data")}</Label>
            <Input
              id="wf-data"
              type="text"
              value={dataRaw}
              placeholder={t("placeholder.data")}
              onChange={(e) => {
                setDataRaw(e.target.value);
                setTouched(false);
              }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="wf-alpha">{t("field.alpha")}</Label>
              <Input
                id="wf-alpha"
                type="number"
                inputMode="decimal"
                min="0"
                max="1"
                step="0.05"
                value={alpha}
                placeholder={t("placeholder.alpha")}
                onChange={(e) => setAlpha(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wf-beta">{t("field.beta")}</Label>
              <Input
                id="wf-beta"
                type="number"
                inputMode="decimal"
                min="0"
                max="1"
                step="0.05"
                value={beta}
                placeholder={t("placeholder.beta")}
                onChange={(e) => setBeta(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wf-gamma">{t("field.gamma")}</Label>
              <Input
                id="wf-gamma"
                type="number"
                inputMode="decimal"
                min="0"
                max="1"
                step="0.05"
                value={gamma}
                placeholder={t("placeholder.gamma")}
                onChange={(e) => setGamma(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wf-sp">{t("field.seasonalPeriod")}</Label>
              <Input
                id="wf-sp"
                type="number"
                inputMode="numeric"
                min="2"
                step="1"
                value={seasonalPeriod}
                placeholder={t("placeholder.seasonalPeriod")}
                onChange={(e) => setSeasonalPeriod(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wf-fp">{t("field.forecastPeriods")}</Label>
              <Input
                id="wf-fp"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={forecastPeriods}
                placeholder={t("placeholder.forecastPeriods")}
                onChange={(e) => setForecastPeriods(e.target.value)}
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

          {result?.error && (
            <p className="text-sm text-red-600">{result.error}</p>
          )}

          {result && !result.error && result.forecast.length > 0 && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="px-3 py-2 font-semibold">
                        {t("result.periodLabel")}
                      </th>
                      <th className="px-3 py-2 font-semibold">
                        {t("result.valueLabel")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.forecast.map((v, i) => (
                      <tr key={i} className="border-b border-zinc-100">
                        <td className="px-3 py-2 text-zinc-600">
                          +{i + 1}
                        </td>
                        <td className="px-3 py-2 font-medium text-zinc-900">
                          {formatForecast(v)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadScenario(
                "1200,1350,1500,1800,2000,2200,2400,2600,2800,3000,3200,3500,1400,1600,1750,2100,2300,2500,2700,2900,3100,3300,3500,3800",
                "0.3",
                "0.1",
                "0.2",
                "12",
                "6",
              )
            }
          >
            {t("examples.loadMonthly")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadScenario(
                "50000,60000,70000,80000,55000,65000,75000,85000",
                "0.2",
                "0.05",
                "0.15",
                "4",
                "4",
              )
            }
          >
            {t("examples.loadQuarterly")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadScenario(
                "100,110,120,130,140,150,160,170,180,190,200,210",
                "0.25",
                "0.08",
                "0.18",
                "4",
                "8",
              )
            }
          >
            {t("examples.loadWeekly")}
          </Button>
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
