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

type OddsFormat = "american" | "decimal" | "fractional";

interface ImpliedProbResult {
  probability: number; // 0–100
  decimalOdds: number;
  americanOdds: number;
  fractionalStr: string;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) { const t = b; b = a % b; a = t; }
  return a;
}

function computeImpliedProbability(
  format: OddsFormat,
  odds: number,
  numerator: number,
  denominator: number
): ImpliedProbResult | null {
  let prob: number;
  let dec: number;

  if (format === "american") {
    if (!Number.isFinite(odds) || odds === 0) return null;
    if (odds < 0) {
      prob = Math.abs(odds) / (Math.abs(odds) + 100);
    } else {
      prob = 100 / (odds + 100);
    }
    dec = odds < 0 ? (100 / Math.abs(odds)) + 1 : (odds / 100) + 1;
  } else if (format === "decimal") {
    if (!Number.isFinite(odds) || odds <= 1) return null;
    prob = 1 / odds;
    dec = odds;
  } else {
    // fractional
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0 || numerator <= 0) return null;
    prob = denominator / (numerator + denominator);
    dec = (numerator / denominator) + 1;
  }

  if (prob <= 0 || prob >= 1) return null;

  // Convert to american
  let am: number;
  if (dec >= 2) {
    am = (dec - 1) * 100;
  } else {
    am = -100 / (dec - 1);
  }

  // Compute fractional odds as exact reduced fraction
  // Approach: use the original input integers if available, or scale decimal profit
  let fn: number, fd: number;
  if (format === "american") {
    // American odds → fractional: negative uses |odds|/100, positive uses odds/100
    if (odds < 0) {
      const rawN = 100;
      const rawD = Math.abs(odds);
      const g = gcd(rawN, rawD);
      fn = rawN / g;
      fd = rawD / g;
    } else {
      const rawN = odds;
      const rawD = 100;
      const g = gcd(rawN, rawD);
      fn = rawN / g;
      fd = rawD / g;
    }
  } else if (format === "fractional") {
    const g = gcd(numerator, denominator);
    fn = numerator / g;
    fd = denominator / g;
  } else {
    // Decimal: profit ratio = dec - 1, express as fraction
    // Multiply by a power of 10 to clear decimals, then simplify
    const profitRatio = dec - 1;
    const scale = 1000000;
    const scaledN = Math.round(profitRatio * scale);
    const scaledD = scale;
    const g = gcd(scaledN, scaledD);
    fn = scaledN / g;
    fd = scaledD / g;
  }
  const fractionalStr = `${fn}/${fd}`;

  return {
    probability: prob * 100,
    decimalOdds: dec,
    americanOdds: Math.round(am),
    fractionalStr,
  };
}

function fmt(n: number, d = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function ImpliedProbabilityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.implied-probability-calculator");

  const FORMATS: OddsFormat[] = ["american", "decimal", "fractional"];
  const [format, setFormat] = React.useState<OddsFormat>("american");
  const [odds, setOdds] = React.useState("");
  const [numerator, setNumerator] = React.useState("");
  const [denominator, setDenominator] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<ImpliedProbResult | null>(() => {
    if (!touched) return null;
    return computeImpliedProbability(
      format,
      parseFloat(odds),
      parseFloat(numerator),
      parseFloat(denominator)
    );
  }, [touched, format, odds, numerator, denominator]);

  function reset() {
    setOdds("");
    setNumerator("");
    setDenominator("");
    setTouched(false);
  }

  function loadExample(fmt: OddsFormat, o: string, num?: string, den?: string) {
    setFormat(fmt);
    setOdds(o);
    setNumerator(num ?? "");
    setDenominator(den ?? "");
    setTouched(true);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: FaqItem[] = React.useMemo(() => {
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
            <Label>{t("field.oddsFormat")}</Label>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <Button
                  key={f}
                  type="button"
                  variant={format === f ? "default" : "outline"}
                  onClick={() => { setFormat(f); setTouched(false); }}
                >
                  {t(`format.${f}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {format !== "fractional" ? (
            <div className="space-y-2">
              <Label htmlFor="ipc-odds">{t("field.odds")}</Label>
              <Input
                id="ipc-odds"
                type="number"
                inputMode="decimal"
                value={odds}
                placeholder={format === "american" ? t("placeholder.american") : t("placeholder.decimal")}
                onChange={(e) => { setOdds(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t(`format.${format}_desc` as never)}</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>{t("field.fractional")}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="ipc-num"
                  type="number"
                  inputMode="numeric"
                  value={numerator}
                  placeholder={t("placeholder.numerator")}
                  onChange={(e) => { setNumerator(e.target.value); setTouched(true); }}
                  className="max-w-[120px]"
                />
                <span className="text-zinc-600 font-semibold">/</span>
                <Input
                  id="ipc-den"
                  type="number"
                  inputMode="numeric"
                  value={denominator}
                  placeholder={t("placeholder.denominator")}
                  onChange={(e) => { setDenominator(e.target.value); setTouched(true); }}
                  className="max-w-[120px]"
                />
              </div>
              <p className="text-xs text-zinc-500">{t("format.fractional_desc")}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-zinc-600">{t("result.probability")}</div>
                <div className="text-2xl font-semibold text-zinc-900">{fmt(result.probability)}%</div>
                <div className="text-zinc-600">{t("result.decimalOdds")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.decimalOdds)}</div>
                <div className="text-zinc-600">{t("result.americanOdds")}</div>
                <div className="font-semibold text-zinc-900">
                  {result.americanOdds > 0 ? `+${result.americanOdds}` : result.americanOdds}
                </div>
                <div className="text-zinc-600">{t("result.fractionalOdds")}</div>
                <div className="font-semibold text-zinc-900">{result.fractionalStr}</div>
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

      {/* Examples */}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("american", "-150")}>
            {t("examples.loadFavorite")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("american", "250")}>
            {t("examples.loadUnderdog")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("decimal", "1.75")}>
            {t("examples.loadDecimal")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("fractional", "", "5", "2")}>
            {t("examples.loadFractional")}
          </Button>
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
