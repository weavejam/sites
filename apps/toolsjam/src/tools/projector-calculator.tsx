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

type AspectRatioKey = "16_9" | "16_10" | "4_3" | "21_9";

const ASPECT_RATIOS: Record<AspectRatioKey, [number, number]> = {
  "16_9": [16, 9],
  "16_10": [16, 10],
  "4_3": [4, 3],
  "21_9": [21, 9],
};

const ASPECT_KEYS: AspectRatioKey[] = ["16_9", "16_10", "4_3", "21_9"];

// Convert square meters to square feet
function m2ToFt2(m2: number): number {
  return m2 * 10.7639;
}

// Convert meters to inches
function mToIn(m: number): number {
  return m * 39.3701;
}

export default function ProjectorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.projector-calculator");
  const [distance, setDistance] = React.useState("");
  const [throwRatio, setThrowRatio] = React.useState("");
  const [aspectRatio, setAspectRatio] = React.useState<AspectRatioKey>("16_9");
  const [lumens, setLumens] = React.useState("");
  const [screenGain, setScreenGain] = React.useState("1");
  const [touched, setTouched] = React.useState(false);

  const dNum = parseFloat(distance);
  const trNum = parseFloat(throwRatio);
  const lumNum = parseFloat(lumens);
  const gainNum = parseFloat(screenGain);

  const valid =
    Number.isFinite(dNum) && dNum > 0 &&
    Number.isFinite(trNum) && trNum > 0 &&
    Number.isFinite(lumNum) && lumNum > 0 &&
    Number.isFinite(gainNum) && gainNum > 0;

  const result = React.useMemo(() => {
    if (!valid) return null;
    const [aw, ah] = ASPECT_RATIOS[aspectRatio];
    const screenWidthM = dNum / trNum; // meters
    const screenHeightM = screenWidthM * (ah / aw); // meters
    const screenAreaM2 = screenWidthM * screenHeightM;
    const screenAreaFt2 = m2ToFt2(screenAreaM2);
    const screenDiagM = Math.sqrt(screenWidthM * screenWidthM + screenHeightM * screenHeightM);
    const screenDiagIn = mToIn(screenDiagM);

    // Foot-lamberts: lumens × gain / area_ft²
    const brightnessFtL = (lumNum * gainNum) / screenAreaFt2;
    // Approximate lux at screen: 1 ftL ≈ 3.426 lux
    const brightnessLux = brightnessFtL * 3.426;

    return {
      screenWidthM,
      screenHeightM,
      screenAreaM2,
      screenDiagIn,
      brightnessFtL,
      brightnessLux,
    };
  }, [valid, dNum, trNum, aspectRatio, lumNum, gainNum]);

  const recKey = React.useMemo((): string | null => {
    if (!result) return null;
    if (result.screenDiagIn < 40) return "screenTooSmall";
    if (result.screenDiagIn > 200) return "screenTooBig";
    if (result.brightnessFtL >= 30) return "bright";
    if (result.brightnessFtL >= 12) return "good";
    return "low";
  }, [result]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  function loadExample(d: string, tr: string, ar: AspectRatioKey, lm: string, sg: string) {
    setDistance(d);
    setThrowRatio(tr);
    setAspectRatio(ar);
    setLumens(lm);
    setScreenGain(sg);
    setTouched(true);
  }

  function reset() {
    setDistance("");
    setThrowRatio("");
    setAspectRatio("16_9");
    setLumens("");
    setScreenGain("1");
    setTouched(false);
  }

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
            <Label>{t("field.aspectRatio")}</Label>
            <div className="flex flex-wrap gap-2">
              {ASPECT_KEYS.map((key) => (
                <Button
                  key={key}
                  type="button"
                  variant={aspectRatio === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setAspectRatio(key); setTouched(false); }}
                >
                  {t(`aspectRatio.${key}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="proj-d">{t("field.distance")}</Label>
              <Input
                id="proj-d"
                type="number"
                inputMode="decimal"
                min={0.1}
                step={0.1}
                value={distance}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setDistance(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proj-tr">{t("field.throwRatio")}</Label>
              <Input
                id="proj-tr"
                type="number"
                inputMode="decimal"
                min={0.1}
                step={0.1}
                value={throwRatio}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setThrowRatio(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proj-lm">{t("field.lumens")}</Label>
              <Input
                id="proj-lm"
                type="number"
                inputMode="numeric"
                min={100}
                value={lumens}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setLumens(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proj-sg">{t("field.screenGain")}</Label>
              <Input
                id="proj-sg"
                type="number"
                inputMode="decimal"
                min={0.5}
                max={3}
                step={0.1}
                value={screenGain}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setScreenGain(e.target.value); setTouched(true); }}
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

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && valid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.screenWidth")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{result.screenWidthM.toFixed(2)} m</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.screenHeight")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{result.screenHeightM.toFixed(2)} m</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.screenDiag")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{result.screenDiagIn.toFixed(1)}&quot;</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.brightnessFtl")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{result.brightnessFtL.toFixed(1)} ftL</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.brightnessLux")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{result.brightnessLux.toFixed(0)} lux</div>
                </div>
                {recKey && (
                  <div className="rounded border bg-white p-3">
                    <div className="text-xs text-zinc-500">{t("recommendation.heading")}</div>
                    <div className="text-sm font-semibold text-zinc-900">
                      {t(`recommendation.${recKey}` as never)}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-500">{t("result.formula")}</p>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("3.5", "1.2", "16_9", "3000", "1")}>
            {t("button.loadHomeTheater")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1.8", "0.8", "16_9", "2500", "1.2")}>
            {t("button.loadShortThrow")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("2.8", "1.1", "4_3", "3500", "1")}>
            {t("button.loadConferenceRoom")}
          </Button>
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
