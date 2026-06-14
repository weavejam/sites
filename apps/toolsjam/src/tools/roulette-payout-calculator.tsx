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

type RouletteType = "european" | "american";
type BetType =
  | "straightUp"
  | "split"
  | "street"
  | "corner"
  | "fiveNumber"
  | "sixLine"
  | "column"
  | "dozen"
  | "redBlack"
  | "oddEven"
  | "lowHigh";

interface BetConfig {
  n: number;
  payoutOdds: number;
}

const BET_CONFIGS: Record<BetType, BetConfig> = {
  straightUp: { n: 1, payoutOdds: 35 },
  split: { n: 2, payoutOdds: 17 },
  street: { n: 3, payoutOdds: 11 },
  corner: { n: 4, payoutOdds: 8 },
  fiveNumber: { n: 5, payoutOdds: 6 },
  sixLine: { n: 6, payoutOdds: 5 },
  column: { n: 12, payoutOdds: 2 },
  dozen: { n: 12, payoutOdds: 2 },
  redBlack: { n: 18, payoutOdds: 1 },
  oddEven: { n: 18, payoutOdds: 1 },
  lowHigh: { n: 18, payoutOdds: 1 },
};

const ALL_BET_TYPES: BetType[] = [
  "straightUp",
  "split",
  "street",
  "corner",
  "fiveNumber",
  "sixLine",
  "column",
  "dozen",
  "redBlack",
  "oddEven",
  "lowHigh",
];

const EUROPEAN_BET_TYPES: BetType[] = ALL_BET_TYPES.filter(
  (b) => b !== "fiveNumber"
);

function formatNum(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function RoulettePayoutCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.roulette-payout-calculator");

  const [rouletteType, setRouletteType] =
    React.useState<RouletteType>("european");
  const [betType, setBetType] = React.useState<BetType>("straightUp");
  const [betAmount, setBetAmount] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const availableBets =
    rouletteType === "european" ? EUROPEAN_BET_TYPES : ALL_BET_TYPES;

  React.useEffect(() => {
    if (rouletteType === "european" && betType === "fiveNumber") {
      setBetType("straightUp");
    }
  }, [rouletteType, betType]);

  const betAmountNum = parseFloat(betAmount);
  const amountValid = betAmount !== "" && Number.isFinite(betAmountNum) && betAmountNum > 0;

  const result = React.useMemo(() => {
    if (!amountValid) return null;
    const totalSquares = rouletteType === "european" ? 37 : 38;
    const cfg = BET_CONFIGS[betType];
    const netWinnings = betAmountNum * cfg.payoutOdds;
    const totalPayout = netWinnings + betAmountNum;
    const winProbability = (cfg.n / totalSquares) * 100;
    return {
      netWinnings,
      totalPayout,
      payoutOddsStr: `${cfg.payoutOdds}:1`,
      winProbability,
    };
  }, [amountValid, rouletteType, betType, betAmountNum]);

  function reset() {
    setBetAmount("");
    setTouched(false);
  }

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

  const showError = touched && !amountValid;

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
              <Label htmlFor="rpc-type">{t("field.rouletteType")}</Label>
              <select
                id="rpc-type"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={rouletteType}
                onChange={(e) =>
                  setRouletteType(e.target.value as RouletteType)
                }
              >
                <option value="european">{t("type.european")}</option>
                <option value="american">{t("type.american")}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rpc-bet">{t("field.betType")}</Label>
              <select
                id="rpc-bet"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={betType}
                onChange={(e) => setBetType(e.target.value as BetType)}
              >
                {availableBets.map((b) => (
                  <option key={b} value={b}>
                    {t(`type.${b}` as never)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rpc-amount">{t("field.betAmount")}</Label>
            <Input
              id="rpc-amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={betAmount}
              placeholder={t("placeholder.amount")}
              onChange={(e) => {
                setBetAmount(e.target.value);
                setTouched(true);
              }}
            />
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mt-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.totalPayout")}</div>
                  <div className="mt-1 text-xl font-semibold text-zinc-900">
                    ${formatNum(result.totalPayout)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.netWinnings")}</div>
                  <div className="mt-1 text-xl font-semibold text-zinc-900">
                    ${formatNum(result.netWinnings)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.payoutOdds")}</div>
                  <div className="mt-1 text-xl font-semibold text-zinc-900">
                    {result.payoutOddsStr}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.winProbability")}</div>
                  <div className="mt-1 text-xl font-semibold text-zinc-900">
                    {formatNum(result.winProbability, 2)}%
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
