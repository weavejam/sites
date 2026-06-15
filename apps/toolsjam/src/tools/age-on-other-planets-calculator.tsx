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

type Planet =
  | "Mercury"
  | "Venus"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune";

const PLANETS: Planet[] = [
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

// Sidereal orbital periods in Earth years
const ORBITAL_PERIODS: Record<Planet, number> = {
  Mercury: 0.2408467,
  Venus: 0.6151973,
  Mars: 1.8808158,
  Jupiter: 11.862615,
  Saturn: 29.447498,
  Uranus: 84.016846,
  Neptune: 164.79132,
};

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function AgeOnOtherPlanetsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.age-on-other-planets-calculator");

  const [earthAge, setEarthAge] = React.useState("");
  const [planet, setPlanet] = React.useState<Planet>("Mars");
  const [touched, setTouched] = React.useState(false);

  const pAge = parseFloat(earthAge);
  const ageValid = earthAge !== "" && Number.isFinite(pAge) && pAge > 0;

  const result = React.useMemo(() => {
    if (!ageValid) return null;
    const period = ORBITAL_PERIODS[planet];
    const planetaryAge = pAge / period;
    const earthDays = period * 365.25;
    return { planetaryAge, period, earthDays };
  }, [ageValid, pAge, planet]);

  function loadPreset(age: string, p: Planet) {
    setEarthAge(age); setPlanet(p); setTouched(true);
  }

  function reset() {
    setEarthAge(""); setPlanet("Mars"); setTouched(false);
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

  const showError = touched && !ageValid;

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
              <Label htmlFor="aop-age">{t("field.earthAge")}</Label>
              <Input
                id="aop-age"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={earthAge}
                placeholder={t("placeholder.earthAge")}
                onChange={(e) => { setEarthAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.planet")}</Label>
              <div className="flex flex-wrap gap-2">
                {PLANETS.map((p) => (
                  <Button
                    key={p}
                    type="button"
                    variant={planet === p ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setPlanet(p); setTouched(true); }}
                  >
                    {t(`planet.${p}` as never)}
                  </Button>
                ))}
              </div>
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500 mb-2">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-bold text-zinc-900">
                {t("result.age", {
                  planet: t(`planet.${planet}` as never),
                  age: fmt(result.planetaryAge),
                })}
              </div>
              <div className="text-zinc-700">
                {t("result.orbitalPeriod", { period: fmt(result.period, 4) })}
              </div>
              <div className="text-zinc-700">
                {t("result.earthDays", {
                  planet: t(`planet.${planet}` as never),
                  days: fmt(result.earthDays, 1),
                })}
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
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("30", "Mars")}
          >
            {t("examples.loadMars")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("25", "Venus")}
          >
            {t("examples.loadVenus")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadPreset("40", "Jupiter")}
          >
            {t("examples.loadJupiter")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
