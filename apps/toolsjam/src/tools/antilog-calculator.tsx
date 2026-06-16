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

type BasePreset = "base10" | "baseE" | "base2" | "custom";

const PRESETS: { key: BasePreset; value: string }[] = [
  { key: "base10", value: "10" },
  { key: "baseE", value: String(Math.E) },
  { key: "base2", value: "2" },
  { key: "custom", value: "" },
];

function formatResult(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 1e-10 && n !== 0) return n.toExponential(6);
  if (Math.abs(n) > 1e12) return n.toExponential(6);
  return (Math.round(n * 1e10) / 1e10).toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}

export default function AntilogCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.antilog-calculator");

  const [preset, setPreset] = React.useState<BasePreset>("base10");
  const [base, setBase] = React.useState("10");
  const [logValue, setLogValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<number | null>(null);

  function selectPreset(p: BasePreset) {
    setPreset(p);
    const found = PRESETS.find((x) => x.key === p);
    if (found && found.value !== "") setBase(found.value);
    setResult(null);
    setError("");
  }

  function reset() {
    setBase("10");
    setPreset("base10");
    setLogValue("");
    setError("");
    setResult(null);
  }

  function calculate() {
    setError(""); setResult(null);

    const b = parseFloat(base);
    const y = parseFloat(logValue);

    if (!Number.isFinite(b) || b <= 0 || b === 1) {
      setError(t("error.invalidBase"));
      return;
    }
    if (!Number.isFinite(y)) {
      setError(t("error.invalidValue"));
      return;
    }

    const r = Math.pow(b, y);
    if (!Number.isFinite(r)) {
      setError(t("error.overflow"));
      return;
    }
    setResult(r);
  }

  const verificationLog = React.useMemo(() => {
    if (result === null || result <= 0) return null;
    const b = parseFloat(base);
    if (!Number.isFinite(b) || b <= 0 || b === 1) return null;
    return Math.log(result) / Math.log(b);
  }, [result, base]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note: string }[]
      | undefined;
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
          <div className="space-y-2">
            <Label>{t("field.baseType")}</Label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(({ key }) => (
                <Button
                  key={key}
                  type="button"
                  variant={preset === key ? "default" : "outline"}
                  onClick={() => selectPreset(key)}
                >
                  {t(`type.${key}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="al-base">{t("field.base")}</Label>
              <Input
                id="al-base"
                type="number"
                inputMode="decimal"
                placeholder={t("field.basePlaceholder")}
                value={base}
                onChange={(e) => {
                  setBase(e.target.value);
                  setPreset("custom");
                  setResult(null);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="al-val">{t("field.logValue")}</Label>
              <Input
                id="al-val"
                type="number"
                inputMode="decimal"
                placeholder={t("field.valuePlaceholder")}
                value={logValue}
                onChange={(e) => {
                  setLogValue(e.target.value);
                  setResult(null);
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-xs font-mono text-zinc-400">
                {t("result.formulaText")} → {base}^{logValue} =
              </div>
              <div className="text-3xl font-bold text-zinc-900">
                {formatResult(result)}
              </div>
              {verificationLog !== null && (
                <div className="text-xs text-zinc-500">
                  {t("result.verification")}: log_{base}({formatResult(result)}) ≈{" "}
                  {(Math.round((verificationLog ?? 0) * 1e8) / 1e8).toLocaleString(
                    "en-US",
                    { maximumFractionDigits: 8 }
                  )}
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
                <th className="px-3 py-2 font-semibold">{t("examples.colInput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colOutput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colNote")}</th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 font-mono text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
