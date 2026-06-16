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

type PatientType = "male" | "female" | "elderly-male" | "elderly-female" | "child";

const TBW_FACTORS: Record<PatientType, number> = {
  male: 0.6,
  female: 0.5,
  "elderly-male": 0.5,
  "elderly-female": 0.45,
  child: 0.6,
};

const PATIENT_TYPES: PatientType[] = [
  "male",
  "female",
  "elderly-male",
  "elderly-female",
  "child",
];

interface WaterDeficitResult {
  tbwL: number;
  deficitL: number;
  rate24h: number;
  rate48h: number;
}

function computeWaterDeficit(
  currentNa: number,
  desiredNa: number,
  weight: number,
  patientType: PatientType,
): WaterDeficitResult {
  const tbwL = weight * TBW_FACTORS[patientType];
  const deficitL = tbwL * (currentNa / desiredNa - 1);
  // Correction volume / time in hours, converted to mL/hr
  const rate24h = (deficitL * 1000) / 24;
  const rate48h = (deficitL * 1000) / 48;
  return { tbwL, deficitL, rate24h, rate48h };
}

export default function FreeWaterDeficitCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.free-water-deficit-calculator");

  const [currentNa, setCurrentNa] = React.useState("");
  const [desiredNa, setDesiredNa] = React.useState("140");
  const [weight, setWeight] = React.useState("");
  const [patientType, setPatientType] = React.useState<PatientType>("male");
  const [touched, setTouched] = React.useState(false);

  const currentNaNum = parseFloat(currentNa);
  const desiredNaNum = parseFloat(desiredNa);
  const weightNum = parseFloat(weight);

  const valid = {
    currentNa:
      currentNa !== "" && Number.isFinite(currentNaNum) && currentNaNum >= 135 && currentNaNum <= 200,
    desiredNa:
      desiredNa !== "" && Number.isFinite(desiredNaNum) && desiredNaNum >= 130 && desiredNaNum <= 150,
    weight: weight !== "" && Number.isFinite(weightNum) && weightNum >= 1 && weightNum <= 300,
    naRelation: currentNaNum > desiredNaNum,
  };
  const allValid = valid.currentNa && valid.desiredNa && valid.weight && valid.naRelation;

  const result = React.useMemo<WaterDeficitResult | null>(() => {
    if (!allValid) return null;
    return computeWaterDeficit(currentNaNum, desiredNaNum, weightNum, patientType);
  }, [allValid, currentNaNum, desiredNaNum, weightNum, patientType]);

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

  function reset() {
    setCurrentNa("");
    setDesiredNa("140");
    setWeight("");
    setPatientType("male");
    setTouched(false);
  }

  function loadExample(
    cNa: string,
    dNa: string,
    w: string,
    pt: PatientType,
  ) {
    setCurrentNa(cNa);
    setDesiredNa(dNa);
    setWeight(w);
    setPatientType(pt);
    setTouched(true);
  }

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
            <Label>{t("field.patientType")}</Label>
            <div className="flex flex-wrap gap-2">
              {PATIENT_TYPES.map((pt) => (
                <Button
                  key={pt}
                  type="button"
                  variant={patientType === pt ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setPatientType(pt);
                    setTouched(true);
                  }}
                >
                  {t(`patientType.${pt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fwd-current-na">{t("field.currentNa")}</Label>
              <Input
                id="fwd-current-na"
                type="number"
                inputMode="decimal"
                value={currentNa}
                placeholder={t("placeholder.currentNa")}
                onChange={(e) => {
                  setCurrentNa(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fwd-desired-na">{t("field.desiredNa")}</Label>
              <Input
                id="fwd-desired-na"
                type="number"
                inputMode="decimal"
                value={desiredNa}
                placeholder={t("placeholder.desiredNa")}
                onChange={(e) => {
                  setDesiredNa(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fwd-weight">{t("field.weight")}</Label>
              <Input
                id="fwd-weight"
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
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && !allValid && (
            <div className="space-y-1">
              {!valid.currentNa && (
                <p className="text-sm text-red-600">{t("error.invalidCurrentNa")}</p>
              )}
              {!valid.desiredNa && (
                <p className="text-sm text-red-600">{t("error.invalidDesiredNa")}</p>
              )}
              {!valid.weight && (
                <p className="text-sm text-red-600">{t("error.invalidWeight")}</p>
              )}
              {valid.currentNa && valid.desiredNa && !valid.naRelation && (
                <p className="text-sm text-red-600">{t("error.naNotElevated")}</p>
              )}
            </div>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.deficit")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.deficitL.toFixed(2)} {t("unit.liters")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.tbw")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.tbwL.toFixed(1)} {t("unit.liters")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.rate24h")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.rate24h.toFixed(0)} {t("unit.mlh")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.rate48h")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.rate48h.toFixed(0)} {t("unit.mlh")}
                  </div>
                </div>
              </div>
              <p className="text-xs text-amber-700 border border-amber-200 bg-amber-50 rounded p-2">
                {t("result.note")}
              </p>
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("165", "140", "70", "male")}
          >
            {t("examples.loadSevere")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("155", "140", "65", "female")}
          >
            {t("examples.loadModerate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("152", "140", "20", "child")}
          >
            {t("examples.loadPediatric")}
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
