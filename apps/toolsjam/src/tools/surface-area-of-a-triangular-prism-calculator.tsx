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

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function calcTriangularPrismSA(
  a: number,
  b: number,
  c: number,
  l: number
): { baseArea: number; lateralArea: number; totalArea: number } | null {
  if (
    !Number.isFinite(a) || a <= 0 ||
    !Number.isFinite(b) || b <= 0 ||
    !Number.isFinite(c) || c <= 0 ||
    !Number.isFinite(l) || l <= 0
  )
    return null;

  // Triangle inequality check
  if (a + b <= c || a + c <= b || b + c <= a) return null;

  // Heron's formula for base triangle area
  const s = (a + b + c) / 2;
  const area2 = s * (s - a) * (s - b) * (s - c);
  if (area2 <= 0) return null;
  const baseArea = Math.sqrt(area2);

  const perimeter = a + b + c;
  const lateralArea = perimeter * l;
  const totalArea = 2 * baseArea + lateralArea;

  return { baseArea, lateralArea, totalArea };
}

export default function SurfaceAreaOfTriangularPrismCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.surface-area-of-a-triangular-prism-calculator");
  const [sideA, setSideA] = React.useState("");
  const [sideB, setSideB] = React.useState("");
  const [sideC, setSideC] = React.useState("");
  const [length, setLength] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const a = parseFloat(sideA);
  const b = parseFloat(sideB);
  const c = parseFloat(sideC);
  const l = parseFloat(length);

  const result = React.useMemo(() => {
    if (!touched) return null;
    return calcTriangularPrismSA(a, b, c, l);
  }, [touched, a, b, c, l]);

  function loadExample(sa: string, sb: string, sc: string, sl: string) {
    setSideA(sa);
    setSideB(sb);
    setSideC(sc);
    setLength(sl);
    setTouched(true);
  }

  function reset() {
    setSideA("");
    setSideB("");
    setSideC("");
    setLength("");
    setTouched(false);
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

  const showError = touched && result === null;

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
              <Label htmlFor="tp-a">{t("field.sideA")}</Label>
              <Input
                id="tp-a"
                type="number"
                inputMode="decimal"
                value={sideA}
                placeholder={t("placeholder.positive")}
                onChange={(e) => {
                  setSideA(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tp-b">{t("field.sideB")}</Label>
              <Input
                id="tp-b"
                type="number"
                inputMode="decimal"
                value={sideB}
                placeholder={t("placeholder.positive")}
                onChange={(e) => {
                  setSideB(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tp-c">{t("field.sideC")}</Label>
              <Input
                id="tp-c"
                type="number"
                inputMode="decimal"
                value={sideC}
                placeholder={t("placeholder.positive")}
                onChange={(e) => {
                  setSideC(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tp-l">{t("field.length")}</Label>
              <Input
                id="tp-l"
                type="number"
                inputMode="decimal"
                value={length}
                placeholder={t("placeholder.positive")}
                onChange={(e) => {
                  setLength(e.target.value);
                  setTouched(true);
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.baseArea")}</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    {formatNumber(2 * result.baseArea)}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{t("result.formulaBase")}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.lateralArea")}</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    {formatNumber(result.lateralArea)}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{t("result.formulaLateral")}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.totalArea")}</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    {formatNumber(result.totalArea)}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{t("result.formulaTotal")}</div>
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
            onClick={() => loadExample("10", "10", "10", "20")}
          >
            {t("examples.loadEquilateral")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("3", "4", "5", "15")}
          >
            {t("examples.loadRight")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("8", "8", "6", "12")}
          >
            {t("examples.loadIsosceles")}
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
