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

type SolveFor = "finalPressure" | "finalVolume" | "initialPressure" | "initialVolume";
const SOLVE_OPTIONS: SolveFor[] = ["finalPressure", "finalVolume", "initialPressure", "initialVolume"];

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function BoylesLawCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.boyles-law-calculator");

  const [solveFor, setSolveFor] = React.useState<SolveFor>("finalPressure");
  const [p1, setP1] = React.useState("");
  const [v1, setV1] = React.useState("");
  const [p2, setP2] = React.useState("");
  const [v2, setV2] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const P1 = parseFloat(p1);
  const V1 = parseFloat(v1);
  const P2 = parseFloat(p2);
  const V2 = parseFloat(v2);

  const result = React.useMemo<number | null>(() => {
    if (!touched) return null;
    switch (solveFor) {
      case "finalPressure":
        if (!Number.isFinite(P1) || P1 <= 0 || !Number.isFinite(V1) || V1 <= 0 || !Number.isFinite(V2) || V2 <= 0) return null;
        return (P1 * V1) / V2;
      case "finalVolume":
        if (!Number.isFinite(P1) || P1 <= 0 || !Number.isFinite(V1) || V1 <= 0 || !Number.isFinite(P2) || P2 <= 0) return null;
        return (P1 * V1) / P2;
      case "initialPressure":
        if (!Number.isFinite(P2) || P2 <= 0 || !Number.isFinite(V2) || V2 <= 0 || !Number.isFinite(V1) || V1 <= 0) return null;
        return (P2 * V2) / V1;
      case "initialVolume":
        if (!Number.isFinite(P2) || P2 <= 0 || !Number.isFinite(V2) || V2 <= 0 || !Number.isFinite(P1) || P1 <= 0) return null;
        return (P2 * V2) / P1;
    }
  }, [touched, solveFor, P1, V1, P2, V2]);

  const showError = touched && result === null;

  const examplesItems: ExampleRow[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleRow[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  function handleReset() {
    setP1(""); setV1(""); setP2(""); setV2(""); setTemperature(""); setTouched(false);
  }

  function loadExample(sf: SolveFor, ip: string, iv: string, fp: string, fv: string, temp = "") {
    setSolveFor(sf); setP1(ip); setV1(iv); setP2(fp); setV2(fv); setTemperature(temp); setTouched(true);
  }

  const showP1 = solveFor !== "initialPressure";
  const showV1 = solveFor !== "initialVolume";
  const showP2 = solveFor !== "finalPressure";
  const showV2 = solveFor !== "finalVolume";

  const resultLabel = t(`result.${solveFor}` as never);
  const resultUnit = solveFor === "finalPressure" || solveFor === "initialPressure"
    ? t("unit.pressure") : t("unit.volume");

  const p1v1 = Number.isFinite(P1) && Number.isFinite(V1) ? P1 * V1 : null;
  const p2v2 = (() => {
    const finalP = solveFor === "finalPressure" ? result : P2;
    const finalV = solveFor === "finalVolume" ? result : V2;
    const initP = solveFor === "initialPressure" ? result : P1;
    const initV = solveFor === "initialVolume" ? result : V1;
    const usedP2 = solveFor === "finalPressure" ? result : (solveFor === "initialPressure" ? result : P2);
    const usedV2 = solveFor === "finalVolume" ? result : (solveFor === "initialVolume" ? result : V2);
    if (solveFor === "finalPressure" && result !== null) return result * V2;
    if (solveFor === "finalVolume" && result !== null) return P2 * result;
    if (solveFor === "initialPressure" && result !== null) return P2 * V2;
    if (solveFor === "initialVolume" && result !== null) return P2 * V2;
    void finalP; void finalV; void initP; void initV; void usedP2; void usedV2;
    return null;
  })();

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
                  {t(`solveFor.${opt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {showP1 && (
              <div className="space-y-2">
                <Label htmlFor="bl-p1">{t("field.initialPressure")} ({t("unit.pressure")})</Label>
                <Input id="bl-p1" type="number" inputMode="decimal" value={p1}
                  placeholder={t("placeholder.initialPressure")} min="0" step="any"
                  onChange={(e) => { setP1(e.target.value); setTouched(false); }} />
              </div>
            )}
            {showV1 && (
              <div className="space-y-2">
                <Label htmlFor="bl-v1">{t("field.initialVolume")} ({t("unit.volume")})</Label>
                <Input id="bl-v1" type="number" inputMode="decimal" value={v1}
                  placeholder={t("placeholder.initialVolume")} min="0" step="any"
                  onChange={(e) => { setV1(e.target.value); setTouched(false); }} />
              </div>
            )}
            {showP2 && (
              <div className="space-y-2">
                <Label htmlFor="bl-p2">{t("field.finalPressure")} ({t("unit.pressure")})</Label>
                <Input id="bl-p2" type="number" inputMode="decimal" value={p2}
                  placeholder={t("placeholder.finalPressure")} min="0" step="any"
                  onChange={(e) => { setP2(e.target.value); setTouched(false); }} />
              </div>
            )}
            {showV2 && (
              <div className="space-y-2">
                <Label htmlFor="bl-v2">{t("field.finalVolume")} ({t("unit.volume")})</Label>
                <Input id="bl-v2" type="number" inputMode="decimal" value={v2}
                  placeholder={t("placeholder.finalVolume")} min="0" step="any"
                  onChange={(e) => { setV2(e.target.value); setTouched(false); }} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="bl-temp">{t("field.temperature")} ({t("unit.temperature")})</Label>
              <Input id="bl-temp" type="number" inputMode="decimal" value={temperature}
                placeholder={t("placeholder.temperature")} step="any"
                onChange={(e) => { setTemperature(e.target.value); }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={handleReset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{resultLabel}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNum(result)} {resultUnit}
                  </div>
                </div>
                {p1v1 !== null && p2v2 !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.product")}</div>
                    <div className="text-base font-medium text-zinc-700">
                      {formatNum(p1v1, 4)} ≈ {formatNum(p2v2, 4)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("finalPressure", "1.0", "2.0", "", "1.0", "298")}>
              {t("examples.loadCompression")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("finalVolume", "2.0", "1.5", "4.0", "", "300")}>
              {t("examples.loadPressure")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("finalVolume", "200", "10.0", "1.0", "", "293")}>
              {t("examples.loadScuba")}
            </Button>
          </div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
