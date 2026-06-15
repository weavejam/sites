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

type Shape = "cone" | "pyramid";
type FindVar = "slantHeight" | "height" | "radius" | "baseEdge";

function fmt(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  const r = Math.round(n * 1e8) / 1e8;
  return r.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

function calcCone(
  find: FindVar,
  r: number | null,
  h: number | null,
  s: number | null
): number | null {
  if (find === "slantHeight" && r !== null && h !== null && r >= 0 && h >= 0)
    return Math.sqrt(r * r + h * h);
  if (find === "height" && r !== null && s !== null && s >= r && r >= 0)
    return Math.sqrt(s * s - r * r);
  if (find === "radius" && h !== null && s !== null && s >= h && h >= 0)
    return Math.sqrt(s * s - h * h);
  return null;
}

function calcPyramid(
  find: FindVar,
  a: number | null,
  h: number | null,
  s: number | null
): number | null {
  const half = a !== null ? a / 2 : null;
  if (find === "slantHeight" && half !== null && h !== null && half >= 0 && h >= 0)
    return Math.sqrt(h * h + half * half);
  if (find === "height" && half !== null && s !== null && half !== null && s >= half && half >= 0)
    return Math.sqrt(s * s - half * half);
  if (
    find === "baseEdge" &&
    h !== null &&
    s !== null &&
    s >= h &&
    h >= 0
  )
    return 2 * Math.sqrt(s * s - h * h);
  return null;
}

export default function SlantHeightCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.slant-height-calculator");

  const [shape, setShape] = React.useState<Shape | "">("");
  const [findVar, setFindVar] = React.useState<FindVar | "">("");
  const [radius, setRadius] = React.useState<string>("");
  const [height, setHeight] = React.useState<string>("");
  const [slantHeight, setSlantHeight] = React.useState<string>("");
  const [baseEdge, setBaseEdge] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setShape("");
    setFindVar("");
    setRadius("");
    setHeight("");
    setSlantHeight("");
    setBaseEdge("");
    setTouched(false);
  }

  const rNum = radius !== "" ? parseFloat(radius) : null;
  const hNum = height !== "" ? parseFloat(height) : null;
  const sNum = slantHeight !== "" ? parseFloat(slantHeight) : null;
  const aNum = baseEdge !== "" ? parseFloat(baseEdge) : null;

  const result = React.useMemo<number | null>(() => {
    if (!shape || !findVar) return null;
    if (shape === "cone") {
      return calcCone(findVar as FindVar, rNum, hNum, sNum);
    } else {
      return calcPyramid(findVar as FindVar, aNum, hNum, sNum);
    }
  }, [shape, findVar, rNum, hNum, sNum, aNum]);

  function loadExample(
    s: Shape,
    f: FindVar,
    r: string,
    h: string,
    sl: string,
    a: string
  ) {
    setShape(s);
    setFindVar(f);
    setRadius(r);
    setHeight(h);
    setSlantHeight(sl);
    setBaseEdge(a);
    setTouched(true);
  }

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

  const showError = touched && shape !== "" && findVar !== "" && result === null;

  // Determine which inputs to show
  const showRadius = shape === "cone" && findVar !== "radius";
  const showHeight =
    (shape === "cone" && findVar !== "height") ||
    (shape === "pyramid" && findVar !== "height");
  const showSlant =
    (shape === "cone" && findVar !== "slantHeight") ||
    (shape === "pyramid" && findVar !== "slantHeight");
  const showBaseEdge = shape === "pyramid" && findVar !== "baseEdge";

  const findOptions: FindVar[] =
    shape === "cone"
      ? ["slantHeight", "height", "radius"]
      : ["slantHeight", "height", "baseEdge"];

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
              {(["cone", "pyramid"] as Shape[]).map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={shape === s ? "default" : "outline"}
                  onClick={() => {
                    setShape(s);
                    setFindVar("");
                    setTouched(false);
                  }}
                >
                  {t(`shape.${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {shape !== "" && (
            <div className="space-y-2">
              <Label>{t("field.find")}</Label>
              <div className="flex flex-wrap gap-2">
                {findOptions.map((f) => (
                  <Button
                    key={f}
                    type="button"
                    variant={findVar === f ? "default" : "outline"}
                    onClick={() => {
                      setFindVar(f);
                      setTouched(false);
                    }}
                  >
                    {t(`findVar.${f}` as never)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {shape !== "" && findVar !== "" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {showRadius && (
                <div className="space-y-2">
                  <Label htmlFor="sh-radius">{t("field.radius")}</Label>
                  <Input
                    id="sh-radius"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={radius}
                    placeholder={t("placeholder.value")}
                    onChange={(e) => { setRadius(e.target.value); setTouched(true); }}
                  />
                </div>
              )}
              {showHeight && (
                <div className="space-y-2">
                  <Label htmlFor="sh-height">{t("field.height")}</Label>
                  <Input
                    id="sh-height"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={height}
                    placeholder={t("placeholder.value")}
                    onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
                  />
                </div>
              )}
              {showSlant && (
                <div className="space-y-2">
                  <Label htmlFor="sh-slant">{t("field.slantHeight")}</Label>
                  <Input
                    id="sh-slant"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={slantHeight}
                    placeholder={t("placeholder.value")}
                    onChange={(e) => { setSlantHeight(e.target.value); setTouched(true); }}
                  />
                </div>
              )}
              {showBaseEdge && (
                <div className="space-y-2">
                  <Label htmlFor="sh-base">{t("field.baseEdge")}</Label>
                  <Input
                    id="sh-base"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={baseEdge}
                    placeholder={t("placeholder.value")}
                    onChange={(e) => { setBaseEdge(e.target.value); setTouched(true); }}
                  />
                </div>
              )}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t(`findVar.${findVar}` as never)}: {fmt(result)}
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                {shape === "cone" ? t("formula.cone") : t("formula.pyramid")}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("cone", "slantHeight", "3", "4", "", "")}
          >
            {t("examples.loadConeSlant")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("cone", "height", "5", "", "13", "")}
          >
            {t("examples.loadConeHeight")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("pyramid", "slantHeight", "", "4", "", "6")}
          >
            {t("examples.loadPyramidSlant")}
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
