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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface DiffractionResult {
  solved: "angle" | "wavelength" | "maxOrder";
  angle?: number;
  wavelength?: number;
  maxOrder?: number;
  gratingSpacing: number;
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function solveDiffraction(
  linesPerMm: number,
  order: number,
  wavelengthNm: number,
  angleDeg: number,
): DiffractionResult | null {
  if (!Number.isFinite(linesPerMm) || linesPerMm <= 0) return null;
  const d = 1e6 / linesPerMm; // grating spacing in nm

  const hasOrder = Number.isFinite(order) && Number.isInteger(order);
  const hasWavelength = Number.isFinite(wavelengthNm) && wavelengthNm > 0;
  const hasAngle = Number.isFinite(angleDeg);

  // Solve for angle: need N, m, λ
  if (hasOrder && hasWavelength && !hasAngle) {
    const sinTheta = (order * wavelengthNm) / d;
    if (Math.abs(sinTheta) > 1) return null;
    const angle = Math.asin(sinTheta) * (180 / Math.PI);
    return { solved: "angle", angle, gratingSpacing: d };
  }

  // Solve for wavelength: need N, m, θ
  if (hasOrder && hasAngle && !hasWavelength) {
    const sinTheta = Math.sin(angleDeg * (Math.PI / 180));
    const wavelength = (d * sinTheta) / order;
    if (wavelength <= 0 || !Number.isFinite(wavelength)) return null;
    return { solved: "wavelength", wavelength, gratingSpacing: d };
  }

  // Solve for max order: need N, λ
  if (hasWavelength && !hasOrder && !hasAngle) {
    const maxOrder = Math.floor(d / wavelengthNm);
    return { solved: "maxOrder", maxOrder, gratingSpacing: d };
  }

  return null;
}

export default function DiffractionGratingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.diffraction-grating-calculator");

  const [linesPerMm, setLinesPerMm] = React.useState("");
  const [order, setOrder] = React.useState("");
  const [wavelength, setWavelength] = React.useState("");
  const [angle, setAngle] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const linesNum = linesPerMm === "" ? NaN : parseFloat(linesPerMm);
  const orderNum = order === "" ? NaN : parseFloat(order);
  const wavelengthNum = wavelength === "" ? NaN : parseFloat(wavelength);
  const angleNum = angle === "" ? NaN : parseFloat(angle);

  const result = React.useMemo<DiffractionResult | null>(() => {
    return solveDiffraction(linesNum, orderNum, wavelengthNum, angleNum);
  }, [linesNum, orderNum, wavelengthNum, angleNum]);

  function reset() {
    setLinesPerMm("");
    setOrder("");
    setWavelength("");
    setAngle("");
    setTouched(false);
  }

  function loadExample(n: string, m: string, wl: string, a: string) {
    setLinesPerMm(n);
    setOrder(m);
    setWavelength(wl);
    setAngle(a);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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

  const showError = touched && result === null && Number.isFinite(linesNum);
  const showNoSolution = touched && result === null && Number.isFinite(linesNum) && (Number.isFinite(orderNum) || Number.isFinite(wavelengthNum) || Number.isFinite(angleNum));

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
              <Label htmlFor="dg-lines">{t("field.linesPerMm")}</Label>
              <Input
                id="dg-lines"
                type="number"
                inputMode="decimal"
                value={linesPerMm}
                placeholder={t("placeholder.linesPerMm")}
                onChange={(e) => { setLinesPerMm(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dg-order">{t("field.order")}</Label>
              <Input
                id="dg-order"
                type="number"
                inputMode="numeric"
                value={order}
                placeholder={t("placeholder.order")}
                onChange={(e) => { setOrder(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dg-wavelength">{t("field.wavelength")}</Label>
              <Input
                id="dg-wavelength"
                type="number"
                inputMode="decimal"
                value={wavelength}
                placeholder={t("placeholder.wavelength")}
                onChange={(e) => { setWavelength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dg-angle">{t("field.angle")}</Label>
              <Input
                id="dg-angle"
                type="number"
                inputMode="decimal"
                value={angle}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setAngle(e.target.value); setTouched(true); }}
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

          {showError && !showNoSolution && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showNoSolution && (
            <p className="text-sm text-red-600">{t("error.noSolution")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.gratingSpacing")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.gratingSpacing)} {t("result.unitNm")}
                  </div>
                </div>
                {result.solved === "angle" && result.angle !== undefined && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.angle")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt(result.angle, 4)}{t("result.unitDeg")}
                    </div>
                  </div>
                )}
                {result.solved === "wavelength" && result.wavelength !== undefined && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.wavelength")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt(result.wavelength, 2)} {t("result.unitNm")}
                    </div>
                  </div>
                )}
                {result.solved === "maxOrder" && result.maxOrder !== undefined && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.maxOrder")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {result.maxOrder}
                    </div>
                  </div>
                )}
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
                <th className="px-3 py-2 font-semibold">{t("examples.colInput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colOutput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colNote")}</th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
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
            onClick={() => loadExample("600", "1", "532", "")}
          >
            {t("examples.loadGreen")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1200", "1", "650", "")}
          >
            {t("examples.loadRed")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1000", "1", "", "40")}
          >
            {t("examples.loadReverse")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
