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

function formatDays(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

export default function RecruitmentProcessDurationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.recruitment-process-duration-calculator");

  const [jobPosting, setJobPosting] = React.useState("");
  const [appReview, setAppReview] = React.useState("");
  const [interview, setInterview] = React.useState("");
  const [referenceCheck, setReferenceCheck] = React.useState("");
  const [offerNegotiation, setOfferNegotiation] = React.useState("");
  const [onboarding, setOnboarding] = React.useState("");
  const [positions, setPositions] = React.useState("");
  const [successRate, setSuccessRate] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function parsePositive(val: string): number | null {
    const n = parseFloat(val);
    return val !== "" && Number.isFinite(n) && n >= 0 ? n : null;
  }

  const jpNum = parsePositive(jobPosting);
  const arNum = parsePositive(appReview);
  const ivNum = parsePositive(interview);
  const rcNum = parsePositive(referenceCheck);
  const onNum = parsePositive(offerNegotiation);
  const obNum = parsePositive(onboarding);
  const posNum = parsePositive(positions);
  const srNum = parsePositive(successRate);

  const baseValid = jpNum !== null || arNum !== null;

  const result = React.useMemo(() => {
    if (!baseValid) return null;
    const total =
      (jpNum ?? 0) + (arNum ?? 0) + (ivNum ?? 0) + (rcNum ?? 0) + (onNum ?? 0) + (obNum ?? 0);
    const weeks = total / 7;
    let perPosition: number | null = null;
    let totalHires: number | null = null;
    if (posNum !== null && posNum > 0 && srNum !== null && srNum > 0 && srNum <= 100) {
      const cyclesNeeded = posNum / (srNum / 100);
      perPosition = total;
      totalHires = cyclesNeeded;
    }
    return { total, weeks, perPosition, totalHires };
  }, [jpNum, arNum, ivNum, rcNum, onNum, obNum, posNum, srNum, baseValid]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
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

  function reset() {
    setJobPosting(""); setAppReview(""); setInterview(""); setReferenceCheck("");
    setOfferNegotiation(""); setOnboarding(""); setPositions(""); setSuccessRate("");
    setTouched(false);
  }

  const showError = touched && !baseValid;

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rpd-jp">{t("field.jobPosting")}</Label>
              <Input
                id="rpd-jp"
                type="number"
                inputMode="decimal"
                min="0"
                value={jobPosting}
                placeholder={t("placeholder.jobPosting")}
                onChange={(e) => { setJobPosting(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpd-ar">{t("field.appReview")}</Label>
              <Input
                id="rpd-ar"
                type="number"
                inputMode="decimal"
                min="0"
                value={appReview}
                placeholder={t("placeholder.appReview")}
                onChange={(e) => { setAppReview(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpd-iv">{t("field.interview")}</Label>
              <Input
                id="rpd-iv"
                type="number"
                inputMode="decimal"
                min="0"
                value={interview}
                placeholder={t("placeholder.interview")}
                onChange={(e) => { setInterview(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpd-rc">{t("field.referenceCheck")}</Label>
              <Input
                id="rpd-rc"
                type="number"
                inputMode="decimal"
                min="0"
                value={referenceCheck}
                placeholder={t("placeholder.referenceCheck")}
                onChange={(e) => { setReferenceCheck(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpd-on">{t("field.offerNegotiation")}</Label>
              <Input
                id="rpd-on"
                type="number"
                inputMode="decimal"
                min="0"
                value={offerNegotiation}
                placeholder={t("placeholder.offerNegotiation")}
                onChange={(e) => { setOfferNegotiation(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpd-ob">{t("field.onboarding")}</Label>
              <Input
                id="rpd-ob"
                type="number"
                inputMode="decimal"
                min="0"
                value={onboarding}
                placeholder={t("placeholder.onboarding")}
                onChange={(e) => { setOnboarding(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpd-pos">{t("field.positions")}</Label>
              <Input
                id="rpd-pos"
                type="number"
                inputMode="decimal"
                min="1"
                value={positions}
                placeholder={t("placeholder.positions")}
                onChange={(e) => { setPositions(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpd-sr">{t("field.successRate")}</Label>
              <Input
                id="rpd-sr"
                type="number"
                inputMode="decimal"
                min="1"
                max="100"
                value={successRate}
                placeholder={t("placeholder.successRate")}
                onChange={(e) => { setSuccessRate(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <div className="text-xs text-zinc-500">{t("result.totalDuration")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatDays(result.total)} {t("result.days")} ({formatDays(result.weeks)} {t("result.weeks")})
                  </div>
                </div>
                {result.totalHires !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.totalHires")}</div>
                    <div className="font-semibold text-zinc-900">
                      {formatDays(result.totalHires)} {t("result.days")}
                    </div>
                  </div>
                )}
              </div>
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
