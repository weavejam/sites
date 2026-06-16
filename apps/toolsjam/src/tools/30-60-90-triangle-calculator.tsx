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

type SideType = "short" | "long" | "hypotenuse";

interface TriangleResult {
  short: number;
  long: number;
  hypotenuse: number;
}

interface FaqItem {
  q: string;
  a: string;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

const SQRT3 = Math.sqrt(3);

function compute306090(type: SideType, value: number): TriangleResult | null {
  if (!Number.isFinite(value) || value <= 0) return null;
  switch (type) {
    case "short":
      return { short: value, long: value * SQRT3, hypotenuse: value * 2 };
    case "long":
      return {
        short: value / SQRT3,
        long: value,
        hypotenuse: (value * 2) / SQRT3,
      };
    case "hypotenuse":
      return {
        short: value / 2,
        long: (value * SQRT3) / 2,
        hypotenuse: value,
      };
  }
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function Triangle306090Calculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.30-60-90-triangle-calculator");

  const [sideType, setSideType] = React.useState<SideType>("short");
  const [sideLength, setSideLength] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const SIDE_TYPES: SideType[] = ["short", "long", "hypotenuse"];

  const value = parseFloat(sideLength);
  const result = React.useMemo<TriangleResult | null>(() => {
    if (!touched) return null;
    return compute306090(sideType, value);
  }, [touched, sideType, value]);

  const showError = touched && (!Number.isFinite(value) || value <= 0);

  function loadExample(type: SideType, len: string) {
    setSideType(type);
    setSideLength(len);
    setTouched(true);
  }

  function reset() {
    setSideLength("");
    setTouched(false);
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
            <Label>{t("field.sideType")}</Label>
            <div className="flex flex-wrap gap-2">
              {SIDE_TYPES.map((st) => (
                <Button
                  key={st}
                  type="button"
                  variant={sideType === st ? "default" : "outline"}
                  onClick={() => {
                    setSideType(st);
                    setTouched(false);
                  }}
                >
                  {t(`type.${st}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tri-len">{t("field.sideLength")}</Label>
            <Input
              id="tri-len"
              type="number"
              inputMode="decimal"
              min="0"
              value={sideLength}
              placeholder={t("placeholder.sideLength")}
              onChange={(e) => {
                setSideLength(e.target.value);
                setTouched(true);
              }}
            />
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

          {result && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.short")}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-zinc-900">
                    {fmt(result.short)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.long")}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-zinc-900">
                    {fmt(result.long)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.hypotenuse")}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-zinc-900">
                    {fmt(result.hypotenuse)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("result.ratio")}</div>
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
            onClick={() => loadExample("short", "5")}
          >
            {t("examples.loadShort")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("long", "8.660")}
          >
            {t("examples.loadLong")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("hypotenuse", "10")}
          >
            {t("examples.loadHyp")}
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
