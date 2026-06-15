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

const TIMEZONE_VALUES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const;

type TzValue = (typeof TIMEZONE_VALUES)[number];

interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  totalDays: number;
  isComplete: boolean;
}

function getTargetMidnightMs(targetDate: string, tz: string): number {
  const [year, month, day] = targetDate.split("-").map(Number);
  // Use noon UTC on the target day to get a stable timezone offset (avoids DST ambiguity at midnight)
  const noonUtc = Date.UTC(year, month - 1, day, 12, 0, 0);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date(noonUtc));
  const get = (type: string) => parseInt(parts.find((p) => p.type === type)?.value ?? "0");
  const h = get("hour") === 24 ? 0 : get("hour");
  // UTC offset at noon on the target day
  const offsetMs = noonUtc - Date.UTC(get("year"), get("month") - 1, get("day"), h, get("minute"), get("second"));
  // Midnight (00:00:00) in tz on the target day
  return Date.UTC(year, month - 1, day, 0, 0, 0) + offsetMs;
}

function computeCountdown(targetMs: number): CountdownData {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, totalDays: 0, isComplete: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, totalSeconds, totalDays: days, isComplete: false };
}

function getNextNewYearDate(): string {
  const now = new Date();
  return `${now.getFullYear() + 1}-01-01`;
}

export default function NewYearCountdownCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.new-year-countdown-calculator");

  const [targetDate, setTargetDate] = React.useState(getNextNewYearDate);
  const [timezone, setTimezone] = React.useState<TzValue>("UTC");
  const [countdown, setCountdown] = React.useState<CountdownData | null>(null);
  const [isLive, setIsLive] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [targetMs, setTargetMs] = React.useState<number | null>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!isLive || targetMs === null) return;
    const tick = () => setCountdown(computeCountdown(targetMs));
    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLive, targetMs]);

  function doCalculate(): number | null {
    setError(null);
    setIsLive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!targetDate) {
      setError(t("error.invalidDate"));
      return null;
    }

    let ms: number;
    try {
      ms = getTargetMidnightMs(targetDate, timezone);
    } catch {
      setError(t("error.invalidDate"));
      return null;
    }

    if (ms <= Date.now()) {
      setError(t("error.pastDate"));
      return null;
    }

    setTargetMs(ms);
    setCountdown(computeCountdown(ms));
    return ms;
  }

  function calculate() {
    doCalculate();
  }

  function startLive() {
    const ms = doCalculate();
    if (ms !== null) setIsLive(true);
  }

  function reset() {
    setTargetDate(getNextNewYearDate());
    setTimezone("UTC");
    setCountdown(null);
    setError(null);
    setIsLive(false);
    setTargetMs(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nyc-date">{t("field.targetDate")}</Label>
              <Input
                id="nyc-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nyc-tz">{t("field.currentTimeZone")}</Label>
              <select
                id="nyc-tz"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value as TzValue)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                {TIMEZONE_VALUES.map((tz) => (
                  <option key={tz} value={tz}>
                    {t(`timezone.${tz}` as never)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" onClick={startLive}>
              {t("button.startLive")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {countdown && !error && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {countdown.isComplete ? (
                <div className="text-center text-3xl font-bold text-emerald-600">
                  {t("result.happyNewYear")}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-3 text-center">
                    {[
                      { value: countdown.days, label: t("result.days") },
                      { value: countdown.hours, label: t("result.hours") },
                      { value: countdown.minutes, label: t("result.minutes") },
                      { value: countdown.seconds, label: t("result.seconds") },
                    ].map((item) => (
                      <div key={item.label} className="rounded-md border border-zinc-200 bg-white p-3">
                        <div className="text-3xl font-bold text-zinc-900 tabular-nums">
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="text-xs text-zinc-500 mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3 text-sm text-zinc-600">
                    <div>
                      <span className="font-medium">{t("result.totalDays")}: </span>
                      {countdown.totalDays.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">{t("result.totalHours")}: </span>
                      {Math.floor(countdown.totalSeconds / 3600).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">{t("result.totalMinutes")}: </span>
                      {Math.floor(countdown.totalSeconds / 60).toLocaleString()}
                    </div>
                  </div>
                </>
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
