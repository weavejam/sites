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
type Ethnicity = "caucasian" | "asian" | "african" | "hispanic" | "other";
type SmokingStatus = "never" | "former" | "current";

const ETHNICITIES: Ethnicity[] = ["caucasian", "asian", "african", "hispanic", "other"];
const SMOKING_STATUSES: SmokingStatus[] = ["never", "former", "current"];

const ETHNICITY_FACTOR: Record<Ethnicity, number> = {
  caucasian: 1.0,
  asian: 0.88,
  african: 0.85,
  hispanic: 0.92,
  other: 1.0,
};

const SMOKING_FACTOR: Record<SmokingStatus, number> = {
  never: 1.0,
  former: 0.95,
  current: 0.90,
};

function predictPEF(
  age: number,
  heightCm: number,
  gender: Gender,
  ethnicity: Ethnicity,
  smoking: SmokingStatus
): number {
  const h = heightCm / 100;
  const base =
    gender === "male"
      ? (6.14 * h - 0.043 * age) * 60
      : (5.50 * h - 0.031 * age) * 60;
  return Math.max(0, Math.round(base * ETHNICITY_FACTOR[ethnicity] * SMOKING_FACTOR[smoking]));
}

export default function PeakFlowCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.peak-flow-calculator-estimated-peak-expiratory-flow");

  const [age, setAge] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [gender, setGender] = React.useState<Gender | "">("");
  const [ethnicity, setEthnicity] = React.useState<Ethnicity | "">("");
  const [smokingStatus, setSmokingStatus] = React.useState<SmokingStatus | "">("");
  const [pef, setPef] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);

  function calculate() {
    setTouched(true);
    const ageVal = parseFloat(age);
    const heightVal = parseFloat(height);

    if (!Number.isFinite(ageVal) || ageVal < 1 || ageVal > 120 || !Number.isFinite(heightVal) || heightVal < 50 || heightVal > 250) {
      setError(t("error.invalid"));
      setPef(null);
      return;
    }
    if (!gender) {
      setError(t("error.selectGender"));
      setPef(null);
      return;
    }
    if (!ethnicity) {
      setError(t("error.selectEthnicity"));
      setPef(null);
      return;
    }
    if (!smokingStatus) {
      setError(t("error.selectSmoking"));
      setPef(null);
      return;
    }

    const result = predictPEF(ageVal, heightVal, gender as Gender, ethnicity as Ethnicity, smokingStatus as SmokingStatus);
    setPef(result);
    setError(null);
  }

  function reset() {
    setAge("");
    setHeight("");
    setGender("");
    setEthnicity("");
    setSmokingStatus("");
    setPef(null);
    setError(null);
    setTouched(false);
  }

  function loadExample(a: string, h: string, g: Gender, eth: Ethnicity, sm: SmokingStatus) {
    setAge(a);
    setHeight(h);
    setGender(g);
    setEthnicity(eth);
    setSmokingStatus(sm);
    setTouched(false);
    setPef(null);
    setError(null);
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
              <Label htmlFor="pf-age">{t("field.age")}</Label>
              <Input
                id="pf-age"
                type="number"
                inputMode="decimal"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-height">{t("field.height")}</Label>
              <Input
                id="pf-height"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.gender")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["male", "female"] as Gender[]).map((g) => (
                <Button
                  key={g}
                  type="button"
                  variant={gender === g ? "default" : "outline"}
                  onClick={() => setGender(g)}
                >
                  {t(`gender.${g}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.ethnicity")}</Label>
            <div className="flex flex-wrap gap-2">
              {ETHNICITIES.map((eth) => (
                <Button
                  key={eth}
                  type="button"
                  variant={ethnicity === eth ? "default" : "outline"}
                  onClick={() => setEthnicity(eth)}
                >
                  {t(`ethnicity.${eth}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.smokingStatus")}</Label>
            <div className="flex flex-wrap gap-2">
              {SMOKING_STATUSES.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={smokingStatus === s ? "default" : "outline"}
                  onClick={() => setSmokingStatus(s)}
                >
                  {t(`smokingStatus.${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && touched && <p className="text-sm text-red-600">{error}</p>}

          {pef !== null && !error && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-3xl font-bold text-zinc-900">
                {pef} <span className="text-xl font-normal text-zinc-600">{t("result.unit")}</span>
              </div>
              <div className="space-y-1 text-sm text-zinc-600">
                <div>{t("result.zones.green")}</div>
                <div>{t("result.zones.yellow")}</div>
                <div>{t("result.zones.red")}</div>
              </div>
              <p className="text-xs text-zinc-500 mt-1">{t("result.note")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <p className="text-sm font-medium text-zinc-600">{t("examples.intro")}</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("25", "175", "male", "caucasian", "never")}
          >
            {t("examples.loadYoungMale")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("45", "165", "female", "caucasian", "former")}
          >
            {t("examples.loadMiddleFemale")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("70", "170", "male", "asian", "never")}
          >
            {t("examples.loadElderlyMale")}
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
