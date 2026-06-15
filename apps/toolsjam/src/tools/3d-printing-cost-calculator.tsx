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

type FilamentType = "PLA" | "ABS" | "PETG" | "TPU" | "Resin" | "Other";
const FILAMENT_TYPES: FilamentType[] = ["PLA", "ABS", "PETG", "TPU", "Resin", "Other"];

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function PrintingCostCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.3d-printing-cost-calculator");

  const [filamentType, setFilamentType] = React.useState<FilamentType>("PLA");
  const [filamentWeight, setFilamentWeight] = React.useState("");
  const [filamentPrice, setFilamentPrice] = React.useState("");
  const [printTime, setPrintTime] = React.useState("");
  const [printerPower, setPrinterPower] = React.useState("");
  const [electricityRate, setElectricityRate] = React.useState("");
  const [printerCost, setPrinterCost] = React.useState("");
  const [printerLifespan, setPrinterLifespan] = React.useState("");
  const [laborRate, setLaborRate] = React.useState("");
  const [setupTime, setSetupTime] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setFilamentWeight("");
    setFilamentPrice("");
    setPrintTime("");
    setPrinterPower("");
    setElectricityRate("");
    setPrinterCost("");
    setPrinterLifespan("");
    setLaborRate("");
    setSetupTime("");
    setTouched(false);
  }

  const result = React.useMemo(() => {
    if (!touched) return null;
    const wg = parseFloat(filamentWeight);
    const pPkg = parseFloat(filamentPrice);
    const ptH = parseFloat(printTime);
    const pwW = parseFloat(printerPower);
    const erKwh = parseFloat(electricityRate);

    if (
      !Number.isFinite(wg) || wg <= 0 ||
      !Number.isFinite(pPkg) || pPkg < 0 ||
      !Number.isFinite(ptH) || ptH <= 0 ||
      !Number.isFinite(pwW) || pwW < 0 ||
      !Number.isFinite(erKwh) || erKwh < 0
    )
      return { error: true };

    const filamentCost = (wg / 1000) * pPkg;
    const electricityCost = (pwW / 1000) * ptH * erKwh;

    const pcDollar = parseFloat(printerCost);
    const plHours = parseFloat(printerLifespan);
    const machineCost =
      Number.isFinite(pcDollar) && pcDollar > 0 &&
      Number.isFinite(plHours) && plHours > 0
        ? (pcDollar / plHours) * ptH
        : 0;

    const lrHour = parseFloat(laborRate);
    const stH = parseFloat(setupTime);
    const laborCost =
      Number.isFinite(lrHour) && lrHour > 0
        ? lrHour * (ptH + (Number.isFinite(stH) && stH > 0 ? stH : 0))
        : 0;

    const total = filamentCost + electricityCost + machineCost + laborCost;
    const perGram = wg > 0 ? total / wg : 0;

    return { filamentCost, electricityCost, machineCost, laborCost, total, perGram };
  }, [
    touched, filamentWeight, filamentPrice, printTime, printerPower,
    electricityRate, printerCost, printerLifespan, laborRate, setupTime,
  ]);

  const howtoSteps: string[] = React.useMemo(
    () => (t.raw("howto.steps") as string[] | undefined) ?? [],
    [t]
  );

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(
    () =>
      (
        t.raw("examples.items") as
          | { input: string; output: string; note?: string }[]
          | undefined
      ) ?? [],
    [t]
  );

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
          {/* Filament type */}
          <div className="space-y-2">
            <Label>{t("field.filamentType")}</Label>
            <div className="flex flex-wrap gap-2">
              {FILAMENT_TYPES.map((ft) => (
                <Button
                  key={ft}
                  type="button"
                  variant={filamentType === ft ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilamentType(ft)}
                >
                  {t(`filamentType.${ft}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {/* Main inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="p3d-fw">{t("field.filamentWeight")}</Label>
              <Input
                id="p3d-fw"
                type="number"
                inputMode="decimal"
                value={filamentWeight}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setFilamentWeight(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p3d-fp">{t("field.filamentPrice")}</Label>
              <Input
                id="p3d-fp"
                type="number"
                inputMode="decimal"
                value={filamentPrice}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setFilamentPrice(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p3d-pt">{t("field.printTime")}</Label>
              <Input
                id="p3d-pt"
                type="number"
                inputMode="decimal"
                value={printTime}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setPrintTime(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p3d-pp">{t("field.printerPower")}</Label>
              <Input
                id="p3d-pp"
                type="number"
                inputMode="decimal"
                value={printerPower}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setPrinterPower(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p3d-er">{t("field.electricityRate")}</Label>
              <Input
                id="p3d-er"
                type="number"
                inputMode="decimal"
                value={electricityRate}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setElectricityRate(e.target.value); setTouched(false); }}
              />
            </div>
          </div>

          {/* Optional inputs */}
          <div className="grid gap-4 sm:grid-cols-2 border-t border-zinc-100 pt-4">
            <div className="space-y-2">
              <Label htmlFor="p3d-pc">{t("field.printerCost")}</Label>
              <Input
                id="p3d-pc"
                type="number"
                inputMode="decimal"
                value={printerCost}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setPrinterCost(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p3d-pl">{t("field.printerLifespan")}</Label>
              <Input
                id="p3d-pl"
                type="number"
                inputMode="decimal"
                value={printerLifespan}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setPrinterLifespan(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p3d-lr">{t("field.laborRate")}</Label>
              <Input
                id="p3d-lr"
                type="number"
                inputMode="decimal"
                value={laborRate}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setLaborRate(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p3d-st">{t("field.setupTime")}</Label>
              <Input
                id="p3d-st"
                type="number"
                inputMode="decimal"
                value={setupTime}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setSetupTime(e.target.value); setTouched(false); }}
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

          {result && "error" in result && result.error && (
            <p className="text-sm text-red-600">{t("error.invalidInput")}</p>
          )}

          {result && !("error" in result) && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-600">{t("result.filamentCost")}</span>
                  <span className="font-medium">${fmt(result.filamentCost)}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-600">{t("result.electricityCost")}</span>
                  <span className="font-medium">${fmt(result.electricityCost)}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-600">{t("result.machineCost")}</span>
                  <span className="font-medium">${fmt(result.machineCost)}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-600">{t("result.laborCost")}</span>
                  <span className="font-medium">${fmt(result.laborCost)}</span>
                </div>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-300">
                <span className="text-lg font-semibold text-zinc-900">{t("result.totalCost")}</span>
                <span className="text-2xl font-bold text-zinc-900">${fmt(result.total)}</span>
              </div>
              <div className="text-sm text-zinc-500">
                {t("result.perGram")}: ${result.perGram.toLocaleString("en-US", { maximumFractionDigits: 4 })}/g
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("about.heading")}
        </h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("examples.heading")}
        </h2>
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

      {/* How-to */}
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

      {/* FAQ */}
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
