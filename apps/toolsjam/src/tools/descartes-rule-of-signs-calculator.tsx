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

interface SignAnalysis {
  polynomial: string;
  signs: string[];
  signChanges: number;
  possibleCounts: number[];
}

function parseCoefficients(input: string): number[] | null {
  const parts = input.split(",").map((s) => s.trim());
  if (parts.length < 2) return null;
  const nums = parts.map((p) => parseFloat(p));
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

function coeffsToPolynomial(coeffs: number[]): string {
  const degree = coeffs.length - 1;
  const terms: string[] = [];
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const power = degree - i;
    const absC = Math.abs(c);
    const sign = c < 0 ? "−" : terms.length === 0 ? "" : "+";
    const coefStr =
      absC === 1 && power > 0 ? "" : absC.toLocaleString("en-US");
    const varStr =
      power === 0 ? "" : power === 1 ? "x" : `x^${power}`;
    terms.push(`${sign}${coefStr}${varStr}`);
  });
  return terms.join(" ") || "0";
}

function analyzeSign(coeffs: number[]): SignAnalysis {
  const nonZero = coeffs.filter((c) => c !== 0);
  const signs = nonZero.map((c) => (c > 0 ? "+" : "−"));
  let changes = 0;
  for (let i = 1; i < signs.length; i++) {
    if (signs[i] !== signs[i - 1]) changes++;
  }
  const possibleCounts: number[] = [];
  for (let k = changes; k >= 0; k -= 2) {
    possibleCounts.push(k);
  }
  return {
    polynomial: coeffsToPolynomial(coeffs),
    signs,
    signChanges: changes,
    possibleCounts,
  };
}

function negateOddPowers(coeffs: number[]): number[] {
  const degree = coeffs.length - 1;
  return coeffs.map((c, i) => {
    const power = degree - i;
    return power % 2 === 1 ? -c : c;
  });
}

export default function DescartesRuleOfSignsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.descartes-rule-of-signs-calculator");
  const [input, setInput] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const coeffs = React.useMemo(() => parseCoefficients(input), [input]);
  const allZero = coeffs !== null && coeffs.every((c) => c === 0);

  const posAnalysis = React.useMemo<SignAnalysis | null>(() => {
    if (!coeffs || allZero) return null;
    return analyzeSign(coeffs);
  }, [coeffs, allZero]);

  const negAnalysis = React.useMemo<SignAnalysis | null>(() => {
    if (!coeffs || allZero) return null;
    return analyzeSign(negateOddPowers(coeffs));
  }, [coeffs, allZero]);

  function reset() {
    setInput("");
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

  const showInvalidError = touched && (coeffs === null);
  const showAllZeroError = touched && allZero;
  const showResult = touched && coeffs !== null && !allZero && posAnalysis && negAnalysis;

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
            <Label htmlFor="drs-coefficients">{t("field.coefficients")}</Label>
            <Input
              id="drs-coefficients"
              type="text"
              value={input}
              placeholder={t("placeholder.coefficients")}
              onChange={(e) => {
                setInput(e.target.value);
                setTouched(false);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.analyze")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showAllZeroError && (
            <p className="text-sm text-red-600">{t("error.allZero")}</p>
          )}

          {showResult && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500">
                  {t("result.polynomial")}
                </div>
                <div className="mt-1 font-mono text-lg font-semibold text-zinc-900">
                  f(x) = {posAnalysis!.polynomial}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <div className="font-semibold text-zinc-900">
                    {t("result.positiveHeading")}
                  </div>
                  <div className="mt-2 font-mono text-sm text-zinc-600">
                    {t("result.coeffSigns")}:{" "}
                    {posAnalysis!.signs.join(" ")}
                  </div>
                  <div className="mt-1 text-sm text-zinc-700">
                    {t("result.signChanges")}: {posAnalysis!.signChanges}
                  </div>
                  <div className="mt-1 text-sm text-zinc-700">
                    {t("result.possibleCounts")}:{" "}
                    {posAnalysis!.signChanges === 0
                      ? t("result.noChanges")
                      : posAnalysis!.possibleCounts.join(` ${t("result.or")} `)}
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <div className="font-semibold text-zinc-900">
                    {t("result.negativeHeading")}
                  </div>
                  <div className="mt-2 font-mono text-sm text-zinc-600">
                    {t("result.coeffSigns")}:{" "}
                    {negAnalysis!.signs.join(" ")}
                  </div>
                  <div className="mt-1 text-sm text-zinc-700">
                    {t("result.signChanges")}: {negAnalysis!.signChanges}
                  </div>
                  <div className="mt-1 text-sm text-zinc-700">
                    {t("result.possibleCounts")}:{" "}
                    {negAnalysis!.signChanges === 0
                      ? t("result.noChanges")
                      : negAnalysis!.possibleCounts.join(` ${t("result.or")} `)}
                  </div>
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
