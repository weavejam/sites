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

const WHO_LIMITS = { count: 15, volume: 1.5, motility: 32, morphology: 4, vitality: 58 };

function calcFertilityScore(count: number, motility: number, morphology: number, vitality: number): number {
  function normalize(value: number, limit: number): number {
    if (value <= limit) return (value / limit) * 50;
    return 50 + Math.min((value - limit) / limit, 1) * 50;
  }
  const s = normalize(count, WHO_LIMITS.count) * 0.25
    + normalize(motility, WHO_LIMITS.motility) * 0.30
    + normalize(morphology, WHO_LIMITS.morphology) * 0.25
    + normalize(vitality, WHO_LIMITS.vitality) * 0.20;
  return Math.round(Math.min(100, Math.max(0, s)));
}

export default function SpermAnalysisCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sperm-analysis-calculator");

  const [spermCount, setSpermCount] = React.useState("");
  const [semenVolume, setSemenVolume] = React.useState("");
  const [motility, setMotility] = React.useState("");
  const [morphology, setMorphology] = React.useState("");
  const [vitality, setVitality] = React.useState("");
  const [ph, setPh] = React.useState("");
  const [liquefaction, setLiquefaction] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const cNum = parseFloat(spermCount);
  const vNum = parseFloat(semenVolume);
  const mNum = parseFloat(motility);
  const morphNum = parseFloat(morphology);
  const vitNum = parseFloat(vitality);
  const phNum = parseFloat(ph);
  const liqNum = parseFloat(liquefaction);

  const allValid = [cNum, vNum, mNum, morphNum, vitNum, phNum, liqNum].every(
    (n) => !isNaN(n) && isFinite(n) && n >= 0
  );

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const totalCount = cNum * vNum;
    const motileCount = totalCount * (mNum / 100);
    const normalCount = totalCount * (morphNum / 100);
    const fertilityScore = calcFertilityScore(cNum, mNum, morphNum, vitNum);
    let grade: string;
    if (fertilityScore >= 90) grade = "excellent";
    else if (fertilityScore >= 70) grade = "good";
    else if (fertilityScore >= 50) grade = "fair";
    else grade = "poor";
    return { totalCount, motileCount, normalCount, fertilityScore, grade };
  }, [allValid, cNum, vNum, mNum, morphNum, vitNum]);

  function reset() {
    setSpermCount(""); setSemenVolume(""); setMotility(""); setMorphology("");
    setVitality(""); setPh(""); setLiquefaction(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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
        applicationCategory: "HealthApplication",
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
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
            {[
              { id: "sa-count", label: t("field.spermCount"), val: spermCount, set: setSpermCount, ph: t("placeholder.spermCount") },
              { id: "sa-vol", label: t("field.semenVolume"), val: semenVolume, set: setSemenVolume, ph: t("placeholder.semenVolume") },
              { id: "sa-mot", label: t("field.motility"), val: motility, set: setMotility, ph: t("placeholder.motility") },
              { id: "sa-morph", label: t("field.morphology"), val: morphology, set: setMorphology, ph: t("placeholder.morphology") },
              { id: "sa-vit", label: t("field.vitality"), val: vitality, set: setVitality, ph: t("placeholder.vitality") },
              { id: "sa-ph", label: t("field.ph"), val: ph, set: setPh, ph: t("placeholder.ph") },
              { id: "sa-liq", label: t("field.liquefaction"), val: liquefaction, set: setLiquefaction, ph: t("placeholder.liquefaction") },
            ].map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input id={f.id} type="number" inputMode="decimal" value={f.val}
                  placeholder={f.ph}
                  onChange={(e) => { f.set(e.target.value); setTouched(true); }} />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.totalCount")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.totalCount.toFixed(1)} {t("result.unitMillions")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.motileCount")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.motileCount.toFixed(1)} {t("result.unitMillions")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.normalCount")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.normalCount.toFixed(1)} {t("result.unitMillions")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.fertilityScore")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.fertilityScore} {t("result.outOf")}
                  </div>
                </div>
              </div>
              <div className="rounded border border-zinc-300 bg-white p-3 text-sm">
                <span className="font-semibold text-zinc-700">{t("result.qualityGrade")}: </span>
                <span className="font-bold text-zinc-900">{t(`grade.${result.grade}` as never)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (<li key={i}>{s}</li>))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
