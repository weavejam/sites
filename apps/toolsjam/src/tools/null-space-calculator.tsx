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

type MatrixSize = "2x2" | "2x3" | "3x3" | "3x4" | "4x4";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const SIZE_DIMS: Record<MatrixSize, [number, number]> = {
  "2x2": [2, 2],
  "2x3": [2, 3],
  "3x3": [3, 3],
  "3x4": [3, 4],
  "4x4": [4, 4],
};

const SIZES: MatrixSize[] = ["2x2", "2x3", "3x3", "3x4", "4x4"];

function formatNum(n: number): string {
  const rounded = Math.round(n * 1e9) / 1e9;
  if (Object.is(rounded, -0)) return "0";
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

/** Reduced Row Echelon Form (RREF) via Gauss-Jordan elimination.
 *  Returns the reduced matrix and the rank. */
function rref(matrix: number[][]): { reduced: number[][]; rank: number } {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const m: number[][] = matrix.map((row) => [...row]);
  let pivotRow = 0;
  let rank = 0;

  for (let col = 0; col < cols && pivotRow < rows; col++) {
    // Find pivot
    let maxRow = pivotRow;
    for (let r = pivotRow + 1; r < rows; r++) {
      if (Math.abs(m[r][col]) > Math.abs(m[maxRow][col])) maxRow = r;
    }
    if (Math.abs(m[maxRow][col]) < 1e-10) continue;

    [m[pivotRow], m[maxRow]] = [m[maxRow], m[pivotRow]];
    const scale = m[pivotRow][col];
    for (let j = col; j < cols; j++) m[pivotRow][j] /= scale;

    for (let r = 0; r < rows; r++) {
      if (r === pivotRow) continue;
      const factor = m[r][col];
      for (let j = col; j < cols; j++) m[r][j] -= factor * m[pivotRow][j];
    }
    pivotRow++;
    rank++;
  }
  return { reduced: m, rank };
}

/** Find null space basis vectors of matrix A (rows×cols). */
function nullSpace(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const { reduced, rank } = rref(matrix);

  if (rank === cols) return []; // trivial null space

  // Identify pivot columns
  const pivotCols: number[] = [];
  let pr = 0;
  for (let col = 0; col < cols && pr < rows; col++) {
    if (Math.abs(reduced[pr][col]) > 1e-10) {
      pivotCols.push(col);
      pr++;
    }
  }

  const freeCols = Array.from({ length: cols }, (_, i) => i).filter(
    (c) => !pivotCols.includes(c)
  );

  // For each free variable, construct a basis vector
  return freeCols.map((freeCol) => {
    const vec = new Array(cols).fill(0);
    vec[freeCol] = 1;
    for (let i = 0; i < pivotCols.length; i++) {
      const pc = pivotCols[i];
      vec[pc] = -(reduced[i][freeCol] ?? 0);
    }
    return vec;
  });
}

function makeEmptyMatrix(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () => new Array(cols).fill(""));
}

export default function NullSpaceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.null-space-calculator");
  const [size, setSize] = React.useState<MatrixSize>("2x3");
  const [cells, setCells] = React.useState<string[][]>(makeEmptyMatrix(2, 3));
  const [touched, setTouched] = React.useState(false);
  const skipResetRef = React.useRef(false);

  const [rows, cols] = SIZE_DIMS[size];

  React.useEffect(() => {
    if (skipResetRef.current) {
      skipResetRef.current = false;
      return;
    }
    setCells(makeEmptyMatrix(rows, cols));
    setTouched(false);
  }, [rows, cols]);

  function setCell(r: number, c: number, val: string) {
    setCells((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = val;
      return next;
    });
    setTouched(true);
  }

  const numMatrix = React.useMemo<number[][] | null>(() => {
    const m: number[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < cols; c++) {
        const v = parseFloat(cells[r]?.[c] ?? "");
        if (!Number.isFinite(v)) return null;
        row.push(v);
      }
      m.push(row);
    }
    return m;
  }, [cells, rows, cols]);

  const result = React.useMemo<{ basis: number[][]; rank: number } | null>(() => {
    if (!numMatrix) return null;
    const { rank } = rref(numMatrix);
    const basis = nullSpace(numMatrix);
    return { basis, rank };
  }, [numMatrix]);

  function reset() {
    setCells(makeEmptyMatrix(rows, cols));
    setTouched(false);
  }

  function loadExample(s: MatrixSize, data: number[][]) {
    const [nr, nc] = SIZE_DIMS[s];
    const next = makeEmptyMatrix(nr, nc);
    data.forEach((row, r) => row.forEach((v, c) => (next[r][c] = String(v))));
    skipResetRef.current = true;
    setSize(s);
    setCells(next);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        description: t("tagline"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const showError = touched && numMatrix === null;

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
            <Label>{t("field.size")}</Label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={size === s ? "default" : "outline"}
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.matrixLabel")}</Label>
            <div className="overflow-x-auto">
              <div className="inline-grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(72px, 1fr))` }}>
                {Array.from({ length: rows }, (_, r) =>
                  Array.from({ length: cols }, (_, c) => (
                    <Input
                      key={`${r}-${c}`}
                      type="number"
                      inputMode="decimal"
                      value={cells[r]?.[c] ?? ""}
                      placeholder="0"
                      aria-label={t("field.cell", { row: r + 1, col: c + 1 })}
                      className="w-full text-center"
                      onChange={(e) => setCell(r, c, e.target.value)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                loadExample("2x3", [
                  [1, 2, 3],
                  [4, 5, 6],
                ])
              }
            >
              {t("button.example1")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                loadExample("3x3", [
                  [1, 2, 3],
                  [2, 4, 6],
                  [1, 1, 2],
                ])
              }
            >
              {t("button.example2")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && numMatrix !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.rank")}: <span className="font-semibold">{result.rank}</span>
                {" · "}
                {t("result.nullity")}: <span className="font-semibold">{cols - result.rank}</span>
              </div>
              {result.basis.length === 0 ? (
                <div className="text-zinc-700">{t("result.trivial")}</div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-zinc-600">{t("result.basisLabel")}</div>
                  {result.basis.map((vec, i) => (
                    <div key={i} className="font-mono text-zinc-900">
                      v{i + 1} = [{vec.map(formatNum).join(", ")}]
                    </div>
                  ))}
                </div>
              )}
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
          {howtoSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
