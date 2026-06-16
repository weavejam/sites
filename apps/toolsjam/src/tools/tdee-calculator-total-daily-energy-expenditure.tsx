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

type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";
type Goal = "maintain" | "lose" | "gain";

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function TdeeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.tdee-calculator-total-daily-energy-expenditure");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [activityLevel, setActivityLevel] = React.useState<ActivityLevel>("moderate");
  const [goal, setGoal] = React.useState<Goal>("maintain");
  const [bodyFat, setBodyFat] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const agen = parseFloat(age);
  const weightn = parseFloat(weight);
  const heightn = parseFloat(height);
  const bodyFatn = parseFloat(bodyFat);

  const ageValid = age !== "" && Number.isFinite(agen) && agen >= 15 && agen <= 100;
  const weightValid = weight !== "" && Number.isFinite(weightn) && weightn > 0;
  const heightValid = height !== "" && Number.isFinite(heightn) && heightn > 0;
  const bodyFatValid =
    bodyFat === "" || (Number.isFinite(bodyFatn) && bodyFatn >= 1 && bodyFatn <= 60);

  const result = React.useMemo(() => {
    if (!ageValid || !weightValid || !heightValid || !bodyFatValid) return null;

    let bmr: number;
    let formula: string;

    if (bodyFat !== "" && Number.isFinite(bodyFatn)) {
      const lbm = weightn * (1 - bodyFatn / 100);
      bmr = 370 + 21.6 * lbm;
      formula = "katchMcArdle";
    } else {
      if (gender === "male") {
        bmr = 10 * weightn + 6.25 * heightn - 5 * agen + 5;
      } else {
        bmr = 10 * weightn + 6.25 * heightn - 5 * agen - 161;
      }
      formula = "mifflin";
    }

    const tdee = bmr * ACTIVITY_FACTORS[activityLevel];
    const goalOffset = goal === "lose" ? -500 : goal === "gain" ? 500 : 0;
    const target = tdee + goalOffset;

    return { bmr, tdee, target, formula };
  }, [ageValid, weightValid, heightValid, bodyFatValid, agen, weightn, heightn, bodyFatn, bodyFat, gender, activityLevel, goal]);

  function reset() {
    setAge("");
    setWeight("");
    setHeight("");
    setBodyFat("");
    setTouched(false);
    setGender("male");
    setActivityLevel("moderate");
    setGoal("maintain");
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

  const showError =
    touched && (!ageValid || !weightValid || !heightValid || !bodyFatValid);

  const activityKeys: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "veryActive"];
  const goalKeys: Goal[] = ["maintain", "lose", "gain"];

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
              <Label htmlFor="tdee-age">{t("field.age")}</Label>
              <Input
                id="tdee-age"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.age")}
                value={age}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tdee-gender">{t("field.gender")}</Label>
              <select
                id="tdee-gender"
                value={gender}
                onChange={(e) => { setGender(e.target.value as Gender); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <option value="male">{t("gender.male")}</option>
                <option value="female">{t("gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tdee-weight">{t("field.weight")}</Label>
              <Input
                id="tdee-weight"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.weight")}
                value={weight}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tdee-height">{t("field.height")}</Label>
              <Input
                id="tdee-height"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.height")}
                value={height}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tdee-activity">{t("field.activityLevel")}</Label>
              <select
                id="tdee-activity"
                value={activityLevel}
                onChange={(e) => { setActivityLevel(e.target.value as ActivityLevel); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {activityKeys.map((k) => (
                  <option key={k} value={k}>{t(`activity.${k}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tdee-goal">{t("field.goal")}</Label>
              <select
                id="tdee-goal"
                value={goal}
                onChange={(e) => { setGoal(e.target.value as Goal); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {goalKeys.map((k) => (
                  <option key={k} value={k}>{t(`goal.${k}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="tdee-bf">{t("field.bodyFatPercentage")}</Label>
              <Input
                id="tdee-bf"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.bodyFat")}
                value={bodyFat}
                onChange={(e) => { setBodyFat(e.target.value); setTouched(true); }}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-semibold text-zinc-600">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="flex flex-col rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500 text-xs">{t("result.bmr")}</span>
                  <span className="font-semibold text-lg">{Math.round(result.bmr)}</span>
                  <span className="text-xs text-zinc-400">{t("result.unitKcal")}</span>
                </div>
                <div className="flex flex-col rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500 text-xs">{t("result.tdee")}</span>
                  <span className="font-semibold text-lg text-green-700">{Math.round(result.tdee)}</span>
                  <span className="text-xs text-zinc-400">{t("result.unitKcal")}</span>
                </div>
                {goal !== "maintain" && (
                  <div className="flex flex-col rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                    <span className="text-zinc-500 text-xs">{t("result.target")}</span>
                    <span className="font-semibold text-lg">{Math.round(result.target)}</span>
                    <span className="text-xs text-zinc-400">{t("result.unitKcal")}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-500">
                {t("result.formula")}: {t(`result.${result.formula}` as never)}
              </p>
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
