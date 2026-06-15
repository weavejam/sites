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

function formatNum(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

function getRainfallCategory(intensity: number): string {
  if (intensity < 2.5) return "light";
  if (intensity < 7.5) return "moderate";
  if (intensity <= 50) return "heavy";
  return "veryHeavy";
}

export default function RainfallCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.rainfall-calculator");

  const [intensity, setIntensity] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [area, setArea] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const intensityNum = parseFloat(intensity);
  const durationNum = parseFloat(duration);
  const areaNum = parseFloat(area);

  const intensityValid = intensity !== "" && Number.isFinite(intensityNum) && intensityNum > 0;
  const durationValid = duration !== "" && Number.isFinite(durationNum) && durationNum > 0;
  const areaValid = area === "" || (Number.isFinite(areaNum) && areaNum > 0);

  const result = React.useMemo(() => {
    if (!intensityValid || !durationValid) return null;
    const totalRainfall = intensityNum * durationNum;
    const volume = area !== "" && areaValid ? (totalRainfall / 1000) * areaNum * 1_000_000 : null;
    const category = getRainfallCategory(intensityNum);
    return { totalRainfall, volume, category };
  }, [intensityNum, durationNum, areaNum, intensityValid, durationValid, area, areaValid]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
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

  function reset() {
    setIntensity("");
    setDuration("");
    setArea("");
    setTouched(false);
  }

  const showError = touched && (!intensityValid || !durationValid || !areaValid);

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
            <div className="space-y-2">
              <Label htmlFor="rc-intensity">{t("field.intensity")}</Label>
              <Input
                id="rc-intensity"
                type="number"
                inputMode="decimal"
                min="0"
                value={intensity}
                placeholder={t("placeholder.intensity")}
                onChange={(e) => { setIntensity(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rc-duration">{t("field.duration")}</Label>
              <Input
                id="rc-duration"
                type="number"
                inputMode="decimal"
                min="0"
                value={duration}
                placeholder={t("placeholder.duration")}
                onChange={(e) => { setDuration(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="rc-area">{t("field.area")}</Label>
              <Input
                id="rc-area"
                type="number"
                inputMode="decimal"
                min="0"
                value={area}
                placeholder={t("placeholder.area")}
                onChange={(e) => { setArea(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-semibold text-zinc-900">
                  {formatNum(result.totalRainfall)} {t("result.mm")}
                </div>
                <div className="text-sm text-zinc-600">
                  {t("result.totalRainfall")}
                </div>
                {result.volume !== null && (
                  <>
                    <div className="text-xl font-semibold text-zinc-900 mt-2">
                      {formatNum(result.volume, 0)} {t("result.m3")}
                    </div>
                    <div className="text-sm text-zinc-600">{t("result.volume")}</div>
                  </>
                )}
                <div className="mt-2 text-sm text-zinc-700">
                  {t("result.category")}: {t(`category.${result.category}` as never)}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
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
