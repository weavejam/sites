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
type Race = "nonAfricanAmerican" | "africanAmerican";
type StageKey = "g1" | "g2" | "g3a" | "g3b" | "g4" | "g5";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const SELECT_CLASS =
  "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none";

function formatNumber(value: number, maximumFractionDigits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

function getStageKey(value: number): StageKey {
  if (value >= 90) return "g1";
  if (value >= 60) return "g2";
  if (value >= 45) return "g3a";
  if (value >= 30) return "g3b";
  if (value >= 15) return "g4";
  return "g5";
}

export default function GfrCalculatorEstimatedGlomerularFiltrationRate(
  _props: { locale: Locale },
) {
  const t = useTranslations(
    "tool.gfr-calculator-estimated-glomerular-filtration-rate",
  );

  const [serumCreatinine, setSerumCreatinine] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [race, setRace] = React.useState<Race>("nonAfricanAmerican");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const scrNum = Number.parseFloat(serumCreatinine);
  const ageNum = Number.parseFloat(age);
  const weightNum = Number.parseFloat(weight);
  const heightNum = Number.parseFloat(height);

  const scrValid = Number.isFinite(scrNum) && scrNum > 0;
  const ageValid = Number.isFinite(ageNum) && ageNum > 0 && ageNum <= 120;
  const weightBlank = weight.trim() === "";
  const heightBlank = height.trim() === "";
  const weightValid = weightBlank || (Number.isFinite(weightNum) && weightNum > 0);
  const heightValid = heightBlank || (Number.isFinite(heightNum) && heightNum > 0);

  const result = React.useMemo(() => {
    if (!scrValid || !ageValid || !weightValid || !heightValid) return null;

    const ckdEpi =
      gender === "female"
        ? 142 *
          Math.pow(Math.min(scrNum / 0.7, 1), -0.241) *
          Math.pow(Math.max(scrNum / 0.7, 1), -1.2) *
          Math.pow(0.9938, ageNum) *
          1.012
        : 142 *
          Math.pow(Math.min(scrNum / 0.9, 1), -0.302) *
          Math.pow(Math.max(scrNum / 0.9, 1), -1.2) *
          Math.pow(0.9938, ageNum);

    const mdrd =
      175 *
      Math.pow(scrNum, -1.154) *
      Math.pow(ageNum, -0.203) *
      (gender === "female" ? 0.742 : 1) *
      (race === "africanAmerican" ? 1.212 : 1);

    const cockcroftGault =
      !weightBlank && Number.isFinite(weightNum)
        ? (((140 - ageNum) * weightNum) / (72 * scrNum)) *
          (gender === "female" ? 0.85 : 1)
        : null;

    const bmi =
      !weightBlank &&
      !heightBlank &&
      Number.isFinite(weightNum) &&
      Number.isFinite(heightNum)
        ? weightNum / Math.pow(heightNum / 100, 2)
        : null;

    return {
      ckdEpi,
      mdrd,
      cockcroftGault,
      bmi,
      stage: getStageKey(ckdEpi),
    };
  }, [
    ageNum,
    ageValid,
    gender,
    heightBlank,
    heightNum,
    heightValid,
    race,
    scrNum,
    scrValid,
    weightBlank,
    weightNum,
    weightValid,
  ]);

  const errorMessage = React.useMemo(() => {
    if (!touched) return null;
    if (!scrValid) return t("error.invalidCreatinine");
    if (!ageValid) return t("error.invalidAge");
    if (!weightValid) return t("error.invalidWeight");
    if (!heightValid) return t("error.invalidHeight");
    return null;
  }, [ageValid, heightValid, scrValid, t, touched, weightValid]);

  function reset() {
    setSerumCreatinine("");
    setAge("");
    setGender("male");
    setRace("nonAfricanAmerican");
    setWeight("");
    setHeight("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
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
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gfr-creatinine">{t("field.serumCreatinine")}</Label>
              <Input
                id="gfr-creatinine"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                value={serumCreatinine}
                placeholder={t("placeholder.serumCreatinine")}
                onChange={(event) => {
                  setSerumCreatinine(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gfr-age">{t("field.age")}</Label>
              <Input
                id="gfr-age"
                type="number"
                inputMode="numeric"
                min={0}
                step="1"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(event) => {
                  setAge(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gfr-gender">{t("field.gender")}</Label>
              <select
                id="gfr-gender"
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value as Gender);
                  setTouched(true);
                }}
                className={SELECT_CLASS}
              >
                <option value="male">{t("option.male")}</option>
                <option value="female">{t("option.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gfr-race">{t("field.race")}</Label>
              <select
                id="gfr-race"
                value={race}
                onChange={(event) => {
                  setRace(event.target.value as Race);
                  setTouched(true);
                }}
                className={SELECT_CLASS}
              >
                <option value="nonAfricanAmerican">
                  {t("option.nonAfricanAmerican")}
                </option>
                <option value="africanAmerican">
                  {t("option.africanAmerican")}
                </option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gfr-weight">{t("field.weight")}</Label>
              <Input
                id="gfr-weight"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(event) => {
                  setWeight(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gfr-height">{t("field.height")}</Label>
              <Input
                id="gfr-height"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(event) => {
                  setHeight(event.target.value);
                  setTouched(true);
                }}
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

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          {result && !errorMessage && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.ckdEpi")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNumber(result.ckdEpi)}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {t("result.ckdEpiUnit")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.mdrd")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNumber(result.mdrd)}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {t("result.mdrdUnit")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.cockcroftGault")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.cockcroftGault === null
                      ? t("result.unavailable")
                      : formatNumber(result.cockcroftGault)}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {result.cockcroftGault === null
                      ? t("result.weightNeeded")
                      : t("result.cockcroftUnit")}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.stage")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t(`stage.${result.stage}` as never)}
                  </div>
                  {result.bmi !== null && (
                    <div className="mt-2 text-xs text-zinc-500">
                      {t("result.bmiValue", { bmi: formatNumber(result.bmi) })}
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-3 text-xs text-zinc-500">{t("result.note")}</p>
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {item.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
