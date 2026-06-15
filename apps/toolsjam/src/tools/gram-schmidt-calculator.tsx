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

function dot(a: number[], b: number[]): number {
  return a.reduce((s, v, i) => s + v * b[i], 0);
}

function scale(a: number[], s: number): number[] {
  return a.map((v) => v * s);
}

function subtract(a: number[], b: number[]): number[] {
  return a.map((v, i) => v - b[i]);
}

function norm(a: number[]): number {
  return Math.sqrt(dot(a, a));
}

function gramSchmidt(vecs: number[][]): {
  orthogonal: number[][];
  orthonormal: number[][];
  rank: number;
} {
  const orthogonal: number[][] = [];
  const orthonormal: number[][] = [];

  for (const v of vecs) {
    let u = [...v];
    for (const q of orthonormal) {
      const proj = dot(u, q);
      u = subtract(u, scale(q, proj));
    }
    const n = norm(u);
    if (n < 1e-10) continue;
    orthogonal.push(u);
    orthonormal.push(scale(u, 1 / n));
  }

  return { orthogonal, orthonormal, rank: orthogonal.length };
}

function parseVectors(text: string): number[][] | null {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return null;

  const vecs: number[][] = [];
  let dim: number | null = null;

  for (const line of lines) {
    const parts = line.split(/[\s,]+/).filter((p) => p.length > 0);
    const nums = parts.map(Number);
    if (nums.some(Number.isNaN)) return null;
    if (dim === null) dim = nums.length;
    else if (nums.length !== dim) return null;
    vecs.push(nums);
  }

  return vecs;
}

function fmt(n: number): string {
  const r = Math.round(n * 10000) / 10000;
  return r.toString();
}

function vecStr(v: number[]): string {
  return "(" + v.map(fmt).join(", ") + ")";
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function GramSchmidtCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.gram-schmidt-calculator");

  const [input, setInput] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched || !input.trim()) return null;
    const vecs = parseVectors(input);
    if (!vecs) return { error: "invalid" as const };
    if (vecs.length === 0) return { error: "empty" as const };
    return gramSchmidt(vecs);
  }, [touched, input]);

  const errorKey =
    result && "error" in result ? result.error : null;

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

  function loadExample(vectors: string) {
    setInput(vectors);
    setTouched(true);
  }

  function reset() {
    setInput("");
    setTouched(false);
  }

  const goodResult =
    result && !("error" in result) ? result : null;

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
            <Label htmlFor="gs-vectors">{t("field.vectors")}</Label>
            <textarea
              id="gs-vectors"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 min-h-[120px] font-mono"
              placeholder={t("field.vectorsPlaceholder")}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
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

          {errorKey && (
            <p className="text-sm text-red-600">{t(`error.${errorKey}` as never)}</p>
          )}

          {goodResult && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
                <div className="text-sm font-medium text-zinc-500">
                  {t("result.heading")}
                </div>
                <p className="text-xs text-zinc-500">
                  {t("result.rank", {
                    rank: goodResult.rank,
                    count: parseVectors(input)?.length ?? 0,
                  })}
                </p>

                <div>
                  <div className="font-semibold text-zinc-800 mb-1">
                    {t("result.orthogonal")}
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 font-mono text-sm">
                    {goodResult.orthogonal.map((v, i) => (
                      <li key={i}>{vecStr(v)}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <div className="font-semibold text-zinc-800 mb-1">
                    {t("result.orthonormal")}
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 font-mono text-sm">
                    {goodResult.orthonormal.map((v, i) => (
                      <li key={i}>{vecStr(v)}</li>
                    ))}
                  </ol>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1, 0\n1, 1")}
          >
            {t("examples.load2d")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1, 1, 0\n1, 0, 1\n0, 1, 1")}
          >
            {t("examples.load3d")}
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
