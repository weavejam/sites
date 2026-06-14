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

// Standard sea-level air density
const RHO_METRIC = 1.225; // kg/m³
const RHO_IMPERIAL = 0.002377; // slugs/ft³

type UnitSystem = "metric" | "imperial";

function formatNum(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

export default function WingLoadingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.wing-loading-calculator");

  const [weight, setWeight] = React.useState("");
  const [wingArea, setWingArea] = React.useState("");
  const [unitSystem, setUnitSystem] = React.useState<UnitSystem>("metric");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);
  const wingAreaNum = parseFloat(wingArea);

  const valid =
    weight !== "" && wingArea !== "" &&
    Number.isFinite(weightNum) && Number.isFinite(wingAreaNum) &&
    weightNum > 0 && wingAreaNum > 0;

  const result = React.useMemo<{
    wingLoading: number;
    wingLoadingUnit: string;
    stallSpeed: number;
    stallSpeedUnit: string;
    clMaxAssumed: number;
  } | null>(() => {
    if (!valid) return null;
    // Wing loading = Weight / Wing Area
    const wingLoading = weightNum / wingAreaNum;
    // Stall speed: Vs = sqrt(2 * W / (ρ * S * CLmax))
    // Assuming typical CLmax = 1.5 for general aircraft
    const clMaxAssumed = 1.5;
    let rho: number;
    let stallSpeed: number;
    let stallSpeedUnit: string;
    let wingLoadingUnit: string;
    if (unitSystem === "metric") {
      rho = RHO_METRIC;
      // Weight in kg, need to convert to N: W_N = weight_kg * g
      const weightN = weightNum * 9.81;
      stallSpeed = Math.sqrt((2 * weightN) / (rho * wingAreaNum * clMaxAssumed));
      stallSpeedUnit = "m/s";
      wingLoadingUnit = "kg/m²";
    } else {
      rho = RHO_IMPERIAL;
      // Weight in lbs, wing area in ft²
      const weightLbs = weightNum;
      stallSpeed = Math.sqrt((2 * weightLbs) / (rho * wingAreaNum * clMaxAssumed));
      stallSpeedUnit = "ft/s";
      wingLoadingUnit = "lb/ft²";
    }
    return { wingLoading, wingLoadingUnit, stallSpeed, stallSpeedUnit, clMaxAssumed };
  }, [valid, weightNum, wingAreaNum, unitSystem]);

  function loadExample(w: string, s: string, unit: UnitSystem) {
    setWeight(w); setWingArea(s); setUnitSystem(unit);
    setTouched(true);
  }

  function reset() {
    setWeight(""); setWingArea(""); setUnitSystem("metric");
    setTouched(false);
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

  const UNIT_SYSTEMS: UnitSystem[] = ["metric", "imperial"];
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
          <div className="space-y-2">
            <Label>{t("field.unitSystem")}</Label>
            <div className="flex flex-wrap gap-2">
              {UNIT_SYSTEMS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={unitSystem === u ? "default" : "outline"}
                  onClick={() => { setUnitSystem(u); setTouched(false); }}
                >
                  {t(`type.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wlg-w">{t("field.aircraftWeight")}</Label>
              <Input
                id="wlg-w"
                type="number"
                inputMode="decimal"
                value={weight}
                placeholder={t("placeholder.aircraftWeight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wlg-s">{t("field.wingArea")}</Label>
              <Input
                id="wlg-s"
                type="number"
                inputMode="decimal"
                value={wingArea}
                placeholder={t("placeholder.wingArea")}
                onChange={(e) => { setWingArea(e.target.value); setTouched(true); }}
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
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.wingLoading", {
                  value: formatNum(result.wingLoading),
                  unit: result.wingLoadingUnit,
                })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.stallSpeed", {
                  value: formatNum(result.stallSpeed),
                  unit: result.stallSpeedUnit,
                })}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.clmaxNote", { value: result.clMaxAssumed.toString() })}
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
            onClick={() => loadExample("1111", "16.2", "metric")}>
            {t("examples.loadCessna")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("600", "12.5", "metric")}>
            {t("examples.loadGlider")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("2.5", "0.8", "metric")}>
            {t("examples.loadRC")}
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
