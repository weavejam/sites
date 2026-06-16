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

function computeHeartScore(params: {
  age: number;
  isMale: boolean;
  sbp: number;
  dbp: number;
  totalChol: number;
  hdl: number;
  ldl: number;
  bmi: number;
  smoking: string;
  diabetes: boolean;
  activity: string;
  stress: string;
  familyHistory: boolean;
}): { score: number; riskCategory: string; cardiovascularAge: number } {
  let points = 0;

  // Age (0–20 points)
  if (params.age < 35) points += 0;
  else if (params.age < 45) points += 4;
  else if (params.age < 55) points += 8;
  else if (params.age < 65) points += 12;
  else if (params.age < 75) points += 16;
  else points += 20;

  // Sex (male adds risk)
  if (params.isMale) points += 4;

  // Blood pressure (0–12 points)
  if (params.sbp < 120) points += 0;
  else if (params.sbp < 130) points += 2;
  else if (params.sbp < 140) points += 4;
  else if (params.sbp < 160) points += 7;
  else points += 12;

  if (params.dbp > 90) points += 2;

  // Cholesterol (0–10 points)
  const nonHDL = params.totalChol - params.hdl;
  if (nonHDL > 190) points += 8;
  else if (nonHDL > 160) points += 5;
  else if (nonHDL > 130) points += 3;

  if (params.ldl > 160) points += 5;
  else if (params.ldl > 130) points += 3;
  else if (params.ldl > 100) points += 1;

  if (params.hdl < 40) points += 5;
  else if (params.hdl < 50) points += 2;
  else if (params.hdl > 60) points -= 2;

  // BMI (0–8 points)
  if (params.bmi < 18.5) points += 2;
  else if (params.bmi < 25) points += 0;
  else if (params.bmi < 30) points += 3;
  else if (params.bmi < 35) points += 6;
  else points += 8;

  // Smoking (0–10 points)
  if (params.smoking === "yes") points += 10;
  else if (params.smoking === "former") points += 4;

  // Diabetes (0–7 points)
  if (params.diabetes) points += 7;

  // Physical activity (protective)
  if (params.activity === "sedentary") points += 5;
  else if (params.activity === "low") points += 3;
  else if (params.activity === "moderate") points += 1;
  // high = 0

  // Stress
  if (params.stress === "veryHigh") points += 5;
  else if (params.stress === "high") points += 3;
  else if (params.stress === "moderate") points += 1;

  // Family history
  if (params.familyHistory) points += 5;

  // Normalize to 0–100
  const maxPossible = 20 + 4 + 12 + 2 + 8 + 5 + 5 + 8 + 10 + 7 + 5 + 5 + 5;
  const score = Math.min(100, Math.round((points / maxPossible) * 100));

  let riskCategory: string;
  if (score < 20) riskCategory = "low";
  else if (score < 40) riskCategory = "moderate";
  else if (score < 65) riskCategory = "high";
  else riskCategory = "veryHigh";

  // Cardiovascular age: adjust biological age by risk
  let cvAgeAdj = 0;
  if (score >= 65) cvAgeAdj = 15;
  else if (score >= 40) cvAgeAdj = 8;
  else if (score >= 20) cvAgeAdj = 3;
  const cardiovascularAge = Math.min(90, params.age + cvAgeAdj);

  return { score, riskCategory, cardiovascularAge };
}

