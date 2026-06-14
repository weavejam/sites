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
  dynamicViscosity: number;
  kinematicViscosity: number;
  density: number;
  reynoldsNumber: number | null;
}

function formatNumber(value: number, maximumFractionDigits = 3): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

function calculateWaterProperties(
  temperatureC: number,
  velocity: number | null,
  diameter: number | null,
): Result {
  const temperatureK = temperatureC + 273.15;
  const dynamicViscosity = 2.414e-5 * 10 ** (247.8 / (temperatureK - 140));
  const density = 1000 - 0.003 * (temperatureC - 4) ** 2;
  const kinematicViscosity = dynamicViscosity / density;
  const reynoldsNumber =
    velocity !== null && diameter !== null
      ? (density * velocity * diameter) / dynamicViscosity
      : null;

  return {
    dynamicViscosity,
    kinematicViscosity,
    density,
    reynoldsNumber,
  };
}

export default function WaterViscosityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.water-viscosity-calculator");
  const [temperature, setTemperature] = React.useState("");
  const [pressure, setPressure] = React.useState("");
  const [flowVelocity, setFlowVelocity] = React.useState("");
  const [pipeDiameter, setPipeDiameter] = React.useState("");
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

  const parsedTemperature = temperature === "" ? NaN : parseFloat(temperature);
  const parsedPressure = pressure === "" ? NaN : parseFloat(pressure);
  const parsedVelocity = flowVelocity === "" ? null : parseFloat(flowVelocity);
  const parsedDiameter = pipeDiameter === "" ? null : parseFloat(pipeDiameter);

  const hasVelocity = flowVelocity !== "";
  const hasDiameter = pipeDiameter !== "";
  const hasOptionalPair = hasVelocity && hasDiameter;
  const hasOptionalMismatch = hasVelocity !== hasDiameter;

  const valid =
    Number.isFinite(parsedTemperature) &&
    Number.isFinite(parsedPressure) &&
    parsedPressure > 0 &&
    (!hasOptionalMismatch &&
      (!hasOptionalPair ||
        ((parsedVelocity ?? NaN) >= 0 &&
          Number.isFinite(parsedVelocity ?? NaN) &&
          (parsedDiameter ?? NaN) > 0 &&
          Number.isFinite(parsedDiameter ?? NaN))));

  const result = React.useMemo<Result | null>(() => {
    if (!valid) return null;
    return calculateWaterProperties(
      parsedTemperature,
      hasOptionalPair ? parsedVelocity : null,
      hasOptionalPair ? parsedDiameter : null,
    );
  }, [
    hasOptionalPair,
    parsedDiameter,
    parsedTemperature,
    parsedVelocity,
    valid,
  ]);

  function reset() {
    setTemperature("");
    setPressure("");
    setFlowVelocity("");
    setPipeDiameter("");
    setTouched(false);
  }

  function loadExample(
    nextTemperature: string,
    nextPressure: string,
    nextVelocity = "",
    nextDiameter = "",
  ) {
    setTemperature(nextTemperature);
    setPressure(nextPressure);
    setFlowVelocity(nextVelocity);
    setPipeDiameter(nextDiameter);
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

  const showError = touched && !valid;

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
              <Label htmlFor="wvc-temperature">{t("field.temperature")}</Label>
              <Input
                id="wvc-temperature"
                type="number"
                inputMode="decimal"
                value={temperature}
                placeholder={t("placeholder.temperature")}
                onChange={(event) => {
                  setTemperature(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wvc-pressure">{t("field.pressure")}</Label>
              <Input
                id="wvc-pressure"
                type="number"
                inputMode="decimal"
                value={pressure}
                placeholder={t("placeholder.pressure")}
                onChange={(event) => {
                  setPressure(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wvc-velocity">{t("field.flowVelocity")}</Label>
              <Input
                id="wvc-velocity"
                type="number"
                inputMode="decimal"
                value={flowVelocity}
                placeholder={t("placeholder.flowVelocity")}
                onChange={(event) => {
                  setFlowVelocity(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wvc-diameter">{t("field.pipeDiameter")}</Label>
              <Input
                id="wvc-diameter"
                type="number"
                inputMode="decimal"
                value={pipeDiameter}
                placeholder={t("placeholder.pipeDiameter")}
                onChange={(event) => {
                  setPipeDiameter(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <p className="text-sm text-zinc-500">{t("hint")}</p>

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

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-xl font-semibold text-zinc-900">
                {t("result.value", {
                  dynamic: formatNumber(result.dynamicViscosity * 1000, 3),
                  kinematic: formatNumber(result.kinematicViscosity * 1e6, 3),
                })}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.dynamic")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.dynamicViscosity * 1000, 3)}{" "}
                    {t("result.unitDynamic")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.kinematic")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.kinematicViscosity * 1e6, 3)}{" "}
                    {t("result.unitKinematic")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.density")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.density, 2)} {t("result.unitDensity")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.reynolds")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.reynoldsNumber === null
                      ? t("result.reynoldsUnavailable")
                      : `${formatNumber(result.reynoldsNumber, 0)} ${t("result.unitReynolds")}`}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.pressureNote", {
                  pressure: formatNumber(parsedPressure, 2),
                })}
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
            onClick={() => loadExample("20", "1")}
          >
            {t("examples.loadRoom")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("100", "1")}
          >
            {t("examples.loadBoiling")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("20", "1", "2", "0.05")}
          >
            {t("examples.loadFlow")}
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
