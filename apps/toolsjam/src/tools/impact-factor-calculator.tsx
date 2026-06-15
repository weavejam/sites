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

function formatIF(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(2);
}

export default function ImpactFactorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.impact-factor-calculator");
  const [journalName, setJournalName] = React.useState<string>("");
  const [citations, setCitations] = React.useState<string>("");
  const [pubN1, setPubN1] = React.useState<string>("");
  const [pubN2, setPubN2] = React.useState<string>("");
  const [targetYear, setTargetYear] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const citNum = parseFloat(citations);
  const n1Num = parseFloat(pubN1);
  const n2Num = parseFloat(pubN2);

  const isValid =
    citations !== "" &&
    pubN1 !== "" &&
    pubN2 !== "" &&
    Number.isFinite(citNum) &&
    citNum >= 0 &&
    Number.isFinite(n1Num) &&
    n1Num > 0 &&
    Number.isFinite(n2Num) &&
    n2Num > 0;

  const totalPubs = n1Num + n2Num;

  const impactFactor = React.useMemo<number | null>(() => {
    if (!isValid) return null;
    if (totalPubs === 0) return null;
    return citNum / totalPubs;
  }, [isValid, citNum, totalPubs]);

  function getIFTier(ifVal: number): string {
    if (ifVal >= 10) return t("result.high");
    if (ifVal >= 1) return t("result.medium");
    return t("result.low");
  }

  function reset() {
    setJournalName("");
    setCitations("");
    setPubN1("");
    setPubN2("");
    setTargetYear("");
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

  const showError = touched && !isValid;

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
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ifc-name">{t("field.journalName")}</Label>
              <Input
                id="ifc-name"
                type="text"
                value={journalName}
                placeholder={t("placeholder.journalName")}
                onChange={(e) => setJournalName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifc-citations">{t("field.citations")}</Label>
              <Input
                id="ifc-citations"
                type="number"
                inputMode="numeric"
                value={citations}
                placeholder={t("placeholder.citations")}
                onChange={(e) => {
                  setCitations(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifc-year">{t("field.targetYear")}</Label>
              <Input
                id="ifc-year"
                type="number"
                inputMode="numeric"
                value={targetYear}
                placeholder={t("placeholder.targetYear")}
                onChange={(e) => setTargetYear(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifc-n1">{t("field.pubYearN1")}</Label>
              <Input
                id="ifc-n1"
                type="number"
                inputMode="numeric"
                value={pubN1}
                placeholder={t("placeholder.pubYearN1")}
                onChange={(e) => {
                  setPubN1(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifc-n2">{t("field.pubYearN2")}</Label>
              <Input
                id="ifc-n2"
                type="number"
                inputMode="numeric"
                value={pubN2}
                placeholder={t("placeholder.pubYearN2")}
                onChange={(e) => {
                  setPubN2(e.target.value);
                  setTouched(true);
                }}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {impactFactor !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
                {journalName ? ` — ${journalName}` : ""}
              </div>
              <div className="text-3xl font-bold text-zinc-900">
                {formatIF(impactFactor)}
              </div>
              <div className="text-sm text-zinc-600">
                {getIFTier(impactFactor)}
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
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
