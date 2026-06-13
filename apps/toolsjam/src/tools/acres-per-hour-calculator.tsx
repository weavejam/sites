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

type Mode = "areaTime" | "machineBased";
type AreaUnit = "acres" | "hectares";
type MachineUnit = "imperial" | "metric";

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export default function AcresPerHourCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.acres-per-hour-calculator");

  const [mode, setMode] = React.useState<Mode>("areaTime");
  const [area, setArea] = React.useState("");
  const [areaUnit, setAreaUnit] = React.useState<AreaUnit>("acres");
  const [time, setTime] = React.useState("");
  const [width, setWidth] = React.useState("");
  const [speed, setSpeed] = React.useState("");
  const [efficiency, setEfficiency] = React.useState("85");
  const [machineUnit, setMachineUnit] = React.useState<MachineUnit>("imperial");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<number | null>(() => {
    if (mode === "areaTime") {
      const a = parseFloat(area);
      const t2 = parseFloat(time);
      if (!Number.isFinite(a) || !Number.isFinite(t2) || t2 <= 0 || a < 0) return null;
      return a / t2;
    } else {
      const w = parseFloat(width);
      const s = parseFloat(speed);
      const e = parseFloat(efficiency);
      if (!Number.isFinite(w) || !Number.isFinite(s) || !Number.isFinite(e) || w <= 0 || s <= 0 || e <= 0) return null;
      if (machineUnit === "imperial") {
        // acres/hr = (width_ft × speed_mph × efficiency%) / 8.25
        return (w * s * (e / 100)) / 8.25;
      } else {
        // ha/hr = (width_m × speed_kmh × efficiency%) / 10
        return (w * s * (e / 100)) / 10;
      }
    }
  }, [mode, area, time, width, speed, efficiency, machineUnit]);

  const resultUnit = React.useMemo(() => {
    if (mode === "areaTime") return areaUnit === "acres" ? t("unit.acresPerHour") : t("unit.haPerHour");
    return machineUnit === "imperial" ? t("unit.acresPerHour") : t("unit.haPerHour");
  }, [mode, areaUnit, machineUnit, t]);

  function reset() {
    setArea(""); setTime(""); setWidth(""); setSpeed(""); setEfficiency("85"); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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

  const showError = touched && mode === "areaTime" &&
    (area === "" || !Number.isFinite(parseFloat(area)) || time === "" || !Number.isFinite(parseFloat(time)) || parseFloat(time) <= 0);
  const showMachineError = touched && mode === "machineBased" &&
    (width === "" || speed === "" || efficiency === "" || !Number.isFinite(parseFloat(width)) || !Number.isFinite(parseFloat(speed)));

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
            <Label>{t("field.mode")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["areaTime", "machineBased"] as Mode[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => { setMode(m); setTouched(false); }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {mode === "areaTime" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="aph-area">{t("field.area")}</Label>
                <Input
                  id="aph-area"
                  type="number"
                  inputMode="decimal"
                  value={area}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setArea(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aph-area-unit">{t("field.areaUnit")}</Label>
                <select
                  id="aph-area-unit"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
                >
                  <option value="acres">{t("unit.acres")}</option>
                  <option value="hectares">{t("unit.hectares")}</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="aph-time">{t("field.time")}</Label>
                <Input
                  id="aph-time"
                  type="number"
                  inputMode="decimal"
                  value={time}
                  placeholder={t("placeholder.hours")}
                  onChange={(e) => { setTime(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("field.machineUnit")}</Label>
                <div className="flex flex-wrap gap-2">
                  {(["imperial", "metric"] as MachineUnit[]).map((u) => (
                    <Button
                      key={u}
                      type="button"
                      size="sm"
                      variant={machineUnit === u ? "default" : "outline"}
                      onClick={() => setMachineUnit(u)}
                    >
                      {t(`type.${u}` as never)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="aph-width">
                    {machineUnit === "imperial" ? t("field.widthFt") : t("field.widthM")}
                  </Label>
                  <Input
                    id="aph-width"
                    type="number"
                    inputMode="decimal"
                    value={width}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setWidth(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aph-speed">
                    {machineUnit === "imperial" ? t("field.speedMph") : t("field.speedKmh")}
                  </Label>
                  <Input
                    id="aph-speed"
                    type="number"
                    inputMode="decimal"
                    value={speed}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setSpeed(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aph-eff">{t("field.efficiency")}</Label>
                  <Input
                    id="aph-eff"
                    type="number"
                    inputMode="decimal"
                    value={efficiency}
                    placeholder="85"
                    onChange={(e) => { setEfficiency(e.target.value); setTouched(true); }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {(showError || showMachineError) && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {formatNum(result)} {resultUnit}
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                {mode === "areaTime" ? t("result.formulaAreaTime") : t("result.formulaMachine")}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
