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

const SIDES_OPTIONS = [4, 6, 8, 10, 12, 20];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface RollStats {
  mean: number;
  median: number;
  mode: number[];
  stdDev: number;
  min: number;
  max: number;
  rolls: number;
  frequencies: { value: number; count: number; pct: number }[];
}

function fmt(n: number, dp = 4): string {
  return Number.isFinite(n) ? n.toFixed(dp) : "—";
}

function computeRollStats(
  n: number,
  s: number,
  rolls: number
): RollStats {
  const sums: number[] = [];
  for (let r = 0; r < rolls; r++) {
    let sum = 0;
    for (let d = 0; d < n; d++) sum += Math.floor(Math.random() * s) + 1;
    sums.push(sum);
  }
  sums.sort((a, b) => a - b);
  const total = sums.reduce((a, b) => a + b, 0);
  const mean = total / rolls;
  const median =
    rolls % 2 === 0
      ? (sums[rolls / 2 - 1] + sums[rolls / 2]) / 2
      : sums[Math.floor(rolls / 2)];
  const variance =
    sums.reduce((a, b) => a + (b - mean) ** 2, 0) / rolls;
  const stdDev = Math.sqrt(variance);
  const freqMap = new Map<number, number>();
  for (const s of sums) freqMap.set(s, (freqMap.get(s) ?? 0) + 1);
  const maxFreq = Math.max(...freqMap.values());
  const mode = [...freqMap.entries()]
    .filter(([, c]) => c === maxFreq)
    .map(([v]) => v)
    .sort((a, b) => a - b);
  const frequencies = [...freqMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([value, count]) => ({ value, count, pct: (count / rolls) * 100 }));
  return {
    mean,
    median,
    mode,
    stdDev,
    min: sums[0],
    max: sums[sums.length - 1],
    rolls,
    frequencies,
  };
}

export default function DiceRollerCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dice-roller-calculator");
  const [numberOfDice, setNumberOfDice] = React.useState("2");
  const [diceSides, setDiceSides] = React.useState("6");
  const [numberOfRolls, setNumberOfRolls] = React.useState("100");
  const [result, setResult] = React.useState<RollStats | null>(null);
  const [touched, setTouched] = React.useState(false);

  const diceNum = parseInt(numberOfDice, 10);
  const sidesNum = parseInt(diceSides, 10);
  const rollsNum = parseInt(numberOfRolls, 10);

  const showError =
    touched &&
    (isNaN(diceNum) ||
      diceNum < 1 ||
      diceNum > 10 ||
      isNaN(sidesNum) ||
      sidesNum < 2 ||
      isNaN(rollsNum) ||
      rollsNum < 1 ||
      rollsNum > 10000);

  function calculate() {
    setTouched(true);
    if (
      isNaN(diceNum) || diceNum < 1 || diceNum > 10 ||
      isNaN(sidesNum) || sidesNum < 2 ||
      isNaN(rollsNum) || rollsNum < 1 || rollsNum > 10000
    ) return;
    setResult(computeRollStats(diceNum, sidesNum, rollsNum));
  }

  function reset() {
    setNumberOfDice("2");
    setDiceSides("6");
    setNumberOfRolls("100");
    setResult(null);
    setTouched(false);
  }

  function loadExample(n: string, s: string, r: string) {
    setNumberOfDice(n);
    setDiceSides(s);
    setNumberOfRolls(r);
    setTouched(false);
    setResult(null);
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="drc-dice">{t("field.numberOfDice")}</Label>
              <Input
                id="drc-dice"
                type="number"
                inputMode="numeric"
                min={1}
                max={10}
                value={numberOfDice}
                placeholder={t("placeholder.dice")}
                onChange={(e) => {
                  setNumberOfDice(e.target.value);
                  setTouched(false);
                  setResult(null);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drc-sides">{t("field.diceSides")}</Label>
              <select
                id="drc-sides"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                value={diceSides}
                onChange={(e) => {
                  setDiceSides(e.target.value);
                  setTouched(false);
                  setResult(null);
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
              <Label htmlFor="drc-rolls">{t("field.numberOfRolls")}</Label>
              <Input
                id="drc-rolls"
                type="number"
                inputMode="numeric"
                min={1}
                max={10000}
                value={numberOfRolls}
                placeholder={t("placeholder.rolls")}
                onChange={(e) => {
                  setNumberOfRolls(e.target.value);
                  setTouched(false);
                  setResult(null);
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.roll")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500 mb-3">
                  {t("result.heading")}
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.mean")}</div>
                    <div className="font-semibold">{fmt(result.mean, 4)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.median")}</div>
                    <div className="font-semibold">{fmt(result.median, 2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.mode")}</div>
                    <div className="font-semibold">{result.mode.join(", ")}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.stdDev")}</div>
                    <div className="font-semibold">{fmt(result.stdDev, 4)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.min")}</div>
                    <div className="font-semibold">{result.min}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.max")}</div>
                    <div className="font-semibold">{result.max}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-700 mb-2">
                  {t("result.freqHeading")}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 bg-zinc-50">
                        <th className="px-3 py-2 font-semibold">{t("result.colValue")}</th>
                        <th className="px-3 py-2 font-semibold">{t("result.colCount")}</th>
                        <th className="px-3 py-2 font-semibold">{t("result.colPct")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.frequencies.map((f, i) => (
                        <tr key={i} className="border-b border-zinc-100">
                          <td className="px-3 py-1">{f.value}</td>
                          <td className="px-3 py-1">{f.count}</td>
                          <td className="px-3 py-1">{f.pct.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
            onClick={() => loadExample("1", "6", "100")}
          >
            {t("examples.loadSingle")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2", "6", "500")}
          >
            {t("examples.loadTwo")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "20", "200")}
          >
            {t("examples.loadD20")}
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
