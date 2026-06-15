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
const BOHR_RADIUS = 5.29177210903e-11; // m
const ENERGY_GROUND = -13.6;           // eV for hydrogen ground state
const ELECTRON_MASS = 9.1093837015e-31; // kg
const PLANCK = 6.62607015e-34;          // J·s
const FINE_STRUCTURE = 7.2973525693e-3; // α
const SPEED_OF_LIGHT = 2.99792458e8;    // m/s
const EV_TO_J = 1.602176634e-19;        // J per eV

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

interface CalcResult {
  energyEV: number;
  energyJ: number;
  radius: number;
  radiusNm: number;
  velocity: number;
  wavelength: number;
  period: number;
}

function formatSci(n: number, sig = 3): string {
  if (!Number.isFinite(n)) return "—";
  return n.toExponential(sig);
}

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 1e-3 || Math.abs(n) >= 1e6) return n.toExponential(3);
  return n.toFixed(decimals);
}

export default function BohrModelCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.bohr-model-calculator");

  const [atomicNumber, setAtomicNumber] = React.useState("");
  const [principalQuantum, setPrincipalQuantum] = React.useState("");
  const [orbitalQuantum, setOrbitalQuantum] = React.useState("");
  const [magneticQuantum, setMagneticQuantum] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const Z = parseInt(atomicNumber, 10);
  const n = parseInt(principalQuantum, 10);
  const l = orbitalQuantum !== "" ? parseInt(orbitalQuantum, 10) : undefined;
  const m = magneticQuantum !== "" ? parseInt(magneticQuantum, 10) : undefined;

  const validZ = Number.isInteger(Z) && Z >= 1;
  const validN = Number.isInteger(n) && n >= 1;
  const validL = l === undefined || (Number.isInteger(l) && l >= 0 && l <= n - 1);
  const validM = m === undefined || l === undefined || (Number.isInteger(m) && m >= -l && m <= l);

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched || !validZ || !validN) return null;
    const energyEV = ENERGY_GROUND * (Z * Z) / (n * n);
    const energyJ = energyEV * EV_TO_J;
    const radius = BOHR_RADIUS * (n * n) / Z;
    const radiusNm = radius * 1e9;
    const velocity = FINE_STRUCTURE * SPEED_OF_LIGHT * Z / n;
    const wavelength = PLANCK / (ELECTRON_MASS * velocity);
    const period = 2 * Math.PI * radius / velocity;
    return { energyEV, energyJ, radius, radiusNm, velocity, wavelength, period };
  }, [touched, validZ, validN, Z, n]);

  const errorKey = React.useMemo(() => {
    if (!touched) return null;
    if (!validZ || !validN) return "invalid";
    if (!validL) return "orbitalRange";
    if (!validM) return "magneticRange";
    return null;
  }, [touched, validZ, validN, validL, validM]);

  const examplesItems: ExampleRow[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleRow[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  function handleReset() {
    setAtomicNumber(""); setPrincipalQuantum(""); setOrbitalQuantum(""); setMagneticQuantum("");
    setTouched(false);
  }

  function loadExample(z: string, n: string, l = "", m = "") {
    setAtomicNumber(z); setPrincipalQuantum(n); setOrbitalQuantum(l); setMagneticQuantum(m);
    setTouched(true);
  }

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
              <Label htmlFor="bohr-z">{t("field.atomicNumber")}</Label>
              <Input
                id="bohr-z"
                type="number"
                inputMode="numeric"
                value={atomicNumber}
                placeholder={t("placeholder.atomicNumber")}
                min="1"
                step="1"
                onChange={(e) => { setAtomicNumber(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bohr-n">{t("field.principalQuantum")}</Label>
              <Input
                id="bohr-n"
                type="number"
                inputMode="numeric"
                value={principalQuantum}
                placeholder={t("placeholder.principalQuantum")}
                min="1"
                step="1"
                onChange={(e) => { setPrincipalQuantum(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bohr-l">{t("field.orbitalQuantum")}</Label>
              <Input
                id="bohr-l"
                type="number"
                inputMode="numeric"
                value={orbitalQuantum}
                placeholder={t("placeholder.orbitalQuantum")}
                min="0"
                step="1"
                onChange={(e) => { setOrbitalQuantum(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bohr-m">{t("field.magneticQuantum")}</Label>
              <Input
                id="bohr-m"
                type="number"
                inputMode="numeric"
                value={magneticQuantum}
                placeholder={t("placeholder.magneticQuantum")}
                step="1"
                onChange={(e) => { setMagneticQuantum(e.target.value); setTouched(false); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {errorKey && (
            <p className="text-sm text-red-600">{t(`error.${errorKey}` as never)}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.energyEV")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.energyEV)} eV</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.energyJ")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.energyJ)} J</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.radius")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.radius)} m</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.radiusNm")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.radiusNm)} nm</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.velocity")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.velocity)} m/s</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.wavelength")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.wavelength)} m</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.period")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.period)} s</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("1", "1")}>
              {t("examples.loadH1")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("1", "2")}>
              {t("examples.loadH2")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("2", "1")}>
              {t("examples.loadHe1")}
            </Button>
          </div>
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
