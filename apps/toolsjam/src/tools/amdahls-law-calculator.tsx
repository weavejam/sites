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

function calcAmdahl(p: number, n: number, T: number) {
  const speedup = 1 / (p + (1 - p) / n);
  const maxSpeedup = p === 0 ? Infinity : 1 / p;
  const parallelTime = T / speedup;
  const efficiency = (speedup / n) * 100;
  return { speedup, maxSpeedup, parallelTime, efficiency };
}

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function AmdahlsLawCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.amdahls-law-calculator");

  const [serialFraction, setSerialFraction] = React.useState("");
  const [numProcessors, setNumProcessors] = React.useState("");
  const [execTime, setExecTime] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const pSerial = parseFloat(serialFraction);
  const pProc = parseFloat(numProcessors);
  const pTime = parseFloat(execTime);

  const allValid =
    serialFraction !== "" && Number.isFinite(pSerial) && pSerial >= 0 && pSerial <= 1 &&
    numProcessors !== "" && Number.isFinite(pProc) && pProc >= 1 &&
    execTime !== "" && Number.isFinite(pTime) && pTime > 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return calcAmdahl(pSerial, pProc, pTime);
  }, [allValid, pSerial, pProc, pTime]);

  function loadPreset(s: string, n: string, t2: string) {
    setSerialFraction(s); setNumProcessors(n); setExecTime(t2); setTouched(true);
  }

  function reset() {
    setSerialFraction(""); setNumProcessors(""); setExecTime(""); setTouched(false);
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

  const showError = touched && !allValid;

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
              <Label htmlFor="amdahl-serial">{t("field.serialFraction")}</Label>
              <Input
                id="amdahl-serial"
                type="number"
                inputMode="decimal"
                min="0"
                max="1"
                step="0.01"
                value={serialFraction}
                placeholder={t("placeholder.serialFraction")}
                onChange={(e) => { setSerialFraction(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amdahl-procs">{t("field.numProcessors")}</Label>
              <Input
                id="amdahl-procs"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={numProcessors}
                placeholder={t("placeholder.numProcessors")}
                onChange={(e) => { setNumProcessors(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amdahl-time">{t("field.execTime")}</Label>
              <Input
                id="amdahl-time"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={execTime}
                placeholder={t("placeholder.execTime")}
                onChange={(e) => { setExecTime(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500 mb-2">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-bold text-zinc-900">
                {t("result.speedup", {
                  n: fmt(pProc, 0),
                  value: fmt(result.speedup, 2),
                })}
              </div>
              <div className="text-zinc-700">
                {t("result.maxSpeedup", {
                  value: Number.isFinite(result.maxSpeedup)
                    ? fmt(result.maxSpeedup, 2)
                    : "∞",
                })}
              </div>
              <div className="text-zinc-700">
                {t("result.parallelTime", { value: fmt(result.parallelTime, 1) })}
              </div>
              <div className="text-zinc-700">
                {t("result.efficiency", { value: fmt(result.efficiency, 1) })}
              </div>
              <div className="mt-2 text-xs text-zinc-500 font-mono">
                {t("result.formula")}
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
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("0.05", "8", "1000")}
          >
            {t("examples.loadParallel")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("0.2", "16", "3600")}
          >
            {t("examples.loadModerate")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("0.5", "8", "1000")}
          >
            {t("examples.loadSerial")}
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
