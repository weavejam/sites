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

type OutputUnit = "degrees" | "radians";

function formatNumber(n: number, precision: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(precision);
}

export default function ArccosCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.arccos-calculator");
  const [inputValue, setInputValue] = React.useState<string>("");
  const [outputUnit, setOutputUnit] = React.useState<OutputUnit>("degrees");
  const [precision, setPrecision] = React.useState<string>("4");
  const [touched, setTouched] = React.useState(false);

  const xNum = parseFloat(inputValue);
  const precisionNum = Math.max(0, Math.min(10, parseInt(precision, 10) || 4));
  const inputValid =
    inputValue !== "" &&
    Number.isFinite(xNum) &&
    xNum >= -1 &&
    xNum <= 1;

  const result = React.useMemo<number | null>(() => {
    if (!inputValid) return null;
    const rad = Math.acos(xNum);
    return outputUnit === "radians" ? rad : (rad * 180) / Math.PI;
  }, [xNum, outputUnit, inputValid]);

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

  function reset() {
    setInputValue("");
    setPrecision("4");
    setTouched(false);
  }

  const showDomainError =
    touched && inputValue !== "" && Number.isFinite(xNum) && (xNum < -1 || xNum > 1);
  const showInputError = touched && (inputValue === "" || !Number.isFinite(xNum));

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
              <Label htmlFor="arccos-input">{t("field.value")}</Label>
              <Input
                id="arccos-input"
                type="number"
                inputMode="decimal"
                value={inputValue}
                placeholder={t("placeholder.range")}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.valueHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="arccos-precision">{t("field.precision")}</Label>
              <Input
                id="arccos-precision"
                type="number"
                inputMode="numeric"
                value={precision}
                min={0}
                max={10}
                onChange={(e) => setPrecision(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.outputUnit")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["degrees", "radians"] as OutputUnit[]).map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={outputUnit === u ? "default" : "outline"}
                  onClick={() => {
                    setOutputUnit(u);
                    setTouched(false);
                  }}
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

          {showInputError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showDomainError && (
            <p className="text-sm text-red-600">{t("error.domain")}</p>
          )}

          {result !== null && !showInputError && !showDomainError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t("result.value", {
                  x: inputValue,
                  result: formatNumber(result, precisionNum),
                  unit: t(`unit.${outputUnit}` as never),
                })}
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
