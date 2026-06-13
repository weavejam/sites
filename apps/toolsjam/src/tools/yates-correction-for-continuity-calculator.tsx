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

interface YatesResult {
  chi2: number;
  pValue: number;
  df: number;
  Ea: number;
  Eb: number;
  Ec: number;
  Ed: number;
  N: number;
  significant: boolean;
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

function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const p =
    t *
    (0.254829592 +
      t *
        (-0.284496736 +
          t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const r = 1 - p * Math.exp(-x * x);
  return x >= 0 ? r : -r;
}

function computeYates(
  a: number,
  b: number,
  c: number,
  d: number
): YatesResult | null {
  if (
    !Number.isInteger(a) ||
    !Number.isInteger(b) ||
    !Number.isInteger(c) ||
    !Number.isInteger(d)
  )
    return null;
  if (a < 0 || b < 0 || c < 0 || d < 0) return null;
  const N = a + b + c + d;
  if (N === 0) return null;
  const R1 = a + b;
  const R2 = c + d;
  const C1 = a + c;
  const C2 = b + d;
  if (R1 === 0 || R2 === 0 || C1 === 0 || C2 === 0) return null;

  const Ea = (R1 * C1) / N;
  const Eb = (R1 * C2) / N;
  const Ec = (R2 * C1) / N;
  const Ed = (R2 * C2) / N;

  const term = (obs: number, exp: number) => {
    const diff = Math.max(0, Math.abs(obs - exp) - 0.5);
    return (diff * diff) / exp;
  };

  const chi2 = term(a, Ea) + term(b, Eb) + term(c, Ec) + term(d, Ed);
  const pValue = 1 - erf(Math.sqrt(chi2 / 2));

  return {
    chi2,
    pValue,
    df: 1,
    Ea,
    Eb,
    Ec,
    Ed,
    N,
    significant: pValue < 0.05,
  };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

function parseIntInput(s: string): number {
  const trimmed = s.trim();
  if (trimmed === "" || !/^-?\d+$/.test(trimmed)) return NaN;
  return parseInt(trimmed, 10);
}

export default function YatesCorrectionForContinuityCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.yates-correction-for-continuity-calculator");
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [c, setC] = React.useState("");
  const [d, setD] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseIntInput(a);
  const bNum = parseIntInput(b);
  const cNum = parseIntInput(c);
  const dNum = parseIntInput(d);

  const result = React.useMemo<YatesResult | null>(() => {
    if (
      !Number.isFinite(aNum) ||
      !Number.isFinite(bNum) ||
      !Number.isFinite(cNum) ||
      !Number.isFinite(dNum)
    )
      return null;
    return computeYates(aNum, bNum, cNum, dNum);
  }, [aNum, bNum, cNum, dNum]);

  const showError = touched && result === null;

  function reset() {
    setA("");
    setB("");
    setC("");
    setD("");
    setTouched(false);
  }

  function loadExample(va: string, vb: string, vc: string, vd: string) {
    setA(va);
    setB(vb);
    setC(vc);
    setD(vd);
    setTouched(true);
  }

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
          <p className="text-sm text-zinc-600">{t("table.label")}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="yates-a">{t("field.a")}</Label>
              <Input
                id="yates-a"
                type="number"
                inputMode="numeric"
                min={0}
                value={a}
                placeholder="0"
                onChange={(e) => {
                  setA(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yates-b">{t("field.b")}</Label>
              <Input
                id="yates-b"
                type="number"
                inputMode="numeric"
                min={0}
                value={b}
                placeholder="0"
                onChange={(e) => {
                  setB(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yates-c">{t("field.c")}</Label>
              <Input
                id="yates-c"
                type="number"
                inputMode="numeric"
                min={0}
                value={c}
                placeholder="0"
                onChange={(e) => {
                  setC(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yates-d">{t("field.d")}</Label>
              <Input
                id="yates-d"
                type="number"
                inputMode="numeric"
                min={0}
                value={d}
                placeholder="0"
                onChange={(e) => {
                  setD(e.target.value);
                  setTouched(true);
                }}
              />
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

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.chi2")}
                  </div>
                  <div className="text-xl font-semibold">
                    {fmt(result.chi2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.pValue")}
                  </div>
                  <div className="text-xl font-semibold">
                    {fmt(result.pValue)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.df")}</div>
                  <div className="text-xl font-semibold">{result.df}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.N")}</div>
                  <div className="text-xl font-semibold">{result.N}</div>
                </div>
              </div>
              <div
                className={`text-sm font-medium ${
                  result.significant ? "text-red-600" : "text-green-600"
                }`}
              >
                {result.significant
                  ? t("result.significant")
                  : t("result.notSignificant")}
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("3", "22", "11", "14")}
          >
            {t("examples.loadVaccine")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("15", "5", "8", "12")}
          >
            {t("examples.loadTeaching")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("25", "975", "15", "985")}
          >
            {t("examples.loadAB")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
