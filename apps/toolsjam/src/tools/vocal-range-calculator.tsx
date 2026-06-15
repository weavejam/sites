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

type Gender = "female" | "male" | "unspecified" | "";

interface VoiceTypeRange {
  key: string;
  gender: "female" | "male" | "any";
  minHz: number;
  maxHz: number;
}

const VOICE_TYPES: VoiceTypeRange[] = [
  { key: "soprano",      gender: "female", minHz: 261.63,  maxHz: 1046.50 },
  { key: "mezzoSoprano", gender: "female", minHz: 196.00,  maxHz: 783.99  },
  { key: "alto",         gender: "female", minHz: 146.83,  maxHz: 659.25  },
  { key: "tenor",        gender: "male",   minHz: 130.81,  maxHz: 523.25  },
  { key: "baritone",     gender: "male",   minHz: 98.00,   maxHz: 392.00  },
  { key: "bass",         gender: "male",   minHz: 82.41,   maxHz: 349.23  },
];

function classifyVoice(lowestHz: number, highestHz: number, gender: Gender): string | null {
  const genderFilter = gender === "female" ? "female" : gender === "male" ? "male" : null;
  const candidates = genderFilter
    ? VOICE_TYPES.filter((vt) => vt.gender === genderFilter)
    : VOICE_TYPES;

  for (const vt of candidates) {
    if (lowestHz >= vt.minHz * 0.9 && highestHz <= vt.maxHz * 1.1) {
      return vt.key;
    }
  }
  // Best-fit: find the type whose midpoint is closest to the singer's midpoint
  const singerMid = (lowestHz + highestHz) / 2;
  let bestKey: string | null = null;
  let bestDist = Infinity;
  for (const vt of candidates) {
    const vtMid = (vt.minHz + vt.maxHz) / 2;
    const dist = Math.abs(singerMid - vtMid);
    if (dist < bestDist) {
      bestDist = dist;
      bestKey = vt.key;
    }
  }
  return bestKey;
}

export default function VocalRangeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.vocal-range-calculator");

  const [lowestNote, setLowestNote] = React.useState("");
  const [highestNote, setHighestNote] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("");
  const [touched, setTouched] = React.useState(false);

  const lowNum = parseFloat(lowestNote);
  const highNum = parseFloat(highestNote);
  const lowValid = lowestNote !== "" && Number.isFinite(lowNum) && lowNum > 0;
  const highValid = highestNote !== "" && Number.isFinite(highNum) && highNum > 0;
  const orderValid = lowValid && highValid && highNum > lowNum;
  const allValid = lowValid && highValid && orderValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const octaveSpan = Math.log2(highNum / lowNum);
    const semitones = Math.round(octaveSpan * 12);
    const voiceTypeKey = classifyVoice(lowNum, highNum, gender);
    return { octaveSpan, semitones, voiceTypeKey };
  }, [allValid, lowNum, highNum, gender]);

  function reset() {
    setLowestNote("");
    setHighestNote("");
    setGender("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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

  const showInvalid = touched && (!lowValid || !highValid);
  const showOrderError = touched && lowValid && highValid && !orderValid;

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
              <Label htmlFor="vrc-low">{t("field.lowestNote")}</Label>
              <Input
                id="vrc-low"
                type="number"
                inputMode="decimal"
                value={lowestNote}
                placeholder="130.81"
                onChange={(e) => { setLowestNote(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vrc-high">{t("field.highestNote")}</Label>
              <Input
                id="vrc-high"
                type="number"
                inputMode="decimal"
                value={highestNote}
                placeholder="523.25"
                onChange={(e) => { setHighestNote(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="vrc-gender">{t("field.gender")}</Label>
              <select
                id="vrc-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value="">{t("gender.unspecified")}</option>
                <option value="female">{t("gender.female")}</option>
                <option value="male">{t("gender.male")}</option>
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

          {showInvalid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showOrderError && (
            <p className="text-sm text-red-600">{t("error.lowHighOrder")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.octaveSpan")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.octaveSpan.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.semitones")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.semitones}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.voiceType")}</div>
                  <div className="text-xl font-semibold text-violet-700">
                    {result.voiceTypeKey
                      ? t(`voiceType.${result.voiceTypeKey}` as never)
                      : t("result.unclassified")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.freqRange")}</div>
                  <div className="text-sm font-medium text-zinc-700">
                    {lowNum.toFixed(2)} Hz – {highNum.toFixed(2)} Hz
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
