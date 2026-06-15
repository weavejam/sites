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

// Compton wavelength of electron: h/(m_e * c) in meters
const LAMBDA_C = 2.42631023867e-12; // 2.42631 pm
// Electron rest energy in keV
const E_ELECTRON_KEV = 510.99895; // 511 keV

type EnergyUnit = "keV" | "MeV";
const ENERGY_UNITS: EnergyUnit[] = ["keV", "MeV"];

function toKeV(value: number, unit: EnergyUnit): number {
  return unit === "MeV" ? value * 1000 : value;
}

function fromKeV(keV: number, unit: EnergyUnit): number {
  return unit === "MeV" ? keV / 1000 : keV;
}

function formatSci(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toPrecision(5);
}

export default function ComptonScatteringCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.compton-scattering-calculator");

  const [energy, setEnergy] = React.useState("");
  const [angle, setAngle] = React.useState("");
  const [unit, setUnit] = React.useState<EnergyUnit>("keV");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setEnergy(""); setAngle(""); setUnit("keV");
    setTouched(false);
  }

  function loadExample(e: string, a: string, u: EnergyUnit) {
    setEnergy(e); setAngle(a); setUnit(u);
    setTouched(true);
  }

  const energyNum = parseFloat(energy);
  const angleNum = parseFloat(angle);
  const valid =
    energy !== "" && angle !== "" &&
    Number.isFinite(energyNum) && energyNum > 0 &&
    Number.isFinite(angleNum) && angleNum >= 0 && angleNum <= 180;

  const result = React.useMemo<{
    deltaLambda_pm: number;
    scatteredEnergy: number;
    energyTransfer: number;
    unit: EnergyUnit;
  } | null>(() => {
    if (!valid) return null;
    const E0_keV = toKeV(energyNum, unit);
    const thetaRad = (angleNum * Math.PI) / 180;
    const cosTheta = Math.cos(thetaRad);
    // Δλ = λ_c(1 - cosθ) in meters
    const deltaLambda = LAMBDA_C * (1 - cosTheta);
    const deltaLambda_pm = deltaLambda * 1e12;
    // Scattered photon energy: E' = E0 / (1 + (E0/E_e)(1 - cosθ))
    const scatteredEnergy_keV = E0_keV / (1 + (E0_keV / E_ELECTRON_KEV) * (1 - cosTheta));
    const energyTransfer_keV = E0_keV - scatteredEnergy_keV;
    return {
      deltaLambda_pm,
      scatteredEnergy: fromKeV(scatteredEnergy_keV, unit),
      energyTransfer: fromKeV(energyTransfer_keV, unit),
      unit,
    };
  }, [valid, energyNum, angleNum, unit]);

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

  const showError = touched && !valid;

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
              <Label htmlFor="cs-energy">{t("field.energy")}</Label>
              <Input
                id="cs-energy"
                type="number"
                inputMode="decimal"
                value={energy}
                placeholder={t("placeholder.energy")}
                onChange={(e) => { setEnergy(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cs-angle">{t("field.angle")}</Label>
              <Input
                id="cs-angle"
                type="number"
                inputMode="decimal"
                value={angle}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setAngle(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.unit")}</Label>
            <div className="flex flex-wrap gap-2">
              {ENERGY_UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={unit === u ? "default" : "outline"}
                  onClick={() => { setUnit(u); setTouched(false); }}
                >
                  {t(`type.${u}` as never)}
                </Button>
              ))}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.deltaLambda", { value: formatSci(result.deltaLambda_pm) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.scatteredEnergy", { value: formatSci(result.scatteredEnergy), unit: result.unit })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.energyTransfer", { value: formatSci(result.energyTransfer), unit: result.unit })}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("100", "90", "keV")}
          >
            {t("examples.loadXray")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("662", "180", "keV")}
          >
            {t("examples.loadBackscatter")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1.17", "90", "MeV")}
          >
            {t("examples.loadGamma")}
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
