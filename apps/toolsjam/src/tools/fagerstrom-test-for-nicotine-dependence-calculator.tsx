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

type TimeToFirst = "within5" | "6to30" | "31to60" | "after60";
type YesNo = "yes" | "no";
type MostHated = "firstMorning" | "anyOther";
type PerDay = "31plus" | "21to30" | "11to20" | "10orLess";

interface FormState {
  timeToFirstCigarette: TimeToFirst | "";
  difficultyNotSmoking: YesNo | "";
  mostHatedCigarette: MostHated | "";
  cigarettesPerDay: PerDay | "";
  smokingMoreMorning: YesNo | "";
  smokingWhenIll: YesNo | "";
}

function calcScore(form: FormState): number | null {
  if (
    !form.timeToFirstCigarette ||
    !form.difficultyNotSmoking ||
    !form.mostHatedCigarette ||
    !form.cigarettesPerDay ||
    !form.smokingMoreMorning ||
    !form.smokingWhenIll
  )
    return null;

  const q1 =
    form.timeToFirstCigarette === "within5"
      ? 3
      : form.timeToFirstCigarette === "6to30"
        ? 2
        : form.timeToFirstCigarette === "31to60"
          ? 1
          : 0;
  const q2 = form.difficultyNotSmoking === "yes" ? 1 : 0;
  const q3 = form.mostHatedCigarette === "firstMorning" ? 1 : 0;
  const q4 =
    form.cigarettesPerDay === "31plus"
      ? 3
      : form.cigarettesPerDay === "21to30"
        ? 2
        : form.cigarettesPerDay === "11to20"
          ? 1
          : 0;
  const q5 = form.smokingMoreMorning === "yes" ? 1 : 0;
  const q6 = form.smokingWhenIll === "yes" ? 1 : 0;
  return q1 + q2 + q3 + q4 + q5 + q6;
}

function dependenceLevel(score: number): "veryLow" | "low" | "moderate" | "high" {
  if (score <= 2) return "veryLow";
  if (score <= 4) return "low";
  if (score <= 6) return "moderate";
  return "high";
}

export default function FagerstromTest(_props: { locale: Locale }) {
  const t = useTranslations("tool.fagerstrom-test-for-nicotine-dependence-calculator");
  const [form, setForm] = React.useState<FormState>({
    timeToFirstCigarette: "",
    difficultyNotSmoking: "",
    mostHatedCigarette: "",
    cigarettesPerDay: "",
    smokingMoreMorning: "",
    smokingWhenIll: "",
  });
  const [touched, setTouched] = React.useState(false);

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  const score = React.useMemo(() => calcScore(form), [form]);
  const level = score !== null ? dependenceLevel(score) : null;

  function loadExample(ex: FormState) {
    setForm(ex);
    setTouched(true);
  }

  function reset() {
    setForm({
      timeToFirstCigarette: "",
      difficultyNotSmoking: "",
      mostHatedCigarette: "",
      cigarettesPerDay: "",
      smokingMoreMorning: "",
      smokingWhenIll: "",
    });
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Q1 */}
            <div className="space-y-2">
              <Label htmlFor="ftnd-q1">{t("field.timeToFirstCigarette")}</Label>
              <select
                id="ftnd-q1"
                className={selectClass}
                value={form.timeToFirstCigarette}
                onChange={(e) => set("timeToFirstCigarette", e.target.value as TimeToFirst)}
              >
                <option value="">{t("option.selectAnswer")}</option>
                <option value="within5">{t("option.within5")}</option>
                <option value="6to30">{t("option.6to30")}</option>
                <option value="31to60">{t("option.31to60")}</option>
                <option value="after60">{t("option.after60")}</option>
              </select>
            </div>
            {/* Q2 */}
            <div className="space-y-2">
              <Label htmlFor="ftnd-q2">{t("field.difficultyNotSmoking")}</Label>
              <select
                id="ftnd-q2"
                className={selectClass}
                value={form.difficultyNotSmoking}
                onChange={(e) => set("difficultyNotSmoking", e.target.value as YesNo)}
              >
                <option value="">{t("option.selectAnswer")}</option>
                <option value="yes">{t("option.yes")}</option>
                <option value="no">{t("option.no")}</option>
              </select>
            </div>
            {/* Q3 */}
            <div className="space-y-2">
              <Label htmlFor="ftnd-q3">{t("field.mostHatedCigarette")}</Label>
              <select
                id="ftnd-q3"
                className={selectClass}
                value={form.mostHatedCigarette}
                onChange={(e) => set("mostHatedCigarette", e.target.value as MostHated)}
              >
                <option value="">{t("option.selectAnswer")}</option>
                <option value="firstMorning">{t("option.firstMorning")}</option>
                <option value="anyOther">{t("option.anyOther")}</option>
              </select>
            </div>
            {/* Q4 */}
            <div className="space-y-2">
              <Label htmlFor="ftnd-q4">{t("field.cigarettesPerDay")}</Label>
              <select
                id="ftnd-q4"
                className={selectClass}
                value={form.cigarettesPerDay}
                onChange={(e) => set("cigarettesPerDay", e.target.value as PerDay)}
              >
                <option value="">{t("option.selectAnswer")}</option>
                <option value="31plus">{t("option.31plus")}</option>
                <option value="21to30">{t("option.21to30")}</option>
                <option value="11to20">{t("option.11to20")}</option>
                <option value="10orLess">{t("option.10orLess")}</option>
              </select>
            </div>
            {/* Q5 */}
            <div className="space-y-2">
              <Label htmlFor="ftnd-q5">{t("field.smokingMoreMorning")}</Label>
              <select
                id="ftnd-q5"
                className={selectClass}
                value={form.smokingMoreMorning}
                onChange={(e) => set("smokingMoreMorning", e.target.value as YesNo)}
              >
                <option value="">{t("option.selectAnswer")}</option>
                <option value="yes">{t("option.yes")}</option>
                <option value="no">{t("option.no")}</option>
              </select>
            </div>
            {/* Q6 */}
            <div className="space-y-2">
              <Label htmlFor="ftnd-q6">{t("field.smokingWhenIll")}</Label>
              <select
                id="ftnd-q6"
                className={selectClass}
                value={form.smokingWhenIll}
                onChange={(e) => set("smokingWhenIll", e.target.value as YesNo)}
              >
                <option value="">{t("option.selectAnswer")}</option>
                <option value="yes">{t("option.yes")}</option>
                <option value="no">{t("option.no")}</option>
              </select>
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
            <p className="text-sm text-red-600">{t("error.incomplete")}</p>
          )}

          {score !== null && level !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.score")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{score} / 10</div>
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                timeToFirstCigarette: "31to60",
                difficultyNotSmoking: "no",
                mostHatedCigarette: "anyOther",
                cigarettesPerDay: "10orLess",
                smokingMoreMorning: "no",
                smokingWhenIll: "no",
              })
            }
          >
            {t("examples.loadVeryLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                timeToFirstCigarette: "6to30",
                difficultyNotSmoking: "no",
                mostHatedCigarette: "anyOther",
                cigarettesPerDay: "11to20",
                smokingMoreMorning: "no",
                smokingWhenIll: "no",
              })
            }
          >
            {t("examples.loadLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                timeToFirstCigarette: "within5",
                difficultyNotSmoking: "yes",
                mostHatedCigarette: "firstMorning",
                cigarettesPerDay: "31plus",
                smokingMoreMorning: "yes",
                smokingWhenIll: "yes",
              })
            }
          >
            {t("examples.loadHigh")}
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
