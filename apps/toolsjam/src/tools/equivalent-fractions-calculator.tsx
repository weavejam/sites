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
  simplifiedNumerator: number;
  simplifiedDenominator: number;
  decimal: number;
  equivalents: { numerator: number; denominator: number }[];
  targetNumerator?: number;
  targetDenominator?: number;
  hasTargetResult: boolean;
  noTargetEquivalent: boolean;
}

function computeFractions(
  numerator: number,
  denominator: number,
  targetDenominator?: number
): FractionResult {
  const g = gcd(numerator, denominator);
  const sn = numerator / g;
  const sd = denominator / g;
  const decimal = numerator / denominator;

  const equivalents: { numerator: number; denominator: number }[] = [];
  for (let k = 2; k <= 6; k++) {
    equivalents.push({ numerator: numerator * k, denominator: denominator * k });
  }

  let targetNum: number | undefined;
  let targetDenom: number | undefined;
  let hasTargetResult = false;
  let noTargetEquivalent = false;

  if (targetDenominator !== undefined && targetDenominator > 0) {
    // Try to find an equivalent by scaling the simplified form
    const k = targetDenominator / sd;
    if (Number.isInteger(k) && k > 0) {
      targetNum = sn * k;
      targetDenom = targetDenominator;
      hasTargetResult = true;
    } else {
      noTargetEquivalent = true;
    }
  }

  return {
    simplifiedNumerator: sn,
    simplifiedDenominator: sd,
    decimal,
    equivalents,
    targetNumerator: targetNum,
    targetDenominator: targetDenom,
    hasTargetResult,
    noTargetEquivalent,
  };
}

export default function EquivalentFractionsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.equivalent-fractions-calculator");
  const [numerator, setNumerator] = React.useState("");
  const [denominator, setDenominator] = React.useState("");
  const [targetDenom, setTargetDenom] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const numVal = parseInt(numerator, 10);
  const denomVal = parseInt(denominator, 10);
  const targetVal = targetDenom !== "" ? parseInt(targetDenom, 10) : undefined;

  // Must be a positive integer with no decimal or scientific notation
  function isPositiveInt(s: string, v: number): boolean {
    return s !== "" && /^\d+$/.test(s.trim()) && Number.isInteger(v) && v > 0;
  }

  const numValid = isPositiveInt(numerator, numVal);
  const denomValid = isPositiveInt(denominator, denomVal);
  const targetValid = targetDenom === "" || (targetVal !== undefined && isPositiveInt(targetDenom, targetVal));

  const result = React.useMemo<FractionResult | null>(() => {
    if (!numValid || !denomValid) return null;
    return computeFractions(numVal, denomVal, targetDenom !== "" && targetValid ? targetVal : undefined);
  }, [numVal, denomVal, targetVal, numValid, denomValid, targetValid, targetDenom]);

  function loadExample(n: string, d: string, td: string = "") {
    setNumerator(n);
    setDenominator(d);
    setTargetDenom(td);
    setTouched(true);
  }

  function reset() {
    setNumerator("");
    setDenominator("");
    setTargetDenom("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const showNumError = touched && !numValid && numerator !== "";
  const showDenomError = touched && !denomValid && denominator !== "";
  const showTargetError = touched && targetDenom !== "" && !targetValid;
  const showGenericError = touched && (!numValid || !denomValid) && numerator === "" || denominator === "";

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
              <Label htmlFor="ef-num">{t("field.numerator")}</Label>
              <Input
                id="ef-num"
                type="number"
                inputMode="numeric"
                value={numerator}
                placeholder={t("placeholder.integer")}
                onChange={(e) => { setNumerator(e.target.value); setTouched(true); }}
              />
              {showNumError && (
                <p className="text-xs text-red-600">{t("error.invalidNumerator")}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ef-denom">{t("field.denominator")}</Label>
              <Input
                id="ef-denom"
                type="number"
                inputMode="numeric"
                value={denominator}
                placeholder={t("placeholder.integer")}
                onChange={(e) => { setDenominator(e.target.value); setTouched(true); }}
              />
              {showDenomError && (
                <p className="text-xs text-red-600">{t("error.invalidDenominator")}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ef-target">{t("field.targetDenominator")}</Label>
              <Input
                id="ef-target"
                type="number"
                inputMode="numeric"
                value={targetDenom}
                placeholder={t("placeholder.targetDenom")}
                onChange={(e) => { setTargetDenom(e.target.value); setTouched(true); }}
              />
              {showTargetError && (
                <p className="text-xs text-red-600">{t("error.invalidTarget")}</p>
              )}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.simplified")}: </span>
                  <span className="font-semibold text-zinc-900">
                    {result.simplifiedNumerator}/{result.simplifiedDenominator}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.decimal")}: </span>
                  <span className="font-semibold text-zinc-900">
                    {result.decimal.toLocaleString("en-US", { maximumFractionDigits: 10 })}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.equivalents")}: </span>
                  <span className="font-semibold text-zinc-900">
                    {result.equivalents.map((e) => `${e.numerator}/${e.denominator}`).join(", ")} …
                  </span>
                </div>
                {result.hasTargetResult && result.targetNumerator !== undefined && result.targetDenominator !== undefined && (
                  <div>
                    <span className="text-zinc-500">{t("result.targetResult")}: </span>
                    <span className="font-semibold text-zinc-900">
                      {result.targetNumerator}/{result.targetDenominator}
                    </span>
                  </div>
                )}
                {result.noTargetEquivalent && (
                  <p className="text-sm text-amber-600">{t("error.noTargetEquivalent")}</p>
                )}
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("1", "2")}>
            {t("examples.loadBasic")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("3", "4", "12")}>
            {t("examples.loadTarget")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("6", "9")}>
            {t("examples.loadSimplify")}
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
