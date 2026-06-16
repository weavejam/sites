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

type AllergyOpt = "none" | "hasAllergies";
type CognitionOpt = "normal" | "mild" | "moderate" | "severe";
type MobilityOpt = "independent" | "assisted" | "limited" | "dependent";
type CommOpt = "excellent" | "good" | "fair" | "poor";
type EmergencyOpt = "available" | "notAvailable";
type LiteracyOpt = "high" | "moderate" | "low";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function calcBMI(weightKg: number, heightCm: number): number {
  const hM = heightCm / 100;
  return weightKg / (hM * hM);
}

function calcPisaScore(params: {
  age: number;
  bmi: number;
  systolic: number;
  diastolic: number;
  hr: number;
  temp: number;
  spo2: number;
  meds: number;
  allergies: AllergyOpt;
  cognition: CognitionOpt;
  mobility: MobilityOpt;
  comm: CommOpt;
  emergency: EmergencyOpt;
  literacy: LiteracyOpt;
}): number {
  let score = 0;

  // Age risk (0-15)
  if (params.age >= 85) score += 15;
  else if (params.age >= 75) score += 10;
  else if (params.age >= 65) score += 5;
  else if (params.age < 18) score += 5;

  // Vital signs risk (0-20)
  if (params.systolic > 160 || params.systolic < 90) score += 5;
  if (params.diastolic > 100 || params.diastolic < 60) score += 3;
  if (params.hr > 100 || params.hr < 50) score += 4;
  if (params.temp > 38.5 || params.temp < 35.5) score += 4;
  if (params.spo2 < 95) score += 4;

  // BMI risk (0-5)
  if (params.bmi < 18.5 || params.bmi > 35) score += 5;
  else if (params.bmi > 30) score += 2;

  // Medications (0-15)
  if (params.meds >= 10) score += 15;
  else if (params.meds >= 5) score += 8;
  else if (params.meds >= 3) score += 4;

  // Allergies (0-5)
  if (params.allergies === "hasAllergies") score += 5;

  // Cognitive status (0-15)
  const cogMap: Record<CognitionOpt, number> = { normal: 0, mild: 5, moderate: 10, severe: 15 };
  score += cogMap[params.cognition];

  // Mobility (0-10)
  const mobMap: Record<MobilityOpt, number> = { independent: 0, assisted: 3, limited: 7, dependent: 10 };
  score += mobMap[params.mobility];

  // Communication (0-8)
  const commMap: Record<CommOpt, number> = { excellent: 0, good: 2, fair: 5, poor: 8 };
  score += commMap[params.comm];

  // Emergency contact (0-4)
  if (params.emergency === "notAvailable") score += 4;

  // Health literacy (0-8)
  const litMap: Record<LiteracyOpt, number> = { high: 0, moderate: 4, low: 8 };
  score += litMap[params.literacy];

  return Math.min(100, score);
}

function riskLevel(score: number): "low" | "moderate" | "high" | "critical" {
  if (score < 25) return "low";
  if (score < 50) return "moderate";
  if (score < 75) return "high";
  return "critical";
}

