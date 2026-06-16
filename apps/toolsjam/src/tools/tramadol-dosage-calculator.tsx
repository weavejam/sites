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

type HepaticStatus = "normal" | "mild" | "moderate" | "severe";
type PainSeverity = "mild" | "moderate" | "severe";
type Formulation = "ir" | "er";

interface DoseResult {
  minDose: number;
  maxDose: number;
  interval: number;
  dailyMax: number;
  contraindicated: boolean;
  notes: string[];
}

function calcDose(
  weightKg: number,
  age: number,
  crcl: number,
  hepatic: HepaticStatus,
  pain: PainSeverity,
  formulation: Formulation,
): DoseResult {
  const notes: string[] = [];
  const isElderly = age >= 75;
  const renalModerate = crcl >= 10 && crcl < 30;
  const renalSevere = crcl < 10;

  if (hepatic === "severe" || renalSevere) {
    return {
      minDose: 0,
      maxDose: 0,
      interval: 0,
      dailyMax: 0,
      contraindicated: true,
      notes: hepatic === "severe" ? ["hepaticSevere"] : ["renalSevere"],
    };
  }

  if (formulation === "er" && (renalModerate || hepatic === "moderate")) {
    const erNotes = renalModerate ? ["erRenal"] : ["erHepatic"];
    return {
      minDose: 0, maxDose: 0, interval: 0, dailyMax: 0,
      contraindicated: true,
      notes: erNotes,
    };
  }

  let minDose: number;
  let maxDose: number;

  if (formulation === "ir") {
    // Base IR dosing by pain severity
    if (pain === "mild") { minDose = 25; maxDose = 50; }
    else if (pain === "moderate") { minDose = 50; maxDose = 100; }
    else { minDose = 75; maxDose = 100; }

    if (isElderly) { minDose = Math.max(25, minDose - 25); maxDose = Math.min(75, maxDose); notes.push("elderly"); }
    if (hepatic === "moderate") { minDose = Math.round(minDose * 0.5); maxDose = Math.round(maxDose * 0.5); notes.push("hepaticModerate"); }

    let interval = pain === "mild" ? 8 : 6;
    if (isElderly) interval = Math.max(interval, 6);
    if (renalModerate) { interval = 12; notes.push("renalModerate"); }
    if (hepatic === "moderate") interval = Math.max(interval, 12);

    let dailyMax = 400;
    if (isElderly) dailyMax = Math.min(dailyMax, 300);
    if (renalModerate || hepatic === "moderate") dailyMax = Math.min(dailyMax, 200);

    return { minDose, maxDose, interval, dailyMax, contraindicated: false, notes };
  } else {
    // Extended release
    let minDose: number, maxDose: number;
    if (pain === "mild") { minDose = 100; maxDose = 100; }
    else if (pain === "moderate") { minDose = 100; maxDose = 200; }
    else { minDose = 200; maxDose = 200; }

    if (isElderly) { minDose = 100; maxDose = 100; notes.push("elderly"); }

    const interval = 12;
    const dosesPerInterval = 2; // twice daily for ER
    let dailyMax = 400;
    if (isElderly) dailyMax = 200;

    // Ensure single dose × doses/day never exceeds daily max
    maxDose = Math.min(maxDose, Math.floor(dailyMax / dosesPerInterval));
    minDose = Math.min(minDose, maxDose);

    return { minDose, maxDose, interval, dailyMax, contraindicated: false, notes };
  }
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

export default function TramadolDosageCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.tramadol-dosage-calculator");

  const [weight, setWeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [crcl, setCrcl] = React.useState("");
  const [hepatic, setHepatic] = React.useState<HepaticStatus>("normal");
  const [pain, setPain] = React.useState<PainSeverity>("moderate");
  const [formulation, setFormulation] = React.useState<Formulation>("ir");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);
  const ageNum = parseFloat(age);
  const crclNum = parseFloat(crcl);

  const weightValid = weight !== "" && Number.isFinite(weightNum) && weightNum >= 10 && weightNum <= 300;
  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 1 && ageNum <= 120;
  const crclValid = crcl !== "" && Number.isFinite(crclNum) && crclNum >= 1 && crclNum <= 200;
  const allValid = weightValid && ageValid && crclValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return calcDose(weightNum, ageNum, crclNum, hepatic, pain, formulation);
  }, [allValid, weightNum, ageNum, crclNum, hepatic, pain, formulation]);

  function loadExample(
    w: string, a: string, cr: string,
    h: HepaticStatus, p: PainSeverity, f: Formulation,
  ) {
    setWeight(w); setAge(a); setCrcl(cr);
    setHepatic(h); setPain(p); setFormulation(f);
    setTouched(true);
  }

  function reset() {
    setWeight(""); setAge(""); setCrcl("");
    setHepatic("normal"); setPain("moderate"); setFormulation("ir");
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
              <Label htmlFor="tram-weight">{t("field.weight")}</Label>
              <Input
                id="tram-weight"
                type="number"
                inputMode="decimal"
                min="10"
                max="300"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tram-age">{t("field.age")}</Label>
              <Input
                id="tram-age"
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
              <Label htmlFor="tram-crcl">{t("field.crcl")}</Label>
              <Input
                id="tram-crcl"
                type="number"
                inputMode="numeric"
                min="1"
                max="200"
                value={crcl}
                placeholder={t("placeholder.crcl")}
                onChange={(e) => { setCrcl(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tram-hepatic">{t("field.hepatic")}</Label>
              <select
                id="tram-hepatic"
                className={SELECT_CLS}
                value={hepatic}
                onChange={(e) => { setHepatic(e.target.value as HepaticStatus); setTouched(true); }}
              >
                {(["normal", "mild", "moderate", "severe"] as HepaticStatus[]).map((h) => (
                  <option key={h} value={h}>{t(`hepatic.${h}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tram-pain">{t("field.painSeverity")}</Label>
              <select
                id="tram-pain"
                className={SELECT_CLS}
                value={pain}
                onChange={(e) => { setPain(e.target.value as PainSeverity); setTouched(true); }}
              >
                {(["mild", "moderate", "severe"] as PainSeverity[]).map((p) => (
                  <option key={p} value={p}>{t(`pain.${p}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tram-formulation">{t("field.formulation")}</Label>
              <select
                id="tram-formulation"
                className={SELECT_CLS}
                value={formulation}
                onChange={(e) => { setFormulation(e.target.value as Formulation); setTouched(true); }}
              >
                {(["ir", "er"] as Formulation[]).map((f) => (
                  <option key={f} value={f}>{t(`formulation.${f}` as never)}</option>
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
              {result.contraindicated ? (
                <p className="text-sm font-semibold text-red-700">
                  {t("result.contraindicated")}
                </p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.singleDose")}</div>
                    <div className="text-xl font-bold text-zinc-900">
                      {result.minDose === result.maxDose
                        ? `${result.minDose} ${t("result.unit.mg")}`
                        : `${result.minDose}–${result.maxDose} ${t("result.unit.mg")}`}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.interval")}</div>
                    <div className="text-xl font-bold text-zinc-900">
                      {t("result.unit.hours")} {result.interval}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.dailyMax")}</div>
                    <div className="text-xl font-bold text-zinc-900">
                      {result.dailyMax} {t("result.unit.mg")}
                    </div>
                  </div>
                </div>
              )}
              {result.notes.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-zinc-500 mb-1">{t("result.note")}</div>
                  <ul className="space-y-1">
                    {result.notes.map((noteKey, i) => (
                      <li key={i} className="text-sm text-amber-800 bg-amber-50 rounded px-3 py-1">
                        {t(`notes.${noteKey}` as never)}
                      </li>
                    ))}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("70", "45", "90", "normal", "moderate", "ir")}
          >
            {t("button.loadNormal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("75", "78", "25", "normal", "mild", "ir")}
          >
            {t("button.loadElderly")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("65", "55", "70", "moderate", "moderate", "ir")}
          >
            {t("button.loadHepatic")}
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
