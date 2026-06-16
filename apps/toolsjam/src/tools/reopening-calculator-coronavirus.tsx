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

type FacilityType =
  | "outdoor"
  | "retail"
  | "restaurant"
  | "office"
  | "school"
  | "healthcare"
  | "entertainment"
  | "gym"
  | "transportation"
  | "";
type TestingLevel = "readilyAvailable" | "moderate" | "limited" | "unavailable" | "";
type VentilationLevel = "outdoor" | "excellent" | "good" | "moderate" | "poor" | "";
type MaskPolicy = "required" | "requiredWhenNotSeated" | "recommended" | "optional" | "none" | "";
type TracingLevel = "strong" | "moderate" | "weak" | "none" | "";

interface ReopeningResult {
  safetyScore: number;
  phase: 1 | 2 | 3 | 4;
  capacityPercent: number;
  recommendedCapacity: number;
  riskKey: "low" | "moderate" | "high" | "veryHigh";
  timelineKey: "ready" | "weeks2to4" | "months1to2" | "months3to6";
}

function computeReopening(
  facilityCapacity: number,
  transmissionRate: number,
  vaccinationRate: number,
  healthcareCapacity: number,
  testing: TestingLevel,
  ventilation: VentilationLevel,
  mask: MaskPolicy,
  tracing: TracingLevel,
): ReopeningResult {
  const transmissionScore = Math.max(0, ((100 - Math.min(transmissionRate, 100)) / 100) * 30);
  const vaccinationScore = (vaccinationRate / 100) * 25;
  const healthcareScore = (healthcareCapacity / 100) * 20;

  const testingScores: Record<string, number> = {
    readilyAvailable: 10,
    moderate: 6,
    limited: 3,
    unavailable: 0,
  };
  const ventilationScores: Record<string, number> = {
    outdoor: 8,
    excellent: 8,
    good: 6,
    moderate: 4,
    poor: 0,
  };
  const maskScores: Record<string, number> = {
    required: 5,
    requiredWhenNotSeated: 4,
    recommended: 2,
    optional: 1,
    none: 0,
  };
  const tracingScores: Record<string, number> = {
    strong: 2,
    moderate: 1,
    weak: 0,
    none: 0,
  };

  const safetyScore = Math.round(
    transmissionScore +
      vaccinationScore +
      healthcareScore +
      (testingScores[testing] ?? 0) +
      (ventilationScores[ventilation] ?? 0) +
      (maskScores[mask] ?? 0) +
      (tracingScores[tracing] ?? 0),
  );

  let phase: 1 | 2 | 3 | 4;
  let capacityPercent: number;
  let riskKey: ReopeningResult["riskKey"];
  let timelineKey: ReopeningResult["timelineKey"];

  if (safetyScore >= 75) {
    phase = 4;
    capacityPercent = 100;
    riskKey = "low";
    timelineKey = "ready";
  } else if (safetyScore >= 55) {
    phase = 3;
    capacityPercent = 75;
    riskKey = "moderate";
    timelineKey = "weeks2to4";
  } else if (safetyScore >= 30) {
    phase = 2;
    capacityPercent = 50;
    riskKey = "high";
    timelineKey = "months1to2";
  } else {
    phase = 1;
    capacityPercent = 25;
    riskKey = "veryHigh";
    timelineKey = "months3to6";
  }

  const recommendedCapacity = Math.round((facilityCapacity * capacityPercent) / 100);

  return {
    safetyScore,
    phase,
    capacityPercent,
    recommendedCapacity,
    riskKey,
    timelineKey,
  };
}

const SELECT_CLASS =
  "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none";

