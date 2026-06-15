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

type ExampleItem = {
  input: string;
  output: string;
  note?: string;
};

function parseTimeSignature(value: string): number | null {
  const match = value.trim().match(/^(\d+)\s*\/\s*(\d+)$/);
  if (!match) return null;
  const numerator = parseInt(match[1], 10);
  const denominator = parseInt(match[2], 10);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) return null;
  if (numerator <= 0 || denominator <= 0) return null;
  return numerator;
}

function formatClock(totalSeconds: number): string {
  const rounded = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return String(minutes) + ":" + String(seconds).padStart(2, "0");
}

function formatSeconds(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded)
    ? rounded.toLocaleString("en-US", { maximumFractionDigits: 0 })
    : rounded.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}

export default function MusicDurationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.music-duration-calculator");
  const [bpm, setBpm] = React.useState("");
  const [measures, setMeasures] = React.useState("");
  const [timeSignature, setTimeSignature] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const bpmNum = parseFloat(bpm);
  const measuresNum = parseFloat(measures);
  const beatsPerMeasure = parseTimeSignature(timeSignature);

  const bpmValid = bpm !== "" && Number.isFinite(bpmNum) && bpmNum > 0;
  const measuresValid =
    measures !== "" && Number.isFinite(measuresNum) && measuresNum > 0;

  const result = React.useMemo(() => {
    if (!bpmValid || !measuresValid || beatsPerMeasure === null) return null;
    const totalBeats = measuresNum * beatsPerMeasure;
    const durationSeconds = (totalBeats / bpmNum) * 60;
    return {
      totalBeats,
      durationSeconds,
      formattedDuration: formatClock(durationSeconds),
    };
  }, [beatsPerMeasure, bpmNum, bpmValid, measuresNum, measuresValid]);

  function loadExample(nextBpm: string, nextMeasures: string, nextSignature: string) {
    setBpm(nextBpm);
    setMeasures(nextMeasures);
    setTimeSignature(nextSignature);
    setTouched(true);
  }

  function reset() {
    setBpm("");
    setMeasures("");
    setTimeSignature("");
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
    const items: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(("faq.q" + i) as never);
        const a = t(("faq.q" + i + "_a") as never);
        if (q && a && !q.startsWith("tool.")) items.push({ q, a });
      } catch {
        break;
      }
    }
    return items;
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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const showNumberError = touched && (!bpmValid || !measuresValid);
  const showSignatureError =
    touched && bpmValid && measuresValid && beatsPerMeasure === null;

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
              <Label htmlFor="duration-bpm">{t("field.bpm")}</Label>
              <Input
                id="duration-bpm"
                type="number"
                inputMode="decimal"
                value={bpm}
                placeholder={t("placeholder.bpm")}
                onChange={(event) => {
                  setBpm(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration-measures">{t("field.measures")}</Label>
              <Input
                id="duration-measures"
                type="number"
                inputMode="decimal"
                value={measures}
                placeholder={t("placeholder.measures")}
                onChange={(event) => {
                  setMeasures(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="duration-signature">{t("field.timeSignature")}</Label>
              <Input
                id="duration-signature"
                type="text"
                value={timeSignature}
                placeholder={t("placeholder.timeSignature")}
                onChange={(event) => {
                  setTimeSignature(event.target.value);
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

          {showNumberError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}
          {showSignatureError && (
            <p className="text-sm text-red-600">{t("error.signature")}</p>
          )}

          {result !== null && touched && (
            <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.duration", { value: result.formattedDuration })}
              </div>
              <p className="text-sm text-zinc-600">
                {t("result.seconds", {
                  value: formatSeconds(result.durationSeconds),
                })}
              </p>
              <p className="text-sm text-zinc-600">
                {t("result.beats", { value: formatSeconds(result.totalBeats) })}
              </p>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
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
            onClick={() => loadExample("120", "32", "4/4")}
          >
            {t("examples.loadPop")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("90", "16", "3/4")}
          >
            {t("examples.loadWaltz")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("70", "24", "6/8")}
          >
            {t("examples.loadBallad")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
