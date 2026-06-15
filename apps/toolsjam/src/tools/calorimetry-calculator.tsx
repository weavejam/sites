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

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export default function CalorimetryCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.calorimetry-calculator");
  const [mass, setMass] = React.useState<string>("");
  const [specificHeat, setSpecificHeat] = React.useState<string>("");
  const [initialTemp, setInitialTemp] = React.useState<string>("");
  const [finalTemp, setFinalTemp] = React.useState<string>("");
  const [phaseChangeHeat, setPhaseChangeHeat] = React.useState<string>("");
  const [phaseChangeMass, setPhaseChangeMass] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const m = parseFloat(mass);
  const c = parseFloat(specificHeat);
  const Ti = parseFloat(initialTemp);
  const Tf = parseFloat(finalTemp);
  const pcH = parseFloat(phaseChangeHeat);
  const pcM = parseFloat(phaseChangeMass);

  const coreValid =
    mass !== "" && Number.isFinite(m) && m > 0 &&
    specificHeat !== "" && Number.isFinite(c) && c > 0 &&
    initialTemp !== "" && Number.isFinite(Ti) &&
    finalTemp !== "" && Number.isFinite(Tf);

  const results = React.useMemo(() => {
    if (!coreValid) return null;
    const deltaT = Tf - Ti;
    const sensibleHeat = m * c * deltaT;
    const hasPhase = phaseChangeHeat !== "" && Number.isFinite(pcH) &&
                     phaseChangeMass !== "" && Number.isFinite(pcM) && pcM > 0;
    const latentHeat = hasPhase ? pcH * pcM : 0;
    const totalHeat = sensibleHeat + latentHeat;
    return { deltaT, sensibleHeat, latentHeat, totalHeat, hasPhase };
  }, [m, c, Ti, Tf, pcH, pcM, coreValid, phaseChangeHeat, phaseChangeMass]);

  function reset() {
    setMass("");
    setSpecificHeat("");
    setInitialTemp("");
    setFinalTemp("");
    setPhaseChangeHeat("");
    setPhaseChangeMass("");
    setTouched(false);
  }

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

  interface ExampleItem { input: string; output: string; note?: string }
  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
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

  const showError = touched && !coreValid;

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
              <Label htmlFor="cal-mass">{t("field.mass")}</Label>
              <Input
                id="cal-mass"
                type="number"
                inputMode="decimal"
                value={mass}
                placeholder={t("placeholder.mass")}
                onChange={(e) => { setMass(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cal-sheat">{t("field.specificHeat")}</Label>
              <Input
                id="cal-sheat"
                type="number"
                inputMode="decimal"
                value={specificHeat}
                placeholder={t("placeholder.specificHeat")}
                onChange={(e) => { setSpecificHeat(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cal-ti">{t("field.initialTemp")}</Label>
              <Input
                id="cal-ti"
                type="number"
                inputMode="decimal"
                value={initialTemp}
                placeholder={t("placeholder.initialTemp")}
                onChange={(e) => { setInitialTemp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cal-tf">{t("field.finalTemp")}</Label>
              <Input
                id="cal-tf"
                type="number"
                inputMode="decimal"
                value={finalTemp}
                placeholder={t("placeholder.finalTemp")}
                onChange={(e) => { setFinalTemp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cal-pcH">{t("field.phaseChangeHeat")}</Label>
              <Input
                id="cal-pcH"
                type="number"
                inputMode="decimal"
                value={phaseChangeHeat}
                placeholder={t("placeholder.phaseChangeHeat")}
                onChange={(e) => { setPhaseChangeHeat(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cal-pcM">{t("field.phaseChangeMass")}</Label>
              <Input
                id="cal-pcM"
                type="number"
                inputMode="decimal"
                value={phaseChangeMass}
                placeholder={t("placeholder.phaseChangeMass")}
                onChange={(e) => { setPhaseChangeMass(e.target.value); setTouched(true); }}
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

          {results !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.deltaT")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(results.deltaT)} <span className="text-sm font-normal">{t("result.deltaTUnit")}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.sensibleHeat")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(results.sensibleHeat)} <span className="text-sm font-normal">{t("result.sensibleHeatUnit")}</span>
                  </div>
                </div>
                {results.hasPhase && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.latentHeat")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt(results.latentHeat)} <span className="text-sm font-normal">{t("result.latentHeatUnit")}</span>
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalHeat")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmt(results.totalHeat)} <span className="text-sm font-normal">{t("result.totalHeatUnit")}</span>
                  </div>
                </div>
              </div>
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
