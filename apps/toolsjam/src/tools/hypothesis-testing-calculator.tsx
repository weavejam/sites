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

type TestType = "zTestMean" | "tTestMean" | "zTestProportion";
type TailType = "twoTailed" | "leftTailed" | "rightTailed";

interface HypothesisResult {
  statistic: number;
  pValue: number;
  criticalValue: number;
  df?: number;
  reject: boolean;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const p =
    t *
    (0.254829592 +
      t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const r = 1 - p * Math.exp(-x * x);
  return x >= 0 ? r : -r;
}

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function invNormalCDF(p: number): number {
  let lo = -10, hi = 10;
  for (let i = 0; i < 64; i++) {
    const mid = (lo + hi) / 2;
    if (normalCDF(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// Regularized incomplete beta function via continued fraction (Lentz's method)
function betacf(a: number, b: number, x: number): number {
  const MAXIT = 200;
  const EPS = 3e-7;
  const FPMIN = 1e-30;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1.0;
  let d = 1.0 - qab * x / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1.0 / d;
  let h = d;
  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1.0 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1.0 / d;
    h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1.0 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1.0 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1.0) < EPS) break;
  }
  return h;
}

function betai(a: number, b: number, x: number): number {
  if (x < 0 || x > 1) return NaN;
  if (x === 0) return 0;
  if (x === 1) return 1;
  const lbeta = lgamma(a) + lgamma(b) - lgamma(a + b);
  const front = Math.exp(a * Math.log(x) + b * Math.log(1 - x) - lbeta) / a;
  if (x < (a + 1) / (a + b + 2)) return front * betacf(a, b, x);
  return 1 - (Math.exp(b * Math.log(1 - x) + a * Math.log(x) - lbeta) / b) * betacf(b, a, 1 - x);
}

function lgamma(x: number): number {
  const c = [
    76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5,
  ];
  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += c[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

function tDistCDF(t: number, df: number): number {
  const x = df / (df + t * t);
  const p = 0.5 * betai(df / 2, 0.5, x);
  return t >= 0 ? 1 - p : p;
}

function invTDistCDF(p: number, df: number): number {
  let lo = 0, hi = 100;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (tDistCDF(mid, df) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function compute(
  testType: TestType,
  tail: TailType,
  nullValue: number,
  alpha: number,
  n: number,
  sampleMean: number,
  param: number // sigma for zTestMean, s for tTestMean, sampleProportion for zTestProportion
): HypothesisResult | null {
  if (!Number.isFinite(nullValue) || !Number.isFinite(alpha) || !Number.isFinite(n) || n < 2) return null;
  if (!Number.isFinite(param) || param < 0) return null;

  if (testType === "zTestMean") {
    if (param <= 0 || !Number.isFinite(sampleMean)) return null;
    const se = param / Math.sqrt(n);
    const Z = (sampleMean - nullValue) / se;
    let pValue: number;
    if (tail === "twoTailed") pValue = 2 * (1 - normalCDF(Math.abs(Z)));
    else if (tail === "rightTailed") pValue = 1 - normalCDF(Z);
    else pValue = normalCDF(Z);
    let criticalValue: number;
    if (tail === "twoTailed") criticalValue = invNormalCDF(1 - alpha / 2);
    else if (tail === "rightTailed") criticalValue = invNormalCDF(1 - alpha);
    else criticalValue = invNormalCDF(alpha);
    return { statistic: Z, pValue, criticalValue, reject: pValue < alpha };
  }

  if (testType === "tTestMean") {
    if (param <= 0 || !Number.isFinite(sampleMean)) return null;
    const df = n - 1;
    const se = param / Math.sqrt(n);
    const T = (sampleMean - nullValue) / se;
    let pValue: number;
    if (tail === "twoTailed") pValue = 2 * (1 - tDistCDF(Math.abs(T), df));
    else if (tail === "rightTailed") pValue = 1 - tDistCDF(T, df);
    else pValue = tDistCDF(T, df);
    let criticalValue: number;
    if (tail === "twoTailed") criticalValue = invTDistCDF(1 - alpha / 2, df);
    else if (tail === "rightTailed") criticalValue = invTDistCDF(1 - alpha, df);
    else criticalValue = -invTDistCDF(1 - alpha, df);
    return { statistic: T, pValue, criticalValue, df, reject: pValue < alpha };
  }

  // zTestProportion
  if (nullValue <= 0 || nullValue >= 1) return null;
  if (param < 0 || param > 1) return null;
  const se = Math.sqrt(nullValue * (1 - nullValue) / n);
  const Z = (param - nullValue) / se;
  let pValue: number;
  if (tail === "twoTailed") pValue = 2 * (1 - normalCDF(Math.abs(Z)));
  else if (tail === "rightTailed") pValue = 1 - normalCDF(Z);
  else pValue = normalCDF(Z);
  let criticalValue: number;
  if (tail === "twoTailed") criticalValue = invNormalCDF(1 - alpha / 2);
  else if (tail === "rightTailed") criticalValue = invNormalCDF(1 - alpha);
  else criticalValue = invNormalCDF(alpha);
  return { statistic: Z, pValue, criticalValue, reject: pValue < alpha };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function HypothesisTestingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.hypothesis-testing-calculator");

  const [testType, setTestType] = React.useState<TestType>("zTestMean");
  const [tail, setTail] = React.useState<TailType>("twoTailed");
  const [nullValue, setNullValue] = React.useState("");
  const [alpha, setAlpha] = React.useState("0.05");
  const [n, setN] = React.useState("");
  const [sampleMean, setSampleMean] = React.useState("");
  const [param, setParam] = React.useState(""); // sigma / s / phat
  const [touched, setTouched] = React.useState(false);

  const TEST_TYPES: TestType[] = ["zTestMean", "tTestMean", "zTestProportion"];
  const TAIL_TYPES: TailType[] = ["twoTailed", "leftTailed", "rightTailed"];

  const result = React.useMemo<HypothesisResult | null>(() => {
    if (!touched) return null;
    return compute(
      testType,
      tail,
      parseFloat(nullValue),
      parseFloat(alpha),
      parseFloat(n),
      parseFloat(sampleMean),
      parseFloat(param)
    );
  }, [touched, testType, tail, nullValue, alpha, n, sampleMean, param]);

  function reset() {
    setNullValue("");
    setAlpha("0.05");
    setN("");
    setSampleMean("");
    setParam("");
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

  const faqItems: FaqItem[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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

  const paramLabel = React.useMemo(() => {
    if (testType === "zTestMean") return t("field.sigma");
    if (testType === "tTestMean") return t("field.sampleStdDev");
    return t("field.sampleProportion");
  }, [testType, t]);

  const showSampleMean = testType !== "zTestProportion";

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
        <p className="text-sm text-zinc-500">{t("intro")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test type */}
          <div className="space-y-2">
            <Label>{t("field.testType")}</Label>
            <div className="flex flex-wrap gap-2">
              {TEST_TYPES.map((tt) => (
                <Button
                  key={tt}
                  type="button"
                  variant={testType === tt ? "default" : "outline"}
                  onClick={() => { setTestType(tt); setTouched(false); }}
                >
                  {t(`type.${tt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {/* Alternative hypothesis / tail type */}
          <div className="space-y-2">
            <Label>{t("field.alternative")}</Label>
            <div className="flex flex-wrap gap-2">
              {TAIL_TYPES.map((tt) => (
                <Button
                  key={tt}
                  type="button"
                  variant={tail === tt ? "default" : "outline"}
                  onClick={() => { setTail(tt); setTouched(false); }}
                >
                  {t(`tail.${tt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="htc-null">{t("field.nullValue")}</Label>
              <Input
                id="htc-null"
                type="number"
                inputMode="decimal"
                value={nullValue}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setNullValue(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="htc-alpha">{t("field.alpha")}</Label>
              <Input
                id="htc-alpha"
                type="number"
                inputMode="decimal"
                value={alpha}
                placeholder="0.05"
                onChange={(e) => { setAlpha(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="htc-n">{t("field.sampleSize")}</Label>
              <Input
                id="htc-n"
                type="number"
                inputMode="numeric"
                value={n}
                placeholder={t("placeholder.integer")}
                onChange={(e) => { setN(e.target.value); setTouched(true); }}
              />
            </div>
            {showSampleMean && (
              <div className="space-y-2">
                <Label htmlFor="htc-mean">{t("field.sampleMean")}</Label>
                <Input
                  id="htc-mean"
                  type="number"
                  inputMode="decimal"
                  value={sampleMean}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setSampleMean(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="htc-param">{paramLabel}</Label>
              <Input
                id="htc-param"
                type="number"
                inputMode="decimal"
                value={param}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setParam(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-zinc-600">{t("result.statistic")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.statistic)}</div>
                {result.df !== undefined && (
                  <>
                    <div className="text-zinc-600">{t("result.df")}</div>
                    <div className="font-semibold text-zinc-900">{result.df}</div>
                  </>
                )}
                <div className="text-zinc-600">{t("result.pValue")}</div>
                <div className="font-semibold text-zinc-900">{fmt(result.pValue, 6)}</div>
                <div className="text-zinc-600">{t("result.criticalValue")}</div>
                <div className="font-semibold text-zinc-900">
                  {tail === "twoTailed" ? `±${fmt(result.criticalValue)}` : fmt(result.criticalValue)}
                </div>
              </div>
              <div
                className={`mt-2 text-sm font-semibold ${result.reject ? "text-red-600" : "text-green-600"}`}
              >
                {result.reject ? t("result.reject") : t("result.failReject")}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
