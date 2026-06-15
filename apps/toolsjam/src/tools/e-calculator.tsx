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

type CalcType = "exponential" | "naturalLog" | "eulerValue";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function toSci(n: number, precision: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toExponential(Math.min(precision, 15));
}

export default function ECalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.e-calculator");
  const [calcType, setCalcType] = React.useState<CalcType>("exponential");
  const [inputStr, setInputStr] = React.useState("");
  const [precisionStr, setPrecisionStr] = React.useState("10");
  const [touched, setTouched] = React.useState(false);

  const CALC_TYPES: CalcType[] = ["exponential", "naturalLog", "eulerValue"];

  const inputNum = parseFloat(inputStr);
  const precision = Math.max(1, Math.min(15, parseInt(precisionStr, 10) || 10));
  const needsInput = calcType !== "eulerValue";
  const inputValid = !needsInput || (inputStr !== "" && Number.isFinite(inputNum));
  const logInputValid = calcType !== "naturalLog" || inputNum > 0;

  const result = React.useMemo(() => {
    if (!inputValid || !logInputValid) return null;
    let value: number;
    let expression: string;
    switch (calcType) {
      case "exponential":
        value = Math.exp(inputNum);
        expression = `e^${inputNum} = ${value.toFixed(precision)}`;
        break;
      case "naturalLog":
        value = Math.log(inputNum);
        expression = `ln(${inputNum}) = ${value.toFixed(precision)}`;
        break;
      case "eulerValue":
        value = Math.E;
        expression = `e = ${value.toFixed(precision)}`;
        break;
    }
    return { value, expression, sci: toSci(value, precision) };
  }, [calcType, inputNum, inputValid, logInputValid, precision]);

  function reset() {
    setInputStr("");
    setPrecisionStr("10");
    setTouched(false);
  }

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

  const showInvalidError = touched && needsInput && inputStr !== "" && !inputValid;
  const showLogError = touched && calcType === "naturalLog" && inputStr !== "" && inputValid && !logInputValid;

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {CALC_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => { setCalcType(ct); setTouched(false); }}
                >
                  {t(`field.${ct}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {needsInput && (
              <div className="space-y-2">
                <Label htmlFor="ec-input">{t("field.inputValue")}</Label>
                <Input
                  id="ec-input"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={inputStr}
                  placeholder={t("placeholder.inputValue")}
                  onChange={(e) => { setInputStr(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="ec-precision">{t("field.precision")}</Label>
              <Input
                id="ec-precision"
                type="number"
                inputMode="numeric"
                min="1"
                max="15"
                value={precisionStr}
                placeholder={t("placeholder.precision")}
                onChange={(e) => { setPrecisionStr(e.target.value); setTouched(true); }}
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

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showLogError && (
            <p className="text-sm text-red-600">{t("error.negativeLog")}</p>
          )}

          {result && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.value")}</div>
                <div className="text-2xl font-bold text-zinc-900 break-all">
                  {result.value.toFixed(precision)}
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.expression")}</div>
                <div className="text-base font-medium text-zinc-800">{result.expression}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.scientificNotation")}</div>
                <div className="text-base font-medium text-zinc-800">{result.sci}</div>
              </div>
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
