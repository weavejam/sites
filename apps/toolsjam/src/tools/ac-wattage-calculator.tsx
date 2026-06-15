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

function fmtNum(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

interface AcResult {
  realPower: number;
  apparentPower: number;
  reactivePower: number;
  powerFactor: number;
  phaseAngle: number;
}

export default function AcWattageCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ac-wattage-calculator");

  const [voltage, setVoltage] = React.useState("");
  const [current, setCurrent] = React.useState("");
  const [powerFactor, setPowerFactor] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<AcResult | null>(() => {
    if (!touched) return null;
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const pf = parseFloat(powerFactor);
    if (!Number.isFinite(V) || V <= 0) return null;
    if (!Number.isFinite(I) || I < 0) return null;
    if (!Number.isFinite(pf) || pf < 0 || pf > 1) return null;
    const S = V * I;
    const P = S * pf;
    const sinPhi = Math.sqrt(Math.max(0, 1 - pf * pf));
    const Q = S * sinPhi;
    const phiDeg = Math.acos(Math.min(1, pf)) * (180 / Math.PI);
    return { realPower: P, apparentPower: S, reactivePower: Q, powerFactor: pf, phaseAngle: phiDeg };
  }, [touched, voltage, current, powerFactor]);

  function loadExample(v: string, i: string, pf: string, freq: string) {
    setVoltage(v);
    setCurrent(i);
    setPowerFactor(pf);
    setFrequency(freq);
    setTouched(true);
  }

  function reset() {
    setVoltage("");
    setCurrent("");
    setPowerFactor("");
    setFrequency("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="acw-v">{t("field.voltage")}</Label>
              <Input
                id="acw-v"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder={t("field.placeholder.voltage")}
                value={voltage}
                onChange={(e) => { setVoltage(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acw-i">{t("field.current")}</Label>
              <Input
                id="acw-i"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder={t("field.placeholder.current")}
                value={current}
                onChange={(e) => { setCurrent(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acw-pf">{t("field.powerFactor")}</Label>
              <Input
                id="acw-pf"
                type="number"
                inputMode="decimal"
                min={0}
                max={1}
                step="any"
                placeholder={t("field.placeholder.powerFactor")}
                value={powerFactor}
                onChange={(e) => { setPowerFactor(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acw-freq">{t("field.frequency")}</Label>
              <Input
                id="acw-freq"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder={t("field.placeholder.frequency")}
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.realPower")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.realPower)} W</p>
                  <p className="text-sm text-zinc-500">({fmtNum(result.realPower / 1000, 3)} kW)</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.apparentPower")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.apparentPower)} VA</p>
                  <p className="text-sm text-zinc-500">({fmtNum(result.apparentPower / 1000, 3)} kVA)</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.reactivePower")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.reactivePower)} VAR</p>
                  <p className="text-sm text-zinc-500">({fmtNum(result.reactivePower / 1000, 3)} kVAR)</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.powerFactor")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.powerFactor, 4)}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.phaseAngle")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.phaseAngle, 2)}°</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("120", "5", "1.0", "60")}>
              {t("examples.loadHousehold")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("220", "10", "0.85", "50")}>
              {t("examples.loadMotor")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("380", "25", "0.78", "50")}>
              {t("examples.loadIndustrial")}
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
