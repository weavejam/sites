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

type CalcType = "potentialEnergy" | "springConstant" | "displacement";

const CALC_TYPES: CalcType[] = ["potentialEnergy", "springConstant", "displacement"];

function fmt(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
}

export default function ElasticPotentialEnergyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.elastic-potential-energy-calculator");

  const [calcType, setCalcType] = React.useState<CalcType>("potentialEnergy");
  const [springConstant, setSpringConstant] = React.useState("");
  const [displacement, setDisplacement] = React.useState("");
  const [potentialEnergy, setPotentialEnergy] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const k = parseFloat(springConstant);
  const x = parseFloat(displacement);
  const u = parseFloat(potentialEnergy);

  const result = React.useMemo<{ value: number; formula: string } | null>(() => {
    if (!touched) return null;
    switch (calcType) {
      case "potentialEnergy": {
        if (!Number.isFinite(k) || !Number.isFinite(x) || k <= 0 || x === 0) return null;
        return { value: 0.5 * k * x * x, formula: "potentialEnergy" };
      }
      case "springConstant": {
        if (!Number.isFinite(u) || !Number.isFinite(x) || u <= 0 || x === 0) return null;
        return { value: (2 * u) / (x * x), formula: "springConstant" };
      }
      case "displacement": {
        if (!Number.isFinite(u) || !Number.isFinite(k) || u <= 0 || k <= 0) return null;
        return { value: Math.sqrt((2 * u) / k), formula: "displacement" };
      }
    }
  }, [touched, calcType, k, x, u]);

  const xZeroError = touched && calcType !== "displacement" && Number.isFinite(x) && x === 0;
  const kZeroError = touched && calcType === "displacement" && Number.isFinite(k) && k <= 0;
  const showInvalidError = touched && result === null && !xZeroError && !kZeroError;

  const unitMap: Record<CalcType, string> = {
    potentialEnergy: "J",
    springConstant: "N/m",
    displacement: "m",
  };

  function reset() {
    setSpringConstant("");
    setDisplacement("");
    setPotentialEnergy("");
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
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
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
            <Label htmlFor="epe-calcType">{t("field.calcType")}</Label>
            <select
              id="epe-calcType"
              className="flex h-9 w-full max-w-xs rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={calcType}
              onChange={(e) => {
                setCalcType(e.target.value as CalcType);
                setTouched(false);
              }}
            >
              {CALC_TYPES.map((c) => (
                <option key={c} value={c}>
                  {t(`calcType.${c}` as never)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="epe-springConstant">{t("field.springConstant")}</Label>
              <Input
                id="epe-springConstant"
                type="number"
                inputMode="decimal"
                value={springConstant}
                placeholder={t("placeholder.springConstant")}
                disabled={calcType === "springConstant"}
                onChange={(e) => { setSpringConstant(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="epe-displacement">{t("field.displacement")}</Label>
              <Input
                id="epe-displacement"
                type="number"
                inputMode="decimal"
                value={displacement}
                placeholder={t("placeholder.displacement")}
                disabled={calcType === "displacement"}
                onChange={(e) => { setDisplacement(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="epe-potentialEnergy">{t("field.potentialEnergy")}</Label>
              <Input
                id="epe-potentialEnergy"
                type="number"
                inputMode="decimal"
                value={potentialEnergy}
                placeholder={t("placeholder.potentialEnergy")}
                disabled={calcType === "potentialEnergy"}
                onChange={(e) => { setPotentialEnergy(e.target.value); setTouched(false); }}
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

          {xZeroError && (
            <p className="text-sm text-red-600">{t("error.zeroDisplacement")}</p>
          )}
          {kZeroError && (
            <p className="text-sm text-red-600">{t("error.zeroSpring")}</p>
          )}
          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {fmt(result.value)} {unitMap[calcType]}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.formula")}: {t(`formula.${result.formula}` as never)}
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
