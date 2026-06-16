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

type ConcentrationUnit = "mg/dL" | "mmol/L" | "%";
type FlowRateUnit = "mL/hour" | "mL/minute";
type WeightUnit = "kg" | "lb";
type InterpretationKey =
  | "belowAdult"
  | "adultRange"
  | "neonatalRange"
  | "aboveNeonatal";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const SELECT_CLASS =
  "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none";

function formatNumber(value: number, maximumFractionDigits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

function getInterpretationKey(girMgKgMin: number): InterpretationKey {
  if (girMgKgMin < 2) return "belowAdult";
  if (girMgKgMin <= 4) return "adultRange";
  if (girMgKgMin <= 8) return "neonatalRange";
  return "aboveNeonatal";
}

export default function GirCalculatorGlucoseInfusionRate(
  _props: { locale: Locale },
) {
  const t = useTranslations("tool.gir-calculator-glucose-infusion-rate");

  const [concentration, setConcentration] = React.useState("");
  const [concentrationUnit, setConcentrationUnit] =
    React.useState<ConcentrationUnit>("mg/dL");
  const [flowRate, setFlowRate] = React.useState("");
  const [flowRateUnit, setFlowRateUnit] =
    React.useState<FlowRateUnit>("mL/hour");
  const [weight, setWeight] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>("kg");
  const [touched, setTouched] = React.useState(false);

  const concentrationNum = Number.parseFloat(concentration);
  const flowRateNum = Number.parseFloat(flowRate);
  const weightNum = Number.parseFloat(weight);

  const concentrationValid = Number.isFinite(concentrationNum) && concentrationNum > 0;
  const flowRateValid = Number.isFinite(flowRateNum) && flowRateNum > 0;
  const weightValid = Number.isFinite(weightNum) && weightNum > 0;

  const result = React.useMemo(() => {
    if (!concentrationValid || !flowRateValid || !weightValid) return null;

    const concentrationMgDl =
      concentrationUnit === "mg/dL"
        ? concentrationNum
        : concentrationUnit === "mmol/L"
          ? concentrationNum * 18.015
          : concentrationNum * 1000;

    const flowRateMlMin =
      flowRateUnit === "mL/minute" ? flowRateNum : flowRateNum / 60;
    const flowRateMlHr =
      flowRateUnit === "mL/minute" ? flowRateNum * 60 : flowRateNum;
    const weightKg = weightUnit === "kg" ? weightNum : weightNum / 2.2046;

    const girMgKgMin = (concentrationMgDl * flowRateMlMin) / (weightKg * 100);
    const girGKgMin = girMgKgMin / 1000;
    const totalGlucosePerHour = ((concentrationMgDl / 100) * flowRateMlHr) / 1000;
    const totalGlucosePerMinute = totalGlucosePerHour / 60;

    return {
      concentrationMgDl,
      flowRateMlMin,
      weightKg,
      girMgKgMin,
      girGKgMin,
      totalGlucosePerHour,
      totalGlucosePerMinute,
      interpretation: getInterpretationKey(girMgKgMin),
    };
  }, [
    concentrationNum,
    concentrationUnit,
    concentrationValid,
    flowRateNum,
    flowRateUnit,
    flowRateValid,
    weightNum,
    weightUnit,
    weightValid,
  ]);

  const errorMessage = React.useMemo(() => {
    if (!touched) return null;
    if (!concentrationValid) return t("error.invalidConcentration");
    if (!flowRateValid) return t("error.invalidFlowRate");
    if (!weightValid) return t("error.invalidWeight");
    return null;
  }, [concentrationValid, flowRateValid, t, touched, weightValid]);

  function reset() {
    setConcentration("");
    setConcentrationUnit("mg/dL");
    setFlowRate("");
    setFlowRateUnit("mL/hour");
    setWeight("");
    setWeightUnit("kg");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
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
              <Label htmlFor="gir-concentration">{t("field.concentration")}</Label>
              <Input
                id="gir-concentration"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                value={concentration}
                placeholder={t("placeholder.concentration")}
                onChange={(event) => {
                  setConcentration(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gir-concentration-unit">
                {t("field.concentrationUnit")}
              </Label>
              <select
                id="gir-concentration-unit"
                value={concentrationUnit}
                onChange={(event) => {
                  setConcentrationUnit(event.target.value as ConcentrationUnit);
                  setTouched(true);
                }}
                className={SELECT_CLASS}
              >
                <option value="mg/dL">{t("option.mgdl")}</option>
                <option value="mmol/L">{t("option.mmol")}</option>
                <option value="%">{t("option.percent")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gir-flow-rate">{t("field.flowRate")}</Label>
              <Input
                id="gir-flow-rate"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                value={flowRate}
                placeholder={t("placeholder.flowRate")}
                onChange={(event) => {
                  setFlowRate(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gir-flow-rate-unit">{t("field.flowRateUnit")}</Label>
              <select
                id="gir-flow-rate-unit"
                value={flowRateUnit}
                onChange={(event) => {
                  setFlowRateUnit(event.target.value as FlowRateUnit);
                  setTouched(true);
                }}
                className={SELECT_CLASS}
              >
                <option value="mL/hour">{t("option.mlHour")}</option>
                <option value="mL/minute">{t("option.mlMinute")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gir-weight">{t("field.weight")}</Label>
              <Input
                id="gir-weight"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(event) => {
                  setWeight(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gir-weight-unit">{t("field.weightUnit")}</Label>
              <select
                id="gir-weight-unit"
                value={weightUnit}
                onChange={(event) => {
                  setWeightUnit(event.target.value as WeightUnit);
                  setTouched(true);
                }}
                className={SELECT_CLASS}
              >
                <option value="kg">{t("option.kg")}</option>
                <option value="lb">{t("option.lb")}</option>
              </select>
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

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          {result && !errorMessage && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.girMgKgMin")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNumber(result.girMgKgMin)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.girGKgMin")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNumber(result.girGKgMin, 4)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.totalPerHour")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNumber(result.totalGlucosePerHour, 3)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.totalPerMinute")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNumber(result.totalGlucosePerMinute, 4)}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.normalRanges")}
                  </div>
                  <div className="text-sm text-zinc-800">{t("result.adultRange")}</div>
                  <div className="text-sm text-zinc-800">
                    {t("result.neonatalRange")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.interpretation")}
                  </div>
                  <div className="text-sm font-medium text-zinc-900">
                    {t(`interpretation.${result.interpretation}` as never)}
                  </div>
                  <div className="mt-2 text-xs text-zinc-500">
                    {t("result.conversionNote", {
                      concentration: formatNumber(result.concentrationMgDl, 2),
                      flow: formatNumber(result.flowRateMlMin, 3),
                      weight: formatNumber(result.weightKg, 2),
                    })}
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
