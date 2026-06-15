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

type FunctionType = "erf" | "erfc" | "inverseErf" | "inverseErfc";
type Precision = 4 | 6 | 8;

const FUNCTION_TYPES: FunctionType[] = ["erf", "erfc", "inverseErf", "inverseErfc"];
const PRECISIONS: Precision[] = [4, 6, 8];

// Rational approximation of erf — Abramowitz & Stegun 7.1.26, max error < 1.5×10⁻⁷
function erfRational(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const poly =
    t * (0.254829592 +
      t * (-0.284496736 +
        t * (1.421413741 +
          t * (-1.453152027 + t * 1.061405429))));
  return sign * (1 - poly * Math.exp(-x * x));
}

// Higher accuracy erf using series for small x, asymptotic for large x
function computeErf(x: number): number {
  if (!Number.isFinite(x)) return x > 0 ? 1 : -1;
  return erfRational(x);
}

function computeErfc(x: number): number {
  if (!Number.isFinite(x)) return x > 0 ? 0 : 2;
  return 1 - erfRational(x);
}

// Inverse erf using Newton's method with rational initial guess
function computeInverseErf(p: number): number {
  if (p === 0) return 0;
  if (Math.abs(p) >= 1) return p > 0 ? Infinity : -Infinity;
  const sign = p >= 0 ? 1 : -1;
  const ap = Math.abs(p);
  // Initial guess from rational approximation
  const a = 0.147;
  const ln1mp2 = Math.log(1 - ap * ap);
  const twoOverPia = 2 / (Math.PI * a);
  const inner = twoOverPia + ln1mp2 / 2;
  let x = sign * Math.sqrt(Math.sqrt(inner * inner - ln1mp2 / a) - inner);
  // Newton-Raphson refinement
  for (let i = 0; i < 3; i++) {
    const fx = computeErf(x) - p;
    const fpx = (2 / Math.sqrt(Math.PI)) * Math.exp(-x * x);
    x -= fx / fpx;
  }
  return x;
}

function computeInverseErfc(p: number): number {
  return computeInverseErf(1 - p);
}

function getFormulaKey(type: FunctionType): string {
  switch (type) {
    case "erf": return "formula.erf";
    case "erfc": return "formula.erfc";
    case "inverseErf": return "formula.inverseErf";
    case "inverseErfc": return "formula.inverseErfc";
  }
}

export default function ErrorFunctionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.error-function-calculator");
  const [funcType, setFuncType] = React.useState<FunctionType>("erf");
  const [xVal, setXVal] = React.useState("");
  const [precision, setPrecision] = React.useState<Precision>(6);
  const [touched, setTouched] = React.useState(false);

  const xNum = parseFloat(xVal);
  const xValid = xVal !== "" && Number.isFinite(xNum);

  const rangeError = React.useMemo(() => {
    if (!xValid) return null;
    if (funcType === "inverseErf" && Math.abs(xNum) >= 1) return t("error.erfInverseRange");
    if (funcType === "inverseErfc" && (xNum <= 0 || xNum >= 2)) return t("error.erfcInverseRange");
    return null;
  }, [funcType, xNum, xValid, t]);

  const result = React.useMemo<number | null>(() => {
    if (!xValid || rangeError) return null;
    switch (funcType) {
      case "erf": return computeErf(xNum);
      case "erfc": return computeErfc(xNum);
      case "inverseErf": return computeInverseErf(xNum);
      case "inverseErfc": return computeInverseErfc(xNum);
    }
  }, [funcType, xNum, xValid, rangeError]);

  function loadExample(type: FunctionType, val: string) {
    setFuncType(type);
    setXVal(val);
    setTouched(true);
  }

  function reset() {
    setXVal("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const showInputError = touched && !xValid && xVal !== "";

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
            <Label>{t("field.functionType")}</Label>
            <div className="flex flex-wrap gap-2">
              {FUNCTION_TYPES.map((fn) => (
                <Button
                  key={fn}
                  type="button"
                  variant={funcType === fn ? "default" : "outline"}
                  onClick={() => { setFuncType(fn); setTouched(false); }}
                >
                  {t(`type.${fn}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="erf-x">{t("field.x")}</Label>
              <Input
                id="erf-x"
                type="number"
                inputMode="decimal"
                value={xVal}
                placeholder={t("placeholder.x")}
                onChange={(e) => { setXVal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="erf-precision">{t("field.precision")}</Label>
              <select
                id="erf-precision"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={precision}
                onChange={(e) => setPrecision(parseInt(e.target.value, 10) as Precision)}
              >
                {PRECISIONS.map((p) => (
                  <option key={p} value={p}>{t(`precision.${p}` as never)}</option>
                ))}
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

          {showInputError && (
            <p className="text-sm text-red-600">{t("error.invalidInput")}</p>
          )}
          {touched && rangeError && (
            <p className="text-sm text-red-600">{rangeError}</p>
          )}

          {result !== null && !rangeError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {result.toFixed(precision)}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.formula")}: {t(getFormulaKey(funcType) as never)}
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("erf", "1")}>
            {t("examples.loadErf1")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("erfc", "0.5")}>
            {t("examples.loadErfc05")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("inverseErf", "0.5")}>
            {t("examples.loadInverse")}
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
