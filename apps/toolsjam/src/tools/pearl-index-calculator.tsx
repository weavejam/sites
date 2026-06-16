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
type SmokingStatus = "no" | "former" | "yes";
type ActivityLevel = "high" | "moderate" | "low";
type FamilyHistory = "no" | "yes";

interface ScoreResult {
  total: number;
  bmi: number;
  category: string;
}

function scoreBMI(bmi: number): number {
  if (bmi >= 18.5 && bmi < 25) return 15;
  if (bmi >= 25 && bmi < 30) return 10;
  if (bmi >= 17 && bmi < 18.5) return 8;
  if (bmi >= 30 && bmi < 35) return 5;
  return 2;
}

function scoreSystolic(sbp: number): number {
  if (sbp < 120) return 15;
  if (sbp < 130) return 11;
  if (sbp < 140) return 7;
  if (sbp < 160) return 4;
  return 1;
}

function scoreDiastolic(dbp: number): number {
  if (dbp < 80) return 8;
  if (dbp < 90) return 5;
  if (dbp < 100) return 3;
  return 1;
}

function scoreHR(hr: number): number {
  if (hr >= 60 && hr <= 80) return 8;
  if ((hr >= 50 && hr < 60) || (hr > 80 && hr <= 90)) return 5;
  if ((hr >= 40 && hr < 50) || (hr > 90 && hr <= 100)) return 3;
  return 1;
}

function scoreBloodSugar(bs: number): number {
  if (bs < 100) return 12;
  if (bs < 126) return 7;
  return 2;
}

function scoreTotalCholesterol(tc: number): number {
  if (tc < 200) return 10;
  if (tc < 240) return 6;
  return 2;
}

function scoreHDL(hdl: number, gender: Gender): number {
  const goodThreshold = gender === "male" ? 40 : 50;
  if (hdl > 60) return 10;
  if (hdl >= goodThreshold) return 6;
  return 2;
}

function scoreSmoking(s: SmokingStatus): number {
  if (s === "no") return 10;
  if (s === "former") return 6;
  return 1;
}

function scoreActivity(a: ActivityLevel): number {
  if (a === "high") return 8;
  if (a === "moderate") return 5;
  return 2;
}

function scoreFamilyHistory(f: FamilyHistory): number {
  return f === "no" ? 4 : 0;
}

function getCategory(score: number): string {
  if (score >= 80) return "excellent";
  if (score >= 65) return "good";
  if (score >= 45) return "fair";
  if (score >= 25) return "poor";
  return "critical";
}

function calcScore(
  weight: number, height: number, gender: Gender,
  sbp: number, dbp: number, hr: number,
  bs: number, tc: number, hdl: number,
  smoking: SmokingStatus, activity: ActivityLevel, family: FamilyHistory
): ScoreResult {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  const total = Math.min(100,
    scoreBMI(bmi) +
    scoreSystolic(sbp) +
    scoreDiastolic(dbp) +
    scoreHR(hr) +
    scoreBloodSugar(bs) +
    scoreTotalCholesterol(tc) +
    scoreHDL(hdl, gender) +
    scoreSmoking(smoking) +
    scoreActivity(activity) +
    scoreFamilyHistory(family)
  );

  return { total, bmi: Math.round(bmi * 10) / 10, category: getCategory(total) };
}

