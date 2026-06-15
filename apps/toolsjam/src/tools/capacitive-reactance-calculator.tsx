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

type CapUnit = "F" | "mF" | "uF" | "nF" | "pF";

const UNIT_MULTIPLIERS: Record<CapUnit, number> = {
  F: 1,
  mF: 1e-3,
  uF: 1e-6,
  nF: 1e-9,
  pF: 1e-12,
};

function formatResult(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1e6 || (Math.abs(n) < 0.01 && n !== 0)) {
    return n.toExponential(4);
  }
  return n.toFixed(4).replace(/\.?0+$/, "");
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

export default function CapacitiveReactanceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.capacitive-reactance-calculator");

  const [frequency, setFrequency] = React.useState("");
  const [capacitance, setCapacitance] = React.useState("");
  const [capUnit, setCapUnit] = React.useState<CapUnit>("uF");
  const [touched, setTouched] = React.useState(false);

  const fNum = parseFloat(frequency);
  const cNum = parseFloat(capacitance);
  const fValid = frequency !== "" && Number.isFinite(fNum) && fNum > 0;
  const cValid = capacitance !== "" && Number.isFinite(cNum) && cNum > 0;
  const allValid = fValid && cValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const cFarads = cNum * UNIT_MULTIPLIERS[capUnit];
    const omega = 2 * Math.PI * fNum;
    const xc = 1 / (omega * cFarads);
    const period = 1 / fNum;
    return { xc, omega, period, cFarads };
  }, [allValid, fNum, cNum, capUnit]);

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

  function handleCalculate() {
    setTouched(true);
  }

  function handleReset() {
    setFrequency("");
    setCapacitance("");
    setCapUnit("uF");
    setTouched(false);
  }

  const showError = touched && !allValid;

  const unitLabels: Record<CapUnit, string> = {
    F: t("unit.F"),
    mF: t("unit.mF"),
    uF: t("unit.uF"),
    nF: t("unit.nF"),
    pF: t("unit.pF"),
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
              <Label htmlFor="crc-frequency">{t("field.frequency")}</Label>
              <Input
                id="crc-frequency"
                type="number"
                inputMode="decimal"
                value={frequency}
                placeholder={t("placeholder.frequency")}
                onChange={(e) => { setFrequency(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crc-capacitance">{t("field.capacitance")}</Label>
              <div className="flex gap-2">
                <Input
                  id="crc-capacitance"
                  type="number"
                  inputMode="decimal"
                  value={capacitance}
                  placeholder={t("placeholder.capacitance")}
                  className="flex-1"
                  onChange={(e) => { setCapacitance(e.target.value); setTouched(false); }}
                />
                <select
                  aria-label={t("field.capacitanceUnit")}
                  value={capUnit}
                  onChange={(e) => { setCapUnit(e.target.value as CapUnit); setTouched(false); }}
                  className="h-9 rounded-md border border-input bg-transparent px-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {(Object.keys(UNIT_MULTIPLIERS) as CapUnit[]).map((u) => (
                    <option key={u} value={u}>{unitLabels[u]}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleCalculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-sm text-zinc-500">{t("result.reactance")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.xc)} Ω</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.angularFreq")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.omega)} rad/s</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.period")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.period)} s</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.capacitanceF")}: </span>
                  <span className="font-semibold text-zinc-900">{result.cFarads.toExponential(4)} F</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
