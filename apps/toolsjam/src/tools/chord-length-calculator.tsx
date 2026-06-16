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

type CalcType = "findChord" | "findRadius" | "findAngle";
type AngleUnit = "degrees" | "radians";

function toRadians(angle: number, unit: AngleUnit): number {
  return unit === "degrees" ? (angle * Math.PI) / 180 : angle;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
}

export default function ChordLengthCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.chord-length-calculator");

  const [calcType, setCalcType] = React.useState<CalcType>("findChord");
  const [angleUnit, setAngleUnit] = React.useState<AngleUnit>("degrees");
  const [radius, setRadius] = React.useState("");
  const [chordLength, setChordLength] = React.useState("");
  const [centralAngle, setCentralAngle] = React.useState("");
  const [touched, setTouched] = React.useState(false);

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

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const result = React.useMemo<{
    value: number | null;
    label: string;
    error: string | null;
  }>(() => {
    if (!touched) return { value: null, label: "", error: null };
    const r = parseFloat(radius);
    const c = parseFloat(chordLength);
    const a = parseFloat(centralAngle);

    if (calcType === "findChord") {
      if (!Number.isFinite(r) || !Number.isFinite(a))
        return { value: null, label: "", error: "invalid" };
      if (r <= 0) return { value: null, label: "", error: "positiveRadius" };
      const theta = toRadians(a, angleUnit);
      const chord = 2 * r * Math.sin(theta / 2);
      return { value: chord, label: t("result.chordLength"), error: null };
    } else if (calcType === "findRadius") {
      if (!Number.isFinite(c) || !Number.isFinite(a))
        return { value: null, label: "", error: "invalid" };
      if (c <= 0) return { value: null, label: "", error: "positiveChord" };
      const theta = toRadians(a, angleUnit);
      const sinHalf = Math.sin(theta / 2);
      if (Math.abs(sinHalf) < 1e-12)
        return { value: null, label: "", error: "zeroAngle" };
      const rad = c / (2 * sinHalf);
      return { value: rad, label: t("result.radius"), error: null };
    } else {
      if (!Number.isFinite(r) || !Number.isFinite(c))
        return { value: null, label: "", error: "invalid" };
      if (r <= 0) return { value: null, label: "", error: "positiveRadius" };
      if (c > 2 * r) return { value: null, label: "", error: "chordTooLong" };
      const halfAngleRad = Math.asin(c / (2 * r));
      const angleRad = 2 * halfAngleRad;
      const angleOut =
        angleUnit === "degrees" ? toDegrees(angleRad) : angleRad;
      return {
        value: angleOut,
        label: t("result.centralAngle"),
        error: null,
      };
    }
  }, [touched, calcType, angleUnit, radius, chordLength, centralAngle, t]);

  function reset() {
    setRadius("");
    setChordLength("");
    setCentralAngle("");
    setTouched(false);
  }

  function loadExample(
    type: CalcType,
    unit: AngleUnit,
    r: string,
    c: string,
    a: string
  ) {
    setCalcType(type);
    setAngleUnit(unit);
    setRadius(r);
    setChordLength(c);
    setCentralAngle(a);
    setTouched(true);
  }

  const CALC_TYPES: CalcType[] = ["findChord", "findRadius", "findAngle"];
  const ANGLE_UNITS: AngleUnit[] = ["degrees", "radians"];

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
                  onClick={() => {
                    setCalcType(ct);
                    setTouched(false);
                  }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${calcType}_desc` as never)}
            </p>
          </div>

          <div className="space-y-2">
            <Label>{t("field.angleUnit")}</Label>
            <div className="flex gap-2">
              {ANGLE_UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={angleUnit === u ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAngleUnit(u)}
                >
                  {t(`unit.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {calcType !== "findRadius" && (
              <div className="space-y-2">
                <Label htmlFor="cl-radius">{t("field.radius")}</Label>
                <Input
                  id="cl-radius"
                  type="number"
                  inputMode="decimal"
                  value={radius}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setRadius(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            {calcType !== "findChord" && (
              <div className="space-y-2">
                <Label htmlFor="cl-chord">{t("field.chordLength")}</Label>
                <Input
                  id="cl-chord"
                  type="number"
                  inputMode="decimal"
                  value={chordLength}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setChordLength(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            {calcType !== "findAngle" && (
              <div className="space-y-2">
                <Label htmlFor="cl-angle">{t("field.centralAngle")}</Label>
                <Input
                  id="cl-angle"
                  type="number"
                  inputMode="decimal"
                  value={centralAngle}
                  placeholder={
                    angleUnit === "degrees"
                      ? t("placeholder.degrees")
                      : t("placeholder.radians")
                  }
                  onChange={(e) => {
                    setCentralAngle(e.target.value);
                    setTouched(true);
                  }}
                />
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

          {touched && result.error === "invalid" && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {touched && result.error === "positiveRadius" && (
            <p className="text-sm text-red-600">{t("error.positiveRadius")}</p>
          )}
          {touched && result.error === "positiveChord" && (
            <p className="text-sm text-red-600">{t("error.positiveChord")}</p>
          )}
          {touched && result.error === "chordTooLong" && (
            <p className="text-sm text-red-600">{t("error.chordTooLong")}</p>
          )}
          {touched && result.error === "zeroAngle" && (
            <p className="text-sm text-red-600">{t("error.zeroAngle")}</p>
          )}

          {result.value !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {result.label}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {fmtNum(result.value)}
                {calcType === "findAngle"
                  ? angleUnit === "degrees"
                      ? t("unit.degSuffix")
                      : t("unit.radSuffix")
                  : ""}
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-700">
              {t("examples.loadLabel")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("findChord", "degrees", "10", "", "60")
                }
              >
                {t("examples.loadChord")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("findRadius", "degrees", "", "10", "90")
                }
              >
                {t("examples.loadRadius")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("findAngle", "degrees", "5", "5", "")
                }
              >
                {t("examples.loadAngle")}
              </Button>
            </div>
          </div>
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
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
