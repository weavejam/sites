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

type Gender = "" | "male" | "female";
type Ethnicity = "" | "caucasian" | "african" | "asian" | "hispanic" | "other";
type SmokingStatus = "" | "never" | "former" | "current";

function calcPredictedVC(
  age: number,
  heightCm: number,
  gender: Gender,
  ethnicity: Ethnicity,
  smoking: SmokingStatus,
): number | null {
  if (!gender || !ethnicity || !smoking) return null;
  // Simplified prediction equations based on Knudson / GLI-2012 reference values
  let vc: number;
  if (gender === "male") {
    vc = 0.0576 * heightCm - 0.026 * age - 4.34;
  } else {
    vc = 0.0446 * heightCm - 0.018 * age - 2.58;
  }
  // Ethnicity correction
  const ethFactor: Record<string, number> = {
    caucasian: 1.0,
    african: 0.88,
    asian: 0.88,
    hispanic: 0.93,
    other: 0.93,
  };
  vc *= ethFactor[ethnicity] ?? 1.0;
  // Smoking correction
  if (smoking === "current") vc *= 0.90;
  else if (smoking === "former") vc *= 0.95;
  return Math.max(0.5, vc);
}

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function VitalCapacityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.vital-capacity-calculator");

  const [age, setAge] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [weight, setWeight] = React.useState("");
  const [ethnicity, setEthnicity] = React.useState<Ethnicity>("caucasian");
  const [smoking, setSmoking] = React.useState<SmokingStatus>("never");
  const [actualVc, setActualVc] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const heightNum = parseFloat(height);
  const weightNum = parseFloat(weight);
  const actualVcNum = parseFloat(actualVc);

  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 3 && ageNum <= 120;
  const heightValid = height !== "" && Number.isFinite(heightNum) && heightNum >= 80 && heightNum <= 250;
  const weightValid = weight === "" || (Number.isFinite(weightNum) && weightNum > 0);
  const actualVcValid = actualVc === "" || (Number.isFinite(actualVcNum) && actualVcNum > 0);
  const allRequired = ageValid && heightValid && gender !== "" && ethnicity !== "" && smoking !== "" && weightValid && actualVcValid;

  const result = React.useMemo(() => {
    if (!allRequired) return null;
    const predicted = calcPredictedVC(ageNum, heightNum, gender, ethnicity, smoking);
    if (predicted === null) return null;
    const percentPredicted = actualVc !== "" ? (actualVcNum / predicted) * 100 : null;
    let interpretation: string;
    if (percentPredicted !== null) {
      if (percentPredicted >= 120) interpretation = "aboveNormal";
      else if (percentPredicted >= 80) interpretation = "normal";
      else if (percentPredicted >= 60) interpretation = "mildlyReduced";
      else if (percentPredicted >= 40) interpretation = "moderatelyReduced";
      else interpretation = "severelyReduced";
    } else {
      interpretation = "predictedOnly";
    }
    return { predicted, percentPredicted, interpretation };
  }, [allRequired, ageNum, heightNum, gender, ethnicity, smoking, actualVc, actualVcNum]);

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

  function loadExample(
    a: string, h: string, g: Gender, w: string,
    eth: Ethnicity, sm: SmokingStatus, avc: string,
  ) {
    setAge(a); setHeight(h); setGender(g); setWeight(w);
    setEthnicity(eth); setSmoking(sm); setActualVc(avc);
    setTouched(true);
  }

  function reset() {
    setAge(""); setHeight(""); setGender(""); setWeight("");
    setEthnicity(""); setSmoking(""); setActualVc("");
    setTouched(false);
  }

  const GENDERS: Gender[] = ["male", "female"];
  const ETHNICITIES: Ethnicity[] = ["caucasian", "african", "asian", "hispanic", "other"];
  const SMOKING_OPTS: SmokingStatus[] = ["never", "former", "current"];

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vc-age">{t("field.age")}</Label>
              <Input
                id="vc-age"
                type="number"
                inputMode="numeric"
                min="3"
                max="120"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vc-height">{t("field.height")}</Label>
              <Input
                id="vc-height"
                type="number"
                inputMode="decimal"
                min="80"
                max="250"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vc-gender">{t("field.gender")}</Label>
              <select
                id="vc-gender"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={gender}
                onChange={(e) => { setGender(e.target.value as Gender); setTouched(true); }}
              >
                <option value="">{t("select.placeholder")}</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{t(`gender.${g}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vc-weight">{t("field.weight")}</Label>
              <Input
                id="vc-weight"
                type="number"
                inputMode="decimal"
                min="0"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vc-ethnicity">{t("field.ethnicity")}</Label>
              <select
                id="vc-ethnicity"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={ethnicity}
                onChange={(e) => { setEthnicity(e.target.value as Ethnicity); setTouched(true); }}
              >
                <option value="">{t("select.placeholder")}</option>
                {ETHNICITIES.map((eth) => (
                  <option key={eth} value={eth}>{t(`ethnicity.${eth}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vc-smoking">{t("field.smoking")}</Label>
              <select
                id="vc-smoking"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={smoking}
                onChange={(e) => { setSmoking(e.target.value as SmokingStatus); setTouched(true); }}
              >
                <option value="">{t("select.placeholder")}</option>
                {SMOKING_OPTS.map((s) => (
                  <option key={s} value={s}>{t(`smoking.${s}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="vc-actual">{t("field.actualVc")}</Label>
              <Input
                id="vc-actual"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={actualVc}
                placeholder={t("placeholder.actualVc")}
                onChange={(e) => { setActualVc(e.target.value); setTouched(true); }}
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

          {touched && !allRequired && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.predicted")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.predicted)} {t("unit.liters")}
                  </div>
                </div>
                {result.percentPredicted !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.percentPredicted")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt(result.percentPredicted, 0)}%
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">{t("result.interpretation")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`interpretation.${result.interpretation}` as never)}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("35", "175", "male", "75", "caucasian", "never", "")}>
            {t("examples.loadMale")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("28", "165", "female", "60", "caucasian", "never", "")}>
            {t("examples.loadFemale")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("75", "160", "female", "65", "caucasian", "former", "")}>
            {t("examples.loadElderly")}
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
