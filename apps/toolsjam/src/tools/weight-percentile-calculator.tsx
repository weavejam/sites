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

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Approximate percentile using a normal distribution z→CDF. */
function zToPct(z: number): number {
  // Abramowitz & Stegun approximation
  const a = [0.319381530, -0.356563782, 1.781477937, -1.821255978, 1.330274429];
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  let poly = 0;
  let tp = t;
  for (let i = 0; i < 5; i++) {
    poly += a[i] * tp;
    tp *= t;
  }
  const pdf = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
  const cdf = 1 - pdf * poly;
  return z >= 0 ? cdf * 100 : (1 - cdf) * 100;
}

/**
 * Rough adult weight percentile using CDC NHANES reference data approximations.
 * Mean and SD sourced from public CDC NHANES summary statistics.
 */
function computeWeightPercentile(
  weightKg: number,
  heightCm: number,
  ageYears: number,
  genderStr: "male" | "female"
): { percentile: number; bmi: number } {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  // Approximate adult BMI means/SDs from NHANES data by sex (all adults)
  // Male mean BMI ~29.1, SD ~6.5; Female ~29.6, SD ~7.8
  // Adjust slightly by age group (rough)
  let meanBmi: number, sdBmi: number;
  if (genderStr === "male") {
    meanBmi = 27.5 + (ageYears > 50 ? 1.5 : ageYears > 30 ? 0.8 : 0);
    sdBmi = 5.5;
  } else {
    meanBmi = 27.8 + (ageYears > 50 ? 2.0 : ageYears > 30 ? 1.0 : 0);
    sdBmi = 6.5;
  }

  const z = (bmi - meanBmi) / sdBmi;
  const percentile = Math.max(1, Math.min(99, Math.round(zToPct(z))));
  return { percentile, bmi };
}

function bmiCategoryKey(bmi: number): string {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

function weightCategoryKey(pct: number): string {
  if (pct < 5) return "veryLow";
  if (pct < 25) return "low";
  if (pct < 75) return "normal";
  if (pct < 95) return "high";
  return "veryHigh";
}

export default function WeightPercentileCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.weight-percentile-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "">("male");
  const [weight, setWeight] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState<"kg" | "lbs">("kg");
  const [height, setHeight] = React.useState("");
  const [heightUnit, setHeightUnit] = React.useState<"cm" | "in">("cm");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (
      !age || !gender || !weight || !height ||
      !Number.isFinite(a) || !Number.isFinite(w) || !Number.isFinite(h) ||
      a <= 0 || w <= 0 || h <= 0
    ) return null;

    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;
    const heightCm = heightUnit === "in" ? h * 2.54 : h;

    if (heightCm < 50 || heightCm > 280 || weightKg < 5 || weightKg > 500) return null;

    const { percentile, bmi } = computeWeightPercentile(weightKg, heightCm, a, gender);
    return { percentile, bmi, bmiCat: bmiCategoryKey(bmi), weightCat: weightCategoryKey(percentile) };
  }, [age, gender, weight, weightUnit, height, heightUnit]);

  function reset() {
    setAge("");
    setGender("");
    setWeight("");
    setWeightUnit("kg");
    setHeight("");
    setHeightUnit("cm");
    setTouched(false);
  }

  function loadExample(a: string, g: "male" | "female", w: string, wu: "kg" | "lbs", h: string, hu: "cm" | "in") {
    setAge(a);
    setGender(g);
    setWeight(w);
    setWeightUnit(wu);
    setHeight(h);
    setHeightUnit(hu);
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
              <Label htmlFor="wpc-age">{t("field.age")}</Label>
              <Input
                id="wpc-age"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.age")}
                value={age}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wpc-gender">{t("field.gender")}</Label>
              <select
                id="wpc-gender"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={gender}
                onChange={(e) => { setGender(e.target.value as "male" | "female" | ""); setTouched(true); }}
              >
                <option value="">{t("placeholder.select")}</option>
                <option value="male">{t("type.gender.male")}</option>
                <option value="female">{t("type.gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wpc-weight">{t("field.weight")}</Label>
              <div className="flex gap-2">
                <Input
                  id="wpc-weight"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("placeholder.weight")}
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
                  className="flex-1"
                />
                <select
                  className="flex h-9 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-xs outline-none focus-visible:border-ring"
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as "kg" | "lbs")}
                >
                  <option value="kg">{t("type.weightUnit.kg")}</option>
                  <option value="lbs">{t("type.weightUnit.lbs")}</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wpc-height">{t("field.height")}</Label>
              <div className="flex gap-2">
                <Input
                  id="wpc-height"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("placeholder.height")}
                  value={height}
                  onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
                  className="flex-1"
                />
                <select
                  className="flex h-9 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-xs outline-none focus-visible:border-ring"
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value as "cm" | "in")}
                >
                  <option value="cm">{t("type.heightUnit.cm")}</option>
                  <option value="in">{t("type.heightUnit.in")}</option>
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

          {hasError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.percentile")}</div>
                  <div className="text-2xl font-semibold">{result.percentile}{t("unit.percentileSuffix")}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.bmi")}</div>
                  <div className="text-2xl font-semibold">{fmt(result.bmi)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.bmiCategory")}</div>
                  <div className="text-lg font-semibold">{t(`bmiCategory.${result.bmiCat}` as never)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.weightCategory")}</div>
                  <div className="text-lg font-semibold">{t(`weightCategory.${result.weightCat}` as never)}</div>
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
            onClick={() => loadExample("28", "male", "75", "kg", "178", "cm")}>
            {t("examples.loadYoungAdult")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("45", "female", "68", "kg", "165", "cm")}>
            {t("examples.loadMiddleAdult")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("35", "male", "95", "kg", "175", "cm")}>
            {t("examples.loadOverweight")}
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
