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

const SPEED_OF_LIGHT = 3e8; // m/s
const BOLTZMANN = 1.38e-23; // J/K
const NOISE_TEMP = 290; // Kelvin (standard)

function formatNum(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

export default function TransmissionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.transmission-calculator");

  const [txPower, setTxPower] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [bandwidth, setBandwidth] = React.useState("");
  const [dataRate, setDataRate] = React.useState("");
  const [antennaGain, setAntennaGain] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const P = parseFloat(txPower);
  const d = parseFloat(distance);
  const f = parseFloat(frequency);
  const bw = parseFloat(bandwidth);
  const dr = parseFloat(dataRate);
  const ga = parseFloat(antennaGain);

  const valid =
    txPower !== "" && distance !== "" && frequency !== "" &&
    bandwidth !== "" && dataRate !== "" && antennaGain !== "" &&
    Number.isFinite(P) && Number.isFinite(d) && Number.isFinite(f) &&
    Number.isFinite(bw) && Number.isFinite(dr) && Number.isFinite(ga) &&
    P > 0 && d > 0 && f > 0 && bw > 0 && dr > 0;

  const result = React.useMemo<{
    pathLoss: number;
    txPowerDbm: number;
    rxPowerDbm: number;
    shannonCapacity: number;
    bwEfficiency: number;
    snrDb: number;
    spectralEfficiency: number;
  } | null>(() => {
    if (!valid) return null;
    // Free space path loss (dB): FSPL = 20log(d) + 20log(f) - 147.55
    const pathLoss = 20 * Math.log10(d) + 20 * Math.log10(f) - 147.55;
    // Transmit power in dBm
    const txPowerDbm = 10 * Math.log10(P) + 30;
    // Received power: Pt_dBm + 2 * Ga_dB - FSPL (same antenna gain at both ends)
    const rxPowerDbm = txPowerDbm + 2 * ga - pathLoss;
    // Noise power: N = kTB
    const noisePower = BOLTZMANN * NOISE_TEMP * bw;
    const noisePowerDbm = 10 * Math.log10(noisePower) + 30;
    // SNR
    const snrDb = rxPowerDbm - noisePowerDbm;
    const snrLinear = Math.pow(10, snrDb / 10);
    // Shannon capacity
    const shannonCapacity = bw * Math.log2(1 + snrLinear);
    // Bandwidth efficiency (actual data rate / bandwidth)
    const bwEfficiency = dr / bw;
    // Spectral efficiency from Shannon limit
    const spectralEfficiency = shannonCapacity / bw;
    return { pathLoss, txPowerDbm, rxPowerDbm, shannonCapacity, bwEfficiency, snrDb, spectralEfficiency };
  }, [valid, P, d, f, bw, dr, ga]);

  function loadExample(p: string, di: string, fr: string, bwv: string, drv: string, gv: string) {
    setTxPower(p); setDistance(di); setFrequency(fr);
    setBandwidth(bwv); setDataRate(drv); setAntennaGain(gv);
    setTouched(true);
  }

  function reset() {
    setTxPower(""); setDistance(""); setFrequency("");
    setBandwidth(""); setDataRate(""); setAntennaGain(""); setTouched(false);
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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
    }
    return arr;
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

  const showError = touched && !valid;

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tm-pw">{t("field.txPower")}</Label>
              <Input
                id="tm-pw"
                type="number"
                inputMode="decimal"
                value={txPower}
                placeholder={t("placeholder.txPower")}
                onChange={(e) => { setTxPower(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tm-dist">{t("field.distance")}</Label>
              <Input
                id="tm-dist"
                type="number"
                inputMode="decimal"
                value={distance}
                placeholder={t("placeholder.distance")}
                onChange={(e) => { setDistance(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tm-freq">{t("field.frequency")}</Label>
              <Input
                id="tm-freq"
                type="number"
                inputMode="decimal"
                value={frequency}
                placeholder={t("placeholder.frequency")}
                onChange={(e) => { setFrequency(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tm-bw">{t("field.bandwidth")}</Label>
              <Input
                id="tm-bw"
                type="number"
                inputMode="decimal"
                value={bandwidth}
                placeholder={t("placeholder.bandwidth")}
                onChange={(e) => { setBandwidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tm-dr">{t("field.dataRate")}</Label>
              <Input
                id="tm-dr"
                type="number"
                inputMode="decimal"
                value={dataRate}
                placeholder={t("placeholder.dataRate")}
                onChange={(e) => { setDataRate(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tm-ga">{t("field.antennaGain")}</Label>
              <Input
                id="tm-ga"
                type="number"
                inputMode="decimal"
                value={antennaGain}
                placeholder={t("placeholder.antennaGain")}
                onChange={(e) => { setAntennaGain(e.target.value); setTouched(true); }}
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
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.pathLoss", { value: formatNum(result.pathLoss) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.rxPower", { value: formatNum(result.rxPowerDbm) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.snr", { value: formatNum(result.snrDb) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.shannonCapacity", { value: formatNum(result.shannonCapacity / 1e6) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.spectralEfficiency", { value: formatNum(result.spectralEfficiency, 2) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.bwEfficiency", { value: formatNum(result.bwEfficiency, 4) })}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadExample("0.1", "10", "2400000000", "20000000", "54000000", "2")}
          >
            {t("examples.loadWifi")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadExample("50", "1000", "900000000", "5000000", "10000000", "15")}
          >
            {t("examples.loadCellular")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadExample("100", "35786000", "12000000000", "50000000", "100000000", "40")}
          >
            {t("examples.loadSatellite")}
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
