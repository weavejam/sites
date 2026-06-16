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

function computeHFPrognosis(params: {
  age: number;
  isMale: boolean;
  ef: number;
  nyha: number;
  sbp: number;
  creatinine: number;
  sodium: number;
  diabetes: boolean;
  copd: boolean;
  betaBlocker: boolean;
  aceInhibitor: boolean;
}): { medianYears: number; oneYear: number; fiveYear: number; riskCategory: string } {
  // MAGGIC-inspired scoring (simplified)
  let score = 0;

  // Age contribution
  if (params.age < 55) score += 0;
  else if (params.age < 60) score += 1;
  else if (params.age < 65) score += 2;
  else if (params.age < 70) score += 4;
  else if (params.age < 75) score += 6;
  else if (params.age < 80) score += 8;
  else score += 10;

  // Male sex
  if (params.isMale) score += 1;

  // EF
  if (params.ef < 20) score += 7;
  else if (params.ef < 25) score += 6;
  else if (params.ef < 30) score += 5;
  else if (params.ef < 35) score += 3;
  else if (params.ef < 40) score += 2;
  else if (params.ef < 45) score += 1;
  // 45+ = 0

  // NYHA class
  if (params.nyha === 2) score += 2;
  else if (params.nyha === 3) score += 4;
  else if (params.nyha === 4) score += 6;

  // Systolic BP
  if (params.sbp < 90) score += 5;
  else if (params.sbp < 110) score += 3;
  else if (params.sbp < 130) score += 1;
  else if (params.sbp > 160) score -= 1;

  // Creatinine
  if (params.creatinine > 3.0) score += 5;
  else if (params.creatinine > 2.0) score += 3;
  else if (params.creatinine > 1.5) score += 2;
  else if (params.creatinine > 1.2) score += 1;

  // Sodium
  if (params.sodium < 125) score += 5;
  else if (params.sodium < 130) score += 3;
  else if (params.sodium < 135) score += 2;
  else if (params.sodium < 138) score += 1;

  // Comorbidities
  if (params.diabetes) score += 2;
  if (params.copd) score += 2;

  // Medications (protective)
  if (params.betaBlocker) score -= 2;
  if (params.aceInhibitor) score -= 2;

  score = Math.max(0, score);

  // Convert score to approximate survival using calibrated lookup
  // Based on MAGGIC model where higher score = higher 3-year mortality
  let oneYear: number;
  let fiveYear: number;
  let medianYears: number;
  let riskCategory: string;

  if (score <= 6) {
    oneYear = 0.96; fiveYear = 0.78; medianYears = 12; riskCategory = "low";
  } else if (score <= 10) {
    oneYear = 0.92; fiveYear = 0.65; medianYears = 9; riskCategory = "low";
  } else if (score <= 14) {
    oneYear = 0.87; fiveYear = 0.52; medianYears = 7; riskCategory = "moderate";
  } else if (score <= 18) {
    oneYear = 0.79; fiveYear = 0.38; medianYears = 5; riskCategory = "moderate";
  } else if (score <= 22) {
    oneYear = 0.69; fiveYear = 0.26; medianYears = 3; riskCategory = "high";
  } else if (score <= 26) {
    oneYear = 0.55; fiveYear = 0.15; medianYears = 2; riskCategory = "high";
  } else {
    oneYear = 0.38; fiveYear = 0.07; medianYears = 1; riskCategory = "veryHigh";
  }

  return {
    medianYears,
    oneYear: Math.round(oneYear * 1000) / 10,
    fiveYear: Math.round(fiveYear * 1000) / 10,
    riskCategory,
  };
}

export default function HeartFailureLifeExpectancyCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.heart-failure-life-expectancy-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "">("");
  const [ef, setEf] = React.useState("");
  const [nyha, setNyha] = React.useState<"1" | "2" | "3" | "4" | "">("");
  const [sbp, setSbp] = React.useState("");
  const [creatinine, setCreatinine] = React.useState("");
  const [sodium, setSodium] = React.useState("");
  const [diabetes, setDiabetes] = React.useState<"yes" | "no">("no");
  const [copd, setCopd] = React.useState<"yes" | "no">("no");
  const [betaBlocker, setBetaBlocker] = React.useState<"yes" | "no">("no");
  const [aceInhibitor, setAceInhibitor] = React.useState<"yes" | "no">("no");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const efNum = parseFloat(ef);
  const sbpNum = parseFloat(sbp);
  const creatinineNum = parseFloat(creatinine);
  const sodiumNum = parseFloat(sodium);
  const nyhaNum = parseInt(nyha);

  const valid = {
    age: age !== "" && Number.isFinite(ageNum) && ageNum >= 18 && ageNum <= 100,
    gender: gender !== "",
    ef: ef !== "" && Number.isFinite(efNum) && efNum >= 5 && efNum <= 80,
    nyha: nyha !== "" && nyhaNum >= 1 && nyhaNum <= 4,
    sbp: sbp !== "" && Number.isFinite(sbpNum) && sbpNum >= 60 && sbpNum <= 220,
    creatinine: creatinine !== "" && Number.isFinite(creatinineNum) && creatinineNum >= 0.3 && creatinineNum <= 15,
    sodium: sodium !== "" && Number.isFinite(sodiumNum) && sodiumNum >= 110 && sodiumNum <= 160,
  };

  const allValid = Object.values(valid).every(Boolean);

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return computeHFPrognosis({
      age: ageNum,
      isMale: gender === "male",
      ef: efNum,
      nyha: nyhaNum,
      sbp: sbpNum,
      creatinine: creatinineNum,
      sodium: sodiumNum,
      diabetes: diabetes === "yes",
      copd: copd === "yes",
      betaBlocker: betaBlocker === "yes",
      aceInhibitor: aceInhibitor === "yes",
    });
  }, [allValid, ageNum, efNum, gender, nyhaNum, sbpNum, creatinineNum, sodiumNum, diabetes, copd, betaBlocker, aceInhibitor]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
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
    setAge(""); setGender(""); setEf(""); setNyha(""); setSbp(""); setCreatinine("");
    setSodium(""); setDiabetes("no"); setCopd("no"); setBetaBlocker("no"); setAceInhibitor("no"); setTouched(false);
  }

  const YesNoButtons = ({ value, onChange, label }: { value: "yes" | "no"; onChange: (v: "yes" | "no") => void; label: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        {(["yes", "no"] as const).map((v) => (
          <Button key={v} type="button" variant={value === v ? "default" : "outline"} size="sm"
            onClick={() => { onChange(v); setTouched(true); }}>
            {t(`yesNo.${v}` as never)}
          </Button>
        ))}
      </div>
    </div>
  );

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
              <Label htmlFor="hf-age">{t("field.age")}</Label>
              <Input id="hf-age" type="number" inputMode="decimal" value={age} placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label>{t("field.gender")}</Label>
              <div className="flex gap-2">
                {(["male", "female"] as const).map((g) => (
                  <Button key={g} type="button" variant={gender === g ? "default" : "outline"}
                    onClick={() => { setGender(g); setTouched(true); }}>
                    {t(`gender.${g}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hf-ef">{t("field.ejectionFraction")}</Label>
              <Input id="hf-ef" type="number" inputMode="decimal" value={ef} placeholder={t("placeholder.ef")}
                onChange={(e) => { setEf(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label>{t("field.nyhaClass")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["1", "2", "3", "4"] as const).map((n) => (
                  <Button key={n} type="button" variant={nyha === n ? "default" : "outline"} size="sm"
                    onClick={() => { setNyha(n); setTouched(true); }}>
                    {t(`nyha.${n}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hf-sbp">{t("field.systolicBP")}</Label>
              <Input id="hf-sbp" type="number" inputMode="decimal" value={sbp} placeholder={t("placeholder.sbp")}
                onChange={(e) => { setSbp(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hf-creatinine">{t("field.creatinine")}</Label>
              <Input id="hf-creatinine" type="number" inputMode="decimal" value={creatinine} placeholder={t("placeholder.creatinine")}
                onChange={(e) => { setCreatinine(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hf-sodium">{t("field.sodium")}</Label>
              <Input id="hf-sodium" type="number" inputMode="decimal" value={sodium} placeholder={t("placeholder.sodium")}
                onChange={(e) => { setSodium(e.target.value); setTouched(true); }} />
            </div>
            <YesNoButtons value={diabetes} onChange={setDiabetes} label={t("field.diabetes")} />
            <YesNoButtons value={copd} onChange={setCopd} label={t("field.copd")} />
            <YesNoButtons value={betaBlocker} onChange={setBetaBlocker} label={t("field.betaBlocker")} />
            <YesNoButtons value={aceInhibitor} onChange={setAceInhibitor} label={t("field.aceInhibitor")} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && !allValid && (
            <div className="space-y-1">
              {!valid.age && <p className="text-sm text-red-600">{t("error.invalidAge")}</p>}
              {!valid.gender && <p className="text-sm text-red-600">{t("error.selectGender")}</p>}
              {!valid.ef && <p className="text-sm text-red-600">{t("error.invalidEF")}</p>}
              {!valid.nyha && <p className="text-sm text-red-600">{t("error.selectNYHA")}</p>}
              {!valid.sbp && <p className="text-sm text-red-600">{t("error.invalidSBP")}</p>}
              {!valid.creatinine && <p className="text-sm text-red-600">{t("error.invalidCreatinine")}</p>}
              {!valid.sodium && <p className="text-sm text-red-600">{t("error.invalidSodium")}</p>}
            </div>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.medianSurvival")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{t("result.medianYearsFormat", { value: result.medianYears })}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.oneYear")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{t("result.survivalPctFormat", { value: result.oneYear })}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.fiveYear")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{t("result.survivalPctFormat", { value: result.fiveYear })}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.riskCategory")}</div>
                  <div className="text-sm font-medium text-zinc-800 mt-1">
                    {t(`result.categories.${result.riskCategory}` as never)}
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-400">{t("result.disclaimer")}</p>
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
