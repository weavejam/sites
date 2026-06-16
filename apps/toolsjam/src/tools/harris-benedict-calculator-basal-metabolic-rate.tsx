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
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "extra";

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extra: 1.9,
};

const ACTIVITY_LEVELS: ActivityLevel[] = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "extra",
];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function calcBMR(
  weight: number,
  height: number,
  age: number,
  gender: Gender
): number {
  if (gender === "male") {
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  }
  return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
}

export default function HarrisBenedictCalculatorBasalMetabolicRate(
  _props: { locale: Locale }
) {
  const t = useTranslations(
    "tool.harris-benedict-calculator-basal-metabolic-rate"
  );

  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender | "">("");
  const [activityLevel, setActivityLevel] = React.useState<ActivityLevel | "">(
    ""
  );
  const [touched, setTouched] = React.useState(false);

  const parsed = React.useMemo(
    () => ({
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseFloat(age),
    }),
    [weight, height, age]
  );

  const validationError = React.useMemo(() => {
    if (!touched) return null;
    if (!weight || !height || !age || gender === "" || activityLevel === "")
      return t("error.required");
    if (!Number.isFinite(parsed.weight) || parsed.weight <= 0)
      return t("error.positiveWeight");
    if (!Number.isFinite(parsed.height) || parsed.height <= 0)
      return t("error.positiveHeight");
    if (
      !Number.isFinite(parsed.age) ||
      parsed.age < 1 ||
      parsed.age > 120
    )
      return t("error.positiveAge");
    return null;
  }, [touched, weight, height, age, gender, activityLevel, parsed, t]);

  const result = React.useMemo(() => {
    if (validationError !== null) return null;
    if (!touched || gender === "" || activityLevel === "") return null;
    const bmr = calcBMR(parsed.weight, parsed.height, parsed.age, gender as Gender);
    const factor = ACTIVITY_FACTORS[activityLevel as ActivityLevel];
    const tdee = bmr * factor;
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: Math.round(tdee - 500),
      weightGain: Math.round(tdee + 500),
    };
  }, [validationError, touched, gender, activityLevel, parsed]);

  function reset() {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("");
    setActivityLevel("");
    setTouched(false);
  }

  function loadExample(
    w: string,
    h: string,
    a: string,
    g: Gender,
    al: ActivityLevel
  ) {
    setWeight(w);
    setHeight(h);
    setAge(a);
    setGender(g);
    setActivityLevel(al);
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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
    }
    return arr;
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
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="hb-weight">{t("field.weight")}</Label>
              <Input
                id="hb-weight"
                type="number"
                inputMode="decimal"
                min={0}
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hb-height">{t("field.height")}</Label>
              <Input
                id="hb-height"
                type="number"
                inputMode="decimal"
                min={0}
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hb-age">{t("field.age")}</Label>
              <Input
                id="hb-age"
                type="number"
                inputMode="numeric"
                min={1}
                max={120}
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.gender")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["male", "female"] as Gender[]).map((g) => (
                <Button
                  key={g}
                  type="button"
                  variant={gender === g ? "default" : "outline"}
                  onClick={() => { setGender(g); setTouched(true); }}
                >
                  {t(`gender.${g}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.activityLevel")}</Label>
            <div className="flex flex-wrap gap-2">
              {ACTIVITY_LEVELS.map((al) => (
                <Button
                  key={al}
                  type="button"
                  variant={activityLevel === al ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setActivityLevel(al); setTouched(true); }}
                >
                  {t(`activity.${al}` as never)}
                </Button>
              ))}
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

          {validationError && (
            <p className="text-sm text-red-600">{validationError}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.bmr")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.bmr.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-zinc-500">
                      {t("result.unit")}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.tdee")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.tdee.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-zinc-500">
                      {t("result.unit")}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.weightLoss")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.weightLoss.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-zinc-500">
                      {t("result.unit")}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.weightGain")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.weightGain.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-zinc-500">
                      {t("result.unit")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-700">{t("examples.heading")}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("75", "180", "35", "male", "sedentary")}
              >
                {t("button.loadSedentary")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("60", "165", "25", "female", "active")}
              >
                {t("button.loadAthlete")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("65", "160", "65", "female", "light")}
              >
                {t("button.loadElderly")}
              </Button>
            </div>
          </div>
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
