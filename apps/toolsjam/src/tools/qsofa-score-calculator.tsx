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

type RiskLevel = "low" | "intermediate" | "high";

interface QsofaResult {
  score: number;
  rrPoint: boolean;
  sbpPoint: boolean;
  gcsPoint: boolean;
  risk: RiskLevel;
}

function computeQsofa(rr: number, sbp: number, gcs: number): QsofaResult | null {
  if (
    !Number.isFinite(rr) || rr < 0 ||
    !Number.isFinite(sbp) || sbp < 0 ||
    !Number.isFinite(gcs) || gcs < 3 || gcs > 15
  )
    return null;
  const rrPoint = rr >= 22;
  const sbpPoint = sbp <= 100;
  const gcsPoint = gcs < 15;
  const score = (rrPoint ? 1 : 0) + (sbpPoint ? 1 : 0) + (gcsPoint ? 1 : 0);
  let risk: RiskLevel;
  if (score === 0) risk = "low";
  else if (score === 1) risk = "intermediate";
  else risk = "high";
  return { score, rrPoint, sbpPoint, gcsPoint, risk };
}

export default function QsofaScoreCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.qsofa-score-calculator");
  const [rr, setRr] = React.useState("");
  const [sbp, setSbp] = React.useState("");
  const [gcs, setGcs] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<QsofaResult | null>(() => {
    if (!touched) return null;
    return computeQsofa(parseFloat(rr), parseFloat(sbp), parseFloat(gcs));
  }, [touched, rr, sbp, gcs]);

  const showError = touched && result === null;

  function reset() {
    setRr("");
    setSbp("");
    setGcs("");
    setTouched(false);
  }

  function loadExample(r: string, s: string, g: string) {
    setRr(r);
    setSbp(s);
    setGcs(g);
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

  const riskColor: Record<RiskLevel, string> = {
    low: "text-green-700",
    intermediate: "text-yellow-700",
    high: "text-red-700",
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
              <Label htmlFor="qsofa-rr">{t("field.rr")}</Label>
              <Input
                id="qsofa-rr"
                type="number"
                inputMode="decimal"
                value={rr}
                placeholder={t("placeholder.rr")}
                onChange={(e) => { setRr(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.breathsMin")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qsofa-sbp">{t("field.sbp")}</Label>
              <Input
                id="qsofa-sbp"
                type="number"
                inputMode="decimal"
                value={sbp}
                placeholder={t("placeholder.sbp")}
                onChange={(e) => { setSbp(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.mmhg")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qsofa-gcs">{t("field.gcs")}</Label>
              <Input
                id="qsofa-gcs"
                type="number"
                inputMode="decimal"
                value={gcs}
                placeholder={t("placeholder.gcs")}
                onChange={(e) => { setGcs(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("hint.gcs")}</p>
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
              <div className="text-3xl font-bold text-zinc-900">
                {result.score}{" "}
                <span className="text-base font-normal text-zinc-500">
                  {t("result.outOf")}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <div className={result.rrPoint ? "text-red-700 font-medium" : "text-zinc-600"}>
                  {result.rrPoint ? "✓" : "○"} {t("criterion.rr")}
                </div>
                <div className={result.sbpPoint ? "text-red-700 font-medium" : "text-zinc-600"}>
                  {result.sbpPoint ? "✓" : "○"} {t("criterion.sbp")}
                </div>
                <div className={result.gcsPoint ? "text-red-700 font-medium" : "text-zinc-600"}>
                  {result.gcsPoint ? "✓" : "○"} {t("criterion.gcs")}
                </div>
              </div>
              <div className={`text-sm font-semibold ${riskColor[result.risk]}`}>
                {t("result.risk")}: {t(`risk.${result.risk}` as never)}
              </div>
              <div className="text-xs text-zinc-500">
                {t(`risk.${result.risk}_desc` as never)}
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
            onClick={() => loadExample("18", "120", "15")}
          >
            {t("examples.loadLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("24", "110", "15")}
          >
            {t("examples.loadIntermediate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("28", "85", "12")}
          >
            {t("examples.loadHigh")}
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
