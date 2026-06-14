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

// ── math helpers ──────────────────────────────────────────────────────────

function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const p =
    t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const r = 1 - p * Math.exp(-x * x);
  return x >= 0 ? r : -r;
}

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function lgamma(x: number): number {
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  let a = c[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

function betaCF(x: number, a: number, b: number): number {
  const maxIter = 200, eps = 3e-10, fpmin = 1e-300;
  const qab = a + b, qap = a + 1, qam = a - 1;
  let c = 1.0, d = 1.0 - qab * x / qap;
  if (Math.abs(d) < fpmin) d = fpmin;
  d = 1.0 / d; let h = d;
  for (let m = 1; m <= maxIter; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1.0 + aa * d; if (Math.abs(d) < fpmin) d = fpmin;
    c = 1.0 + aa / c; if (Math.abs(c) < fpmin) c = fpmin;
    d = 1.0 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1.0 + aa * d; if (Math.abs(d) < fpmin) d = fpmin;
    c = 1.0 + aa / c; if (Math.abs(c) < fpmin) c = fpmin;
    d = 1.0 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1.0) <= eps) break;
  }
  return h;
}

function betaInc(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const lbeta = lgamma(a) + lgamma(b) - lgamma(a + b);
  const front = Math.exp(a * Math.log(x) + b * Math.log(1 - x) - lbeta);
  if (x < (a + 1) / (a + b + 2)) return front * betaCF(x, a, b) / a;
  return 1 - front * betaCF(1 - x, b, a) / b;
}

function gammaInc(a: number, x: number): number {
  if (x <= 0) return 0;
  if (x < a + 1) {
    let ap = a, del = 1 / a, sum = del;
    for (let n = 1; n < 200; n++) {
      ap++; del *= x / ap; sum += del;
      if (Math.abs(del) < Math.abs(sum) * 3e-10) break;
    }
    return sum * Math.exp(-x + a * Math.log(x) - lgamma(a));
  }
  let b = x + 1 - a, c = 1e300, d = 1 / b, h = d;
  for (let i = 1; i <= 200; i++) {
    const an = -i * (i - a); b += 2;
    d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300;
    c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1) < 3e-10) break;
  }
  return 1 - Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
}

function tCDF(t: number, df: number): number {
  const x = df / (df + t * t);
  const ib = betaInc(x, df / 2, 0.5);
  return t < 0 ? 0.5 * ib : 1 - 0.5 * ib;
}

function fCDF(x: number, d1: number, d2: number): number {
  if (x <= 0) return 0;
  return betaInc((d1 * x) / (d1 * x + d2), d1 / 2, d2 / 2);
}

function chiSqCDF(x: number, k: number): number {
  if (x <= 0) return 0;
  return gammaInc(k / 2, x / 2);
}

function calcPValue(
  testType: string, tail: string, stat: number, df1: number, df2: number
): number | null {
  if (!Number.isFinite(stat)) return null;
  if (testType === "z-test") {
    const z = stat;
    if (tail === "two-tailed") return Math.min(2 * (1 - normalCDF(Math.abs(z))), 1);
    if (tail === "right-tailed") return 1 - normalCDF(z);
    return normalCDF(z);
  }
  if (testType === "t-test") {
    if (!Number.isFinite(df1) || df1 < 1) return null;
    const cdf = tCDF(stat, df1);
    if (tail === "two-tailed") return Math.min(2 * Math.min(cdf, 1 - cdf), 1);
    if (tail === "right-tailed") return 1 - cdf;
    return cdf;
  }
  if (testType === "f-test") {
    if (!Number.isFinite(df1) || df1 < 1 || !Number.isFinite(df2) || df2 < 1 || stat < 0) return null;
    const p = 1 - fCDF(stat, df1, df2);
    if (tail === "two-tailed") return Math.min(2 * Math.min(p, 1 - p), 1);
    if (tail === "right-tailed") return p;
    return 1 - p;
  }
  if (testType === "chi-square") {
    if (!Number.isFinite(df1) || df1 < 1 || stat < 0) return null;
    const p = 1 - chiSqCDF(stat, df1);
    if (tail === "two-tailed") return Math.min(2 * Math.min(p, 1 - p), 1);
    if (tail === "right-tailed") return p;
    return 1 - p;
  }
  return null;
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
}

const TEST_TYPES = ["z-test", "t-test", "f-test", "chi-square"];
const TAIL_TYPES = ["two-tailed", "right-tailed", "left-tailed"];
const ALPHA_OPTIONS = ["0.01", "0.05", "0.10"];

