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

interface RadicalResult {
  coefficient: number;
  radicand: number;
  index: number;
}

function primeFactorize(n: number): Record<number, number> {
  const factors: Record<number, number> = {};
  let remaining = n;
  for (let p = 2; p * p <= remaining; p++) {
    while (remaining % p === 0) {
      factors[p] = (factors[p] ?? 0) + 1;
      remaining = Math.floor(remaining / p);
    }
  }
  if (remaining > 1) factors[remaining] = (factors[remaining] ?? 0) + 1;
  return factors;
}

function simplifyRadical(
  radicand: number,
  index: number
): RadicalResult | null {
  if (
    !Number.isInteger(radicand) ||
    radicand < 1 ||
    !Number.isInteger(index) ||
    index < 2
  )
    return null;

  const factors = primeFactorize(radicand);
  let coefficient = 1;
  let newRadicand = 1;

  for (const [primeStr, count] of Object.entries(factors)) {
    const prime = Number(primeStr);
    const outside = Math.floor(count / index);
    const inside = count % index;
    coefficient *= Math.pow(prime, outside);
    newRadicand *= Math.pow(prime, inside);
  }

  return { coefficient, radicand: newRadicand, index };
}

function getRadicalSymbol(index: number): string {
  if (index === 2) return "√";
  if (index === 3) return "∛";
  if (index === 4) return "∜";
  return `${index}√`;
}

function formatResult(r: RadicalResult): string {
  if (r.radicand === 1) return String(r.coefficient);
  const rootStr = getRadicalSymbol(r.index);
  if (r.coefficient === 1) return `${rootStr}${r.radicand}`;
  return `${r.coefficient}${rootStr}${r.radicand}`;
}

export default function SimplifyingRadicalsCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.simplifying-radicals-calculator");

  const [radicand, setRadicand] = React.useState<string>("");
  const [index, setIndex] = React.useState<string>("2");
  const [touched, setTouched] = React.useState(false);

  const radicandNum = parseFloat(radicand);
  const indexNum = parseFloat(index);
  const radicandValid =
    radicand !== "" &&
    Number.isInteger(radicandNum) &&
    radicandNum >= 1 &&
    radicandNum <= 1e12;
  const indexValid =
    index !== "" && Number.isInteger(indexNum) && indexNum >= 2 && indexNum <= 20;

  const result = React.useMemo<RadicalResult | null>(() => {
    if (!radicandValid || !indexValid) return null;
    return simplifyRadical(radicandNum, indexNum);
  }, [radicandNum, indexNum, radicandValid, indexValid]);

  function loadExample(a: string, n: string) {
    setRadicand(a);
    setIndex(n);
    setTouched(true);
  }

  function reset() {
    setRadicand("");
    setIndex("2");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const showError = touched && (!radicandValid || !indexValid);

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
              <Label htmlFor="src-radicand">{t("field.radicand")}</Label>
              <Input
                id="src-radicand"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={radicand}
                placeholder={t("placeholder.radicand")}
                onChange={(e) => {
                  setRadicand(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="src-index">{t("field.index")}</Label>
              <Input
                id="src-index"
                type="number"
                inputMode="numeric"
                min="2"
                step="1"
                value={index}
                placeholder={t("placeholder.index")}
                onChange={(e) => {
                  setIndex(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.simplify")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {formatResult(result)}
              </div>
              {result.radicand !== 1 && (
                <div className="mt-2 text-sm text-zinc-600">
                  {t("result.description", {
                    coefficient: result.coefficient,
                    radicand: result.radicand,
                    index: result.index,
                  })}
                </div>
              )}
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
            onClick={() => loadExample("50", "2")}
          >
            {t("examples.loadSquareRoot")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("54", "3")}
          >
            {t("examples.loadCubeRoot")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("81", "4")}
          >
            {t("examples.loadFourthRoot")}
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
