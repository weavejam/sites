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

const NOTE_MAP: Record<string, number> = {
  c: 0,
  "c#": 1,
  "c##": 2,
  db: 1,
  dbb: 0,
  d: 2,
  "d#": 3,
  eb: 3,
  e: 4,
  "e#": 5,
  fb: 4,
  f: 5,
  "f#": 6,
  gb: 6,
  g: 7,
  "g#": 8,
  ab: 8,
  a: 9,
  "a#": 10,
  bb: 10,
  b: 11,
  "b#": 12,
  cb: 11,
};

function parseNote(noteName: string): number | null {
  const normalized = noteName
    .toLowerCase()
    .replace(/♯/g, "#")
    .replace(/♭/g, "b")
    .trim();
  const semitone = NOTE_MAP[normalized];
  return semitone !== undefined ? semitone : null;
}

function midiToFreq(midi: number, baseFreq: number): number {
  return baseFreq * Math.pow(2, (midi - 69) / 12);
}

function centsFromA4(midi: number): number {
  return (midi - 69) * 100;
}

interface FreqResult {
  frequency: number;
  midiNumber: number;
  noteName: string;
  octave: number;
  wavelength: number;
  period: number;
  cents: number;
}

export default function NoteFrequencyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.note-frequency-calculator");

  const [noteName, setNoteName] = React.useState("");
  const [octave, setOctave] = React.useState("4");
  const [baseFrequency, setBaseFrequency] = React.useState("440");
  const [result, setResult] = React.useState<FreqResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);

  function calculate() {
    setTouched(true);
    setError(null);
    setResult(null);

    const semitone = parseNote(noteName);
    if (semitone === null) {
      setError(t("error.invalidNote"));
      return;
    }

    const oct = parseInt(octave);
    if (!Number.isFinite(oct) || oct < 0 || oct > 10) {
      setError(t("error.invalidOctave"));
      return;
    }

    const base = parseFloat(baseFrequency || "440");
    if (!Number.isFinite(base) || base <= 0) {
      setError(t("error.invalidBaseFrequency"));
      return;
    }

    const midiOctave = oct + 1;
    const midi = midiOctave * 12 + semitone;
    const freq = midiToFreq(midi, base);
    const speedOfSound = 343;
    const wavelength = speedOfSound / freq;
    const period = (1 / freq) * 1000;
    const cents = centsFromA4(midi);

    const displayNote = noteName
      .replace(/b$/, "♭")
      .replace(/#/, "♯")
      .toUpperCase();

    setResult({
      frequency: freq,
      midiNumber: midi,
      noteName: displayNote,
      octave: oct,
      wavelength,
      period,
      cents,
    });
  }

  function reset() {
    setNoteName("");
    setOctave("4");
    setBaseFrequency("440");
    setResult(null);
    setError(null);
    setTouched(false);
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="nf-note">{t("field.noteName")}</Label>
              <Input
                id="nf-note"
                type="text"
                value={noteName}
                placeholder={t("placeholder.noteName")}
                onChange={(e) => setNoteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nf-octave">{t("field.octave")}</Label>
              <Input
                id="nf-octave"
                type="number"
                inputMode="numeric"
                value={octave}
                placeholder={t("placeholder.octave")}
                onChange={(e) => setOctave(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nf-base">{t("field.baseFrequency")}</Label>
              <Input
                id="nf-base"
                type="number"
                inputMode="decimal"
                value={baseFrequency}
                placeholder={t("placeholder.baseFrequency")}
                onChange={(e) => setBaseFrequency(e.target.value)}
              />
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

          {error && touched && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.noteName")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.noteName}{result.octave}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.frequency")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.frequency.toFixed(3)} {t("result.hertzUnit")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.midiNumber")}</div>
                  <div className="text-lg font-medium text-zinc-900">
                    {result.midiNumber}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.wavelength")}</div>
                  <div className="text-lg font-medium text-zinc-900">
                    {result.wavelength.toFixed(4)} {t("result.metersUnit")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.period")}</div>
                  <div className="text-lg font-medium text-zinc-900">
                    {result.period.toFixed(4)} {t("result.msUnit")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.nearestA4")}</div>
                  <div className="text-lg font-medium text-zinc-900">
                    {result.cents > 0 ? "+" : ""}{result.cents} {t("result.centsUnit")}
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
