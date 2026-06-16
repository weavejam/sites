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

type WeightUnit = "kg" | "lbs";
type ActivityLevel =
  | "sedentary"
  | "lightlyActive"
  | "moderatelyActive"
  | "veryActive"
  | "eliteAthlete";
type FitnessGoal = "maintenance" | "weightLoss" | "muscleBuilding";

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 0.8,
  lightlyActive: 1.0,
  moderatelyActive: 1.2,
  veryActive: 1.6,
  eliteAthlete: 2.0,
};

const GOAL_FACTORS: Record<FitnessGoal, number> = {
  maintenance: 1.0,
  weightLoss: 1.2,
  muscleBuilding: 1.8,
};

function getAgeFactor(age: number): number {
  if (age >= 65) return 1.2;
  if (age >= 50) return 1.1;
  return 1.0;
}

function formatNum(n: number): string {
  return Math.round(n).toString();
}

export default function ProteinCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.protein-calculator");

  const [bodyWeight, setBodyWeight] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>("kg");
  const [age, setAge] = React.useState("");
  const [activityLevel, setActivityLevel] =
    React.useState<ActivityLevel>("sedentary");
  const [fitnessGoal, setFitnessGoal] =
    React.useState<FitnessGoal>("maintenance");
  const [bodyFat, setBodyFat] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(bodyWeight);
  const ageNum = parseFloat(age);
  const bodyFatNum = parseFloat(bodyFat);
  const weightValid = bodyWeight !== "" && Number.isFinite(weightNum) && weightNum > 0;
  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum > 0;
  const bodyFatValid =
    bodyFat !== "" && Number.isFinite(bodyFatNum) && bodyFatNum >= 0 && bodyFatNum < 100;

  const result = React.useMemo<{
    protein: number;
    weightKg: number;
    lbm: number | null;
    usedLbm: boolean;
  } | null>(() => {
    if (!weightValid || !ageValid) return null;

    const weightKg = weightUnit === "lbs" ? weightNum / 2.2046 : weightNum;
    const lbm = bodyFatValid ? weightKg * (1 - bodyFatNum / 100) : null;
    const base = lbm !== null ? lbm : weightKg;
    const ageFactor = getAgeFactor(ageNum);
    const protein =
      base *
      ACTIVITY_FACTORS[activityLevel] *
      GOAL_FACTORS[fitnessGoal] *
      ageFactor;

    return {
      protein,
      weightKg: Math.round(weightKg * 10) / 10,
      lbm: lbm !== null ? Math.round(lbm * 10) / 10 : null,
      usedLbm: lbm !== null,
    };
  }, [
    weightValid,
    ageValid,
    weightNum,
    weightUnit,
    ageNum,
    activityLevel,
    fitnessGoal,
    bodyFatNum,
    bodyFatValid,
  ]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const showError = touched && (!weightValid || !ageValid);

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

  function reset() {
    setBodyWeight("");
    setWeightUnit("kg");
    setAge("");
    setActivityLevel("sedentary");
    setFitnessGoal("maintenance");
    setBodyFat("");
    setTouched(false);
  }

  const selectClass =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

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
            <div className="space-y-2">
              <Label htmlFor="pc-weight">{t("field.bodyWeight")}</Label>
              <div className="flex gap-2">
                <Input
                  id="pc-weight"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  value={bodyWeight}
                  placeholder={t("placeholder.bodyWeight")}
                  onChange={(e) => {
                    setBodyWeight(e.target.value);
                    setTouched(true);
                  }}
                />
                <select
                  aria-label={t("field.weightUnit")}
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
                  className={`w-20 shrink-0 ${selectClass}`}
                >
                  <option value="kg">{t("unit.kg")}</option>
                  <option value="lbs">{t("unit.lbs")}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pc-age">{t("field.age")}</Label>
              <Input
                id="pc-age"
                type="number"
                inputMode="numeric"
                min="1"
                max="120"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => {
                  setAge(e.target.value);
                  setTouched(true);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pc-activity">{t("field.activityLevel")}</Label>
              <select
                id="pc-activity"
                value={activityLevel}
                onChange={(e) =>
                  setActivityLevel(e.target.value as ActivityLevel)
                }
                className={selectClass}
              >
                <option value="sedentary">{t("activity.sedentary")}</option>
                <option value="lightlyActive">
                  {t("activity.lightlyActive")}
                </option>
                <option value="moderatelyActive">
                  {t("activity.moderatelyActive")}
                </option>
                <option value="veryActive">{t("activity.veryActive")}</option>
                <option value="eliteAthlete">
                  {t("activity.eliteAthlete")}
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pc-goal">{t("field.fitnessGoal")}</Label>
              <select
                id="pc-goal"
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value as FitnessGoal)}
                className={selectClass}
              >
                <option value="maintenance">{t("goal.maintenance")}</option>
                <option value="weightLoss">{t("goal.weightLoss")}</option>
                <option value="muscleBuilding">
                  {t("goal.muscleBuilding")}
                </option>
              </select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="pc-bodyfat">{t("field.bodyFat")}</Label>
              <Input
                id="pc-bodyfat"
                type="number"
                inputMode="decimal"
                min="5"
                max="50"
                step="0.1"
                value={bodyFat}
                placeholder={t("placeholder.bodyFat")}
                onChange={(e) => {
                  setBodyFat(e.target.value);
                  setTouched(true);
                }}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.value", { protein: formatNum(result.protein) })}
              </div>
              <div className="text-xs text-zinc-500">
                {result.usedLbm
                  ? t("result.lbmBasis", {
                      lbm: result.lbm!.toString(),
                      activity: t(`activity.${activityLevel}` as never),
                      goal: t(`goal.${fitnessGoal}` as never),
                    })
                  : t("result.basis", {
                      weightKg: result.weightKg.toString(),
                      activity: t(`activity.${activityLevel}` as never),
                      goal: t(`goal.${fitnessGoal}` as never),
                    })}
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
