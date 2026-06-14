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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

function formatNumber(value: number, decimals = 4): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return rounded.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export default function VoltageDropCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.voltage-drop-calculator");
  const [current, setCurrent] = React.useState("");
  const [sourceVoltage, setSourceVoltage] = React.useState("");
  const [wireLength, setWireLength] = React.useState("");
  const [wireResistance, setWireResistance] = React.useState("");
  const [powerFactor, setPowerFactor] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const parsedCurrent = current === "" ? NaN : parseFloat(current);
  const parsedVoltage = sourceVoltage === "" ? NaN : parseFloat(sourceVoltage);
  const parsedLength = wireLength === "" ? NaN : parseFloat(wireLength);
  const parsedResistance = wireResistance === "" ? NaN : parseFloat(wireResistance);
  const parsedPF = powerFactor === "" ? 1.0 : parseFloat(powerFactor);

  const valid =
    Number.isFinite(parsedCurrent) &&
    Number.isFinite(parsedVoltage) &&
    Number.isFinite(parsedLength) &&
    Number.isFinite(parsedResistance) &&
    Number.isFinite(parsedPF) &&
    parsedCurrent > 0 &&
    parsedVoltage > 0 &&
    parsedLength > 0 &&
    parsedResistance > 0 &&
    parsedPF > 0 &&
    parsedPF <= 1;

  // VD = 2 × I × R_per_km × L_m / 1000 × PF
  const voltageDrop = valid
    ? 2 * parsedCurrent * parsedResistance * parsedLength * parsedPF / 1000
    : null;
  const voltageDropPercent =
    voltageDrop !== null ? (voltageDrop / parsedVoltage) * 100 : null;
  const receivingVoltage =
    voltageDrop !== null ? parsedVoltage - voltageDrop : null;
  const powerLoss =
    voltageDrop !== null ? parsedCurrent * voltageDrop : null;

  function reset() {
    setCurrent("");
    setSourceVoltage("");
    setWireLength("");
    setWireResistance("");
    setPowerFactor("");
    setTouched(false);
  }

  function loadExample(
    nextCurrent: string,
    nextVoltage: string,
    nextLength: string,
    nextResistance: string,
    nextPF: string
  ) {
    setCurrent(nextCurrent);
    setSourceVoltage(nextVoltage);
    setWireLength(nextLength);
    setWireResistance(nextResistance);
    setPowerFactor(nextPF);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="vdrop-current">{t("field.current")}</Label>
              <Input
                id="vdrop-current"
                type="number"
                inputMode="decimal"
                value={current}
                placeholder={t("placeholder.current")}
                onChange={(e) => { setCurrent(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vdrop-voltage">{t("field.sourceVoltage")}</Label>
              <Input
                id="vdrop-voltage"
                type="number"
                inputMode="decimal"
                value={sourceVoltage}
                placeholder={t("placeholder.sourceVoltage")}
                onChange={(e) => { setSourceVoltage(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vdrop-length">{t("field.wireLength")}</Label>
              <Input
                id="vdrop-length"
                type="number"
                inputMode="decimal"
                value={wireLength}
                placeholder={t("placeholder.wireLength")}
                onChange={(e) => { setWireLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vdrop-resistance">{t("field.wireResistance")}</Label>
              <Input
                id="vdrop-resistance"
                type="number"
                inputMode="decimal"
                value={wireResistance}
                placeholder={t("placeholder.wireResistance")}
                onChange={(e) => { setWireResistance(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vdrop-pf">{t("field.powerFactor")}</Label>
              <Input
                id="vdrop-pf"
                type="number"
                inputMode="decimal"
                value={powerFactor}
                placeholder={t("placeholder.powerFactor")}
                onChange={(e) => { setPowerFactor(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <p className="text-sm text-zinc-500">{t("hint")}</p>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {voltageDrop !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelDrop")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(voltageDrop)} V
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelDropPct")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(voltageDropPercent!)} %
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelReceiving")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(receivingVoltage!)} V
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelPowerLoss")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(powerLoss!)} W
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("15", "120", "50", "1.83", "1.0")}
            >
              {t("examples.loadResidential")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("30", "480", "100", "0.727", "0.85")}
            >
              {t("examples.loadIndustrial")}
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
