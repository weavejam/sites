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

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

interface SequenceResult {
  sum: number;
  lastTerm: number;
  formula: string;
}

function computeSum(a: number, d: number, n: number): SequenceResult {
  const sum = (n / 2) * (2 * a + (n - 1) * d);
  const lastTerm = a + (n - 1) * d;
  const formula = `Sn = ${n}/2 × [2×${a} + (${n}−1)×${d}] = ${formatNumber(sum)}`;
  return { sum, lastTerm, formula };
}

export default function SumOfALinearNumberSequenceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sum-of-a-linear-number-sequence-calculator");

  const [firstTerm, setFirstTerm] = React.useState("");
  const [commonDiff, setCommonDiff] = React.useState("");
  const [numTerms, setNumTerms] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(firstTerm);
  const dNum = parseFloat(commonDiff);
  const nNum = Number(numTerms);
  const nInt = Math.floor(nNum);

  const aValid = firstTerm !== "" && Number.isFinite(aNum);
  const dValid = commonDiff !== "" && Number.isFinite(dNum);
  const nValid = numTerms !== "" && Number.isFinite(nNum) && nNum === nInt && nInt >= 1;
  const allValid = aValid && dValid && nValid;

  const result = React.useMemo<SequenceResult | null>(() => {
    if (!allValid) return null;
    return computeSum(aNum, dNum, nInt);
  }, [allValid, aNum, dNum, nInt]);

  function reset() {
    setFirstTerm(""); setCommonDiff(""); setNumTerms(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  const showInvalid = touched && (!aValid || !dValid);
  const showNTermsError = touched && numTerms !== "" && !nValid;

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="slns-a">{t("field.firstTerm")}</Label>
              <Input
                id="slns-a"
                type="number"
                inputMode="decimal"
                value={firstTerm}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setFirstTerm(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slns-d">{t("field.commonDiff")}</Label>
              <Input
                id="slns-d"
                type="number"
                inputMode="decimal"
                value={commonDiff}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setCommonDiff(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slns-n">{t("field.numTerms")}</Label>
              <Input
                id="slns-n"
                type="number"
                inputMode="numeric"
                value={numTerms}
                placeholder={t("placeholder.integer")}
                onChange={(e) => { setNumTerms(e.target.value); setTouched(true); }}
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

          {showInvalid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showNTermsError && (
            <p className="text-sm text-red-600">{t("error.numTerms")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-sm text-zinc-500">{t("result.sumLabel")}: </span>
                  <span className="text-2xl font-bold text-zinc-900">{formatNumber(result.sum)}</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.lastTermLabel")}: </span>
                  <span className="text-xl font-semibold text-zinc-900">{formatNumber(result.lastTerm)}</span>
                </div>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {t("result.formulaLabel")}: {result.formula}
              </div>
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
