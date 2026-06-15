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

type SystemSize = "2x2" | "3x3";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function parseMatrix(raw: string, rows: number, cols: number): number[][] | null {
  const rowParts = raw.trim().split(/\s*;\s*/);
  if (rowParts.length !== rows) return null;
  const matrix: number[][] = [];
  for (const row of rowParts) {
    const vals = row.trim().split(/\s*,\s*/);
    if (vals.length !== cols) return null;
    const nums = vals.map(Number);
    if (nums.some((n) => !Number.isFinite(n))) return null;
    matrix.push(nums);
  }
  return matrix;
}

function parseVector(raw: string, len: number): number[] | null {
  const parts = raw.trim().split(/\s*,\s*/);
  if (parts.length !== len) return null;
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

function det2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

function det3(m: number[][]): number {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

function replaceCol(matrix: number[][], col: number, b: number[]): number[][] {
  return matrix.map((row, i) =>
    row.map((val, j) => (j === col ? b[i] : val))
  );
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e8) / 1e8;
  return r.toString();
}

export default function CramersRuleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.cramers-rule-calculator");
  const [size, setSize] = React.useState<SystemSize>("2x2");
  const [matrixInput, setMatrixInput] = React.useState("");
  const [vectorInput, setVectorInput] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const dim = size === "2x2" ? 2 : 3;

  type SolveResult =
    | { kind: "ok"; D: number; Ds: number[]; solution: number[] }
    | { kind: "singular"; D: number }
    | { kind: "error" };

  const result = React.useMemo<SolveResult | null>(() => {
    if (!touched) return null;
    const A = parseMatrix(matrixInput, dim, dim);
    const b = parseVector(vectorInput, dim);
    if (!A || !b) return { kind: "error" };
    const D = dim === 2 ? det2(A) : det3(A);
    if (Math.abs(D) < 1e-12) return { kind: "singular", D };
    const Ds: number[] = [];
    const solution: number[] = [];
    for (let i = 0; i < dim; i++) {
      const Ai = replaceCol(A, i, b);
      const Di = dim === 2 ? det2(Ai) : det3(Ai);
      Ds.push(Di);
      solution.push(Di / D);
    }
    return { kind: "ok", D, Ds, solution };
  }, [touched, matrixInput, vectorInput, dim]);

  function loadExample(m: string, v: string, s: SystemSize) {
    setSize(s);
    setMatrixInput(m);
    setVectorInput(v);
    setTouched(true);
  }

  function reset() {
    setMatrixInput("");
    setVectorInput("");
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

  const varNames = dim === 2 ? ["x", "y"] : ["x", "y", "z"];

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
            <Label>{t("field.systemSize")}</Label>
            <div className="flex gap-2">
              {(["2x2", "3x3"] as SystemSize[]).map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={size === s ? "default" : "outline"}
                  onClick={() => {
                    setSize(s);
                    setTouched(false);
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cr-matrix">{t("field.matrix")}</Label>
            <Input
              id="cr-matrix"
              value={matrixInput}
              placeholder={
                size === "2x2"
                  ? t("placeholder.matrix2")
                  : t("placeholder.matrix3")
              }
              onChange={(e) => {
                setMatrixInput(e.target.value);
                setTouched(true);
              }}
            />
            <p className="text-xs text-zinc-500">{t("field.matrixHint")}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cr-vector">{t("field.vector")}</Label>
            <Input
              id="cr-vector"
              value={vectorInput}
              placeholder={
                size === "2x2"
                  ? t("placeholder.vector2")
                  : t("placeholder.vector3")
              }
              onChange={(e) => {
                setVectorInput(e.target.value);
                setTouched(true);
              }}
            />
            <p className="text-xs text-zinc-500">{t("field.vectorHint")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.solve")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result?.kind === "error" && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result?.kind === "singular" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-medium text-zinc-700">
                {t("error.singular")} (det(A) = {fmt(result.D)})
              </p>
            </div>
          )}

          {result?.kind === "ok" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {result.solution.map((val, i) => (
                  <div key={i} className="text-zinc-900">
                    <span className="font-semibold">{varNames[i]}</span> ={" "}
                    <span className="text-lg font-bold">{fmt(val)}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-zinc-500 space-y-1 pt-1">
                <div>det(A) = {fmt(result.D)}</div>
                {result.Ds.map((d, i) => (
                  <div key={i}>
                    D{varNames[i]} = {fmt(d)}
                  </div>
                ))}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2,3;1,-1", "13,0", "2x2")}
          >
            {t("examples.load2x2Simple")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2,1;1,3", "5,4", "2x2")}
          >
            {t("examples.load2x2Frac")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("1,2,3;2,1,2;3,2,1", "14,10,10", "3x3")
            }
          >
            {t("examples.load3x3")}
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
