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

type Mode = "electricField" | "force" | "electricPotential";

const MODES: Mode[] = ["electricField", "force", "electricPotential"];
const COULOMB_CONSTANT = 8.9875517923e9;

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface ResultItem {
  label: string;
  value: number;
  unit: string;
}

interface CalculationResult {
  primary: ResultItem;
  secondary: ResultItem[];
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

export default function ElectricFieldCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.electric-field-calculator");
  const [mode, setMode] = React.useState<Mode>("electricField");
  const [charge, setCharge] = React.useState("");
  const [charge1, setCharge1] = React.useState("");
  const [charge2, setCharge2] = React.useState("");
  const [distance, setDistance] = React.useState("");
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

  const result = React.useMemo<CalculationResult | null>(() => {
    const q = charge === "" ? NaN : parseFloat(charge);
    const q1 = charge1 === "" ? NaN : parseFloat(charge1);
    const q2 = charge2 === "" ? NaN : parseFloat(charge2);
    const r = distance === "" ? NaN : parseFloat(distance);

    if (!Number.isFinite(r) || r <= 0) return null;

    if (mode === "electricField") {
      if (!Number.isFinite(q)) return null;
      const electricField = (COULOMB_CONSTANT * q) / (r * r);
      const electricPotential = (COULOMB_CONSTANT * q) / r;
      return {
        primary: {
          label: t("result.electricField"),
          value: electricField,
          unit: t("result.unitElectricField"),
        },
        secondary: [
          {
            label: t("result.electricPotential"),
            value: electricPotential,
            unit: t("result.unitElectricPotential"),
          },
        ],
        formula: t("result.formulaElectricField"),
      };
    }

    if (mode === "force") {
      if (!Number.isFinite(q1) || !Number.isFinite(q2)) return null;
      const force = (COULOMB_CONSTANT * q1 * q2) / (r * r);
      return {
        primary: {
          label: t("result.force"),
          value: force,
          unit: t("result.unitForce"),
        },
        secondary: [],
        formula: t("result.formulaForce"),
      };
    }

    if (!Number.isFinite(q)) return null;
    const electricPotential = (COULOMB_CONSTANT * q) / r;
    const electricField = (COULOMB_CONSTANT * q) / (r * r);
    return {
      primary: {
        label: t("result.electricPotential"),
        value: electricPotential,
        unit: t("result.unitElectricPotential"),
      },
      secondary: [
        {
          label: t("result.electricField"),
          value: electricField,
          unit: t("result.unitElectricField"),
        },
      ],
      formula: t("result.formulaElectricPotential"),
    };
  }, [charge, charge1, charge2, distance, mode, t]);

  function reset() {
    setCharge("");
    setCharge1("");
    setCharge2("");
    setDistance("");
    setTouched(false);
  }

  function loadExample(
    nextMode: Mode,
    values: { charge?: string; charge1?: string; charge2?: string; distance: string },
  ) {
    setMode(nextMode);
    setCharge(values.charge ?? "");
    setCharge1(values.charge1 ?? "");
    setCharge2(values.charge2 ?? "");
    setDistance(values.distance);
    setTouched(true);
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
                  {t(`type.${item}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">{t(`type.${mode}_desc` as never)}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mode === "force" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="ef-charge-1">{t("field.charge1")}</Label>
                  <Input
                    id="ef-charge-1"
                    type="number"
                    inputMode="decimal"
                    value={charge1}
                    placeholder={t("placeholder.charge1")}
                    onChange={(event) => {
                      setCharge1(event.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ef-charge-2">{t("field.charge2")}</Label>
                  <Input
                    id="ef-charge-2"
                    type="number"
                    inputMode="decimal"
                    value={charge2}
                    placeholder={t("placeholder.charge2")}
                    onChange={(event) => {
                      setCharge2(event.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="ef-charge">{t("field.charge")}</Label>
                <Input
                  id="ef-charge"
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
            )}

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ef-distance">{t("field.distance")}</Label>
              <Input
                id="ef-distance"
                type="number"
                inputMode="decimal"
                value={distance}
                placeholder={t("placeholder.distance")}
                onChange={(event) => {
                  setDistance(event.target.value);
                  setTouched(true);
                }}
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

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div>
                <p className="text-sm text-zinc-500">{result.primary.label}</p>
                <p className="text-2xl font-semibold text-zinc-900">
                  {formatNumber(result.primary.value)} {result.primary.unit}
                </p>
              </div>
              {result.secondary.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.secondary.map((item) => (
                    <div key={item.label}>
                      <p className="text-sm text-zinc-500">{item.label}</p>
                      <p className="text-xl font-semibold text-zinc-900">
                        {formatNumber(item.value)} {item.unit}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-zinc-500">{result.formula}</p>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("electricField", { charge: "1e-9", distance: "1" })}
          >
            {t("button.loadFieldExample")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("force", { charge1: "2e-6", charge2: "3e-6", distance: "0.2" })
            }
          >
            {t("button.loadForceExample")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("electricPotential", { charge: "4e-9", distance: "0.5" })}
          >
            {t("button.loadPotentialExample")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
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
