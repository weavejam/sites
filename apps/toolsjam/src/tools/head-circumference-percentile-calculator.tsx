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

// LMS reference data for head circumference (WHO/CDC-derived)
// Each entry: [ageMonths, maleM, maleS, femaleM, femaleS]
const HC_LMS: [number, number, number, number, number][] = [
  [0, 34.46, 1.27, 33.91, 1.24],
  [1, 37.25, 1.27, 36.53, 1.23],
  [2, 39.11, 1.30, 38.32, 1.24],
  [3, 40.51, 1.31, 39.63, 1.27],
  [4, 41.65, 1.31, 40.64, 1.28],
  [5, 42.57, 1.31, 41.48, 1.28],
  [6, 43.34, 1.32, 42.15, 1.30],
  [7, 44.02, 1.31, 42.74, 1.30],
  [8, 44.60, 1.32, 43.26, 1.31],
  [9, 45.10, 1.32, 43.71, 1.30],
  [10, 45.54, 1.33, 44.12, 1.31],
  [11, 45.93, 1.33, 44.48, 1.31],
  [12, 46.27, 1.33, 44.80, 1.31],
  [15, 47.00, 1.34, 45.59, 1.32],
  [18, 47.58, 1.34, 46.20, 1.33],
  [21, 48.08, 1.35, 46.71, 1.34],
  [24, 48.51, 1.35, 47.15, 1.34],
  [30, 49.21, 1.36, 47.86, 1.35],
  [36, 49.77, 1.36, 48.43, 1.35],
  [48, 50.62, 1.37, 49.30, 1.36],
  [60, 51.27, 1.38, 50.01, 1.37],
  [72, 51.81, 1.38, 50.58, 1.38],
  [96, 52.70, 1.40, 51.52, 1.40],
  [120, 53.40, 1.43, 52.24, 1.42],
  [144, 54.00, 1.46, 52.82, 1.44],
  [180, 54.80, 1.50, 53.56, 1.47],
  [216, 55.50, 1.53, 54.20, 1.50],
];

function interpolateLMS(
  ageMonths: number,
  isMale: boolean
): { mean: number; sd: number } {
  const clamped = Math.max(0, Math.min(216, ageMonths));
  let lo = HC_LMS[0];
  let hi = HC_LMS[HC_LMS.length - 1];
  for (let i = 0; i < HC_LMS.length - 1; i++) {
    if (HC_LMS[i][0] <= clamped && HC_LMS[i + 1][0] >= clamped) {
      lo = HC_LMS[i];
      hi = HC_LMS[i + 1];
      break;
    }
  }
  const t =
    hi[0] === lo[0] ? 0 : (clamped - lo[0]) / (hi[0] - lo[0]);
  if (isMale) {
    return { mean: lo[1] + t * (hi[1] - lo[1]), sd: lo[2] + t * (hi[2] - lo[2]) };
  }
  return { mean: lo[3] + t * (hi[3] - lo[3]), sd: lo[4] + t * (hi[4] - lo[4]) };
}

// Approximation of the normal CDF using a polynomial approximation
function normalCDF(z: number): number {
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911;
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1.0 + sign * y);
}

function toPercentile(z: number): number {
  return Math.round(normalCDF(z) * 1000) / 10;
}

export default function HeadCircumferencePercentileCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.head-circumference-percentile-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "">("");
  const [hc, setHc] = React.useState("");
  const [unit, setUnit] = React.useState<"cm" | "in">("cm");
  const [ethnicity, setEthnicity] = React.useState("any");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const hcNum = parseFloat(hc);
  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 0 && ageNum <= 216;
  const hcValid = hc !== "" && Number.isFinite(hcNum) && hcNum > 0;
  const genderValid = gender !== "";

  const result = React.useMemo(() => {
    if (!ageValid || !hcValid || !genderValid) return null;
    const hcCm = unit === "in" ? hcNum * 2.54 : hcNum;
    const { mean, sd } = interpolateLMS(ageNum, gender === "male");
    const z = (hcCm - mean) / sd;
    const pct = toPercentile(z);
    let category: string;
    if (pct < 3) category = t("result.categories.verySmall");
    else if (pct < 10) category = t("result.categories.small");
    else if (pct <= 90) category = t("result.categories.normal");
    else if (pct <= 97) category = t("result.categories.large");
    else category = t("result.categories.veryLarge");
    return { percentile: pct, z: Math.round(z * 100) / 100, category };
  }, [ageValid, hcValid, genderValid, ageNum, hcNum, unit, gender, t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
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

  const showError = touched && (!ageValid || !hcValid || !genderValid);

  function reset() {
    setAge(""); setGender(""); setHc(""); setUnit("cm"); setEthnicity("any"); setTouched(false);
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
              <Label htmlFor="hc-age">{t("field.age")}</Label>
              <Input
                id="hc-age"
                type="number"
                inputMode="decimal"
                min={0}
                max={216}
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.gender")}</Label>
              <div className="flex gap-2">
                {(["male", "female"] as const).map((g) => (
                  <Button
                    key={g}
                    type="button"
                    variant={gender === g ? "default" : "outline"}
                    onClick={() => { setGender(g); setTouched(true); }}
                  >
                    {t(`gender.${g}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hc-value">{t("field.headCircumference")}</Label>
              <Input
                id="hc-value"
                type="number"
                inputMode="decimal"
                value={hc}
                placeholder={t("placeholder.hc")}
                onChange={(e) => { setHc(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hc-unit">{t("field.unit")}</Label>
              <select
                id="hc-unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={unit}
                onChange={(e) => setUnit(e.target.value as "cm" | "in")}
              >
                <option value="cm">{t("unit.cm")}</option>
                <option value="in">{t("unit.in")}</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hc-ethnicity">{t("field.ethnicity")}</Label>
              <select
                id="hc-ethnicity"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
              >
                <option value="any">{t("ethnicity.any")}</option>
                <option value="caucasian">{t("ethnicity.caucasian")}</option>
                <option value="asian">{t("ethnicity.asian")}</option>
                <option value="hispanic">{t("ethnicity.hispanic")}</option>
                <option value="africanAmerican">{t("ethnicity.africanAmerican")}</option>
                <option value="other">{t("ethnicity.other")}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && (
            <div className="space-y-1">
              {!ageValid && <p className="text-sm text-red-600">{t("error.invalidAge")}</p>}
              {!genderValid && <p className="text-sm text-red-600">{t("error.selectGender")}</p>}
              {!hcValid && <p className="text-sm text-red-600">{t("error.invalidMeasurement")}</p>}
            </div>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.heading")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{t("result.percentileFormat", { value: result.percentile })}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.zscore")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{result.z}</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-xs text-zinc-500">{t("result.category")}</div>
                  <div className="text-sm font-medium text-zinc-800 mt-1">{result.category}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
