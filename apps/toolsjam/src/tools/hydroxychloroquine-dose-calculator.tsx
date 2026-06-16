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

type CalcType = "weight" | "bsa";

interface HcqResult {
  calculatedDose: number;
  finalDose: number;
  bsa?: number;
  capped: boolean;
}

function calcBsa(heightCm: number, weightKg: number): number {
  return Math.sqrt((heightCm * weightKg) / 3600);
}

function computeHcqDose(
  calcType: CalcType,
  weight: number,
  height: number,
  doseRate: number,
  maxDose: number,
): HcqResult | null {
  if (!Number.isFinite(weight) || weight <= 0) return null;
  if (!Number.isFinite(doseRate) || doseRate <= 0) return null;
  if (!Number.isFinite(maxDose) || maxDose <= 0) return null;

  if (calcType === "weight") {
    const calculated = weight * doseRate;
    const final = Math.min(calculated, maxDose);
    return { calculatedDose: calculated, finalDose: final, capped: calculated > maxDose };
  } else {
    if (!Number.isFinite(height) || height <= 0) return null;
    const bsa = calcBsa(height, weight);
    const calculated = bsa * doseRate;
    const final = Math.min(calculated, maxDose);
    return { calculatedDose: calculated, finalDose: final, bsa, capped: calculated > maxDose };
  }
}

export default function HydroxychloroquineDoseCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.hydroxychloroquine-dose-calculator");
  const [calcType, setCalcType] = React.useState<CalcType>("weight");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [dosePerKg, setDosePerKg] = React.useState("5");
  const [dosePerBsa, setDosePerBsa] = React.useState("200");
  const [maxDose, setMaxDose] = React.useState("400");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<HcqResult | null>(() => {
    const doseRate = calcType === "weight" ? parseFloat(dosePerKg) : parseFloat(dosePerBsa);
    return computeHcqDose(
      calcType,
      parseFloat(weight),
      parseFloat(height),
      doseRate,
      parseFloat(maxDose),
    );
  }, [calcType, weight, height, dosePerKg, dosePerBsa, maxDose]);

  function reset() {
    setWeight("");
    setHeight("");
    setDosePerKg("5");
    setDosePerBsa("200");
    setMaxDose("400");
    setCalcType("weight");
    setTouched(false);
  }

  function loadExample(
    type: CalcType,
    w: string,
    h: string,
    dpk: string,
    dpb: string,
    mx: string,
  ) {
    setCalcType(type);
    setWeight(w);
    setHeight(h);
    setDosePerKg(dpk);
    setDosePerBsa(dpb);
    setMaxDose(mx);
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
    touched &&
    (weight === "" ||
      !Number.isFinite(parseFloat(weight)) ||
      parseFloat(weight) <= 0 ||
      (calcType === "bsa" &&
        (height === "" ||
          !Number.isFinite(parseFloat(height)) ||
          parseFloat(height) <= 0)));

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
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["weight", "bsa"] as const).map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant={calcType === v ? "default" : "outline"}
                  onClick={() => {
                    setCalcType(v);
                    setTouched(false);
                  }}
                >
                  {t(`calcType.${v}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hcq-weight">{t("field.weight")}</Label>
              <Input
                id="hcq-weight"
                type="number"
                inputMode="decimal"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            {calcType === "bsa" && (
              <div className="space-y-2">
                <Label htmlFor="hcq-height">{t("field.height")}</Label>
                <Input
                  id="hcq-height"
                  type="number"
                  inputMode="decimal"
                  value={height}
                  placeholder={t("placeholder.height")}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            {calcType === "weight" ? (
              <div className="space-y-2">
                <Label htmlFor="hcq-dose-per-kg">{t("field.dosePerKg")}</Label>
                <Input
                  id="hcq-dose-per-kg"
                  type="number"
                  inputMode="decimal"
                  value={dosePerKg}
                  placeholder={t("placeholder.dosePerKg")}
                  onChange={(e) => {
                    setDosePerKg(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="hcq-dose-per-bsa">{t("field.dosePerBsa")}</Label>
                <Input
                  id="hcq-dose-per-bsa"
                  type="number"
                  inputMode="decimal"
                  value={dosePerBsa}
                  placeholder={t("placeholder.dosePerBsa")}
                  onChange={(e) => {
                    setDosePerBsa(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="hcq-max-dose">{t("field.maxDose")}</Label>
              <Input
                id="hcq-max-dose"
                type="number"
                inputMode="decimal"
                value={maxDose}
                placeholder={t("placeholder.maxDose")}
                onChange={(e) => {
                  setMaxDose(e.target.value);
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {result.bsa !== undefined && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.bsa")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {result.bsa.toFixed(2)} m²
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.calculatedDose")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.calculatedDose.toFixed(1)} {t("result.unit")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.finalDose")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.finalDose.toFixed(1)} {t("result.unit")}
                  </div>
                </div>
              </div>
              {result.capped && (
                <p className="text-sm font-medium text-amber-700">
                  {t("result.capped")}
                </p>
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
            onClick={() =>
              loadExample("weight", "70", "", "5", "200", "400")
            }
          >
            {t("examples.loadAdultWeight")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("bsa", "65", "170", "5", "200", "400")
            }
          >
            {t("examples.loadAdultBsa")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("weight", "30", "", "5", "200", "400")
            }
          >
            {t("examples.loadChildWeight")}
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
