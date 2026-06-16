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

type YesNo = "yes" | "no" | "";

interface GenevaInputs {
  age: YesNo;
  previousDVT: YesNo;
  surgery: YesNo;
  malignancy: YesNo;
  unilateralLegPain: YesNo;
  hemoptysis: YesNo;
  heartRate: YesNo;
  heartRateHigh: YesNo;
  painOnPalpation: YesNo;
  edema: YesNo;
}

const CRITERION_POINTS: Record<keyof GenevaInputs, number> = {
  age: 1,
  previousDVT: 3,
  surgery: 2,
  malignancy: 2,
  unilateralLegPain: 3,
  hemoptysis: 2,
  heartRate: 3,
  heartRateHigh: 5,
  painOnPalpation: 4,
  edema: 4,
};

const CRITERIA_KEYS = Object.keys(CRITERION_POINTS) as (keyof GenevaInputs)[];

function computeGenevaScore(inputs: GenevaInputs): number {
  return CRITERIA_KEYS.reduce((sum, key) => {
    return sum + (inputs[key] === "yes" ? CRITERION_POINTS[key] : 0);
  }, 0);
}

function getRiskCategory(score: number): "low" | "moderate" | "high" {
  if (score <= 3) return "low";
  if (score <= 10) return "moderate";
  return "high";
}

const SELECT_CLASS =
  "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none";

const INITIAL_INPUTS: GenevaInputs = {
  age: "",
  previousDVT: "",
  surgery: "",
  malignancy: "",
  unilateralLegPain: "",
  hemoptysis: "",
  heartRate: "",
  heartRateHigh: "",
  painOnPalpation: "",
  edema: "",
};

export default function RevisedGenevaScoreCalculator(_props: { locale: Locale }) {
  const t = useTranslations(
    "tool.revised-geneva-score-calculator-for-pulmonary-embolism",
  );

  const [inputs, setInputs] = React.useState<GenevaInputs>({ ...INITIAL_INPUTS });
  const [touched, setTouched] = React.useState(false);

  function setField(key: keyof GenevaInputs, value: YesNo) {
    setInputs((prev) => {
      const next = { ...prev, [key]: value };
      // heart rate ranges are mutually exclusive — selecting one clears the other
      if (key === "heartRate" && value === "yes") next.heartRateHigh = "no";
      if (key === "heartRateHigh" && value === "yes") next.heartRate = "no";
      return next;
    });
    setTouched(true);
  }

  const allAnswered = CRITERIA_KEYS.every((k) => inputs[k] !== "");

  const result = React.useMemo(() => {
    if (!allAnswered) return null;
    const score = computeGenevaScore(inputs);
    const category = getRiskCategory(score);
    const probKey = `result.prob${category.charAt(0).toUpperCase()}${category.slice(1)}` as never;
    return { score, category, probKey };
  }, [allAnswered, inputs]);

  function loadExample(overrides: Partial<Record<keyof GenevaInputs, YesNo>>) {
    const newInputs = { ...INITIAL_INPUTS };
    for (const key of CRITERIA_KEYS) {
      newInputs[key] = overrides[key] ?? "no";
    }
    setInputs(newInputs);
    setTouched(true);
  }

  function reset() {
    setInputs({ ...INITIAL_INPUTS });
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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
          <div className="grid gap-4 sm:grid-cols-2">
            {CRITERIA_KEYS.map((key) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`rgs-${key}`}>{t(`criterion.${key}` as never)}</Label>
                <select
                  id={`rgs-${key}`}
                  value={inputs[key]}
                  onChange={(e) => setField(key, e.target.value as YesNo)}
                  className={SELECT_CLASS}
                >
                  <option value="">{t("placeholder.select")}</option>
                  <option value="yes">{t("option.yes")}</option>
                  <option value="no">{t("option.no")}</option>
                </select>
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

          {touched && !allAnswered && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalScore")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{result.score}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.riskCategory")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t(`result.${result.category}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.probability")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t(result.probKey)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample({})}
        >
          {t("examples.loadLow")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            loadExample({ age: "yes", unilateralLegPain: "yes", heartRate: "yes" })
          }
        >
          {t("examples.loadModerate")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            loadExample({
              previousDVT: "yes",
              hemoptysis: "yes",
              heartRateHigh: "yes",
              painOnPalpation: "yes",
              edema: "yes",
            })
          }
        >
          {t("examples.loadHigh")}
        </Button>
      </div>

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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
