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

type Shape = "cube" | "sphere" | "cylinder" | "cone";

const SHAPES: Shape[] = ["cube", "sphere", "cylinder", "cone"];

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e8) / 1e8;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

function calcSurfaceArea(
  shape: Shape,
  a: number,
  r: number,
  h: number
): number | null {
  switch (shape) {
    case "cube":
      if (!Number.isFinite(a) || a <= 0) return null;
      return 6 * a * a;
    case "sphere":
      if (!Number.isFinite(r) || r <= 0) return null;
      return 4 * Math.PI * r * r;
    case "cylinder":
      if (!Number.isFinite(r) || r <= 0 || !Number.isFinite(h) || h <= 0)
        return null;
      return 2 * Math.PI * r * (r + h);
    case "cone": {
      if (!Number.isFinite(r) || r <= 0 || !Number.isFinite(h) || h <= 0)
        return null;
      const slant = Math.sqrt(r * r + h * h);
      return Math.PI * r * (r + slant);
    }
  }
}

export default function SurfaceAreaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.surface-area-calculator");
  const [shape, setShape] = React.useState<Shape>("cube");
  const [side, setSide] = React.useState("");
  const [radius, setRadius] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const a = parseFloat(side);
  const r = parseFloat(radius);
  const h = parseFloat(height);

  const result = React.useMemo<number | null>(() => {
    if (!touched) return null;
    return calcSurfaceArea(shape, a, r, h);
  }, [touched, shape, a, r, h]);

  function loadExample(s: Shape, sa: string, sr: string, sh: string) {
    setShape(s);
    setSide(sa);
    setRadius(sr);
    setHeight(sh);
    setTouched(true);
  }

  function reset() {
    setSide("");
    setRadius("");
    setHeight("");
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
            <Label>{t("field.shape")}</Label>
            <div className="flex flex-wrap gap-2">
              {SHAPES.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={shape === s ? "default" : "outline"}
                  onClick={() => {
                    setShape(s);
                    setTouched(false);
                  }}
                >
                  {t(`shape.${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {shape === "cube" && (
              <div className="space-y-2">
                <Label htmlFor="sa-side">{t("field.side")}</Label>
                <Input
                  id="sa-side"
                  type="number"
                  inputMode="decimal"
                  value={side}
                  placeholder={t("placeholder.positive")}
                  onChange={(e) => {
                    setSide(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {(shape === "sphere" || shape === "cylinder" || shape === "cone") && (
              <div className="space-y-2">
                <Label htmlFor="sa-radius">{t("field.radius")}</Label>
                <Input
                  id="sa-radius"
                  type="number"
                  inputMode="decimal"
                  value={radius}
                  placeholder={t("placeholder.positive")}
                  onChange={(e) => {
                    setRadius(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {(shape === "cylinder" || shape === "cone") && (
              <div className="space-y-2">
                <Label htmlFor="sa-height">{t("field.height")}</Label>
                <Input
                  id="sa-height"
                  type="number"
                  inputMode="decimal"
                  value={height}
                  placeholder={t("placeholder.positive")}
                  onChange={(e) => {
                    setHeight(e.target.value);
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {formatNumber(result)} {t("result.unit")}
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                {t(`result.formula_${shape}` as never)}
              </div>
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
            onClick={() => loadExample("cube", "1.5", "", "")}
          >
            {t("examples.loadCube")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("sphere", "", "12", "")}
          >
            {t("examples.loadSphere")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("cylinder", "", "3.5", "11")}
          >
            {t("examples.loadCylinder")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("cone", "", "2.5", "10")}
          >
            {t("examples.loadCone")}
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
