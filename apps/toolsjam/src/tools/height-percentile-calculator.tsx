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

// CDC/NHANES-derived height reference data [age, maleMean_cm, maleSD, femaleMean_cm, femaleSD]
const HEIGHT_REF: [number, number, number, number, number][] = [
  [2, 86.8, 3.5, 85.5, 3.5],
  [3, 95.0, 3.8, 93.9, 3.9],
  [4, 102.9, 4.0, 101.6, 4.1],
  [5, 109.9, 4.4, 108.4, 4.5],
  [6, 116.1, 4.9, 114.6, 5.0],
  [7, 121.7, 5.1, 120.0, 5.3],
  [8, 127.0, 5.5, 125.2, 5.8],
  [9, 132.2, 5.8, 130.8, 6.5],
  [10, 137.5, 6.3, 138.6, 7.3],
  [11, 143.5, 7.1, 144.8, 7.6],
  [12, 149.1, 8.2, 149.8, 7.3],
  [13, 156.2, 8.3, 156.4, 6.8],
  [14, 163.8, 8.0, 159.5, 6.4],
  [15, 170.1, 7.3, 161.8, 6.3],
  [16, 173.4, 7.1, 162.5, 6.2],
  [17, 175.2, 7.0, 162.9, 6.1],
  [18, 176.1, 6.9, 163.1, 6.1],
  [20, 176.9, 7.1, 163.1, 6.3],
  [30, 177.5, 7.2, 163.3, 6.5],
  [40, 177.2, 7.2, 163.0, 6.5],
  [50, 176.5, 7.3, 162.0, 6.6],
  [60, 175.5, 7.5, 160.5, 6.8],
  [70, 173.5, 7.6, 158.5, 7.0],
  [80, 171.0, 7.8, 156.0, 7.2],
];

function interpolateRef(age: number, isMale: boolean): { mean: number; sd: number } {
  const clamped = Math.max(2, Math.min(80, age));
  let lo = HEIGHT_REF[0];
  let hi = HEIGHT_REF[HEIGHT_REF.length - 1];
  for (let i = 0; i < HEIGHT_REF.length - 1; i++) {
    if (HEIGHT_REF[i][0] <= clamped && HEIGHT_REF[i + 1][0] >= clamped) {
      lo = HEIGHT_REF[i];
      hi = HEIGHT_REF[i + 1];
      break;
    }
  }
  const t = hi[0] === lo[0] ? 0 : (clamped - lo[0]) / (hi[0] - lo[0]);
  if (isMale) {
    return { mean: lo[1] + t * (hi[1] - lo[1]), sd: lo[2] + t * (hi[2] - lo[2]) };
  }
  return { mean: lo[3] + t * (hi[3] - lo[3]), sd: lo[4] + t * (hi[4] - lo[4]) };
}

function normalCDF(z: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741,
    a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1.0 + sign * y);
}

export default function HeightPercentileCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.height-percentile-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "">("");
  const [height, setHeight] = React.useState("");
  const [heightUnit, setHeightUnit] = React.useState<"cm" | "in">("cm");
  const [ethnicity, setEthnicity] = React.useState("any");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const heightNum = parseFloat(height);
  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 2 && ageNum <= 80;
  const genderValid = gender !== "";
  const heightCm = heightUnit === "in" ? heightNum * 2.54 : heightNum;
  const heightValid = height !== "" && Number.isFinite(heightNum) && heightNum > 0 && heightCm >= 50 && heightCm <= 250;

  const result = React.useMemo(() => {
    if (!ageValid || !genderValid || !heightValid) return null;
    const hCm = Math.round(heightCm * 100) / 100;
    const { mean, sd } = interpolateRef(ageNum, gender === "male");
    const z = (hCm - mean) / sd;
    const pct = Math.round(normalCDF(z) * 1000) / 10;
    let category: string;
    if (pct < 3) category = t("result.categories.veryShort");
    else if (pct < 10) category = t("result.categories.short");
    else if (pct <= 90) category = t("result.categories.average");
    else if (pct <= 97) category = t("result.categories.tall");
    else category = t("result.categories.veryTall");
    return { percentile: pct, z: Math.round(z * 100) / 100, category, hCm };
  }, [ageValid, genderValid, heightValid, ageNum, gender, heightCm, t]);

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

  function reset() {
    setAge(""); setGender(""); setHeight(""); setHeightUnit("cm"); setEthnicity("any"); setTouched(false);
  }

  const showError = touched && (!ageValid || !genderValid || !heightValid);

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
              <Label htmlFor="hp-age">{t("field.age")}</Label>
              <Input
                id="hp-age"
                type="number"
                inputMode="decimal"
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
              <Label htmlFor="hp-height">{t("field.height")}</Label>
              <Input
                id="hp-height"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hp-unit">{t("field.heightUnit")}</Label>
              <select
                id="hp-unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={heightUnit}
                onChange={(e) => { setHeightUnit(e.target.value as "cm" | "in"); setTouched(true); }}
              >
                <option value="cm">{t("unit.cm")}</option>
                <option value="in">{t("unit.in")}</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hp-ethnicity">{t("field.ethnicity")}</Label>
              <select
                id="hp-ethnicity"
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
              {!heightValid && <p className="text-sm text-red-600">{t("error.invalidHeight")}</p>}
            </div>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.heading")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{t("result.percentileFormat", { value: result.percentile })}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.zscore")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{result.z}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.heightCm")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{t("result.heightCmFormat", { value: result.hCm })}</div>
                </div>
                <div>
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
