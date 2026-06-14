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

// Wien's displacement constant b = 2.897771955e-3 m·K
const WIEN_B = 2.897771955e-3;
// Speed of light
const C = 2.998e8;
// Planck's constant * speed of light / Boltzmann constant
const HC_KB = 1.4387769e-2; // h*c/k in m·K

function formatWavelength(lambdaM: number): string {
  if (lambdaM < 1e-6) {
    return `${(lambdaM * 1e9).toFixed(2)} nm`;
  }
  if (lambdaM < 1e-3) {
    return `${(lambdaM * 1e6).toFixed(4)} μm`;
  }
  return `${(lambdaM * 100).toFixed(4)} cm`;
}

function classifyRadiation(lambdaM: number): string {
  const nm = lambdaM * 1e9;
  if (nm < 1) return "gamma";
  if (nm < 10) return "xray";
  if (nm < 400) return "uv";
  if (nm <= 700) return "visible";
  if (nm < 1e6) return "infrared";
  return "microwave";
}

export default function WiensLawCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.wiens-law-calculator");

  const [temperature, setTemperature] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const tempNum = parseFloat(temperature);
  const valid = temperature !== "" && Number.isFinite(tempNum) && tempNum > 0;

  const result = React.useMemo<{
    lambdaM: number;
    lambdaFormatted: string;
    frequencyHz: number;
    category: string;
  } | null>(() => {
    if (!valid) return null;
    const lambdaM = WIEN_B / tempNum;
    const frequencyHz = C / lambdaM;
    const category = classifyRadiation(lambdaM);
    return { lambdaM, lambdaFormatted: formatWavelength(lambdaM), frequencyHz, category };
  }, [valid, tempNum]);

  function loadExample(temp: string) {
    setTemperature(temp);
    setTouched(true);
  }

  function reset() {
    setTemperature("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
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

  const showError = touched && !valid;

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
          <div className="max-w-sm space-y-2">
            <Label htmlFor="wl-temp">{t("field.temperature")}</Label>
            <Input
              id="wl-temp"
              type="number"
              inputMode="decimal"
              value={temperature}
              placeholder={t("placeholder.temperature")}
              onChange={(e) => { setTemperature(e.target.value); setTouched(true); }}
            />
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
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.wavelength", { value: result.lambdaFormatted })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.frequency", { value: result.frequencyHz.toExponential(3) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t(`result.category.${result.category}` as never)}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("5778")}>
            {t("examples.loadSun")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("2800")}>
            {t("examples.loadBulb")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("310")}>
            {t("examples.loadBody")}
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
