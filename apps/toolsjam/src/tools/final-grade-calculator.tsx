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

function gradeToLetter(g: number): string {
  if (g >= 90) return "A";
  if (g >= 80) return "B";
  if (g >= 70) return "C";
  if (g >= 60) return "D";
  return "F";
}

export default function FinalGradeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.final-grade-calculator");

  const [currentGrade, setCurrentGrade] = React.useState("");
  const [currentWeight, setCurrentWeight] = React.useState("");
  const [finalGrade, setFinalGrade] = React.useState("");
  const [finalWeight, setFinalWeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const cgNum = parseFloat(currentGrade);
  const cwNum = parseFloat(currentWeight);
  const fgNum = parseFloat(finalGrade);
  const fwNum = parseFloat(finalWeight);

  const valid =
    currentGrade !== "" && Number.isFinite(cgNum) && cgNum >= 0 && cgNum <= 100 &&
    currentWeight !== "" && Number.isFinite(cwNum) && cwNum > 0 && cwNum <= 100 &&
    finalGrade !== "" && Number.isFinite(fgNum) && fgNum >= 0 && fgNum <= 100 &&
    finalWeight !== "" && Number.isFinite(fwNum) && fwNum > 0 && fwNum <= 100;

  const weightSumValid = valid && Math.abs(cwNum + fwNum - 100) < 0.01;

  const result = React.useMemo(() => {
    if (!valid || !weightSumValid) return null;
    const computed = cgNum * (cwNum / 100) + fgNum * (fwNum / 100);
    return { computed, letter: gradeToLetter(computed) };
  }, [valid, weightSumValid, cgNum, cwNum, fgNum, fwNum]);

  function loadExample(cg: string, cw: string, fg: string, fw: string) {
    setCurrentGrade(cg);
    setCurrentWeight(cw);
    setFinalGrade(fg);
    setFinalWeight(fw);
    setTouched(true);
  }

  function reset() {
    setCurrentGrade("");
    setCurrentWeight("");
    setFinalGrade("");
    setFinalWeight("");
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
              <Label htmlFor="fg-current-grade">{t("field.currentGrade")}</Label>
              <Input
                id="fg-current-grade"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={currentGrade}
                placeholder={t("placeholder.grade")}
                onChange={(e) => { setCurrentGrade(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fg-current-weight">{t("field.currentWeight")}</Label>
              <Input
                id="fg-current-weight"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={currentWeight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setCurrentWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fg-final-grade">{t("field.finalExamGrade")}</Label>
              <Input
                id="fg-final-grade"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={finalGrade}
                placeholder={t("placeholder.grade")}
                onChange={(e) => { setFinalGrade(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fg-final-weight">{t("field.finalExamWeight")}</Label>
              <Input
                id="fg-final-weight"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={finalWeight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setFinalWeight(e.target.value); setTouched(true); }}
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

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {touched && valid && !weightSumValid && (
            <p className="text-sm text-red-600">{t("error.weightSum")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-3xl font-bold text-zinc-900">
                {result.computed.toFixed(2)}%
                <span className="ml-3 text-xl font-semibold text-zinc-600">
                  ({result.letter})
                </span>
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.breakdown", {
                  cg: cgNum.toFixed(2),
                  cw: cwNum,
                  fg: fgNum.toFixed(2),
                  fw: fwNum,
                  result: result.computed.toFixed(2),
                })}
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

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
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("85", "70", "90", "30")}>
            {t("examples.loadStandard")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("78", "60", "95", "40")}>
            {t("examples.loadExamHeavy")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("72", "65", "85", "35")}>
            {t("examples.loadRecovery")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
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
