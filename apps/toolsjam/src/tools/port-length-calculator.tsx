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

// Speed of sound in in/s at room temperature
const SPEED_OF_SOUND_IN = 13530;

function calcPortLength(
  boxVolumeFt3: number,
  tuningHz: number,
  portDiamIn: number,
  numPorts: number,
  endCorrection: number
): { lengthIn: number; lengthCm: number; portArea: number; totalArea: number } {
  const r = portDiamIn / 2;
  const portArea = Math.PI * r * r; // in²
  const totalArea = portArea * numPorts; // in²
  const boxVolumeIn3 = boxVolumeFt3 * 1728;
  // Leff = (c² * totalArea) / (4π * f² * V)
  const Leff =
    (SPEED_OF_SOUND_IN * SPEED_OF_SOUND_IN * totalArea) /
    (4 * Math.PI * Math.PI * tuningHz * tuningHz * boxVolumeIn3);
  const correction = endCorrection * portDiamIn;
  const lengthIn = Leff - correction;
  const lengthCm = lengthIn * 2.54;
  return { lengthIn, lengthCm, portArea, totalArea };
}

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function PortLengthCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.port-length-calculator");
  const [boxVolume, setBoxVolume] = React.useState("");
  const [tuningFreq, setTuningFreq] = React.useState("");
  const [portDiameter, setPortDiameter] = React.useState("");
  const [numPorts, setNumPorts] = React.useState("1");
  const [endCorrection, setEndCorrection] = React.useState("0.732");
  const [touched, setTouched] = React.useState(false);

  const bvNum = parseFloat(boxVolume);
  const tfNum = parseFloat(tuningFreq);
  const pdNum = parseFloat(portDiameter);
  const npNum = parseInt(numPorts, 10);
  const ecNum = parseFloat(endCorrection);

  const valid =
    Number.isFinite(bvNum) && bvNum > 0 &&
    Number.isFinite(tfNum) && tfNum > 0 &&
    Number.isFinite(pdNum) && pdNum > 0 &&
    Number.isFinite(npNum) && npNum >= 1 &&
    Number.isFinite(ecNum) && ecNum >= 0;

  const result = React.useMemo(() => {
    if (!valid) return null;
    return calcPortLength(bvNum, tfNum, pdNum, npNum, ecNum);
  }, [valid, bvNum, tfNum, pdNum, npNum, ecNum]);

  const negative = result !== null && result.lengthIn <= 0;

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  function loadExample(bv: string, tf: string, pd: string, np: string, ec: string) {
    setBoxVolume(bv);
    setTuningFreq(tf);
    setPortDiameter(pd);
    setNumPorts(np);
    setEndCorrection(ec);
    setTouched(true);
  }

  function reset() {
    setBoxVolume("");
    setTuningFreq("");
    setPortDiameter("");
    setNumPorts("1");
    setEndCorrection("0.732");
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="plc-bv">{t("field.boxVolume")}</Label>
              <Input
                id="plc-bv"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.1}
                value={boxVolume}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setBoxVolume(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plc-tf">{t("field.tuningFreq")}</Label>
              <Input
                id="plc-tf"
                type="number"
                inputMode="decimal"
                min={1}
                value={tuningFreq}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setTuningFreq(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plc-pd">{t("field.portDiameter")}</Label>
              <Input
                id="plc-pd"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.5}
                value={portDiameter}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setPortDiameter(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plc-np">{t("field.numPorts")}</Label>
              <Input
                id="plc-np"
                type="number"
                inputMode="numeric"
                min={1}
                max={6}
                value={numPorts}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setNumPorts(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plc-ec">{t("field.endCorrection")}</Label>
              <Input
                id="plc-ec"
                type="number"
                inputMode="decimal"
                min={0}
                max={2}
                step={0.001}
                value={endCorrection}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setEndCorrection(e.target.value); setTouched(true); }}
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

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {touched && valid && negative && (
            <p className="text-sm text-red-600">{t("error.negative")}</p>
          )}

          {touched && valid && result && !negative && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.lengthIn")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{fmt(result.lengthIn)}&quot;</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.lengthCm")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{fmt(result.lengthCm)} cm</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.portArea")}</div>
                  <div className="text-lg font-semibold text-zinc-900">{fmt(result.portArea)} in²</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.portsTotal")}</div>
                  <div className="text-lg font-semibold text-zinc-900">{fmt(result.totalArea)} in²</div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("result.formula")}</p>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("2.5", "35", "4", "1", "0.732")}>
            Small Subwoofer
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("4", "28", "6", "2", "0.732")}>
            Large Subwoofer
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1.8", "38", "3", "1", "0.732")}>
            Car Audio
          </Button>
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
