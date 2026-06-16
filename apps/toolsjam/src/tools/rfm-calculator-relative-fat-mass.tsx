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

type Gender = "male" | "female" | "";
type HealthCategory = "veryLow" | "low" | "normal" | "high" | "veryHigh";

interface RFMResult {
  rfm: number;
  category: HealthCategory;
}

function computeRFM(gender: "male" | "female", height: number, waist: number): RFMResult {
  const rfm =
    gender === "male"
      ? 64 - 20 * (height / waist)
      : 76 - 20 * (height / waist);

  let category: HealthCategory;
  if (gender === "male") {
    if (rfm < 8) category = "veryLow";
    else if (rfm < 13) category = "low";
    else if (rfm < 25) category = "normal";
    else if (rfm < 35) category = "high";
    else category = "veryHigh";
  } else {
    if (rfm < 13) category = "veryLow";
    else if (rfm < 21) category = "low";
    else if (rfm < 33) category = "normal";
    else if (rfm < 43) category = "high";
    else category = "veryHigh";
  }

  return { rfm, category };
}

const SELECT_CLASS =
  "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none";

export default function RFMCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.rfm-calculator-relative-fat-mass");

  const [gender, setGender] = React.useState<Gender>("");
  const [height, setHeight] = React.useState("");
  const [waist, setWaist] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const heightNum = parseFloat(height);
  const waistNum = parseFloat(waist);

  const isValid =
    gender !== "" &&
    Number.isFinite(heightNum) &&
    heightNum >= 100 &&
    heightNum <= 250 &&
    Number.isFinite(waistNum) &&
    waistNum >= 50 &&
    waistNum <= 200;

  const result = React.useMemo<RFMResult | null>(() => {
    if (!isValid) return null;
    const g = gender as "male" | "female";
    return computeRFM(g, heightNum, waistNum);
  }, [isValid, gender, heightNum, waistNum]);

  function loadExample(g: Gender, h: string, w: string) {
    setGender(g);
    setHeight(h);
    setWaist(w);
    setTouched(true);
  }

  function reset() {
    setGender("");
    setHeight("");
    setWaist("");
    setTouched(false);
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="rfm-gender">{t("field.gender")}</Label>
              <select
                id="rfm-gender"
                value={gender}
                onChange={(e) => { setGender(e.target.value as Gender); setTouched(true); }}
                className={SELECT_CLASS}
              >
                <option value="">{t("placeholder.gender")}</option>
                <option value="male">{t("option.male")}</option>
                <option value="female">{t("option.female")}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rfm-height">{t("field.height")}</Label>
              <Input
                id="rfm-height"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rfm-waist">{t("field.waist")}</Label>
              <Input
                id="rfm-waist"
                type="number"
                inputMode="decimal"
                value={waist}
                placeholder={t("placeholder.waist")}
                onChange={(e) => { setWaist(e.target.value); setTouched(true); }}
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

          {touched && !isValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.rfm")}</div>
                  <div className="text-3xl font-bold text-zinc-900">
                    {result.rfm.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.category")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t(`result.category_${result.category}` as never)}
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">
                    {t(`result.category_${result.category}_desc` as never)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">
                {t(`result.formula_${gender === "" ? "male" : gender}` as never)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("male", "175", "85")}
        >
          {t("examples.loadHealthyMale")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("female", "165", "75")}
        >
          {t("examples.loadHealthyFemale")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("male", "180", "78")}
        >
          {t("examples.loadAthleticMale")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("female", "160", "95")}
        >
          {t("examples.loadOverweightFemale")}
        </Button>
      </div>

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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
