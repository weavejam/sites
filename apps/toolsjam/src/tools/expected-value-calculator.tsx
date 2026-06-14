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

interface OutcomeRow {
  id: number;
  value: string;
  probability: string;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n * 1e8) / 1e8 + "";
}

let nextId = 1;
function makeRow(): OutcomeRow {
  return { id: nextId++, value: "", probability: "" };
}

export default function ExpectedValueCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.expected-value-calculator");
  const [rows, setRows] = React.useState<OutcomeRow[]>([makeRow(), makeRow(), makeRow()]);
  const [touched, setTouched] = React.useState(false);

  interface CalcResult {
    ev: number;
    variance: number;
    stdDev: number;
    probSum: number;
    count: number;
  }

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched) return null;
    const valid: { v: number; p: number }[] = [];
    for (const r of rows) {
      const v = parseFloat(r.value);
      const p = parseFloat(r.probability);
      if (!Number.isFinite(v) || !Number.isFinite(p) || p < 0 || p > 1) return null;
      valid.push({ v, p });
    }
    if (valid.length < 2) return null;
    const probSum = valid.reduce((s, r) => s + r.p, 0);
    if (Math.abs(probSum - 1) > 0.01) return null;
    const ev = valid.reduce((s, r) => s + r.v * r.p, 0);
    const variance = valid.reduce((s, r) => s + r.p * (r.v - ev) ** 2, 0);
    const stdDev = Math.sqrt(variance);
    return { ev, variance, stdDev, probSum, count: valid.length };
  }, [touched, rows]);

  function addRow() {
    setRows((prev) => [...prev, makeRow()]);
  }

  function removeRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function updateRow(id: number, field: "value" | "probability", val: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
    setTouched(true);
  }

  function loadExample(outcomes: { value: string; probability: string }[]) {
    setRows(outcomes.map((o) => ({ id: nextId++, value: o.value, probability: o.probability })));
    setTouched(true);
  }

  function reset() {
    setRows([makeRow(), makeRow(), makeRow()]);
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
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
          <div className="space-y-3">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-sm font-medium text-zinc-600">
              <span>{t("field.outcomeValue")}</span>
              <span>{t("field.probability")}</span>
              <span />
            </div>
            {rows.map((row) => (
              <div key={row.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                <Input
                  type="number"
                  inputMode="decimal"
                  value={row.value}
                  placeholder={t("field.outcomeValuePlaceholder")}
                  onChange={(e) => updateRow(row.id, "value", e.target.value)}
                  aria-label={t("field.outcomeValue")}
                />
                <Input
                  type="number"
                  inputMode="decimal"
                  value={row.probability}
                  placeholder={t("field.probabilityPlaceholder")}
                  onChange={(e) => updateRow(row.id, "probability", e.target.value)}
                  aria-label={t("field.probability")}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length <= 2}
                >
                  {t("button.remove")}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={addRow}>
              {t("button.addRow")}
            </Button>
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.expectedValue")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.ev)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.variance")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.variance)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.stdDev")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.stdDev)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.probSum")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.probSum)}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample([
              { value: "1", probability: "0.1667" },
              { value: "2", probability: "0.1667" },
              { value: "3", probability: "0.1667" },
              { value: "4", probability: "0.1667" },
              { value: "5", probability: "0.1667" },
              { value: "6", probability: "0.1665" },
            ])}>
            {t("examples.loadDice")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample([
              { value: "1000", probability: "0.3" },
              { value: "500", probability: "0.4" },
              { value: "-200", probability: "0.2" },
              { value: "-500", probability: "0.1" },
            ])}>
            {t("examples.loadInvestment")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample([
              { value: "0", probability: "0.95" },
              { value: "5000", probability: "0.04" },
              { value: "25000", probability: "0.01" },
            ])}>
            {t("examples.loadInsurance")}
          </Button>
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
