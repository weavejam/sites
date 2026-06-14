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

// ── math helpers ──────────────────────────────────────────────────────────

function lgamma(x: number): number {
  if (x < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  }
  x -= 1;
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  let a = c[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

function logFact(n: number): number {
  return lgamma(n + 1);
}

function logHypergeomP(a: number, b: number, c: number, d: number): number {
  const n = a + b + c + d;
  return (
    logFact(a + b) + logFact(c + d) + logFact(a + c) + logFact(b + d) -
    logFact(n) - logFact(a) - logFact(b) - logFact(c) - logFact(d)
  );
}

interface FisherResult {
  oneTailed: number;
  twoTailed: number;
  oddsRatio: number;
  pObserved: number;
}

function fisherExact(a: number, b: number, c: number, d: number): FisherResult {
  const rowSum1 = a + b;
  const rowSum2 = c + d;
  const colSum1 = a + c;
  const n = a + b + c + d;
  // a ranges from max(0, colSum1 - rowSum2) to min(rowSum1, colSum1)
  const aMin = Math.max(0, colSum1 - rowSum2);
  const aMax = Math.min(rowSum1, colSum1);
  const pObs = Math.exp(logHypergeomP(a, b, c, d));
  const probs: number[] = [];
  for (let ai = aMin; ai <= aMax; ai++) {
    const bi = rowSum1 - ai;
    const ci = colSum1 - ai;
    const di = rowSum2 - ci;
    probs.push(Math.exp(logHypergeomP(ai, bi, ci, di)));
  }
  // One-tailed: P(a' >= a) summing upper tail (larger a means more association)
  let oneTailed = 0;
  for (let ai = a; ai <= aMax; ai++) {
    oneTailed += probs[ai - aMin];
  }
  oneTailed = Math.min(oneTailed, 1);
  // Two-tailed: sum all tables with p <= pObs
  let twoTailed = 0;
  for (const p of probs) {
    if (p <= pObs * (1 + 1e-9)) twoTailed += p;
  }
  twoTailed = Math.min(twoTailed, 1);
  const oddsRatio = b > 0 && c > 0 ? (a * d) / (b * c) : (a * d === 0 ? 0 : Infinity);
  return { oneTailed, twoTailed, oddsRatio, pObserved: pObs };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (n === Infinity) return "∞";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

interface ExampleItem { input: string; output: string; note?: string }

// ── component ─────────────────────────────────────────────────────────────

export default function FishersExactTestCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.fishers-exact-test-calculator");
  const [cellA, setCellA] = React.useState("");
  const [cellB, setCellB] = React.useState("");
  const [cellC, setCellC] = React.useState("");
  const [cellD, setCellD] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseInt(cellA, 10);
  const bNum = parseInt(cellB, 10);
  const cNum = parseInt(cellC, 10);
  const dNum = parseInt(cellD, 10);

  const valid =
    cellA !== "" && cellB !== "" && cellC !== "" && cellD !== "" &&
    Number.isInteger(aNum) && aNum >= 0 &&
    Number.isInteger(bNum) && bNum >= 0 &&
    Number.isInteger(cNum) && cNum >= 0 &&
    Number.isInteger(dNum) && dNum >= 0 &&
    (aNum + bNum + cNum + dNum) > 0;

  const result = React.useMemo<FisherResult | null>(() => {
    if (!valid) return null;
    try {
      return fisherExact(aNum, bNum, cNum, dNum);
    } catch {
      return null;
    }
  }, [valid, aNum, bNum, cNum, dNum]);

  function reset() {
    setCellA(""); setCellB(""); setCellC(""); setCellD("");
    setTouched(false);
  }

  function loadExample(a: string, b: string, c: string, d: string) {
    setCellA(a); setCellB(b); setCellC(c); setCellD(d);
    setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
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

  const showError = touched && !valid;

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
          <CardTitle>{t("card.title")}</CardTitle>
          <CardDescription>{t("card.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="text-sm">
                <thead>
                  <tr>
                    <th className="px-2 py-1"></th>
                    <th className="px-2 py-1 font-medium text-zinc-600">{t("table.outcome1")}</th>
                    <th className="px-2 py-1 font-medium text-zinc-600">{t("table.outcome2")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-2 font-medium text-zinc-600">{t("table.group1")}</td>
                    <td className="px-2 py-2">
                      <div className="space-y-1">
                        <Label htmlFor="fet-a" className="text-xs">{t("field.cellA")}</Label>
                        <Input
                          id="fet-a" type="number" inputMode="numeric" min="0"
                          className="w-24"
                          value={cellA} placeholder="0"
                          onChange={(e) => { setCellA(e.target.value); setTouched(true); }}
                        />
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="space-y-1">
                        <Label htmlFor="fet-b" className="text-xs">{t("field.cellB")}</Label>
                        <Input
                          id="fet-b" type="number" inputMode="numeric" min="0"
                          className="w-24"
                          value={cellB} placeholder="0"
                          onChange={(e) => { setCellB(e.target.value); setTouched(true); }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 font-medium text-zinc-600">{t("table.group2")}</td>
                    <td className="px-2 py-2">
                      <div className="space-y-1">
                        <Label htmlFor="fet-c" className="text-xs">{t("field.cellC")}</Label>
                        <Input
                          id="fet-c" type="number" inputMode="numeric" min="0"
                          className="w-24"
                          value={cellC} placeholder="0"
                          onChange={(e) => { setCellC(e.target.value); setTouched(true); }}
                        />
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="space-y-1">
                        <Label htmlFor="fet-d" className="text-xs">{t("field.cellD")}</Label>
                        <Input
                          id="fet-d" type="number" inputMode="numeric" min="0"
                          className="w-24"
                          value={cellD} placeholder="0"
                          onChange={(e) => { setCellD(e.target.value); setTouched(true); }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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

          {result && touched && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.oneTailed")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.oneTailed)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.twoTailed")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.twoTailed)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.oddsRatio")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.oddsRatio)}</div>
                </div>
              </div>
              <div className={`rounded px-3 py-2 text-sm font-medium ${
                result.twoTailed < 0.05
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}>
                {result.twoTailed < 0.05 ? t("result.significant") : t("result.notSignificant")}
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
            onClick={() => loadExample("9", "1", "2", "8")}>
            {t("examples.loadDrug")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("7", "3", "1", "12")}>
            {t("examples.loadGene")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("10", "2", "5", "8")}>
            {t("examples.loadTeaching")}
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
