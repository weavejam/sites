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

type GlassType = "standard" | "tempered" | "laminated" | "acrylic";
const GLASS_TYPES: GlassType[] = ["standard", "tempered", "laminated", "acrylic"];

// Characteristic bending/tensile strength in MPa for each material
const MATERIAL_STRENGTH: Record<GlassType, number> = {
  standard: 45,
  tempered: 120,
  laminated: 52,
  acrylic: 65,
};

const STANDARD_THICKNESSES = [4, 5, 6, 8, 10, 12, 15, 19, 25];

function roundUpToStandard(mm: number): number {
  for (const t of STANDARD_THICKNESSES) {
    if (t >= mm) return t;
  }
  return Math.ceil(mm);
}

function fmt(n: number, dec = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}

interface GlassResult {
  calculatedMm: number;
  recommendedMm: number;
  pressurePa: number;
}

function calcGlassThickness(
  length: number, width: number, height: number,
  waterLevel: number, glassType: GlassType, safetyFactor: number, waterDensity: number
): GlassResult | null {
  if (
    !Number.isFinite(length) || length <= 0 ||
    !Number.isFinite(width) || width <= 0 ||
    !Number.isFinite(height) || height <= 0 ||
    !Number.isFinite(waterLevel) || waterLevel <= 0 || waterLevel > 100 ||
    !Number.isFinite(safetyFactor) || safetyFactor <= 0 ||
    !Number.isFinite(waterDensity) || waterDensity <= 0
  ) return null;

  const h_m = (height * (waterLevel / 100)) / 100; // water height in metres
  const pressurePa = waterDensity * 9.81 * h_m;

  // Evaluate front/back panels (Length×Height) and side panels (Width×Height)
  // For plate bending, the governing span is the shorter dimension of each panel.
  // Take the maximum required thickness across all vertical panels (worst case).
  const a_front = Math.min(length, height) / 100; // governing span for front/back panels
  const a_side = Math.min(width, height) / 100;   // governing span for side panels
  const a_m = Math.max(a_front, a_side);           // worst-case panel span

  const sigma_material = MATERIAL_STRENGTH[glassType] * 1e6; // Pa
  const sigma_allow = sigma_material / safetyFactor;

  // Plate bending formula: t = a * sqrt(3 * P / (4 * sigma_allow))
  const t_m = a_m * Math.sqrt((3 * pressurePa) / (4 * sigma_allow));
  const calculatedMm = t_m * 1000;
  const recommendedMm = roundUpToStandard(calculatedMm);

  return { calculatedMm, recommendedMm, pressurePa };
}

export default function AquariumGlassThicknessCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.aquarium-glass-thickness-calculator");

  const [length, setLength] = React.useState("");
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [waterLevel, setWaterLevel] = React.useState("90");
  const [glassType, setGlassType] = React.useState<GlassType>("standard");
  const [safetyFactor, setSafetyFactor] = React.useState("3.8");
  const [waterDensity, setWaterDensity] = React.useState("1000");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    return calcGlassThickness(
      parseFloat(length), parseFloat(width), parseFloat(height),
      parseFloat(waterLevel), glassType, parseFloat(safetyFactor), parseFloat(waterDensity)
    );
  }, [touched, length, width, height, waterLevel, glassType, safetyFactor, waterDensity]);

  function loadExample(l: string, w: string, h: string, wl: string, gt: GlassType, sf: string, wd: string) {
    setLength(l); setWidth(w); setHeight(h);
    setWaterLevel(wl); setGlassType(gt);
    setSafetyFactor(sf); setWaterDensity(wd);
    setTouched(true);
  }

  function reset() {
    setLength(""); setWidth(""); setHeight("");
    setWaterLevel("90"); setGlassType("standard");
    setSafetyFactor("3.8"); setWaterDensity("1000");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
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

  const showError = touched && result === null;

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
              <Label htmlFor="agt-l">{t("field.length")}</Label>
              <Input id="agt-l" type="number" inputMode="decimal" min="0" step="any"
                value={length} placeholder={t("placeholder.dimension")}
                onChange={(e) => { setLength(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agt-w">{t("field.width")}</Label>
              <Input id="agt-w" type="number" inputMode="decimal" min="0" step="any"
                value={width} placeholder={t("placeholder.dimension")}
                onChange={(e) => { setWidth(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agt-h">{t("field.height")}</Label>
              <Input id="agt-h" type="number" inputMode="decimal" min="0" step="any"
                value={height} placeholder={t("placeholder.dimension")}
                onChange={(e) => { setHeight(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agt-wl">{t("field.waterLevel")}</Label>
              <Input id="agt-wl" type="number" inputMode="decimal" min="1" max="100" step="any"
                value={waterLevel} placeholder={t("placeholder.percent")}
                onChange={(e) => { setWaterLevel(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agt-gt">{t("field.glassType")}</Label>
              <select
                id="agt-gt"
                value={glassType}
                onChange={(e) => { setGlassType(e.target.value as GlassType); setTouched(false); }}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {GLASS_TYPES.map((gt) => (
                  <option key={gt} value={gt}>{t(`glassType.${gt}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="agt-sf">{t("field.safetyFactor")}</Label>
              <Input id="agt-sf" type="number" inputMode="decimal" min="1" step="0.1"
                value={safetyFactor} placeholder={t("placeholder.safety")}
                onChange={(e) => { setSafetyFactor(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agt-wd">{t("field.waterDensity")}</Label>
              <Input id="agt-wd" type="number" inputMode="decimal" min="0" step="any"
                value={waterDensity} placeholder={t("placeholder.density")}
                onChange={(e) => { setWaterDensity(e.target.value); setTouched(false); }} />
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.calculated")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.calculatedMm)} {t("result.unitMm")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.recommended")}</span>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.recommendedMm} {t("result.unitMm")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.pressure")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.pressurePa, 0)} {t("result.unitPa")}
                  </div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("60", "40", "40", "90", "standard", "3.8", "1000")}>
            {t("examples.loadSmall")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("100", "50", "50", "90", "tempered", "3.8", "1025")}>
            {t("examples.loadMedium")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("150", "60", "60", "90", "standard", "3.8", "1000")}>
            {t("examples.loadLarge")}
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
