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

type Shape =
  | "square"
  | "rectangle"
  | "circle"
  | "triangle"
  | "parallelogram"
  | "trapezoid";

const SHAPES: Shape[] = [
  "square",
  "rectangle",
  "circle",
  "triangle",
  "parallelogram",
  "trapezoid",
];

function formatNumber(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function AreaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.area-calculator");
  const [shape, setShape] = React.useState<Shape>("square");
  const [side, setSide] = React.useState<string>("");
  const [length, setLength] = React.useState<string>("");
  const [width, setWidth] = React.useState<string>("");
  const [radius, setRadius] = React.useState<string>("");
  const [base, setBase] = React.useState<string>("");
  const [height, setHeight] = React.useState<string>("");
  const [base2, setBase2] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  function resetFields() {
    setSide("");
    setLength("");
    setWidth("");
    setRadius("");
    setBase("");
    setHeight("");
    setBase2("");
    setTouched(false);
  }

  const result = React.useMemo<number | null>(() => {
    function pos(v: string) {
      const n = parseFloat(v);
      return v !== "" && Number.isFinite(n) && n > 0 ? n : null;
    }
    switch (shape) {
      case "square": {
        const s = pos(side);
        return s !== null ? s * s : null;
      }
      case "rectangle": {
        const l = pos(length);
        const w = pos(width);
        return l !== null && w !== null ? l * w : null;
      }
      case "circle": {
        const r = pos(radius);
        return r !== null ? Math.PI * r * r : null;
      }
      case "triangle": {
        const b = pos(base);
        const h = pos(height);
        return b !== null && h !== null ? 0.5 * b * h : null;
      }
      case "parallelogram": {
        const b = pos(base);
        const h = pos(height);
        return b !== null && h !== null ? b * h : null;
      }
      case "trapezoid": {
        const b1 = pos(base);
        const b2 = pos(base2);
        const h = pos(height);
        return b1 !== null && b2 !== null && h !== null
          ? 0.5 * (b1 + b2) * h
          : null;
      }
    }
  }, [shape, side, length, width, radius, base, height, base2]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const showError = touched && result === null;
  const formulaKey = `formula.${shape}` as never;

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
                    resetFields();
                  }}
                >
                  {t(`shape.${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {shape === "square" && (
              <div className="space-y-2">
                <Label htmlFor="area-side">{t("field.side")}</Label>
                <Input
                  id="area-side"
                  type="number"
                  inputMode="decimal"
                  value={side}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setSide(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            {shape === "rectangle" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="area-length">{t("field.length")}</Label>
                  <Input
                    id="area-length"
                    type="number"
                    inputMode="decimal"
                    value={length}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => {
                      setLength(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area-width">{t("field.width")}</Label>
                  <Input
                    id="area-width"
                    type="number"
                    inputMode="decimal"
                    value={width}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => {
                      setWidth(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              </>
            )}
            {shape === "circle" && (
              <div className="space-y-2">
                <Label htmlFor="area-radius">{t("field.radius")}</Label>
                <Input
                  id="area-radius"
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
            {(shape === "triangle" || shape === "parallelogram") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="area-base">{t("field.base")}</Label>
                  <Input
                    id="area-base"
                    type="number"
                    inputMode="decimal"
                    value={base}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => {
                      setBase(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area-height">{t("field.height")}</Label>
                  <Input
                    id="area-height"
                    type="number"
                    inputMode="decimal"
                    value={height}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              </>
            )}
            {shape === "trapezoid" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="area-base1">{t("field.base1")}</Label>
                  <Input
                    id="area-base1"
                    type="number"
                    inputMode="decimal"
                    value={base}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => {
                      setBase(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area-base2">{t("field.base2")}</Label>
                  <Input
                    id="area-base2"
                    type="number"
                    inputMode="decimal"
                    value={base2}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => {
                      setBase2(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area-height-trap">{t("field.height")}</Label>
                  <Input
                    id="area-height-trap"
                    type="number"
                    inputMode="decimal"
                    value={height}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={resetFields}>
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
                {t("result.value", {
                  shape: t(`shape.${shape}` as never),
                  result: formatNumber(result),
                })}
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                {t(formulaKey)}
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
