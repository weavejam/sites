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

// Z-scores for common service levels
function zScore(serviceLevel: number): number {
  if (serviceLevel >= 99.9) return 3.09;
  if (serviceLevel >= 99) return 2.326;
  if (serviceLevel >= 98) return 2.054;
  if (serviceLevel >= 97) return 1.881;
  if (serviceLevel >= 95) return 1.645;
  if (serviceLevel >= 90) return 1.282;
  if (serviceLevel >= 85) return 1.036;
  return 0.842;
}

function formatUnits(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

export default function ReorderPointCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.reorder-point-calculator");

  const [demand, setDemand] = React.useState("");
  const [leadTime, setLeadTime] = React.useState("");
  const [safetyStock, setSafetyStock] = React.useState("");
  const [demandVar, setDemandVar] = React.useState("");
  const [leadTimeVar, setLeadTimeVar] = React.useState("");
  const [serviceLevel, setServiceLevel] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function parsePositive(val: string): number | null {
    const n = parseFloat(val);
    return val !== "" && Number.isFinite(n) && n >= 0 ? n : null;
  }

  const demandNum = parsePositive(demand);
  const ltNum = parsePositive(leadTime);
  const ssNum = parsePositive(safetyStock);
  const dvNum = parsePositive(demandVar);
  const ltvNum = parsePositive(leadTimeVar);
  const slNum = parsePositive(serviceLevel);

  const baseValid = demandNum !== null && ltNum !== null;

  const result = React.useMemo(() => {
    if (!baseValid || demandNum === null || ltNum === null) return null;

    const demandDuringLead = demandNum * ltNum;

    // Determine safety stock
    let calcSafetyStock: number;
    if (ssNum !== null) {
      calcSafetyStock = ssNum;
    } else if (dvNum !== null && slNum !== null) {
      const z = zScore(slNum);
      if (ltvNum !== null && ltvNum > 0) {
        // Combined variability
        calcSafetyStock = z * Math.sqrt(ltNum * dvNum * dvNum + demandNum * demandNum * ltvNum * ltvNum);
      } else {
        calcSafetyStock = z * dvNum * Math.sqrt(ltNum);
      }
    } else {
      calcSafetyStock = 0;
    }

    const rop = demandDuringLead + calcSafetyStock;
    return { rop, calcSafetyStock, demandDuringLead };
  }, [demandNum, ltNum, ssNum, dvNum, ltvNum, slNum, baseValid]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
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

  function reset() {
    setDemand(""); setLeadTime(""); setSafetyStock(""); setDemandVar("");
    setLeadTimeVar(""); setServiceLevel("");
    setTouched(false);
  }

  const showError = touched && !baseValid;

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
              <Label htmlFor="rop-demand">{t("field.demand")}</Label>
              <Input
                id="rop-demand"
                type="number"
                inputMode="decimal"
                min="0"
                value={demand}
                placeholder={t("placeholder.demand")}
                onChange={(e) => { setDemand(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rop-lt">{t("field.leadTime")}</Label>
              <Input
                id="rop-lt"
                type="number"
                inputMode="decimal"
                min="0"
                value={leadTime}
                placeholder={t("placeholder.leadTime")}
                onChange={(e) => { setLeadTime(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rop-ss">{t("field.safetyStock")}</Label>
              <Input
                id="rop-ss"
                type="number"
                inputMode="decimal"
                min="0"
                value={safetyStock}
                placeholder={t("placeholder.safetyStock")}
                onChange={(e) => { setSafetyStock(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rop-dv">{t("field.demandVariability")}</Label>
              <Input
                id="rop-dv"
                type="number"
                inputMode="decimal"
                min="0"
                value={demandVar}
                placeholder={t("placeholder.demandVariability")}
                onChange={(e) => { setDemandVar(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rop-ltv">{t("field.leadTimeVariability")}</Label>
              <Input
                id="rop-ltv"
                type="number"
                inputMode="decimal"
                min="0"
                value={leadTimeVar}
                placeholder={t("placeholder.leadTimeVariability")}
                onChange={(e) => { setLeadTimeVar(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rop-sl">{t("field.serviceLevel")}</Label>
              <Input
                id="rop-sl"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                value={serviceLevel}
                placeholder={t("placeholder.serviceLevel")}
                onChange={(e) => { setServiceLevel(e.target.value); setTouched(true); }}
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
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <div className="text-xs text-zinc-500">{t("result.rop")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatUnits(result.rop)} {t("result.units")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.demandDuringLead")}</div>
                  <div className="font-semibold text-zinc-900">
                    {formatUnits(result.demandDuringLead)} {t("result.units")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.safetyStock")}</div>
                  <div className="font-semibold text-zinc-900">
                    {formatUnits(result.calcSafetyStock)} {t("result.units")}
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
