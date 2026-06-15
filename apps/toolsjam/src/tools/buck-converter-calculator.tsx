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

function formatNum(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function formatPct(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (n * 100).toLocaleString("en-US", { maximumFractionDigits: 2 }) + "%";
}

export default function BuckConverterCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.buck-converter-calculator");

  const [vin, setVin] = React.useState("");
  const [vout, setVout] = React.useState("");
  const [freq, setFreq] = React.useState("");
  const [inductance, setInductance] = React.useState("");
  const [iout, setIout] = React.useState("");
  const [esr, setEsr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const vinNum = parseFloat(vin);
  const voutNum = parseFloat(vout);
  const freqNum = parseFloat(freq);
  const lNum = parseFloat(inductance);
  const ioutNum = parseFloat(iout);
  const esrNum = parseFloat(esr);

  const allValid =
    [vinNum, voutNum, freqNum, lNum, ioutNum, esrNum].every(
      (v) => Number.isFinite(v) && v > 0
    ) &&
    [vin, vout, freq, inductance, iout, esr].every((v) => v !== "");

  const voutExceedsVin =
    allValid && voutNum >= vinNum;

  const result = React.useMemo(() => {
    if (!allValid || voutExceedsVin) return null;
    const D = voutNum / vinNum;
    const T = 1 / freqNum; // switching period
    const deltaIL = ((vinNum - voutNum) * D * T) / lNum;
    const peakIL = ioutNum + deltaIL / 2;
    const outputRipple = deltaIL * esrNum;
    // Ideal efficiency approximation: ~95% typical for CCM buck
    const efficiency = 0.95;
    return { D, deltaIL, peakIL, outputRipple, efficiency };
  }, [allValid, voutExceedsVin, vinNum, voutNum, freqNum, lNum, ioutNum, esrNum]);

  function loadExample(
    v: string,
    vo: string,
    f: string,
    l: string,
    i: string,
    es: string
  ) {
    setVin(v);
    setVout(vo);
    setFreq(f);
    setInductance(l);
    setIout(i);
    setEsr(es);
    setTouched(true);
  }

  function reset() {
    setVin("");
    setVout("");
    setFreq("");
    setInductance("");
    setIout("");
    setEsr("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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
      } catch {
        break;
      }
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

  const showError = touched && (!allValid || voutExceedsVin);

  const fields: {
    id: string;
    key: keyof typeof t;
    value: string;
    setter: (v: string) => void;
    placeholder: string;
  }[] = [
    {
      id: "vin",
      key: "field.vin" as never,
      value: vin,
      setter: setVin,
      placeholder: t("placeholder.vin"),
    },
    {
      id: "vout",
      key: "field.vout" as never,
      value: vout,
      setter: setVout,
      placeholder: t("placeholder.vout"),
    },
    {
      id: "freq",
      key: "field.freq" as never,
      value: freq,
      setter: setFreq,
      placeholder: t("placeholder.freq"),
    },
    {
      id: "inductance",
      key: "field.inductance" as never,
      value: inductance,
      setter: setInductance,
      placeholder: t("placeholder.inductance"),
    },
    {
      id: "iout",
      key: "field.iout" as never,
      value: iout,
      setter: setIout,
      placeholder: t("placeholder.iout"),
    },
    {
      id: "esr",
      key: "field.esr" as never,
      value: esr,
      setter: setEsr,
      placeholder: t("placeholder.esr"),
    },
  ];

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
            {fields.map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={`buck-${f.id}`}>{t(f.key)}</Label>
                <Input
                  id={`buck-${f.id}`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={f.value}
                  placeholder={f.placeholder}
                  onChange={(e) => {
                    f.setter(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ))}
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
            <p className="text-sm text-red-600">
              {voutExceedsVin
                ? t("error.voutExceedsVin")
                : t("error.invalid")}
            </p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.dutyCycle")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatPct(result.D)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.rippleCurrent")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.deltaIL)} A
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.peakCurrent")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.peakIL)} A
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.outputRipple")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.outputRipple * 1000, 4)} mV
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.efficiency")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatPct(result.efficiency)}
                  </div>
                </div>
              </div>
            </div>
          )}
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("24", "12", "100000", "0.0001", "2", "0.01")
            }
          >
            {t("examples.loadAutomotive")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("48", "5", "500000", "0.000047", "1", "0.005")
            }
          >
            {t("examples.loadBattery")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("400", "24", "50000", "0.001", "10", "0.02")
            }
          >
            {t("examples.loadIndustrial")}
          </Button>
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
