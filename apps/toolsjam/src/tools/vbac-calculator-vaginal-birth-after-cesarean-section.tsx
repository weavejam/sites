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

type Indication =
  | ""
  | "breech"
  | "fetalDistress"
  | "failureToProgress"
  | "placentaPrevia"
  | "other";

type DiabetesStatus = "" | "no" | "yes";
type HypertensionStatus = "" | "no" | "yes";
type InductionMethod = "" | "spontaneous" | "pitocin" | "prostaglandin";

function calcVbacProbability(
  age: number,
  prevVaginal: number,
  prevCesarean: number,
  indication: Indication,
  gestAge: number,
  bmi: number,
  diabetes: DiabetesStatus,
  hypertension: HypertensionStatus,
  induction: InductionMethod,
): number {
  let score = 60;

  // Previous vaginal deliveries
  if (prevVaginal >= 2) score += 20;
  else if (prevVaginal === 1) score += 15;

  // Previous cesarean sections
  if (prevCesarean >= 3) score -= 20;
  else if (prevCesarean === 2) score -= 10;

  // Cesarean indication
  if (indication === "breech" || indication === "placentaPrevia") score += 10;
  else if (indication === "failureToProgress") score -= 10;

  // BMI
  if (bmi >= 35) score -= 10;
  else if (bmi >= 30) score -= 5;
  else if (bmi < 25) score += 5;

  // Maternal age
  if (age >= 40) score -= 10;
  else if (age >= 35) score -= 5;
  else if (age < 20) score -= 5;
  else if (age < 30) score += 5;

  // Gestational age
  if (gestAge > 40) score -= 5;

  // Gestational diabetes
  if (diabetes === "yes") score -= 5;

  // Hypertension
  if (hypertension === "yes") score -= 5;

  // Induction method
  if (induction === "prostaglandin") score -= 15;
  else if (induction === "pitocin") score -= 5;

  return Math.min(95, Math.max(10, score));
}

