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

type Algorithm = "euclidean" | "primeFactorization";

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function computeGcf(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((acc, n) => gcd(acc, n), nums[0]);
}

function primeFactors(n: number): Map<number, number> {
  const factors = new Map<number, number>();
  for (let d = 2; d * d <= n; d++) {
    while (n % d === 0) {
      factors.set(d, (factors.get(d) ?? 0) + 1);
      n = n / d;
    }
  }
  if (n > 1) factors.set(n, (factors.get(n) ?? 0) + 1);
  return factors;
}

function gcfByPrimeFactorization(nums: number[]): { gcf: number; steps: string[] } {
  const allFactors = nums.map(primeFactors);
  const commonPrimes = new Map<number, number>();
  if (allFactors.length === 0) return { gcf: 0, steps: [] };
  allFactors[0].forEach((exp, prime) => {
    const minExp = allFactors.reduce((min, f) => Math.min(min, f.get(prime) ?? 0), exp);
    if (minExp > 0) commonPrimes.set(prime, minExp);
  });
  let gcfResult = 1;
  commonPrimes.forEach((exp, prime) => {
    gcfResult *= Math.pow(prime, exp);
  });

  const steps: string[] = nums.map((n) => {
    const f = primeFactors(n);
    const parts: string[] = [];
    f.forEach((exp, prime) => {
      parts.push(exp > 1 ? `${prime}^${exp}` : `${prime}`);
    });
    return `${n} = ${parts.join(" × ")}`;
  });
  const commonStr: string[] = [];
  commonPrimes.forEach((exp, prime) => {
    commonStr.push(exp > 1 ? `${prime}^${exp}` : `${prime}`);
  });
  steps.push(`GCF = ${commonStr.length > 0 ? commonStr.join(" × ") : "1"} = ${gcfResult}`);
  return { gcf: gcfResult, steps };
}

function parseNumbers(input: string): number[] | null {
  const parts = input.split(/[\s,]+/).filter((p) => p.trim() !== "");
  const nums = parts.map((p) => parseInt(p, 10));
  if (nums.some((n) => !Number.isFinite(n) || n <= 0)) return null;
  return nums;
}

const ALGORITHMS: Algorithm[] = ["euclidean", "primeFactorization"];

export default function GcfCalculatorGreatestCommonFactor(_props: { locale: Locale }) {
  const t = useTranslations("tool.gcf-calculator-greatest-common-factor");
  const [input, setInput] = React.useState<string>("");
  const [algorithm, setAlgorithm] = React.useState<Algorithm>("euclidean");
  const [touched, setTouched] = React.useState(false);

  const parsed = React.useMemo(() => (input.trim() ? parseNumbers(input) : null), [input]);
  const result = React.useMemo(() => {
    if (!parsed || parsed.length < 2) return null;
    if (algorithm === "primeFactorization") {
      return gcfByPrimeFactorization(parsed);
    }
    return { gcf: computeGcf(parsed), steps: [] as string[] };
  }, [parsed, algorithm]);

  const showError = touched && input.trim() !== "" && (parsed === null || parsed.length < 2);

  function reset() {
    setInput("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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
            <Label htmlFor="gcf-numbers">{t("field.numbers")}</Label>
            <Input
              id="gcf-numbers"
              type="text"
              value={input}
              placeholder={t("placeholder.numbers")}
              onChange={(e) => {
                setInput(e.target.value);
                setTouched(true);
              }}
            />
            <p className="text-xs text-zinc-500">{t("field.numbersHint")}</p>
          </div>

          <div className="space-y-2">
            <Label>{t("field.algorithm")}</Label>
            <div className="flex flex-wrap gap-2">
              {ALGORITHMS.map((alg) => (
                <Button
                  key={alg}
                  type="button"
                  variant={algorithm === alg ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAlgorithm(alg)}
                >
                  {t(`algorithm.${alg}` as never)}
                </Button>
              ))}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && !showError && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500">
                  {t("result.heading")}
                </div>
                <div className="mt-1 text-3xl font-bold text-zinc-900">
                  {result.gcf}
                </div>
              </div>
              {result.steps.length > 0 && (
                <div className="rounded-lg border border-zinc-200 p-4">
                  <div className="text-sm font-medium text-zinc-500 mb-2">
                    {t("result.steps")}
                  </div>
                  <ul className="space-y-1 text-sm font-mono text-zinc-700">
                    {result.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
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
