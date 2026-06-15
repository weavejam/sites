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

type MaterialPreset = "drySand" | "coal" | "grain" | "limestone" | "custom";

interface MaterialDefaults {
  frictionCoef: string;
  particleSize: string;
  moistureContent: string;
  bulkDensity: string;
}

const PRESETS: Record<Exclude<MaterialPreset, "custom">, MaterialDefaults> = {
  drySand:   { frictionCoef: "0.65", particleSize: "0.5",  moistureContent: "2",  bulkDensity: "1600" },
  coal:      { frictionCoef: "0.55", particleSize: "25",   moistureContent: "8",  bulkDensity: "1200" },
  grain:     { frictionCoef: "0.45", particleSize: "5",    moistureContent: "12", bulkDensity: "800"  },
  limestone: { frictionCoef: "0.70", particleSize: "15",   moistureContent: "3",  bulkDensity: "1500" },
};

function particleCorrection(size_mm: number): number {
  if (size_mm < 0.1) return 2.0;
  if (size_mm < 1.0) return 1.0;
  if (size_mm < 10)  return 0.0;
  return -1.0;
}

function moistureCorrection(moisture_pct: number): number {
  if (moisture_pct <= 0)  return 0;
  if (moisture_pct <= 5)  return moisture_pct * 0.3;
  if (moisture_pct <= 15) return 1.5 + (moisture_pct - 5) * 0.2;
  return 3.5 - (moisture_pct - 15) * 0.1;
}

function flowClass(angle: number): string {
  if (angle < 20) return "veryFree";
  if (angle < 30) return "free";
  if (angle < 40) return "moderate";
  if (angle < 50) return "cohesive";
  return "veryCohesive";
}

function computeAngleOfRepose(
  mu: number, size_mm: number, moisture: number
): number | null {
  if (!Number.isFinite(mu) || !Number.isFinite(size_mm) || !Number.isFinite(moisture)) return null;
  if (mu <= 0 || size_mm < 0 || moisture < 0 || moisture > 100) return null;
  const base = Math.atan(mu) * (180 / Math.PI);
  const pc = particleCorrection(size_mm);
  const mc = moistureCorrection(moisture);
  return Math.max(1, Math.min(89, base + pc + mc));
}

function fmt(n: number, dec = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}

export default function AngleOfReposeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.angle-of-repose-calculator");

  const [materialType, setMaterialType] = React.useState<MaterialPreset>("drySand");
  const [frictionCoef, setFrictionCoef] = React.useState(PRESETS.drySand.frictionCoef);
  const [particleSize, setParticleSize] = React.useState(PRESETS.drySand.particleSize);
  const [moistureContent, setMoistureContent] = React.useState(PRESETS.drySand.moistureContent);
  const [bulkDensity, setBulkDensity] = React.useState(PRESETS.drySand.bulkDensity);
  const [touched, setTouched] = React.useState(false);

  function applyPreset(preset: MaterialPreset) {
    setMaterialType(preset);
    if (preset !== "custom") {
      const d = PRESETS[preset];
      setFrictionCoef(d.frictionCoef);
      setParticleSize(d.particleSize);
      setMoistureContent(d.moistureContent);
      setBulkDensity(d.bulkDensity);
    }
    setTouched(false);
  }

  function reset() {
    applyPreset("drySand");
    setTouched(false);
  }

  const result = React.useMemo<number | null>(() => {
    if (!touched) return null;
    return computeAngleOfRepose(
      parseFloat(frictionCoef),
      parseFloat(particleSize),
      parseFloat(moistureContent)
    );
  }, [touched, frictionCoef, particleSize, moistureContent]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const showError = touched && result === null;
  const materialOptions: MaterialPreset[] = ["drySand", "coal", "grain", "limestone", "custom"];

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
          <div className="space-y-2">
            <Label htmlFor="aor-mat">{t("field.materialType")}</Label>
            <select
              id="aor-mat"
              value={materialType}
              onChange={(e) => applyPreset(e.target.value as MaterialPreset)}
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
            >
              {materialOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {t(`materialOption.${opt}` as never)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="aor-mu">{t("field.frictionCoef")}</Label>
              <Input
                id="aor-mu"
                type="number"
                inputMode="decimal"
                step="0.01"
                value={frictionCoef}
                placeholder={t("placeholder.frictionCoef")}
                onChange={(e) => { setFrictionCoef(e.target.value); setMaterialType("custom"); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aor-size">{t("field.particleSize")}</Label>
              <Input
                id="aor-size"
                type="number"
                inputMode="decimal"
                value={particleSize}
                placeholder={t("placeholder.particleSize")}
                onChange={(e) => { setParticleSize(e.target.value); setMaterialType("custom"); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aor-moist">{t("field.moistureContent")}</Label>
              <Input
                id="aor-moist"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                value={moistureContent}
                placeholder={t("placeholder.moistureContent")}
                onChange={(e) => { setMoistureContent(e.target.value); setMaterialType("custom"); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aor-den">{t("field.bulkDensity")}</Label>
              <Input
                id="aor-den"
                type="number"
                inputMode="decimal"
                value={bulkDensity}
                placeholder={t("placeholder.bulkDensity")}
                onChange={(e) => { setBulkDensity(e.target.value); setMaterialType("custom"); setTouched(false); }}
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

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => { applyPreset("drySand"); setTouched(true); }}>
              {t("examples.loadSand")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => { applyPreset("coal"); setTouched(true); }}>
              {t("examples.loadCoal")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => { applyPreset("grain"); setTouched(true); }}>
              {t("examples.loadGrain")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => { applyPreset("limestone"); setTouched(true); }}>
              {t("examples.loadLimestone")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-3xl font-semibold text-zinc-900">
                {fmt(result)}° <span className="text-lg text-zinc-500">({t("result.angleLabel")})</span>
              </div>
              <div>
                <span className="text-xs text-zinc-500">{t("result.classLabel")}: </span>
                <span className="text-sm font-medium text-zinc-800">
                  {t(`result.class.${flowClass(result)}` as never)}
                </span>
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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
