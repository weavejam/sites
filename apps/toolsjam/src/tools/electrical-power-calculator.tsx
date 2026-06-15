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

type Mode = "voltageAndCurrent" | "voltageAndResistance" | "currentAndResistance";

const MODES: Mode[] = ["voltageAndCurrent", "voltageAndResistance", "currentAndResistance"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface PowerResult {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
  formula: string;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1e9 || abs < 1e-4)) {
    return value.toExponential(6);
  }
  const rounded = Math.round(value * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function ElectricalPowerCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.electrical-power-calculator");
  const [mode, setMode] = React.useState<Mode>("voltageAndCurrent");
  const [voltage, setVoltage] = React.useState("");
  const [current, setCurrent] = React.useState("");
  const [resistance, setResistance] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const result = React.useMemo<PowerResult | null>(() => {
    const v = voltage === "" ? NaN : parseFloat(voltage);
    const i = current === "" ? NaN : parseFloat(current);
    const r = resistance === "" ? NaN : parseFloat(resistance);

    if (mode === "voltageAndCurrent") {
      if (!Number.isFinite(v) || !Number.isFinite(i) || i === 0) return null;
      return {
        voltage: v,
        current: i,
        resistance: v / i,
        power: v * i,
        formula: t("result.formulaVoltageCurrent"),
      };
    }

    if (mode === "voltageAndResistance") {
      if (!Number.isFinite(v) || !Number.isFinite(r) || r <= 0) return null;
      return {
        voltage: v,
        current: v / r,
        resistance: r,
        power: (v * v) / r,
        formula: t("result.formulaVoltageResistance"),
      };
    }

    if (!Number.isFinite(i) || !Number.isFinite(r) || r < 0) return null;
    return {
      voltage: i * r,
      current: i,
      resistance: r,
      power: i * i * r,
      formula: t("result.formulaCurrentResistance"),
    };
  }, [current, mode, resistance, t, voltage]);

  function reset() {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setTouched(false);
  }

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
          <div className="space-y-2">
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant={mode === item ? "default" : "outline"}
                  onClick={() => {
                    setMode(item);
                    setTouched(false);
                  }}
                >
                  {t(("type." + item) as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">{t(("type." + mode + "_desc") as never)}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mode !== "currentAndResistance" && (
              <div className="space-y-2">
                <Label htmlFor="power-voltage">{t("field.voltage")}</Label>
                <Input
                  id="power-voltage"
                  type="number"
                  inputMode="decimal"
                  value={voltage}
                  placeholder={t("placeholder.voltage")}
                  onChange={(event) => {
                    setVoltage(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {mode !== "voltageAndResistance" && (
              <div className="space-y-2">
                <Label htmlFor="power-current">{t("field.current")}</Label>
                <Input
                  id="power-current"
                  type="number"
                  inputMode="decimal"
                  value={current}
                  placeholder={t("placeholder.current")}
                  onChange={(event) => {
                    setCurrent(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {mode !== "voltageAndCurrent" && (
              <div className="space-y-2">
                <Label htmlFor="power-resistance">{t("field.resistance")}</Label>
                <Input
                  id="power-resistance"
                  type="number"
                  inputMode="decimal"
                  value={resistance}
                  placeholder={t("placeholder.resistance")}
                  onChange={(event) => {
                    setResistance(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && result === null && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.power")}</p>
                  <p className="text-xl font-semibold text-zinc-900">{formatNumber(result.power)} {t("result.unitPower")}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.voltage")}</p>
                  <p className="text-xl font-semibold text-zinc-900">{formatNumber(result.voltage)} {t("result.unitVoltage")}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.current")}</p>
                  <p className="text-xl font-semibold text-zinc-900">{formatNumber(result.current)} {t("result.unitCurrent")}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.resistance")}</p>
                  <p className="text-xl font-semibold text-zinc-900">{formatNumber(result.resistance)} {t("result.unitResistance")}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{result.formula}</p>
            </div>
          )}
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{item.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => <li key={index}>{step}</li>)}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
