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

type BaseType = "square" | "triangular" | "pentagonal" | "hexagonal";
type Unit = "cm" | "m" | "in" | "ft";

const BASE_TYPES: BaseType[] = ["square", "triangular", "pentagonal", "hexagonal"];
const UNITS: Unit[] = ["cm", "m", "in", "ft"];

function calcApothem(baseType: BaseType, l: number): number {
  switch (baseType) {
    case "square":
      return l / 2;
    case "triangular":
      return l / (2 * Math.sqrt(3));
    case "pentagonal":
      return l / (2 * Math.tan(Math.PI / 5));
    case "hexagonal":
      return (l * Math.sqrt(3)) / 2;
  }
}

function calcBaseArea(baseType: BaseType, l: number): number {
  switch (baseType) {
    case "square":
      return l * l;
    case "triangular":
      return (Math.sqrt(3) / 4) * l * l;
    case "pentagonal":
      return (5 * l * l) / (4 * Math.tan(Math.PI / 5));
    case "hexagonal":
      return (3 * Math.sqrt(3) / 2) * l * l;
  }
}

function calcPerimeter(baseType: BaseType, l: number): number {
  switch (baseType) {
    case "square":
      return 4 * l;
    case "triangular":
      return 3 * l;
    case "pentagonal":
      return 5 * l;
    case "hexagonal":
      return 6 * l;
  }
}

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function PyramidBlockCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pyramid-block-calculator");

  const [baseType, setBaseType] = React.useState<BaseType>("square");
  const [baseLength, setBaseLength] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [slantHeightInput, setSlantHeightInput] = React.useState("");
  const [apothemInput, setApothemInput] = React.useState("");
  const [unit, setUnit] = React.useState<Unit>("cm");
  const [touched, setTouched] = React.useState(false);

  const lNum = parseFloat(baseLength);
  const hNum = parseFloat(height);
  const slantIn = parseFloat(slantHeightInput);
  const apothemIn = parseFloat(apothemInput);

  const lValid = baseLength !== "" && Number.isFinite(lNum) && lNum > 0;
  const hValid = height !== "" && Number.isFinite(hNum) && hNum > 0;

  const results = React.useMemo(() => {
    if (!lValid || !hValid) return null;
    const baseArea = calcBaseArea(baseType, lNum);
    const perimeter = calcPerimeter(baseType, lNum);
    const apothem =
      apothemInput !== "" && Number.isFinite(apothemIn) && apothemIn > 0
        ? apothemIn
        : calcApothem(baseType, lNum);
    const slantHeight =
      slantHeightInput !== "" && Number.isFinite(slantIn) && slantIn > 0
        ? slantIn
        : Math.sqrt(hNum * hNum + apothem * apothem);
    const lateralArea = 0.5 * perimeter * slantHeight;
    const totalArea = lateralArea + baseArea;
    const volume = (1 / 3) * baseArea * hNum;
    return { volume, baseArea, lateralArea, totalArea, slantHeight, apothem };
  }, [baseType, lNum, hNum, lValid, hValid, slantIn, apothemIn, slantHeightInput, apothemInput]);

  function reset() {
    setBaseLength("");
    setHeight("");
    setSlantHeightInput("");
    setApothemInput("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const showError = touched && (!lValid || !hValid);

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
            <Label>{t("field.baseType")}</Label>
            <div className="flex flex-wrap gap-2">
              {BASE_TYPES.map((bt) => (
                <Button
                  key={bt}
                  type="button"
                  variant={baseType === bt ? "default" : "outline"}
                  onClick={() => {
                    setBaseType(bt);
                    setTouched(false);
                  }}
                >
                  {t(`baseType.${bt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pb-length">{t("field.baseLength")}</Label>
              <Input
                id="pb-length"
                type="number"
                inputMode="decimal"
                value={baseLength}
                placeholder={t("placeholder.baseLength")}
                onChange={(e) => {
                  setBaseLength(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pb-height">{t("field.height")}</Label>
              <Input
                id="pb-height"
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
            <div className="space-y-2">
              <Label htmlFor="pb-slant">{t("field.slantHeight")}</Label>
              <Input
                id="pb-slant"
                type="number"
                inputMode="decimal"
                value={slantHeightInput}
                placeholder={t("placeholder.optional")}
                onChange={(e) => setSlantHeightInput(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pb-apothem">{t("field.apothem")}</Label>
              <Input
                id="pb-apothem"
                type="number"
                inputMode="decimal"
                value={apothemInput}
                placeholder={t("placeholder.optional")}
                onChange={(e) => setApothemInput(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.unit")}</Label>
            <div className="flex flex-wrap gap-2">
              {UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={unit === u ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUnit(u)}
                >
                  {t(`unit.${u}` as never)}
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

          {results !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-700">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.volume")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {fmt(results.volume)} {unit}³
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.totalSurface")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(results.totalArea)} {unit}²
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.lateralSurface")}
                  </div>
                  <div className="text-lg font-medium text-zinc-800">
                    {fmt(results.lateralArea)} {unit}²
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.baseArea")}
                  </div>
                  <div className="text-lg font-medium text-zinc-800">
                    {fmt(results.baseArea)} {unit}²
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.slantHeight")}
                  </div>
                  <div className="text-lg font-medium text-zinc-800">
                    {fmt(results.slantHeight)} {unit}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.apothem")}
                  </div>
                  <div className="text-lg font-medium text-zinc-800">
                    {fmt(results.apothem)} {unit}
                  </div>
                </div>
              </div>
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
