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

type StreakType = "heads" | "tails" | "either";
type CalcType = "exactProb" | "expectedTosses";

const STREAK_TYPES: StreakType[] = ["heads", "tails", "either"];
const CALC_TYPES: CalcType[] = ["exactProb", "expectedTosses"];

/**
 * P(streak of k in n tosses)
 * For heads/tails: DP where hit=p=0.5, miss resets run to 0.
 * For either: DP where first toss always starts run of 1;
 *   continuing same outcome advances run, switching resets to 1.
 */
function probStreakInN(k: number, n: number, streakType: StreakType): number {
  if (k <= 0 || n <= 0) return 0;
  if (k > n) return 0;
  if (k === 1) return 1; // any single toss achieves a streak of 1

  if (streakType === "either") {
    // State j (0..k-1): current run length (0 = before any tosses)
    // After first toss, always move to state 1.
    // From state j≥1: same outcome (p=0.5) → j+1; different (p=0.5) → state 1.
    let dp = new Array(k).fill(0);
    dp[0] = 1;
    for (let i = 0; i < n; i++) {
      const next = new Array(k).fill(0);
      if (dp[0] > 0) {
        // First toss: any outcome starts a run of 1
        if (1 < k) next[1] += dp[0];
        // if k===1 handled above
      }
      for (let j = 1; j < k; j++) {
        if (dp[j] === 0) continue;
        // same outcome → j+1
        if (j + 1 < k) {
          next[j + 1] += dp[j] * 0.5;
        }
        // if j+1===k: absorbed (streak achieved)
        // different outcome → reset to run of 1
        next[1] += dp[j] * 0.5;
      }
      dp = next;
    }
    const noStreak = dp.reduce((a, b) => a + b, 0);
    return 1 - noStreak;
  } else {
    // heads or tails: p = 0.5, miss (opposite) resets run to 0
    const p = 0.5;
    const q = 0.5;
    let dp = new Array(k).fill(0);
    dp[0] = 1;
    for (let i = 0; i < n; i++) {
      const next = new Array(k).fill(0);
      for (let j = 0; j < k; j++) {
        if (dp[j] === 0) continue;
        next[0] += dp[j] * q;
        if (j + 1 < k) next[j + 1] += dp[j] * p;
        // if j+1===k: absorbed
      }
      dp = next;
    }
    const noStreak = dp.reduce((a, b) => a + b, 0);
    return 1 - noStreak;
  }
}

/**
 * Expected number of tosses to get k consecutive heads.
 * Formula: E = (2^(k+1) - 2) for fair coin, or sum formula for general p.
 * For general p: E_k = (1/p) * sum_{i=1}^{k} (1/p)^(i-1) * ... simplified:
 * E_k = (1 + p*E_{k-1}) / p  ... iterative solution:
 * E_1 = 1/p
 * E_k = E_{k-1} + (1/p)^k
 * For "either" (heads or tails), p_either = 1 (first flip always starts a streak)
 * but consecutive same outcome has p=0.5, so E_k for "either" is:
 * After the first flip (guaranteed), we need k-1 more of same, so E = (2^k - 1) * 2 / 1
 * More precisely for "either consecutive": E_1=1, E_k = 1 + 0.5*E_{k-1} + 0.5*(1 + E_k)
 * => 0.5*E_k = 1 + 0.5*E_{k-1} => E_k = 2 + E_{k-1} => E_k = 2*(k-1) + E_1 = 2k - 1 ... no
 * Let's use the known formula: for k consecutive heads (p=0.5): E = 2(2^k - 1)
 */
function expectedTosses(k: number, streakType: StreakType): number {
  if (k <= 0) return NaN;
  const p = streakType === "either" ? 0.5 : 0.5; // same formula base
  // Expected tosses for k consecutive outcomes of a specific side (p=0.5):
  // E_k = sum_{i=1}^{k} (1/p)^i = (1/p) * ((1/p)^k - 1) / (1/p - 1) when p != 0.5
  // For p=0.5: E_k = 2^1 + 2^2 + ... + 2^k = 2(2^k - 1)
  // For "either" streak (any outcome repeated k times):
  // First flip is always start (E=1). After that, need k-1 more consecutive (p=0.5 each).
  // E_either_k = 1 + E_{k-1 consecutive same}
  // E_{m consecutive same} = 2(2^m - 1)
  // So E_either_k = 1 + 2(2^(k-1) - 1) = 2^k - 1
  if (streakType === "either") {
    // Expected tosses for k consecutive identical outcomes
    return Math.pow(2, k) - 1;
  }
  // heads or tails: E_k = 2(2^k - 1)
  return 2 * (Math.pow(2, k) - 1);
}

