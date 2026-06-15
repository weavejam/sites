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

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e6) / 1e6;
  return r.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function isPositive(...vals: number[]): boolean {
  return vals.every((v) => Number.isFinite(v) && v > 0);
}

export default function TriangularPrismCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.triangular-prism-calculator");
  const [sideA, setSideA] = React.useState("");
  const [sideB, setSideB] = React.useState("");
  const [sideC, setSideC] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setSideA(""); setSideB(""); setSideC(""); setHeight("");
    setTouched(false);
  }

  type Result =
    | {
        kind: "ok";
        baseArea: number;
        volume: number;
        lateralArea: number;
        totalArea: number;
      }
    | { kind: "error"; error: "invalid" | "notTriangle" }
    | { kind: "none" };

  const result = React.useMemo<Result>(() => {
    if (!touched) return { kind: "none" };
    const a = parseFloat(sideA), b = parseFloat(sideB), c = parseFloat(sideC), h = parseFloat(height);
    if (!isPositive(a, b, c, h)) return { kind: "error", error: "invalid" };
    if (a + b <= c || a + c <= b || b + c <= a) return { kind: "error", error: "notTriangle" };

    const s = (a + b + c) / 2;
    const baseArea = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const volume = baseArea * h;
    const lateralArea = (a + b + c) * h;
    const totalArea = lateralArea + 2 * baseArea;

    return { kind: "ok", baseArea, volume, lateralArea, totalArea };
  }, [touched, sideA, sideB, sideC, height]);

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tpc-a">{t("field.sideA")}</Label>
              <Input id="tpc-a" type="number" inputMode="decimal" value={sideA}
                placeholder={t("placeholder.length")}
                onChange={(e) => { setSideA(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tpc-b">{t("field.sideB")}</Label>
              <Input id="tpc-b" type="number" inputMode="decimal" value={sideB}
                placeholder={t("placeholder.length")}
                onChange={(e) => { setSideB(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tpc-c">{t("field.sideC")}</Label>
              <Input id="tpc-c" type="number" inputMode="decimal" value={sideC}
                placeholder={t("placeholder.length")}
                onChange={(e) => { setSideC(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tpc-h">{t("field.height")}</Label>
              <Input id="tpc-h" type="number" inputMode="decimal" value={height}
                placeholder={t("placeholder.length")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {result.kind === "error" && (
            <p className="text-sm text-red-600">{t(`error.${result.error}` as never)}</p>
          )}

          {result.kind === "ok" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-sm text-zinc-500">{t("result.baseArea")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t("result.baseAreaValue", { value: formatNum(result.baseArea) })}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.volume")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t("result.volumeValue", { value: formatNum(result.volume) })}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.lateralArea")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t("result.lateralAreaValue", { value: formatNum(result.lateralArea) })}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("result.totalArea")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t("result.totalAreaValue", { value: formatNum(result.totalArea) })}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("result.formulas")}</div>
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
