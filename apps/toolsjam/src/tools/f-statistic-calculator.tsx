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
  if (x < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  }
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
  const maxIter = 200;
  const eps = 3e-10;
  const fpmin = 1e-300;
  const qab = a + b, qap = a + 1, qam = a - 1;
  let c = 1.0, d = 1.0 - qab * x / qap;
  if (Math.abs(d) < fpmin) d = fpmin;
  d = 1.0 / d;
  let h = d;
  for (let m = 1; m <= maxIter; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1.0 + aa * d; if (Math.abs(d) < fpmin) d = fpmin;
    c = 1.0 + aa / c; if (Math.abs(c) < fpmin) c = fpmin;
    d = 1.0 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1.0 + aa * d; if (Math.abs(d) < fpmin) d = fpmin;
    c = 1.0 + aa / c; if (Math.abs(c) < fpmin) c = fpmin;
    d = 1.0 / d;
    const del = d * c;
    h *= del;
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

function fCDF(x: number, d1: number, d2: number): number {
  if (x <= 0) return 0;
  return betaInc((d1 * x) / (d1 * x + d2), d1 / 2, d2 / 2);
}

function fQuantile(p: number, d1: number, d2: number): number {
  if (p <= 0) return 0;
  if (p >= 1) return 1e9;
  let lo = 0, hi = 1e6;
  for (let i = 0; i < 120; i++) {
    const mid = (lo + hi) / 2;
    if (fCDF(mid, d1, d2) < p) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

// ── types ─────────────────────────────────────────────────────────────────

interface ExampleItem { input: string; output: string; note?: string }

const ALPHA_OPTIONS = ["0.01", "0.05", "0.10"];

// ── component ─────────────────────────────────────────────────────────────

export default function FStatisticCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.f-statistic-calculator");
  const [s1, setS1] = React.useState("");
  const [n1, setN1] = React.useState("");
  const [s2, setS2] = React.useState("");
  const [n2, setN2] = React.useState("");
  const [alpha, setAlpha] = React.useState("0.05");
  const [touched, setTouched] = React.useState(false);

  const s1Num = parseFloat(s1);
  const n1Num = parseInt(n1, 10);
  const s2Num = parseFloat(s2);
  const n2Num = parseInt(n2, 10);
  const alphaNum = parseFloat(alpha);

  const valid =
    s1 !== "" && s2 !== "" && n1 !== "" && n2 !== "" &&
    Number.isFinite(s1Num) && s1Num >= 0 &&
    Number.isFinite(s2Num) && s2Num >= 0 &&
    Number.isFinite(n1Num) && n1Num >= 2 &&
    Number.isFinite(n2Num) && n2Num >= 2;

  const result = React.useMemo(() => {
    if (!valid) return null;
    const isFirstLarger = s1Num >= s2Num;
    const larger = isFirstLarger ? s1Num : s2Num;
    const smaller = isFirstLarger ? s2Num : s1Num;
    const df1 = (isFirstLarger ? n1Num : n2Num) - 1;
    const df2 = (isFirstLarger ? n2Num : n1Num) - 1;
    if (smaller === 0) return null;
    const F = larger / smaller;
    const pVal = Math.min(2 * (1 - fCDF(F, df1, df2)), 1);
    const critF = fQuantile(1 - alphaNum / 2, df1, df2);
    return { F, df1, df2, pVal, critF, reject: pVal <= alphaNum };
  }, [valid, s1Num, n1Num, s2Num, n2Num, alphaNum]);

  function reset() {
    setS1(""); setN1(""); setS2(""); setN2("");
    setAlpha("0.05"); setTouched(false);
  }

  function loadExample(v1: string, n1v: string, v2: string, n2v: string, a: string) {
    setS1(v1); setN1(n1v); setS2(v2); setN2(n2v);
    setAlpha(a); setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
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
          <CardTitle>{t("card.title")}</CardTitle>
          <CardDescription>{t("card.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-900">{t("field.group1")}</h3>
              <div className="space-y-2">
              <Label htmlFor="fsc-s1">{t("field.variance1")}</Label>
                <Input
                  id="fsc-s1" type="number" inputMode="decimal" min="0"
                  value={s1} placeholder={t("placeholder.variance")}
                  onChange={(e) => { setS1(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
              <Label htmlFor="fsc-n1">{t("field.sampleSize1")}</Label>
                <Input
                  id="fsc-n1" type="number" inputMode="numeric" min="2"
                  value={n1} placeholder={t("placeholder.sampleSize")}
                  onChange={(e) => { setN1(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-900">{t("field.group2")}</h3>
              <div className="space-y-2">
              <Label htmlFor="fsc-s2">{t("field.variance2")}</Label>
                <Input
                  id="fsc-s2" type="number" inputMode="decimal" min="0"
                  value={s2} placeholder={t("placeholder.variance")}
                  onChange={(e) => { setS2(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
              <Label htmlFor="fsc-n2">{t("field.sampleSize2")}</Label>
                <Input
                  id="fsc-n2" type="number" inputMode="numeric" min="2"
                  value={n2} placeholder={t("placeholder.sampleSize")}
                  onChange={(e) => { setN2(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fsc-alpha">{t("field.alpha")}</Label>
            <select
              id="fsc-alpha" value={alpha}
              className="flex h-9 w-full max-w-xs rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
              onChange={(e) => { setAlpha(e.target.value); setTouched(true); }}
            >
              {ALPHA_OPTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
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

          {result && touched && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.fStatistic")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.F)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.df1")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{result.df1}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.df2")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{result.df2}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.pValue")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.pVal)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.criticalF")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.critF)}</div>
                </div>
              </div>
              <div
                className={`rounded px-3 py-2 text-sm font-medium ${
                  result.reject
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0.34", "25", "0.29", "25", "0.05")}>
            {t("examples.loadMfg")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("110", "41", "135", "31", "0.05")}>
            {t("examples.loadTeaching")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1.5", "30", "1.2", "30", "0.01")}>
            {t("examples.loadStock")}
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
