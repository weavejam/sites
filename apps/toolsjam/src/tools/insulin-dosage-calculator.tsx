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

interface InsulinResult {
  mealDose: number;
  correctionDose: number;
  totalDose: number;
}

function computeInsulin(
  currentBG: number,
  targetBG: number,
  carbs: number,
  icr: number,
  isf: number,
  iob: number,
): InsulinResult | null {
  if (!Number.isFinite(currentBG) || currentBG < 0) return null;
  if (!Number.isFinite(targetBG) || targetBG < 0) return null;
  if (!Number.isFinite(carbs) || carbs < 0) return null;
  if (!Number.isFinite(icr) || icr <= 0) return null;
  if (!Number.isFinite(isf) || isf <= 0) return null;
  if (!Number.isFinite(iob)) return null;

  const mealDose = carbs / icr;
  const correctionDose = (currentBG - targetBG) / isf;
  const raw = mealDose + correctionDose - iob;
  const totalDose = Math.max(0, raw);
  return { mealDose, correctionDose, totalDose };
}

function fmt(n: number, d = 1): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(d)).toString();
}

export default function InsulinDosageCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.insulin-dosage-calculator");

  const [currentBG, setCurrentBG] = React.useState("");
  const [targetBG, setTargetBG] = React.useState("120");
  const [carbs, setCarbs] = React.useState("");
  const [icr, setIcr] = React.useState("");
  const [isf, setIsf] = React.useState("");
  const [iob, setIob] = React.useState("0");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<InsulinResult | null>(() => {
    if (!touched) return null;
    return computeInsulin(
      parseFloat(currentBG),
      parseFloat(targetBG),
      carbs === "" ? 0 : parseFloat(carbs),
      parseFloat(icr),
      parseFloat(isf),
      iob === "" ? 0 : parseFloat(iob),
    );
  }, [touched, currentBG, targetBG, carbs, icr, isf, iob]);

  function reset() {
    setCurrentBG("");
    setTargetBG("120");
    setCarbs("");
    setIcr("");
    setIsf("");
    setIob("0");
    setTouched(false);
  }

  function loadExample(cBG: string, tBG: string, c: string, i: string, s: string, io: string) {
    setCurrentBG(cBG);
    setTargetBG(tBG);
    setCarbs(c);
    setIcr(i);
    setIsf(s);
    setIob(io);
    setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const showError = touched && result === null;

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
              <Label htmlFor="ins-current-bg">{t("field.currentBG")}</Label>
              <Input
                id="ins-current-bg"
                type="number"
                inputMode="decimal"
                value={currentBG}
                placeholder={t("placeholder.currentBG")}
                onChange={(e) => { setCurrentBG(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ins-target-bg">{t("field.targetBG")}</Label>
              <Input
                id="ins-target-bg"
                type="number"
                inputMode="decimal"
                value={targetBG}
                placeholder={t("placeholder.targetBG")}
                onChange={(e) => { setTargetBG(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ins-carbs">{t("field.carbs")}</Label>
              <Input
                id="ins-carbs"
                type="number"
                inputMode="decimal"
                value={carbs}
                placeholder={t("placeholder.carbs")}
                onChange={(e) => { setCarbs(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ins-icr">{t("field.icr")}</Label>
              <Input
                id="ins-icr"
                type="number"
                inputMode="decimal"
                value={icr}
                placeholder={t("placeholder.icr")}
                onChange={(e) => { setIcr(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ins-isf">{t("field.isf")}</Label>
              <Input
                id="ins-isf"
                type="number"
                inputMode="decimal"
                value={isf}
                placeholder={t("placeholder.isf")}
                onChange={(e) => { setIsf(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ins-iob">{t("field.iob")}</Label>
              <Input
                id="ins-iob"
                type="number"
                inputMode="decimal"
                value={iob}
                placeholder={t("placeholder.iob")}
                onChange={(e) => { setIob(e.target.value); setTouched(true); }}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.mealDose")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.mealDose)} <span className="text-sm text-zinc-500">{t("result.units")}</span>
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.correctionDose")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.correctionDose)} <span className="text-sm text-zinc-500">{t("result.units")}</span>
                  </div>
                </div>
                <div className="rounded border border-blue-200 bg-blue-50 p-3 text-center">
                  <div className="text-xs text-blue-600">{t("result.totalDose")}</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {fmt(result.totalDose)} <span className="text-sm font-normal text-blue-600">{t("result.units")}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("result.note")}</p>
              <div className="text-xs text-zinc-400">{t("result.formula")}</div>
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
            onClick={() => loadExample("180", "120", "45", "15", "50", "0")}>
            {t("examples.loadMorning")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("120", "120", "60", "15", "50", "0")}>
            {t("examples.loadMeal")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("220", "120", "0", "15", "50", "0")}>
            {t("examples.loadCorrection")}
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
