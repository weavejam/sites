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

const SELECT_CLS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type KillipClass = "I" | "II" | "III" | "IV";
type YesNo = "no" | "yes";

const KILLIP_CLASSES: KillipClass[] = ["I", "II", "III", "IV"];

const MORTALITY_TABLE: number[] = [
  0.8, 1.6, 2.2, 4.4, 7.3, 12.4, 16.1, 23.4, 26.8,
];

function getMortality(score: number): number {
  if (score <= 0) return MORTALITY_TABLE[0];
  if (score >= MORTALITY_TABLE.length) return 35.9;
  return MORTALITY_TABLE[score];
}

function getRiskLevel(score: number): string {
  if (score <= 3) return "low";
  if (score <= 6) return "moderate";
  if (score <= 9) return "high";
  return "veryHigh";
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export default function TimiScoreForStemiCalculator(
  _props: { locale: Locale },
) {
  const t = useTranslations("tool.timi-score-for-stemi-calculator");

  const [age, setAge] = React.useState("");
  const [sbp, setSbp] = React.useState("");
  const [hr, setHr] = React.useState("");
  const [killip, setKillip] = React.useState<KillipClass>("I");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [diabetes, setDiabetes] = React.useState<YesNo>("no");
  const [anteriorSTE, setAnteriorSTE] = React.useState<YesNo>("no");
  const [timeToTreatment, setTimeToTreatment] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const sbpNum = parseFloat(sbp);
  const hrNum = parseFloat(hr);
  const weightNum = parseFloat(weight);
  const timeNum = parseFloat(timeToTreatment);

  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 1 && ageNum <= 120;
  const sbpValid = sbp !== "" && Number.isFinite(sbpNum) && sbpNum >= 40 && sbpNum <= 300;
  const hrValid = hr !== "" && Number.isFinite(hrNum) && hrNum >= 20 && hrNum <= 300;
  const weightValid = weight !== "" && Number.isFinite(weightNum) && weightNum >= 20 && weightNum <= 300;
  const timeValid = timeToTreatment !== "" && Number.isFinite(timeNum) && timeNum >= 0;

  const allValid = ageValid && sbpValid && hrValid && weightValid && timeValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    let score = 0;
    // Age scoring
    if (ageNum >= 75) score += 3;
    else if (ageNum >= 65) score += 2;
    // SBP < 100
    if (sbpNum < 100) score += 3;
    // HR > 100
    if (hrNum > 100) score += 2;
    // Killip II-IV
    if (killip !== "I") score += 2;
    // Weight < 67 kg
    if (weightNum < 67) score += 1;
    // Anterior STE or LBBB (combined field)
    if (anteriorSTE === "yes") score += 1;
    // Diabetes / HTN / Angina history
    if (diabetes === "yes") score += 1;
    // Time to treatment > 4 hours
    if (timeNum > 4) score += 1;
    return {
      score,
      mortality: getMortality(score),
      riskLevel: getRiskLevel(score),
    };
  }, [allValid, ageNum, sbpNum, hrNum, killip, weightNum, anteriorSTE, diabetes, timeNum]);

  function loadExample(
    a: string, s: string, h: string, k: KillipClass,
    w: string, ht: string, dm: YesNo, aste: YesNo, t2t: string,
  ) {
    setAge(a); setSbp(s); setHr(h); setKillip(k);
    setWeight(w); setHeight(ht); setDiabetes(dm);
    setAnteriorSTE(aste); setTimeToTreatment(t2t);
    setTouched(true);
  }

  function reset() {
    setAge(""); setSbp(""); setHr(""); setKillip("I");
    setWeight(""); setHeight(""); setDiabetes("no");
    setAnteriorSTE("no"); setTimeToTreatment("");
    setTouched(false);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: FaqItem[] = React.useMemo(() => {
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
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stemi-age">{t("field.age")}</Label>
              <Input
                id="stemi-age"
                type="number"
                inputMode="numeric"
                min="1"
                max="120"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stemi-sbp">{t("field.sbp")}</Label>
              <Input
                id="stemi-sbp"
                type="number"
                inputMode="numeric"
                min="40"
                max="300"
                value={sbp}
                placeholder={t("placeholder.sbp")}
                onChange={(e) => { setSbp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stemi-hr">{t("field.hr")}</Label>
              <Input
                id="stemi-hr"
                type="number"
                inputMode="numeric"
                min="20"
                max="300"
                value={hr}
                placeholder={t("placeholder.hr")}
                onChange={(e) => { setHr(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stemi-killip">{t("field.killip")}</Label>
              <select
                id="stemi-killip"
                className={SELECT_CLS}
                value={killip}
                onChange={(e) => { setKillip(e.target.value as KillipClass); setTouched(true); }}
              >
                {KILLIP_CLASSES.map((k) => (
                  <option key={k} value={k}>{t(`killip.${k}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stemi-weight">{t("field.weight")}</Label>
              <Input
                id="stemi-weight"
                type="number"
                inputMode="decimal"
                min="20"
                max="300"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stemi-height">{t("field.height")}</Label>
              <Input
                id="stemi-height"
                type="number"
                inputMode="numeric"
                min="100"
                max="250"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stemi-diabetes">{t("field.diabetes")}</Label>
              <select
                id="stemi-diabetes"
                className={SELECT_CLS}
                value={diabetes}
                onChange={(e) => { setDiabetes(e.target.value as YesNo); setTouched(true); }}
              >
                <option value="no">{t("option.no")}</option>
                <option value="yes">{t("option.yes")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stemi-anterior">{t("field.anteriorSTE")}</Label>
              <select
                id="stemi-anterior"
                className={SELECT_CLS}
                value={anteriorSTE}
                onChange={(e) => { setAnteriorSTE(e.target.value as YesNo); setTouched(true); }}
              >
                <option value="no">{t("option.no")}</option>
                <option value="yes">{t("option.yes")}</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="stemi-time">{t("field.timeToTreatment")}</Label>
              <Input
                id="stemi-time"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={timeToTreatment}
                placeholder={t("placeholder.timeToTreatment")}
                onChange={(e) => { setTimeToTreatment(e.target.value); setTouched(true); }}
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
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.score")}</div>
                  <div className="text-3xl font-bold text-zinc-900">
                    {result.score} / 14
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.mortality")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    ~{result.mortality}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.riskLevel")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`risk.${result.riskLevel}` as never)}
                  </div>
                </div>
              </div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("45", "140", "75", "I", "70", "170", "no", "no", "2")}
          >
            {t("button.loadLowRisk")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("70", "105", "90", "II", "75", "165", "yes", "no", "3")}
          >
            {t("button.loadModerateRisk")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("78", "85", "120", "IV", "60", "160", "yes", "yes", "8")}
          >
            {t("button.loadHighRisk")}
          </Button>
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
