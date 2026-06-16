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

function calcRiskScore(
  maternalAge: number,
  gestationalAge: number,
  previousStillbirth: string,
  preeclampsia: string,
  diabetes: string,
  hypertension: string,
  obesity: string,
  smoking: string,
  multiplePregnancy: string,
  placentalProblems: string,
  fetalGrowth: string,
  ethnicity: string
): number {
  let score = 0;
  // Maternal age
  if (maternalAge < 20 || maternalAge >= 40) score += 3;
  else if (maternalAge >= 35) score += 2;
  else if (maternalAge >= 30) score += 1;
  // Gestational age
  if (gestationalAge >= 41) score += 2;
  else if (gestationalAge >= 37) score += 0;
  else if (gestationalAge <= 28) score += 1;
  // Previous stillbirth
  if (previousStillbirth === "multiple") score += 6;
  else if (previousStillbirth === "one") score += 4;
  // Preeclampsia
  if (preeclampsia === "severe") score += 5;
  else if (preeclampsia === "current") score += 3;
  // Diabetes
  if (diabetes === "preexisting") score += 3;
  else if (diabetes === "gestational") score += 2;
  // Hypertension
  if (hypertension === "severe") score += 4;
  else if (hypertension === "chronic") score += 2;
  // Obesity
  if (obesity === "yes") score += 2;
  // Smoking
  if (smoking === "yes") score += 2;
  // Multiple pregnancy
  if (multiplePregnancy === "yes") score += 3;
  // Placental problems
  if (placentalProblems === "abruption") score += 6;
  else if (placentalProblems === "previa") score += 4;
  // Fetal growth
  if (fetalGrowth === "severe") score += 8;
  else if (fetalGrowth === "restricted") score += 4;
  // Ethnicity
  if (ethnicity === "black") score += 2;
  else if (ethnicity === "hispanic" || ethnicity === "other") score += 1;
  return score;
}

