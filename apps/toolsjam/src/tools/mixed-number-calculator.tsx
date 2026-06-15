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

type Operation = "add" | "subtract" | "multiply" | "divide";
const OPERATIONS: Operation[] = ["add", "subtract", "multiply", "divide"];

interface Fraction {
  num: number;
  den: number;
}

interface MixedResult {
  improper: Fraction;
  whole: number;
  fracNum: number;
  fracDen: number;
  isWholeOnly: boolean;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function simplify(num: number, den: number): Fraction {
  if (den < 0) { num = -num; den = -den; }
  const g = gcd(Math.abs(num), Math.abs(den));
  return { num: num / g, den: den / g };
}

function mixedToImproper(whole: number, num: number, den: number): Fraction {
  const sign = whole < 0 ? -1 : 1;
  const absWhole = Math.abs(whole);
  const totalNum = sign * (absWhole * den + num);
  return simplify(totalNum, den);
}

function compute(a: Fraction, b: Fraction, op: Operation): Fraction | null {
  let num: number;
  let den: number;
  switch (op) {
    case "add": {
      const l = lcm(a.den, b.den);
      num = a.num * (l / a.den) + b.num * (l / b.den);
      den = l;
      break;
    }
    case "subtract": {
      const l = lcm(a.den, b.den);
      num = a.num * (l / a.den) - b.num * (l / b.den);
      den = l;
      break;
    }
    case "multiply":
      num = a.num * b.num;
      den = a.den * b.den;
      break;
    case "divide":
      if (b.num === 0) return null;
      num = a.num * b.den;
      den = a.den * b.num;
      break;
  }
  return simplify(num!, den!);
}

function toMixed(f: Fraction): MixedResult {
  const whole = Math.trunc(f.num / f.den);
  const rem = Math.abs(f.num) % f.den;
  const g = gcd(rem, f.den);
  return {
    improper: f,
    whole,
    fracNum: rem / g,
    fracDen: f.den / g,
    isWholeOnly: rem === 0,
  };
}

export default function MixedNumberCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.mixed-number-calculator");
  const [op, setOp] = React.useState<Operation>("add");
  const [w1, setW1] = React.useState("");
  const [n1, setN1] = React.useState("");
  const [d1, setD1] = React.useState("");
  const [w2, setW2] = React.useState("");
  const [n2, setN2] = React.useState("");
  const [d2, setD2] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [result, setResult] = React.useState<MixedResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function handleCalculate() {
    setTouched(true);
    setError(null);
    setResult(null);

    const nw1 = parseInt(w1 || "0", 10);
    const nn1 = parseInt(n1 || "0", 10);
    const nd1 = parseInt(d1 || "1", 10);
    const nw2 = parseInt(w2 || "0", 10);
    const nn2 = parseInt(n2 || "0", 10);
    const nd2 = parseInt(d2 || "1", 10);

    if ([nw1, nn1, nd1, nw2, nn2, nd2].some(isNaN)) {
      setError(t("error.invalid"));
      return;
    }
    if (nd1 === 0 || nd2 === 0) {
      setError(t("error.invalidDenominator"));
      return;
    }

    const fa = mixedToImproper(nw1, nn1, nd1);
    const fb = mixedToImproper(nw2, nn2, nd2);
    const res = compute(fa, fb, op);
    if (!res) {
      setError(t("error.divideByZero"));
      return;
    }
    setResult(toMixed(res));
  }

  function handleReset() {
    setW1(""); setN1(""); setD1("");
    setW2(""); setN2(""); setD2("");
    setTouched(false);
    setResult(null);
    setError(null);
  }

  function mixedInputGroup(
    groupNum: 1 | 2,
    wVal: string, setW: (v: string) => void,
    nVal: string, setN: (v: string) => void,
    dVal: string, setD: (v: string) => void,
    idPrefix: string
  ) {
    const change = () => { setTouched(false); setResult(null); setError(null); };
    const wLabel = groupNum === 1 ? t("field.whole1") : t("field.whole2");
    const nLabel = groupNum === 1 ? t("field.numerator1") : t("field.numerator2");
    const dLabel = groupNum === 1 ? t("field.denominator1") : t("field.denominator2");
    const groupLabel = groupNum === 1 ? t("field.mixedNumber1") : t("field.mixedNumber2");
    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-zinc-700">{groupLabel}</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <Label htmlFor={`${idPrefix}-w`}>{wLabel}</Label>
            <Input id={`${idPrefix}-w`} type="number" inputMode="numeric" value={wVal} placeholder={t("field.placeholder")} onChange={(e) => { setW(e.target.value); change(); }} />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${idPrefix}-n`}>{nLabel}</Label>
            <Input id={`${idPrefix}-n`} type="number" inputMode="numeric" value={nVal} placeholder={t("field.placeholder")} onChange={(e) => { setN(e.target.value); change(); }} />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${idPrefix}-d`}>{dLabel}</Label>
            <Input id={`${idPrefix}-d`} type="number" inputMode="numeric" value={dVal} placeholder="1" onChange={(e) => { setD(e.target.value); change(); }} />
          </div>
        </div>
      </div>
    );
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
            <Label>{t("field.operation")}</Label>
            <div className="flex flex-wrap gap-2">
              {OPERATIONS.map((o) => (
                <Button
                  key={o}
                  type="button"
                  variant={op === o ? "default" : "outline"}
                  onClick={() => { setOp(o); setTouched(false); setResult(null); setError(null); }}
                >
                  {t(`type.${o}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {mixedInputGroup(1, w1, setW1, n1, setN1, d1, setD1, "mnc-a")}
            {mixedInputGroup(2, w2, setW2, n2, setN2, d2, setD2, "mnc-b")}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleCalculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && touched && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {result.isWholeOnly
                  ? t("result.whole", { whole: result.whole })
                  : t("result.mixed", { whole: result.whole !== 0 ? result.whole : "", num: result.fracNum, den: result.fracDen })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.improper", { num: result.improper.num, den: result.improper.den })}
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
