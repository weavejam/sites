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

type Mode = "rawData" | "summary";
const MODES: Mode[] = ["rawData", "summary"];

const CONF_LEVELS = [
  { label: "90%", z: 1.645 },
  { label: "95%", z: 1.96 },
  { label: "99%", z: 2.576 },
];

function parseNumbers(s: string): number[] {
  return s
    .split(/[\s,;\n]+/)
    .map((v) => v.trim())
    .filter((v) => v !== "")
    .map(Number)
    .filter((v) => Number.isFinite(v));
}

interface SEResult {
  n: number;
  mean: number;
  sd: number;
  se: number;
  ciLow: number;
  ciHigh: number;
  z: number;
  confLabel: string;
}

function computeFromRaw(nums: number[], zVal: number, confLabel: string): SEResult | null {
  const n = nums.length;
  if (n < 2) return null;
  const mean = nums.reduce((a, b) => a + b, 0) / n;
  const sumSqDiff = nums.reduce((a, v) => a + (v - mean) ** 2, 0);
  const sd = Math.sqrt(sumSqDiff / (n - 1));
  const se = sd / Math.sqrt(n);
  return { n, mean, sd, se, ciLow: mean - zVal * se, ciHigh: mean + zVal * se, z: zVal, confLabel };
}

function computeFromSummary(
  mean: number,
  sd: number,
  n: number,
  zVal: number,
  confLabel: string
): SEResult | null {
  if (!Number.isFinite(mean) || sd <= 0 || !Number.isInteger(n) || n < 2) return null;
  const se = sd / Math.sqrt(n);
  return { n, mean, sd, se, ciLow: mean - zVal * se, ciHigh: mean + zVal * se, z: zVal, confLabel };
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function StandardErrorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.standard-error-calculator");

  const [mode, setMode] = React.useState<Mode>("rawData");
  const [rawStr, setRawStr] = React.useState("");
  const [summMean, setSummMean] = React.useState("");
  const [summSD, setSummSD] = React.useState("");
  const [summN, setSummN] = React.useState("");
  const [confIdx, setConfIdx] = React.useState(1); // default 95%
  const [calculated, setCalculated] = React.useState(false);

  const selectedConf = CONF_LEVELS[confIdx];

  const result = React.useMemo<SEResult | null>(() => {
    if (!calculated) return null;
    if (mode === "rawData") {
      const nums = parseNumbers(rawStr);
      return computeFromRaw(nums, selectedConf.z, selectedConf.label);
    } else {
      const mean = parseFloat(summMean);
      const sd = parseFloat(summSD);
      const n = Number(summN);
      return computeFromSummary(mean, sd, n, selectedConf.z, selectedConf.label);
    }
  }, [calculated, mode, rawStr, summMean, summSD, summN, selectedConf]);

  const valid = result !== null;

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
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

  function reset() {
    setRawStr("");
    setSummMean("");
    setSummSD("");
    setSummN("");
    setCalculated(false);
  }

  function loadRaw(data: string) {
    setMode("rawData");
    setRawStr(data);
    setCalculated(true);
  }

  function loadSummary(mean: string, sd: string, n: string) {
    setMode("summary");
    setSummMean(mean);
    setSummSD(sd);
    setSummN(n);
    setCalculated(true);
  }

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
          {/* Mode toggle */}
          <div className="space-y-2">
            <Label>{t("field.method")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => {
                    setMode(m);
                    setCalculated(false);
                  }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {mode === "rawData" ? (
            <div className="space-y-2">
              <Label htmlFor="se-raw">{t("field.rawData")}</Label>
              <textarea
                id="se-raw"
                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex min-h-[6rem] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-24"
                value={rawStr}
                placeholder={t("placeholder.rawData")}
                onChange={(e) => {
                  setRawStr(e.target.value);
                  setCalculated(false);
                }}
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="se-mean">{t("field.mean")}</Label>
                <Input
                  id="se-mean"
                  type="number"
                  inputMode="decimal"
                  value={summMean}
                  placeholder={t("placeholder.mean")}
                  onChange={(e) => {
                    setSummMean(e.target.value);
                    setCalculated(false);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="se-sd">{t("field.sd")}</Label>
                <Input
                  id="se-sd"
                  type="number"
                  inputMode="decimal"
                  value={summSD}
                  placeholder={t("placeholder.sd")}
                  onChange={(e) => {
                    setSummSD(e.target.value);
                    setCalculated(false);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="se-n">{t("field.n")}</Label>
                <Input
                  id="se-n"
                  type="number"
                  inputMode="numeric"
                  value={summN}
                  placeholder={t("placeholder.n")}
                  onChange={(e) => {
                    setSummN(e.target.value);
                    setCalculated(false);
                  }}
                />
              </div>
            </div>
          )}

          {/* Confidence level */}
          <div className="space-y-2">
            <Label>{t("field.confLevel")}</Label>
            <div className="flex flex-wrap gap-2">
              {CONF_LEVELS.map((c, i) => (
                <Button
                  key={c.label}
                  type="button"
                  variant={confIdx === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setConfIdx(i);
                    setCalculated(false);
                  }}
                >
                  {c.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setCalculated(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {calculated && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {calculated && valid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-800">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 text-sm">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.n")}</div>
                  <div className="text-lg font-semibold">{result.n}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.mean")}
                  </div>
                  <div className="text-lg font-semibold">
                    {fmt(result.mean)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.sd")}</div>
                  <div className="text-lg font-semibold">{fmt(result.sd)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 col-span-2 sm:col-span-1">
                  <div className="text-xs text-zinc-500">{t("result.se")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.se)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 col-span-2">
                  <div className="text-xs text-zinc-500">
                    {t("result.ci", { conf: result.confLabel } as never)}
                  </div>
                  <div className="font-semibold">
                    [{fmt(result.ciLow)}, {fmt(result.ciHigh)}]
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadRaw("85, 92, 88, 78, 90")}
            >
              {t("examples.loadRawScores")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadSummary("500", "5", "100")}
            >
              {t("examples.loadSummary")}
            </Button>
          </div>
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
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
