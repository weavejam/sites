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

type SolveFor = "density" | "mass" | "volume";
type MassUnit = "g" | "kg" | "lb" | "oz";
type VolumeUnit = "cm3" | "m3" | "L" | "mL";
type DensityUnit = "gcm3" | "kgm3" | "kgL" | "lbft3";

// Conversion factors to SI base (kg and m³)
const massToKg: Record<MassUnit, number> = {
  g: 1e-3,
  kg: 1,
  lb: 0.45359237,
  oz: 0.028349523,
};

const volumeToM3: Record<VolumeUnit, number> = {
  cm3: 1e-6,
  m3: 1,
  L: 1e-3,
  mL: 1e-6,
};

// kg/m³ to output density unit
const kgm3ToDensityUnit: Record<DensityUnit, number> = {
  gcm3: 1e-3,
  kgm3: 1,
  kgL: 1e-3,
  lbft3: 0.062428,
};

function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  let decimals = 4;
  if (abs >= 1000) decimals = 2;
  else if (abs >= 10) decimals = 3;
  return parseFloat(n.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

export default function DensityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.density-calculator");

  const [solveFor, setSolveFor] = React.useState<SolveFor>("density");
  const [mass, setMass] = React.useState("");
  const [massUnit, setMassUnit] = React.useState<MassUnit>("g");
  const [volume, setVolume] = React.useState("");
  const [volumeUnit, setVolumeUnit] = React.useState<VolumeUnit>("cm3");
  const [density, setDensity] = React.useState("");
  const [densityUnit, setDensityUnit] = React.useState<DensityUnit>("gcm3");
  const [touched, setTouched] = React.useState(false);

  const massNum = parseFloat(mass);
  const volumeNum = parseFloat(volume);
  const densityNum = parseFloat(density);

  const massValid = mass !== "" && Number.isFinite(massNum) && massNum > 0;
  const volumeValid = volume !== "" && Number.isFinite(volumeNum) && volumeNum > 0;
  const densityValid = density !== "" && Number.isFinite(densityNum) && densityNum > 0;

  const allValid =
    (solveFor === "density" && massValid && volumeValid) ||
    (solveFor === "mass" && volumeValid && densityValid) ||
    (solveFor === "volume" && massValid && densityValid);

  const result = React.useMemo<{ value: number; unit: string } | null>(() => {
    if (!allValid) return null;

    if (solveFor === "density") {
      // ρ = m/V in kg/m³, then convert
      const m_kg = massNum * massToKg[massUnit];
      const v_m3 = volumeNum * volumeToM3[volumeUnit];
      const rho_kgm3 = m_kg / v_m3;
      const rho_out = rho_kgm3 * kgm3ToDensityUnit[densityUnit];
      const unitLabel = t(`densityUnit.${densityUnit}` as never);
      return { value: rho_out, unit: unitLabel };
    }

    if (solveFor === "mass") {
      // m = ρ × V
      const rho_kgm3 = densityNum / kgm3ToDensityUnit[densityUnit];
      const v_m3 = volumeNum * volumeToM3[volumeUnit];
      const m_kg = rho_kgm3 * v_m3;
      const m_out = m_kg / massToKg[massUnit];
      const unitLabel = t(`massUnit.${massUnit}` as never);
      return { value: m_out, unit: unitLabel };
    }

    // volume
    const rho_kgm3 = densityNum / kgm3ToDensityUnit[densityUnit];
    const m_kg = massNum * massToKg[massUnit];
    const v_m3 = m_kg / rho_kgm3;
    const v_out = v_m3 / volumeToM3[volumeUnit];
    const unitLabel = t(`volumeUnit.${volumeUnit}` as never);
    return { value: v_out, unit: unitLabel };
  }, [allValid, solveFor, massNum, massUnit, volumeNum, volumeUnit, densityNum, densityUnit, t]);

  function reset() {
    setMass("");
    setVolume("");
    setDensity("");
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
      } catch {
        break;
      }
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

  const massUnits: MassUnit[] = ["g", "kg", "lb", "oz"];
  const volumeUnits: VolumeUnit[] = ["cm3", "m3", "L", "mL"];
  const densityUnits: DensityUnit[] = ["gcm3", "kgm3", "kgL", "lbft3"];

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
          {/* Solve for selector */}
          <div className="space-y-2">
            <Label>{t("field.solve")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["density", "mass", "volume"] as SolveFor[]).map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={solveFor === s ? "default" : "outline"}
                  onClick={() => { setSolveFor(s); setTouched(false); }}
                >
                  {t(`type.${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Mass field (shown unless solving for mass) */}
            {solveFor !== "mass" && (
              <div className="space-y-2">
                <Label htmlFor="dc-mass">{t("field.mass")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="dc-mass"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={mass}
                    placeholder="0"
                    onChange={(e) => { setMass(e.target.value); setTouched(true); }}
                    className="flex-1"
                  />
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value as MassUnit)}
                    className="rounded-md border border-zinc-200 bg-white px-2 text-sm"
                    aria-label={t("field.massUnit")}
                  >
                    {massUnits.map((u) => (
                      <option key={u} value={u}>{t(`massUnit.${u}` as never)}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Volume field (shown unless solving for volume) */}
            {solveFor !== "volume" && (
              <div className="space-y-2">
                <Label htmlFor="dc-volume">{t("field.volume")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="dc-volume"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={volume}
                    placeholder="0"
                    onChange={(e) => { setVolume(e.target.value); setTouched(true); }}
                    className="flex-1"
                  />
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value as VolumeUnit)}
                    className="rounded-md border border-zinc-200 bg-white px-2 text-sm"
                    aria-label={t("field.volumeUnit")}
                  >
                    {volumeUnits.map((u) => (
                      <option key={u} value={u}>{t(`volumeUnit.${u}` as never)}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Density field (shown unless solving for density) */}
            {solveFor !== "density" && (
              <div className="space-y-2">
                <Label htmlFor="dc-density">{t("field.density")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="dc-density"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={density}
                    placeholder="0"
                    onChange={(e) => { setDensity(e.target.value); setTouched(true); }}
                    className="flex-1"
                  />
                  <select
                    value={densityUnit}
                    onChange={(e) => setDensityUnit(e.target.value as DensityUnit)}
                    className="rounded-md border border-zinc-200 bg-white px-2 text-sm"
                    aria-label={t("field.densityUnit")}
                  >
                    {densityUnits.map((u) => (
                      <option key={u} value={u}>{t(`densityUnit.${u}` as never)}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Density output unit (when solving for density) */}
            {solveFor === "density" && (
              <div className="space-y-2">
                <Label>{t("field.densityUnit")}</Label>
                <select
                  value={densityUnit}
                  onChange={(e) => setDensityUnit(e.target.value as DensityUnit)}
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
                  aria-label={t("field.densityUnit")}
                >
                  {densityUnits.map((u) => (
                    <option key={u} value={u}>{t(`densityUnit.${u}` as never)}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Mass output unit (when solving for mass) */}
            {solveFor === "mass" && (
              <div className="space-y-2">
                <Label>{t("field.massUnit")}</Label>
                <select
                  value={massUnit}
                  onChange={(e) => setMassUnit(e.target.value as MassUnit)}
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
                  aria-label={t("field.massUnit")}
                >
                  {massUnits.map((u) => (
                    <option key={u} value={u}>{t(`massUnit.${u}` as never)}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Volume output unit (when solving for volume) */}
            {solveFor === "volume" && (
              <div className="space-y-2">
                <Label>{t("field.volumeUnit")}</Label>
                <select
                  value={volumeUnit}
                  onChange={(e) => setVolumeUnit(e.target.value as VolumeUnit)}
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
                  aria-label={t("field.volumeUnit")}
                >
                  {volumeUnits.map((u) => (
                    <option key={u} value={u}>{t(`volumeUnit.${u}` as never)}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && allValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t(`result.${solveFor}` as never)}: {fmtNum(result.value)} {result.unit}
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