export default function VbacCalculator(_props: { locale: Locale }) {
  const t = useTranslations(
    "tool.vbac-calculator-vaginal-birth-after-cesarean-section",
  );

  const [age, setAge] = React.useState("");
  const [prevVaginal, setPrevVaginal] = React.useState("");
  const [prevCesarean, setPrevCesarean] = React.useState("");
  const [indication, setIndication] = React.useState<Indication>("breech");
  const [gestAge, setGestAge] = React.useState("");
  const [bmi, setBmi] = React.useState("");
  const [diabetes, setDiabetes] = React.useState<DiabetesStatus>("no");
  const [hypertension, setHypertension] = React.useState<HypertensionStatus>("no");
  const [induction, setInduction] = React.useState<InductionMethod>("spontaneous");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const prevVaginalNum = parseFloat(prevVaginal);
  const prevCesareanNum = parseFloat(prevCesarean);
  const gestAgeNum = parseFloat(gestAge);
  const bmiNum = parseFloat(bmi);

  const allValid =
    age !== "" && Number.isFinite(ageNum) && ageNum >= 14 && ageNum <= 60 &&
    prevVaginal !== "" && Number.isFinite(prevVaginalNum) && prevVaginalNum >= 0 &&
    prevCesarean !== "" && Number.isFinite(prevCesareanNum) && prevCesareanNum >= 1 &&
    indication !== "" &&
    gestAge !== "" && Number.isFinite(gestAgeNum) && gestAgeNum >= 24 && gestAgeNum <= 44 &&
    bmi !== "" && Number.isFinite(bmiNum) && bmiNum >= 10 && bmiNum <= 70 &&
    diabetes !== "" &&
    hypertension !== "" &&
    induction !== "";

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const prob = calcVbacProbability(
      ageNum,
      prevVaginalNum,
      prevCesareanNum,
      indication,
      gestAgeNum,
      bmiNum,
      diabetes,
      hypertension,
      induction,
    );
    let risk: string;
    if (prob >= 75) risk = "favorable";
    else if (prob >= 60) risk = "moderate";
    else if (prob >= 45) risk = "cautious";
    else risk = "challenging";
    return { prob, risk };
  }, [allValid, ageNum, prevVaginalNum, prevCesareanNum, indication, gestAgeNum, bmiNum, diabetes, hypertension, induction]);

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
    a: string, pv: string, pc: string, ind: Indication,
    ga: string, b: string, d: DiabetesStatus, h: HypertensionStatus, i: InductionMethod,
  ) {
    setAge(a); setPrevVaginal(pv); setPrevCesarean(pc); setIndication(ind);
    setGestAge(ga); setBmi(b); setDiabetes(d); setHypertension(h); setInduction(i);
    setTouched(true);
  }

  function reset() {
    setAge(""); setPrevVaginal(""); setPrevCesarean(""); setIndication("");
    setGestAge(""); setBmi(""); setDiabetes(""); setHypertension(""); setInduction("");
    setTouched(false);
  }

  const INDICATIONS: Indication[] = ["breech", "fetalDistress", "failureToProgress", "placentaPrevia", "other"];
  const DIABETES_OPTS: DiabetesStatus[] = ["no", "yes"];
  const HYPERTENSION_OPTS: HypertensionStatus[] = ["no", "yes"];
  const INDUCTION_OPTS: InductionMethod[] = ["spontaneous", "pitocin", "prostaglandin"];

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
              <Label htmlFor="vbac-age">{t("field.age")}</Label>
              <Input
                id="vbac-age"
                type="number"
                inputMode="numeric"
                min="14"
                max="60"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbac-gestage">{t("field.gestAge")}</Label>
              <Input
                id="vbac-gestage"
                type="number"
                inputMode="numeric"
                min="24"
                max="44"
                value={gestAge}
                placeholder={t("placeholder.gestAge")}
                onChange={(e) => { setGestAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbac-prevvag">{t("field.prevVaginal")}</Label>
              <Input
                id="vbac-prevvag"
                type="number"
                inputMode="numeric"
                min="0"
                value={prevVaginal}
                placeholder={t("placeholder.prevVaginal")}
                onChange={(e) => { setPrevVaginal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbac-prevcesarean">{t("field.prevCesarean")}</Label>
              <Input
                id="vbac-prevcesarean"
                type="number"
                inputMode="numeric"
                min="1"
                value={prevCesarean}
                placeholder={t("placeholder.prevCesarean")}
                onChange={(e) => { setPrevCesarean(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbac-bmi">{t("field.bmi")}</Label>
              <Input
                id="vbac-bmi"
                type="number"
                inputMode="decimal"
                min="10"
                value={bmi}
                placeholder={t("placeholder.bmi")}
                onChange={(e) => { setBmi(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbac-indication">{t("field.indication")}</Label>
              <select
                id="vbac-indication"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={indication}
                onChange={(e) => { setIndication(e.target.value as Indication); setTouched(true); }}
              >
                <option value="">{t("select.placeholder")}</option>
                {INDICATIONS.map((opt) => (
                  <option key={opt} value={opt}>{t(`indication.${opt}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbac-diabetes">{t("field.diabetes")}</Label>
              <select
                id="vbac-diabetes"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={diabetes}
                onChange={(e) => { setDiabetes(e.target.value as DiabetesStatus); setTouched(true); }}
              >
                <option value="">{t("select.placeholder")}</option>
                {DIABETES_OPTS.map((opt) => (
                  <option key={opt} value={opt}>{t(`yesNo.${opt}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbac-hypertension">{t("field.hypertension")}</Label>
              <select
                id="vbac-hypertension"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={hypertension}
                onChange={(e) => { setHypertension(e.target.value as HypertensionStatus); setTouched(true); }}
              >
                <option value="">{t("select.placeholder")}</option>
                {HYPERTENSION_OPTS.map((opt) => (
                  <option key={opt} value={opt}>{t(`yesNo.${opt}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="vbac-induction">{t("field.induction")}</Label>
              <select
                id="vbac-induction"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={induction}
                onChange={(e) => { setInduction(e.target.value as InductionMethod); setTouched(true); }}
              >
                <option value="">{t("select.placeholder")}</option>
                {INDUCTION_OPTS.map((opt) => (
                  <option key={opt} value={opt}>{t(`induction.${opt}` as never)}</option>
                ))}
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

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {result.prob}%
              </div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.riskCategory")}</div>
                <div className="text-base font-semibold text-zinc-900">
                  {t(`risk.${result.risk}` as never)}
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("result.disclaimer")}</p>
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
            onClick={() => loadExample("26", "1", "1", "breech", "39", "24", "no", "no", "spontaneous")}>
            {t("examples.loadFavorable")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("32", "0", "1", "fetalDistress", "38", "28", "no", "no", "pitocin")}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("35", "0", "2", "failureToProgress", "37", "32", "yes", "yes", "prostaglandin")}>
            {t("examples.loadChallenging")}
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
