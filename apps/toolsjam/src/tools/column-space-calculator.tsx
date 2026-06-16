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

const DIMENSIONS = [2, 3, 4] as const;

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function createMatrix(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""));
}

function createVector(rows: number): string[] {
  return Array.from({ length: rows }, () => "");
}

function resizeMatrix(matrix: string[][], rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => matrix[row]?.[col] ?? "")
  );
}

function resizeVector(vector: string[], rows: number): string[] {
  return Array.from({ length: rows }, (_, row) => vector[row] ?? "");
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function gaussianElimination(matrix: number[][]): {
  pivotCols: number[];
  rowEchelon: number[][];
} {
  const m = matrix.length;
  const n = matrix[0].length;
  const mat = matrix.map((row) => [...row]);
  const pivotCols: number[] = [];
  let row = 0;

  for (let col = 0; col < n && row < m; col += 1) {
    let pivotRow = -1;
    for (let r = row; r < m; r += 1) {
      if (Math.abs(mat[r][col]) > 1e-10) {
        pivotRow = r;
        break;
      }
    }
    if (pivotRow === -1) continue;

    [mat[row], mat[pivotRow]] = [mat[pivotRow], mat[row]];

    const pivot = mat[row][col];
    for (let r = 0; r < m; r += 1) {
      if (r !== row && Math.abs(mat[r][col]) > 1e-10) {
        const factor = mat[r][col] / pivot;
        for (let c = 0; c < n; c += 1) {
          mat[r][c] -= factor * mat[row][c];
          if (Math.abs(mat[r][c]) < 1e-10) mat[r][c] = 0;
        }
      }
    }

    pivotCols.push(col);
    row += 1;
  }

  return { pivotCols, rowEchelon: mat };
}

export default function ColumnSpaceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.column-space-calculator");
  const [rows, setRows] = React.useState(3);
  const [cols, setCols] = React.useState(3);
  const [matrix, setMatrix] = React.useState<string[][]>(() => createMatrix(3, 3));
  const [testVector, setTestVector] = React.useState<string[]>(() => createVector(3));
  const [touched, setTouched] = React.useState(false);

  const howtoSteps: string[] = React.useMemo(
    () => (t.raw("howto.steps") as string[] | undefined) ?? [],
    [t]
  );

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems: ExampleItem[] = React.useMemo(
    () => (t.raw("examples.items") as ExampleItem[] | undefined) ?? [],
    [t]
  );

  const result = React.useMemo(() => {
    if (!touched) return null;

    const validMatrix =
      matrix.length > 0 &&
      matrix.every((row) =>
        row.every((cell) => cell.trim() !== "" && Number.isFinite(Number(cell)))
      );

    if (!validMatrix) {
      return { error: "invalidMatrix" as const };
    }

    const numericMatrix = matrix.map((row) => row.map((cell) => Number(cell)));

    const vectorHasAnyValue = testVector.some((value) => value.trim() !== "");
    const vectorIsComplete = testVector.every(
      (value) => value.trim() !== "" && Number.isFinite(Number(value))
    );

    if (vectorHasAnyValue && !vectorIsComplete) {
      return { error: "invalidVector" as const };
    }

    const { pivotCols, rowEchelon } = gaussianElimination(numericMatrix);
    const basisVectors = pivotCols.map((col) => numericMatrix.map((row) => row[col]));
    const rank = pivotCols.length;

    let membership: boolean | null = null;
    let numericVector: number[] | null = null;

    if (vectorHasAnyValue && vectorIsComplete) {
      numericVector = testVector.map((value) => Number(value));
      const vec = numericVector;
      const augmented = numericMatrix.map((row, index) => [...row, vec[index]]);
      const augmentedRank = gaussianElimination(augmented).pivotCols.length;
      membership = augmentedRank === rank;
    }

    return {
      pivotCols,
      rowEchelon,
      basisVectors,
      rank,
      membership,
      numericVector,
    };
  }, [matrix, testVector, touched]);

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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  function reset() {
    setMatrix(createMatrix(rows, cols));
    setTestVector(createVector(rows));
    setTouched(false);
  }

  function updateRows(nextRows: number) {
    setRows(nextRows);
    setMatrix((current) => resizeMatrix(current, nextRows, cols));
    setTestVector((current) => resizeVector(current, nextRows));
    setTouched(false);
  }

  function updateCols(nextCols: number) {
    setCols(nextCols);
    setMatrix((current) => resizeMatrix(current, rows, nextCols));
    setTouched(false);
  }

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
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("field.rows")}</Label>
              <div className="flex flex-wrap gap-2">
                {DIMENSIONS.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={rows === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateRows(value)}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.columns")}</Label>
              <div className="flex flex-wrap gap-2">
                {DIMENSIONS.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={cols === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateCols(value)}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium text-zinc-700">{t("field.matrix")}</div>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {matrix.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className="space-y-2">
                    <Label htmlFor={`column-space-${rowIndex}-${colIndex}`}>
                      {t("field.matrixCell", {
                        row: rowIndex + 1,
                        col: colIndex + 1,
                      })}
                    </Label>
                    <Input
                      id={`column-space-${rowIndex}-${colIndex}`}
                      type="number"
                      inputMode="decimal"
                      step="any"
                      value={value}
                      placeholder={t("placeholder.number")}
                      onChange={(event) => {
                        const next = matrix.map((currentRow) => [...currentRow]);
                        next[rowIndex][colIndex] = event.target.value;
                        setMatrix(next);
                        setTouched(false);
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium text-zinc-700">{t("field.testVector")}</div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {testVector.map((value, rowIndex) => (
                <div key={rowIndex} className="space-y-2">
                  <Label htmlFor={`column-space-vector-${rowIndex}`}>
                    {t("field.vectorCell", { row: rowIndex + 1 })}
                  </Label>
                  <Input
                    id={`column-space-vector-${rowIndex}`}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={value}
                    placeholder={t("placeholder.optionalNumber")}
                    onChange={(event) => {
                      const next = [...testVector];
                      next[rowIndex] = event.target.value;
                      setTestVector(next);
                      setTouched(false);
                    }}
                  />
                </div>
              ))}
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

          {result && "error" in result && result.error === "invalidMatrix" && (
            <p className="text-sm text-red-600">{t("error.invalidMatrix")}</p>
          )}
          {result && "error" in result && result.error === "invalidVector" && (
            <p className="text-sm text-red-600">{t("error.invalidVector")}</p>
          )}

          {result && !("error" in result) && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-sm text-zinc-500">{t("result.rank")}</div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {result.rank}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-sm text-zinc-500">
                      {t("result.dimension")}
                    </div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {result.rank}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-sm text-zinc-500">
                      {t("result.pivotColumns")}
                    </div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {result.pivotCols.length > 0
                        ? result.pivotCols.map((col) => col + 1).join(", ")
                        : t("result.none")}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-zinc-700">
                  {t("result.basisVectors")}
                </div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {result.basisVectors.length > 0 ? (
                    result.basisVectors.map((vector, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-base">
                            {t("result.basisVector", {
                              index: index + 1,
                              column: result.pivotCols[index] + 1,
                            })}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="font-mono text-sm text-zinc-800">
                            [{vector.map((value) => formatNumber(value)).join(", ")}]
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
                      {t("result.zeroMatrix")}
                    </div>
                  )}
                </div>
              </div>

              {result.membership !== null && (
                <Card>
                  <CardContent className="space-y-2 pt-6">
                    <div className="text-sm text-zinc-500">
                      {t("result.vectorCheck")}
                    </div>
                    <div className="text-lg font-semibold text-zinc-900">
                      {result.membership
                        ? t("result.vectorInColumnSpace")
                        : t("result.vectorNotInColumnSpace")}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <div className="text-sm font-medium text-zinc-700">
                  {t("result.rowEchelon")}
                </div>
                <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 font-mono text-sm text-zinc-800">
                  {result.rowEchelon.map((row, index) => (
                    <div key={index}>
                      [{row.map((value) => formatNumber(value)).join(", ")}]
                    </div>
                  ))}
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
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
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
