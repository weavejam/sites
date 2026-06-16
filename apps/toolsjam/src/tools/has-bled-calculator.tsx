"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CriterionKey =
  | "hypertension"
  | "liverDysfunction"
  | "renalDysfunction"
  | "stroke"
  | "bleeding"
  | "labileINR"
  | "elderly"
  | "drugsAlcohol";

const CRITERIA: CriterionKey[] = [
  "hypertension",
  "liverDysfunction",
  "renalDysfunction",
  "stroke",
  "bleeding",
  "labileINR",
  "elderly",
  "drugsAlcohol",
];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function getRisk(score: number): "low" | "moderate" | "high" | "veryHigh" {
  if (score === 0) return "low";
  if (score <= 2) return "moderate";
  if (score <= 4) return "high";
  return "veryHigh";
}

export default function HasBledCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.has-bled-calculator");

  const [values, setValues] = React.useState<
    Record<CriterionKey, boolean | null>
  >({
    hypertension: null,
    liverDysfunction: null,
    renalDysfunction: null,
    stroke: null,
    bleeding: null,
    labileINR: null,
    elderly: null,
    drugsAlcohol: null,
  });
  const [touched, setTouched] = React.useState(false);

  function handleToggle(key: CriterionKey, val: boolean) {
    setValues((prev) => ({ ...prev, [key]: val }));
    setTouched(true);
  }

  const allAnswered = CRITERIA.every((k) => values[k] !== null);

  const validationError = React.useMemo(() => {
    if (!touched) return null;
    if (!allAnswered) return t("error.required");
    return null;
  }, [touched, allAnswered, t]);

  const result = React.useMemo(() => {
    if (!touched || !allAnswered) return null;
    const score = CRITERIA.reduce(
      (sum, k) => sum + (values[k] === true ? 1 : 0),
      0
    );
    const risk = getRisk(score);
    return { score, risk };
  }, [touched, allAnswered, values]);

  function reset() {
    setValues({
      hypertension: null,
      liverDysfunction: null,
      renalDysfunction: null,
      stroke: null,
      bleeding: null,
      labileINR: null,
      elderly: null,
      drugsAlcohol: null,
    });
    setTouched(false);
  }

  function loadExample(preset: Record<CriterionKey, boolean>) {
    setValues(preset);
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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "MedicalWebApplication",
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
          <div className="space-y-4">
            {CRITERIA.map((key) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 rounded-lg border border-zinc-100 p-3"
              >
                <Label className="flex-1 text-sm leading-snug">
                  {t(`field.${key}` as never)}
                </Label>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant={values[key] === false ? "default" : "outline"}
                    onClick={() => handleToggle(key, false)}
                  >
                    {t("option.no")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={values[key] === true ? "default" : "outline"}
                    onClick={() => handleToggle(key, true)}
                  >
                    {t("option.yes")}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {validationError && (
            <p className="text-sm text-red-600">{validationError}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-zinc-900">
                  {result.score}
                </span>
                <span className="text-lg text-zinc-500">{t("result.outOf")}</span>
              </div>
              <div>
                <span className="text-sm text-zinc-500">{t("result.risk")}: </span>
                <span className="font-semibold text-zinc-900">
                  {t(`risk.${result.risk}` as never)}
                </span>
              </div>
              <div className="text-sm text-zinc-700">
                <span className="font-medium">{t("result.guidance")}: </span>
                {t(`guidance.${result.risk}` as never)}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-700">{t("examples.heading")}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample({
                    hypertension: false,
                    liverDysfunction: false,
                    renalDysfunction: false,
                    stroke: false,
                    bleeding: false,
                    labileINR: false,
                    elderly: false,
                    drugsAlcohol: false,
                  })
                }
              >
                {t("button.loadLow")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample({
                    hypertension: true,
                    liverDysfunction: false,
                    renalDysfunction: true,
                    stroke: false,
                    bleeding: false,
                    labileINR: false,
                    elderly: true,
                    drugsAlcohol: false,
                  })
                }
              >
                {t("button.loadModerate")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample({
                    hypertension: true,
                    liverDysfunction: true,
                    renalDysfunction: true,
                    stroke: true,
                    bleeding: false,
                    labileINR: true,
                    elderly: true,
                    drugsAlcohol: true,
                  })
                }
              >
                {t("button.loadHigh")}
              </Button>
            </div>
          </div>
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
