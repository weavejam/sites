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

const C = 299792458; // m/s — speed of light in vacuum

type CalcType = "time" | "distance" | "speed";
const CALC_TYPES: CalcType[] = ["time", "distance", "speed"];

type DistUnit = "m" | "km" | "miles" | "ly";
type TimeUnit = "s" | "min" | "h" | "days" | "years";

const DIST_UNIT_FACTORS: Record<DistUnit, number> = {
  m: 1,
  km: 1e3,
  miles: 1609.344,
  ly: 9.461e15,
};

const TIME_UNIT_FACTORS: Record<TimeUnit, number> = {
  s: 1,
  min: 60,
  h: 3600,
  days: 86400,
  years: 31557600,
};

function fmt(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1e9 || (Math.abs(n) > 0 && Math.abs(n) < 1e-4)) {
    return n.toExponential(digits);
  }
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function SpeedOfLightCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.speed-of-light-calculator");

  const [calcType, setCalcType] = React.useState<CalcType>("time");
  const [distStr, setDistStr] = React.useState("");
  const [distUnit, setDistUnit] = React.useState<DistUnit>("km");
  const [timeStr, setTimeStr] = React.useState("");
  const [timeUnit, setTimeUnit] = React.useState<TimeUnit>("s");
  const [nStr, setNStr] = React.useState("1");
  const [touched, setTouched] = React.useState(false);

  const dist = parseFloat(distStr);
  const time = parseFloat(timeStr);
  const n = parseFloat(nStr);

  const distValid = distStr !== "" && Number.isFinite(dist) && dist > 0;
  const timeValid = timeStr !== "" && Number.isFinite(time) && time > 0;
  const nValid = nStr !== "" && Number.isFinite(n) && n >= 1;

  // Speed of light in the medium
  const v = nValid ? C / n : null;

  const result: { label: string; value: number; unit: string } | null =
    React.useMemo(() => {
      if (v === null) return null;
      if (calcType === "time") {
        if (!distValid) return null;
        const distMetres = dist * DIST_UNIT_FACTORS[distUnit];
        const timeSec = distMetres / v;
        return { label: "time", value: timeSec, unit: "s" };
      }
      if (calcType === "distance") {
        if (!timeValid) return null;
        const timeSec = time * TIME_UNIT_FACTORS[timeUnit];
        const distMetres = v * timeSec;
        return { label: "distance", value: distMetres, unit: "m" };
      }
      if (calcType === "speed") {
        return { label: "speed", value: v, unit: "m/s" };
      }
      return null;
    }, [calcType, dist, distUnit, time, timeUnit, v, distValid, timeValid]);

  function reset() {
    setDistStr("");
    setTimeStr("");
    setNStr("1");
    setTouched(false);
  }

  function loadExample(
    ct: CalcType,
    d: string,
    du: DistUnit,
    ti: string,
    tu: TimeUnit,
    refN: string
  ) {
    setCalcType(ct);
    setDistStr(d);
    setDistUnit(du);
    setTimeStr(ti);
    setTimeUnit(tu);
    setNStr(refN);
    setTouched(true);
  }

  const showError =
    touched &&
    (result === null ||
      (calcType === "time" && !distValid) ||
      (calcType === "distance" && !timeValid));

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

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
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {CALC_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => { setCalcType(ct); setTouched(false); }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {calcType === "time" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="sol-dist">{t("field.distance")}</Label>
                  <Input
                    id="sol-dist"
                    type="number"
                    inputMode="decimal"
                    value={distStr}
                    placeholder={t("placeholder.distance")}
                    onChange={(e) => { setDistStr(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sol-du">{t("field.distUnit")}</Label>
                  <select
                    id="sol-du"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                    value={distUnit}
                    onChange={(e) => setDistUnit(e.target.value as DistUnit)}
                  >
                    <option value="m">{t("unit.m")}</option>
                    <option value="km">{t("unit.km")}</option>
                    <option value="miles">{t("unit.miles")}</option>
                    <option value="ly">{t("unit.ly")}</option>
                  </select>
                </div>
              </>
            )}

            {calcType === "distance" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="sol-time">{t("field.time")}</Label>
                  <Input
                    id="sol-time"
                    type="number"
                    inputMode="decimal"
                    value={timeStr}
                    placeholder={t("placeholder.time")}
                    onChange={(e) => { setTimeStr(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sol-tu">{t("field.timeUnit")}</Label>
                  <select
                    id="sol-tu"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                  >
                    <option value="s">{t("unit.s")}</option>
                    <option value="min">{t("unit.min")}</option>
                    <option value="h">{t("unit.h")}</option>
                    <option value="days">{t("unit.days")}</option>
                    <option value="years">{t("unit.years")}</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="sol-n">{t("field.refractiveIndex")}</Label>
              <Input
                id="sol-n"
                type="number"
                inputMode="decimal"
                value={nStr}
                placeholder={t("placeholder.refractiveIndex")}
                onChange={(e) => { setNStr(e.target.value); setTouched(true); }}
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
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t(`result.${result.label}` as never, {
                  value: fmt(result.value),
                  unit: result.unit,
                })}
              </div>
              {v !== null && calcType !== "speed" && (
                <div className="text-sm text-zinc-700">
                  {t("result.speedInMedium", { value: fmt(v, 0) })}
                </div>
              )}
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
            onClick={() => loadExample("time", "149600000", "km", "", "s", "1")}
          >
            {t("examples.loadSunEarth")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("distance", "1", "m", "1", "s", "1")}
          >
            {t("examples.loadLightSecond")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("speed", "", "km", "", "s", "1.33")}
          >
            {t("examples.loadWater")}
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
