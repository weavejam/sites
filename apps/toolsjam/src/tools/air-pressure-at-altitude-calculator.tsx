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

type AltUnit = "m" | "ft";
type TempUnit = "degC" | "degF" | "K";
type PressUnit = "hPa" | "Pa" | "atm" | "psi";

const G = 9.80665;
const M = 0.0289644;
const R = 8.31446;
const L = -0.0065; // lapse rate K/m
const R_DRY = 287.058;

function toMeters(v: number, unit: AltUnit): number {
  return unit === "ft" ? v * 0.3048 : v;
}
function toKelvin(v: number, unit: TempUnit): number {
  if (unit === "degC") return v + 273.15;
  if (unit === "degF") return (v - 32) * (5 / 9) + 273.15;
  return v;
}
function toPascals(v: number, unit: PressUnit): number {
  if (unit === "hPa") return v * 100;
  if (unit === "atm") return v * 101325;
  if (unit === "psi") return v * 6894.757;
  return v;
}
function fromPascals(pa: number, unit: PressUnit): number {
  if (unit === "hPa") return pa / 100;
  if (unit === "atm") return pa / 101325;
  if (unit === "psi") return pa / 6894.757;
  return pa;
}
function fromKelvin(k: number, unit: TempUnit): number {
  if (unit === "degC") return k - 273.15;
  if (unit === "degF") return (k - 273.15) * (9 / 5) + 32;
  return k;
}
function fromMeters(m: number, unit: AltUnit): number {
  return unit === "ft" ? m / 0.3048 : m;
}

interface CalcResult {
  pressureAtAlt: number;
  temperatureAtAlt: number;
  airDensity: number;
  densityAlt: number; // in metres
}

function computeAirPressure(
  altitudeRaw: number,
  altUnit: AltUnit,
  tempRaw: number,
  tempUnit: TempUnit,
  pressRaw: number,
  pressUnit: PressUnit,
  humidity: number
): CalcResult | null {
  const h = toMeters(altitudeRaw, altUnit);
  const T0 = toKelvin(tempRaw, tempUnit);
  const P0 = toPascals(pressRaw, pressUnit);
  if (!Number.isFinite(h) || !Number.isFinite(T0) || !Number.isFinite(P0)) return null;
  if (h < -500 || h > 85000) return null;
  if (T0 <= 0 || P0 <= 0) return null;

  // Temperature at altitude (tropospheric lapse rate)
  const T_alt = Math.max(T0 + L * h, 1); // guard against non-positive

  // Barometric formula (troposphere)
  const exponent = (G * M) / (R * Math.abs(L));
  const P_alt = P0 * Math.pow(T_alt / T0, exponent);

  // Saturation vapour pressure (Tetens): e_s in Pa
  const T_C_alt = T_alt - 273.15;
  const e_s = 611.2 * Math.exp((17.67 * T_C_alt) / (T_C_alt + 243.5));
  const e = (humidity / 100) * e_s;

  // Air density with humidity correction
  const rho = (P_alt - 0.378 * e) / (R_DRY * T_alt);

  // Density altitude (ISA density at sea level = 1.225 kg/m³)
  const rho0 = 1.225;
  const densityAlt = 44307.69 * (1 - Math.pow(Math.max(rho / rho0, 0.0001), 0.235));

  return {
    pressureAtAlt: P_alt,
    temperatureAtAlt: T_alt,
    airDensity: rho,
    densityAlt,
  };
}

