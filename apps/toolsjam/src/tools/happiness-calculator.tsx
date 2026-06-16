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

type DimensionKey =
  | "lifeSatisfaction"
  | "relationships"
  | "career"
  | "health"
  | "growth"
  | "finance"
  | "balance"
  | "purpose";

const DIMENSIONS: DimensionKey[] = [
  "lifeSatisfaction",
  "relationships",
  "career",
  "health",
  "growth",
  "finance",
  "balance",
  "purpose",
];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function getLevel(score: number): "low" | "moderate" | "good" | "excellent" {
  if (score < 4) return "low";
  if (score < 6) return "moderate";
  if (score < 8) return "good";
  return "excellent";
}

export default function HappinessCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.happiness-calculator");

  const [values, setValues] = React.useState<Record<DimensionKey, string>>({
    lifeSatisfaction: "",
    relationships: "",
    career: "",
    health: "",
    growth: "",
    finance: "",
    balance: "",
    purpose: "",
  });
  const [touched, setTouched] = React.useState(false);

  function handleChange(key: DimensionKey, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
    setTouched(true);
  }

  const parsed = React.useMemo(() => {
    return DIMENSIONS.reduce(
      (acc, k) => {
        acc[k] = parseFloat(values[k]);
        return acc;
      },
      {} as Record<DimensionKey, number>
    );
  }, [values]);

  const allFilled = DIMENSIONS.every((k) => values[k] !== "");
  const allValid = DIMENSIONS.every(
    (k) => Number.isFinite(parsed[k]) && parsed[k] >= 1 && parsed[k] <= 10
  );

  const validationError = React.useMemo(() => {
    if (!touched) return null;
    if (!allFilled) return t("error.required");
    if (!allValid) return t("error.range");
    return null;
  }, [touched, allFilled, allValid, t]);

  const result = React.useMemo(() => {
    if (!touched || !allFilled || !allValid) return null;
    // Weighted: lifeSatisfaction weight 1.5, others 1.0
    const weightedSum =
      parsed.lifeSatisfaction * 1.5 +
      parsed.relationships +
      parsed.career +
      parsed.health +
      parsed.growth +
      parsed.finance +
      parsed.balance +
      parsed.purpose;
    const totalWeight = 1.5 + 7;
    const score = Math.round((weightedSum / totalWeight) * 10) / 10;
    const level = getLevel(score);
    return { score, level };
  }, [touched, allFilled, allValid, parsed]);

  function reset() {
    setValues({
      lifeSatisfaction: "",
      relationships: "",
      career: "",
      health: "",
      growth: "",
      finance: "",
      balance: "",
      purpose: "",
    });
    setTouched(false);
  }

  function loadExample(vals: Record<DimensionKey, string>) {
    setValues(vals);
    setTouched(true);
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
        applicationCategory: "HealthApplication",
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
          <div className="grid gap-4 sm:grid-cols-2">
            {DIMENSIONS.map((key) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`hc-${key}`}>{t(`field.${key}` as never)}</Label>
                <Input
                  id={`hc-${key}`}
                  type="number"
                  inputMode="decimal"
                  min={1}
                  max={10}
                  value={values[key]}
                  placeholder={t("placeholder.score")}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {validationError && (
            <p className="text-sm text-red-600">{validationError}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-zinc-900">
                  {result.score}
                </span>
                <span className="text-lg text-zinc-500">{t("result.outOf")}</span>
              </div>
              <div>
                <span className="text-sm text-zinc-500">{t("result.level")}: </span>
                <span className="font-semibold text-zinc-900">
                  {t(`level.${result.level}` as never)}
                </span>
              </div>
              <div className="text-sm text-zinc-700">
                <span className="font-medium">{t("result.recommendation")}: </span>
                {t(`recommendation.${result.level}` as never)}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-700">{t("examples.heading")}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample({
                    lifeSatisfaction: "9",
                    relationships: "9",
                    career: "8",
                    health: "8",
                    growth: "9",
                    finance: "8",
                    balance: "7",
                    purpose: "9",
                  })
                }
              >
                {t("button.loadHigh")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample({
                    lifeSatisfaction: "7",
                    relationships: "8",
                    career: "7",
                    health: "7",
                    growth: "6",
                    finance: "7",
                    balance: "8",
                    purpose: "7",
                  })
                }
              >
                {t("button.loadBalanced")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample({
                    lifeSatisfaction: "4",
                    relationships: "6",
                    career: "4",
                    health: "5",
                    growth: "3",
                    finance: "3",
                    balance: "4",
                    purpose: "4",
                  })
                }
              >
                {t("button.loadImprovement")}
              </Button>
            </div>
          </div>
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
