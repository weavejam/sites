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

interface FoodItem {
  id: number;
  name: string;
  gi: string;
  carbs: string;
  servingSize: string;
  quantity: string;
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

let nextFoodId = 1;

function createFoodItem(values?: Partial<Omit<FoodItem, "id">>): FoodItem {
  return {
    id: nextFoodId++,
    name: "",
    gi: "",
    carbs: "",
    servingSize: "",
    quantity: "1",
    ...values,
  };
}

function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

function classifyGi(value: number): "low" | "medium" | "high" {
  if (value < 55) return "low";
  if (value < 70) return "medium";
  return "high";
}

function classifyGl(value: number): "low" | "medium" | "high" {
  if (value < 10) return "low";
  if (value < 20) return "medium";
  return "high";
}

export default function GlycemicIndexCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.glycemic-index-calculator");
  const [foods, setFoods] = React.useState<FoodItem[]>([createFoodItem()]);
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    if (foods.length === 0) return { error: "needItems" as const };

    let totalCarbs = 0;
    let totalGl = 0;
    let weightedGi = 0;
    let totalWeight = 0;
    let totalServings = 0;

    for (const food of foods) {
      const gi = parseFloat(food.gi);
      const carbs = parseFloat(food.carbs);
      const servingSize = parseFloat(food.servingSize);
      const quantity = parseFloat(food.quantity);

      if (
        !Number.isFinite(gi) ||
        !Number.isFinite(carbs) ||
        !Number.isFinite(servingSize) ||
        !Number.isFinite(quantity) ||
        gi < 0 ||
        gi > 100 ||
        carbs < 0 ||
        servingSize <= 0 ||
        quantity <= 0
      ) {
        return { error: "invalid" as const };
      }

      const mealCarbs = carbs * quantity;
      totalCarbs += mealCarbs;
      weightedGi += gi * mealCarbs;
      totalGl += (gi * mealCarbs) / 100;
      totalWeight += servingSize * quantity;
      totalServings += quantity;
    }

    if (totalCarbs <= 0) return { error: "noCarbs" as const };

    const averageGi = weightedGi / totalCarbs;
    return {
      averageGi,
      giClass: classifyGi(averageGi),
      totalGl,
      glClass: classifyGl(totalGl),
      totalCarbs,
      totalWeight,
      totalServings,
      foodCount: foods.length,
    };
  }, [foods, touched]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesPresets = React.useMemo(() => {
    type FoodPreset = { name: string; gi: string; carbs: string; servingSize: string; quantity: string };
    const raw = t.raw("examples.presets") as Array<{ label: string; foods: FoodPreset[] }> | undefined;
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

  function updateFood(id: number, field: keyof Omit<FoodItem, "id">, value: string) {
    setFoods((prev) => prev.map((food) => (food.id === id ? { ...food, [field]: value } : food)));
    setTouched(false);
  }

  function addFoodItem() {
    setFoods((prev) => [...prev, createFoodItem()]);
    setTouched(false);
  }

  function removeFoodItem(id: number) {
    setFoods((prev) => (prev.length > 1 ? prev.filter((food) => food.id !== id) : prev));
    setTouched(false);
  }

  function reset() {
    setFoods([createFoodItem()]);
    setTouched(false);
  }

  function loadExample(items: Array<Omit<FoodItem, "id">>) {
    setFoods(items.map((item) => createFoodItem(item)));
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
          <div className="space-y-4">
            {foods.map((food, index) => (
              <div
                key={food.id}
                className="space-y-4 rounded-lg border border-zinc-200 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-zinc-900">
                    {t("field.foodItemNumber", { number: index + 1 })}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFoodItem(food.id)}
                    disabled={foods.length <= 1}
                  >
                    {t("button.remove")}
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor={`gi-food-name-${food.id}`}>{t("field.foodName")}</Label>
                    <Input
                      id={`gi-food-name-${food.id}`}
                      value={food.name}
                      placeholder={t("placeholder.foodName")}
                      onChange={(e) => updateFood(food.id, "name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gi-food-gi-${food.id}`}>{t("field.glycemicIndex")}</Label>
                    <Input
                      id={`gi-food-gi-${food.id}`}
                      type="number"
                      inputMode="decimal"
                      value={food.gi}
                      placeholder={t("placeholder.glycemicIndex")}
                      onChange={(e) => updateFood(food.id, "gi", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gi-food-carbs-${food.id}`}>
                      {t("field.carbohydrates")}
                    </Label>
                    <Input
                      id={`gi-food-carbs-${food.id}`}
                      type="number"
                      inputMode="decimal"
                      value={food.carbs}
                      placeholder={t("placeholder.carbohydrates")}
                      onChange={(e) => updateFood(food.id, "carbs", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gi-food-serving-${food.id}`}>{t("field.servingSize")}</Label>
                    <Input
                      id={`gi-food-serving-${food.id}`}
                      type="number"
                      inputMode="decimal"
                      value={food.servingSize}
                      placeholder={t("placeholder.servingSize")}
                      onChange={(e) => updateFood(food.id, "servingSize", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`gi-food-quantity-${food.id}`}>{t("field.quantity")}</Label>
                    <Input
                      id={`gi-food-quantity-${food.id}`}
                      type="number"
                      inputMode="decimal"
                      value={food.quantity}
                      placeholder={t("placeholder.quantity")}
                      onChange={(e) => updateFood(food.id, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="flex items-end text-sm text-zinc-500">
                    <p>{t("field.quantityHint")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={addFoodItem}>
              {t("button.addFoodItem")}
            </Button>
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result && "error" in result && result.error === "needItems" && (
            <p className="text-sm text-red-600">{t("error.needItems")}</p>
          )}
          {result && "error" in result && result.error === "invalid" && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {result && "error" in result && result.error === "noCarbs" && (
            <p className="text-sm text-red-600">{t("error.noCarbs")}</p>
          )}

          {result && !("error" in result) && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.averageGi")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNumber(result.averageGi, 1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.giClassification")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {t(`classification.gi.${result.giClass}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalGl")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNumber(result.totalGl, 1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.glClassification")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t(`classification.gl.${result.glClass}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalCarbs")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.totalCarbs, 1)} {t("unit.grams")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalServingWeight")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.totalWeight, 1)} {t("unit.grams")}
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-sm text-zinc-600">
                <p>
                  {t("result.summary", {
                    foods: result.foodCount,
                    servings: formatNumber(result.totalServings, 1),
                    carbs: formatNumber(result.totalCarbs, 1),
                  })}
                </p>
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
              onClick={() => loadExample(preset.foods)}
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
