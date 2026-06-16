"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SELECT_CLS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type YesNo = "no" | "yes";

interface Factors {
  age65: YesNo;
  cadRiskFactors: YesNo;
  knownCad: YesNo;
  stChanges: YesNo;
  angina: YesNo;
  aspirin: YesNo;
  biomarkers: YesNo;
}

const FACTOR_KEYS: (keyof Factors)[] = [
  "age65",
  "cadRiskFactors",
  "knownCad",
  "stChanges",
  "angina",
  "aspirin",
  "biomarkers",
];

const DEFAULT_FACTORS: Factors = {
  age65: "no",
  cadRiskFactors: "no",
  knownCad: "no",
  stChanges: "no",
  angina: "no",
  aspirin: "no",
  biomarkers: "no",
};

interface RiskRow {
  minScore: number;
  maxScore: number;
  rate: number;
  level: string;
}

const RISK_TABLE: RiskRow[] = [
  { minScore: 0, maxScore: 1, rate: 4.7, level: "low" },
  { minScore: 2, maxScore: 2, rate: 8.3, level: "lowModerate" },
  { minScore: 3, maxScore: 3, rate: 13.2, level: "moderate" },
  { minScore: 4, maxScore: 4, rate: 19.9, level: "moderateHigh" },
  { minScore: 5, maxScore: 5, rate: 26.2, level: "high" },
  { minScore: 6, maxScore: 7, rate: 40.9, level: "veryHigh" },
];

function getRisk(score: number): RiskRow {
  return (
    RISK_TABLE.find((r) => score >= r.minScore && score <= r.maxScore) ??
    RISK_TABLE[RISK_TABLE.length - 1]
  );
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export default function TimiScoreCalculatorForUaNstemi(
  _props: { locale: Locale },
) {
  const t = useTranslations("tool.timi-score-calculator-for-ua-nstemi");

  const [factors, setFactors] = React.useState<Factors>(DEFAULT_FACTORS);
  const [touched, setTouched] = React.useState(false);

  const score = FACTOR_KEYS.reduce(
    (sum, k) => sum + (factors[k] === "yes" ? 1 : 0),
    0,
  );
  const risk = getRisk(score);

  function setFactor(key: keyof Factors, val: YesNo) {
    setFactors((prev) => ({ ...prev, [key]: val }));
    setTouched(true);
  }

  function loadExample(preset: Partial<Factors>) {
    setFactors({ ...DEFAULT_FACTORS, ...preset });
    setTouched(true);
  }

  function reset() {
    setFactors(DEFAULT_FACTORS);
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

  const faqItems: FaqItem[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
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
        <CardContent className="space-y-4">
          {FACTOR_KEYS.map((key) => (
            <div key={key} className="space-y-1">
              <Label htmlFor={`timi-ua-${key}`}>{t(`field.${key}` as never)}</Label>
              <select
                id={`timi-ua-${key}`}
                className={SELECT_CLS}
                value={factors[key]}
                onChange={(e) => setFactor(key, e.target.value as YesNo)}
              >
                <option value="no">{t("option.no")}</option>
                <option value="yes">{t("option.yes")}</option>
              </select>
            </div>
          ))}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.score")}</div>
                  <div className="text-3xl font-bold text-zinc-900">
                    {score} / 7
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.eventRate")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    ~{risk.rate}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.riskLevel")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`risk.${risk.level}` as never)}
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample({})}
          >
            {t("button.loadLowRisk")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({ age65: "yes", knownCad: "yes", stChanges: "yes" })
            }
          >
            {t("button.loadModerateRisk")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                age65: "yes",
                cadRiskFactors: "yes",
                knownCad: "yes",
                stChanges: "yes",
                angina: "yes",
                aspirin: "yes",
                biomarkers: "yes",
              })
            }
          >
            {t("button.loadHighRisk")}
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
