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

interface SignedRankResult {
  n: number;
  Wplus: number;
  Wminus: number;
  W: number;
  meanW: number;
  sigmaW: number;
  Z: number;
  pValue: number;
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

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => Number.isFinite(n));
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

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function computeSignedRank(
  s1: number[],
  s2: number[]
): SignedRankResult | null {
  if (s1.length !== s2.length || s1.length === 0) return null;
  const diffs = s1.map((v, i) => s2[i] - v);
  const nonZero = diffs.filter((d) => d !== 0);
  const n = nonZero.length;
  if (n === 0) return null;

  const absD = nonZero.map((d, i) => ({ abs: Math.abs(d), sign: Math.sign(d), idx: i }));
  const sorted = [...absD].sort((a, b) => a.abs - b.abs);
  const ranked = sorted.map((d, i) => ({ ...d, rank: i + 1 }));

  let i = 0;
  while (i < n) {
    let j = i;
    while (j < n - 1 && sorted[j + 1].abs === sorted[j].abs) j++;
    if (j > i) {
      const avg = (i + j + 2) / 2;
      for (let k = i; k <= j; k++) ranked[k].rank = avg;
    }
    i = j + 1;
  }

  let Wplus = 0;
  let Wminus = 0;
  for (const r of ranked) {
    if (r.sign > 0) Wplus += r.rank;
    else Wminus += r.rank;
  }

  const W = Math.min(Wplus, Wminus);
  const meanW = (n * (n + 1)) / 4;
  const sigmaW = Math.sqrt((n * (n + 1) * (2 * n + 1)) / 24);
  const Z = (Wplus - meanW) / sigmaW;
  const pValue = 2 * Math.min(normalCDF(Z), 1 - normalCDF(Z));

  return { n, Wplus, Wminus, W, meanW, sigmaW, Z, pValue };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function WilcoxonSignedRankTestCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.wilcoxon-signed-rank-test-calculator");
  const [sample1, setSample1] = React.useState("");
  const [sample2, setSample2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const v1 = React.useMemo(() => parseNumbers(sample1), [sample1]);
  const v2 = React.useMemo(() => parseNumbers(sample2), [sample2]);

  const result = React.useMemo<SignedRankResult | null>(() => {
    if (v1.length < 1 || v2.length < 1) return null;
    if (v1.length !== v2.length) return null;
    return computeSignedRank(v1, v2);
  }, [v1, v2]);

  const mismatch = touched && v1.length > 0 && v2.length > 0 && v1.length !== v2.length;
  const showError = touched && result === null && !mismatch;

  function reset() {
    setSample1("");
    setSample2("");
    setTouched(false);
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

  const reject = result !== null && result.pValue < 0.05;

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
              <Label htmlFor="wsrt-s1">{t("field.sample1")}</Label>
              <Input
                id="wsrt-s1"
                value={sample1}
                placeholder={t("placeholder.sample")}
                onChange={(e) => {
                  setSample1(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wsrt-s2">{t("field.sample2")}</Label>
              <Input
                id="wsrt-s2"
                value={sample2}
                placeholder={t("placeholder.sample")}
                onChange={(e) => {
                  setSample2(e.target.value);
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

          {mismatch && (
            <p className="text-sm text-red-600">{t("error.mismatch")}</p>
          )}
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
                  <div className="text-xs text-zinc-500">{t("result.W")}</div>
                  <div className="text-xl font-semibold">{fmt(result.W)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.Z")}</div>
                  <div className="text-xl font-semibold">{fmt(result.Z)}</div>
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
                  <div className="text-xs text-zinc-500">{t("result.n")}</div>
                  <div className="text-xl font-semibold">{result.n}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.Wplus")}
                  </div>
                  <div className="text-xl font-semibold">
                    {fmt(result.Wplus)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.Wminus")}
                  </div>
                  <div className="text-xl font-semibold">
                    {fmt(result.Wminus)}
                  </div>
                </div>
              </div>
              <div
                className={`text-sm font-medium ${
                  reject ? "text-red-600" : "text-green-600"
                }`}
              >
                {reject ? t("result.reject") : t("result.failReject")}
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
            onClick={() => {
              setSample1("140, 135, 150, 160, 130, 145, 155, 138, 148, 152");
              setSample2("132, 130, 142, 151, 125, 137, 145, 130, 140, 148");
              setTouched(true);
            }}
          >
            {t("examples.loadBP")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSample1("8, 7, 6, 9, 8, 7, 8, 9");
              setSample2("6, 5, 5, 7, 6, 6, 7, 7");
              setTouched(true);
            }}
          >
            {t("examples.loadAnxiety")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSample1("75, 80, 82, 79, 88, 90, 76, 85, 89, 92, 78, 84");
              setSample2("80, 85, 85, 83, 90, 94, 81, 88, 92, 95, 81, 89");
              setTouched(true);
            }}
          >
            {t("examples.loadScores")}
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
