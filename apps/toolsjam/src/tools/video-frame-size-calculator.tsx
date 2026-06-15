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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes.toFixed(0) + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  return (bytes / (1024 * 1024 * 1024)).toFixed(3) + " GB";
}

export default function VideoFrameSizeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.video-frame-size-calculator");

  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [bitDepth, setBitDepth] = React.useState("");
  const [channels, setChannels] = React.useState("");
  const [compressionRatio, setCompressionRatio] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const wNum = parseFloat(width);
  const hNum = parseFloat(height);
  const bdNum = parseFloat(bitDepth);
  const chNum = parseFloat(channels);
  const crNum = parseFloat(compressionRatio);

  const allValid =
    width !== "" && Number.isFinite(wNum) && wNum > 0 &&
    height !== "" && Number.isFinite(hNum) && hNum > 0 &&
    bitDepth !== "" && Number.isFinite(bdNum) && bdNum > 0 &&
    channels !== "" && Number.isFinite(chNum) && chNum > 0 &&
    compressionRatio !== "" && Number.isFinite(crNum) && crNum > 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const totalPixels = wNum * hNum;
    const uncompressedBytes = (totalPixels * bdNum * chNum) / 8;
    const compressedBytes = uncompressedBytes / crNum;
    return { totalPixels, uncompressedBytes, compressedBytes };
  }, [allValid, wNum, hNum, bdNum, chNum, crNum]);

  function reset() {
    setWidth("");
    setHeight("");
    setBitDepth("");
    setChannels("");
    setCompressionRatio("");
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

  const showError = touched && !allValid;

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
              <Label htmlFor="vfr-width">{t("field.width")}</Label>
              <Input
                id="vfr-width"
                type="number"
                inputMode="decimal"
                value={width}
                placeholder="1920"
                onChange={(e) => { setWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vfr-height">{t("field.height")}</Label>
              <Input
                id="vfr-height"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder="1080"
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vfr-bitdepth">{t("field.bitDepth")}</Label>
              <Input
                id="vfr-bitdepth"
                type="number"
                inputMode="decimal"
                value={bitDepth}
                placeholder="8"
                onChange={(e) => { setBitDepth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vfr-channels">{t("field.channels")}</Label>
              <Input
                id="vfr-channels"
                type="number"
                inputMode="decimal"
                value={channels}
                placeholder="3"
                onChange={(e) => { setChannels(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="vfr-compression">{t("field.compressionRatio")}</Label>
              <Input
                id="vfr-compression"
                type="number"
                inputMode="decimal"
                value={compressionRatio}
                placeholder="1"
                onChange={(e) => { setCompressionRatio(e.target.value); setTouched(true); }}
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

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.resolution")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {wNum.toLocaleString("en-US")} × {hNum.toLocaleString("en-US")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalPixels")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.totalPixels.toLocaleString("en-US")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.uncompressedSize")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatBytes(result.uncompressedBytes)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.compressedSize")} —{" "}
                    {t("result.compressionNote", { ratio: crNum.toFixed(1) })}
                  </div>
                  <div className="text-lg font-semibold text-emerald-700">
                    {formatBytes(result.compressedBytes)}
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
