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

function fmt2(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(2);
}

function fmt1(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(1);
}

export default function KdCalculatorKillDeathRatio(_props: { locale: Locale }) {
  const t = useTranslations("tool.kd-calculator-kill-death-ratio");
  const [kills, setKills] = React.useState<string>("");
  const [deaths, setDeaths] = React.useState<string>("");
  const [wins, setWins] = React.useState<string>("");
  const [matches, setMatches] = React.useState<string>("");
  const [hits, setHits] = React.useState<string>("");
  const [shots, setShots] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const killsNum = parseFloat(kills);
  const deathsNum = parseFloat(deaths);
  const winsNum = parseFloat(wins);
  const matchesNum = parseFloat(matches);
  const hitsNum = parseFloat(hits);
  const shotsNum = parseFloat(shots);

  const isValid =
    kills !== "" &&
    deaths !== "" &&
    wins !== "" &&
    matches !== "" &&
    Number.isFinite(killsNum) &&
    killsNum >= 0 &&
    Number.isFinite(deathsNum) &&
    deathsNum >= 0 &&
    Number.isFinite(winsNum) &&
    winsNum >= 0 &&
    Number.isFinite(matchesNum) &&
    matchesNum > 0 &&
    winsNum <= matchesNum;

  const kdRatio = React.useMemo<number | null>(() => {
    if (!isValid) return null;
    if (deathsNum === 0) return killsNum > 0 ? Infinity : 0;
    return killsNum / deathsNum;
  }, [isValid, killsNum, deathsNum]);

  const efficiencyPct = React.useMemo<number | null>(() => {
    if (!isValid) return null;
    const total = killsNum + deathsNum;
    if (total === 0) return 50;
    return (killsNum / total) * 100;
  }, [isValid, killsNum, deathsNum]);

  const winRate = isValid ? (winsNum / matchesNum) * 100 : null;
  const killsPerMatch = isValid ? killsNum / matchesNum : null;
  const deathsPerMatch = isValid ? deathsNum / matchesNum : null;

  const hasAccuracy =
    hits !== "" &&
    shots !== "" &&
    Number.isFinite(hitsNum) &&
    hitsNum >= 0 &&
    Number.isFinite(shotsNum) &&
    shotsNum > 0;
  const accuracy = hasAccuracy ? (hitsNum / shotsNum) * 100 : null;

  function getKdTier(kd: number): string {
    if (!Number.isFinite(kd) || kd > 3.0) return t("result.tier.elite");
    if (kd >= 2.0) return t("result.tier.pro");
    if (kd >= 1.5) return t("result.tier.good");
    if (kd >= 1.0) return t("result.tier.average");
    return t("result.tier.below");
  }

  function reset() {
    setKills("");
    setDeaths("");
    setWins("");
    setMatches("");
    setHits("");
    setShots("");
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

  const showError = touched && !isValid;

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
              <Label htmlFor="kd-kills">{t("field.totalKills")}</Label>
              <Input
                id="kd-kills"
                type="number"
                inputMode="numeric"
                value={kills}
                placeholder={t("placeholder.totalKills")}
                onChange={(e) => {
                  setKills(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kd-deaths">{t("field.totalDeaths")}</Label>
              <Input
                id="kd-deaths"
                type="number"
                inputMode="numeric"
                value={deaths}
                placeholder={t("placeholder.totalDeaths")}
                onChange={(e) => {
                  setDeaths(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kd-wins">{t("field.totalWins")}</Label>
              <Input
                id="kd-wins"
                type="number"
                inputMode="numeric"
                value={wins}
                placeholder={t("placeholder.totalWins")}
                onChange={(e) => {
                  setWins(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kd-matches">{t("field.totalMatches")}</Label>
              <Input
                id="kd-matches"
                type="number"
                inputMode="numeric"
                value={matches}
                placeholder={t("placeholder.totalMatches")}
                onChange={(e) => {
                  setMatches(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kd-hits">{t("field.totalHits")}</Label>
              <Input
                id="kd-hits"
                type="number"
                inputMode="numeric"
                value={hits}
                placeholder={t("placeholder.totalHits")}
                onChange={(e) => setHits(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kd-shots">{t("field.totalShots")}</Label>
              <Input
                id="kd-shots"
                type="number"
                inputMode="numeric"
                value={shots}
                placeholder={t("placeholder.totalShots")}
                onChange={(e) => setShots(e.target.value)}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {kdRatio !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.kdRatio")}</div>
                  <div className="text-3xl font-bold text-zinc-900">
                    {Number.isFinite(kdRatio) ? fmt2(kdRatio) : "∞"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.efficiencyRating")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {efficiencyPct !== null ? fmt1(efficiencyPct) + "%" : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.winRate")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {winRate !== null ? fmt1(winRate) + "%" : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.killsPerMatch")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {killsPerMatch !== null ? fmt2(killsPerMatch) : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.deathsPerMatch")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {deathsPerMatch !== null ? fmt2(deathsPerMatch) : "—"}
                  </div>
                </div>
                {accuracy !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.accuracy")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt1(accuracy)}%
                    </div>
                  </div>
                )}
              </div>
              {kdRatio !== null && Number.isFinite(kdRatio) && (
                <div className="text-sm text-zinc-600">{getKdTier(kdRatio)}</div>
              )}
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
