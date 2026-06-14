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

function parseDataPoints(text: string): { x: number; y: number }[] | null {
  const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
  const points: { x: number; y: number }[] = [];
  for (const line of lines) {
    const parts = line.split(/[\s,;]+/).filter(Boolean);
    if (parts.length < 2) return null;
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    points.push({ x, y });
  }
  return points.length >= 2 ? points : null;
}

function gaussianElimination(A: number[][], b: number[]): number[] | null {
  const n = b.length;
  const aug = A.map((row, i) => [...row, b[i]]);

  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row;
    }
    [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
    if (Math.abs(aug[col][col]) < 1e-12) return null;

    for (let row = 0; row < n; row++) {
      if (row === col) continue;
      const factor = aug[row][col] / aug[col][col];
      for (let j = col; j <= n; j++) {
        aug[row][j] -= factor * aug[col][j];
      }
    }
  }

  return aug.map((row, i) => row[n] / row[i]);
}

function polynomialRegression(
  xs: number[],
  ys: number[],
  degree: number
): number[] | null {
  const n = xs.length;
  const d = degree + 1;
  const XtX: number[][] = Array.from({ length: d }, () =>
    new Array(d).fill(0)
  );
  const Xty: number[] = new Array(d).fill(0);

  for (let i = 0; i < n; i++) {
    const xPow: number[] = new Array(2 * d).fill(1);
    for (let j = 1; j < 2 * d; j++) xPow[j] = xPow[j - 1] * xs[i];

    for (let r = 0; r < d; r++) {
      for (let c = 0; c < d; c++) {
        XtX[r][c] += xPow[r + c];
      }
      Xty[r] += xPow[r] * ys[i];
    }
  }

  return gaussianElimination(XtX, Xty);
}

function evaluatePoly(coeffs: number[], x: number): number {
  return coeffs.reduce((sum, c, i) => sum + c * Math.pow(x, i), 0);
}

function computeR2(coeffs: number[], xs: number[], ys: number[]): number {
  const mean = ys.reduce((a, b) => a + b, 0) / ys.length;
  const ssTot = ys.reduce((s, y) => s + (y - mean) ** 2, 0);
  const ssRes = ys.reduce(
    (s, y, i) => s + (y - evaluatePoly(coeffs, xs[i])) ** 2,
    0
  );
  if (ssTot === 0) return 1;
  return Math.max(0, Math.min(1, 1 - ssRes / ssTot));
}

function formatCoeff(c: number, i: number, isFirst: boolean): string {
  const rounded = Math.round(c * 1e6) / 1e6;
  const sign = rounded >= 0 && !isFirst ? "+" : "";
  if (i === 0) return `${sign}${rounded}`;
  if (i === 1) return `${sign}${rounded}x`;
  return `${sign}${rounded}x^${i}`;
}

function buildEquation(coeffs: number[]): string {
  const parts = coeffs
    .map((c, i) => formatCoeff(c, i, i === 0))
    .reverse();
  return "y = " + parts.join(" ");
}

interface RegressionResult {
  coeffs: number[];
  r2: number;
  equation: string;
  predictedY: number | null;
}

export default function PolynomialRegressionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.polynomial-regression-calculator");

  const [dataText, setDataText] = React.useState("");
  const [degreeStr, setDegreeStr] = React.useState("2");
  const [predictXStr, setPredictXStr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const degree = Number(degreeStr);

  const result: RegressionResult | null = React.useMemo(() => {
    if (!touched) return null;
    const points = parseDataPoints(dataText);
    if (!points || !Number.isFinite(degree) || degree < 1 || !Number.isInteger(degree)) return null;
    if (points.length <= degree) return null;
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const coeffs = polynomialRegression(xs, ys, degree);
    if (!coeffs) return null;
    const r2 = computeR2(coeffs, xs, ys);
    const equation = buildEquation(coeffs);
    const predictedY =
      predictXStr !== "" && Number.isFinite(parseFloat(predictXStr))
        ? evaluatePoly(coeffs, parseFloat(predictXStr))
        : null;
    return { coeffs, r2, equation, predictedY };
  }, [touched, dataText, degree, predictXStr]);

  const parseError = React.useMemo(() => {
    if (!touched) return false;
    const points = parseDataPoints(dataText);
    if (!points) return true;
    if (!Number.isFinite(degree) || degree < 1 || !Number.isInteger(degree)) return true;
    if (points.length <= degree) return true;
    return false;
  }, [touched, dataText, degree]);

  function reset() {
    setDataText("");
    setDegreeStr("2");
    setPredictXStr("");
    setTouched(false);
  }

  function loadExample(data: string, deg: string) {
    setDataText(data);
    setDegreeStr(deg);
    setPredictXStr("");
    setTouched(true);
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
            <Label htmlFor="prc-data">{t("field.dataPoints")}</Label>
            <textarea
              id="prc-data"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px] font-mono"
              value={dataText}
              placeholder={t("placeholder.dataPoints")}
              onChange={(e) => {
                setDataText(e.target.value);
                setTouched(false);
              }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="prc-degree">{t("field.degree")}</Label>
              <Input
                id="prc-degree"
                type="number"
                inputMode="numeric"
                min="1"
                max="10"
                step="1"
                value={degreeStr}
                placeholder={t("placeholder.degree")}
                onChange={(e) => {
                  setDegreeStr(e.target.value);
                  setTouched(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prc-predict">{t("field.predictX")}</Label>
              <Input
                id="prc-predict"
                type="number"
                inputMode="decimal"
                step="any"
                value={predictXStr}
                placeholder={t("placeholder.predictX")}
                onChange={(e) => {
                  setPredictXStr(e.target.value);
                }}
              />
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

          {parseError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !parseError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="rounded border border-zinc-200 bg-white px-3 py-2">
                <div className="text-xs text-zinc-500">{t("result.equation")}</div>
                <div className="mt-1 font-mono font-semibold text-zinc-900">
                  {result.equation}
                </div>
              </div>
              <div className="rounded border border-zinc-200 bg-white px-3 py-2">
                <div className="text-xs text-zinc-500">{t("result.rSquared")}</div>
                <div className="mt-1 font-semibold text-zinc-900">
                  {(Math.round(result.r2 * 1e6) / 1e6).toLocaleString("en-US", {
                    maximumFractionDigits: 6,
                  })}
                </div>
              </div>
              {result.predictedY !== null && (
                <div className="rounded border border-zinc-200 bg-white px-3 py-2">
                  <div className="text-xs text-zinc-500">
                    {t("result.predictedY")}
                  </div>
                  <div className="mt-1 font-semibold text-zinc-900">
                    {(
                      Math.round(result.predictedY * 1e6) / 1e6
                    ).toLocaleString("en-US", { maximumFractionDigits: 6 })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <div className="text-sm font-medium text-zinc-500">
              {t("examples.quickLoad")}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("0,1\n1,2.5\n2,5\n3,8.5\n4,13", "2")
                }
              >
                {t("examples.loadQuadratic")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("-2,-10\n-1,0\n0,2\n1,4\n2,18", "3")
                }
              >
                {t("examples.loadCubic")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("1,2\n2,4.1\n3,5.9\n4,8.2\n5,10", "1")
                }
              >
                {t("examples.loadLinear")}
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