export default function PValueCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.p-value-calculator");
  const [testType, setTestType] = React.useState("z-test");
  const [tail, setTail] = React.useState("two-tailed");
  const [statStr, setStatStr] = React.useState("");
  const [alpha, setAlpha] = React.useState("0.05");
  const [df1Str, setDf1Str] = React.useState("");
  const [df2Str, setDf2Str] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const needsDf1 = testType !== "z-test";
  const needsDf2 = testType === "f-test";

  const stat = parseFloat(statStr);
  const df1 = parseFloat(df1Str);
  const df2 = parseFloat(df2Str);
  const alphaNum = parseFloat(alpha);

  const valid = React.useMemo(() => {
    if (statStr === "" || !Number.isFinite(stat)) return false;
    if (needsDf1 && (df1Str === "" || !Number.isFinite(df1) || df1 < 1)) return false;
    if (needsDf2 && (df2Str === "" || !Number.isFinite(df2) || df2 < 1)) return false;
    if (testType === "f-test" || testType === "chi-square") if (stat < 0) return false;
    return true;
  }, [statStr, df1Str, df2Str, stat, df1, df2, needsDf1, needsDf2, testType]);

  const pValue = React.useMemo(() => {
    if (!valid) return null;
    return calcPValue(testType, tail, stat, df1, df2);
  }, [valid, testType, tail, stat, df1, df2]);

  function loadExample(tt: string, tl: string, s: string, a: string, d1: string, d2: string) {
    setTestType(tt); setTail(tl); setStatStr(s);
    setAlpha(a); setDf1Str(d1); setDf2Str(d2);
    setTouched(true);
  }

  function reset() {
    setStatStr(""); setDf1Str(""); setDf2Str("");
    setAlpha("0.05"); setTestType("z-test"); setTail("two-tailed");
    setTouched(false);
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
      } catch { break; }
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

  const showError = touched && !valid;

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pvc-testtype">{t("field.testType")}</Label>
              <select
                id="pvc-testtype" value={testType}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                onChange={(e) => { setTestType(e.target.value); setDf1Str(""); setDf2Str(""); setTouched(false); }}
              >
                {TEST_TYPES.map((v) => (
                  <option key={v} value={v}>{t(`type.${v}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pvc-tail">{t("field.tailType")}</Label>
              <select
                id="pvc-tail" value={tail}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                onChange={(e) => { setTail(e.target.value); setTouched(false); }}
              >
                {TAIL_TYPES.map((v) => (
                  <option key={v} value={v}>{t(`tail.${v}` as never)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pvc-stat">{t("field.stat")}</Label>
              <Input
                id="pvc-stat" type="number" inputMode="decimal"
                value={statStr} placeholder={t("placeholder.stat")}
                onChange={(e) => { setStatStr(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pvc-alpha">{t("field.alpha")}</Label>
              <select
                id="pvc-alpha" value={alpha}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                onChange={(e) => { setAlpha(e.target.value); }}
              >
                {ALPHA_OPTIONS.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          {needsDf1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pvc-df1">
                  {needsDf2 ? t("field.df1") : t("field.df")}
                </Label>
                <Input
                  id="pvc-df1" type="number" inputMode="numeric" min="1" step="1"
                  value={df1Str} placeholder={t("placeholder.df")}
                  onChange={(e) => { setDf1Str(e.target.value); setTouched(true); }}
                />
              </div>
              {needsDf2 && (
                <div className="space-y-2">
                  <Label htmlFor="pvc-df2">{t("field.df2")}</Label>
                  <Input
                    id="pvc-df2" type="number" inputMode="numeric" min="1" step="1"
                    value={df2Str} placeholder={t("placeholder.df")}
                    onChange={(e) => { setDf2Str(e.target.value); setTouched(true); }}
                  />
                </div>
              )}
            </div>
          )}

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

          {pValue !== null && touched && valid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.pValue")}</div>
                  <div className="mt-1 text-2xl font-semibold text-zinc-900">{fmt(pValue)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.significance")}</div>
                  <div className={`mt-1 text-lg font-semibold ${pValue <= alphaNum ? "text-green-700" : "text-red-600"}`}>
                    {pValue <= alphaNum ? t("result.significant") : t("result.notSignificant")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.alphaLabel")}</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">{alpha}</div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("formula")}</p>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("z-test", "two-tailed", "2.5", "0.05", "", "")}>
            {t("examples.loadZTest")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("t-test", "right-tailed", "2.1", "0.05", "15", "")}>
            {t("examples.loadTTest")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("chi-square", "right-tailed", "18.3", "0.01", "10", "")}>
            {t("examples.loadChiSq")}
          </Button>
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
