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

type DivisionType = "internal" | "external";

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

export default function RatiosOfDirectedLineSegmentsCalculator(_props: {
  locale: Locale;
}): React.ReactNode {
  const t = useTranslations("tool.ratios-of-directed-line-segments-calculator");
  const [divisionType, setDivisionType] =
    React.useState<DivisionType>("internal");
  const [x1, setX1] = React.useState("");
  const [y1, setY1] = React.useState("");
  const [x2, setX2] = React.useState("");
  const [y2, setY2] = React.useState("");
  const [m, setM] = React.useState("");
  const [n, setN] = React.useState("");
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

  const x1Value = parseNumber(x1);
  const y1Value = parseNumber(y1);
  const x2Value = parseNumber(x2);
  const y2Value = parseNumber(y2);
  const mValue = parseNumber(m);
  const nValue = parseNumber(n);

  const result = React.useMemo(() => {
    if (
      x1Value === null ||
      y1Value === null ||
      x2Value === null ||
      y2Value === null ||
      mValue === null ||
      nValue === null
    ) {
      return null;
    }

    if (divisionType === "internal") {
      const denominator = mValue + nValue;
      if (denominator === 0) return null;
      return {
        x: (mValue * x2Value + nValue * x1Value) / denominator,
        y: (mValue * y2Value + nValue * y1Value) / denominator,
        denominator,
      };
    }

    const denominator = mValue - nValue;
    if (denominator === 0) return null;
    return {
      x: (mValue * x2Value - nValue * x1Value) / denominator,
      y: (mValue * y2Value - nValue * y1Value) / denominator,
      denominator,
    };
  }, [divisionType, mValue, nValue, x1Value, x2Value, y1Value, y2Value]);

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
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setM("");
    setN("");
    setDivisionType("internal");
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
          <div className="space-y-2">
            <Label>{t("field.divisionType")}</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={divisionType === "internal" ? "default" : "outline"}
                onClick={() => {
                  setDivisionType("internal");
                  setSubmitted(false);
                }}
              >
                {t("type.internal")}
              </Button>
              <Button
                type="button"
                variant={divisionType === "external" ? "default" : "outline"}
                onClick={() => {
                  setDivisionType("external");
                  setSubmitted(false);
                }}
              >
                {t("type.external")}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rdls-x1">{t("field.x1")}</Label>
              <Input
                id="rdls-x1"
                type="number"
                inputMode="decimal"
                value={x1}
                onChange={(event) => setX1(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rdls-y1">{t("field.y1")}</Label>
              <Input
                id="rdls-y1"
                type="number"
                inputMode="decimal"
                value={y1}
                onChange={(event) => setY1(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rdls-x2">{t("field.x2")}</Label>
              <Input
                id="rdls-x2"
                type="number"
                inputMode="decimal"
                value={x2}
                onChange={(event) => setX2(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rdls-y2">{t("field.y2")}</Label>
              <Input
                id="rdls-y2"
                type="number"
                inputMode="decimal"
                value={y2}
                onChange={(event) => setY2(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rdls-m">{t("field.m")}</Label>
              <Input
                id="rdls-m"
                type="number"
                inputMode="decimal"
                value={m}
                onChange={(event) => setM(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rdls-n">{t("field.n")}</Label>
              <Input
                id="rdls-n"
                type="number"
                inputMode="decimal"
                value={n}
                onChange={(event) => setN(event.target.value)}
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
              <div className="mt-2 space-y-2 text-zinc-900">
                <p>{t("result.segment", { a: `(${x1}, ${y1})`, b: `(${x2}, ${y2})` })}</p>
                <p>{t("result.ratio", { m: formatNumber(mValue ?? 0), n: formatNumber(nValue ?? 0) })}</p>
                <p className="text-lg font-semibold">
                  {t("result.point", {
                    x: formatNumber(result.x),
                    y: formatNumber(result.y),
                  })}
                </p>
                <p className="text-sm text-zinc-600">
                  {divisionType === "internal"
                    ? t("result.formulaInternal")
                    : t("result.formulaExternal")}
                </p>
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
