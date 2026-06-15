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

type Mode = "simple" | "binomial";
type BinomialSign = "plus" | "minus";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface SimpleResult {
  original: string;
  multiplier: string;
  rationalized: string;
  decimal: string;
}

interface BinomialResult {
  original: string;
  conjugate: string;
  denominatorStep: string;
  rationalized: string;
  decimal: string;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function parseNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatRadical(value: number): string {
  return `√${formatNumber(value)}`;
}

function formatBinomial(rationalPart: number, sign: BinomialSign, radicalPart: number) {
  return `${formatNumber(rationalPart)} ${
    sign === "plus" ? "+" : "-"
  } ${formatRadical(radicalPart)}`;
}

export default function RationalizeDenominatorCalculator(_props: {
  locale: Locale;
}): React.ReactNode {
  const t = useTranslations("tool.rationalize-denominator-calculator");
  const [mode, setMode] = React.useState<Mode>("simple");
  const [sign, setSign] = React.useState<BinomialSign>("plus");
  const [numerator, setNumerator] = React.useState("");
  const [radicand, setRadicand] = React.useState("");
  const [rationalPart, setRationalPart] = React.useState("");
  const [radicalPart, setRadicalPart] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const items: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) items.push({ q, a });
      } catch {
        break;
      }
    }
    return items;
  }, [t]);

  const numeratorValue = parseNumber(numerator);
  const radicandValue = parseNumber(radicand);
  const rationalPartValue = parseNumber(rationalPart);
  const radicalPartValue = parseNumber(radicalPart);

  const simpleResult = React.useMemo<SimpleResult | null>(() => {
    if (mode !== "simple" || numeratorValue === null || radicandValue === null) {
      return null;
    }
    if (radicandValue <= 0) return null;

    return {
      original: `${formatNumber(numeratorValue)}/${formatRadical(radicandValue)}`,
      multiplier: `${formatRadical(radicandValue)}/${formatRadical(radicandValue)}`,
      rationalized: `(${formatNumber(numeratorValue)}${formatRadical(radicandValue)})/${formatNumber(radicandValue)}`,
      decimal: formatNumber(numeratorValue / Math.sqrt(radicandValue)),
    };
  }, [mode, numeratorValue, radicandValue]);

  const binomialResult = React.useMemo<BinomialResult | null>(() => {
    if (
      mode !== "binomial" ||
      numeratorValue === null ||
      rationalPartValue === null ||
      radicalPartValue === null
    ) {
      return null;
    }

    if (radicalPartValue <= 0) return null;

    const radicalValue = Math.sqrt(radicalPartValue);
    const originalDenominator =
      sign === "plus" ? rationalPartValue + radicalValue : rationalPartValue - radicalValue;
    const rationalizedDenominator = rationalPartValue ** 2 - radicalPartValue;

    if (originalDenominator === 0 || rationalizedDenominator === 0) return null;

    const conjugateSign = sign === "plus" ? "minus" : "plus";
    const conjugate = formatBinomial(rationalPartValue, conjugateSign, radicalPartValue);

    return {
      original: `${formatNumber(numeratorValue)}/(${formatBinomial(
        rationalPartValue,
        sign,
        radicalPartValue,
      )})`,
      conjugate,
      denominatorStep: `(${formatBinomial(
        rationalPartValue,
        sign,
        radicalPartValue,
      )})(${conjugate}) = ${formatNumber(rationalizedDenominator)}`,
      rationalized: `${formatNumber(numeratorValue)}(${conjugate})/${formatNumber(
        rationalizedDenominator,
      )}`,
      decimal: formatNumber(numeratorValue / originalDenominator),
    };
  }, [mode, numeratorValue, rationalPartValue, radicalPartValue, sign]);

  const showError =
    submitted &&
    ((mode === "simple" && !simpleResult) || (mode === "binomial" && !binomialResult));

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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  function reset(): void {
    setNumerator("");
    setRadicand("");
    setRationalPart("");
    setRadicalPart("");
    setSign("plus");
    setSubmitted(false);
  }

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
            <Label>{t("field.mode")}</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={mode === "simple" ? "default" : "outline"}
                onClick={() => {
                  setMode("simple");
                  setSubmitted(false);
                }}
              >
                {t("type.simple")}
              </Button>
              <Button
                type="button"
                variant={mode === "binomial" ? "default" : "outline"}
                onClick={() => {
                  setMode("binomial");
                  setSubmitted(false);
                }}
              >
                {t("type.binomial")}
              </Button>
            </div>
          </div>

          {mode === "simple" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rdc-simple-a">{t("field.numeratorVal")}</Label>
                <Input
                  id="rdc-simple-a"
                  type="number"
                  inputMode="decimal"
                  value={numerator}
                  onChange={(event) => setNumerator(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rdc-simple-b">{t("field.radicand")}</Label>
                <Input
                  id="rdc-simple-b"
                  type="number"
                  inputMode="decimal"
                  value={radicand}
                  onChange={(event) => setRadicand(event.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rdc-binomial-a">{t("field.numerator")}</Label>
                <Input
                  id="rdc-binomial-a"
                  type="number"
                  inputMode="decimal"
                  value={numerator}
                  onChange={(event) => setNumerator(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("field.sign")}</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={sign === "plus" ? "default" : "outline"}
                    onClick={() => setSign("plus")}
                  >
                    {t("type.plus")}
                  </Button>
                  <Button
                    type="button"
                    variant={sign === "minus" ? "default" : "outline"}
                    onClick={() => setSign("minus")}
                  >
                    {t("type.minus")}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rdc-binomial-c">{t("field.rationalPart")}</Label>
                <Input
                  id="rdc-binomial-c"
                  type="number"
                  inputMode="decimal"
                  value={rationalPart}
                  onChange={(event) => setRationalPart(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rdc-binomial-b">{t("field.radicalPart")}</Label>
                <Input
                  id="rdc-binomial-b"
                  type="number"
                  inputMode="decimal"
                  value={radicalPart}
                  onChange={(event) => setRadicalPart(event.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setSubmitted(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {submitted && mode === "simple" && simpleResult && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-2 space-y-2 text-zinc-900">
                <p>{t("result.original", { value: simpleResult.original })}</p>
                <p>{t("result.multiplier", { value: simpleResult.multiplier })}</p>
                <p className="text-lg font-semibold">
                  {t("result.rationalized", { value: simpleResult.rationalized })}
                </p>
                <p>{t("result.decimal", { value: simpleResult.decimal })}</p>
                <p className="text-xs text-zinc-500">{t("formula.simple")}</p>
              </div>
            </div>
          )}

          {submitted && mode === "binomial" && binomialResult && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-2 space-y-2 text-zinc-900">
                <p>{t("result.original", { value: binomialResult.original })}</p>
                <p>{t("result.conjugate", { value: binomialResult.conjugate })}</p>
                <p>{t("result.denominator", { value: binomialResult.denominatorStep })}</p>
                <p className="text-lg font-semibold">
                  {t("result.rationalized", { value: binomialResult.rationalized })}
                </p>
                <p>{t("result.decimal", { value: binomialResult.decimal })}</p>
                <p className="text-xs text-zinc-500">{t("formula.binomial")}</p>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">
                    {example.note ?? ""}
                  </td>
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
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
