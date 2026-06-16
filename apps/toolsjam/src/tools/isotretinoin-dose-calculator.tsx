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

type WeightUnit = "kg" | "lbs";

interface IsoResult {
  weightKg: number;
  dailyDoseMg: number;
  cumulativeTotalMg: number;
  durationDays: number;
  estimatedEndDate?: string;
}

function computeIsotretinoin(
  weight: number,
  weightUnit: WeightUnit,
  dailyDosePerKg: number,
  cumulativeTarget: number,
  customDailyDose: number | null,
  startDate: string,
): IsoResult | null {
  if (!Number.isFinite(weight) || weight <= 0) return null;
  const weightKg = weightUnit === "lbs" ? weight / 2.2046 : weight;
  const dailyDoseMg = (customDailyDose !== null && Number.isFinite(customDailyDose) && customDailyDose > 0)
    ? customDailyDose
    : (Number.isFinite(dailyDosePerKg) && dailyDosePerKg > 0)
      ? weightKg * dailyDosePerKg
      : null;
  if (dailyDoseMg === null) return null;
  if (!Number.isFinite(cumulativeTarget) || cumulativeTarget <= 0) return null;

  const cumulativeTotalMg = weightKg * cumulativeTarget;
  const durationDays = Math.round(cumulativeTotalMg / dailyDoseMg);

  let estimatedEndDate: string | undefined;
  if (startDate) {
    try {
      const start = new Date(startDate);
      if (!isNaN(start.getTime())) {
        start.setDate(start.getDate() + durationDays);
        estimatedEndDate = start.toISOString().split("T")[0];
      }
    } catch {
      // ignore invalid date
    }
  }

  return { weightKg, dailyDoseMg, cumulativeTotalMg, durationDays, estimatedEndDate };
}

function fmt(n: number, d = 1): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(d)).toString();
}

const WEIGHT_UNITS: WeightUnit[] = ["kg", "lbs"];

export default function IsotretinoinDoseCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.isotretinoin-dose-calculator");

  const [weight, setWeight] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>("kg");
  const [dailyDosePerKg, setDailyDosePerKg] = React.useState("0.5");
  const [cumulativeTarget, setCumulativeTarget] = React.useState("120");
  const [customDailyDose, setCustomDailyDose] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<IsoResult | null>(() => {
    if (!touched) return null;
    return computeIsotretinoin(
      parseFloat(weight),
      weightUnit,
      parseFloat(dailyDosePerKg),
      parseFloat(cumulativeTarget),
      customDailyDose !== "" ? parseFloat(customDailyDose) : null,
      startDate,
    );
  }, [touched, weight, weightUnit, dailyDosePerKg, cumulativeTarget, customDailyDose, startDate]);

  function reset() {
    setWeight("");
    setWeightUnit("kg");
    setDailyDosePerKg("0.5");
    setCumulativeTarget("120");
    setCustomDailyDose("");
    setStartDate("");
    setTouched(false);
  }

  function loadExample(w: string, wu: WeightUnit, dpk: string, ct: string, cdm: string, sd: string) {
    setWeight(w);
    setWeightUnit(wu);
    setDailyDosePerKg(dpk);
    setCumulativeTarget(ct);
    setCustomDailyDose(cdm);
    setStartDate(sd);
    setTouched(true);
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

  const showError = touched && result === null;

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
              <Label htmlFor="iso-weight">{t("field.weight")}</Label>
              <Input
                id="iso-weight"
                type="number"
                inputMode="decimal"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iso-weight-unit">{t("field.weightUnit")}</Label>
              <div className="flex gap-2">
                {WEIGHT_UNITS.map((u) => (
                  <Button
                    key={u}
                    type="button"
                    variant={weightUnit === u ? "default" : "outline"}
                    onClick={() => setWeightUnit(u)}
                  >
                    {t(`weightUnit.${u}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="iso-daily-dose">{t("field.dailyDosePerKg")}</Label>
              <Input
                id="iso-daily-dose"
                type="number"
                inputMode="decimal"
                value={dailyDosePerKg}
                placeholder={t("placeholder.dailyDosePerKg")}
                onChange={(e) => { setDailyDosePerKg(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iso-cumulative">{t("field.cumulativeTarget")}</Label>
              <Input
                id="iso-cumulative"
                type="number"
                inputMode="decimal"
                value={cumulativeTarget}
                placeholder={t("placeholder.cumulativeTarget")}
                onChange={(e) => { setCumulativeTarget(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iso-custom-dose">{t("field.customDailyDose")}</Label>
              <Input
                id="iso-custom-dose"
                type="number"
                inputMode="decimal"
                value={customDailyDose}
                placeholder={t("placeholder.customDailyDose")}
                onChange={(e) => { setCustomDailyDose(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iso-start-date">{t("field.startDate")}</Label>
              <Input
                id="iso-start-date"
                type="date"
                value={startDate}
                placeholder={t("placeholder.startDate")}
                onChange={(e) => { setStartDate(e.target.value); setTouched(true); }}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-xs text-zinc-500">{t("result.weightKg")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.weightKg, 1)} {t("result.kgUnit")}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-zinc-500">{t("result.dailyDose")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.dailyDoseMg, 1)} {t("result.mgPerDayUnit")}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-zinc-500">{t("result.cumulativeTotal")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.cumulativeTotalMg, 0)} {t("result.mgUnit")}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-zinc-500">{t("result.durationDays")}</div>
                  <div className="font-semibold text-zinc-900">{result.durationDays} {t("result.daysUnit")}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-zinc-500">{t("result.durationWeeks")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.durationDays / 7, 1)} {t("result.weeksUnit")}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-zinc-500">{t("result.durationMonths")}</div>
                  <div className="font-semibold text-zinc-900">{fmt(result.durationDays / 30.44, 1)} {t("result.monthsUnit")}</div>
                </div>
                {result.estimatedEndDate && (
                  <div className="space-y-1 sm:col-span-2">
                    <div className="text-xs text-zinc-500">{t("result.estimatedEndDate")}</div>
                    <div className="font-semibold text-zinc-900">{result.estimatedEndDate}</div>
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-500">{t("result.note")}</p>
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
            onClick={() => loadExample("70", "kg", "0.5", "140", "", "")}>
            {t("examples.load70kg")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("60", "kg", "0.5", "120", "40", "")}>
            {t("examples.load60kg")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("154", "lbs", "1.0", "150", "", "")}>
            {t("examples.load154lbs")}
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
