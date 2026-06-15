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

const STANDARD_BREAKERS = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350, 400];

// Wire gauge table: [max_amps, awg_label]
const WIRE_GAUGE: [number, string][] = [
  [15, "14 AWG"],
  [20, "12 AWG"],
  [30, "10 AWG"],
  [40, "8 AWG"],
  [55, "6 AWG"],
  [70, "4 AWG"],
  [85, "3 AWG"],
  [95, "2 AWG"],
  [110, "1 AWG"],
  [130, "1/0 AWG"],
  [150, "2/0 AWG"],
  [175, "3/0 AWG"],
  [200, "4/0 AWG"],
  [230, "250 kcmil"],
  [255, "300 kcmil"],
  [285, "350 kcmil"],
  [310, "400 kcmil"],
  [335, "500 kcmil"],
  [400, "600 kcmil"],
];

// NEC temperature correction factors for 75°C rated conductors
function tempCorrectionFactor(temp: number): number {
  if (temp <= 25) return 1.08;
  if (temp <= 30) return 1.00;
  if (temp <= 35) return 0.91;
  if (temp <= 40) return 0.82;
  if (temp <= 45) return 0.71;
  if (temp <= 50) return 0.58;
  return 0.41;
}

function nextStandardBreaker(amps: number): number {
  for (const size of STANDARD_BREAKERS) {
    if (size >= amps) return size;
  }
  return STANDARD_BREAKERS[STANDARD_BREAKERS.length - 1];
}

function wireGaugeForAmps(amps: number): string {
  for (const [maxA, label] of WIRE_GAUGE) {
    if (amps <= maxA) return label;
  }
  return ">600 kcmil";
}

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

interface CalcResult {
  loadCurrent: number;
  designCurrent: number;
  breakerSize: number;
  wireGauge: string;
  tempFactor: number;
}

export default function BreakerSizeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.breaker-size-calculator");

  const [voltage, setVoltage] = React.useState("");
  const [power, setPower] = React.useState("");
  const [powerFactor, setPowerFactor] = React.useState("0.95");
  const [loadType, setLoadType] = React.useState<"continuous" | "nonContinuous">("nonContinuous");
  const [ambientTemp, setAmbientTemp] = React.useState("30");
  const [phaseType, setPhaseType] = React.useState<"single" | "three">("single");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<CalcResult | null>(() => {
    const v = parseFloat(voltage);
    const p = parseFloat(power);
    const pf = parseFloat(powerFactor);
    const temp = parseFloat(ambientTemp);
    if (!Number.isFinite(v) || v <= 0) return null;
    if (!Number.isFinite(p) || p <= 0) return null;
    if (!Number.isFinite(pf) || pf <= 0 || pf > 1) return null;
    if (!Number.isFinite(temp)) return null;

    const loadCurrent =
      phaseType === "single"
        ? p / (v * pf)
        : p / (Math.sqrt(3) * v * pf);

    const tempFactor = tempCorrectionFactor(temp);
    const continuousFactor = loadType === "continuous" ? 1.25 : 1.0;
    // Per NEC: breaker is sized for load current × continuous factor.
    // Temperature correction applies to conductor ampacity (wire selection), not the breaker.
    const designCurrent = loadCurrent * continuousFactor;
    const breakerSize = nextStandardBreaker(designCurrent);
    const wireGauge = wireGaugeForAmps(breakerSize);

    return { loadCurrent, designCurrent, breakerSize, wireGauge, tempFactor };
  }, [voltage, power, powerFactor, loadType, ambientTemp, phaseType]);

  const hasInputError = touched && result === null;

  function reset() {
    setVoltage("");
    setPower("");
    setPowerFactor("0.95");
    setLoadType("nonContinuous");
    setAmbientTemp("30");
    setPhaseType("single");
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
              <Label htmlFor="bsc-voltage">{t("field.voltage")}</Label>
              <Input
                id="bsc-voltage"
                type="number"
                inputMode="decimal"
                value={voltage}
                placeholder="120"
                onChange={(e) => { setVoltage(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bsc-power">{t("field.power")}</Label>
              <Input
                id="bsc-power"
                type="number"
                inputMode="decimal"
                value={power}
                placeholder="1800"
                onChange={(e) => { setPower(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bsc-pf">{t("field.powerFactor")}</Label>
              <Input
                id="bsc-pf"
                type="number"
                inputMode="decimal"
                value={powerFactor}
                placeholder="0.95"
                onChange={(e) => { setPowerFactor(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bsc-temp">{t("field.ambientTemp")}</Label>
              <Input
                id="bsc-temp"
                type="number"
                inputMode="decimal"
                value={ambientTemp}
                placeholder="30"
                onChange={(e) => { setAmbientTemp(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("field.loadType")}</Label>
              <div className="flex gap-2">
                {(["nonContinuous", "continuous"] as const).map((lt) => (
                  <Button
                    key={lt}
                    type="button"
                    variant={loadType === lt ? "default" : "outline"}
                    onClick={() => { setLoadType(lt); setTouched(false); }}
                  >
                    {t(`loadType.${lt}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.phaseType")}</Label>
              <div className="flex gap-2">
                {(["single", "three"] as const).map((pt) => (
                  <Button
                    key={pt}
                    type="button"
                    variant={phaseType === pt ? "default" : "outline"}
                    onClick={() => { setPhaseType(pt); setTouched(false); }}
                  >
                    {t(`phaseType.${pt}` as never)}
                  </Button>
                ))}
              </div>
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

          {hasInputError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.loadCurrent")}: </span>
                  <span className="font-semibold">{fmt(result.loadCurrent)} {t("result.unit.amps")}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.tempCorrFactor")}: </span>
                  <span className="font-semibold">{fmt(result.tempFactor, 2)}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.designCurrent")}: </span>
                  <span className="font-semibold">{fmt(result.designCurrent)} {t("result.unit.amps")}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.wireGauge")}: </span>
                  <span className="font-semibold">{result.wireGauge}</span>
                </div>
              </div>
              <div className="mt-2 text-2xl font-bold text-zinc-900">
                {t("result.breakerSize")}: {result.breakerSize} {t("result.unit.amps")}
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
