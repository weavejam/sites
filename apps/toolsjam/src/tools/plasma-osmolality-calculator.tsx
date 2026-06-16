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
  return n.toFixed(decimals);
}

function interpretOsmolality(val: number): "low" | "normal" | "high" {
  if (val < 275) return "low";
  if (val > 295) return "high";
  return "normal";
}

export default function PlasmaOsmolalityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.plasma-osmolality-calculator");

  const [sodium, setSodium] = React.useState("");
  const [glucose, setGlucose] = React.useState("");
  const [bun, setBun] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const naNum = parseFloat(sodium);
  const glcNum = parseFloat(glucose);
  const bunNum = parseFloat(bun);

  const allValid =
    sodium !== "" && Number.isFinite(naNum) && naNum > 0 &&
    glucose !== "" && Number.isFinite(glcNum) && glcNum >= 0 &&
    bun !== "" && Number.isFinite(bunNum) && bunNum >= 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const naPart = 2 * naNum;
    const glcPart = glcNum / 18;
    const bunPart = bunNum / 2.8;
    const osmolality = naPart + glcPart + bunPart;
    const interpretation = interpretOsmolality(osmolality);
    return { osmolality, naPart, glcPart, bunPart, interpretation };
  }, [allValid, naNum, glcNum, bunNum]);

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

  function reset() {
    setSodium("");
    setGlucose("");
    setBun("");
    setTouched(false);
  }

  const interpColors = {
    low: "border-blue-400 bg-blue-50 text-blue-900",
    normal: "border-green-400 bg-green-50 text-green-900",
    high: "border-orange-400 bg-orange-50 text-orange-900",
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="po-sodium">{t("field.sodium")}</Label>
              <Input
                id="po-sodium"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={sodium}
                placeholder={t("placeholder.sodium")}
                onChange={(e) => { setSodium(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="po-glucose">{t("field.glucose")}</Label>
              <Input
                id="po-glucose"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={glucose}
                placeholder={t("placeholder.glucose")}
                onChange={(e) => { setGlucose(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="po-bun">{t("field.bun")}</Label>
              <Input
                id="po-bun"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={bun}
                placeholder={t("placeholder.bun")}
                onChange={(e) => { setBun(e.target.value); setTouched(true); }}
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
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className={`rounded-lg border-l-4 p-4 space-y-2 ${interpColors[result.interpretation]}`}>
              <div className="text-sm font-medium opacity-70">{t("result.heading")}</div>
              <div className="text-2xl font-bold">
                {t("result.osmolality", { value: fmt(result.osmolality) })}
              </div>
              <div className="text-sm space-y-1">
                <div>{t("result.sodium_contribution", { value: fmt(result.naPart, 0) })}</div>
                <div>{t("result.glucose_contribution", { value: fmt(result.glcPart) })}</div>
                <div>{t("result.bun_contribution", { value: fmt(result.bunPart) })}</div>
              </div>
              <div className="mt-2 font-semibold text-sm">
                {t(`result.${result.interpretation}` as never)}
              </div>
              <div className="text-xs opacity-60 mt-1">{t("formula")}</div>
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
