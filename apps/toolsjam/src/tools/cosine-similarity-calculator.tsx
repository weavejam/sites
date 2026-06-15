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

function parseVector(raw: string): number[] | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(/[\s,]+/);
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
}

function magnitude(v: number[]): number {
  return Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
}

function fmt(n: number, decimals = 6): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toString();
}

export default function CosineSimilarityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.cosine-similarity-calculator");
  const [vecA, setVecA] = React.useState("");
  const [vecB, setVecB] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  type CalcResult =
    | { kind: "ok"; similarity: number; dp: number; magA: number; magB: number }
    | { kind: "error"; type: "invalid" | "dimension" | "zeroVector" };

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched) return null;
    const a = parseVector(vecA);
    const b = parseVector(vecB);
    if (!a || !b) return { kind: "error", type: "invalid" };
    if (a.length !== b.length) return { kind: "error", type: "dimension" };
    const magA = magnitude(a);
    const magB = magnitude(b);
    if (magA === 0 || magB === 0) return { kind: "error", type: "zeroVector" };
    const dp = dotProduct(a, b);
    return { kind: "ok", similarity: dp / (magA * magB), dp, magA, magB };
  }, [touched, vecA, vecB]);

  function loadExample(a: string, b: string) {
    setVecA(a);
    setVecB(b);
    setTouched(true);
  }

  function reset() {
    setVecA("");
    setVecB("");
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="csc-a">{t("field.vectorA")}</Label>
              <Input
                id="csc-a"
                value={vecA}
                placeholder={t("placeholder.vector")}
                onChange={(e) => {
                  setVecA(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.hint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="csc-b">{t("field.vectorB")}</Label>
              <Input
                id="csc-b"
                value={vecB}
                placeholder={t("placeholder.vector")}
                onChange={(e) => {
                  setVecB(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.hint")}</p>
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

          {result?.kind === "error" && result.type === "invalid" && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {result?.kind === "error" && result.type === "dimension" && (
            <p className="text-sm text-red-600">{t("error.dimensionMismatch")}</p>
          )}
          {result?.kind === "error" && result.type === "zeroVector" && (
            <p className="text-sm text-red-600">{t("error.zeroVector")}</p>
          )}

          {result?.kind === "ok" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {fmt(result.similarity)}
              </div>
              <div className="grid grid-cols-1 gap-1 text-sm text-zinc-600 sm:grid-cols-3">
                <span>
                  {t("result.dotProduct")}: {fmt(result.dp)}
                </span>
                <span>
                  {t("result.magnitudeA")}: {fmt(result.magA)}
                </span>
                <span>
                  {t("result.magnitudeB")}: {fmt(result.magB)}
                </span>
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
            onClick={() => loadExample("1, 0, 0", "1, 0, 0")}
          >
            {t("examples.loadIdentical")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1, 0", "0, 1")}
          >
            {t("examples.loadOrthogonal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("3, 4, 5", "6, 8, 10")}
          >
            {t("examples.loadParallel")}
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
