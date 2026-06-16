"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type QuestionKey = "s" | "t" | "o" | "p" | "b" | "a" | "n" | "g";
const QUESTION_KEYS: QuestionKey[] = ["s", "t", "o", "p", "b", "a", "n", "g"];

const initialAnswers: Record<QuestionKey, boolean | null> = {
  s: null, t: null, o: null, p: null,
  b: null, a: null, n: null, g: null,
};

export default function StopBangCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.stop-bang-calculator");

  const [answers, setAnswers] = React.useState<Record<QuestionKey, boolean | null>>(
    { ...initialAnswers }
  );
  const [touched, setTouched] = React.useState(false);

  const allAnswered = QUESTION_KEYS.every((k) => answers[k] !== null);

  const result = React.useMemo(() => {
    if (!allAnswered) return null;
    const score = QUESTION_KEYS.filter((k) => answers[k] === true).length;
    let riskKey: string;
    if (score <= 2) riskKey = "low";
    else if (score <= 4) riskKey = "intermediate";
    else riskKey = "high";
    return { score, riskKey };
  }, [answers, allAnswered]);

  function setAnswer(key: QuestionKey, value: boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTouched(true);
  }

  function reset() {
    setAnswers({ ...initialAnswers });
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "HealthApplication",
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
          <div className="space-y-4">
            {QUESTION_KEYS.map((key) => {
              const questionText = t(`question.${key}` as never);
              return (
                <div key={key} className="space-y-2">
                  <Label>{questionText}</Label>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant={answers[key] === true ? "default" : "outline"}
                      size="sm"
                      aria-label={`${t("answer.yes")} – ${questionText}`}
                      onClick={() => setAnswer(key, true)}
                    >
                      {t("answer.yes")}
                    </Button>
                    <Button
                      type="button"
                      variant={answers[key] === false ? "default" : "outline"}
                      size="sm"
                      aria-label={`${t("answer.no")} – ${questionText}`}
                      onClick={() => setAnswer(key, false)}
                    >
                      {t("answer.no")}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)} disabled={!allAnswered}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="flex items-end gap-2">
                <div className="text-4xl font-bold text-zinc-900">{result.score}</div>
                <div className="mb-1 text-zinc-500">{t("result.outOf")}</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.riskLevel")}</div>
                  <div className="text-lg font-bold text-zinc-900">{t(`risk.${result.riskKey}` as never)}</div>
                </div>
              </div>
              <div className="rounded border border-zinc-300 bg-white p-3 text-sm text-zinc-700">
                <span className="font-semibold">{t("result.recommendation")}: </span>
                {t(`recommendation.${result.riskKey}` as never)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (<li key={i}>{s}</li>))}
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
