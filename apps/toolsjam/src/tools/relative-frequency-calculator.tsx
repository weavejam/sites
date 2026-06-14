"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FrequencyRow {
  value: string;
  frequency: number;
  relativeFrequency: number;
  cumulativeFrequency: number;
  cumulativeRelativeFrequency: number;
}

function parseData(raw: string): number[] | null {
  const parts = raw.split(/[,\s]+/).filter((p) => p.trim() !== "");
  if (parts.length === 0) return null;
  const nums = parts.map(Number);
  if (nums.some(Number.isNaN)) return null;
  return nums;
}

function computeFrequency(data: number[]): FrequencyRow[] {
  const counts = new Map<number, number>();
  for (const v of data) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  const total = data.length;
  const sorted = Array.from(counts.entries()).sort((a, b) => a[0] - b[0]);
  let cumFreq = 0;
  let cumRelFreq = 0;
  return sorted.map(([val, freq]) => {
    cumFreq += freq;
    cumRelFreq += freq / total;
    return {
      value: String(val),
      frequency: freq,
      relativeFrequency: freq / total,
      cumulativeFrequency: cumFreq,
      cumulativeRelativeFrequency: cumRelFreq,
    };
  });
}

function fmt(n: number, digits = 4): string {
  return parseFloat(n.toFixed(digits)).toString();
}

export default function RelativeFrequencyCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.relative-frequency-calculator");
  const [dataInput, setDataInput] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const parsedData = React.useMemo(() => {
    if (!dataInput.trim()) return null;
    return parseData(dataInput);
  }, [dataInput]);

  const rows = React.useMemo<FrequencyRow[] | null>(() => {
    if (!parsedData) return null;
    return computeFrequency(parsedData);
  }, [parsedData]);

  function loadExample(data: string) {
    setDataInput(data);
    setTouched(true);
  }

  function reset() {
    setDataInput("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const showError = touched && parsedData === null && dataInput.trim() !== "";

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
            <Label htmlFor="rfc-data">{t("field.dataSet")}</Label>
            <textarea
              id="rfc-data"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={dataInput}
              placeholder={t("placeholder.dataSet")}
              onChange={(e) => {
                setDataInput(e.target.value);
                setTouched(true);
              }}
            />
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

          {rows !== null && rows.length > 0 && touched && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")} ({t("result.totalLabel")}: {parsedData!.length})
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50">
                      <th className="px-3 py-2 font-semibold">
                        {t("result.colValue")}
                      </th>
                      <th className="px-3 py-2 font-semibold">
                        {t("result.colFrequency")}
                      </th>
                      <th className="px-3 py-2 font-semibold">
                        {t("result.colRelFreq")}
                      </th>
                      <th className="px-3 py-2 font-semibold">
                        {t("result.colRelFreqPct")}
                      </th>
                      <th className="px-3 py-2 font-semibold">
                        {t("result.colCumFreq")}
                      </th>
                      <th className="px-3 py-2 font-semibold">
                        {t("result.colCumRelFreq")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-zinc-100 align-top"
                      >
                        <td className="px-3 py-2 font-medium text-zinc-900">
                          {row.value}
                        </td>
                        <td className="px-3 py-2 text-zinc-800">
                          {row.frequency}
                        </td>
                        <td className="px-3 py-2 text-zinc-800">
                          {fmt(row.relativeFrequency)}
                        </td>
                        <td className="px-3 py-2 text-zinc-800">
                          {fmt(row.relativeFrequency * 100)}%
                        </td>
                        <td className="px-3 py-2 text-zinc-800">
                          {row.cumulativeFrequency}
                        </td>
                        <td className="px-3 py-2 text-zinc-800">
                          {fmt(row.cumulativeRelativeFrequency * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-zinc-500">{t("formula")}</p>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("1, 6, 2, 4, 3, 5, 2, 6, 4, 1, 3, 5, 4, 6, 2, 1, 5, 4, 3, 6")
            }
          >
            {t("examples.loadDice")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("8, 7, 9, 8, 10, 7, 5, 8, 9, 7, 8, 6, 10, 8, 7")
            }
          >
            {t("examples.loadScores")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("5, 4, 5, 3, 2, 4, 5, 1, 3, 5, 4, 4, 2, 5, 4")}
          >
            {t("examples.loadSurvey")}
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
