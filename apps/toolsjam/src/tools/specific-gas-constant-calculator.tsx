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

const R0 = 8.314; // J/(mol·K) — universal gas constant

function calcSpecificR(molarMassGPerMol: number): number {
  // R = R₀ / M  where M must be in kg/mol
  return R0 / (molarMassGPerMol / 1000);
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function SpecificGasConstantCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.specific-gas-constant-calculator");

  const [molarMass, setMolarMass] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [pressure, setPressure] = React.useState("");
  const [volume, setVolume] = React.useState("");
  const [massVal, setMassVal] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const mM = parseFloat(molarMass);
  const T = parseFloat(temperature);
  const P = parseFloat(pressure);
  const V = parseFloat(volume);
  const m = parseFloat(massVal);

  const mMValid = molarMass !== "" && Number.isFinite(mM) && mM > 0;
  const TValid = temperature !== "" && Number.isFinite(T) && T > 0;
  const PValid = pressure !== "" && Number.isFinite(P) && P > 0;
  const VValid = volume !== "" && Number.isFinite(V) && V > 0;
  const mValid = massVal !== "" && Number.isFinite(m) && m > 0;

  const R = mMValid ? calcSpecificR(mM) : null;

  // PV = mRT — calculate the missing one when three of four are provided
  let derivedMass: number | null = null;
  let derivedVolume: number | null = null;
  let derivedPressure: number | null = null;
  let derivedTemperature: number | null = null;

  if (R !== null) {
    if (TValid && PValid && VValid && !mValid) derivedMass = (P * V) / (R * T);
    if (TValid && PValid && mValid && !VValid) derivedVolume = (m * R * T) / P;
    if (TValid && VValid && mValid && !PValid) derivedPressure = (m * R * T) / V;
    if (PValid && VValid && mValid && !TValid) derivedTemperature = (P * V) / (m * R);
  }

  function reset() {
    setMolarMass("");
    setTemperature("");
    setPressure("");
    setVolume("");
    setMassVal("");
    setTouched(false);
  }

  function loadExample(mm: string, t_: string, p: string, v: string, ms: string) {
    setMolarMass(mm);
    setTemperature(t_);
    setPressure(p);
    setVolume(v);
    setMassVal(ms);
    setTouched(true);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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

  const showError = touched && !mMValid;

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
              <Label htmlFor="sgc-molar">{t("field.molarMass")}</Label>
              <Input
                id="sgc-molar"
                type="number"
                inputMode="decimal"
                value={molarMass}
                placeholder={t("placeholder.molarMass")}
                onChange={(e) => { setMolarMass(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sgc-temp">{t("field.temperature")}</Label>
              <Input
                id="sgc-temp"
                type="number"
                inputMode="decimal"
                value={temperature}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setTemperature(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sgc-press">{t("field.pressure")}</Label>
              <Input
                id="sgc-press"
                type="number"
                inputMode="decimal"
                value={pressure}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setPressure(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sgc-vol">{t("field.volume")}</Label>
              <Input
                id="sgc-vol"
                type="number"
                inputMode="decimal"
                value={volume}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setVolume(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sgc-mass">{t("field.mass")}</Label>
              <Input
                id="sgc-mass"
                type="number"
                inputMode="decimal"
                value={massVal}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setMassVal(e.target.value); setTouched(true); }}
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

          {R !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.R", { value: fmt(R, 4) })}
              </div>
              {derivedMass !== null && (
                <div className="text-sm text-zinc-700">
                  {t("result.mass", { value: fmt(derivedMass, 6) })}
                </div>
              )}
              {derivedVolume !== null && (
                <div className="text-sm text-zinc-700">
                  {t("result.volume", { value: fmt(derivedVolume, 6) })}
                </div>
              )}
              {derivedPressure !== null && (
                <div className="text-sm text-zinc-700">
                  {t("result.pressure", { value: fmt(derivedPressure, 2) })}
                </div>
              )}
              {derivedTemperature !== null && (
                <div className="text-sm text-zinc-700">
                  {t("result.temperature", { value: fmt(derivedTemperature, 2) })}
                </div>
              )}
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("28.97", "298.15", "101325", "0.001", "0.001")}
          >
            {t("examples.loadAir")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("28.014", "273.15", "101325", "0.001", "0.001")}
          >
            {t("examples.loadNitrogen")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("44.01", "373.15", "200000", "0.002", "0.002")}
          >
            {t("examples.loadCO2")}
          </Button>
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
