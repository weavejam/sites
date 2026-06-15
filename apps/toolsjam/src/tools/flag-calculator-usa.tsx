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

type UnitType = "inches" | "feet" | "cm" | "meters";
const UNITS: UnitType[] = ["inches", "feet", "cm", "meters"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(4).replace(/\.?0+$/, "");
}

function calcFlag(width: number, stars: number) {
  // Official US flag proportions per Executive Order 10834
  // All proportions are relative to hoist (height = A = 1.0)
  // Fly (width) B = 1.9 × A  →  height = width / 1.9
  const height = width / 1.9; // hoist A
  // Union fly (D) = 0.76 × A  →  union width
  const unionWidth = height * 0.76;
  // Union hoist (C) = 7/13 × A  →  union height
  const unionHeight = height * (7 / 13);
  const stripeWidth = height / 13;
  const starDiameter = height * 0.0616;

  // Star spacing: 50-star pattern uses 6 rows of 5 + 4 rows of 4 staggered
  const starRows = stars === 50 ? 9 : stars === 48 ? 8 : Math.ceil(Math.sqrt(stars));
  const starSpacingH = unionWidth / (starRows === 9 ? 6 : Math.ceil(Math.sqrt(stars)) + 1);
  const starSpacingV = unionHeight / (starRows + 1);

  return {
    height,
    unionWidth,
    unionHeight,
    stripeWidth,
    starDiameter,
    starSpacingH,
    starSpacingV,
  };
}

export default function FlagCalculatorUSA(_props: { locale: Locale }) {
  const t = useTranslations("tool.flag-calculator-usa");

  const [width, setWidth] = React.useState("");
  const [stars, setStars] = React.useState("50");
  const [unit, setUnit] = React.useState<UnitType>("inches");
  const [touched, setTouched] = React.useState(false);

  const widthNum = parseFloat(width);
  const starsNum = parseInt(stars, 10);

  const valid =
    width !== "" && Number.isFinite(widthNum) && widthNum > 0 &&
    stars !== "" && Number.isFinite(starsNum) && starsNum >= 1 && starsNum <= 100;

  const result = React.useMemo(() => {
    if (!valid) return null;
    return calcFlag(widthNum, starsNum);
  }, [valid, widthNum, starsNum]);

  function loadExample(w: string, s: string, u: UnitType) {
    setWidth(w);
    setStars(s);
    setUnit(u);
    setTouched(true);
  }

  function reset() {
    setWidth("");
    setStars("50");
    setUnit("inches");
    setTouched(false);
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
        applicationCategory: "UtilitiesApplication",
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
          <div className="space-y-2">
            <Label>{t("field.unit")}</Label>
            <div className="flex flex-wrap gap-2">
              {UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={unit === u ? "default" : "outline"}
                  onClick={() => { setUnit(u); setTouched(false); }}
                >
                  {t(`type.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="flag-width">{t("field.width")} ({t(`type.${unit}` as never)})</Label>
              <Input
                id="flag-width"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={width}
                placeholder={t("placeholder.width")}
                onChange={(e) => { setWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flag-stars">{t("field.stars")}</Label>
              <Input
                id="flag-stars"
                type="number"
                inputMode="numeric"
                min="1"
                max="100"
                step="1"
                value={stars}
                placeholder="50"
                onChange={(e) => { setStars(e.target.value); setTouched(true); }}
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

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2 mt-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.height")}:</span>{" "}
                  <span className="font-semibold text-zinc-900">
                    {fmt(result.height)} {t(`type.${unit}` as never)}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.unionWidth")}:</span>{" "}
                  <span className="font-semibold text-zinc-900">
                    {fmt(result.unionWidth)} {t(`type.${unit}` as never)}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.unionHeight")}:</span>{" "}
                  <span className="font-semibold text-zinc-900">
                    {fmt(result.unionHeight)} {t(`type.${unit}` as never)}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.stripeWidth")}:</span>{" "}
                  <span className="font-semibold text-zinc-900">
                    {fmt(result.stripeWidth)} {t(`type.${unit}` as never)}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.starDiameter")}:</span>{" "}
                  <span className="font-semibold text-zinc-900">
                    {fmt(result.starDiameter)} {t(`type.${unit}` as never)}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.ratio")}:</span>{" "}
                  <span className="font-semibold text-zinc-900">
                    1.9:1
                  </span>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("60", "50", "inches")}>
            {t("examples.loadStandard")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("96", "50", "inches")}>
            {t("examples.loadLarge")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("48", "48", "inches")}>
            {t("examples.loadHistorical")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
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
