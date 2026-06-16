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

type TestType = "standard" | "cattell" | "stanfordBinet";
type AgeGroup = "child" | "adult" | "senior";

const TEST_PARAMS: Record<TestType, { mean: number; sd: number }> = {
  standard: { mean: 100, sd: 15 },
  cattell: { mean: 100, sd: 24 },
  stanfordBinet: { mean: 100, sd: 16 },
};

function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2315419 * Math.abs(z));
  const d = 0.3989422820 * Math.exp(-z * z / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212560 + t * 1.3302744))));
  return z >= 0 ? 1 - p : p;
}

type Classification = "extremelyLow" | "borderline" | "lowAverage" | "average" | "highAverage" | "superior" | "verySuperior";

function classify(iq: number): Classification {
  if (iq < 70) return "extremelyLow";
  if (iq < 80) return "borderline";
  if (iq < 90) return "lowAverage";
  if (iq < 110) return "average";
  if (iq < 120) return "highAverage";
  if (iq < 130) return "superior";
  return "verySuperior";
}

interface IqResult {
  percentile: number;
  zScore: number;
  classification: Classification;
}

function computeIq(iq: number, testType: TestType): IqResult | null {
  if (!Number.isFinite(iq) || iq < 40 || iq > 250) return null;
  const { mean, sd } = TEST_PARAMS[testType];
  const z = (iq - mean) / sd;
  const percentile = normalCDF(z) * 100;
  return { percentile, zScore: z, classification: classify(iq) };
}

function fmt(n: number, d = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(d);
}

const TEST_TYPES: TestType[] = ["standard", "cattell", "stanfordBinet"];
const AGE_GROUPS: AgeGroup[] = ["child", "adult", "senior"];

export default function IqPercentileCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.iq-percentile-calculator");

  const [iq, setIq] = React.useState("");
  const [testType, setTestType] = React.useState<TestType>("standard");
  const [ageGroup, setAgeGroup] = React.useState<AgeGroup>("adult");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<IqResult | null>(() => {
    if (!touched) return null;
    return computeIq(parseFloat(iq), testType);
  }, [touched, iq, testType]);

  function reset() {
    setIq("");
    setTestType("standard");
    setAgeGroup("adult");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  const showError = touched && result === null;

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
          <div className="space-y-2">
            <Label htmlFor="iq-score">{t("field.iq")}</Label>
            <Input
              id="iq-score"
              type="number"
              inputMode="numeric"
              value={iq}
              placeholder={t("placeholder.iq")}
              onChange={(e) => { setIq(e.target.value); setTouched(true); }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iq-test-type">{t("field.testType")}</Label>
            <select
              id="iq-test-type"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
              value={testType}
              onChange={(e) => { setTestType(e.target.value as TestType); setTouched(!!iq); }}
            >
              {TEST_TYPES.map((tt) => (
                <option key={tt} value={tt}>{t(`testType.${tt}` as never)}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="iq-age-group">{t("field.ageGroup")}</Label>
            <select
              id="iq-age-group"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
            >
              {AGE_GROUPS.map((ag) => (
                <option key={ag} value={ag}>{t(`ageGroup.${ag}` as never)}</option>
              ))}
            </select>
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-3xl font-bold text-zinc-900">
                {fmt(result.percentile, 1)}
                <span className="text-lg font-normal text-zinc-500 ml-1">{t("result.percentile")}</span>
              </div>
              <div className="text-sm text-zinc-700">
                <span className="font-medium">{t("result.zScore")}:</span> {fmt(result.zScore, 2)}
              </div>
              <div className="text-sm text-zinc-700">
                <span className="font-medium">{t("result.classification")}:</span>{" "}
                {t(`classification.${result.classification}` as never)}
              </div>
              <div className="text-xs text-zinc-400">{t("result.formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
