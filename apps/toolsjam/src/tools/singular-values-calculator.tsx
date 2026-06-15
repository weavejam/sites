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

// Parse a matrix from text: rows separated by newlines, cols by commas or spaces.
function parseMatrix(text: string): number[][] | null {
  const lines = text
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return null;

  const rows: number[][] = [];
  for (const line of lines) {
    const parts = line.split(/[\s,]+/).filter((p) => p.length > 0);
    const nums = parts.map(Number);
    if (nums.some((n) => !Number.isFinite(n))) return null;
    rows.push(nums);
  }

  const cols = rows[0].length;
  if (cols === 0 || rows.some((r) => r.length !== cols)) return null;
  return rows;
}

// Jacobi eigenvalue algorithm for symmetric positive semidefinite matrices.
// Returns the diagonal eigenvalues after convergence.
function jacobiEigenvalues(S: number[][]): number[] {
  const n = S.length;
  const A = S.map((row) => [...row]);

  const MAX_ITER = 200 * n * n;
  for (let iter = 0; iter < MAX_ITER; iter++) {
    // Find max off-diagonal element
    let maxVal = 0;
    let p = 0;
    let q = 1;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const v = Math.abs(A[i][j]);
        if (v > maxVal) {
          maxVal = v;
          p = i;
          q = j;
        }
      }
    }
    if (maxVal < 1e-12) break;

    const tau = (A[q][q] - A[p][p]) / (2 * A[p][q]);
    const t =
      tau >= 0
        ? 1 / (tau + Math.sqrt(1 + tau * tau))
        : 1 / (tau - Math.sqrt(1 + tau * tau));
    const c = 1 / Math.sqrt(1 + t * t);
    const s = t * c;

    const newApp = A[p][p] - t * A[p][q];
    const newAqq = A[q][q] + t * A[p][q];
    A[p][p] = newApp;
    A[q][q] = newAqq;
    A[p][q] = 0;
    A[q][p] = 0;

    for (let k = 0; k < n; k++) {
      if (k !== p && k !== q) {
        const Akp = A[k][p];
        const Akq = A[k][q];
        A[k][p] = c * Akp - s * Akq;
        A[p][k] = A[k][p];
        A[k][q] = s * Akp + c * Akq;
        A[q][k] = A[k][q];
      }
    }
  }

  return A.map((row, i) => row[i]);
}

interface SVDResult {
  singularValues: number[];
  rank: number;
  conditionNumber: number | null;
  frobeniusNorm: number;
  spectralNorm: number;
}

function computeSVD(matrix: number[][]): SVDResult {
  const m = matrix.length;
  const n = matrix[0].length;

  // Compute A^T * A (n x n symmetric PSD matrix)
  const AtA: number[][] = Array.from({ length: n }, () =>
    new Array(n).fill(0)
  );
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < m; k++) {
        sum += matrix[k][i] * matrix[k][j];
      }
      AtA[i][j] = sum;
      AtA[j][i] = sum;
    }
  }

  const eigenvalues = jacobiEigenvalues(AtA);
  const k = Math.min(m, n);
  const singularValues = eigenvalues
    .map((ev) => Math.sqrt(Math.max(0, ev)))
    .sort((a, b) => b - a)
    .slice(0, k);

  const RANK_TOL = 1e-9;
  const rank = singularValues.filter((sv) => sv > RANK_TOL).length;

  const maxSV = singularValues[0] ?? 0;
  const minNonZeroSV = [...singularValues].reverse().find((sv) => sv > RANK_TOL) ?? 0;
  const conditionNumber =
    rank === n && minNonZeroSV > 0 ? maxSV / minNonZeroSV : null;

  // Frobenius norm = sqrt(sum of squares of all elements)
  let frobSq = 0;
  for (const row of matrix) for (const v of row) frobSq += v * v;
  const frobeniusNorm = Math.sqrt(frobSq);

  const spectralNorm = maxSV;

  return { singularValues, rank, conditionNumber, frobeniusNorm, spectralNorm };
}

function fmt(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function SingularValuesCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.singular-values-calculator");

  const [matrixText, setMatrixText] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const matrix = React.useMemo(
    () => (matrixText.trim() ? parseMatrix(matrixText) : null),
    [matrixText]
  );

  const svdResult = React.useMemo<SVDResult | null>(() => {
    if (!matrix) return null;
    try {
      return computeSVD(matrix);
    } catch {
      return null;
    }
  }, [matrix]);

  function loadExample(text: string) {
    setMatrixText(text);
    setTouched(true);
  }

  function reset() {
    setMatrixText("");
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

  const showParseError = touched && matrixText.trim() !== "" && matrix === null;

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
            <Label htmlFor="svc-matrix">{t("field.matrix")}</Label>
            <p className="text-xs text-zinc-500">{t("field.matrixHint")}</p>
            <textarea
              id="svc-matrix"
              className="flex min-h-[100px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 font-mono"
              placeholder={t("placeholder.matrix")}
              value={matrixText}
              onChange={(e) => {
                setMatrixText(e.target.value);
                setTouched(true);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showParseError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {svdResult !== null && !showParseError && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.singularValues")}</div>
                <div className="mt-1 font-mono text-lg font-semibold text-zinc-900">
                  {svdResult.singularValues
                    .map((sv) => fmt(sv))
                    .join(",  ")}
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.rank")}: </span>
                  <span className="font-semibold">{svdResult.rank}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.frobeniusNorm")}: </span>
                  <span className="font-semibold">{fmt(svdResult.frobeniusNorm)}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.spectralNorm")}: </span>
                  <span className="font-semibold">{fmt(svdResult.spectralNorm)}</span>
                </div>
                {svdResult.conditionNumber !== null && (
                  <div>
                    <span className="text-zinc-500">{t("result.conditionNumber")}: </span>
                    <span className="font-semibold">{fmt(svdResult.conditionNumber)}</span>
                  </div>
                )}
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
                  <td className="px-3 py-2 font-mono text-zinc-800">{ex.input}</td>
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
            onClick={() => loadExample("1,2\n3,4")}
          >
            {t("examples.load2x2")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1,0,0\n0,2,0\n0,0,3")}
          >
            {t("examples.loadDiagonal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1,2,3\n4,5,6")}
          >
            {t("examples.load2x3")}
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
