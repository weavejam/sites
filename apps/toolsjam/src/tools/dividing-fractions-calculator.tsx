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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a === 0 ? 1 : a;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function DividingFractionsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dividing-fractions-calculator");
  const [num1, setNum1] = React.useState("");
  const [den1, setDen1] = React.useState("");
  const [num2, setNum2] = React.useState("");
  const [den2, setDen2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const a = parseFloat(num1);
  const b = parseFloat(den1);
  const c = parseFloat(num2);
  const d = parseFloat(den2);

  const aValid = num1 !== "" && Number.isFinite(a) && Number.isInteger(a);
  const bValid = den1 !== "" && Number.isFinite(b) && Number.isInteger(b) && b !== 0;
  const cValid = num2 !== "" && Number.isFinite(c) && Number.isInteger(c);
  const dValid = den2 !== "" && Number.isFinite(d) && Number.isInteger(d) && d !== 0;
  const allValid = aValid && bValid && cValid && dValid;
  const divByZero = allValid && c === 0;

  type CalcResult = {
    ad: number;
    bc: number;
    rn: number;
    rd: number;
    decimal: number;
  };

  const result = React.useMemo<CalcResult | null>(() => {
    if (!allValid || divByZero) return null;
    const ad = a * d;
    const bc = b * c;
    const g = gcd(Math.abs(ad), Math.abs(bc));
    // Normalise sign: keep denominator positive, put sign in numerator
    const sign = bc < 0 ? -1 : 1;
    const rn = (sign * ad) / g;
    const rd = Math.abs(bc) / g;
    return { ad, bc, rn, rd, decimal: ad / bc };
  }, [a, b, c, d, allValid, divByZero]);

  function reset() {
    setNum1("");
    setDen1("");
    setNum2("");
    setDen2("");
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

  const showError = touched && !allValid;
  const showDivZero = touched && allValid && divByZero;

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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-700">
                {t("field.fraction1")}
              </p>
              <div className="space-y-2">
                <Label htmlFor="df-num1">{t("field.num1")}</Label>
                <Input
                  id="df-num1"
                  type="number"
                  inputMode="numeric"
                  value={num1}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setNum1(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="df-den1">{t("field.den1")}</Label>
                <Input
                  id="df-den1"
                  type="number"
                  inputMode="numeric"
                  value={den1}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setDen1(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-700">
                {t("field.fraction2")}
              </p>
              <div className="space-y-2">
                <Label htmlFor="df-num2">{t("field.num2")}</Label>
                <Input
                  id="df-num2"
                  type="number"
                  inputMode="numeric"
                  value={num2}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setNum2(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="df-den2">{t("field.den2")}</Label>
                <Input
                  id="df-den2"
                  type="number"
                  inputMode="numeric"
                  value={den2}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setDen2(e.target.value);
                    setTouched(true);
                  }}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showDivZero && (
            <p className="text-sm text-red-600">{t("error.divByZero")}</p>
          )}

          {result !== null && !showError && !showDivZero && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.step1" as never, {
                  a: String(a),
                  b: String(b),
                })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.step2" as never, {
                  c: String(c),
                  d: String(d),
                })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.step3" as never, {
                  a: String(a),
                  b: String(b),
                  c: String(c),
                  d: String(d),
                  ad: String(result.ad),
                  bc: String(result.bc),
                })}
              </div>
              <div className="mt-2 text-2xl font-semibold text-zinc-900">
                {result.rd === 1
                  ? String(result.rn)
                  : t("result.step4" as never, {
                      rn: String(result.rn),
                      rd: String(result.rd),
                    })}
              </div>
              <div className="text-sm text-zinc-500">
                {t("result.decimal" as never, {
                  decimal: formatNum(result.decimal),
                })}
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
