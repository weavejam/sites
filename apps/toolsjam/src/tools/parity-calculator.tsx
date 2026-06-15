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

type NumberSystem = "auto" | "decimal" | "binary" | "hexadecimal";
type ParityType = "even" | "odd";

const NUMBER_SYSTEMS: NumberSystem[] = ["auto", "decimal", "binary", "hexadecimal"];
const PARITY_TYPES: ParityType[] = ["even", "odd"];

function parseNumber(input: string, system: NumberSystem): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  let n: number;
  if (system === "auto") {
    if (/^0[bB][01]+$/.test(trimmed)) {
      n = parseInt(trimmed.slice(2), 2);
    } else if (/^0[xX][0-9a-fA-F]+$/.test(trimmed)) {
      n = parseInt(trimmed.slice(2), 16);
    } else if (/^[0-9]+$/.test(trimmed)) {
      n = parseInt(trimmed, 10);
    } else {
      return null;
    }
  } else if (system === "binary") {
    const clean =
      trimmed.startsWith("0b") || trimmed.startsWith("0B")
        ? trimmed.slice(2)
        : trimmed;
    if (!/^[01]+$/.test(clean)) return null;
    n = parseInt(clean, 2);
  } else if (system === "hexadecimal") {
    const clean =
      trimmed.startsWith("0x") || trimmed.startsWith("0X")
        ? trimmed.slice(2)
        : trimmed;
    if (!/^[0-9a-fA-F]+$/.test(clean)) return null;
    n = parseInt(clean, 16);
  } else {
    if (!/^[0-9]+$/.test(trimmed)) return null;
    n = parseInt(trimmed, 10);
  }
  if (isNaN(n) || !isFinite(n) || n < 0) return null;
  return n;
}

function hammingWeight(n: number): number {
  return n.toString(2).split("").filter((b) => b === "1").length;
}

export default function ParityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.parity-calculator");
  const [numberInput, setNumberInput] = React.useState("");
  const [numberSystem, setNumberSystem] = React.useState<NumberSystem>("auto");
  const [parityType, setParityType] = React.useState<ParityType>("even");
  const [touched, setTouched] = React.useState(false);

  const parsed = React.useMemo(
    () => parseNumber(numberInput, numberSystem),
    [numberInput, numberSystem]
  );
  const isValid = parsed !== null;

  const result = React.useMemo(() => {
    if (parsed === null) return null;
    const isEven = parsed % 2 === 0;
    const onesCount = hammingWeight(parsed);
    const evenParityBit = onesCount % 2 === 0 ? 0 : 1;
    const parityBit = parityType === "even" ? evenParityBit : 1 - evenParityBit;
    return {
      isEven,
      binary: parsed.toString(2),
      hexadecimal: parsed.toString(16).toUpperCase(),
      onesCount,
      parityBit,
    };
  }, [parsed, parityType]);

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
    setNumberInput("");
    setTouched(false);
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pc-number">{t("field.numberInput")}</Label>
              <Input
                id="pc-number"
                type="text"
                value={numberInput}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setNumberInput(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-system">{t("field.numberSystem")}</Label>
              <select
                id="pc-system"
                value={numberSystem}
                onChange={(e) =>
                  setNumberSystem(e.target.value as NumberSystem)
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm"
              >
                {NUMBER_SYSTEMS.map((s) => (
                  <option key={s} value={s}>
                    {t(`type.${s}` as never)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.parityType")}</Label>
            <div className="flex flex-wrap gap-2">
              {PARITY_TYPES.map((pt) => (
                <Button
                  key={pt}
                  type="button"
                  variant={parityType === pt ? "default" : "outline"}
                  onClick={() => setParityType(pt)}
                >
                  {t(`type.parity_${pt}` as never)}
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

          {touched && !isValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && isValid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.parity")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.isEven ? t("result.even") : t("result.odd")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.parityBit")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.parityBit}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.binary")}
                  </div>
                  <div className="font-mono font-semibold text-zinc-900 break-all">
                    {result.binary}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.hex")}</div>
                  <div className="font-mono font-semibold text-zinc-900">
                    0x{result.hexadecimal}
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.onesCount", { count: result.onesCount })}
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