export default function ReopeningCalculatorCoronavirus(_props: { locale: Locale }) {
  const t = useTranslations("tool.reopening-calculator-coronavirus");

  const [facilityType, setFacilityType] = React.useState<FacilityType>("");
  const [facilityCapacity, setFacilityCapacity] = React.useState("");
  const [transmissionRate, setTransmissionRate] = React.useState("");
  const [vaccinationRate, setVaccinationRate] = React.useState("");
  const [healthcareCapacity, setHealthcareCapacity] = React.useState("");
  const [testing, setTesting] = React.useState<TestingLevel>("");
  const [ventilation, setVentilation] = React.useState<VentilationLevel>("");
  const [mask, setMask] = React.useState<MaskPolicy>("");
  const [tracing, setTracing] = React.useState<TracingLevel>("");
  const [touched, setTouched] = React.useState(false);

  const capacityNum = parseFloat(facilityCapacity);
  const transmissionNum = parseFloat(transmissionRate);
  const vaccinationNum = parseFloat(vaccinationRate);
  const healthcareNum = parseFloat(healthcareCapacity);

  const isValid =
    Number.isFinite(capacityNum) &&
    capacityNum > 0 &&
    Number.isFinite(transmissionNum) &&
    transmissionNum >= 0 &&
    transmissionNum <= 1000 &&
    Number.isFinite(vaccinationNum) &&
    vaccinationNum >= 0 &&
    vaccinationNum <= 100 &&
    Number.isFinite(healthcareNum) &&
    healthcareNum >= 0 &&
    healthcareNum <= 100 &&
    facilityType !== "" &&
    testing !== "" &&
    ventilation !== "" &&
    mask !== "" &&
    tracing !== "";

  const result = React.useMemo<ReopeningResult | null>(() => {
    if (!isValid) return null;
    return computeReopening(
      capacityNum,
      transmissionNum,
      vaccinationNum,
      healthcareNum,
      testing,
      ventilation,
      mask,
      tracing,
    );
  }, [isValid, capacityNum, transmissionNum, vaccinationNum, healthcareNum, testing, ventilation, mask, tracing]);

  function loadExample(
    ft: FacilityType,
    cap: string,
    trans: string,
    vacc: string,
    health: string,
    test: TestingLevel,
    vent: VentilationLevel,
    msk: MaskPolicy,
    trc: TracingLevel,
  ) {
    setFacilityType(ft);
    setFacilityCapacity(cap);
    setTransmissionRate(trans);
    setVaccinationRate(vacc);
    setHealthcareCapacity(health);
    setTesting(test);
    setVentilation(vent);
    setMask(msk);
    setTracing(trc);
    setTouched(true);
  }

  function reset() {
    setFacilityType("");
    setFacilityCapacity("");
    setTransmissionRate("");
    setVaccinationRate("");
    setHealthcareCapacity("");
    setTesting("");
    setVentilation("");
    setMask("");
    setTracing("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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
        applicationCategory: "HealthApplication",
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
              <Label htmlFor="rcc-facility-type">{t("field.facilityType")}</Label>
              <select
                id="rcc-facility-type"
                value={facilityType}
                onChange={(e) => { setFacilityType(e.target.value as FacilityType); setTouched(true); }}
                className={SELECT_CLASS}
              >
                <option value="">{t("placeholder.facilityType")}</option>
                <option value="outdoor">{t("option.facilityType_outdoor")}</option>
                <option value="retail">{t("option.facilityType_retail")}</option>
                <option value="restaurant">{t("option.facilityType_restaurant")}</option>
                <option value="office">{t("option.facilityType_office")}</option>
                <option value="school">{t("option.facilityType_school")}</option>
                <option value="healthcare">{t("option.facilityType_healthcare")}</option>
                <option value="entertainment">{t("option.facilityType_entertainment")}</option>
                <option value="gym">{t("option.facilityType_gym")}</option>
                <option value="transportation">{t("option.facilityType_transportation")}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcc-capacity">{t("field.facilityCapacity")}</Label>
              <Input
                id="rcc-capacity"
                type="number"
                inputMode="numeric"
                value={facilityCapacity}
                placeholder={t("placeholder.facilityCapacity")}
                onChange={(e) => { setFacilityCapacity(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcc-transmission">{t("field.communityTransmission")}</Label>
              <Input
                id="rcc-transmission"
                type="number"
                inputMode="decimal"
                value={transmissionRate}
                placeholder={t("placeholder.communityTransmission")}
                onChange={(e) => { setTransmissionRate(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcc-vaccination">{t("field.vaccinationRate")}</Label>
              <Input
                id="rcc-vaccination"
                type="number"
                inputMode="decimal"
                value={vaccinationRate}
                placeholder={t("placeholder.vaccinationRate")}
                onChange={(e) => { setVaccinationRate(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcc-healthcare">{t("field.healthcareCapacity")}</Label>
              <Input
                id="rcc-healthcare"
                type="number"
                inputMode="decimal"
                value={healthcareCapacity}
                placeholder={t("placeholder.healthcareCapacity")}
                onChange={(e) => { setHealthcareCapacity(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcc-testing">{t("field.testingAvailability")}</Label>
              <select
                id="rcc-testing"
                value={testing}
                onChange={(e) => { setTesting(e.target.value as TestingLevel); setTouched(true); }}
                className={SELECT_CLASS}
              >
                <option value="">{t("placeholder.testingAvailability")}</option>
                <option value="readilyAvailable">{t("option.testing_readilyAvailable")}</option>
                <option value="moderate">{t("option.testing_moderate")}</option>
                <option value="limited">{t("option.testing_limited")}</option>
                <option value="unavailable">{t("option.testing_unavailable")}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcc-ventilation">{t("field.ventilationQuality")}</Label>
              <select
                id="rcc-ventilation"
                value={ventilation}
                onChange={(e) => { setVentilation(e.target.value as VentilationLevel); setTouched(true); }}
                className={SELECT_CLASS}
              >
                <option value="">{t("placeholder.ventilationQuality")}</option>
                <option value="outdoor">{t("option.ventilation_outdoor")}</option>
                <option value="excellent">{t("option.ventilation_excellent")}</option>
                <option value="good">{t("option.ventilation_good")}</option>
                <option value="moderate">{t("option.ventilation_moderate")}</option>
                <option value="poor">{t("option.ventilation_poor")}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcc-mask">{t("field.maskPolicy")}</Label>
              <select
                id="rcc-mask"
                value={mask}
                onChange={(e) => { setMask(e.target.value as MaskPolicy); setTouched(true); }}
                className={SELECT_CLASS}
              >
                <option value="">{t("placeholder.maskPolicy")}</option>
                <option value="required">{t("option.mask_required")}</option>
                <option value="requiredWhenNotSeated">{t("option.mask_requiredWhenNotSeated")}</option>
                <option value="recommended">{t("option.mask_recommended")}</option>
                <option value="optional">{t("option.mask_optional")}</option>
                <option value="none">{t("option.mask_none")}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcc-tracing">{t("field.contactTracing")}</Label>
              <select
                id="rcc-tracing"
                value={tracing}
                onChange={(e) => { setTracing(e.target.value as TracingLevel); setTouched(true); }}
                className={SELECT_CLASS}
              >
                <option value="">{t("placeholder.contactTracing")}</option>
                <option value="strong">{t("option.tracing_strong")}</option>
                <option value="moderate">{t("option.tracing_moderate")}</option>
                <option value="weak">{t("option.tracing_weak")}</option>
                <option value="none">{t("option.tracing_none")}</option>
              </select>
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

          {touched && !isValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.phase")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t(`result.phase${result.phase}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.capacityLimit")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.recommendedCapacity} {t("result.people")} ({result.capacityPercent}%)
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.safetyScore")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {result.safetyScore} {t("result.outOf")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.riskLevel")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t(`result.risk_${result.riskKey}` as never)}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.timeline")}</div>
                <div className="mt-1 text-sm text-zinc-800">
                  {t(`result.timeline_${result.timelineKey}` as never)}
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.requirements")}</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-zinc-700">
                  {(t.raw(`result.phase${result.phase}_reqs` as never) as string[]).map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Example quick-load buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("retail", "50", "30", "70", "85", "readilyAvailable", "good", "required", "moderate")}
        >
          {t("examples.loadRetail")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("school", "400", "15", "85", "90", "readilyAvailable", "moderate", "required", "strong")}
        >
          {t("examples.loadSchool")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("entertainment", "200", "120", "40", "60", "limited", "poor", "recommended", "weak")}
        >
          {t("examples.loadHighRisk")}
        </Button>
      </div>

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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
