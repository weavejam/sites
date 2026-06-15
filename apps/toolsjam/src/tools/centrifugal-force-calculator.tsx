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

type VelocityType = "linear" | "angular";
type MassUnit = "kg" | "g" | "lb";
type RadiusUnit = "m" | "cm" | "ft" | "in";
type LinearUnit = "ms" | "kmh";
type AngularUnit = "rads" | "rpm";

const massToKg: Record<MassUnit, number> = { kg: 1, g: 1e-3, lb: 0.45359237 };
const radiusToM: Record<RadiusUnit, number> = { m: 1, cm: 0.01, ft: 0.3048, in: 0.0254 };
const linearToMs: Record<LinearUnit, number> = { ms: 1, kmh: 1 / 3.6 };

function angularToRads(val: number, unit: AngularUnit): number {
  if (unit === "rpm") return (val * 2 * Math.PI) / 60;
  return val;
}

function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  let dec = 4;
  if (abs >= 1e6) dec = 0;
  else if (abs >= 1000) dec = 2;
  else if (abs >= 10) dec = 3;
  return parseFloat(n.toFixed(dec)).toLocaleString("en-US", { maximumFractionDigits: dec });
}

export default function CentrifugalForceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.centrifugal-force-calculator");

  const [mass, setMass] = React.useState("");
  const [massUnit, setMassUnit] = React.useState<MassUnit>("kg");
  const [radius, setRadius] = React.useState("");
  const [radiusUnit, setRadiusUnit] = React.useState<RadiusUnit>("m");
  const [velocityType, setVelocityType] = React.useState<VelocityType>("linear");
  const [velocity, setVelocity] = React.useState("");
  const [linearUnit, setLinearUnit] = React.useState<LinearUnit>("ms");
  const [angularUnit, setAngularUnit] = React.useState<AngularUnit>("rpm");
  const [touched, setTouched] = React.useState(false);

  const massNum = parseFloat(mass);
  const radiusNum = parseFloat(radius);
  const velocityNum = parseFloat(velocity);

  const massValid = mass !== "" && Number.isFinite(massNum) && massNum > 0;
  const radiusValid = radius !== "" && Number.isFinite(radiusNum) && radiusNum > 0;
  const velocityValid = velocity !== "" && Number.isFinite(velocityNum) && velocityNum > 0;
  const allValid = massValid && radiusValid && velocityValid;

  const result = React.useMemo<{ force: number; accel: number } | null>(() => {
    if (!allValid) return null;
    const m_kg = massNum * massToKg[massUnit];
    const r_m = radiusNum * radiusToM[radiusUnit];
    let accel: number;
    if (velocityType === "linear") {
      const v_ms = velocityNum * linearToMs[linearUnit];
      accel = (v_ms * v_ms) / r_m;
    } else {
      const omega = angularToRads(velocityNum, angularUnit);
      accel = omega * omega * r_m;
    }
    const force = m_kg * accel;
    return { force, accel };
  }, [allValid, massNum, massUnit, radiusNum, radiusUnit, velocityType, velocityNum, linearUnit, angularUnit]);

  function reset() {
    setMass("");
    setRadius("");
    setVelocity("");
    setTouched(false);
  }

  function loadExample(m: string, mu: MassUnit, r: string, ru: RadiusUnit, vt: VelocityType, v: string, lu: LinearUnit, au: AngularUnit) {
    setMass(m); setMassUnit(mu); setRadius(r); setRadiusUnit(ru);
    setVelocityType(vt); setVelocity(v); setLinearUnit(lu); setAngularUnit(au);
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
  const radiusUnits: RadiusUnit[] = ["m", "cm", "ft", "in"];
  const velocityTypes: VelocityType[] = ["linear", "angular"];

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
          {/* Mass */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cf-mass">{t("field.mass")}</Label>
              <div className="flex gap-2">
                <Input
                  id="cf-mass"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={mass}
                  placeholder={t("placeholder.mass")}
                  onChange={(e) => { setMass(e.target.value); setTouched(true); }}
                  className="flex-1"
                />
                <select
                  className="h-9 rounded-md border border-input bg-transparent px-2 text-sm"
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
            <div className="space-y-2">
              <Label htmlFor="cf-radius">{t("field.radius")}</Label>
              <div className="flex gap-2">
                <Input
                  id="cf-radius"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={radius}
                  placeholder={t("placeholder.radius")}
                  onChange={(e) => { setRadius(e.target.value); setTouched(true); }}
                  className="flex-1"
                />
                <select
                  className="h-9 rounded-md border border-input bg-transparent px-2 text-sm"
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

          {/* Velocity type */}
          <div className="space-y-2">
            <Label>{t("field.velocityType")}</Label>
            <div className="flex flex-wrap gap-2">
              {velocityTypes.map((vt) => (
                <Button
                  key={vt}
                  type="button"
                  variant={velocityType === vt ? "default" : "outline"}
                  onClick={() => { setVelocityType(vt); setTouched(false); }}
                >
                  {t(`type.${vt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {/* Velocity input */}
          <div className="space-y-2">
            <Label htmlFor="cf-vel">
              {velocityType === "linear" ? t("field.linearVelocity") : t("field.angularVelocity")}
            </Label>
            <div className="flex gap-2 max-w-xs">
              <Input
                id="cf-vel"
                type="number"
                inputMode="decimal"
                min="0"
                value={velocity}
                placeholder={velocityType === "linear" ? t("placeholder.linearVelocity") : t("placeholder.angularVelocity")}
                onChange={(e) => { setVelocity(e.target.value); setTouched(true); }}
                className="flex-1"
              />
              {velocityType === "linear" ? (
                <select
                  className="h-9 rounded-md border border-input bg-transparent px-2 text-sm"
                  value={linearUnit}
                  onChange={(e) => setLinearUnit(e.target.value as LinearUnit)}
                  aria-label={t("field.linearUnit")}
                >
                  <option value="ms">{t("linearUnit.ms")}</option>
                  <option value="kmh">{t("linearUnit.kmh")}</option>
                </select>
              ) : (
                <select
                  className="h-9 rounded-md border border-input bg-transparent px-2 text-sm"
                  value={angularUnit}
                  onChange={(e) => setAngularUnit(e.target.value as AngularUnit)}
                  aria-label={t("field.angularUnit")}
                >
                  <option value="rpm">{t("angularUnit.rpm")}</option>
                  <option value="rads">{t("angularUnit.rads")}</option>
                </select>
              )}
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
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.forceLabel")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmtNum(result.force)} {t("result.forceUnit")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.accelLabel")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtNum(result.accel)} {t("result.accelUnit")}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t(`result.formula_${velocityType}` as never)}</div>
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
            onClick={() => loadExample("1500", "kg", "50", "m", "linear", "16.67", "ms", "rpm")}
          >
            {t("examples.loadCar")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.1", "kg", "0.2", "m", "angular", "3000", "ms", "rpm")}
          >
            {t("examples.loadCentrifuge")}
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
