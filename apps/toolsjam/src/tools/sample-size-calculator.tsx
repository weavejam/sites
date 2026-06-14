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

const Z_SCORES: Record<string, number> = {
  "80": 1.282,
  "85": 1.440,
  "90": 1.645,
  "95": 1.960,
  "99": 2.576,
};

const CONFIDENCE_LEVELS = ["80", "85", "90", "95", "99"];

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Math.ceil(n).toLocaleString("en-US");
}

export default function SampleSizeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sample-size-calculator");

  const [confidenceLevel, setConfidenceLevel] = React.useState<string>("95");
  const [marginOfError, setMarginOfError] = React.useState<string>("");
  const [proportion, setProportion] = React.useState<string>("0.5");
  const [populationSize, setPopulationSize] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const moeNum = parseFloat(marginOfError);
  const propNum = parseFloat(proportion);
  const popNum = parseFloat(populationSize);

  const moeValid =
    marginOfError !== "" &&
    Number.isFinite(moeNum) &&
    moeNum > 0 &&
    moeNum < 100;
  const propValid =
    proportion !== "" &&
    Number.isFinite(propNum) &&
    propNum > 0 &&
    propNum < 1;
  const popValid =
    populationSize === "" ||
    (Number.isFinite(popNum) && popNum > 0 && Number.isInteger(popNum));

  const result = React.useMemo(() => {
    if (!moeValid || !propValid || !popValid) return null;
    const z = Z_SCORES[confidenceLevel] ?? 1.96;
    const e = moeNum / 100;
    const p = propNum;
    const n0 = (z * z * p * (1 - p)) / (e * e);
    let n = n0;
    if (populationSize !== "" && Number.isFinite(popNum) && popNum > 0) {
      n = n0 / (1 + (n0 - 1) / popNum);
    }
    return { sampleSize: Math.ceil(n), infinite: populationSize === "" };
  }, [
    moeValid,
    propValid,
    popValid,
    confidenceLevel,
    moeNum,
    propNum,
    populationSize,
    popNum,
  ]);

  function reset() {
    setMarginOfError("");
    setProportion("0.5");
    setPopulationSize("");
    setConfidenceLevel("95");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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
        applicationCategory: "UtilitiesApplication",
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

  const showError = touched && (!moeValid || !propValid || !popValid);

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
              <Label htmlFor="ss-cl">{t("field.confidenceLevel")}</Label>
              <select
                id="ss-cl"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(e.target.value)}
              >
                {CONFIDENCE_LEVELS.map((cl) => (
                  <option key={cl} value={cl}>
                    {cl}%
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ss-moe">{t("field.marginOfError")}</Label>
              <Input
                id="ss-moe"
                type="number"
                inputMode="decimal"
                min="0.01"
                max="99.99"
                step="any"
                value={marginOfError}
                placeholder={t("placeholder.percent")}
                onChange={(e) => {
                  setMarginOfError(e.target.value);
                  setTouched(true);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ss-prop">{t("field.proportion")}</Label>
              <Input
                id="ss-prop"
                type="number"
                inputMode="decimal"
                min="0.01"
                max="0.99"
                step="any"
                value={proportion}
                placeholder={t("placeholder.proportion")}
                onChange={(e) => {
                  setProportion(e.target.value);
                  setTouched(true);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ss-pop">{t("field.populationSize")}</Label>
              <Input
                id="ss-pop"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={populationSize}
                placeholder={t("placeholder.optional")}
                onChange={(e) => {
                  setPopulationSize(e.target.value);
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-3xl font-bold text-zinc-900">
                {formatNum(result.sampleSize)}
              </div>
              <div className="text-sm text-zinc-600">
                {result.infinite
                  ? t("result.infinitePopulation")
                  : t("result.finitePopulation")}
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
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
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
