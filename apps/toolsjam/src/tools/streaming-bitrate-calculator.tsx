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

function fmt(n: number, dec = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

export default function StreamingBitrateCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.streaming-bitrate-calculator");

  const [resWidth, setResWidth] = React.useState("");
  const [resHeight, setResHeight] = React.useState("");
  const [frameRate, setFrameRate] = React.useState("");
  const [colorDepth, setColorDepth] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [numStreams, setNumStreams] = React.useState("");
  const [compressionFactor, setCompressionFactor] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    const w = parseFloat(resWidth);
    const h = parseFloat(resHeight);
    const fps = parseFloat(frameRate);
    const cd = parseFloat(colorDepth);
    const dur = parseFloat(duration);
    const ns = parseFloat(numStreams) || 1;
    const cf = parseFloat(compressionFactor);

    if (![w, h, fps, cd, dur, cf].every((v) => Number.isFinite(v) && v > 0)) return null;

    // Bitrate in Mbps
    const bitrateMbps = (w * h * fps * cd * cf) / 1_000_000;
    // File size in MB: bitrate(Mbps) * duration(s) / 8
    const durationSec = dur * 60;
    const fileSizeMB = (bitrateMbps * durationSec) / 8;
    const fileSizeGB = fileSizeMB / 1024;
    // Total bandwidth with 20% overhead
    const totalBandwidthMbps = bitrateMbps * ns * 1.2;

    return { bitrateMbps, fileSizeMB, fileSizeGB, totalBandwidthMbps };
  }, [resWidth, resHeight, frameRate, colorDepth, duration, numStreams, compressionFactor]);

  const showError = touched && !result;

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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
    setResWidth("");
    setResHeight("");
    setFrameRate("");
    setColorDepth("");
    setDuration("");
    setNumStreams("");
    setCompressionFactor("");
    setTouched(false);
  }

  const fields: { id: string; label: string; val: string; set: (v: string) => void; ph: string }[] = [
    { id: "sbc-w", label: t("field.resolutionWidth"), val: resWidth, set: setResWidth, ph: t("placeholder.width") },
    { id: "sbc-h", label: t("field.resolutionHeight"), val: resHeight, set: setResHeight, ph: t("placeholder.height") },
    { id: "sbc-fps", label: t("field.frameRate"), val: frameRate, set: setFrameRate, ph: t("placeholder.fps") },
    { id: "sbc-cd", label: t("field.colorDepth"), val: colorDepth, set: setColorDepth, ph: t("placeholder.color") },
    { id: "sbc-dur", label: t("field.duration"), val: duration, set: setDuration, ph: t("placeholder.duration") },
    { id: "sbc-ns", label: t("field.numStreams"), val: numStreams, set: setNumStreams, ph: t("placeholder.streams") },
    { id: "sbc-cf", label: t("field.compressionFactor"), val: compressionFactor, set: setCompressionFactor, ph: t("placeholder.compression") },
  ];

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
            {fields.map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  type="number"
                  inputMode="decimal"
                  value={f.val}
                  placeholder={f.ph}
                  min={0}
                  onChange={(e) => {
                    f.set(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ))}
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

          {result && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.bitrate")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{fmt(result.bitrateMbps)} {t("result.mbps")}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.fileSize")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.fileSizeGB >= 1
                      ? `${fmt(result.fileSizeGB)} ${t("result.gb")}`
                      : `${fmt(result.fileSizeMB, 0)} ${t("result.mb")}`}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.totalBandwidth")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{fmt(result.totalBandwidthMbps)} {t("result.mbps")}</div>
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
