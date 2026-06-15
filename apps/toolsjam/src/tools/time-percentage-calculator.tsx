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

type Mode = "findPercentage" | "findPartial" | "findTotal";

const MODES: Mode[] = ["findPercentage", "findPartial", "findTotal"];

interface TimeValue {
  hours: string;
  minutes: string;
  seconds: string;
}

function emptyTime(): TimeValue {
  return { hours: "", minutes: "", seconds: "" };
}

function toSeconds(t: TimeValue): number | null {
  const h = parseFloat(t.hours || "0");
  const m = parseFloat(t.minutes || "0");
  const s = parseFloat(t.seconds || "0");
  if (!Number.isFinite(h) || !Number.isFinite(m) || !Number.isFinite(s)) return null;
  if (h < 0 || m < 0 || s < 0) return null;
  return h * 3600 + m * 60 + s;
}

function formatTime(totalSeconds: number, labels: { h: string; m: string; s: string }): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "—";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round((totalSeconds % 60) * 100) / 100;
  return `${h} ${labels.h} ${m} ${labels.m} ${s % 1 === 0 ? s.toFixed(0) : s} ${labels.s}`;
}

function formatPct(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", {
    maximumFractionDigits: 8,
  }) + "%";
}

function hasAnyInput(t: TimeValue): boolean {
  return t.hours !== "" || t.minutes !== "" || t.seconds !== "";
}

export default function TimePercentageCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.time-percentage-calculator");
  const [mode, setMode] = React.useState<Mode>("findPercentage");
  const [totalTime, setTotalTime] = React.useState<TimeValue>(emptyTime());
  const [partialTime, setPartialTime] = React.useState<TimeValue>(emptyTime());
  const [percentage, setPercentage] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setTotalTime(emptyTime());
    setPartialTime(emptyTime());
    setPercentage("");
    setTouched(false);
  }

  function setModeAndReset(m: Mode) {
    setMode(m);
    setTouched(false);
  }

  const totalSec = React.useMemo(() => toSeconds(totalTime), [totalTime]);
  const partialSec = React.useMemo(() => toSeconds(partialTime), [partialTime]);
  const pctNum = parseFloat(percentage);
  const pctValid = percentage !== "" && Number.isFinite(pctNum) && pctNum > 0;

  const result = React.useMemo<number | null>(() => {
    if (!touched) return null;
    switch (mode) {
      case "findPercentage": {
        if (totalSec === null || partialSec === null) return null;
        if (totalSec === 0) return null;
        return (partialSec / totalSec) * 100;
      }
      case "findPartial": {
        if (totalSec === null || !pctValid) return null;
        return (pctNum / 100) * totalSec;
      }
      case "findTotal": {
        if (partialSec === null || !pctValid) return null;
        return (partialSec / pctNum) * 100;
      }
    }
  }, [touched, mode, totalSec, partialSec, pctNum, pctValid]);

  const showError = React.useMemo(() => {
    if (!touched) return false;
    switch (mode) {
      case "findPercentage":
        return (
          !hasAnyInput(totalTime) ||
          !hasAnyInput(partialTime) ||
          totalSec === null ||
          partialSec === null
        );
      case "findPartial":
        return !hasAnyInput(totalTime) || !pctValid || totalSec === null;
      case "findTotal":
        return !hasAnyInput(partialTime) || !pctValid || partialSec === null;
    }
  }, [touched, mode, totalTime, partialTime, totalSec, partialSec, pctValid]);

  const showDivZero =
    touched &&
    !showError &&
    ((mode === "findPercentage" && totalSec === 0) ||
      ((mode === "findPartial" || mode === "findTotal") && pctNum === 0));

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
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

  function TimeGroup({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: TimeValue;
    onChange: (v: TimeValue) => void;
  }) {
    const id = label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <div className="flex-1 space-y-1">
            <Input
              id={`${id}-h`}
              type="number"
              inputMode="decimal"
              min="0"
              placeholder={t("placeholder.hours")}
              value={value.hours}
              onChange={(e) => { onChange({ ...value, hours: e.target.value }); setTouched(true); }}
              aria-label={`${label} ${t("field.hours")}`}
            />
            <div className="text-center text-xs text-zinc-400">{t("field.hours")}</div>
          </div>
          <div className="flex-1 space-y-1">
            <Input
              id={`${id}-m`}
              type="number"
              inputMode="decimal"
              min="0"
              max="59"
              placeholder={t("placeholder.minutes")}
              value={value.minutes}
              onChange={(e) => { onChange({ ...value, minutes: e.target.value }); setTouched(true); }}
              aria-label={`${label} ${t("field.minutes")}`}
            />
            <div className="text-center text-xs text-zinc-400">{t("field.minutes")}</div>
          </div>
          <div className="flex-1 space-y-1">
            <Input
              id={`${id}-s`}
              type="number"
              inputMode="decimal"
              min="0"
              max="59"
              placeholder={t("placeholder.seconds")}
              value={value.seconds}
              onChange={(e) => { onChange({ ...value, seconds: e.target.value }); setTouched(true); }}
              aria-label={`${label} ${t("field.seconds")}`}
            />
            <div className="text-center text-xs text-zinc-400">{t("field.seconds")}</div>
          </div>
        </div>
      </div>
    );
  }

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
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => setModeAndReset(m)}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${mode}_desc` as never)}
            </p>
          </div>

          <div className="space-y-4">
            {(mode === "findPercentage" || mode === "findPartial") && (
              <TimeGroup
                label={t("field.totalTime")}
                value={totalTime}
                onChange={setTotalTime}
              />
            )}
            {(mode === "findPercentage" || mode === "findTotal") && (
              <TimeGroup
                label={t("field.partialTime")}
                value={partialTime}
                onChange={setPartialTime}
              />
            )}
            {(mode === "findPartial" || mode === "findTotal") && (
              <div className="space-y-2">
                <Label htmlFor="tpc-pct">{t("field.percentage")}</Label>
                <Input
                  id="tpc-pct"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  placeholder={t("placeholder.percentage")}
                  value={percentage}
                  onChange={(e) => { setPercentage(e.target.value); setTouched(true); }}
                />
              </div>
            )}
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
          {showDivZero && (
            <p className="text-sm text-red-600">{t("error.divideByZero")}</p>
          )}

          {result !== null && !showError && !showDivZero && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t(`result.${mode}` as never, {
                  result: mode === "findPercentage"
                    ? formatPct(result)
                    : formatTime(result, {
                        h: t("field.hours"),
                        m: t("field.minutes"),
                        s: t("field.seconds"),
                      }),
                })}
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
