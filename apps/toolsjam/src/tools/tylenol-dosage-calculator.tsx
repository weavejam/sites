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

type WeightUnit = "kg" | "lb";
type MedForm = "liquid160" | "tablet325" | "tablet500";

const DOSE_MG_PER_KG = 15;
const MAX_SINGLE_DOSE_MG = 1000;
const MIN_WEIGHT_KG = 5;

function lbToKg(lb: number): number {
  return lb / 2.20462;
}

function formatNum(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export default function TylenolDosageCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.tylenol-dosage-calculator");

  const [weight, setWeight] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>("kg");
  const [age, setAge] = React.useState("");
  const [form, setForm] = React.useState<MedForm>("liquid160");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);
  const weightValid = weight !== "" && Number.isFinite(weightNum) && weightNum > 0;

  const weightKg = weightValid
    ? weightUnit === "lb"
      ? lbToKg(weightNum)
      : weightNum
    : 0;

  const doseMg = React.useMemo<number | null>(() => {
    if (!weightValid) return null;
    const raw = DOSE_MG_PER_KG * weightKg;
    return Math.min(raw, MAX_SINGLE_DOSE_MG);
  }, [weightValid, weightKg]);

  const volumeMl = React.useMemo<number | null>(() => {
    if (doseMg === null || form !== "liquid160") return null;
    // 160 mg per 5 mL => 32 mg/mL
    return doseMg / 32;
  }, [doseMg, form]);

  const tablets = React.useMemo<number | null>(() => {
    if (doseMg === null) return null;
    if (form === "tablet325") return doseMg / 325;
    if (form === "tablet500") return doseMg / 500;
    return null;
  }, [doseMg, form]);

  const maxDailyMg = React.useMemo<number | null>(() => {
    if (!weightValid) return null;
    const byWeight = 75 * weightKg;
    return Math.min(byWeight, 4000);
  }, [weightValid, weightKg]);

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

  function reset() {
    setWeight("");
    setAge("");
    setWeightUnit("kg");
    setForm("liquid160");
    setTouched(false);
  }

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

  const showError = touched && !weightValid;
  const showTooLight = touched && weightValid && weightKg < MIN_WEIGHT_KG;

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
              <Label htmlFor="tdc-weight">{t("field.weight")}</Label>
              <div className="flex gap-2">
                <Input
                  id="tdc-weight"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.1"
                  value={weight}
                  placeholder={t("placeholder.weight")}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setTouched(true);
                  }}
                />
                <div className="flex gap-1">
                  {(["kg", "lb"] as WeightUnit[]).map((u) => (
                    <Button
                      key={u}
                      type="button"
                      size="sm"
                      variant={weightUnit === u ? "default" : "outline"}
                      onClick={() => setWeightUnit(u)}
                    >
                      {t(`weightUnit.${u}` as never)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tdc-age">{t("field.age")}</Label>
              <Input
                id="tdc-age"
                type="number"
                inputMode="numeric"
                min={0}
                step="1"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => {
                  setAge(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.form")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["liquid160", "tablet325", "tablet500"] as MedForm[]).map(
                (f) => (
                  <Button
                    key={f}
                    type="button"
                    variant={form === f ? "default" : "outline"}
                    onClick={() => {
                      setForm(f);
                      setTouched(true);
                    }}
                  >
                    {t(`form.${f}` as never)}
                  </Button>
                )
              )}
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
          {showTooLight && (
            <p className="text-sm text-red-600">{t("error.tooLight")}</p>
          )}

          {doseMg !== null && !showError && !showTooLight && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dose")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(doseMg, 0)} {t("result.unitMg")}
                  </div>
                </div>
                {volumeMl !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.volume")}
                    </div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNum(volumeMl)} {t("result.unitMl")}
                    </div>
                  </div>
                )}
                {tablets !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.tablets")}
                    </div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNum(tablets)} {t("result.tablets")}
                    </div>
                  </div>
                )}
                {maxDailyMg !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.maxDaily")}
                    </div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNum(maxDailyMg, 0)} {t("result.unitMgDay")}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.frequency")}: {t("result.frequencyValue")}
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
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
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
            onClick={() => {
              setWeight("18");
              setWeightUnit("kg");
              setForm("liquid160");
              setTouched(true);
            }}
          >
            {t("examples.loadChild")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setWeight("70");
              setWeightUnit("kg");
              setForm("tablet500");
              setTouched(true);
            }}
          >
            {t("examples.loadAdult")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setWeight("12");
              setWeightUnit("kg");
              setForm("liquid160");
              setTouched(true);
            }}
          >
            {t("examples.loadSmall")}
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