function fmt(n: number, decimals = 3): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export default function AirPressureAtAltitudeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.air-pressure-at-altitude-calculator");

  const [altitude, setAltitude] = React.useState("");
  const [altUnit, setAltUnit] = React.useState<AltUnit>("m");
  const [temperature, setTemperature] = React.useState("15");
  const [tempUnit, setTempUnit] = React.useState<TempUnit>("degC");
  const [pressure, setPressure] = React.useState("1013.25");
  const [pressUnit, setPressUnit] = React.useState<PressUnit>("hPa");
  const [humidity, setHumidity] = React.useState("50");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched) return null;
    const alt = parseFloat(altitude);
    const temp = parseFloat(temperature);
    const pres = parseFloat(pressure);
    const hum = parseFloat(humidity) || 0;
    if (!Number.isFinite(alt) || !Number.isFinite(temp) || !Number.isFinite(pres)) return null;
    return computeAirPressure(alt, altUnit, temp, tempUnit, pres, pressUnit, hum);
  }, [touched, altitude, altUnit, temperature, tempUnit, pressure, pressUnit, humidity]);

  function loadExample(a: string, au: AltUnit, t: string, tu: TempUnit, p: string, pu: PressUnit, h: string) {
    setAltitude(a);
    setAltUnit(au);
    setTemperature(t);
    setTempUnit(tu);
    setPressure(p);
    setPressUnit(pu);
    setHumidity(h);
    setTouched(true);
  }

  function reset() {
    setAltitude("");
    setTemperature("15");
    setPressure("1013.25");
    setHumidity("50");
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

  const showError = touched && (!altitude || !Number.isFinite(parseFloat(altitude)));

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
              <Label htmlFor="apaa-alt">{t("field.altitude")}</Label>
              <div className="flex gap-2">
                <Input
                  id="apaa-alt"
                  type="number"
                  inputMode="decimal"
                  value={altitude}
                  placeholder={t("placeholder.altitude")}
                  onChange={(e) => { setAltitude(e.target.value); setTouched(false); }}
                  className="flex-1"
                />
                <select
                  value={altUnit}
                  onChange={(e) => setAltUnit(e.target.value as AltUnit)}
                  className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm"
                >
                  <option value="m">{t("unit.m")}</option>
                  <option value="ft">{t("unit.ft")}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apaa-temp">{t("field.temperature")}</Label>
              <div className="flex gap-2">
                <Input
                  id="apaa-temp"
                  type="number"
                  inputMode="decimal"
                  value={temperature}
                  placeholder={t("placeholder.temperature")}
                  onChange={(e) => { setTemperature(e.target.value); setTouched(false); }}
                  className="flex-1"
                />
                <select
                  value={tempUnit}
                  onChange={(e) => setTempUnit(e.target.value as TempUnit)}
                  className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm"
                >
                  <option value="degC">{t("unit.degC")}</option>
                  <option value="degF">{t("unit.degF")}</option>
                  <option value="K">{t("unit.K")}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apaa-press">{t("field.pressure")}</Label>
              <div className="flex gap-2">
                <Input
                  id="apaa-press"
                  type="number"
                  inputMode="decimal"
                  value={pressure}
                  placeholder={t("placeholder.pressure")}
                  onChange={(e) => { setPressure(e.target.value); setTouched(false); }}
                  className="flex-1"
                />
                <select
                  value={pressUnit}
                  onChange={(e) => setPressUnit(e.target.value as PressUnit)}
                  className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm"
                >
                  <option value="hPa">{t("unit.hPa")}</option>
                  <option value="Pa">{t("unit.Pa")}</option>
                  <option value="atm">{t("unit.atm")}</option>
                  <option value="psi">{t("unit.psi")}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apaa-hum">{t("field.humidity")}</Label>
              <Input
                id="apaa-hum"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                value={humidity}
                placeholder={t("placeholder.humidity")}
                onChange={(e) => { setHumidity(e.target.value); setTouched(false); }}
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

          {touched && !showError && result === null && (
            <p className="text-sm text-red-600">{t("error.altitudeRange")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-700">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.pressureLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(fromPascals(result.pressureAtAlt, pressUnit))} {pressUnit === "hPa" ? "hPa" : pressUnit === "Pa" ? "Pa" : pressUnit === "atm" ? "atm" : "psi"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.temperatureLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(fromKelvin(result.temperatureAtAlt, tempUnit))} {tempUnit === "degC" ? "°C" : tempUnit === "degF" ? "°F" : "K"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.densityLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.airDensity, 4)} kg/m³
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.densityAltLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(fromMeters(result.densityAlt, altUnit))} {altUnit}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm"
          onClick={() => loadExample("35000", "ft", "15", "degC", "1013.25", "hPa", "20")}>
          {t("examples.loadAircraft")}
        </Button>
        <Button type="button" variant="outline" size="sm"
          onClick={() => loadExample("8848", "m", "15", "degC", "1013.25", "hPa", "30")}>
          {t("examples.loadEverest")}
        </Button>
        <Button type="button" variant="outline" size="sm"
          onClick={() => loadExample("1000", "m", "15", "degC", "1013.25", "hPa", "60")}>
          {t("examples.loadStation")}
        </Button>
      </div>

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
