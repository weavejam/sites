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

interface RectifierResult {
  peakVoltage: number;
  peakOutputVoltage: number;
  dcOutput: number;
  rippleVoltage: number;
  rippleFactor: number;
  piv: number;
  efficiency: number;
  loadCurrent: number;
}

function calcRectifier(
  acVrms: number,
  resistance: number,
  diodeDrop: number,
  frequency: number,
  capacitance: number
): RectifierResult {
  const peakVoltage = acVrms * Math.SQRT2;
  const peakOutputVoltage = peakVoltage - 2 * diodeDrop;
  // Capacitor-filtered bridge rectifier: DC output ≈ peak output voltage
  const dcOutput = peakOutputVoltage;
  // Ripple voltage (peak-to-peak): V_DC / (2 * f * R * C)
  const rippleVoltage = dcOutput / (2 * frequency * resistance * (capacitance / 1e6));
  const rippleFactor = rippleVoltage / dcOutput;
  const piv = peakVoltage - diodeDrop;
  // Practical efficiency: ratio of DC output power to AC input power
  const efficiency = Math.pow(peakOutputVoltage / peakVoltage, 2) * 100;
  const loadCurrent = dcOutput / resistance;

  return { peakVoltage, peakOutputVoltage, dcOutput, rippleVoltage, rippleFactor, piv, efficiency, loadCurrent };
}

function fmt(n: number, decimals = 3): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function BridgeRectifierCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.bridge-rectifier-calculator");

  const [acVoltage, setAcVoltage] = React.useState("");
  const [resistance, setResistance] = React.useState("");
  const [diodeDrop, setDiodeDrop] = React.useState("0.7");
  const [frequency, setFrequency] = React.useState("50");
  const [capacitance, setCapacitance] = React.useState("1000");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<RectifierResult | null>(() => {
    const v = parseFloat(acVoltage);
    const r = parseFloat(resistance);
    const d = parseFloat(diodeDrop);
    const f = parseFloat(frequency);
    const c = parseFloat(capacitance);
    if ([v, r, d, f, c].some((x) => !Number.isFinite(x) || x <= 0)) return null;
    if (2 * d >= v * Math.SQRT2) return null;
    return calcRectifier(v, r, d, f, c);
  }, [acVoltage, resistance, diodeDrop, frequency, capacitance]);

  function reset() {
    setAcVoltage("");
    setResistance("");
    setDiodeDrop("0.7");
    setFrequency("50");
    setCapacitance("1000");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  const showError = touched && result === null;

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
              <Label htmlFor="br-vac">{t("field.acVoltage")}</Label>
              <Input
                id="br-vac"
                type="number"
                inputMode="decimal"
                value={acVoltage}
                placeholder="12"
                onChange={(e) => { setAcVoltage(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-r">{t("field.resistance")}</Label>
              <Input
                id="br-r"
                type="number"
                inputMode="decimal"
                value={resistance}
                placeholder="100"
                onChange={(e) => { setResistance(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-vd">{t("field.diodeDrop")}</Label>
              <Input
                id="br-vd"
                type="number"
                inputMode="decimal"
                value={diodeDrop}
                placeholder="0.7"
                onChange={(e) => { setDiodeDrop(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-freq">{t("field.frequency")}</Label>
              <Input
                id="br-freq"
                type="number"
                inputMode="decimal"
                value={frequency}
                placeholder="50"
                onChange={(e) => { setFrequency(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-cap">{t("field.capacitance")}</Label>
              <Input
                id="br-cap"
                type="number"
                inputMode="decimal"
                value={capacitance}
                placeholder="1000"
                onChange={(e) => { setCapacitance(e.target.value); setTouched(true); }}
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

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.peakVoltage")}: </span>
                  <span className="font-semibold">{fmt(result.peakVoltage)} {t("result.unit.volts")}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.dcOutput")}: </span>
                  <span className="font-bold text-zinc-900">{fmt(result.dcOutput)} {t("result.unit.volts")}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.rippleVoltage")}: </span>
                  <span className="font-semibold">{fmt(result.rippleVoltage)} {t("result.unit.volts")}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.rippleFactor")}: </span>
                  <span className="font-semibold">{fmt(result.rippleFactor * 100, 2)} {t("result.unit.percent")}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.piv")}: </span>
                  <span className="font-semibold">{fmt(result.piv)} {t("result.unit.volts")}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.loadCurrent")}: </span>
                  <span className="font-semibold">{fmt(result.loadCurrent, 4)} {t("result.unit.amps")}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.efficiency")}: </span>
                  <span className="font-semibold">{fmt(result.efficiency, 1)} {t("result.unit.percent")}</span>
                </div>
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
