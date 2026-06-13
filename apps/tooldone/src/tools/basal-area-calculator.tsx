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

type DbhUnit = "cm" | "in";
type BaUnit = "m2" | "ft2";
type PlotAreaUnit = "m2" | "ha" | "ft2" | "acre";

function parseDhbList(raw: string): number[] {
  return raw
    .split(/[,\s]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0);
}

function calcBAm2(dbh: number, unit: DbhUnit): number {
  // Always returns m²
  if (unit === "cm") {
    return Math.PI * Math.pow(dbh / 200, 2); // m²
  } else {
    // DBH in inches → convert to cm first, then compute m²
    return Math.PI * Math.pow((dbh * 2.54) / 200, 2); // m²
  }
}

function convertBA(baM2: number, baUnit: BaUnit): number {
  if (baUnit === "m2") return baM2;
  return baM2 * 10.7639; // m² → ft²
}

function plotAreaToM2(plotArea: number, plotUnit: PlotAreaUnit): number {
  // Always convert plot area to m²
  if (plotUnit === "m2") return plotArea;
  if (plotUnit === "ha") return plotArea * 10000;
  if (plotUnit === "ft2") return plotArea * 0.092903;
  if (plotUnit === "acre") return plotArea * 4046.856;
  return plotArea;
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function BasalAreaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.basal-area-calculator");

  const [dbhInput, setDbhInput] = React.useState("");
  const [dbhUnit, setDbhUnit] = React.useState<DbhUnit>("cm");
  const [baUnit, setBaUnit] = React.useState<BaUnit>("m2");
  const [plotArea, setPlotArea] = React.useState("");
  const [plotUnit, setPlotUnit] = React.useState<PlotAreaUnit>("m2");
  const [showSteps, setShowSteps] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  interface TreeBA {
    dbh: number;
    ba: number;
  }

  interface CalcResult {
    trees: TreeBA[];
    totalBA: number;
    baPerHa: number | null;
    baPerAcre: number | null;
    plotAreaBase: number | null;
  }

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched) return null;
    const dbhs = parseDhbList(dbhInput);
    if (dbhs.length === 0) return null;

    const trees: TreeBA[] = dbhs.map((d) => ({
      dbh: d,
      ba: convertBA(calcBAm2(d, dbhUnit), baUnit),
    }));
    const totalBA = trees.reduce((s, tr) => s + tr.ba, 0);

    let baPerHa: number | null = null;
    let baPerAcre: number | null = null;
    let plotAreaBase: number | null = null;

    if (plotArea !== "") {
      const pa = parseFloat(plotArea);
      if (Number.isFinite(pa) && pa > 0) {
        // Always work in m² internally
        const totalBAm2 = dbhs.reduce((s, d) => s + calcBAm2(d, dbhUnit), 0);
        const paM2 = plotAreaToM2(pa, plotUnit);
        plotAreaBase = paM2;
        baPerHa = (totalBAm2 / paM2) * 10000; // m²/ha
        baPerAcre = (totalBAm2 / paM2) * 4046.856; // m²/acre
      }
    }

    return { trees, totalBA, baPerHa, baPerAcre, plotAreaBase };
  }, [touched, dbhInput, dbhUnit, baUnit, plotArea, plotUnit]);

  function reset() {
    setDbhInput(""); setPlotArea(""); setShowSteps(false); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
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
  const baUnitLabel = baUnit === "m2" ? "m²" : "ft²";

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
          <div className="space-y-2">
            <Label htmlFor="ba-dbh">{t("field.dbh")}</Label>
            <Input
              id="ba-dbh"
              type="text"
              value={dbhInput}
              placeholder={t("placeholder.dbh")}
              onChange={(e) => { setDbhInput(e.target.value); setTouched(true); }}
            />
            <p className="text-xs text-zinc-500">{t("field.dbhHint")}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ba-dbh-unit">{t("field.dbhUnit")}</Label>
              <select
                id="ba-dbh-unit"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={dbhUnit}
                onChange={(e) => setDbhUnit(e.target.value as DbhUnit)}
              >
                <option value="cm">{t("unit.cm")}</option>
                <option value="in">{t("unit.in")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ba-ba-unit">{t("field.baUnit")}</Label>
              <select
                id="ba-ba-unit"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={baUnit}
                onChange={(e) => setBaUnit(e.target.value as BaUnit)}
              >
                <option value="m2">{t("unit.m2")}</option>
                <option value="ft2">{t("unit.ft2")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ba-plot">{t("field.plotArea")}</Label>
              <Input
                id="ba-plot"
                type="number"
                inputMode="decimal"
                value={plotArea}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setPlotArea(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          {plotArea !== "" && (
            <div className="space-y-2">
              <Label htmlFor="ba-plot-unit">{t("field.plotAreaUnit")}</Label>
              <select
                id="ba-plot-unit"
                className="flex h-9 w-full max-w-xs rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={plotUnit}
                onChange={(e) => setPlotUnit(e.target.value as PlotAreaUnit)}
              >
                <option value="m2">{t("unit.m2")}</option>
                <option value="ha">{t("unit.ha")}</option>
                <option value="ft2">{t("unit.ft2")}</option>
                <option value="acre">{t("unit.acre")}</option>
              </select>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowSteps(!showSteps)}
            >
              {t("button.toggleSteps")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.totalBA")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{fmt(result.totalBA)} {baUnitLabel}</div>
                  <div className="text-xs text-zinc-400">{result.trees.length} {result.trees.length === 1 ? t("result.tree") : t("result.trees")}</div>
                </div>
                {result.baPerHa !== null && (
                  <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                    <div className="text-xs text-zinc-500">{t("result.baPerHa")}</div>
                    <div className="text-2xl font-bold text-zinc-900">{fmt(result.baPerHa)} m²/ha</div>
                  </div>
                )}
                {result.baPerAcre !== null && (
                  <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                    <div className="text-xs text-zinc-500">{t("result.baPerAcre")}</div>
                    <div className="text-2xl font-bold text-zinc-900">{fmt(result.baPerAcre)} m²/acre</div>
                  </div>
                )}
              </div>

              {showSteps && result.trees.length > 1 && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 bg-zinc-100">
                        <th className="px-2 py-1 text-left">{t("result.colTree")}</th>
                        <th className="px-2 py-1 text-left">{t("result.colDbh")} ({dbhUnit})</th>
                        <th className="px-2 py-1 text-left">{t("result.colBA")} ({baUnitLabel})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.trees.map((tr, i) => (
                        <tr key={i} className="border-b border-zinc-100">
                          <td className="px-2 py-1">{i + 1}</td>
                          <td className="px-2 py-1">{tr.dbh}</td>
                          <td className="px-2 py-1">{fmt(tr.ba, 6)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="text-xs text-zinc-400">{t("result.formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
