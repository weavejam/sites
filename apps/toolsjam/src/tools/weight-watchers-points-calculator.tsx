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

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * SmartPoints formula (approximate):
 * SP = (calories / 33) + (saturatedFat / 9) + (sugar / 10) - (protein / 10.9)
 * Rounded to nearest whole number, min 0.
 *
 * PointsPlus formula (approximate):
 * PP = (protein * 0.0758) + (carbs * 0.0103) + (fat * 0.0453) - (fiber * 0.0831)
 * We don't have fiber input, so simplify.
 */
function calcSmartPoints(calories: number, satFat: number, sugar: number, protein: number): number {
  const sp = (calories / 33) + (satFat / 9) + (sugar / 10) - (protein / 10.9);
  return Math.max(0, Math.round(sp));
}

function calcPointsPlus(calories: number, satFat: number, sugar: number, protein: number): number {
  // Approximate: total fat from satFat*1.5 (heuristic), carbs from (calories - protein*4 - satFat*1.5*9)/4
  const estimatedCarbs = Math.max(0, (calories - protein * 4 - satFat * 1.5 * 9) / 4);
  const estimatedFat = satFat * 1.5;
  const pp = protein * 0.0758 + estimatedCarbs * 0.0103 + estimatedFat * 0.0453 + sugar * 0.01;
  return Math.max(0, Math.round(pp));
}

function calcDailyAllowance(age: number, gender: string, heightCm: number, weightKg: number, activity: string): number {
  // Base ~23 points, adjust for demographics
  let base = 23;
  if (gender === "male") base += 4;
  if (age < 25) base += 2;
  else if (age > 50) base -= 2;
  if (heightCm > 170) base += 2;
  else if (heightCm < 160) base -= 1;
  if (weightKg > 100) base += 4;
  else if (weightKg > 80) base += 2;
  else if (weightKg < 60) base -= 1;
  const activityBonus: Record<string, number> = { sedentary: 0, light: 2, moderate: 4, active: 6, veryActive: 8 };
  base += activityBonus[activity] ?? 0;
  return Math.max(18, base);
}

