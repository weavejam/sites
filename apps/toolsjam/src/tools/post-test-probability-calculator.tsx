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

function fmt(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals)).toLocaleString(
    "en-US",
    { maximumFractionDigits: decimals }
  );
}

function fmtPct(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return fmt(n * 100, 4) + "%";
}

interface PostTestResult {
  ppv: number;
  npv: number;
  postTestPositive: number;
  postTestNegative: number;
  lrPos: number;
  lrNeg: number;
  fpr: number;
  fnr: number;
}

function computePostTest(
  priorPct: number,
  sensitivityPct: number,
  specificityPct: number
): PostTestResult {
  const prior = priorPct / 100;
  const sens = sensitivityPct / 100;
  const spec = specificityPct / 100;
  const fpr = 1 - spec;
  const fnr = 1 - sens;

  // PPV = P(D+|T+) = (sens * prior) / (sens * prior + fpr * (1-prior))
  const ppvDenom = sens * prior + fpr * (1 - prior);
  const ppv = ppvDenom > 0 ? (sens * prior) / ppvDenom : NaN;

  // NPV = P(D-|T-) = (spec * (1-prior)) / (spec * (1-prior) + fnr * prior)
  const npvDenom = spec * (1 - prior) + fnr * prior;
  const npv = npvDenom > 0 ? (spec * (1 - prior)) / npvDenom : NaN;

  // Post-test probability after positive = PPV
  const postTestPositive = ppv;
  // Post-test probability of disease after negative = 1 - NPV
  const postTestNegative = 1 - npv;

  // Likelihood ratios
  const lrPos = fpr > 0 ? sens / fpr : Infinity;
  const lrNeg = spec > 0 ? fnr / spec : 0;

  return { ppv, npv, postTestPositive, postTestNegative, lrPos, lrNeg, fpr, fnr };
}

export default function PostTestProbabilityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.post-test-probability-calculator");

  const [priorStr, setPriorStr] = React.useState("");
  const [sensStr, setSensStr] = React.useState("");
  const [specStr, setSpecStr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const priorNum = parseFloat(priorStr);
  const sensNum = parseFloat(sensStr);
  const specNum = parseFloat(specStr);

  const allValid =
    Number.isFinite(priorNum) && priorNum >= 0 && priorNum <= 100 &&
    Number.isFinite(sensNum) && sensNum >= 0 && sensNum <= 100 &&
    Number.isFinite(specNum) && specNum >= 0 && specNum <= 100;

  const result: PostTestResult | null = React.useMemo(() => {
    if (!touched || !allValid) return null;
    return computePostTest(priorNum, sensNum, specNum);
  }, [touched, allValid, priorNum, sensNum, specNum]);

  function reset() {
    setPriorStr("");
    setSensStr("");
    setSpecStr("");
    setTouched(false);
  }

  function loadExample(prior: string, sens: string, spec: string) {
    setPriorStr(prior);
    setSensStr(sens);
    setSpecStr(spec);
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ptp-prior">{t("field.priorProbability")}</Label>
              <Input
                id="ptp-prior"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={priorStr}
                placeholder={t("placeholder.percent")}
                onChange={(e) => { setPriorStr(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ptp-sens">{t("field.sensitivity")}</Label>
              <Input
                id="ptp-sens"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={sensStr}
                placeholder={t("placeholder.percent")}
                onChange={(e) => { setSensStr(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ptp-spec">{t("field.specificity")}</Label>
              <Input
                id="ptp-spec"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={specStr}
                placeholder={t("placeholder.percent")}
                onChange={(e) => { setSpecStr(e.target.value); setTouched(false); }}
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
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("20", "85", "80")}>
              {t("examples.loadCommon")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("0.1", "99", "99")}>
              {t("examples.loadRare")}
            </Button>
          </div>

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
                <div className="text-sm font-medium text-zinc-500">
                  {t("result.heading")}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ["result.postTestPositive", result.postTestPositive],
                      ["result.postTestNegative", result.postTestNegative],
                      ["result.ppv", result.ppv],
                      ["result.npv", result.npv],
                      ["result.lrPos", result.lrPos],
                      ["result.lrNeg", result.lrNeg],
                    ] as [string, number][]
                  ).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between rounded border border-zinc-200 bg-white px-3 py-2"
                    >
                      <span className="text-sm text-zinc-600">
                        {t(key as never)}
                      </span>
                      <span className="font-semibold text-zinc-900">
                        {key.startsWith("result.lr")
                          ? fmt(val, 4)
                          : fmtPct(val)}
                      </span>
                    </div>
                  ))}
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
