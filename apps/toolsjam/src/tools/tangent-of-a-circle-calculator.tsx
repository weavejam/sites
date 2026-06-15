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

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b > 1e-10) {
    [a, b] = [b, a % b];
  }
  return a;
}

interface TangentResult {
  generalForm: string;
  slopeInterceptForm: string | null;
  slope: number | null;
  yIntercept: number | null;
  isVertical: boolean;
  isHorizontal: boolean;
  verticalX?: number;
  horizontalY?: number;
  A: number;
  B: number;
  C: number;
}

function computeTangent(
  h: number,
  k: number,
  r: number,
  x1: number,
  y1: number
): TangentResult | null {
  const dx = x1 - h;
  const dy = y1 - k;
  const dist2 = dx * dx + dy * dy;
  const r2 = r * r;
  if (Math.abs(dist2 - r2) > 1e-6 * r2 + 1e-6) return null;

  // Tangent: dx*(x - x1) + dy*(y - y1) = 0
  // => dx*x + dy*y = dx*x1 + dy*y1 = dist2 = r2 (+ correction for offset circle)
  // Actually tangent at (x1,y1): (x1-h)(x-h)+(y1-k)(y-k)=r²
  // => dx*(x) + dy*(y) = r² + dx*h + dy*k
  const RHS = r2 + dx * h + dy * k;

  const A = dx;
  const B = dy;
  const C = -RHS;

  // General form: Ax + By + C = 0
  const isVertical = Math.abs(B) < 1e-10;
  const isHorizontal = Math.abs(A) < 1e-10;

  let generalForm = "";
  let slopeInterceptForm: string | null = null;
  let slope: number | null = null;
  let yIntercept: number | null = null;

  if (isVertical) {
    // x = x1
    generalForm = `x = ${formatNum(x1)}`;
    slopeInterceptForm = null;
  } else if (isHorizontal) {
    // y = y1
    generalForm = `y = ${formatNum(y1)}`;
    slope = 0;
    yIntercept = y1;
    slopeInterceptForm = `y = ${formatNum(y1)}`;
  } else {
    // slope = -A/B
    slope = -A / B;
    // y = slope*x - C/B
    yIntercept = -C / B;

    // Build general form with simplified integers when possible
    const scale = 1 / gcd(Math.abs(A), gcd(Math.abs(B), Math.abs(C)));
    const sa = A * scale;
    const sb = B * scale;
    const sc = C * scale;

    const formatCoeff = (c: number, varName: string, first: boolean): string => {
      if (Math.abs(c) < 1e-10) return "";
      const rounded = Math.round(c * 1e8) / 1e8;
      if (first) {
        if (rounded === 1) return varName;
        if (rounded === -1) return `-${varName}`;
        return `${formatNum(rounded)}${varName}`;
      }
      if (rounded === 1) return ` + ${varName}`;
      if (rounded === -1) return ` - ${varName}`;
      if (rounded > 0) return ` + ${formatNum(rounded)}${varName}`;
      return ` - ${formatNum(Math.abs(rounded))}${varName}`;
    };

    const constPart =
      Math.abs(sc) < 1e-10
        ? ""
        : sc > 0
        ? ` + ${formatNum(Math.round(sc * 1e8) / 1e8)}`
        : ` - ${formatNum(Math.round(Math.abs(sc) * 1e8) / 1e8)}`;
    generalForm = `${formatCoeff(sa, "x", true)}${formatCoeff(sb, "y", false)}${constPart} = 0`;
    slopeInterceptForm = `y = ${formatNum(slope)}x + ${formatNum(yIntercept)}`;
  }

  return {
    generalForm,
    slopeInterceptForm,
    slope,
    yIntercept,
    isVertical,
    isHorizontal,
    verticalX: isVertical ? x1 : undefined,
    horizontalY: isHorizontal ? y1 : undefined,
    A,
    B,
    C,
  };
}

