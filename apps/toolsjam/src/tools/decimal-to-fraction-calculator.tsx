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
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

interface FractionResult {
  numerator: number;
  denominator: number;
  simplified: boolean;
  wholeNumber: number | null;
}

function decimalToFraction(inputStr: string): FractionResult {
  // Work from the string to avoid binary floating-point artifacts
  const isNegative = inputStr.startsWith("-");
  const absStr = isNegative ? inputStr.slice(1) : inputStr;
  const dotIdx = absStr.indexOf(".");
  const decimalPlaces = dotIdx >= 0 ? absStr.length - dotIdx - 1 : 0;

  const denominator = Math.pow(10, decimalPlaces);
  // Remove the decimal point and parse as integer
  const intStr = absStr.replace(".", "");
  const numeratorRaw = parseInt(intStr, 10);

  if (!Number.isFinite(numeratorRaw) || !Number.isFinite(denominator) || denominator === 0) {
    return { numerator: 0, denominator: 1, simplified: false, wholeNumber: null };
  }

  const g = gcd(numeratorRaw, denominator);
  const finalNum = isNegative ? -(numeratorRaw / g) : numeratorRaw / g;
  const finalDen = denominator / g;
  const wholeNumber = Math.trunc(finalNum / finalDen);

  return {
    numerator: finalNum,
    denominator: finalDen,
    simplified: g > 1,
    wholeNumber: Math.abs(wholeNumber) > 0 ? wholeNumber : null,
  };
}

export default function DecimalToFractionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.decimal-to-fraction-calculator");

  const [decimal, setDecimal] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const decNum = parseFloat(decimal);
  const isValid = decimal !== "" && Number.isFinite(decNum) &&
    !/[eE]/.test(decimal);  // reject scientific notation — only plain decimal strings

  const result = React.useMemo<FractionResult | null>(() => {
    if (!isValid) return null;
    return decimalToFraction(decimal);
  }, [isValid, decimal]);

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

  function reset() {
    setDecimal("");
    setTouched(false);
  }

  const showError = touched && !isValid;

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
            <Label htmlFor="dtf-decimal">{t("field.decimal")}</Label>
            <Input
              id="dtf-decimal"
              type="number"
              inputMode="decimal"
              value={decimal}
              placeholder={t("placeholder.decimal")}
              onChange={(e) => {
                setDecimal(e.target.value);
                setTouched(true);
              }}
            />
            <p className="text-xs text-zinc-500">{t("field.decimalHint")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.convert")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {result.numerator}/{result.denominator}
              </div>
              {result.simplified && (
                <div className="text-sm text-zinc-600">
                  {t("result.simplified")}
                </div>
              )}
              {result.wholeNumber !== null && Math.abs(result.numerator) > Math.abs(result.denominator) && (
                <div className="text-sm text-zinc-600">
                  {t("result.mixed")}: {Math.trunc(result.numerator / result.denominator)}&nbsp;
                  {Math.abs(result.numerator % result.denominator)}/{result.denominator}
                </div>
              )}
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
