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

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function primeFactors(n: number): number[] {
  n = Math.abs(n);
  const factors: number[] = [];
  for (let d = 2; d * d <= n; d++) {
    while (n % d === 0) {
      factors.push(d);
      n = Math.floor(n / d);
    }
  }
  if (n > 1) factors.push(n);
  return factors;
}

interface TerminatingResult {
  simplified: { num: number; den: number };
  decimalValue: number;
  primeFactors: number[];
  isTerminating: boolean;
  uniqueFactors: number[];
}

function analyze(numerator: number, denominator: number): TerminatingResult {
  const g = gcd(Math.abs(numerator), Math.abs(denominator));
  const sign = denominator < 0 ? -1 : 1;
  const simpNum = (sign * numerator) / g;
  const simpDen = (sign * denominator) / g;

  const factors = primeFactors(simpDen);
  const uniqueFactors = [...new Set(factors)].sort((a, b) => a - b);
  const isTerminating = uniqueFactors.every((f) => f === 2 || f === 5);

  return {
    simplified: { num: simpNum, den: simpDen },
    decimalValue: numerator / denominator,
    primeFactors: factors,
    isTerminating,
    uniqueFactors,
  };
}

export default function TerminatingDecimalsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.terminating-decimals-calculator");

  const [numerator, setNumerator] = React.useState("");
  const [denominator, setDenominator] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const numInt = parseInt(numerator, 10);
  const denInt = parseInt(denominator, 10);
  const numValid =
    numerator !== "" && Number.isFinite(numInt) && String(numInt) === numerator.trim();
  const denValid =
    denominator !== "" &&
    Number.isFinite(denInt) &&
    String(denInt) === denominator.trim() &&
    denInt !== 0;

  const result = React.useMemo<TerminatingResult | null>(() => {
    if (!numValid || !denValid) return null;
    return analyze(numInt, denInt);
  }, [numValid, denValid, numInt, denInt]);

  function reset() {
    setNumerator("");
    setDenominator("");
    setTouched(false);
  }

  function loadExample(num: string, den: string) {
    setNumerator(num);
    setDenominator(den);
    setTouched(true);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
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

  const showError = touched && (!numValid || !denValid);
  const showDenZeroError =
    touched &&
    numerator !== "" &&
    denominator !== "" &&
    denominator.trim() === "0";

  const decimalDisplay = React.useMemo(() => {
    if (!result) return "";
    const val = result.decimalValue;
    if (!Number.isFinite(val)) return "—";
    if (result.isTerminating) {
      return val.toLocaleString("en-US", { maximumFractionDigits: 15 });
    }
    return val.toFixed(10) + "…";
  }, [result]);

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
              <Label htmlFor="td-num">{t("field.numerator")}</Label>
              <Input
                id="td-num"
                type="number"
                inputMode="numeric"
                value={numerator}
                placeholder={t("field.numeratorPlaceholder")}
                onChange={(e) => { setNumerator(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="td-den">{t("field.denominator")}</Label>
              <Input
                id="td-den"
                type="number"
                inputMode="numeric"
                value={denominator}
                placeholder={t("field.denominatorPlaceholder")}
                onChange={(e) => { setDenominator(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.analyze")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showDenZeroError && (
            <p className="text-sm text-red-600">{t("error.denominatorZero")}</p>
          )}
          {showError && !showDenZeroError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && touched && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-zinc-500 w-44">{t("result.fractionType")}:</span>
                  <span
                    className={`font-semibold ${
                      result.isTerminating ? "text-green-700" : "text-amber-700"
                    }`}
                  >
                    {result.isTerminating
                      ? t("result.terminating")
                      : t("result.repeating")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-zinc-500 w-44">{t("result.decimalValue")}:</span>
                  <span className="font-semibold text-zinc-900">{decimalDisplay}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-zinc-500 w-44">{t("result.simplifiedFraction")}:</span>
                  <span className="font-medium text-zinc-800">
                    {result.simplified.num}/{result.simplified.den}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-zinc-500 w-44">{t("result.primeFactors")}:</span>
                  <span className="font-medium text-zinc-800">
                    {result.primeFactors.length === 0
                      ? "1"
                      : result.primeFactors.join(" × ")}
                  </span>
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
            onClick={() => loadExample("3", "8")}
          >
            {t("examples.loadExample1")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "3")}
          >
            {t("examples.loadExample2")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("7", "20")}
          >
            {t("examples.loadExample3")}
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
