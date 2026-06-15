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

interface QuotientResult {
  quotient: number;
  remainder: number;
}

function calcQuotient(dividend: number, divisor: number): QuotientResult {
  // Euclidean division: remainder is always non-negative (0 ≤ r < |divisor|)
  const r = dividend % divisor;
  const remainder = r < 0 ? r + Math.abs(divisor) : r;
  const quotient = (dividend - remainder) / divisor;
  return { quotient, remainder };
}

export default function QuotientCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.quotient-calculator");

  const [dividendStr, setDividendStr] = React.useState("");
  const [divisorStr, setDivisorStr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const dividendNum = parseFloat(dividendStr);
  const divisorNum = parseFloat(divisorStr);
  const dividendValid =
    dividendStr !== "" && Number.isFinite(dividendNum) && Number.isInteger(dividendNum);
  const divisorValid =
    divisorStr !== "" && Number.isFinite(divisorNum) && Number.isInteger(divisorNum) && divisorNum !== 0;

  const result = React.useMemo<QuotientResult | null>(() => {
    if (!dividendValid || !divisorValid) return null;
    return calcQuotient(dividendNum, divisorNum);
  }, [dividendValid, divisorValid, dividendNum, divisorNum]);

  function loadExample(d: string, v: string) {
    setDividendStr(d);
    setDivisorStr(v);
    setTouched(true);
  }

  function reset() {
    setDividendStr("");
    setDivisorStr("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const showInputError = touched && (!dividendValid || divisorStr === "" || !Number.isFinite(divisorNum));
  const showDivError = touched && divisorStr !== "" && Number.isFinite(divisorNum) && divisorNum === 0;

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
              <Label htmlFor="qc-dividend">{t("field.dividend")}</Label>
              <Input
                id="qc-dividend"
                type="number"
                inputMode="numeric"
                value={dividendStr}
                placeholder={t("placeholder.integer")}
                onChange={(e) => {
                  setDividendStr(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qc-divisor">{t("field.divisor")}</Label>
              <Input
                id="qc-divisor"
                type="number"
                inputMode="numeric"
                value={divisorStr}
                placeholder={t("placeholder.integer")}
                onChange={(e) => {
                  setDivisorStr(e.target.value);
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

          {showInputError && !showDivError && (
            <p className="text-sm text-red-600">{t("error.invalidInput")}</p>
          )}
          {showDivError && (
            <p className="text-sm text-red-600">{t("error.divideByZero")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-xl font-semibold text-zinc-900 font-mono">
                {t("result.expression", {
                  dividend: dividendNum,
                  divisor: divisorNum,
                  quotient: result.quotient,
                  remainder: result.remainder,
                })}
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                {t("result.check", {
                  quotient: result.quotient,
                  divisor: divisorNum,
                  remainder: result.remainder,
                  dividend: dividendNum,
                })}
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
            onClick={() => loadExample("100", "8")}
          >
            {t("examples.load1")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("52", "5")}
          >
            {t("examples.load2")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("64", "4")}
          >
            {t("examples.load3")}
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
