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

const EPS0 = 8.854187817e-12;

type CapType =
  | "parallel_plate"
  | "spherical"
  | "cylindrical"
  | "series_combination"
  | "parallel_combination";

const CAP_TYPES: CapType[] = [
  "parallel_plate",
  "spherical",
  "cylindrical",
  "series_combination",
  "parallel_combination",
];

function fmtSci(n: number): string {
  if (!Number.isFinite(n) || n === 0) return n === 0 ? "0" : "—";
  const abs = Math.abs(n);
  if (abs >= 1e-3 && abs < 1e3) {
    return n.toLocaleString("en-US", { maximumSignificantDigits: 5 });
  }
  return n.toExponential(4);
}

function fmtE(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return fmtSci(n);
}

export default function CapacitanceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.capacitance-calculator");

  const [capType, setCapType] = React.useState<CapType>("parallel_plate");
  const [area, setArea] = React.useState<string>("");
  const [distance, setDistance] = React.useState<string>("");
  const [radius, setRadius] = React.useState<string>("");
  const [outerRadius, setOuterRadius] = React.useState<string>("");
  const [length, setLength] = React.useState<string>("");
  const [dielectric, setDielectric] = React.useState<string>("1.0");
  const [voltage, setVoltage] = React.useState<string>("");
  const [c1, setC1] = React.useState<string>("");
  const [c2, setC2] = React.useState<string>("");
  const [c3, setC3] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const p = (s: string) => parseFloat(s);
  const pos = (s: string) => s !== "" && Number.isFinite(p(s)) && p(s) > 0;

  const results = React.useMemo(() => {
    const er = pos(dielectric) ? p(dielectric) : null;
    const V = voltage !== "" && Number.isFinite(p(voltage)) ? p(voltage) : 0;

    let C: number | null = null;
    let E_field: number | null = null;

    if (capType === "parallel_plate") {
      if (!pos(area) || !pos(distance) || er === null) return null;
      const A = p(area);
      const d = p(distance);
      C = (EPS0 * er * A) / d;
      E_field = V !== 0 ? V / d : null;
    } else if (capType === "spherical") {
      if (!pos(radius) || !pos(outerRadius) || er === null) return null;
      const r1 = p(radius);
      const r2 = p(outerRadius);
      if (r2 <= r1) return null;
      C = 4 * Math.PI * EPS0 * er * (r1 * r2) / (r2 - r1);
      E_field = V !== 0 ? (V * r2) / (r1 * (r2 - r1)) : null;
    } else if (capType === "cylindrical") {
      if (!pos(radius) || !pos(outerRadius) || !pos(length) || er === null) return null;
      const r1 = p(radius);
      const r2 = p(outerRadius);
      const L = p(length);
      if (r2 <= r1) return null;
      C = (2 * Math.PI * EPS0 * er * L) / Math.log(r2 / r1);
      E_field = V !== 0 ? V / (r1 * Math.log(r2 / r1)) : null;
    } else if (capType === "series_combination") {
      const vals = [c1, c2, c3].filter((s) => s !== "").map(p);
      if (vals.length < 2 || !vals.every((v) => v > 0)) return null;
      const invSum = vals.reduce((acc, v) => acc + 1 / v, 0);
      C = 1 / invSum;
    } else if (capType === "parallel_combination") {
      const vals = [c1, c2, c3].filter((s) => s !== "").map(p);
      if (vals.length < 2 || !vals.every((v) => v > 0)) return null;
      C = vals.reduce((acc, v) => acc + v, 0);
    }

    if (C === null || !Number.isFinite(C)) return null;
    const energy = V !== 0 ? 0.5 * C * V * V : null;
    return { C, energy, E_field };
  }, [capType, area, distance, radius, outerRadius, length, dielectric, voltage, c1, c2, c3]);

  function reset() {
    setArea("");
    setDistance("");
    setRadius("");
    setOuterRadius("");
    setLength("");
    setDielectric("1.0");
    setVoltage("");
    setC1("");
    setC2("");
    setC3("");
    setTouched(false);
  }

  const showParallelPlate = capType === "parallel_plate";
  const showSpherical = capType === "spherical";
  const showCylindrical = capType === "cylindrical";
  const showCombination =
    capType === "series_combination" || capType === "parallel_combination";

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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

  interface ExampleItem { input: string; output: string; note?: string }
  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
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

  const showError = touched && results === null;

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
          <div className="space-y-2">
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {CAP_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={capType === ct ? "default" : "outline"}
                  onClick={() => { setCapType(ct); setTouched(false); }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {showParallelPlate && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cap-area">{t("field.area")}</Label>
                  <Input
                    id="cap-area"
                    type="number"
                    inputMode="decimal"
                    value={area}
                    placeholder={t("placeholder.area")}
                    onChange={(e) => { setArea(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cap-dist">{t("field.distance")}</Label>
                  <Input
                    id="cap-dist"
                    type="number"
                    inputMode="decimal"
                    value={distance}
                    placeholder={t("placeholder.distance")}
                    onChange={(e) => { setDistance(e.target.value); setTouched(true); }}
                  />
                </div>
              </>
            )}

            {(showSpherical || showCylindrical) && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cap-r1">{t("field.radius")}</Label>
                  <Input
                    id="cap-r1"
                    type="number"
                    inputMode="decimal"
                    value={radius}
                    placeholder={t("placeholder.radius")}
                    onChange={(e) => { setRadius(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cap-r2">{t("field.outerRadius")}</Label>
                  <Input
                    id="cap-r2"
                    type="number"
                    inputMode="decimal"
                    value={outerRadius}
                    placeholder={t("placeholder.outerRadius")}
                    onChange={(e) => { setOuterRadius(e.target.value); setTouched(true); }}
                  />
                </div>
              </>
            )}

            {showCylindrical && (
              <div className="space-y-2">
                <Label htmlFor="cap-len">{t("field.length")}</Label>
                <Input
                  id="cap-len"
                  type="number"
                  inputMode="decimal"
                  value={length}
                  placeholder={t("placeholder.length")}
                  onChange={(e) => { setLength(e.target.value); setTouched(true); }}
                />
              </div>
            )}

            {!showCombination && (
              <div className="space-y-2">
                <Label htmlFor="cap-er">{t("field.dielectric")}</Label>
                <Input
                  id="cap-er"
                  type="number"
                  inputMode="decimal"
                  value={dielectric}
                  placeholder={t("placeholder.dielectric")}
                  onChange={(e) => { setDielectric(e.target.value); setTouched(true); }}
                />
              </div>
            )}

            {showCombination && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cap-c1">{t("field.c1")}</Label>
                  <Input
                    id="cap-c1"
                    type="number"
                    inputMode="decimal"
                    value={c1}
                    placeholder={t("placeholder.c1")}
                    onChange={(e) => { setC1(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cap-c2">{t("field.c2")}</Label>
                  <Input
                    id="cap-c2"
                    type="number"
                    inputMode="decimal"
                    value={c2}
                    placeholder={t("placeholder.c2")}
                    onChange={(e) => { setC2(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cap-c3">{t("field.c3")}</Label>
                  <Input
                    id="cap-c3"
                    type="number"
                    inputMode="decimal"
                    value={c3}
                    placeholder={t("placeholder.c3")}
                    onChange={(e) => { setC3(e.target.value); setTouched(true); }}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="cap-v">{t("field.voltage")}</Label>
              <Input
                id="cap-v"
                type="number"
                inputMode="decimal"
                value={voltage}
                placeholder={t("placeholder.voltage")}
                onChange={(e) => { setVoltage(e.target.value); setTouched(true); }}
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

          {results !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.capacitance")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtE(results.C)} <span className="text-sm font-normal">{t("result.capacitanceUnit")}</span>
                  </div>
                </div>
                {results.energy !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.energy")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmtE(results.energy)} <span className="text-sm font-normal">{t("result.energyUnit")}</span>
                    </div>
                  </div>
                )}
                {results.E_field !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.electricField")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmtE(results.E_field)} <span className="text-sm font-normal">{t("result.electricFieldUnit")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
