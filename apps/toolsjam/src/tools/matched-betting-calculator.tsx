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

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calcLayStake(
  backStake: number,
  backOdds: number,
  layOdds: number,
  commission: number
): number {
  return (backStake * backOdds) / (layOdds - commission / 100);
}

function calcQualifyingProfit(
  backStake: number,
  backOdds: number,
  layOdds: number,
  commission: number
): { layStake: number; profit: number } {
  const layStake = calcLayStake(backStake, backOdds, layOdds, commission);
  // Both scenarios yield the same guaranteed profit
  const profit = -backStake + layStake * (1 - commission / 100);
  return { layStake, profit };
}

function calcBonusProfit(
  bonusAmount: number,
  bonusOdds: number,
  layOdds: number,
  commission: number
): { layStake: number; profit: number } {
  const layStake =
    (bonusAmount * (bonusOdds - 1)) / (layOdds - commission / 100);
  const profit = bonusAmount * (bonusOdds - 1) * (1 - commission / 100) / (layOdds - commission / 100);
  return { layStake, profit };
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function MatchedBettingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.matched-betting-calculator");

  const [backStake, setBackStake] = React.useState("");
  const [backOdds, setBackOdds] = React.useState("");
  const [layOdds, setLayOdds] = React.useState("");
  const [commission, setCommission] = React.useState("");
  const [bonusAmount, setBonusAmount] = React.useState("");
  const [bonusOdds, setBonusOdds] = React.useState("");
  const [calculated, setCalculated] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const parsed = React.useMemo(() => {
    return {
      backStake: parseFloat(backStake),
      backOdds: parseFloat(backOdds),
      layOdds: parseFloat(layOdds),
      commission: parseFloat(commission),
      bonusAmount: parseFloat(bonusAmount),
      bonusOdds: parseFloat(bonusOdds),
    };
  }, [backStake, backOdds, layOdds, commission, bonusAmount, bonusOdds]);

  const result = React.useMemo(() => {
    if (!calculated) return null;
    const { backStake: bs, backOdds: bo, layOdds: lo, commission: cm } = parsed;
    if (!Number.isFinite(bs) || !Number.isFinite(bo) || !Number.isFinite(lo) || !Number.isFinite(cm)) return null;
    const qualify = calcQualifyingProfit(bs, bo, lo, cm);
    let bonus: { layStake: number; profit: number } | null = null;
    if (bonusAmount !== "" && bonusOdds !== "" && Number.isFinite(parsed.bonusAmount) && Number.isFinite(parsed.bonusOdds)) {
      bonus = calcBonusProfit(parsed.bonusAmount, parsed.bonusOdds, lo, cm);
    }
    return { qualify, bonus };
  }, [calculated, parsed, bonusAmount, bonusOdds]);

  function validate(): boolean {
    const errs: string[] = [];
    const { backStake: bs, backOdds: bo, layOdds: lo, commission: cm } = parsed;
    if (!Number.isFinite(bs) || bs <= 0) errs.push("invalidInputs");
    if (!Number.isFinite(bo) || bo <= 1) errs.push("oddsMin");
    if (!Number.isFinite(lo) || lo <= 1) errs.push("oddsMin");
    if (!Number.isFinite(cm) || cm < 0 || cm >= 100) errs.push("commissionRange");
    if (bonusAmount !== "" && (!Number.isFinite(parsed.bonusAmount) || parsed.bonusAmount <= 0)) errs.push("invalidInputs");
    if (bonusOdds !== "" && (!Number.isFinite(parsed.bonusOdds) || parsed.bonusOdds <= 1)) errs.push("oddsMin");
    setErrors([...new Set(errs)]);
    return errs.length === 0;
  }

  function handleCalculate() {
    if (validate()) setCalculated(true);
  }

  function handleReset() {
    setBackStake("");
    setBackOdds("");
    setLayOdds("");
    setCommission("");
    setBonusAmount("");
    setBonusOdds("");
    setCalculated(false);
    setErrors([]);
  }

  function loadExample(bs: string, bo: string, lo: string, cm: string, ba?: string, boo?: string) {
    setBackStake(bs);
    setBackOdds(bo);
    setLayOdds(lo);
    setCommission(cm);
    setBonusAmount(ba ?? "");
    setBonusOdds(boo ?? "");
    setCalculated(false);
    setErrors([]);
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
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "FinanceApplication",
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mbc-bs">{t("field.backStake")}</Label>
              <Input
                id="mbc-bs"
                type="number"
                inputMode="decimal"
                value={backStake}
                placeholder={t("placeholder.stake")}
                onChange={(e) => { setBackStake(e.target.value); setCalculated(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mbc-bo">{t("field.backOdds")}</Label>
              <Input
                id="mbc-bo"
                type="number"
                inputMode="decimal"
                value={backOdds}
                placeholder={t("placeholder.odds")}
                onChange={(e) => { setBackOdds(e.target.value); setCalculated(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mbc-lo">{t("field.layOdds")}</Label>
              <Input
                id="mbc-lo"
                type="number"
                inputMode="decimal"
                value={layOdds}
                placeholder={t("placeholder.odds")}
                onChange={(e) => { setLayOdds(e.target.value); setCalculated(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mbc-cm">{t("field.commission")}</Label>
              <Input
                id="mbc-cm"
                type="number"
                inputMode="decimal"
                value={commission}
                placeholder={t("placeholder.commission")}
                onChange={(e) => { setCommission(e.target.value); setCalculated(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mbc-ba">{t("field.bonusAmount")}</Label>
              <Input
                id="mbc-ba"
                type="number"
                inputMode="decimal"
                value={bonusAmount}
                placeholder={t("placeholder.bonus")}
                onChange={(e) => { setBonusAmount(e.target.value); setCalculated(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mbc-boo">{t("field.bonusOdds")}</Label>
              <Input
                id="mbc-boo"
                type="number"
                inputMode="decimal"
                value={bonusOdds}
                placeholder={t("placeholder.bonusOdds")}
                onChange={(e) => { setBonusOdds(e.target.value); setCalculated(false); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleCalculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map((e) => (
                <p key={e} className="text-sm text-red-600">
                  {t(`error.${e}` as never)}
                </p>
              ))}
            </div>
          )}

          {result && (
            <div className="space-y-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
                <div className="text-sm font-semibold text-zinc-500">{t("result.heading")}</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-zinc-600">{t("result.layStake")}</span>
                  <span className="font-semibold text-zinc-900">£{fmt(result.qualify.layStake)}</span>
                  <span className="text-zinc-600">{t("result.qualifyingProfit")}</span>
                  <span className={`font-semibold ${result.qualify.profit >= 0 ? "text-green-700" : "text-red-600"}`}>
                    £{fmt(result.qualify.profit)}
                  </span>
                </div>
              </div>
              {result.bonus && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-zinc-600">{t("result.bonusLayStake")}</span>
                    <span className="font-semibold text-zinc-900">£{fmt(result.bonus.layStake)}</span>
                    <span className="text-zinc-600">{t("result.bonusProfit")}</span>
                    <span className="font-semibold text-green-700">£{fmt(result.bonus.profit)}</span>
                    <span className="text-zinc-600">{t("result.totalProfit")}</span>
                    <span className="font-semibold text-green-700">
                      £{fmt(result.qualify.profit + result.bonus.profit)}
                    </span>
                  </div>
                </div>
              )}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("100", "2.00", "2.10", "5")}
          >
            {t("examples.loadBasic")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("100", "1.80", "1.85", "3", "50", "1.50")}
          >
            {t("examples.loadBonus")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("200", "1.90", "1.95", "2")}
          >
            {t("examples.loadLowComm")}
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
