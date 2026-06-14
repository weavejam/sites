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

function tCDF(t: number, df: number): number {
  const x = df / (df + t * t);
  const ib = betaInc(x, df / 2, 0.5);
  return t < 0 ? 0.5 * ib : 1 - 0.5 * ib;
}

function invT(p: number, df: number): number {
  let lo = 0, hi = 100;
  for (let i = 0; i < 120; i++) {
    const mid = (lo + hi) / 2;
    if (tCDF(mid, df) < p) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
}

function mean(arr: number[]): number {
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

function stdDev(arr: number[], m: number): number {
  const n = arr.length;
  const variance = arr.reduce((s, v) => s + (v - m) ** 2, 0) / (n - 1);
  return Math.sqrt(variance);
}

interface PairedResult {
  n: number;
  dBar: number;
  sd: number;
  se: number;
  tStat: number;
  df: number;
  pValue: number;
  ciLow: number;
  ciHigh: number;
  reject: boolean;
}

function compute(
  group1: number[], group2: number[], mu0: number, alpha: number, tail: string
): PairedResult | null {
  const n = group1.length;
  if (n !== group2.length || n < 2) return null;
  const diffs = group1.map((v, i) => v - group2[i]);
  const dBar = mean(diffs);
  const sd = stdDev(diffs, dBar);
  if (sd === 0) return null;
  const se = sd / Math.sqrt(n);
  const tStat = (dBar - mu0) / se;
  const df = n - 1;
  const cdf = tCDF(tStat, df);
  let pValue: number;
  if (tail === "two-tailed") pValue = Math.min(2 * Math.min(cdf, 1 - cdf), 1);
  else if (tail === "right-tailed") pValue = 1 - cdf;
  else pValue = cdf;
  const tCrit = invT(1 - alpha / 2, df);
  const ciLow = dBar - tCrit * se;
  const ciHigh = dBar + tCrit * se;
  return { n, dBar, sd, se, tStat, df, pValue, ciLow, ciHigh, reject: pValue <= alpha };
}

function parseDataStr(s: string): number[] | null {
  const parts = s.split(",").map((p) => p.trim()).filter((p) => p !== "");
  if (parts.length < 2) return null;
  const nums = parts.map(Number);
  if (nums.some((v) => !Number.isFinite(v))) return null;
  return nums;
}

const TAIL_TYPES = ["two-tailed", "right-tailed", "left-tailed"];
const ALPHA_OPTIONS = ["0.01", "0.05", "0.10"];

export default function PairedSamplesTTestCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.paired-samples-t-test-calculator");
  const [g1Str, setG1Str] = React.useState("");
  const [g2Str, setG2Str] = React.useState("");
  const [alpha, setAlpha] = React.useState("0.05");
  const [muStr, setMuStr] = React.useState("0");
  const [tail, setTail] = React.useState("two-tailed");
  const [touched, setTouched] = React.useState(false);

  const g1 = React.useMemo(() => parseDataStr(g1Str), [g1Str]);
  const g2 = React.useMemo(() => parseDataStr(g2Str), [g2Str]);
  const mu = parseFloat(muStr);
  const alphaNum = parseFloat(alpha);

  const valid = g1 !== null && g2 !== null && g1.length === g2.length && g1.length >= 2 && Number.isFinite(mu);

  const result = React.useMemo<PairedResult | null>(() => {
    if (!valid || !g1 || !g2) return null;
    return compute(g1, g2, mu, alphaNum, tail);
  }, [g1, g2, mu, alphaNum, tail, valid]);

  function loadExample(s1: string, s2: string, a: string, m: string, tl: string) {
    setG1Str(s1); setG2Str(s2); setAlpha(a); setMuStr(m); setTail(tl);
    setTouched(true);
  }

  function reset() {
    setG1Str(""); setG2Str(""); setAlpha("0.05");
    setMuStr("0"); setTail("two-tailed"); setTouched(false);
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

  const showError = touched && (!valid || (valid && result === null));

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
              <Label htmlFor="pst-g1">{t("field.group1")}</Label>
              <Input
                id="pst-g1" type="text"
                value={g1Str} placeholder={t("placeholder.data")}
                onChange={(e) => { setG1Str(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pst-g2">{t("field.group2")}</Label>
              <Input
                id="pst-g2" type="text"
                value={g2Str} placeholder={t("placeholder.data")}
                onChange={(e) => { setG2Str(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="pst-alpha">{t("field.alpha")}</Label>
              <select
                id="pst-alpha" value={alpha}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                onChange={(e) => setAlpha(e.target.value)}
              >
                {ALPHA_OPTIONS.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pst-mu">{t("field.mu")}</Label>
              <Input
                id="pst-mu" type="number" inputMode="decimal"
                value={muStr} placeholder="0"
                onChange={(e) => setMuStr(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pst-tail">{t("field.tail")}</Label>
              <select
                id="pst-tail" value={tail}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                onChange={(e) => setTail(e.target.value)}
              >
                {TAIL_TYPES.map((v) => (
                  <option key={v} value={v}>{t(`tail.${v}` as never)}</option>
                ))}
              </select>
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

          {result !== null && touched && valid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {([
                  ["result.tStat", fmt(result.tStat)],
                  ["result.df", result.df.toString()],
                  ["result.pValue", fmt(result.pValue)],
                  ["result.dBar", fmt(result.dBar)],
                  ["result.sd", fmt(result.sd)],
                  ["result.ci95", `${fmt(result.ciLow)} – ${fmt(result.ciHigh)}`],
                ] as [string, string][]).map(([key, val]) => (
                  <div key={key} className="rounded border border-zinc-200 bg-white p-3">
                    <div className="text-xs text-zinc-500">{t(key as never)}</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">{val}</div>
                  </div>
                ))}
              </div>
              <div className={`rounded border p-3 text-sm font-medium ${result.reject ? "border-green-300 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-800"}`}>
                {result.reject ? t("result.reject") : t("result.failReject")}
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
            onClick={() => loadExample(
              "140, 135, 150, 155, 130, 142, 138, 147, 152, 133",
              "132, 130, 145, 148, 125, 135, 130, 140, 145, 128",
              "0.05", "0", "two-tailed"
            )}>
            {t("examples.loadBP")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample(
              "75, 80, 82, 70, 88, 65, 90, 78",
              "85, 85, 88, 78, 92, 75, 95, 85",
              "0.05", "0", "two-tailed"
            )}>
            {t("examples.loadTutor")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample(
              "500, 550, 480, 600, 520, 530",
              "540, 580, 500, 650, 550, 560",
              "0.05", "0", "two-tailed"
            )}>
            {t("examples.loadSales")}
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
