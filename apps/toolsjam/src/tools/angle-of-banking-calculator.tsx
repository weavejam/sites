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

type SolveFor = "angle" | "velocity" | "radius";
type VelocityUnit = "ms" | "kmh" | "mph";
type RadiusUnit = "m" | "km" | "ft";

const G = 9.81;

function toMs(v: number, unit: VelocityUnit): number {
  if (unit === "kmh") return v / 3.6;
  if (unit === "mph") return v * 0.44704;
  return v;
}
function fromMs(v: number, unit: VelocityUnit): number {
  if (unit === "kmh") return v * 3.6;
  if (unit === "mph") return v / 0.44704;
  return v;
}
function toM(r: number, unit: RadiusUnit): number {
  if (unit === "km") return r * 1000;
  if (unit === "ft") return r * 0.3048;
  return r;
}
function fromM(r: number, unit: RadiusUnit): number {
  if (unit === "km") return r / 1000;
  if (unit === "ft") return r / 0.3048;
  return r;
}

function calcAngle(v_ms: number, r_m: number): number | null {
  if (!Number.isFinite(v_ms) || !Number.isFinite(r_m) || v_ms <= 0 || r_m <= 0) return null;
  return Math.atan(v_ms * v_ms / (r_m * G)) * (180 / Math.PI);
}
function calcVelocity(r_m: number, theta_deg: number): number | null {
  if (!Number.isFinite(r_m) || !Number.isFinite(theta_deg)) return null;
  if (r_m <= 0 || theta_deg <= 0 || theta_deg >= 90) return null;
  return Math.sqrt(r_m * G * Math.tan(theta_deg * Math.PI / 180));
}
function calcRadius(v_ms: number, theta_deg: number): number | null {
  if (!Number.isFinite(v_ms) || !Number.isFinite(theta_deg)) return null;
  if (v_ms <= 0 || theta_deg <= 0 || theta_deg >= 90) return null;
  return v_ms * v_ms / (G * Math.tan(theta_deg * Math.PI / 180));
}

function fmt(n: number, dec = 3): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}

export default function AngleOfBankingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.angle-of-banking-calculator");

  const [solveFor, setSolveFor] = React.useState<SolveFor>("angle");
  const [velocity, setVelocity] = React.useState("");
  const [velUnit, setVelUnit] = React.useState<VelocityUnit>("ms");
  const [radius, setRadius] = React.useState("");
  const [radUnit, setRadUnit] = React.useState<RadiusUnit>("m");
  const [angle, setAngle] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const SOLVE_OPTIONS: SolveFor[] = ["angle", "velocity", "radius"];

  const result = React.useMemo<number | null>(() => {
    if (!touched) return null;
    const v = parseFloat(velocity);
    const r = parseFloat(radius);
    const a = parseFloat(angle);
    if (solveFor === "angle") {
      return calcAngle(toMs(v, velUnit), toM(r, radUnit));
    } else if (solveFor === "velocity") {
      return calcVelocity(toM(r, radUnit), a);
    } else {
      return calcRadius(toMs(v, velUnit), a);
    }
  }, [touched, solveFor, velocity, velUnit, radius, radUnit, angle]);

  function loadExample(sf: SolveFor, v: string, vu: VelocityUnit, r: string, ru: RadiusUnit, a: string) {
    setSolveFor(sf);
    setVelocity(v);
    setVelUnit(vu);
    setRadius(r);
    setRadUnit(ru);
    setAngle(a);
    setTouched(true);
  }

  function reset() {
    setVelocity("");
    setRadius("");
    setAngle("");
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

  const showError = touched && result === null;

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
          <div className="space-y-2">
            <Label>{t("field.solveFor")}</Label>
            <div className="flex flex-wrap gap-2">
              {SOLVE_OPTIONS.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant={solveFor === opt ? "default" : "outline"}
                  onClick={() => { setSolveFor(opt); setTouched(false); }}
                >
                  {t(`type.${opt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {solveFor !== "velocity" && (
              <div className="space-y-2">
                <Label htmlFor="aob-v">{t("field.velocity")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="aob-v"
                    type="number"
                    inputMode="decimal"
                    value={velocity}
                    placeholder={t("placeholder.velocity")}
                    onChange={(e) => { setVelocity(e.target.value); setTouched(false); }}
                    className="flex-1"
                  />
                  <select
                    value={velUnit}
                    onChange={(e) => setVelUnit(e.target.value as VelocityUnit)}
                    className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm"
                  >
                    <option value="ms">{t("unit.ms")}</option>
                    <option value="kmh">{t("unit.kmh")}</option>
                    <option value="mph">{t("unit.mph")}</option>
                  </select>
                </div>
              </div>
            )}

            {solveFor !== "radius" && (
              <div className="space-y-2">
                <Label htmlFor="aob-r">{t("field.radius")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="aob-r"
                    type="number"
                    inputMode="decimal"
                    value={radius}
                    placeholder={t("placeholder.radius")}
                    onChange={(e) => { setRadius(e.target.value); setTouched(false); }}
                    className="flex-1"
                  />
                  <select
                    value={radUnit}
                    onChange={(e) => setRadUnit(e.target.value as RadiusUnit)}
                    className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm"
                  >
                    <option value="m">{t("unit.m")}</option>
                    <option value="km">{t("unit.km")}</option>
                    <option value="ft">{t("unit.ft")}</option>
                  </select>
                </div>
              </div>
            )}

            {solveFor !== "angle" && (
              <div className="space-y-2">
                <Label htmlFor="aob-a">{t("field.angle")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="aob-a"
                    type="number"
                    inputMode="decimal"
                    value={angle}
                    placeholder={t("placeholder.angle")}
                    onChange={(e) => { setAngle(e.target.value); setTouched(false); }}
                    className="flex-1"
                  />
                  <span className="flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-600">
                    {t("unit.deg")}
                  </span>
                </div>
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {solveFor === "angle" && <>{fmt(result)}° ({t("result.angleLabel")})</>}
                {solveFor === "velocity" && <>{fmt(fromMs(result, velUnit))} {t(`unit.${velUnit}` as never)} ({t("result.velocityLabel")})</>}
                {solveFor === "radius" && <>{fmt(fromM(result, radUnit))} {t(`unit.${radUnit}` as never)} ({t("result.radiusLabel")})</>}
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("angle", "25", "ms", "300", "m", "")}>
              {t("examples.loadHighway")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("velocity", "", "ms", "150", "m", "15")}>
              {t("examples.loadRacetrack")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("angle", "50", "kmh", "25", "m", "")}>
              {t("examples.loadVelodrome")}
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
