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

type RatioCategory = "low" | "normal" | "high";

interface HctResult {
  ratio: number;
  category: RatioCategory;
}

function computeRatio(hct: number, hgb: number): HctResult | null {
  if (!Number.isFinite(hct) || !Number.isFinite(hgb) || hgb === 0) return null;
  if (hct <= 0 || hgb <= 0) return null;
  const ratio = hct / hgb;
  let category: RatioCategory;
  if (ratio < 2.8) category = "low";
  else if (ratio <= 3.2) category = "normal";
  else category = "high";
  return { ratio, category };
}

export default function HematocritToHemoglobinRatioCalculator(
  _props: { locale: Locale },
) {
  const t = useTranslations("tool.hematocrit-to-hemoglobin-ratio-calculator");
  const [hct, setHct] = React.useState("");
  const [hgb, setHgb] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<HctResult | null>(() => {
    const h = parseFloat(hct);
    const g = parseFloat(hgb);
    return computeRatio(h, g);
  }, [hct, hgb]);

  function reset() {
    setHct("");
    setHgb("");
    setAge("");
    setGender("");
    setTouched(false);
  }

  function loadExample(h: string, g: string, a: string, gen: string) {
    setHct(h);
    setHgb(g);
    setAge(a);
    setGender(gen);
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

  const hctNum = parseFloat(hct);
  const hgbNum = parseFloat(hgb);
  const showError =
    touched &&
    (hct === "" ||
      hgb === "" ||
      !Number.isFinite(hctNum) ||
      !Number.isFinite(hgbNum) ||
      hctNum <= 0 ||
      hgbNum <= 0);
  const showDivError = touched && hgb !== "" && hgbNum === 0;

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
              <Label htmlFor="hct-value">{t("field.hematocrit")}</Label>
              <Input
                id="hct-value"
                type="number"
                inputMode="decimal"
                value={hct}
                placeholder={t("placeholder.hematocrit")}
                onChange={(e) => {
                  setHct(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hgb-value">{t("field.hemoglobin")}</Label>
              <Input
                id="hgb-value"
                type="number"
                inputMode="decimal"
                value={hgb}
                placeholder={t("placeholder.hemoglobin")}
                onChange={(e) => {
                  setHgb(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hct-age">{t("field.age")}</Label>
              <Input
                id="hct-age"
                type="number"
                inputMode="numeric"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hct-gender">{t("field.gender")}</Label>
              <select
                id="hct-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
              >
                <option value="">{t("gender.select")}</option>
                <option value="male">{t("gender.male")}</option>
                <option value="female">{t("gender.female")}</option>
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

          {showDivError && (
            <p className="text-sm text-red-600">{t("error.hemoglobinZero")}</p>
          )}
          {showError && !showDivError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.ratio")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.ratio.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.category")}
                  </div>
                  <div className="text-base font-medium text-zinc-900">
                    {t(`category.${result.category}` as never)}
                  </div>
                </div>
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
            onClick={() => loadExample("45", "15.5", "35", "male")}
          >
            {t("examples.loadNormalMale")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("40", "13.8", "28", "female")}
          >
            {t("examples.loadNormalFemale")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("32", "10.2", "45", "female")}
          >
            {t("examples.loadIronDeficiency")}
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
