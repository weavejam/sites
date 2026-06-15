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

function parseVector(input: string): number[] | "empty" | "parse" {
  const parts = input.trim().split(/[\s,]+/).filter(Boolean);
  if (parts.length === 0) return "empty";
  const values = parts.map((part) => Number(part));
  if (values.some((value) => !Number.isFinite(value))) return "parse";
  return values;
}

function formatNumber(value: number): string {
  const rounded = Math.round(value * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function HadamardProductCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.hadamard-product-calculator");
  const [firstVector, setFirstVector] = React.useState("");
  const [secondVector, setSecondVector] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const howtoSteps = t.raw("howto.steps") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const examplesItems = t.raw("examples.items") as {
    input: string;
    output: string;
    note?: string;
  }[];

  const result = React.useMemo(() => {
    if (!submitted) return null;
    const a = parseVector(firstVector);
    const b = parseVector(secondVector);
    if (a === "empty" || b === "empty") return { error: "empty" as const };
    if (a === "parse" || b === "parse") return { error: "parse" as const };
    if (a.length !== b.length) return { error: "mismatch" as const };
    return { values: a.map((value, index) => value * b[index]) };
  }, [firstVector, secondVector, submitted]);

  function reset() {
    setFirstVector("");
    setSecondVector("");
    setSubmitted(false);
  }

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

  const formattedVector =
    result && !("error" in result)
      ? `[${result.values.map((value) => formatNumber(value)).join(", ")}]`
      : "";

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstVector">{t("field.vectorA")}</Label>
              <Input
                id="firstVector"
                value={firstVector}
                onChange={(event) => {
                  setFirstVector(event.target.value);
                  setSubmitted(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondVector">{t("field.vectorB")}</Label>
              <Input
                id="secondVector"
                value={secondVector}
                onChange={(event) => {
                  setSecondVector(event.target.value);
                  setSubmitted(false);
                }}
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

          {result && "error" in result && (
            <p className="text-sm text-red-600">{t(`error.${result.error}` as never)}</p>
          )}

          {result && "values" in result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-lg font-semibold text-zinc-900">
                {t("result.vector", { value: formattedVector })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{example.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
