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

function formatNumber(value: number, maximumFractionDigits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

export default function IifymCalculatorIfItFitsYourMacros(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.iifym-calculator-if-it-fits-your-macros");

  const [calories, setCalories] = React.useState("");
  const [proteinPct, setProteinPct] = React.useState("30");
  const [carbsPct, setCarbsPct] = React.useState("40");
  const [fatPct, setFatPct] = React.useState("30");
  const [proteinPerKg, setProteinPerKg] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const caloriesNum = parseFloat(calories);
  const proteinPctNum = parseFloat(proteinPct);
  const carbsPctNum = parseFloat(carbsPct);
  const fatPctNum = parseFloat(fatPct);
  const proteinPerKgNum = parseFloat(proteinPerKg);
  const weightNum = parseFloat(weight);

  const caloriesValid =
    calories !== "" && Number.isFinite(caloriesNum) && caloriesNum > 0;
  const percentageValues = [proteinPctNum, carbsPctNum, fatPctNum];
  const percentagesValid =
    percentageValues.every((value) => Number.isFinite(value) && value >= 0);
  const totalPct = percentageValues.reduce(
    (sum, value) => sum + (Number.isFinite(value) ? value : 0),
    0
  );
  const pctSumValid = Math.abs(totalPct - 100) < 0.01;
  const optionalProteinValid =
    proteinPerKg !== "" && Number.isFinite(proteinPerKgNum) && proteinPerKgNum > 0;
  const optionalWeightValid =
    weight !== "" && Number.isFinite(weightNum) && weightNum > 0;

  const macros = React.useMemo(() => {
    if (!caloriesValid || !percentagesValid || !pctSumValid) return null;

    const protein = (caloriesNum * (proteinPctNum / 100)) / 4;
    const carbs = (caloriesNum * (carbsPctNum / 100)) / 4;
    const fat = (caloriesNum * (fatPctNum / 100)) / 9;
    const altProtein =
      optionalProteinValid && optionalWeightValid
        ? weightNum * proteinPerKgNum
        : null;

    return { protein, carbs, fat, altProtein };
  }, [
    caloriesNum,
    caloriesValid,
    carbsPctNum,
    fatPctNum,
    optionalProteinValid,
    optionalWeightValid,
    pctSumValid,
    percentagesValid,
    proteinPctNum,
    proteinPerKgNum,
    weightNum,
  ]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 5; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
    }
    return arr;
  }, [t]);

  const errorMessage = React.useMemo(() => {
    if (!touched) return null;
    if (!caloriesValid) return t("error.invalidCalories");
    if (!percentagesValid) return t("error.invalidPct");
    if (!pctSumValid) return t("error.pctSum");
    return null;
  }, [caloriesValid, pctSumValid, percentagesValid, t, touched]);

  function reset() {
    setCalories("");
    setProteinPct("30");
    setCarbsPct("40");
    setFatPct("30");
    setProteinPerKg("");
    setWeight("");
    setTouched(false);
  }

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="iifym-calories">{t("field.calories")}</Label>
              <Input
                id="iifym-calories"
                type="number"
                inputMode="decimal"
                min={0}
                step="1"
                value={calories}
                onChange={(e) => {
                  setCalories(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iifym-total">{t("field.totalPct")}</Label>
              <Input id="iifym-total" value={formatNumber(totalPct, 1)} readOnly />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="iifym-protein-pct">{t("field.proteinPct")}</Label>
              <Input
                id="iifym-protein-pct"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={proteinPct}
                onChange={(e) => {
                  setProteinPct(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iifym-carbs-pct">{t("field.carbsPct")}</Label>
              <Input
                id="iifym-carbs-pct"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={carbsPct}
                onChange={(e) => {
                  setCarbsPct(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iifym-fat-pct">{t("field.fatPct")}</Label>
              <Input
                id="iifym-fat-pct"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={fatPct}
                onChange={(e) => {
                  setFatPct(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="iifym-protein-kg">{t("field.proteinPerKg")}</Label>
              <Input
                id="iifym-protein-kg"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={proteinPerKg}
                onChange={(e) => {
                  setProteinPerKg(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iifym-weight">{t("field.weight")}</Label>
              <Input
                id="iifym-weight"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
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

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          {errorMessage === null && macros !== null && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.calories")}: {formatNumber(caloriesNum, 0)}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.protein")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(macros.protein, 1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.carbs")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(macros.carbs, 1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.fat")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(macros.fat, 1)}
                  </div>
                </div>
                {macros.altProtein !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.altProtein")}
                    </div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNumber(macros.altProtein, 1)}
                    </div>
                  </div>
                )}
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {item.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
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
