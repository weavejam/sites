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

const DEFAULT_MAX_STEPS = 10000;
const MAX_VISIBLE_TERMS = 50;

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface CollatzResult {
  start: number;
  limit: number;
  sequence: number[];
  totalSteps: number;
  maxValue: number;
  sequenceLength: number;
  completed: boolean;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function generateCollatzSequence(start: number, maxSteps: number): CollatzResult {
  const sequence = [start];
  let current = start;
  let totalSteps = 0;
  let maxValue = start;

  while (current !== 1 && totalSteps < maxSteps) {
    current = current % 2 === 0 ? current / 2 : current * 3 + 1;
    sequence.push(current);
    maxValue = Math.max(maxValue, current);
    totalSteps += 1;
  }

  return {
    start,
    limit: maxSteps,
    sequence,
    totalSteps,
    maxValue,
    sequenceLength: sequence.length,
    completed: current === 1,
  };
}

export default function CollatzConjectureCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.collatz-conjecture-calculator");
  const [startingNumber, setStartingNumber] = React.useState("");
  const [maxSteps, setMaxSteps] = React.useState(String(DEFAULT_MAX_STEPS));
  const [touched, setTouched] = React.useState(false);

  const howtoSteps: string[] = React.useMemo(
    () => (t.raw("howto.steps") as string[] | undefined) ?? [],
    [t]
  );

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems: ExampleItem[] = React.useMemo(
    () => (t.raw("examples.items") as ExampleItem[] | undefined) ?? [],
    [t]
  );

  const result = React.useMemo(() => {
    if (!touched) return null;

    const start = Number(startingNumber);
    const limitValue = maxSteps.trim() === "" ? DEFAULT_MAX_STEPS : Number(maxSteps);

    if (
      !Number.isInteger(start) ||
      start <= 0 ||
      start > 1_000_000_000
    ) {
      return { error: "invalidStartingNumber" as const };
    }

    if (
      !Number.isInteger(limitValue) ||
      limitValue <= 0 ||
      limitValue > 100_000
    ) {
      return { error: "invalidMaxSteps" as const };
    }

    return generateCollatzSequence(start, limitValue);
  }, [startingNumber, maxSteps, touched]);

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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  function reset() {
    setStartingNumber("");
    setMaxSteps(String(DEFAULT_MAX_STEPS));
    setTouched(false);
  }

  function loadExample(start: string, limit = String(DEFAULT_MAX_STEPS)) {
    setStartingNumber(start);
    setMaxSteps(limit);
    setTouched(true);
  }

  const shownSequence =
    result && !("error" in result) ? result.sequence.slice(0, MAX_VISIBLE_TERMS) : [];
  const remainingTerms =
    result && !("error" in result)
      ? Math.max(result.sequence.length - MAX_VISIBLE_TERMS, 0)
      : 0;

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="collatz-start">{t("field.startingNumber")}</Label>
              <Input
                id="collatz-start"
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={startingNumber}
                placeholder={t("placeholder.startingNumber")}
                onChange={(event) => {
                  setStartingNumber(event.target.value);
                  setTouched(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collatz-limit">{t("field.maxSteps")}</Label>
              <Input
                id="collatz-limit"
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={maxSteps}
                placeholder={t("placeholder.maxSteps")}
                onChange={(event) => {
                  setMaxSteps(event.target.value);
                  setTouched(false);
                }}
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
          </div>

          {result && "error" in result && result.error === "invalidStartingNumber" && (
            <p className="text-sm text-red-600">{t("error.invalidStartingNumber")}</p>
          )}
          {result && "error" in result && result.error === "invalidMaxSteps" && (
            <p className="text-sm text-red-600">{t("error.invalidMaxSteps")}</p>
          )}

          {result && !("error" in result) && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-500">
                  {t("result.heading")}
                </div>
                <div className="text-xl font-semibold text-zinc-900">
                  {result.completed
                    ? t("result.summaryComplete", {
                        start: formatNumber(result.start),
                        steps: formatNumber(result.totalSteps),
                      })
                    : t("result.summaryLimit", {
                        start: formatNumber(result.start),
                        steps: formatNumber(result.totalSteps),
                        maxSteps: formatNumber(result.limit),
                      })}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-sm text-zinc-500">{t("result.totalSteps")}</div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {formatNumber(result.totalSteps)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-sm text-zinc-500">{t("result.maxValue")}</div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {formatNumber(result.maxValue)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-sm text-zinc-500">
                      {t("result.sequenceLength")}
                    </div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {formatNumber(result.sequenceLength)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-zinc-700">
                  {t("result.sequence")}
                </div>
                <div className="max-h-40 overflow-y-auto rounded-lg border border-zinc-200 bg-white p-3 font-mono text-sm text-zinc-800">
                  {shownSequence.map((value) => formatNumber(value)).join(", ")}
                  {remainingTerms > 0
                    ? `, ${t("result.moreNumbers", {
                        count: formatNumber(remainingTerms),
                      })}`
                    : ""}
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("27")}>
            {t("examples.load27")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("7")}>
            {t("examples.load7")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("64")}>
            {t("examples.load64")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
