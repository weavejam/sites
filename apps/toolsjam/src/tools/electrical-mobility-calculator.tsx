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

type Mode = "findMobility" | "findDriftVelocity" | "findElectricField";

const MODES: Mode[] = ["findMobility", "findDriftVelocity", "findElectricField"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface MobilityResult {
  mobility: number;
  driftVelocity: number;
  electricField: number;
  conductivity: number | null;
  currentDensity: number | null;
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

export default function ElectricalMobilityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.electrical-mobility-calculator");
  const [mode, setMode] = React.useState<Mode>("findMobility");
  const [mobility, setMobility] = React.useState("");
  const [driftVelocity, setDriftVelocity] = React.useState("");
  const [electricField, setElectricField] = React.useState("");
  const [carrierConcentration, setCarrierConcentration] = React.useState("");
  const [charge, setCharge] = React.useState("");
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

  const result = React.useMemo<MobilityResult | null>(() => {
    const mu = mobility === "" ? NaN : parseFloat(mobility);
    const vd = driftVelocity === "" ? NaN : parseFloat(driftVelocity);
    const e = electricField === "" ? NaN : parseFloat(electricField);
    const n = carrierConcentration === "" ? NaN : parseFloat(carrierConcentration);
    const q = charge === "" ? NaN : parseFloat(charge);

    let solvedMobility = mu;
    let solvedDriftVelocity = vd;
    let solvedElectricField = e;

    if (mode === "findMobility") {
      if (!Number.isFinite(vd) || !Number.isFinite(e) || e === 0) return null;
      solvedMobility = vd / e;
    } else if (mode === "findDriftVelocity") {
      if (!Number.isFinite(mu) || !Number.isFinite(e)) return null;
      solvedDriftVelocity = mu * e;
    } else {
      if (!Number.isFinite(vd) || !Number.isFinite(mu) || mu === 0) return null;
      solvedElectricField = vd / mu;
    }

    if (![solvedMobility, solvedDriftVelocity, solvedElectricField].every(Number.isFinite)) return null;

    const conductivity = Number.isFinite(n) && Number.isFinite(q) ? n * q * solvedMobility : null;
    const currentDensity = conductivity !== null ? conductivity * solvedElectricField : null;

    return {
      mobility: solvedMobility,
      driftVelocity: solvedDriftVelocity,
      electricField: solvedElectricField,
      conductivity,
      currentDensity,
      formula: t(
        mode === "findMobility"
          ? "result.formulaMobility"
          : mode === "findDriftVelocity"
            ? "result.formulaDriftVelocity"
            : "result.formulaElectricField",
      ),
    };
  }, [carrierConcentration, charge, driftVelocity, electricField, mobility, mode, t]);

  function reset() {
    setMobility("");
    setDriftVelocity("");
    setElectricField("");
    setCarrierConcentration("");
    setCharge("");
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
            {mode !== "findDriftVelocity" && (
              <div className="space-y-2">
                <Label htmlFor="mobility-vd">{t("field.driftVelocity")}</Label>
                <Input
                  id="mobility-vd"
                  type="number"
                  inputMode="decimal"
                  value={driftVelocity}
                  placeholder={t("placeholder.driftVelocity")}
                  onChange={(event) => {
                    setDriftVelocity(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {mode !== "findMobility" && (
              <div className="space-y-2">
                <Label htmlFor="mobility-mu">{t("field.mobility")}</Label>
                <Input
                  id="mobility-mu"
                  type="number"
                  inputMode="decimal"
                  value={mobility}
                  placeholder={t("placeholder.mobility")}
                  onChange={(event) => {
                    setMobility(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {mode !== "findElectricField" && (
              <div className="space-y-2">
                <Label htmlFor="mobility-e">{t("field.electricField")}</Label>
                <Input
                  id="mobility-e"
                  type="number"
                  inputMode="decimal"
                  value={electricField}
                  placeholder={t("placeholder.electricField")}
                  onChange={(event) => {
                    setElectricField(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-lg border border-zinc-200 p-4">
            <div className="space-y-1">
              <Label>{t("field.optionalInputs")}</Label>
              <p className="text-sm text-zinc-500">{t("field.optionalHint")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mobility-n">{t("field.carrierConcentration")}</Label>
                <Input
                  id="mobility-n"
                  type="number"
                  inputMode="decimal"
                  value={carrierConcentration}
                  placeholder={t("placeholder.carrierConcentration")}
                  onChange={(event) => {
                    setCarrierConcentration(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobility-q">{t("field.charge")}</Label>
                <Input
                  id="mobility-q"
                  type="number"
                  inputMode="decimal"
                  value={charge}
                  placeholder={t("placeholder.charge")}
                  onChange={(event) => {
                    setCharge(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && result === null && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.mobility")}</p>
                  <p className="text-xl font-semibold text-zinc-900">{formatNumber(result.mobility)} {t("result.unitMobility")}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.driftVelocity")}</p>
                  <p className="text-xl font-semibold text-zinc-900">{formatNumber(result.driftVelocity)} {t("result.unitDriftVelocity")}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.electricField")}</p>
                  <p className="text-xl font-semibold text-zinc-900">{formatNumber(result.electricField)} {t("result.unitElectricField")}</p>
                </div>
              </div>
              {result.conductivity !== null && result.currentDensity !== null && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-zinc-500">{t("result.conductivity")}</p>
                    <p className="text-lg font-semibold text-zinc-900">{formatNumber(result.conductivity)} {t("result.unitConductivity")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">{t("result.currentDensity")}</p>
                    <p className="text-lg font-semibold text-zinc-900">{formatNumber(result.currentDensity)} {t("result.unitCurrentDensity")}</p>
                  </div>
                </div>
              )}
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
