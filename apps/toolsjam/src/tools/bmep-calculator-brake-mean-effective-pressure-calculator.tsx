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

function fmtNum(n: number, dp = 1): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  return parseFloat(n.toFixed(dp)).toLocaleString("en-US", { maximumFractionDigits: dp });
}

type AssessmentKey = "economy" | "normal" | "performance" | "highPerformance" | "diesel" | "racing";

function getAssessment(bmepKPa: number): AssessmentKey {
  if (bmepKPa < 900) return "economy";
  if (bmepKPa < 1200) return "normal";
  if (bmepKPa < 1600) return "performance";
  if (bmepKPa < 2500) return "highPerformance";
  if (bmepKPa < 3500) return "diesel";
  return "racing";
}

interface BMEPResult {
  bmepKPa: number;
  bmepBar: number;
  bmepPsi: number;
  powerKW: number;
  powerHP: number;
  specificOutputKWL: number;
  dispPerCyl: number | null;
  assessment: AssessmentKey;
}

function computeBMEP(torqueNm: number, speedRpm: number, dispL: number, cylinders: number | null): BMEPResult {
  const dispM3 = dispL * 1e-3;
  // 4-stroke: BMEP = 4π × T / V_d
  const bmepPa = (4 * Math.PI * torqueNm) / dispM3;
  const bmepKPa = bmepPa / 1000;
  const bmepBar = bmepPa / 1e5;
  const bmepPsi = bmepPa / 6894.76;

  const powerW = (2 * Math.PI * torqueNm * speedRpm) / 60;
  const powerKW = powerW / 1000;
  const powerHP = powerKW / 0.7457;

  const specificOutputKWL = powerKW / dispL;
  const dispPerCyl = cylinders !== null && cylinders > 0 ? dispL / cylinders : null;
  const assessment = getAssessment(bmepKPa);

  return { bmepKPa, bmepBar, bmepPsi, powerKW, powerHP, specificOutputKWL, dispPerCyl, assessment };
}

export default function BmepCalculatorBrakeMeanEffectivePressureCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.bmep-calculator-brake-mean-effective-pressure-calculator");

  const [torque, setTorque] = React.useState("");
  const [speed, setSpeed] = React.useState("");
  const [displacement, setDisplacement] = React.useState("");
  const [cylinders, setCylinders] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const tNum = parseFloat(torque);
  const sNum = parseFloat(speed);
  const dNum = parseFloat(displacement);
  const cNum = parseFloat(cylinders);

  const tValid = torque !== "" && Number.isFinite(tNum) && tNum > 0;
  const sValid = speed !== "" && Number.isFinite(sNum) && sNum > 0;
  const dValid = displacement !== "" && Number.isFinite(dNum) && dNum > 0;
  const cValid = cylinders === "" || (Number.isFinite(cNum) && cNum >= 1 && Number.isInteger(cNum));

  const allValid = tValid && sValid && dValid && cValid;
  const showError = touched && !allValid;

  const cylNum = cValid && cylinders !== "" ? cNum : null;

  const result = React.useMemo<BMEPResult | null>(() => {
    if (!tValid || !sValid || !dValid || !cValid) return null;
    return computeBMEP(tNum, sNum, dNum, cylNum);
  }, [tValid, sValid, dValid, cValid, tNum, sNum, dNum, cylNum]);

  function loadExample(t_: string, s_: string, d_: string, c_: string) {
    setTorque(t_); setSpeed(s_); setDisplacement(d_); setCylinders(c_); setTouched(true);
  }

  function reset() {
    setTorque(""); setSpeed(""); setDisplacement(""); setCylinders(""); setTouched(false);
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
      } catch { break; }
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
              <Label htmlFor="bmep-torque">{t("field.torque")}</Label>
              <Input
                id="bmep-torque"
                type="number"
                inputMode="decimal"
                min="0"
                value={torque}
                placeholder={t("placeholder.torque")}
                onChange={(e) => { setTorque(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bmep-speed">{t("field.speed")}</Label>
              <Input
                id="bmep-speed"
                type="number"
                inputMode="decimal"
                min="0"
                value={speed}
                placeholder={t("placeholder.speed")}
                onChange={(e) => { setSpeed(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bmep-disp">{t("field.displacement")}</Label>
              <Input
                id="bmep-disp"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={displacement}
                placeholder={t("placeholder.displacement")}
                onChange={(e) => { setDisplacement(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bmep-cyl">{t("field.cylinders")}</Label>
              <Input
                id="bmep-cyl"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={cylinders}
                placeholder={t("placeholder.cylinders")}
                onChange={(e) => { setCylinders(e.target.value); setTouched(true); }}
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

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.bmepKPa")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmtNum(result.bmepKPa)} {t("result.unitKPa")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.bmepBar")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtNum(result.bmepBar, 2)} {t("result.unitBar")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.bmepPsi")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtNum(result.bmepPsi)} {t("result.unitPsi")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.power")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtNum(result.powerKW, 1)} {t("result.unitKW")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.powerHp")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtNum(result.powerHP, 1)} {t("result.unitHP")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.specificOutput")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmtNum(result.specificOutputKWL, 1)} {t("result.unitKWL")}
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <div className="text-xs text-zinc-500">{t("result.engineType")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`result.assessments.${result.assessment}` as never)}
                  </div>
                </div>
                {result.dispPerCyl !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.dispPerCyl")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmtNum(result.dispPerCyl * 1000, 0)} cc
                    </div>
                  </div>
                )}
              </div>
              <div className="text-xs text-zinc-500 pt-1">{t("result.formula")}</div>
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
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("150", "4000", "1.6", "4")}>
            {t("examples.loadEconomy")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("400", "5000", "3.0", "6")}>
            {t("examples.loadSports")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("450", "2000", "2.0", "4")}>
            {t("examples.loadDiesel")}
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
