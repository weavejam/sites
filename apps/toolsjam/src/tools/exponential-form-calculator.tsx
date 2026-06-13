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

type Mode = "standardToExponential" | "exponentialToStandard";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface ConversionResult {
  expression: string;
}

function formatNumber(value: number, maxDigits = 12): string {
  if (value === Infinity) return "∞";
  if (value === -Infinity) return "-∞";
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits: maxDigits });
}

function toScientific(value: number): { coefficient: string; exponent: number } {
  if (value === 0) return { coefficient: "0", exponent: 0 };
  const [coefficientRaw, exponentRaw] = value.toExponential(10).split("e");
  return {
    coefficient: parseFloat(coefficientRaw).toString(),
    exponent: parseInt(exponentRaw ?? "0", 10),
  };
}

export default function ExponentialFormCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.exponential-form-calculator");
  const [mode, setMode] = React.useState<Mode>("standardToExponential");
  const [numberValue, setNumberValue] = React.useState("");
  const [coefficient, setCoefficient] = React.useState("");
  const [exponent, setExponent] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const numberNum = parseFloat(numberValue);
  const coefficientNum = parseFloat(coefficient);
  const exponentNum = parseFloat(exponent);

  const result = React.useMemo<ConversionResult | null>(() => {
    if (mode === "standardToExponential") {
      if (numberValue.trim() === "" || !Number.isFinite(numberNum)) return null;
      const scientific = toScientific(numberNum);
      return {
        expression: t("result.standardToExponential", {
          input: formatNumber(numberNum),
          coefficient: scientific.coefficient,
          exponent: scientific.exponent,
        }),
      };
    }

    if (
      coefficient.trim() === "" ||
      exponent.trim() === "" ||
      !Number.isFinite(coefficientNum) ||
      !Number.isFinite(exponentNum) ||
      !Number.isInteger(exponentNum)
    ) {
      return null;
    }

    const standard = coefficientNum * Math.pow(10, exponentNum);
    if (Number.isNaN(standard)) return null;

    return {
      expression: t("result.exponentialToStandard", {
        coefficient: formatNumber(coefficientNum),
        exponent: exponentNum,
        result: formatNumber(standard),
      }),
    };
  }, [
    coefficient,
    coefficientNum,
    exponent,
    exponentNum,
    mode,
    numberNum,
    numberValue,
    t,
  ]);

  function reset() {
    setMode("standardToExponential");
    setNumberValue("");
    setCoefficient("");
    setExponent("");
    setTouched(false);
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
        applicationCategory: "EducationalApplication",
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

  const showError = touched && result === null;

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
            <Label>{t("field.mode")}</Label>
            <div className="flex flex-wrap gap-2">
              {(
                ["standardToExponential", "exponentialToStandard"] as Mode[]
              ).map((item) => (
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
          </div>

          {mode === "standardToExponential" ? (
            <div className="space-y-2">
              <Label htmlFor="expform-number">{t("field.number")}</Label>
              <Input
                id="expform-number"
                type="number"
                inputMode="decimal"
                value={numberValue}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setNumberValue(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="expform-coefficient">{t("field.coefficient")}</Label>
                <Input
                  id="expform-coefficient"
                  type="number"
                  inputMode="decimal"
                  value={coefficient}
                  placeholder={t("placeholder.coefficient")}
                  onChange={(e) => {
                    setCoefficient(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expform-exponent">{t("field.exponent")}</Label>
                <Input
                  id="expform-exponent"
                  type="number"
                  inputMode="numeric"
                  value={exponent}
                  placeholder={t("placeholder.exponent")}
                  onChange={(e) => {
                    setExponent(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

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

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {result.expression}
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">
                    {example.note ?? ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
