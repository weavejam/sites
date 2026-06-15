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

type Mode = "proportion" | "simplify";

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b > 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e10) / 1e10).toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}

export default function RatioCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ratio-calculator");

  const [calcMode, setCalcMode] = React.useState<Mode>("proportion");
  const [aStr, setAStr] = React.useState("");
  const [bStr, setBStr] = React.useState("");
  const [cStr, setCStr] = React.useState("");
  const [dStr, setDStr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setAStr(""); setBStr(""); setCStr(""); setDStr("");
    setTouched(false);
  }

  type CalcResult =
    | { kind: "proportion"; unknown: "a" | "b" | "c" | "d"; value: number; a: number; b: number; c: number; d: number }
    | { kind: "simplify"; ra: number; rb: number; a: number; b: number }
    | { kind: "error"; msg: string }
    | null;

  const result = React.useMemo<CalcResult>(() => {
    if (!touched) return null;

    if (calcMode === "simplify") {
      const a = parseFloat(aStr);
      const b = parseFloat(bStr);
      if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return { kind: "error", msg: t("error.invalidInput") };
      }
      if (a === 0 || b === 0) {
        return { kind: "error", msg: t("error.divideByZero") };
      }
      // Handle decimals by scaling to integers
      const scale = Math.max(
        10 ** String(a).replace(/^-?\d*\.?/, "").length,
        10 ** String(b).replace(/^-?\d*\.?/, "").length
      );
      const ai = Math.round(a * scale);
      const bi = Math.round(b * scale);
      const g = gcd(Math.abs(ai), Math.abs(bi));
      return { kind: "simplify", ra: ai / g, rb: bi / g, a, b };
    }

    // Proportion mode: find which field is empty
    const vals = [aStr, bStr, cStr, dStr];
    const emptyIdx = vals.findIndex((v) => v.trim() === "" || v.trim().toLowerCase() === "x");
    const nonEmptyVals = vals.filter((_, i) => i !== emptyIdx).map(parseFloat);

    if (emptyIdx === -1) {
      // All filled — treat last as unknown? Just solve for d
      const a = parseFloat(aStr);
      const b = parseFloat(bStr);
      const c = parseFloat(cStr);
      const d = parseFloat(dStr);
      if ([a, b, c, d].some((v) => !Number.isFinite(v))) {
        return { kind: "error", msg: t("error.invalidInput") };
      }
      return { kind: "proportion", unknown: "d", value: (b * c) / a, a, b, c, d };
    }

    if (nonEmptyVals.some((v) => !Number.isFinite(v))) {
      return { kind: "error", msg: t("error.invalidInput") };
    }

    const [v0, v1, v2] = nonEmptyVals;

    // Cross multiply: a/b = c/d → a*d = b*c
    switch (emptyIdx) {
      case 0: { // solve a: a*d = b*c → a = b*c/d
        if (v2 === 0) return { kind: "error", msg: t("error.divideByZero") };
        const val = (v0 * v1) / v2; // b*c/d
        return { kind: "proportion", unknown: "a", value: val, a: val, b: v0, c: v1, d: v2 };
      }
      case 1: { // solve b: a*d = b*c → b = a*d/c
        if (v1 === 0) return { kind: "error", msg: t("error.divideByZero") };
        const val = (v0 * v2) / v1; // a*d/c
        return { kind: "proportion", unknown: "b", value: val, a: v0, b: val, c: v1, d: v2 };
      }
      case 2: { // solve c: a/b = c/d → c = a*d/b
        if (v1 === 0) return { kind: "error", msg: t("error.divideByZero") };
        const val = (v0 * v2) / v1; // a*d/b
        return { kind: "proportion", unknown: "c", value: val, a: v0, b: v1, c: val, d: v2 };
      }
      case 3: { // solve d: a/b = c/d → d = b*c/a
        if (v0 === 0) return { kind: "error", msg: t("error.divideByZero") };
        const val = (v1 * v2) / v0; // b*c/a
        return { kind: "proportion", unknown: "d", value: val, a: v0, b: v1, c: v2, d: val };
      }
    }
    return { kind: "error", msg: t("error.invalidInput") };
  }, [touched, calcMode, aStr, bStr, cStr, dStr, t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const MODES: Mode[] = ["proportion", "simplify"];

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
            <Label>{t("field.mode")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={calcMode === m ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCalcMode(m);
                    setTouched(false);
                  }}
                >
                  {t(`mode.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {calcMode === "proportion" ? (
            <div className="space-y-3">
              <p className="text-sm text-zinc-500">
                {t("field.a")} : {t("field.b")} = {t("field.c")} : {t("field.d")}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(
                  [
                    [t("field.a"), aStr, setAStr],
                    [t("field.b"), bStr, setBStr],
                    [t("field.c"), cStr, setCStr],
                    [t("field.d"), dStr, setDStr],
                  ] as [string, string, (v: string) => void][]
                ).map(([label, val, setter]) => (
                  <div key={label} className="space-y-1">
                    <Label htmlFor={`ratio-${label}`}>{label}</Label>
                    <Input
                      id={`ratio-${label}`}
                      type="text"
                      inputMode="decimal"
                      value={val}
                      placeholder={t("placeholder.x")}
                      onChange={(e) => {
                        setter(e.target.value);
                        setTouched(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="ratio-a">{t("field.a")}</Label>
                  <Input
                    id="ratio-a"
                    type="number"
                    inputMode="decimal"
                    value={aStr}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setAStr(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="ratio-b">{t("field.b")}</Label>
                  <Input
                    id="ratio-b"
                    type="number"
                    inputMode="decimal"
                    value={bStr}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setBStr(e.target.value); setTouched(true); }}
                  />
                </div>
              </div>
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

          {result && result.kind === "error" && (
            <p className="text-sm text-red-600">{result.msg}</p>
          )}

          {result && result.kind === "proportion" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-xl font-semibold text-zinc-900 font-mono">
                {t("result.proportion", { value: fmt(result.value) })}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.check", {
                  a: fmt(result.a),
                  b: fmt(result.b),
                  c: fmt(result.c),
                  d: fmt(result.d),
                })}
              </div>
            </div>
          )}

          {result && result.kind === "simplify" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-xl font-semibold text-zinc-900 font-mono">
                {t("result.simplify", {
                  a: fmt(result.a),
                  b: fmt(result.b),
                  ra: result.ra,
                  rb: result.rb,
                })}
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
