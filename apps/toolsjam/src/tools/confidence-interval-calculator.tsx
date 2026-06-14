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

type DataType = "summary" | "raw";
type ConfLevel = "90" | "95" | "99";

const CONF_LEVELS: ConfLevel[] = ["90", "95", "99"];

// z-critical values for two-sided intervals
const Z_CRITICAL: Record<ConfLevel, number> = {
  "90": 1.6449,
  "95": 1.96,
  "99": 2.5758,
};

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(d)).toString();
}

function parseNumbers(s: string): number[] {
  return s
    .split(/[\s,;]+/)
    .map((t) => parseFloat(t))
    .filter((n) => Number.isFinite(n));
}

function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calcSampleStd(arr: number[]): number {
  const m = mean(arr);
  const variance = arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

export default function ConfidenceIntervalCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.confidence-interval-calculator");
  const [dataType, setDataType] = React.useState<DataType>("summary");
  const [confLevel, setConfLevel] = React.useState<ConfLevel>("95");
  // summary inputs
  const [sampleMean, setSampleMean] = React.useState<string>("");
  const [sampleStdInput, setSampleStdInput] = React.useState<string>("");
  const [sampleSize, setSampleSize] = React.useState<string>("");
  // raw input
  const [rawData, setRawData] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setSampleMean("");
    setSampleStdInput("");
    setSampleSize("");
    setRawData("");
    setTouched(false);
  }

  const result = React.useMemo<{
    mean: number;
    std: number;
    n: number;
    se: number;
    moe: number;
    lower: number;
    upper: number;
    z: number;
  } | null>(() => {
    const z = Z_CRITICAL[confLevel];
    let m: number, s: number, n: number;

    if (dataType === "summary") {
      m = parseFloat(sampleMean);
      s = parseFloat(sampleStdInput);
      n = parseFloat(sampleSize);
      if (!Number.isFinite(m) || !Number.isFinite(s) || !Number.isFinite(n)) return null;
      if (s < 0 || n < 2 || !Number.isInteger(n)) return null;
    } else {
      const nums = parseNumbers(rawData);
      if (nums.length < 2) return null;
      n = nums.length;
      m = mean(nums);
      s = calcSampleStd(nums);
    }

    const se = s / Math.sqrt(n);
    const moe = z * se;
    return { mean: m, std: s, n, se, moe, lower: m - moe, upper: m + moe, z };
  }, [dataType, confLevel, sampleMean, sampleStdInput, sampleSize, rawData]);

  const showError = touched && result === null;

  function loadExample(dt: DataType, m: string, s: string, n: string, raw: string, cl: ConfLevel) {
    setDataType(dt);
    setSampleMean(m);
    setSampleStdInput(s);
    setSampleSize(n);
    setRawData(raw);
    setConfLevel(cl);
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
          <div className="space-y-2">
            <Label>{t("field.dataType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["summary", "raw"] as DataType[]).map((dt) => (
                <Button
                  key={dt}
                  type="button"
                  variant={dataType === dt ? "default" : "outline"}
                  onClick={() => { setDataType(dt); setTouched(false); }}
                >
                  {t(`type.${dt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.confLevel")}</Label>
            <div className="flex flex-wrap gap-2">
              {CONF_LEVELS.map((cl) => (
                <Button
                  key={cl}
                  type="button"
                  variant={confLevel === cl ? "default" : "outline"}
                  onClick={() => setConfLevel(cl)}
                >
                  {cl}%
                </Button>
              ))}
            </div>
          </div>

          {dataType === "summary" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ci-mean">{t("field.sampleMean")}</Label>
                <Input
                  id="ci-mean"
                  type="number"
                  inputMode="decimal"
                  value={sampleMean}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setSampleMean(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ci-std">{t("field.sampleStd")}</Label>
                <Input
                  id="ci-std"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={sampleStdInput}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setSampleStdInput(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ci-n">{t("field.sampleSize")}</Label>
                <Input
                  id="ci-n"
                  type="number"
                  inputMode="numeric"
                  min="2"
                  value={sampleSize}
                  placeholder={t("placeholder.integer")}
                  onChange={(e) => { setSampleSize(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="ci-raw">{t("field.rawData")}</Label>
              <Input
                id="ci-raw"
                value={rawData}
                placeholder={t("placeholder.rawData")}
                onChange={(e) => { setRawData(e.target.value); setTouched(true); }}
              />
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

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading", { level: confLevel })}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                ({formatNum(result.lower)}, {formatNum(result.upper)})
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-zinc-700 pt-2 sm:grid-cols-4">
                <div><span className="font-medium">{t("result.mean")}:</span> {formatNum(result.mean)}</div>
                <div><span className="font-medium">{t("result.moe")}:</span> ±{formatNum(result.moe)}</div>
                <div><span className="font-medium">{t("result.se")}:</span> {formatNum(result.se)}</div>
                <div><span className="font-medium">{t("result.n")}:</span> {result.n}</div>
              </div>
              <div className="text-xs text-zinc-500 pt-1">
                {t("result.formula", { mean: formatNum(result.mean), z: formatNum(result.z, 4), se: formatNum(result.se) })}
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("summary", "75", "5", "100", "", "95")}>
            {t("examples.loadTestScores")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("summary", "250", "10", "50", "", "99")}>
            {t("examples.loadProductWeight")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("raw", "", "", "", "22, 25, 21, 24, 23, 26, 20", "90")}>
            {t("examples.loadTemperatures")}
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
