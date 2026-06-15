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

// Magnus formula constants (August-Roche-Magnus approximation)
const B = 17.625;
const C = 243.04; // °C

function calcDewPoint(T: number, RH: number) {
  const gamma = Math.log(RH / 100) + (B * T) / (C + T);
  const Td = (C * gamma) / (B - gamma);
  // Saturation vapor pressure at T (hPa)
  const es = 6.1078 * Math.exp((B * T) / (C + T));
  // Actual vapor pressure (hPa)
  const e = (RH / 100) * es;
  // Absolute humidity (g/m³)
  const T_K = T + 273.15;
  const AH = (1000 * e * 100 * 0.018015) / (8.314 * T_K);
  return { Td, TdF: Td * 1.8 + 32, es, e, AH };
}

function fmtNum(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

export default function DewPointCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dew-point-calculator");

  const [temperature, setTemperature] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const tempNum = parseFloat(temperature);
  const humNum = parseFloat(humidity);

  const tempValid =
    temperature !== "" &&
    Number.isFinite(tempNum) &&
    tempNum >= -60 &&
    tempNum <= 60;
  const humValid =
    humidity !== "" &&
    Number.isFinite(humNum) &&
    humNum >= 1 &&
    humNum <= 100;
  const allValid = tempValid && humValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return calcDewPoint(tempNum, humNum);
  }, [allValid, tempNum, humNum]);

  function reset() {
    setTemperature("");
    setHumidity("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
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
              <Label htmlFor="dp-temp">{t("field.temperature")}</Label>
              <Input
                id="dp-temp"
                type="number"
                inputMode="decimal"
                value={temperature}
                placeholder="20"
                onChange={(e) => { setTemperature(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dp-rh">{t("field.humidity")}</Label>
              <Input
                id="dp-rh"
                type="number"
                inputMode="decimal"
                min="1"
                max="100"
                value={humidity}
                placeholder="50"
                onChange={(e) => { setHumidity(e.target.value); setTouched(true); }}
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

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && allValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dewPoint")}</div>
                  <div className="text-2xl font-semibold">
                    {fmtNum(result.Td)}{t("result.unit.celsius")}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {fmtNum(result.TdF)}{t("result.unit.fahrenheit")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.absoluteHumidity")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.AH, 2)} {t("result.unit.gm3")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.actualVaporPressure")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.e, 2)} {t("result.unit.hpa")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.saturationVaporPressure")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.es, 2)} {t("result.unit.hpa")}
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
