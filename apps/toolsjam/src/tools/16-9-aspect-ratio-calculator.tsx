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

type Unit = "pixels" | "cm" | "inches" | "mm";
const UNITS: Unit[] = ["pixels", "cm", "inches", "mm"];
const RATIO_W = 16;
const RATIO_H = 9;

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export default function AspectRatio169Calculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.16-9-aspect-ratio-calculator");

  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [diagonal, setDiagonal] = React.useState("");
  const [unit, setUnit] = React.useState<Unit>("pixels");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setWidth("");
    setHeight("");
    setDiagonal("");
    setTouched(false);
  }

  const result = React.useMemo(() => {
    if (!touched) return null;
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0)
      return { error: true };
    const diagPx = Math.sqrt(w * w + h * h);
    const ratio = w / h;
    const isValid = Math.abs(ratio - RATIO_W / RATIO_H) < 0.001;

    let ppi: number | null = null;
    const diagVal = parseFloat(diagonal);
    if (unit === "pixels" && Number.isFinite(diagVal) && diagVal > 0) {
      ppi = diagPx / diagVal;
    }

    return {
      width: w,
      height: h,
      diagonal: diagPx,
      ratio,
      isValid,
      area: w * h,
      ppi,
    };
  }, [touched, width, height, diagonal, unit]);

  const howtoSteps: string[] = React.useMemo(
    () => (t.raw("howto.steps") as string[] | undefined) ?? [],
    [t]
  );

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(
    () =>
      (
        t.raw("examples.items") as
          | { input: string; output: string; note?: string }[]
          | undefined
      ) ?? [],
    [t]
  );

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
          {/* Unit selector */}
          <div className="space-y-2">
            <Label>{t("field.unit")}</Label>
            <div className="flex flex-wrap gap-2">
              {UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={unit === u ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setUnit(u); setTouched(false); }}
                >
                  {t(`unit.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ar169-w">{t("field.width")}</Label>
              <Input
                id="ar169-w"
                type="number"
                inputMode="decimal"
                value={width}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setWidth(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ar169-h">{t("field.height")}</Label>
              <Input
                id="ar169-h"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setHeight(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ar169-d">{t("field.diagonal")}</Label>
              <Input
                id="ar169-d"
                type="number"
                inputMode="decimal"
                value={diagonal}
                placeholder={t("field.placeholderNumber")}
                onChange={(e) => { setDiagonal(e.target.value); setTouched(false); }}
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

          {result && "error" in result && result.error && (
            <p className="text-sm text-red-600">{t("error.invalidInput")}</p>
          )}

          {result && !("error" in result) && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.aspectRatio")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.ratio, 4)}{" "}
                    <span
                      className={`text-sm font-normal ${result.isValid ? "text-green-600" : "text-amber-600"}`}
                    >
                      ({result.isValid ? t("result.valid") : t("result.invalid")})
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.diagonal")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.diagonal)} {t(`unit.${unit}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.area")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.area)} {t(`unit.${unit}` as never)}²
                  </div>
                </div>
                {result.ppi !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.pixelDensity")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt(result.ppi)} PPI
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("about.heading")}
        </h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      {/* Examples */}
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

      {/* How-to */}
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

      {/* FAQ */}
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
