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

type MatrixSize = 2 | 3 | 4;

function choleskyDecomposition(A: number[][]): number[][] | null {
  const n = A.length;
  const L: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let j = 0; j < n; j++) {
    let sum = A[j][j];
    for (let k = 0; k < j; k++) sum -= L[j][k] * L[j][k];
    if (sum <= 0) return null;
    L[j][j] = Math.sqrt(sum);
    for (let i = j + 1; i < n; i++) {
      let s = A[i][j];
      for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k];
      L[i][j] = s / L[j][j];
    }
  }
  return L;
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toString();
}

export default function CholeskyDecompositionCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.cholesky-decomposition-calculator");

  const [size, setSize] = React.useState<MatrixSize>(2);
  const [cells, setCells] = React.useState<string[][]>(() =>
    Array.from({ length: 4 }, () => new Array(4).fill(""))
  );
  const [touched, setTouched] = React.useState(false);

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

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  function updateCell(r: number, c: number, val: string) {
    setCells((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = val;
      return next;
    });
    setTouched(true);
  }

  const result = React.useMemo<{
    L: number[][] | null;
    error: string | null;
  }>(() => {
    if (!touched) return { L: null, error: null };
    const A: number[][] = [];
    for (let i = 0; i < size; i++) {
      A.push([]);
      for (let j = 0; j < size; j++) {
        const v = parseFloat(cells[i][j]);
        if (!Number.isFinite(v)) return { L: null, error: "invalid" };
        A[i].push(v);
      }
    }
    // Check symmetry
    for (let i = 0; i < size; i++) {
      for (let j = i + 1; j < size; j++) {
        if (Math.abs(A[i][j] - A[j][i]) > 1e-10)
          return { L: null, error: "notSymmetric" };
      }
    }
    const L = choleskyDecomposition(A);
    if (L === null) return { L: null, error: "notPositiveDefinite" };
    return { L, error: null };
  }, [touched, size, cells]);

  function loadExample(matrix: number[][]) {
    const next = cells.map((row) => [...row]);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        next[i][j] = String(matrix[i][j]);
      }
    }
    setSize(matrix.length as MatrixSize);
    setCells(next);
    setTouched(true);
  }

  function reset() {
    setCells(Array.from({ length: 4 }, () => new Array(4).fill("")));
    setTouched(false);
  }

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

  const SIZES: MatrixSize[] = [2, 3, 4];

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
            <Label>{t("field.matrixSize")}</Label>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={size === s ? "default" : "outline"}
                  onClick={() => {
                    setSize(s);
                    setTouched(false);
                  }}
                >
                  {s}×{s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.matrixElements")}</Label>
            <p className="text-sm text-zinc-500">{t("field.matrixHint")}</p>
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: size }, (_, i) =>
                Array.from({ length: size }, (__, j) => (
                  <div key={`${i}-${j}`} className="space-y-1">
                      <label
                        htmlFor={`cell-${i}-${j}`}
                        className="text-xs text-zinc-500"
                      >
                        ({i + 1},{j + 1})
                      </label>
                      <Input
                        id={`cell-${i}-${j}`}
                        type="number"
                        inputMode="decimal"
                        value={cells[i][j]}
                        placeholder="0"
                        onChange={(e) => updateCell(i, j, e.target.value)}
                      />
                  </div>
                ))
              )}
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

          {touched && result.error === "invalid" && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {touched && result.error === "notSymmetric" && (
            <p className="text-sm text-red-600">{t("error.notSymmetric")}</p>
          )}
          {touched && result.error === "notPositiveDefinite" && (
            <p className="text-sm text-red-600">
              {t("error.notPositiveDefinite")}
            </p>
          )}

          {result.L !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <p className="text-sm text-zinc-600">{t("result.formula")}</p>
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                }}
              >
                {result.L.map((row, i) =>
                  row.slice(0, size).map((v, j) => (
                    <div
                      key={`r${i}${j}`}
                      className="rounded border border-zinc-200 bg-white px-2 py-1 text-center text-sm font-mono font-medium text-zinc-900"
                    >
                      {fmt(v)}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-700">
              {t("examples.loadLabel")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample([
                    [4, 2],
                    [2, 3],
                  ])
                }
              >
                {t("examples.load2x2")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample([
                    [4, 2, 1],
                    [2, 5, 2],
                    [1, 2, 6],
                  ])
                }
              >
                {t("examples.load3x3")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample([
                    [1, 0],
                    [0, 1],
                  ])
                }
              >
                {t("examples.loadIdentity")}
              </Button>
            </div>
          </div>
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
