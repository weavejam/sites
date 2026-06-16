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

function formatNumber(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

function classifyGl(value: number): "low" | "medium" | "high" {
  if (value < 10) return "low";
  if (value < 20) return "medium";
  return "high";
}

function impactFromCategory(category: "low" | "medium" | "high") {
  if (category === "low") return "minimal";
  if (category === "medium") return "moderate";
  return "significant";
}

export default function GlycemicLoadCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.glycemic-load-calculator");
  const [foodName, setFoodName] = React.useState("");
  const [glycemicIndex, setGlycemicIndex] = React.useState("");
  const [carbohydrates, setCarbohydrates] = React.useState("");
  const [servingSize, setServingSize] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;

    const gi = parseFloat(glycemicIndex);
    const carbs = parseFloat(carbohydrates);

    if (
      !Number.isFinite(gi) ||
      !Number.isFinite(carbs) ||
      gi < 0 ||
      gi > 100 ||
      carbs <= 0
    ) {
      return { error: true as const };
    }

    const glycemicLoad = (gi * carbs) / 100;
    const category = classifyGl(glycemicLoad);

    return {
      foodName: foodName.trim() || t("result.defaultFoodName"),
      glycemicLoad,
      category,
      impact: impactFromCategory(category),
      servingSize: servingSize.trim(),
      gi,
      carbs,
    };
  }, [carbohydrates, foodName, glycemicIndex, servingSize, t, touched]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesPresets = React.useMemo(() => {
    const raw = t.raw("examples.presets") as Array<{ label: string; name: string; gi: string; carbs: string; serving: string }> | undefined;
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
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  function reset() {
    setFoodName("");
    setGlycemicIndex("");
    setCarbohydrates("");
    setServingSize("");
    setTouched(false);
  }

  function loadExample(food: {
    name: string;
    gi: string;
    carbs: string;
    serving: string;
  }) {
    setFoodName(food.name);
    setGlycemicIndex(food.gi);
    setCarbohydrates(food.carbs);
    setServingSize(food.serving);
    setTouched(true);
  }

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
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="gl-food-name">{t("field.foodName")}</Label>
              <Input
                id="gl-food-name"
                value={foodName}
                placeholder={t("placeholder.foodName")}
                onChange={(e) => {
                  setFoodName(e.target.value);
                  setTouched(false);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gl-gi">{t("field.glycemicIndex")}</Label>
              <Input
                id="gl-gi"
                type="number"
                inputMode="decimal"
                value={glycemicIndex}
                placeholder={t("placeholder.glycemicIndex")}
                onChange={(e) => {
                  setGlycemicIndex(e.target.value);
                  setTouched(false);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gl-carbs">{t("field.carbohydrates")}</Label>
              <Input
                id="gl-carbs"
                type="number"
                inputMode="decimal"
                value={carbohydrates}
                placeholder={t("placeholder.carbohydrates")}
                onChange={(e) => {
                  setCarbohydrates(e.target.value);
                  setTouched(false);
                }}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="gl-serving">{t("field.servingSize")}</Label>
              <Input
                id="gl-serving"
                value={servingSize}
                placeholder={t("placeholder.servingSize")}
                onChange={(e) => {
                  setServingSize(e.target.value);
                  setTouched(false);
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

          {result && "error" in result && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && !("error" in result) && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.glycemicLoad")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNumber(result.glycemicLoad)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.category")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t(`classification.category.${result.category}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.impact")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t(`classification.impact.${result.impact}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.food")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.foodName}
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-sm text-zinc-600">
                <p>
                  {t("result.summary", {
                    gi: formatNumber(result.gi),
                    carbs: formatNumber(result.carbs),
                  })}
                </p>
                {result.servingSize ? <p>{t("result.serving", { serving: result.servingSize })}</p> : null}
                <p className="text-xs text-zinc-500">{t("formula")}</p>
              </div>
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{item.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {examplesPresets.map((preset) => (
            <Button
              key={preset.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample({ name: preset.name, gi: preset.gi, carbs: preset.carbs, serving: preset.serving })}
            >
              {t(`examples.${preset.label}` as never)}
            </Button>
          ))}
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
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
