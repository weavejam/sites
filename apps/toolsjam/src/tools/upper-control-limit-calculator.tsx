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

type Mode = "data" | "summary";

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

interface UclResult {
  mean: number;
  stdDev: number;
  ucl: number;
  lcl: number;
  n: number;
  sigmaK: number;
}

function computeFromData(dataStr: string, k: number): UclResult | null {
  const vals = dataStr.split(/[\s,]+/).map((v) => parseFloat(v.trim())).filter((v) => Number.isFinite(v));
  if (vals.length < 2) return null;
  const n = vals.length;
  const mean = vals.reduce((s, v) => s + v, 0) / n;
  const variance = vals.reduce((s, v) => s + (v - mean) ** 2, 0) / (n - 1);
  const stdDev = Math.sqrt(variance);
  const ucl = mean + k * stdDev;
  const lcl = mean - k * stdDev;
  return { mean, stdDev, ucl, lcl, n, sigmaK: k };
}

function computeFromSummary(meanStr: string, stdStr: string, k: number): UclResult | null {
  const mean = parseFloat(meanStr);
  const stdDev = parseFloat(stdStr);
  if (!Number.isFinite(mean) || !Number.isFinite(stdDev) || stdDev < 0) return null;
  const ucl = mean + k * stdDev;
  const lcl = mean - k * stdDev;
  return { mean, stdDev, ucl, lcl, n: 0, sigmaK: k };
}

export default function UpperControlLimitCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.upper-control-limit-calculator");
  const [mode, setMode] = React.useState<Mode>("data");
  const [dataStr, setDataStr] = React.useState("");
  const [meanStr, setMeanStr] = React.useState("");
  const [stdStr, setStdStr] = React.useState("");
  const [sigmaK, setSigmaK] = React.useState("3");
  const [calculated, setCalculated] = React.useState(false);

  const k = parseFloat(sigmaK) || 3;

  const result = React.useMemo<UclResult | null>(() => {
    if (!calculated) return null;
    if (mode === "data") return computeFromData(dataStr, k);
    return computeFromSummary(meanStr, stdStr, k);
  }, [calculated, mode, dataStr, meanStr, stdStr, k]);

  function reset() {
    setDataStr(""); setMeanStr(""); setStdStr(""); setSigmaK("3");
    setCalculated(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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
            <Label>{t("field.mode")}</Label>
            <div className="flex gap-2">
              {(["data", "summary"] as const).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => { setMode(m); setCalculated(false); }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {mode === "data" ? (
            <div className="space-y-2">
              <Label htmlFor="ucl-data">{t("field.data")}</Label>
              <Input
                id="ucl-data"
                type="text"
                value={dataStr}
                placeholder={t("placeholder.data")}
                onChange={(e) => { setDataStr(e.target.value); setCalculated(false); }}
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ucl-mean">{t("field.mean")}</Label>
                <Input
                  id="ucl-mean"
                  type="number"
                  inputMode="decimal"
                  value={meanStr}
                  placeholder={t("placeholder.mean")}
                  onChange={(e) => { setMeanStr(e.target.value); setCalculated(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ucl-std">{t("field.stdDev")}</Label>
                <Input
                  id="ucl-std"
                  type="number"
                  inputMode="decimal"
                  value={stdStr}
                  placeholder={t("placeholder.stdDev")}
                  onChange={(e) => { setStdStr(e.target.value); setCalculated(false); }}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="ucl-k">{t("field.sigmaK")}</Label>
            <Input
              id="ucl-k"
              type="number"
              inputMode="decimal"
              min="1"
              max="6"
              step="0.5"
              value={sigmaK}
              placeholder="3"
              onChange={(e) => { setSigmaK(e.target.value); setCalculated(false); }}
            />
            <p className="text-xs text-zinc-500">{t("field.sigmaKHint")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setCalculated(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {calculated && !result && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-semibold text-zinc-700">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <UclRow label={t("result.mean")} value={fmt(result.mean)} />
                <UclRow label={t("result.stdDev")} value={fmt(result.stdDev)} />
                {result.n > 0 && <UclRow label={t("result.n")} value={String(result.n)} />}
                <UclRow label={t("result.ucl")} value={fmt(result.ucl)} highlight="red" />
                <UclRow label={t("result.lcl")} value={fmt(result.lcl)} highlight="blue" />
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.formula", { k: result.sigmaK })}
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

function UclRow({ label, value, highlight }: { label: string; value: string; highlight?: string }) {
  return (
    <div className={`flex items-center justify-between rounded border px-3 py-2 ${
      highlight === "red" ? "border-red-200 bg-red-50" :
      highlight === "blue" ? "border-blue-200 bg-blue-50" :
      "border-zinc-200 bg-white"
    }`}>
      <span className="text-sm text-zinc-600">{label}</span>
      <span className={`font-semibold ${
        highlight === "red" ? "text-red-800" :
        highlight === "blue" ? "text-blue-800" :
        "text-zinc-900"
      }`}>{value}</span>
    </div>
  );
}
