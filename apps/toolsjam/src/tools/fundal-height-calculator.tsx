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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

type GrowthAssessment = "normal" | "smallForGA" | "largeForGA";

interface FundalResult {
  expected: number;
  difference: number;
  assessment: GrowthAssessment;
  growthRate: number | null;
}

function assessFundalHeight(
  fh: number,
  ga: number,
  prevFh: number | null,
  prevGa: number | null,
): FundalResult {
  // McDonald's rule: expected FH (cm) ≈ gestational age (weeks) after 20 weeks
  const expected = ga;
  const difference = fh - expected;
  const assessment: GrowthAssessment =
    difference > 2 ? "largeForGA" : difference < -2 ? "smallForGA" : "normal";

  let growthRate: number | null = null;
  if (prevFh !== null && prevGa !== null && prevGa < ga) {
    const weeksDiff = ga - prevGa;
    growthRate = (fh - prevFh) / weeksDiff;
  }

  return { expected, difference, assessment, growthRate };
}

export default function FundalHeightCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.fundal-height-calculator");

  const [fundalHeight, setFundalHeight] = React.useState("");
  const [gestationalAge, setGestationalAge] = React.useState("");
  const [maternalHeight, setMaternalHeight] = React.useState("");
  const [prevFH, setPrevFH] = React.useState("");
  const [prevGA, setPrevGA] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const fhNum = parseFloat(fundalHeight);
  const gaNum = parseFloat(gestationalAge);
  const prevFHNum = prevFH !== "" ? parseFloat(prevFH) : null;
  const prevGANum = prevGA !== "" ? parseFloat(prevGA) : null;

  const valid = {
    fh: fundalHeight !== "" && Number.isFinite(fhNum) && fhNum >= 10 && fhNum <= 50,
    ga: gestationalAge !== "" && Number.isFinite(gaNum) && gaNum >= 16 && gaNum <= 44,
    prev:
      prevFHNum === null ||
      prevGANum === null ||
      (Number.isFinite(prevFHNum) && Number.isFinite(prevGANum) && prevGANum < gaNum),
  };
  const allValid = valid.fh && valid.ga && valid.prev;

  const result = React.useMemo<FundalResult | null>(() => {
    if (!allValid) return null;
    return assessFundalHeight(fhNum, gaNum, prevFHNum, prevGANum);
  }, [allValid, fhNum, gaNum, prevFHNum, prevGANum]);

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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

  function reset() {
    setFundalHeight("");
    setGestationalAge("");
    setMaternalHeight("");
    setPrevFH("");
    setPrevGA("");
    setTouched(false);
  }

  function loadExample(
    fh: string,
    ga: string,
    mh?: string,
    pFh?: string,
    pGa?: string,
  ) {
    setFundalHeight(fh);
    setGestationalAge(ga);
    if (mh !== undefined) setMaternalHeight(mh);
    if (pFh !== undefined) setPrevFH(pFh);
    if (pGa !== undefined) setPrevGA(pGa);
    setTouched(true);
  }

  const assessmentColors = {
    normal: "text-green-700 bg-green-50 border-green-200",
    smallForGA: "text-orange-700 bg-orange-50 border-orange-200",
    largeForGA: "text-blue-700 bg-blue-50 border-blue-200",
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
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
              <Label htmlFor="fh-height">{t("field.fundalHeight")}</Label>
              <Input
                id="fh-height"
                type="number"
                inputMode="decimal"
                value={fundalHeight}
                placeholder={t("placeholder.fundalHeight")}
                onChange={(e) => {
                  setFundalHeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fh-ga">{t("field.gestationalAge")}</Label>
              <Input
                id="fh-ga"
                type="number"
                inputMode="decimal"
                value={gestationalAge}
                placeholder={t("placeholder.gestationalAge")}
                onChange={(e) => {
                  setGestationalAge(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fh-maternal">{t("field.maternalHeight")}</Label>
              <Input
                id="fh-maternal"
                type="number"
                inputMode="decimal"
                value={maternalHeight}
                placeholder={t("placeholder.maternalHeight")}
                onChange={(e) => {
                  setMaternalHeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fh-prev-fh">{t("field.prevFundalHeight")}</Label>
              <Input
                id="fh-prev-fh"
                type="number"
                inputMode="decimal"
                value={prevFH}
                placeholder={t("placeholder.prevFundalHeight")}
                onChange={(e) => {
                  setPrevFH(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fh-prev-ga">{t("field.prevGestationalAge")}</Label>
              <Input
                id="fh-prev-ga"
                type="number"
                inputMode="decimal"
                value={prevGA}
                placeholder={t("placeholder.prevGestationalAge")}
                onChange={(e) => {
                  setPrevGA(e.target.value);
                  setTouched(true);
                }}
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

          {touched && !allValid && (
            <div className="space-y-1">
              {!valid.fh && (
                <p className="text-sm text-red-600">{t("error.invalidFH")}</p>
              )}
              {!valid.ga && (
                <p className="text-sm text-red-600">{t("error.invalidGA")}</p>
              )}
              {!valid.prev && (
                <p className="text-sm text-red-600">{t("error.invalidPrev")}</p>
              )}
            </div>
          )}

          {result !== null && (
            <div
              className={`rounded-lg border p-4 space-y-3 ${assessmentColors[result.assessment]}`}
            >
              <div className="text-sm font-medium">{t("result.heading")}</div>
              <div className="text-2xl font-bold">
                {t(`assessment.${result.assessment}` as never)}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="font-medium">{t("result.expectedRange")}:</span>{" "}
                  {result.expected - 2}–{result.expected + 2} {t("unit.cm")}
                </div>
                <div>
                  <span className="font-medium">{t("result.difference")}:</span>{" "}
                  {result.difference > 0 ? "+" : ""}
                  {result.difference.toFixed(0)} {t("unit.cm")}
                </div>
                {result.growthRate !== null && (
                  <div>
                    <span className="font-medium">{t("result.growthRate")}:</span>{" "}
                    {result.growthRate.toFixed(2)} {t("unit.cmWeek")}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("24", "24", "165")}
          >
            {t("examples.loadNormal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("20", "24", "165")}
          >
            {t("examples.loadSmall")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("28", "24", "165")}
          >
            {t("examples.loadLarge")}
          </Button>
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
