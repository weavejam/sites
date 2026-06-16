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

type HeightUnit = "cm" | "m" | "ft" | "in";

function toCm(value: number, unit: HeightUnit): number {
  switch (unit) {
    case "cm": return value;
    case "m": return value * 100;
    case "ft": return value * 30.48;
    case "in": return value * 2.54;
  }
}

function calcFtIn(cm: number): { feet: number; inches: number } {
  const totalIn = cm / 2.54;
  const feet = Math.floor(totalIn / 12);
  const inches = Math.round((totalIn % 12) * 10) / 10;
  return { feet, inches };
}

function getBMICategory(bmi: number, t: (k: string) => string): string {
  if (bmi < 18.5) return t("result.bmiCategories.underweight");
  if (bmi < 25) return t("result.bmiCategories.normal");
  if (bmi < 30) return t("result.bmiCategories.overweight");
  return t("result.bmiCategories.obese");
}

export default function HeightCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.height-calculator");

  const [height, setHeight] = React.useState("");
  const [heightUnit, setHeightUnit] = React.useState<HeightUnit>("cm");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const heightNum = parseFloat(height);
  const ageNum = parseFloat(age);
  const weightNum = parseFloat(weight);

  // Validate height in cm range
  const heightCm = height !== "" && Number.isFinite(heightNum) && heightNum > 0 ? toCm(heightNum, heightUnit) : null;
  const heightValid = heightCm !== null && heightCm >= 50 && heightCm <= 300;
  const ageValid = age === "" || (Number.isFinite(ageNum) && ageNum >= 1 && ageNum <= 120);
  const weightValid = weight === "" || (Number.isFinite(weightNum) && weightNum >= 1 && weightNum <= 500);

  const result = React.useMemo(() => {
    if (!heightValid || heightCm === null) return null;
    const cm = Math.round(heightCm * 100) / 100;
    const m = Math.round(cm / 100 * 1000) / 1000;
    const totalIn = Math.round(cm / 2.54 * 10) / 10;
    const ft = Math.round(cm / 30.48 * 100) / 100;
    const { feet: ftInFeet, inches: ftInInches } = calcFtIn(cm);

    let bmi: number | null = null;
    let bmiCategory: string | null = null;
    if (weightValid && weight !== "" && Number.isFinite(weightNum)) {
      bmi = Math.round((weightNum / Math.pow(cm / 100, 2)) * 10) / 10;
      bmiCategory = getBMICategory(bmi, (k) => t(k as never));
    }

    // Ideal weight range based on BMI 18.5–24.9
    const heightM = cm / 100;
    const ibwLow = Math.round(18.5 * heightM * heightM * 10) / 10;
    const ibwHigh = Math.round(24.9 * heightM * heightM * 10) / 10;

    return { cm, m, totalIn, ft, ftInFeet, ftInInches, bmi, bmiCategory, ibwLow, ibwHigh };
  }, [heightValid, heightCm, weightValid, weight, weightNum, t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
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

  function reset() {
    setHeight(""); setHeightUnit("cm"); setAge(""); setGender(""); setWeight(""); setTouched(false);
  }

  const showError = touched && (!heightValid || !ageValid || !weightValid);

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
              <Label htmlFor="ht-height">{t("field.height")}</Label>
              <Input
                id="ht-height"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ht-unit">{t("field.heightUnit")}</Label>
              <select
                id="ht-unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={heightUnit}
                onChange={(e) => { setHeightUnit(e.target.value as HeightUnit); setTouched(true); }}
              >
                <option value="cm">{t("unit.cm")}</option>
                <option value="m">{t("unit.m")}</option>
                <option value="ft">{t("unit.ft")}</option>
                <option value="in">{t("unit.in")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ht-age">{t("field.age")}</Label>
              <Input
                id="ht-age"
                type="number"
                inputMode="decimal"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ht-gender">{t("field.gender")}</Label>
              <select
                id="ht-gender"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={gender}
                onChange={(e) => { setGender(e.target.value); setTouched(true); }}
              >
                <option value="">—</option>
                <option value="male">{t("gender.male")}</option>
                <option value="female">{t("gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ht-weight">{t("field.weight")}</Label>
              <Input
                id="ht-weight"
                type="number"
                inputMode="decimal"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && (
            <div className="space-y-1">
              {!heightValid && <p className="text-sm text-red-600">{t("error.invalidHeight")}</p>}
              {!ageValid && <p className="text-sm text-red-600">{t("error.invalidAge")}</p>}
              {!weightValid && <p className="text-sm text-red-600">{t("error.invalidWeight")}</p>}
            </div>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div>
                <div className="text-xs text-zinc-500 mb-2">{t("result.conversions")}</div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div>
                    <div className="text-xs text-zinc-400">{t("result.cm")}</div>
                    <div className="font-semibold text-zinc-900">{t("result.cmValue", { value: result.cm })}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">{t("result.m")}</div>
                     <div className="font-semibold text-zinc-900">{t("result.mValue", { value: result.m })}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">{t("result.ft")}</div>
                     <div className="font-semibold text-zinc-900">{t("result.ftValue", { value: result.ft })}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">{t("result.ftIn")}</div>
                    <div className="font-semibold text-zinc-900">{t("result.ftInFormat", { feet: result.ftInFeet, inches: result.ftInInches })}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {result.bmi !== null && (
                  <>
                    <div>
                      <div className="text-xs text-zinc-400">{t("result.bmi")}</div>
                      <div className="text-xl font-semibold text-zinc-900">{result.bmi}</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400">{t("result.bmiCategory")}</div>
                      <div className="text-sm font-medium text-zinc-800">{result.bmiCategory}</div>
                    </div>
                  </>
                )}
                <div>
                  <div className="text-xs text-zinc-400">{t("result.idealWeight")}</div>
                  <div className="text-sm font-medium text-zinc-800">{t("result.ibwRange", { low: result.ibwLow, high: result.ibwHigh })}</div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
