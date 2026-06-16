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
type Matrix = number[][];

function det2(a: number, b: number, c: number, d: number): number {
  return a * d - b * c;
}

function det3(m: Matrix): number {
  return (
    m[0][0] * det2(m[1][1], m[1][2], m[2][1], m[2][2]) -
    m[0][1] * det2(m[1][0], m[1][2], m[2][0], m[2][2]) +
    m[0][2] * det2(m[1][0], m[1][1], m[2][0], m[2][1])
  );
}

function det4(m: Matrix): number {
  let result = 0;
  for (let c = 0; c < 4; c++) {
    const minor = m
      .slice(1)
      .map((row) => [...row.slice(0, c), ...row.slice(c + 1)]);
    result += (c % 2 === 0 ? 1 : -1) * m[0][c] * det3(minor);
  }
  return result;
}

function minor(m: Matrix, row: number, col: number): Matrix {
  return m
    .filter((_, r) => r !== row)
    .map((r) => r.filter((_, c) => c !== col));
}

function determinant(m: Matrix): number {
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return det2(m[0][0], m[0][1], m[1][0], m[1][1]);
  if (n === 3) return det3(m);
  return det4(m);
}

function cofactorMatrix(m: Matrix): Matrix {
  const n = m.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      const sub = minor(m, i, j);
      return sign * determinant(sub);
    })
  );
}

function transpose(m: Matrix): Matrix {
  const n = m.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => m[j][i])
  );
}

function adjoint(m: Matrix): Matrix {
  return transpose(cofactorMatrix(m));
}

function scalarDiv(m: Matrix, s: number): Matrix {
  return m.map((row) => row.map((v) => v / s));
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e8) / 1e8;
  return r.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

function MatrixDisplay({ m, label }: { m: Matrix; label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-zinc-500">{label}</div>
      <div className="inline-block rounded border border-zinc-200 bg-zinc-50 p-2">
        <table className="border-collapse text-sm font-mono">
          <tbody>
            {m.map((row, i) => (
              <tr key={i}>
                {row.map((v, j) => (
                  <td key={j} className="px-3 py-1 text-right text-zinc-900">
                    {formatNum(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdjointMatrixCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.adjoint-matrix-calculator");

  const [size, setSize] = React.useState<MatrixSize>(2);
  const [values, setValues] = React.useState<string[][]>(() =>
    Array.from({ length: 2 }, () => Array(2).fill(""))
  );
  const [result, setResult] = React.useState<{
    det: number;
    adj: Matrix;
    inv: Matrix | null;
  } | null>(null);
  const [error, setError] = React.useState<string>("");

  function changeSize(s: MatrixSize) {
    setSize(s);
    setValues(Array.from({ length: s }, () => Array(s).fill("")));
    setResult(null);
    setError("");
  }

  function handleInput(i: number, j: number, v: string) {
    setValues((prev) => {
      const next = prev.map((r) => [...r]);
      next[i][j] = v;
      return next;
    });
    setResult(null);
    setError("");
  }

  function calculate() {
    const nums: number[][] = [];
    for (let i = 0; i < size; i++) {
      nums.push([]);
      for (let j = 0; j < size; j++) {
        const v = parseFloat(values[i][j]);
        if (!Number.isFinite(v)) {
          setError(t("error.fillAll"));
          return;
        }
        nums[i].push(v);
      }
    }
    const det = determinant(nums);
    const adj = adjoint(nums);
    const inv = Math.abs(det) < 1e-12 ? null : scalarDiv(adj, det);
    setResult({ det, adj, inv });
    setError(Math.abs(det) < 1e-12 ? t("error.singular") : "");
  }

  function reset() {
    setValues(Array.from({ length: size }, () => Array(size).fill("")));
    setResult(null);
    setError("");
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note: string }[]
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
                  onClick={() => changeSize(s)}
                >
                  {t(`field.size${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.matrixElements")}</Label>
            <div className="inline-block">
              <table className="border-collapse">
                <tbody>
                  {Array.from({ length: size }, (_, i) => (
                    <tr key={i}>
                      {Array.from({ length: size }, (_, j) => (
                        <td key={j} className="p-1">
                          <Input
                            type="number"
                            inputMode="decimal"
                            className="w-20 text-center"
                            value={values[i]?.[j] ?? ""}
                            onChange={(e) => handleInput(i, j, e.target.value)}
                            aria-label={t("field.cellLabel", { row: i + 1, col: j + 1 } as never)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-amber-600">{error}</p>
          )}

          {result !== null && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-500">
                  {t("result.determinant")}
                </div>
                <div className="text-2xl font-semibold text-zinc-900">
                  {formatNum(result.det)}
                </div>
              </div>
              <MatrixDisplay m={result.adj} label={t("result.adjoint")} />
              {result.inv !== null ? (
                <MatrixDisplay m={result.inv} label={t("result.inverse")} />
              ) : (
                <p className="text-sm text-zinc-500">{t("result.noInverse")}</p>
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
                  <td className="px-3 py-2 font-mono text-zinc-800">
                    {ex.input}
                  </td>
                  <td className="px-3 py-2 text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
