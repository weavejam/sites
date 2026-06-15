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

type Unit = "pixels" | "inches" | "cm" | "mm";
const UNITS: Unit[] = ["pixels", "inches", "cm", "mm"];

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

interface Ar43Result {
  width: number;
  height: number;
  diagonal: number;
  ppi: number | null;
  area: number;
  ratioStr: string;
}

function calc43(
  inputWidth: number | null,
  inputHeight: number | null,
  inputDiagonal: number | null,
  unit: Unit
): Ar43Result | null {
  let w: number, h: number;

  if (inputWidth !== null && inputWidth > 0) {
    w = inputWidth;
    h = (w * 3) / 4;
  } else if (inputHeight !== null && inputHeight > 0) {
    h = inputHeight;
    w = (h * 4) / 3;
  } else {
    return null;
  }

  const diag = Math.sqrt(w * w + h * h);
  let ppi: number | null = null;
  if (inputDiagonal !== null && inputDiagonal > 0 && unit === "pixels") {
    ppi = diag / inputDiagonal;
  }

  const area = w * h;
  const ratio = w / h;
  const ratioStr = ratio.toFixed(4);

  return { width: w, height: h, diagonal: diag, ppi, area, ratioStr };
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function AspectRatio43Calculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.4-3-aspect-ratio-calculator");

  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [diagonal, setDiagonal] = React.useState("");
  const [unit, setUnit] = React.useState<Unit>("pixels");
  const [touched, setTouched] = React.useState(false);

  const pWidth = width !== "" ? parseFloat(width) : null;
  const pHeight = height !== "" ? parseFloat(height) : null;
  const pDiagonal = diagonal !== "" ? parseFloat(diagonal) : null;

  const hasInput =
    (pWidth !== null && pWidth > 0) || (pHeight !== null && pHeight > 0);

  const result = React.useMemo(() => {
    if (!hasInput) return null;
    return calc43(pWidth, pHeight, pDiagonal, unit);
  }, [pWidth, pHeight, pDiagonal, unit, hasInput]);

  function loadPreset(w: string, h: string, d: string, u: Unit) {
    setWidth(w); setHeight(h); setDiagonal(d); setUnit(u); setTouched(true);
  }

  function reset() {
    setWidth(""); setHeight(""); setDiagonal(""); setUnit("pixels");
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

  const showError = touched && !hasInput;
  const unitLabel = t(`unit.${unit}` as never);

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
            <Label>{t("field.unit")}</Label>
            <div className="flex flex-wrap gap-2">
              {UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={unit === u ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setUnit(u); setTouched(true); }}
                >
                  {t(`unit.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ar43-width">{t("field.width")}</Label>
              <Input
                id="ar43-width"
                type="number"
                inputMode="decimal"
                min="0"
                value={width}
                placeholder={t("placeholder.width")}
                onChange={(e) => { setWidth(e.target.value); setHeight(""); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ar43-height">{t("field.height")}</Label>
              <Input
                id="ar43-height"
                type="number"
                inputMode="decimal"
                min="0"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setWidth(""); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ar43-diagonal">{t("field.diagonal")}</Label>
              <Input
                id="ar43-diagonal"
                type="number"
                inputMode="decimal"
                min="0"
                value={diagonal}
                placeholder={t("placeholder.diagonal")}
                onChange={(e) => { setDiagonal(e.target.value); setTouched(true); }}
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
            <p className="text-sm text-red-600">{t("error.noInput")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500 mb-2">
                {t("result.heading")}
              </div>
              <div className="text-zinc-800">
                {t("result.width", { value: fmt(result.width), unit: unitLabel })}
              </div>
              <div className="text-zinc-800">
                {t("result.height", { value: fmt(result.height), unit: unitLabel })}
              </div>
              <div className="text-zinc-800">
                {t("result.diagonal", { value: fmt(result.diagonal), unit: unitLabel })}
              </div>
              <div className="text-zinc-800">
                {t("result.area", { value: fmt(result.area, 0), unit: unitLabel })}
              </div>
              <div className="text-zinc-800">
                {t("result.ratio", { value: result.ratioStr })}
              </div>
              {result.ppi !== null ? (
                <div className="text-zinc-800">
                  {t("result.ppi", { value: fmt(result.ppi, 1) })}
                </div>
              ) : (
                unit === "pixels" && (
                  <div className="text-xs text-zinc-500">
                    {t("result.noPpi")}
                  </div>
                )
              )}
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
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("1024", "", "17", "pixels")}
          >
            {t("examples.loadCrt")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("1024", "", "14", "pixels")}
          >
            {t("examples.loadLaptop")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("800", "", "10", "pixels")}
          >
            {t("examples.loadTablet")}
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
