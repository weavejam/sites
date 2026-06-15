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

const MIN_SCORE = 10;
const MAX_SCORE = 90;

function clampScore(raw: string): boolean {
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) return false;
  const v = parseInt(trimmed, 10);
  return v >= MIN_SCORE && v <= MAX_SCORE;
}

function getProficiencyLevel(score: number): string {
  if (score >= 90) return "expert";
  if (score >= 79) return "advanced";
  if (score >= 69) return "good";
  if (score >= 59) return "competent";
  if (score >= 49) return "modest";
  if (score >= 39) return "limited";
  return "basic";
}

export default function PteScoreCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pte-score-calculator");

  const [listening, setListening] = React.useState("");
  const [reading, setReading] = React.useState("");
  const [speaking, setSpeaking] = React.useState("");
  const [writing, setWriting] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const lNum = parseInt(listening, 10);
  const rNum = parseInt(reading, 10);
  const sNum = parseInt(speaking, 10);
  const wNum = parseInt(writing, 10);

  const allValid =
    clampScore(listening) &&
    clampScore(reading) &&
    clampScore(speaking) &&
    clampScore(writing);

  const overallScore = allValid
    ? Math.round((lNum + rNum + sNum + wNum) / 4)
    : null;

  function reset() {
    setListening("");
    setReading("");
    setSpeaking("");
    setWriting("");
    setTouched(false);
  }

  function loadExample(l: string, r: string, s: string, w: string) {
    setListening(l);
    setReading(r);
    setSpeaking(s);
    setWriting(w);
    setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const showError = touched && !allValid;

  const sections = [
    { key: "listening", label: t("field.listening"), val: listening, set: setListening },
    { key: "reading", label: t("field.reading"), val: reading, set: setReading },
    { key: "speaking", label: t("field.speaking"), val: speaking, set: setSpeaking },
    { key: "writing", label: t("field.writing"), val: writing, set: setWriting },
  ];

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
            {sections.map(({ key, label, val, set }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`pte-${key}`}>{label}</Label>
                <Input
                  id={`pte-${key}`}
                  type="number"
                  inputMode="numeric"
                  min={10}
                  max={90}
                  value={val}
                  placeholder={t("placeholder.score")}
                  onChange={(e) => {
                    set(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("80", "75", "70", "75")}
            >
              {t("examples.loadAcademic")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("65", "60", "65", "70")}
            >
              {t("examples.loadBalanced")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {overallScore !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-700">
                {t("result.heading")}
              </div>
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.overall")}
                  </div>
                  <div className="text-4xl font-bold text-zinc-900">
                    {overallScore}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {t(
                      `level.${getProficiencyLevel(overallScore)}` as never
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">
                    {t("result.breakdown")}
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <span className="text-zinc-500">{t("field.listening")}</span>
                    <span className="font-medium text-zinc-900">{lNum}</span>
                    <span className="text-zinc-500">{t("field.reading")}</span>
                    <span className="font-medium text-zinc-900">{rNum}</span>
                    <span className="text-zinc-500">{t("field.speaking")}</span>
                    <span className="font-medium text-zinc-900">{sNum}</span>
                    <span className="text-zinc-500">{t("field.writing")}</span>
                    <span className="font-medium text-zinc-900">{wNum}</span>
                  </div>
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
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
