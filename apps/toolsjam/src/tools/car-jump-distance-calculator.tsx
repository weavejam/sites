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

const G = 9.81; // m/s²

type VelocityUnit = "ms" | "kmh" | "mph";
type HeightUnit = "m" | "ft";

const VEL_UNITS: VelocityUnit[] = ["ms", "kmh", "mph"];
const HT_UNITS: HeightUnit[] = ["m", "ft"];

function toMs(v: number, unit: VelocityUnit): number {
  if (unit === "kmh") return v / 3.6;
  if (unit === "mph") return v * 0.44704;
  return v;
}
function toM(h: number, unit: HeightUnit): number {
  return unit === "ft" ? h * 0.3048 : h;
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number, decimals = 2): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  return n.toFixed(decimals);
}

export default function CarJumpDistanceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.car-jump-distance-calculator");

  const [velocity, setVelocity] = React.useState("");
  const [angle, setAngle] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [velUnit, setVelUnit] = React.useState<VelocityUnit>("ms");
  const [htUnit, setHtUnit] = React.useState<HeightUnit>("m");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    const vMs = toMs(parseFloat(velocity), velUnit);
    const angleDeg = parseFloat(angle);
    const hM = toM(parseFloat(height) || 0, htUnit);

    if (!Number.isFinite(vMs) || vMs <= 0) return null;
    if (!Number.isFinite(angleDeg) || angleDeg < 0 || angleDeg >= 90) return null;
    if (!Number.isFinite(hM) || hM < 0) return null;

    const theta = (angleDeg * Math.PI) / 180;
    const vx = vMs * Math.cos(theta);
    const vy = vMs * Math.sin(theta);

    // Solve: h + vy*t - 0.5*g*t² = 0 → 0.5g t² - vy t - h = 0
    const a = 0.5 * G;
    const b = -vy;
    const c = -hM;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return null;
    const timeOfFlight = (-b + Math.sqrt(discriminant)) / (2 * a);

    const distance = vx * timeOfFlight;
    const maxHeight = hM + (vy * vy) / (2 * G);

    return { timeOfFlight, distance, maxHeight, vMs, vx, vy };
  }, [touched, velocity, angle, height, velUnit, htUnit]);

  const showError = touched && result === null;

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

  function loadExample(v: string, vu: VelocityUnit, a: string, h: string, hu: HeightUnit) {
    setVelocity(v); setVelUnit(vu); setAngle(a); setHeight(h); setHtUnit(hu);
    setTouched(true);
  }

  function handleReset() {
    setVelocity(""); setAngle(""); setHeight("");
    setVelUnit("ms"); setHtUnit("m"); setTouched(false);
  }

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cjd-v">{t("field.velocity")}</Label>
              <Input
                id="cjd-v"
                type="number"
                inputMode="decimal"
                value={velocity}
                placeholder={t("placeholder.velocity")}
                min="0"
                step="any"
                onChange={(e) => { setVelocity(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.velocityUnit")}</Label>
              <div className="flex flex-wrap gap-2">
                {VEL_UNITS.map((u) => (
                  <Button
                    key={u}
                    type="button"
                    size="sm"
                    variant={velUnit === u ? "default" : "outline"}
                    onClick={() => { setVelUnit(u); setTouched(false); }}
                  >
                    {t(`unit.${u}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cjd-a">{t("field.angle")}</Label>
              <Input
                id="cjd-a"
                type="number"
                inputMode="decimal"
                value={angle}
                placeholder={t("placeholder.angle")}
                min="0"
                max="89"
                step="any"
                onChange={(e) => { setAngle(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cjd-h">{t("field.height")}</Label>
              <Input
                id="cjd-h"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder={t("placeholder.height")}
                min="0"
                step="any"
                onChange={(e) => { setHeight(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.heightUnit")}</Label>
              <div className="flex flex-wrap gap-2">
                {HT_UNITS.map((u) => (
                  <Button
                    key={u}
                    type="button"
                    size="sm"
                    variant={htUnit === u ? "default" : "outline"}
                    onClick={() => { setHtUnit(u); setTouched(false); }}
                  >
                    {t(`unit.${u}` as never)}
                  </Button>
                ))}
              </div>
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.distance")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.distance)} m</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.timeOfFlight")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.timeOfFlight)} s</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.maxHeight")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.maxHeight)} m</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("33.33", "ms", "20", "5", "m")}>
            {t("examples.loadMovieStunt")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("30", "ms", "60", "0", "m")}>
            {t("examples.loadTextbook")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("22.22", "ms", "45", "2", "m")}>
            {t("examples.loadMotocross")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
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
