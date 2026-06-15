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

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function parseNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function RectangularPrismCalculator(_props: {
  locale: Locale;
}): React.ReactNode {
  const t = useTranslations("tool.rectangular-prism-calculator");
  const [length, setLength] = React.useState("");
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const items: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) items.push({ q, a });
      } catch {
        break;
      }
    }
    return items;
  }, [t]);

  const lengthValue = parseNumber(length);
  const widthValue = parseNumber(width);
  const heightValue = parseNumber(height);

  const result = React.useMemo(() => {
    if (lengthValue === null || widthValue === null || heightValue === null) {
      return null;
    }
    if (lengthValue <= 0 || widthValue <= 0 || heightValue <= 0) return null;

    return {
      volume: lengthValue * widthValue * heightValue,
      surfaceArea:
        2 *
        (lengthValue * widthValue +
          lengthValue * heightValue +
          widthValue * heightValue),
      spaceDiagonal: Math.sqrt(
        lengthValue ** 2 + widthValue ** 2 + heightValue ** 2,
      ),
      faceDiagonalLW: Math.sqrt(lengthValue ** 2 + widthValue ** 2),
      faceDiagonalLH: Math.sqrt(lengthValue ** 2 + heightValue ** 2),
      faceDiagonalWH: Math.sqrt(widthValue ** 2 + heightValue ** 2),
    };
  }, [heightValue, lengthValue, widthValue]);

  const showError = submitted && !result;

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

  function reset(): void {
    setLength("");
    setWidth("");
    setHeight("");
    setSubmitted(false);
  }

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
              <Label htmlFor="rpc-length">{t("field.length")}</Label>
              <Input
                id="rpc-length"
                type="number"
                inputMode="decimal"
                value={length}
                onChange={(event) => setLength(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpc-width">{t("field.width")}</Label>
              <Input
                id="rpc-width"
                type="number"
                inputMode="decimal"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpc-height">{t("field.height")}</Label>
              <Input
                id="rpc-height"
                type="number"
                inputMode="decimal"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setSubmitted(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {submitted && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.volumeLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.volume)}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.surfaceAreaLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.surfaceArea)}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.spaceDiagonalLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.spaceDiagonal)}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.faceDiagonalLWLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.faceDiagonalLW)}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.faceDiagonalLHLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.faceDiagonalLH)}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.faceDiagonalWHLabel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.faceDiagonalWH)}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-zinc-500">{t("formula")}</p>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">
                    {example.note ?? ""}
                  </td>
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
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
