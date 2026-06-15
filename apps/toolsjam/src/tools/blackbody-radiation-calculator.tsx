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

// Physical constants
const H = 6.626e-34;       // Planck constant (J·s)
const C = 2.998e8;         // speed of light (m/s)
const K_B = 1.381e-23;     // Boltzmann constant (J/K)
const SIGMA = 5.670e-8;    // Stefan-Boltzmann constant (W/m²/K⁴)
const WIEN_B = 2.898e-3;   // Wien's displacement constant (m·K)

function fmtSci(n: number, sig = 4): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  if (n === 0) return "0";
  if (n >= 0.001 && n < 1e7) {
    return parseFloat(n.toPrecision(sig)).toLocaleString("en-US", {
      maximumSignificantDigits: sig,
    });
  }
  return n.toExponential(sig - 1);
}

interface BBResult {
  peakWavelengthNm: number;
  totalPower: number;
  spectralRadiance: number;   // W·m⁻²·sr⁻¹·nm⁻¹
  radiantExitance: number;    // W/m²
}

function computeBlackbody(
  T: number,   // K
  A: number,   // m²
  lambdaNm: number, // nm
  eps: number,
): BBResult {
  const peakWavelengthNm = (WIEN_B / T) * 1e9;
  const radiantExitance = eps * SIGMA * Math.pow(T, 4);
  const totalPower = radiantExitance * A;

  const lambdaM = lambdaNm * 1e-9;
  const exponent = (H * C) / (lambdaM * K_B * T);
  const planck = (2 * H * C * C) / Math.pow(lambdaM, 5) / (Math.exp(exponent) - 1);
  // Convert W·m⁻²·sr⁻¹·m⁻¹ → W·m⁻²·sr⁻¹·nm⁻¹ (divide by 1e9)
  const spectralRadiance = eps * planck * 1e-9;

  return { peakWavelengthNm, totalPower, spectralRadiance, radiantExitance };
}

export default function BlackbodyRadiationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.blackbody-radiation-calculator");

  const [temperature, setTemperature] = React.useState("");
  const [area, setArea] = React.useState("");
  const [wavelength, setWavelength] = React.useState("");
  const [emissivity, setEmissivity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const tNum = parseFloat(temperature);
  const aNum = parseFloat(area);
  const lNum = parseFloat(wavelength);
  const eNum = parseFloat(emissivity);

  const tValid = temperature !== "" && Number.isFinite(tNum) && tNum > 0;
  const aValid = area !== "" && Number.isFinite(aNum) && aNum > 0;
  const lValid = wavelength !== "" && Number.isFinite(lNum) && lNum > 0;
  const eValid = emissivity === "" || (Number.isFinite(eNum) && eNum >= 0 && eNum <= 1);
  const allValid = tValid && aValid && lValid && eValid;

  const showError = touched && !allValid && !(touched && !eValid);
  const showEpsError = touched && !eValid;

  const eps = emissivity === "" ? 1 : eNum;

  const result = React.useMemo<BBResult | null>(() => {
    if (!tValid || !aValid || !lValid || !eValid) return null;
    return computeBlackbody(tNum, aNum, lNum, eps);
  }, [tValid, aValid, lValid, eValid, tNum, aNum, lNum, eps]);

  function loadExample(t_: string, a_: string, l_: string, e_: string) {
    setTemperature(t_); setArea(a_); setWavelength(l_); setEmissivity(e_); setTouched(true);
  }

  function reset() {
    setTemperature(""); setArea(""); setWavelength(""); setEmissivity(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
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
              <Label htmlFor="bb-temp">{t("field.temperature")}</Label>
              <Input
                id="bb-temp"
                type="number"
                inputMode="decimal"
                min="0"
                value={temperature}
                placeholder={t("placeholder.temperature")}
                onChange={(e) => { setTemperature(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bb-area">{t("field.area")}</Label>
              <Input
                id="bb-area"
                type="number"
                inputMode="decimal"
                min="0"
                value={area}
                placeholder={t("placeholder.area")}
                onChange={(e) => { setArea(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bb-wave">{t("field.wavelength")}</Label>
              <Input
                id="bb-wave"
                type="number"
                inputMode="decimal"
                min="0"
                value={wavelength}
                placeholder={t("placeholder.wavelength")}
                onChange={(e) => { setWavelength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bb-eps">{t("field.emissivity")}</Label>
              <Input
                id="bb-eps"
                type="number"
                inputMode="decimal"
                min="0"
                max="1"
                step="0.01"
                value={emissivity}
                placeholder={t("placeholder.emissivity")}
                onChange={(e) => { setEmissivity(e.target.value); setTouched(true); }}
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
          {showEpsError && (
            <p className="text-sm text-red-600">{t("error.emissivity")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.peakWavelength")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.peakWavelengthNm)} {t("result.unitNm")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalPower")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.totalPower)} {t("result.unitW")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.radiantExitance")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.radiantExitance)} {t("result.unitWm2")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.spectralRadiance")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.spectralRadiance)} {t("result.unitWm2sr")}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500 pt-1">{t("result.formula")}</div>
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
            onClick={() => loadExample("5778", "1", "500", "1")}>
            {t("examples.loadSun")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("288", "1", "10000", "0.98")}>
            {t("examples.loadEarth")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("2700", "0.001", "700", "0.9")}>
            {t("examples.loadBulb")}
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
