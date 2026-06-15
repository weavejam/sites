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

type TraceLocation = "external" | "internal";
const TRACE_LOCATIONS: TraceLocation[] = ["external", "internal"];

// Copper thickness in mils per oz weight
const CU_THICKNESS: Record<string, number> = {
  "0.5": 0.689,
  "1": 1.378,
  "2": 2.756,
  "3": 4.134,
  "4": 5.512,
};

const COPPER_WEIGHTS = ["0.5", "1", "2", "3", "4"];

// IPC-2221 coefficients
const K_EXTERNAL = 0.048;
const K_INTERNAL = 0.024;
// Copper resistivity in Ω·mils²/inch at 20°C
const RHO = 0.679;

export default function PcbTraceCurrentCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pcb-trace-current-calculator");
  const [traceWidth, setTraceWidth] = React.useState("");
  const [copperWeight, setCopperWeight] = React.useState("1");
  const [tempRise, setTempRise] = React.useState("10");
  const [traceLocation, setTraceLocation] =
    React.useState<TraceLocation>("external");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    const W = parseFloat(traceWidth);
    const dT = parseFloat(tempRise);
    const T = CU_THICKNESS[copperWeight] ?? 1.378;
    if (!Number.isFinite(W) || W <= 0 || !Number.isFinite(dT) || dT <= 0)
      return null;
    const area = W * T; // mils²
    const k = traceLocation === "external" ? K_EXTERNAL : K_INTERNAL;
    const current = k * Math.pow(dT, 0.44) * Math.pow(area, 0.725);
    const resistancePerInch = RHO / area; // Ω/in
    const powerLossPerInch = current * current * resistancePerInch; // W/in
    return { current, area, resistancePerInch, powerLossPerInch };
  }, [traceWidth, copperWeight, tempRise, traceLocation]);

  const isValid = result !== null;

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
    setTraceWidth("");
    setCopperWeight("1");
    setTempRise("10");
    setTraceLocation("external");
    setTouched(false);
  }

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
          <div className="space-y-2">
            <Label>{t("field.traceLocation")}</Label>
            <div className="flex flex-wrap gap-2">
              {TRACE_LOCATIONS.map((loc) => (
                <Button
                  key={loc}
                  type="button"
                  variant={traceLocation === loc ? "default" : "outline"}
                  onClick={() => {
                    setTraceLocation(loc);
                    setTouched(false);
                  }}
                >
                  {t(`type.${loc}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ptcc-w">{t("field.traceWidth")}</Label>
              <Input
                id="ptcc-w"
                type="number"
                inputMode="decimal"
                value={traceWidth}
                placeholder={t("placeholder.mils")}
                onChange={(e) => {
                  setTraceWidth(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ptcc-cu">{t("field.copperWeight")}</Label>
              <select
                id="ptcc-cu"
                value={copperWeight}
                onChange={(e) => {
                  setCopperWeight(e.target.value);
                  setTouched(true);
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm"
              >
                {COPPER_WEIGHTS.map((w) => (
                  <option key={w} value={w}>
                    {t(`copperWeightOptions.${w}` as never)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ptcc-dt">{t("field.tempRise")}</Label>
              <Input
                id="ptcc-dt"
                type="number"
                inputMode="decimal"
                value={tempRise}
                placeholder={t("placeholder.celsius")}
                onChange={(e) => {
                  setTempRise(e.target.value);
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

          {touched && !isValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && isValid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.maxCurrent")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.current.toFixed(2)}{" "}
                    <span className="text-base font-normal text-zinc-500">
                      {t("unit.amps")}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.crossSection")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.area.toFixed(2)}{" "}
                    <span className="text-base font-normal text-zinc-500">
                      {t("unit.mils2")}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.resistance")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.resistancePerInch.toFixed(4)}{" "}
                    <span className="text-sm font-normal text-zinc-500">
                      {t("unit.ohmPerIn")}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.powerLoss")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.powerLossPerInch.toFixed(4)}{" "}
                    <span className="text-sm font-normal text-zinc-500">
                      {t("unit.wPerIn")}
                    </span>
                  </div>
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
