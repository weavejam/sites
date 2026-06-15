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

interface Fraction {
  numerator: number;
  denominator: number;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const temp = x % y;
    x = y;
    y = temp;
  }
  return x || 1;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function normalizeFraction(numerator: number, denominator: number): Fraction | null {
  if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || denominator === 0) {
    return null;
  }

  const sign = denominator < 0 ? -1 : 1;
  const factor = gcd(numerator, denominator);
  return {
    numerator: (numerator / factor) * sign,
    denominator: Math.abs(denominator / factor),
  };
}

function decimalStringToFraction(value: string): Fraction | null {
  const trimmed = value.trim();
  if (!/^[+-]?\d+(?:\.\d+)?$/.test(trimmed)) return null;

  const sign = trimmed.startsWith("-") ? -1 : 1;
  const unsigned = trimmed.replace(/^[+-]/, "");
  const [whole, decimals = ""] = unsigned.split(".");
  const denominator = 10 ** decimals.length;
  const numerator = sign * Number(`${whole}${decimals}`);

  return normalizeFraction(numerator, denominator === 0 ? 1 : denominator);
}

function parseInput(value: string): Fraction | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;

  if (trimmed.includes("/")) {
    const parts = trimmed.split("/").map((part) => part.trim());
    if (parts.length !== 2) return null;

    const left = decimalStringToFraction(parts[0]);
    const right = decimalStringToFraction(parts[1]);
    if (!left || !right || right.numerator === 0) return null;

    return normalizeFraction(
      left.numerator * right.denominator,
      left.denominator * right.numerator,
    );
  }

  return decimalStringToFraction(trimmed);
}

function formatFraction(fraction: Fraction): string {
  return fraction.denominator === 1
    ? `${fraction.numerator}`
    : `${fraction.numerator}/${fraction.denominator}`;
}

export default function ReciprocalCalculator(_props: {
  locale: Locale;
}): React.ReactNode {
  const t = useTranslations("tool.reciprocal-calculator");
  const [inputValue, setInputValue] = React.useState("");
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

  const parsed = React.useMemo(() => parseInput(inputValue), [inputValue]);
  const reciprocal = React.useMemo(() => {
    if (!parsed || parsed.numerator === 0) return null;
    return normalizeFraction(parsed.denominator, parsed.numerator);
  }, [parsed]);

  const showError = submitted && (!parsed || !reciprocal);

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
    setInputValue("");
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
            <Label htmlFor="reciprocal-input">{t("field.number")}</Label>
            <Input
              id="reciprocal-input"
              value={inputValue}
              placeholder={t("placeholder.number")}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>

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

          {submitted && parsed && reciprocal && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-2 space-y-2 text-zinc-900">
                <p>{t("result.original", { value: formatFraction(parsed) })}</p>
                <p className="text-lg font-semibold">
                  {t("result.fraction", { value: formatFraction(reciprocal) })}
                </p>
                <p>
                  {t("result.decimal", {
                    value: formatNumber(reciprocal.numerator / reciprocal.denominator),
                  })}
                </p>
                <p className="text-xs text-zinc-500">{t("formula")}</p>
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
