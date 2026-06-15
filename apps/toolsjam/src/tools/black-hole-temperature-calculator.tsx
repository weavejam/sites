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

// Physical constants
const G = 6.674e-11;
const C = 2.998e8;
const HBAR = 1.0546e-34;
const K_B = 1.381e-23;
const M_SUN = 1.989e30;
const YR = 3.156e7;

type MassUnit = "solar" | "kg" | "g";

function toKg(mass: number, unit: MassUnit): number {
  if (unit === "solar") return mass * M_SUN;
  if (unit === "g") return mass * 1e-3;
  return mass;
}

function fmtSci(n: number, sig = 3): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  return n.toPrecision(sig).replace(/\.?0+e/, "e");
}

function fmtEvap(years: number): string {
  if (!Number.isFinite(years) || years <= 0) return "—";
  if (years < 1) return `${fmtSci(years * 365.25 * 24 * 3600)} s`;
  if (years < 1e6) return `${fmtSci(years, 3)} yr`;
  if (years < 1e9) return `${fmtSci(years / 1e6, 3)} Myr`;
  if (years < 1e15) return `${fmtSci(years / 1e9, 3)} Gyr`;
  return `${fmtSci(years, 3)} yr`;
}

interface BHTResult {
  massKg: number;
  temperature: number;   // K
  schwarzschildRadius: number; // km
  power: number;         // W
  evaporationTime: number; // years
}

function computeBHT(massKg: number): BHTResult {
  const temperature = (HBAR * Math.pow(C, 3)) / (8 * Math.PI * G * massKg * K_B);
  const schwarzschildRadius = (2 * G * massKg) / (C * C) / 1000; // km
  const power = (HBAR * Math.pow(C, 6)) / (15360 * Math.PI * G * G * massKg * massKg);
  const evapSec = (5120 * Math.PI * G * G * Math.pow(massKg, 3)) / (HBAR * Math.pow(C, 4));
  const evaporationTime = evapSec / YR;
  return { massKg, temperature, schwarzschildRadius, power, evaporationTime };
}

export default function BlackHoleTemperatureCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.black-hole-temperature-calculator");

  const [mass, setMass] = React.useState("");
  const [massUnit, setMassUnit] = React.useState<MassUnit>("solar");
  const [touched, setTouched] = React.useState(false);

  const massNum = parseFloat(mass);
  const massValid = mass !== "" && Number.isFinite(massNum) && massNum > 0;
  const showError = touched && !massValid;

  const result = React.useMemo<BHTResult | null>(() => {
    if (!massValid) return null;
    return computeBHT(toKg(massNum, massUnit));
  }, [massValid, massNum, massUnit]);

  function loadExample(m: string, u: MassUnit) {
    setMass(m); setMassUnit(u); setTouched(true);
  }

  function reset() {
    setMass(""); setMassUnit("solar"); setTouched(false);
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
      } catch { break; }
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

  const massUnitKeys: MassUnit[] = ["solar", "kg", "g"];

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
              <Label htmlFor="bht-mass">{t("field.mass")}</Label>
              <Input
                id="bht-mass"
                type="number"
                inputMode="decimal"
                min="0"
                value={mass}
                placeholder={t("placeholder.mass")}
                onChange={(e) => { setMass(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bht-unit">{t("field.massUnit")}</Label>
              <select
                id="bht-unit"
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value as MassUnit)}
                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              >
                {massUnitKeys.map((u) => (
                  <option key={u} value={u}>{t(`massUnit.${u}` as never)}</option>
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
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.massKg")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.massKg.toExponential(3)} kg
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.temperature")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtSci(result.temperature)} {t("result.unitK")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.schwarzschildRadius")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtSci(result.schwarzschildRadius)} {t("result.unitKm")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.power")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtSci(result.power)} {t("result.unitW")}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-xs text-zinc-500">{t("result.evaporationTime")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtEvap(result.evaporationTime)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500 pt-1">{t("result.formula")}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("10", "solar")}>
            {t("examples.loadStellar")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1e15", "kg")}>
            {t("examples.loadPrimordial")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1e10", "kg")}>
            {t("examples.loadMicro")}
          </Button>
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
