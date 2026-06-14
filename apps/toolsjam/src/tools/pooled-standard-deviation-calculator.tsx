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

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e6) / 1e6).toLocaleString("en-US", {
    maximumFractionDigits: 6,
  });
}

interface PooledResult {
  sp: number;
  spVariance: number;
  degreesOfFreedom: number;
  t: number | null;
  cohenD: number | null;
}

function computePooled(
  n1: number,
  n2: number,
  s1: number,
  s2: number,
  mean1: number,
  mean2: number
): PooledResult {
  const df = n1 + n2 - 2;
  const spVariance = ((n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2) / df;
  const sp = Math.sqrt(spVariance);
  const se = sp * Math.sqrt(1 / n1 + 1 / n2);
  const tStat = se > 0 ? (mean1 - mean2) / se : null;
  const cohenD = sp > 0 ? (mean1 - mean2) / sp : null;
  return { sp, spVariance, degreesOfFreedom: df, t: tStat, cohenD };
}

export default function PooledStandardDeviationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pooled-standard-deviation-calculator");

  const [n1, setN1] = React.useState("");
  const [mean1, setMean1] = React.useState("");
  const [s1, setS1] = React.useState("");
  const [n2, setN2] = React.useState("");
  const [mean2, setMean2] = React.useState("");
  const [s2, setS2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const n1Num = Number(n1);
  const mean1Num = parseFloat(mean1);
  const s1Num = parseFloat(s1);
  const n2Num = Number(n2);
  const mean2Num = parseFloat(mean2);
  const s2Num = parseFloat(s2);

  const allValid =
    Number.isFinite(n1Num) && n1Num >= 2 && Number.isInteger(n1Num) &&
    Number.isFinite(n2Num) && n2Num >= 2 && Number.isInteger(n2Num) &&
    Number.isFinite(s1Num) && s1Num >= 0 &&
    Number.isFinite(s2Num) && s2Num >= 0 &&
    Number.isFinite(mean1Num) &&
    Number.isFinite(mean2Num);

  const result: PooledResult | null = React.useMemo(() => {
    if (!touched || !allValid) return null;
    return computePooled(n1Num, n2Num, s1Num, s2Num, mean1Num, mean2Num);
  }, [touched, allValid, n1Num, n2Num, s1Num, s2Num, mean1Num, mean2Num]);

  function reset() {
    setN1(""); setMean1(""); setS1("");
    setN2(""); setMean2(""); setS2("");
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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="text-sm font-semibold text-zinc-700">{t("group.sample1")}</div>
              <div className="space-y-2">
                <Label htmlFor="psd-n1">{t("field.n1")}</Label>
                <Input id="psd-n1" type="number" inputMode="numeric" min="2" step="1" value={n1} placeholder={t("placeholder.n")} onChange={(e) => { setN1(e.target.value); setTouched(false); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="psd-mean1">{t("field.mean1")}</Label>
                <Input id="psd-mean1" type="number" inputMode="decimal" step="any" value={mean1} placeholder={t("placeholder.mean")} onChange={(e) => { setMean1(e.target.value); setTouched(false); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="psd-s1">{t("field.s1")}</Label>
                <Input id="psd-s1" type="number" inputMode="decimal" min="0" step="any" value={s1} placeholder={t("placeholder.sd")} onChange={(e) => { setS1(e.target.value); setTouched(false); }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-semibold text-zinc-700">{t("group.sample2")}</div>
              <div className="space-y-2">
                <Label htmlFor="psd-n2">{t("field.n2")}</Label>
                <Input id="psd-n2" type="number" inputMode="numeric" min="2" step="1" value={n2} placeholder={t("placeholder.n")} onChange={(e) => { setN2(e.target.value); setTouched(false); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="psd-mean2">{t("field.mean2")}</Label>
                <Input id="psd-mean2" type="number" inputMode="decimal" step="any" value={mean2} placeholder={t("placeholder.mean")} onChange={(e) => { setMean2(e.target.value); setTouched(false); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="psd-s2">{t("field.s2")}</Label>
                <Input id="psd-s2" type="number" inputMode="decimal" min="0" step="any" value={s2} placeholder={t("placeholder.sd")} onChange={(e) => { setS2(e.target.value); setTouched(false); }} />
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

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {(
                  [
                    ["result.sp", result.sp],
                    ["result.spVariance", result.spVariance],
                    ["result.df", result.degreesOfFreedom],
                    ...(result.t !== null
                      ? [["result.tStat", result.t] as [string, number]]
                      : []),
                    ...(result.cohenD !== null
                      ? [["result.cohenD", result.cohenD] as [string, number]]
                      : []),
                  ] as [string, number][]
                ).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between rounded border border-zinc-200 bg-white px-3 py-2"
                  >
                    <span className="text-sm text-zinc-600">
                      {t(key as never)}
                    </span>
                    <span className="font-semibold text-zinc-900">
                      {fmt(val)}
                    </span>
                  </div>
                ))}
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
