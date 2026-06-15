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

type ConversionType = "btuPerHour" | "totalBtu";

const CONVERSION_TYPES: ConversionType[] = ["btuPerHour", "totalBtu"];

// 1 refrigeration ton = 12,000 BTU/hr
const BTU_PER_TON = 12000;
// 1 ton = 3.517 kW
const KW_PER_TON = 3.517;
// 1 ton = 4.716 HP
const HP_PER_TON = 4.716;

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function BtuToTonsConverter(_props: { locale: Locale }) {
  const t = useTranslations("tool.btu-to-tons-converter");
  const [btuValue, setBtuValue] = React.useState("");
  const [conversionType, setConversionType] =
    React.useState<ConversionType>("btuPerHour");
  const [touched, setTouched] = React.useState(false);

  const btuNum = parseFloat(btuValue);
  const btuValid = btuValue !== "" && Number.isFinite(btuNum) && btuNum > 0;

  const result = React.useMemo(() => {
    if (!btuValid) return null;
    const tons = btuNum / BTU_PER_TON;
    if (conversionType === "btuPerHour") {
      return {
        mode: "power" as const,
        tons,
        kw: tons * KW_PER_TON,
        hp: tons * HP_PER_TON,
      };
    }
    // totalBtu → ton-hours (energy quantity)
    return {
      mode: "energy" as const,
      tonHours: tons,
    };
  }, [btuValid, btuNum, conversionType]);

  function loadExample(value: string, type: ConversionType) {
    setBtuValue(value);
    setConversionType(type);
    setTouched(true);
  }

  function reset() {
    setBtuValue("");
    setConversionType("btuPerHour");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const showError = touched && !btuValid;

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
              <Label htmlFor="btu-value">{t("field.btuValue")}</Label>
              <Input
                id="btu-value"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={btuValue}
                placeholder={t("placeholder.btuValue")}
                onChange={(e) => {
                  setBtuValue(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.conversionType")}</Label>
              <div className="flex flex-wrap gap-2 pt-1">
                {CONVERSION_TYPES.map((ct) => (
                  <Button
                    key={ct}
                    type="button"
                    variant={conversionType === ct ? "default" : "outline"}
                    onClick={() => {
                      setConversionType(ct);
                      setTouched(false);
                    }}
                  >
                    {t(`type.${ct}` as never)}
                  </Button>
                ))}
              </div>
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {result.mode === "power" && (
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.tons")}
                    </div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {formatNum(result.tons)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.kw")}</div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {formatNum(result.kw)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.hp")}</div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {formatNum(result.hp)}
                    </div>
                  </div>
                </div>
              )}
              {result.mode === "energy" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.tonHours")}
                    </div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {formatNum(result.tonHours)}
                    </div>
                  </div>
                </div>
              )}
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
            onClick={() => loadExample("24000", "btuPerHour")}
          >
            {t("examples.loadResidential")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("60000", "btuPerHour")}
          >
            {t("examples.loadCommercial")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("120000", "btuPerHour")}
          >
            {t("examples.loadIndustrial")}
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
