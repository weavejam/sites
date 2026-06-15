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

const SCALE_INTERVALS: Record<string, number[]> = {
  Major:      [0, 2, 4, 5, 7, 9, 11],
  Minor:      [0, 2, 3, 5, 7, 8, 10],
  Dorian:     [0, 2, 3, 5, 7, 9, 10],
  Mixolydian: [0, 2, 4, 5, 7, 9, 10],
};

const SCALE_QUALITIES: Record<string, string[]> = {
  Major:      ["major", "minor", "minor", "major", "major", "minor", "dim"],
  Minor:      ["minor", "dim",   "major", "minor", "minor", "major", "major"],
  Dorian:     ["minor", "minor", "major", "major", "minor", "dim",   "major"],
  Mixolydian: ["major", "minor", "dim",   "major", "minor", "minor", "major"],
};

const ROMAN_NUMERALS: Record<string, string[]> = {
  Major:      ["I",    "ii",   "iii",  "IV",   "V",    "vi",   "vii°"],
  Minor:      ["i",    "ii°",  "III",  "iv",   "v",    "VI",   "VII"],
  Dorian:     ["i",    "ii",   "III",  "IV",   "v",    "vi°",  "VII"],
  Mixolydian: ["I",    "ii",   "iii°", "IV",   "v",    "vi",   "VII"],
};

// Degree patterns: indices into the 7-degree scale
const PATTERNS: Record<string, Record<string, number[]>> = {
  Pop: {
    Basic:        [0, 4, 5, 3],
    Intermediate: [0, 4, 5, 2],
    Advanced:     [0, 5, 1, 4],
  },
  Jazz: {
    Basic:        [1, 4, 0],
    Intermediate: [0, 5, 1, 4],
    Advanced:     [1, 4, 0, 5],
  },
  Blues: {
    Basic:        [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4],
    Intermediate: [0, 3, 0, 4],
    Advanced:     [0, 0, 3, 3, 0, 0, 4, 3, 0, 4, 0, 4],
  },
  Classical: {
    Basic:        [0, 3, 4, 0],
    Intermediate: [0, 5, 3, 1, 4, 0],
    Advanced:     [0, 3, 5, 1, 4, 2, 4, 0],
  },
};

function getChordSymbol(
  rootIdx: number,
  quality: string,
  complexity: string,
  degreeIdx: number,
  style: string,
): string {
  const note = NOTES[rootIdx % 12];
  const useSevenths =
    complexity === "Advanced" ||
    (complexity === "Intermediate" && (style === "Jazz" || style === "Blues"));

  if (!useSevenths) {
    if (quality === "major") return note;
    if (quality === "minor") return note + "m";
    if (quality === "dim")   return note + "dim";
    if (quality === "aug")   return note + "aug";
    return note;
  }

  // Seventh chords
  if (degreeIdx === 4 && quality === "major") return note + "7";  // dominant
  if (quality === "major") return note + "maj7";
  if (quality === "minor") return note + "m7";
  if (quality === "dim")   return note + "m7b5";
  if (quality === "aug")   return note + "aug";
  return note;
}

interface ProgressionResult {
  chords: string[];
  numerals: string[];
}

function generateProgression(
  keyNote: string,
  scaleType: string,
  style: string,
  complexity: string,
  length: number,
): ProgressionResult | null {
  const keyIdx = NOTES.indexOf(keyNote as (typeof NOTES)[number]);
  if (keyIdx === -1) return null;

  const intervals = SCALE_INTERVALS[scaleType];
  const qualities = SCALE_QUALITIES[scaleType];
  const numerals = ROMAN_NUMERALS[scaleType];
  const pattern = PATTERNS[style]?.[complexity];
  if (!intervals || !qualities || !pattern) return null;

  // Build pattern truncated/extended to length
  const steps: number[] = [];
  for (let i = 0; i < length; i++) {
    steps.push(pattern[i % pattern.length]);
  }

  const chords: string[] = [];
  const romanNumerals: string[] = [];

  for (const degIdx of steps) {
    const semitones = intervals[degIdx];
    const noteIdx = (keyIdx + semitones) % 12;
    const quality = qualities[degIdx];
    const symbol = getChordSymbol(noteIdx, quality, complexity, degIdx, style);
    chords.push(symbol);
    romanNumerals.push(numerals[degIdx]);
  }

  return { chords, numerals: romanNumerals };
}

const KEYS = [...NOTES];
const SCALE_TYPES = ["Major", "Minor", "Dorian", "Mixolydian"] as const;
const LENGTHS = [4, 6, 8, 12] as const;
const STYLES = ["Pop", "Jazz", "Blues", "Classical"] as const;
const COMPLEXITIES = ["Basic", "Intermediate", "Advanced"] as const;

type ScaleType = (typeof SCALE_TYPES)[number];
type Style = (typeof STYLES)[number];
type Complexity = (typeof COMPLEXITIES)[number];

export default function ChordProgressionGenerator(_props: { locale: Locale }) {
  const t = useTranslations("tool.chord-progression-generator");
  const [key, setKey] = React.useState("C");
  const [scaleType, setScaleType] = React.useState<ScaleType>("Major");
  const [length, setLength] = React.useState(4);
  const [style, setStyle] = React.useState<Style>("Pop");
  const [complexity, setComplexity] = React.useState<Complexity>("Basic");
  const [result, setResult] = React.useState<ProgressionResult | null>(null);

  function generate() {
    const r = generateProgression(key, scaleType, style, complexity, length);
    setResult(r);
  }

  function reset() {
    setKey("C");
    setScaleType("Major");
    setLength(4);
    setStyle("Pop");
    setComplexity("Basic");
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="cpg-key">{t("field.key")}</Label>
              <select
                id="cpg-key"
                className={selectClass}
                value={key}
                onChange={(e) => setKey(e.target.value)}
              >
                {KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpg-scale">{t("field.scale")}</Label>
              <select
                id="cpg-scale"
                className={selectClass}
                value={scaleType}
                onChange={(e) => setScaleType(e.target.value as ScaleType)}
              >
                {SCALE_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {t(`type.scale.${s}` as never)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpg-length">{t("field.length")}</Label>
              <select
                id="cpg-length"
                className={selectClass}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value, 10))}
              >
                {LENGTHS.map((l) => (
                  <option key={l} value={l}>
                    {l} {t("field.chords")}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpg-style">{t("field.style")}</Label>
              <select
                id="cpg-style"
                className={selectClass}
                value={style}
                onChange={(e) => setStyle(e.target.value as Style)}
              >
                {STYLES.map((s) => (
                  <option key={s} value={s}>
                    {t(`type.style.${s}` as never)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpg-complexity">{t("field.complexity")}</Label>
              <select
                id="cpg-complexity"
                className={selectClass}
                value={complexity}
                onChange={(e) => setComplexity(e.target.value as Complexity)}
              >
                {COMPLEXITIES.map((c) => (
                  <option key={c} value={c}>
                    {t(`type.complexity.${c}` as never)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={generate}>
              {t("button.generate")}
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
              <div className="flex flex-wrap gap-3">
                {result.chords.map((chord, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-md border border-zinc-300 bg-white px-4 py-2 min-w-[60px]"
                  >
                    <span className="text-xs text-zinc-500">
                      {result.numerals[i]}
                    </span>
                    <span className="text-lg font-bold text-zinc-900">
                      {chord}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-zinc-500">
                {t("result.analysis")}{" "}
                <span className="font-medium text-zinc-700">
                  {result.numerals.join(" – ")}
                </span>
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