export default function StillbirthRiskCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.stillbirth-risk-calculator");

  const [maternalAge, setMaternalAge] = React.useState("");
  const [gestationalAge, setGestationalAge] = React.useState("");
  const [previousStillbirth, setPreviousStillbirth] = React.useState("none");
  const [preeclampsia, setPreeclampsia] = React.useState("none");
  const [diabetes, setDiabetes] = React.useState("none");
  const [hypertension, setHypertension] = React.useState("none");
  const [obesity, setObesity] = React.useState("no");
  const [smoking, setSmoking] = React.useState("no");
  const [multiplePregnancy, setMultiplePregnancy] = React.useState("no");
  const [placentalProblems, setPlacentalProblems] = React.useState("none");
  const [fetalGrowth, setFetalGrowth] = React.useState("normal");
  const [ethnicity, setEthnicity] = React.useState("white");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(maternalAge);
  const gaNum = parseFloat(gestationalAge);
  const allValid = !isNaN(ageNum) && isFinite(ageNum) && ageNum > 0
    && !isNaN(gaNum) && isFinite(gaNum) && gaNum > 0 && gaNum <= 44;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const score = calcRiskScore(
      ageNum, gaNum, previousStillbirth, preeclampsia,
      diabetes, hypertension, obesity, smoking,
      multiplePregnancy, placentalProblems, fetalGrowth, ethnicity
    );
    let category: string;
    let riskRange: string;
    if (score <= 3) { category = "low"; riskRange = "<0.3%"; }
    else if (score <= 7) { category = "moderate"; riskRange = "0.3–1%"; }
    else if (score <= 14) { category = "high"; riskRange = "1–5%"; }
    else { category = "veryHigh"; riskRange = ">5%"; }
    return { score, category, riskRange };
  }, [allValid, ageNum, gaNum, previousStillbirth, preeclampsia, diabetes, hypertension,
    obesity, smoking, multiplePregnancy, placentalProblems, fetalGrowth, ethnicity]);

  function reset() {
    setMaternalAge(""); setGestationalAge("");
    setPreviousStillbirth("none"); setPreeclampsia("none"); setDiabetes("none");
    setHypertension("none"); setObesity("no"); setSmoking("no");
    setMultiplePregnancy("no"); setPlacentalProblems("none"); setFetalGrowth("normal");
    setEthnicity("white"); setTouched(false);
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

  function SelectField({
    id, label, value, onChange, options,
  }: {
    id: string; label: string; value: string;
    onChange: (v: string) => void;
    options: { value: string; key: string }[];
  }) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <select id={id} value={value}
          onChange={(e) => { onChange(e.target.value); setTouched(true); }}
          className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none">
          {options.map((o) => (
            <option key={o.value} value={o.value}>{t(o.key as never)}</option>
          ))}
        </select>
      </div>
    );
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sbr-age">{t("field.maternalAge")}</Label>
              <Input id="sbr-age" type="number" inputMode="decimal" value={maternalAge}
                placeholder={t("placeholder.maternalAge")}
                onChange={(e) => { setMaternalAge(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sbr-ga">{t("field.gestationalAge")}</Label>
              <Input id="sbr-ga" type="number" inputMode="decimal" value={gestationalAge}
                placeholder={t("placeholder.gestationalAge")}
                onChange={(e) => { setGestationalAge(e.target.value); setTouched(true); }} />
            </div>
            <SelectField id="sbr-prevstill" label={t("field.previousStillbirth")} value={previousStillbirth}
              onChange={setPreviousStillbirth}
              options={[{ value: "none", key: "option.stillbirth_none" }, { value: "one", key: "option.stillbirth_one" }, { value: "multiple", key: "option.stillbirth_multiple" }]} />
            <SelectField id="sbr-preeclamp" label={t("field.preeclampsia")} value={preeclampsia}
              onChange={setPreeclampsia}
              options={[{ value: "none", key: "option.preeclampsia_none" }, { value: "current", key: "option.preeclampsia_current" }, { value: "severe", key: "option.preeclampsia_severe" }]} />
            <SelectField id="sbr-diabetes" label={t("field.diabetes")} value={diabetes}
              onChange={setDiabetes}
              options={[{ value: "none", key: "option.diabetes_none" }, { value: "gestational", key: "option.diabetes_gestational" }, { value: "preexisting", key: "option.diabetes_preexisting" }]} />
            <SelectField id="sbr-htn" label={t("field.hypertension")} value={hypertension}
              onChange={setHypertension}
              options={[{ value: "none", key: "option.hypertension_none" }, { value: "chronic", key: "option.hypertension_chronic" }, { value: "severe", key: "option.hypertension_severe" }]} />
            <SelectField id="sbr-obesity" label={t("field.obesity")} value={obesity}
              onChange={setObesity}
              options={[{ value: "no", key: "option.obesity_no" }, { value: "yes", key: "option.obesity_yes" }]} />
            <SelectField id="sbr-smoking" label={t("field.smoking")} value={smoking}
              onChange={setSmoking}
              options={[{ value: "no", key: "option.smoking_no" }, { value: "yes", key: "option.smoking_yes" }]} />
            <SelectField id="sbr-multiple" label={t("field.multiplePregnancy")} value={multiplePregnancy}
              onChange={setMultiplePregnancy}
              options={[{ value: "no", key: "option.multiple_no" }, { value: "yes", key: "option.multiple_yes" }]} />
            <SelectField id="sbr-placenta" label={t("field.placentalProblems")} value={placentalProblems}
              onChange={setPlacentalProblems}
              options={[{ value: "none", key: "option.placenta_none" }, { value: "previa", key: "option.placenta_previa" }, { value: "abruption", key: "option.placenta_abruption" }]} />
            <SelectField id="sbr-growth" label={t("field.fetalGrowth")} value={fetalGrowth}
              onChange={setFetalGrowth}
              options={[{ value: "normal", key: "option.growth_normal" }, { value: "restricted", key: "option.growth_restricted" }, { value: "severe", key: "option.growth_severe" }]} />
            <SelectField id="sbr-ethnicity" label={t("field.ethnicity")} value={ethnicity}
              onChange={setEthnicity}
              options={[
                { value: "white", key: "option.ethnicity_white" },
                { value: "hispanic", key: "option.ethnicity_hispanic" },
                { value: "black", key: "option.ethnicity_black" },
                { value: "asian", key: "option.ethnicity_asian" },
                { value: "other", key: "option.ethnicity_other" },
              ]} />
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
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.riskScore")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{result.score}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.riskCategory")}</div>
                  <div className="text-lg font-bold text-zinc-900">{t(`category.${result.category}` as never)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.baselineRisk")}</div>
                  <div className="text-lg font-semibold text-zinc-900">{result.riskRange}</div>
                </div>
              </div>
              <div className="rounded border border-zinc-300 bg-white p-3 text-sm text-zinc-700">
                <span className="font-semibold">{t("result.recommendation")}: </span>
                {t(`recommendation.${result.category}` as never)}
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
