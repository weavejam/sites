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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

// Framingham Risk Score point tables (NCEP ATP III 2001)
function getAgePoints(age: number, isMale: boolean): number {
  if (isMale) {
    if (age < 35) return -9;
    if (age < 40) return -4;
    if (age < 45) return 0;
    if (age < 50) return 3;
    if (age < 55) return 6;
    if (age < 60) return 8;
    if (age < 65) return 10;
    if (age < 70) return 11;
    if (age < 75) return 12;
    return 13;
  } else {
    if (age < 35) return -7;
    if (age < 40) return -3;
    if (age < 45) return 0;
    if (age < 50) return 3;
    if (age < 55) return 6;
    if (age < 60) return 8;
    if (age < 65) return 10;
    if (age < 70) return 12;
    if (age < 75) return 14;
    return 16;
  }
}

function getCholPoints(totalChol: number, age: number, isMale: boolean): number {
  const ag = age < 40 ? 0 : age < 50 ? 1 : age < 60 ? 2 : age < 70 ? 3 : 4;
  const male = [
    [0, 4, 7, 9, 11],
    [0, 3, 5, 6, 8],
    [0, 2, 3, 4, 5],
    [0, 1, 1, 2, 3],
    [0, 0, 0, 1, 1],
  ];
  const female = [
    [0, 4, 8, 11, 13],
    [0, 3, 6, 8, 10],
    [0, 2, 4, 5, 7],
    [0, 1, 2, 3, 4],
    [0, 1, 1, 2, 2],
  ];
  const ci =
    totalChol < 160 ? 0 : totalChol < 200 ? 1 : totalChol < 240 ? 2 : totalChol < 280 ? 3 : 4;
  return isMale ? male[ag][ci] : female[ag][ci];
}

function getSmokingPoints(isSmoker: boolean, age: number, isMale: boolean): number {
  if (!isSmoker) return 0;
  const ag = age < 40 ? 0 : age < 50 ? 1 : age < 60 ? 2 : age < 70 ? 3 : 4;
  const male = [8, 5, 3, 1, 1];
  const female = [9, 7, 4, 2, 1];
  return isMale ? male[ag] : female[ag];
}

function getHDLPoints(hdl: number): number {
  if (hdl >= 60) return -1;
  if (hdl >= 50) return 0;
  if (hdl >= 40) return 1;
  return 2;
}

function getSBPPoints(sbp: number, onMed: boolean, isMale: boolean): number {
  if (isMale) {
    if (onMed) {
      if (sbp < 120) return 0;
      if (sbp < 130) return 1;
      if (sbp < 140) return 2;
      if (sbp < 160) return 2;
      return 3;
    } else {
      if (sbp < 120) return 0;
      if (sbp < 130) return 0;
      if (sbp < 140) return 1;
      if (sbp < 160) return 1;
      return 2;
    }
  } else {
    if (onMed) {
      if (sbp < 120) return 0;
      if (sbp < 130) return 3;
      if (sbp < 140) return 4;
      if (sbp < 160) return 5;
      return 6;
    } else {
      if (sbp < 120) return 0;
      if (sbp < 130) return 1;
      if (sbp < 140) return 2;
      if (sbp < 160) return 3;
      return 4;
    }
  }
}

function getDiabetesPoints(hasDiabetes: boolean, isMale: boolean): number {
  if (!hasDiabetes) return 0;
  return isMale ? 2 : 4;
}

const MALE_RISK: Record<number, number> = {
  0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 4, 9: 5,
  10: 6, 11: 8, 12: 10, 13: 12, 14: 16, 15: 20, 16: 25,
};

const FEMALE_RISK: Record<number, number> = {
  9: 1, 10: 1, 11: 1, 12: 1, 13: 2, 14: 2, 15: 3, 16: 4, 17: 5,
  18: 6, 19: 8, 20: 11, 21: 14, 22: 17, 23: 22, 24: 27,
};

