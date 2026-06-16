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

type Gender = "male" | "female";
type Duration = "acute" | "chronic";
type Severity = "mild" | "moderate" | "severe";
type FluidType = "hts" | "ns" | "lr";

const FLUID_NA: Record<FluidType, number> = {
  hts: 513,
  ns: 154,
  lr: 130,
};

function getRateAndMax(
  duration: Duration,
  severity: Severity,
  isHypo: boolean
): { rate: number; maxDaily: number } {
  if (!isHypo) {
    return { rate: 0.5, maxDaily: 10 };
  }
  if (duration === "chronic") {
    if (severity === "mild") return { rate: 0.5, maxDaily: 8 };
    if (severity === "moderate") return { rate: 0.5, maxDaily: 10 };
    return { rate: 1.0, maxDaily: 12 };
  }
  if (severity === "mild") return { rate: 1.0, maxDaily: 24 };
  if (severity === "moderate") return { rate: 1.5, maxDaily: 36 };
  return { rate: 2.0, maxDaily: 20 };
}

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function SodiumCorrectionRateCalculatorForHypoAndHypernatremia(
  _props: { locale: Locale }
) {
  const t = useTranslations(
    "tool.sodium-correction-rate-calculator-for-hypo-and-hypernatremia"
  );

  const [currentNa, setCurrentNa] = React.useState("");
  const [targetNa, setTargetNa] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [duration, setDuration] = React.useState<Duration>("chronic");
  const [severity, setSeverity] = React.useState<Severity>("mild");
  const [fluidType, setFluidType] = React.useState<FluidType>("ns");
  const [touched, setTouched] = React.useState(false);

  const curNum = parseFloat(currentNa);
  const tgtNum = parseFloat(targetNa);
  const wNum = parseFloat(weight);

  const curValid = currentNa !== "" && Number.isFinite(curNum) && curNum > 0;
  const tgtValid = targetNa !== "" && Number.isFinite(tgtNum) && tgtNum > 0;
  const wValid = weight !== "" && Number.isFinite(wNum) && wNum > 0;

  interface CalcResult {
    rate: number;
    maxDaily: number;
    tbw: number;
    deficit: number;
    volume: number;
    infusionRate: number;
    correctionTime: number;
    isHypo: boolean;
    showWarning: boolean;
  }

  const result = React.useMemo<CalcResult | null>(() => {
    if (!curValid || !tgtValid || !wValid) return null;
    if (curNum === tgtNum) return null;
    const isHypo = curNum < tgtNum;
    const { rate, maxDaily } = getRateAndMax(duration, severity, isHypo);
    const tbw = wNum * (gender === "male" ? 0.6 : 0.5);
    const deficit = tbw * (tgtNum - curNum);
    const fluidNa = FLUID_NA[fluidType];
    // For hypernatremia, fluid Na must be below current Na to lower serum sodium
    if (!isHypo && fluidNa >= curNum) return null;
    // For hyponatremia, fluid Na must exceed current Na to raise serum sodium
    if (isHypo && fluidNa <= curNum) return null;
    const fluidDenominator = fluidNa - curNum;
    let volume = 0;
    let infusionRate = 0;
    if (fluidDenominator !== 0) {
      volume = (deficit / fluidDenominator) * 1000;
    }
    const absDelta = Math.abs(tgtNum - curNum);
    const correctionTime = absDelta / rate;
    if (correctionTime > 0) infusionRate = Math.abs(volume) / correctionTime;
    return {
      rate,
      maxDaily,
      tbw,
      deficit,
      volume,
      infusionRate,
      correctionTime,
      isHypo,
      showWarning: duration === "chronic" && isHypo,
    };
  }, [curValid, tgtValid, wValid, curNum, tgtNum, wNum, gender, duration, severity, fluidType]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  function reset() {
    setCurrentNa("");
    setTargetNa("");
    setWeight("");
    setGender("male");
    setDuration("chronic");
    setSeverity("mild");
    setFluidType("ns");
    setTouched(false);
  }

  const showError = touched && (!curValid || !tgtValid || !wValid);
  const showSameError =
    touched && curValid && tgtValid && curNum === tgtNum;
  const showFluidError =
    touched &&
    curValid &&
    tgtValid &&
    wValid &&
    curNum !== tgtNum &&
    result === null &&
    !showError &&
    !showSameError;

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
              <Label htmlFor="scr-cur">
                {t("field.currentSodium")} ({t("field.currentSodiumUnit")})
              </Label>
              <Input
                id="scr-cur"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={100}
                max={200}
                value={currentNa}
                placeholder={t("field.placeholder.currentSodium")}
                onChange={(e) => {
                  setCurrentNa(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scr-tgt">
                {t("field.targetSodium")} ({t("field.targetSodiumUnit")})
              </Label>
              <Input
                id="scr-tgt"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={100}
                max={200}
                value={targetNa}
                placeholder={t("field.placeholder.targetSodium")}
                onChange={(e) => {
                  setTargetNa(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scr-wt">
                {t("field.weight")} ({t("field.weightUnit")})
              </Label>
              <Input
                id="scr-wt"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={1}
                value={weight}
                placeholder={t("field.placeholder.weight")}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scr-gender">{t("field.gender")}</Label>
              <select
                id="scr-gender"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
              >
                <option value="male">{t("gender.male")}</option>
                <option value="female">{t("gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scr-dur">{t("field.duration")}</Label>
              <select
                id="scr-dur"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
                value={duration}
                onChange={(e) => setDuration(e.target.value as Duration)}
              >
                <option value="acute">{t("duration.acute")}</option>
                <option value="chronic">{t("duration.chronic")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scr-sev">{t("field.severity")}</Label>
              <select
                id="scr-sev"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
                value={severity}
                onChange={(e) => setSeverity(e.target.value as Severity)}
              >
                <option value="mild">{t("severity.mild")}</option>
                <option value="moderate">{t("severity.moderate")}</option>
                <option value="severe">{t("severity.severe")}</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="scr-fluid">{t("field.fluidType")}</Label>
              <select
                id="scr-fluid"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
                value={fluidType}
                onChange={(e) => setFluidType(e.target.value as FluidType)}
              >
                <option value="hts">{t("fluidType.hts")}</option>
                <option value="ns">{t("fluidType.ns")}</option>
                <option value="lr">{t("fluidType.lr")}</option>
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showSameError && (
            <p className="text-sm text-red-600">{t("error.sameNa")}</p>
          )}
          {showFluidError && (
            <p className="text-sm text-red-600">{t("error.fluidNa")}</p>
          )}

          {result !== null && touched && !showError && !showSameError && !showFluidError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {result.showWarning && (
                <p className="text-sm text-amber-700 font-medium">
                  {t("result.warning")}
                </p>
              )}
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-zinc-500">
                    {t("result.recommendedRate")}:{" "}
                  </span>
                  <span className="font-semibold text-base">
                    {fmt(result.rate)} {t("result.rateUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    {t("result.maxDaily")}:{" "}
                  </span>
                  <span className="font-semibold">
                    {fmt(result.maxDaily, 0)} {t("result.maxDailyUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.tbw")}: </span>
                  <span className="font-semibold">
                    {fmt(result.tbw)} {t("result.tbwUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    {t("result.deficit")}:{" "}
                  </span>
                  <span className="font-semibold">
                    {fmt(result.deficit)} {t("result.deficitUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    {t("result.volume")}:{" "}
                  </span>
                  <span className="font-semibold">
                    {fmt(Math.abs(result.volume), 0)} {t("result.volumeUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    {t("result.infusionRate")}:{" "}
                  </span>
                  <span className="font-semibold">
                    {fmt(result.infusionRate, 0)}{" "}
                    {t("result.infusionRateUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    {t("result.correctionTime")}:{" "}
                  </span>
                  <span className="font-semibold">
                    {fmt(result.correctionTime)}{" "}
                    {t("result.correctionTimeUnit")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("about.heading")}
        </h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("examples.heading")}
        </h2>
        <p className="text-zinc-600">{t("examples.intro")}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
