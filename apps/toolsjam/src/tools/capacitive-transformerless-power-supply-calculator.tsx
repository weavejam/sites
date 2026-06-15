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

function formatResult(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1e6 || (Math.abs(n) < 0.0001 && n !== 0)) {
    return n.toExponential(3);
  }
  return n.toFixed(decimals).replace(/\.?0+$/, "");
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

export default function CapacitiveTransformerlessPowerSupplyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.capacitive-transformerless-power-supply-calculator");

  const [acVoltage, setAcVoltage] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [capacitor, setCapacitor] = React.useState("");
  const [loadResistance, setLoadResistance] = React.useState("");
  const [zenerVoltage, setZenerVoltage] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const vacNum = parseFloat(acVoltage);
  const fNum = parseFloat(frequency);
  const cNum = parseFloat(capacitor); // in μF
  const rlNum = parseFloat(loadResistance);
  const vzNum = parseFloat(zenerVoltage);

  const allValid =
    acVoltage !== "" && Number.isFinite(vacNum) && vacNum > 0 &&
    frequency !== "" && Number.isFinite(fNum) && fNum > 0 &&
    capacitor !== "" && Number.isFinite(cNum) && cNum > 0 &&
    loadResistance !== "" && Number.isFinite(rlNum) && rlNum > 0 &&
    zenerVoltage !== "" && Number.isFinite(vzNum) && vzNum > 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const cFarads = cNum * 1e-6;
    const xc = 1 / (2 * Math.PI * fNum * cFarads);
    const vpeak = vacNum * Math.SQRT2;
    // Simplified: current through drop capacitor (impedance = Xc dominates)
    const iRms = vacNum / xc;
    // Available DC current (full-wave bridge approximation)
    const idcAvail = iRms * 0.9;
    // DC output regulated by zener
    const vout = vzNum;
    // Load current
    const iLoad = vout / rlNum;
    // Zener current = available - load
    const iZener = idcAvail - iLoad;
    // Zener power dissipation
    const pZener = vzNum * Math.max(0, iZener);
    // Power factor: cos(arctan(Xc/R)) ≈ simplified
    const inputPower = vacNum * iRms;
    return { xc, vpeak, iRms, idcAvail, vout, iLoad, iZener, pZener, inputPower };
  }, [allValid, vacNum, fNum, cNum, rlNum, vzNum]);

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
    setAcVoltage("");
    setFrequency("");
    setCapacitor("");
    setLoadResistance("");
    setZenerVoltage("");
    setTouched(false);
  }

  const showError = touched && !allValid;
  const showWarning = result !== null && result.iZener < 0;

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
              <Label htmlFor="ctps-acvoltage">{t("field.acVoltage")}</Label>
              <Input
                id="ctps-acvoltage"
                type="number"
                inputMode="decimal"
                value={acVoltage}
                placeholder={t("placeholder.acVoltage")}
                onChange={(e) => { setAcVoltage(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctps-frequency">{t("field.frequency")}</Label>
              <Input
                id="ctps-frequency"
                type="number"
                inputMode="decimal"
                value={frequency}
                placeholder={t("placeholder.frequency")}
                onChange={(e) => { setFrequency(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctps-capacitor">{t("field.capacitor")}</Label>
              <Input
                id="ctps-capacitor"
                type="number"
                inputMode="decimal"
                value={capacitor}
                placeholder={t("placeholder.capacitor")}
                onChange={(e) => { setCapacitor(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctps-loadresistance">{t("field.loadResistance")}</Label>
              <Input
                id="ctps-loadresistance"
                type="number"
                inputMode="decimal"
                value={loadResistance}
                placeholder={t("placeholder.loadResistance")}
                onChange={(e) => { setLoadResistance(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctps-zenervoltage">{t("field.zenerVoltage")}</Label>
              <Input
                id="ctps-zenervoltage"
                type="number"
                inputMode="decimal"
                value={zenerVoltage}
                placeholder={t("placeholder.zenerVoltage")}
                onChange={(e) => { setZenerVoltage(e.target.value); setTouched(false); }}
              />
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
          {showWarning && (
            <p className="text-sm text-amber-600">{t("error.overload")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-sm text-zinc-500">{t("result.xc")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.xc, 2)} Ω</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.peakVoltage")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.vpeak, 2)} V</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.capCurrent")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.iRms * 1000, 2)} mA</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.dcOutput")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.vout, 2)} V</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.loadCurrent")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.iLoad * 1000, 2)} mA</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.zenerCurrent")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.iZener * 1000, 2)} mA</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.zenerPower")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.pZener * 1000, 2)} mW</span>
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
