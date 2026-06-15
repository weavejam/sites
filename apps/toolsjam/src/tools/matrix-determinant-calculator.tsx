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

function parseMatrix(s: string): number[][] | null {
  const trimmed = s.trim();
  if (!trimmed) return null;
  const rows = trimmed
    .split(";")
    .map((r) => r.split(",").map((v) => parseFloat(v.trim())));
  if (rows.length === 0) return null;
  const cols = rows[0].length;
  if (cols === 0) return null;
  for (const row of rows) {
    if (row.length !== cols) return null;
    if (row.some((n) => !Number.isFinite(n))) return null;
  }
  return rows;
}

function det(a: number[][]): number | "square" {
  const n = a.length;
  if (a.some((r) => r.length !== n)) return "square";
  if (n === 1) return a[0][0];
  if (n === 2) return a[0][0] * a[1][1] - a[0][1] * a[1][0];
  const m = a.map((r) => [...r]);
  let sign = 1;
  for (let col = 0; col < n; col++) {
    let pivot = -1;
    for (let row = col; row < n; row++) {
      if (Math.abs(m[row][col]) > 1e-12) {
        pivot = row;
        break;
      }
    }
    if (pivot === -1) return 0;
    if (pivot !== col) {
      [m[col], m[pivot]] = [m[pivot], m[col]];
      sign = -sign;
    }
    for (let row = col + 1; row < n; row++) {
      const f = m[row][col] / m[col][col];
      for (let k = col; k < n; k++) m[row][k] -= f * m[col][k];
    }
  }
  let d = sign;
  for (let i = 0; i < n; i++) d *= m[i][i];
  return Math.round(d * 1e10) / 1e10;
}

function fmtNum(n: number): string {
  return (Math.round(n * 1e10) / 1e10).toString();
}

export default function MatrixDeterminantCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.matrix-determinant-calculator");
  const [matStr, setMatStr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const matrix = React.useMemo(() => parseMatrix(matStr), [matStr]);

  const result = React.useMemo<number | "square" | null>(() => {
    if (!matrix) return null;
    return det(matrix);
  }, [matrix]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as {
      input: string;
      output: string;
      note?: string;
    }[] | undefined;
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

  function reset() {
    setMatStr("");
    setTouched(false);
  }

  const showInvalid = touched && !matrix;
  const showNotSquare = touched && matrix && result === "square";

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
            <Label htmlFor="mdc-matrix">{t("field.matrix")}</Label>
            <Input
              id="mdc-matrix"
              value={matStr}
              placeholder={t("placeholder.matrix")}
              onChange={(e) => {
                setMatStr(e.target.value);
                setTouched(true);
              }}
            />
            <p className="text-xs text-zinc-500">{t("hint.format")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showInvalid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showNotSquare && (
            <p className="text-sm text-red-600">{t("error.notSquare")}</p>
          )}

          {touched && matrix && typeof result === "number" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {fmtNum(result)}
              </div>
              {result === 0 && (
                <div className="text-sm text-zinc-500">{t("result.singular")}</div>
              )}
              {result !== 0 && (
                <div className="text-sm text-zinc-500">{t("result.invertible")}</div>
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
