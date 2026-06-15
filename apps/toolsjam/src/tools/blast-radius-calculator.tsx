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

type BlastType = "surface" | "air" | "underground";

// Effective yield multipliers by blast type
const YIELD_FACTOR: Record<BlastType, number> = {
  surface: 1.8,
  air: 1.0,
  underground: 0.7,
};

const P_ATM = 101325; // Pa

function overpressurePa(scaledDist: number): number {
  // Brode (1955) model: P_s = P_atm * (0.84/Z + 0.27/Z² + 0.70/Z³)
  const Z = scaledDist;
  return P_ATM * (0.84 / Z + 0.27 / (Z * Z) + 0.7 / (Z * Z * Z));
}

// Find R for a given overpressure threshold (binary search)
function radiusForPressure(thresholdPa: number, effectiveYield: number): number {
  let lo = 0.01;
  let hi = 1e6;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const Z = mid / Math.pow(effectiveYield, 1 / 3);
    if (overpressurePa(Z) > thresholdPa) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function fmtNum(n: number, dp = 1): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  return n.toFixed(dp);
}

interface BlastResult {
  effectiveYield: number;
  scaledDistance: number;
  overpressureKPa: number;
  fireballRadius: number;
  lethalRadius: number;
  dangerRadius: number;
  safeRadius: number;
  category: string;
}

function computeBlast(
  yieldKg: number,
  heightM: number,
  distanceM: number,
  blastType: BlastType,
  safetyFactor: number,
): BlastResult {
  const effectiveYield = yieldKg * YIELD_FACTOR[blastType];
  const W13 = Math.pow(effectiveYield, 1 / 3);
  // Use slant distance from detonation point
  const slantDist = Math.sqrt(distanceM * distanceM + heightM * heightM);
  const scaledDistance = slantDist / W13;
  const overpressurePaVal = overpressurePa(scaledDistance);
  const overpressureKPa = overpressurePaVal / 1000;

  const fireballRadius = 3.9 * Math.pow(yieldKg, 1 / 3) * safetyFactor;
  const lethalRadius = radiusForPressure(100000, effectiveYield) * safetyFactor;
  const dangerRadius = radiusForPressure(34500, effectiveYield) * safetyFactor;
  const safeRadius = radiusForPressure(7000, effectiveYield) * safetyFactor;

  let category: string;
  if (overpressureKPa < 7) category = "safe";
  else if (overpressureKPa < 34.5) category = "moderate";
  else if (overpressureKPa < 100) category = "severe";
  else category = "lethal";

  return {
    effectiveYield,
    scaledDistance,
    overpressureKPa,
    fireballRadius,
    lethalRadius,
    dangerRadius,
    safeRadius,
    category,
  };
}

export default function BlastRadiusCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.blast-radius-calculator");

  const [yieldVal, setYieldVal] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [blastType, setBlastType] = React.useState<BlastType>("surface");
  const [safetyFactor, setSafetyFactor] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const yNum = parseFloat(yieldVal);
  const hNum = parseFloat(height);
  const dNum = parseFloat(distance);
  const sfNum = parseFloat(safetyFactor);

  const yValid = yieldVal !== "" && Number.isFinite(yNum) && yNum > 0;
  const hValid = height !== "" && Number.isFinite(hNum) && hNum >= 0;
  const dValid = distance !== "" && Number.isFinite(dNum) && dNum > 0;
  const sfValid = safetyFactor === "" || (Number.isFinite(sfNum) && sfNum >= 1);

  const allValid = yValid && hValid && dValid && sfValid;
  const showError = touched && !allValid && !(touched && !sfValid);
  const showSfError = touched && !sfValid;

  const sf = safetyFactor === "" ? 1 : sfNum;
  const h = hNum;

  const result = React.useMemo<BlastResult | null>(() => {
    if (!yValid || !hValid || !dValid || !sfValid) return null;
    return computeBlast(yNum, h, dNum, blastType, sf);
  }, [yValid, hValid, dValid, sfValid, yNum, h, dNum, blastType, sf]);

  function loadExample(y: string, h_: string, d: string, type: BlastType, sf_: string) {
    setYieldVal(y); setHeight(h_); setDistance(d); setBlastType(type); setSafetyFactor(sf_);
    setTouched(true);
  }

  function reset() {
    setYieldVal(""); setHeight(""); setDistance(""); setSafetyFactor(""); setTouched(false);
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

  const blastTypes: BlastType[] = ["surface", "air", "underground"];

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
              <Label htmlFor="br-yield">{t("field.yield")}</Label>
              <Input
                id="br-yield"
                type="number"
                inputMode="decimal"
                min="0"
                value={yieldVal}
                placeholder={t("placeholder.yield")}
                onChange={(e) => { setYieldVal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-height">{t("field.height")}</Label>
              <Input
                id="br-height"
                type="number"
                inputMode="decimal"
                min="0"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-dist">{t("field.distance")}</Label>
              <Input
                id="br-dist"
                type="number"
                inputMode="decimal"
                min="0"
                value={distance}
                placeholder={t("placeholder.distance")}
                onChange={(e) => { setDistance(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-type">{t("field.blastType")}</Label>
              <select
                id="br-type"
                value={blastType}
                onChange={(e) => setBlastType(e.target.value as BlastType)}
                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              >
                {blastTypes.map((bt) => (
                  <option key={bt} value={bt}>{t(`blastType.${bt}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-sf">{t("field.safetyFactor")}</Label>
              <Input
                id="br-sf"
                type="number"
                inputMode="decimal"
                min="1"
                step="0.1"
                value={safetyFactor}
                placeholder={t("placeholder.safetyFactor")}
                onChange={(e) => { setSafetyFactor(e.target.value); setTouched(true); }}
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
          {showSfError && (
            <p className="text-sm text-red-600">{t("error.safetyFactor")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.effectiveYield")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtNum(result.effectiveYield)} {t("result.unitKgTNT")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.scaledDistance")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtNum(result.scaledDistance, 3)} {t("result.unitMkg13")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.overpressure")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtNum(result.overpressureKPa)} {t("result.unitKPa")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.category")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t(`result.categories.${result.category}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.fireballRadius")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtNum(result.fireballRadius)} {t("result.unitM")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.lethalRadius")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtNum(result.lethalRadius)} {t("result.unitM")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dangerRadius")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtNum(result.dangerRadius)} {t("result.unitM")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.safeRadius")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtNum(result.safeRadius)} {t("result.unitM")}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500 pt-1">{t("result.formula")}</div>
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
            onClick={() => loadExample("100", "0", "50", "surface", "1.5")}>
            {t("examples.loadMilitary")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("500", "0", "100", "surface", "2")}>
            {t("examples.loadIndustrial")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("50", "20", "30", "air", "1")}>
            {t("examples.loadAirBurst")}
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
