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

type PowerUnit = "W" | "dBm";

function wattsTodBm(w: number): number {
  return 10 * Math.log10(w * 1000);
}
function dBmToWatts(dbm: number): number {
  return Math.pow(10, dbm / 10) / 1000;
}
function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
}

export default function EirpCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.eirp-calculator-effective-isotropic-radiated-power");

  const [power, setPower] = React.useState("");
  const [powerUnit, setPowerUnit] = React.useState<PowerUnit>("W");
  const [cableLoss, setCableLoss] = React.useState("");
  const [antennaGain, setAntennaGain] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const pVal = parseFloat(power);
  const lossVal = parseFloat(cableLoss);
  const gainVal = parseFloat(antennaGain);

  const allValid =
    power !== "" &&
    cableLoss !== "" &&
    antennaGain !== "" &&
    Number.isFinite(pVal) &&
    Number.isFinite(lossVal) &&
    Number.isFinite(gainVal);

  const result = React.useMemo(() => {
    if (!touched || !allValid) return null;
    if (powerUnit === "W" && pVal <= 0) return null;
    const pDbm = powerUnit === "W" ? wattsTodBm(pVal) : pVal;
    const eirpDbm = pDbm - lossVal + gainVal;
    const eirpW = dBmToWatts(eirpDbm);
    const eirpDbW = eirpDbm - 30;
    const netGain = gainVal - lossVal;
    return { eirpDbm, eirpW, eirpDbW, netGain };
  }, [touched, allValid, powerUnit, pVal, lossVal, gainVal]);

  const showError =
    touched && (!allValid || (powerUnit === "W" && allValid && pVal <= 0));

  function reset() {
    setPower("");
    setPowerUnit("W");
    setCableLoss("");
    setAntennaGain("");
    setTouched(false);
  }

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
              <Label htmlFor="eirp-power">{t("field.power")}</Label>
              <div className="flex gap-2">
                <Input
                  id="eirp-power"
                  type="number"
                  inputMode="decimal"
                  value={power}
                  placeholder={t("placeholder.power")}
                  className="flex-1"
                  onChange={(e) => { setPower(e.target.value); setTouched(false); }}
                />
                <select
                  aria-label={t("field.powerUnit")}
                  className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={powerUnit}
                  onChange={(e) => { setPowerUnit(e.target.value as PowerUnit); setTouched(false); }}
                >
                  <option value="W">{t("powerUnit.W")}</option>
                  <option value="dBm">{t("powerUnit.dBm")}</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eirp-cableLoss">{t("field.cableLoss")}</Label>
              <Input
                id="eirp-cableLoss"
                type="number"
                inputMode="decimal"
                value={cableLoss}
                placeholder={t("placeholder.cableLoss")}
                onChange={(e) => { setCableLoss(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eirp-antennaGain">{t("field.antennaGain")}</Label>
              <Input
                id="eirp-antennaGain"
                type="number"
                inputMode="decimal"
                value={antennaGain}
                placeholder={t("placeholder.antennaGain")}
                onChange={(e) => { setAntennaGain(e.target.value); setTouched(false); }}
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
            <p className="text-sm text-red-600">
              {powerUnit === "W" && allValid && pVal <= 0
                ? t("error.negativePower")
                : t("error.invalid")}
            </p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.eirpDbm")}: </span>
                  <span className="text-xl font-semibold">{fmt(result.eirpDbm)} dBm</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.eirpW")}: </span>
                  <span className="font-semibold">{fmt(result.eirpW, 4)} W</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.eirpDbW")}: </span>
                  <span className="font-semibold">{fmt(result.eirpDbW)} dBW</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.netGain")}: </span>
                  <span className="font-semibold">{fmt(result.netGain)} dB</span>
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
