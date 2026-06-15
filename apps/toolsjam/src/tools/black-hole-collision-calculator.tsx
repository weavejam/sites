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

// Physical constants (SI)
const G = 6.674e-11;   // m³/(kg·s²)
const C = 2.998e8;     // m/s
const M_SUN = 1.989e30; // kg
const YR = 3.156e7;    // seconds per year

function fmtSci(n: number, sig = 4): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  if (n >= 1e-3 && n < 1e10) {
    return parseFloat(n.toPrecision(sig)).toLocaleString("en-US", {
      maximumSignificantDigits: sig,
    });
  }
  return n.toExponential(sig - 1);
}

function fmtYears(years: number): string {
  if (!Number.isFinite(years) || years <= 0) return "—";
  if (years < 1e3) return `${fmtSci(years, 3)} yr`;
  if (years < 1e6) return `${fmtSci(years / 1e3, 3)} kyr`;
  if (years < 1e9) return `${fmtSci(years / 1e6, 3)} Myr`;
  return `${fmtSci(years / 1e9, 3)} Gyr`;
}

interface CollisionResult {
  chirpMass: number;      // solar masses
  reducedMass: number;    // solar masses
  mergerTime: number;     // years
  gwEnergy: number;       // joules
  finalMass: number;      // solar masses
  schwarzschildRadius: number; // km
  peakFrequency: number;  // Hz
}

function computeCollision(
  m1Sol: number,
  m2Sol: number,
  sepKm: number,
  ecc: number,
): CollisionResult {
  const m1 = m1Sol * M_SUN;
  const m2 = m2Sol * M_SUN;
  const mTotal = m1 + m2;
  const a0 = sepKm * 1000; // m

  // Chirp mass & reduced mass
  const chirpMassSol = Math.pow(m1Sol * m2Sol, 3 / 5) / Math.pow(m1Sol + m2Sol, 1 / 5);
  const reducedMassSol = (m1Sol * m2Sol) / (m1Sol + m2Sol);
  const mu = reducedMassSol * M_SUN;

  // Peters merger time (circular orbit)
  const T_circ = (5 / 256) * Math.pow(C, 5) * Math.pow(a0, 4) / (Math.pow(G, 3) * m1 * m2 * mTotal);
  // Eccentricity correction (approximate Peters)
  const eccCorr = Math.pow(1 - ecc * ecc, 3.5);
  const mergerTimeSec = T_circ * eccCorr;
  const mergerTimeYears = mergerTimeSec / YR;

  // GW energy ≈ 5% of reduced mass energy (numerical relativity estimate)
  const gwEnergy = 0.05 * mu * C * C;

  // Final black hole
  const mFinal = mTotal - gwEnergy / (C * C);
  const finalMassSol = mFinal / M_SUN;

  // Schwarzschild radius
  const rs = 2 * G * mFinal / (C * C);
  const rsKm = rs / 1000;

  // Peak GW frequency at ISCO (Schwarzschild)
  const fPeak = Math.pow(C, 3) / (Math.PI * 6 * Math.sqrt(6) * G * mTotal);

  return {
    chirpMass: chirpMassSol,
    reducedMass: reducedMassSol,
    mergerTime: mergerTimeYears,
    gwEnergy,
    finalMass: finalMassSol,
    schwarzschildRadius: rsKm,
    peakFrequency: fPeak,
  };
}

export default function BlackHoleCollisionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.black-hole-collision-calculator");

  const [mass1, setMass1] = React.useState("");
  const [mass2, setMass2] = React.useState("");
  const [separation, setSeparation] = React.useState("");
  const [eccentricity, setEccentricity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const m1Num = parseFloat(mass1);
  const m2Num = parseFloat(mass2);
  const sepNum = parseFloat(separation);
  const eccNum = parseFloat(eccentricity);

  const m1Valid = mass1 !== "" && Number.isFinite(m1Num) && m1Num > 0;
  const m2Valid = mass2 !== "" && Number.isFinite(m2Num) && m2Num > 0;
  const sepValid = separation !== "" && Number.isFinite(sepNum) && sepNum > 0;
  const eccValid = eccentricity !== "" && Number.isFinite(eccNum) && eccNum >= 0 && eccNum < 1;

  const allValid = m1Valid && m2Valid && sepValid && eccValid;
  const showEccError = touched && eccentricity !== "" && !eccValid;
  const showError = touched && !allValid && !showEccError;

  const result = React.useMemo<CollisionResult | null>(() => {
    if (!allValid) return null;
    return computeCollision(m1Num, m2Num, sepNum, eccNum);
  }, [allValid, m1Num, m2Num, sepNum, eccNum]);

  function loadExample(m1: string, m2: string, sep: string, ecc: string) {
    setMass1(m1); setMass2(m2); setSeparation(sep); setEccentricity(ecc);
    setTouched(true);
  }

  function reset() {
    setMass1(""); setMass2(""); setSeparation(""); setEccentricity("");
    setTouched(false);
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
              <Label htmlFor="bhc-m1">{t("field.mass1")}</Label>
              <Input
                id="bhc-m1"
                type="number"
                inputMode="decimal"
                min="0"
                value={mass1}
                placeholder={t("placeholder.mass1")}
                onChange={(e) => { setMass1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bhc-m2">{t("field.mass2")}</Label>
              <Input
                id="bhc-m2"
                type="number"
                inputMode="decimal"
                min="0"
                value={mass2}
                placeholder={t("placeholder.mass2")}
                onChange={(e) => { setMass2(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bhc-sep">{t("field.separation")}</Label>
              <Input
                id="bhc-sep"
                type="number"
                inputMode="decimal"
                min="0"
                value={separation}
                placeholder={t("placeholder.separation")}
                onChange={(e) => { setSeparation(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bhc-ecc">{t("field.eccentricity")}</Label>
              <Input
                id="bhc-ecc"
                type="number"
                inputMode="decimal"
                min="0"
                max="0.99"
                step="0.01"
                value={eccentricity}
                placeholder={t("placeholder.eccentricity")}
                onChange={(e) => { setEccentricity(e.target.value); setTouched(true); }}
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

          {showError && !showEccError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showEccError && (
            <p className="text-sm text-red-600">{t("error.eccentricity")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.chirpMass")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.chirpMass)} {t("result.unitSolar")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.reducedMass")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.reducedMass)} {t("result.unitSolar")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.mergerTime")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtYears(result.mergerTime)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.gwEnergy")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.gwEnergy.toExponential(3)} {t("result.unitJoules")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.finalMass")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.finalMass)} {t("result.unitSolar")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.schwarzschildRadius")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.schwarzschildRadius)} {t("result.unitKm")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.peakFrequency")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtSci(result.peakFrequency)} {t("result.unitHz")}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("36", "29", "10000000", "0")}>
            {t("examples.loadGW150914")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1000", "800", "100000000", "0.3")}>
            {t("examples.loadIMBH")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("20", "20", "5000000", "0")}>
            {t("examples.loadEqual")}
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
