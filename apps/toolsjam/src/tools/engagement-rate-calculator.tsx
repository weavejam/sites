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

function formatRate(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

function getBenchmarkKey(rate: number): string {
  if (rate < 1) return "result.benchmarkBad";
  if (rate < 3) return "result.benchmarkOk";
  if (rate < 5) return "result.benchmarkGood";
  if (rate < 8) return "result.benchmarkGreat";
  return "result.benchmarkViral";
}

function getBenchmarkColor(rate: number): string {
  if (rate < 1) return "text-red-600";
  if (rate < 3) return "text-yellow-600";
  if (rate < 5) return "text-blue-600";
  return "text-green-600";
}

export default function EngagementRateCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.engagement-rate-calculator");

  const [reach, setReach] = React.useState("");
  const [likes, setLikes] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [shares, setShares] = React.useState("");
  const [saves, setSaves] = React.useState("");
  const [clicks, setClicks] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const reachNum = parseFloat(reach);
  const likesNum = parseFloat(likes) || 0;
  const commentsNum = parseFloat(comments) || 0;
  const sharesNum = parseFloat(shares) || 0;
  const savesNum = parseFloat(saves) || 0;
  const clicksNum = parseFloat(clicks) || 0;

  const reachValid = reach !== "" && Number.isFinite(reachNum) && reachNum > 0;
  const noNegatives =
    likesNum >= 0 &&
    commentsNum >= 0 &&
    sharesNum >= 0 &&
    savesNum >= 0 &&
    clicksNum >= 0;

  const result = React.useMemo(() => {
    if (!reachValid || !noNegatives) return null;
    const totalEngagements =
      likesNum + commentsNum + sharesNum + savesNum + clicksNum;
    const rate = (totalEngagements / reachNum) * 100;
    return { totalEngagements, rate };
  }, [
    reachValid,
    noNegatives,
    reachNum,
    likesNum,
    commentsNum,
    sharesNum,
    savesNum,
    clicksNum,
  ]);

  function reset() {
    setReach("");
    setLikes("");
    setComments("");
    setShares("");
    setSaves("");
    setClicks("");
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

  const showReachError = touched && (reach === "" || !reachValid);
  const showNegativeError = touched && !noNegatives;
  const showReachZero =
    touched && reach !== "" && Number.isFinite(reachNum) && reachNum <= 0;

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="er-reach">{t("field.reach")}</Label>
              <Input
                id="er-reach"
                type="number"
                inputMode="numeric"
                min={1}
                value={reach}
                placeholder={t("field.reachPlaceholder")}
                onChange={(e) => {
                  setReach(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="er-likes">{t("field.likes")}</Label>
              <Input
                id="er-likes"
                type="number"
                inputMode="numeric"
                min={0}
                value={likes}
                placeholder={t("field.likesPlaceholder")}
                onChange={(e) => {
                  setLikes(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="er-comments">{t("field.comments")}</Label>
              <Input
                id="er-comments"
                type="number"
                inputMode="numeric"
                min={0}
                value={comments}
                placeholder={t("field.commentsPlaceholder")}
                onChange={(e) => {
                  setComments(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="er-shares">{t("field.shares")}</Label>
              <Input
                id="er-shares"
                type="number"
                inputMode="numeric"
                min={0}
                value={shares}
                placeholder={t("field.sharesPlaceholder")}
                onChange={(e) => {
                  setShares(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="er-saves">{t("field.saves")}</Label>
              <Input
                id="er-saves"
                type="number"
                inputMode="numeric"
                min={0}
                value={saves}
                placeholder={t("field.savesPlaceholder")}
                onChange={(e) => {
                  setSaves(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="er-clicks">{t("field.clicks")}</Label>
              <Input
                id="er-clicks"
                type="number"
                inputMode="numeric"
                min={0}
                value={clicks}
                placeholder={t("field.clicksPlaceholder")}
                onChange={(e) => {
                  setClicks(e.target.value);
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

          {showReachZero && (
            <p className="text-sm text-red-600">{t("error.reachZero")}</p>
          )}
          {showReachError && !showReachZero && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showNegativeError && (
            <p className="text-sm text-red-600">{t("error.negative")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="mb-3 text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.engagementRate")}
                  </div>
                  <div className="mt-0.5 text-3xl font-bold text-zinc-900">
                    {formatRate(result.rate)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.totalEngagements")}
                  </div>
                  <div className="mt-0.5 text-3xl font-bold text-zinc-900">
                    {formatCount(result.totalEngagements)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.benchmark")}
                  </div>
                  <div
                    className={`mt-0.5 text-sm font-semibold ${getBenchmarkColor(result.rate)}`}
                  >
                    {t(getBenchmarkKey(result.rate) as never)}
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
