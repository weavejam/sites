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

type Mode = "findPotential" | "findCharge" | "findDistance";

const MODES: Mode[] = ["findPotential", "findCharge", "findDistance"];
const COULOMB_CONSTANT = 8.9875517923e9;

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface CalculationResult {
  label: string;
  value: number;
  unit: string;
  formula: string;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1e9 || abs < 1e-4)) {
    return value.toExponential(6);
  }
  const rounded = Math.round(value * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function ElectricPotentialCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.electric-potential-calculator");
  const [mode, setMode] = React.useState<Mode>("findPotential");
  const [potential, setPotential] = React.useState("");
  const [charge, setCharge] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const result = React.useMemo<CalculationResult | null>(() => {
    const v = potential === "" ? NaN : parseFloat(potential);
    const q = charge === "" ? NaN : parseFloat(charge);
    const r = distance === "" ? NaN : parseFloat(distance);

    if (mode === "findPotential") {
      if (!Number.isFinite(q) || !Number.isFinite(r) || r <= 0) return null;
      return {
        label: t("result.potential"),
        value: (COULOMB_CONSTANT * q) / r,
        unit: t("result.unitPotential"),
        formula: t("result.formulaPotential"),
      };
    }

    if (mode === "findCharge") {
      if (!Number.isFinite(v) || !Number.isFinite(r) || r <= 0) return null;
      return {
        label: t("result.charge"),
        value: (v * r) / COULOMB_CONSTANT,
        unit: t("result.unitCharge"),
        formula: t("result.formulaCharge"),
      };
    }

    if (!Number.isFinite(v) || !Number.isFinite(q) || v === 0) return null;
    const solvedDistance = (COULOMB_CONSTANT * q) / v;
    if (!Number.isFinite(solvedDistance) || solvedDistance <= 0) return null;
    return {
      label: t("result.distance"),
      value: solvedDistance,
      unit: t("result.unitDistance"),
      formula: t("result.formulaDistance"),
    };
  }, [charge, distance, mode, potential, t]);

  function reset() {
    setPotential("");
    setCharge("");
    setDistance("");
    setTouched(false);
  }

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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <div className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
          <div className="space-y-2">
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant={mode === item ? "default" : "outline"}
                  onClick={() => {
                    setMode(item);
                    setTouched(false);
                  }}
                >
                  {t(("type." + item) as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">{t(("type." + mode + "_desc") as never)}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mode !== "findPotential" && (
              <div className="space-y-2">
                <Label htmlFor="ep-potential">{t("field.potential")}</Label>
                <Input
                  id="ep-potential"
                  type="number"
                  inputMode="decimal"
                  value={potential}
                  placeholder={t("placeholder.potential")}
                  onChange={(event) => {
                    setPotential(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {mode !== "findCharge" && (
              <div className="space-y-2">
                <Label htmlFor="ep-charge">{t("field.charge")}</Label>
                <Input
                  id="ep-charge"
                  type="number"
                  inputMode="decimal"
                  value={charge}
                  placeholder={t("placeholder.charge")}
                  onChange={(event) => {
                    setCharge(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {mode !== "findDistance" && (
              <div className="space-y-2">
                <Label htmlFor="ep-distance">{t("field.distance")}</Label>
                <Input
                  id="ep-distance"
                  type="number"
                  inputMode="decimal"
                  value={distance}
                  placeholder={t("placeholder.distance")}
                  onChange={(event) => {
                    setDistance(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && result === null && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div>
                <p className="text-sm text-zinc-500">{result.label}</p>
                <p className="text-2xl font-semibold text-zinc-900">{formatNumber(result.value)} {result.unit}</p>
              </div>
              <p className="text-xs text-zinc-500">{result.formula}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{item.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => <li key={index}>{step}</li>)}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
