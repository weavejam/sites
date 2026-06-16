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

type Operation = "AND" | "OR" | "XOR" | "NOT" | "LSH" | "RSH";
type InputFormat = "decimal" | "binary" | "hex";

const OPERATIONS: Operation[] = ["AND", "OR", "XOR", "NOT", "LSH", "RSH"];
const FORMATS: InputFormat[] = ["decimal", "binary", "hex"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function parseNum(value: string, format: InputFormat): number | null {
  const v = value.trim();
  if (!v) return null;
  let n: number;
  if (format === "decimal") {
    n = parseInt(v, 10);
  } else if (format === "binary") {
    if (!/^[01]+$/.test(v)) return null;
    n = parseInt(v, 2);
  } else {
    if (!/^[0-9a-fA-F]+$/.test(v)) return null;
    n = parseInt(v, 16);
  }
  return Number.isFinite(n) ? n : null;
}

function formatResult(n: number) {
  const u = n >>> 0;
  return {
    decimal: n.toString(10),
    binary: u.toString(2),
    hex: u.toString(16).toUpperCase(),
  };
}

export default function BitwiseCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.bitwise-calculator");
  const [operation, setOperation] = React.useState<Operation>("AND");
  const [format, setFormat] = React.useState<InputFormat>("decimal");
  const [inputA, setInputA] = React.useState("");
  const [inputB, setInputB] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const needsB = operation !== "NOT";
  const isShift = operation === "LSH" || operation === "RSH";

  const numA = React.useMemo(() => parseNum(inputA, format), [inputA, format]);
  const numB = React.useMemo(
    () => (needsB ? parseNum(inputB, isShift ? "decimal" : format) : 0),
    [inputB, format, needsB, isShift]
  );

  const result = React.useMemo<number | null>(() => {
    if (numA === null) return null;
    if (needsB && numB === null) return null;
    const b = numB ?? 0;
    switch (operation) {
      case "AND": return numA & b;
      case "OR":  return numA | b;
      case "XOR": return numA ^ b;
      case "NOT": return ~numA;
      case "LSH": return numA << (b & 31);
      case "RSH": return numA >>> (b & 31);
    }
  }, [operation, numA, numB, needsB]);

  function reset() {
    setInputA("");
    setInputB("");
    setTouched(false);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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

  const showError = touched && (numA === null || (needsB && numB === null));
  const resultFormatted = result !== null && !showError ? formatResult(result) : null;

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
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
            <Label>{t("field.operation")}</Label>
            <div className="flex flex-wrap gap-2">
              {OPERATIONS.map((op) => (
                <Button
                  key={op}
                  type="button"
                  variant={operation === op ? "default" : "outline"}
                  onClick={() => { setOperation(op); setTouched(false); }}
                >
                  {t(`type.${op}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.format")}</Label>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((fmt) => (
                <Button
                  key={fmt}
                  type="button"
                  size="sm"
                  variant={format === fmt ? "default" : "outline"}
                  onClick={() => { setFormat(fmt); setInputA(""); setInputB(""); setTouched(false); }}
                >
                  {t(`format.${fmt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bw-a">{t("field.numberA")}</Label>
              <Input
                id="bw-a"
                value={inputA}
                placeholder={t(`placeholder.${format}` as never)}
                onChange={(e) => { setInputA(e.target.value); setTouched(true); }}
              />
            </div>
            {needsB && (
              <div className="space-y-2">
                <Label htmlFor="bw-b">
                  {isShift ? t("field.shiftAmount") : t("field.numberB")}
                </Label>
                <Input
                  id="bw-b"
                  value={inputB}
                  placeholder={isShift ? t("placeholder.decimal") : t(`placeholder.${format}` as never)}
                  onChange={(e) => { setInputB(e.target.value); setTouched(true); }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {resultFormatted && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-20 font-medium text-zinc-500">{t("result.decimal")}</span>
                  <span className="font-semibold text-zinc-900">{resultFormatted.decimal}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-20 font-medium text-zinc-500">{t("result.binary")}</span>
                  <span className="font-semibold font-mono text-zinc-900">{resultFormatted.binary}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-20 font-medium text-zinc-500">{t("result.hex")}</span>
                  <span className="font-semibold font-mono text-zinc-900">{resultFormatted.hex}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
