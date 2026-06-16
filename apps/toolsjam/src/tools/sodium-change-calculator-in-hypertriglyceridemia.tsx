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

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function SodiumChangeCalculatorInHypertriglyceridemia(
  _props: { locale: Locale }
) {
  const t = useTranslations(
    "tool.sodium-change-calculator-in-hypertriglyceridemia"
  );

  const [measuredSodium, setMeasuredSodium] = React.useState("");
  const [triglycerides, setTriglycerides] = React.useState("");
  const [totalLipids, setTotalLipids] = React.useState("");
  const [serumProtein, setSerumProtein] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const naNum = parseFloat(measuredSodium);
  const tgNum = parseFloat(triglycerides);
  const tlNum = parseFloat(totalLipids);
  const spNum = parseFloat(serumProtein);

  const naValid = measuredSodium !== "" && Number.isFinite(naNum) && naNum > 0;
  const tgValid = triglycerides !== "" && Number.isFinite(tgNum) && tgNum >= 0;

  interface CalcResult {
    correctedNa: number;
    deltaNa: number;
    method: string;
  }

  const result = React.useMemo<CalcResult | null>(() => {
    if (!naValid || !tgValid) return null;
    let base = naNum;
    let delta = 0;
    let method = "TG";

    if (totalLipids !== "" && Number.isFinite(tlNum) && tlNum > 0) {
      delta = tlNum * 0.002;
      method = "Total Lipids";
    } else {
      delta = tgNum * 0.002;
    }

    if (serumProtein !== "" && Number.isFinite(spNum) && spNum > 0) {
      const normalProtein = 7.0;
      if (spNum > normalProtein) {
        delta += (spNum - normalProtein) * 0.25;
        method += " + Protein";
      }
    }

    return { correctedNa: base + delta, deltaNa: delta, method };
  }, [naValid, tgValid, naNum, tgNum, tlNum, spNum, totalLipids, serumProtein]);

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
    setMeasuredSodium("");
    setTriglycerides("");
    setTotalLipids("");
    setSerumProtein("");
    setTouched(false);
  }

  const showError = touched && (!naValid || !tgValid);

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
              <Label htmlFor="sc-na">
                {t("field.measuredSodium")} ({t("field.measuredSodiumUnit")})
              </Label>
              <Input
                id="sc-na"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={measuredSodium}
                placeholder={t("field.placeholder.measuredSodium")}
                onChange={(e) => {
                  setMeasuredSodium(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-tg">
                {t("field.triglycerides")} ({t("field.triglyceridesUnit")})
              </Label>
              <Input
                id="sc-tg"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={triglycerides}
                placeholder={t("field.placeholder.triglycerides")}
                onChange={(e) => {
                  setTriglycerides(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-tl">
                {t("field.totalLipids")} ({t("field.totalLipidsUnit")})
              </Label>
              <Input
                id="sc-tl"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={totalLipids}
                placeholder={t("field.placeholder.totalLipids")}
                onChange={(e) => {
                  setTotalLipids(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-sp">
                {t("field.serumProtein")} ({t("field.serumProteinUnit")})
              </Label>
              <Input
                id="sc-sp"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={serumProtein}
                placeholder={t("field.placeholder.serumProtein")}
                onChange={(e) => {
                  setSerumProtein(e.target.value);
                  setTouched(true);
                }}
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.correctedSodium")}: {fmt(result.correctedNa)}{" "}
                {t("result.unit")}
              </div>
              <div className="text-base text-zinc-700">
                {t("result.deltaSodium")}: +{fmt(result.deltaNa)}{" "}
                {t("result.unit")}
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
