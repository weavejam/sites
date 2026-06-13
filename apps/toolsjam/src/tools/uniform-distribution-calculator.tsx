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

function fmt(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

interface UniformResult {
  pdf: number;
  mean: number;
  variance: number;
  stdDev: number;
  cdfX: number | null;
  pInterval: number | null;
}

function compute(a: number, b: number, x: string, x1: string, x2: string): UniformResult | null {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b <= a) return null;
  const range = b - a;
  const pdf = 1 / range;
  const mean = (a + b) / 2;
  const variance = (range * range) / 12;
  const stdDev = Math.sqrt(variance);

  let cdfX: number | null = null;
  const xNum = parseFloat(x);
  if (x !== "" && Number.isFinite(xNum)) {
    if (xNum < a) cdfX = 0;
    else if (xNum > b) cdfX = 1;
    else cdfX = (xNum - a) / range;
  }

  let pInterval: number | null = null;
  const x1Num = parseFloat(x1);
  const x2Num = parseFloat(x2);
  if (x1 !== "" && x2 !== "" && Number.isFinite(x1Num) && Number.isFinite(x2Num) && x2Num > x1Num) {
    const lo = Math.max(a, x1Num);
    const hi = Math.min(b, x2Num);
    pInterval = hi > lo ? (hi - lo) / range : 0;
  }

  return { pdf, mean, variance, stdDev, cdfX, pInterval };
}

export default function UniformDistributionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.uniform-distribution-calculator");
  const [aVal, setAVal] = React.useState("");
  const [bVal, setBVal] = React.useState("");
  const [xVal, setXVal] = React.useState("");
  const [x1Val, setX1Val] = React.useState("");
  const [x2Val, setX2Val] = React.useState("");
  const [calculated, setCalculated] = React.useState(false);

  const a = parseFloat(aVal);
  const b = parseFloat(bVal);

  const result = React.useMemo<UniformResult | null>(() => {
    if (!calculated) return null;
    return compute(a, b, xVal, x1Val, x2Val);
  }, [calculated, a, b, xVal, x1Val, x2Val]);

  function reset() {
    setAVal(""); setBVal(""); setXVal(""); setX1Val(""); setX2Val("");
    setCalculated(false);
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ud-a">{t("field.a")}</Label>
              <Input
                id="ud-a"
                type="number"
                inputMode="decimal"
                value={aVal}
                placeholder={t("placeholder.a")}
                onChange={(e) => { setAVal(e.target.value); setCalculated(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ud-b">{t("field.b")}</Label>
              <Input
                id="ud-b"
                type="number"
                inputMode="decimal"
                value={bVal}
                placeholder={t("placeholder.b")}
                onChange={(e) => { setBVal(e.target.value); setCalculated(false); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ud-x">{t("field.x")}</Label>
            <Input
              id="ud-x"
              type="number"
              inputMode="decimal"
              value={xVal}
              placeholder={t("placeholder.x")}
              onChange={(e) => { setXVal(e.target.value); setCalculated(false); }}
            />
            <p className="text-xs text-zinc-500">{t("field.xHint")}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ud-x1">{t("field.x1")}</Label>
              <Input
                id="ud-x1"
                type="number"
                inputMode="decimal"
                value={x1Val}
                placeholder={t("placeholder.x1")}
                onChange={(e) => { setX1Val(e.target.value); setCalculated(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ud-x2">{t("field.x2")}</Label>
              <Input
                id="ud-x2"
                type="number"
                inputMode="decimal"
                value={x2Val}
                placeholder={t("placeholder.x2")}
                onChange={(e) => { setX2Val(e.target.value); setCalculated(false); }}
              />
            </div>
          </div>
          <p className="text-xs text-zinc-500">{t("field.intervalHint")}</p>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setCalculated(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {calculated && !result && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-semibold text-zinc-700">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <ResultRow label={t("result.pdf")} value={fmt(result.pdf)} />
                <ResultRow label={t("result.mean")} value={fmt(result.mean)} />
                <ResultRow label={t("result.variance")} value={fmt(result.variance)} />
                <ResultRow label={t("result.stdDev")} value={fmt(result.stdDev)} />
                {result.cdfX !== null && (
                  <ResultRow label={t("result.cdf")} value={fmt(result.cdfX)} />
                )}
                {result.pInterval !== null && (
                  <ResultRow label={t("result.pInterval")} value={fmt(result.pInterval)} />
                )}
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded border border-zinc-200 bg-white px-3 py-2">
      <span className="text-sm text-zinc-600">{label}</span>
      <span className="font-semibold text-zinc-900">{value}</span>
    </div>
  );
}
