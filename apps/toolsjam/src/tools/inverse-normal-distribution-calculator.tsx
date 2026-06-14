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

type TailType = "left" | "right" | "two";

interface InvNormResult {
  x?: number;
  xLow?: number;
  xHigh?: number;
  zScore?: number;
  zLow?: number;
  zHigh?: number;
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
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  let lo = -10, hi = 10;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (normalCDF(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function computeInvNorm(
  mu: number,
  sigma: number,
  prob: number,
  tail: TailType
): InvNormResult | null {
  if (!Number.isFinite(mu) || !Number.isFinite(sigma) || sigma <= 0) return null;
  if (!Number.isFinite(prob) || prob <= 0 || prob >= 1) return null;

  if (tail === "left") {
    const z = invNormalCDF(prob);
    return { x: mu + sigma * z, zScore: z };
  }
  if (tail === "right") {
    const z = invNormalCDF(1 - prob);
    return { x: mu + sigma * z, zScore: z };
  }
  // two-tailed (centre): prob is the area in the middle
  const zHalf = invNormalCDF(1 - (1 - prob) / 2);
  return {
    xLow: mu - sigma * zHalf,
    xHigh: mu + sigma * zHalf,
    zLow: -zHalf,
    zHigh: zHalf,
  };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: 0 });
}

export default function InverseNormalDistributionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.inverse-normal-distribution-calculator");

  const TAILS: TailType[] = ["left", "right", "two"];
  const [tail, setTail] = React.useState<TailType>("left");
  const [mu, setMu] = React.useState("0");
  const [sigma, setSigma] = React.useState("1");
  const [prob, setProb] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<InvNormResult | null>(() => {
    if (!touched) return null;
    return computeInvNorm(parseFloat(mu), parseFloat(sigma), parseFloat(prob), tail);
  }, [touched, mu, sigma, prob, tail]);

  function reset() {
    setMu("0");
    setSigma("1");
    setProb("");
    setTouched(false);
  }

  function loadExample(muVal: string, sigmaVal: string, probVal: string, tailVal: TailType) {
    setMu(muVal);
    setSigma(sigmaVal);
    setProb(probVal);
    setTail(tailVal);
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
          <div className="space-y-2">
            <Label>{t("field.tailType")}</Label>
            <div className="flex flex-wrap gap-2">
              {TAILS.map((tt) => (
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ind-mu">{t("field.mean")}</Label>
              <Input
                id="ind-mu"
                type="number"
                inputMode="decimal"
                value={mu}
                placeholder="0"
                onChange={(e) => { setMu(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ind-sigma">{t("field.stdDev")}</Label>
              <Input
                id="ind-sigma"
                type="number"
                inputMode="decimal"
                value={sigma}
                placeholder="1"
                onChange={(e) => { setSigma(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ind-prob">{t("field.probability")}</Label>
              <Input
                id="ind-prob"
                type="number"
                inputMode="decimal"
                value={prob}
                placeholder={t("placeholder.probability")}
                onChange={(e) => { setProb(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">
                {tail === "two" ? t("field.probabilityHintTwo") : t("field.probabilityHintOne")}
              </p>
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
                {result.x !== undefined && (
                  <>
                    <div className="text-zinc-600">{t("result.xValue")}</div>
                    <div className="text-2xl font-bold text-zinc-900">{fmt(result.x)}</div>
                    <div className="text-zinc-600">{t("result.zScore")}</div>
                    <div className="font-semibold text-zinc-900">{fmt(result.zScore!)}</div>
                  </>
                )}
                {result.xLow !== undefined && (
                  <>
                    <div className="text-zinc-600">{t("result.xLow")}</div>
                    <div className="text-2xl font-bold text-zinc-900">{fmt(result.xLow)}</div>
                    <div className="text-zinc-600">{t("result.xHigh")}</div>
                    <div className="text-2xl font-bold text-zinc-900">{fmt(result.xHigh!)}</div>
                    <div className="text-zinc-600">{t("result.zRange")}</div>
                    <div className="font-semibold text-zinc-900">
                      {fmt(result.zLow!)} {t("result.zRangeSep")} {fmt(result.zHigh!)}
                    </div>
                  </>
                )}
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("0", "1", "0.95", "left")}>
            {t("examples.loadZ95")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("100", "15", "0.02", "right")}>
            {t("examples.loadIQ")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("50", "0.5", "0.99", "two")}>
            {t("examples.loadTolerance")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
