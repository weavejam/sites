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

interface Result {
  energyPerDayWh: number;
  energyPerMonthKwh: number;
  monthlyCost: number;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function WattHourCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.watt-hour-calculator");
  const [powerRating, setPowerRating] = React.useState("");
  const [usageTime, setUsageTime] = React.useState("");
  const [daysPerMonth, setDaysPerMonth] = React.useState("");
  const [electricityRate, setElectricityRate] = React.useState("");
  const [touched, setTouched] = React.useState(false);

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

  const parsedPower = powerRating === "" ? NaN : parseFloat(powerRating);
  const parsedHours = usageTime === "" ? NaN : parseFloat(usageTime);
  const parsedDays = daysPerMonth === "" ? NaN : parseFloat(daysPerMonth);
  const parsedRate = electricityRate === "" ? NaN : parseFloat(electricityRate);

  const valid =
    Number.isFinite(parsedPower) &&
    Number.isFinite(parsedHours) &&
    Number.isFinite(parsedDays) &&
    Number.isFinite(parsedRate) &&
    parsedPower >= 0 &&
    parsedHours >= 0 &&
    parsedDays >= 0 &&
    parsedRate >= 0;

  const result = React.useMemo<Result | null>(() => {
    if (!valid) return null;
    const energyPerDayWh = parsedPower * parsedHours;
    const energyPerMonthKwh = (parsedPower * parsedHours * parsedDays) / 1000;
    const monthlyCost = energyPerMonthKwh * parsedRate;
    return { energyPerDayWh, energyPerMonthKwh, monthlyCost };
  }, [parsedDays, parsedHours, parsedPower, parsedRate, valid]);

  function reset() {
    setPowerRating("");
    setUsageTime("");
    setDaysPerMonth("");
    setElectricityRate("");
    setTouched(false);
  }

  function loadExample(
    nextPower: string,
    nextHours: string,
    nextDays: string,
    nextRate: string,
  ) {
    setPowerRating(nextPower);
    setUsageTime(nextHours);
    setDaysPerMonth(nextDays);
    setElectricityRate(nextRate);
    setTouched(true);
  }

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wh-power">{t("field.powerRating")}</Label>
              <Input
                id="wh-power"
                type="number"
                inputMode="decimal"
                value={powerRating}
                placeholder={t("placeholder.powerRating")}
                onChange={(event) => {
                  setPowerRating(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-hours">{t("field.usageTime")}</Label>
              <Input
                id="wh-hours"
                type="number"
                inputMode="decimal"
                value={usageTime}
                placeholder={t("placeholder.usageTime")}
                onChange={(event) => {
                  setUsageTime(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-days">{t("field.daysPerMonth")}</Label>
              <Input
                id="wh-days"
                type="number"
                inputMode="decimal"
                value={daysPerMonth}
                placeholder={t("placeholder.daysPerMonth")}
                onChange={(event) => {
                  setDaysPerMonth(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-rate">{t("field.electricityRate")}</Label>
              <Input
                id="wh-rate"
                type="number"
                inputMode="decimal"
                value={electricityRate}
                placeholder={t("placeholder.electricityRate")}
                onChange={(event) => {
                  setElectricityRate(event.target.value);
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

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-xl font-semibold text-zinc-900">
                {t("result.value", {
                  monthKwh: formatNumber(result.energyPerMonthKwh),
                  cost: formatNumber(result.monthlyCost),
                })}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.energyPerDay")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.energyPerDayWh)} {t("result.unitWh")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.energyPerMonth")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.energyPerMonthKwh)} {t("result.unitKwh")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.monthlyCost")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.monthlyCost)} {t("result.unitCurrency")}
                  </div>
                </div>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">
                    {example.note ?? ""}
                  </td>
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
            onClick={() => loadExample("9", "4", "30", "0.12")}
          >
            {t("examples.loadLed")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1500", "2", "30", "0.12")}
          >
            {t("examples.loadHeater")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("200", "5", "30", "0.15")}
          >
            {t("examples.loadTv")}
          </Button>
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
