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

const QUESTIONS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"] as const;
type QuestionKey = (typeof QUESTIONS)[number];
type Answers = Record<QuestionKey, number>;

function fssScore(answers: Answers): number | null {
  const vals = QUESTIONS.map((k) => answers[k]);
  if (vals.some((v) => v === 0)) return null;
  return vals.reduce((a, b) => a + b, 0) / 9;
}

function fatiguLevel(score: number): "minimal" | "mild" | "moderate" | "severe" {
  if (score < 2.5) return "minimal";
  if (score < 4.0) return "mild";
  if (score < 5.0) return "moderate";
  return "severe";
}

const emptyAnswers = (): Answers =>
  Object.fromEntries(QUESTIONS.map((k) => [k, 0])) as Answers;

export default function FatigueSeverityScaleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.fatigue-severity-scale-calculator");
  const [answers, setAnswers] = React.useState<Answers>(emptyAnswers());
  const [touched, setTouched] = React.useState(false);

  function setAnswer(key: QuestionKey, val: number) {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  }

  const score = React.useMemo(() => fssScore(answers), [answers]);
  const level = score !== null ? fatiguLevel(score) : null;

  function loadExample(val: number) {
    const filled = Object.fromEntries(QUESTIONS.map((k) => [k, val])) as Answers;
    setAnswers(filled);
    setTouched(true);
  }

  function reset() {
    setAnswers(emptyAnswers());
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  const showError = touched && score === null;
  const selectClass =
    "w-full px-3 py-2 border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background";

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
          <div className="grid grid-cols-1 gap-4">
            {QUESTIONS.map((qKey) => (
              <div key={qKey} className="space-y-2">
                <Label htmlFor={`fss-${qKey}`}>{t(`question.${qKey}`)}</Label>
                <select
                  id={`fss-${qKey}`}
                  className={selectClass}
                  value={answers[qKey] === 0 ? "" : answers[qKey]}
                  onChange={(e) => {
                    setAnswer(qKey, parseInt(e.target.value, 10) || 0);
                  }}
                >
                  <option value="">{t("scale.select")}</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((v) => (
                    <option key={v} value={v}>
                      {t(`scale.${v}` as never)}
                    </option>
                  ))}
                </select>
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.incomplete")}</p>
          )}

          {score !== null && level !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.score")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{score.toFixed(1)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.level")}</div>
                  <div className="text-lg font-semibold text-zinc-800">{t(`level.${level}`)}</div>
                </div>
              </div>
              <div className="mt-2 text-sm text-zinc-700">{t(`recommendation.${level}`)}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Examples */}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample(2)}>
            {t("examples.loadMinimal")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample(4)}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample(6)}>
            {t("examples.loadSevere")}
          </Button>
        </div>
      </section>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      {/* How to */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
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
