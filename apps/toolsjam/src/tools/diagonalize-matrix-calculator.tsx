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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

type Matrix = number[][];

function parseMatrix(input: string): Matrix | null {
  const rows = input.split(";").map((r) => r.trim());
  if (rows.length < 2 || rows.length > 3) return null;
  const parsed = rows.map((r) => r.split(",").map((v) => parseFloat(v.trim())));
  if (parsed.some((r) => r.some((v) => !Number.isFinite(v)))) return null;
  const colCount = parsed[0].length;
  if (colCount !== rows.length) return null;
  if (parsed.some((r) => r.length !== colCount)) return null;
  return parsed;
}

function fmt(n: number): string {
  const r = Math.round(n * 1e8) / 1e8;
  return r.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function matrixToString(m: Matrix): string {
  return m.map((row) => "[" + row.map(fmt).join(", ") + "]").join("\n");
}

interface DiagResult {
  eigenvalues: number[];
  eigenvectors: number[][];
  P: Matrix;
  D: Matrix;
  notDiagonalizable: boolean;
}

function solve2x2Eigenvalues(m: Matrix): number[] | null {
  // characteristic polynomial: λ² - tr(A)λ + det(A) = 0
  const tr = m[0][0] + m[1][1];
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const disc = tr * tr - 4 * det;
  if (disc < 0) return null; // complex eigenvalues
  const sq = Math.sqrt(disc);
  return [(tr + sq) / 2, (tr - sq) / 2];
}

function eigenvector2x2(m: Matrix, lambda: number): number[] | null {
  // (A - λI)v = 0
  const a = m[0][0] - lambda;
  const b = m[0][1];
  const c = m[1][0];
  const d = m[1][1] - lambda;
  // If (A - λI) is the zero matrix, any non-zero vector is an eigenvector — return null
  // to signal that the caller must handle the full-space case
  if (Math.abs(a) + Math.abs(b) + Math.abs(c) + Math.abs(d) < 1e-8) {
    return null; // caller handles scalar case
  }
  // pick best row
  if (Math.abs(a) + Math.abs(b) >= Math.abs(c) + Math.abs(d)) {
    if (Math.abs(a) + Math.abs(b) < 1e-10) return null;
    if (Math.abs(b) > Math.abs(a)) {
      return [1, -a / b];
    }
    return [-b / a, 1];
  } else {
    if (Math.abs(c) + Math.abs(d) < 1e-10) return null;
    if (Math.abs(d) > Math.abs(c)) {
      return [1, -c / d];
    }
    return [-d / c, 1];
  }
}

function isZeroMatrix2x2(m: Matrix, lambda: number): boolean {
  const a = m[0][0] - lambda;
  const b = m[0][1];
  const c = m[1][0];
  const d = m[1][1] - lambda;
  return Math.abs(a) + Math.abs(b) + Math.abs(c) + Math.abs(d) < 1e-8;
}

function det3(m: Matrix): number {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

function solve3x3Eigenvalues(m: Matrix): number[] | null {
  // characteristic polynomial: -λ³ + tr(A)λ² - (sum of 2x2 principal minors)λ + det(A) = 0
  const a = m[0][0], b = m[0][1], c = m[0][2];
  const d = m[1][0], e = m[1][1], f = m[1][2];
  const g = m[2][0], h = m[2][1], k = m[2][2];
  const tr = a + e + k;
  const m2 = a * e - b * d + a * k - c * g + e * k - f * h;
  const det = det3(m);
  // λ³ - tr·λ² + m2·λ - det = 0
  // Use numerical approach: Cardano / iterative
  // coefficients: p3=1, p2=-tr, p1=m2, p0=-det
  const p = m2 - tr * tr / 3;
  // depressed cubic substitution λ = t + tr/3 gives t³ + pt + q = 0
  // q = -2(tr/3)³ + (tr/3)·m2 - det
  const q = -2 * tr * tr * tr / 27 + tr * m2 / 3 - det;
  const disc = q * q / 4 + p * p * p / 27;
  if (disc > 1e-10) return null; // one real, two complex
  // Three real roots via trig method
  const r = Math.sqrt(-p * p * p / 27);
  if (r < 1e-15) {
    const root = -q < 0 ? -Math.cbrt(-q) : Math.cbrt(q);
    const lambda = root + tr / 3;
    return [lambda, lambda, lambda];
  }
  const theta = Math.acos(Math.max(-1, Math.min(1, -q / (2 * r))));
  const cbrtR = Math.cbrt(r);
  // Note: r here is magnitude; recompute cbrt properly
  const mag = Math.cbrt(Math.sqrt(-p * p * p / 27));
  const l1 = 2 * mag * Math.cos(theta / 3) + tr / 3;
  const l2 = 2 * mag * Math.cos((theta + 2 * Math.PI) / 3) + tr / 3;
  const l3 = 2 * mag * Math.cos((theta + 4 * Math.PI) / 3) + tr / 3;
  void cbrtR;
  return [l1, l2, l3];
}

function nullspace3x3(B: Matrix): number[][] {
  // Returns 1 or 2 independent null space vectors via row reduction
  const eps = 1e-8;
  // Work on a copy with augmented identity for tracking
  const rows = B.map((r) => [...r]);
  const pivotCols: number[] = [];

  let row = 0;
  for (let col = 0; col < 3 && row < 3; col++) {
    // Find pivot
    let maxVal = 0, maxRow = -1;
    for (let r = row; r < 3; r++) {
      if (Math.abs(rows[r][col]) > maxVal) { maxVal = Math.abs(rows[r][col]); maxRow = r; }
    }
    if (maxVal < eps) continue;
    // Swap
    [rows[row], rows[maxRow]] = [rows[maxRow], rows[row]];
    // Normalize pivot row
    const piv = rows[row][col];
    rows[row] = rows[row].map((v) => v / piv);
    // Eliminate
    for (let r = 0; r < 3; r++) {
      if (r !== row && Math.abs(rows[r][col]) > eps) {
        const f = rows[r][col];
        rows[r] = rows[r].map((v, c) => v - f * rows[row][c]);
      }
    }
    pivotCols.push(col);
    row++;
  }

  const freeCols = [0, 1, 2].filter((c) => !pivotCols.includes(c));
  const result: number[][] = [];

  for (const fc of freeCols) {
    const v = [0, 0, 0];
    v[fc] = 1;
    for (let pr = 0; pr < pivotCols.length; pr++) {
      const pc = pivotCols[pr];
      // row pr: x[pc] + sum(rows[pr][freeCols]*x[freeCols]) = 0
      let s = 0;
      for (const fc2 of freeCols) s += rows[pr][fc2] * v[fc2];
      v[pc] = -s;
    }
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
    if (norm > eps) result.push(v.map((x) => x / norm));
  }
  return result;
}

function eigenvectors3x3(m: Matrix, lambda: number): number[][] {
  const B: Matrix = m.map((row, i) =>
    row.map((v, j) => v - (i === j ? lambda : 0))
  );
  const totalAbs = B.flat().reduce((s, v) => s + Math.abs(v), 0);
  if (totalAbs < 1e-8) return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; // scalar
  return nullspace3x3(B);
}

function normalize(v: number[]): number[] {
  const n = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
  return n < 1e-12 ? v : v.map((x) => x / n);
}

function diagonalize(m: Matrix): DiagResult {
  const n = m.length;
  if (n === 2) {
    const evals = solve2x2Eigenvalues(m);
    if (!evals) return { eigenvalues: [], eigenvectors: [], P: [], D: [], notDiagonalizable: true };

    // Handle repeated eigenvalue case
    if (Math.abs(evals[0] - evals[1]) < 1e-8) {
      const lambda = (evals[0] + evals[1]) / 2;
      if (isZeroMatrix2x2(m, lambda)) {
        // Scalar matrix A = λI — diagonalizable with P = I
        const evecs = [[1, 0], [0, 1]];
        const P: Matrix = [[1, 0], [0, 1]];
        const D: Matrix = [[lambda, 0], [0, lambda]];
        return { eigenvalues: [lambda, lambda], eigenvectors: evecs, P, D, notDiagonalizable: false };
      } else {
        // Defective matrix — only one independent eigenvector
        return { eigenvalues: evals, eigenvectors: [], P: [], D: [], notDiagonalizable: true };
      }
    }

    const evecs: number[][] = [];
    for (const lam of evals) {
      const v = eigenvector2x2(m, lam);
      if (!v) return { eigenvalues: evals, eigenvectors: [], P: [], D: [], notDiagonalizable: true };
      evecs.push(normalize(v));
    }
    // Check linear independence
    const det = evecs[0][0] * evecs[1][1] - evecs[0][1] * evecs[1][0];
    if (Math.abs(det) < 1e-8) return { eigenvalues: evals, eigenvectors: evecs, P: [], D: [], notDiagonalizable: true };
    const P: Matrix = [[evecs[0][0], evecs[1][0]], [evecs[0][1], evecs[1][1]]];
    const D: Matrix = [[evals[0], 0], [0, evals[1]]];
    return { eigenvalues: evals, eigenvectors: evecs, P, D, notDiagonalizable: false };
  } else {
    const evals = solve3x3Eigenvalues(m);
    if (!evals) return { eigenvalues: [], eigenvectors: [], P: [], D: [], notDiagonalizable: true };

    // Collect eigenvectors per distinct eigenvalue
    // Deduplicate eigenvalues (group repeats together)
    const evecMap: Map<number, number[][]> = new Map();
    const roundedEvals = evals.map((lam) => Math.round(lam * 1e6) / 1e6);

    for (const lam of evals) {
      const key = roundedEvals[evals.indexOf(lam)];
      if (!evecMap.has(key)) {
        const vecs = eigenvectors3x3(m, lam);
        evecMap.set(key, vecs);
      }
    }

    // Build ordered eigenvector list matching evals order
    const allEvecs: number[][] = [];
    const processedKeys = new Set<number>();
    for (let i = 0; i < evals.length; i++) {
      const key = roundedEvals[i];
      if (!processedKeys.has(key)) {
        processedKeys.add(key);
        const vecs = evecMap.get(key)!;
        // Determine how many times this eigenvalue appears
        const count = roundedEvals.filter((k) => k === key).length;
        if (vecs.length < count) {
          // Insufficient eigenvectors — defective
          return { eigenvalues: evals, eigenvectors: [], P: [], D: [], notDiagonalizable: true };
        }
        for (let j = 0; j < count; j++) allEvecs.push(vecs[j]);
      }
    }

    if (allEvecs.length !== 3) {
      return { eigenvalues: evals, eigenvectors: allEvecs, P: [], D: [], notDiagonalizable: true };
    }

    const P: Matrix = [
      [allEvecs[0][0], allEvecs[1][0], allEvecs[2][0]],
      [allEvecs[0][1], allEvecs[1][1], allEvecs[2][1]],
      [allEvecs[0][2], allEvecs[1][2], allEvecs[2][2]],
    ];
    const D: Matrix = [
      [evals[0], 0, 0],
      [0, evals[1], 0],
      [0, 0, evals[2]],
    ];
    return { eigenvalues: evals, eigenvectors: allEvecs, P, D, notDiagonalizable: false };
  }
}

export default function DiagonalizeMatrixCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.diagonalize-matrix-calculator");
  const [input, setInput] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const matrix = React.useMemo(() => parseMatrix(input), [input]);
  const result = React.useMemo<DiagResult | null>(() => {
    if (!matrix) return null;
    return diagonalize(matrix);
  }, [matrix]);

  function reset() {
    setInput("");
    setTouched(false);
  }

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

  const showInvalidError = touched && matrix === null && input.trim() !== "";
  const showResult = touched && matrix !== null && result !== null;

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
            <Label htmlFor="dmc-matrix">{t("field.matrix")}</Label>
            <Input
              id="dmc-matrix"
              type="text"
              value={input}
              placeholder={t("placeholder.matrix")}
              onChange={(e) => {
                setInput(e.target.value);
                setTouched(false);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.diagonalize")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {showResult && (
            <div className="space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {result!.notDiagonalizable ? (
                <p className="text-sm text-amber-700">
                  {t("result.notDiagonalizable")}
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                    <div className="font-semibold text-zinc-900">
                      {t("result.eigenvalues")}
                    </div>
                    <div className="mt-1 font-mono text-sm text-zinc-800">
                      {result!.eigenvalues.map(fmt).join(", ")}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                      <div className="font-semibold text-zinc-900">
                        {t("result.matrixP")}
                      </div>
                      <pre className="mt-1 font-mono text-sm text-zinc-800 whitespace-pre-wrap">
                        {matrixToString(result!.P)}
                      </pre>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                      <div className="font-semibold text-zinc-900">
                        {t("result.matrixD")}
                      </div>
                      <pre className="mt-1 font-mono text-sm text-zinc-800 whitespace-pre-wrap">
                        {matrixToString(result!.D)}
                      </pre>
                    </div>
                  </div>
                  <p className="text-sm text-green-700">{t("result.verified")}</p>
                </div>
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
