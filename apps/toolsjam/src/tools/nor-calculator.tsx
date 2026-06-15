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

type InputType = "binary" | "boolean";
type InputCount = "twoInputs" | "threeInputs" | "fourInputs";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface TruthRow {
  inputs: boolean[];
  output: boolean;
}

function parseBit(val: string): boolean | null {
  const v = val.trim().toLowerCase();
  if (v === "1" || v === "true" || v === "t") return true;
  if (v === "0" || v === "false" || v === "f") return false;
  return null;
}

function norGate(inputs: boolean[]): boolean {
  return !inputs.some(Boolean);
}

function generateTruthTable(count: number): TruthRow[] {
  const rows: TruthRow[] = [];
  const total = Math.pow(2, count);
  for (let i = 0; i < total; i++) {
    const inputs: boolean[] = [];
    for (let b = count - 1; b >= 0; b--) {
      inputs.push(Boolean((i >> b) & 1));
    }
    rows.push({ inputs, output: norGate(inputs) });
  }
  return rows;
}

function formatBool(b: boolean): string {
  return b ? "1" : "0";
}

export default function NorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.nor-calculator");
  const [inputType, setInputType] = React.useState<InputType>("binary");
  const [inputCount, setInputCount] = React.useState<InputCount>("twoInputs");
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [c, setC] = React.useState("");
  const [d, setD] = React.useState("");
  const [showTruthTable, setShowTruthTable] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const countNum = inputCount === "twoInputs" ? 2 : inputCount === "threeInputs" ? 3 : 4;

  const parsedInputs = React.useMemo<(boolean | null)[]>(() => {
    const vals = [a, b, c, d].slice(0, countNum);
    return vals.map(parseBit);
  }, [a, b, c, d, countNum]);

  const allValid = parsedInputs.every((v) => v !== null);

  const result = React.useMemo<boolean | null>(() => {
    if (!allValid) return null;
    return norGate(parsedInputs as boolean[]);
  }, [parsedInputs, allValid]);

  const truthTable = React.useMemo<TruthRow[]>(() => {
    return generateTruthTable(countNum);
  }, [countNum]);

  function reset() {
    setA("");
    setB("");
    setC("");
    setD("");
    setShowTruthTable(false);
    setTouched(false);
  }

  function handleInputChange(setter: (v: string) => void, val: string) {
    setter(val);
    setTouched(true);
  }

  const INPUT_COUNTS: InputCount[] = ["twoInputs", "threeInputs", "fourInputs"];
  const INPUT_LABELS = ["A", "B", "C", "D"];
  const inputSetters = [setA, setB, setC, setD];
  const inputValues = [a, b, c, d];

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
        applicationCategory: "EducationalApplication",
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
          <div className="space-y-2">
            <Label>{t("field.inputType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["binary", "boolean"] as InputType[]).map((it) => (
                <Button
                  key={it}
                  type="button"
                  variant={inputType === it ? "default" : "outline"}
                  onClick={() => {
                    setInputType(it);
                    setTouched(false);
                  }}
                >
                  {t(`type.${it}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-xs text-zinc-500">{t(`type.${inputType}_hint` as never)}</p>
          </div>

          <div className="space-y-2">
            <Label>{t("field.inputCount")}</Label>
            <div className="flex flex-wrap gap-2">
              {INPUT_COUNTS.map((ic) => (
                <Button
                  key={ic}
                  type="button"
                  variant={inputCount === ic ? "default" : "outline"}
                  onClick={() => {
                    setInputCount(ic);
                    setTouched(false);
                  }}
                >
                  {t(`count.${ic}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: countNum }, (_, i) => (
              <div key={i} className="space-y-2">
                <Label htmlFor={`nor-input-${i}`}>
                  {t("field.input")} {INPUT_LABELS[i]}
                </Label>
                <Input
                  id={`nor-input-${i}`}
                  type="text"
                  value={inputValues[i]}
                  placeholder={t(`placeholder.${inputType}` as never)}
                  onChange={(e) =>
                    handleInputChange(inputSetters[i], e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowTruthTable((v) => !v)}
            >
              {t("button.toggleTruthTable")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && allValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t("result.norLabel")}: {result ? t("result.true") : t("result.false")} ({formatBool(result)})
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          {showTruthTable && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-zinc-700">
                {t("truthTable.heading")}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50">
                      {INPUT_LABELS.slice(0, countNum).map((label) => (
                        <th key={label} className="px-3 py-2 font-semibold">
                          {label}
                        </th>
                      ))}
                      <th className="px-3 py-2 font-semibold">
                        {t("truthTable.output")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {truthTable.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-zinc-100 align-top"
                      >
                        {row.inputs.map((inp, j) => (
                          <td key={j} className="px-3 py-2 text-zinc-800">
                            {formatBool(inp)}
                          </td>
                        ))}
                        <td className="px-3 py-2 font-medium text-zinc-900">
                          {formatBool(row.output)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
