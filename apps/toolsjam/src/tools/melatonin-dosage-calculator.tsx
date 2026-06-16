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

type WeightUnit = "kg" | "lbs";
type Purpose = "sleep" | "jet-lag" | "shift-work" | "anxiety";

function calcMelatonin(
  weightRaw: number,
  unit: WeightUnit,
  age: number,
  purpose: Purpose
): { dose: number; classification: string } | null {
  const kg = unit === "lbs" ? weightRaw / 2.2046 : weightRaw;
  if (kg <= 0 || age <= 0) return null;

  const purposeMultiplier: Record<Purpose, number> = {
    sleep: 1.0,
    "jet-lag": 0.8,
    "shift-work": 1.2,
    anxiety: 0.6,
  };

  const baseFactor = age >= 18 ? 0.05 : 0.025;
  let base = kg * baseFactor;
  base = Math.max(0.1, Math.min(10, base));

  let dose = base * purposeMultiplier[purpose];
  dose = Math.max(0.1, Math.min(10, dose));
  dose = Math.round(dose * 10) / 10;

  const classification =
    dose <= 1 ? "low" : dose <= 3 ? "standard" : "high";

  return { dose, classification };
}

export default function MelatoninDosageCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.melatonin-dosage-calculator");

  const [weight, setWeight] = React.useState("");
  const [unit, setUnit] = React.useState<WeightUnit>("kg");
  const [age, setAge] = React.useState("");
  const [purpose, setPurpose] = React.useState<Purpose>("sleep");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);
  const ageNum = parseFloat(age);
  const weightValid = weight !== "" && Number.isFinite(weightNum) && weightNum > 0;
  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum > 0;

  const result = React.useMemo(() => {
    if (!weightValid || !ageValid) return null;
    return calcMelatonin(weightNum, unit, ageNum, purpose);
  }, [weightValid, ageValid, weightNum, unit, ageNum, purpose]);

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
    setWeight("");
    setAge("");
    setUnit("kg");
    setPurpose("sleep");
    setTouched(false);
  }

  const showError = touched && (!weightValid || !ageValid);

  const PURPOSES: Purpose[] = ["sleep", "jet-lag", "shift-work", "anxiety"];

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
              <Label htmlFor="mel-weight">{t("field.weight")}</Label>
              <div className="flex gap-2">
                <Input
                  id="mel-weight"
                  type="number"
                  inputMode="decimal"
                  value={weight}
                  placeholder="70"
                  onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
                  className="flex-1"
                />
                <select
                  value={unit}
                  onChange={(e) => { setUnit(e.target.value as WeightUnit); setTouched(true); }}
                  className="border rounded-md px-3 py-2 text-sm"
                >
                  <option value="kg">{t("type.kg")}</option>
                  <option value="lbs">{t("type.lbs")}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mel-age">{t("field.age")}</Label>
              <Input
                id="mel-age"
                type="number"
                inputMode="numeric"
                value={age}
                placeholder="30"
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mel-purpose">{t("field.purpose")}</Label>
            <select
              id="mel-purpose"
              value={purpose}
              onChange={(e) => { setPurpose(e.target.value as Purpose); setTouched(true); }}
              className="border rounded-md px-3 py-2 text-sm w-full"
            >
              {PURPOSES.map((p) => (
                <option key={p} value={p}>{t(`type.${p}` as never)}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {result.dose} mg
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.label")}: <span className="font-medium capitalize">{t(`result.${result.classification}` as never)}</span>
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
