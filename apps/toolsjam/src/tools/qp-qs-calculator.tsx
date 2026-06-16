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

type QsCategory = "poor" | "fair" | "good" | "veryGood" | "excellent";

interface QpQsResult {
  qp: number;
  physicalScore: number;
  mentalScore: number;
  socialScore: number;
  category: QsCategory;
}

function computeQpQs(
  physical: number,
  mental: number,
  social: number,
  pain: number,
  energy: number,
  sleep: number,
  daily: number,
  satisfaction: number,
): QpQsResult | null {
  const inputs = [physical, mental, social, pain, energy, sleep, daily, satisfaction];
  if (inputs.some((v) => !Number.isFinite(v) || v < 0 || v > 10)) return null;
  const physicalScore = (physical + energy + (10 - pain) + sleep + daily) / 5;
  const mentalScore = (mental + satisfaction) / 2;
  const socialScore = social;
  const qp = Math.round(((physicalScore + mentalScore + socialScore) / 3) * 10);
  let category: QsCategory;
  if (qp < 40) category = "poor";
  else if (qp < 60) category = "fair";
  else if (qp < 75) category = "good";
  else if (qp < 90) category = "veryGood";
  else category = "excellent";
  return { qp, physicalScore, mentalScore, socialScore, category };
}

const GENDERS = ["male", "female", "other"] as const;
type Gender = (typeof GENDERS)[number];

export default function QpQsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.qp-qs-calculator");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [physical, setPhysical] = React.useState("");
  const [mental, setMental] = React.useState("");
  const [social, setSocial] = React.useState("");
  const [pain, setPain] = React.useState("");
  const [energy, setEnergy] = React.useState("");
  const [sleep, setSleep] = React.useState("");
  const [daily, setDaily] = React.useState("");
  const [satisfaction, setSatisfaction] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<QpQsResult | null>(() => {
    if (!touched) return null;
    return computeQpQs(
      parseFloat(physical),
      parseFloat(mental),
      parseFloat(social),
      parseFloat(pain),
      parseFloat(energy),
      parseFloat(sleep),
      parseFloat(daily),
      parseFloat(satisfaction),
    );
  }, [touched, physical, mental, social, pain, energy, sleep, daily, satisfaction]);

  const showError = touched && result === null;

  function reset() {
    setAge("");
    setGender("male");
    setPhysical("");
    setMental("");
    setSocial("");
    setPain("");
    setEnergy("");
    setSleep("");
    setDaily("");
    setSatisfaction("");
    setTouched(false);
  }

  function loadExample(
    a: string, g: Gender, ph: string, me: string, so: string,
    pa: string, en: string, sl: string, da: string, sa: string,
  ) {
    setAge(a); setGender(g); setPhysical(ph); setMental(me);
    setSocial(so); setPain(pa); setEnergy(en); setSleep(sl);
    setDaily(da); setSatisfaction(sa); setTouched(true);
  }

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

  const selectClass =
    "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none";

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
              <Label htmlFor="qpqs-age">{t("field.age")}</Label>
              <Input
                id="qpqs-age"
                type="number"
                inputMode="numeric"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qpqs-gender">{t("field.gender")}</Label>
              <select
                id="qpqs-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className={selectClass}
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {t(`option.${g}` as never)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="qpqs-physical">{t("field.physical")}</Label>
              <Input
                id="qpqs-physical"
                type="number"
                inputMode="decimal"
                min="1" max="10"
                value={physical}
                placeholder={t("placeholder.rating")}
                onChange={(e) => { setPhysical(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qpqs-mental">{t("field.mental")}</Label>
              <Input
                id="qpqs-mental"
                type="number"
                inputMode="decimal"
                min="1" max="10"
                value={mental}
                placeholder={t("placeholder.rating")}
                onChange={(e) => { setMental(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qpqs-social">{t("field.social")}</Label>
              <Input
                id="qpqs-social"
                type="number"
                inputMode="decimal"
                min="1" max="10"
                value={social}
                placeholder={t("placeholder.rating")}
                onChange={(e) => { setSocial(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qpqs-pain">{t("field.pain")}</Label>
              <Input
                id="qpqs-pain"
                type="number"
                inputMode="decimal"
                min="0" max="10"
                value={pain}
                placeholder={t("placeholder.pain")}
                onChange={(e) => { setPain(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qpqs-energy">{t("field.energy")}</Label>
              <Input
                id="qpqs-energy"
                type="number"
                inputMode="decimal"
                min="1" max="10"
                value={energy}
                placeholder={t("placeholder.rating")}
                onChange={(e) => { setEnergy(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qpqs-sleep">{t("field.sleep")}</Label>
              <Input
                id="qpqs-sleep"
                type="number"
                inputMode="decimal"
                min="1" max="10"
                value={sleep}
                placeholder={t("placeholder.rating")}
                onChange={(e) => { setSleep(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qpqs-daily">{t("field.daily")}</Label>
              <Input
                id="qpqs-daily"
                type="number"
                inputMode="decimal"
                min="1" max="10"
                value={daily}
                placeholder={t("placeholder.rating")}
                onChange={(e) => { setDaily(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qpqs-satisfaction">{t("field.satisfaction")}</Label>
              <Input
                id="qpqs-satisfaction"
                type="number"
                inputMode="decimal"
                min="1" max="10"
                value={satisfaction}
                placeholder={t("placeholder.rating")}
                onChange={(e) => { setSatisfaction(e.target.value); setTouched(true); }}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.qp")}: {result.qp}/100
              </div>
              <div className="grid gap-2 sm:grid-cols-3 text-sm text-zinc-700">
                <div>
                  {t("result.physicalScore")}:{" "}
                  <span className="font-medium">{result.physicalScore.toFixed(1)}/10</span>
                </div>
                <div>
                  {t("result.mentalScore")}:{" "}
                  <span className="font-medium">{result.mentalScore.toFixed(1)}/10</span>
                </div>
                <div>
                  {t("result.socialScore")}:{" "}
                  <span className="font-medium">{result.socialScore.toFixed(1)}/10</span>
                </div>
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.category")}:{" "}
                <span className="font-semibold">
                  {t(`category.${result.category}` as never)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
            onClick={() => loadExample("28", "female", "8", "9", "8", "2", "8", "7", "9", "8")}
          >
            {t("examples.loadHealthy")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("45", "male", "5", "6", "7", "6", "4", "5", "6", "6")}
          >
            {t("examples.loadChronic")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("35", "male", "7", "4", "5", "3", "4", "4", "6", "5")}
          >
            {t("examples.loadMentalFocus")}
          </Button>
        </div>
      </section>

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
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
