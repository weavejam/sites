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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

type WellnessCategory = "poor" | "fair" | "good" | "veryGood" | "excellent";

interface WellnessResult {
  score: number;
  sleepScore: number;
  exerciseScore: number;
  socialScore: number;
  category: WellnessCategory;
}

function computeWellness(
  exercise: number,
  work: number,
  social: number,
  rest: number,
  sleep: number,
  quality: number,
  days: number,
): WellnessResult | null {
  if (
    [exercise, work, social, rest, sleep, quality, days].some(
      (v) => !Number.isFinite(v) || v < 0,
    ) ||
    quality < 1 ||
    quality > 10 ||
    days < 1
  )
    return null;
  const sleepScore = Math.max(0, 10 - Math.abs(sleep - 8) * 2);
  const exerciseScore = Math.min((exercise / 1.5) * 8, 10);
  const socialScore = Math.min(social * 5, 10);
  const score = Math.round(
    quality * 10 * 0.4 +
      sleepScore * 10 * 0.2 +
      exerciseScore * 10 * 0.2 +
      socialScore * 10 * 0.2,
  );
  let category: WellnessCategory;
  if (score < 40) category = "poor";
  else if (score < 60) category = "fair";
  else if (score < 75) category = "good";
  else if (score < 90) category = "veryGood";
  else category = "excellent";
  return { score, sleepScore, exerciseScore, socialScore, category };
}

export default function QuarantineActivityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.quarantine-activity-calculator");
  const [exercise, setExercise] = React.useState("");
  const [work, setWork] = React.useState("");
  const [social, setSocial] = React.useState("");
  const [rest, setRest] = React.useState("");
  const [sleep, setSleep] = React.useState("");
  const [quality, setQuality] = React.useState("");
  const [days, setDays] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<WellnessResult | null>(() => {
    if (!touched) return null;
    return computeWellness(
      parseFloat(exercise),
      parseFloat(work),
      parseFloat(social),
      parseFloat(rest),
      parseFloat(sleep),
      parseFloat(quality),
      parseFloat(days),
    );
  }, [touched, exercise, work, social, rest, sleep, quality, days]);

  const showError = touched && result === null;

  function reset() {
    setExercise(""); setWork(""); setSocial(""); setRest("");
    setSleep(""); setQuality(""); setDays(""); setTouched(false);
  }

  function loadExample(
    ex: string, wo: string, so: string, re: string,
    sl: string, qu: string, da: string,
  ) {
    setExercise(ex); setWork(wo); setSocial(so); setRest(re);
    setSleep(sl); setQuality(qu); setDays(da); setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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
              <Label htmlFor="qac-exercise">{t("field.exercise")}</Label>
              <Input
                id="qac-exercise"
                type="number"
                inputMode="decimal"
                value={exercise}
                placeholder={t("placeholder.hours")}
                onChange={(e) => { setExercise(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.hours")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qac-work">{t("field.work")}</Label>
              <Input
                id="qac-work"
                type="number"
                inputMode="decimal"
                value={work}
                placeholder={t("placeholder.hours")}
                onChange={(e) => { setWork(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.hours")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qac-social">{t("field.social")}</Label>
              <Input
                id="qac-social"
                type="number"
                inputMode="decimal"
                value={social}
                placeholder={t("placeholder.hours")}
                onChange={(e) => { setSocial(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.hours")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qac-rest">{t("field.rest")}</Label>
              <Input
                id="qac-rest"
                type="number"
                inputMode="decimal"
                value={rest}
                placeholder={t("placeholder.hours")}
                onChange={(e) => { setRest(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.hours")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qac-sleep">{t("field.sleep")}</Label>
              <Input
                id="qac-sleep"
                type="number"
                inputMode="decimal"
                value={sleep}
                placeholder={t("placeholder.hours")}
                onChange={(e) => { setSleep(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.hours")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qac-quality">{t("field.quality")}</Label>
              <Input
                id="qac-quality"
                type="number"
                inputMode="decimal"
                min="1" max="10"
                value={quality}
                placeholder={t("placeholder.quality")}
                onChange={(e) => { setQuality(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("hint.quality")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qac-days">{t("field.days")}</Label>
              <Input
                id="qac-days"
                type="number"
                inputMode="numeric"
                value={days}
                placeholder={t("placeholder.days")}
                onChange={(e) => { setDays(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.days")}</p>
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
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {result.score}/100
              </div>
              <div className="grid gap-2 sm:grid-cols-3 text-sm text-zinc-700">
                <div>
                  {t("result.sleepScore")}:{" "}
                  <span className="font-medium">{result.sleepScore.toFixed(1)}/10</span>
                </div>
                <div>
                  {t("result.exerciseScore")}:{" "}
                  <span className="font-medium">{result.exerciseScore.toFixed(1)}/10</span>
                </div>
                <div>
                  {t("result.socialScore")}:{" "}
                  <span className="font-medium">{result.socialScore.toFixed(1)}/10</span>
                </div>
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.category")}:{" "}
                <span className="font-semibold">
                  {t(`category.${result.category}` as never)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1.5", "8", "2", "3", "8", "8", "14")}
          >
            {t("examples.loadBalanced")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "10", "1", "2", "7", "7", "21")}
          >
            {t("examples.loadWorkFocused")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.5", "4", "0.5", "6", "10", "3", "30")}
          >
            {t("examples.loadStruggling")}
          </Button>
        </div>
      </section>

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
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
