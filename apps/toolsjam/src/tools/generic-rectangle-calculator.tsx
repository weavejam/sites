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

interface Term {
  coeff: number;
  exp: number;
}

function parsePoly(expr: string): Term[] | null {
  // Parse simple polynomial like "2x^2 + 3x - 5" or "x + 4"
  const str = expr.replace(/\s+/g, "").replace(/-/g, "+-");
  const parts = str.split("+").filter((p) => p !== "");
  const terms: Term[] = [];

  for (const part of parts) {
    if (!part) continue;
    const match = part.match(/^([+-]?\d*\.?\d*)x\^?(\d*)$|^([+-]?\d*\.?\d*)x$|^([+-]?\d+\.?\d*)$/);
    if (!match) return null;
    if (match[1] !== undefined && match[2] !== undefined && part.includes("x")) {
      // ax^n
      const coeff = match[1] === "" || match[1] === "+" ? 1 : match[1] === "-" ? -1 : parseFloat(match[1]);
      const exp = match[2] === "" ? 1 : parseInt(match[2], 10);
      if (!Number.isFinite(coeff)) return null;
      terms.push({ coeff, exp });
    } else if (match[3] !== undefined && part.includes("x")) {
      // ax (no explicit exponent)
      const coeff = match[3] === "" || match[3] === "+" ? 1 : match[3] === "-" ? -1 : parseFloat(match[3]);
      if (!Number.isFinite(coeff)) return null;
      terms.push({ coeff, exp: 1 });
    } else if (match[4] !== undefined) {
      // constant
      const coeff = parseFloat(match[4]);
      if (!Number.isFinite(coeff)) return null;
      terms.push({ coeff, exp: 0 });
    } else {
      return null;
    }
  }
  return terms.length > 0 ? terms : null;
}

function multiplyTerms(a: Term, b: Term): Term {
  return { coeff: a.coeff * b.coeff, exp: a.exp + b.exp };
}

function collectTerms(terms: Term[]): Term[] {
  const map = new Map<number, number>();
  for (const t of terms) {
    map.set(t.exp, (map.get(t.exp) ?? 0) + t.coeff);
  }
  return Array.from(map.entries())
    .filter(([, c]) => Math.abs(c) > 1e-12)
    .map(([exp, coeff]) => ({ coeff, exp }))
    .sort((a, b) => b.exp - a.exp);
}

function termToString(t: Term, isFirst: boolean): string {
  const { coeff, exp } = t;
  const sign = coeff < 0 ? "-" : isFirst ? "" : "+";
  const abs = Math.abs(coeff);
  const coeffStr = abs === 1 && exp > 0 ? "" : abs === Math.round(abs) ? abs.toString() : abs.toFixed(4).replace(/\.?0+$/, "");
  const varStr = exp === 0 ? "" : exp === 1 ? "x" : `x^${exp}`;
  return `${isFirst ? "" : " "}${sign}${coeffStr}${varStr}`;
}

function polyToString(terms: Term[]): string {
  if (terms.length === 0) return "0";
  return terms.map((t, i) => termToString(t, i === 0)).join("");
}

function cellTermToString(t: Term): string {
  const { coeff, exp } = t;
  const abs = Math.abs(coeff);
  const sign = coeff < 0 ? "-" : "";
  const coeffStr = abs === 1 && exp > 0 ? "" : abs === Math.round(abs) ? abs.toString() : abs.toFixed(2).replace(/\.?0+$/, "");
  const varStr = exp === 0 ? "" : exp === 1 ? "x" : `x^${exp}`;
  return `${sign}${coeffStr}${varStr}`;
}

export default function GenericRectangleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.generic-rectangle-calculator");
  const [expr1, setExpr1] = React.useState<string>("");
  const [expr2, setExpr2] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);
  const [error, setError] = React.useState<string>("");

  const [poly1, poly2] = React.useMemo(() => {
    return [
      expr1.trim() ? parsePoly(expr1) : null,
      expr2.trim() ? parsePoly(expr2) : null,
    ];
  }, [expr1, expr2]);

  const result = React.useMemo(() => {
    if (!poly1 || !poly2) return null;
    const cells: Term[][] = poly1.map((a) => poly2.map((b) => multiplyTerms(a, b)));
    const allTerms = cells.flat();
    const product = collectTerms(allTerms);
    return { cells, product };
  }, [poly1, poly2]);

  function calculate() {
    setTouched(true);
    if (!poly1 || !poly2) {
      setError(t("error.invalid"));
    } else {
      setError("");
    }
  }

  function reset() {
    setExpr1("");
    setExpr2("");
    setTouched(false);
    setError("");
  }

  function loadExample(e1: string, e2: string) {
    setExpr1(e1);
    setExpr2(e2);
    setTouched(true);
    setError("");
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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
              <Label htmlFor="gr-expr1">{t("field.poly1")}</Label>
              <Input
                id="gr-expr1"
                type="text"
                value={expr1}
                placeholder={t("placeholder.poly1")}
                onChange={(e) => { setExpr1(e.target.value); setTouched(false); setError(""); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gr-expr2">{t("field.poly2")}</Label>
              <Input
                id="gr-expr2"
                type="text"
                value={expr2}
                placeholder={t("placeholder.poly2")}
                onChange={(e) => { setExpr2(e.target.value); setTouched(false); setError(""); }}
              />
            </div>
          </div>
          <p className="text-xs text-zinc-500">{t("field.hint")}</p>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.multiply")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("x + 3", "x + 2")}>
              {t("button.example1")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("2x + 1", "3x - 4")}>
              {t("button.example2")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("x^2 + 2x + 1", "x + 1")}>
              {t("button.example3")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {result !== null && touched && !error && poly1 && poly2 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500 mb-1">
                  {t("result.product")}
                </div>
                <div className="text-xl font-semibold text-zinc-900">
                  ({polyToString(poly1)})({polyToString(poly2)}) = {polyToString(result.product)}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-zinc-500 mb-2">
                  {t("result.boxLabel")}
                </div>
                <div className="overflow-x-auto">
                  <table className="border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className="w-8 border border-zinc-300 bg-zinc-50 px-2 py-1" />
                        {poly2.map((b, j) => (
                          <th key={j} className="border border-zinc-300 bg-zinc-100 px-3 py-1 text-center font-mono">
                            {cellTermToString(b)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {poly1.map((a, i) => (
                        <tr key={i}>
                          <th className="border border-zinc-300 bg-zinc-100 px-3 py-1 text-center font-mono">
                            {cellTermToString(a)}
                          </th>
                          {result.cells[i].map((cell, j) => (
                            <td key={j} className="border border-zinc-300 px-3 py-2 text-center font-mono">
                              {cellTermToString(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
