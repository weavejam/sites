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

// findConditional: given P(A), P(B), find P(A|B) = P(A∩B)/P(B) — requires P(A∩B) input too
// We model three modes:
// 1. findConditional: find P(A|B) given P(A∩B) and P(B)
// 2. findJoint: find P(A∩B) given P(A|B) and P(B)
// 3. findMarginal: find P(B) given P(A|B) and P(A∩B)

type Mode = "findConditional" | "findJoint" | "findMarginal";

const MODES: Mode[] = ["findConditional", "findJoint", "findMarginal"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number, decimals = 6): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return parseFloat(rounded.toFixed(decimals)).toString();
}

export default function ConditionalProbabilityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.conditional-probability-calculator");
  const [mode, setMode] = React.useState<Mode>("findConditional");
  const [pAB, setPAB] = React.useState<string>("");
  const [pB, setPB] = React.useState<string>("");
  const [pAgivenB, setPAgivenB] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setPAB("");
    setPB("");
    setPAgivenB("");
    setTouched(false);
  }

  const result = React.useMemo<{ label: string; value: number } | null>(() => {
    if (mode === "findConditional") {
      const ab = parseFloat(pAB);
      const b = parseFloat(pB);
      if (!Number.isFinite(ab) || !Number.isFinite(b) || b === 0) return null;
      if (ab < 0 || ab > 1 || b < 0 || b > 1) return null;
      return { label: "P(A|B)", value: ab / b };
    }
    if (mode === "findJoint") {
      const aGivenB = parseFloat(pAgivenB);
      const b = parseFloat(pB);
      if (!Number.isFinite(aGivenB) || !Number.isFinite(b)) return null;
      if (aGivenB < 0 || aGivenB > 1 || b < 0 || b > 1) return null;
      return { label: "P(A∩B)", value: aGivenB * b };
    }
    if (mode === "findMarginal") {
      const aGivenB = parseFloat(pAgivenB);
      const ab = parseFloat(pAB);
      if (!Number.isFinite(aGivenB) || !Number.isFinite(ab) || aGivenB === 0) return null;
      if (aGivenB < 0 || aGivenB > 1 || ab < 0 || ab > 1) return null;
      return { label: "P(B)", value: ab / aGivenB };
    }
    return null;
  }, [mode, pAB, pB, pAgivenB]);

  const showError = touched && result === null;

  function loadExample(m: Mode, ab: string, b: string, aGivenB: string) {
    setMode(m);
    setPAB(ab);
    setPB(b);
    setPAgivenB(aGivenB);
    setTouched(true);
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
          <div className="space-y-2">
            <Label>{t("field.mode")}</Label>
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
            <p className="text-sm text-zinc-500">
              {t(`type.${mode}_desc` as never)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(mode === "findConditional" || mode === "findMarginal") && (
              <div className="space-y-2">
                <Label htmlFor="cp-ab">{t("field.pAB")}</Label>
                <Input
                  id="cp-ab"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="1"
                  step="0.01"
                  value={pAB}
                  placeholder={t("placeholder.prob")}
                  onChange={(e) => { setPAB(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            {(mode === "findConditional" || mode === "findJoint") && (
              <div className="space-y-2">
                <Label htmlFor="cp-b">{t("field.pB")}</Label>
                <Input
                  id="cp-b"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="1"
                  step="0.01"
                  value={pB}
                  placeholder={t("placeholder.prob")}
                  onChange={(e) => { setPB(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            {(mode === "findJoint" || mode === "findMarginal") && (
              <div className="space-y-2">
                <Label htmlFor="cp-agivenb">{t("field.pAgivenB")}</Label>
                <Input
                  id="cp-agivenb"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="1"
                  step="0.01"
                  value={pAgivenB}
                  placeholder={t("placeholder.prob")}
                  onChange={(e) => { setPAgivenB(e.target.value); setTouched(true); }}
                />
              </div>
            )}
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

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {result.label} = {fmt(result.value)}
              </div>
              {result.value > 1 && (
                <p className="mt-2 text-xs text-amber-600">{t("result.warn")}</p>
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("findConditional", "0.005", "0.05", "")}>
            {t("examples.loadMedical")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("findConditional", "0.18", "0.6", "")}>
            {t("examples.loadWeather")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("findJoint", "", "0.15", "0.02")}>
            {t("examples.loadQuality")}
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
