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

const SELECT_CLS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type Gender = "male" | "female";

function watsonTBW(age: number, heightCm: number, weightKg: number, gender: Gender): number {
  if (gender === "male") {
    return 2.447 - 0.09156 * age + 0.1074 * heightCm + 0.3362 * weightKg;
  }
  return -2.097 + 0.1069 * heightCm + 0.2466 * weightKg;
}

function leanMassTBW(weightKg: number, bodyFatPct: number): number {
  return weightKg * (1 - bodyFatPct / 100) * 0.73;
}

function getStatus(tbwPct: number, gender: Gender): string {
  const [low, high] = gender === "male" ? [50, 65] : [45, 60];
  if (tbwPct < low) return "low";
  if (tbwPct > high) return "high";
  return "normal";
}

function fmt(n: number, decimals = 1): string {
  return n.toFixed(decimals);
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export default function TotalBodyWaterCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.total-body-water-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [bodyFat, setBodyFat] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const heightNum = parseFloat(height);
  const weightNum = parseFloat(weight);
  const bodyFatNum = parseFloat(bodyFat);

  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 1 && ageNum <= 120;
  const heightValid = height !== "" && Number.isFinite(heightNum) && heightNum >= 100 && heightNum <= 250;
  const weightValid = weight !== "" && Number.isFinite(weightNum) && weightNum >= 10 && weightNum <= 300;
  const bodyFatValid = bodyFat === "" || (Number.isFinite(bodyFatNum) && bodyFatNum >= 1 && bodyFatNum <= 70);
  const allValid = ageValid && heightValid && weightValid && bodyFatValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const tbwL = watsonTBW(ageNum, heightNum, weightNum, gender);
    const tbwPct = (tbwL / weightNum) * 100;
    const tbwLean = bodyFat !== "" ? leanMassTBW(weightNum, bodyFatNum) : null;
    const status = getStatus(tbwPct, gender);
    return { tbwL, tbwPct, tbwLean, status };
  }, [allValid, ageNum, heightNum, weightNum, gender, bodyFat, bodyFatNum]);

  function loadExample(a: string, g: Gender, h: string, w: string, bf: string) {
    setAge(a); setGender(g); setHeight(h); setWeight(w); setBodyFat(bf);
    setTouched(true);
  }

  function reset() {
    setAge(""); setGender("male"); setHeight(""); setWeight(""); setBodyFat("");
    setTouched(false);
  }

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
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tbw-age">{t("field.age")}</Label>
              <Input
                id="tbw-age"
                type="number"
                inputMode="numeric"
                min="1"
                max="120"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tbw-gender">{t("field.gender")}</Label>
              <select
                id="tbw-gender"
                className={SELECT_CLS}
                value={gender}
                onChange={(e) => { setGender(e.target.value as Gender); setTouched(true); }}
              >
                <option value="male">{t("gender.male")}</option>
                <option value="female">{t("gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tbw-height">{t("field.height")}</Label>
              <Input
                id="tbw-height"
                type="number"
                inputMode="numeric"
                min="100"
                max="250"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tbw-weight">{t("field.weight")}</Label>
              <Input
                id="tbw-weight"
                type="number"
                inputMode="decimal"
                min="10"
                max="300"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="tbw-bf">{t("field.bodyFat")}</Label>
              <Input
                id="tbw-bf"
                type="number"
                inputMode="decimal"
                min="1"
                max="70"
                step="0.1"
                value={bodyFat}
                placeholder={t("placeholder.bodyFat")}
                onChange={(e) => { setBodyFat(e.target.value); setTouched(true); }}
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

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.tbwLiters")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {fmt(result.tbwL)} {t("result.unit.liters")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.tbwPercent")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {fmt(result.tbwPct)}{t("result.unit.percent")}
                  </div>
                </div>
                {result.tbwLean !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.tbwLean")}</div>
                    <div className="text-2xl font-bold text-zinc-900">
                      {fmt(result.tbwLean)} {t("result.unit.liters")}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">{t("result.status")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`status.${result.status}` as never)}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {t(`normalRange.${gender}` as never)}
                  </div>
                </div>
              </div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("28", "male", "180", "75", "12")}
          >
            {t("button.loadMale")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("35", "female", "165", "60", "25")}
          >
            {t("button.loadFemale")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("70", "male", "175", "80", "30")}
          >
            {t("button.loadElderly")}
          </Button>
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
