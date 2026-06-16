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

type Gender = "male" | "female" | "other";

interface Fev1Result {
  ratio: number;
  ratioPercent: number;
  interpretation: string;
}

function computeFev1(fev1: number, fvc: number): Fev1Result | null {
  if (
    !Number.isFinite(fev1) ||
    !Number.isFinite(fvc) ||
    fev1 <= 0 ||
    fvc <= 0
  )
    return null;
  if (fev1 > fvc) return null; // physiologically FEV1 cannot exceed FVC

  const ratio = fev1 / fvc;
  const ratioPercent = ratio * 100;

  let interpretation: string;
  if (ratioPercent >= 70) interpretation = "normal";
  else if (ratioPercent >= 60) interpretation = "mild";
  else if (ratioPercent >= 50) interpretation = "moderate";
  else interpretation = "severe";

  return { ratio, ratioPercent, interpretation };
}

export default function Fev1FvcRatioCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.fev1-fvc-ratio-calculator");

  const [fev1, setFev1] = React.useState("");
  const [fvc, setFvc] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender | "">("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<Fev1Result | null>(() => {
    return computeFev1(parseFloat(fev1), parseFloat(fvc));
  }, [fev1, fvc]);

  function reset() {
    setFev1("");
    setFvc("");
    setAge("");
    setGender("");
    setTouched(false);
  }

  function loadExample(f1: string, fv: string) {
    setFev1(f1);
    setFvc(fv);
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

  const GENDERS: Gender[] = ["male", "female", "other"];

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
    (result === null ||
      (parseFloat(fev1) > parseFloat(fvc) &&
        Number.isFinite(parseFloat(fev1)) &&
        Number.isFinite(parseFloat(fvc))));

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
              <Label htmlFor="fev1-val">
                {t("field.fev1")}
              </Label>
              <Input
                id="fev1-val"
                type="number"
                inputMode="decimal"
                value={fev1}
                placeholder={t("placeholder.fev1")}
                onChange={(e) => {
                  setFev1(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fvc-val">{t("field.fvc")}</Label>
              <Input
                id="fvc-val"
                type="number"
                inputMode="decimal"
                value={fvc}
                placeholder={t("placeholder.fvc")}
                onChange={(e) => {
                  setFvc(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fev1-age">{t("field.age")}</Label>
              <Input
                id="fev1-age"
                type="number"
                inputMode="numeric"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.gender")}</Label>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <Button
                  key={g}
                  type="button"
                  variant={gender === g ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGender(g)}
                >
                  {t(`gender.${g}` as never)}
                </Button>
              ))}
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
              <div className="text-2xl font-semibold text-zinc-900">
                {result.ratio.toFixed(3)}{" "}
                <span className="text-lg font-normal text-zinc-500">
                  ({result.ratioPercent.toFixed(1)}%)
                </span>
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.interpretation")}:{" "}
                <span className="font-semibold">
                  {t(`interp.${result.interpretation}` as never)}
                </span>
              </div>
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
            onClick={() => loadExample("3.2", "4.0")}
          >
            {t("examples.loadNormal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2.4", "3.5")}
          >
            {t("examples.loadMild")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1.8", "3.2")}
          >
            {t("examples.loadModerate")}
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
