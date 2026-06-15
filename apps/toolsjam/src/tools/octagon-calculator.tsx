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

interface OctagonResult {
  area: number;
  perimeter: number;
  apothem: number;
  circumradius: number;
  diagonalShort: number;
  diagonalMedium: number;
  diagonalLong: number;
}

const SQRT2 = Math.SQRT2; // √2

function computeOctagon(a: number): OctagonResult {
  // Regular octagon with side length a
  const area = 2 * (1 + SQRT2) * a * a;
  const perimeter = 8 * a;
  const apothem = (a / 2) * (1 + SQRT2); // inradius — distance centre to side midpoint
  const circumradius = (a / 2) * Math.sqrt(4 + 2 * SQRT2); // circumradius — centre to vertex
  const diagonalShort = a * Math.sqrt(2 + SQRT2);    // connects vertices 2 apart
  const diagonalMedium = a * (1 + SQRT2);             // connects vertices 3 apart
  const diagonalLong = a * Math.sqrt(4 + 2 * SQRT2); // diameter — connects opposite vertices

  return { area, perimeter, apothem, circumradius, diagonalShort, diagonalMedium, diagonalLong };
}

function fmt(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export default function OctagonCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.octagon-calculator");
  const [side, setSide] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const sideNum = parseFloat(side);
  const sideValid = side !== "" && Number.isFinite(sideNum) && sideNum > 0;

  const result = React.useMemo<OctagonResult | null>(() => {
    if (!sideValid) return null;
    return computeOctagon(sideNum);
  }, [sideNum, sideValid]);

  function reset() {
    setSide("");
    setTouched(false);
  }

  function loadExample(val: string) {
    setSide(val);
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
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: t("tagline"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const showError = touched && (!sideValid);

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
            <Label htmlFor="oct-side">{t("field.side")}</Label>
            <Input
              id="oct-side"
              type="number"
              inputMode="decimal"
              value={side}
              placeholder={t("placeholder.side")}
              onChange={(e) => {
                setSide(e.target.value);
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.area")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.area)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.perimeter")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.perimeter)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.apothem")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.apothem)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.circumradius")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.circumradius)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.diagonalShort")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.diagonalShort)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.diagonalMedium")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.diagonalMedium)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.diagonalLong")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.diagonalLong)}
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
            onClick={() => loadExample("10")}
          >
            {t("examples.load10")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2.5")}
          >
            {t("examples.load25")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("120")}
          >
            {t("examples.load120")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
