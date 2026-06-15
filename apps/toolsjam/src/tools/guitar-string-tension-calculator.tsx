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

// String tension formula (D'Addario method):
// T [lbs] = (UW × (2 × L_in × f)²) / 386.4
// UW = unit weight (lbs/in) = π/4 × diameter_in² × density_lbs_per_in³
// T [N] = T [lbs] × 4.44822
// Safety factor = T / recommended_max (70 lbs for steel, 50 lbs for nylon)

type StringMaterial = "steel" | "bronze" | "nylon";
type ScaleUnit = "inches" | "mm";

const MATERIAL_DENSITY: Record<StringMaterial, number> = {
  steel: 0.2836,   // lbs/in³
  bronze: 0.295,   // lbs/in³
  nylon: 0.047,    // lbs/in³
};

const MATERIAL_MAX_TENSION: Record<StringMaterial, number> = {
  steel: 75,
  bronze: 65,
  nylon: 40,
};

// Standard guitar note → frequency (Hz) for fill helper
const NOTE_FREQ: Record<string, number> = {
  E2: 82.41, A2: 110.0, D3: 146.83, G3: 196.0, B3: 246.94, E4: 329.63,
  E3: 164.81, A3: 220.0, D4: 293.66, G4: 392.0, B4: 493.88, E5: 659.26,
  "C2": 65.41, "F2": 87.31, "C3": 130.81, "F3": 174.61, "C4": 261.63,
};

function calcTension(
  scaleLengthIn: number,
  gaugeIn: number,
  material: StringMaterial,
  freqHz: number,
): { tensionLbs: number; tensionN: number; unitWeight: number; safetyFactor: number } | null {
  if (scaleLengthIn <= 0 || gaugeIn <= 0 || freqHz <= 0) return null;
  const density = MATERIAL_DENSITY[material];
  const unitWeight = (Math.PI / 4) * gaugeIn * gaugeIn * density;
  const tensionLbs = (unitWeight * Math.pow(2 * scaleLengthIn * freqHz, 2)) / 386.4;
  const tensionN = tensionLbs * 4.44822;
  const safetyFactor = MATERIAL_MAX_TENSION[material] / tensionLbs;
  return { tensionLbs, tensionN, unitWeight, safetyFactor };
}

function toInches(value: number, unit: ScaleUnit): number {
  if (unit === "inches") return value;
  return value / 25.4;
}

function noteToFreq(note: string): number | null {
  const upper = note.trim().toUpperCase();
  const freq = NOTE_FREQ[upper] ?? NOTE_FREQ[note.trim()];
  return freq !== undefined ? freq : null;
}

const MATERIALS: StringMaterial[] = ["steel", "bronze", "nylon"];
const SCALE_UNITS: ScaleUnit[] = ["inches", "mm"];

export default function GuitarStringTensionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.guitar-string-tension-calculator");

  const [scaleLength, setScaleLength] = React.useState("");
  const [scaleUnit, setScaleUnit] = React.useState<ScaleUnit>("inches");
  const [gauge, setGauge] = React.useState("");
  const [material, setMaterial] = React.useState<StringMaterial>("steel");
  const [frequency, setFrequency] = React.useState("");
  const [noteName, setNoteName] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function resolvedFreq(): number | null {
    // If note name is provided, try to look it up
    if (noteName.trim() !== "") {
      const f = noteToFreq(noteName);
      if (f !== null) return f;
    }
    // Fall back to manual frequency
    const f = parseFloat(frequency);
    return Number.isFinite(f) && f > 0 ? f : null;
  }

  const scaleLengthNum = parseFloat(scaleLength);
  const gaugeNum = parseFloat(gauge);
  const freqNum = resolvedFreq();

  const slValid = scaleLength !== "" && Number.isFinite(scaleLengthNum) && scaleLengthNum > 0;
  const gaugeValid = gauge !== "" && Number.isFinite(gaugeNum) && gaugeNum > 0;
  const freqValid = freqNum !== null;

  const result = React.useMemo(() => {
    if (!slValid || !gaugeValid || !freqValid || freqNum === null) return null;
    const scaleLengthIn = toInches(scaleLengthNum, scaleUnit);
    return calcTension(scaleLengthIn, gaugeNum, material, freqNum);
  }, [slValid, gaugeValid, freqValid, scaleLengthNum, scaleUnit, gaugeNum, material, freqNum]);

  function reset() {
    setScaleLength("");
    setScaleUnit("inches");
    setGauge("");
    setMaterial("steel");
    setFrequency("");
    setNoteName("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
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
              <Label htmlFor="gst-scale">{t("field.scaleLength")}</Label>
              <Input
                id="gst-scale"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.25"
                placeholder="25.5"
                value={scaleLength}
                onChange={(e) => { setScaleLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst-unit">{t("field.scaleUnit")}</Label>
              <select
                id="gst-unit"
                value={scaleUnit}
                onChange={(e) => { setScaleUnit(e.target.value as ScaleUnit); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                {SCALE_UNITS.map((u) => (
                  <option key={u} value={u}>{t(`unit.${u}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst-gauge">{t("field.gauge")}</Label>
              <Input
                id="gst-gauge"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.001"
                placeholder="0.010"
                value={gauge}
                onChange={(e) => { setGauge(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("field.gaugeHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst-material">{t("field.material")}</Label>
              <select
                id="gst-material"
                value={material}
                onChange={(e) => { setMaterial(e.target.value as StringMaterial); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                {MATERIALS.map((m) => (
                  <option key={m} value={m}>{t(`material.${m}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst-freq">{t("field.frequency")}</Label>
              <Input
                id="gst-freq"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="329.63"
                value={frequency}
                onChange={(e) => { setFrequency(e.target.value); setNoteName(""); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst-note">{t("field.noteName")}</Label>
              <Input
                id="gst-note"
                type="text"
                placeholder="E4"
                value={noteName}
                onChange={(e) => { setNoteName(e.target.value); setFrequency(""); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("field.noteNameHint")}</p>
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

          {touched && (!slValid || !gaugeValid || !freqValid) && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && slValid && gaugeValid && freqValid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm max-w-sm">
                <span className="text-zinc-600">{t("result.tensionLbs")}:</span>
                <span className="font-bold text-zinc-900 text-lg">
                  {result.tensionLbs.toFixed(2)} lbs
                </span>
                <span className="text-zinc-600">{t("result.tensionN")}:</span>
                <span className="font-semibold text-zinc-800">
                  {result.tensionN.toFixed(2)} N
                </span>
                <span className="text-zinc-600">{t("result.unitWeight")}:</span>
                <span className="text-zinc-700">
                  {result.unitWeight.toExponential(4)} lbs/in
                </span>
                <span className="text-zinc-600">{t("result.safetyFactor")}:</span>
                <span className={`font-medium ${result.safetyFactor < 1 ? "text-red-600" : result.safetyFactor < 1.5 ? "text-amber-600" : "text-green-700"}`}>
                  {result.safetyFactor.toFixed(2)}×
                  {result.safetyFactor < 1 ? ` (${t("result.overTension")})` : ""}
                </span>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
