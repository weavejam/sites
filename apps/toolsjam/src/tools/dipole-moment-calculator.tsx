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

const DEBYE_FACTOR = 3.33564e-30; // C·m per Debye

interface DipoleMomentResult {
  dipoleMoment: number; // C·m
  debye: number;
  px: number; // C·m
  py: number; // C·m
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

function fmtSci(n: number, sig = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / Math.pow(10, exp);
  const mStr = mantissa.toLocaleString("en-US", { maximumFractionDigits: sig - 1 });
  return `${mStr}×10^${exp}`;
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function calculate(
  charge: number,
  distance: number,
  angleDeg: number,
): DipoleMomentResult {
  const dipoleMoment = charge * distance;
  const debye = dipoleMoment / DEBYE_FACTOR;
  const angleRad = (angleDeg * Math.PI) / 180;
  const px = dipoleMoment * Math.cos(angleRad);
  const py = dipoleMoment * Math.sin(angleRad);
  return { dipoleMoment, debye, px, py };
}

export default function DipoleMomentCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dipole-moment-calculator");

  const [charge, setCharge] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [angle, setAngle] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const chargeNum = charge === "" ? NaN : parseFloat(charge);
  const distanceNum = distance === "" ? NaN : parseFloat(distance);
  const angleNum = angle === "" ? 0 : parseFloat(angle);

  const result = React.useMemo<DipoleMomentResult | null>(() => {
    if (!Number.isFinite(chargeNum) || !Number.isFinite(distanceNum)) return null;
    if (chargeNum <= 0 || distanceNum <= 0) return null;
    const a = Number.isFinite(angleNum) ? angleNum : 0;
    return calculate(chargeNum, distanceNum, a);
  }, [chargeNum, distanceNum, angleNum]);

  function reset() {
    setCharge("");
    setDistance("");
    setAngle("");
    setTouched(false);
  }

  function loadExample(q: string, d: string, a: string) {
    setCharge(q);
    setDistance(d);
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
              <Label htmlFor="dm-charge">{t("field.charge")}</Label>
              <Input
                id="dm-charge"
                type="number"
                inputMode="decimal"
                value={charge}
                placeholder={t("placeholder.charge")}
                onChange={(e) => { setCharge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dm-distance">{t("field.distance")}</Label>
              <Input
                id="dm-distance"
                type="number"
                inputMode="decimal"
                value={distance}
                placeholder={t("placeholder.distance")}
                onChange={(e) => { setDistance(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dm-angle">{t("field.angle")}</Label>
              <Input
                id="dm-angle"
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dipoleMoment")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.dipoleMoment)} {t("result.unitCm")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.inDebye")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.debye, 4)} {t("result.unitD")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.xComponent")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.px)} {t("result.unitCm")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.yComponent")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.py)} {t("result.unitCm")}
                  </div>
                </div>
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
            onClick={() => loadExample("1.602e-19", "1e-10", "0")}
          >
            {t("examples.loadElementary")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1.85e-19", "3.85e-11", "0")}
          >
            {t("examples.loadWater")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1e-6", "1e-3", "45")}
          >
            {t("examples.loadMacro")}
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
