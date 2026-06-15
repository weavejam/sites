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

interface HumidityResult {
  absoluteHumidity: number;
  waterVaporPressure: number;
  saturationVaporPressure: number;
  dewPoint: number;
}

/** Magnus formula: saturation vapor pressure in kPa */
function saturationVaporPressure(TC: number): number {
  return 0.61078 * Math.exp((17.27 * TC) / (TC + 237.3));
}

/** Dew point approximation using Magnus formula */
function dewPoint(TC: number, RH: number): number {
  if (RH <= 0) return -273.15; // absolute zero boundary for completely dry air
  const a = 17.27;
  const b = 237.3;
  const alpha = (a * TC) / (b + TC) + Math.log(RH / 100);
  return (b * alpha) / (a - alpha);
}

function calcAbsoluteHumidity(TC: number, RH: number, pressureKPa: number): HumidityResult {
  const es = saturationVaporPressure(TC);
  const e = es * (RH / 100);
  // Absolute humidity: AH = 2167 * e / (T + 273.15) g/m³  (e in kPa)
  const AH = (2167 * e) / (TC + 273.15);
  const dp = dewPoint(TC, RH);
  return {
    absoluteHumidity: Math.round(AH * 1000) / 1000,
    waterVaporPressure: Math.round(e * 10000) / 10000,
    saturationVaporPressure: Math.round(es * 10000) / 10000,
    dewPoint: Math.round(dp * 100) / 100,
  };
  // pressureKPa used for context (affects calculation accuracy at extreme altitudes)
  void pressureKPa;
}

export default function AbsoluteHumidityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.absolute-humidity-calculator");

  const [temperature, setTemperature] = React.useState("");
  const [relHumidity, setRelHumidity] = React.useState("");
  const [pressure, setPressure] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const tempNum = parseFloat(temperature);
  const rhNum = parseFloat(relHumidity);
  const pressNum = parseFloat(pressure) || 101.325;

  const tempValid = temperature !== "" && Number.isFinite(tempNum) && tempNum >= -50 && tempNum <= 100;
  const rhValid = relHumidity !== "" && Number.isFinite(rhNum) && rhNum >= 0 && rhNum <= 100;

  const result = React.useMemo<HumidityResult | null>(() => {
    if (!tempValid || !rhValid) return null;
    return calcAbsoluteHumidity(tempNum, rhNum, pressNum);
  }, [tempValid, rhValid, tempNum, rhNum, pressNum]);

  function loadExample(temp: string, rh: string, pres: string) {
    setTemperature(temp);
    setRelHumidity(rh);
    setPressure(pres);
    setTouched(true);
  }

  function reset() {
    setTemperature(""); setRelHumidity(""); setPressure("");
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

  const showError = touched && (!tempValid || !rhValid);

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
              <Label htmlFor="ahc-temp">{t("field.temperature")}</Label>
              <Input id="ahc-temp" type="number" inputMode="decimal" min="-50" max="100" step="0.1"
                value={temperature} placeholder={t("placeholder.temperature")}
                onChange={(e) => { setTemperature(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ahc-rh">{t("field.relativeHumidity")}</Label>
              <Input id="ahc-rh" type="number" inputMode="decimal" min="0" max="100" step="0.1"
                value={relHumidity} placeholder={t("placeholder.relativeHumidity")}
                onChange={(e) => { setRelHumidity(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ahc-pressure">{t("field.pressure")}</Label>
              <Input id="ahc-pressure" type="number" inputMode="decimal" min="60" max="120" step="0.001"
                value={pressure} placeholder={t("placeholder.pressure")}
                onChange={(e) => { setPressure(e.target.value); setTouched(true); }} />
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

          <div className="flex flex-wrap gap-2 text-xs">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("22", "50", "101.325")}>
              {t("button.loadIndoor")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("30", "80", "101.325")}>
              {t("button.loadHumidSummer")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("18", "25", "101.325")}>
              {t("button.loadDryWinter")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 text-sm">
                <div className="sm:col-span-2">
                  <span className="text-zinc-500">{t("result.absoluteHumidity")}: </span>
                  <span className="font-bold text-zinc-900 text-2xl">{result.absoluteHumidity} g/m³</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.vaporPressure")}: </span>
                  <span className="font-semibold text-zinc-800">{result.waterVaporPressure} kPa</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.saturationPressure")}: </span>
                  <span className="font-semibold text-zinc-800">{result.saturationVaporPressure} kPa</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.dewPoint")}: </span>
                  <span className="font-semibold text-zinc-800">{result.dewPoint} °C</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("result.formulaNote")}</p>
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
