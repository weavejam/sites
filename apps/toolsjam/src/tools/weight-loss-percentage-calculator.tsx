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

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function WeightLossPercentageCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.weight-loss-percentage-calculator");

  const [initialWeight, setInitialWeight] = React.useState("");
  const [currentWeight, setCurrentWeight] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState<"lbs" | "kg">("lbs");
  const [height, setHeight] = React.useState("");
  const [timePeriod, setTimePeriod] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    const iw = parseFloat(initialWeight);
    const cw = parseFloat(currentWeight);
    if (!initialWeight || !currentWeight || !Number.isFinite(iw) || !Number.isFinite(cw) || iw <= 0 || cw <= 0 || cw >= iw) return null;

    const lostAmount = iw - cw;
    const lostPct = (lostAmount / iw) * 100;

    // Convert weight to kg for BMI calculation
    const iwKg = weightUnit === "lbs" ? iw * 0.453592 : iw;
    const cwKg = weightUnit === "lbs" ? cw * 0.453592 : cw;

    // BMI (height optional – could be feet decimal like 5.8)
    let bmiInitial: number | null = null;
    let bmiCurrent: number | null = null;
    const h = parseFloat(height);
    if (height && Number.isFinite(h) && h > 0) {
      // Determine unit: if < 3 assume meters, if 3..8 assume feet decimal, if > 8 assume cm
      let hMeters: number;
      if (h < 3) hMeters = h;
      else if (h <= 8) {
        const feet = Math.floor(h);
        const inchFraction = (h - feet) * 10;
        hMeters = (feet * 12 + inchFraction) * 0.0254;
      } else hMeters = h / 100;
      if (hMeters > 0.5) {
        bmiInitial = iwKg / (hMeters * hMeters);
        bmiCurrent = cwKg / (hMeters * hMeters);
      }
    }

    let ratePerWeek: number | null = null;
    const tp = parseFloat(timePeriod);
    if (timePeriod && Number.isFinite(tp) && tp > 0) {
      ratePerWeek = lostAmount / tp;
    }

    return { lostAmount, lostPct, bmiInitial, bmiCurrent, ratePerWeek };
  }, [initialWeight, currentWeight, weightUnit, height, timePeriod]);

  function bmiCategory(bmi: number): string {
    if (bmi < 18.5) return t("bmiCategory.underweight");
    if (bmi < 25) return t("bmiCategory.normal");
    if (bmi < 30) return t("bmiCategory.overweight");
    return t("bmiCategory.obese");
  }

  function reset() {
    setInitialWeight("");
    setCurrentWeight("");
    setWeightUnit("lbs");
    setHeight("");
    setTimePeriod("");
    setTouched(false);
  }

  function loadExample(iw: string, cw: string, h: string, tp: string, wu: "lbs" | "kg" = "lbs") {
    setInitialWeight(iw);
    setCurrentWeight(cw);
    setWeightUnit(wu);
    setHeight(h);
    setTimePeriod(tp);
    setTouched(true);
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

  const hasError = touched && !result;

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wlp-iw">{t("field.initialWeight")}</Label>
              <div className="flex gap-2">
                <Input
                  id="wlp-iw"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("placeholder.weight")}
                  value={initialWeight}
                  onChange={(e) => { setInitialWeight(e.target.value); setTouched(true); }}
                  className="flex-1"
                />
                <select
                  className="flex h-9 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-xs outline-none focus-visible:border-ring"
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as "lbs" | "kg")}
                >
                  <option value="lbs">{t("type.weightUnit.lbs")}</option>
                  <option value="kg">{t("type.weightUnit.kg")}</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wlp-cw">{t("field.currentWeight")}</Label>
              <Input
                id="wlp-cw"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.weight")}
                value={currentWeight}
                onChange={(e) => { setCurrentWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wlp-h">{t("field.height")}</Label>
              <Input
                id="wlp-h"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.height")}
                value={height}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wlp-tp">{t("field.timePeriod")}</Label>
              <Input
                id="wlp-tp"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.weeks")}
                value={timePeriod}
                onChange={(e) => { setTimePeriod(e.target.value); setTouched(true); }}
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

          {hasError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.lostPercent")}</div>
                  <div className="text-2xl font-semibold">{fmt(result.lostPct)}<span className="text-sm font-normal">%</span></div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.lostAmount")}</div>
                  <div className="text-2xl font-semibold">{fmt(result.lostAmount)} <span className="text-sm font-normal">{t("unit.weight")}</span></div>
                </div>
                {result.ratePerWeek !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.rate")}</div>
                    <div className="text-2xl font-semibold">{fmt(result.ratePerWeek)} <span className="text-sm font-normal">{t("unit.perWeek")}</span></div>
                  </div>
                )}
                {result.bmiInitial !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.bmiInitial")}</div>
                    <div className="text-lg font-semibold">{fmt(result.bmiInitial)} <span className="text-xs font-normal text-zinc-500">({bmiCategory(result.bmiInitial)})</span></div>
                  </div>
                )}
                {result.bmiCurrent !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.bmiCurrent")}</div>
                    <div className="text-lg font-semibold">{fmt(result.bmiCurrent)} <span className="text-xs font-normal text-zinc-500">({bmiCategory(result.bmiCurrent)})</span></div>
                  </div>
                )}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("200", "185", "5.9", "12")}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("250", "200", "6", "24")}>
            {t("examples.loadSignificant")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("160", "150", "5.6", "16")}>
            {t("examples.loadGradual")}
          </Button>
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
