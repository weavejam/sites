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

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

interface MaintenanceResult {
  bmr: number;
  tdee: number;
  formula: "mifflin" | "katchMcArdle";
}

function computeMaintenance(
  age: number,
  gender: Gender,
  weight: number,
  height: number,
  activity: ActivityLevel,
  bodyFat: number | null
): MaintenanceResult {
  let bmr: number;
  let formula: "mifflin" | "katchMcArdle";

  if (bodyFat !== null && bodyFat > 0 && bodyFat < 100) {
    const lbm = weight * (1 - bodyFat / 100);
    bmr = 370 + 21.6 * lbm;
    formula = "katchMcArdle";
  } else {
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    formula = "mifflin";
  }

  const tdee = bmr * ACTIVITY_FACTORS[activity];
  return { bmr, tdee, formula };
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString("en-US");
}

export default function MaintenanceCalorieCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.maintenance-calorie-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender | "">("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [activity, setActivity] = React.useState<ActivityLevel | "">("");
  const [bodyFat, setBodyFat] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const ageN = parseInt(age, 10);
  const weightN = parseFloat(weight);
  const heightN = parseFloat(height);
  const bodyFatN = bodyFat !== "" ? parseFloat(bodyFat) : null;

  const isValid =
    Number.isFinite(ageN) && ageN > 0 &&
    gender !== "" &&
    Number.isFinite(weightN) && weightN > 0 &&
    Number.isFinite(heightN) && heightN > 0 &&
    activity !== "";

  const result = React.useMemo<MaintenanceResult | null>(() => {
    if (!isValid || !gender || !activity) return null;
    return computeMaintenance(ageN, gender, weightN, heightN, activity, bodyFatN);
  }, [isValid, ageN, gender, weightN, heightN, activity, bodyFatN]);

  function reset() {
    setAge(""); setGender(""); setWeight(""); setHeight("");
    setActivity(""); setBodyFat(""); setTouched(false);
  }

  const calorieLevels = result
    ? [
        { key: "lose1", calories: Math.round(result.tdee - 1000) },
        { key: "lose05", calories: Math.round(result.tdee - 500) },
        { key: "maintain", calories: Math.round(result.tdee) },
        { key: "gain05", calories: Math.round(result.tdee + 500) },
        { key: "gain1", calories: Math.round(result.tdee + 1000) },
      ]
    : [];

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
              <Label htmlFor="mcc-age">{t("field.age")}</Label>
              <Input id="mcc-age" type="number" inputMode="numeric" value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcc-bodyfat">{t("field.bodyFat")}</Label>
              <Input id="mcc-bodyfat" type="number" inputMode="decimal" value={bodyFat}
                placeholder={t("placeholder.bodyFat")}
                onChange={(e) => { setBodyFat(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcc-weight">{t("field.weight")}</Label>
              <Input id="mcc-weight" type="number" inputMode="decimal" value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcc-height">{t("field.height")}</Label>
              <Input id="mcc-height" type="number" inputMode="decimal" value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }} />
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

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && !isValid && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="font-semibold text-zinc-900">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.bmr")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.bmr)} {t("result.caloriesUnit")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.tdee")}: </span>
                  <span className="text-2xl font-bold text-zinc-900">{fmt(result.tdee)} {t("result.caloriesUnit")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.formula")}: </span>
                  <span className="font-medium text-zinc-900">{t(`result.${result.formula}` as never)}</span>
                </div>
              </div>
              <div>
                <div className="mb-2 text-sm font-medium text-zinc-700">{t("result.context")}</div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      {calorieLevels.map(({ key, calories }) => (
                        <tr key={key} className={`border-b border-zinc-100 ${key === "maintain" ? "bg-zinc-100 font-semibold" : ""}`}>
                          <td className="px-3 py-2 text-zinc-700">{t(`result.${key}` as never)}</td>
                          <td className="px-3 py-2 text-right text-zinc-900">{calories.toLocaleString("en-US")} {t("result.kcalUnit")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
