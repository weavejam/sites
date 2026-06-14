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

// Air density at sea level (kg/m³)
const AIR_DENSITY = 1.225;

// Exposure category coefficients (terrain roughness factor)
const EXPOSURE_COEFFICIENTS: Record<string, number> = {
  "1": 1.0,  // Open terrain
  "2": 0.85, // Suburban/woodland
  "3": 0.7,  // Urban/city centers
};

function formatNum(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

type ExposureCategory = "1" | "2" | "3";

export default function WindLoadCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.wind-load-calculator");

  const [windSpeed, setWindSpeed] = React.useState("");
  const [buildingHeight, setBuildingHeight] = React.useState("");
  const [buildingWidth, setBuildingWidth] = React.useState("");
  const [buildingLength, setBuildingLength] = React.useState("");
  const [exposureCategory, setExposureCategory] = React.useState<ExposureCategory>("2");
  const [dragCoefficient, setDragCoefficient] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const vsn = parseFloat(windSpeed);
  const hn = parseFloat(buildingHeight);
  const wn = parseFloat(buildingWidth);
  const ln = parseFloat(buildingLength);
  const cdn = parseFloat(dragCoefficient);

  const valid =
    windSpeed !== "" && buildingHeight !== "" && buildingWidth !== "" &&
    buildingLength !== "" && dragCoefficient !== "" &&
    Number.isFinite(vsn) && Number.isFinite(hn) && Number.isFinite(wn) &&
    Number.isFinite(ln) && Number.isFinite(cdn) &&
    vsn > 0 && hn > 0 && wn > 0 && ln > 0 && cdn > 0;

  const result = React.useMemo<{
    dynamicPressure: number;
    windPressure: number;
    frontArea: number;
    totalForce: number;
    windwardForce: number;
  } | null>(() => {
    if (!valid) return null;
    const exposureFactor = EXPOSURE_COEFFICIENTS[exposureCategory] ?? 0.85;
    // Dynamic pressure: q = 0.5 * ρ * v²
    const dynamicPressure = 0.5 * AIR_DENSITY * vsn * vsn;
    // Wind pressure: p = q * Cd * Ce (exposure factor)
    const windPressure = dynamicPressure * cdn * exposureFactor;
    // Front area (windward face)
    const frontArea = hn * wn;
    // Total wind force on front face
    const windwardForce = windPressure * frontArea;
    // Total force considering front and side effects (simplified)
    const totalForce = windwardForce;
    return { dynamicPressure, windPressure, frontArea, totalForce, windwardForce };
  }, [valid, vsn, hn, wn, ln, cdn, exposureCategory]);

  function loadExample(
    vs: string, h: string, w: string, l: string,
    exp: ExposureCategory, cd: string
  ) {
    setWindSpeed(vs); setBuildingHeight(h); setBuildingWidth(w);
    setBuildingLength(l); setExposureCategory(exp); setDragCoefficient(cd);
    setTouched(true);
  }

  function reset() {
    setWindSpeed(""); setBuildingHeight(""); setBuildingWidth("");
    setBuildingLength(""); setDragCoefficient("");
    setExposureCategory("2"); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
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

  const EXPOSURE_CATEGORIES: ExposureCategory[] = ["1", "2", "3"];
  const showError = touched && !valid;

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="wl-ws">{t("field.windSpeed")}</Label>
              <Input
                id="wl-ws"
                type="number"
                inputMode="decimal"
                value={windSpeed}
                placeholder={t("placeholder.windSpeed")}
                onChange={(e) => { setWindSpeed(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wl-bh">{t("field.buildingHeight")}</Label>
              <Input
                id="wl-bh"
                type="number"
                inputMode="decimal"
                value={buildingHeight}
                placeholder={t("placeholder.buildingHeight")}
                onChange={(e) => { setBuildingHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wl-bw">{t("field.buildingWidth")}</Label>
              <Input
                id="wl-bw"
                type="number"
                inputMode="decimal"
                value={buildingWidth}
                placeholder={t("placeholder.buildingWidth")}
                onChange={(e) => { setBuildingWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wl-bl">{t("field.buildingLength")}</Label>
              <Input
                id="wl-bl"
                type="number"
                inputMode="decimal"
                value={buildingLength}
                placeholder={t("placeholder.buildingLength")}
                onChange={(e) => { setBuildingLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wl-cd">{t("field.dragCoefficient")}</Label>
              <Input
                id="wl-cd"
                type="number"
                inputMode="decimal"
                value={dragCoefficient}
                placeholder={t("placeholder.dragCoefficient")}
                onChange={(e) => { setDragCoefficient(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.exposureCategory")}</Label>
            <div className="flex flex-wrap gap-2">
              {EXPOSURE_CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  type="button"
                  variant={exposureCategory === cat ? "default" : "outline"}
                  onClick={() => { setExposureCategory(cat); setTouched(true); }}
                >
                  {t(`type.exposure${cat}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.exposure${exposureCategory}_desc` as never)}
            </p>
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
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.totalForce", { value: formatNum(result.totalForce) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.dynamicPressure", { value: formatNum(result.dynamicPressure) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.windPressure", { value: formatNum(result.windPressure) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.frontArea", { value: formatNum(result.frontArea) })}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
            onClick={() => loadExample("20", "8", "12", "15", "2", "1.3")}>
            {t("examples.loadResidential")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("30", "50", "25", "40", "3", "1.4")}>
            {t("examples.loadCommercial")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("25", "15", "60", "100", "1", "1.2")}>
            {t("examples.loadIndustrial")}
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
