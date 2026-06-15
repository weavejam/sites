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

type Mode = "findNth" | "checkIfTriangular" | "generateSequence";
const MODES: Mode[] = ["findNth", "checkIfTriangular", "generateSequence"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function triangularNumber(n: number): number {
  return (n * (n + 1)) / 2;
}

function isTriangular(x: number): number | null {
  const n = (-1 + Math.sqrt(1 + 8 * x)) / 2;
  const rounded = Math.round(n);
  if (Math.abs(rounded - n) < 1e-9 && rounded > 0) return rounded;
  return null;
}

export default function TriangularNumbersCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.triangular-numbers-calculator");
  const [mode, setMode] = React.useState<Mode>("findNth");
  const [nValue, setNValue] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [count, setCount] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setNValue(""); setNumber(""); setCount("");
    setTouched(false);
  }

  type Result =
    | { kind: "nth"; n: number; value: number }
    | { kind: "isTriangular"; x: number; n: number }
    | { kind: "notTriangular"; x: number }
    | { kind: "sequence"; terms: number[]; count: number }
    | { kind: "error" }
    | { kind: "none" };

  const result = React.useMemo<Result>(() => {
    if (!touched) return { kind: "none" };

    if (mode === "findNth") {
      const nRaw = parseFloat(nValue);
      if (!Number.isFinite(nRaw) || !Number.isInteger(nRaw) || nRaw <= 0 || nRaw > 10000) return { kind: "error" };
      const n = nRaw;
      return { kind: "nth", n, value: triangularNumber(n) };
    }

    if (mode === "checkIfTriangular") {
      const xRaw = parseFloat(number);
      if (!Number.isFinite(xRaw) || !Number.isInteger(xRaw) || xRaw <= 0 || xRaw > 100000000) return { kind: "error" };
      const x = xRaw;
      const n = isTriangular(x);
      if (n !== null) return { kind: "isTriangular", x, n };
      return { kind: "notTriangular", x };
    }

    // generateSequence
    const cRaw = parseFloat(count);
    if (!Number.isFinite(cRaw) || !Number.isInteger(cRaw) || cRaw <= 0 || cRaw > 10000) return { kind: "error" };
    const c = cRaw;
    const terms = Array.from({ length: c }, (_, i) => triangularNumber(i + 1));
    return { kind: "sequence", terms, count: c };
  }, [touched, mode, nValue, number, count]);

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
            <Label>{t("mode.label")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => { setMode(m); setTouched(false); }}
                >
                  {t(`mode.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {mode === "findNth" && (
            <div className="max-w-xs space-y-2">
              <Label htmlFor="tnc-n">{t("field.n")}</Label>
              <Input id="tnc-n" type="number" inputMode="numeric" value={nValue}
                placeholder={t("placeholder.n")}
                onChange={(e) => { setNValue(e.target.value); setTouched(true); }} />
            </div>
          )}

          {mode === "checkIfTriangular" && (
            <div className="max-w-xs space-y-2">
              <Label htmlFor="tnc-num">{t("field.number")}</Label>
              <Input id="tnc-num" type="number" inputMode="numeric" value={number}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setNumber(e.target.value); setTouched(true); }} />
            </div>
          )}

          {mode === "generateSequence" && (
            <div className="max-w-xs space-y-2">
              <Label htmlFor="tnc-count">{t("field.count")}</Label>
              <Input id="tnc-count" type="number" inputMode="numeric" value={count}
                placeholder={t("placeholder.count")}
                onChange={(e) => { setCount(e.target.value); setTouched(true); }} />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {result.kind === "error" && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result.kind === "nth" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t("result.nthValue", { n: result.n, value: result.value })}
              </div>
            </div>
          )}

          {result.kind === "isTriangular" && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-2xl font-semibold text-green-700">
                {t("result.isTriangular", { number: result.x, n: result.n })}
              </div>
            </div>
          )}

          {result.kind === "notTriangular" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t("result.notTriangular", { number: result.x })}
              </div>
            </div>
          )}

          {result.kind === "sequence" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.sequence", { count: result.count })}
              </div>
              <div className="mt-2 text-zinc-900 font-mono text-sm break-all">
                {result.terms.join(", ")}
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
