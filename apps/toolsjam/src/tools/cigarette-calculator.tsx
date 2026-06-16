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

interface FaqItem {
  q: string;
  a: string;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface CigaretteResult {
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  annualCost: number;
  totalSpent: number;
  totalCigarettes: number;
  totalNicotine: number;
  packYears: number;
}

function computeCigarettes(
  cigsPerDay: number,
  pricePerPack: number,
  cigsPerPack: number,
  years: number,
  nicotinePerCig: number,
): CigaretteResult {
  const dailyCost = (cigsPerDay / cigsPerPack) * pricePerPack;
  const weeklyCost = dailyCost * 7;
  const monthlyCost = dailyCost * 30.44;
  const annualCost = dailyCost * 365.25;
  const totalSpent = annualCost * years;
  const totalCigarettes = cigsPerDay * years * 365.25;
  const totalNicotine = totalCigarettes * nicotinePerCig;
  const packYears = (cigsPerDay / 20) * years;
  return {
    dailyCost,
    weeklyCost,
    monthlyCost,
    annualCost,
    totalSpent,
    totalCigarettes,
    totalNicotine,
    packYears,
  };
}

function formatMoney(n: number): string {
  return n.toFixed(2);
}

export default function CigaretteCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.cigarette-calculator");

  const [cigsPerDay, setCigsPerDay] = React.useState("");
  const [pricePerPack, setPricePerPack] = React.useState("");
  const [cigsPerPack, setCigsPerPack] = React.useState("20");
  const [years, setYears] = React.useState("");
  const [nicotinePerCig, setNicotinePerCig] = React.useState("12");
  const [touched, setTouched] = React.useState(false);

  const cigsNum = parseFloat(cigsPerDay);
  const priceNum = parseFloat(pricePerPack);
  const packNum = parseFloat(cigsPerPack);
  const yearsNum = parseFloat(years);
  const nicotineNum = parseFloat(nicotinePerCig);

  const allValid =
    cigsPerDay !== "" && Number.isFinite(cigsNum) && cigsNum >= 0 &&
    pricePerPack !== "" && Number.isFinite(priceNum) && priceNum >= 0 &&
    cigsPerPack !== "" && Number.isFinite(packNum) && packNum > 0 &&
    years !== "" && Number.isFinite(yearsNum) && yearsNum >= 0 &&
    nicotinePerCig !== "" && Number.isFinite(nicotineNum) && nicotineNum >= 0;

  const result = React.useMemo<CigaretteResult | null>(() => {
    if (!allValid) return null;
    return computeCigarettes(cigsNum, priceNum, packNum, yearsNum, nicotineNum);
  }, [allValid, cigsNum, priceNum, packNum, yearsNum, nicotineNum]);

  function reset() {
    setCigsPerDay(""); setPricePerPack(""); setCigsPerPack("20");
    setYears(""); setNicotinePerCig("12"); setTouched(false);
  }

  function loadExample(cpd: string, ppp: string, cpp: string, y: string, n: string) {
    setCigsPerDay(cpd); setPricePerPack(ppp); setCigsPerPack(cpp);
    setYears(y); setNicotinePerCig(n); setTouched(true);
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
        applicationCategory: "HealthApplication",
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

  const showError = touched && !allValid;

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
              <Label htmlFor="cc-cpd">{t("field.cigsPerDay")}</Label>
              <Input
                id="cc-cpd"
                type="number"
                inputMode="decimal"
                min="0"
                value={cigsPerDay}
                placeholder={t("placeholder.cigsPerDay")}
                onChange={(e) => { setCigsPerDay(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cc-ppp">{t("field.pricePerPack")}</Label>
              <Input
                id="cc-ppp"
                type="number"
                inputMode="decimal"
                min="0"
                value={pricePerPack}
                placeholder={t("placeholder.pricePerPack")}
                onChange={(e) => { setPricePerPack(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cc-cpp">{t("field.cigsPerPack")}</Label>
              <Input
                id="cc-cpp"
                type="number"
                inputMode="decimal"
                min="1"
                value={cigsPerPack}
                placeholder={t("placeholder.cigsPerPack")}
                onChange={(e) => { setCigsPerPack(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cc-years">{t("field.years")}</Label>
              <Input
                id="cc-years"
                type="number"
                inputMode="decimal"
                min="0"
                value={years}
                placeholder={t("placeholder.years")}
                onChange={(e) => { setYears(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cc-nic">{t("field.nicotinePerCig")}</Label>
              <Input
                id="cc-nic"
                type="number"
                inputMode="decimal"
                min="0"
                value={nicotinePerCig}
                placeholder={t("placeholder.nicotinePerCig")}
                onChange={(e) => { setNicotinePerCig(e.target.value); setTouched(true); }}
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

          {result !== null && !showError && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dailyCost")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    ${formatMoney(result.dailyCost)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.weeklyCost")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    ${formatMoney(result.weeklyCost)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.monthlyCost")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    ${formatMoney(result.monthlyCost)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.annualCost")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    ${formatMoney(result.annualCost)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalSpent")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    ${formatMoney(result.totalSpent)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalCigarettes")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {Math.round(result.totalCigarettes).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalNicotine")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {(result.totalNicotine / 1000).toFixed(2)} g
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.packYears")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.packYears.toFixed(2)}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("5", "8.50", "20", "2", "10")}>
            {t("examples.loadLight")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("20", "9.00", "20", "10", "12")}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("30", "10.00", "20", "15", "15")}>
            {t("examples.loadHeavy")}
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
