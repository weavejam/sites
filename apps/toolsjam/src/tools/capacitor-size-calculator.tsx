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

const EPSILON_0 = 8.854187817e-12; // F/m

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

function formatSci(n: number, sig = 4): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  if (n >= 0.001 && n < 1e7) return n.toPrecision(sig);
  return n.toExponential(sig);
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 0.001 || Math.abs(n) >= 1e7) return n.toExponential(4);
  return n.toPrecision(5);
}

export default function CapacitorSizeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.capacitor-size-calculator");

  const [capacitance, setCapacitance] = React.useState("");
  const [voltage, setVoltage] = React.useState("");
  const [dielectricConstant, setDielectricConstant] = React.useState("");
  const [dielectricStrength, setDielectricStrength] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const cNum = parseFloat(capacitance);
  const vNum = parseFloat(voltage);
  const erNum = parseFloat(dielectricConstant);
  const dsNum = parseFloat(dielectricStrength);

  const result = React.useMemo(() => {
    if (!touched) return null;
    if (
      !Number.isFinite(cNum) || cNum <= 0 ||
      !Number.isFinite(vNum) || vNum <= 0 ||
      !Number.isFinite(erNum) || erNum <= 0 ||
      !Number.isFinite(dsNum) || dsNum <= 0
    ) return null;
    // Minimum plate distance to withstand operating voltage
    const d = vNum / dsNum;
    // Plate area from capacitance formula: C = ε₀ × εᵣ × A / d
    const plateArea = (cNum * d) / (EPSILON_0 * erNum);
    // Energy stored
    const energy = 0.5 * cNum * vNum * vNum;
    // Volume
    const volume = plateArea * d;
    // Power density (energy per unit volume)
    const powerDensity = energy / volume;
    // Maximum electric field
    const eField = vNum / d;
    return { d, plateArea, energy, volume, powerDensity, eField };
  }, [touched, cNum, vNum, erNum, dsNum]);

  const showError = touched && result === null;

  const examplesItems: ExampleRow[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleRow[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  function loadExample(c: string, v: string, er: string, ds: string) {
    setCapacitance(c);
    setVoltage(v);
    setDielectricConstant(er);
    setDielectricStrength(ds);
    setTouched(true);
  }

  function handleReset() {
    setCapacitance("");
    setVoltage("");
    setDielectricConstant("");
    setDielectricStrength("");
    setTouched(false);
  }

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
              <Label htmlFor="csc-c">{t("field.capacitance")}</Label>
              <Input
                id="csc-c"
                type="number"
                inputMode="decimal"
                value={capacitance}
                placeholder={t("placeholder.capacitance")}
                min="0"
                step="any"
                onChange={(e) => { setCapacitance(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="csc-v">{t("field.voltage")}</Label>
              <Input
                id="csc-v"
                type="number"
                inputMode="decimal"
                value={voltage}
                placeholder={t("placeholder.voltage")}
                min="0"
                step="any"
                onChange={(e) => { setVoltage(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="csc-er">{t("field.dielectricConstant")}</Label>
              <Input
                id="csc-er"
                type="number"
                inputMode="decimal"
                value={dielectricConstant}
                placeholder={t("placeholder.dielectricConstant")}
                min="0"
                step="any"
                onChange={(e) => { setDielectricConstant(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="csc-ds">{t("field.dielectricStrength")}</Label>
              <Input
                id="csc-ds"
                type="number"
                inputMode="decimal"
                value={dielectricStrength}
                placeholder={t("placeholder.dielectricStrength")}
                min="0"
                step="any"
                onChange={(e) => { setDielectricStrength(e.target.value); setTouched(false); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.plateDistance")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.d)} m</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.plateArea")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.plateArea)} m²</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.energy")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.energy)} J</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.powerDensity")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.powerDensity)} J/m³</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.volume")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.volume)} m³</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.electricField")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.eField)} V/m</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("0.000001", "12", "1", "3000000")}
          >
            {t("examples.loadBasicAir")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.00001", "1000", "8", "8000000")}
          >
            {t("examples.loadHighVoltage")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.1", "50", "2.2", "5000000")}
          >
            {t("examples.loadEnergyStorage")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
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
