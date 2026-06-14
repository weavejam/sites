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

type PowerUnit =
  | "watt"
  | "kilowatt"
  | "megawatt"
  | "milliwatt"
  | "horsepower_mech"
  | "horsepower_metric"
  | "btu_per_hour"
  | "calorie_per_second"
  | "erg_per_second"
  | "foot_pound_per_minute";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const UNIT_FACTORS: Record<PowerUnit, number> = {
  watt: 1,
  kilowatt: 1000,
  megawatt: 1_000_000,
  milliwatt: 0.001,
  horsepower_mech: 745.69987,
  horsepower_metric: 735.49875,
  btu_per_hour: 0.29307107,
  calorie_per_second: 4.1868,
  erg_per_second: 1e-7,
  foot_pound_per_minute: 0.022597,
};

const UNIT_KEYS: PowerUnit[] = [
  "watt",
  "kilowatt",
  "megawatt",
  "milliwatt",
  "horsepower_mech",
  "horsepower_metric",
  "btu_per_hour",
  "calorie_per_second",
  "erg_per_second",
  "foot_pound_per_minute",
];

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1e8) / 1e8;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

export default function WattConverter(_props: { locale: Locale }) {
  const t = useTranslations("tool.watt-converter");
  const [powerValue, setPowerValue] = React.useState("");
  const [fromUnit, setFromUnit] = React.useState<PowerUnit>("kilowatt");
  const [toUnit, setToUnit] = React.useState<PowerUnit>("watt");
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

  const valueNumber = powerValue === "" ? NaN : parseFloat(powerValue);
  const valid = Number.isFinite(valueNumber);
  const convertedValue =
    valid ? (valueNumber * UNIT_FACTORS[fromUnit]) / UNIT_FACTORS[toUnit] : null;

  function reset() {
    setPowerValue("");
    setFromUnit("kilowatt");
    setToUnit("watt");
    setTouched(false);
  }

  function loadExample(
    nextValue: string,
    nextFromUnit: PowerUnit,
    nextToUnit: PowerUnit,
  ) {
    setPowerValue(nextValue);
    setFromUnit(nextFromUnit);
    setToUnit(nextToUnit);
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="wc-value">{t("field.powerValue")}</Label>
              <Input
                id="wc-value"
                type="number"
                inputMode="decimal"
                value={powerValue}
                placeholder={t("placeholder.powerValue")}
                onChange={(event) => {
                  setPowerValue(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wc-from">{t("field.fromUnit")}</Label>
              <select
                id="wc-from"
                aria-label={t("field.fromUnit")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={fromUnit}
                onChange={(event) => {
                  setFromUnit(event.target.value as PowerUnit);
                  setTouched(true);
                }}
              >
                {UNIT_KEYS.map((unit) => (
                  <option key={unit} value={unit}>
                    {t(`unit.${unit}` as never)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wc-to">{t("field.toUnit")}</Label>
              <select
                id="wc-to"
                aria-label={t("field.toUnit")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={toUnit}
                onChange={(event) => {
                  setToUnit(event.target.value as PowerUnit);
                  setTouched(true);
                }}
              >
                {UNIT_KEYS.map((unit) => (
                  <option key={unit} value={unit}>
                    {t(`unit.${unit}` as never)}
                  </option>
                ))}
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

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {convertedValue !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-xl font-semibold text-zinc-900">
                {t("result.value", {
                  input: formatNumber(valueNumber),
                  fromUnit: t(`unit.${fromUnit}` as never),
                  output: formatNumber(convertedValue),
                  toUnit: t(`unit.${toUnit}` as never),
                })}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.inWatts")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(valueNumber * UNIT_FACTORS[fromUnit])}{" "}
                    {t("unit.watt")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.formula")}
                  </div>
                  <div className="text-sm text-zinc-700">
                    {t("formula")}
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
            onClick={() => loadExample("1", "kilowatt", "watt")}
          >
            {t("examples.loadKilowatt")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "horsepower_mech", "watt")}
          >
            {t("examples.loadHorsepower")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("500", "watt", "kilowatt")}
          >
            {t("examples.loadHalfKilowatt")}
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
