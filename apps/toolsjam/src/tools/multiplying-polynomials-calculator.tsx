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

function parseCoefficients(input: string): number[] | null {
  const parts = input.trim().split(/[\s,]+/).filter(Boolean);
  if (parts.length === 0) return null;
  const nums = parts.map((p) => parseFloat(p));
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

function multiplyPolynomials(p1: number[], p2: number[]): number[] {
  const result = new Array(p1.length + p2.length - 1).fill(0) as number[];
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      result[i + j] += p1[i] * p2[j];
    }
  }
  return result.map((n) => Math.round(n * 1e10) / 1e10);
}

const SUPERSCRIPTS: Record<number, string> = {
  2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹",
};

function powerSuffix(n: number): string {
  if (n === 0) return "";
  if (n === 1) return "x";
  if (SUPERSCRIPTS[n]) return `x${SUPERSCRIPTS[n]}`;
  return `x^${n}`;
}

function formatPolyCoeffs(coeffs: number[]): string {
  const terms: string[] = [];
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const varPart = powerSuffix(i);
    let term: string;
    if (varPart === "") {
      term = String(c);
    } else if (c === 1) {
      term = varPart;
    } else if (c === -1) {
      term = `-${varPart}`;
    } else {
      term = `${c}${varPart}`;
    }
    terms.push(term);
  });
  if (terms.length === 0) return "0";
  let result = terms[0];
  for (let i = 1; i < terms.length; i++) {
    const tm = terms[i];
    if (tm.startsWith("-")) {
      result += ` - ${tm.slice(1)}`;
    } else {
      result += ` + ${tm}`;
    }
  }
  return result;
}

export default function MultiplyingPolynomialsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.multiplying-polynomials-calculator");
  const [poly1, setPoly1] = React.useState("");
  const [poly2, setPoly2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const p1 = React.useMemo(() => parseCoefficients(poly1), [poly1]);
  const p2 = React.useMemo(() => parseCoefficients(poly2), [poly2]);

  const allValid = p1 !== null && p2 !== null;

  const computed = React.useMemo(() => {
    if (!p1 || !p2) return null;
    const product = multiplyPolynomials(p1, p2);
    return {
      p1Display: formatPolyCoeffs(p1),
      p2Display: formatPolyCoeffs(p2),
      productDisplay: formatPolyCoeffs(product),
      product,
    };
  }, [p1, p2]);

  function reset() {
    setPoly1(""); setPoly2("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as Array<{ input: string; output: string; note: string }>;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as Array<{ q: string; a: string }>;
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("card.title")}</CardTitle>
          <CardDescription>{t("card.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mp-poly1">{t("field.poly1")}</Label>
              <Input
                id="mp-poly1"
                type="text"
                value={poly1}
                placeholder={t("placeholder.poly")}
                onChange={(e) => { setPoly1(e.target.value); setTouched(false); }}
              />
              <p className="text-xs text-zinc-500">{t("field.polyHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mp-poly2">{t("field.poly2")}</Label>
              <Input
                id="mp-poly2"
                type="text"
                value={poly2}
                placeholder={t("placeholder.poly")}
                onChange={(e) => { setPoly2(e.target.value); setTouched(false); }}
              />
              <p className="text-xs text-zinc-500">{t("field.polyHint")}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && allValid && computed !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-xl font-semibold text-zinc-900 font-mono">
                ({computed.p1Display}) × ({computed.p2Display}) = {computed.productDisplay}
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
                  <td className="px-3 py-2 text-zinc-800 font-mono">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900 font-mono">{ex.output}</td>
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
