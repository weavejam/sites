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

type Sex = "male" | "female";

interface MetSynInputs {
  sex: Sex;
  waist: string;
  triglycerides: string;
  trigMed: boolean;
  hdl: string;
  hdlMed: boolean;
  systolic: string;
  diastolic: string;
  bpMed: boolean;
  glucose: string;
  glucoseMed: boolean;
}

interface CriteriaResult {
  waist: boolean;
  triglycerides: boolean;
  hdl: boolean;
  bp: boolean;
  glucose: boolean;
  count: number;
  diagnosis: boolean;
}

function calcMetSyn(inputs: MetSynInputs): CriteriaResult | null {
  const waistNum = parseFloat(inputs.waist);
  const trigNum = parseFloat(inputs.triglycerides);
  const hdlNum = parseFloat(inputs.hdl);
  const sysNum = parseFloat(inputs.systolic);
  const diaNum = parseFloat(inputs.diastolic);
  const glucNum = parseFloat(inputs.glucose);

  if (
    !Number.isFinite(waistNum) || waistNum <= 0 ||
    !Number.isFinite(trigNum) || trigNum < 0 ||
    !Number.isFinite(hdlNum) || hdlNum <= 0 ||
    !Number.isFinite(sysNum) || sysNum <= 0 ||
    !Number.isFinite(diaNum) || diaNum <= 0 ||
    !Number.isFinite(glucNum) || glucNum <= 0
  ) return null;

  const waistCriteria = inputs.sex === "male" ? waistNum >= 102 : waistNum >= 88;
  const trigCriteria = trigNum >= 150 || inputs.trigMed;
  const hdlCriteria = inputs.sex === "male" ? (hdlNum < 40 || inputs.hdlMed) : (hdlNum < 50 || inputs.hdlMed);
  const bpCriteria = sysNum >= 130 || diaNum >= 85 || inputs.bpMed;
  const glucCriteria = glucNum >= 100 || inputs.glucoseMed;

  const criteria = [waistCriteria, trigCriteria, hdlCriteria, bpCriteria, glucCriteria];
  const count = criteria.filter(Boolean).length;

  return {
    waist: waistCriteria,
    triglycerides: trigCriteria,
    hdl: hdlCriteria,
    bp: bpCriteria,
    glucose: glucCriteria,
    count,
    diagnosis: count >= 3,
  };
}

