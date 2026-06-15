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

type InputMode = "angle" | "coordinates";
type AngleUnit = "degrees" | "radians" | "gradians";

const UNITS: AngleUnit[] = ["degrees", "radians", "gradians"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function toRadians(value: number, unit: AngleUnit): number {
  if (unit === "degrees") return (value * Math.PI) / 180;
  if (unit === "gradians") return (value * Math.PI) / 200;
  return value;
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "Undefined";
  return parseFloat(n.toFixed(8)).toString();
}

export default function CotangentCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.cotangent-calculator");
  const [mode, setMode] = React.useState<InputMode>("angle");
  const [angle, setAngle] = React.useState("");
  const [unit, setUnit] = React.useState<AngleUnit>("degrees");
  const [coordX, setCoordX] = React.useState("");
  const [coordY, setCoordY] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  type CalcResult =
    | { kind: "ok"; cot: number; angleRad: number }
    | { kind: "error"; type: "invalid" | "undefined" };

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched) return null;
    if (mode === "angle") {
      const a = parseFloat(angle);
      if (!Number.isFinite(a)) return { kind: "error", type: "invalid" };
      const rad = toRadians(a, unit);
      const sinVal = Math.sin(rad);
      if (Math.abs(sinVal) < 1e-12) return { kind: "error", type: "undefined" };
      const cot = Math.cos(rad) / sinVal;
      return { kind: "ok", cot, angleRad: rad };
    } else {
      const x = parseFloat(coordX);
      const y = parseFloat(coordY);
      if (!Number.isFinite(x) || !Number.isFinite(y))
        return { kind: "error", type: "invalid" };
      if (Math.abs(y) < 1e-12) return { kind: "error", type: "undefined" };
      const cot = x / y;
      const angleRad = Math.atan2(y, x);
      return { kind: "ok", cot, angleRad };
    }
  }, [touched, mode, angle, unit, coordX, coordY]);

  function loadExample(
    m: InputMode,
    angleVal: string,
    u: AngleUnit,
    x: string,
    y: string
  ) {
    setMode(m);
    if (m === "angle") {
      setAngle(angleVal);
      setUnit(u);
    } else {
      setCoordX(x);
      setCoordY(y);
    }
    setTouched(true);
  }

  function reset() {
    setAngle("");
    setCoordX("");
    setCoordY("");
    setTouched(false);
  }

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
            <Label>{t("field.inputMode")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["angle", "coordinates"] as InputMode[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => {
                    setMode(m);
                    setTouched(false);
                  }}
                >
                  {t(`mode.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {mode === "angle" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cot-angle">{t("field.angle")}</Label>
                <Input
                  id="cot-angle"
                  type="number"
                  inputMode="decimal"
                  value={angle}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setAngle(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("field.unit")}</Label>
                <div className="flex flex-wrap gap-2">
                  {UNITS.map((u) => (
                    <Button
                      key={u}
                      type="button"
                      size="sm"
                      variant={unit === u ? "default" : "outline"}
                      onClick={() => {
                        setUnit(u);
                        setTouched(false);
                      }}
                    >
                      {t(`unit.${u}` as never)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cot-x">{t("field.coordX")}</Label>
                <Input
                  id="cot-x"
                  type="number"
                  inputMode="decimal"
                  value={coordX}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setCoordX(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cot-y">{t("field.coordY")}</Label>
                <Input
                  id="cot-y"
                  type="number"
                  inputMode="decimal"
                  value={coordY}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setCoordY(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result?.kind === "error" && result.type === "invalid" && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {result?.kind === "error" && result.type === "undefined" && (
            <p className="text-sm text-red-600">{t("error.undefined")}</p>
          )}

          {result?.kind === "ok" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {fmt(result.cot)}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("angle", "45", "degrees", "", "")}
          >
            {t("examples.load45deg")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("angle", "30", "degrees", "", "")}
          >
            {t("examples.load30deg")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("coordinates", "", "degrees", "3", "4")}
          >
            {t("examples.loadCoords")}
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
