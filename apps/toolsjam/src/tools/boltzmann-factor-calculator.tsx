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

const DEFAULT_BOLTZMANN = "1.381e-23";
const EV_FACTOR = 1.602176634e-19;

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

interface CalcResult {
  boltzmannFactor: number;
  exponent: number;
  thermalEnergy: number;
  thermalEnergyEV: number;
  ratio: number;
}

function formatSci(n: number, sig = 3): string {
  if (!Number.isFinite(n)) return "—";
  return n.toExponential(sig);
}

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 1e-3 || Math.abs(n) >= 1e6) return n.toExponential(3);
  return n.toFixed(decimals);
}

export default function BoltzmannFactorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.boltzmann-factor-calculator");

  const [energy, setEnergy] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [boltzmannK, setBoltzmannK] = React.useState(DEFAULT_BOLTZMANN);
  const [touched, setTouched] = React.useState(false);

  const E = parseFloat(energy);
  const T = parseFloat(temperature);
  const k = parseFloat(boltzmannK);

  const validInputs = Number.isFinite(E) && E >= 0 && Number.isFinite(T) && T > 0 && Number.isFinite(k) && k > 0;
  const tempZero = touched && Number.isFinite(T) && T <= 0;

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched || !validInputs) return null;
    const exponent = -E / (k * T);
    const boltzmannFactor = Math.exp(exponent);
    const thermalEnergy = k * T;
    const thermalEnergyEV = thermalEnergy / EV_FACTOR;
    const ratio = E / (k * T);
    return { boltzmannFactor, exponent, thermalEnergy, thermalEnergyEV, ratio };
  }, [touched, validInputs, E, T, k]);

  const showError = touched && !validInputs && !tempZero;

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

  function handleReset() {
    setEnergy(""); setTemperature(""); setBoltzmannK(DEFAULT_BOLTZMANN); setTouched(false);
  }

  function loadExample(e: string, temp: string, k = DEFAULT_BOLTZMANN) {
    setEnergy(e); setTemperature(temp); setBoltzmannK(k); setTouched(true);
  }

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
              <Label htmlFor="bz-energy">{t("field.energy")}</Label>
              <Input
                id="bz-energy"
                type="number"
                inputMode="decimal"
                value={energy}
                placeholder={t("placeholder.energy")}
                step="any"
                onChange={(e) => { setEnergy(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bz-temp">{t("field.temperature")}</Label>
              <Input
                id="bz-temp"
                type="number"
                inputMode="decimal"
                value={temperature}
                placeholder={t("placeholder.temperature")}
                min="0"
                step="any"
                onChange={(e) => { setTemperature(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bz-k">{t("field.boltzmannConstant")}</Label>
              <Input
                id="bz-k"
                type="number"
                inputMode="decimal"
                value={boltzmannK}
                placeholder={t("placeholder.boltzmannConstant")}
                step="any"
                onChange={(e) => { setBoltzmannK(e.target.value); setTouched(false); }}
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
          {tempZero && (
            <p className="text-sm text-red-600">{t("error.temperatureZero")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.boltzmannFactor")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.boltzmannFactor)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.exponent")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.exponent)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.thermalEnergy")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.thermalEnergy)} J</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.thermalEnergyEV")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.thermalEnergyEV)} eV</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.ratio")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.ratio)}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("2.5e-20", "298")}>
              {t("examples.loadMolecular")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("1.6e-19", "500")}>
              {t("examples.loadElectronic")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("1.0e-21", "100")}>
              {t("examples.loadVibrational")}
            </Button>
          </div>
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
