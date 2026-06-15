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

type SkinType = "type1" | "type2" | "type3" | "type4" | "type5" | "type6";
type TimeOfDay = "earlyMorning" | "morning" | "noon" | "afternoon" | "evening";

// Base minutes to sunburn for each skin type at UV index 1, no SPF
const BASE_MINUTES: Record<SkinType, number> = {
  type1: 67,
  type2: 100,
  type3: 133,
  type4: 200,
  type5: 300,
  type6: 600,
};

// Approximate vitamin D IU per minute at UV index 7, skin type III, 50% body exposure
const VIT_D_BASE_IU_PER_MIN = 30;
const VIT_D_SKIN_FACTORS: Record<SkinType, number> = {
  type1: 1.6,
  type2: 1.4,
  type3: 1.0,
  type4: 0.7,
  type5: 0.45,
  type6: 0.3,
};

function calcSafeMinutes(
  uvIndex: number,
  skinType: SkinType,
  sunAngleDeg: number,
  spf: number
): number {
  // Effective UV is scaled by UV index and cosine of sun angle
  const angleFactor = Math.max(0.1, Math.cos(((90 - sunAngleDeg) * Math.PI) / 180));
  const effectiveUV = uvIndex * angleFactor;
  const baseMin = BASE_MINUTES[skinType];
  const safeMin = (baseMin / effectiveUV) * spf;
  return Math.min(safeMin, 480); // cap at 8 hours
}

function calcVitaminD(
  uvIndex: number,
  skinType: SkinType,
  sunAngleDeg: number,
  exposureMin: number
): number {
  const angleFactor = Math.max(0.1, Math.cos(((90 - sunAngleDeg) * Math.PI) / 180));
  const uvFactor = uvIndex / 7;
  const iuPerMin = VIT_D_BASE_IU_PER_MIN * uvFactor * angleFactor * VIT_D_SKIN_FACTORS[skinType];
  return Math.round(iuPerMin * exposureMin);
}

function getRiskLabel(
  uvIndex: number,
  skinType: SkinType,
  safeMin: number,
  exposureMin: number
): string {
  const ratio = exposureMin / safeMin;
  if (uvIndex <= 2 || ratio < 0.5) return "low";
  if (ratio < 0.8) return "moderate";
  if (ratio < 1.0) return "high";
  if (ratio < 1.5) return "veryHigh";
  return "extreme";
}

function fmt(n: number, dec = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}

export default function SunbathingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sunbathing-calculator");

  const SKIN_TYPES: SkinType[] = ["type1", "type2", "type3", "type4", "type5", "type6"];
  const TIME_OPTIONS: TimeOfDay[] = ["earlyMorning", "morning", "noon", "afternoon", "evening"];

  const [uvIndex, setUvIndex] = React.useState("");
  const [skinType, setSkinType] = React.useState<SkinType | "">("type3");
  const [sunAngle, setSunAngle] = React.useState("");
  const [spfFactor, setSpfFactor] = React.useState("");
  const [exposureTime, setExposureTime] = React.useState("");
  const [timeOfDay, setTimeOfDay] = React.useState<TimeOfDay | "">("");
  const [latitude, setLatitude] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    const uv = parseFloat(uvIndex);
    const angle = parseFloat(sunAngle);
    const spf = parseFloat(spfFactor) || 1;
    const exposure = parseFloat(exposureTime) || 0;

    if (!skinType || !Number.isFinite(uv) || uv <= 0 || !Number.isFinite(angle)) return null;

    const safeMin = calcSafeMinutes(uv, skinType, angle, spf);
    const vitD = calcVitaminD(uv, skinType, angle, exposure || safeMin * 0.5);
    const riskKey = getRiskLabel(uv, skinType, safeMin, exposure || safeMin * 0.5);

    return { safeMin, vitD, riskKey };
  }, [uvIndex, skinType, sunAngle, spfFactor, exposureTime]);

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

  const riskColors: Record<string, string> = {
    low: "text-green-600",
    moderate: "text-yellow-600",
    high: "text-orange-500",
    veryHigh: "text-red-500",
    extreme: "text-red-700",
  };

  function reset() {
    setUvIndex("");
    setSkinType("");
    setSunAngle("");
    setSpfFactor("");
    setExposureTime("");
    setTimeOfDay("");
    setLatitude("");
    setTouched(false);
  }

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
              <Label htmlFor="sun-uv">{t("field.uvIndex")}</Label>
              <Input
                id="sun-uv"
                type="number"
                inputMode="decimal"
                value={uvIndex}
                placeholder={t("placeholder.uvIndex")}
                min={0}
                max={20}
                onChange={(e) => { setUvIndex(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sun-skin">{t("field.skinType")}</Label>
              <select
                id="sun-skin"
                value={skinType}
                onChange={(e) => { setSkinType(e.target.value as SkinType); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-200"
              >
                <option value="">{t("field.skinType")}</option>
                {SKIN_TYPES.map((st) => (
                  <option key={st} value={st}>{t(`skinType.${st}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sun-angle">{t("field.sunAngle")}</Label>
              <Input
                id="sun-angle"
                type="number"
                inputMode="decimal"
                value={sunAngle}
                placeholder={t("placeholder.sunAngle")}
                min={0}
                max={90}
                onChange={(e) => { setSunAngle(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sun-spf">{t("field.spfFactor")}</Label>
              <Input
                id="sun-spf"
                type="number"
                inputMode="decimal"
                value={spfFactor}
                placeholder={t("placeholder.spf")}
                min={1}
                onChange={(e) => { setSpfFactor(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sun-exp">{t("field.exposureTime")}</Label>
              <Input
                id="sun-exp"
                type="number"
                inputMode="decimal"
                value={exposureTime}
                placeholder={t("placeholder.exposure")}
                min={0}
                onChange={(e) => { setExposureTime(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sun-tod">{t("field.timeOfDay")}</Label>
              <select
                id="sun-tod"
                value={timeOfDay}
                onChange={(e) => { setTimeOfDay(e.target.value as TimeOfDay); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-200"
              >
                <option value="">{t("field.timeOfDay")}</option>
                {TIME_OPTIONS.map((tod) => (
                  <option key={tod} value={tod}>{t(`timeOfDay.${tod}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sun-lat">{t("field.latitude")}</Label>
              <Input
                id="sun-lat"
                type="number"
                inputMode="decimal"
                value={latitude}
                placeholder={t("placeholder.latitude")}
                min={-90}
                max={90}
                onChange={(e) => { setLatitude(e.target.value); setTouched(true); }}
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

          {result && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.safeExposure")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {fmt(result.safeMin, 0)} {t("result.minutes")}
                  </div>
                  {parseFloat(spfFactor) > 1 && (
                    <div className="text-xs text-zinc-500 mt-1">{t("result.spfNote")}</div>
                  )}
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.vitaminD")}</div>
                  <div className="text-2xl font-bold text-zinc-900">~{result.vitD.toLocaleString("en-US")}</div>
                  <div className="text-xs text-zinc-500">{t("result.iu")}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.sunburnRisk")}</div>
                  <div className={`text-2xl font-bold ${riskColors[result.riskKey] ?? "text-zinc-900"}`}>
                    {t(`result.${result.riskKey}` as never)}
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
