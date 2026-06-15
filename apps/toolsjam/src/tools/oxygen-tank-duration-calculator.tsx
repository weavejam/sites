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

function formatMinutes(minutes: number, hourUnit: string, minUnit: string): string {
  if (!Number.isFinite(minutes) || minutes < 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h} ${hourUnit} ${m.toString().padStart(2, "0")} ${minUnit}`;
}

function formatNum(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

export default function OxygenTankDurationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.oxygen-tank-duration-calculator");

  const [tankCapacity, setTankCapacity] = React.useState("");
  const [currentPressure, setCurrentPressure] = React.useState("");
  const [ratedPressure, setRatedPressure] = React.useState("");
  const [flowRate, setFlowRate] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const capacityNum = parseFloat(tankCapacity);
  const currentPressureNum = parseFloat(currentPressure);
  const ratedPressureNum = parseFloat(ratedPressure);
  const flowRateNum = parseFloat(flowRate);

  const capacityValid = tankCapacity !== "" && Number.isFinite(capacityNum) && capacityNum > 0;
  const currentPressureValid = currentPressure !== "" && Number.isFinite(currentPressureNum) && currentPressureNum >= 0;
  const ratedPressureValid = ratedPressure !== "" && Number.isFinite(ratedPressureNum) && ratedPressureNum > 0;
  const flowRateValid = flowRate !== "" && Number.isFinite(flowRateNum) && flowRateNum > 0;

  const allValid = capacityValid && currentPressureValid && ratedPressureValid && flowRateValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const availableVolume = capacityNum * (currentPressureNum / ratedPressureNum);
    const durationMinutes = availableVolume / flowRateNum;
    return { availableVolume, durationMinutes };
  }, [allValid, capacityNum, currentPressureNum, ratedPressureNum, flowRateNum]);

  function reset() {
    setTankCapacity("");
    setCurrentPressure("");
    setRatedPressure("");
    setFlowRate("");
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
        applicationCategory: "UtilitiesApplication",
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

  const showError = touched && !allValid;

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
              <Label htmlFor="otd-capacity">{t("field.tankCapacity")}</Label>
              <Input
                id="otd-capacity"
                type="number"
                inputMode="decimal"
                value={tankCapacity}
                placeholder={t("field.placeholder.tankCapacity")}
                onChange={(e) => {
                  setTankCapacity(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otd-current">{t("field.currentPressure")}</Label>
              <Input
                id="otd-current"
                type="number"
                inputMode="decimal"
                value={currentPressure}
                placeholder={t("field.placeholder.currentPressure")}
                onChange={(e) => {
                  setCurrentPressure(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otd-rated">{t("field.ratedPressure")}</Label>
              <Input
                id="otd-rated"
                type="number"
                inputMode="decimal"
                value={ratedPressure}
                placeholder={t("field.placeholder.ratedPressure")}
                onChange={(e) => {
                  setRatedPressure(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otd-flow">{t("field.flowRate")}</Label>
              <Input
                id="otd-flow"
                type="number"
                inputMode="decimal"
                value={flowRate}
                placeholder={t("field.placeholder.flowRate")}
                onChange={(e) => {
                  setFlowRate(e.target.value);
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

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.availableVolume")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.availableVolume, 1)} {t("result.volumeUnit")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.durationMinutes")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.durationMinutes, 1)} {t("result.minuteUnit")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.durationFormatted")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatMinutes(result.durationMinutes, t("result.hourUnit"), t("result.minuteUnit"))}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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
