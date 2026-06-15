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

type MassUnit = "kg" | "g" | "lb";
type VelocityUnit = "ms" | "kmh" | "mph" | "fts";
type RadiusUnit = "m" | "km" | "ft" | "miles";

const massToKg: Record<MassUnit, number> = { kg: 1, g: 1e-3, lb: 0.45359237 };
const velocityToMs: Record<VelocityUnit, number> = {
  ms: 1,
  kmh: 1 / 3.6,
  mph: 0.44704,
  fts: 0.3048,
};
const radiusToM: Record<RadiusUnit, number> = {
  m: 1,
  km: 1000,
  ft: 0.3048,
  miles: 1609.344,
};

function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  let dec = 4;
  if (abs >= 1e9) dec = 0;
  else if (abs >= 1e6) dec = 0;
  else if (abs >= 1000) dec = 1;
  else if (abs >= 10) dec = 2;
  return parseFloat(n.toFixed(dec)).toLocaleString("en-US", { maximumFractionDigits: dec });
}

export default function CentripetalForceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.centripetal-force-calculator");

  const [mass, setMass] = React.useState("");
  const [massUnit, setMassUnit] = React.useState<MassUnit>("kg");
  const [velocity, setVelocity] = React.useState("");
  const [velocityUnit, setVelocityUnit] = React.useState<VelocityUnit>("ms");
  const [radius, setRadius] = React.useState("");
  const [radiusUnit, setRadiusUnit] = React.useState<RadiusUnit>("m");
  const [touched, setTouched] = React.useState(false);

  const massNum = parseFloat(mass);
  const velocityNum = parseFloat(velocity);
  const radiusNum = parseFloat(radius);

  const massValid = mass !== "" && Number.isFinite(massNum) && massNum > 0;
  const velocityValid = velocity !== "" && Number.isFinite(velocityNum) && velocityNum > 0;
  const radiusValid = radius !== "" && Number.isFinite(radiusNum) && radiusNum > 0;
  const allValid = massValid && velocityValid && radiusValid;

  const result = React.useMemo<{ forceN: number; forceKN: number; forceLbf: number } | null>(() => {
    if (!allValid) return null;
    const m_kg = massNum * massToKg[massUnit];
    const v_ms = velocityNum * velocityToMs[velocityUnit];
    const r_m = radiusNum * radiusToM[radiusUnit];
    const forceN = (m_kg * v_ms * v_ms) / r_m;
    return {
      forceN,
      forceKN: forceN / 1000,
      forceLbf: forceN * 0.224809,
    };
  }, [allValid, massNum, massUnit, velocityNum, velocityUnit, radiusNum, radiusUnit]);

  function reset() {
    setMass("");
    setVelocity("");
    setRadius("");
    setTouched(false);
  }

  function loadExample(m: string, mu: MassUnit, v: string, vu: VelocityUnit, r: string, ru: RadiusUnit) {
    setMass(m); setMassUnit(mu);
    setVelocity(v); setVelocityUnit(vu);
    setRadius(r); setRadiusUnit(ru);
    setTouched(true);
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

  const massUnits: MassUnit[] = ["kg", "g", "lb"];
  const velocityUnits: VelocityUnit[] = ["ms", "kmh", "mph", "fts"];
  const radiusUnits: RadiusUnit[] = ["m", "km", "ft", "miles"];

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
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Mass */}
            <div className="space-y-2">
              <Label htmlFor="cp-mass">{t("field.mass")}</Label>
              <div className="flex gap-2">
                <Input
                  id="cp-mass"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={mass}
                  placeholder={t("placeholder.mass")}
                  onChange={(e) => { setMass(e.target.value); setTouched(true); }}
                  className="flex-1 min-w-0"
                />
                <select
                  className="h-9 rounded-md border border-input bg-transparent px-2 text-sm shrink-0"
                  value={massUnit}
                  onChange={(e) => setMassUnit(e.target.value as MassUnit)}
                  aria-label={t("field.massUnit")}
                >
                  {massUnits.map((u) => (
                    <option key={u} value={u}>{t(`massUnit.${u}` as never)}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Velocity */}
            <div className="space-y-2">
              <Label htmlFor="cp-vel">{t("field.velocity")}</Label>
              <div className="flex gap-2">
                <Input
                  id="cp-vel"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={velocity}
                  placeholder={t("placeholder.velocity")}
                  onChange={(e) => { setVelocity(e.target.value); setTouched(true); }}
                  className="flex-1 min-w-0"
                />
                <select
                  className="h-9 rounded-md border border-input bg-transparent px-2 text-sm shrink-0"
                  value={velocityUnit}
                  onChange={(e) => setVelocityUnit(e.target.value as VelocityUnit)}
                  aria-label={t("field.velocityUnit")}
                >
                  {velocityUnits.map((u) => (
                    <option key={u} value={u}>{t(`velocityUnit.${u}` as never)}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Radius */}
            <div className="space-y-2">
              <Label htmlFor="cp-radius">{t("field.radius")}</Label>
              <div className="flex gap-2">
                <Input
                  id="cp-radius"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={radius}
                  placeholder={t("placeholder.radius")}
                  onChange={(e) => { setRadius(e.target.value); setTouched(true); }}
                  className="flex-1 min-w-0"
                />
                <select
                  className="h-9 rounded-md border border-input bg-transparent px-2 text-sm shrink-0"
                  value={radiusUnit}
                  onChange={(e) => setRadiusUnit(e.target.value as RadiusUnit)}
                  aria-label={t("field.radiusUnit")}
                >
                  {radiusUnits.map((u) => (
                    <option key={u} value={u}>{t(`radiusUnit.${u}` as never)}</option>
                  ))}
                </select>
              </div>
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

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelN")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmtNum(result.forceN)} {t("result.unitN")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelKN")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtNum(result.forceKN)} {t("result.unitKN")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelLbf")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtNum(result.forceLbf)} {t("result.unitLbf")}
                  </div>
                </div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1500", "kg", "15", "ms", "50", "m")}
          >
            {t("examples.loadCar")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("500", "kg", "7600", "ms", "6800", "km")}
          >
            {t("examples.loadSatellite")}
          </Button>
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
