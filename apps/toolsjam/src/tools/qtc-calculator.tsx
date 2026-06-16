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

type InputType = "heartRate" | "rrInterval";
type Formula = "bazett" | "fridericia" | "framingham";
type QtcCategory = "normal" | "borderline" | "prolonged";

interface QtcResult {
  qtcMs: number;
  rrSec: number;
  category: QtcCategory;
}

const FORMULAS: Formula[] = ["bazett", "fridericia", "framingham"];

function computeQtc(
  qtMs: number,
  inputType: InputType,
  hrOrRr: number,
  formula: Formula,
): QtcResult | null {
  if (!Number.isFinite(qtMs) || qtMs <= 0 || !Number.isFinite(hrOrRr) || hrOrRr <= 0)
    return null;
  const rrSec =
    inputType === "heartRate" ? 60 / hrOrRr : hrOrRr / 1000;
  if (rrSec <= 0) return null;
  let qtcMs: number;
  switch (formula) {
    case "bazett":
      qtcMs = qtMs / Math.sqrt(rrSec);
      break;
    case "fridericia":
      qtcMs = qtMs / Math.pow(rrSec, 1 / 3);
      break;
    case "framingham":
      qtcMs = qtMs + 154 * (1 - rrSec);
      break;
  }
  let category: QtcCategory;
  if (qtcMs < 440) category = "normal";
  else if (qtcMs <= 460) category = "borderline";
  else category = "prolonged";
  return { qtcMs, rrSec, category };
}

export default function QtcCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.qtc-calculator");
  const [qt, setQt] = React.useState("");
  const [inputType, setInputType] = React.useState<InputType>("heartRate");
  const [hrOrRr, setHrOrRr] = React.useState("");
  const [formula, setFormula] = React.useState<Formula>("bazett");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<QtcResult | null>(() => {
    if (!touched) return null;
    return computeQtc(parseFloat(qt), inputType, parseFloat(hrOrRr), formula);
  }, [touched, qt, inputType, hrOrRr, formula]);

  const showError = touched && result === null;

  function reset() {
    setQt("");
    setHrOrRr("");
    setTouched(false);
  }

  function loadExample(q: string, type: InputType, val: string, f: Formula) {
    setQt(q);
    setInputType(type);
    setHrOrRr(val);
    setFormula(f);
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

  const selectClass =
    "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none";

  const categoryColor: Record<QtcCategory, string> = {
    normal: "text-green-700",
    borderline: "text-yellow-700",
    prolonged: "text-red-700",
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
            <Label htmlFor="qtc-qt">{t("field.qt")}</Label>
            <Input
              id="qtc-qt"
              type="number"
              inputMode="decimal"
              value={qt}
              placeholder={t("placeholder.qt")}
              onChange={(e) => { setQt(e.target.value); setTouched(true); }}
            />
            <p className="text-xs text-zinc-500">{t("unit.ms")}</p>
          </div>

          <div className="space-y-2">
            <Label>{t("field.inputType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["heartRate", "rrInterval"] as InputType[]).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={inputType === type ? "default" : "outline"}
                  onClick={() => {
                    setInputType(type);
                    setHrOrRr("");
                    setTouched(false);
                  }}
                >
                  {t(`inputType.${type}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qtc-hrOrRr">
              {inputType === "heartRate" ? t("field.hr") : t("field.rr")}
            </Label>
            <Input
              id="qtc-hrOrRr"
              type="number"
              inputMode="decimal"
              value={hrOrRr}
              placeholder={
                inputType === "heartRate"
                  ? t("placeholder.hr")
                  : t("placeholder.rr")
              }
              onChange={(e) => { setHrOrRr(e.target.value); setTouched(true); }}
            />
            <p className="text-xs text-zinc-500">
              {inputType === "heartRate" ? t("unit.bpm") : t("unit.ms")}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qtc-formula">{t("field.formula")}</Label>
            <select
              id="qtc-formula"
              value={formula}
              onChange={(e) => { setFormula(e.target.value as Formula); setTouched(false); }}
              className={selectClass}
            >
              {FORMULAS.map((f) => (
                <option key={f} value={f}>
                  {t(`formula.${f}` as never)}
                </option>
              ))}
            </select>
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
              <div className="text-2xl font-semibold text-zinc-900">
                {result.qtcMs.toFixed(0)}{" "}
                <span className="text-base font-normal">{t("unit.ms")}</span>
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.rrInterval")}:{" "}
                <span className="font-medium">{(result.rrSec * 1000).toFixed(0)} {t("unit.ms")}</span>
              </div>
              <div className={`text-sm font-semibold ${categoryColor[result.category]}`}>
                {t("result.category")}:{" "}
                {t(`qtcCategory.${result.category}` as never)}
              </div>
              <div className="text-xs text-zinc-500">
                {t(`formula.${formula}_desc` as never)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("360", "heartRate", "75", "bazett")}
          >
            {t("examples.loadNormal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("480", "heartRate", "60", "bazett")}
          >
            {t("examples.loadProlonged")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("350", "heartRate", "120", "fridericia")}
          >
            {t("examples.loadFast")}
          </Button>
        </div>
      </section>

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
