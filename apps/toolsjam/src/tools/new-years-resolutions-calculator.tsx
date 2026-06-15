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

interface ResolutionResult {
  successRate: number;
  inProgressRate: number;
  notStartedRate: number;
  estimatedCompletionRate: number;
  successProbability: number;
  topCategory: string | null;
  insight: "high" | "medium" | "low";
}

export default function NewYearsResolutionsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.new-years-resolutions-calculator");

  const [total, setTotal] = React.useState("");
  const [completed, setCompleted] = React.useState("");
  const [inProgress, setInProgress] = React.useState("");
  const [fitnessGoals, setFitnessGoals] = React.useState("");
  const [careerGoals, setCareerGoals] = React.useState("");
  const [educationGoals, setEducationGoals] = React.useState("");
  const [lifestyleGoals, setLifestyleGoals] = React.useState("");
  const [motivation, setMotivation] = React.useState("");
  const [timeManagement, setTimeManagement] = React.useState("");
  const [support, setSupport] = React.useState("");
  const [result, setResult] = React.useState<ResolutionResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);

  function calculate() {
    setTouched(true);
    setError(null);
    setResult(null);

    const tot = parseFloat(total);
    const comp = parseFloat(completed || "0");
    const prog = parseFloat(inProgress || "0");
    const mot = parseFloat(motivation || "5");
    const time = parseFloat(timeManagement || "5");
    const sup = parseFloat(support || "5");

    if (!Number.isFinite(tot) || tot < 0 || !Number.isFinite(comp) || !Number.isFinite(prog)) {
      setError(t("error.invalidNumbers"));
      return;
    }

    if (comp + prog > tot) {
      setError(t("error.completedExceedsTotal"));
      return;
    }

    if (mot < 1 || mot > 10 || time < 1 || time > 10 || sup < 1 || sup > 10) {
      setError(t("error.invalidScores"));
      return;
    }

    const successRate = tot > 0 ? (comp / tot) * 100 : 0;
    const inProgressRate = tot > 0 ? (prog / tot) * 100 : 0;
    const notStartedRate = tot > 0 ? ((tot - comp - prog) / tot) * 100 : 0;

    const progressBonus = tot > 0 ? (comp + prog * 0.5) / tot : 0;
    const estimatedCompletionRate = Math.min(
      100,
      successRate + progressBonus * 30
    );

    const successProbability = Math.min(
      100,
      (mot * 0.35 + time * 0.30 + sup * 0.25) * 10 + progressBonus * 5
    );

    const categories: { name: string; count: number }[] = [
      { name: t("field.fitnessGoals").replace(" (Optional)", ""), count: parseFloat(fitnessGoals) || 0 },
      { name: t("field.careerGoals").replace(" (Optional)", ""), count: parseFloat(careerGoals) || 0 },
      { name: t("field.educationGoals").replace(" (Optional)", ""), count: parseFloat(educationGoals) || 0 },
      { name: t("field.lifestyleGoals").replace(" (Optional)", ""), count: parseFloat(lifestyleGoals) || 0 },
    ].filter((c) => c.count > 0);

    const topCategory =
      categories.length > 0
        ? categories.sort((a, b) => b.count - a.count)[0].name
        : null;

    const avgScore = (mot + time + sup) / 3;
    const insight: ResolutionResult["insight"] =
      avgScore >= 7 ? "high" : avgScore >= 5 ? "medium" : "low";

    setResult({
      successRate,
      inProgressRate,
      notStartedRate,
      estimatedCompletionRate,
      successProbability,
      topCategory,
      insight,
    });
  }

  function reset() {
    setTotal("");
    setCompleted("");
    setInProgress("");
    setFitnessGoals("");
    setCareerGoals("");
    setEducationGoals("");
    setLifestyleGoals("");
    setMotivation("");
    setTimeManagement("");
    setSupport("");
    setResult(null);
    setError(null);
    setTouched(false);
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="res-total">{t("field.totalResolutions")}</Label>
              <Input
                id="res-total"
                type="number"
                inputMode="numeric"
                value={total}
                placeholder={t("placeholder.count")}
                onChange={(e) => setTotal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-completed">{t("field.completedResolutions")}</Label>
              <Input
                id="res-completed"
                type="number"
                inputMode="numeric"
                value={completed}
                placeholder={t("placeholder.count")}
                onChange={(e) => setCompleted(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-progress">{t("field.inProgressResolutions")}</Label>
              <Input
                id="res-progress"
                type="number"
                inputMode="numeric"
                value={inProgress}
                placeholder={t("placeholder.count")}
                onChange={(e) => setInProgress(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="res-fitness">{t("field.fitnessGoals")}</Label>
              <Input
                id="res-fitness"
                type="number"
                inputMode="numeric"
                value={fitnessGoals}
                placeholder={t("placeholder.count")}
                onChange={(e) => setFitnessGoals(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-career">{t("field.careerGoals")}</Label>
              <Input
                id="res-career"
                type="number"
                inputMode="numeric"
                value={careerGoals}
                placeholder={t("placeholder.count")}
                onChange={(e) => setCareerGoals(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-edu">{t("field.educationGoals")}</Label>
              <Input
                id="res-edu"
                type="number"
                inputMode="numeric"
                value={educationGoals}
                placeholder={t("placeholder.count")}
                onChange={(e) => setEducationGoals(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-lifestyle">{t("field.lifestyleGoals")}</Label>
              <Input
                id="res-lifestyle"
                type="number"
                inputMode="numeric"
                value={lifestyleGoals}
                placeholder={t("placeholder.count")}
                onChange={(e) => setLifestyleGoals(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="res-mot">{t("field.motivationLevel")}</Label>
              <Input
                id="res-mot"
                type="number"
                inputMode="numeric"
                min="1"
                max="10"
                value={motivation}
                placeholder={t("placeholder.score")}
                onChange={(e) => setMotivation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-time">{t("field.timeManagementScore")}</Label>
              <Input
                id="res-time"
                type="number"
                inputMode="numeric"
                min="1"
                max="10"
                value={timeManagement}
                placeholder={t("placeholder.score")}
                onChange={(e) => setTimeManagement(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-support">{t("field.supportSystemScore")}</Label>
              <Input
                id="res-support"
                type="number"
                inputMode="numeric"
                min="1"
                max="10"
                value={support}
                placeholder={t("placeholder.score")}
                onChange={(e) => setSupport(e.target.value)}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.successRate")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.successRate.toFixed(1)}%
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-zinc-200">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${result.successRate}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.successProbability")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.successProbability.toFixed(0)}/100
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.inProgressRate")}</div>
                  <div className="text-lg font-medium text-zinc-900">
                    {result.inProgressRate.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.notStartedRate")}</div>
                  <div className="text-lg font-medium text-zinc-900">
                    {result.notStartedRate.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.completionRate")}</div>
                  <div className="text-lg font-medium text-zinc-900">
                    {result.estimatedCompletionRate.toFixed(1)}%
                  </div>
                </div>
                {result.topCategory && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.topCategory")}</div>
                    <div className="text-lg font-medium text-zinc-900">
                      {result.topCategory}
                    </div>
                  </div>
                )}
              </div>
              <div className="rounded-md bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
                <span className="font-semibold">{t("result.insight")}: </span>
                {t(`result.insight${result.insight.charAt(0).toUpperCase() + result.insight.slice(1)}` as never)}
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
