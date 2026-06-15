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

type FilmFormat = "35mm" | "16mm" | "super8" | "70mm";

// Running speed in feet per minute at 24 fps
const BASE_SPEED: Record<FilmFormat, number> = {
  "35mm": 90,
  "16mm": 36,
  "super8": 18,
  "70mm": 180,
};

const FORMATS: FilmFormat[] = ["35mm", "16mm", "super8", "70mm"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function FilmCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.film-calculator");

  const [format, setFormat] = React.useState<FilmFormat>("35mm");
  const [fps, setFps] = React.useState("24");
  const [duration, setDuration] = React.useState("");
  const [reelLength, setReelLength] = React.useState("");
  const [reelCost, setReelCost] = React.useState("");
  const [processingCost, setProcessingCost] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const fpsNum = parseFloat(fps);
  const durationNum = parseFloat(duration);
  const reelLengthNum = parseFloat(reelLength);
  const reelCostNum = parseFloat(reelCost);
  const processingCostNum = parseFloat(processingCost) || 0;

  const valid =
    Number.isFinite(fpsNum) && fpsNum > 0 &&
    duration !== "" && Number.isFinite(durationNum) && durationNum > 0 &&
    reelLength !== "" && Number.isFinite(reelLengthNum) && reelLengthNum > 0;

  const result = React.useMemo(() => {
    if (!valid) return null;
    const runningSpeed = BASE_SPEED[format] * (fpsNum / 24);
    const totalFilmLength = runningSpeed * durationNum;
    const numReels = Math.ceil(totalFilmLength / reelLengthNum);
    const filmStockCost = numReels * (reelCostNum || 0);
    const totalProcessingCost = totalFilmLength * processingCostNum;
    const totalCost = filmStockCost + totalProcessingCost;
    const runtime = totalFilmLength / runningSpeed;
    return { runningSpeed, totalFilmLength, numReels, filmStockCost, totalProcessingCost, totalCost, runtime };
  }, [valid, format, fpsNum, durationNum, reelLengthNum, reelCostNum, processingCostNum]);

  function loadExample(f: FilmFormat, fpsVal: string, dur: string, reel: string, rc: string, pc: string) {
    setFormat(f);
    setFps(fpsVal);
    setDuration(dur);
    setReelLength(reel);
    setReelCost(rc);
    setProcessingCost(pc);
    setTouched(true);
  }

  function reset() {
    setFormat("35mm");
    setFps("24");
    setDuration("");
    setReelLength("");
    setReelCost("");
    setProcessingCost("");
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
            <Label>{t("field.format")}</Label>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <Button
                  key={f}
                  type="button"
                  variant={format === f ? "default" : "outline"}
                  onClick={() => { setFormat(f); setTouched(false); }}
                >
                  {t(`type.${f}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fc-fps">{t("field.fps")}</Label>
              <Input
                id="fc-fps"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={fps}
                placeholder="24"
                onChange={(e) => { setFps(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fc-duration">{t("field.duration")}</Label>
              <Input
                id="fc-duration"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={duration}
                placeholder={t("placeholder.duration")}
                onChange={(e) => { setDuration(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fc-reel-length">{t("field.reelLength")}</Label>
              <Input
                id="fc-reel-length"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={reelLength}
                placeholder={t("placeholder.reelLength")}
                onChange={(e) => { setReelLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fc-reel-cost">{t("field.reelCost")}</Label>
              <Input
                id="fc-reel-cost"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={reelCost}
                placeholder={t("placeholder.reelCost")}
                onChange={(e) => { setReelCost(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fc-processing">{t("field.processingCost")}</Label>
              <Input
                id="fc-processing"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={processingCost}
                placeholder={t("placeholder.processingCost")}
                onChange={(e) => { setProcessingCost(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2 mt-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.totalLength")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatNum(result.totalFilmLength, 0)} {t("result.feet")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.numReels")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.numReels} {t("result.reels")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.filmCost")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    ${formatNum(result.filmStockCost, 2)}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.totalCost")}</span>
                  <div className="text-lg font-semibold text-zinc-900">
                    ${formatNum(result.totalCost, 2)}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("35mm", "24", "90", "1000", "150", "0.25")}>
            {t("examples.loadFeature")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("16mm", "24", "15", "400", "80", "0.15")}>
            {t("examples.loadShort")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("super8", "24", "60", "200", "25", "0.10")}>
            {t("examples.loadDoc")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
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
