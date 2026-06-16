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

type Gender = "male" | "female";
type Smoking = "never" | "former" | "current";
type YesNo = "no" | "yes";
type RiskCategory = "low" | "moderate" | "high" | "veryHigh";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function computeDietRisk(params: {
  age: number;
  gender: Gender;
  bmi: number;
  waist: number;
  fruitsVeg: number;
  processedFoods: number;
  sugar: number;
  fiber: number;
  water: number;
  activity: number;
  smoking: Smoking;
  alcohol: number;
  diabetes: YesNo;
  heartDisease: YesNo;
  familyHistory: YesNo;
}): { score: number; category: RiskCategory } {
  let score = 0;

  // Age (max 15)
  if (params.age >= 60) score += 15;
  else if (params.age >= 50) score += 12;
  else if (params.age >= 40) score += 7;
  else if (params.age >= 30) score += 3;

  // BMI (max 20)
  if (params.bmi >= 35) score += 20;
  else if (params.bmi >= 30) score += 15;
  else if (params.bmi >= 25) score += 8;
  else if (params.bmi < 18.5) score += 10;

  // Waist circumference (max 10) — gender-specific thresholds
  const highWaist = params.gender === "female"
    ? (params.waist > 88 ? 10 : params.waist > 80 ? 5 : 0)
    : (params.waist > 102 ? 10 : params.waist > 94 ? 5 : 0);
  score += highWaist;

  // Fruits & vegetables (inversely scored, max 10)
  if (params.fruitsVeg <= 0) score += 10;
  else if (params.fruitsVeg <= 2) score += 8;
  else if (params.fruitsVeg <= 4) score += 5;
  else if (params.fruitsVeg <= 6) score += 2;

  // Processed foods per week (max 10)
  if (params.processedFoods >= 20) score += 10;
  else if (params.processedFoods >= 15) score += 8;
  else if (params.processedFoods >= 10) score += 5;
  else if (params.processedFoods >= 5) score += 3;

  // Added sugar g/day (max 8)
  if (params.sugar >= 50) score += 8;
  else if (params.sugar >= 35) score += 5;
  else if (params.sugar >= 25) score += 3;

  // Fiber g/day (inversely scored, max 8)
  if (params.fiber < 10) score += 8;
  else if (params.fiber < 15) score += 6;
  else if (params.fiber < 20) score += 4;
  else if (params.fiber < 25) score += 2;

  // Water intake L/day (inversely scored, max 5)
  if (params.water < 1) score += 5;
  else if (params.water < 1.5) score += 3;
  else if (params.water < 2) score += 1;

  // Physical activity h/week (inversely scored, max 10)
  if (params.activity <= 0) score += 10;
  else if (params.activity <= 1) score += 7;
  else if (params.activity <= 3) score += 5;
  else if (params.activity <= 6) score += 2;

  // Smoking (max 8)
  if (params.smoking === "current") score += 8;
  else if (params.smoking === "former") score += 4;

  // Alcohol drinks/week (max 6)
  if (params.alcohol >= 10) score += 6;
  else if (params.alcohol >= 6) score += 4;
  else if (params.alcohol >= 3) score += 2;

  // Diabetes (max 10)
  if (params.diabetes === "yes") score += 10;

  // Heart disease (max 8)
  if (params.heartDisease === "yes") score += 8;

  // Family history (max 5)
  if (params.familyHistory === "yes") score += 5;

  const category: RiskCategory =
    score <= 20 ? "low" : score <= 70 ? "moderate" : score <= 115 ? "high" : "veryHigh";

  return { score, category };
}

const RISK_COLORS: Record<RiskCategory, string> = {
  low: "text-green-700 bg-green-50 border-green-200",
  moderate: "text-yellow-700 bg-yellow-50 border-yellow-200",
  high: "text-orange-700 bg-orange-50 border-orange-200",
  veryHigh: "text-red-700 bg-red-50 border-red-200",
};

