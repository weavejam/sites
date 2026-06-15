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

// ISA constants
const P0 = 101325; // Pa
const T0 = 288.15; // K
const L = 0.0065; // K/m lapse rate
const R = 287.05; // J/(kg·K)
const g = 9.80665; // m/s²
const RHO0 = 1.225; // kg/m³

function calcDensityAltitude(
  pa_ft: number,
  oat_c: number,
  rh_pct: number
): { da_ft: number; rho: number; isaTempC: number } {
  const pa_m = pa_ft * 0.3048;
  // Pressure at pressure altitude
  const P = P0 * Math.pow(1 - (L * pa_m) / T0, g / (R * L));
  const T_K = oat_c + 273.15;
  // Saturation vapor pressure (Tetens formula)
  const es = 610.78 * Math.exp((17.269 * oat_c) / (237.3 + oat_c));
  const e = (rh_pct / 100) * es;
  // Air density with humidity (virtual temperature method)
  const rho = (P - 0.3783 * e) / (R * T_K);
  // Density altitude from ISA relationship
  // In ISA: rho/rho0 = (1 - L*h/T0)^(g/(RL) - 1)
  // => h = T0/L * (1 - (rho/rho0)^(RL/(g - RL)))
  const exponent = (R * L) / (g - R * L);
  const da_m = (T0 / L) * (1 - Math.pow(rho / RHO0, exponent));
  const da_ft = da_m / 0.3048;
  const isaTempC = T0 - L * pa_m - 273.15;
  return { da_ft, rho, isaTempC };
}

function fmtNum(n: number, decimals = 0): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

export default function DensityAltitudeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.density-altitude-calculator");

  const [pressureAltitude, setPressureAltitude] = React.useState("");
  const [oat, setOat] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const paNum = parseFloat(pressureAltitude);
  const oatNum = parseFloat(oat);
  const humNum = parseFloat(humidity);

  const paValid =
    pressureAltitude !== "" &&
    Number.isFinite(paNum) &&
    paNum >= -2000 &&
    paNum <= 60000;
  const oatValid = oat !== "" && Number.isFinite(oatNum);
  const humValid =
    humidity !== "" &&
    Number.isFinite(humNum) &&
    humNum >= 0 &&
    humNum <= 100;
  const allValid = paValid && oatValid && humValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return calcDensityAltitude(paNum, oatNum, humNum);
  }, [allValid, paNum, oatNum, humNum]);

  function reset() {
    setPressureAltitude("");
    setOat("");
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="da-pa">{t("field.pressureAltitude")}</Label>
              <Input
                id="da-pa"
                type="number"
                inputMode="decimal"
                value={pressureAltitude}
                placeholder="0"
                onChange={(e) => { setPressureAltitude(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="da-oat">{t("field.oat")}</Label>
              <Input
                id="da-oat"
                type="number"
                inputMode="decimal"
                value={oat}
                placeholder="15"
                onChange={(e) => { setOat(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="da-rh">{t("field.humidity")}</Label>
              <Input
                id="da-rh"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                value={humidity}
                placeholder="0"
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && allValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.densityAltitude")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.da_ft)} {t("result.unit.ft")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.airDensity")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.rho, 4)} {t("result.unit.kgm3")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.isaTempAtPA")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.isaTempC, 1)}{t("result.unit.celsius")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.isaDeviation")}</div>
                  <div className="text-xl font-semibold">
                    {oatNum - result.isaTempC >= 0 ? "+" : ""}
                    {fmtNum(oatNum - result.isaTempC, 1)}{t("result.unit.celsius")}
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
