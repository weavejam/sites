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

type CalcType = "exact" | "atLeast" | "atMost";

const SIDES_OPTIONS = [4, 6, 8, 10, 12, 20];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatPct(p: number): string {
  return (p * 100).toFixed(4) + "%";
}

function formatFraction(num: number, den: number): string {
  const g = gcd(num, den);
  return `${num / g}/${den / g}`;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/** Returns map of sum → number of ways using n dice with s sides (1..s) */
function computeDiceDistribution(n: number, s: number): Map<number, number> {
  let dp: Map<number, number> = new Map([[0, 1]]);
  for (let d = 0; d < n; d++) {
    const next = new Map<number, number>();
    for (const [sum, count] of dp) {
      for (let face = 1; face <= s; face++) {
        const ns = sum + face;
        next.set(ns, (next.get(ns) ?? 0) + count);
      }
    }
    dp = next;
  }
  return dp;
}

function computeProbability(
  n: number,
  s: number,
  target: number,
  type: CalcType
): { prob: number; favorable: number; total: number } | null {
  if (n < 1 || n > 10 || s < 2 || target < 1) return null;
  const dist = computeDiceDistribution(n, s);
  const total = Math.pow(s, n);
  let favorable = 0;
  if (type === "exact") {
    favorable = dist.get(target) ?? 0;
  } else if (type === "atLeast") {
    for (const [sum, count] of dist) {
      if (sum >= target) favorable += count;
    }
  } else {
    for (const [sum, count] of dist) {
      if (sum <= target) favorable += count;
    }
  }
  return { prob: favorable / total, favorable, total };
}

export default function DiceProbabilityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dice-probability-calculator");
  const [numberOfDice, setNumberOfDice] = React.useState("2");
  const [sidesPerDie, setSidesPerDie] = React.useState("6");
  const [targetSum, setTargetSum] = React.useState("7");
  const [calcType, setCalcType] = React.useState<CalcType>("exact");
  const [touched, setTouched] = React.useState(false);

  const diceNum = parseInt(numberOfDice, 10);
  const sidesNum = parseInt(sidesPerDie, 10);
  const targetNum = parseInt(targetSum, 10);

  const result = React.useMemo(() => {
    if (!touched) return null;
    if (
      !Number.isInteger(diceNum) ||
      diceNum < 1 ||
      diceNum > 10 ||
      !Number.isInteger(sidesNum) ||
      sidesNum < 2 ||
      !Number.isInteger(targetNum) ||
      targetNum < 1
    )
      return null;
    return computeProbability(diceNum, sidesNum, targetNum, calcType);
  }, [touched, diceNum, sidesNum, targetNum, calcType]);

  const minSum = diceNum;
  const maxSum = diceNum * sidesNum;

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

  function loadExample(n: string, s: string, tgt: string, type: CalcType) {
    setNumberOfDice(n);
    setSidesPerDie(s);
    setTargetSum(tgt);
    setCalcType(type);
    setTouched(true);
  }

  function reset() {
    setNumberOfDice("2");
    setSidesPerDie("6");
    setTargetSum("7");
    setCalcType("exact");
    setTouched(false);
  }

  const showError =
    touched &&
    (isNaN(diceNum) ||
      diceNum < 1 ||
      diceNum > 10 ||
      isNaN(sidesNum) ||
      sidesNum < 2 ||
      isNaN(targetNum) ||
      targetNum < 1);

  const showRangeError =
    touched &&
    !showError &&
    (targetNum < minSum || targetNum > maxSum);

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
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["exact", "atLeast", "atMost"] as CalcType[]).map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => {
                    setCalcType(ct);
                    setTouched(false);
                  }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="dpc-dice">{t("field.numberOfDice")}</Label>
              <Input
                id="dpc-dice"
                type="number"
                inputMode="numeric"
                min={1}
                max={10}
                value={numberOfDice}
                placeholder={t("placeholder.dice")}
                onChange={(e) => {
                  setNumberOfDice(e.target.value);
                  setTouched(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dpc-sides">{t("field.sidesPerDie")}</Label>
              <select
                id="dpc-sides"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                value={sidesPerDie}
                onChange={(e) => {
                  setSidesPerDie(e.target.value);
                  setTouched(false);
                }}
              >
                {SIDES_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    d{s}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dpc-target">{t("field.targetSum")}</Label>
              <Input
                id="dpc-target"
                type="number"
                inputMode="numeric"
                value={targetSum}
                placeholder={t("placeholder.targetSum")}
                onChange={(e) => {
                  setTargetSum(e.target.value);
                  setTouched(false);
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
          {showRangeError && (
            <p className="text-sm text-red-600">
              {t("error.range", { min: minSum, max: maxSum })}
            </p>
          )}

          {result !== null && !showError && !showRangeError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {formatPct(result.prob)}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.fraction", {
                  favorable: result.favorable,
                  total: result.total,
                  fraction: formatFraction(result.favorable, result.total),
                })}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.summary", {
                  n: diceNum,
                  s: sidesNum,
                  target: targetNum,
                  type: t(`type.${calcType}` as never),
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "6", "4", "exact")}
          >
            {t("examples.loadSingle")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2", "6", "7", "exact")}
          >
            {t("examples.loadLucky7")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("3", "6", "16", "atLeast")}
          >
            {t("examples.loadHighRoll")}
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
