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

type Mode = "generate" | "findSum" | "analyze";

const MODES: Mode[] = ["generate", "findSum", "analyze"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e8) / 1e8;
  return rounded.toString();
}

export default function ConsecutiveIntegersCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.consecutive-integers-calculator");
  const [mode, setMode] = React.useState<Mode>("generate");
  const [start, setStart] = React.useState<string>("");
  const [count, setCount] = React.useState<string>("");
  const [targetSum, setTargetSum] = React.useState<string>("");
  const [sequenceText, setSequenceText] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<
    | null
    | {
        kind: "ok";
        sequence: number[];
        sum: number;
        average: number;
        count: number;
        start: number;
        consecutive?: boolean;
      }
    | { kind: "noSolution" }
    | { kind: "notConsecutive"; sequence: number[]; sum: number; average: number; count: number }
    | { kind: "invalid"; reason: "invalid" | "countPositive" | "needTwo" }
  >(() => {
    if (mode === "generate") {
      const sFloat = parseFloat(start);
      const cFloat = parseFloat(count);
      const s = Math.floor(sFloat);
      const c = Math.floor(cFloat);
      if (start === "" || count === "" || !Number.isFinite(sFloat) || !Number.isInteger(sFloat) || !Number.isFinite(cFloat) || !Number.isInteger(cFloat)) {
        return { kind: "invalid", reason: "invalid" };
      }
      if (c < 1) return { kind: "invalid", reason: "countPositive" };
      const seq: number[] = [];
      for (let i = 0; i < c; i++) seq.push(s + i);
      const sum = (c * (2 * s + c - 1)) / 2;
      const average = s + (c - 1) / 2;
      return { kind: "ok", sequence: seq, sum, average, count: c, start: s };
    }
    if (mode === "findSum") {
      const T = parseFloat(targetSum);
      const cFloat = parseFloat(count);
      const c = Math.floor(cFloat);
      if (targetSum === "" || count === "" || !Number.isFinite(T) || !Number.isInteger(T) || !Number.isFinite(cFloat) || !Number.isInteger(cFloat)) {
        return { kind: "invalid", reason: "invalid" };
      }
      if (c < 1) return { kind: "invalid", reason: "countPositive" };
      const sFloat = T / c - (c - 1) / 2;
      if (!Number.isInteger(sFloat)) return { kind: "noSolution" };
      const s = sFloat;
      const seq: number[] = [];
      for (let i = 0; i < c; i++) seq.push(s + i);
      const sum = (c * (2 * s + c - 1)) / 2;
      const average = s + (c - 1) / 2;
      return { kind: "ok", sequence: seq, sum, average, count: c, start: s };
    }
    const tokens = sequenceText
      .split(/[,\s]+/)
      .map((x) => x.trim())
      .filter((x) => x !== "");
    if (tokens.length < 2) return { kind: "invalid", reason: "needTwo" };
    const nums: number[] = [];
    for (const tok of tokens) {
      const n = parseInt(tok, 10);
      if (!Number.isInteger(n) || String(n) !== tok.replace(/^\+/, "")) {
        return { kind: "invalid", reason: "invalid" };
      }
      nums.push(n);
    }
    const sorted = [...nums].sort((a, b) => a - b);
    let consecutive = true;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] - sorted[i - 1] !== 1) {
        consecutive = false;
        break;
      }
    }
    const sum = nums.reduce((a, b) => a + b, 0);
    const average = sum / nums.length;
    if (!consecutive) {
      return {
        kind: "notConsecutive",
        sequence: sorted,
        sum,
        average,
        count: nums.length,
      };
    }
    return {
      kind: "ok",
      sequence: sorted,
      sum,
      average,
      count: nums.length,
      start: sorted[0],
      consecutive: true,
    };
  }, [mode, start, count, targetSum, sequenceText]);

  function reset() {
    setStart("");
    setCount("");
    setTargetSum("");
    setSequenceText("");
    setTouched(false);
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
        mainEntity: faqItems.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        })),
      },
    ],
  };

  const showResult = touched && result !== null;

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
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <Button
                key={m}
                type="button"
                variant={mode === m ? "default" : "outline"}
                onClick={() => {
                  setMode(m);
                  setTouched(false);
                }}
              >
                {t(`type.${m}` as never)}
              </Button>
            ))}
          </div>

          {mode === "generate" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ci-start">{t("field.start")}</Label>
                <Input
                  id="ci-start"
                  type="number"
                  inputMode="numeric"
                  step={1}
                  value={start}
                  placeholder={t("placeholder.start")}
                  onChange={(e) => {
                    setStart(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ci-count">{t("field.count")}</Label>
                <Input
                  id="ci-count"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={count}
                  placeholder={t("placeholder.count")}
                  onChange={(e) => {
                    setCount(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

          {mode === "findSum" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ci-target">{t("field.targetSum")}</Label>
                <Input
                  id="ci-target"
                  type="number"
                  inputMode="numeric"
                  step={1}
                  value={targetSum}
                  placeholder={t("placeholder.targetSum")}
                  onChange={(e) => {
                    setTargetSum(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ci-count2">{t("field.count")}</Label>
                <Input
                  id="ci-count2"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={count}
                  placeholder={t("placeholder.count")}
                  onChange={(e) => {
                    setCount(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

          {mode === "analyze" && (
            <div className="space-y-2">
              <Label htmlFor="ci-seq">{t("field.sequence")}</Label>
              <Input
                id="ci-seq"
                type="text"
                value={sequenceText}
                placeholder={t("placeholder.sequence")}
                onChange={(e) => {
                  setSequenceText(e.target.value);
                  setTouched(true);
                }}
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

          {showResult && result && result.kind === "invalid" && (
            <p className="text-sm text-red-600">
              {t(`error.${result.reason}` as never)}
            </p>
          )}
          {showResult && result && result.kind === "noSolution" && (
            <p className="text-sm text-red-600">{t("error.noSolution")}</p>
          )}

          {showResult && result && (result.kind === "ok" || result.kind === "notConsecutive") && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-lg text-zinc-900">
                <span className="font-medium">{t("result.sequence")}:</span>{" "}
                <span className="font-mono">{result.sequence.join(", ")}</span>
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.sum")}: <span className="font-mono">{formatNumber(result.sum)}</span>
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.average")}: <span className="font-mono">{formatNumber(result.average)}</span>
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.count")}: <span className="font-mono">{result.count}</span>
              </div>
              {result.kind === "ok" && "start" in result && (
                <div className="text-sm text-zinc-700">
                  {t("result.start")}: <span className="font-mono">{result.start}</span>
                </div>
              )}
              {mode === "analyze" && (
                <div className="text-sm text-zinc-600">
                  {result.kind === "ok"
                    ? t("result.consecutiveYes")
                    : t("result.consecutiveNo")}
                </div>
              )}
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
          {faqItems.map((qa, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{qa.q}</div>
              <div className="mt-1 text-zinc-700">{qa.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
