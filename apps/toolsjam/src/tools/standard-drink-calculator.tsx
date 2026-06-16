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

const DRINK_TYPES = ["beer", "wine", "spirit", "cocktail", "other"] as const;
const GENDERS = ["male", "female"] as const;

export default function StandardDrinkCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.standard-drink-calculator");

  const [volume, setVolume] = React.useState("");
  const [abv, setAbv] = React.useState("");
  const [drinkType, setDrinkType] = React.useState<string>("beer");
  const [weight, setWeight] = React.useState("");
  const [gender, setGender] = React.useState<string>("male");
  const [time, setTime] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const volNum = parseFloat(volume);
  const abvNum = parseFloat(abv);
  const weightNum = parseFloat(weight);
  const timeNum = parseFloat(time);

  const allValid = [volNum, abvNum, weightNum, timeNum].every(
    (n) => !isNaN(n) && isFinite(n) && n >= 0
  ) && abvNum <= 100 && weightNum > 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const pureAlcohol = volNum * (abvNum / 100) * 0.789; // grams
    const standardDrinksUS = pureAlcohol / 14;
    const alcoholUnitsUK = (volNum * abvNum) / 1000;
    const calories = pureAlcohol * 7;
    const r = gender === "male" ? 0.68 : 0.55;
    const bacRaw = (pureAlcohol * 0.1) / (weightNum * r) - 0.015 * timeNum;
    const bac = Math.max(0, bacRaw);
    let statusKey: string;
    if (bac < 0.05) statusKey = "status.safe";
    else if (bac < 0.08) statusKey = "status.caution";
    else if (bac < 0.15) statusKey = "status.risky";
    else statusKey = "status.dangerous";
    return { pureAlcohol, standardDrinksUS, alcoholUnitsUK, calories, bac, statusKey };
  }, [allValid, volNum, abvNum, weightNum, timeNum, gender]);

  function reset() {
    setVolume(""); setAbv(""); setDrinkType("beer"); setWeight("");
    setGender("male"); setTime(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
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
              <Label htmlFor="sd-volume">{t("field.volume")}</Label>
              <Input id="sd-volume" type="number" inputMode="decimal" value={volume}
                placeholder={t("placeholder.volume")}
                onChange={(e) => { setVolume(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sd-abv">{t("field.abv")}</Label>
              <Input id="sd-abv" type="number" inputMode="decimal" value={abv}
                placeholder={t("placeholder.abv")}
                onChange={(e) => { setAbv(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sd-type">{t("field.drinkType")}</Label>
              <select id="sd-type" value={drinkType}
                onChange={(e) => { setDrinkType(e.target.value); setTouched(true); }}
                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none">
                {DRINK_TYPES.map((dt) => (
                  <option key={dt} value={dt}>{t(`option.${dt}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sd-weight">{t("field.weight")}</Label>
              <Input id="sd-weight" type="number" inputMode="decimal" value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sd-gender">{t("field.gender")}</Label>
              <select id="sd-gender" value={gender}
                onChange={(e) => { setGender(e.target.value); setTouched(true); }}
                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none">
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{t(`option.${g}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sd-time">{t("field.time")}</Label>
              <Input id="sd-time" type="number" inputMode="decimal" value={time}
                placeholder={t("placeholder.time")}
                onChange={(e) => { setTime(e.target.value); setTouched(true); }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [t("result.pureAlcohol"), `${result.pureAlcohol.toFixed(1)} ${t("result.unitG")}`],
                  [t("result.standardDrinks"), result.standardDrinksUS.toFixed(2)],
                  [t("result.alcoholUnits"), result.alcoholUnitsUK.toFixed(2)],
                  [t("result.estimatedBac"), `${result.bac.toFixed(3)} ${t("result.unitPercent")}`],
                  [t("result.calories"), `${result.calories.toFixed(0)} ${t("result.unitKcal")}`],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded border border-zinc-200 bg-white p-3">
                    <div className="text-xs text-zinc-500">{label}</div>
                    <div className="text-lg font-semibold text-zinc-900">{value}</div>
                  </div>
                ))}
              </div>
              <div className="rounded border border-zinc-300 bg-white p-3 text-sm text-zinc-700">
                <span className="font-semibold">{t("result.healthStatus")}: </span>
                {t(result.statusKey as never)}
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (<li key={i}>{s}</li>))}
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