export default function PisaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pisa-calculator");

  const [age, setAge] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [systolic, setSystolic] = React.useState("");
  const [diastolic, setDiastolic] = React.useState("");
  const [heartRate, setHeartRate] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [spo2, setSpo2] = React.useState("");
  const [meds, setMeds] = React.useState("");
  const [allergies, setAllergies] = React.useState<AllergyOpt>("none");
  const [cognition, setCognition] = React.useState<CognitionOpt>("normal");
  const [mobility, setMobility] = React.useState<MobilityOpt>("independent");
  const [comm, setComm] = React.useState<CommOpt>("good");
  const [emergency, setEmergency] = React.useState<EmergencyOpt>("available");
  const [literacy, setLiteracy] = React.useState<LiteracyOpt>("high");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);
  const systolicNum = parseFloat(systolic);
  const diastolicNum = parseFloat(diastolic);
  const hrNum = parseFloat(heartRate);
  const tempNum = parseFloat(temperature);
  const spo2Num = parseFloat(spo2);
  const medsNum = parseInt(meds, 10);

  const allValid =
    age !== "" && Number.isFinite(ageNum) && ageNum > 0 &&
    weight !== "" && Number.isFinite(weightNum) && weightNum > 0 &&
    height !== "" && Number.isFinite(heightNum) && heightNum > 0 &&
    systolic !== "" && Number.isFinite(systolicNum) &&
    diastolic !== "" && Number.isFinite(diastolicNum) &&
    heartRate !== "" && Number.isFinite(hrNum) &&
    temperature !== "" && Number.isFinite(tempNum) &&
    spo2 !== "" && Number.isFinite(spo2Num) &&
    meds !== "" && Number.isFinite(medsNum) && medsNum >= 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const bmi = calcBMI(weightNum, heightNum);
    const score = calcPisaScore({
      age: ageNum, bmi, systolic: systolicNum, diastolic: diastolicNum,
      hr: hrNum, temp: tempNum, spo2: spo2Num, meds: medsNum,
      allergies, cognition, mobility, comm, emergency, literacy,
    });
    const level = riskLevel(score);
    const recs: string[] = [];
    if (medsNum >= 5) recs.push(t("result.rec_medications"));
    if (mobility !== "independent") recs.push(t("result.rec_fall"));
    if (cognition !== "normal") recs.push(t("result.rec_cognition"));
    if (comm === "fair" || comm === "poor") recs.push(t("result.rec_communication"));
    if (literacy === "low") recs.push(t("result.rec_literacy"));
    if (emergency === "notAvailable") recs.push(t("result.rec_contact"));
    return { score, level, bmi, recs };
  }, [allValid, ageNum, weightNum, heightNum, systolicNum, diastolicNum, hrNum, tempNum, spo2Num, medsNum, allergies, cognition, mobility, comm, emergency, literacy, t]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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
    setAge(""); setWeight(""); setHeight(""); setSystolic(""); setDiastolic("");
    setHeartRate(""); setTemperature(""); setSpo2(""); setMeds("");
    setAllergies("none"); setCognition("normal"); setMobility("independent");
    setComm("good"); setEmergency("available"); setLiteracy("high");
    setTouched(false);
  }

  const mark = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(e.target.value as never);
    setTouched(true);
  };

  const riskColors: Record<string, string> = {
    low: "border-green-400 bg-green-50 text-green-900",
    moderate: "border-yellow-400 bg-yellow-50 text-yellow-900",
    high: "border-orange-400 bg-orange-50 text-orange-900",
    critical: "border-red-500 bg-red-50 text-red-900",
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
        <p className="text-sm text-zinc-500">{t("intro")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "pisa-age", label: t("field.age"), val: age, set: setAge, ph: t("placeholder.age") },
              { id: "pisa-weight", label: t("field.weight"), val: weight, set: setWeight, ph: t("placeholder.weight") },
              { id: "pisa-height", label: t("field.height"), val: height, set: setHeight, ph: t("placeholder.height") },
              { id: "pisa-systolic", label: t("field.systolicBP"), val: systolic, set: setSystolic, ph: t("placeholder.systolic") },
              { id: "pisa-diastolic", label: t("field.diastolicBP"), val: diastolic, set: setDiastolic, ph: t("placeholder.diastolic") },
              { id: "pisa-hr", label: t("field.heartRate"), val: heartRate, set: setHeartRate, ph: t("placeholder.heartRate") },
              { id: "pisa-temp", label: t("field.temperature"), val: temperature, set: setTemperature, ph: t("placeholder.temperature") },
              { id: "pisa-spo2", label: t("field.oxygenSaturation"), val: spo2, set: setSpo2, ph: t("placeholder.oxygenSaturation") },
              { id: "pisa-meds", label: t("field.medicationCount"), val: meds, set: setMeds, ph: t("placeholder.medications") },
            ].map(({ id, label, val, set, ph }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={val}
                  placeholder={ph}
                  onChange={(e) => { set(e.target.value); setTouched(true); }}
                />
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="pisa-allergies">{t("field.allergies")}</Label>
              <select
                id="pisa-allergies"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={allergies}
                onChange={mark(setAllergies as never)}
              >
                <option value="none">{t("option.allergies.none")}</option>
                <option value="hasAllergies">{t("option.allergies.hasAllergies")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pisa-cognition">{t("field.cognitiveStatus")}</Label>
              <select
                id="pisa-cognition"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={cognition}
                onChange={mark(setCognition as never)}
              >
                <option value="normal">{t("option.cognitiveStatus.normal")}</option>
                <option value="mild">{t("option.cognitiveStatus.mild")}</option>
                <option value="moderate">{t("option.cognitiveStatus.moderate")}</option>
                <option value="severe">{t("option.cognitiveStatus.severe")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pisa-mobility">{t("field.mobilityStatus")}</Label>
              <select
                id="pisa-mobility"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={mobility}
                onChange={mark(setMobility as never)}
              >
                <option value="independent">{t("option.mobilityStatus.independent")}</option>
                <option value="assisted">{t("option.mobilityStatus.assisted")}</option>
                <option value="limited">{t("option.mobilityStatus.limited")}</option>
                <option value="dependent">{t("option.mobilityStatus.dependent")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pisa-comm">{t("field.communicationAbility")}</Label>
              <select
                id="pisa-comm"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={comm}
                onChange={mark(setComm as never)}
              >
                <option value="excellent">{t("option.communicationAbility.excellent")}</option>
                <option value="good">{t("option.communicationAbility.good")}</option>
                <option value="fair">{t("option.communicationAbility.fair")}</option>
                <option value="poor">{t("option.communicationAbility.poor")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pisa-emergency">{t("field.emergencyContact")}</Label>
              <select
                id="pisa-emergency"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={emergency}
                onChange={mark(setEmergency as never)}
              >
                <option value="available">{t("option.emergencyContact.available")}</option>
                <option value="notAvailable">{t("option.emergencyContact.notAvailable")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pisa-literacy">{t("field.healthLiteracy")}</Label>
              <select
                id="pisa-literacy"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={literacy}
                onChange={mark(setLiteracy as never)}
              >
                <option value="high">{t("option.healthLiteracy.high")}</option>
                <option value="moderate">{t("option.healthLiteracy.moderate")}</option>
                <option value="low">{t("option.healthLiteracy.low")}</option>
              </select>
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
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className={`rounded-lg border-l-4 p-4 space-y-3 ${riskColors[result.level]}`}>
              <div className="text-sm font-medium opacity-70">{t("result.heading")}</div>
              <div className="text-2xl font-bold">
                {t("result.score", { score: result.score })}
              </div>
              <div className="font-semibold">
                {t("result.risk", { level: t(`result.${result.level}` as never) })}
              </div>
              <div className="text-sm">
                {t("result.bmi", { bmi: result.bmi.toFixed(1) })}
              </div>
              {result.recs.length > 0 && (
                <div>
                  <div className="font-medium mb-1">{t("result.recommendations")}</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {result.recs.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("about.heading")}
        </h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("examples.heading")}
        </h2>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
