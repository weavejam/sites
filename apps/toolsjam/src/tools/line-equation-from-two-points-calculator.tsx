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

interface LineResult {
  slope: number | null; // null = vertical
  intercept: number | null;
  distance: number;
  slopeIntercept: string;
  pointSlope: string;
  standard: string;
  isHorizontal: boolean;
  isVertical: boolean;
}

function gcdInt(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

function formatNum(n: number): string {
  const r = Math.round(n * 1e10) / 1e10;
  return r.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function computeLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): LineResult | null {
  if (x1 === x2 && y1 === y2) return null;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (x1 === x2) {
    // Vertical line
    return {
      slope: null,
      intercept: null,
      distance,
      slopeIntercept: `x = ${formatNum(x1)}`,
      pointSlope: `x = ${formatNum(x1)}`,
      standard: `x = ${formatNum(x1)}`,
      isHorizontal: false,
      isVertical: true,
    };
  }

  const slope = dy / dx;

  if (y1 === y2) {
    // Horizontal line
    return {
      slope: 0,
      intercept: y1,
      distance,
      slopeIntercept: `y = ${formatNum(y1)}`,
      pointSlope: `y = ${formatNum(y1)}`,
      standard: `y = ${formatNum(y1)}`,
      isHorizontal: true,
      isVertical: false,
    };
  }

  const intercept = y1 - slope * x1;

  const bStr =
    intercept === 0
      ? ""
      : intercept > 0
      ? ` + ${formatNum(intercept)}`
      : ` − ${formatNum(Math.abs(intercept))}`;

  const mStr =
    slope === 1 ? "" : slope === -1 ? "-" : `${formatNum(slope)}`;

  const slopeIntercept =
    slope === 0
      ? `y = ${formatNum(intercept)}`
      : `y = ${mStr}x${bStr}`;

  const pointSlopeDy =
    y1 === 0 ? "y" : y1 > 0 ? `y − ${formatNum(y1)}` : `y + ${formatNum(Math.abs(y1))}`;
  const pointSlopeDx =
    x1 === 0 ? "x" : x1 > 0 ? `(x − ${formatNum(x1)})` : `(x + ${formatNum(Math.abs(x1))})`;
  const pointSlope = `${pointSlopeDy} = ${formatNum(slope)}${pointSlopeDx}`;

  // Standard form: Ax + By = C with integer coefficients when possible
  // Use rational approximation: slope = dy/dx (already exact if inputs are exact)
  // Multiply by dx to get integers: dy·x − dx·y = dy·x1 − dx·y1
  const rawA = dy;
  const rawB = -dx;
  const rawC = dy * x1 - dx * y1;
  const g = gcdInt(Math.abs(rawA), Math.abs(Math.abs(rawB)));
  const g2 = gcdInt(g, Math.abs(rawC));
  const sign = rawA < 0 ? -1 : 1;
  const A = (sign * rawA) / g2;
  const B = (sign * rawB) / g2;
  const C = (sign * rawC) / g2;

  const standard =
    B === 0
      ? `${formatNum(A)}x = ${formatNum(C)}`
      : B > 0
      ? `${formatNum(A)}x + ${formatNum(B)}y = ${formatNum(C)}`
      : `${formatNum(A)}x − ${formatNum(Math.abs(B))}y = ${formatNum(C)}`;

  return {
    slope,
    intercept,
    distance,
    slopeIntercept,
    pointSlope,
    standard,
    isHorizontal: false,
    isVertical: false,
  };
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function LineEquationFromTwoPointsCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.line-equation-from-two-points-calculator");
  const [x1, setX1] = React.useState("");
  const [y1, setY1] = React.useState("");
  const [x2, setX2] = React.useState("");
  const [y2, setY2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const x1n = parseFloat(x1);
  const y1n = parseFloat(y1);
  const x2n = parseFloat(x2);
  const y2n = parseFloat(y2);

  const allValid =
    x1 !== "" &&
    y1 !== "" &&
    x2 !== "" &&
    y2 !== "" &&
    Number.isFinite(x1n) &&
    Number.isFinite(y1n) &&
    Number.isFinite(x2n) &&
    Number.isFinite(y2n);

  const result = React.useMemo<LineResult | null>(() => {
    if (!allValid) return null;
    return computeLine(x1n, y1n, x2n, y2n);
  }, [allValid, x1n, y1n, x2n, y2n]);

  const isSamePoint = allValid && result === null;

  function reset() {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setTouched(false);
  }

  function mark() {
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

  const showInvalidError = touched && !allValid;
  const showSamePointError = touched && isSamePoint;

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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="font-medium text-zinc-700">{t("field.point1")}</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="leq-x1">{t("field.x1")}</Label>
                  <Input
                    id="leq-x1"
                    type="number"
                    inputMode="decimal"
                    value={x1}
                    placeholder={t("placeholder.x")}
                    onChange={(e) => { setX1(e.target.value); mark(); }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="leq-y1">{t("field.y1")}</Label>
                  <Input
                    id="leq-y1"
                    type="number"
                    inputMode="decimal"
                    value={y1}
                    placeholder={t("placeholder.y")}
                    onChange={(e) => { setY1(e.target.value); mark(); }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="font-medium text-zinc-700">{t("field.point2")}</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="leq-x2">{t("field.x2")}</Label>
                  <Input
                    id="leq-x2"
                    type="number"
                    inputMode="decimal"
                    value={x2}
                    placeholder={t("placeholder.x")}
                    onChange={(e) => { setX2(e.target.value); mark(); }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="leq-y2">{t("field.y2")}</Label>
                  <Input
                    id="leq-y2"
                    type="number"
                    inputMode="decimal"
                    value={y2}
                    placeholder={t("placeholder.y")}
                    onChange={(e) => { setY2(e.target.value); mark(); }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={mark}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showSamePointError && (
            <p className="text-sm text-red-600">{t("error.samePoint")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.slopeIntercept")}:
                  </span>{" "}
                  <code className="font-mono">{result.slopeIntercept}</code>
                </div>
                {!result.isVertical && !result.isHorizontal && (
                  <>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.pointSlope")}:
                      </span>{" "}
                      <code className="font-mono">{result.pointSlope}</code>
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.standard")}:
                      </span>{" "}
                      <code className="font-mono">{result.standard}</code>
                    </div>
                  </>
                )}
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.slope")}:
                  </span>{" "}
                  {result.isVertical
                    ? t("result.undefined")
                    : formatNum(result.slope!)}
                </div>
                {!result.isVertical && (
                  <div>
                    <span className="font-medium text-zinc-700">
                      {t("result.intercept")}:
                    </span>{" "}
                    {formatNum(result.intercept!)}
                  </div>
                )}
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.distance")}:
                  </span>{" "}
                  {formatNum(result.distance)}
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
