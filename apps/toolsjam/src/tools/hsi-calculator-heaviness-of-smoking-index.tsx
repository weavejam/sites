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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

type TimeToFirst = "within5" | "6to30" | "31to60" | "after60" | "";
type CigarettesPerDay = "le10" | "11to20" | "21to30" | "ge31" | "";
type DependenceLevel = "veryLow" | "low" | "moderate" | "high";

const TIME_SCORE: Record<Exclude<TimeToFirst, "">, number> = {
  within5: 3,
  "6to30": 2,
  "31to60": 1,
  after60: 0,
};

const CPD_SCORE: Record<Exclude<CigarettesPerDay, "">, number> = {
  le10: 0,
  "11to20": 1,
  "21to30": 2,
  ge31: 3,
};

interface HsiResult {
  score: number;
  level: DependenceLevel;
}

function computeHsi(
  timeToFirst: TimeToFirst,
  cpd: CigarettesPerDay,
): HsiResult | null {
  if (!timeToFirst || !cpd) return null;
  const score = TIME_SCORE[timeToFirst] + CPD_SCORE[cpd];
  let level: DependenceLevel;
  if (score <= 1) level = "veryLow";
  else if (score <= 3) level = "low";
  else if (score === 4) level = "moderate";
  else level = "high";
  return { score, level };
}

export default function HsiCalculatorHeavinessOfSmokingIndex(
  _props: { locale: Locale },
) {
  const t = useTranslations("tool.hsi-calculator-heaviness-of-smoking-index");
  const [timeToFirst, setTimeToFirst] = React.useState<TimeToFirst>("");
  const [cpd, setCpd] = React.useState<CigarettesPerDay>("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<HsiResult | null>(() => {
    return computeHsi(timeToFirst, cpd);
  }, [timeToFirst, cpd]);

  function reset() {
    setTimeToFirst("");
    setCpd("");
    setTouched(false);
  }

  function loadExample(ttf: TimeToFirst, c: CigarettesPerDay) {
    setTimeToFirst(ttf);
    setCpd(c);
    setTouched(true);
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

  const showError = touched && (!timeToFirst || !cpd);

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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t("field.timeToFirst")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["within5", "6to30", "31to60", "after60"] as const).map(
                  (v) => (
                    <Button
                      key={v}
                      type="button"
                      variant={timeToFirst === v ? "default" : "outline"}
                      onClick={() => {
                        setTimeToFirst(v);
                        setTouched(true);
                      }}
                    >
                      {t(`timeToFirst.${v}` as never)}
                    </Button>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.cigarettesPerDay")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["le10", "11to20", "21to30", "ge31"] as const).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant={cpd === v ? "default" : "outline"}
                    onClick={() => {
                      setCpd(v);
                      setTouched(true);
                    }}
                  >
                    {t(`cigarettesPerDay.${v}` as never)}
                  </Button>
                ))}
              </div>
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

          {result !== null && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.score")}
                  </div>
                  <div className="text-3xl font-semibold text-zinc-900">
                    {result.score} / 6
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.level")}
                  </div>
                  <div className="text-base font-medium text-zinc-900">
                    {t(`level.${result.level}` as never)}
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.recommendation")}:{" "}
                {t(`recommendation.${result.level}` as never)}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("after60", "le10")}
          >
            {t("examples.loadVeryLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("31to60", "11to20")}
          >
            {t("examples.loadLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("6to30", "21to30")}
          >
            {t("examples.loadModerate")}
          </Button>
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
