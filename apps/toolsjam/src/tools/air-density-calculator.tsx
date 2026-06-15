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

const R_D = 287.058; // J/(kg·K) specific gas constant dry air
const R_V = 461.495; // J/(kg·K) specific gas constant water vapour

function satVapourPressure(tempC: number): number {
  // Buck equation (kPa)
  return 0.61078 * Math.exp((17.27 * tempC) / (tempC + 237.3));
}

function fmtNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

interface AirDensityResult {
  density: number;
  dryDensity: number;
  satVapour: number;
  partialVapour: number;
  specificVolume: number;
}

export default function AirDensityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.air-density-calculator");

  const [temperature, setTemperature] = React.useState("");
  const [pressure, setPressure] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [altitude, setAltitude] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<AirDensityResult | null>(() => {
    if (!touched) return null;
    const T_C = parseFloat(temperature);
    const P_hPa = parseFloat(pressure);
    const RH = parseFloat(humidity);
    const alt = altitude === "" ? 0 : parseFloat(altitude);
    if (!Number.isFinite(T_C) || T_C <= -273.15) return null;
    if (!Number.isFinite(P_hPa) || P_hPa <= 0) return null;
    if (!Number.isFinite(RH) || RH < 0 || RH > 100) return null;
    if (!Number.isFinite(alt) || alt < 0) return null;

    const T_K = T_C + 273.15;
    const P_Pa = P_hPa * 100; // hPa → Pa

    // Saturation vapour pressure (Pa)
    const e_s = satVapourPressure(T_C) * 1000; // kPa → Pa
    // Actual partial vapour pressure
    const P_v = (RH / 100) * e_s;
    // Partial pressure of dry air
    const P_d = P_Pa - P_v;

    // Moist air density
    const density = P_d / (R_D * T_K) + P_v / (R_V * T_K);
    // Dry air density (no moisture)
    const dryDensity = P_Pa / (R_D * T_K);
    const specificVolume = 1 / density;

    return {
      density,
      dryDensity,
      satVapour: e_s,
      partialVapour: P_v,
      specificVolume,
    };
  }, [touched, temperature, pressure, humidity, altitude]);

  function loadExample(t_: string, p: string, rh: string, alt: string) {
    setTemperature(t_); setPressure(p); setHumidity(rh); setAltitude(alt); setTouched(true);
  }

  function reset() {
    setTemperature(""); setPressure(""); setHumidity(""); setAltitude(""); setTouched(false);
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

  const showError = touched && result === null;

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
              <Label htmlFor="ad-t">{t("field.temperature")}</Label>
              <Input
                id="ad-t"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder={t("field.placeholder.temperature")}
                value={temperature}
                onChange={(e) => { setTemperature(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad-p">{t("field.pressure")}</Label>
              <Input
                id="ad-p"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder={t("field.placeholder.pressure")}
                value={pressure}
                onChange={(e) => { setPressure(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad-rh">{t("field.humidity")}</Label>
              <Input
                id="ad-rh"
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step="any"
                placeholder={t("field.placeholder.humidity")}
                value={humidity}
                onChange={(e) => { setHumidity(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad-alt">{t("field.altitude")}</Label>
              <Input
                id="ad-alt"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder={t("field.placeholder.altitude")}
                value={altitude}
                onChange={(e) => { setAltitude(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.airDensity")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.density)} kg/m³</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.dryAirDensity")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.dryDensity)} kg/m³</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.vaporPressure")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.satVapour, 1)} Pa</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.partialVapor")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.partialVapour, 1)} Pa</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.specificVolume")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.specificVolume)} m³/kg</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("15", "1013.25", "60", "0")}>
              {t("examples.loadStandard")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("35", "1005", "80", "0")}>
              {t("examples.loadHot")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("5", "700", "40", "3000")}>
              {t("examples.loadHighAltitude")}
            </Button>
          </div>
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
