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

type TailType = "two-tailed" | "left-tailed" | "right-tailed";

interface RankSumResult {
  n1: number;
  n2: number;
  U1: number;
  U2: number;
  U: number;
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

function assignRanks(
  values: { val: number; group: number }[]
): { val: number; group: number; rank: number }[] {
  const sorted = [...values].sort((a, b) => a.val - b.val);
  const n = sorted.length;
  const ranked = sorted.map((d, i) => ({ ...d, rank: i + 1 }));
  let i = 0;
  while (i < n) {
    let j = i;
    while (j < n - 1 && sorted[j + 1].val === sorted[j].val) j++;
    if (j > i) {
      const avg = (i + j + 2) / 2;
      for (let k = i; k <= j; k++) ranked[k].rank = avg;
    }
    i = j + 1;
  }
  return ranked;
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

function computeRankSum(
  s1: number[],
  s2: number[],
  tail: TailType
): RankSumResult {
  const n1 = s1.length;
  const n2 = s2.length;
  const combined = [
    ...s1.map((v) => ({ val: v, group: 1 })),
    ...s2.map((v) => ({ val: v, group: 2 })),
  ];
  const ranked = assignRanks(combined);
  const R1 = ranked
    .filter((d) => d.group === 1)
    .reduce((s, d) => s + d.rank, 0);
  const U1 = R1 - (n1 * (n1 + 1)) / 2;
  const U2 = n1 * n2 - U1;
  const U = Math.min(U1, U2);
  const meanU = (n1 * n2) / 2;
  const sigmaU = Math.sqrt((n1 * n2 * (n1 + n2 + 1)) / 12);
  const Z = (U1 - meanU) / sigmaU;
  let pValue: number;
  if (tail === "two-tailed") {
    pValue = 2 * Math.min(normalCDF(Z), 1 - normalCDF(Z));
  } else if (tail === "right-tailed") {
    pValue = 1 - normalCDF(Z);
  } else {
    pValue = normalCDF(Z);
  }
  return { n1, n2, U1, U2, U, Z, pValue };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function WilcoxonRankSumTestCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.wilcoxon-rank-sum-test-calculator");
  const [sample1, setSample1] = React.useState("");
  const [sample2, setSample2] = React.useState("");
  const [alpha, setAlpha] = React.useState("0.05");
  const [tail, setTail] = React.useState<TailType>("two-tailed");
  const [touched, setTouched] = React.useState(false);

  const v1 = React.useMemo(() => parseNumbers(sample1), [sample1]);
  const v2 = React.useMemo(() => parseNumbers(sample2), [sample2]);

  const result = React.useMemo<RankSumResult | null>(() => {
    if (v1.length < 1 || v2.length < 1) return null;
    return computeRankSum(v1, v2, tail);
  }, [v1, v2, tail]);

  function reset() {
    setSample1("");
    setSample2("");
    setAlpha("0.05");
    setTail("two-tailed");
    setTouched(false);
  }

  const TAILS: TailType[] = ["two-tailed", "left-tailed", "right-tailed"];
  const ALPHAS = ["0.01", "0.05", "0.10"];

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

  const alphaNum = parseFloat(alpha);
  const reject = result !== null && result.pValue < alphaNum;
  const showError = touched && result === null;

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
              <Label htmlFor="wrs-s1">{t("field.sample1")}</Label>
              <Input
                id="wrs-s1"
                value={sample1}
                placeholder={t("placeholder.sample")}
                onChange={(e) => {
                  setSample1(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wrs-s2">{t("field.sample2")}</Label>
              <Input
                id="wrs-s2"
                value={sample2}
                placeholder={t("placeholder.sample")}
                onChange={(e) => {
                  setSample2(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("field.alpha")}</Label>
              <div className="flex flex-wrap gap-2">
                {ALPHAS.map((a) => (
                  <Button
                    key={a}
                    type="button"
                    variant={alpha === a ? "default" : "outline"}
                    onClick={() => setAlpha(a)}
                  >
                    {a}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.tail")}</Label>
              <div className="flex flex-wrap gap-2">
                {TAILS.map((tt) => (
                  <Button
                    key={tt}
                    type="button"
                    variant={tail === tt ? "default" : "outline"}
                    onClick={() => setTail(tt)}
                  >
                    {t(`type.${tt}` as never)}
                  </Button>
                ))}
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

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.U")}</div>
                  <div className="text-xl font-semibold">{fmt(result.U)}</div>
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
                  <div className="text-xs text-zinc-500">{t("result.n1")}</div>
                  <div className="text-xl font-semibold">{result.n1}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.n2")}</div>
                  <div className="text-xl font-semibold">{result.n2}</div>
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
              setSample1("7, 8, 8, 9, 10, 12");
              setSample2("9, 11, 12, 13, 14, 15");
              setAlpha("0.05");
              setTail("two-tailed");
              setTouched(true);
            }}
          >
            {t("examples.loadDrug")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSample1("85, 90, 78, 92, 88, 76");
              setSample2("72, 80, 81, 75, 68, 79");
              setAlpha("0.05");
              setTail("right-tailed");
              setTouched(true);
            }}
          >
            {t("examples.loadTeaching")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSample1("120, 125, 130, 110, 115, 122, 128");
              setSample2("130, 135, 140, 128, 132, 138, 142");
              setAlpha("0.01");
              setTail("left-tailed");
              setTouched(true);
            }}
          >
            {t("examples.loadFertilizer")}
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
