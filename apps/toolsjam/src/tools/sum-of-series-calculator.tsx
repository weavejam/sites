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

type SeriesType = "arithmetic" | "geometric" | "harmonic" | "sumOfSquares";

const SERIES_TYPES: SeriesType[] = [
  "arithmetic",
  "geometric",
  "harmonic",
  "sumOfSquares",
];

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function calcSum(
  type: SeriesType,
  a: number,
  d: number,
  r: number,
  n: number
): number | null {
  if (!Number.isFinite(n) || n <= 0 || !Number.isInteger(n)) return null;
  switch (type) {
    case "arithmetic": {
      if (!Number.isFinite(a) || !Number.isFinite(d)) return null;
      return (n / 2) * (2 * a + (n - 1) * d);
    }
    case "geometric": {
      if (!Number.isFinite(a) || !Number.isFinite(r)) return null;
      if (r === 1) return a * n;
      return (a * (1 - Math.pow(r, n))) / (1 - r);
    }
    case "harmonic": {
      let s = 0;
      for (let i = 1; i <= n; i++) s += 1 / i;
      return s;
    }
    case "sumOfSquares": {
      return (n * (n + 1) * (2 * n + 1)) / 6;
    }
  }
}

export default function SumOfSeriesCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sum-of-series-calculator");
  const [seriesType, setSeriesType] = React.useState<SeriesType>("arithmetic");
  const [firstTerm, setFirstTerm] = React.useState("");
  const [commonDiff, setCommonDiff] = React.useState("");
  const [commonRatio, setCommonRatio] = React.useState("");
  const [numTerms, setNumTerms] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const n = parseFloat(numTerms);
  const a = parseFloat(firstTerm);
  const d = parseFloat(commonDiff);
  const r = parseFloat(commonRatio);

  const nValid = numTerms !== "" && Number.isFinite(n) && n > 0 && Number.isInteger(n);
  const aValid = firstTerm !== "" && Number.isFinite(a);
  const dValid = commonDiff !== "" && Number.isFinite(d);
  const rValid = commonRatio !== "" && Number.isFinite(r);

  function isInputValid(): boolean {
    if (!nValid) return false;
    if (seriesType === "arithmetic") return aValid && dValid;
    if (seriesType === "geometric") return aValid && rValid;
    return true; // harmonic / sumOfSquares only need n
  }

  const result = React.useMemo<number | null>(() => {
    if (!touched || !isInputValid()) return null;
    return calcSum(seriesType, a, d, r, n);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touched, seriesType, a, d, r, n, nValid, aValid, dValid, rValid]);

  function loadExample(
    type: SeriesType,
    fa: string,
    fd: string,
    fr: string,
    fn: string
  ) {
    setSeriesType(type);
    setFirstTerm(fa);
    setCommonDiff(fd);
    setCommonRatio(fr);
    setNumTerms(fn);
    setTouched(true);
  }

  function reset() {
    setFirstTerm("");
    setCommonDiff("");
    setCommonRatio("");
    setNumTerms("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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

  const showError = touched && !isInputValid();

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
            <Label>{t("field.seriesType")}</Label>
            <div className="flex flex-wrap gap-2">
              {SERIES_TYPES.map((st) => (
                <Button
                  key={st}
                  type="button"
                  variant={seriesType === st ? "default" : "outline"}
                  onClick={() => {
                    setSeriesType(st);
                    setTouched(false);
                  }}
                >
                  {t(`type.${st}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(seriesType === "arithmetic" || seriesType === "geometric") && (
              <div className="space-y-2">
                <Label htmlFor="sos-a">{t("field.firstTerm")}</Label>
                <Input
                  id="sos-a"
                  type="number"
                  inputMode="decimal"
                  value={firstTerm}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setFirstTerm(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {seriesType === "arithmetic" && (
              <div className="space-y-2">
                <Label htmlFor="sos-d">{t("field.commonDifference")}</Label>
                <Input
                  id="sos-d"
                  type="number"
                  inputMode="decimal"
                  value={commonDiff}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setCommonDiff(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {seriesType === "geometric" && (
              <div className="space-y-2">
                <Label htmlFor="sos-r">{t("field.commonRatio")}</Label>
                <Input
                  id="sos-r"
                  type="number"
                  inputMode="decimal"
                  value={commonRatio}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setCommonRatio(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="sos-n">{t("field.numTerms")}</Label>
              <Input
                id="sos-n"
                type="number"
                inputMode="numeric"
                value={numTerms}
                placeholder={t("placeholder.positiveInteger")}
                onChange={(e) => {
                  setNumTerms(e.target.value);
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {formatNumber(result)}
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                {t(`result.formula_${seriesType}` as never)}
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("arithmetic", "1", "2", "", "10")}
          >
            {t("examples.loadArithmetic")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("geometric", "2", "", "2", "8")}
          >
            {t("examples.loadGeometric")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("harmonic", "", "", "", "20")}
          >
            {t("examples.loadHarmonic")}
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
