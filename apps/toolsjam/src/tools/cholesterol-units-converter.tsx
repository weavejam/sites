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

interface FaqItem {
  q: string;
  a: string;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

type CholType = "total" | "hdl" | "ldl" | "triglycerides";
type Unit = "mgdl" | "mmoll" | "mgl";

// Conversion factors: mg/dL <-> mmol/L
// For Total, HDL, LDL: 1 mmol/L = 38.67 mg/dL
// For Triglycerides: 1 mmol/L = 88.57 mg/dL
// mg/L = mg/dL * 10
function getMmolFactor(type: CholType): number {
  return type === "triglycerides" ? 88.57 : 38.67;
}

interface ConversionResult {
  mgdl: number;
  mmoll: number;
  mgl: number;
}

function convert(value: number, fromUnit: Unit, type: CholType): ConversionResult {
  const factor = getMmolFactor(type);
  let mgdl: number;
  if (fromUnit === "mgdl") {
    mgdl = value;
  } else if (fromUnit === "mmoll") {
    mgdl = value * factor;
  } else {
    mgdl = value / 10;
  }
  return {
    mgdl,
    mmoll: mgdl / factor,
    mgl: mgdl * 10,
  };
}

const CHOL_TYPES: CholType[] = ["total", "hdl", "ldl", "triglycerides"];
const UNITS: Unit[] = ["mgdl", "mmoll", "mgl"];

export default function CholesterolUnitsConverter(_props: { locale: Locale }) {
  const t = useTranslations("tool.cholesterol-units-converter");

  const [cholType, setCholType] = React.useState<CholType>("total");
  const [value, setValue] = React.useState("");
  const [fromUnit, setFromUnit] = React.useState<Unit>("mgdl");
  const [touched, setTouched] = React.useState(false);

  const valueNum = parseFloat(value);
  const valueValid = value !== "" && Number.isFinite(valueNum) && valueNum >= 0;

  const result = React.useMemo<ConversionResult | null>(() => {
    if (!valueValid) return null;
    return convert(valueNum, fromUnit, cholType);
  }, [valueValid, valueNum, fromUnit, cholType]);

  function reset() {
    setValue(""); setTouched(false);
  }

  function loadExample(type: CholType, val: string, unit: Unit) {
    setCholType(type); setValue(val); setFromUnit(unit); setTouched(true);
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
        applicationCategory: "HealthApplication",
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

  const showError = touched && !valueValid;

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
              <Label htmlFor="cuc-type">{t("field.type")}</Label>
              <select
                id="cuc-type"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={cholType}
                onChange={(e) => { setCholType(e.target.value as CholType); setTouched(false); }}
              >
                {CHOL_TYPES.map((tp) => (
                  <option key={tp} value={tp}>{t(`type.${tp}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuc-unit">{t("field.unit")}</Label>
              <select
                id="cuc-unit"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={fromUnit}
                onChange={(e) => { setFromUnit(e.target.value as Unit); setTouched(false); }}
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>{t(`unit.${u}` as never)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuc-value">{t("field.value")}</Label>
            <Input
              id="cuc-value"
              type="number"
              inputMode="decimal"
              min="0"
              value={value}
              placeholder={t("placeholder.value")}
              onChange={(e) => { setValue(e.target.value); setTouched(true); }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.convert")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("unit.mgdl")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.mgdl.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("unit.mmoll")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.mmoll.toFixed(3)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("unit.mgl")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.mgl.toFixed(1)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("total", "200", "mgdl")}>
            {t("examples.loadTotal")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("hdl", "1.3", "mmoll")}>
            {t("examples.loadHdl")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("triglycerides", "2000", "mgl")}>
            {t("examples.loadTrig")}
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
