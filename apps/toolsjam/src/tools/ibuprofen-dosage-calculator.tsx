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

type PatientType = "child" | "adult";
type DoseForm = "liquid" | "tablet";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

export default function IbuprofenDosageCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ibuprofen-dosage-calculator");

  const [weight, setWeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [patientType, setPatientType] = React.useState<PatientType>("child");
  const [form, setForm] = React.useState<DoseForm>("liquid");
  const [concentration, setConcentration] = React.useState("20");
  const [tabletStrength, setTabletStrength] = React.useState("200");
  const [dosesPerDay, setDosesPerDay] = React.useState("3");
  const [interval, setInterval] = React.useState("8");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);
  const concentrationNum = parseFloat(concentration);
  const tabletStrengthNum = parseFloat(tabletStrength);
  const dosesPerDayNum = parseFloat(dosesPerDay);
  const intervalNum = parseFloat(interval);

  const weightValid = weight !== "" && Number.isFinite(weightNum) && weightNum > 0;
  const concentrationValid =
    concentration !== "" && Number.isFinite(concentrationNum) && concentrationNum > 0;
  const tabletStrengthValid =
    tabletStrength !== "" &&
    Number.isFinite(tabletStrengthNum) &&
    tabletStrengthNum > 0;
  const dosesPerDayValid =
    dosesPerDay !== "" && Number.isFinite(dosesPerDayNum) && dosesPerDayNum > 0;
  const intervalValid = interval !== "" && Number.isFinite(intervalNum) && intervalNum > 0;

  const singleDoseMg = React.useMemo<number | null>(() => {
    if (!weightValid || !dosesPerDayValid) return null;
    if (patientType === "adult") return 400;
    return Math.min(weightNum * 10, (weightNum * 40) / dosesPerDayNum);
  }, [dosesPerDayNum, dosesPerDayValid, patientType, weightNum, weightValid]);

  const maxDailyDoseMg = React.useMemo<number | null>(() => {
    if (!weightValid) return null;
    return patientType === "adult" ? 3200 : weightNum * 40;
  }, [patientType, weightNum, weightValid]);

  const singleDoseMl = React.useMemo<number | null>(() => {
    if (form !== "liquid" || singleDoseMg === null || !concentrationValid) return null;
    return singleDoseMg / concentrationNum;
  }, [concentrationNum, concentrationValid, form, singleDoseMg]);

  const tabletCount = React.useMemo<number | null>(() => {
    if (form !== "tablet" || singleDoseMg === null || !tabletStrengthValid) return null;
    return singleDoseMg / tabletStrengthNum;
  }, [form, singleDoseMg, tabletStrengthNum, tabletStrengthValid]);

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
    for (let i = 1; i <= 5; i++) {
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

  const errorMessage = React.useMemo(() => {
    if (!touched) return null;
    if (!weightValid) return t("error.invalidWeight");
    if (!dosesPerDayValid || !intervalValid) return t("error.invalidSchedule");
    if (form === "liquid" && !concentrationValid) return t("error.invalidConcentration");
    if (form === "tablet" && !tabletStrengthValid) return t("error.invalidTablet");
    return null;
  }, [
    concentrationValid,
    dosesPerDayValid,
    form,
    intervalValid,
    t,
    tabletStrengthValid,
    touched,
    weightValid,
  ]);

  function reset() {
    setWeight("");
    setAge("");
    setPatientType("child");
    setForm("liquid");
    setConcentration("20");
    setTabletStrength("200");
    setDosesPerDay("3");
    setInterval("8");
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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const canShowResult =
    errorMessage === null && singleDoseMg !== null && maxDailyDoseMg !== null;

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
              <Label htmlFor="ibuprofen-weight">{t("field.weight")}</Label>
              <Input
                id="ibuprofen-weight"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ibuprofen-age">{t("field.age")}</Label>
              <Input
                id="ibuprofen-age"
                type="number"
                inputMode="numeric"
                min={0}
                step="1"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.patientType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["child", "adult"] as PatientType[]).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={patientType === type ? "default" : "outline"}
                  onClick={() => {
                    setPatientType(type);
                    setTouched(true);
                  }}
                >
                  {t(`type.${type}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.form")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["liquid", "tablet"] as DoseForm[]).map((doseForm) => (
                <Button
                  key={doseForm}
                  type="button"
                  variant={form === doseForm ? "default" : "outline"}
                  onClick={() => {
                    setForm(doseForm);
                    setTouched(true);
                  }}
                >
                  {t(`field.form${doseForm === "liquid" ? "Liquid" : "Tablet"}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {form === "liquid" ? (
              <div className="space-y-2">
                <Label htmlFor="ibuprofen-concentration">
                  {t("field.concentration")}
                </Label>
                <Input
                  id="ibuprofen-concentration"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.1"
                  value={concentration}
                  onChange={(e) => {
                    setConcentration(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="ibuprofen-tablet-strength">
                  {t("field.tabletStrength")}
                </Label>
                <Input
                  id="ibuprofen-tablet-strength"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="1"
                  value={tabletStrength}
                  onChange={(e) => {
                    setTabletStrength(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ibuprofen-doses-per-day">
                  {t("field.dosesPerDay")}
                </Label>
                <Input
                  id="ibuprofen-doses-per-day"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step="1"
                  value={dosesPerDay}
                  onChange={(e) => {
                    setDosesPerDay(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ibuprofen-interval">{t("field.interval")}</Label>
                <Input
                  id="ibuprofen-interval"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step="1"
                  value={interval}
                  onChange={(e) => {
                    setInterval(e.target.value);
                    setTouched(true);
                  }}
                />
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

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          {canShowResult && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.singleDoseMg")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(singleDoseMg, 1)}
                  </div>
                </div>
                {singleDoseMl !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.singleDoseMl")}
                    </div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNumber(singleDoseMl, 2)}
                    </div>
                  </div>
                )}
                {tabletCount !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.tabletCount")}
                    </div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNumber(tabletCount, 2)}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.maxDailyDose")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(maxDailyDoseMg, 1)}
                  </div>
                </div>
              </div>
              <div className="grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
                <div>
                  {t("result.perDose")}: {formatNumber(singleDoseMg, 1)}
                </div>
                <div>
                  {t("result.perDay")}: {formatNumber(maxDailyDoseMg, 1)}
                </div>
              </div>
              <div className="text-sm text-zinc-600">
                {t("field.dosesPerDay")}: {formatNumber(dosesPerDayNum, 0)} ·{" "}
                {t("field.interval")}: {formatNumber(intervalNum, 0)}
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {item.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
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
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
