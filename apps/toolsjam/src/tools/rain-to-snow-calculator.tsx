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

function getSnowType(
  ratio: number
): "powder" | "moderate" | "wet" {
  if (ratio >= 15) return "powder";
  if (ratio >= 9) return "moderate";
  return "wet";
}

function calcRainToSnow(
  tempC: number,
  precipMm: number,
  humidity: number,
  elevationM: number
): { snowDepthCm: number; ratio: number; density: number; snowType: "powder" | "moderate" | "wet" } | null {
  if (!Number.isFinite(tempC) || !Number.isFinite(precipMm) || precipMm <= 0) {
    return null;
  }
  if (tempC >= 0) return null;

  // Base ratio: colder = higher ratio
  const baseRatio = 10 - tempC * 0.5;
  // Elevation effect: slight increase at higher elevations
  const elevationFactor = 1 + elevationM * 0.00002;
  // Humidity effect: higher humidity = denser snow = lower ratio
  const humidityFactor = 1 - (humidity - 50) * 0.005;
  const adjustedRatio = Math.max(
    4,
    Math.min(30, baseRatio * elevationFactor * humidityFactor)
  );
  const snowDepthCm = (precipMm * adjustedRatio) / 10;
  const density = 1 / adjustedRatio;

  return {
    snowDepthCm,
    ratio: adjustedRatio,
    density,
    snowType: getSnowType(adjustedRatio),
  };
}

export default function RainToSnowCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.rain-to-snow-calculator");

  const [temperature, setTemperature] = React.useState("");
  const [precipitation, setPrecipitation] = React.useState("");
  const [humidity, setHumidity] = React.useState("70");
  const [elevation, setElevation] = React.useState("0");
  const [touched, setTouched] = React.useState(false);

  const tempNum = parseFloat(temperature);
  const precipNum = parseFloat(precipitation);
  const humidNum = parseFloat(humidity);
  const elevNum = parseFloat(elevation);

  const tempValid = temperature !== "" && Number.isFinite(tempNum);
  const precipValid =
    precipitation !== "" && Number.isFinite(precipNum) && precipNum > 0;

  const result = React.useMemo(() => {
    if (!tempValid || !precipValid) return null;
    const humidSafe = Number.isFinite(humidNum) ? humidNum : 70;
    const elevSafe = Number.isFinite(elevNum) ? elevNum : 0;
    return calcRainToSnow(tempNum, precipNum, humidSafe, elevSafe);
  }, [tempNum, precipNum, humidNum, elevNum, tempValid, precipValid]);

  function reset() {
    setTemperature("");
    setPrecipitation("");
    setHumidity("70");
    setElevation("0");
    setTouched(false);
  }

  function loadExample(
    temp: string,
    precip: string,
    hum: string,
    elev: string
  ) {
    setTemperature(temp);
    setPrecipitation(precip);
    setHumidity(hum);
    setElevation(elev);
    setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const showWarmError = touched && tempValid && tempNum >= 0;
  const showInvalidError =
    touched && (!tempValid || !precipValid) && !showWarmError;

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
              <Label htmlFor="rts-temp">{t("field.temperature")}</Label>
              <Input
                id="rts-temp"
                type="number"
                inputMode="decimal"
                value={temperature}
                placeholder={t("placeholder.temperature")}
                onChange={(e) => {
                  setTemperature(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rts-precip">{t("field.precipitation")}</Label>
              <Input
                id="rts-precip"
                type="number"
                inputMode="decimal"
                value={precipitation}
                placeholder={t("placeholder.precipitation")}
                onChange={(e) => {
                  setPrecipitation(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rts-humidity">{t("field.humidity")}</Label>
              <Input
                id="rts-humidity"
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rts-elevation">{t("field.elevation")}</Label>
              <Input
                id="rts-elevation"
                type="number"
                inputMode="decimal"
                value={elevation}
                onChange={(e) => setElevation(e.target.value)}
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

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("-10", "20", "70", "500")}
            >
              {t("examples.loadCold")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("-2", "15", "90", "200")}
            >
              {t("examples.loadWet")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("-15", "30", "60", "2500")}
            >
              {t("examples.loadMountain")}
            </Button>
          </div>

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showWarmError && (
            <p className="text-sm text-red-600">{t("error.warmTemp")}</p>
          )}

          {result !== null && !showWarmError && !showInvalidError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-700">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.snowDepth")}
                  </div>
                  <div className="text-3xl font-bold text-zinc-900">
                    {result.snowDepthCm.toFixed(1)} {t("result.cm")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.snowRatio")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.ratio.toFixed(1)} : 1
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.snowType")}
                  </div>
                  <div className="text-lg font-medium text-zinc-800">
                    {t(`snowType.${result.snowType}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.density")}
                  </div>
                  <div className="text-lg font-medium text-zinc-800">
                    {result.density.toFixed(3)} {t("result.gcm3")}
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
