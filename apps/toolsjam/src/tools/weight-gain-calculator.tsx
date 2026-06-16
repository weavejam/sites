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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number, decimals = 0): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function WeightGainCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.weight-gain-calculator");

  const [currentWeight, setCurrentWeight] = React.useState("");
  const [targetWeight, setTargetWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "">("male");
  const [activityLevel, setActivityLevel] = React.useState<string>("moderate");
  const [gainRate, setGainRate] = React.useState<string>("moderate");
  const [touched, setTouched] = React.useState(false);

  const ACTIVITY_MULTIPLIERS: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const GAIN_RATES_KG: Record<string, number> = {
    conservative: 0.25,
    moderate: 0.5,
    aggressive: 0.75,
    veryAggressive: 1.0,
  };

  const result = React.useMemo(() => {
    const cw = parseFloat(currentWeight);
    const tw = parseFloat(targetWeight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (
      !currentWeight || !targetWeight || !height || !age ||
      !gender || !activityLevel || !gainRate ||
      !Number.isFinite(cw) || !Number.isFinite(tw) || !Number.isFinite(h) ||
      !Number.isFinite(a) || cw <= 0 || tw <= cw || h <= 0 || a <= 0
    ) return null;

    // Mifflin-St Jeor BMR (weight in kg, height in cm, age in years)
    const bmr = gender === "male"
      ? 10 * cw + 6.25 * h - 5 * a + 5
      : 10 * cw + 6.25 * h - 5 * a - 161;

    const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.55;
    const tdee = bmr * multiplier;

    const rateKg = GAIN_RATES_KG[gainRate] ?? 0.5;
    // 1 kg ≈ 7700 kcal
    const dailySurplus = (rateKg * 7700) / 7;
    const dailyCalorieTarget = Math.round(tdee + dailySurplus);
    const surplusRounded = Math.round(dailySurplus);
    const weightToGain = tw - cw;
    const weeksToTarget = Math.round((weightToGain / rateKg) * 7 / 7);
    // Macros: protein 2g/kg, fat 30%, rest carbs
    const protein = Math.round(cw * 2);
    const fatCals = dailyCalorieTarget * 0.3;
    const fat = Math.round(fatCals / 9);
    const carbCals = dailyCalorieTarget - protein * 4 - fatCals;
    const carbs = Math.round(carbCals / 4);

    return { dailyCalorieTarget, surplusRounded, rateKg, weeksToTarget, protein, carbs, fat };
  }, [currentWeight, targetWeight, height, age, gender, activityLevel, gainRate]);

  function reset() {
    setCurrentWeight("");
    setTargetWeight("");
    setHeight("");
    setAge("");
    setGender("");
    setActivityLevel("");
    setGainRate("");
    setTouched(false);
  }

  function loadExample(cw: string, tw: string, h: string, a: string, g: "male" | "female", al: string, gr: string) {
    setCurrentWeight(cw);
    setTargetWeight(tw);
    setHeight(h);
    setAge(a);
    setGender(g);
    setActivityLevel(al);
    setGainRate(gr);
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

  const activityOptions = ["sedentary", "light", "moderate", "active", "veryActive"] as const;
  const gainRateOptions = ["conservative", "moderate", "aggressive", "veryAggressive"] as const;
  const genderOptions = ["male", "female"] as const;

  const hasError = touched && !result;

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
              <Label htmlFor="wgc-cw">{t("field.currentWeight")}</Label>
              <Input
                id="wgc-cw"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.weight")}
                value={currentWeight}
                onChange={(e) => { setCurrentWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wgc-tw">{t("field.targetWeight")}</Label>
              <Input
                id="wgc-tw"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.weight")}
                value={targetWeight}
                onChange={(e) => { setTargetWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wgc-h">{t("field.height")}</Label>
              <Input
                id="wgc-h"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.height")}
                value={height}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wgc-age">{t("field.age")}</Label>
              <Input
                id="wgc-age"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.age")}
                value={age}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wgc-gender">{t("field.gender")}</Label>
              <select
                id="wgc-gender"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={gender}
                onChange={(e) => { setGender(e.target.value as "male" | "female" | ""); setTouched(true); }}
              >
                <option value="">{t("placeholder.select")}</option>
                {genderOptions.map((g) => (
                  <option key={g} value={g}>{t(`type.gender.${g}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wgc-activity">{t("field.activityLevel")}</Label>
              <select
                id="wgc-activity"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={activityLevel}
                onChange={(e) => { setActivityLevel(e.target.value); setTouched(true); }}
              >
                <option value="">{t("placeholder.select")}</option>
                {activityOptions.map((a) => (
                  <option key={a} value={a}>{t(`type.activity.${a}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="wgc-rate">{t("field.gainRate")}</Label>
              <select
                id="wgc-rate"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={gainRate}
                onChange={(e) => { setGainRate(e.target.value); setTouched(true); }}
              >
                <option value="">{t("placeholder.select")}</option>
                {gainRateOptions.map((r) => (
                  <option key={r} value={r}>{t(`type.gainRate.${r}` as never)}</option>
                ))}
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

          {hasError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dailyCalories")}</div>
                  <div className="text-xl font-semibold">{formatNum(result.dailyCalorieTarget)} <span className="text-sm font-normal">{t("unit.calories")}</span></div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.calorieSurplus")}</div>
                  <div className="text-xl font-semibold">+{formatNum(result.surplusRounded)} <span className="text-sm font-normal">{t("unit.calories")}</span></div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.weeklyGain")}</div>
                  <div className="text-xl font-semibold">{result.rateKg} <span className="text-sm font-normal">{t("unit.kgPerWeek")}</span></div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.timeToTarget")}</div>
                  <div className="text-xl font-semibold">{formatNum(result.weeksToTarget)} <span className="text-sm font-normal">{t("unit.weeks")}</span></div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.protein")}</div>
                  <div className="text-xl font-semibold">{formatNum(result.protein)} <span className="text-sm font-normal">{t("unit.gProtein")}</span></div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.carbs")}</div>
                  <div className="text-xl font-semibold">{formatNum(result.carbs)} <span className="text-sm font-normal">{t("unit.gCarbs")}</span></div>
                </div>
              </div>
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
            onClick={() => loadExample("60", "70", "175", "25", "male", "moderate", "moderate")}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("55", "62", "165", "22", "female", "light", "conservative")}>
            {t("examples.loadSlow")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("70", "80", "180", "28", "male", "veryActive", "aggressive")}>
            {t("examples.loadMuscle")}
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