function fmtNum(n: number, dp = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (n > 1e12) return n.toExponential(3);
  return n.toLocaleString("en-US", { maximumFractionDigits: dp });
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function CoinTossStreakCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.coin-toss-streak-calculator");

  const [streakLen, setStreakLen] = React.useState("");
  const [streakType, setStreakType] = React.useState<StreakType>("heads");
  const [calcType, setCalcType] = React.useState<CalcType>("exactProb");
  const [maxTosses, setMaxTosses] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const k = parseInt(streakLen, 10);
  const maxN = maxTosses.trim() !== "" ? parseInt(maxTosses, 10) : null;

  const valid = Number.isInteger(k) && k >= 1 && k <= 100;
  const maxValid =
    maxN === null || (Number.isInteger(maxN) && maxN >= k && maxN <= 100000);

  const result = React.useMemo(() => {
    if (!valid || !maxValid) return null;
    if (calcType === "expectedTosses") {
      return { type: "expected" as const, value: expectedTosses(k, streakType) };
    }
    // exactProb
    const n = maxN !== null ? maxN : 2 * k * k + k + 10; // sensible default
    const prob = probStreakInN(k, n, streakType);
    return { type: "prob" as const, value: prob, n };
  }, [valid, maxValid, k, streakType, calcType, maxN]);

  function loadExample(
    vk: string,
    vt: StreakType,
    vc: CalcType,
    vm: string
  ) {
    setStreakLen(vk);
    setStreakType(vt);
    setCalcType(vc);
    setMaxTosses(vm);
    setTouched(true);
  }

  function reset() {
    setStreakLen("");
    setStreakType("heads");
    setCalcType("exactProb");
    setMaxTosses("");
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

  const showError = touched && (!valid || !maxValid);

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
              <Label htmlFor="cts-len">{t("field.streakLen")}</Label>
              <Input
                id="cts-len"
                type="number"
                inputMode="numeric"
                value={streakLen}
                placeholder={t("placeholder.streakLen")}
                onChange={(e) => { setStreakLen(e.target.value); setTouched(true); }}
              />
            </div>
            {calcType === "exactProb" && (
              <div className="space-y-2">
                <Label htmlFor="cts-max">{t("field.maxTosses")}</Label>
                <Input
                  id="cts-max"
                  type="number"
                  inputMode="numeric"
                  value={maxTosses}
                  placeholder={t("placeholder.maxTosses")}
                  onChange={(e) => { setMaxTosses(e.target.value); setTouched(true); }}
                />
                <p className="text-xs text-zinc-500">{t("field.maxTossesHint")}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t("field.streakType")}</Label>
            <div className="flex flex-wrap gap-2">
              {STREAK_TYPES.map((st) => (
                <Button
                  key={st}
                  type="button"
                  variant={streakType === st ? "default" : "outline"}
                  onClick={() => { setStreakType(st); setTouched(true); }}
                >
                  {t(`streakType.${st}` as never)}
                </Button>
              ))}
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
                  {t(`calcType.${ct}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`calcType.${calcType}_desc` as never)}
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

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {result.type === "prob" && (
                <>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {(result.value * 100).toLocaleString("en-US", { maximumFractionDigits: 4 })}%
                  </div>
                  <div className="text-sm text-zinc-600">
                    {t("result.inNTosses", { n: String(result.n) })}
                  </div>
                </>
              )}
              {result.type === "expected" && (
                <>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmtNum(result.value)} {t("result.tosses")}
                  </div>
                  <div className="text-sm text-zinc-600">
                    {t("result.expectedDesc")}
                  </div>
                </>
              )}
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
            onClick={() => loadExample("3", "heads", "exactProb", "")}
          >
            {t("examples.loadThreeHeads")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("7", "either", "expectedTosses", "")}
          >
            {t("examples.loadLong")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("4", "heads", "expectedTosses", "")}
          >
            {t("examples.loadGambling")}
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
