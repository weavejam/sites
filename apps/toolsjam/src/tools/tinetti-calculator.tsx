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

const SELECT_CLS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

interface TinettiItem {
  key: string;
  max: number;
  group: "balance" | "gait";
}

const ITEMS: TinettiItem[] = [
  { key: "sittingBalance", max: 1, group: "balance" },
  { key: "arising", max: 2, group: "balance" },
  { key: "attemptsToArise", max: 2, group: "balance" },
  { key: "immediateStanding", max: 2, group: "balance" },
  { key: "standingBalance", max: 2, group: "balance" },
  { key: "nudged", max: 2, group: "balance" },
  { key: "eyesClosed", max: 1, group: "balance" },
  { key: "turning360", max: 2, group: "balance" },
  { key: "sittingDown", max: 2, group: "balance" },
  { key: "gaitInitiation", max: 1, group: "gait" },
  { key: "stepLength", max: 2, group: "gait" },
  { key: "stepSymmetry", max: 1, group: "gait" },
  { key: "stepContinuity", max: 1, group: "gait" },
  { key: "path", max: 2, group: "gait" },
  { key: "trunk", max: 2, group: "gait" },
  { key: "walkingStance", max: 1, group: "gait" },
  { key: "turningGait", max: 2, group: "gait" },
];

const MAX_BALANCE = ITEMS.filter((i) => i.group === "balance").reduce((s, i) => s + i.max, 0);
const MAX_GAIT = ITEMS.filter((i) => i.group === "gait").reduce((s, i) => s + i.max, 0);
const MAX_TOTAL = MAX_BALANCE + MAX_GAIT;

type ScoreMap = Record<string, number>;

function defaultScores(): ScoreMap {
  return Object.fromEntries(ITEMS.map((i) => [i.key, 0]));
}

function maxScores(): ScoreMap {
  return Object.fromEntries(ITEMS.map((i) => [i.key, i.max]));
}

function getRiskLevel(total: number): string {
  if (total >= 25) return "low";
  if (total >= 19) return "moderate";
  return "high";
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface OptionDef {
  value: string;
  label: string;
}

export default function TinettiCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.tinetti-calculator");

  const [scores, setScores] = React.useState<ScoreMap>(defaultScores());
  const [touched, setTouched] = React.useState(false);

  const balanceScore = ITEMS.filter((i) => i.group === "balance").reduce(
    (s, i) => s + (scores[i.key] ?? 0),
    0,
  );
  const gaitScore = ITEMS.filter((i) => i.group === "gait").reduce(
    (s, i) => s + (scores[i.key] ?? 0),
    0,
  );
  const totalScore = balanceScore + gaitScore;
  const riskLevel = getRiskLevel(totalScore);

  function setScore(key: string, val: number) {
    setScores((prev) => ({ ...prev, [key]: val }));
    setTouched(true);
  }

  function loadExample(preset: ScoreMap) {
    setScores(preset);
    setTouched(true);
  }

  function reset() {
    setScores(defaultScores());
    setTouched(false);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: FaqItem[] = React.useMemo(() => {
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

  function renderItemSelect(item: TinettiItem) {
    const opts = t.raw(`options.${item.key}` as never) as OptionDef[] | undefined;
    const options = Array.isArray(opts) ? opts : [];
    return (
      <div key={item.key} className="space-y-1">
        <Label htmlFor={`tinetti-${item.key}`}>
          {t(`field.${item.key}` as never)}
        </Label>
        <select
          id={`tinetti-${item.key}`}
          className={SELECT_CLS}
          value={String(scores[item.key] ?? 0)}
          onChange={(e) => setScore(item.key, parseInt(e.target.value, 10))}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  const balanceItems = ITEMS.filter((i) => i.group === "balance");
  const gaitItems = ITEMS.filter((i) => i.group === "gait");

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
          <div>
            <h3 className="mb-3 text-base font-semibold text-zinc-800">
              {t("section.balance")}
            </h3>
            <div className="space-y-3">
              {balanceItems.map((item) => renderItemSelect(item))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-zinc-800">
              {t("section.gait")}
            </h3>
            <div className="space-y-3">
              {gaitItems.map((item) => renderItemSelect(item))}
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

          {touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.balanceScore")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {balanceScore} / {MAX_BALANCE}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.gaitScore")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {gaitScore} / {MAX_GAIT}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalScore")}</div>
                  <div className="text-3xl font-bold text-zinc-900">
                    {totalScore} / {MAX_TOTAL}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.riskLevel")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`risk.${riskLevel}` as never)}
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
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample(maxScores())}
          >
            {t("button.loadLowRisk")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample(defaultScores())}
          >
            {t("button.loadHighRisk")}
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
