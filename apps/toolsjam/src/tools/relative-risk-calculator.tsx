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

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

interface RRResult {
  riskExposed: number;
  riskUnexposed: number;
  relativeRisk: number;
  ciLow: number;
  ciHigh: number;
  attributableRisk: number;
}

function compute(a: number, b: number, c: number, d: number): RRResult | null {
  const nE = a + b;
  const nU = c + d;
  if (nE <= 0 || nU <= 0 || c < 0 || d < 0) return null;
  if (a < 0 || b < 0) return null;
  const riskExposed = a / nE;
  const riskUnexposed = c / nU;
  if (riskUnexposed === 0) return null;
  const relativeRisk = riskExposed / riskUnexposed;
  let ciLow: number;
  let ciHigh: number;
  if (a === 0 || c === 0) {
    ciLow = NaN;
    ciHigh = NaN;
  } else {
    const lnRR = Math.log(relativeRisk);
    const se = Math.sqrt(b / (a * nE) + d / (c * nU));
    ciLow = Math.exp(lnRR - 1.96 * se);
    ciHigh = Math.exp(lnRR + 1.96 * se);
  }
  const attributableRisk = riskExposed - riskUnexposed;
  return { riskExposed, riskUnexposed, relativeRisk, ciLow, ciHigh, attributableRisk };
}

export default function RelativeRiskCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.relative-risk-calculator");
  const [aVal, setAVal] = React.useState<string>("");
  const [bVal, setBVal] = React.useState<string>("");
  const [cVal, setCVal] = React.useState<string>("");
  const [dVal, setDVal] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const a = parseFloat(aVal);
  const b = parseFloat(bVal);
  const c = parseFloat(cVal);
  const d = parseFloat(dVal);
  const allValid =
    aVal !== "" && bVal !== "" && cVal !== "" && dVal !== "" &&
    [a, b, c, d].every((n) => Number.isFinite(n) && n >= 0);

  const result = React.useMemo<RRResult | null>(() => {
    if (!allValid) return null;
    return compute(a, b, c, d);
  }, [a, b, c, d, allValid]);

  function loadExample(av: string, bv: string, cv: string, dv: string) {
    setAVal(av); setBVal(bv); setCVal(cv); setDVal(dv);
    setTouched(true);
  }

  function reset() {
    setAVal(""); setBVal(""); setCVal(""); setDVal("");
    setTouched(false);
  }

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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a2 = t(`faq.q${i}_a` as never);
        if (q && a2 && !q.startsWith("tool.")) arr.push({ q, a: a2 });
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

  const showError = touched && (!allValid || result === null);

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
          <p className="text-sm text-zinc-500">{t("tableNote")}</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">
                {t("group.exposed")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="rrc-a">{t("field.a")}</Label>
                <Input
                  id="rrc-a"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={aVal}
                  placeholder={t("placeholder.a")}
                  onChange={(e) => { setAVal(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rrc-b">{t("field.b")}</Label>
                <Input
                  id="rrc-b"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={bVal}
                  placeholder={t("placeholder.b")}
                  onChange={(e) => { setBVal(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">
                {t("group.unexposed")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="rrc-c">{t("field.c")}</Label>
                <Input
                  id="rrc-c"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={cVal}
                  placeholder={t("placeholder.c")}
                  onChange={(e) => { setCVal(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rrc-d">{t("field.d")}</Label>
                <Input
                  id="rrc-d"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={dVal}
                  placeholder={t("placeholder.d")}
                  onChange={(e) => { setDVal(e.target.value); setTouched(true); }}
                />
              </div>
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
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(
                  [
                    ["result.riskExposed", `${fmt(result.riskExposed * 100)}%`],
                    ["result.riskUnexposed", `${fmt(result.riskUnexposed * 100)}%`],
                    ["result.relativeRisk", fmt(result.relativeRisk)],
                    ["result.ci95", (Number.isFinite(result.ciLow) && Number.isFinite(result.ciHigh)) ? `${fmt(result.ciLow)} – ${fmt(result.ciHigh)}` : t("result.ciUnavailable")],
                    ["result.attributableRisk", `${fmt(result.attributableRisk * 100)}%`],
                  ] as [string, string][]
                ).map(([key, val]) => (
                  <div
                    key={key}
                    className="rounded border border-zinc-200 bg-white p-3"
                  >
                    <div className="text-xs text-zinc-500">
                      {t(key as never)}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500">{t("formula")}</p>
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
            onClick={() => loadExample("70", "6930", "3", "2997")}
          >
            {t("examples.loadSmoking")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("25", "4975", "80", "4920")}
          >
            {t("examples.loadVaccine")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("150", "1850", "100", "2900")}
          >
            {t("examples.loadDiet")}
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
