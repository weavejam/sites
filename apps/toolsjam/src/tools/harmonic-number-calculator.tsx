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

const EULER_GAMMA = 0.5772156649015329;
const MAX_N = 1000000;

function formatValue(value: number): string {
  return value.toFixed(10);
}

export default function HarmonicNumberCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.harmonic-number-calculator");
  const [termNumber, setTermNumber] = React.useState("");
  const [showBreakdown, setShowBreakdown] = React.useState(false);
  const [showApproximation, setShowApproximation] = React.useState(true);
  const [submitted, setSubmitted] = React.useState(false);

  const howtoSteps = t.raw("howto.steps") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const examplesItems = t.raw("examples.items") as {
    input: string;
    output: string;
    note?: string;
  }[];

  const result = React.useMemo(() => {
    if (!submitted) return null;
    const n = Number(termNumber);
    if (!Number.isInteger(n) || n <= 0) return { error: "invalid" as const };
    if (n > MAX_N) return { error: "tooLarge" as const };

    let value = 0;
    for (let index = 1; index <= n; index += 1) {
      value += 1 / index;
    }

    const terms = Array.from({ length: Math.min(n, 20) }, (_, index) => `1/${index + 1}`).join(
      " + ",
    );

    return {
      n,
      value,
      approximation: Math.log(n) + EULER_GAMMA + 1 / (2 * n),
      breakdown: n > 20 ? `${terms} + ... + 1/${n}` : terms,
    };
  }, [showApproximation, showBreakdown, submitted, termNumber]);

  function reset() {
    setTermNumber("");
    setShowBreakdown(false);
    setShowApproximation(true);
    setSubmitted(false);
  }

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

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="termNumber">{t("field.termNumber")}</Label>
            <Input
              id="termNumber"
              type="number"
              inputMode="numeric"
              value={termNumber}
              onChange={(event) => {
                setTermNumber(event.target.value);
                setSubmitted(false);
              }}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                id="showBreakdown"
                type="checkbox"
                checked={showBreakdown}
                onChange={(event) => setShowBreakdown(event.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="showBreakdown">{t("field.showBreakdown")}</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="showApproximation"
                type="checkbox"
                checked={showApproximation}
                onChange={(event) => setShowApproximation(event.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="showApproximation">{t("field.showApproximation")}</Label>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setSubmitted(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result && "error" in result && (
            <p className="text-sm text-red-600">{t(`error.${result.error}` as never)}</p>
          )}

          {result && !("error" in result) && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="font-semibold text-zinc-900">
                {t("result.value", { n: result.n, value: formatValue(result.value) })}
              </div>
              {showApproximation && (
                <div className="text-zinc-800">
                  {t("result.approximation", { value: formatValue(result.approximation) })}
                </div>
              )}
              {showBreakdown && (
                <div className="text-zinc-800">{t("result.breakdown", { value: result.breakdown })}</div>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{example.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
