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

interface EmpiricalResult {
  mean: number;
  stdDev: number;
  sigma1Lo: number;
  sigma1Hi: number;
  sigma2Lo: number;
  sigma2Hi: number;
  sigma3Lo: number;
  sigma3Hi: number;
}

function fmt(n: number, dp = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(dp);
}

function computeEmpirical(mean: number, stdDev: number): EmpiricalResult {
  return {
    mean,
    stdDev,
    sigma1Lo: mean - stdDev,
    sigma1Hi: mean + stdDev,
    sigma2Lo: mean - 2 * stdDev,
    sigma2Hi: mean + 2 * stdDev,
    sigma3Lo: mean - 3 * stdDev,
    sigma3Hi: mean + 3 * stdDev,
  };
}

export default function EmpiricalRuleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.empirical-rule-calculator");
  const [mean, setMean] = React.useState("");
  const [stdDev, setStdDev] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const meanNum = parseFloat(mean);
  const stdDevNum = parseFloat(stdDev);
  const meanValid = mean !== "" && Number.isFinite(meanNum);
  const stdDevValid = stdDev !== "" && Number.isFinite(stdDevNum) && stdDevNum > 0;

  const result = React.useMemo<EmpiricalResult | null>(() => {
    if (!touched || !meanValid || !stdDevValid) return null;
    return computeEmpirical(meanNum, stdDevNum);
  }, [touched, meanValid, stdDevValid, meanNum, stdDevNum]);

  const showError = touched && (!meanValid || !stdDevValid);
  const showNegSigmaError = touched && meanValid && stdDev !== "" && Number.isFinite(stdDevNum) && stdDevNum <= 0;

  function loadExample(m: string, s: string) {
    setMean(m);
    setStdDev(s);
    setTouched(true);
  }

  function reset() {
    setMean("");
    setStdDev("");
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
              <Label htmlFor="erc-mean">{t("field.mean")}</Label>
              <Input
                id="erc-mean"
                type="number"
                inputMode="decimal"
                value={mean}
                placeholder={t("placeholder.mean")}
                onChange={(e) => {
                  setMean(e.target.value);
                  setTouched(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="erc-sd">{t("field.stdDev")}</Label>
              <Input
                id="erc-sd"
                type="number"
                inputMode="decimal"
                value={stdDev}
                placeholder={t("placeholder.stdDev")}
                onChange={(e) => {
                  setStdDev(e.target.value);
                  setTouched(false);
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

          {showNegSigmaError && (
            <p className="text-sm text-red-600">{t("error.negSigma")}</p>
          )}
          {showError && !showNegSigmaError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {[
                {
                  label: t("result.sigma1Label"),
                  pct: "68.27%",
                  lo: result.sigma1Lo,
                  hi: result.sigma1Hi,
                  color: "bg-blue-100 border-blue-300",
                },
                {
                  label: t("result.sigma2Label"),
                  pct: "95.45%",
                  lo: result.sigma2Lo,
                  hi: result.sigma2Hi,
                  color: "bg-purple-100 border-purple-300",
                },
                {
                  label: t("result.sigma3Label"),
                  pct: "99.73%",
                  lo: result.sigma3Lo,
                  hi: result.sigma3Hi,
                  color: "bg-green-100 border-green-300",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`rounded-lg border p-4 ${row.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-800">
                      {row.label}
                    </span>
                    <span className="text-lg font-bold text-zinc-900">
                      {row.pct}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-zinc-700">
                    {t("result.rangeLabel", {
                      lo: fmt(row.lo, 4),
                      hi: fmt(row.hi, 4),
                    })}
                  </div>
                </div>
              ))}
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
            onClick={() => loadExample("100", "15")}
          >
            {t("examples.loadIQ")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("175", "7")}
          >
            {t("examples.loadHeight")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("78", "6")}
          >
            {t("examples.loadExam")}
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
