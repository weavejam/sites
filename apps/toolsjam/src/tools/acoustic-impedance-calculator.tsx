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

type CalcType = "reflectionTransmission" | "impedanceOnly";

function fmtNum(n: number, sig = 4): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e6 || (abs < 0.01 && abs > 0)) {
    return n.toExponential(sig - 1);
  }
  return parseFloat(n.toPrecision(sig)).toLocaleString("en-US", { maximumSignificantDigits: sig });
}

interface AcousticResult {
  Z1: number;
  Z2: number | null;
  R: number | null;
  T: number | null;
  reflectedPct: number | null;
  transmittedPct: number | null;
}

export default function AcousticImpedanceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.acoustic-impedance-calculator");

  const [calcType, setCalcType] = React.useState<CalcType>("reflectionTransmission");
  const [density1, setDensity1] = React.useState("");
  const [speed1, setSpeed1] = React.useState("");
  const [density2, setDensity2] = React.useState("");
  const [speed2, setSpeed2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<AcousticResult | null>(() => {
    if (!touched) return null;
    const rho1 = parseFloat(density1);
    const c1 = parseFloat(speed1);
    if (!Number.isFinite(rho1) || rho1 <= 0 || !Number.isFinite(c1) || c1 <= 0) return null;
    const Z1 = rho1 * c1;
    if (calcType === "impedanceOnly") {
      return { Z1, Z2: null, R: null, T: null, reflectedPct: null, transmittedPct: null };
    }
    const rho2 = parseFloat(density2);
    const c2 = parseFloat(speed2);
    if (!Number.isFinite(rho2) || rho2 <= 0 || !Number.isFinite(c2) || c2 <= 0) return null;
    const Z2 = rho2 * c2;
    const R = (Z2 - Z1) / (Z2 + Z1);
    const T = (2 * Z2) / (Z2 + Z1);
    const reflectedPct = R * R * 100;
    const transmittedPct = 100 - reflectedPct;
    return { Z1, Z2, R, T, reflectedPct, transmittedPct };
  }, [touched, calcType, density1, speed1, density2, speed2]);

  function loadExample(rho1: string, c1: string, rho2: string, c2: string, type: CalcType) {
    setDensity1(rho1); setSpeed1(c1); setDensity2(rho2); setSpeed2(c2);
    setCalcType(type); setTouched(true);
  }

  function reset() {
    setDensity1(""); setSpeed1(""); setDensity2(""); setSpeed2("");
    setCalcType("reflectionTransmission"); setTouched(false);
  }

  const CALC_TYPES: CalcType[] = ["reflectionTransmission", "impedanceOnly"];

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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

  const showError = touched && result === null;

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
          <div className="space-y-2">
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {CALC_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => { setCalcType(ct); setTouched(false); }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ai-rho1">{t("field.density1")}</Label>
              <Input
                id="ai-rho1"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder={t("field.placeholder.density1")}
                value={density1}
                onChange={(e) => { setDensity1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ai-c1">{t("field.soundSpeed1")}</Label>
              <Input
                id="ai-c1"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder={t("field.placeholder.soundSpeed1")}
                value={speed1}
                onChange={(e) => { setSpeed1(e.target.value); setTouched(true); }}
              />
            </div>
            {calcType === "reflectionTransmission" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="ai-rho2">{t("field.density2")}</Label>
                  <Input
                    id="ai-rho2"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    placeholder={t("field.placeholder.density2")}
                    value={density2}
                    onChange={(e) => { setDensity2(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai-c2">{t("field.soundSpeed2")}</Label>
                  <Input
                    id="ai-c2"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    placeholder={t("field.placeholder.soundSpeed2")}
                    value={speed2}
                    onChange={(e) => { setSpeed2(e.target.value); setTouched(true); }}
                  />
                </div>
              </>
            )}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {result.Z2 !== null ? (
                  <>
                    <div>
                      <p className="text-sm text-zinc-500">{t("result.impedance1")}</p>
                      <p className="text-xl font-semibold font-mono">{fmtNum(result.Z1)} Rayl</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t("result.impedance2")}</p>
                      <p className="text-xl font-semibold font-mono">{fmtNum(result.Z2)} Rayl</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t("result.reflectionCoeff")}</p>
                      <p className="text-xl font-semibold font-mono">{fmtNum(result.R ?? 0, 5)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t("result.transmissionCoeff")}</p>
                      <p className="text-xl font-semibold font-mono">{fmtNum(result.T ?? 0, 5)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t("result.reflectedIntensity")}</p>
                      <p className="text-xl font-semibold font-mono">{fmtNum(result.reflectedPct ?? 0, 4)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t("result.transmittedIntensity")}</p>
                      <p className="text-xl font-semibold font-mono">{fmtNum(result.transmittedPct ?? 0, 4)}%</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-sm text-zinc-500">{t("result.impedance")}</p>
                    <p className="text-xl font-semibold font-mono">{fmtNum(result.Z1)} Rayl</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("1000", "1480", "1.225", "343", "reflectionTransmission")}>
              {t("examples.loadWaterAir")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("7850", "5960", "1000", "1480", "reflectionTransmission")}>
              {t("examples.loadSteelWater")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("1900", "4080", "", "", "impedanceOnly")}>
              {t("examples.loadBone")}
            </Button>
          </div>
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
