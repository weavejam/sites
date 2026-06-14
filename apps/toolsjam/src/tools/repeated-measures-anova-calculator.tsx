"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function parseMatrix(raw: string): number[][] | null {
  const lines = raw
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "");
  if (lines.length < 2) return null;
  const rows = lines.map((l) =>
    l.split(/[\t,; ]+/).map(Number).filter((n) => Number.isFinite(n))
  );
  const cols = rows[0].length;
  if (cols < 2) return null;
  if (!rows.every((r) => r.length === cols)) return null;
  return rows;
}

interface AnovaResult {
  n: number; // subjects
  k: number; // conditions
  ssBetween: number;
  ssError: number;
  ssTotal: number;
  dfBetween: number;
  dfError: number;
  msBetween: number;
  msError: number;
  F: number;
  etaSquared: number;
}

function calcRmAnova(matrix: number[][]): AnovaResult | null {
  const n = matrix.length; // subjects
  const k = matrix[0].length; // conditions
  if (n < 2 || k < 2) return null;

  // Grand mean
  const allVals = matrix.flat();
  const grandMean = allVals.reduce((a, b) => a + b, 0) / allVals.length;

  // Condition means
  const condMeans = Array.from({ length: k }, (_, j) => {
    const col = matrix.map((r) => r[j]);
    return col.reduce((a, b) => a + b, 0) / n;
  });

  // Subject means
  const subjectMeans = matrix.map((r) => r.reduce((a, b) => a + b, 0) / k);

  // SS Between conditions
  const ssBetween = n * condMeans.reduce((a, m) => a + (m - grandMean) ** 2, 0);

  // SS Subjects
  const ssSubjects = k * subjectMeans.reduce((a, m) => a + (m - grandMean) ** 2, 0);

  // SS Total
  const ssTotal = allVals.reduce((a, v) => a + (v - grandMean) ** 2, 0);

  // SS Error = SS Total - SS Between - SS Subjects
  const ssError = ssTotal - ssBetween - ssSubjects;

  const dfBetween = k - 1;
  const dfError = (n - 1) * (k - 1);

  const msBetween = ssBetween / dfBetween;
  const msError = ssError / dfError;

  if (msError <= 0) return null;

  const F = msBetween / msError;
  const etaSquared = ssBetween / ssTotal;

  return { n, k, ssBetween, ssError, ssTotal, dfBetween, dfError, msBetween, msError, F, etaSquared };
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

export default function RepeatedMeasuresAnovaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.repeated-measures-anova-calculator");
  const [input, setInput] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const matrix = React.useMemo(() => parseMatrix(input), [input]);
  const result = React.useMemo(
    () => (touched && matrix ? calcRmAnova(matrix) : null),
    [touched, matrix]
  );

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

  const showError = touched && !matrix;

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
            <Label htmlFor="rm-data">{t("field.dataInput")}</Label>
            <textarea
              id="rm-data"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              rows={6}
              placeholder={t("placeholder.dataInput")}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setTouched(false);
              }}
            />
            <p className="text-xs text-zinc-500">{t("field.dataInputHint")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => { setInput(""); setTouched(false); }}
            >
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-100">
                      <th className="px-3 py-2 text-left font-semibold">{t("result.source")}</th>
                      <th className="px-3 py-2 text-right font-semibold">{t("result.colSS")}</th>
                      <th className="px-3 py-2 text-right font-semibold">{t("result.colDf")}</th>
                      <th className="px-3 py-2 text-right font-semibold">{t("result.colMS")}</th>
                      <th className="px-3 py-2 text-right font-semibold">{t("result.colF")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100">
                      <td className="px-3 py-2">{t("result.betweenConditions")}</td>
                      <td className="px-3 py-2 text-right">{fmt(result.ssBetween)}</td>
                      <td className="px-3 py-2 text-right">{result.dfBetween}</td>
                      <td className="px-3 py-2 text-right">{fmt(result.msBetween)}</td>
                      <td className="px-3 py-2 text-right font-semibold">{fmt(result.F)}</td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="px-3 py-2">{t("result.error")}</td>
                      <td className="px-3 py-2 text-right">{fmt(result.ssError)}</td>
                      <td className="px-3 py-2 text-right">{result.dfError}</td>
                      <td className="px-3 py-2 text-right">{fmt(result.msError)}</td>
                      <td className="px-3 py-2 text-right">—</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">{t("result.total")}</td>
                      <td className="px-3 py-2 text-right font-medium">{fmt(result.ssTotal)}</td>
                      <td className="px-3 py-2 text-right font-medium">{result.n * result.k - 1}</td>
                      <td className="px-3 py-2 text-right">—</td>
                      <td className="px-3 py-2 text-right">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.subjects")}</div>
                  <div className="text-xl font-semibold">{result.n}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.conditions")}</div>
                  <div className="text-xl font-semibold">{result.k}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 border-blue-300 bg-blue-50">
                  <div className="text-xs text-blue-600">{t("result.etaSquared")}</div>
                  <div className="text-xl font-bold text-blue-700">{fmt(result.etaSquared, 4)}</div>
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
