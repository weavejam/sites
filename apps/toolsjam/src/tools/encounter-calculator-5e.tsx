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

type EncounterType = "easy" | "medium" | "hard" | "deadly";

// Per-character XP thresholds from the D&D 5E Dungeon Master's Guide (levels 1–20).
const XP_THRESHOLDS: Record<EncounterType, number[]> = {
  easy: [
    25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250,
    1400, 1600, 2000, 2100, 2400, 2800,
  ],
  medium: [
    50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500,
    2800, 3200, 3900, 4200, 4900, 5700,
  ],
  hard: [
    75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400,
    3800, 4300, 4800, 5900, 6300, 7300, 8500,
  ],
  deadly: [
    100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100,
    5700, 6400, 7200, 8800, 9500, 10900, 12700,
  ],
};

// XP value per CR — used to suggest appropriate monster Challenge Ratings.
const CR_XP: [string, number][] = [
  ["0", 10],
  ["1/8", 25],
  ["1/4", 50],
  ["1/2", 100],
  ["1", 200],
  ["2", 450],
  ["3", 700],
  ["4", 1100],
  ["5", 1800],
  ["6", 2300],
  ["7", 2900],
  ["8", 3900],
  ["9", 5000],
  ["10", 5900],
  ["11", 7200],
  ["12", 8400],
  ["13", 10000],
  ["14", 11500],
  ["15", 13000],
  ["16", 15000],
  ["17", 18000],
  ["18", 20000],
  ["19", 22000],
  ["20", 25000],
  ["21", 33000],
  ["22", 41000],
  ["23", 50000],
  ["24", 62000],
];

function suggestCR(targetXp: number): string {
  if (targetXp <= 0) return "0";
  let best = CR_XP[0];
  let bestDiff = Math.abs(CR_XP[0][1] - targetXp);
  for (const entry of CR_XP) {
    const diff = Math.abs(entry[1] - targetXp);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = entry;
    }
  }
  return best[0];
}

function formatXp(n: number): string {
  return n.toLocaleString("en-US");
}

const LEVEL_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);
const PARTY_SIZE_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);
const ENCOUNTER_TYPES: EncounterType[] = ["easy", "medium", "hard", "deadly"];

export default function EncounterCalculator5e(_props: { locale: Locale }) {
  const t = useTranslations("tool.encounter-calculator-5e");

  const [playerLevel, setPlayerLevel] = React.useState<number>(5);
  const [partySize, setPartySize] = React.useState<number>(4);
  const [encounterType, setEncounterType] =
    React.useState<EncounterType>("medium");
  const [envFactor, setEnvFactor] = React.useState<string>("1.0");
  const [touched, setTouched] = React.useState(false);

  const envNum = parseFloat(envFactor);
  const envValid =
    envFactor !== "" && Number.isFinite(envNum) && envNum > 0;

  const result = React.useMemo(() => {
    if (!envValid) return null;
    const perChar = XP_THRESHOLDS[encounterType][playerLevel - 1];
    const base = perChar * partySize;
    const xpBudget = Math.round(base * envNum);
    const soloCR = suggestCR(xpBudget);
    const groupCR = suggestCR(xpBudget / 4);
    return { perChar, xpBudget, soloCR, groupCR };
  }, [playerLevel, partySize, encounterType, envNum, envValid]);

  function reset() {
    setPlayerLevel(5);
    setPartySize(4);
    setEncounterType("medium");
    setEnvFactor("1.0");
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="enc-level">{t("field.playerLevel")}</Label>
              <select
                id="enc-level"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={playerLevel}
                onChange={(e) => {
                  setPlayerLevel(Number(e.target.value));
                  setTouched(true);
                }}
              >
                {LEVEL_OPTIONS.map((lv) => (
                  <option key={lv} value={lv}>
                    {lv}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enc-party">{t("field.partySize")}</Label>
              <select
                id="enc-party"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={partySize}
                onChange={(e) => {
                  setPartySize(Number(e.target.value));
                  setTouched(true);
                }}
              >
                {PARTY_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enc-type">{t("field.encounterType")}</Label>
              <select
                id="enc-type"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={encounterType}
                onChange={(e) => {
                  setEncounterType(e.target.value as EncounterType);
                  setTouched(true);
                }}
              >
                {ENCOUNTER_TYPES.map((et) => (
                  <option key={et} value={et}>
                    {t(`type.${et}` as never)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enc-env">{t("field.envFactor")}</Label>
              <Input
                id="enc-env"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={0.1}
                value={envFactor}
                placeholder={t("field.envFactorPlaceholder")}
                onChange={(e) => {
                  setEnvFactor(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.envFactorNote")}</p>
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

          {touched && !envValid && (
            <p className="text-sm text-red-600">{t("error.envInvalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="mb-3 text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.xpBudget")}
                  </div>
                  <div className="mt-0.5 text-2xl font-bold text-zinc-900">
                    {formatXp(result.xpBudget)}{" "}
                    <span className="text-sm font-normal text-zinc-500">
                      {t("result.xpUnit")}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.xpPerChar")}
                  </div>
                  <div className="mt-0.5 text-2xl font-bold text-zinc-900">
                    {formatXp(result.perChar)}{" "}
                    <span className="text-sm font-normal text-zinc-500">
                      {t("result.xpUnit")}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.suggestedCR")}
                  </div>
                  <div className="mt-0.5 text-2xl font-bold text-zinc-900">
                    CR {result.soloCR}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.suggestedCRGroup")}
                  </div>
                  <div className="mt-0.5 text-2xl font-bold text-zinc-900">
                    CR {result.groupCR}
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
