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

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  isPast: boolean;
}

function getNextChristmas(): string {
  const now = new Date();
  const year = now.getFullYear();
  const xmas = new Date(Date.UTC(year, 11, 25));
  if (Date.UTC(year, 11, 25) <= now.getTime()) {
    return `${year + 1}-12-25`;
  }
  return `${year}-12-25`;
}

function todayStr(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMidnightInTZ(dateStr: string, tz: string): number {
  const utcMidnight = new Date(dateStr + "T00:00:00Z").getTime();
  try {
    // Find UTC offset for the timezone using the locale string trick
    const probe = new Date(utcMidnight);
    const utcMs = new Date(probe.toLocaleString("en-US", { timeZone: "UTC" })).getTime();
    const tzMs  = new Date(probe.toLocaleString("en-US", { timeZone: tz })).getTime();
    const offsetMs = utcMs - tzMs; // positive = tz behind UTC, negative = tz ahead
    return utcMidnight + offsetMs;
  } catch {
    return utcMidnight;
  }
}

function computeCountdown(
  startDateStr: string,
  targetDateStr: string,
  includeTime: string,
  timezone: string,
): CountdownResult | null {
  if (!startDateStr || !targetDateStr) return null;
  const start  = getMidnightInTZ(startDateStr, timezone);
  const target = getMidnightInTZ(targetDateStr, timezone);
  if (isNaN(start) || isNaN(target)) return null;

  const diffMs = target - start;
  const isPast = diffMs < 0;
  const absDiff = Math.abs(diffMs);

  const totalDays = Math.floor(absDiff / (1000 * 60 * 60 * 24));

  if (includeTime === "days") {
    return { days: totalDays, hours: 0, minutes: 0, seconds: 0, totalDays, isPast };
  }

  const days    = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, totalDays, isPast };
}

const TIME_MODES = ["days", "full"] as const;
type TimeMode = (typeof TIME_MODES)[number];

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Asia/Kolkata",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
] as const;

export default function ChristmasCountdownCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.christmas-countdown-calculator");
  const [startDate, setStartDate] = React.useState(todayStr);
  const [targetDate, setTargetDate] = React.useState(getNextChristmas);
  const [timezone, setTimezone] = React.useState("UTC");
  const [timeMode, setTimeMode] = React.useState<TimeMode>("days");
  const [result, setResult] = React.useState<CountdownResult | null>(null);

  function calculate() {
    const r = computeCountdown(startDate, targetDate, timeMode, timezone);
    setResult(r);
  }

  function reset() {
    setStartDate(todayStr());
    setTargetDate(getNextChristmas());
    setTimezone("UTC");
    setTimeMode("days");
    setResult(null);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const selectClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

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
              <Label htmlFor="ccc-start">{t("field.startDate")}</Label>
              <Input
                id="ccc-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ccc-target">{t("field.targetDate")}</Label>
              <Input
                id="ccc-target"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ccc-tz">{t("field.timezone")}</Label>
              <select
                id="ccc-tz"
                className={selectClass}
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ccc-mode">{t("field.timeMode")}</Label>
              <select
                id="ccc-mode"
                className={selectClass}
                value={timeMode}
                onChange={(e) => setTimeMode(e.target.value as TimeMode)}
              >
                {TIME_MODES.map((m) => (
                  <option key={m} value={m}>
                    {t(`type.timeMode.${m}` as never)}
                  </option>
                ))}
              </select>
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {result.isPast ? (
                <p className="text-amber-600">{t("result.pastDate")}</p>
              ) : (
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center rounded-md border border-zinc-300 bg-white px-6 py-3">
                    <span className="text-3xl font-bold text-zinc-900">
                      {result.days}
                    </span>
                    <span className="text-xs text-zinc-500">{t("result.days")}</span>
                  </div>
                  {timeMode === "full" && (
                    <>
                      <div className="flex flex-col items-center rounded-md border border-zinc-300 bg-white px-6 py-3">
                        <span className="text-3xl font-bold text-zinc-900">
                          {result.hours}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {t("result.hours")}
                        </span>
                      </div>
                      <div className="flex flex-col items-center rounded-md border border-zinc-300 bg-white px-6 py-3">
                        <span className="text-3xl font-bold text-zinc-900">
                          {result.minutes}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {t("result.minutes")}
                        </span>
                      </div>
                      <div className="flex flex-col items-center rounded-md border border-zinc-300 bg-white px-6 py-3">
                        <span className="text-3xl font-bold text-zinc-900">
                          {result.seconds}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {t("result.seconds")}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
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
