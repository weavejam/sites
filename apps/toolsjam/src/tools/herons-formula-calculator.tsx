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

type Unit = "m" | "cm" | "mm" | "ft" | "in" | "yd";

const UNITS: Unit[] = ["m", "cm", "mm", "ft", "in", "yd"];

function formatValue(value: number): string {
  return value.toFixed(6);
}

export default function HeronsFormulaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.herons-formula-calculator");
  const [sideA, setSideA] = React.useState("");
  const [sideB, setSideB] = React.useState("");
  const [sideC, setSideC] = React.useState("");
  const [unit, setUnit] = React.useState<Unit>("m");
  const [submitted, setSubmitted] = React.useState(false);

  const howtoSteps = t.raw("howto.steps") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const examplesItems = t.raw("examples.items") as {
    input: string;
    output: string;
    note?: string;
  }[];

  const result = React.useMemo(() => {
    if (!submitted) return null;
    const a = Number(sideA);
    const b = Number(sideB);
    const c = Number(sideC);
    if (![a, b, c].every((value) => Number.isFinite(value))) return { error: "invalid" as const };
    if (![a, b, c].every((value) => value > 0)) return { error: "nonPositive" as const };
    if (a + b <= c || a + c <= b || b + c <= a) return { error: "triangle" as const };

    const semiPerimeter = (a + b + c) / 2;
    return {
      area: Math.sqrt(
        semiPerimeter *
          (semiPerimeter - a) *
          (semiPerimeter - b) *
          (semiPerimeter - c),
      ),
      perimeter: a + b + c,
      semiPerimeter,
    };
  }, [sideA, sideB, sideC, submitted]);

  function reset() {
    setSideA("");
    setSideB("");
    setSideC("");
    setUnit("m");
    setSubmitted(false);
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sideA">{t("field.sideA")}</Label>
              <Input
                id="sideA"
                type="number"
                inputMode="decimal"
                value={sideA}
                onChange={(event) => {
                  setSideA(event.target.value);
                  setSubmitted(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sideB">{t("field.sideB")}</Label>
              <Input
                id="sideB"
                type="number"
                inputMode="decimal"
                value={sideB}
                onChange={(event) => {
                  setSideB(event.target.value);
                  setSubmitted(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sideC">{t("field.sideC")}</Label>
              <Input
                id="sideC"
                type="number"
                inputMode="decimal"
                value={sideC}
                onChange={(event) => {
                  setSideC(event.target.value);
                  setSubmitted(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">{t("field.unit")}</Label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value as Unit);
                  setSubmitted(false);
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px]"
              >
                {UNITS.map((option) => (
                  <option key={option} value={option}>
                    {t(`type.unit.${option}` as never)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setSubmitted(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result && "error" in result && (
            <p className="text-sm text-red-600">{t(`error.${result.error}` as never)}</p>
          )}

          {result && !("error" in result) && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="font-semibold text-zinc-900">
                {t("result.area", {
                  value: formatValue(result.area),
                  unit: `${unit}²`,
                })}
              </div>
              <div className="text-zinc-800">
                {t("result.perimeter", {
                  value: formatValue(result.perimeter),
                  unit,
                })}
              </div>
              <div className="text-zinc-800">
                {t("result.semiPerimeter", {
                  value: formatValue(result.semiPerimeter),
                  unit,
                })}
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{example.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
