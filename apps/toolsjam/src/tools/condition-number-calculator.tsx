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

type Size = 2 | 3;
type NormKey = "norm1" | "normInf" | "normFro";

const SIZES: Size[] = [2, 3];
const NORMS: NormKey[] = ["norm1", "normInf", "normFro"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "∞";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 1e-4 || abs >= 1e8)) return n.toExponential(4);
  const rounded = Math.round(n * 1e6) / 1e6;
  return rounded.toString();
}

function norm(A: number[][], kind: NormKey): number {
  const n = A.length;
  if (kind === "normFro") {
    let s = 0;
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) s += A[i][j] * A[i][j];
    return Math.sqrt(s);
  }
  let best = 0;
  if (kind === "norm1") {
    for (let j = 0; j < n; j++) {
      let s = 0;
      for (let i = 0; i < n; i++) s += Math.abs(A[i][j]);
      if (s > best) best = s;
    }
  } else {
    for (let i = 0; i < n; i++) {
      let s = 0;
      for (let j = 0; j < n; j++) s += Math.abs(A[i][j]);
      if (s > best) best = s;
    }
  }
  return best;
}

function det2(A: number[][]): number {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}
function inv2(A: number[][]): number[][] | null {
  const d = det2(A);
  if (Math.abs(d) < 1e-10) return null;
  return [
    [A[1][1] / d, -A[0][1] / d],
    [-A[1][0] / d, A[0][0] / d],
  ];
}
function det3(A: number[][]): number {
  return (
    A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
    A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
    A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0])
  );
}
function inv3(A: number[][]): number[][] | null {
  const d = det3(A);
  if (Math.abs(d) < 1e-10) return null;
  const c = (i: number, j: number) => {
    const m: number[][] = [];
    for (let r = 0; r < 3; r++) {
      if (r === i) continue;
      const row: number[] = [];
      for (let s = 0; s < 3; s++) {
        if (s === j) continue;
        row.push(A[r][s]);
      }
      m.push(row);
    }
    return ((i + j) % 2 === 0 ? 1 : -1) * (m[0][0] * m[1][1] - m[0][1] * m[1][0]);
  };
  const adj: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) adj[j][i] = c(i, j) / d;
  return adj;
}

export default function ConditionNumberCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.condition-number-calculator");
  const [size, setSize] = React.useState<Size>(2);
  const [normKind, setNormKind] = React.useState<NormKey>("norm1");
  const [cells, setCells] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState(false);

  function cellKey(i: number, j: number) {
    return `c${i}_${j}`;
  }
  function setCell(i: number, j: number, v: string) {
    setCells((prev) => ({ ...prev, [cellKey(i, j)]: v }));
    setTouched(true);
  }

  const parsed = React.useMemo<{ A: number[][]; ok: boolean }>(() => {
    const A: number[][] = [];
    let ok = true;
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        const v = cells[cellKey(i, j)] ?? "";
        const n = parseFloat(v);
        if (v === "" || !Number.isFinite(n)) {
          ok = false;
          row.push(0);
        } else {
          row.push(n);
        }
      }
      A.push(row);
    }
    return { A, ok };
  }, [cells, size]);

  const result = React.useMemo(() => {
    if (!parsed.ok) return null;
    const A = parsed.A;
    const det = size === 2 ? det2(A) : det3(A);
    const inv = size === 2 ? inv2(A) : inv3(A);
    if (!inv) {
      return { singular: true, det, normA: norm(A, normKind), kappa: Infinity, normInv: Infinity };
    }
    const normA = norm(A, normKind);
    const normInv = norm(inv, normKind);
    return { singular: false, det, normA, normInv, kappa: normA * normInv };
  }, [parsed, size, normKind]);

  function reset() {
    setCells({});
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

  const showError = touched && !parsed.ok;
  const showSingular = touched && parsed.ok && result?.singular === true;

  let interpretKey: "interpretWell" | "interpretModerate" | "interpretIll" =
    "interpretWell";
  if (result && !result.singular) {
    if (result.kappa > 1000) interpretKey = "interpretIll";
    else if (result.kappa >= 100) interpretKey = "interpretModerate";
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
          <div className="space-y-2">
            <Label>{t("field.size")}</Label>
            <div className="flex flex-wrap gap-2">
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
                  {t(`type.size${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.norm")}</Label>
            <div className="flex flex-wrap gap-2">
              {NORMS.map((nk) => (
                <Button
                  key={nk}
                  type="button"
                  variant={normKind === nk ? "default" : "outline"}
                  onClick={() => {
                    setNormKind(nk);
                    setTouched(false);
                  }}
                >
                  {t(`type.${nk}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.matrix")}</Label>
            <div className="inline-block rounded border border-zinc-200 p-2">
              {Array.from({ length: size }).map((_, i) => (
                <div key={i} className="flex gap-2 mb-2 last:mb-0">
                  {Array.from({ length: size }).map((__, j) => (
                    <div key={j} className="w-20">
                      <Input
                        aria-label={t(`field.cell${i + 1}${j + 1}` as never)}
                        type="number"
                        inputMode="decimal"
                        value={cells[cellKey(i, j)] ?? ""}
                        placeholder={t("placeholder.number")}
                        onChange={(e) => setCell(i, j, e.target.value)}
                      />
                    </div>
                  ))}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showSingular && (
            <p className="text-sm text-red-600">{t("error.singular")}</p>
          )}

          {result && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.kappa", { value: formatNumber(result.kappa) })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.normA", { value: formatNumber(result.normA) })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.normInv", { value: formatNumber(result.normInv) })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.det", { value: formatNumber(result.det) })}
              </div>
              {!result.singular && (
                <div className="text-sm text-zinc-600">
                  {t(`result.${interpretKey}` as never)}
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
