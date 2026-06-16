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

type Composition = "cystic" | "spongiform" | "mixed" | "solid";
type Echogenicity = "anechoic" | "hyperIso" | "hypo" | "veryHypo";
type Shape = "wider" | "taller";
type Margin = "smooth" | "illDefined" | "lobulated" | "extraThyroidal";
type EchogenicFoci = "none" | "macro" | "peripheral" | "punctate";

const COMP_POINTS: Record<Composition, number> = {
  cystic: 0,
  spongiform: 0,
  mixed: 1,
  solid: 2,
};
const ECHO_POINTS: Record<Echogenicity, number> = {
  anechoic: 0,
  hyperIso: 1,
  hypo: 2,
  veryHypo: 3,
};
const SHAPE_POINTS: Record<Shape, number> = {
  wider: 0,
  taller: 3,
};
const MARGIN_POINTS: Record<Margin, number> = {
  smooth: 0,
  illDefined: 0,
  lobulated: 2,
  extraThyroidal: 3,
};
const FOCI_POINTS: Record<EchogenicFoci, number> = {
  none: 0,
  macro: 1,
  peripheral: 2,
  punctate: 3,
};

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function getTrLevel(score: number): "tr1" | "tr2" | "tr3" | "tr4" | "tr5" {
  if (score === 0) return "tr1";
  if (score <= 2) return "tr2";
  if (score === 3) return "tr3";
  if (score <= 6) return "tr4";
  return "tr5";
}

export default function TiRadsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ti-rads-calculator");

  const [composition, setComposition] = React.useState<Composition>("cystic");
  const [echogenicity, setEchogenicity] = React.useState<Echogenicity>("anechoic");
  const [shape, setShape] = React.useState<Shape>("wider");
  const [margins, setMargins] = React.useState<Margin>("smooth");
  const [echogenicFoci, setEchogenicFoci] = React.useState<EchogenicFoci>("none");
  const [size, setSize] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const allSelected = true; // selects always have a default value

  const sizeN = parseFloat(size);
  const sizeValid = size === "" || (Number.isFinite(sizeN) && sizeN > 0);

  const result = React.useMemo(() => {
    if (!allSelected || !sizeValid) return null;
    const score =
      COMP_POINTS[composition] +
      ECHO_POINTS[echogenicity] +
      SHAPE_POINTS[shape] +
      MARGIN_POINTS[margins] +
      FOCI_POINTS[echogenicFoci];
    const level = getTrLevel(score);
    return { score, level };
  }, [allSelected, sizeValid, composition, echogenicity, shape, margins, echogenicFoci]);

  function reset() {
    setComposition("cystic");
    setEchogenicity("anechoic");
    setShape("wider");
    setMargins("smooth");
    setEchogenicFoci("none");
    setSize("");
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
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "HealthApplication",
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

  const showError = touched && !sizeValid;

  const compositionKeys: Composition[] = ["cystic", "spongiform", "mixed", "solid"];
  const echoKeys: Echogenicity[] = ["anechoic", "hyperIso", "hypo", "veryHypo"];
  const shapeKeys: Shape[] = ["wider", "taller"];
  const marginKeys: Margin[] = ["smooth", "illDefined", "lobulated", "extraThyroidal"];
  const fociKeys: EchogenicFoci[] = ["none", "macro", "peripheral", "punctate"];

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
              <Label htmlFor="tir-composition">{t("field.composition")}</Label>
              <select
                id="tir-composition"
                value={composition}
                onChange={(e) => { setComposition(e.target.value as Composition); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {compositionKeys.map((k) => (
                  <option key={k} value={k}>{t(`composition.${k}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tir-echo">{t("field.echogenicity")}</Label>
              <select
                id="tir-echo"
                value={echogenicity}
                onChange={(e) => { setEchogenicity(e.target.value as Echogenicity); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {echoKeys.map((k) => (
                  <option key={k} value={k}>{t(`echogenicity.${k}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tir-shape">{t("field.shape")}</Label>
              <select
                id="tir-shape"
                value={shape}
                onChange={(e) => { setShape(e.target.value as Shape); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {shapeKeys.map((k) => (
                  <option key={k} value={k}>{t(`shape.${k}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tir-margin">{t("field.margins")}</Label>
              <select
                id="tir-margin"
                value={margins}
                onChange={(e) => { setMargins(e.target.value as Margin); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {marginKeys.map((k) => (
                  <option key={k} value={k}>{t(`margin.${k}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tir-foci">{t("field.echogenicFoci")}</Label>
              <select
                id="tir-foci"
                value={echogenicFoci}
                onChange={(e) => { setEchogenicFoci(e.target.value as EchogenicFoci); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {fociKeys.map((k) => (
                  <option key={k} value={k}>{t(`foci.${k}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tir-size">{t("field.size")}</Label>
              <Input
                id="tir-size"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.size")}
                value={size}
                onChange={(e) => { setSize(e.target.value); setTouched(true); }}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-semibold text-zinc-600">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="flex flex-col rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500 text-xs">{t("result.totalScore")}</span>
                  <span className="font-semibold text-2xl">{result.score}</span>
                </div>
                <div className="flex flex-col rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500 text-xs">{t("result.level")}</span>
                  <span className="font-semibold text-green-700">{t(`result.${result.level}.name` as never)}</span>
                </div>
                <div className="flex flex-col rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500 text-xs">{t("result.risk")}</span>
                  <span className="font-semibold">{t(`result.${result.level}.risk` as never)}</span>
                </div>
              </div>
              <div className="rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                <span className="font-medium text-zinc-700">{t("result.recommendation")}: </span>
                <span className="text-zinc-600">{t(`result.${result.level}.action` as never)}</span>
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