export default function TangentOfACircleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.tangent-of-a-circle-calculator");

  const [h, setH] = React.useState("");
  const [k, setK] = React.useState("");
  const [r, setR] = React.useState("");
  const [x1, setX1] = React.useState("");
  const [y1, setY1] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const hNum = parseFloat(h);
  const kNum = parseFloat(k);
  const rNum = parseFloat(r);
  const x1Num = parseFloat(x1);
  const y1Num = parseFloat(y1);

  const allValid =
    h !== "" &&
    k !== "" &&
    r !== "" &&
    x1 !== "" &&
    y1 !== "" &&
    Number.isFinite(hNum) &&
    Number.isFinite(kNum) &&
    Number.isFinite(rNum) &&
    Number.isFinite(x1Num) &&
    Number.isFinite(y1Num);

  const radiusValid = allValid && rNum > 0;

  const result = React.useMemo<TangentResult | "pointNotOnCircle" | null>(() => {
    if (!radiusValid) return null;
    const res = computeTangent(hNum, kNum, rNum, x1Num, y1Num);
    if (res === null) return "pointNotOnCircle";
    return res;
  }, [radiusValid, hNum, kNum, rNum, x1Num, y1Num]);

  function reset() {
    setH("");
    setK("");
    setR("");
    setX1("");
    setY1("");
    setTouched(false);
  }

  function loadExample(
    hv: string,
    kv: string,
    rv: string,
    xv: string,
    yv: string
  ) {
    setH(hv);
    setK(kv);
    setR(rv);
    setX1(xv);
    setY1(yv);
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

  const showError = touched && !allValid;
  const showRadiusError = touched && allValid && !radiusValid;

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tac-h">{t("field.circleCenterX")}</Label>
              <Input
                id="tac-h"
                type="number"
                inputMode="decimal"
                value={h}
                placeholder={t("field.circleCenterXPlaceholder")}
                onChange={(e) => { setH(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tac-k">{t("field.circleCenterY")}</Label>
              <Input
                id="tac-k"
                type="number"
                inputMode="decimal"
                value={k}
                placeholder={t("field.circleCenterYPlaceholder")}
                onChange={(e) => { setK(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tac-r">{t("field.radius")}</Label>
              <Input
                id="tac-r"
                type="number"
                inputMode="decimal"
                value={r}
                placeholder={t("field.radiusPlaceholder")}
                onChange={(e) => { setR(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tac-x1">{t("field.pointX")}</Label>
              <Input
                id="tac-x1"
                type="number"
                inputMode="decimal"
                value={x1}
                placeholder={t("field.pointXPlaceholder")}
                onChange={(e) => { setX1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tac-y1">{t("field.pointY")}</Label>
              <Input
                id="tac-y1"
                type="number"
                inputMode="decimal"
                value={y1}
                placeholder={t("field.pointYPlaceholder")}
                onChange={(e) => { setY1(e.target.value); setTouched(true); }}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showRadiusError && (
            <p className="text-sm text-red-600">{t("error.radiusPositive")}</p>
          )}
          {result === "pointNotOnCircle" && (
            <p className="text-sm text-red-600">{t("error.pointNotOnCircle")}</p>
          )}

          {result && result !== "pointNotOnCircle" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.generalForm")}: </span>
                  <span className="font-semibold text-zinc-900">{result.generalForm}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.slopeInterceptForm")}: </span>
                  <span className="font-semibold text-zinc-900">
                    {result.slopeInterceptForm ?? t("result.notApplicable")}
                  </span>
                </div>
                {result.slope !== null && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.slope")}: </span>
                    <span className="font-medium text-zinc-800">{formatNum(result.slope)}</span>
                  </div>
                )}
                {result.yIntercept !== null && !result.isVertical && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.yIntercept")}: </span>
                    <span className="font-medium text-zinc-800">{formatNum(result.yIntercept)}</span>
                  </div>
                )}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0", "0", "5", "3", "4")}
          >
            {t("examples.loadExample1")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2", "-1", "10", "8", "7")}
          >
            {t("examples.loadExample2")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "1", "3", "1", "4")}
          >
            {t("examples.loadExample3")}
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
