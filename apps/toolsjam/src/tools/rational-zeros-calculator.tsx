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

interface ParsedCoefficients {
  coefficients: number[];
}

interface RationalZeroItem {
  key: string;
  value: number;
  label: string;
}

interface RationalZeroResult {
  polynomial: string;
  pFactors: number[];
  qFactors: number[];
  zeros: RationalZeroItem[];
  zeroRootCount: number;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
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

function getDivisors(n: number): number[] {
  const value = Math.abs(n);
  const divisors = new Set<number>();
  for (let i = 1; i <= Math.sqrt(value); i++) {
    if (value % i === 0) {
      divisors.add(i);
      divisors.add(value / i);
    }
  }
  return Array.from(divisors).sort((a, b) => a - b);
}

function parseCoefficients(raw: string): ParsedCoefficients | null {
  const parts = raw
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  if (parts.length < 2) return null;

  const coefficients = parts.map((part) => Number(part));
  if (
    coefficients.some(
      (value, index) =>
        !Number.isInteger(value) || !Number.isFinite(value) || parts[index] === "",
    )
  ) {
    return null;
  }

  if (coefficients[0] === 0) return null;

  return { coefficients };
}

function buildPolynomial(coefficients: number[]): string {
  const degree = coefficients.length - 1;
  const terms: string[] = [];

  coefficients.forEach((coefficient, index) => {
    if (coefficient === 0) return;

    const power = degree - index;
    const absCoefficient = Math.abs(coefficient);
    const sign = coefficient < 0 ? "-" : "+";
    const coefficientText =
      power === 0
        ? `${absCoefficient}`
        : absCoefficient === 1
          ? ""
          : `${absCoefficient}`;
    const variableText =
      power === 0 ? "" : power === 1 ? "x" : `x^${power}`;
    const term = `${coefficientText}${variableText}`;

    if (terms.length === 0) {
      terms.push(coefficient < 0 ? `-${term}` : term);
      return;
    }

    terms.push(`${sign} ${term}`);
  });

  return terms.join(" ") || "0";
}

function computeRationalZeros(coefficients: number[]): RationalZeroResult | null {
  const reduced = [...coefficients];
  let zeroRootCount = 0;

  while (reduced.length > 1 && reduced[reduced.length - 1] === 0) {
    reduced.pop();
    zeroRootCount += 1;
  }

  if (reduced.length < 2) return null;

  const pFactors = getDivisors(Math.abs(reduced[reduced.length - 1]));
  const qFactors = getDivisors(Math.abs(reduced[0]));
  const zeroMap = new Map<string, RationalZeroItem>();

  if (zeroRootCount > 0) {
    zeroMap.set("0/1", { key: "0/1", value: 0, label: "0" });
  }

  for (const p of pFactors) {
    for (const q of qFactors) {
      for (const sign of [-1, 1]) {
        let numerator = sign * p;
        let denominator = q;
        const factor = gcd(numerator, denominator);
        numerator /= factor;
        denominator /= factor;
        const key = `${numerator}/${denominator}`;
        if (!zeroMap.has(key)) {
          zeroMap.set(key, {
            key,
            value: numerator / denominator,
            label:
              denominator === 1
                ? `${numerator}`
                : `${numerator}/${denominator} (${formatNumber(numerator / denominator)})`,
          });
        }
      }
    }
  }

  const zeros = Array.from(zeroMap.values()).sort((a, b) => a.value - b.value);

  return {
    polynomial: buildPolynomial(coefficients),
    pFactors,
    qFactors,
    zeros,
    zeroRootCount,
  };
}

export default function RationalZerosCalculator(_props: {
  locale: Locale;
}): React.ReactNode {
  const t = useTranslations("tool.rational-zeros-calculator");
  const [coefficientsInput, setCoefficientsInput] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const parsed = React.useMemo(
    () => parseCoefficients(coefficientsInput),
    [coefficientsInput],
  );
  const result = React.useMemo(
    () => (parsed ? computeRationalZeros(parsed.coefficients) : null),
    [parsed],
  );

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

  const showError = submitted && (!parsed || !result);

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
            <Label htmlFor="rzc-coefficients">{t("field.coefficients")}</Label>
            <Input
              id="rzc-coefficients"
              value={coefficientsInput}
              placeholder={t("placeholder.coefficients")}
              onChange={(event) => setCoefficientsInput(event.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setSubmitted(true)}>
              {t("button.calculate")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCoefficientsInput("");
                setSubmitted(false);
              }}
            >
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {submitted && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-2 space-y-2 text-zinc-900">
                <p className="text-lg font-semibold">
                  {t("result.polynomial", { polynomial: result.polynomial })}
                </p>
                <p className="text-sm">
                  {t("result.factorSets", {
                    p: result.pFactors.join(", "),
                    q: result.qFactors.join(", "),
                  })}
                </p>
                <p className="text-base font-medium">
                  {t("result.possibleZeros", {
                    count: result.zeros.length,
                    list: result.zeros.map((item) => item.label).join(", "),
                  })}
                </p>
                {result.zeroRootCount > 0 && (
                  <p className="text-sm text-zinc-600">
                    {t("result.zeroIncluded", {
                      count: result.zeroRootCount,
                    })}
                  </p>
                )}
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