function pointsToRisk(points: number, isMale: boolean): number {
  const table = isMale ? MALE_RISK : FEMALE_RISK;
  const minPts = isMale ? 0 : 9;
  if (points < minPts) return 1;
  if (points >= (isMale ? 17 : 25)) return 30;
  return table[points] ?? 30;
}

interface FraminghamResult {
  points: number;
  risk: number;
  category: "low" | "moderate" | "high";
}

function computeFramingham(params: {
  age: number;
  isMale: boolean;
  totalChol: number;
  hdl: number;
  sbp: number;
  onBpMed: boolean;
  isSmoker: boolean;
  hasDiabetes: boolean;
}): FraminghamResult {
  const points =
    getAgePoints(params.age, params.isMale) +
    getCholPoints(params.totalChol, params.age, params.isMale) +
    getSmokingPoints(params.isSmoker, params.age, params.isMale) +
    getHDLPoints(params.hdl) +
    getSBPPoints(params.sbp, params.onBpMed, params.isMale) +
    getDiabetesPoints(params.hasDiabetes, params.isMale);
  const risk = pointsToRisk(points, params.isMale);
  const category = risk < 10 ? "low" : risk < 20 ? "moderate" : "high";
  return { points, risk, category };
}

export default function FraminghamRiskCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.framingham-risk-calculator");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "">("");
  const [smoking, setSmoking] = React.useState<"yes" | "no">("no");
  const [sbp, setSbp] = React.useState("");
  const [totalChol, setTotalChol] = React.useState("");
  const [hdl, setHdl] = React.useState("");
  const [diabetes, setDiabetes] = React.useState<"yes" | "no">("no");
  const [bpMed, setBpMed] = React.useState<"yes" | "no">("no");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const sbpNum = parseFloat(sbp);
  const totalCholNum = parseFloat(totalChol);
  const hdlNum = parseFloat(hdl);

  const valid = {
    age: age !== "" && Number.isFinite(ageNum) && ageNum >= 20 && ageNum <= 79,
    gender: gender !== "",
    sbp: sbp !== "" && Number.isFinite(sbpNum) && sbpNum >= 90 && sbpNum <= 200,
    totalChol:
      totalChol !== "" && Number.isFinite(totalCholNum) && totalCholNum >= 100 && totalCholNum <= 400,
    hdl: hdl !== "" && Number.isFinite(hdlNum) && hdlNum >= 20 && hdlNum <= 100,
  };
  const allValid = Object.values(valid).every(Boolean);

  const result = React.useMemo<FraminghamResult | null>(() => {
    if (!allValid) return null;
    return computeFramingham({
      age: ageNum,
      isMale: gender === "male",
      totalChol: totalCholNum,
      hdl: hdlNum,
      sbp: sbpNum,
      onBpMed: bpMed === "yes",
      isSmoker: smoking === "yes",
      hasDiabetes: diabetes === "yes",
    });
  }, [allValid, ageNum, gender, totalCholNum, hdlNum, sbpNum, bpMed, smoking, diabetes]);

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
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

  function reset() {
    setAge("");
    setGender("");
    setSmoking("no");
    setSbp("");
    setTotalChol("");
    setHdl("");
    setDiabetes("no");
    setBpMed("no");
    setTouched(false);
  }

  function loadProfile(
    a: string,
    g: "male" | "female",
    s: "yes" | "no",
    bp: string,
    tc: string,
    h: string,
    d: "yes" | "no",
    m: "yes" | "no",
  ) {
    setAge(a);
    setGender(g);
    setSmoking(s);
    setSbp(bp);
    setTotalChol(tc);
    setHdl(h);
    setDiabetes(d);
    setBpMed(m);
    setTouched(true);
  }

  const YesNoButtons = ({
    value,
    onChange,
    label,
  }: {
    value: "yes" | "no";
    onChange: (v: "yes" | "no") => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        {(["yes", "no"] as const).map((v) => (
          <Button
            key={v}
            type="button"
            variant={value === v ? "default" : "outline"}
            size="sm"
            onClick={() => {
              onChange(v);
              setTouched(true);
            }}
          >
            {t(`yesNo.${v}` as never)}
          </Button>
        ))}
      </div>
    </div>
  );

  const categoryColors = {
    low: "text-green-700 bg-green-50 border-green-200",
    moderate: "text-yellow-700 bg-yellow-50 border-yellow-200",
    high: "text-red-700 bg-red-50 border-red-200",
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
              <Label htmlFor="frm-age">{t("field.age")}</Label>
              <Input
                id="frm-age"
                type="number"
                inputMode="decimal"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => {
                  setAge(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.gender")}</Label>
              <div className="flex gap-2">
                {(["male", "female"] as const).map((g) => (
                  <Button
                    key={g}
                    type="button"
                    variant={gender === g ? "default" : "outline"}
                    onClick={() => {
                      setGender(g);
                      setTouched(true);
                    }}
                  >
                    {t(`gender.${g}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="frm-tc">{t("field.totalCholesterol")}</Label>
              <Input
                id="frm-tc"
                type="number"
                inputMode="decimal"
                value={totalChol}
                placeholder={t("placeholder.totalCholesterol")}
                onChange={(e) => {
                  setTotalChol(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frm-hdl">{t("field.hdlCholesterol")}</Label>
              <Input
                id="frm-hdl"
                type="number"
                inputMode="decimal"
                value={hdl}
                placeholder={t("placeholder.hdlCholesterol")}
                onChange={(e) => {
                  setHdl(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frm-sbp">{t("field.systolicBP")}</Label>
              <Input
                id="frm-sbp"
                type="number"
                inputMode="decimal"
                value={sbp}
                placeholder={t("placeholder.systolicBP")}
                onChange={(e) => {
                  setSbp(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <YesNoButtons
              value={bpMed}
              onChange={setBpMed}
              label={t("field.bpMedication")}
            />
            <YesNoButtons
              value={smoking}
              onChange={setSmoking}
              label={t("field.smoking")}
            />
            <YesNoButtons
              value={diabetes}
              onChange={setDiabetes}
              label={t("field.diabetes")}
            />
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
              {!valid.age && (
                <p className="text-sm text-red-600">{t("error.invalidAge")}</p>
              )}
              {!valid.gender && (
                <p className="text-sm text-red-600">{t("error.selectGender")}</p>
              )}
              {!valid.sbp && (
                <p className="text-sm text-red-600">{t("error.invalidSystolicBP")}</p>
              )}
              {!valid.totalChol && (
                <p className="text-sm text-red-600">{t("error.invalidTotalChol")}</p>
              )}
              {!valid.hdl && (
                <p className="text-sm text-red-600">{t("error.invalidHDL")}</p>
              )}
            </div>
          )}

          {result !== null && (
            <div
              className={`rounded-lg border p-4 space-y-2 ${categoryColors[result.category]}`}
            >
              <div className="text-sm font-medium">{t("result.heading")}</div>
              <div className="text-3xl font-bold">
                {result.risk >= 30 ? "≥30%" : `${result.risk}%`}
              </div>
              <div className="text-sm font-semibold">
                {t("result.category")}:{" "}
                {t(`riskCategory.${result.category}` as never)}
              </div>
              <div className="text-xs opacity-75">
                {t("result.points")}: {result.points}
              </div>
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
            onClick={() => loadProfile("35", "male", "no", "120", "180", "55", "no", "no")}
          >
            {t("examples.loadLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadProfile("55", "male", "no", "140", "220", "45", "no", "no")}
          >
            {t("examples.loadModerate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadProfile("60", "male", "yes", "160", "280", "35", "yes", "yes")}
          >
            {t("examples.loadHigh")}
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
