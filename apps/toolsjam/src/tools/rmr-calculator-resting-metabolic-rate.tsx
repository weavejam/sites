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
type ActivityLevel =
  | "sedentary"
  | "lightly_active"
  | "moderate"
  | "very_active"
  | "extra_active";
type Formula = "mifflin" | "harris_benedict" | "katch_mcardle";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

const SELECT_CLASS_NAME =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500";

function fmt(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(decimals);
}

export default function RmrCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.rmr-calculator-resting-metabolic-rate");

  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [bodyFat, setBodyFat] = React.useState("");
  const [activityLevel, setActivityLevel] =
    React.useState<ActivityLevel>("moderate");
  const [formula, setFormula] = React.useState<Formula>("mifflin");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);
  const ageNum = parseFloat(age);
  const bodyFatNum = parseFloat(bodyFat);

  const weightValid = weight !== "" && Number.isFinite(weightNum) && weightNum > 0;
  const heightValid = height !== "" && Number.isFinite(heightNum) && heightNum > 0;
  const ageValid =
    age !== "" && Number.isFinite(ageNum) && ageNum > 0 && ageNum <= 120;
  const bodyFatValid =
    bodyFat !== "" &&
    Number.isFinite(bodyFatNum) &&
    bodyFatNum > 0 &&
    bodyFatNum < 100;
  const needsBodyFat = formula === "katch_mcardle";

  const result = React.useMemo(() => {
    if (!weightValid || !heightValid || !ageValid) return null;
    if (needsBodyFat && !bodyFatValid) return null;

    let rmr: number;
    let leanBodyMass: number | null = null;

    if (formula === "mifflin") {
      rmr =
        gender === "male"
          ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
          : 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    } else if (formula === "harris_benedict") {
      rmr =
        gender === "male"
          ? 88.362 + 13.397 * weightNum + 4.799 * heightNum - 5.677 * ageNum
          : 447.593 + 9.247 * weightNum + 3.098 * heightNum - 4.33 * ageNum;
    } else {
      leanBodyMass = weightNum * (1 - bodyFatNum / 100);
      rmr = 370 + 21.6 * leanBodyMass;
    }

    const multiplier = ACTIVITY_MULTIPLIERS[activityLevel];
    const tdee = rmr * multiplier;
    return { rmr, tdee, leanBodyMass, multiplier };
  }, [
    activityLevel,
    ageNum,
    ageValid,
    bodyFatNum,
    bodyFatValid,
    formula,
    gender,
    heightNum,
    heightValid,
    needsBodyFat,
    weightNum,
    weightValid,
  ]);

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

  function loadExample(example: {
    weight: string;
    height: string;
    age: string;
    gender: Gender;
    bodyFat: string;
    activityLevel: ActivityLevel;
    formula: Formula;
  }) {
    setWeight(example.weight);
    setHeight(example.height);
    setAge(example.age);
    setGender(example.gender);
    setBodyFat(example.bodyFat);
    setActivityLevel(example.activityLevel);
    setFormula(example.formula);
    setTouched(true);
  }

  function reset() {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setBodyFat("");
    setActivityLevel("moderate");
    setFormula("mifflin");
    setTouched(false);
  }

  const showInvalidError = touched && (!weightValid || !heightValid || !ageValid);
  const showBodyFatError = touched && needsBodyFat && !bodyFatValid;

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
              <Label htmlFor="rmr-weight">{t("field.weight")}</Label>
              <Input
                id="rmr-weight"
                type="number"
                inputMode="decimal"
                min="0"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rmr-height">{t("field.height")}</Label>
              <Input
                id="rmr-height"
                type="number"
                inputMode="decimal"
                min="0"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => {
                  setHeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rmr-age">{t("field.age")}</Label>
              <Input
                id="rmr-age"
                type="number"
                inputMode="numeric"
                min="0"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => {
                  setAge(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rmr-gender">{t("field.gender")}</Label>
              <div>
                <select
                  id="rmr-gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value as Gender);
                    setTouched(true);
                  }}
                  className={SELECT_CLASS_NAME}
                >
                  <option value="male">{t("option.male")}</option>
                  <option value="female">{t("option.female")}</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rmr-body-fat">{t("field.bodyFat")}</Label>
              <Input
                id="rmr-body-fat"
                type="number"
                inputMode="decimal"
                min="0"
                value={bodyFat}
                placeholder={t("placeholder.bodyFat")}
                onChange={(e) => {
                  setBodyFat(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rmr-activity">{t("field.activityLevel")}</Label>
              <div>
                <select
                  id="rmr-activity"
                  value={activityLevel}
                  onChange={(e) => {
                    setActivityLevel(e.target.value as ActivityLevel);
                    setTouched(true);
                  }}
                  className={SELECT_CLASS_NAME}
                >
                  <option value="sedentary">{t("option.sedentary")}</option>
                  <option value="lightly_active">{t("option.lightly_active")}</option>
                  <option value="moderate">{t("option.moderate")}</option>
                  <option value="very_active">{t("option.very_active")}</option>
                  <option value="extra_active">{t("option.extra_active")}</option>
                </select>
              </div>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="rmr-formula">{t("field.formula")}</Label>
              <div>
                <select
                  id="rmr-formula"
                  value={formula}
                  onChange={(e) => {
                    setFormula(e.target.value as Formula);
                    setTouched(true);
                  }}
                  className={SELECT_CLASS_NAME}
                >
                  <option value="mifflin">{t("option.mifflin")}</option>
                  <option value="harris_benedict">{t("option.harris_benedict")}</option>
                  <option value="katch_mcardle">{t("option.katch_mcardle")}</option>
                </select>
              </div>
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

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showBodyFatError && (
            <p className="text-sm text-red-600">{t("error.bodyFatRequired")}</p>
          )}

          {result && !showInvalidError && !showBodyFatError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.rmr")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmt(result.rmr)} {t("result.kcalPerDay")}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.tdee")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmt(result.tdee)} {t("result.kcalPerDay")}
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.formulaUsed")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`option.${formula}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.activityMultiplier")}
                  </div>
                  <div className="text-base font-semibold text-zinc-900">
                    {fmt(result.multiplier, 3)} ×
                  </div>
                </div>
              </div>
              {result.leanBodyMass !== null && (
                <div>
                  <div className="text-xs text-zinc-500">{t("result.leanBodyMass")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {fmt(result.leanBodyMass, 1)} {t("result.kilograms")}
                  </div>
                </div>
              )}
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{example.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
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
            onClick={() =>
              loadExample({
                weight: "70",
                height: "175",
                age: "30",
                gender: "male",
                bodyFat: "",
                activityLevel: "moderate",
                formula: "mifflin",
              })
            }
          >
            {t("examples.loadMifflin")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                weight: "60",
                height: "165",
                age: "40",
                gender: "female",
                bodyFat: "",
                activityLevel: "lightly_active",
                formula: "harris_benedict",
              })
            }
          >
            {t("examples.loadHarris")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                weight: "85",
                height: "180",
                age: "35",
                gender: "male",
                bodyFat: "18",
                activityLevel: "extra_active",
                formula: "katch_mcardle",
              })
            }
          >
            {t("examples.loadKatch")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
