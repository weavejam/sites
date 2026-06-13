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

type Matrix = number[][];

function gaussJordan(augmented: Matrix): { rref: Matrix; solution: string } {
  const m = augmented.map((row) => [...row]);
  const rows = m.length;
  const cols = m[0].length;
  let pivotRow = 0;

  for (let col = 0; col < cols - 1 && pivotRow < rows; col++) {
    // Find pivot
    let maxRow = pivotRow;
    for (let r = pivotRow + 1; r < rows; r++) {
      if (Math.abs(m[r][col]) > Math.abs(m[maxRow][col])) maxRow = r;
    }
    if (Math.abs(m[maxRow][col]) < 1e-12) continue;

    [m[pivotRow], m[maxRow]] = [m[maxRow], m[pivotRow]];

    const scale = m[pivotRow][col];
    for (let c = 0; c < cols; c++) m[pivotRow][c] /= scale;

    for (let r = 0; r < rows; r++) {
      if (r === pivotRow) continue;
      const factor = m[r][col];
      for (let c = 0; c < cols; c++) {
        m[r][c] -= factor * m[pivotRow][c];
      }
    }
    pivotRow++;
  }

  // Determine solution type
  const numVars = cols - 1;
  let inconsistent = false;
  let numPivots = 0;

  for (let r = 0; r < rows; r++) {
    const rowAllZero = m[r].slice(0, numVars).every((v) => Math.abs(v) < 1e-10);
    const rhs = m[r][numVars];
    if (rowAllZero && Math.abs(rhs) > 1e-10) {
      inconsistent = true;
      break;
    }
    if (!rowAllZero) numPivots++;
  }

  const infiniteSolutions = !inconsistent && numPivots < numVars;

  let solutionStr = "";
  if (inconsistent) {
    solutionStr = "no_solution";
  } else if (infiniteSolutions) {
    solutionStr = "infinite_solutions";
  } else {
    const values: string[] = [];
    for (let r = 0; r < numVars; r++) {
      const val = m[r] ? m[r][numVars] : 0;
      const rounded = Math.round(val * 1e8) / 1e8;
      values.push(`x${r + 1} = ${rounded}`);
    }
    solutionStr = values.join(", ");
  }

  return { rref: m, solution: solutionStr };
}

function formatCell(v: number): string {
  if (Math.abs(v) < 1e-10) return "0";
  const r = Math.round(v * 1e8) / 1e8;
  return r.toString();
}

const SIZES = [2, 3, 4];

export default function GaussJordanEliminationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.gauss-jordan-elimination-calculator");
  const [rows, setRows] = React.useState(2);
  const [cols, setCols] = React.useState(2);
  // matrix[row][col], augmented (cols+1 entries)
  const [matrix, setMatrix] = React.useState<string[][]>(() =>
    Array.from({ length: 2 }, () => Array(3).fill(""))
  );
  const [result, setResult] = React.useState<{ rref: Matrix; solution: string } | null>(null);
  const [error, setError] = React.useState<string>("");

  function resizeMatrix(newRows: number, newCols: number) {
    setMatrix((prev) =>
      Array.from({ length: newRows }, (_, r) =>
        Array.from({ length: newCols + 1 }, (_, c) => (prev[r] && prev[r][c] !== undefined ? prev[r][c] : ""))
      )
    );
    setResult(null);
    setError("");
  }

  function handleCell(r: number, c: number, val: string) {
    setMatrix((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = val;
      return next;
    });
    setResult(null);
  }

  function calculate() {
    const augmented: Matrix = [];
    for (let r = 0; r < rows; r++) {
      const row: number[] = [];
      for (let c = 0; c <= cols; c++) {
        const v = parseFloat(matrix[r]?.[c] ?? "");
        if (!Number.isFinite(v)) {
          setError(t("error.invalid"));
          return;
        }
        row.push(v);
      }
      augmented.push(row);
    }
    setError("");
    setResult(gaussJordan(augmented));
  }

  function reset() {
    setMatrix(Array.from({ length: rows }, () => Array(cols + 1).fill("")));
    setResult(null);
    setError("");
  }

  function loadExample(vals: string[][], r: number, c: number) {
    setRows(r);
    setCols(c);
    setMatrix(vals.map((row) => [...row]));
    setResult(null);
    setError("");
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  const solutionDisplay = React.useMemo(() => {
    if (!result) return null;
    if (result.solution === "no_solution") return t("result.noSolution");
    if (result.solution === "infinite_solutions") return t("result.infiniteSolutions");
    return result.solution;
  }, [result, t]);

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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("field.rows")}</Label>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <Button
                    key={s}
                    type="button"
                    variant={rows === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setRows(s);
                      resizeMatrix(s, cols);
                    }}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.cols")}</Label>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <Button
                    key={s}
                    type="button"
                    variant={cols === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setCols(s);
                      resizeMatrix(rows, s);
                    }}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.matrix")}</Label>
            <p className="text-xs text-zinc-500">{t("field.matrixHint")}</p>
            <div className="overflow-x-auto">
              <table className="border-collapse">
                <thead>
                  <tr>
                    {Array.from({ length: cols }, (_, c) => (
                      <th key={c} className="px-1 py-1 text-xs text-zinc-500 font-medium">
                        x{c + 1}
                      </th>
                    ))}
                    <th className="px-1 py-1 text-xs text-zinc-500 font-medium">|</th>
                    <th className="px-1 py-1 text-xs text-zinc-500 font-medium">b</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: rows }, (_, r) => (
                    <tr key={r}>
                      {Array.from({ length: cols + 1 }, (_, c) => (
                        <td key={c} className={`px-1 py-1 ${c === cols ? "pl-3" : ""}`}>
                          {c === cols && <span className="mr-1 text-zinc-400">|</span>}
                          <Input
                            type="number"
                            inputMode="decimal"
                            className="h-8 w-16 text-sm"
                            value={matrix[r]?.[c] ?? ""}
                            placeholder="0"
                            onChange={(e) => handleCell(r, c, e.target.value)}
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
              {t("button.solve")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                loadExample(
                  [["2", "1", "5"], ["4", "3", "11"]],
                  2, 2
                )
              }
            >
              {t("button.example2x2")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                loadExample(
                  [["2", "1", "1", "8"], ["1", "3", "-1", "10"], ["1", "1", "2", "7"]],
                  3, 3
                )
              }
            >
              {t("button.example3x3")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {result && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500">
                  {t("result.solution")}
                </div>
                <div className="mt-1 text-xl font-semibold text-zinc-900">
                  {solutionDisplay}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-500 mb-2">
                  {t("result.rref")}
                </div>
                <div className="overflow-x-auto">
                  <table className="border-collapse text-sm">
                    <tbody>
                      {result.rref.map((row, r) => (
                        <tr key={r}>
                          {row.map((v, c) => (
                            <td
                              key={c}
                              className={`border border-zinc-200 px-3 py-1 text-center font-mono ${c === row.length - 1 ? "border-l-2 border-l-zinc-400" : ""}`}
                            >
                              {formatCell(v)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
