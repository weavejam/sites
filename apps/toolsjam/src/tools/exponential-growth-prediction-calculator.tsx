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

type Method = "methodRate" | "methodPoints";

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e6) / 1e6).toLocaleString("en-US", { maximumFractionDigits: 6 });
}

interface RateResult {
  futureValue: number;
  growthRate: number;
  table: { t: number; v: number }[];
}

function calcFromRate(p0: number, r: number, t: number): RateResult | null {
  if (!Number.isFinite(p0) || p0 <= 0) return null;
  if (!Number.isFinite(r)) return null;
  if (!Number.isFinite(t) || t < 0) return null;
  const k = r / 100;
  const futureValue = p0 * Math.pow(1 + k, t);
  const table: { t: number; v: number }[] = [];
  const steps = Math.max(1, Math.min(Math.ceil(t), 10));
  for (let i = 0; i <= steps; i++) {
    const frac = t === 0 ? 0 : (i / steps) * t;
    table.push({ t: frac, v: p0 * Math.pow(1 + k, frac) });
  }
  return { futureValue, growthRate: r, table };
}

function calcFromPoints(p1: number, t1: number, p2: number, t2: number, tPred: number): RateResult | null {
  if (!Number.isFinite(p1) || p1 <= 0) return null;
  if (!Number.isFinite(p2) || p2 <= 0) return null;
  if (!Number.isFinite(t1) || !Number.isFinite(t2) || t2 <= t1) return null;
  if (!Number.isFinite(tPred)) return null;
  const k = Math.log(p2 / p1) / (t2 - t1);
  const p0 = p1 * Math.exp(-k * t1);
  const futureValue = p0 * Math.exp(k * tPred);
  const growthRate = (Math.exp(k) - 1) * 100;
  const minT = Math.min(t1, tPred);
  const maxT = Math.max(t2, tPred);
  const steps = 5;
  const table: { t: number; v: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const time = minT + (i / steps) * (maxT - minT);
    table.push({ t: time, v: p0 * Math.exp(k * time) });
  }
  return { futureValue, growthRate, table };
}

export default function ExponentialGrowthPredictionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.exponential-growth-prediction-calculator");
  const [method, setMethod] = React.useState<Method>("methodRate");
  const [touched, setTouched] = React.useState(false);

  // Rate method fields
  const [p0Val, setP0Val] = React.useState("");
  const [rateVal, setRateVal] = React.useState("");
  const [tVal, setTVal] = React.useState("");

  // Two points method fields
  const [v1Val, setV1Val] = React.useState("");
  const [t1Val, setT1Val] = React.useState("");
  const [v2Val, setV2Val] = React.useState("");
  const [t2Val, setT2Val] = React.useState("");
  const [tPredVal, setTPredVal] = React.useState("");

  const result = React.useMemo<RateResult | null>(() => {
    if (!touched) return null;
    if (method === "methodRate") {
      return calcFromRate(parseFloat(p0Val), parseFloat(rateVal), parseFloat(tVal));
    } else {
      return calcFromPoints(
        parseFloat(v1Val), parseFloat(t1Val),
        parseFloat(v2Val), parseFloat(t2Val),
        parseFloat(tPredVal)
      );
    }
  }, [touched, method, p0Val, rateVal, tVal, v1Val, t1Val, v2Val, t2Val, tPredVal]);

  function reset() {
    setTouched(false);
    setP0Val(""); setRateVal(""); setTVal("");
    setV1Val(""); setT1Val(""); setV2Val(""); setT2Val(""); setTPredVal("");
  }

  function loadRateExample(p0: string, rate: string, t: string) {
    setMethod("methodRate");
    setP0Val(p0); setRateVal(rate); setTVal(t);
    setTouched(true);
  }

  function loadPointsExample(v1: string, t1: string, v2: string, t2: string, tPred: string) {
    setMethod("methodPoints");
    setV1Val(v1); setT1Val(t1); setV2Val(v2); setT2Val(t2); setTPredVal(tPred);
    setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  const numField = (label: string, id: string, value: string, onChange: (v: string) => void) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={t("placeholder.number")}
        onChange={(e) => { onChange(e.target.value); setTouched(true); }}
      />
    </div>
  );

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
            <Label>{t("field.method")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["methodRate", "methodPoints"] as Method[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={method === m ? "default" : "outline"}
                  onClick={() => { setMethod(m); setTouched(false); }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(method === "methodRate" ? "type.methodRateDesc" : "type.methodPointsDesc" as never)}
            </p>
          </div>

          {method === "methodRate" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {numField(t("field.initialValue"), "egp-p0", p0Val, setP0Val)}
              {numField(t("field.growthRate"), "egp-rate", rateVal, setRateVal)}
              {numField(t("field.timePeriods"), "egp-t", tVal, setTVal)}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {numField(t("field.value1"), "egp-v1", v1Val, setV1Val)}
              {numField(t("field.time1"), "egp-t1", t1Val, setT1Val)}
              {numField(t("field.value2"), "egp-v2", v2Val, setV2Val)}
              {numField(t("field.time2"), "egp-t2", t2Val, setT2Val)}
              {numField(t("field.predictionTime"), "egp-tpred", tPredVal, setTPredVal)}
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

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
                <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.futureValue")}</div>
                    <div className="text-2xl font-semibold text-zinc-900">{formatNum(result.futureValue)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.growthRate")}</div>
                    <div className="text-2xl font-semibold text-zinc-900">{formatNum(result.growthRate)}%</div>
                  </div>
                </div>
              </div>
              {result.table.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-zinc-600 mb-2">{t("result.tableHeading")}</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-200 bg-zinc-50">
                          <th className="px-3 py-2 text-left font-semibold">{t("result.timePeriod")}</th>
                          <th className="px-3 py-2 text-left font-semibold">{t("result.value")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.table.map((row, i) => (
                          <tr key={i} className="border-b border-zinc-100">
                            <td className="px-3 py-2">{formatNum(row.t)}</td>
                            <td className="px-3 py-2">{formatNum(row.v)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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
            onClick={() => loadRateExample("10000", "7", "15")}>
            {t("examples.loadInvestment")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadPointsExample("1200000", "2010", "1500000", "2020", "2030")}>
            {t("examples.loadPopulation")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadPointsExample("500", "0", "4500", "4", "8")}>
            {t("examples.loadBacteria")}
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
