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
type Goal = "weightLoss" | "maintenance" | "muscleGain";
type Diet = "balanced" | "lowCarb" | "highProtein" | "ketogenic";

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const GOAL_FACTORS: Record<Goal, number> = {
  weightLoss: 0.8,
  maintenance: 1.0,
  muscleGain: 1.1,
};

type MacroRatio = { protein: number; carbs: number; fat: number };

const DIET_RATIOS: Record<Diet, MacroRatio> = {
  balanced: { protein: 0.30, carbs: 0.35, fat: 0.35 },
  highProtein: { protein: 0.40, carbs: 0.35, fat: 0.25 },
  lowCarb: { protein: 0.35, carbs: 0.20, fat: 0.45 },
  ketogenic: { protein: 0.25, carbs: 0.05, fat: 0.70 },
};

interface MacroResult {
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
}

function computeMacros(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
  activity: ActivityLevel,
  goal: Goal,
  diet: Diet,
  bodyFat: number | null
): MacroResult {
  let bmr: number;
  if (bodyFat !== null && bodyFat > 0 && bodyFat < 100) {
    const lbm = weight * (1 - bodyFat / 100);
    bmr = 370 + 21.6 * lbm;
  } else {
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }
  const tdee = bmr * ACTIVITY_FACTORS[activity];
  const targetCalories = tdee * GOAL_FACTORS[goal];
  const ratios = DIET_RATIOS[diet];
  const protein = (targetCalories * ratios.protein) / 4;
  const carbs = (targetCalories * ratios.carbs) / 4;
  const fat = (targetCalories * ratios.fat) / 9;
  return { tdee, targetCalories, protein, carbs, fat };
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toString();
}

export default function MacroCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.macro-calculator");

  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender | "">("");
  const [activity, setActivity] = React.useState<ActivityLevel | "">("");
  const [goal, setGoal] = React.useState<Goal | "">("");
  const [bodyFat, setBodyFat] = React.useState("");
  const [diet, setDiet] = React.useState<Diet>("balanced");
  const [touched, setTouched] = React.useState(false);

  const weightN = parseFloat(weight);
  const heightN = parseFloat(height);
  const ageN = parseInt(age, 10);
  const bodyFatN = bodyFat !== "" ? parseFloat(bodyFat) : null;

  const isValid =
    Number.isFinite(weightN) && weightN > 0 &&
    Number.isFinite(heightN) && heightN > 0 &&
    Number.isFinite(ageN) && ageN > 0 &&
    gender !== "" &&
    activity !== "" &&
    goal !== "";

  const result = React.useMemo<MacroResult | null>(() => {
    if (!isValid || !gender || !activity || !goal) return null;
    return computeMacros(weightN, heightN, ageN, gender, activity, goal, diet, bodyFatN);
  }, [isValid, weightN, heightN, ageN, gender, activity, goal, diet, bodyFatN]);

  function reset() {
    setWeight(""); setHeight(""); setAge(""); setGender("");
    setActivity(""); setGoal(""); setBodyFat(""); setDiet("balanced");
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

  const GENDERS: Gender[] = ["male", "female"];
  const ACTIVITIES: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "veryActive"];
  const GOALS: Goal[] = ["weightLoss", "maintenance", "muscleGain"];
  const DIETS: Diet[] = ["balanced", "lowCarb", "highProtein", "ketogenic"];

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
            <div className="space-y-2">
              <Label htmlFor="mc-weight">{t("field.weight")}</Label>
              <Input id="mc-weight" type="number" inputMode="decimal" value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-height">{t("field.height")}</Label>
              <Input id="mc-height" type="number" inputMode="decimal" value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-age">{t("field.age")}</Label>
              <Input id="mc-age" type="number" inputMode="numeric" value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mc-bodyfat">{t("field.bodyFat")}</Label>
              <Input id="mc-bodyfat" type="number" inputMode="decimal" value={bodyFat}
                placeholder={t("placeholder.bodyFat")}
                onChange={(e) => { setBodyFat(e.target.value); setTouched(true); }} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.gender")}</Label>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <Button key={g} type="button"
                  variant={gender === g ? "default" : "outline"}
                  onClick={() => { setGender(g); setTouched(true); }}>
                  {t(`gender.${g}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.activityLevel")}</Label>
            <div className="flex flex-col gap-2">
              {ACTIVITIES.map((a) => (
                <Button key={a} type="button"
                  variant={activity === a ? "default" : "outline"}
                  className="justify-start text-left h-auto py-2"
                  onClick={() => { setActivity(a); setTouched(true); }}>
                  {t(`activity.${a}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.goal")}</Label>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <Button key={g} type="button"
                  variant={goal === g ? "default" : "outline"}
                  onClick={() => { setGoal(g); setTouched(true); }}>
                  {t(`goal.${g}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.dietPreference")}</Label>
            <div className="flex flex-wrap gap-2">
              {DIETS.map((d) => (
                <Button key={d} type="button"
                  variant={diet === d ? "default" : "outline"}
                  onClick={() => { setDiet(d); setTouched(true); }}>
                  {t(`diet.${d}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && !isValid && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-900">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.tdee")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.tdee)} {t("result.calories")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.targetCalories")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.targetCalories)} {t("result.calories")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.protein")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.protein)} {t("result.grams")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.carbs")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.carbs)} {t("result.grams")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.fat")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.fat)} {t("result.grams")}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
