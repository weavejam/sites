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

type Quality = "Low" | "Medium" | "High" | "Ultra";
const QUALITIES: Quality[] = ["Low", "Medium", "High", "Ultra"];
const QUALITY_MULT: Record<Quality, number> = {
  Low: 0.5,
  Medium: 1.0,
  High: 2.0,
  Ultra: 4.0,
};

function formatDuration(
  minutes: number,
  t: (key: string, values?: Record<string, string | number>) => string
): string {
  if (!Number.isFinite(minutes) || minutes < 0) return "—";
  if (minutes < 1) return t("duration.lessThanOneMin");
  if (minutes < 60) return t("duration.minutes", { min: Math.round(minutes) });
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (mins === 0) return t("duration.hours", { hours });
  return t("duration.hoursMinutes", { hours, min: mins });
}

function calcRenderTime(
  polygons: number,
  resolution: number,
  numTextures: number,
  numLights: number,
  quality: Quality,
  cpuCores: number,
  gpuMem: number,
  complexity: number
): { total: number; poly: number; tex: number; light: number } {
  const qFactor = QUALITY_MULT[quality];
  const hwFactor =
    Math.sqrt(Math.max(cpuCores, 1) / 4) *
    Math.sqrt(Math.max(gpuMem, 1) / 4);
  const poly = Math.sqrt(Math.max(polygons, 0)) * 0.002 * qFactor * complexity;
  const tex =
    Math.max(numTextures, 0) *
    Math.sqrt(Math.max(resolution, 0)) *
    0.1 *
    qFactor *
    complexity;
  const light =
    Math.max(numLights, 0) * 2 * qFactor * complexity;
  const total = (poly + tex + light) / Math.max(hwFactor, 0.01);
  return { total, poly, tex, light };
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function RenderCalculator3D(_props: { locale: Locale }) {
  const t = useTranslations("tool.3d-render-calculator");

  const [polygons, setPolygons] = React.useState("");
  const [resolution, setResolution] = React.useState("");
  const [numTextures, setNumTextures] = React.useState("");
  const [numLights, setNumLights] = React.useState("");
  const [quality, setQuality] = React.useState<Quality>("Medium");
  const [cpuCores, setCpuCores] = React.useState("");
  const [gpuMem, setGpuMem] = React.useState("");
  const [complexity, setComplexity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const pPoly = parseFloat(polygons);
  const pRes = parseFloat(resolution);
  const pTex = parseFloat(numTextures);
  const pLights = parseFloat(numLights);
  const pCpu = parseFloat(cpuCores);
  const pGpu = parseFloat(gpuMem);
  const pComp = parseFloat(complexity);

  const allValid =
    polygons !== "" && Number.isFinite(pPoly) && pPoly >= 0 &&
    resolution !== "" && Number.isFinite(pRes) && pRes > 0 &&
    numTextures !== "" && Number.isFinite(pTex) && pTex >= 0 &&
    numLights !== "" && Number.isFinite(pLights) && pLights >= 0 &&
    cpuCores !== "" && Number.isFinite(pCpu) && pCpu >= 1 &&
    gpuMem !== "" && Number.isFinite(pGpu) && pGpu >= 1 &&
    complexity !== "" && Number.isFinite(pComp) && pComp > 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return calcRenderTime(pPoly, pRes, pTex, pLights, quality, pCpu, pGpu, pComp);
  }, [allValid, pPoly, pRes, pTex, pLights, quality, pCpu, pGpu, pComp]);

  function loadPreset(
    poly: string, res: string, tex: string, lights: string,
    q: Quality, cpu: string, gpu: string, comp: string
  ) {
    setPolygons(poly); setResolution(res); setNumTextures(tex);
    setNumLights(lights); setQuality(q); setCpuCores(cpu);
    setGpuMem(gpu); setComplexity(comp); setTouched(true);
  }

  function reset() {
    setPolygons(""); setResolution(""); setNumTextures(""); setNumLights("");
    setQuality("Medium"); setCpuCores(""); setGpuMem(""); setComplexity("");
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
              <Label htmlFor="rc-polygons">{t("field.polygonCount")}</Label>
              <Input
                id="rc-polygons"
                type="number"
                inputMode="numeric"
                min="0"
                value={polygons}
                placeholder={t("placeholder.polygonCount")}
                onChange={(e) => { setPolygons(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rc-resolution">{t("field.textureResolution")}</Label>
              <Input
                id="rc-resolution"
                type="number"
                inputMode="numeric"
                min="1"
                value={resolution}
                placeholder={t("placeholder.textureResolution")}
                onChange={(e) => { setResolution(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rc-textures">{t("field.numTextures")}</Label>
              <Input
                id="rc-textures"
                type="number"
                inputMode="numeric"
                min="0"
                value={numTextures}
                placeholder={t("placeholder.numTextures")}
                onChange={(e) => { setNumTextures(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rc-lights">{t("field.numLights")}</Label>
              <Input
                id="rc-lights"
                type="number"
                inputMode="numeric"
                min="0"
                value={numLights}
                placeholder={t("placeholder.numLights")}
                onChange={(e) => { setNumLights(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.renderQuality")}</Label>
              <div className="flex flex-wrap gap-2">
                {QUALITIES.map((q) => (
                  <Button
                    key={q}
                    type="button"
                    variant={quality === q ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setQuality(q); setTouched(true); }}
                  >
                    {t(`quality.${q}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rc-cpu">{t("field.cpuCores")}</Label>
              <Input
                id="rc-cpu"
                type="number"
                inputMode="numeric"
                min="1"
                value={cpuCores}
                placeholder={t("placeholder.cpuCores")}
                onChange={(e) => { setCpuCores(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rc-gpu">{t("field.gpuMem")}</Label>
              <Input
                id="rc-gpu"
                type="number"
                inputMode="numeric"
                min="1"
                value={gpuMem}
                placeholder={t("placeholder.gpuMem")}
                onChange={(e) => { setGpuMem(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rc-complexity">{t("field.complexity")}</Label>
              <Input
                id="rc-complexity"
                type="number"
                inputMode="decimal"
                min="0.1"
                max="10"
                step="0.1"
                value={complexity}
                placeholder={t("placeholder.complexity")}
                onChange={(e) => { setComplexity(e.target.value); setTouched(true); }}
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
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {formatDuration(result.total, t)}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.breakdown", {
                  poly: formatDuration(result.poly, t),
                  tex: formatDuration(result.tex, t),
                  light: formatDuration(result.light, t),
                })}
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("50000", "1024", "5", "3", "Medium", "8", "8", "1.0")}
          >
            {t("examples.loadSimple")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("2000000", "4096", "25", "12", "High", "16", "16", "1.8")}
          >
            {t("examples.loadComplex")}
          </Button>
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
