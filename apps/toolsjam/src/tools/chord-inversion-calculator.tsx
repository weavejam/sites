"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

const QUALITY_INTERVALS: Record<string, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  dom7: [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
};

const QUALITY_SYMBOL: Record<string, string> = {
  major: "",
  minor: "m",
  dim: "dim",
  aug: "aug",
  dom7: "7",
  maj7: "maj7",
  min7: "m7",
};

function buildChord(rootNote: string, quality: string, inversion: number) {
  const rootIdx = NOTES.indexOf(rootNote as (typeof NOTES)[number]);
  if (rootIdx === -1) return null;
  const intervals = QUALITY_INTERVALS[quality];
  if (!intervals) return null;

  const maxInversion = intervals.length - 1;
  const inv = Math.min(inversion, maxInversion);

  const rawNotes = intervals.map((semitones) => NOTES[(rootIdx + semitones) % 12]);

  // Rotate array to get inversion
  const rotated = [...rawNotes.slice(inv), ...rawNotes.slice(0, inv)];
  const bassNote = rotated[0];

  const symbol =
    rootNote +
    QUALITY_SYMBOL[quality] +
    (inv > 0 ? "/" + bassNote : "");

  const intervalNames = rotated.map((_, i) => {
    if (i === 0) return "1";
    const semitones = ((NOTES.indexOf(rotated[i] as (typeof NOTES)[number]) - NOTES.indexOf(rotated[0] as (typeof NOTES)[number])) + 12) % 12;
    const names: Record<number, string> = {
      1: "m2", 2: "M2", 3: "m3", 4: "M3", 5: "P4",
      6: "A4/d5", 7: "P5", 8: "m6", 9: "M6", 10: "m7", 11: "M7",
    };
    return names[semitones] ?? semitones.toString();
  });

  return { notes: rotated, bassNote, symbol, intervals: intervalNames };
}

const QUALITIES = ["major", "minor", "dim", "aug", "dom7", "maj7", "min7"] as const;
type Quality = (typeof QUALITIES)[number];

export default function ChordInversionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.chord-inversion-calculator");
  const [rootNote, setRootNote] = React.useState("C");
  const [quality, setQuality] = React.useState<Quality>("major");
  const [inversion, setInversion] = React.useState("0");
  const [touched, setTouched] = React.useState(false);

  const inv = parseInt(inversion, 10);
  const maxInv = (QUALITY_INTERVALS[quality]?.length ?? 3) - 1;

  const result = React.useMemo(() => {
    if (!touched) return null;
    return buildChord(rootNote, quality, inv);
  }, [rootNote, quality, inv, touched]);

  function reset() {
    setRootNote("C");
    setQuality("major");
    setInversion("0");
    setTouched(false);
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="cic-root">{t("field.root")}</Label>
              <select
                id="cic-root"
                className={selectClass}
                value={rootNote}
                onChange={(e) => setRootNote(e.target.value)}
              >
                {NOTES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cic-quality">{t("field.quality")}</Label>
              <select
                id="cic-quality"
                className={selectClass}
                value={quality}
                onChange={(e) => setQuality(e.target.value as Quality)}
              >
                {QUALITIES.map((q) => (
                  <option key={q} value={q}>
                    {t(`type.${q}` as never)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cic-inversion">{t("field.inversion")}</Label>
              <select
                id="cic-inversion"
                className={selectClass}
                value={inversion}
                onChange={(e) => setInversion(e.target.value)}
              >
                {[0, 1, 2, 3].map((lvl) => (
                  <option key={lvl} value={lvl} disabled={lvl > maxInv}>
                    {t(`type.inv${lvl}` as never)}
                  </option>
                ))}
              </select>
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.symbol")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.symbol}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.bass")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.bassNote}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.notes")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.notes.join(" – ")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.intervals")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.intervals.join(" – ")}
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
