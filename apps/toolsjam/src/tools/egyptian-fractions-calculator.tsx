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

interface EgyptianStep {
  fraction: string;
  unitFraction: string;
  remainder: string;
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function computeEgyptianFractions(
  numIn: number,
  denIn: number
): { terms: string[]; steps: EgyptianStep[]; largestDenominator: number } | null {
  if (numIn <= 0 || denIn <= 0 || numIn >= denIn) return null;
  const MAX_ITERATIONS = 50;
  let num = numIn;
  let den = denIn;
  const terms: string[] = [];
  const steps: EgyptianStep[] = [];
  let iterations = 0;

  while (num > 0 && iterations < MAX_ITERATIONS) {
    iterations++;
    const unitDen = Math.ceil(den / num);
    terms.push(`1/${unitDen}`);
    const remainderNum = num * unitDen - den;
    const remainderDen = den * unitDen;
    const g = gcd(Math.abs(remainderNum), remainderDen);
    const newNum = remainderNum / g;
    const newDen = remainderDen / g;
    steps.push({
      fraction: `${num}/${den}`,
      unitFraction: `1/${unitDen}`,
      remainder: newNum > 0 ? `${newNum}/${newDen}` : "0",
    });
    num = newNum;
    den = newDen;
    if (num === 0) break;
  }

  const largestDenominator = terms.reduce((max, t) => {
    const n = parseInt(t.split("/")[1], 10);
    return n > max ? n : max;
  }, 0);

  return { terms, steps, largestDenominator };
}

export default function EgyptianFractionsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.egyptian-fractions-calculator");
  const [numStr, setNumStr] = React.useState("");
  const [denStr, setDenStr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const num = parseInt(numStr, 10);
  const den = parseInt(denStr, 10);
  const numValid = numStr !== "" && /^\d+$/.test(numStr.trim()) && Number.isInteger(num) && num > 0;
  const denValid = denStr !== "" && /^\d+$/.test(denStr.trim()) && Number.isInteger(den) && den > 0;
  const allValid = numValid && denValid;
  const isProper = allValid && num < den;

  const result = React.useMemo(() => {
    if (!allValid || !isProper) return null;
    const g = gcd(num, den);
    const sNum = num / g;
    const sDen = den / g;
    if (sNum === 1) return { alreadyUnit: true, simplifiedFraction: `1/${sDen}`, terms: [`1/${sDen}`], steps: [], largestDenominator: sDen };
    const computation = computeEgyptianFractions(sNum, sDen);
    if (!computation) return null;
    return { alreadyUnit: false, simplifiedFraction: `${sNum}/${sDen}`, ...computation };
  }, [allValid, isProper, num, den]);

  function reset() {
    setNumStr("");
    setDenStr("");
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

  const showInvalidError = touched && (numStr !== "" || denStr !== "") && !allValid;
  const showImproperError = touched && allValid && !isProper;

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
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
              <Label htmlFor="ef-num">{t("field.numerator")}</Label>
              <Input
                id="ef-num"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={numStr}
                placeholder={t("placeholder.numerator")}
                onChange={(e) => { setNumStr(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ef-den">{t("field.denominator")}</Label>
              <Input
                id="ef-den"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={denStr}
                placeholder={t("placeholder.denominator")}
                onChange={(e) => { setDenStr(e.target.value); setTouched(true); }}
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

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showImproperError && (
            <p className="text-sm text-red-600">{t("error.improper")}</p>
          )}

          {result && touched && allValid && isProper && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.originalFraction")}</div>
                  <div className="text-xl font-bold text-zinc-900">{num}/{den}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.simplified")}</div>
                  <div className="text-xl font-bold text-zinc-900">{result.simplifiedFraction}</div>
                </div>
              </div>
              {result.alreadyUnit ? (
                <p className="text-sm text-zinc-600">{t("error.alreadyUnit")}</p>
              ) : (
                <>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">{t("result.egyptianForm")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {result.terms.join(" + ")}
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 text-sm">
                    <div>
                      <span className="text-zinc-500">{t("result.totalTerms")}: </span>
                      <span className="font-medium text-zinc-900">{result.terms.length}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">{t("result.largestDenominator")}: </span>
                      <span className="font-medium text-zinc-900">{result.largestDenominator}</span>
                    </div>
                  </div>
                  {result.steps.length > 0 && (
                    <div>
                      <div className="text-xs text-zinc-500 mb-2">{t("result.steps")}</div>
                      <div className="space-y-1">
                        {result.steps.map((step, i) => (
                          <div key={i} className="text-sm text-zinc-700 font-mono">
                            {step.fraction} → −{step.unitFraction} → {t("result.remainderLabel")} {step.remainder}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
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
