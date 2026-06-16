"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
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

interface WellsCriteria {
  clinicalSignsDVT: boolean;
  alternativeDiagnosis: boolean;
  heartRate: boolean;
  immobilization: boolean;
  previousDVT: boolean;
  hemoptysis: boolean;
  malignancy: boolean;
}

const WELLS_SCORES: Record<keyof WellsCriteria, number> = {
  clinicalSignsDVT: 3,
  alternativeDiagnosis: 3,
  heartRate: 1.5,
  immobilization: 1.5,
  previousDVT: 1.5,
  hemoptysis: 1,
  malignancy: 1,
};

function interpretScore(score: number): "low" | "moderate" | "high" {
  if (score <= 4) return "low";
  if (score <= 6) return "moderate";
  return "high";
}

type CriteriaKey = keyof WellsCriteria;

const CRITERIA_KEYS: CriteriaKey[] = [
  "clinicalSignsDVT",
  "alternativeDiagnosis",
  "heartRate",
  "immobilization",
  "previousDVT",
  "hemoptysis",
  "malignancy",
];

export default function WellsScoreCalculatorForPulmonaryEmbolism(_props: { locale: Locale }) {
  const t = useTranslations("tool.wells-score-calculator-for-pulmonary-embolism");

  const [criteria, setCriteria] = React.useState<WellsCriteria>({
    clinicalSignsDVT: false,
    alternativeDiagnosis: false,
    heartRate: false,
    immobilization: false,
    previousDVT: false,
    hemoptysis: false,
    malignancy: false,
  });
  const [touched, setTouched] = React.useState(false);

  const score = React.useMemo(() => {
    return CRITERIA_KEYS.reduce((sum, key) => sum + (criteria[key] ? WELLS_SCORES[key] : 0), 0);
  }, [criteria]);

  const category = React.useMemo(() => interpretScore(score), [score]);

  function toggleCriterion(key: CriteriaKey) {
    setCriteria((prev) => ({ ...prev, [key]: !prev[key] }));
    setTouched(true);
  }

  function reset() {
    setCriteria({
      clinicalSignsDVT: false,
      alternativeDiagnosis: false,
      heartRate: false,
      immobilization: false,
      previousDVT: false,
      hemoptysis: false,
      malignancy: false,
    });
    setTouched(false);
  }

  function loadExample(vals: Partial<WellsCriteria>) {
    setCriteria({
      clinicalSignsDVT: false,
      alternativeDiagnosis: false,
      heartRate: false,
      immobilization: false,
      previousDVT: false,
      hemoptysis: false,
      malignancy: false,
      ...vals,
    });
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
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "MedicalApplication",
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

  const categoryColors: Record<string, string> = {
    low: "text-green-700 bg-green-50 border-green-200",
    moderate: "text-amber-700 bg-amber-50 border-amber-200",
    high: "text-red-700 bg-red-50 border-red-200",
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
        <p className="text-sm text-zinc-500">{t("intro")}</p>
      </header>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        {t("disclaimer")}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {CRITERIA_KEYS.map((key) => {
              const points = WELLS_SCORES[key];
              const active = criteria[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleCriterion(key)}
                  className={`w-full flex items-center justify-between rounded-lg border p-3 text-left transition-colors ${
                    active
                      ? "border-blue-400 bg-blue-50 text-blue-900"
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <span className="text-sm font-medium">{t(`criterion.${key}` as never)}</span>
                  <span className={`ml-2 shrink-0 text-sm font-semibold ${active ? "text-blue-700" : "text-zinc-400"}`}>
                    +{points} {t("unit.pts")}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && (
            <div className={`rounded-lg border p-4 space-y-2 ${categoryColors[category]}`}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{t("result.heading")}</div>
                <div className="text-3xl font-bold">{score}</div>
              </div>
              <div className="text-lg font-semibold">{t(`result.category.${category}` as never)}</div>
              <div className="text-sm">{t(`result.probability.${category}` as never)}</div>
              <div className="text-sm mt-1">{t(`result.recommendation.${category}` as never)}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample({})}>
            {t("examples.loadLow")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample({ heartRate: true, immobilization: true, previousDVT: true, hemoptysis: true })}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample({ clinicalSignsDVT: true, alternativeDiagnosis: true, heartRate: true })}>
            {t("examples.loadHigh")}
          </Button>
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
