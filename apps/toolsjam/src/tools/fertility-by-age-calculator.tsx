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

type AgeCategory = "peak" | "good" | "moderate" | "declining" | "low" | "veryLow";

function baseMonthlyRate(age: number): number {
  if (age < 30) return 0.25;
  if (age < 35) return 0.2;
  if (age < 38) return 0.15;
  if (age < 41) return 0.1;
  if (age < 43) return 0.07;
  return 0.03;
}

function ageCategory(age: number): AgeCategory {
  if (age < 30) return "peak";
  if (age < 35) return "good";
  if (age < 38) return "moderate";
  if (age < 41) return "declining";
  if (age < 43) return "low";
  return "veryLow";
}

interface FertilityResult {
  monthlyChance: number;
  annualChance: number;
  ageCat: AgeCategory;
}

function compute(
  age: number,
  tryingMonths: number,
  prevPreg: number,
  cycleLength: number,
  lifestyle: number
): FertilityResult {
  let base = baseMonthlyRate(age);
  // Lifestyle modifier (1-10 -> 0.8 to 1.1 multiplier)
  const lifestyleMod = 0.8 + (lifestyle - 1) * (0.3 / 9);
  // Cycle regularity modifier: optimal 26-32 days
  const cycleMod =
    cycleLength >= 26 && cycleLength <= 32
      ? 1.05
      : cycleLength >= 21 && cycleLength <= 35
        ? 1.0
        : 0.85;
  // Previous pregnancy positive indicator
  const prevPregMod = prevPreg > 0 ? 1.1 : 1.0;
  const monthly = Math.min(base * lifestyleMod * cycleMod * prevPregMod, 0.35);
  // 12-month cumulative: 1 - (1-p)^12
  const annual = 1 - Math.pow(1 - monthly, 12);
  return {
    monthlyChance: monthly,
    annualChance: annual,
    ageCat: ageCategory(age),
  };
}

export default function FertilityByAgeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.fertility-by-age-calculator");
  const [age, setAge] = React.useState("");
  const [tryingDuration, setTryingDuration] = React.useState("");
  const [previousPregnancies, setPreviousPregnancies] = React.useState("");
  const [cycleRegularity, setCycleRegularity] = React.useState("");
  const [lifestyleFactors, setLifestyleFactors] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<FertilityResult | null>(() => {
    const a = parseFloat(age);
    const td = parseFloat(tryingDuration);
    const pp = parseFloat(previousPregnancies);
    const cl = parseFloat(cycleRegularity);
    const lf = parseFloat(lifestyleFactors);
    if (
      !Number.isFinite(a) ||
      !Number.isFinite(td) ||
      !Number.isFinite(pp) ||
      !Number.isFinite(cl) ||
      !Number.isFinite(lf)
    )
      return null;
    if (a < 15 || a > 55) return null;
    if (cl < 21 || cl > 45) return null;
    if (lf < 1 || lf > 10) return null;
    if (td < 0 || pp < 0) return null;
    return compute(a, td, pp, cl, lf);
  }, [age, tryingDuration, previousPregnancies, cycleRegularity, lifestyleFactors]);

  function loadExample(
    a: string,
    td: string,
    pp: string,
    cl: string,
    lf: string
  ) {
    setAge(a);
    setTryingDuration(td);
    setPreviousPregnancies(pp);
    setCycleRegularity(cl);
    setLifestyleFactors(lf);
    setTouched(true);
  }

  function reset() {
    setAge("");
    setTryingDuration("");
    setPreviousPregnancies("");
    setCycleRegularity("");
    setLifestyleFactors("");
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
              <Label htmlFor="fba-age">{t("field.age")}</Label>
              <Input
                id="fba-age"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.age")}
                value={age}
                onChange={(e) => { setAge(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fba-trying">{t("field.tryingDuration")}</Label>
              <Input
                id="fba-trying"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.tryingDuration")}
                value={tryingDuration}
                onChange={(e) => { setTryingDuration(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fba-prev">{t("field.previousPregnancies")}</Label>
              <Input
                id="fba-prev"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.previousPregnancies")}
                value={previousPregnancies}
                onChange={(e) => { setPreviousPregnancies(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fba-cycle">{t("field.cycleRegularity")}</Label>
              <Input
                id="fba-cycle"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.cycleRegularity")}
                value={cycleRegularity}
                onChange={(e) => { setCycleRegularity(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fba-lifestyle">{t("field.lifestyleFactors")}</Label>
              <Input
                id="fba-lifestyle"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.lifestyleFactors")}
                value={lifestyleFactors}
                onChange={(e) => { setLifestyleFactors(e.target.value); setTouched(false); }}
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{t("result.monthlyChance")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {(result.monthlyChance * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{t("result.annualChance")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {(result.annualChance * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{t("result.ageCategory")}</div>
                  <div className="text-sm font-semibold text-zinc-800">
                    {t(`ageCategory.${result.ageCat}`)}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-zinc-700">{t(`guidance.${result.ageCat}`)}</div>
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
            onClick={() => loadExample("26", "3", "1", "28", "8")}
          >
            {t("examples.loadYoung")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("33", "8", "0", "30", "6")}
          >
            {t("examples.loadMid")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("38", "6", "0", "32", "7")}
          >
            {t("examples.loadAdvanced")}
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
