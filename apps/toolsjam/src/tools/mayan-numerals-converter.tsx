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

type ConversionMode = "decimalToMayan" | "mayanToDecimal";

interface MayanDigit {
  bars: number;
  dots: number;
  isZero: boolean;
}

interface MayanResult {
  positions: number[];
  decimal: number;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
void gcd;

function decimalToMayan(n: number): number[] {
  if (n === 0) return [0];
  const positions: number[] = [];
  let remaining = n;
  while (remaining > 0) {
    positions.unshift(remaining % 20);
    remaining = Math.floor(remaining / 20);
  }
  return positions;
}

function mayanToDecimal(positions: number[]): number {
  return positions.reduce((acc, digit, idx) => {
    const place = Math.pow(20, positions.length - 1 - idx);
    return acc + digit * place;
  }, 0);
}

function parseMayanInput(input: string): number[] | null {
  const parts = input.trim().split(".");
  if (parts.length === 0) return null;
  const digits: number[] = [];
  for (const part of parts) {
    const n = parseInt(part.trim(), 10);
    if (isNaN(n) || n < 0 || n > 19) return null;
    digits.push(n);
  }
  return digits;
}

function getMayanDigit(n: number): MayanDigit {
  if (n === 0) return { bars: 0, dots: 0, isZero: true };
  return { bars: Math.floor(n / 5), dots: n % 5, isZero: false };
}

function MayanDigitDisplay({ digit }: { digit: MayanDigit }) {
  if (digit.isZero) {
    return (
      <div className="flex items-center justify-center w-12 h-12 text-2xl">
        ⊕
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-0.5">
      {digit.dots > 0 && (
        <div className="flex gap-1">
          {Array.from({ length: digit.dots }).map((_, i) => (
            <span key={i} className="text-xl leading-none">●</span>
          ))}
        </div>
      )}
      {Array.from({ length: digit.bars }).map((_, i) => (
        <div key={i} className="w-10 h-2 bg-zinc-800 rounded-sm" />
      ))}
    </div>
  );
}

export default function MayanNumeralsConverter(_props: { locale: Locale }) {
  const t = useTranslations("tool.mayan-numerals-converter");
  const [mode, setMode] = React.useState<ConversionMode>("decimalToMayan");
  const [decimalInput, setDecimalInput] = React.useState("");
  const [mayanInput, setMayanInput] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [result, setResult] = React.useState<MayanResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function handleConvert() {
    setTouched(true);
    setError(null);
    setResult(null);

    if (mode === "decimalToMayan") {
      const trimmed = decimalInput.trim();
      const n = parseInt(trimmed, 10);
      if (!trimmed || isNaN(n) || n < 0 || !Number.isInteger(n)) {
        setError(t("error.invalidDecimal"));
        return;
      }
      if (n > 999999) {
        setError(t("error.outOfRange"));
        return;
      }
      setResult({ positions: decimalToMayan(n), decimal: n });
    } else {
      const positions = parseMayanInput(mayanInput);
      if (!positions) {
        setError(t("error.invalidMayan"));
        return;
      }
      const dec = mayanToDecimal(positions);
      setResult({ positions, decimal: dec });
    }
  }

  function handleReset() {
    setDecimalInput("");
    setMayanInput("");
    setTouched(false);
    setResult(null);
    setError(null);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
    }
    return arr;
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

  const placeValue = (posIdx: number, total: number) =>
    Math.pow(20, total - 1 - posIdx);

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
            <Label>{t("field.conversionType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["decimalToMayan", "mayanToDecimal"] as ConversionMode[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => { setMode(m); setTouched(false); setResult(null); setError(null); }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {mode === "decimalToMayan" ? (
            <div className="space-y-2">
              <Label htmlFor="mnc-decimal">{t("field.decimalInput")}</Label>
              <Input
                id="mnc-decimal"
                type="number"
                inputMode="numeric"
                value={decimalInput}
                placeholder={t("field.decimalPlaceholder")}
                onChange={(e) => { setDecimalInput(e.target.value); setTouched(false); setResult(null); setError(null); }}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="mnc-mayan">{t("field.mayanInput")}</Label>
              <Input
                id="mnc-mayan"
                type="text"
                value={mayanInput}
                placeholder={t("field.mayanPlaceholder")}
                onChange={(e) => { setMayanInput(e.target.value); setTouched(false); setResult(null); setError(null); }}
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleConvert}>
              {t("button.convert")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && touched && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {mode === "decimalToMayan" ? (
                <>
                  <div className="text-sm text-zinc-600">
                    {t("result.mayanPositions", { positions: result.positions.join(" | ") })}
                  </div>
                  <div className="flex flex-wrap gap-6 items-end">
                    {result.positions.map((digit, idx) => {
                      const place = placeValue(idx, result.positions.length);
                      const d = getMayanDigit(digit);
                      return (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <MayanDigitDisplay digit={d} />
                          <div className="text-xs text-zinc-500">
                            {digit} × {place.toLocaleString("en-US")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-2xl font-semibold text-zinc-900">
                  {t("result.decimalValue", { value: result.decimal.toLocaleString("en-US") })}
                </div>
              )}
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
