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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  months: number;
  principal: number;
}

function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function computeLoan(
  amount: number,
  annualRate: number,
  years: number,
  down: number,
  extra: number,
): LoanResult | null {
  const principal = amount - (Number.isFinite(down) ? down : 0);
  const n = Math.round(years * 12);
  if (!Number.isFinite(principal) || principal <= 0 || n <= 0) return null;

  const r = annualRate / 100 / 12;
  let basePayment: number;
  if (r === 0) {
    basePayment = principal / n;
  } else {
    const factor = Math.pow(1 + r, n);
    basePayment = (principal * r * factor) / (factor - 1);
  }

  const extraPay = Number.isFinite(extra) && extra > 0 ? extra : 0;
  if (extraPay === 0) {
    const totalPaid = basePayment * n;
    return {
      monthlyPayment: basePayment,
      totalInterest: totalPaid - principal,
      totalPaid,
      months: n,
      principal,
    };
  }

  let balance = principal;
  let totalInterest = 0;
  let months = 0;
  const pay = basePayment + extraPay;
  while (balance > 0 && months < n * 4 + 12) {
    const interest = balance * r;
    let principalPaid = pay - interest;
    if (principalPaid <= 0) break;
    if (principalPaid > balance) principalPaid = balance;
    totalInterest += interest;
    balance -= principalPaid;
    months += 1;
  }
  const totalPaid = principal + totalInterest;
  return {
    monthlyPayment: basePayment,
    totalInterest,
    totalPaid,
    months,
    principal,
  };
}

export default function LoanCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.loan-calculator");
  const [amount, setAmount] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [down, setDown] = React.useState("");
  const [extra, setExtra] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const amountNum = parseFloat(amount);
  const rateNum = parseFloat(rate);
  const termNum = parseFloat(term);
  const downNum = down === "" ? 0 : parseFloat(down);
  const extraNum = extra === "" ? 0 : parseFloat(extra);

  const result = React.useMemo<LoanResult | null>(() => {
    if (![amountNum, rateNum, termNum].every(Number.isFinite)) return null;
    return computeLoan(amountNum, rateNum, termNum, downNum, extraNum);
  }, [amountNum, rateNum, termNum, downNum, extraNum]);

  function reset() {
    setAmount("");
    setRate("");
    setTerm("");
    setDown("");
    setExtra("");
    setTouched(false);
  }

  function loadExample(a: string, r: string, y: string, d: string, e: string) {
    setAmount(a);
    setRate(r);
    setTerm(y);
    setDown(d);
    setExtra(e);
    setTouched(true);
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

  const showError = touched && result === null;
  const years = Number.isFinite(termNum) ? termNum : 0;
  const payoffYears = result ? Math.floor(result.months / 12) : 0;
  const payoffMonths = result ? result.months % 12 : 0;
  const showPayoff = result !== null && extraNum > 0 && result.months < years * 12;

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
              <Label htmlFor="loan-amount">{t("field.amount")}</Label>
              <Input
                id="loan-amount"
                type="number"
                inputMode="decimal"
                value={amount}
                placeholder={t("placeholder.amount")}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-rate">{t("field.rate")}</Label>
              <Input
                id="loan-rate"
                type="number"
                inputMode="decimal"
                value={rate}
                placeholder={t("placeholder.rate")}
                onChange={(e) => {
                  setRate(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-term">{t("field.term")}</Label>
              <Input
                id="loan-term"
                type="number"
                inputMode="decimal"
                value={term}
                placeholder={t("placeholder.term")}
                onChange={(e) => {
                  setTerm(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-down">{t("field.down")}</Label>
              <Input
                id="loan-down"
                type="number"
                inputMode="decimal"
                value={down}
                placeholder={t("placeholder.down")}
                onChange={(e) => {
                  setDown(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-extra">{t("field.extra")}</Label>
              <Input
                id="loan-extra"
                type="number"
                inputMode="decimal"
                value={extra}
                placeholder={t("placeholder.extra")}
                onChange={(e) => {
                  setExtra(e.target.value);
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.monthlyPayment")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatMoney(result.monthlyPayment)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.totalInterest")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatMoney(result.totalInterest)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.totalPaid")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatMoney(result.totalPaid)}
                  </div>
                </div>
              </div>
              {showPayoff && (
                <div className="text-sm text-zinc-600">
                  {t("result.payoff", {
                    years: payoffYears,
                    months: payoffMonths,
                  })}
                </div>
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
            onClick={() => loadExample("300000", "6.5", "30", "60000", "")}
          >
            {t("examples.loadMortgage")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("25000", "4.25", "5", "5000", "")}
          >
            {t("examples.loadAuto")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("15000", "8.75", "3", "", "100")}
          >
            {t("examples.loadPersonal")}
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
