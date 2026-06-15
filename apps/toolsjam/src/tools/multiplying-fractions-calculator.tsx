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
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b > 0) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function simplifyFraction(num: number, den: number): [number, number] {
  if (den === 0) return [num, 0];
  const sign = den < 0 ? -1 : 1;
  const absNum = Math.abs(num);
  const absDen = Math.abs(den);
  const g = gcd(absNum, absDen);
  return [sign * (num / g), absDen / g];
}

function formatFraction(num: number, den: number): string {
  if (den === 1) return String(num);
  return `${num}/${den}`;
}

export default function MultiplyingFractionsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.multiplying-fractions-calculator");
  const [n1, setN1] = React.useState("");
  const [d1, setD1] = React.useState("");
  const [n2, setN2] = React.useState("");
  const [d2, setD2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const n1Num = parseFloat(n1);
  const d1Num = parseFloat(d1);
  const n2Num = parseFloat(n2);
  const d2Num = parseFloat(d2);

  const allValid =
    n1 !== "" && d1 !== "" && n2 !== "" && d2 !== "" &&
    Number.isFinite(n1Num) && Number.isFinite(d1Num) &&
    Number.isFinite(n2Num) && Number.isFinite(d2Num) &&
    Number.isInteger(n1Num) && Number.isInteger(d1Num) &&
    Number.isInteger(n2Num) && Number.isInteger(d2Num);

  const zeroDenom = allValid && (d1Num === 0 || d2Num === 0);

  const computed = React.useMemo(() => {
    if (!allValid || d1Num === 0 || d2Num === 0) return null;
    const rawNum = n1Num * n2Num;
    const rawDen = d1Num * d2Num;
    const [sNum, sDen] = simplifyFraction(rawNum, rawDen);
    const unsimplified = formatFraction(rawNum, rawDen);
    const simplified = formatFraction(sNum, sDen);
    const wasSimplified = sNum !== rawNum || sDen !== rawDen;
    return { unsimplified, simplified, wasSimplified, rawNum, rawDen, sNum, sDen };
  }, [n1Num, d1Num, n2Num, d2Num, allValid]);

  function reset() {
    setN1(""); setD1(""); setN2(""); setD2("");
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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 rounded-lg border p-4">
              <p className="font-semibold">{t("field.firstFraction")}</p>
              <div className="space-y-2">
                <Label htmlFor="mf-n1">{t("field.numerator1")}</Label>
                <Input
                  id="mf-n1"
                  type="number"
                  inputMode="decimal"
                  value={n1}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setN1(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mf-d1">{t("field.denominator1")}</Label>
                <Input
                  id="mf-d1"
                  type="number"
                  inputMode="decimal"
                  value={d1}
                  placeholder={t("placeholder.nonZero")}
                  onChange={(e) => { setD1(e.target.value); setTouched(false); }}
                />
              </div>
            </div>
            <div className="space-y-4 rounded-lg border p-4">
              <p className="font-semibold">{t("field.secondFraction")}</p>
              <div className="space-y-2">
                <Label htmlFor="mf-n2">{t("field.numerator2")}</Label>
                <Input
                  id="mf-n2"
                  type="number"
                  inputMode="decimal"
                  value={n2}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setN2(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mf-d2">{t("field.denominator2")}</Label>
                <Input
                  id="mf-d2"
                  type="number"
                  inputMode="decimal"
                  value={d2}
                  placeholder={t("placeholder.nonZero")}
                  onChange={(e) => { setD2(e.target.value); setTouched(false); }}
                />
              </div>
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
          {touched && zeroDenom && (
            <p className="text-sm text-red-600">{t("error.zeroDenominator")}</p>
          )}

          {touched && allValid && !zeroDenom && computed !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-xl font-semibold text-zinc-900 font-mono">
                {formatFraction(n1Num, d1Num)} × {formatFraction(n2Num, d2Num)} = {computed.unsimplified}
                {computed.wasSimplified && ` = ${computed.simplified}`}
              </div>
              {computed.wasSimplified && (
                <div className="text-sm text-zinc-600">
                  {t("result.simplified")}: <span className="font-mono font-medium">{computed.simplified}</span>
                </div>
              )}
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
