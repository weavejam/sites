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

type VideoFormat = "mp4" | "mov" | "avi" | "mkv" | "webm";
type BitDepthKey = "8" | "10" | "12";

const FORMAT_COMPRESSION: Record<VideoFormat, number> = {
  mp4: 0.005,
  mov: 0.05,
  avi: 0.9,
  mkv: 0.003,
  webm: 0.004,
};

const BIT_DEPTHS: BitDepthKey[] = ["8", "10", "12"];
const FORMATS: VideoFormat[] = ["mp4", "mov", "avi", "mkv", "webm"];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes.toFixed(0) + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
}

function formatBitrate(bps: number): string {
  if (bps < 1000) return bps.toFixed(0) + " bps";
  if (bps < 1_000_000) return (bps / 1000).toFixed(1) + " kbps";
  return (bps / 1_000_000).toFixed(2) + " Mbps";
}

export default function VideoFileSizeCalculatorByFormat(_props: { locale: Locale }) {
  const t = useTranslations("tool.video-file-size-calculator-by-format");

  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [frameRate, setFrameRate] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [format, setFormat] = React.useState<VideoFormat>("mp4");
  const [bitDepth, setBitDepth] = React.useState<BitDepthKey>("8");
  const [audioBitrate, setAudioBitrate] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const wNum = parseFloat(width);
  const hNum = parseFloat(height);
  const fpsNum = parseFloat(frameRate);
  const durNum = parseFloat(duration);
  const audioNum = parseFloat(audioBitrate);
  const bdNum = parseInt(bitDepth, 10);

  const requiredValid =
    width !== "" && Number.isFinite(wNum) && wNum > 0 &&
    height !== "" && Number.isFinite(hNum) && hNum > 0 &&
    frameRate !== "" && Number.isFinite(fpsNum) && fpsNum > 0 &&
    duration !== "" && Number.isFinite(durNum) && durNum > 0;

  const result = React.useMemo(() => {
    if (!requiredValid) return null;
    const compressionFactor = FORMAT_COMPRESSION[format];
    const videoBitrateBps = wNum * hNum * fpsNum * bdNum * compressionFactor;
    const durationSecs = durNum * 60;
    const videoBytes = (videoBitrateBps * durationSecs) / 8;
    const audioBps = audioBitrate !== "" && Number.isFinite(audioNum) && audioNum > 0
      ? audioNum * 1000
      : 0;
    const audioBytes = (audioBps * durationSecs) / 8;
    const totalBytes = videoBytes + audioBytes;
    return { videoBitrateBps, videoBytes, audioBytes, totalBytes };
  }, [requiredValid, wNum, hNum, fpsNum, durNum, format, bdNum, audioBitrate, audioNum]);

  function reset() {
    setWidth("");
    setHeight("");
    setFrameRate("");
    setDuration("");
    setFormat("mp4");
    setBitDepth("8");
    setAudioBitrate("");
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

  const showError = touched && !requiredValid;

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
              <Label htmlFor="vfs-width">{t("field.width")}</Label>
              <Input
                id="vfs-width"
                type="number"
                inputMode="decimal"
                value={width}
                placeholder="1920"
                onChange={(e) => { setWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vfs-height">{t("field.height")}</Label>
              <Input
                id="vfs-height"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder="1080"
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vfs-fps">{t("field.frameRate")}</Label>
              <Input
                id="vfs-fps"
                type="number"
                inputMode="decimal"
                value={frameRate}
                placeholder="30"
                onChange={(e) => { setFrameRate(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vfs-duration">{t("field.duration")}</Label>
              <Input
                id="vfs-duration"
                type="number"
                inputMode="decimal"
                value={duration}
                placeholder="10"
                onChange={(e) => { setDuration(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vfs-format">{t("field.format")}</Label>
              <select
                id="vfs-format"
                value={format}
                onChange={(e) => setFormat(e.target.value as VideoFormat)}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                {FORMATS.map((f) => (
                  <option key={f} value={f}>{t(`format.${f}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vfs-bitdepth">{t("field.bitDepth")}</Label>
              <select
                id="vfs-bitdepth"
                value={bitDepth}
                onChange={(e) => setBitDepth(e.target.value as BitDepthKey)}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                {BIT_DEPTHS.map((b) => (
                  <option key={b} value={b}>{t(`bitDepth.${b}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="vfs-audio">{t("field.audioBitrate")}</Label>
              <Input
                id="vfs-audio"
                type="number"
                inputMode="decimal"
                value={audioBitrate}
                placeholder="128"
                onChange={(e) => { setAudioBitrate(e.target.value); setTouched(true); }}
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
              <div className="text-3xl font-bold text-zinc-900">
                {formatBytes(result.totalBytes)}
              </div>
              <div className="grid gap-2 sm:grid-cols-3 text-sm">
                <div>
                  <div className="text-zinc-500">{t("result.videoSize")}</div>
                  <div className="font-medium">{formatBytes(result.videoBytes)}</div>
                </div>
                {result.audioBytes > 0 && (
                  <div>
                    <div className="text-zinc-500">{t("result.audioSize")}</div>
                    <div className="font-medium">{formatBytes(result.audioBytes)}</div>
                  </div>
                )}
                <div>
                  <div className="text-zinc-500">{t("result.bitrate")}</div>
                  <div className="font-medium">{formatBitrate(result.videoBitrateBps)}</div>
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
