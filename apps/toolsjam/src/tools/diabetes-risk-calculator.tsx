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

type FamilyHistory = "no" | "yes";
type Activity = "regular" | "occasional" | "sedentary";
type BloodPressure = "normal" | "high";
type Smoking = "never" | "former" | "current";
type GDM = "no" | "yes";
type Race = "white" | "hispanic" | "africanAmerican" | "asian" | "other";
type RiskCategory = "low" | "moderate" | "high" | "veryHigh";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function computeDiabetesRisk(params: {
  age: number;
  bmi: number;
  familyHistory: FamilyHistory;
  activity: Activity;
  bloodPressure: BloodPressure;
  smoking: Smoking;
  gdm: GDM;
  race: Race;
}): { score: number; category: RiskCategory } {
  let score = 0;

  // Age scoring
  if (params.age >= 60) score += 3;
  else if (params.age >= 50) score += 2;
  else if (params.age >= 40) score += 1;

  // BMI scoring
  if (params.bmi >= 35) score += 3;
  else if (params.bmi >= 30) score += 2;
  else if (params.bmi >= 25) score += 1;

  // Family history
  if (params.familyHistory === "yes") score += 2;

  // Physical activity (inversely scored)
  if (params.activity === "sedentary") score += 2;
  else if (params.activity === "occasional") score += 1;

  // Blood pressure
  if (params.bloodPressure === "high") score += 2;

  // Smoking
  if (params.smoking === "current") score += 2;
  else if (params.smoking === "former") score += 1;

  // GDM
  if (params.gdm === "yes") score += 2;

  // Race/ethnicity
  if (["hispanic", "africanAmerican", "asian"].includes(params.race)) score += 1;

  // Categorise
  let category: RiskCategory;
  if (score <= 3) category = "low";
  else if (score <= 8) category = "moderate";
  else if (score <= 14) category = "high";
  else category = "veryHigh";

  return { score, category };
}

const ACTIVITIES: Activity[] = ["regular", "occasional", "sedentary"];
const RACES: Race[] = ["white", "hispanic", "africanAmerican", "asian", "other"];

export default function DiabetesRiskCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.diabetes-risk-calculator");

  const [age, setAge] = React.useState("");
  const [bmi, setBmi] = React.useState("");
  const [familyHistory, setFamilyHistory] = React.useState<FamilyHistory>("no");
  const [activity, setActivity] = React.useState<Activity>("regular");
  const [bloodPressure, setBloodPressure] = React.useState<BloodPressure>("normal");
  const [smoking, setSmoking] = React.useState<Smoking>("never");
  const [gdm, setGdm] = React.useState<GDM>("no");
  const [race, setRace] = React.useState<Race | "">("");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const bmiNum = parseFloat(bmi);
  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 1 && ageNum <= 120;
  const bmiValid = bmi !== "" && Number.isFinite(bmiNum) && bmiNum >= 10 && bmiNum <= 70;
  const raceValid = race !== "";
  const allValid = ageValid && bmiValid && raceValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return computeDiabetesRisk({
      age: ageNum,
      bmi: bmiNum,
      familyHistory,
      activity,
      bloodPressure,
      smoking,
      gdm,
      race: race as Race,
    });
  }, [allValid, ageNum, bmiNum, familyHistory, activity, bloodPressure, smoking, gdm, race]);

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
    setAge("");
    setBmi("");
    setFamilyHistory("no");
    setActivity("regular");
    setBloodPressure("normal");
    setSmoking("never");
    setGdm("no");
    setRace("");
    setTouched(false);
  }

  function loadProfile(
    a: string,
    b: string,
    fh: FamilyHistory,
    act: Activity,
    bp: BloodPressure,
    sm: Smoking,
    g: GDM,
    r: Race,
  ) {
    setAge(a);
    setBmi(b);
    setFamilyHistory(fh);
    setActivity(act);
    setBloodPressure(bp);
    setSmoking(sm);
    setGdm(g);
    setRace(r);
    setTouched(true);
  }

  const categoryColors: Record<RiskCategory, string> = {
    low: "text-green-700 bg-green-50 border-green-200",
    moderate: "text-yellow-700 bg-yellow-50 border-yellow-200",
    high: "text-orange-700 bg-orange-50 border-orange-200",
    veryHigh: "text-red-700 bg-red-50 border-red-200",
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
              <Label htmlFor="drc-age">{t("field.age")}</Label>
              <Input
                id="drc-age"
                type="number"
                inputMode="decimal"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drc-bmi">{t("field.bmi")}</Label>
              <Input
                id="drc-bmi"
                type="number"
                inputMode="decimal"
                value={bmi}
                placeholder={t("placeholder.bmi")}
                onChange={(e) => { setBmi(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.familyHistory")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["no", "yes"] as FamilyHistory[]).map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant={familyHistory === v ? "default" : "outline"}
                  onClick={() => { setFamilyHistory(v); setTouched(true); }}
                >
                  {t(`option.familyHistory.${v}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.activity")}</Label>
            <div className="flex flex-wrap gap-2">
              {ACTIVITIES.map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant={activity === v ? "default" : "outline"}
                  onClick={() => { setActivity(v); setTouched(true); }}
                >
                  {t(`option.activity.${v}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("field.bloodPressure")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["normal", "high"] as BloodPressure[]).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant={bloodPressure === v ? "default" : "outline"}
                    onClick={() => { setBloodPressure(v); setTouched(true); }}
                  >
                    {t(`option.bloodPressure.${v}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.smoking")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["never", "former", "current"] as Smoking[]).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant={smoking === v ? "default" : "outline"}
                    onClick={() => { setSmoking(v); setTouched(true); }}
                  >
                    {t(`option.smoking.${v}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.gestationalDiabetes")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["no", "yes"] as GDM[]).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant={gdm === v ? "default" : "outline"}
                    onClick={() => { setGdm(v); setTouched(true); }}
                  >
                    {t(`option.gestationalDiabetes.${v}` as never)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.raceEthnicity")}</Label>
            <div className="flex flex-wrap gap-2">
              {RACES.map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant={race === v ? "default" : "outline"}
                  onClick={() => { setRace(v); setTouched(true); }}
                >
                  {t(`option.raceEthnicity.${v}` as never)}
                </Button>
              ))}
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
              {!ageValid && <p className="text-sm text-red-600">{t("error.invalidAge")}</p>}
              {!bmiValid && <p className="text-sm text-red-600">{t("error.invalidBmi")}</p>}
              {!raceValid && <p className="text-sm text-red-600">{t("error.selectRace")}</p>}
            </div>
          )}

          {result !== null && (
            <div className={`rounded-lg border p-4 space-y-2 ${categoryColors[result.category]}`}>
              <div className="text-sm font-medium">{t("result.heading")}</div>
              <div className="text-2xl font-bold">
                {t(`riskCategory.${result.category}` as never)}
              </div>
              <div className="text-sm">
                {t("result.risk")}: {t(`riskRange.${result.category}` as never)}
              </div>
              <div className="text-xs opacity-75">
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadProfile("25", "22.5", "no", "regular", "normal", "never", "no", "white")}
          >
            {t("examples.loadLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadProfile("50", "27.8", "yes", "occasional", "normal", "former", "no", "hispanic")}
          >
            {t("examples.loadModerate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadProfile("65", "32.1", "yes", "sedentary", "high", "current", "no", "africanAmerican")}
          >
            {t("examples.loadHigh")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadProfile("45", "35.2", "yes", "sedentary", "high", "current", "yes", "asian")}
          >
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
