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

function compositeScore(e: number, m: number, r: number, s: number): number {
  return Math.round((e + m + r + s) / 4);
}

function stemScore(m: number, s: number): number {
  return Math.round((m + s) / 2);
}

function elaScore(e: number, r: number, w: number): number {
  // Writing (2-12) scaled to ~1-36: multiply by 3
  const wScaled = w * 3;
  return Math.round((e + r + wScaled) / 3);
}

function approximatePercentile(composite: number): number {
  // Approximate percentile based on ACT national norms
  if (composite >= 36) return 100;
  if (composite >= 35) return 99;
  if (composite >= 34) return 99;
  if (composite >= 33) return 98;
  if (composite >= 32) return 97;
  if (composite >= 31) return 96;
  if (composite >= 30) return 94;
  if (composite >= 29) return 92;
  if (composite >= 28) return 89;
  if (composite >= 27) return 85;
  if (composite >= 26) return 82;
  if (composite >= 25) return 78;
  if (composite >= 24) return 74;
  if (composite >= 23) return 68;
  if (composite >= 22) return 62;
  if (composite >= 21) return 56;
  if (composite >= 20) return 50;
  if (composite >= 19) return 43;
  if (composite >= 18) return 37;
  if (composite >= 17) return 30;
  if (composite >= 16) return 24;
  if (composite >= 15) return 18;
  if (composite >= 14) return 13;
  if (composite >= 13) return 9;
  if (composite >= 12) return 6;
  return 3;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function ActScoreCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.act-score-calculator");

  const [english, setEnglish] = React.useState("");
  const [math, setMath] = React.useState("");
  const [reading, setReading] = React.useState("");
  const [science, setScience] = React.useState("");
  const [writing, setWriting] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const pEng = parseFloat(english);
  const pMath = parseFloat(math);
  const pRead = parseFloat(reading);
  const pSci = parseFloat(science);
  const pWrite = writing !== "" ? parseFloat(writing) : null;

  const coreValid =
    english !== "" && Number.isFinite(pEng) && pEng >= 1 && pEng <= 36 &&
    math !== "" && Number.isFinite(pMath) && pMath >= 1 && pMath <= 36 &&
    reading !== "" && Number.isFinite(pRead) && pRead >= 1 && pRead <= 36 &&
    science !== "" && Number.isFinite(pSci) && pSci >= 1 && pSci <= 36;

  const writingValid =
    pWrite === null ||
    (Number.isFinite(pWrite) && pWrite >= 2 && pWrite <= 12);

  const result = React.useMemo(() => {
    if (!coreValid) return null;
    const comp = compositeScore(pEng, pMath, pRead, pSci);
    const stem = stemScore(pMath, pSci);
    const ela =
      pWrite !== null && writingValid
        ? elaScore(pEng, pRead, pWrite)
        : null;
    const pct = approximatePercentile(comp);
    return { composite: comp, stem, ela, percentile: pct };
  }, [coreValid, pEng, pMath, pRead, pSci, pWrite, writingValid]);

  function loadPreset(e: string, m: string, r: string, s: string, w?: string) {
    setEnglish(e); setMath(m); setReading(r); setScience(s);
    setWriting(w ?? ""); setTouched(true);
  }

  function reset() {
    setEnglish(""); setMath(""); setReading(""); setScience("");
    setWriting(""); setTouched(false);
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

  const showError = touched && (!coreValid || !writingValid);

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
              <Label htmlFor="act-eng">{t("field.english")}</Label>
              <Input
                id="act-eng"
                type="number"
                inputMode="numeric"
                min="1"
                max="36"
                value={english}
                placeholder={t("placeholder.score")}
                onChange={(e) => { setEnglish(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="act-math">{t("field.math")}</Label>
              <Input
                id="act-math"
                type="number"
                inputMode="numeric"
                min="1"
                max="36"
                value={math}
                placeholder={t("placeholder.score")}
                onChange={(e) => { setMath(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="act-read">{t("field.reading")}</Label>
              <Input
                id="act-read"
                type="number"
                inputMode="numeric"
                min="1"
                max="36"
                value={reading}
                placeholder={t("placeholder.score")}
                onChange={(e) => { setReading(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="act-sci">{t("field.science")}</Label>
              <Input
                id="act-sci"
                type="number"
                inputMode="numeric"
                min="1"
                max="36"
                value={science}
                placeholder={t("placeholder.score")}
                onChange={(e) => { setScience(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="act-write">{t("field.writing")}</Label>
              <Input
                id="act-write"
                type="number"
                inputMode="numeric"
                min="2"
                max="12"
                value={writing}
                placeholder={t("placeholder.writing")}
                onChange={(e) => { setWriting(e.target.value); setTouched(true); }}
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
            <p className="text-sm text-red-600">
              {!coreValid ? t("error.invalid") : t("error.writing")}
            </p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500 mb-2">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-bold text-zinc-900">
                {t("result.composite", { score: result.composite })}
              </div>
              <div className="text-zinc-700">
                {t("result.stem", { score: result.stem })}
              </div>
              {result.ela !== null ? (
                <div className="text-zinc-700">
                  {t("result.ela", { score: result.ela })}
                </div>
              ) : (
                <div className="text-xs text-zinc-500">
                  {t("result.noEla")}
                </div>
              )}
              <div className="text-zinc-700">
                {t("result.percentile", { pct: result.percentile })}
              </div>
              <div className="text-xs text-zinc-500">{t("result.benchmark")}</div>
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
            onClick={() => loadPreset("30", "32", "31", "29")}
          >
            {t("examples.loadStrong")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("25", "26", "25", "26")}
          >
            {t("examples.loadBalanced")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("22", "34", "21", "33")}
          >
            {t("examples.loadStem")}
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
