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

interface FaqItem {
  q: string;
  a: string;
}

type WeightUnit = "kg" | "lbs";
type HeightUnit = "cm" | "in";

interface FfmiResult {
  ffm: number;
  ffmi: number;
  normalizedFfmi: number;
  category: string;
}

function computeFfmi(
  weightKg: number,
  heightM: number,
  bodyFatPct: number,
): FfmiResult | null {
  if (
    !Number.isFinite(weightKg) ||
    !Number.isFinite(heightM) ||
    !Number.isFinite(bodyFatPct) ||
    weightKg <= 0 ||
    heightM <= 0 ||
    bodyFatPct < 0 ||
    bodyFatPct >= 100
  )
    return null;

  const ffm = weightKg * (1 - bodyFatPct / 100);
  const ffmi = ffm / (heightM * heightM);
  // Normalized FFMI adjusts to a standardized height of 1.8 m
  const normalizedFfmi = ffmi + 6.1 * (1.8 - heightM);

  let category: string;
  if (normalizedFfmi < 17.0) category = "below";
  else if (normalizedFfmi < 18.0) category = "normal";
  else if (normalizedFfmi < 20.0) category = "above";
  else if (normalizedFfmi < 22.0) category = "excellent";
  else if (normalizedFfmi < 25.0) category = "superior";
  else category = "exceptional";

  return { ffm, ffmi, normalizedFfmi, category };
}

export default function FfmiCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ffmi-calculator-fat-free-mass-index");

  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [bodyFat, setBodyFat] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>("kg");
  const [heightUnit, setHeightUnit] = React.useState<HeightUnit>("cm");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<FfmiResult | null>(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const bf = parseFloat(bodyFat);
    if (!Number.isFinite(w) || !Number.isFinite(h) || !Number.isFinite(bf))
      return null;

    const wKg = weightUnit === "kg" ? w : w * 0.453592;
    const hM = heightUnit === "cm" ? h / 100 : h * 0.0254;

    return computeFfmi(wKg, hM, bf);
  }, [weight, height, bodyFat, weightUnit, heightUnit]);

  function reset() {
    setWeight("");
    setHeight("");
    setBodyFat("");
    setWeightUnit("kg");
    setHeightUnit("cm");
    setTouched(false);
  }

  function loadExample(
    w: string,
    h: string,
    bf: string,
    wu: WeightUnit,
    hu: HeightUnit,
  ) {
    setWeight(w);
    setHeight(h);
    setBodyFat(bf);
    setWeightUnit(wu);
    setHeightUnit(hu);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const WEIGHT_UNITS: WeightUnit[] = ["kg", "lbs"];
  const HEIGHT_UNITS: HeightUnit[] = ["cm", "in"];

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
          <div className="space-y-2">
            <Label>{t("field.weightUnit")}</Label>
            <div className="flex flex-wrap gap-2">
              {WEIGHT_UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={weightUnit === u ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWeightUnit(u)}
                >
                  {t(`unit.weight.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.heightUnit")}</Label>
            <div className="flex flex-wrap gap-2">
              {HEIGHT_UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={heightUnit === u ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHeightUnit(u)}
                >
                  {t(`unit.height.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ffmi-weight">{t("field.weight")}</Label>
              <Input
                id="ffmi-weight"
                type="number"
                inputMode="decimal"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ffmi-height">{t("field.height")}</Label>
              <Input
                id="ffmi-height"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => {
                  setHeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ffmi-bf">{t("field.bodyFat")}</Label>
              <Input
                id="ffmi-bf"
                type="number"
                inputMode="decimal"
                value={bodyFat}
                placeholder={t("placeholder.bodyFat")}
                onChange={(e) => {
                  setBodyFat(e.target.value);
                  setTouched(true);
                }}
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

          {result !== null && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.ffm")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.ffm.toFixed(1)} kg
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.ffmi")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.ffmi.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.normalizedFfmi")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.normalizedFfmi.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.category")}:{" "}
                <span className="font-semibold">
                  {t(`category.${result.category}` as never)}
                </span>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
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
            onClick={() => loadExample("80", "178", "12", "kg", "cm")}
          >
            {t("examples.loadAthlete")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("95", "180", "6", "kg", "cm")}
          >
            {t("examples.loadBodybuilder")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("60", "165", "22", "kg", "cm")}
          >
            {t("examples.loadFemale")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