export default function PearlIndexCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pearl-index-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender | "">("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [systolicBP, setSystolicBP] = React.useState("");
  const [diastolicBP, setDiastolicBP] = React.useState("");
  const [heartRate, setHeartRate] = React.useState("");
  const [bloodSugar, setBloodSugar] = React.useState("");
  const [totalCholesterol, setTotalCholesterol] = React.useState("");
  const [hdlCholesterol, setHdlCholesterol] = React.useState("");
  const [smokingStatus, setSmokingStatus] = React.useState<SmokingStatus | "">("");
  const [activityLevel, setActivityLevel] = React.useState<ActivityLevel | "">("");
  const [familyHistory, setFamilyHistory] = React.useState<FamilyHistory | "">("");
  const [result, setResult] = React.useState<ScoreResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);

  function calculate() {
    setTouched(true);
    if (!gender) { setError(t("error.selectGender")); setResult(null); return; }
    if (!smokingStatus) { setError(t("error.selectSmoking")); setResult(null); return; }
    if (!activityLevel) { setError(t("error.selectActivity")); setResult(null); return; }
    if (!familyHistory) { setError(t("error.selectFamily")); setResult(null); return; }

    const nums = [weight, height, systolicBP, diastolicBP, heartRate, bloodSugar, totalCholesterol, hdlCholesterol]
      .map(parseFloat);
    if (nums.some((n) => !Number.isFinite(n) || n <= 0)) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }
    const [w, h, sbp, dbp, hr, bs, tc, hdl] = nums;
    setResult(calcScore(w, h, gender as Gender, sbp, dbp, hr, bs, tc, hdl, smokingStatus as SmokingStatus, activityLevel as ActivityLevel, familyHistory as FamilyHistory));
    setError(null);
  }

  function reset() {
    setAge(""); setGender(""); setWeight(""); setHeight("");
    setSystolicBP(""); setDiastolicBP(""); setHeartRate("");
    setBloodSugar(""); setTotalCholesterol(""); setHdlCholesterol("");
    setSmokingStatus(""); setActivityLevel(""); setFamilyHistory("");
    setResult(null); setError(null); setTouched(false);
  }

  function loadExample(
    a: string, g: Gender, w: string, h: string,
    sbp: string, dbp: string, hr: string, bs: string, tc: string, hdl: string,
    sm: SmokingStatus, act: ActivityLevel, fam: FamilyHistory
  ) {
    setAge(a); setGender(g); setWeight(w); setHeight(h);
    setSystolicBP(sbp); setDiastolicBP(dbp); setHeartRate(hr);
    setBloodSugar(bs); setTotalCholesterol(tc); setHdlCholesterol(hdl);
    setSmokingStatus(sm); setActivityLevel(act); setFamilyHistory(fam);
    setResult(null); setError(null); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
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
              <Label htmlFor="pi-age">{t("field.age")}</Label>
              <Input id="pi-age" type="number" inputMode="decimal" value={age} placeholder={t("placeholder.age")} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t("field.gender")}</Label>
              <div className="flex gap-2">
                {(["male", "female"] as Gender[]).map((g) => (
                  <Button key={g} type="button" variant={gender === g ? "default" : "outline"} onClick={() => setGender(g)}>
                    {t(`gender.${g}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-weight">{t("field.weight")}</Label>
              <Input id="pi-weight" type="number" inputMode="decimal" value={weight} placeholder={t("placeholder.weight")} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-height">{t("field.height")}</Label>
              <Input id="pi-height" type="number" inputMode="decimal" value={height} placeholder={t("placeholder.height")} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-sbp">{t("field.systolicBP")}</Label>
              <Input id="pi-sbp" type="number" inputMode="decimal" value={systolicBP} placeholder={t("placeholder.systolicBP")} onChange={(e) => setSystolicBP(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-dbp">{t("field.diastolicBP")}</Label>
              <Input id="pi-dbp" type="number" inputMode="decimal" value={diastolicBP} placeholder={t("placeholder.diastolicBP")} onChange={(e) => setDiastolicBP(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-hr">{t("field.heartRate")}</Label>
              <Input id="pi-hr" type="number" inputMode="decimal" value={heartRate} placeholder={t("placeholder.heartRate")} onChange={(e) => setHeartRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-bs">{t("field.bloodSugar")}</Label>
              <Input id="pi-bs" type="number" inputMode="decimal" value={bloodSugar} placeholder={t("placeholder.bloodSugar")} onChange={(e) => setBloodSugar(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-tc">{t("field.totalCholesterol")}</Label>
              <Input id="pi-tc" type="number" inputMode="decimal" value={totalCholesterol} placeholder={t("placeholder.totalCholesterol")} onChange={(e) => setTotalCholesterol(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-hdl">{t("field.hdlCholesterol")}</Label>
              <Input id="pi-hdl" type="number" inputMode="decimal" value={hdlCholesterol} placeholder={t("placeholder.hdlCholesterol")} onChange={(e) => setHdlCholesterol(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.smokingStatus")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["no", "former", "yes"] as SmokingStatus[]).map((s) => (
                <Button key={s} type="button" variant={smokingStatus === s ? "default" : "outline"} onClick={() => setSmokingStatus(s)}>
                  {t(`smokingStatus.${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.activityLevel")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["high", "moderate", "low"] as ActivityLevel[]).map((a) => (
                <Button key={a} type="button" variant={activityLevel === a ? "default" : "outline"} onClick={() => setActivityLevel(a)}>
                  {t(`activityLevel.${a}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.familyHistory")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["no", "yes"] as FamilyHistory[]).map((f) => (
                <Button key={f} type="button" variant={familyHistory === f ? "default" : "outline"} onClick={() => setFamilyHistory(f)}>
                  {t(`familyHistory.${f}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {error && touched && <p className="text-sm text-red-600">{error}</p>}

          {result && !error && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-900">{result.total}</span>
                <span className="text-xl text-zinc-500">{t("result.outOf")}</span>
              </div>
              <div className="text-sm text-zinc-700">
                {t(`result.categories.${result.category}` as never)}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.bmi")}: <span className="font-medium">{result.bmi}</span> {t("result.bmiUnit")}
              </div>
              <p className="text-xs text-zinc-500">{t("result.note")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <p className="text-sm font-medium text-zinc-600">{t("examples.intro")}</p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("35", "male", "75", "175", "120", "80", "72", "95", "180", "55", "no", "moderate", "no")}>
            {t("examples.loadHealthy")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("50", "female", "85", "165", "140", "90", "85", "110", "220", "45", "no", "low", "yes")}>
            {t("examples.loadAtRisk")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("60", "male", "95", "170", "160", "100", "95", "130", "250", "35", "yes", "low", "yes")}>
            {t("examples.loadHighRisk")}
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
