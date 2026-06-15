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

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

const NOTE_TO_INDEX: Record<string, number> = {
  C: 0,
  "C#": 1,
  DB: 1,
  D: 2,
  "D#": 3,
  EB: 3,
  E: 4,
  FB: 4,
  F: 5,
  "F#": 6,
  GB: 6,
  G: 7,
  "G#": 8,
  AB: 8,
  A: 9,
  "A#": 10,
  BB: 10,
  B: 11,
  CB: 11,
};

const CANONICAL_NOTE: Record<string, string> = {
  DB: "C#",
  EB: "D#",
  FB: "E",
  GB: "F#",
  AB: "G#",
  BB: "A#",
  CB: "B",
};

const SCALE_TYPES = [
  "major",
  "naturalMinor",
  "harmonicMinor",
  "melodicMinor",
  "pentatonicMajor",
  "pentatonicMinor",
  "blues",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "locrian",
] as const;

type ScaleType = (typeof SCALE_TYPES)[number];

const SCALE_INTERVALS: Record<ScaleType, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  naturalMinor: [0, 2, 3, 5, 7, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  melodicMinor: [0, 2, 3, 5, 7, 9, 11],
  pentatonicMajor: [0, 2, 4, 7, 9],
  pentatonicMinor: [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
};

function normalizeNote(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).replace(/\s+/g, "");
  const raw = normalized.toUpperCase();
  if (!(raw in NOTE_TO_INDEX)) return null;
  return CANONICAL_NOTE[raw] ?? raw;
}

function noteIndex(value: string): number | null {
  const normalized = normalizeNote(value);
  if (!normalized) return null;
  return NOTES.indexOf(normalized as (typeof NOTES)[number]);
}

export default function MusicScaleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.music-scale-calculator");
  const [rootNote, setRootNote] = React.useState("");
  const [scaleType, setScaleType] = React.useState<ScaleType>("major");
  const [mode, setMode] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const rootIndex = noteIndex(rootNote);

  const result = React.useMemo(() => {
    if (rootIndex === null) return null;
    return {
      normalizedRoot: NOTES[rootIndex],
      notes: SCALE_INTERVALS[scaleType].map((step) => NOTES[(rootIndex + step) % 12]),
    };
  }, [rootIndex, scaleType]);

  function loadExample(nextRoot: string, nextScaleType: ScaleType, nextMode = "") {
    setRootNote(nextRoot);
    setScaleType(nextScaleType);
    setMode(nextMode);
    setTouched(true);
  }

  function reset() {
    setRootNote("");
    setScaleType("major");
    setMode("");
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

  const showError = touched && rootIndex === null;

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
              <Label htmlFor="scale-root">{t("field.rootNote")}</Label>
              <Input
                id="scale-root"
                type="text"
                value={rootNote}
                placeholder={t("placeholder.rootNote")}
                onChange={(event) => {
                  setRootNote(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scale-type">{t("field.scaleType")}</Label>
              <select
                id="scale-type"
                value={scaleType}
                onChange={(event) => {
                  setScaleType(event.target.value as ScaleType);
                  setTouched(true);
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {SCALE_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {t(("scaleType." + item) as never)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="scale-mode">{t("field.mode")}</Label>
              <Input
                id="scale-mode"
                type="text"
                value={mode}
                placeholder={t("placeholder.mode")}
                onChange={(event) => {
                  setMode(event.target.value);
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

          {showError && <p className="text-sm text-red-600">{t("error.invalidNote")}</p>}

          {result !== null && touched && (
            <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.summary", {
                  root: result.normalizedRoot,
                  scale: t(("scaleType." + scaleType) as never),
                })}
              </div>
              <p className="text-sm text-zinc-600">
                {t("result.notes", { value: result.notes.join(", ") })}
              </p>
              {mode.trim() !== "" && (
                <p className="text-sm text-zinc-600">
                  {t("result.mode", { value: mode.trim() })}
                </p>
              )}
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
            onClick={() => loadExample("C", "major")}
          >
            {t("examples.loadCMajor")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("A", "naturalMinor", "Aeolian")}
          >
            {t("examples.loadANaturalMinor")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("E", "blues")}
          >
            {t("examples.loadEBlues")}
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
