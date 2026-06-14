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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

type VolumeUnit = "m3" | "L" | "mL" | "cm3" | "ft3" | "in3" | "gal";
type DensityUnit = "kg_m3" | "g_cm3" | "lb_ft3";

// Conversion factors to base SI units (m³ and kg/m³)
const volumeToM3: Record<VolumeUnit, number> = {
  m3: 1,
  L: 1e-3,
  mL: 1e-6,
  cm3: 1e-6,
  ft3: 0.028316846592,
  in3: 1.6387064e-5,
  gal: 3.785411784e-3,
};

const densityToKgM3: Record<DensityUnit, number> = {
  kg_m3: 1,
  g_cm3: 1000,
  lb_ft3: 16.018463374,
};

function formatNumber(value: number, decimals = 4): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs === 0) return "0";
  if (abs >= 0.001 && abs < 1e12) {
    const rounded = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return rounded.toLocaleString("en-US", { maximumFractionDigits: decimals });
  }
  return value.toExponential(4);
}

export default function VolumeToMassCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.volume-to-mass-calculator");
  const [volume, setVolume] = React.useState("");
  const [volumeUnit, setVolumeUnit] = React.useState<VolumeUnit>("m3");
  const [density, setDensity] = React.useState("");
  const [densityUnit, setDensityUnit] = React.useState<DensityUnit>("kg_m3");
  const [touched, setTouched] = React.useState(false);

  const parsedVolume = volume === "" ? NaN : parseFloat(volume);
  const parsedDensity = density === "" ? NaN : parseFloat(density);

  const valid =
    Number.isFinite(parsedVolume) &&
    Number.isFinite(parsedDensity) &&
    parsedVolume > 0 &&
    parsedDensity > 0;

  const massKg = valid
    ? parsedVolume * volumeToM3[volumeUnit] * parsedDensity * densityToKgM3[densityUnit]
    : null;
  const massG = massKg !== null ? massKg * 1000 : null;
  const massLb = massKg !== null ? massKg * 2.20462262185 : null;

  function reset() {
    setVolume("");
    setVolumeUnit("m3");
    setDensity("");
    setDensityUnit("kg_m3");
    setTouched(false);
  }

  function loadExample(v: string, vu: VolumeUnit, d: string, du: DensityUnit) {
    setVolume(v);
    setVolumeUnit(vu);
    setDensity(d);
    setDensityUnit(du);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const volumeUnitOptions: { value: VolumeUnit; label: string }[] = [
    { value: "m3", label: t("unit.m3") },
    { value: "L", label: t("unit.L") },
    { value: "mL", label: t("unit.mL") },
    { value: "cm3", label: t("unit.cm3") },
    { value: "ft3", label: t("unit.ft3") },
    { value: "in3", label: t("unit.in3") },
    { value: "gal", label: t("unit.gal") },
  ];

  const densityUnitOptions: { value: DensityUnit; label: string }[] = [
    { value: "kg_m3", label: t("unit.kg_m3") },
    { value: "g_cm3", label: t("unit.g_cm3") },
    { value: "lb_ft3", label: t("unit.lb_ft3") },
  ];

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vtm-volume">{t("field.volume")}</Label>
              <div className="flex gap-2">
                <Input
                  id="vtm-volume"
                  type="number"
                  inputMode="decimal"
                  value={volume}
                  placeholder={t("placeholder.volume")}
                  className="flex-1"
                  onChange={(e) => { setVolume(e.target.value); setTouched(true); }}
                />
                <select
                  aria-label={t("field.volumeUnit")}
                  value={volumeUnit}
                  className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onChange={(e) => { setVolumeUnit(e.target.value as VolumeUnit); setTouched(true); }}
                >
                  {volumeUnitOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vtm-density">{t("field.density")}</Label>
              <div className="flex gap-2">
                <Input
                  id="vtm-density"
                  type="number"
                  inputMode="decimal"
                  value={density}
                  placeholder={t("placeholder.density")}
                  className="flex-1"
                  onChange={(e) => { setDensity(e.target.value); setTouched(true); }}
                />
                <select
                  aria-label={t("field.densityUnit")}
                  value={densityUnit}
                  className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onChange={(e) => { setDensityUnit(e.target.value as DensityUnit); setTouched(true); }}
                >
                  {densityUnitOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
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

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {massKg !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelKg")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(massKg)} {t("unit.kg")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelG")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(massG!)} {t("unit.g")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelLb")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(massLb!)} {t("unit.lb")}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("1000", "L", "1000", "kg_m3")}
            >
              {t("examples.loadWater")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("0.1", "m3", "2700", "kg_m3")}
            >
              {t("examples.loadAluminum")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("1", "m3", "7850", "kg_m3")}
            >
              {t("examples.loadSteel")}
            </Button>
          </div>
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
