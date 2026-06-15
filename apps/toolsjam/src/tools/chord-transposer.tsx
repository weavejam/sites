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

const NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
const NOTES_FLAT  = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"] as const;
const ALL_KEYS = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"] as const;

const NOTE_TO_IDX: Record<string, number> = {
  C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4,
  F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9,
  "A#": 10, Bb: 10, B: 11,
};

// Keys that conventionally use flat notation
const FLAT_KEYS = new Set(["F", "Bb", "Eb", "Ab", "Db", "Gb"]);

function preferFlats(keyNote: string): boolean {
  return FLAT_KEYS.has(keyNote);
}

function noteToDisplay(idx: number, useFlatKey: boolean): string {
  return useFlatKey ? NOTES_FLAT[idx] : NOTES_SHARP[idx];
}

function transposeRoot(rootNote: string, semitones: number, useFlatTarget: boolean): string | null {
  const idx = NOTE_TO_IDX[rootNote];
  if (idx === undefined) return null;
  const newIdx = ((idx + semitones) % 12 + 12) % 12;
  return noteToDisplay(newIdx, useFlatTarget);
}

function parseChordRoot(chord: string): { root: string; suffix: string } | null {
  chord = chord.trim();
  if (chord.length === 0) return null;
  // Two-character roots: C#, Db, D#, Eb, E (no second char), F#, Gb, G#, Ab, A#, Bb
  if (chord.length >= 2 && (chord[1] === "#" || chord[1] === "b")) {
    return { root: chord.substring(0, 2), suffix: chord.substring(2) };
  }
  return { root: chord[0], suffix: chord.substring(1) };
}

function transposeChord(chord: string, semitones: number, useFlatTarget: boolean): string {
  const parsed = parseChordRoot(chord);
  if (!parsed) return chord;
  const newRoot = transposeRoot(parsed.root, semitones, useFlatTarget);
  if (newRoot === null) return chord;
  return newRoot + parsed.suffix;
}

function transposeInput(input: string, semitones: number, targetKey: string): string {
  const useFlatTarget = preferFlats(targetKey);
  // Handle progressions like C-F-G or C F G
  const separator = input.includes("-") ? "-" : " ";
  const parts = input.split(separator).map((c) => c.trim()).filter(Boolean);
  if (parts.length === 0) return "";
  return parts.map((c) => transposeChord(c, semitones, useFlatTarget)).join(separator);
}

export default function ChordTransposer(_props: { locale: Locale }) {
  const t = useTranslations("tool.chord-transposer");
  const [chord, setChord] = React.useState("");
  const [originalKey, setOriginalKey] = React.useState("C");
  const [targetKey, setTargetKey] = React.useState("G");
  const [touched, setTouched] = React.useState(false);

  const origIdx = NOTE_TO_IDX[originalKey] ?? 0;
  const tgtIdx  = NOTE_TO_IDX[targetKey] ?? 0;
  const semitones = ((tgtIdx - origIdx) + 12) % 12;

  const transposedChord = React.useMemo(() => {
    if (!touched || chord.trim() === "") return null;
    return transposeInput(chord.trim(), semitones, targetKey);
  }, [chord, semitones, targetKey, touched]);

  function reset() {
    setChord("");
    setOriginalKey("C");
    setTargetKey("G");
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

  const showError = touched && chord.trim() === "";

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
            <Label htmlFor="ct-chord">{t("field.chord")}</Label>
            <Input
              id="ct-chord"
              type="text"
              value={chord}
              placeholder={t("placeholder.chord")}
              onChange={(e) => {
                setChord(e.target.value);
                setTouched(true);
              }}
            />
            <p className="text-xs text-zinc-500">{t("field.chordHint")}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ct-origkey">{t("field.originalKey")}</Label>
              <select
                id="ct-origkey"
                className={selectClass}
                value={originalKey}
                onChange={(e) => setOriginalKey(e.target.value)}
              >
                {ALL_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ct-tgtkey">{t("field.targetKey")}</Label>
              <select
                id="ct-tgtkey"
                className={selectClass}
                value={targetKey}
                onChange={(e) => setTargetKey(e.target.value)}
              >
                {ALL_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.transpose")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.empty")}</p>
          )}

          {transposedChord !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.original")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-700">
                    {chord}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.transposed")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {transposedChord}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.semitones")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {semitones === 0
                      ? t("result.sameKey")
                      : `+${semitones}`}
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
