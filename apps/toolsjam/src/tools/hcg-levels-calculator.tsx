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

// HCG reference ranges by gestational week [min, max] mIU/mL
const HCG_RANGES: Record<number, [number, number]> = {
  3: [9, 130],
  4: [75, 2600],
  5: [850, 20800],
  6: [4000, 100200],
  7: [11500, 289000],
  8: [18300, 137000],
  9: [18300, 137000],
  10: [18300, 137000],
  11: [18300, 137000],
  12: [4060, 65400],
  13: [4060, 65400],
  14: [4060, 65400],
  15: [4060, 65400],
  16: [4060, 65400],
};

function getAssessment(doublingHours: number): "rapid" | "normal" | "slow" | "noDoubling" {
  if (doublingHours <= 0) return "noDoubling";
  if (doublingHours < 48) return "rapid";
  if (doublingHours <= 72) return "normal";
  return "slow";
}

export default function HcgLevelsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.hcg-levels-calculator");

  const [hcg1, setHcg1] = React.useState("");
  const [date1, setDate1] = React.useState("");
  const [hcg2, setHcg2] = React.useState("");
  const [date2, setDate2] = React.useState("");
  const [gestWeeks, setGestWeeks] = React.useState("");
  const [gestDays, setGestDays] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const parsed = React.useMemo(
    () => ({
      hcg1: parseFloat(hcg1),
      hcg2: parseFloat(hcg2),
      date1: date1 ? new Date(date1).getTime() : NaN,
      date2: date2 ? new Date(date2).getTime() : NaN,
      gestWeeks: gestWeeks !== "" ? parseInt(gestWeeks, 10) : null,
      gestDays: gestDays !== "" ? parseInt(gestDays, 10) : 0,
    }),
    [hcg1, hcg2, date1, date2, gestWeeks, gestDays]
  );

  const validationError = React.useMemo(() => {
    if (!touched) return null;
    if (!hcg1 || !hcg2 || !date1 || !date2) return t("error.required");
    if (!Number.isFinite(parsed.hcg1) || parsed.hcg1 <= 0 || !Number.isFinite(parsed.hcg2) || parsed.hcg2 <= 0)
      return t("error.positiveHcg");
    if (Number.isNaN(parsed.date1) || Number.isNaN(parsed.date2)) return t("error.required");
    if (parsed.date1 === parsed.date2) return t("error.sameDate");
    if (parsed.date2 < parsed.date1) return t("error.dateOrder");
    return null;
  }, [touched, hcg1, hcg2, date1, date2, parsed, t]);

  const hcgWarning = React.useMemo(() => {
    if (!touched || validationError) return null;
    if (Number.isFinite(parsed.hcg1) && Number.isFinite(parsed.hcg2) && parsed.hcg2 < parsed.hcg1)
      return t("error.decreasingHcg");
    return null;
  }, [touched, validationError, parsed, t]);

  const result = React.useMemo(() => {
    if (validationError !== null) return null;
    if (!touched || !hcg1 || !hcg2 || !date1 || !date2) return null;
    const hoursApart = (parsed.date2 - parsed.date1) / (1000 * 60 * 60);
    const ratio = parsed.hcg2 / parsed.hcg1;
    const doublingHours =
      ratio > 0 && ratio !== 1
        ? (hoursApart * Math.LN2) / Math.log(ratio)
        : NaN;
    const pctIncrease = ((parsed.hcg2 - parsed.hcg1) / parsed.hcg1) * 100;

    let normalRange: string | null = null;
    if (parsed.gestWeeks !== null) {
      const weekKey = Math.min(
        Math.max(Math.round(parsed.gestWeeks + (parsed.gestDays || 0) / 7), 3),
        16
      );
      const range = HCG_RANGES[weekKey];
      if (range)
        normalRange = `${range[0].toLocaleString()}–${range[1].toLocaleString()} mIU/mL`;
    }

    const assessment =
      Number.isFinite(doublingHours) && ratio >= 1
        ? getAssessment(doublingHours)
        : "noDoubling";

    return {
      hoursApart: Math.round(hoursApart * 10) / 10,
      doublingHours: Number.isFinite(doublingHours) && doublingHours > 0
        ? Math.round(doublingHours * 10) / 10
        : null,
      pctIncrease: Math.round(pctIncrease * 10) / 10,
      normalRange,
      assessment,
    };
  }, [validationError, touched, hcg1, hcg2, date1, date2, parsed]);

  function reset() {
    setHcg1("");
    setDate1("");
    setHcg2("");
    setDate2("");
    setGestWeeks("");
    setGestDays("");
    setTouched(false);
  }

  function loadExample(
    h1: string, d1: string, h2: string, d2: string, gw: string, gd: string
  ) {
    setHcg1(h1);
    setDate1(d1);
    setHcg2(h2);
    setDate2(d2);
    setGestWeeks(gw);
    setGestDays(gd);
    setTouched(true);
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
              <Label htmlFor="hcg-hcg1">{t("field.hcg1")}</Label>
              <Input
                id="hcg-hcg1"
                type="number"
                inputMode="decimal"
                min={0}
                value={hcg1}
                placeholder={t("placeholder.hcg")}
                onChange={(e) => { setHcg1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hcg-date1">{t("field.date1")}</Label>
              <Input
                id="hcg-date1"
                type="date"
                value={date1}
                onChange={(e) => { setDate1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hcg-hcg2">{t("field.hcg2")}</Label>
              <Input
                id="hcg-hcg2"
                type="number"
                inputMode="decimal"
                min={0}
                value={hcg2}
                placeholder={t("placeholder.hcg")}
                onChange={(e) => { setHcg2(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hcg-date2">{t("field.date2")}</Label>
              <Input
                id="hcg-date2"
                type="date"
                value={date2}
                onChange={(e) => { setDate2(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hcg-weeks">{t("field.gestWeeks")}</Label>
              <Input
                id="hcg-weeks"
                type="number"
                inputMode="numeric"
                min={0}
                max={42}
                value={gestWeeks}
                placeholder={t("placeholder.weeks")}
                onChange={(e) => { setGestWeeks(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hcg-gdays">{t("field.gestDays")}</Label>
              <Input
                id="hcg-gdays"
                type="number"
                inputMode="numeric"
                min={0}
                max={6}
                value={gestDays}
                placeholder={t("placeholder.days")}
                onChange={(e) => { setGestDays(e.target.value); setTouched(true); }}
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

          {validationError && (
            <p className="text-sm text-red-600">{validationError}</p>
          )}
          {hcgWarning && !validationError && (
            <p className="text-sm text-amber-600">{hcgWarning}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {result.doublingHours !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.doublingTime")}</div>
                    <div className="text-2xl font-bold text-zinc-900">
                      {result.doublingHours}{" "}
                      <span className="text-sm font-normal text-zinc-500">
                        {t("result.hoursUnit")}
                      </span>
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">{t("result.percentIncrease")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.pctIncrease > 0 ? "+" : ""}
                    {result.pctIncrease}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.timeBetween")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.hoursApart} {t("result.hoursUnit")}
                  </div>
                </div>
                {result.normalRange && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.normalRange")}</div>
                    <div className="text-lg font-semibold text-zinc-900">
                      {result.normalRange}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm text-zinc-700">
                <span className="font-medium">{t("result.assessment")}: </span>
                {t(`assessment.${result.assessment}` as never)}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-700">{t("examples.heading")}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("150", "2024-01-15", "320", "2024-01-17", "4", "2")
                }
              >
                {t("button.loadNormal")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("200", "2024-01-15", "350", "2024-01-18", "5", "1")
                }
              >
                {t("button.loadSlow")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("25", "2024-01-15", "65", "2024-01-17", "3", "4")
                }
              >
                {t("button.loadEarly")}
              </Button>
            </div>
          </div>
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
