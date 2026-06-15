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

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString("en-US");
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface ResultData {
  progressPercent: number;
  wordsRemaining: number;
  daysRemaining: number;
  requiredDailyTarget: number;
  estimatedCompletion: Date | null;
  currentPace: number | null;
  status: "onTrack" | "behind" | "ahead" | null;
}

export default function NanowrimoCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.nanowrimo-calculator");

  const [totalWordGoal, setTotalWordGoal] = React.useState("");
  const [startDate, setStartDate] = React.useState("2024-11-01");
  const [endDate, setEndDate] = React.useState("2024-11-30");
  const [currentWordCount, setCurrentWordCount] = React.useState("");
  const [dailyWordTarget, setDailyWordTarget] = React.useState("");
  const [writingSpeed, setWritingSpeed] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [result, setResult] = React.useState<ResultData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function calculate() {
    setTouched(true);
    setError(null);
    setResult(null);

    const goal = parseFloat(totalWordGoal);
    const current = parseFloat(currentWordCount || "0");

    if (!Number.isFinite(goal) || goal <= 0) {
      setError(t("error.invalidNumbers"));
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      setError(t("error.invalidDates"));
      return;
    }

    if (current > goal) {
      setError(t("error.wordCountExceedsGoal"));
      return;
    }

    const now = new Date();
    const totalDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysElapsed = Math.max(
      0,
      Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    );
    const daysRemaining = Math.max(1, totalDays - daysElapsed);

    const wordsRemaining = goal - current;
    const progressPercent = (current / goal) * 100;
    const requiredDailyTarget = Math.ceil(wordsRemaining / daysRemaining);

    const expectedAtThisPoint = (goal / totalDays) * daysElapsed;
    let status: ResultData["status"] = null;
    if (daysElapsed > 0) {
      if (current >= expectedAtThisPoint * 1.05) status = "ahead";
      else if (current < expectedAtThisPoint * 0.95) status = "behind";
      else status = "onTrack";
    }

    const speedNum = parseFloat(writingSpeed);
    const customTarget = parseFloat(dailyWordTarget);
    const paceWordsPerDay = Number.isFinite(customTarget) && customTarget > 0
      ? customTarget
      : Number.isFinite(speedNum) && speedNum > 0
      ? null
      : null;

    let estimatedCompletion: Date | null = null;
    const dailyPace = paceWordsPerDay ?? requiredDailyTarget;
    if (dailyPace > 0 && wordsRemaining > 0) {
      const daysNeeded = Math.ceil(wordsRemaining / dailyPace);
      estimatedCompletion = new Date(now.getTime() + daysNeeded * 24 * 60 * 60 * 1000);
    } else if (wordsRemaining <= 0) {
      estimatedCompletion = now;
    }

    setResult({
      progressPercent,
      wordsRemaining,
      daysRemaining,
      requiredDailyTarget,
      estimatedCompletion,
      currentPace: daysElapsed > 0 ? current / daysElapsed : null,
      status,
    });
  }

  function reset() {
    setTotalWordGoal("");
    setStartDate("2024-11-01");
    setEndDate("2024-11-30");
    setCurrentWordCount("");
    setDailyWordTarget("");
    setWritingSpeed("");
    setTouched(false);
    setResult(null);
    setError(null);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
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

  const writingSpeedNum = parseFloat(writingSpeed);
  const hoursNeeded =
    result && Number.isFinite(writingSpeedNum) && writingSpeedNum > 0
      ? (result.requiredDailyTarget / writingSpeedNum).toFixed(1)
      : null;

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
              <Label htmlFor="nano-goal">{t("field.totalWordGoal")}</Label>
              <Input
                id="nano-goal"
                type="number"
                inputMode="numeric"
                value={totalWordGoal}
                placeholder={t("placeholder.totalWordGoal")}
                onChange={(e) => setTotalWordGoal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nano-current">{t("field.currentWordCount")}</Label>
              <Input
                id="nano-current"
                type="number"
                inputMode="numeric"
                value={currentWordCount}
                placeholder={t("placeholder.currentWordCount")}
                onChange={(e) => setCurrentWordCount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nano-start">{t("field.startDate")}</Label>
              <Input
                id="nano-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nano-end">{t("field.endDate")}</Label>
              <Input
                id="nano-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nano-speed">{t("field.writingSpeed")}</Label>
              <Input
                id="nano-speed"
                type="number"
                inputMode="numeric"
                value={writingSpeed}
                placeholder={t("placeholder.writingSpeed")}
                onChange={(e) => setWritingSpeed(e.target.value)}
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

          {error && touched && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.progressPercent")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.progressPercent.toFixed(1)}%
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-zinc-200">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${Math.min(100, result.progressPercent)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.requiredDailyTarget")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.requiredDailyTarget)} {hoursNeeded && `(~${hoursNeeded}h)`}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.wordsRemaining")}</div>
                  <div className="text-lg font-medium text-zinc-900">
                    {formatNumber(result.wordsRemaining)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.daysRemaining")}</div>
                  <div className="text-lg font-medium text-zinc-900">
                    {result.daysRemaining}
                  </div>
                </div>
                {result.currentPace !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.wordsPerDayPace")}</div>
                    <div className="text-lg font-medium text-zinc-900">
                      {formatNumber(result.currentPace)}
                    </div>
                  </div>
                )}
                {result.estimatedCompletion && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.estimatedCompletion")}</div>
                    <div className="text-lg font-medium text-zinc-900">
                      {formatDate(result.estimatedCompletion)}
                    </div>
                  </div>
                )}
              </div>
              {result.status === "ahead" && (
                <p className="text-sm font-medium text-emerald-600">{t("result.aheadOfSchedule")}</p>
              )}
              {result.status === "onTrack" && (
                <p className="text-sm font-medium text-blue-600">{t("result.onTrack")}</p>
              )}
              {result.status === "behind" && (
                <p className="text-sm font-medium text-amber-600">{t("result.behindSchedule")}</p>
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
                <th className="px-3 py-2 font-semibold">{t("examples.colScenario")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colTarget")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colDetails")}</th>
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
