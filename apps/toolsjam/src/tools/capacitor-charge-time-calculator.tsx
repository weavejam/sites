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

function formatResult(n: number, decimals = 6): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1e6 || (Math.abs(n) < 1e-4 && n !== 0)) {
    return n.toExponential(4);
  }
  return parseFloat(n.toFixed(decimals)).toString();
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

export default function CapacitorChargeTimeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.capacitor-charge-time-calculator");

  const [capacitance, setCapacitance] = React.useState("");
  const [resistance, setResistance] = React.useState("");
  const [supplyVoltage, setSupplyVoltage] = React.useState("");
  const [targetVoltage, setTargetVoltage] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const cNum = parseFloat(capacitance);
  const rNum = parseFloat(resistance);
  const vsNum = parseFloat(supplyVoltage);
  const vcNum = parseFloat(targetVoltage);

  const allValid =
    capacitance !== "" && Number.isFinite(cNum) && cNum > 0 &&
    resistance !== "" && Number.isFinite(rNum) && rNum > 0 &&
    supplyVoltage !== "" && Number.isFinite(vsNum) && vsNum > 0 &&
    targetVoltage !== "" && Number.isFinite(vcNum) && vcNum > 0;

  const targetLessThanSupply = allValid && vcNum < vsNum;

  const result = React.useMemo(() => {
    if (!allValid || !targetLessThanSupply) return null;
    const tau = rNum * cNum;
    const ratio = 1 - vcNum / vsNum;
    const chargeTime = -tau * Math.log(ratio);
    const pctVs = (vcNum / vsNum) * 100;
    // Multiples of tau
    const tauMultiple = chargeTime / tau;
    // Voltage at 1τ, 2τ, 3τ, 5τ
    const v1tau = vsNum * (1 - Math.exp(-1));
    const v2tau = vsNum * (1 - Math.exp(-2));
    const v3tau = vsNum * (1 - Math.exp(-3));
    const v5tau = vsNum * (1 - Math.exp(-5));
    return { tau, chargeTime, pctVs, tauMultiple, v1tau, v2tau, v3tau, v5tau };
  }, [allValid, targetLessThanSupply, rNum, cNum, vsNum, vcNum]);

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
    setCapacitance("");
    setResistance("");
    setSupplyVoltage("");
    setTargetVoltage("");
    setTouched(false);
  }

  const showError = touched && (!allValid || !targetLessThanSupply);
  const errorKey = touched && allValid && !targetLessThanSupply ? "error.targetExceedsSupply" : "error.invalid";

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
              <Label htmlFor="cct-capacitance">{t("field.capacitance")}</Label>
              <Input
                id="cct-capacitance"
                type="number"
                inputMode="decimal"
                value={capacitance}
                placeholder={t("placeholder.capacitance")}
                onChange={(e) => { setCapacitance(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cct-resistance">{t("field.resistance")}</Label>
              <Input
                id="cct-resistance"
                type="number"
                inputMode="decimal"
                value={resistance}
                placeholder={t("placeholder.resistance")}
                onChange={(e) => { setResistance(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cct-supply">{t("field.supplyVoltage")}</Label>
              <Input
                id="cct-supply"
                type="number"
                inputMode="decimal"
                value={supplyVoltage}
                placeholder={t("placeholder.supplyVoltage")}
                onChange={(e) => { setSupplyVoltage(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cct-target">{t("field.targetVoltage")}</Label>
              <Input
                id="cct-target"
                type="number"
                inputMode="decimal"
                value={targetVoltage}
                placeholder={t("placeholder.targetVoltage")}
                onChange={(e) => { setTargetVoltage(e.target.value); setTouched(false); }}
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
            <p className="text-sm text-red-600">{t(errorKey as never)}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-sm text-zinc-500">{t("result.timeConstant")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.tau)} s</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.chargeTime")}: </span>
                  <span className="font-semibold text-blue-700">{formatResult(result.chargeTime)} s</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.tauMultiple")}: </span>
                  <span className="font-semibold text-zinc-900">{formatResult(result.tauMultiple, 3)} × τ</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.chargePercent")}: </span>
                  <span className="font-semibold text-zinc-900">{result.pctVs.toFixed(2)}%</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium text-zinc-500 mb-1">{t("result.tauReference")}</div>
                <div className="grid gap-1 text-xs sm:grid-cols-2 text-zinc-700">
                  <span>1τ → {formatResult(result.v1tau, 3)} V ({((result.v1tau / vsNum) * 100).toFixed(1)}%)</span>
                  <span>2τ → {formatResult(result.v2tau, 3)} V ({((result.v2tau / vsNum) * 100).toFixed(1)}%)</span>
                  <span>3τ → {formatResult(result.v3tau, 3)} V ({((result.v3tau / vsNum) * 100).toFixed(1)}%)</span>
                  <span>5τ → {formatResult(result.v5tau, 3)} V ({((result.v5tau / vsNum) * 100).toFixed(1)}%)</span>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
