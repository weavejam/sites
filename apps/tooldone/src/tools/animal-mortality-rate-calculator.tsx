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

function fmt(n: number, d = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function AnimalMortalityRateCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.animal-mortality-rate-calculator");

  const [population, setPopulation] = React.useState("");
  const [deaths, setDeaths] = React.useState("");
  const [period, setPeriod] = React.useState("");
  const [ageGroup, setAgeGroup] = React.useState("");
  const [cause, setCause] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  interface CalcResult {
    mortalityRate: number;
    survivalRate: number;
    survivorCount: number;
  }

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched) return null;
    const pop = parseFloat(population);
    const d = parseFloat(deaths);
    if (!Number.isFinite(pop) || !Number.isFinite(d) || pop <= 0 || d < 0 || d > pop) return null;
    const mortalityRate = (d / pop) * 100;
    const survivalRate = 100 - mortalityRate;
    const survivorCount = pop - d;
    return { mortalityRate, survivalRate, survivorCount };
  }, [touched, population, deaths]);

  function reset() {
    setPopulation(""); setDeaths(""); setPeriod(""); setAgeGroup(""); setCause(""); setNotes(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
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

  const showError = touched && result === null;

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
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
              <Label htmlFor="amr-pop">{t("field.population")}</Label>
              <Input
                id="amr-pop"
                type="number"
                inputMode="numeric"
                value={population}
                placeholder={t("placeholder.population")}
                onChange={(e) => { setPopulation(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amr-deaths">{t("field.deaths")}</Label>
              <Input
                id="amr-deaths"
                type="number"
                inputMode="numeric"
                value={deaths}
                placeholder={t("placeholder.deaths")}
                onChange={(e) => { setDeaths(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amr-period">{t("field.period")}</Label>
              <Input
                id="amr-period"
                type="text"
                value={period}
                placeholder={t("placeholder.optional")}
                onChange={(e) => setPeriod(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amr-age">{t("field.ageGroup")}</Label>
              <Input
                id="amr-age"
                type="text"
                value={ageGroup}
                placeholder={t("placeholder.optional")}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amr-cause">{t("field.cause")}</Label>
              <Input
                id="amr-cause"
                type="text"
                value={cause}
                placeholder={t("placeholder.optional")}
                onChange={(e) => setCause(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amr-notes">{t("field.notes")}</Label>
              <Input
                id="amr-notes"
                type="text"
                value={notes}
                placeholder={t("placeholder.optional")}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded border border-red-100 bg-red-50 p-3 text-center">
                  <div className="text-xs text-red-600 font-medium">{t("result.mortalityRate")}</div>
                  <div className="text-2xl font-bold text-red-700">{fmt(result.mortalityRate)}%</div>
                </div>
                <div className="rounded border border-green-100 bg-green-50 p-3 text-center">
                  <div className="text-xs text-green-600 font-medium">{t("result.survivalRate")}</div>
                  <div className="text-2xl font-bold text-green-700">{fmt(result.survivalRate)}%</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500 font-medium">{t("result.survivors")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{fmt(result.survivorCount, 0)}</div>
                </div>
              </div>
              {(period || ageGroup || cause || notes) && (
                <div className="text-sm text-zinc-500 space-y-1">
                  {period && <div><span className="font-medium">{t("field.period")}:</span> {period}</div>}
                  {ageGroup && <div><span className="font-medium">{t("field.ageGroup")}:</span> {ageGroup}</div>}
                  {cause && <div><span className="font-medium">{t("field.cause")}:</span> {cause}</div>}
                  {notes && <div><span className="font-medium">{t("field.notes")}:</span> {notes}</div>}
                </div>
              )}
              <div className="text-xs text-zinc-400">{t("result.formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
