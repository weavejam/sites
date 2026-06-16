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

type BinaryChoice = "yes" | "no";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

const MORTALITY_BY_SCORE: Record<number, number> = {
  0: 0,
  1: 13,
  2: 26,
  3: 72,
  4: 97,
  5: 100,
  6: 100,
};

export default function IchScoreCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ich-score-calculator");

  const [age, setAge] = React.useState("");
  const [gcs, setGcs] = React.useState("");
  const [ichVolume, setIchVolume] = React.useState("");
  const [ivh, setIvh] = React.useState<BinaryChoice>("no");
  const [infratentorial, setInfratentorial] = React.useState<BinaryChoice>("no");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const gcsNum = parseFloat(gcs);
  const volumeNum = parseFloat(ichVolume);

  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 0;
  const gcsValid = gcs !== "" && Number.isFinite(gcsNum) && gcsNum >= 3 && gcsNum <= 15;
  const volumeValid =
    ichVolume !== "" && Number.isFinite(volumeNum) && volumeNum >= 0;

  const totalScore = React.useMemo<number | null>(() => {
    if (!ageValid || !gcsValid || !volumeValid) return null;

    const ageScore = ageNum >= 80 ? 1 : 0;
    const gcsScore = gcsNum <= 4 ? 2 : gcsNum <= 12 ? 1 : 0;
    const volumeScore = volumeNum >= 30 ? 1 : 0;
    const ivhScore = ivh === "yes" ? 1 : 0;
    const infratentorialScore = infratentorial === "yes" ? 1 : 0;

    return Math.min(
      6,
      ageScore + gcsScore + volumeScore + ivhScore + infratentorialScore
    );
  }, [ageNum, ageValid, gcsNum, gcsValid, infratentorial, ivh, volumeNum, volumeValid]);

  const mortality = totalScore === null ? null : MORTALITY_BY_SCORE[totalScore];

  const interpretationKey = React.useMemo(() => {
    if (totalScore === null) return null;
    if (totalScore <= 1) return "low";
    if (totalScore === 2) return "moderate";
    if (totalScore <= 4) return "high";
    return "severe";
  }, [totalScore]);

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
    for (let i = 1; i <= 5; i++) {
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

  const errorMessage = React.useMemo(() => {
    if (!touched) return null;
    if (!ageValid) return t("error.invalidAge");
    if (!gcsValid) return t("error.invalidGcs");
    if (!volumeValid) return t("error.invalidVolume");
    return null;
  }, [ageValid, gcsValid, t, touched, volumeValid]);

  function reset() {
    setAge("");
    setGcs("");
    setIchVolume("");
    setIvh("no");
    setInfratentorial("no");
    setTouched(false);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "HealthApplication",
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
              <Label htmlFor="ich-score-age">{t("field.age")}</Label>
              <Input
                id="ich-score-age"
                type="number"
                inputMode="numeric"
                min={0}
                step="1"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ich-score-gcs">{t("field.gcs")}</Label>
              <Input
                id="ich-score-gcs"
                type="number"
                inputMode="numeric"
                min={3}
                max={15}
                step="1"
                value={gcs}
                onChange={(e) => {
                  setGcs(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ich-score-volume">{t("field.ichVolume")}</Label>
              <Input
                id="ich-score-volume"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={ichVolume}
                onChange={(e) => {
                  setIchVolume(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("field.ivh")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["yes", "no"] as BinaryChoice[]).map((choice) => (
                  <Button
                    key={choice}
                    type="button"
                    aria-label={`${t("field.ivh")}: ${t(`type.${choice}` as never)}`}
                    variant={ivh === choice ? "default" : "outline"}
                    onClick={() => {
                      setIvh(choice);
                      setTouched(true);
                    }}
                  >
                    {t(`type.${choice}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.infratentorial")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["yes", "no"] as BinaryChoice[]).map((choice) => (
                  <Button
                    key={choice}
                    type="button"
                    aria-label={`${t("field.infratentorial")}: ${t(`type.${choice}` as never)}`}
                    variant={infratentorial === choice ? "default" : "outline"}
                    onClick={() => {
                      setInfratentorial(choice);
                      setTouched(true);
                    }}
                  >
                    {t(`type.${choice}` as never)}
                  </Button>
                ))}
              </div>
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

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          {errorMessage === null && totalScore !== null && mortality !== null && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.score")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(totalScore, 0)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.mortality")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(mortality, 0)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.interpretation")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {interpretationKey ? t(`result.${interpretationKey}` as never) : ""}
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {item.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
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
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
