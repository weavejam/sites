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

const SPEED_OF_SOUND = 13540; // inches/s (344 m/s)

function calcPortLength(
  netVolCubicIn: number,
  portDiamIn: number,
  tuningHz: number
): number {
  // L = (c^2 * S) / (4 * pi^2 * Vb * fb^2) - 0.85 * sqrt(S)
  // all in inches (c in in/s, Vb in cubic inches)
  const S = Math.PI * (portDiamIn / 2) ** 2; // port cross-sectional area in^2
  const Vb = netVolCubicIn;
  const L =
    (SPEED_OF_SOUND ** 2 * S) / (4 * Math.PI ** 2 * Vb * tuningHz ** 2) -
    0.85 * Math.sqrt(S);
  return L;
}

function fmt(n: number, dec = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

export default function SpeakerBoxCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.speaker-box-calculator");

  const [boxLength, setBoxLength] = React.useState("");
  const [boxWidth, setBoxWidth] = React.useState("");
  const [boxHeight, setBoxHeight] = React.useState("");
  const [materialThickness, setMaterialThickness] = React.useState("");
  const [speakerDiameter, setSpeakerDiameter] = React.useState("");
  const [speakerDepth, setSpeakerDepth] = React.useState("");
  const [portDiameter, setPortDiameter] = React.useState("");
  const [tuningFrequency, setTuningFrequency] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const parse = (v: string) => parseFloat(v);

  const result = React.useMemo(() => {
    const l = parse(boxLength);
    const w = parse(boxWidth);
    const h = parse(boxHeight);
    const t2 = parse(materialThickness) || 0;
    const sd = parse(speakerDiameter);
    const sdep = parse(speakerDepth);
    const pd = parse(portDiameter);
    const tf = parse(tuningFrequency);

    if (![l, w, h, sd, sdep, pd, tf].every((v) => Number.isFinite(v) && v > 0))
      return null;

    const intL = l - 2 * t2;
    const intW = w - 2 * t2;
    const intH = h - 2 * t2;
    if (intL <= 0 || intW <= 0 || intH <= 0) return null;

    const grossVol = intL * intW * intH; // cubic inches
    const spkDisplacement = Math.PI * (sd / 2) ** 2 * sdep; // cylinder approx
    const netVol = grossVol - spkDisplacement;
    if (netVol <= 0) return null;

    const portArea = Math.PI * (pd / 2) ** 2;
    const portLength = calcPortLength(netVol, pd, tf);
    const netVolFt3 = netVol / 1728;

    return {
      grossVol,
      spkDisplacement,
      netVol,
      netVolFt3,
      portArea,
      portLength,
      tuningFrequency: tf,
    };
  }, [
    boxLength,
    boxWidth,
    boxHeight,
    materialThickness,
    speakerDiameter,
    speakerDepth,
    portDiameter,
    tuningFrequency,
  ]);

  const showError = touched && !result;

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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
    setBoxLength("");
    setBoxWidth("");
    setBoxHeight("");
    setMaterialThickness("");
    setSpeakerDiameter("");
    setSpeakerDepth("");
    setPortDiameter("");
    setTuningFrequency("");
    setTouched(false);
  }

  const numFields: { id: string; label: string; val: string; set: (v: string) => void; ph: string }[] = [
    { id: "sbc-length", label: t("field.boxLength"), val: boxLength, set: setBoxLength, ph: t("placeholder.length") },
    { id: "sbc-width", label: t("field.boxWidth"), val: boxWidth, set: setBoxWidth, ph: t("placeholder.width") },
    { id: "sbc-height", label: t("field.boxHeight"), val: boxHeight, set: setBoxHeight, ph: t("placeholder.height") },
    { id: "sbc-thickness", label: t("field.materialThickness"), val: materialThickness, set: setMaterialThickness, ph: t("placeholder.thickness") },
    { id: "sbc-spk-diam", label: t("field.speakerDiameter"), val: speakerDiameter, set: setSpeakerDiameter, ph: t("placeholder.spkDiameter") },
    { id: "sbc-spk-depth", label: t("field.speakerDepth"), val: speakerDepth, set: setSpeakerDepth, ph: t("placeholder.spkDepth") },
    { id: "sbc-port-diam", label: t("field.portDiameter"), val: portDiameter, set: setPortDiameter, ph: t("placeholder.portDiam") },
    { id: "sbc-tuning", label: t("field.tuningFrequency"), val: tuningFrequency, set: setTuningFrequency, ph: t("placeholder.tuning") },
  ];

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
            {numFields.map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  type="number"
                  inputMode="decimal"
                  value={f.val}
                  placeholder={f.ph}
                  min={0}
                  onChange={(e) => {
                    f.set(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ))}
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

          {result && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.grossVolume")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.grossVol, 0)} {t("result.cubicInches")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.speakerDisplacement")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.spkDisplacement, 0)} {t("result.cubicInches")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.netVolume")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmt(result.netVol, 0)} {t("result.cubicInches")}
                  </div>
                  <div className="text-sm text-zinc-600">= {fmt(result.netVolFt3, 3)} {t("result.cubicFeet")}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.portArea")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmt(result.portArea, 2)} {t("result.sqIn")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.portLength")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.portLength > 0 ? fmt(result.portLength, 2) : "< 1"} {t("result.inches")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.tuningFreq")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmt(result.tuningFrequency, 0)} {t("result.hz")}
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