export default function MetabolicSyndromeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.metabolic-syndrome-calculator");

  const [sex, setSex] = React.useState<Sex>("male");
  const [waist, setWaist] = React.useState("");
  const [triglycerides, setTriglycerides] = React.useState("");
  const [trigMed, setTrigMed] = React.useState(false);
  const [hdl, setHdl] = React.useState("");
  const [hdlMed, setHdlMed] = React.useState(false);
  const [systolic, setSystolic] = React.useState("");
  const [diastolic, setDiastolic] = React.useState("");
  const [bpMed, setBpMed] = React.useState(false);
  const [glucose, setGlucose] = React.useState("");
  const [glucoseMed, setGlucoseMed] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const inputs: MetSynInputs = {
    sex, waist, triglycerides, trigMed, hdl, hdlMed,
    systolic, diastolic, bpMed, glucose, glucoseMed,
  };

  const result = React.useMemo(() => calcMetSyn(inputs), [
    sex, waist, triglycerides, trigMed, hdl, hdlMed,
    systolic, diastolic, bpMed, glucose, glucoseMed,
  ]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
    }
    return arr;
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
    setSex("male"); setWaist(""); setTriglycerides(""); setTrigMed(false);
    setHdl(""); setHdlMed(false); setSystolic(""); setDiastolic("");
    setBpMed(false); setGlucose(""); setGlucoseMed(false); setTouched(false);
  }

  function mark(v: boolean) {
    return v
      ? <span className="text-green-600 font-bold">✓</span>
      : <span className="text-zinc-400">✗</span>;
  }

  const showError = touched && result === null;

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
          {/* Sex */}
          <div className="space-y-2">
            <Label>{t("field.sex")}</Label>
            <div className="flex gap-3">
              {(["male", "female"] as Sex[]).map((s) => (
                <Button key={s} type="button"
                  variant={sex === s ? "default" : "outline"}
                  onClick={() => { setSex(s); setTouched(true); }}>
                  {t(`type.${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {/* Waist */}
          <div className="space-y-2">
            <Label htmlFor="ms-waist">{t("field.waist")}</Label>
            <Input id="ms-waist" type="number" inputMode="decimal" value={waist} placeholder={sex === "male" ? "102" : "88"}
              onChange={(e) => { setWaist(e.target.value); setTouched(true); }} />
            <p className="text-xs text-zinc-500">{t(sex === "male" ? "field.waistThresholdMale" : "field.waistThresholdFemale")}</p>
          </div>

          {/* Triglycerides */}
          <div className="space-y-2">
            <Label htmlFor="ms-trig">{t("field.triglycerides")}</Label>
            <Input id="ms-trig" type="number" inputMode="decimal" value={triglycerides} placeholder="150"
              onChange={(e) => { setTriglycerides(e.target.value); setTouched(true); }} />
            <div className="flex items-center gap-2">
              <input id="ms-trig-med" type="checkbox" checked={trigMed}
                onChange={(e) => { setTrigMed(e.target.checked); setTouched(true); }}
                className="h-4 w-4 rounded border-zinc-300" />
              <Label htmlFor="ms-trig-med" className="text-sm font-normal">{t("field.trigMed")}</Label>
            </div>
          </div>

          {/* HDL */}
          <div className="space-y-2">
            <Label htmlFor="ms-hdl">{t("field.hdl")}</Label>
            <Input id="ms-hdl" type="number" inputMode="decimal" value={hdl} placeholder={sex === "male" ? "40" : "50"}
              onChange={(e) => { setHdl(e.target.value); setTouched(true); }} />
            <div className="flex items-center gap-2">
              <input id="ms-hdl-med" type="checkbox" checked={hdlMed}
                onChange={(e) => { setHdlMed(e.target.checked); setTouched(true); }}
                className="h-4 w-4 rounded border-zinc-300" />
              <Label htmlFor="ms-hdl-med" className="text-sm font-normal">{t("field.hdlMed")}</Label>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="space-y-2">
            <Label>{t("field.bp")}</Label>
            <div className="flex gap-3">
              <div className="flex-1 space-y-1">
                <Label htmlFor="ms-sys" className="text-xs text-zinc-500">{t("field.systolic")}</Label>
                <Input id="ms-sys" type="number" inputMode="numeric" value={systolic} placeholder="120"
                  onChange={(e) => { setSystolic(e.target.value); setTouched(true); }} />
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="ms-dia" className="text-xs text-zinc-500">{t("field.diastolic")}</Label>
                <Input id="ms-dia" type="number" inputMode="numeric" value={diastolic} placeholder="80"
                  onChange={(e) => { setDiastolic(e.target.value); setTouched(true); }} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input id="ms-bp-med" type="checkbox" checked={bpMed}
                onChange={(e) => { setBpMed(e.target.checked); setTouched(true); }}
                className="h-4 w-4 rounded border-zinc-300" />
              <Label htmlFor="ms-bp-med" className="text-sm font-normal">{t("field.bpMed")}</Label>
            </div>
          </div>

          {/* Glucose */}
          <div className="space-y-2">
            <Label htmlFor="ms-gluc">{t("field.glucose")}</Label>
            <Input id="ms-gluc" type="number" inputMode="decimal" value={glucose} placeholder="100"
              onChange={(e) => { setGlucose(e.target.value); setTouched(true); }} />
            <div className="flex items-center gap-2">
              <input id="ms-gluc-med" type="checkbox" checked={glucoseMed}
                onChange={(e) => { setGlucoseMed(e.target.checked); setTouched(true); }}
                className="h-4 w-4 rounded border-zinc-300" />
              <Label htmlFor="ms-gluc-med" className="text-sm font-normal">{t("field.glucoseMed")}</Label>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className={`text-xl font-bold ${result.diagnosis ? "text-red-600" : "text-green-600"}`}>
                {result.diagnosis ? t("result.positive") : t("result.negative")}
              </div>
              <div className="text-sm text-zinc-600">{t("result.criteriaCount", { count: result.count } as never)}</div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">{mark(result.waist)} {t("result.criteriaWaist")}</div>
                <div className="flex items-center gap-2">{mark(result.triglycerides)} {t("result.criteriaTrig")}</div>
                <div className="flex items-center gap-2">{mark(result.hdl)} {t("result.criteriaHdl")}</div>
                <div className="flex items-center gap-2">{mark(result.bp)} {t("result.criteriaBp")}</div>
                <div className="flex items-center gap-2">{mark(result.glucose)} {t("result.criteriaGlucose")}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
