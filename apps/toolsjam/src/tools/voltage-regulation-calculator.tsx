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

export default function VoltageRegulationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.voltage-regulation-calculator");
  const [noLoadV, setNoLoadV] = React.useState("");
  const [fullLoadV, setFullLoadV] = React.useState("");
  const [nominalV, setNominalV] = React.useState("");
  const [minLineV, setMinLineV] = React.useState("");
  const [maxLineV, setMaxLineV] = React.useState("");
  const [loadCurrent, setLoadCurrent] = React.useState("");
  const [outputImpedance, setOutputImpedance] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const pNoLoad = noLoadV === "" ? NaN : parseFloat(noLoadV);
  const pFullLoad = fullLoadV === "" ? NaN : parseFloat(fullLoadV);
  const pNominal = nominalV === "" ? NaN : parseFloat(nominalV);
  const pMinLine = minLineV === "" ? NaN : parseFloat(minLineV);
  const pMaxLine = maxLineV === "" ? NaN : parseFloat(maxLineV);
  const pLoadCurrent = loadCurrent === "" ? NaN : parseFloat(loadCurrent);
  const pOutputImpedance = outputImpedance === "" ? NaN : parseFloat(outputImpedance);

  // Load regulation requires no-load and full-load voltages
  const loadRegValid =
    Number.isFinite(pNoLoad) &&
    Number.isFinite(pFullLoad) &&
    pFullLoad > 0 &&
    pNoLoad >= 0;

  // Line regulation requires min/max line voltages, load current, and output impedance
  const lineRegValid =
    Number.isFinite(pNominal) &&
    Number.isFinite(pMinLine) &&
    Number.isFinite(pMaxLine) &&
    Number.isFinite(pLoadCurrent) &&
    Number.isFinite(pOutputImpedance) &&
    pNominal > 0 &&
    pMaxLine > pMinLine &&
    pLoadCurrent >= 0 &&
    pOutputImpedance >= 0;

  const anyValid = loadRegValid || lineRegValid;

  // Load Regulation (%) = (V_NL - V_FL) / V_FL × 100
  const loadRegulation = loadRegValid
    ? ((pNoLoad - pFullLoad) / pFullLoad) * 100
    : null;

  // Voltage change from no-load to full-load
  const voltageChange = loadRegValid ? pNoLoad - pFullLoad : null;

  // Line Regulation: change in output voltage per change in input voltage
  // ΔVout = output_impedance × load_current (simplified output impedance model)
  // Line_Reg (%) = ΔVout / (V_max_line - V_min_line) × 100
  const deltaVin = lineRegValid ? pMaxLine - pMinLine : null;
  const deltaVout = lineRegValid ? pOutputImpedance * pLoadCurrent : null;
  const lineRegulation =
    lineRegValid && deltaVin !== null && deltaVin > 0 && deltaVout !== null
      ? (deltaVout / deltaVin) * 100
      : null;

  function reset() {
    setNoLoadV("");
    setFullLoadV("");
    setNominalV("");
    setMinLineV("");
    setMaxLineV("");
    setLoadCurrent("");
    setOutputImpedance("");
    setTouched(false);
  }

  function loadExample(
    nl: string, fl: string, nom: string, minL: string, maxL: string, lc: string, oi: string
  ) {
    setNoLoadV(nl);
    setFullLoadV(fl);
    setNominalV(nom);
    setMinLineV(minL);
    setMaxLineV(maxL);
    setLoadCurrent(lc);
    setOutputImpedance(oi);
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
          <div>
            <p className="mb-3 text-sm font-medium text-zinc-600">{t("section.loadReg")}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vreg-noload">{t("field.noLoadVoltage")}</Label>
                <Input
                  id="vreg-noload"
                  type="number"
                  inputMode="decimal"
                  value={noLoadV}
                  placeholder={t("placeholder.noLoadVoltage")}
                  onChange={(e) => { setNoLoadV(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vreg-fullload">{t("field.fullLoadVoltage")}</Label>
                <Input
                  id="vreg-fullload"
                  type="number"
                  inputMode="decimal"
                  value={fullLoadV}
                  placeholder={t("placeholder.fullLoadVoltage")}
                  onChange={(e) => { setFullLoadV(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-zinc-600">{t("section.lineReg")}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="vreg-nominal">{t("field.nominalVoltage")}</Label>
                <Input
                  id="vreg-nominal"
                  type="number"
                  inputMode="decimal"
                  value={nominalV}
                  placeholder={t("placeholder.nominalVoltage")}
                  onChange={(e) => { setNominalV(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vreg-minline">{t("field.minLineVoltage")}</Label>
                <Input
                  id="vreg-minline"
                  type="number"
                  inputMode="decimal"
                  value={minLineV}
                  placeholder={t("placeholder.minLineVoltage")}
                  onChange={(e) => { setMinLineV(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vreg-maxline">{t("field.maxLineVoltage")}</Label>
                <Input
                  id="vreg-maxline"
                  type="number"
                  inputMode="decimal"
                  value={maxLineV}
                  placeholder={t("placeholder.maxLineVoltage")}
                  onChange={(e) => { setMaxLineV(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vreg-current">{t("field.loadCurrent")}</Label>
                <Input
                  id="vreg-current"
                  type="number"
                  inputMode="decimal"
                  value={loadCurrent}
                  placeholder={t("placeholder.loadCurrent")}
                  onChange={(e) => { setLoadCurrent(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vreg-impedance">{t("field.outputImpedance")}</Label>
                <Input
                  id="vreg-impedance"
                  type="number"
                  inputMode="decimal"
                  value={outputImpedance}
                  placeholder={t("placeholder.outputImpedance")}
                  onChange={(e) => { setOutputImpedance(e.target.value); setTouched(true); }}
                />
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

          {touched && !anyValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {anyValid && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {loadRegulation !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.labelLoadReg")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNumber(loadRegulation)} %
                    </div>
                  </div>
                )}
                {voltageChange !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.labelVoltageChange")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNumber(voltageChange)} V
                    </div>
                  </div>
                )}
                {lineRegulation !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.labelLineReg")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNumber(lineRegulation)} %
                    </div>
                  </div>
                )}
                {deltaVout !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.labelDeltaVout")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNumber(deltaVout)} V
                    </div>
                  </div>
                )}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("12.5", "11.8", "12", "10.8", "13.2", "5", "0.1")}
            >
              {t("examples.loadPSU12V")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("5.1", "4.85", "5", "4.5", "5.5", "10", "0.05")}
            >
              {t("examples.loadPSU5V")}
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
