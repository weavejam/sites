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

function parseNumbers(s: string): number[] {
  return s
    .split(/[\s,;]+/)
    .map((v) => v.trim())
    .filter((v) => v !== "")
    .map(Number)
    .filter((v) => Number.isFinite(v));
}

function rankArray(arr: number[]): number[] {
  const n = arr.length;
  const sorted = arr
    .map((v, i) => ({ v, i }))
    .sort((a, b) => a.v - b.v);
  const ranks = new Array<number>(n);
  let i = 0;
  while (i < n) {
    let j = i;
    while (j < n - 1 && sorted[j + 1].v === sorted[j].v) j++;
    const avgRank = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) ranks[sorted[k].i] = avgRank;
    i = j + 1;
  }
  return ranks;
}

function computeSpearman(x: number[], y: number[]): number | null {
  if (x.length !== y.length || x.length < 2) return null;
  const n = x.length;
  const rx = rankArray(x);
  const ry = rankArray(y);
  const meanRx = rx.reduce((a, b) => a + b, 0) / n;
  const meanRy = ry.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let denX = 0;
  let denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = rx[i] - meanRx;
    const dy = ry[i] - meanRy;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  const den = Math.sqrt(denX * denY);
  if (den === 0) return null;
  return num / den;
}

function getStrengthKey(abs: number): string {
  if (abs >= 0.9) return "veryStrong";
  if (abs >= 0.7) return "strong";
  if (abs >= 0.5) return "moderate";
  if (abs >= 0.3) return "weak";
  return "negligible";
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function SpearmansCorrCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.spearmans-correlation-calculator");

  const interpretStrength = (r: number) => {
    const abs = Math.abs(r);
    const sk = getStrengthKey(abs);
    const strength = t(`result.strength.${sk}` as never);
    if (abs < 0.3) return strength;
    const dir = r > 0 ? t("result.dirPositive" as never) : t("result.dirNegative" as never);
    return `${strength} ${dir}`;
  };

  const [xStr, setXStr] = React.useState("");
  const [yStr, setYStr] = React.useState("");
  const [calculated, setCalculated] = React.useState(false);

  const xArr = React.useMemo(() => parseNumbers(xStr), [xStr]);
  const yArr = React.useMemo(() => parseNumbers(yStr), [yStr]);

  const valid =
    xArr.length >= 2 && yArr.length >= 2 && xArr.length === yArr.length;

  const rho = React.useMemo<number | null>(() => {
    if (!valid) return null;
    return computeSpearman(xArr, yArr);
  }, [valid, xArr, yArr]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  function reset() {
    setXStr("");
    setYStr("");
    setCalculated(false);
  }

  function loadExample(x: string, y: string) {
    setXStr(x);
    setYStr(y);
    setCalculated(true);
  }

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
              <Label htmlFor="sp-x">{t("field.dataX")}</Label>
              <Input
                id="sp-x"
                type="text"
                value={xStr}
                placeholder={t("placeholder.data")}
                onChange={(e) => {
                  setXStr(e.target.value);
                  setCalculated(false);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.dataXHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sp-y">{t("field.dataY")}</Label>
              <Input
                id="sp-y"
                type="text"
                value={yStr}
                placeholder={t("placeholder.data")}
                onChange={(e) => {
                  setYStr(e.target.value);
                  setCalculated(false);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.dataYHint")}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setCalculated(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {calculated && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {calculated && valid && rho !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-800">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3 text-sm">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.rho")}
                  </div>
                  <div className="text-2xl font-semibold">{fmt(rho)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.n")}</div>
                  <div className="text-2xl font-semibold">{xArr.length}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.interpretation")}
                  </div>
                  <div className="font-medium capitalize">
                    {rho !== null && interpretStrength(rho)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                loadExample("10, 20, 30, 40, 50", "2, 4, 6, 8, 10")
              }
            >
              {t("examples.loadPerfect")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                loadExample("105, 120, 90, 150, 135", "4.5, 3.2, 5.0, 2.1, 2.9")
              }
            >
              {t("examples.loadNegative")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("1, 2, 3, 4, 5", "3, 1, 5, 2, 4")}
            >
              {t("examples.loadZero")}
            </Button>
          </div>
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