export default function DietRiskScoreCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.diet-risk-score-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender | "">("");
  const [bmi, setBmi] = React.useState("");
  const [waist, setWaist] = React.useState("");
  const [fruitsVeg, setFruitsVeg] = React.useState("");
  const [processedFoods, setProcessedFoods] = React.useState("");
  const [sugar, setSugar] = React.useState("");
  const [fiber, setFiber] = React.useState("");
  const [water, setWater] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [smoking, setSmoking] = React.useState<Smoking>("never");
  const [alcohol, setAlcohol] = React.useState("");
  const [diabetes, setDiabetes] = React.useState<YesNo>("no");
  const [heartDisease, setHeartDisease] = React.useState<YesNo>("no");
  const [familyHistory, setFamilyHistory] = React.useState<YesNo>("no");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const bmiNum = parseFloat(bmi);
  const waistNum = parseFloat(waist);
  const fruitsVegNum = parseFloat(fruitsVeg);
  const processedNum = parseFloat(processedFoods);
  const sugarNum = parseFloat(sugar);
  const fiberNum = parseFloat(fiber);
  const waterNum = parseFloat(water);
  const activityNum = parseFloat(activity);
  const alcoholNum = parseFloat(alcohol);

  const valid = {
    age: age !== "" && Number.isFinite(ageNum) && ageNum >= 1 && ageNum <= 120,
    gender: gender !== "",
    bmi: bmi !== "" && Number.isFinite(bmiNum) && bmiNum >= 10 && bmiNum <= 70,
    waist: waist !== "" && Number.isFinite(waistNum) && waistNum >= 40 && waistNum <= 200,
    numbers: [fruitsVeg, processedFoods, sugar, fiber, water, activity, alcohol].every(
      (v) => v !== "" && Number.isFinite(parseFloat(v)),
    ),
  };
  const allValid = Object.values(valid).every(Boolean);

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return computeDietRisk({
      age: ageNum,
      gender: gender as Gender,
      bmi: bmiNum,
      waist: waistNum,
      fruitsVeg: fruitsVegNum,
      processedFoods: processedNum,
      sugar: sugarNum,
      fiber: fiberNum,
      water: waterNum,
      activity: activityNum,
      smoking,
      alcohol: alcoholNum,
      diabetes,
      heartDisease,
      familyHistory,
    });
  }, [
    allValid, ageNum, gender, bmiNum, waistNum, fruitsVegNum, processedNum,
    sugarNum, fiberNum, waterNum, activityNum, smoking, alcoholNum,
    diabetes, heartDisease, familyHistory,
  ]);

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
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

  function reset() {
    setAge(""); setGender(""); setBmi(""); setWaist("");
    setFruitsVeg(""); setProcessedFoods(""); setSugar(""); setFiber("");
    setWater(""); setActivity(""); setSmoking("never"); setAlcohol("");
    setDiabetes("no"); setHeartDisease("no"); setFamilyHistory("no");
    setTouched(false);
  }

  function loadProfile(
    a: string, g: Gender, b: string, w: string, fv: string, pf: string,
    su: string, fi: string, wa: string, ac: string, sm: Smoking,
    al: string, di: YesNo, hd: YesNo, fh: YesNo,
  ) {
    setAge(a); setGender(g); setBmi(b); setWaist(w); setFruitsVeg(fv);
    setProcessedFoods(pf); setSugar(su); setFiber(fi); setWater(wa);
    setActivity(ac); setSmoking(sm); setAlcohol(al);
    setDiabetes(di); setHeartDisease(hd); setFamilyHistory(fh);
    setTouched(true);
  }

  const NInput = ({
    id, label, value, onChange, placeholder,
  }: {
    id: string; label: string; value: string;
    onChange: (v: string) => void; placeholder: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="number" inputMode="decimal" value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); setTouched(true); }} />
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
            <NInput id="drs-age" label={t("field.age")} value={age} onChange={setAge} placeholder={t("placeholder.age")} />
            <div className="space-y-2">
              <Label>{t("field.gender")}</Label>
              <div className="flex gap-2">
                {(["male", "female"] as Gender[]).map((g) => (
                  <Button key={g} type="button" variant={gender === g ? "default" : "outline"}
                    onClick={() => { setGender(g); setTouched(true); }}>
                    {t(`option.gender.${g}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <NInput id="drs-bmi" label={t("field.bmi")} value={bmi} onChange={setBmi} placeholder={t("placeholder.bmi")} />
            <NInput id="drs-waist" label={t("field.waist")} value={waist} onChange={setWaist} placeholder={t("placeholder.waist")} />
            <NInput id="drs-fv" label={t("field.fruitsVeg")} value={fruitsVeg} onChange={setFruitsVeg} placeholder={t("placeholder.fruitsVeg")} />
            <NInput id="drs-pf" label={t("field.processedFoods")} value={processedFoods} onChange={setProcessedFoods} placeholder={t("placeholder.processedFoods")} />
            <NInput id="drs-sugar" label={t("field.sugar")} value={sugar} onChange={setSugar} placeholder={t("placeholder.sugar")} />
            <NInput id="drs-fiber" label={t("field.fiber")} value={fiber} onChange={setFiber} placeholder={t("placeholder.fiber")} />
            <NInput id="drs-water" label={t("field.water")} value={water} onChange={setWater} placeholder={t("placeholder.water")} />
            <NInput id="drs-activity" label={t("field.activity")} value={activity} onChange={setActivity} placeholder={t("placeholder.activity")} />
            <NInput id="drs-alcohol" label={t("field.alcohol")} value={alcohol} onChange={setAlcohol} placeholder={t("placeholder.alcohol")} />
          </div>

          <div className="space-y-2">
            <Label>{t("field.smoking")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["never", "former", "current"] as Smoking[]).map((v) => (
                <Button key={v} type="button" variant={smoking === v ? "default" : "outline"}
                  onClick={() => { setSmoking(v); setTouched(true); }}>
                  {t(`option.smoking.${v}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>{t("field.diabetes")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["no", "yes"] as YesNo[]).map((v) => (
                  <Button key={v} type="button" variant={diabetes === v ? "default" : "outline"}
                    onClick={() => { setDiabetes(v); setTouched(true); }}>
                    {t(`option.diabetes.${v}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.heartDisease")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["no", "yes"] as YesNo[]).map((v) => (
                  <Button key={v} type="button" variant={heartDisease === v ? "default" : "outline"}
                    onClick={() => { setHeartDisease(v); setTouched(true); }}>
                    {t(`option.heartDisease.${v}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.familyHistory")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["no", "yes"] as YesNo[]).map((v) => (
                  <Button key={v} type="button" variant={familyHistory === v ? "default" : "outline"}
                    onClick={() => { setFamilyHistory(v); setTouched(true); }}>
                    {t(`option.familyHistory.${v}` as never)}
                  </Button>
                ))}
              </div>
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
              {!valid.age && <p className="text-sm text-red-600">{t("error.invalidAge")}</p>}
              {!valid.gender && <p className="text-sm text-red-600">{t("error.selectGender")}</p>}
              {!valid.bmi && <p className="text-sm text-red-600">{t("error.invalidBmi")}</p>}
              {!valid.waist && <p className="text-sm text-red-600">{t("error.invalidWaist")}</p>}
              {!valid.numbers && <p className="text-sm text-red-600">{t("error.required")}</p>}
            </div>
          )}

          {result !== null && (
            <div className={`rounded-lg border p-4 space-y-2 ${RISK_COLORS[result.category]}`}>
              <div className="text-sm font-medium">{t("result.heading")}</div>
              <div className="text-2xl font-bold">
                {t(`riskCategory.${result.category}` as never)}
              </div>
              <div className="text-sm">
                {t("result.score")}: {result.score}
              </div>
              <p className="mt-2 text-xs opacity-75">{t("result.note")}</p>
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
            onClick={() => loadProfile("30", "female", "22.5", "75", "7", "5", "20", "28", "2.5", "6", "never", "2", "no", "no", "no")}>
            {t("examples.loadLow")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("45", "male", "27.8", "95", "4", "12", "35", "18", "1.8", "3", "former", "5", "no", "no", "yes")}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("55", "male", "32.1", "110", "2", "20", "50", "12", "1.2", "1", "current", "8", "yes", "no", "yes")}>
            {t("examples.loadHigh")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("65", "female", "35.5", "120", "1", "25", "70", "8", "0.8", "0", "current", "12", "yes", "yes", "yes")}>
            {t("examples.loadVeryHigh")}
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
