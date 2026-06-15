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

export default function MusicIntervalCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.music-interval-calculator");
  const [firstNote, setFirstNote] = React.useState("");
  const [secondNote, setSecondNote] = React.useState("");
  const [octave, setOctave] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const firstIndex = noteIndex(firstNote);
  const secondIndex = noteIndex(secondNote);
  const octaveNum = parseFloat(octave);
  const octaveValid = octave === "" || (Number.isFinite(octaveNum) && Number.isInteger(octaveNum));

  const intervalNames: string[] = React.useMemo(() => {
    const raw = t.raw("intervalNames") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const result = React.useMemo(() => {
    if (firstIndex === null || secondIndex === null || !octaveValid) return null;
    const ascending = (secondIndex - firstIndex + 12) % 12;
    const descending = (firstIndex - secondIndex + 12) % 12;
    return {
      firstDisplay: NOTES[firstIndex],
      secondDisplay: NOTES[secondIndex],
      ascending,
      descending,
      intervalName: intervalNames[ascending] ?? String(ascending),
    };
  }, [firstIndex, intervalNames, octaveValid, secondIndex]);

  function loadExample(nextFirst: string, nextSecond: string, nextOctave = "") {
    setFirstNote(nextFirst);
    setSecondNote(nextSecond);
    setOctave(nextOctave);
    setTouched(true);
  }

  function reset() {
    setFirstNote("");
    setSecondNote("");
    setOctave("");
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

  const showInputError = touched && (firstIndex === null || secondIndex === null);
  const showOctaveError = touched && firstIndex !== null && secondIndex !== null && !octaveValid;

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
              <Label htmlFor="interval-first">{t("field.firstNote")}</Label>
              <Input
                id="interval-first"
                type="text"
                value={firstNote}
                placeholder={t("placeholder.firstNote")}
                onChange={(event) => {
                  setFirstNote(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interval-second">{t("field.secondNote")}</Label>
              <Input
                id="interval-second"
                type="text"
                value={secondNote}
                placeholder={t("placeholder.secondNote")}
                onChange={(event) => {
                  setSecondNote(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="interval-octave">{t("field.octave")}</Label>
              <Input
                id="interval-octave"
                type="number"
                inputMode="numeric"
                value={octave}
                placeholder={t("placeholder.octave")}
                onChange={(event) => {
                  setOctave(event.target.value);
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

          {showInputError && <p className="text-sm text-red-600">{t("error.invalidNote")}</p>}
          {showOctaveError && (
            <p className="text-sm text-red-600">{t("error.invalidOctave")}</p>
          )}

          {result !== null && touched && (
            <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.interval", {
                  first: result.firstDisplay,
                  second: result.secondDisplay,
                  name: result.intervalName,
                })}
              </div>
              <p className="text-sm text-zinc-600">
                {t("result.ascending", { value: String(result.ascending) })}
              </p>
              <p className="text-sm text-zinc-600">
                {t("result.descending", { value: String(result.descending) })}
              </p>
              {octave !== "" && octaveValid && (
                <p className="text-xs text-zinc-500">
                  {t("result.octaveAssumption", { value: String(octaveNum) })}
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
            onClick={() => loadExample("C", "G", "4")}
          >
            {t("examples.loadFifth")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("D#", "A", "4")}
          >
            {t("examples.loadTritone")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("F", "E", "4")}
          >
            {t("examples.loadMajorSeventh")}
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
