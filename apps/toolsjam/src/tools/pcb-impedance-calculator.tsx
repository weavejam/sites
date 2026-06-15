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

type TraceType = "microstrip" | "stripline";
const TRACE_TYPES: TraceType[] = ["microstrip", "stripline"];

function calcMicrostrip(W: number, T: number, H: number, er: number) {
  const denom = 0.8 * W + T;
  if (denom <= 0 || H <= 0) return null;
  const z0 = (87 / Math.sqrt(er + 1.41)) * Math.log(5.98 * H / denom);
  // Effective dielectric constant (Hammerstad approximation)
  const u = W / H;
  const a = 1 + (1 / 49) * Math.log((Math.pow(u, 4) + Math.pow(u / 52, 2)) / (Math.pow(u, 4) + 0.432)) + (1 / 18.7) * Math.log(1 + Math.pow(u / 18.1, 3));
  const b = 0.564 * Math.pow((er - 0.9) / (er + 3), 0.053);
  const erEff = ((er + 1) / 2 + (er - 1) / 2 * Math.pow(1 + 12 / u, -a * b));
  return { z0, erEff };
}

function calcStripline(W: number, T: number, B: number, er: number) {
  const inner = 0.67 * Math.PI * (0.8 * W + T);
  if (inner <= 0 || B <= 0 || er <= 0) return null;
  const z0 = (60 / Math.sqrt(er)) * Math.log(4 * B / inner);
  return { z0, erEff: er };
}

export default function PcbImpedanceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pcb-impedance-calculator");
  const [traceType, setTraceType] = React.useState<TraceType>("microstrip");
  const [traceWidth, setTraceWidth] = React.useState("");
  const [traceThickness, setTraceThickness] = React.useState("1.378");
  const [dielectricHeight, setDielectricHeight] = React.useState("");
  const [planeSpacing, setPlaneSpacing] = React.useState("");
  const [er, setEr] = React.useState("4.5");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    const W = parseFloat(traceWidth);
    const T = parseFloat(traceThickness);
    const H = parseFloat(dielectricHeight);
    const B = parseFloat(planeSpacing);
    const erVal = parseFloat(er);
    if (!Number.isFinite(erVal) || erVal <= 0) return null;
    if (traceType === "microstrip") {
      if (!Number.isFinite(W) || !Number.isFinite(T) || !Number.isFinite(H) || W <= 0 || T <= 0 || H <= 0) return null;
      return calcMicrostrip(W, T, H, erVal);
    } else {
      if (!Number.isFinite(W) || !Number.isFinite(T) || !Number.isFinite(B) || W <= 0 || T <= 0 || B <= 0) return null;
      return calcStripline(W, T, B, erVal);
    }
  }, [traceType, traceWidth, traceThickness, dielectricHeight, planeSpacing, er]);

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
    setTraceThickness("1.378");
    setDielectricHeight("");
    setPlaneSpacing("");
    setEr("4.5");
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
            <Label>{t("field.traceType")}</Label>
            <div className="flex flex-wrap gap-2">
              {TRACE_TYPES.map((tt) => (
                <Button
                  key={tt}
                  type="button"
                  variant={traceType === tt ? "default" : "outline"}
                  onClick={() => {
                    setTraceType(tt);
                    setTouched(false);
                  }}
                >
                  {t(`type.${tt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pcbi-w">{t("field.traceWidth")}</Label>
              <Input
                id="pcbi-w"
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
              <Label htmlFor="pcbi-t">{t("field.traceThickness")}</Label>
              <Input
                id="pcbi-t"
                type="number"
                inputMode="decimal"
                value={traceThickness}
                placeholder={t("placeholder.mils")}
                onChange={(e) => {
                  setTraceThickness(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            {traceType === "microstrip" ? (
              <div className="space-y-2">
                <Label htmlFor="pcbi-h">{t("field.dielectricHeight")}</Label>
                <Input
                  id="pcbi-h"
                  type="number"
                  inputMode="decimal"
                  value={dielectricHeight}
                  placeholder={t("placeholder.mils")}
                  onChange={(e) => {
                    setDielectricHeight(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="pcbi-b">{t("field.planeSpacing")}</Label>
                <Input
                  id="pcbi-b"
                  type="number"
                  inputMode="decimal"
                  value={planeSpacing}
                  placeholder={t("placeholder.mils")}
                  onChange={(e) => {
                    setPlaneSpacing(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="pcbi-er">{t("field.dielectricConstant")}</Label>
              <Input
                id="pcbi-er"
                type="number"
                inputMode="decimal"
                value={er}
                placeholder={t("placeholder.er")}
                onChange={(e) => {
                  setEr(e.target.value);
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
                    {t("result.impedance")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.z0.toFixed(1)}{" "}
                    <span className="text-base font-normal text-zinc-500">
                      {t("unit.ohm")}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.effectiveEr")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.erEff.toFixed(3)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">
                {t(`formula.${traceType}` as never)}
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
