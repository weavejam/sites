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

type MedForm = "liquid" | "tablet";

interface CalcResult {
  singleDoseMg: number;
  volumeMl?: number;
  tabletCount?: number;
  maxDailyDoseMg: number;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals).replace(/\.?0+$/, "");
}

export default function ParacetamolDosageCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.paracetamol-dosage-calculator");

  const [weight, setWeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [dosageMgKg, setDosageMgKg] = React.useState("15");
  const [form, setForm] = React.useState<MedForm>("liquid");
  const [concentration, setConcentration] = React.useState("");
  const [tabletStrength, setTabletStrength] = React.useState("");
  const [dosesPerDay, setDosesPerDay] = React.useState("4");
  const [interval, setInterval] = React.useState("6");
  const [touched, setTouched] = React.useState(false);
  const [result, setResult] = React.useState<CalcResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function calculate() {
    setTouched(true);
    const w = parseFloat(weight);
    const mgKg = parseFloat(dosageMgKg);

    if (!Number.isFinite(w) || w <= 0) {
      setError(t("error.weightRequired"));
      setResult(null);
      return;
    }
    if (!Number.isFinite(mgKg) || mgKg <= 0) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }

    // Determine adult vs child (age >= 18 considered adult)
    const ageVal = parseFloat(age);
    const isAdult = Number.isFinite(ageVal) ? ageVal >= 18 : w >= 50;

    const maxSingleDose = isAdult ? 1000 : w * mgKg;
    const calculatedDose = w * mgKg;
    const singleDoseMg = clamp(calculatedDose, 0, maxSingleDose);

    const maxDailyAdult = isAdult ? 4000 : w * 75;
    const maxDailyDoseMg = Math.min(maxDailyAdult, 4000);

    if (form === "liquid") {
      const conc = parseFloat(concentration);
      if (!Number.isFinite(conc) || conc <= 0) {
        setError(t("error.concentrationRequired"));
        setResult(null);
        return;
      }
      setResult({
        singleDoseMg,
        volumeMl: singleDoseMg / conc,
        maxDailyDoseMg,
      });
    } else {
      const strength = parseFloat(tabletStrength);
      if (!Number.isFinite(strength) || strength <= 0) {
        setError(t("error.tabletRequired"));
        setResult(null);
        return;
      }
      setResult({
        singleDoseMg,
        tabletCount: singleDoseMg / strength,
        maxDailyDoseMg,
      });
    }
    setError(null);
  }

  function reset() {
    setWeight("");
    setAge("");
    setDosageMgKg("15");
    setForm("liquid");
    setConcentration("");
    setTabletStrength("");
    setDosesPerDay("4");
    setInterval("6");
    setTouched(false);
    setResult(null);
    setError(null);
  }

  function loadExample(
    w: string,
    a: string,
    f: MedForm,
    conc: string,
    tab: string,
    dpd: string,
    intv: string
  ) {
    setWeight(w);
    setAge(a);
    setDosageMgKg("15");
    setForm(f);
    setConcentration(conc);
    setTabletStrength(tab);
    setDosesPerDay(dpd);
    setInterval(intv);
    setTouched(false);
    setResult(null);
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
              <Label htmlFor="para-weight">{t("field.weight")}</Label>
              <Input
                id="para-weight"
                type="number"
                inputMode="decimal"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="para-age">{t("field.age")}</Label>
              <Input
                id="para-age"
                type="number"
                inputMode="decimal"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="para-mgkg">{t("field.dosageMgKg")}</Label>
              <Input
                id="para-mgkg"
                type="number"
                inputMode="decimal"
                value={dosageMgKg}
                placeholder={t("placeholder.dosageMgKg")}
                onChange={(e) => setDosageMgKg(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.form")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["liquid", "tablet"] as MedForm[]).map((f) => (
                <Button
                  key={f}
                  type="button"
                  variant={form === f ? "default" : "outline"}
                  onClick={() => setForm(f)}
                >
                  {t(`type.${f}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {form === "liquid" ? (
            <div className="space-y-2">
              <Label htmlFor="para-conc">{t("field.concentration")}</Label>
              <Input
                id="para-conc"
                type="number"
                inputMode="decimal"
                value={concentration}
                placeholder={t("placeholder.concentration")}
                onChange={(e) => setConcentration(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="para-tab">{t("field.tabletStrength")}</Label>
              <Input
                id="para-tab"
                type="number"
                inputMode="decimal"
                value={tabletStrength}
                placeholder={t("placeholder.tabletStrength")}
                onChange={(e) => setTabletStrength(e.target.value)}
              />
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="para-dpd">{t("field.dosesPerDay")}</Label>
              <Input
                id="para-dpd"
                type="number"
                inputMode="numeric"
                value={dosesPerDay}
                placeholder={t("placeholder.dosesPerDay")}
                onChange={(e) => setDosesPerDay(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="para-intv">{t("field.interval")}</Label>
              <Input
                id="para-intv"
                type="number"
                inputMode="decimal"
                value={interval}
                placeholder={t("placeholder.interval")}
                onChange={(e) => setInterval(e.target.value)}
              />
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

          {error && touched && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {result && !error && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.singleDoseMg")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.singleDoseMg)} {t("result.unitMg")}
                  </div>
                </div>
                {result.volumeMl !== undefined && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.volumeMl")}</span>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt(result.volumeMl)} {t("result.unitMl")}
                    </div>
                  </div>
                )}
                {result.tabletCount !== undefined && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.tabletCount")}</span>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt(result.tabletCount)} {t("result.unitTablets")}
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-xs text-zinc-500">{t("result.maxDailyDoseMg")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.maxDailyDoseMg, 0)} {t("result.unitMg")}
                  </div>
                </div>
              </div>
              <p className="text-xs text-amber-700 mt-2">{t("result.caution")}</p>
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
            onClick={() => loadExample("20", "7", "liquid", "32", "", "4", "6")}
          >
            {t("examples.loadChildLiquid")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("30", "10", "tablet", "", "500", "3", "6")}
          >
            {t("examples.loadChildTablet")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("70", "25", "tablet", "", "500", "4", "6")}
          >
            {t("examples.loadAdultTablet")}
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
