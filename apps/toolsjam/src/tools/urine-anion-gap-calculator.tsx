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

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 10) / 10;
  return rounded >= 0
    ? rounded.toLocaleString("en-US", { maximumFractionDigits: 1 })
    : rounded.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

export default function UrineAnionGapCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.urine-anion-gap-calculator");

  const [uNa, setUNa] = React.useState("");
  const [uK, setUK] = React.useState("");
  const [uCl, setUCl] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const uNaNum = parseFloat(uNa);
  const uKNum = parseFloat(uK);
  const uClNum = parseFloat(uCl);

  const uNaValid = uNa !== "" && Number.isFinite(uNaNum) && uNaNum >= 0;
  const uKValid = uK !== "" && Number.isFinite(uKNum) && uKNum >= 0;
  const uClValid = uCl !== "" && Number.isFinite(uClNum) && uClNum >= 0;

  const allValid = uNaValid && uKValid && uClValid;

  const result = React.useMemo<number | null>(() => {
    if (!allValid) return null;
    return uNaNum + uKNum - uClNum;
  }, [allValid, uNaNum, uKNum, uClNum]);

  const interpretation = React.useMemo<string | null>(() => {
    if (result === null) return null;
    if (result > 10) return t("interpretation.positive");
    if (result < -10) return t("interpretation.negative");
    return t("interpretation.nearZero");
  }, [result, t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  function reset() {
    setUNa("");
    setUK("");
    setUCl("");
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
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const showError = touched && !allValid;

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
              <Label htmlFor="uag-na">{t("field.urineSodium")}</Label>
              <Input
                id="uag-na"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={uNa}
                placeholder={t("placeholder.urineSodium")}
                onChange={(e) => {
                  setUNa(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uag-k">{t("field.urinePotassium")}</Label>
              <Input
                id="uag-k"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={uK}
                placeholder={t("placeholder.urinePotassium")}
                onChange={(e) => {
                  setUK(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uag-cl">{t("field.urineChloride")}</Label>
              <Input
                id="uag-cl"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={uCl}
                placeholder={t("placeholder.urineChloride")}
                onChange={(e) => {
                  setUCl(e.target.value);
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
              <div className="text-2xl font-semibold text-zinc-900">
                {result >= 0 ? "+" : ""}
                {formatNum(result)} {t("result.unit")}
              </div>
              <div className="text-sm text-zinc-700">{interpretation}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setUNa("20");
              setUK("15");
              setUCl("80");
              setTouched(true);
            }}
          >
            {t("examples.loadNegative")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setUNa("50");
              setUK("20");
              setUCl("30");
              setTouched(true);
            }}
          >
            {t("examples.loadPositive")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setUNa("50");
              setUK("20");
              setUCl("65");
              setTouched(true);
            }}
          >
            {t("examples.loadNormal")}
          </Button>
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
