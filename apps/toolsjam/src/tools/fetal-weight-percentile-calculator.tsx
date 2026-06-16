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

type WeightUnit = "grams" | "ounces" | "pounds";
type PregnancyType = "singleton" | "twins";

interface FetalResult {
  percentile: number;
  interpretation: string;
  efw_g: number;
}

function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const poly =
    t *
    (0.319381530 +
      t *
        (-0.356563782 +
          t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const p = 1 - (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z) * poly;
  return z >= 0 ? p : 1 - p;
}

function meanLogEFW(gaWeeks: number): number {
  // Hadlock 1991 polynomial: ln(EFW in grams)
  return 0.578 + 0.332 * gaWeeks - 0.00354 * gaWeeks * gaWeeks;
}

function computeFetal(
  gaWeeks: number,
  efwGrams: number,
  _pregnancyType: PregnancyType,
): FetalResult | null {
  if (gaWeeks < 14 || gaWeeks > 42) return null;
  if (efwGrams <= 0) return null;

  const mu = meanLogEFW(gaWeeks);
  const sigma = 0.15;
  const z = (Math.log(efwGrams) - mu) / sigma;
  const p = normalCDF(z) * 100;
  const percentile = Math.max(0.1, Math.min(99.9, p));

  let interpretation: string;
  if (percentile < 10) interpretation = "small";
  else if (percentile < 90) interpretation = "normal";
  else interpretation = "large";

  return { percentile, interpretation, efw_g: efwGrams };
}

function convertToGrams(value: number, unit: WeightUnit): number {
  if (unit === "grams") return value;
  if (unit === "ounces") return value * 28.3495;
  return value * 453.592; // pounds
}

export default function FetalWeightPercentileCalculator(
  _props: { locale: Locale },
) {
  const t = useTranslations("tool.fetal-weight-percentile-calculator");

  const [gaWeeks, setGaWeeks] = React.useState("");
  const [efw, setEfw] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>("grams");
  const [maternalAge, setMaternalAge] = React.useState("");
  const [maternalBMI, setMaternalBMI] = React.useState("");
  const [pregnancyType, setPregnancyType] =
    React.useState<PregnancyType>("singleton");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<FetalResult | null>(() => {
    const ga = parseFloat(gaWeeks);
    const efwVal = parseFloat(efw);
    if (!Number.isFinite(ga) || !Number.isFinite(efwVal)) return null;
    const efwGrams = convertToGrams(efwVal, weightUnit);
    return computeFetal(ga, efwGrams, pregnancyType);
  }, [gaWeeks, efw, weightUnit, pregnancyType]);

  function reset() {
    setGaWeeks("");
    setEfw("");
    setWeightUnit("grams");
    setMaternalAge("");
    setMaternalBMI("");
    setPregnancyType("singleton");
    setTouched(false);
  }

  function loadExample(
    ga: string,
    w: string,
    unit: WeightUnit,
    pt: PregnancyType,
  ) {
    setGaWeeks(ga);
    setEfw(w);
    setWeightUnit(unit);
    setPregnancyType(pt);
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

  const showError =
    touched &&
    (gaWeeks === "" ||
      efw === "" ||
      !Number.isFinite(parseFloat(gaWeeks)) ||
      !Number.isFinite(parseFloat(efw)));

  const WEIGHT_UNITS: WeightUnit[] = ["grams", "ounces", "pounds"];
  const PREGNANCY_TYPES: PregnancyType[] = ["singleton", "twins"];

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
              <Label htmlFor="fwp-ga">{t("field.gestationalAge")}</Label>
              <Input
                id="fwp-ga"
                type="number"
                inputMode="decimal"
                value={gaWeeks}
                placeholder={t("placeholder.gestationalAge")}
                onChange={(e) => {
                  setGaWeeks(e.target.value);
                  setTouched(true);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fwp-efw">{t("field.estimatedFetalWeight")}</Label>
              <Input
                id="fwp-efw"
                type="number"
                inputMode="decimal"
                value={efw}
                placeholder={t("placeholder.estimatedFetalWeight")}
                onChange={(e) => {
                  setEfw(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

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
                  {t(`unit.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.pregnancyType")}</Label>
            <div className="flex flex-wrap gap-2">
              {PREGNANCY_TYPES.map((pt) => (
                <Button
                  key={pt}
                  type="button"
                  variant={pregnancyType === pt ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPregnancyType(pt)}
                >
                  {t(`pregnancyType.${pt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fwp-ma">{t("field.maternalAge")}</Label>
              <Input
                id="fwp-ma"
                type="number"
                inputMode="decimal"
                value={maternalAge}
                placeholder={t("placeholder.maternalAge")}
                onChange={(e) => setMaternalAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fwp-bmi">{t("field.maternalBMI")}</Label>
              <Input
                id="fwp-bmi"
                type="number"
                inputMode="decimal"
                value={maternalBMI}
                placeholder={t("placeholder.maternalBMI")}
                onChange={(e) => setMaternalBMI(e.target.value)}
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
              <div className="text-2xl font-semibold text-zinc-900">
                {result.percentile.toFixed(1)}
                {t("result.percentileSuffix")}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.interpretation")}:{" "}
                <span className="font-semibold">
                  {t(`interp.${result.interpretation}` as never)}
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
            onClick={() => loadExample("28", "1187", "grams", "singleton")}
          >
            {t("examples.load28w")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("34", "2387", "grams", "singleton")}
          >
            {t("examples.load34w")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("38", "3311", "grams", "singleton")}
          >
            {t("examples.load38w")}
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
