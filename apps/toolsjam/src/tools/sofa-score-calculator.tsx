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

function scorePao2Fio2(v: number): number {
  if (v < 100) return 4;
  if (v < 200) return 3;
  if (v < 300) return 2;
  if (v < 400) return 1;
  return 0;
}
function scorePlatelets(v: number): number {
  if (v < 20) return 4;
  if (v < 50) return 3;
  if (v < 100) return 2;
  if (v < 150) return 1;
  return 0;
}
function scoreBilirubin(v: number): number {
  if (v >= 12) return 4;
  if (v >= 6) return 3;
  if (v >= 2) return 2;
  if (v >= 1.2) return 1;
  return 0;
}
function scoreCardiovascular(map: number, vasopressorLevel: string): number {
  if (vasopressorLevel === "high") return 4;
  if (vasopressorLevel === "moderate") return 3;
  if (vasopressorLevel === "low") return 2;
  // No vasopressors — use MAP
  if (map < 70) return 1;
  return 0;
}
function scoreRenal(creatinine: number, urineOutput: number): number {
  let creatScore = 0;
  if (creatinine >= 5) creatScore = 4;
  else if (creatinine >= 3.5) creatScore = 3;
  else if (creatinine >= 2) creatScore = 2;
  else if (creatinine >= 1.2) creatScore = 1;
  let urineScore = 0;
  if (urineOutput < 200) urineScore = 4;
  else if (urineOutput < 500) urineScore = 3;
  return Math.max(creatScore, urineScore);
}
function scoreGcs(gcs: number): number {
  if (gcs < 6) return 4;
  if (gcs < 10) return 3;
  if (gcs < 13) return 2;
  if (gcs < 15) return 1;
  return 0;
}

export default function SofaScoreCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sofa-score-calculator");

  const [pao2fio2, setPao2fio2] = React.useState("");
  const [platelets, setPlatelets] = React.useState("");
  const [bilirubin, setBilirubin] = React.useState("");
  const [map, setMap] = React.useState("");
  const [vasopressors, setVasopressors] = React.useState("none");
  const [creatinine, setCreatinine] = React.useState("");
  const [urineOutput, setUrineOutput] = React.useState("");
  const [gcs, setGcs] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const pao2Num = parseFloat(pao2fio2);
  const platNum = parseFloat(platelets);
  const bilNum = parseFloat(bilirubin);
  const mapNum = parseFloat(map);
  const creatNum = parseFloat(creatinine);
  const urineNum = parseFloat(urineOutput);
  const gcsNum = parseFloat(gcs);

  const allValid =
    [pao2Num, platNum, bilNum, mapNum, creatNum, urineNum, gcsNum].every(
      (n) => !isNaN(n) && isFinite(n) && n >= 0
    ) && gcsNum >= 3 && gcsNum <= 15;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const respScore = scorePao2Fio2(pao2Num);
    const coagScore = scorePlatelets(platNum);
    const hepatScore = scoreBilirubin(bilNum);
    const cvScore = scoreCardiovascular(mapNum, vasopressors);
    const renalScore = scoreRenal(creatNum, urineNum);
    const neuroScore = scoreGcs(gcsNum);
    const total = respScore + coagScore + hepatScore + cvScore + renalScore + neuroScore;
    let riskKey: string;
    if (total <= 5) riskKey = "risk.low";
    else if (total <= 8) riskKey = "risk.moderate";
    else if (total <= 11) riskKey = "risk.high";
    else riskKey = "risk.veryHigh";
    return { respScore, coagScore, hepatScore, cvScore, renalScore, neuroScore, total, riskKey };
  }, [allValid, pao2Num, platNum, bilNum, mapNum, vasopressors, creatNum, urineNum, gcsNum]);

  function reset() {
    setPao2fio2(""); setPlatelets(""); setBilirubin(""); setMap("");
    setVasopressors("none"); setCreatinine(""); setUrineOutput(""); setGcs("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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
              <Label htmlFor="sofa-pao2">{t("field.pao2fio2")}</Label>
              <Input id="sofa-pao2" type="number" inputMode="decimal" value={pao2fio2}
                placeholder={t("placeholder.pao2fio2")}
                onChange={(e) => { setPao2fio2(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sofa-plat">{t("field.platelets")}</Label>
              <Input id="sofa-plat" type="number" inputMode="decimal" value={platelets}
                placeholder={t("placeholder.platelets")}
                onChange={(e) => { setPlatelets(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sofa-bili">{t("field.bilirubin")}</Label>
              <Input id="sofa-bili" type="number" inputMode="decimal" value={bilirubin}
                placeholder={t("placeholder.bilirubin")}
                onChange={(e) => { setBilirubin(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sofa-map">{t("field.map")}</Label>
              <Input id="sofa-map" type="number" inputMode="decimal" value={map}
                placeholder={t("placeholder.map")}
                onChange={(e) => { setMap(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sofa-vasop">{t("field.vasopressors")}</Label>
              <select
                id="sofa-vasop"
                value={vasopressors}
                onChange={(e) => { setVasopressors(e.target.value); setTouched(true); }}
                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
              >
                <option value="none">{t("option.vasopressorsNone")}</option>
                <option value="low">{t("option.vasopressorsLow")}</option>
                <option value="moderate">{t("option.vasopressorsModerate")}</option>
                <option value="high">{t("option.vasopressorsHigh")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sofa-creat">{t("field.creatinine")}</Label>
              <Input id="sofa-creat" type="number" inputMode="decimal" value={creatinine}
                placeholder={t("placeholder.creatinine")}
                onChange={(e) => { setCreatinine(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sofa-urine">{t("field.urineOutput")}</Label>
              <Input id="sofa-urine" type="number" inputMode="decimal" value={urineOutput}
                placeholder={t("placeholder.urineOutput")}
                onChange={(e) => { setUrineOutput(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sofa-gcs">{t("field.gcs")}</Label>
              <Input id="sofa-gcs" type="number" inputMode="decimal" value={gcs}
                placeholder={t("placeholder.gcs")}
                onChange={(e) => { setGcs(e.target.value); setTouched(true); }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-3xl font-bold text-zinc-900">
                {result.total} <span className="text-lg font-normal text-zinc-500">{t("result.outOf")}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                {[
                  [t("result.respiratory"), result.respScore],
                  [t("result.coagulation"), result.coagScore],
                  [t("result.hepatic"), result.hepatScore],
                  [t("result.cardiovascular"), result.cvScore],
                  [t("result.renal"), result.renalScore],
                  [t("result.neurological"), result.neuroScore],
                ].map(([label, score]) => (
                  <div key={String(label)} className="rounded border border-zinc-200 bg-white p-2">
                    <div className="text-xs text-zinc-500">{label}</div>
                    <div className="font-semibold text-zinc-900">{score} / 4</div>
                  </div>
                ))}
              </div>
              <div className="rounded border border-zinc-300 bg-white p-3 text-sm text-zinc-700">
                <span className="font-semibold">{t("result.riskLevel")}: </span>
                {t(result.riskKey as never)}
              </div>
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
          {howtoSteps.map((s, i) => (<li key={i}>{s}</li>))}
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
