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

type Gender = "male" | "female";
type Frame = "small" | "medium" | "large";
type Formula = "devine" | "robinson" | "miller" | "hamwi" | "bmi";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

function frameFactor(frame: Frame): number {
  if (frame === "small") return 0.9;
  if (frame === "large") return 1.1;
  return 1;
}

export default function IdealWeightCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ideal-weight-calculator");

  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [frame, setFrame] = React.useState<Frame>("medium");
  const [formula, setFormula] = React.useState<Formula>("devine");
  const [touched, setTouched] = React.useState(false);

  const heightNum = parseFloat(height);
  const ageNum = parseFloat(age);

  const heightValid = height !== "" && Number.isFinite(heightNum) && heightNum > 0;
  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum > 0;

  const calculation = React.useMemo(() => {
    if (!heightValid || !ageValid) return null;

    const heightIn = heightNum / 2.54;
    const heightM = heightNum / 100;
    const inchesOverFiveFeet = heightIn - 60;
    const bmiMin = 18.5 * heightM * heightM;
    const bmiMax = 24.9 * heightM * heightM;
    const factor = frameFactor(frame);

    const base =
      formula === "devine"
        ? gender === "male"
          ? 50 + 2.3 * inchesOverFiveFeet
          : 45.5 + 2.3 * inchesOverFiveFeet
        : formula === "robinson"
          ? gender === "male"
            ? 52 + 1.9 * inchesOverFiveFeet
            : 49 + 1.7 * inchesOverFiveFeet
          : formula === "miller"
            ? gender === "male"
              ? 56.2 + 1.41 * inchesOverFiveFeet
              : 53.1 + 1.36 * inchesOverFiveFeet
            : formula === "hamwi"
              ? gender === "male"
                ? 48 + 2.7 * inchesOverFiveFeet
                : 45.5 + 2.2 * inchesOverFiveFeet
              : (bmiMin + bmiMax) / 2;

    const idealWeight = base * factor;
    const rangeMin = (formula === "bmi" ? bmiMin : base * 0.9) * factor;
    const rangeMax = (formula === "bmi" ? bmiMax : base * 1.1) * factor;

    let interpretationKey = "within";
    if (idealWeight < bmiMin) interpretationKey = "below";
    if (idealWeight > bmiMax) interpretationKey = "above";

    return {
      idealWeight,
      rangeMin,
      rangeMax,
      bmiMin,
      bmiMax,
      interpretationKey,
    };
  }, [ageValid, formula, frame, gender, heightNum, heightValid]);

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
    if (!heightValid) return t("error.invalidHeight");
    if (!ageValid) return t("error.invalidAge");
    return null;
  }, [ageValid, heightValid, t, touched]);

  function reset() {
    setHeight("");
    setAge("");
    setGender("male");
    setFrame("medium");
    setFormula("devine");
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
              <Label htmlFor="ideal-weight-height">{t("field.height")}</Label>
              <Input
                id="ideal-weight-height"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ideal-weight-age">{t("field.age")}</Label>
              <Input
                id="ideal-weight-age"
                type="number"
                inputMode="numeric"
                min={0}
                step="1"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.gender")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["male", "female"] as Gender[]).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={gender === value ? "default" : "outline"}
                  onClick={() => {
                    setGender(value);
                    setTouched(true);
                  }}
                >
                  {t(`type.${value}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.frame")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["small", "medium", "large"] as Frame[]).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={frame === value ? "default" : "outline"}
                  onClick={() => {
                    setFrame(value);
                    setTouched(true);
                  }}
                >
                  {t(`type.${value}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.formula")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["devine", "robinson", "miller", "hamwi", "bmi"] as Formula[]).map(
                (value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={formula === value ? "default" : "outline"}
                    onClick={() => {
                      setFormula(value);
                      setTouched(true);
                    }}
                  >
                    {t(`type.${value}` as never)}
                  </Button>
                )
              )}
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

          {errorMessage === null && calculation !== null && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.idealWeight")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(calculation.idealWeight, 1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.range")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(calculation.rangeMin, 1)} –{" "}
                    {formatNumber(calculation.rangeMax, 1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.bmiRange")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(calculation.bmiMin, 1)} –{" "}
                    {formatNumber(calculation.bmiMax, 1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.interpretation")}
                  </div>
                  <div className="text-sm font-medium text-zinc-900">
                    {t(`result.${calculation.interpretationKey}` as never)}
                  </div>
                </div>
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
