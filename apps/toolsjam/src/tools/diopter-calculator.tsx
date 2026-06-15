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

type CalcType = "focalToDiopter" | "diopterToFocal";
type FocalUnit = "m" | "cm" | "mm" | "in";

const FOCAL_UNITS: FocalUnit[] = ["m", "cm", "mm", "in"];

function toMetres(value: number, unit: FocalUnit): number {
  switch (unit) {
    case "m": return value;
    case "cm": return value / 100;
    case "mm": return value / 1000;
    case "in": return value * 0.0254;
  }
}

function fromMetres(metres: number, unit: FocalUnit): number {
  switch (unit) {
    case "m": return metres;
    case "cm": return metres * 100;
    case "mm": return metres * 1000;
    case "in": return metres / 0.0254;
  }
}

function parseValues(input: string): number[] | null {
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return null;
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

interface DiopterResult {
  totalDiopter: number;
  focalLengthM: number;
  individualDiopters?: number[];
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function DiopterCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.diopter-calculator");

  const [calcType, setCalcType] = React.useState<CalcType>("focalToDiopter");
  const [focalUnit, setFocalUnit] = React.useState<FocalUnit>("mm");
  const [inputValue, setInputValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<DiopterResult | null>(() => {
    const vals = parseValues(inputValue);
    if (!vals) return null;

    if (calcType === "focalToDiopter") {
      if (vals.some((v) => v === 0)) return null;
      const diopters = vals.map((f) => 1 / toMetres(f, focalUnit));
      const totalDiopter = diopters.reduce((a, b) => a + b, 0);
      return {
        totalDiopter,
        focalLengthM: totalDiopter !== 0 ? 1 / totalDiopter : NaN,
        individualDiopters: diopters.length > 1 ? diopters : undefined,
      };
    } else {
      if (vals.some((v) => v === 0)) return null;
      const totalDiopter = vals.reduce((a, b) => a + b, 0);
      return {
        totalDiopter,
        focalLengthM: totalDiopter !== 0 ? 1 / totalDiopter : NaN,
      };
    }
  }, [inputValue, calcType, focalUnit]);

  function reset() {
    setInputValue("");
    setTouched(false);
  }

  function loadExample(type: CalcType, unit: FocalUnit, value: string) {
    setCalcType(type);
    setFocalUnit(unit);
    setInputValue(value);
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
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const showError = touched && result === null;
  const inputLabel = calcType === "focalToDiopter"
    ? t("field.focalLengths")
    : t("field.diopters");
  const inputPlaceholder = calcType === "focalToDiopter"
    ? t("placeholder.focalLengths")
    : t("placeholder.diopters");

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
            <Label>{t("field.calculationType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["focalToDiopter", "diopterToFocal"] as CalcType[]).map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => { setCalcType(ct); setTouched(false); setInputValue(""); }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {calcType === "focalToDiopter" && (
            <div className="space-y-2">
              <Label>{t("field.focalLengthUnit")}</Label>
              <div className="flex flex-wrap gap-2">
                {FOCAL_UNITS.map((u) => (
                  <Button
                    key={u}
                    type="button"
                    variant={focalUnit === u ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFocalUnit(u)}
                  >
                    {t(`unit.${u}` as never)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="diopter-input">{inputLabel}</Label>
            <Input
              id="diopter-input"
              type="text"
              inputMode="decimal"
              value={inputValue}
              placeholder={inputPlaceholder}
              onChange={(e) => { setInputValue(e.target.value); setTouched(true); }}
            />
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
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalDiopter")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.totalDiopter, 4)} {t("result.unitD")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.focalLength")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.focalLengthM, 6)} {t("result.unitM")}
                    {" / "}{fmt(fromMetres(result.focalLengthM, "mm"), 4)} {t("result.unitMm")}
                  </div>
                </div>
              </div>
              {result.individualDiopters && (
                <div className="text-xs text-zinc-500">
                  {result.individualDiopters.map((d, i) => `D${i + 1} = ${fmt(d, 4)} D`).join("  +  ")}
                </div>
              )}
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
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
            onClick={() => loadExample("focalToDiopter", "mm", "50")}
          >
            {t("examples.loadSingleFocal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("diopterToFocal", "mm", "2")}
          >
            {t("examples.loadSingleDiopter")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("focalToDiopter", "mm", "100, 200")}
          >
            {t("examples.loadMultiple")}
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
