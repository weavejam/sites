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

// Testosterone MW = 288.42 g/mol
const T_MW = 288.42;
// Ka albumin binding constant (L/mol)
const KA = 3.6e4;
// KSHBG binding constant (L/mol)
const K_SHBG = 5.97e8;
// Albumin MW (g/mol)
const ALB_MW = 66500;

interface TestosteroneResult {
  freeTpgml: number;
  freeTnmol: number;
  bioavailTngdl: number;
  bioavailTnmol: number;
  freeFraction: number;
}

function computeTestosterone(
  totalTngdl: number,
  shbgNmol: number,
  albGdl: number,
): TestosteroneResult | null {
  if (totalTngdl <= 0 || shbgNmol <= 0 || albGdl <= 0) return null;

  // Convert total T to nmol/L: 1 ng/dL = 10 ng/L = 10e-9 g/L / T_MW g/mol
  const cTT = (totalTngdl * 10e-9) / T_MW * 1e9; // nmol/L = (ng/dL * 10 ng/L / MW) * 1e9
  // Actually: totalT in ng/dL -> nmol/L = totalT * 0.03467
  const cTTnmol = totalTngdl * (1e-8 / T_MW) * 1e9; // = totalT / T_MW * 0.1

  // [Albumin] in mol/L
  const cAlb = (albGdl * 10) / ALB_MW; // g/dL * 10 = g/L, then / MW g/mol = mol/L

  // [SHBG] in mol/L
  const cSHBG = shbgNmol * 1e-9;

  const a = KA * cAlb;
  const s = K_SHBG * cSHBG;
  const denom = 1 + a + s;

  const freeTnmol = cTTnmol / denom;
  // Free T in pg/mL = nmol/L * MW(g/mol) * 1e-9 g/nmol * 1e12 pg/g / 1e-3 L/mL
  // = nmol/L * MW * 1e-9 * 1e12 / 1e-3 = nmol/L * MW * 1e6 / 1e3... 
  // 1 nmol/L = MW * 1e-9 g/L * 1e9 ng/g * (1/1000) mL/L... 
  // Simpler: 1 nmol/L = MW ng/L (since ng/L = nmol/L * MW g/mol * 1e-9 mol/nmol * 1e9 ng/g = nmol/L * MW)
  // = MW ng/L = MW * 1e-3 ng/mL = MW pg/mL (since 1 ng/mL = 1000 pg/mL, so MW ng/L = MW/1000 ng/mL = MW pg/mL... 
  // Actually: 1 ng/L = 1 pg/mL, so 1 nmol/L = MW ng/L = MW pg/mL
  const freeTpgml = freeTnmol * T_MW;

  const bioavailTnmol = (cTTnmol * (1 + a)) / denom;
  // bioavailT in ng/dL: nmol/L / 0.03467 (since 1 ng/dL = 0.03467 nmol/L <=> 1 nmol/L = 28.84 ng/dL... 
  // Actually: ng/dL = nmol/L * T_MW / 10 (since nmol/L * MW = ng/L = ng/dL * 10)
  const bioavailTngdl = (bioavailTnmol * T_MW) / 10;
  const freeFraction = (freeTnmol / cTTnmol) * 100;

  return { freeTpgml, freeTnmol, bioavailTngdl, bioavailTnmol, freeFraction };
}

type TUnit = "ngdl" | "nmolL";

export default function FreeTestosteroneCalculator(_props: { locale: Locale }) {
  const t = useTranslations(
    "tool.free-testosterone-calculator-with-bioavailable-levels",
  );

  const [totalT, setTotalT] = React.useState("");
  const [shbg, setShbg] = React.useState("");
  const [albumin, setAlbumin] = React.useState("4.3");
  const [units, setUnits] = React.useState<TUnit>("ngdl");
  const [touched, setTouched] = React.useState(false);

  const totalTNum = parseFloat(totalT);
  const shbgNum = parseFloat(shbg);
  const albNum = parseFloat(albumin);

  const valid = {
    totalT: totalT !== "" && Number.isFinite(totalTNum) && totalTNum > 0,
    shbg: shbg !== "" && Number.isFinite(shbgNum) && shbgNum > 0,
    albumin: albumin !== "" && Number.isFinite(albNum) && albNum > 0 && albNum < 10,
  };
  const allValid = Object.values(valid).every(Boolean);

  const totalTinNgdl = units === "ngdl" ? totalTNum : totalTNum / 0.03467;

  const result = React.useMemo<TestosteroneResult | null>(() => {
    if (!allValid) return null;
    return computeTestosterone(totalTinNgdl, shbgNum, albNum);
  }, [allValid, totalTinNgdl, shbgNum, albNum]);

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
    setTotalT("");
    setShbg("");
    setAlbumin("4.3");
    setUnits("ngdl");
    setTouched(false);
  }

  function loadExample(tt: string, shbgVal: string, albVal: string, u: TUnit) {
    setTotalT(tt);
    setShbg(shbgVal);
    setAlbumin(albVal);
    setUnits(u);
    setTouched(true);
  }

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
            <Label>{t("field.units")}</Label>
            <div className="flex gap-2">
              {(["ngdl", "nmolL"] as TUnit[]).map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={units === u ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUnits(u);
                    setTouched(true);
                  }}
                >
                  {t(`units.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tt-total">{t("field.totalTestosterone")}</Label>
              <Input
                id="tt-total"
                type="number"
                inputMode="decimal"
                value={totalT}
                placeholder={t("placeholder.totalTestosterone")}
                onChange={(e) => {
                  setTotalT(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tt-shbg">{t("field.shbg")}</Label>
              <Input
                id="tt-shbg"
                type="number"
                inputMode="decimal"
                value={shbg}
                placeholder={t("placeholder.shbg")}
                onChange={(e) => {
                  setShbg(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tt-alb">{t("field.albumin")}</Label>
              <Input
                id="tt-alb"
                type="number"
                inputMode="decimal"
                value={albumin}
                placeholder={t("placeholder.albumin")}
                onChange={(e) => {
                  setAlbumin(e.target.value);
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
              {!valid.totalT && (
                <p className="text-sm text-red-600">{t("error.invalidTT")}</p>
              )}
              {!valid.shbg && (
                <p className="text-sm text-red-600">{t("error.invalidSHBG")}</p>
              )}
              {!valid.albumin && (
                <p className="text-sm text-red-600">{t("error.invalidAlbumin")}</p>
              )}
            </div>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.freeT")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.freeTpgml.toFixed(1)} {t("unit.pgml")}
                  </div>
                  <div className="text-sm text-zinc-600">
                    {result.freeTnmol.toFixed(4)} {t("unit.nmolL")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.bioavailT")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.bioavailTngdl.toFixed(1)} {t("unit.ngdl")}
                  </div>
                  <div className="text-sm text-zinc-600">
                    {result.bioavailTnmol.toFixed(2)} {t("unit.nmolL")}
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.freeFraction")}: {result.freeFraction.toFixed(2)}%
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
            onClick={() => loadExample("650", "35", "4.3", "ngdl")}
          >
            {t("examples.loadNormal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("280", "45", "4.3", "ngdl")}
          >
            {t("examples.loadLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("500", "80", "4.0", "ngdl")}
          >
            {t("examples.loadHighSHBG")}
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
