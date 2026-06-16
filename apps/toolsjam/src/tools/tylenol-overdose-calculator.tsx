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

type WeightUnit = "kg" | "lb";
type Formulation = "regular" | "extended";
type RiskLevel = "low" | "moderate" | "high" | "critical";

function lbToKg(lb: number): number {
  return lb / 2.20462;
}

function formatNum(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

function getRiskLevel(mgPerKg: number, hours: number, formulation: Formulation): RiskLevel {
  // Extended-release: raise effective risk one notch within the actionable window
  const effectiveMgPerKg =
    formulation === "extended" && hours < 24 ? mgPerKg * 1.15 : mgPerKg;
  // If ingestion was >24 hours ago, standard thresholds still apply but note late presentation
  if (effectiveMgPerKg < 100) return "low";
  if (effectiveMgPerKg < 150) return "moderate";
  if (effectiveMgPerKg < 200) return "high";
  return "critical";
}

function getRiskBadgeClass(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    case "moderate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "critical":
      return "bg-red-100 text-red-800 border-red-200";
  }
}

export default function TylenolOverdoseCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.tylenol-overdose-calculator");

  const [weight, setWeight] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>("kg");
  const [amountMg, setAmountMg] = React.useState("");
  const [timeSince, setTimeSince] = React.useState("");
  const [formulation, setFormulation] = React.useState<Formulation>("regular");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);
  const amountNum = parseFloat(amountMg);
  const timeNum = parseFloat(timeSince);

  const weightValid = weight !== "" && Number.isFinite(weightNum) && weightNum > 0;
  const amountValid = amountMg !== "" && Number.isFinite(amountNum) && amountNum > 0;
  const timeValid = timeSince !== "" && Number.isFinite(timeNum) && timeNum >= 0;

  const allValid = weightValid && amountValid && timeValid;

  const weightKg = weightValid
    ? weightUnit === "lb"
      ? lbToKg(weightNum)
      : weightNum
    : 0;

  const mgPerKg = React.useMemo<number | null>(() => {
    if (!allValid) return null;
    return amountNum / weightKg;
  }, [allValid, amountNum, weightKg]);

  const riskLevel = React.useMemo<RiskLevel | null>(() => {
    if (mgPerKg === null) return null;
    return getRiskLevel(mgPerKg, timeNum, formulation);
  }, [mgPerKg, timeNum, formulation]);

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

  function reset() {
    setWeight("");
    setAmountMg("");
    setTimeSince("");
    setWeightUnit("kg");
    setFormulation("regular");
    setTouched(false);
  }

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

  const showError = touched && !allValid;

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
              <Label htmlFor="toc-weight">{t("field.weight")}</Label>
              <div className="flex gap-2">
                <Input
                  id="toc-weight"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.1"
                  value={weight}
                  placeholder={t("placeholder.weight")}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setTouched(true);
                  }}
                />
                <div className="flex gap-1">
                  {(["kg", "lb"] as WeightUnit[]).map((u) => (
                    <Button
                      key={u}
                      type="button"
                      size="sm"
                      variant={weightUnit === u ? "default" : "outline"}
                      onClick={() => setWeightUnit(u)}
                    >
                      {t(`weightUnit.${u}` as never)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="toc-amount">{t("field.amountMg")}</Label>
              <Input
                id="toc-amount"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={amountMg}
                placeholder={t("placeholder.amountMg")}
                onChange={(e) => {
                  setAmountMg(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toc-time">{t("field.timeSince")}</Label>
              <Input
                id="toc-time"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.5"
                value={timeSince}
                placeholder={t("placeholder.timeSince")}
                onChange={(e) => {
                  setTimeSince(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.formulation")}</Label>
              <div className="flex gap-2">
                {(["regular", "extended"] as Formulation[]).map((f) => (
                  <Button
                    key={f}
                    type="button"
                    variant={formulation === f ? "default" : "outline"}
                    onClick={() => {
                      setFormulation(f);
                      setTouched(true);
                    }}
                  >
                    {t(`formulation.${f}` as never)}
                  </Button>
                ))}
              </div>
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

          {mgPerKg !== null && riskLevel !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.mgPerKg")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(mgPerKg, 1)} {t("result.unitMgPerKg")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.timeNote")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(timeNum, 1)} {t("result.timeSuffix")}
                  </div>
                </div>
              </div>
              <div
                className={`inline-flex rounded-md border px-3 py-1 text-sm font-semibold ${getRiskBadgeClass(riskLevel)}`}
              >
                {t(`risk.${riskLevel}` as never)}
              </div>
              <div className="text-sm text-zinc-700">
                {t(`recommendation.${riskLevel}` as never)}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setWeight("70");
              setWeightUnit("kg");
              setAmountMg("2000");
              setTimeSince("2");
              setFormulation("regular");
              setTouched(true);
            }}
          >
            {t("examples.loadLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setWeight("55");
              setWeightUnit("kg");
              setAmountMg("10000");
              setTimeSince("5");
              setFormulation("regular");
              setTouched(true);
            }}
          >
            {t("examples.loadHigh")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setWeight("40");
              setWeightUnit("kg");
              setAmountMg("10000");
              setTimeSince("2");
              setFormulation("regular");
              setTouched(true);
            }}
          >
            {t("examples.loadCritical")}
          </Button>
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
