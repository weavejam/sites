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

const MONTH_FACTORS = [0.35, 0.30, 0.10, 0.02, 0.00, 0.00,
  0.00, 0.00, 0.01, 0.08, 0.35, 1.00];

function calcWhiteChristmas(
  tempC: number,
  humidity: number,
  altitudeM: number,
  latitude: number,
  monthIdx: number
): { probability: number; snowDepth: number; classKey: string } {
  // Temperature factor (primary driver)
  let tempFactor: number;
  if (tempC <= -15) tempFactor = 0.95;
  else if (tempC <= 0) tempFactor = 0.50 + (0 - tempC) * 0.03;
  else if (tempC <= 4) tempFactor = 0.50 * (1 - tempC / 4);
  else tempFactor = 0;

  // Humidity multiplier
  const humidityMult = humidity >= 80 ? 1.25 : humidity >= 60 ? 1.10 : humidity >= 40 ? 0.95 : 0.75;

  // Altitude bonus (per 500 m up to 0.25)
  const altBonus = Math.min(0.25, (altitudeM / 500) * 0.04);

  // Latitude bonus: abs(lat) > 40 boosts, < 30 penalises
  const absLat = Math.abs(latitude);
  const latBonus = absLat >= 60 ? 0.20 : absLat >= 45 ? 0.10 : absLat >= 30 ? 0.0 : -0.10;

  const monthFactor = MONTH_FACTORS[monthIdx] ?? 0.50;

  let prob = (tempFactor * humidityMult + altBonus + latBonus) * monthFactor;
  prob = Math.min(0.98, Math.max(0, prob));

  // Expected snow depth (cm)
  const snowDepth = prob * (humidity / 100) * (1 + altitudeM / 2000) * 18;

  let classKey: string;
  if (prob >= 0.75) classKey = "veryHigh";
  else if (prob >= 0.50) classKey = "high";
  else if (prob >= 0.25) classKey = "moderate";
  else if (prob >= 0.10) classKey = "low";
  else classKey = "veryLow";

  return { probability: Math.round(prob * 1000) / 10, snowDepth: Math.round(snowDepth * 10) / 10, classKey };
}

export default function WhiteChristmasCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.white-christmas-calculator");

  const [temperature, setTemperature] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [altitude, setAltitude] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [monthIdx, setMonthIdx] = React.useState(11); // December
  const [touched, setTouched] = React.useState(false);

  const tempNum = parseFloat(temperature);
  const humNum = parseFloat(humidity);
  const altNum = parseFloat(altitude) || 0;
  const latNum = parseFloat(latitude) || 45;

  const tempValid = temperature !== "" && Number.isFinite(tempNum) && tempNum >= -50 && tempNum <= 50;
  const humValid = humidity !== "" && Number.isFinite(humNum) && humNum >= 0 && humNum <= 100;

  const result = React.useMemo(() => {
    if (!tempValid || !humValid) return null;
    return calcWhiteChristmas(tempNum, humNum, altNum, latNum, monthIdx);
  }, [tempValid, humValid, tempNum, humNum, altNum, latNum, monthIdx]);

  function reset() {
    setTemperature("");
    setHumidity("");
    setAltitude("");
    setLatitude("");
    setMonthIdx(11);
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const months = React.useMemo(() => {
    const raw = t.raw("field.months") as string[];
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

  const showError = touched && (!tempValid || !humValid);

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
              <Input
                id="wcc-temp"
                type="number"
                inputMode="decimal"
                min="-50"
                max="50"
                step="0.1"
                value={temperature}
                placeholder={t("placeholder.temperature")}
                onChange={(e) => { setTemperature(e.target.value); setTouched(true); }}
              />
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
              <Label htmlFor="wcc-altitude">{t("field.altitude")}</Label>
              <Input
                id="wcc-altitude"
                type="number"
                inputMode="decimal"
                min="0"
                max="9000"
                step="1"
                value={altitude}
                placeholder={t("placeholder.altitude")}
                onChange={(e) => { setAltitude(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wcc-latitude">{t("field.latitude")}</Label>
              <Input
                id="wcc-latitude"
                type="number"
                inputMode="decimal"
                min="-90"
                max="90"
                step="0.1"
                value={latitude}
                placeholder={t("placeholder.latitude")}
                onChange={(e) => { setLatitude(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wcc-month">{t("field.month")}</Label>
              <select
                id="wcc-month"
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring"
                value={monthIdx}
                onChange={(e) => { setMonthIdx(parseInt(e.target.value, 10)); setTouched(true); }}
              >
                {months.map((m, i) => (
                  <option key={m} value={i}>{m}</option>
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-3xl font-bold text-zinc-900">{result.probability}%</div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.classification")}: </span>
                  <span className="font-semibold text-zinc-800">{t(`result.classificationLabel.${result.classKey}` as never)}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.snowDepth")}: </span>
                  <span className="font-semibold text-zinc-800">{result.snowDepth} cm</span>
                </div>
              </div>
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