export default function WeightWatchersPointsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.weight-watchers-points-calculator");

  const [calories, setCalories] = React.useState("");
  const [satFat, setSatFat] = React.useState("");
  const [sugar, setSugar] = React.useState("");
  const [protein, setProtein] = React.useState("");
  const [pointsSystem, setPointsSystem] = React.useState<"smartpoints" | "pointsplus">("smartpoints");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "">("");
  const [heightCm, setHeightCm] = React.useState("");
  const [weightKg, setWeightKg] = React.useState("");
  const [activity, setActivity] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    const cal = parseFloat(calories);
    const sf = parseFloat(satFat);
    const sg = parseFloat(sugar);
    const pr = parseFloat(protein);
    if (
      !calories || !satFat || !sugar || !protein ||
      !Number.isFinite(cal) || !Number.isFinite(sf) || !Number.isFinite(sg) || !Number.isFinite(pr) ||
      cal < 0 || sf < 0 || sg < 0 || pr < 0
    ) return null;

    const pointsValue = pointsSystem === "smartpoints"
      ? calcSmartPoints(cal, sf, sg, pr)
      : calcPointsPlus(cal, sf, sg, pr);

    const a = parseFloat(age);
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    let dailyAllowance: number | null = null;
    if (gender && activity && Number.isFinite(a) && Number.isFinite(h) && Number.isFinite(w) && a > 0 && h > 0 && w > 0) {
      dailyAllowance = calcDailyAllowance(a, gender, h, w, activity);
    }

    return { pointsValue, dailyAllowance, weeklyAllowance: 49 };
  }, [calories, satFat, sugar, protein, pointsSystem, age, gender, heightCm, weightKg, activity]);

  function reset() {
    setCalories("");
    setSatFat("");
    setSugar("");
    setProtein("");
    setPointsSystem("smartpoints");
    setAge("");
    setGender("");
    setHeightCm("");
    setWeightKg("");
    setActivity("");
    setTouched(false);
  }

  function loadExample(cal: string, sf: string, sg: string, pr: string, ps: "smartpoints" | "pointsplus") {
    setCalories(cal);
    setSatFat(sf);
    setSugar(sg);
    setProtein(pr);
    setPointsSystem(ps);
    setTouched(true);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
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

  const hasError = touched && !result;
  const activityOptions = ["sedentary", "light", "moderate", "active", "veryActive"] as const;
  const genderOptions = ["male", "female"] as const;

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
          <div className="space-y-2">
            <Label>{t("field.pointsSystem")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["smartpoints", "pointsplus"] as const).map((sys) => (
                <Button
                  key={sys}
                  type="button"
                  variant={pointsSystem === sys ? "default" : "outline"}
                  onClick={() => setPointsSystem(sys)}
                >
                  {t(`type.pointsSystem.${sys}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wwp-cal">{t("field.calories")}</Label>
              <Input
                id="wwp-cal"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.calories")}
                value={calories}
                onChange={(e) => { setCalories(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wwp-sf">{t("field.saturatedFat")}</Label>
              <Input
                id="wwp-sf"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.grams")}
                value={satFat}
                onChange={(e) => { setSatFat(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wwp-sg">{t("field.sugar")}</Label>
              <Input
                id="wwp-sg"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.grams")}
                value={sugar}
                onChange={(e) => { setSugar(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wwp-pr">{t("field.protein")}</Label>
              <Input
                id="wwp-pr"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.grams")}
                value={protein}
                onChange={(e) => { setProtein(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <details className="rounded-lg border border-zinc-200 p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-700">{t("field.optionalAllowance")}</summary>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="space-y-2">
                <Label htmlFor="wwp-age">{t("field.age")}</Label>
                <Input id="wwp-age" type="number" inputMode="numeric" placeholder={t("placeholder.age")} value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wwp-gender">{t("field.gender")}</Label>
                <select id="wwp-gender" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  value={gender} onChange={(e) => setGender(e.target.value as "male" | "female" | "")}>
                  <option value="">{t("placeholder.select")}</option>
                  {genderOptions.map((g) => <option key={g} value={g}>{t(`type.gender.${g}` as never)}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wwp-h">{t("field.height")}</Label>
                <Input id="wwp-h" type="number" inputMode="decimal" placeholder={t("placeholder.height")} value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wwp-w">{t("field.weight")}</Label>
                <Input id="wwp-w" type="number" inputMode="decimal" placeholder={t("placeholder.weight")} value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="wwp-act">{t("field.activityLevel")}</Label>
                <select id="wwp-act" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  value={activity} onChange={(e) => setActivity(e.target.value)}>
                  <option value="">{t("placeholder.select")}</option>
                  {activityOptions.map((a) => <option key={a} value={a}>{t(`type.activity.${a}` as never)}</option>)}
                </select>
              </div>
            </div>
          </details>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {hasError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.pointsValue")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{result.pointsValue} <span className="text-sm font-normal">{t("unit.points")}</span></div>
                </div>
                {result.dailyAllowance !== null && (
                  <>
                    <div>
                      <div className="text-xs text-zinc-500">{t("result.dailyAllowance")}</div>
                      <div className="text-2xl font-semibold">{result.dailyAllowance} <span className="text-sm font-normal">{t("unit.points")}</span></div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">{t("result.weeklyAllowance")}</div>
                      <div className="text-2xl font-semibold">{result.weeklyAllowance} <span className="text-sm font-normal">{t("unit.points")}</span></div>
                    </div>
                  </>
                )}
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
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("180", "1.5", "8", "25", "smartpoints")}>
            {t("examples.loadLow")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("350", "4.2", "15", "18", "smartpoints")}>
            {t("examples.loadMedium")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("520", "8", "22", "12", "smartpoints")}>
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
