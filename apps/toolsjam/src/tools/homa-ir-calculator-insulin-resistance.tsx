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

type GlucoseUnit = "mgdl" | "mmol";
type InsulinUnit = "uiml" | "pmol";
type IrCategory = "normal" | "mild" | "moderate" | "severe";

interface HomaResult {
  score: number;
  category: IrCategory;
}

function computeHomaIr(
  glucose: number,
  glucoseUnit: GlucoseUnit,
  insulin: number,
  insulinUnit: InsulinUnit,
): HomaResult | null {
  if (
    !Number.isFinite(glucose) ||
    !Number.isFinite(insulin) ||
    glucose <= 0 ||
    insulin <= 0
  )
    return null;
  // Convert to mmol/L
  const glucoseMmol = glucoseUnit === "mgdl" ? glucose / 18 : glucose;
  // Convert to μU/mL
  const insulinUiml = insulinUnit === "pmol" ? insulin * 0.167 : insulin;
  const score = (glucoseMmol * insulinUiml) / 22.5;
  let category: IrCategory;
  if (score < 1.0) category = "normal";
  else if (score < 2.5) category = "mild";
  else if (score <= 5.0) category = "moderate";
  else category = "severe";
  return { score, category };
}

export default function HomaIrCalculatorInsulinResistance(
  _props: { locale: Locale },
) {
  const t = useTranslations("tool.homa-ir-calculator-insulin-resistance");
  const [glucose, setGlucose] = React.useState("");
  const [glucoseUnit, setGlucoseUnit] = React.useState<GlucoseUnit>("mgdl");
  const [insulin, setInsulin] = React.useState("");
  const [insulinUnit, setInsulinUnit] = React.useState<InsulinUnit>("uiml");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<HomaResult | null>(() => {
    return computeHomaIr(
      parseFloat(glucose),
      glucoseUnit,
      parseFloat(insulin),
      insulinUnit,
    );
  }, [glucose, glucoseUnit, insulin, insulinUnit]);

  function reset() {
    setGlucose("");
    setInsulin("");
    setGlucoseUnit("mgdl");
    setInsulinUnit("uiml");
    setTouched(false);
  }

  function loadExample(g: string, i: string) {
    setGlucose(g);
    setInsulin(i);
    setGlucoseUnit("mgdl");
    setInsulinUnit("uiml");
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

  const showError =
    touched && (glucose === "" || insulin === "" || result === null);

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
              <Label htmlFor="homa-glucose">{t("field.glucose")}</Label>
              <Input
                id="homa-glucose"
                type="number"
                inputMode="decimal"
                value={glucose}
                placeholder={t("placeholder.glucose")}
                onChange={(e) => {
                  setGlucose(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homa-glucose-unit">{t("field.glucoseUnit")}</Label>
              <select
                id="homa-glucose-unit"
                value={glucoseUnit}
                onChange={(e) => setGlucoseUnit(e.target.value as GlucoseUnit)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
              >
                <option value="mgdl">{t("glucoseUnit.mgdl")}</option>
                <option value="mmol">{t("glucoseUnit.mmol")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="homa-insulin">{t("field.insulin")}</Label>
              <Input
                id="homa-insulin"
                type="number"
                inputMode="decimal"
                value={insulin}
                placeholder={t("placeholder.insulin")}
                onChange={(e) => {
                  setInsulin(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homa-insulin-unit">{t("field.insulinUnit")}</Label>
              <select
                id="homa-insulin-unit"
                value={insulinUnit}
                onChange={(e) => setInsulinUnit(e.target.value as InsulinUnit)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
              >
                <option value="uiml">{t("insulinUnit.uiml")}</option>
                <option value="pmol">{t("insulinUnit.pmol")}</option>
              </select>
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

          {result !== null && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.score")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.score.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.category")}
                  </div>
                  <div className="text-base font-medium text-zinc-900">
                    {t(`category.${result.category}` as never)}
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
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
            onClick={() => loadExample("85", "5")}
          >
            {t("examples.loadNormal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("105", "12")}
          >
            {t("examples.loadMild")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("120", "18.5")}
          >
            {t("examples.loadModerate")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
