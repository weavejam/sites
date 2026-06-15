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

type TempUnit = "C" | "F";
type SpeedUnit = "kmh" | "mph";

function toC(v: number, unit: TempUnit): number {
  return unit === "F" ? (v - 32) * 5 / 9 : v;
}
function fromC(v: number, unit: TempUnit): number {
  return unit === "F" ? v * 9 / 5 + 32 : v;
}
function toKmh(v: number, unit: SpeedUnit): number {
  return unit === "mph" ? v * 1.60934 : v;
}
function fromKmh(v: number, unit: SpeedUnit): number {
  return unit === "mph" ? v / 1.60934 : v;
}

/** NWS/Environment Canada wind chill formula (T in °C, V in km/h) */
function windChillNWS(TC: number, Vkmh: number): number {
  if (TC > 10 || Vkmh < 4.8) return TC;
  return 13.12 + 0.6215 * TC - 11.37 * Math.pow(Vkmh, 0.16) + 0.3965 * TC * Math.pow(Vkmh, 0.16);
}

function realFeel(TC: number, Vkmh: number, humidity: number, solarRad: number): number {
  const wc = windChillNWS(TC, Vkmh);
  const humBonus = humidity > 0 ? (humidity - 50) / 100 * 0.8 : 0;
  const solarBonus = solarRad > 0 ? solarRad / 1000 * 2.5 : 0;
  return wc + humBonus + solarBonus;
}

function windChillIndex(TC: number, Vkmh: number): number {
  if (TC > 10 || Vkmh < 4.8) return 0;
  return TC - windChillNWS(TC, Vkmh);
}

function formatTemp(val: number, unit: TempUnit): string {
  return `${Math.round(val * 10) / 10} °${unit}`;
}

export default function WindChillCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.wind-chill-calculator");

  const [temperature, setTemperature] = React.useState("");
  const [windSpeed, setWindSpeed] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [solarRad, setSolarRad] = React.useState("");
  const [tempUnit, setTempUnit] = React.useState<TempUnit>("C");
  const [speedUnit, setSpeedUnit] = React.useState<SpeedUnit>("kmh");
  const [touched, setTouched] = React.useState(false);

  const tempNum = parseFloat(temperature);
  const windNum = parseFloat(windSpeed);
  const humNum = parseFloat(humidity) || 0;
  const solarNum = parseFloat(solarRad) || 0;

  const tempValid = temperature !== "" && Number.isFinite(tempNum);
  const windValid = windSpeed !== "" && Number.isFinite(windNum) && windNum >= 0;

  const result = React.useMemo(() => {
    if (!tempValid || !windValid) return null;
    const TC = toC(tempNum, tempUnit);
    const Vkmh = toKmh(windNum, speedUnit);
    const wcC = windChillNWS(TC, Vkmh);
    const rfC = realFeel(TC, Vkmh, humNum, solarNum);
    const wci = windChillIndex(TC, Vkmh);
    return {
      windChill: fromC(wcC, tempUnit),
      realFeel: fromC(rfC, tempUnit),
      windChillIndex: Math.round(wci * 10) / 10,
      TC,
      Vkmh,
    };
  }, [tempValid, windValid, tempNum, windNum, tempUnit, speedUnit, humNum, solarNum]);

  function reset() {
    setTemperature("");
    setWindSpeed("");
    setHumidity("");
    setSolarRad("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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

  const showError = touched && (!tempValid || !windValid);

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
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
              <Label htmlFor="wcc-temp">{t("field.temperature")}</Label>
              <div className="flex gap-2">
                <Input
                  id="wcc-temp"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={temperature}
                  placeholder={t("placeholder.temperature")}
                  className="flex-1"
                  onChange={(e) => { setTemperature(e.target.value); setTouched(true); }}
                />
                <select
                  aria-label={t("field.tempUnit")}
                  className="rounded-md border border-zinc-200 px-2 text-sm"
                  value={tempUnit}
                  onChange={(e) => setTempUnit(e.target.value as TempUnit)}
                >
                  <option value="C">°C</option>
                  <option value="F">°F</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wcc-wind">{t("field.windSpeed")}</Label>
              <div className="flex gap-2">
                <Input
                  id="wcc-wind"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={windSpeed}
                  placeholder={t("placeholder.windSpeed")}
                  className="flex-1"
                  onChange={(e) => { setWindSpeed(e.target.value); setTouched(true); }}
                />
                <select
                  aria-label={t("field.speedUnit")}
                  className="rounded-md border border-zinc-200 px-2 text-sm"
                  value={speedUnit}
                  onChange={(e) => setSpeedUnit(e.target.value as SpeedUnit)}
                >
                  <option value="kmh">km/h</option>
                  <option value="mph">mph</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wcc-humidity">{t("field.humidity")}</Label>
              <Input
                id="wcc-humidity"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="1"
                value={humidity}
                placeholder={t("placeholder.humidity")}
                onChange={(e) => { setHumidity(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wcc-solar">{t("field.solarRad")}</Label>
              <Input
                id="wcc-solar"
                type="number"
                inputMode="decimal"
                min="0"
                max="1200"
                step="1"
                value={solarRad}
                placeholder={t("placeholder.solarRad")}
                onChange={(e) => { setSolarRad(e.target.value); setTouched(true); }}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3 text-center">
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500 mb-1">{t("result.windChill")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{formatTemp(result.windChill, tempUnit)}</div>
                </div>
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500 mb-1">{t("result.realFeel")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{formatTemp(result.realFeel, tempUnit)}</div>
                </div>
                <div className="rounded-md bg-white border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500 mb-1">{t("result.index")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{result.windChillIndex} °{tempUnit}</div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("result.note")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
