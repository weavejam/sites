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

function formatNumber(n: number, decimals = 0): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

function formatPercent(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 10) / 10).toFixed(1) + "%";
}

function simulate(
  initialVampires: number,
  initialHumans: number,
  reproductionRate: number,
  humanDeathRate: number,
  days: number,
  resourceConsumption: number
): { finalVampires: number; finalHumans: number; survivalRate: number } {
  const finalVampires = initialVampires * Math.exp(reproductionRate * days);
  const decayedHumans = initialHumans * Math.exp(-humanDeathRate * days);
  const avgVampires = (initialVampires + finalVampires) / 2;
  const consumed = resourceConsumption * avgVampires * days;
  const finalHumans = Math.max(0, decayedHumans - consumed);
  const survivalRate = (finalHumans / initialHumans) * 100;
  return { finalVampires, finalHumans, survivalRate };
}

export default function VampireApocalypseCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.vampire-apocalypse-calculator");

  const [initialVampires, setInitialVampires] = React.useState("");
  const [initialHumans, setInitialHumans] = React.useState("");
  const [reproductionRate, setReproductionRate] = React.useState("");
  const [humanDeathRate, setHumanDeathRate] = React.useState("");
  const [days, setDays] = React.useState("");
  const [resourceConsumption, setResourceConsumption] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const inputs = [initialVampires, initialHumans, reproductionRate, humanDeathRate, days, resourceConsumption];
  const parsed = inputs.map(parseFloat);
  const allValid = parsed.every((v) => Number.isFinite(v) && v >= 0) && parsed[1] > 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return simulate(parsed[0], parsed[1], parsed[2], parsed[3], parsed[4], parsed[5]);
  }, [allValid, ...parsed]);

  function reset() {
    setInitialVampires("");
    setInitialHumans("");
    setReproductionRate("");
    setHumanDeathRate("");
    setDays("");
    setResourceConsumption("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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
              <Label htmlFor="vac-vampires">{t("field.initialVampires")}</Label>
              <Input
                id="vac-vampires"
                type="number"
                inputMode="decimal"
                value={initialVampires}
                placeholder="5"
                onChange={(e) => { setInitialVampires(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vac-humans">{t("field.initialHumans")}</Label>
              <Input
                id="vac-humans"
                type="number"
                inputMode="decimal"
                value={initialHumans}
                placeholder="10000"
                onChange={(e) => { setInitialHumans(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vac-repro">{t("field.reproductionRate")}</Label>
              <Input
                id="vac-repro"
                type="number"
                inputMode="decimal"
                value={reproductionRate}
                placeholder="0.05"
                onChange={(e) => { setReproductionRate(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vac-death">{t("field.humanDeathRate")}</Label>
              <Input
                id="vac-death"
                type="number"
                inputMode="decimal"
                value={humanDeathRate}
                placeholder="0.02"
                onChange={(e) => { setHumanDeathRate(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vac-days">{t("field.days")}</Label>
              <Input
                id="vac-days"
                type="number"
                inputMode="decimal"
                value={days}
                placeholder="30"
                onChange={(e) => { setDays(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vac-resource">{t("field.resourceConsumption")}</Label>
              <Input
                id="vac-resource"
                type="number"
                inputMode="decimal"
                value={resourceConsumption}
                placeholder="1.0"
                onChange={(e) => { setResourceConsumption(e.target.value); setTouched(true); }}
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

          {result !== null && touched && allValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {result.finalHumans === 0 ? (
                <p className="text-red-600 font-semibold">{t("result.extinct")}</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.vampirePopulation")}</div>
                    <div className="text-xl font-semibold text-red-700">
                      {formatNumber(result.finalVampires)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.humanPopulation")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNumber(result.finalHumans)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.survivalRate")}</div>
                    <div className="text-xl font-semibold text-emerald-700">
                      {formatPercent(result.survivalRate)}
                    </div>
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
                <th className="px-3 py-2 font-semibold">{t("examples.colScenario")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colResult")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colNote")}</th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
