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

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

interface CalcResult {
  dutyCycle: number;
  dutyCyclePercent: number;
  inputCurrent: number;
  inductorRipple: number;
  inductorPeak: number;
  outputPower: number;
  inputPower: number;
}

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 0.001 || Math.abs(n) >= 1e6) return n.toExponential(3);
  return n.toFixed(decimals);
}

export default function BoostConverterCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.boost-converter-calculator");

  const [inputVoltage, setInputVoltage] = React.useState("");
  const [outputVoltage, setOutputVoltage] = React.useState("");
  const [switchingFrequency, setSwitchingFrequency] = React.useState("");
  const [inductorValue, setInductorValue] = React.useState("");
  const [loadCurrent, setLoadCurrent] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const Vin = parseFloat(inputVoltage);
  const Vout = parseFloat(outputVoltage);
  const f = parseFloat(switchingFrequency);
  const L = parseFloat(inductorValue);
  const Iout = parseFloat(loadCurrent);

  const allFinite = Number.isFinite(Vin) && Vin > 0 && Number.isFinite(Vout) && Vout > 0
    && Number.isFinite(f) && f > 0 && Number.isFinite(L) && L > 0
    && Number.isFinite(Iout) && Iout > 0;

  const voltageError = allFinite && Vout <= Vin;

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched || !allFinite || voltageError) return null;
    const dutyCycle = 1 - Vin / Vout;
    const dutyCyclePercent = dutyCycle * 100;
    const outputPower = Vout * Iout;
    const inputPower = outputPower; // ideal
    const inputCurrent = inputPower / Vin;
    const inductorRipple = (Vin * dutyCycle) / (L * f);
    const inductorPeak = inputCurrent + inductorRipple / 2;
    return { dutyCycle, dutyCyclePercent, inputCurrent, inductorRipple, inductorPeak, outputPower, inputPower };
  }, [touched, allFinite, voltageError, Vin, Vout, f, L, Iout]);

  const showError = touched && !allFinite;

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
    setInputVoltage(""); setOutputVoltage(""); setSwitchingFrequency("");
    setInductorValue(""); setLoadCurrent(""); setTouched(false);
  }

  function loadExample(vin: string, vout: string, freq: string, l: string, iout: string) {
    setInputVoltage(vin); setOutputVoltage(vout); setSwitchingFrequency(freq);
    setInductorValue(l); setLoadCurrent(iout); setTouched(true);
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
              <Label htmlFor="bc-vin">{t("field.inputVoltage")} ({t("unit.inputVoltage")})</Label>
              <Input id="bc-vin" type="number" inputMode="decimal" value={inputVoltage}
                placeholder={t("placeholder.inputVoltage")} min="0" step="any"
                onChange={(e) => { setInputVoltage(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bc-vout">{t("field.outputVoltage")} ({t("unit.outputVoltage")})</Label>
              <Input id="bc-vout" type="number" inputMode="decimal" value={outputVoltage}
                placeholder={t("placeholder.outputVoltage")} min="0" step="any"
                onChange={(e) => { setOutputVoltage(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bc-freq">{t("field.switchingFrequency")} ({t("unit.switchingFrequency")})</Label>
              <Input id="bc-freq" type="number" inputMode="decimal" value={switchingFrequency}
                placeholder={t("placeholder.switchingFrequency")} min="0" step="any"
                onChange={(e) => { setSwitchingFrequency(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bc-l">{t("field.inductorValue")} ({t("unit.inductorValue")})</Label>
              <Input id="bc-l" type="number" inputMode="decimal" value={inductorValue}
                placeholder={t("placeholder.inductorValue")} min="0" step="any"
                onChange={(e) => { setInductorValue(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bc-iout">{t("field.loadCurrent")} ({t("unit.loadCurrent")})</Label>
              <Input id="bc-iout" type="number" inputMode="decimal" value={loadCurrent}
                placeholder={t("placeholder.loadCurrent")} min="0" step="any"
                onChange={(e) => { setLoadCurrent(e.target.value); setTouched(false); }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={handleReset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}
          {touched && voltageError && <p className="text-sm text-red-600">{t("error.voltageRatio")}</p>}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dutyCycle")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.dutyCycle, 4)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dutyCyclePercent")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.dutyCyclePercent, 2)} %</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.inputCurrent")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.inputCurrent)} A</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.inductorRipple")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.inductorRipple)} A</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.inductorPeak")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.inductorPeak)} A</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.outputPower")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.outputPower)} W</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.inputPower")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.inputPower)} W</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("3.7", "5", "500000", "0.000047", "0.5")}>
              {t("examples.loadBattery")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("12", "24", "100000", "0.0001", "2")}>
              {t("examples.loadAutomotive")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("8", "18", "200000", "0.000068", "1.5")}>
              {t("examples.loadSolar")}
            </Button>
          </div>
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
