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
type WalkingIntensity = "casual" | "moderate" | "brisk";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

const MET_VALUES: Record<WalkingIntensity, number> = {
  casual: 2.5,
  moderate: 3.5,
  brisk: 5.0,
};

const SPEED_KMH: Record<WalkingIntensity, number> = {
  casual: 3.5,
  moderate: 5.5,
  brisk: 7.0,
};

function calcBMR(weightKg: number, heightCm: number, age: number, gender: Gender): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

function calcCaloriesPerSession(
  weightKg: number,
  met: number,
  durationHours: number
): number {
  // Calories = MET × weight (kg) × 1.05 × duration (hours)
  return met * weightKg * 1.05 * durationHours;
}

function fmt(n: number, decimals = 0): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  return n.toFixed(decimals);
}

export default function PokemonGoWeightLossCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pokemon-go-weight-loss-calculator");

  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [gameplayTime, setGameplayTime] = React.useState("");
  const [walkingIntensity, setWalkingIntensity] = React.useState<WalkingIntensity>("casual");
  const [daysPerWeek, setDaysPerWeek] = React.useState("");
  const [targetWeight, setTargetWeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);
  const ageNum = parseFloat(age);
  const timeNum = parseFloat(gameplayTime);
  const daysNum = parseFloat(daysPerWeek);
  const targetNum = parseFloat(targetWeight);

  const allValid =
    weight !== "" && Number.isFinite(weightNum) && weightNum > 0 &&
    height !== "" && Number.isFinite(heightNum) && heightNum > 0 &&
    age !== "" && Number.isFinite(ageNum) && ageNum > 0 &&
    gameplayTime !== "" && Number.isFinite(timeNum) && timeNum > 0 &&
    daysPerWeek !== "" && Number.isFinite(daysNum) && daysNum > 0 && daysNum <= 7;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const met = MET_VALUES[walkingIntensity];
    const speedKmh = SPEED_KMH[walkingIntensity];
    const caloriesPerSession = calcCaloriesPerSession(weightNum, met, timeNum);
    const caloriesPerWeek = caloriesPerSession * daysNum;
    const weightLossPerWeek = caloriesPerWeek / 7700;
    const bmr = calcBMR(weightNum, heightNum, ageNum, gender);
    const distancePerSession = speedKmh * timeNum;
    const hasTarget = targetWeight !== "" && Number.isFinite(targetNum) && targetNum > 0 && targetNum < weightNum;
    const weeksToGoal = hasTarget
      ? Math.ceil((weightNum - targetNum) / weightLossPerWeek)
      : null;
    return { caloriesPerSession, caloriesPerWeek, weightLossPerWeek, bmr, distancePerSession, weeksToGoal };
  }, [allValid, weightNum, heightNum, ageNum, gender, timeNum, walkingIntensity, daysNum, targetWeight, targetNum]);

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

  function reset() {
    setWeight(""); setHeight(""); setAge(""); setGameplayTime("");
    setDaysPerWeek(""); setTargetWeight("");
    setGender("male"); setWalkingIntensity("casual"); setTouched(false);
  }

  const mark = (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value as never);
      setTouched(true);
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="pg-weight">{t("field.weight")}</Label>
              <Input
                id="pg-weight"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={mark(setWeight)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pg-height">{t("field.height")}</Label>
              <Input
                id="pg-height"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={mark(setHeight)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pg-age">{t("field.age")}</Label>
              <Input
                id="pg-age"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={mark(setAge)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pg-gender">{t("field.gender")}</Label>
              <select
                id="pg-gender"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={gender}
                onChange={(e) => { setGender(e.target.value as Gender); setTouched(true); }}
              >
                <option value="male">{t("option.gender.male")}</option>
                <option value="female">{t("option.gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pg-gameplay">{t("field.gameplayTime")}</Label>
              <Input
                id="pg-gameplay"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={gameplayTime}
                placeholder={t("placeholder.gameplayTime")}
                onChange={mark(setGameplayTime)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pg-intensity">{t("field.walkingIntensity")}</Label>
              <select
                id="pg-intensity"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={walkingIntensity}
                onChange={(e) => { setWalkingIntensity(e.target.value as WalkingIntensity); setTouched(true); }}
              >
                <option value="casual">{t("option.walkingIntensity.casual")}</option>
                <option value="moderate">{t("option.walkingIntensity.moderate")}</option>
                <option value="brisk">{t("option.walkingIntensity.brisk")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pg-days">{t("field.daysPerWeek")}</Label>
              <Input
                id="pg-days"
                type="number"
                inputMode="decimal"
                min="1"
                max="7"
                step="1"
                value={daysPerWeek}
                placeholder={t("placeholder.daysPerWeek")}
                onChange={mark(setDaysPerWeek)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pg-target">{t("field.targetWeight")}</Label>
              <Input
                id="pg-target"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={targetWeight}
                placeholder={t("placeholder.targetWeight")}
                onChange={mark(setTargetWeight)}
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

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-bold text-zinc-900">
                {t("result.caloriesPerSession", { value: fmt(result.caloriesPerSession) })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.caloriesPerWeek", { value: fmt(result.caloriesPerWeek) })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.weightLossPerWeek", { value: result.weightLossPerWeek.toFixed(3) })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.distancePerSession", { value: result.distancePerSession.toFixed(1) })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.bmr", { value: fmt(result.bmr) })}
              </div>
              {result.weeksToGoal !== null && (
                <div className="mt-2 rounded border-l-4 border-green-400 bg-green-50 px-3 py-2 text-sm text-green-900 font-semibold">
                  {t("result.weeksToGoal", { value: result.weeksToGoal })}
                </div>
              )}
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
