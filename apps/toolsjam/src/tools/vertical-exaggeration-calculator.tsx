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

const UNITS = ["meters", "feet", "km", "miles"] as const;
const MAP_TYPES = ["topographic", "survey", "regional", "bathymetric"] as const;

export default function VerticalExaggerationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.vertical-exaggeration-calculator");

  const [horizontalScale, setHorizontalScale] = React.useState("");
  const [verticalScale, setVerticalScale] = React.useState("");
  const [horizontalUnit, setHorizontalUnit] = React.useState<string>("meters");
  const [verticalUnit, setVerticalUnit] = React.useState<string>("meters");
  const [mapType, setMapType] = React.useState<string>("topographic");
  const [touched, setTouched] = React.useState(false);

  const hNum = parseFloat(horizontalScale);
  const vNum = parseFloat(verticalScale);
  const hValid = horizontalScale !== "" && Number.isFinite(hNum) && hNum > 0;
  const vValid = verticalScale !== "" && Number.isFinite(vNum) && vNum > 0;

  const result = React.useMemo<number | null>(() => {
    if (!hValid || !vValid) return null;
    return hNum / vNum;
  }, [hValid, vValid, hNum, vNum]);

  function reset() {
    setHorizontalScale("");
    setVerticalScale("");
    setHorizontalUnit("meters");
    setVerticalUnit("meters");
    setMapType("topographic");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
    return Array.isArray(raw) ? raw : [];
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

  const showError = touched && (!hValid || !vValid);

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
              <Label htmlFor="ve-h-scale">{t("field.horizontalScale")}</Label>
              <Input
                id="ve-h-scale"
                type="number"
                inputMode="decimal"
                value={horizontalScale}
                placeholder="50000"
                onChange={(e) => { setHorizontalScale(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ve-v-scale">{t("field.verticalScale")}</Label>
              <Input
                id="ve-v-scale"
                type="number"
                inputMode="decimal"
                value={verticalScale}
                placeholder="10000"
                onChange={(e) => { setVerticalScale(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ve-h-unit">{t("field.horizontalUnit")}</Label>
              <select
                id="ve-h-unit"
                value={horizontalUnit}
                onChange={(e) => setHorizontalUnit(e.target.value)}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>{t(`unit.${u}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ve-v-unit">{t("field.verticalUnit")}</Label>
              <select
                id="ve-v-unit"
                value={verticalUnit}
                onChange={(e) => setVerticalUnit(e.target.value)}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>{t(`unit.${u}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ve-map-type">{t("field.mapType")}</Label>
              <select
                id="ve-map-type"
                value={mapType}
                onChange={(e) => setMapType(e.target.value)}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                {MAP_TYPES.map((m) => (
                  <option key={m} value={m}>{t(`mapType.${m}` as never)}</option>
                ))}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.ratio")}: {result.toFixed(2)}×
              </div>
              <p className="text-sm text-zinc-600">
                {result === 1
                  ? t("result.trueScale")
                  : t("result.interpretation", { ratio: result.toFixed(2) })}
              </p>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
