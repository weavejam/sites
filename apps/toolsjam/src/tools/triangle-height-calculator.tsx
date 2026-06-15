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

type Method = "fromAreaBase" | "fromThreeSides" | "fromSAS";
const METHODS: Method[] = ["fromAreaBase", "fromThreeSides", "fromSAS"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e8) / 1e8;
  return r.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

function heronArea(a: number, b: number, c: number): number | null {
  const s = (a + b + c) / 2;
  const sq = s * (s - a) * (s - b) * (s - c);
  if (sq < 0) return null;
  return Math.sqrt(sq);
}

function isPositive(...vals: number[]): boolean {
  return vals.every((v) => Number.isFinite(v) && v > 0);
}

export default function TriangleHeightCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.triangle-height-calculator");
  const [method, setMethod] = React.useState<Method>("fromAreaBase");
  const [area, setArea] = React.useState("");
  const [base, setBase] = React.useState("");
  const [sideA, setSideA] = React.useState("");
  const [sideB, setSideB] = React.useState("");
  const [sideC, setSideC] = React.useState("");
  const [angleCDeg, setAngleCDeg] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setArea(""); setBase(""); setSideA(""); setSideB(""); setSideC(""); setAngleCDeg("");
    setTouched(false);
  }

  type ResultType =
    | { kind: "single"; value: number; formula: string }
    | { kind: "triple"; ha: number; hb: number; hc: number; formula: string }
    | { kind: "error"; error: "invalid" | "notTriangle" | "angleRange" | "baseZero" }
    | { kind: "none" };

  const result = React.useMemo<ResultType>(() => {
    if (!touched) return { kind: "none" };

    if (method === "fromAreaBase") {
      const a = parseFloat(area), b = parseFloat(base);
      if (!isPositive(a, b)) return { kind: "error", error: "invalid" };
      return { kind: "single", value: (2 * a) / b, formula: t("result.formulaAreaBase") };
    }

    if (method === "fromThreeSides") {
      const a = parseFloat(sideA), b = parseFloat(sideB), c = parseFloat(sideC);
      if (!isPositive(a, b, c)) return { kind: "error", error: "invalid" };
      if (a + b <= c || a + c <= b || b + c <= a) return { kind: "error", error: "notTriangle" };
      const triArea = heronArea(a, b, c);
      if (triArea === null) return { kind: "error", error: "notTriangle" };
      return {
        kind: "triple",
        ha: (2 * triArea) / a,
        hb: (2 * triArea) / b,
        hc: (2 * triArea) / c,
        formula: t("result.formulaThreeSides"),
      };
    }

    // fromSAS
    const a = parseFloat(sideA), b = parseFloat(sideB), ang = parseFloat(angleCDeg);
    if (!isPositive(a, b) || !Number.isFinite(ang)) return { kind: "error", error: "invalid" };
    if (ang <= 0 || ang >= 180) return { kind: "error", error: "angleRange" };
    return {
      kind: "single",
      value: a * Math.sin((ang * Math.PI) / 180),
      formula: t("result.formulaSAS"),
    };
  }, [touched, method, area, base, sideA, sideB, sideC, angleCDeg, t]);

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
            <Label>{t("method.label")}</Label>
            <div className="flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={method === m ? "default" : "outline"}
                  onClick={() => { setMethod(m); setTouched(false); }}
                >
                  {t(`method.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {method === "fromAreaBase" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="thc-area">{t("field.area")}</Label>
                <Input id="thc-area" type="number" inputMode="decimal" value={area}
                  placeholder={t("placeholder.area")}
                  onChange={(e) => { setArea(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thc-base">{t("field.base")}</Label>
                <Input id="thc-base" type="number" inputMode="decimal" value={base}
                  placeholder={t("placeholder.length")}
                  onChange={(e) => { setBase(e.target.value); setTouched(true); }} />
              </div>
            </div>
          )}

          {method === "fromThreeSides" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="thc-sa">{t("field.sideA")}</Label>
                <Input id="thc-sa" type="number" inputMode="decimal" value={sideA}
                  placeholder={t("placeholder.length")}
                  onChange={(e) => { setSideA(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thc-sb">{t("field.sideB")}</Label>
                <Input id="thc-sb" type="number" inputMode="decimal" value={sideB}
                  placeholder={t("placeholder.length")}
                  onChange={(e) => { setSideB(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thc-sc">{t("field.sideC")}</Label>
                <Input id="thc-sc" type="number" inputMode="decimal" value={sideC}
                  placeholder={t("placeholder.length")}
                  onChange={(e) => { setSideC(e.target.value); setTouched(true); }} />
              </div>
            </div>
          )}

          {method === "fromSAS" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="thc-sa2">{t("field.sideA")}</Label>
                <Input id="thc-sa2" type="number" inputMode="decimal" value={sideA}
                  placeholder={t("placeholder.length")}
                  onChange={(e) => { setSideA(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thc-sb2">{t("field.sideB")}</Label>
                <Input id="thc-sb2" type="number" inputMode="decimal" value={sideB}
                  placeholder={t("placeholder.length")}
                  onChange={(e) => { setSideB(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thc-ang">{t("field.angleCDeg")}</Label>
                <Input id="thc-ang" type="number" inputMode="decimal" value={angleCDeg}
                  placeholder={t("placeholder.angle")}
                  onChange={(e) => { setAngleCDeg(e.target.value); setTouched(true); }} />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {result.kind === "error" && (
            <p className="text-sm text-red-600">{t(`error.${result.error}` as never)}</p>
          )}

          {result.kind === "single" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t("result.single", { result: formatNum(result.value) })}
              </div>
              <div className="mt-2 text-xs text-zinc-500">{result.formula}</div>
            </div>
          )}

          {result.kind === "triple" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-lg font-semibold text-zinc-900">
                {t("result.ha", { ha: formatNum(result.ha) })}
              </div>
              <div className="text-lg font-semibold text-zinc-900">
                {t("result.hb", { hb: formatNum(result.hb) })}
              </div>
              <div className="text-lg font-semibold text-zinc-900">
                {t("result.hc", { hc: formatNum(result.hc) })}
              </div>
              <div className="mt-2 text-xs text-zinc-500">{result.formula}</div>
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