export default function HeartScoreCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.heart-score-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "">("");
  const [sbp, setSbp] = React.useState("");
  const [dbp, setDbp] = React.useState("");
  const [totalChol, setTotalChol] = React.useState("");
  const [hdl, setHdl] = React.useState("");
  const [ldl, setLdl] = React.useState("");
  const [bmi, setBmi] = React.useState("");
  const [smoking, setSmoking] = React.useState("no");
  const [diabetes, setDiabetes] = React.useState("no");
  const [activity, setActivity] = React.useState("moderate");
  const [stress, setStress] = React.useState("moderate");
  const [familyHistory, setFamilyHistory] = React.useState("no");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const sbpNum = parseFloat(sbp);
  const dbpNum = parseFloat(dbp);
  const totalCholNum = parseFloat(totalChol);
  const hdlNum = parseFloat(hdl);
  const ldlNum = parseFloat(ldl);
  const bmiNum = parseFloat(bmi);

  const valid = {
    age: age !== "" && Number.isFinite(ageNum) && ageNum >= 18 && ageNum <= 100,
    gender: gender !== "",
    sbp: sbp !== "" && Number.isFinite(sbpNum) && sbpNum >= 70 && sbpNum <= 250,
    dbp: dbp !== "" && Number.isFinite(dbpNum) && dbpNum >= 40 && dbpNum <= 150,
    totalChol: totalChol !== "" && Number.isFinite(totalCholNum) && totalCholNum >= 100 && totalCholNum <= 500,
    hdl: hdl !== "" && Number.isFinite(hdlNum) && hdlNum >= 10 && hdlNum <= 150,
    ldl: ldl !== "" && Number.isFinite(ldlNum) && ldlNum >= 30 && ldlNum <= 400,
    bmi: bmi !== "" && Number.isFinite(bmiNum) && bmiNum >= 10 && bmiNum <= 70,
  };
  const allValid = Object.values(valid).every(Boolean);

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return computeHeartScore({
      age: ageNum,
      isMale: gender === "male",
      sbp: sbpNum,
      dbp: dbpNum,
      totalChol: totalCholNum,
      hdl: hdlNum,
      ldl: ldlNum,
      bmi: bmiNum,
      smoking,
      diabetes: diabetes === "yes",
      activity,
      stress,
      familyHistory: familyHistory === "yes",
    });
  }, [allValid, ageNum, gender, sbpNum, dbpNum, totalCholNum, hdlNum, ldlNum, bmiNum, smoking, diabetes, activity, stress, familyHistory]);

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
    setAge(""); setGender(""); setSbp(""); setDbp(""); setTotalChol(""); setHdl(""); setLdl("");
    setBmi(""); setSmoking("no"); setDiabetes("no"); setActivity("moderate"); setStress("moderate"); setFamilyHistory("no"); setTouched(false);
  }

  const handleChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(e.target.value);
    setTouched(true);
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
              <Label htmlFor="hs-age">{t("field.age")}</Label>
              <Input id="hs-age" type="number" inputMode="decimal" value={age} placeholder={t("placeholder.age")} onChange={handleChange(setAge)} />
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
              <Label htmlFor="hs-sbp">{t("field.systolicBP")}</Label>
              <Input id="hs-sbp" type="number" inputMode="decimal" value={sbp} placeholder={t("placeholder.bp")} onChange={handleChange(setSbp)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-dbp">{t("field.diastolicBP")}</Label>
              <Input id="hs-dbp" type="number" inputMode="decimal" value={dbp} placeholder={t("placeholder.bp")} onChange={handleChange(setDbp)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-tc">{t("field.totalCholesterol")}</Label>
              <Input id="hs-tc" type="number" inputMode="decimal" value={totalChol} placeholder={t("placeholder.cholesterol")} onChange={handleChange(setTotalChol)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-hdl">{t("field.hdlCholesterol")}</Label>
              <Input id="hs-hdl" type="number" inputMode="decimal" value={hdl} placeholder={t("placeholder.cholesterol")} onChange={handleChange(setHdl)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-ldl">{t("field.ldlCholesterol")}</Label>
              <Input id="hs-ldl" type="number" inputMode="decimal" value={ldl} placeholder={t("placeholder.cholesterol")} onChange={handleChange(setLdl)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-bmi">{t("field.bmi")}</Label>
              <Input id="hs-bmi" type="number" inputMode="decimal" value={bmi} placeholder={t("placeholder.bmi")} onChange={handleChange(setBmi)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-smoking">{t("field.smoking")}</Label>
              <select id="hs-smoking" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={smoking} onChange={handleChange(setSmoking)}>
                <option value="">—</option>
                <option value="no">{t("smoking.no")}</option>
                <option value="former">{t("smoking.former")}</option>
                <option value="yes">{t("smoking.yes")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-diabetes">{t("field.diabetes")}</Label>
              <select id="hs-diabetes" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={diabetes} onChange={handleChange(setDiabetes)}>
                <option value="">—</option>
                <option value="yes">{t("yesNo.yes")}</option>
                <option value="no">{t("yesNo.no")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-activity">{t("field.activity")}</Label>
              <select id="hs-activity" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={activity} onChange={handleChange(setActivity)}>
                <option value="">—</option>
                <option value="high">{t("activity.high")}</option>
                <option value="moderate">{t("activity.moderate")}</option>
                <option value="low">{t("activity.low")}</option>
                <option value="sedentary">{t("activity.sedentary")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-stress">{t("field.stress")}</Label>
              <select id="hs-stress" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={stress} onChange={handleChange(setStress)}>
                <option value="">—</option>
                <option value="low">{t("stress.low")}</option>
                <option value="moderate">{t("stress.moderate")}</option>
                <option value="high">{t("stress.high")}</option>
                <option value="veryHigh">{t("stress.veryHigh")}</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hs-family">{t("field.familyHistory")}</Label>
              <select id="hs-family" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={familyHistory} onChange={handleChange(setFamilyHistory)}>
                <option value="">—</option>
                <option value="yes">{t("yesNo.yes")}</option>
                <option value="no">{t("yesNo.no")}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && !allValid && (
            <div className="space-y-1">
              {!valid.age && <p className="text-sm text-red-600">{t("error.invalidAge")}</p>}
              {!valid.gender && <p className="text-sm text-red-600">{t("error.selectGender")}</p>}
              {!valid.sbp && <p className="text-sm text-red-600">{t("error.invalidSBP")}</p>}
              {!valid.dbp && <p className="text-sm text-red-600">{t("error.invalidDBP")}</p>}
              {!valid.totalChol && <p className="text-sm text-red-600">{t("error.invalidTotalChol")}</p>}
              {!valid.hdl && <p className="text-sm text-red-600">{t("error.invalidHDL")}</p>}
              {!valid.ldl && <p className="text-sm text-red-600">{t("error.invalidLDL")}</p>}
              {!valid.bmi && <p className="text-sm text-red-600">{t("error.invalidBMI")}</p>}
            </div>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.score")}</div>
                  <div className="text-3xl font-bold text-zinc-900">
                    {result.score}<span className="text-base font-normal text-zinc-400"> {t("result.outOf")}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.riskLevel")}</div>
                  <div className="text-sm font-medium text-zinc-800 mt-1">
                    {t(`result.categories.${result.riskCategory}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.cardiovascularAge")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{t("result.cardiovascularAgeFormat", { value: result.cardiovascularAge })}</div>
                </div>
              </div>
              <div className="rounded-md bg-white border border-zinc-100 p-3 text-sm text-zinc-700">
                {t(`result.recommendations.${result.riskCategory}` as never)}
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
