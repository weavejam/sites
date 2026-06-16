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
type ActivityLevel = "sedentary" | "lightly" | "moderately" | "very" | "extremely";
type HealthGoal = "weightLoss" | "maintenance" | "weightGain" | "performance" | "keto";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly: 1.375,
  moderately: 1.55,
  very: 1.725,
  extremely: 1.9,
};

const FAT_PERCENT: Record<HealthGoal, number> = {
  weightLoss: 0.2,
  maintenance: 0.25,
  weightGain: 0.3,
  performance: 0.25,
  keto: 0.7,
};

interface CalcResult {
  bmr: number;
  tdee: number;
  totalFatG: number;
  satFatLimitG: number;
  fatPercent: number;
  fatCalories: number;
}

function calculate(
  age: number,
  weight: number,
  height: number,
  gender: Gender,
  activity: ActivityLevel,
  goal: HealthGoal
): CalcResult {
  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];
  const fatPct = FAT_PERCENT[goal];
  const fatCalories = tdee * fatPct;
  const totalFatG = fatCalories / 9;
  const satFatLimitG = (tdee * 0.1) / 9;
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    totalFatG: Math.round(totalFatG),
    satFatLimitG: Math.round(satFatLimitG),
    fatPercent: Math.round(fatPct * 100),
    fatCalories: Math.round(fatCalories),
  };
}

export default function FatIntakeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.fat-intake-calculator");
  const [age, setAge] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [gender, setGender] = React.useState<Gender | "">("");
  const [activity, setActivity] = React.useState<ActivityLevel | "">("");
  const [goal, setGoal] = React.useState<HealthGoal | "">("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<CalcResult | null>(() => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!gender || !activity || !goal) return null;
    if (!Number.isFinite(a) || !Number.isFinite(w) || !Number.isFinite(h)) return null;
    if (a <= 0 || w <= 0 || h <= 0) return null;
    return calculate(a, w, h, gender, activity as ActivityLevel, goal as HealthGoal);
  }, [age, weight, height, gender, activity, goal]);

  function reset() {
    setAge("");
    setWeight("");
    setHeight("");
    setGender("");
    setActivity("");
    setGoal("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  const showError = touched && result === null;
  const selectClass =
    "w-full px-3 py-2 border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fi-age">{t("field.age")}</Label>
              <Input
                id="fi-age"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.age")}
                value={age}
                onChange={(e) => { setAge(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fi-weight">{t("field.weight")}</Label>
              <Input
                id="fi-weight"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.weight")}
                value={weight}
                onChange={(e) => { setWeight(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fi-height">{t("field.height")}</Label>
              <Input
                id="fi-height"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.height")}
                value={height}
                onChange={(e) => { setHeight(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fi-gender">{t("field.gender")}</Label>
              <select
                id="fi-gender"
                className={selectClass}
                value={gender}
                onChange={(e) => { setGender(e.target.value as Gender); setTouched(false); }}
              >
                <option value="">{t("gender.select")}</option>
                <option value="male">{t("gender.male")}</option>
                <option value="female">{t("gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fi-activity">{t("field.activityLevel")}</Label>
              <select
                id="fi-activity"
                className={selectClass}
                value={activity}
                onChange={(e) => { setActivity(e.target.value as ActivityLevel); setTouched(false); }}
              >
                <option value="">{t("activity.select")}</option>
                <option value="sedentary">{t("activity.sedentary")}</option>
                <option value="lightly">{t("activity.lightly")}</option>
                <option value="moderately">{t("activity.moderately")}</option>
                <option value="very">{t("activity.very")}</option>
                <option value="extremely">{t("activity.extremely")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fi-goal">{t("field.healthGoal")}</Label>
              <select
                id="fi-goal"
                className={selectClass}
                value={goal}
                onChange={(e) => { setGoal(e.target.value as HealthGoal); setTouched(false); }}
              >
                <option value="">{t("goal.select")}</option>
                <option value="weightLoss">{t("goal.weightLoss")}</option>
                <option value="maintenance">{t("goal.maintenance")}</option>
                <option value="weightGain">{t("goal.weightGain")}</option>
                <option value="performance">{t("goal.performance")}</option>
                <option value="keto">{t("goal.keto")}</option>
              </select>
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{t("result.bmr")}</div>
                  <div className="text-xl font-bold text-zinc-900">
                    {result.bmr} <span className="text-sm font-normal">{t("unit.kcal")}</span>
                  </div>
                </div>
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{t("result.tdee")}</div>
                  <div className="text-xl font-bold text-zinc-900">
                    {result.tdee} <span className="text-sm font-normal">{t("unit.kcal")}</span>
                  </div>
                </div>
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{t("result.totalFat")}</div>
                  <div className="text-xl font-bold text-zinc-900">
                    {result.totalFatG} <span className="text-sm font-normal">{t("unit.grams")}</span>
                  </div>
                </div>
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{t("result.saturatedFatLimit")}</div>
                  <div className="text-xl font-bold text-zinc-900">
                    {result.satFatLimitG} <span className="text-sm font-normal">{t("unit.grams")}</span>
                  </div>
                </div>
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{t("result.fatCalories")}</div>
                  <div className="text-xl font-bold text-zinc-900">
                    {result.fatCalories} <span className="text-sm font-normal">{t("unit.kcal")}</span>
                  </div>
                </div>
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{t("result.fatPercent")}</div>
                  <div className="text-xl font-bold text-zinc-900">
                    {result.fatPercent}<span className="text-sm font-normal">{t("unit.percent")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Examples */}
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
            onClick={() => { setAge("30"); setWeight("70"); setHeight("175"); setGender("male"); setActivity("moderately"); setGoal("maintenance"); setTouched(true); }}
          >
            {t("examples.loadMale")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => { setAge("28"); setWeight("60"); setHeight("165"); setGender("female"); setActivity("lightly"); setGoal("weightLoss"); setTouched(true); }}
          >
            {t("examples.loadFemale")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => { setAge("25"); setWeight("80"); setHeight("180"); setGender("male"); setActivity("very"); setGoal("performance"); setTouched(true); }}
          >
            {t("examples.loadActive")}
          </Button>
        </div>
      </section>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      {/* How to */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
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
