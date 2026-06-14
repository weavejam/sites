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

type CalcType = "exactly" | "atLeast" | "atMost";
const CALC_TYPES: CalcType[] = ["exactly", "atLeast", "atMost"];

// Binomial coefficient using logarithms to avoid overflow
function logBinomCoeff(n: number, k: number): number {
  if (k < 0 || k > n) return -Infinity;
  if (k === 0 || k === n) return 0;
  let result = 0;
  for (let i = 0; i < k; i++) {
    result += Math.log(n - i) - Math.log(i + 1);
  }
  return result;
}

function binomProb(n: number, k: number, p = 0.5): number {
  if (k < 0 || k > n) return 0;
  return Math.exp(logBinomCoeff(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
}

function calcProbability(n: number, k: number, type: CalcType): number {
  if (type === "exactly") return binomProb(n, k, 0.5);
  if (type === "atLeast") {
    let p = 0;
    for (let i = k; i <= n; i++) p += binomProb(n, i, 0.5);
    return p;
  }
  // atMost
  let p = 0;
  for (let i = 0; i <= k; i++) p += binomProb(n, i, 0.5);
  return p;
}

function fmtPct(p: number): string {
  if (!Number.isFinite(p)) return "—";
  return (p * 100).toLocaleString("en-US", { maximumFractionDigits: 4 }) + "%";
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function CoinFlipProbabilityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.coin-flip-probability-calculator");
  const [flips, setFlips] = React.useState("");
  const [heads, setHeads] = React.useState("");
  const [calcType, setCalcType] = React.useState<CalcType>("exactly");
  const [touched, setTouched] = React.useState(false);

  const n = parseInt(flips, 10);
  const k = parseInt(heads, 10);
  const valid =
    Number.isFinite(n) &&
    Number.isFinite(k) &&
    n >= 1 &&
    n <= 10000 &&
    k >= 0 &&
    k <= n;

  const probability = React.useMemo(() => {
    if (!valid) return null;
    return calcProbability(n, k, calcType);
  }, [valid, n, k, calcType]);

  function loadExample(vn: string, vk: string, vt: CalcType) {
    setFlips(vn);
    setHeads(vk);
    setCalcType(vt);
    setTouched(true);
  }

  function reset() {
    setFlips("");
    setHeads("");
    setCalcType("exactly");
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

  const showError = touched && !valid && (flips !== "" || heads !== "");

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cfp-flips">{t("field.flips")}</Label>
              <Input
                id="cfp-flips"
                type="number"
                inputMode="numeric"
                value={flips}
                placeholder={t("placeholder.flips")}
                onChange={(e) => { setFlips(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cfp-heads">{t("field.heads")}</Label>
              <Input
                id="cfp-heads"
                type="number"
                inputMode="numeric"
                value={heads}
                placeholder={t("placeholder.heads")}
                onChange={(e) => { setHeads(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {CALC_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => { setCalcType(ct); setTouched(true); }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${calcType}_desc` as never)}
            </p>
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

          {probability !== null && valid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {fmtPct(probability)}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.decimal")}: {probability.toLocaleString("en-US", { maximumFractionDigits: 8 })}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("10", "5", "exactly")}
          >
            {t("examples.loadFair")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("10", "7", "atLeast")}
          >
            {t("examples.loadGambling")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("8", "3", "atMost")}
          >
            {t("examples.loadConservative")}
          </Button>
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
