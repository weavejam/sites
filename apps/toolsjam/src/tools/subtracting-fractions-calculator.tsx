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

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

interface FractionResult {
  num: number;
  den: number;
  mixed: string;
  decimal: string;
}

function subtractFractions(n1: number, d1: number, n2: number, d2: number): FractionResult {
  const commonDen = lcm(d1, d2);
  const newN1 = n1 * (commonDen / d1);
  const newN2 = n2 * (commonDen / d2);
  const resultNum = newN1 - newN2;
  const resultDen = commonDen;
  const divisor = gcd(Math.abs(resultNum), resultDen);
  const simplifiedNum = resultNum / divisor;
  const simplifiedDen = resultDen / divisor;

  const sign = simplifiedNum < 0 ? "−" : "";
  const absNum = Math.abs(simplifiedNum);
  const absDen = simplifiedDen;

  let mixed = "";
  if (absDen === 1) {
    mixed = `${sign}${absNum}`;
  } else if (absNum >= absDen) {
    const whole = Math.floor(absNum / absDen);
    const rem = absNum % absDen;
    mixed = rem === 0 ? `${sign}${whole}` : `${sign}${whole} ${rem}/${absDen}`;
  }

  return {
    num: simplifiedNum,
    den: simplifiedDen,
    mixed,
    decimal: (simplifiedNum / simplifiedDen).toLocaleString("en-US", { maximumFractionDigits: 10 }),
  };
}

export default function SubtractingFractionsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.subtracting-fractions-calculator");

  const [n1, setN1] = React.useState("");
  const [d1, setD1] = React.useState("");
  const [n2, setN2] = React.useState("");
  const [d2, setD2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const n1Num = Number(n1);
  const d1Num = Number(d1);
  const n2Num = Number(n2);
  const d2Num = Number(d2);

  const allValid =
    n1 !== "" && d1 !== "" && n2 !== "" && d2 !== "" &&
    Number.isInteger(n1Num) && Number.isInteger(d1Num) &&
    Number.isInteger(n2Num) && Number.isInteger(d2Num);
  const zeroDen = allValid && (d1Num === 0 || d2Num === 0);

  const result = React.useMemo<FractionResult | null>(() => {
    if (!allValid || zeroDen) return null;
    return subtractFractions(n1Num, d1Num, n2Num, d2Num);
  }, [allValid, zeroDen, n1Num, d1Num, n2Num, d2Num]);

  function loadExample(vn1: string, vd1: string, vn2: string, vd2: string) {
    setN1(vn1); setD1(vd1); setN2(vn2); setD2(vd2); setTouched(true);
  }

  function reset() {
    setN1(""); setD1(""); setN2(""); setD2(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  const showInvalid = touched && !allValid;
  const showZeroDen = touched && allValid && zeroDen;

  const fractionLabel = result
    ? result.den === 1
      ? `${result.num}`
      : `${result.num}/${result.den}`
    : null;

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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-semibold text-lg">{t("field.fraction1heading")}</h3>
              <div className="space-y-2">
                <Label htmlFor="sfc-n1">{t("field.numerator1")}</Label>
                <Input
                  id="sfc-n1"
                  type="number"
                  inputMode="numeric"
                  value={n1}
                  placeholder={t("placeholder.numerator")}
                  onChange={(e) => { setN1(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sfc-d1">{t("field.denominator1")}</Label>
                <Input
                  id="sfc-d1"
                  type="number"
                  inputMode="numeric"
                  value={d1}
                  placeholder={t("placeholder.denominator")}
                  onChange={(e) => { setD1(e.target.value); setTouched(true); }}
                />
              </div>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-semibold text-lg">{t("field.fraction2heading")}</h3>
              <div className="space-y-2">
                <Label htmlFor="sfc-n2">{t("field.numerator2")}</Label>
                <Input
                  id="sfc-n2"
                  type="number"
                  inputMode="numeric"
                  value={n2}
                  placeholder={t("placeholder.numerator")}
                  onChange={(e) => { setN2(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sfc-d2">{t("field.denominator2")}</Label>
                <Input
                  id="sfc-d2"
                  type="number"
                  inputMode="numeric"
                  value={d2}
                  placeholder={t("placeholder.denominator")}
                  onChange={(e) => { setD2(e.target.value); setTouched(true); }}
                />
              </div>
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

          {showInvalid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showZeroDen && (
            <p className="text-sm text-red-600">{t("error.zeroDenominator")}</p>
          )}

          {result !== null && !showZeroDen && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-1 sm:grid-cols-3">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.fractionLabel")}: </span>
                  <span className="font-semibold text-zinc-900">{fractionLabel}</span>
                </div>
                {result.mixed && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.mixedLabel")}: </span>
                    <span className="font-semibold text-zinc-900">{result.mixed}</span>
                  </div>
                )}
                <div>
                  <span className="text-xs text-zinc-500">{t("result.decimalLabel")}: </span>
                  <span className="font-semibold text-zinc-900">{result.decimal}</span>
                </div>
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("5", "8", "3", "8")}>
            {t("examples.load1")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("3", "4", "1", "2")}>
            {t("examples.load2")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("2", "3", "5", "6")}>
            {t("examples.load3")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
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
