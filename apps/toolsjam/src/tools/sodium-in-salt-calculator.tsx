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

type SaltType = "table" | "sea" | "kosher" | "himalayan";

const SODIUM_PCT: Record<SaltType, number> = {
  table: 0.393,
  sea: 0.385,
  kosher: 0.350,
  himalayan: 0.360,
};

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function SodiumInSaltCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sodium-in-salt-calculator");

  const [saltAmount, setSaltAmount] = React.useState("");
  const [saltType, setSaltType] = React.useState<SaltType>("table");
  const [dailyLimit, setDailyLimit] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const amtNum = parseFloat(saltAmount);
  const limitNum = parseFloat(dailyLimit);

  const amtValid = saltAmount !== "" && Number.isFinite(amtNum) && amtNum > 0;
  const limitValid =
    dailyLimit !== "" && Number.isFinite(limitNum) && limitNum > 0;

  interface CalcResult {
    sodiumMg: number;
    sodiumG: number;
    dailyPercent: number | null;
    remaining: number | null;
  }

  const result = React.useMemo<CalcResult | null>(() => {
    if (!amtValid) return null;
    const sodiumMg = amtNum * SODIUM_PCT[saltType] * 1000;
    const sodiumG = sodiumMg / 1000;
    const dailyPercent = limitValid ? (sodiumMg / limitNum) * 100 : null;
    const remaining = limitValid ? limitNum - sodiumMg : null;
    return { sodiumMg, sodiumG, dailyPercent, remaining };
  }, [amtValid, amtNum, saltType, limitValid, limitNum]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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

  function reset() {
    setSaltAmount("");
    setSaltType("table");
    setDailyLimit("");
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sis-amt">
                {t("field.saltAmount")} ({t("field.saltAmountUnit")})
              </Label>
              <Input
                id="sis-amt"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={0}
                value={saltAmount}
                placeholder={t("field.placeholder.saltAmount")}
                onChange={(e) => {
                  setSaltAmount(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sis-type">{t("field.saltType")}</Label>
              <select
                id="sis-type"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
                value={saltType}
                onChange={(e) => setSaltType(e.target.value as SaltType)}
              >
                <option value="table">{t("saltType.table")}</option>
                <option value="sea">{t("saltType.sea")}</option>
                <option value="kosher">{t("saltType.kosher")}</option>
                <option value="himalayan">{t("saltType.himalayan")}</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="sis-lim">
                {t("field.dailyLimit")} ({t("field.dailyLimitUnit")})
              </Label>
              <Input
                id="sis-lim"
                type="number"
                inputMode="decimal"
                step="1"
                min={0}
                value={dailyLimit}
                placeholder={t("field.placeholder.dailyLimit")}
                onChange={(e) => {
                  setDailyLimit(e.target.value);
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

          {touched && !amtValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && amtValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-zinc-500">
                    {t("result.sodiumMg")}:{" "}
                  </span>
                  <span className="font-semibold text-base">
                    {fmt(result.sodiumMg, 0)} {t("result.sodiumMgUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    {t("result.sodiumG")}:{" "}
                  </span>
                  <span className="font-semibold">
                    {fmt(result.sodiumG, 3)} {t("result.sodiumGUnit")}
                  </span>
                </div>
                {result.dailyPercent !== null && (
                  <div>
                    <span className="text-zinc-500">
                      {t("result.dailyPercent")}:{" "}
                    </span>
                    <span className="font-semibold">
                      {fmt(result.dailyPercent, 1)}
                      {t("result.dailyPercentUnit")}
                    </span>
                  </div>
                )}
                {result.remaining !== null && (
                  <div>
                    <span className="text-zinc-500">
                      {t("result.remaining")}:{" "}
                    </span>
                    <span className="font-semibold">
                      {fmt(result.remaining, 0)} {t("result.remainingUnit")}
                    </span>
                  </div>
                )}
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
