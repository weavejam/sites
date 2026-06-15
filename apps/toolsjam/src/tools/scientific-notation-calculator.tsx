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

type ConversionMode = "toScientific" | "toDecimal";

const MODES: ConversionMode[] = ["toScientific", "toDecimal"];

interface SciResult {
  coefficient: number;
  exponent: number;
  scientific: string;
  decimal: string;
}

function toScientificNotation(n: number): SciResult {
  if (n === 0) return { coefficient: 0, exponent: 0, scientific: "0 × 10⁰", decimal: "0" };
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const coeff = n / Math.pow(10, exp);
  const coeffStr = parseFloat(coeff.toPrecision(10)).toString();
  const superscripts: Record<string, string> = {
    "0": "⁰","1": "¹","2": "²","3": "³","4": "⁴",
    "5": "⁵","6": "⁶","7": "⁷","8": "⁸","9": "⁹","-": "⁻",
  };
  const expStr = exp.toString().split("").map((c) => superscripts[c] ?? c).join("");
  return {
    coefficient: coeff,
    exponent: exp,
    scientific: `${coeffStr} × 10${expStr}`,
    decimal: n.toString(),
  };
}

function fromScientificNotation(coeff: number, exp: number): SciResult {
  const value = coeff * Math.pow(10, exp);
  const superscripts: Record<string, string> = {
    "0": "⁰","1": "¹","2": "²","3": "³","4": "⁴",
    "5": "⁵","6": "⁶","7": "⁷","8": "⁸","9": "⁹","-": "⁻",
  };
  const expStr = exp.toString().split("").map((c) => superscripts[c] ?? c).join("");
  return {
    coefficient: coeff,
    exponent: exp,
    scientific: `${coeff} × 10${expStr}`,
    decimal: value.toString(),
  };
}

export default function ScientificNotationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.scientific-notation-calculator");
  const [mode, setMode] = React.useState<ConversionMode>("toScientific");
  const [decimal, setDecimal] = React.useState<string>("");
  const [coefficient, setCoefficient] = React.useState<string>("");
  const [exponent, setExponent] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<SciResult | { error: string } | null>(() => {
    if (!touched) return null;
    try {
      if (mode === "toScientific") {
        const n = parseFloat(decimal);
        if (!Number.isFinite(n)) return { error: t("error.invalid") };
        return toScientificNotation(n);
      } else {
        const c = parseFloat(coefficient);
        const e = parseInt(exponent, 10);
        if (!Number.isFinite(c) || !Number.isFinite(e)) return { error: t("error.invalid") };
        return fromScientificNotation(c, e);
      }
    } catch {
      return { error: t("error.invalid") };
    }
  }, [touched, mode, decimal, coefficient, exponent, t]);

  function reset() {
    setDecimal("");
    setCoefficient("");
    setExponent("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
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
              {MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => {
                    setMode(m);
                    setTouched(false);
                  }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {mode === "toScientific" ? (
            <div className="space-y-2">
              <Label htmlFor="sn-decimal">{t("field.decimal")}</Label>
              <Input
                id="sn-decimal"
                type="number"
                inputMode="decimal"
                value={decimal}
                placeholder={t("placeholder.decimal")}
                onChange={(e) => { setDecimal(e.target.value); setTouched(false); }}
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sn-coeff">{t("field.coefficient")}</Label>
                <Input
                  id="sn-coeff"
                  type="number"
                  inputMode="decimal"
                  value={coefficient}
                  placeholder={t("placeholder.coefficient")}
                  onChange={(e) => { setCoefficient(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sn-exp">{t("field.exponent")}</Label>
                <Input
                  id="sn-exp"
                  type="number"
                  inputMode="numeric"
                  value={exponent}
                  placeholder={t("placeholder.exponent")}
                  onChange={(e) => { setExponent(e.target.value); setTouched(false); }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result !== null && (
            "error" in result ? (
              <p className="text-sm text-red-600">{result.error}</p>
            ) : (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
                <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
                <div className="text-2xl font-semibold text-zinc-900 font-mono">
                  {mode === "toScientific" ? result.scientific : result.decimal}
                </div>
                <div className="text-sm text-zinc-500">
                  {mode === "toScientific"
                    ? `${t("result.coefficient")}: ${result.coefficient} — ${t("result.exponent")}: ${result.exponent}`
                    : `${t("result.scientific")}: ${result.scientific}`}
                </div>
              </div>
            )
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
