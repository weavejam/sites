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

type DipoleType = "half-wave" | "quarter-wave";

const DIPOLE_TYPES: DipoleType[] = ["half-wave", "quarter-wave"];
const SPEED_OF_LIGHT = 299.792458; // m/s × 10^6 for MHz input

interface DipoleResult {
  wavelength: number; // metres
  totalLength: number; // metres
  armLength: number; // metres
  impedance: number; // ohms
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

function fmt(n: number, digits = 3): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function calculateDipole(
  freqMHz: number,
  velocityFactor: number,
  type: DipoleType,
): DipoleResult {
  const wavelength = SPEED_OF_LIGHT / freqMHz; // metres
  const factor = type === "half-wave" ? 0.5 : 0.25;
  const totalLength = wavelength * factor * velocityFactor;
  const armLength = type === "half-wave" ? totalLength / 2 : totalLength;
  const impedance = type === "half-wave" ? 73 : 36;
  return { wavelength, totalLength, armLength, impedance };
}

export default function DipoleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dipole-calculator");

  const [frequency, setFrequency] = React.useState("");
  const [velocityFactor, setVelocityFactor] = React.useState("");
  const [dipoleType, setDipoleType] = React.useState<DipoleType>("half-wave");
  const [touched, setTouched] = React.useState(false);

  const freqNum = frequency === "" ? NaN : parseFloat(frequency);
  const vfNum = velocityFactor === "" ? NaN : parseFloat(velocityFactor);

  const result = React.useMemo<DipoleResult | null>(() => {
    if (!Number.isFinite(freqNum) || freqNum <= 0) return null;
    const vf = Number.isFinite(vfNum) && vfNum > 0 && vfNum <= 1 ? vfNum : 0.95;
    return calculateDipole(freqNum, vf, dipoleType);
  }, [freqNum, vfNum, dipoleType]);

  function reset() {
    setFrequency("");
    setVelocityFactor("");
    setDipoleType("half-wave");
    setTouched(false);
  }

  function loadExample(freq: string, vf: string, type: DipoleType) {
    setFrequency(freq);
    setVelocityFactor(vf);
    setDipoleType(type);
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

  const showError = touched && (!Number.isFinite(freqNum) || freqNum <= 0);

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
              <Label htmlFor="dip-freq">{t("field.frequency")}</Label>
              <Input
                id="dip-freq"
                type="number"
                inputMode="decimal"
                value={frequency}
                placeholder={t("placeholder.frequency")}
                onChange={(e) => { setFrequency(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dip-vf">{t("field.velocityFactor")}</Label>
              <Input
                id="dip-vf"
                type="number"
                inputMode="decimal"
                value={velocityFactor}
                placeholder={t("placeholder.velocityFactor")}
                onChange={(e) => { setVelocityFactor(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.dipoleType")}</Label>
            <div className="flex flex-wrap gap-2">
              {DIPOLE_TYPES.map((dt) => (
                <Button
                  key={dt}
                  type="button"
                  variant={dipoleType === dt ? "default" : "outline"}
                  onClick={() => setDipoleType(dt)}
                >
                  {t(`type.${dt}` as never)}
                </Button>
              ))}
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
                  <div className="text-xs text-zinc-500">{t("result.wavelength")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.wavelength)} {t("result.unitM")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalLength")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.totalLength)} {t("result.unitM")}
                    {" / "}{fmt(result.totalLength * 100, 1)} {t("result.unitCm")}
                    {" / "}{fmt(result.totalLength * 3.28084, 3)} {t("result.unitFt")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.armLength")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.armLength)} {t("result.unitM")}
                    {" / "}{fmt(result.armLength * 100, 1)} {t("result.unitCm")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.impedance")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    ≈ {result.impedance} {t("result.unitOhm")}
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
            onClick={() => loadExample("146.52", "0.95", "half-wave")}
          >
            {t("examples.load2m")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("446.0", "0.95", "half-wave")}
          >
            {t("examples.load70cm")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("7.074", "0.95", "half-wave")}
          >
            {t("examples.load40m")}
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
