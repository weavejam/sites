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

type SolveFor = "Q" | "mass" | "specificHeat" | "deltaT";

const SOLVE_OPTIONS: SolveFor[] = ["Q", "mass", "specificHeat", "deltaT"];

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function SpecificHeatCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.specific-heat-calculator");

  const [solveFor, setSolveFor] = React.useState<SolveFor>("Q");
  const [massStr, setMassStr] = React.useState("");
  const [specificHeatStr, setSpecificHeatStr] = React.useState("");
  const [initialTempStr, setInitialTempStr] = React.useState("");
  const [finalTempStr, setFinalTempStr] = React.useState("");
  const [QStr, setQStr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const mass = parseFloat(massStr);
  const specificHeat = parseFloat(specificHeatStr);
  const initialTemp = parseFloat(initialTempStr);
  const finalTemp = parseFloat(finalTempStr);
  const Q = parseFloat(QStr);

  const massValid = massStr !== "" && Number.isFinite(mass) && mass > 0;
  const shValid =
    specificHeatStr !== "" && Number.isFinite(specificHeat) && specificHeat > 0;
  const iTValid = initialTempStr !== "" && Number.isFinite(initialTemp);
  const fTValid = finalTempStr !== "" && Number.isFinite(finalTemp);
  const QValid = QStr !== "" && Number.isFinite(Q);

  const deltaT =
    iTValid && fTValid ? finalTemp - initialTemp : null;

  const result: number | null = React.useMemo(() => {
    if (solveFor === "Q") {
      if (!massValid || !shValid || deltaT === null) return null;
      return mass * specificHeat * deltaT;
    }
    if (solveFor === "mass") {
      if (!QValid || !shValid || deltaT === null || deltaT === 0) return null;
      return Q / (specificHeat * deltaT);
    }
    if (solveFor === "specificHeat") {
      if (!QValid || !massValid || deltaT === null || deltaT === 0) return null;
      return Q / (mass * deltaT);
    }
    if (solveFor === "deltaT") {
      if (!QValid || !massValid || !shValid || mass * specificHeat === 0)
        return null;
      return Q / (mass * specificHeat);
    }
    return null;
  }, [solveFor, mass, specificHeat, deltaT, Q, massValid, shValid, QValid]);

  function reset() {
    setMassStr("");
    setSpecificHeatStr("");
    setInitialTempStr("");
    setFinalTempStr("");
    setQStr("");
    setTouched(false);
  }

  function loadExample(
    sv: SolveFor,
    m: string,
    sh: string,
    it: string,
    ft: string,
    q: string
  ) {
    setSolveFor(sv);
    setMassStr(m);
    setSpecificHeatStr(sh);
    setInitialTempStr(it);
    setFinalTempStr(ft);
    setQStr(q);
    setTouched(true);
  }

  const showError = touched && result === null;

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

  const resultLabel = React.useMemo(() => {
    switch (solveFor) {
      case "Q": return t("result.Q", { value: fmt(result ?? 0, 4) });
      case "mass": return t("result.mass", { value: fmt(result ?? 0, 4) });
      case "specificHeat": return t("result.specificHeat", { value: fmt(result ?? 0, 4) });
      case "deltaT": return t("result.deltaT", { value: fmt(result ?? 0, 4) });
    }
  }, [solveFor, result, t]);

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
            <Label>{t("field.solveFor")}</Label>
            <div className="flex flex-wrap gap-2">
              {SOLVE_OPTIONS.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant={solveFor === opt ? "default" : "outline"}
                  onClick={() => { setSolveFor(opt); setTouched(false); }}
                >
                  {t(`type.${opt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {solveFor !== "Q" && (
              <div className="space-y-2">
                <Label htmlFor="shc-q">{t("field.Q")}</Label>
                <Input
                  id="shc-q"
                  type="number"
                  inputMode="decimal"
                  value={QStr}
                  placeholder={t("placeholder.Q")}
                  onChange={(e) => { setQStr(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            {solveFor !== "mass" && (
              <div className="space-y-2">
                <Label htmlFor="shc-mass">{t("field.mass")}</Label>
                <Input
                  id="shc-mass"
                  type="number"
                  inputMode="decimal"
                  value={massStr}
                  placeholder={t("placeholder.mass")}
                  onChange={(e) => { setMassStr(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            {solveFor !== "specificHeat" && (
              <div className="space-y-2">
                <Label htmlFor="shc-sh">{t("field.specificHeat")}</Label>
                <Input
                  id="shc-sh"
                  type="number"
                  inputMode="decimal"
                  value={specificHeatStr}
                  placeholder={t("placeholder.specificHeat")}
                  onChange={(e) => { setSpecificHeatStr(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            {solveFor !== "deltaT" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="shc-it">{t("field.initialTemp")}</Label>
                  <Input
                    id="shc-it"
                    type="number"
                    inputMode="decimal"
                    value={initialTempStr}
                    placeholder={t("placeholder.temp")}
                    onChange={(e) => { setInitialTempStr(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shc-ft">{t("field.finalTemp")}</Label>
                  <Input
                    id="shc-ft"
                    type="number"
                    inputMode="decimal"
                    value={finalTempStr}
                    placeholder={t("placeholder.temp")}
                    onChange={(e) => { setFinalTempStr(e.target.value); setTouched(true); }}
                  />
                </div>
              </>
            )}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {resultLabel}
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
            onClick={() => loadExample("Q", "1.0", "4186", "25", "100", "")}
          >
            {t("examples.loadWater")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("Q", "5.0", "900", "20", "150", "")}
          >
            {t("examples.loadAluminum")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("Q", "2.0", "450", "800", "100", "")}
          >
            {t("examples.loadIron")}
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
