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

type HandType =
  | "flush_draw"
  | "open_ended_straight"
  | "overpair"
  | "gutshot"
  | "set_mining"
  | "top_pair"
  | "two_pair";

const HAND_OUTS: Record<HandType, number> = {
  flush_draw: 9,
  open_ended_straight: 8,
  overpair: 5,
  gutshot: 4,
  set_mining: 2,
  top_pair: 5,
  two_pair: 4,
};

const HAND_TYPES: HandType[] = [
  "flush_draw",
  "open_ended_straight",
  "overpair",
  "gutshot",
  "set_mining",
  "top_pair",
  "two_pair",
];

function calcWinProb(handType: HandType, numPlayers: number): number {
  const outs = HAND_OUTS[handType];
  // Rule of 4 approximation (flop, two cards to come)
  let rawEquity: number;
  if (handType === "overpair" || handType === "top_pair") {
    rawEquity = 0.72;
  } else if (handType === "two_pair") {
    rawEquity = 0.65;
  } else if (handType === "set_mining") {
    rawEquity = 0.12;
  } else {
    // Use exact calculation: 1 - P(missing both cards)
    const remaining = 47;
    rawEquity = 1 - ((remaining - outs) / remaining) * ((remaining - 1 - outs) / (remaining - 1));
  }
  // Adjust for number of players: each additional opponent reduces equity
  const adjusted = rawEquity * Math.pow(0.92, numPlayers - 2);
  return Math.max(0.02, Math.min(0.98, adjusted));
}

function calcPotOdds(pot: number, bet: number): number {
  return bet / (pot + bet);
}

function calcEV(winProb: number, pot: number, bet: number): number {
  return winProb * pot - (1 - winProb) * bet;
}

function formatPct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

function formatMoney(n: number): string {
  return (n >= 0 ? "+" : "") + "$" + Math.abs(n).toFixed(2);
}

export default function PokerOddsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.poker-odds-calculator");
  const [handType, setHandType] = React.useState<HandType>("flush_draw");
  const [numPlayers, setNumPlayers] = React.useState("4");
  const [potSize, setPotSize] = React.useState("");
  const [betAmount, setBetAmount] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const playersNum = parseInt(numPlayers, 10);
  const potNum = parseFloat(potSize);
  const betNum = parseFloat(betAmount);
  const valid =
    Number.isFinite(playersNum) &&
    playersNum >= 2 &&
    playersNum <= 10 &&
    Number.isFinite(potNum) &&
    potNum > 0 &&
    Number.isFinite(betNum) &&
    betNum > 0;

  const result = React.useMemo(() => {
    if (!valid) return null;
    const winProb = calcWinProb(handType, playersNum);
    const potOdds = calcPotOdds(potNum, betNum);
    const ev = calcEV(winProb, potNum, betNum);
    const outs = HAND_OUTS[handType];
    const loseProb = 1 - winProb;
    const oddsRatio = `${(loseProb / winProb).toFixed(1)}:1`;
    let rec: "call" | "fold" | "raise";
    if (winProb > potOdds + 0.2) rec = "raise";
    else if (winProb > potOdds) rec = "call";
    else rec = "fold";
    return { winProb, potOdds, ev, outs, oddsRatio, rec };
  }, [valid, handType, playersNum, potNum, betNum]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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
    setNumPlayers("4");
    setPotSize("");
    setBetAmount("");
    setTouched(false);
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
          <div className="space-y-2">
            <Label>{t("field.handType")}</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {HAND_TYPES.map((ht) => (
                <Button
                  key={ht}
                  type="button"
                  variant={handType === ht ? "default" : "outline"}
                  className="justify-start text-left"
                  onClick={() => {
                    setHandType(ht);
                    setTouched(false);
                  }}
                >
                  {t(`type.${ht}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="poc-players">{t("field.numPlayers")}</Label>
              <Input
                id="poc-players"
                type="number"
                inputMode="numeric"
                min={2}
                max={10}
                value={numPlayers}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setNumPlayers(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="poc-pot">{t("field.potSize")}</Label>
              <Input
                id="poc-pot"
                type="number"
                inputMode="decimal"
                min={0}
                value={potSize}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setPotSize(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="poc-bet">{t("field.betAmount")}</Label>
              <Input
                id="poc-bet"
                type="number"
                inputMode="decimal"
                min={0}
                value={betAmount}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setBetAmount(e.target.value);
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

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && valid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.winProb")}</div>
                  <div className="text-xl font-bold text-zinc-900">{formatPct(result.winProb)}</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.potOdds")}</div>
                  <div className="text-xl font-bold text-zinc-900">{formatPct(result.potOdds)}</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.outs")}</div>
                  <div className="text-xl font-bold text-zinc-900">{result.outs}</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.oddsRatio")}</div>
                  <div className="text-xl font-bold text-zinc-900">{result.oddsRatio}</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.ev")}</div>
                  <div className={`text-xl font-bold ${result.ev >= 0 ? "text-green-700" : "text-red-600"}`}>
                    {formatMoney(result.ev)}
                  </div>
                </div>
                <div className="rounded border bg-white p-3 sm:col-span-1">
                  <div className="text-xs text-zinc-500">{t("result.recommendation")}</div>
                  <div className={`text-base font-semibold ${result.rec === "fold" ? "text-red-600" : "text-green-700"}`}>
                    {t(`result.${result.rec}` as never)}
                  </div>
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
