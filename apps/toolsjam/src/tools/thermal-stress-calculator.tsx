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

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toLocaleString("en-US", {
    maximumFractionDigits: d,
  });
}

export default function ThermalStressCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.thermal-stress-calculator");

  const [initialTemp, setInitialTemp] = React.useState("");
  const [finalTemp, setFinalTemp] = React.useState("");
  const [alpha, setAlpha] = React.useState("");
  const [youngsMod, setYoungsMod] = React.useState("");
  const [poisson, setPoisson] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const T1 = parseFloat(initialTemp);
  const T2 = parseFloat(finalTemp);
  const a = parseFloat(alpha);
  const E = parseFloat(youngsMod);
  const v = parseFloat(poisson);

  const valid =
    initialTemp !== "" && Number.isFinite(T1) &&
    finalTemp !== "" && Number.isFinite(T2) &&
    alpha !== "" && Number.isFinite(a) && a > 0 &&
    youngsMod !== "" && Number.isFinite(E) && E > 0 &&
    poisson !== "" && Number.isFinite(v) && v >= 0 && v < 0.5;

  const result = React.useMemo(() => {
    if (!valid) return null;
    const dT = T2 - T1;
    // Thermal strain: ε = α × ΔT
    const thermalStrain = a * dT;
    // Convert E from GPa to Pa
    const E_Pa = E * 1e9;
    // Uniaxial thermal stress (fully constrained): σ = E × α × ΔT
    const uniaxialStress = E_Pa * a * dT;
    // Biaxial thermal stress (plane stress): σ = E × α × ΔT / (1 - ν)
    const biaxialStress = (E_Pa * a * dT) / (1 - v);
    // Thermal expansion ΔL/L = ε
    return { dT, thermalStrain, uniaxialStress, biaxialStress };
  }, [valid, T1, T2, a, E, v]);

  function loadExample(t1v: string, t2v: string, av: string, ev: string, vv: string) {
    setInitialTemp(t1v);
    setFinalTemp(t2v);
    setAlpha(av);
    setYoungsMod(ev);
    setPoisson(vv);
    setTouched(true);
  }

  function reset() {
    setInitialTemp("");
    setFinalTemp("");
    setAlpha("");
    setYoungsMod("");
    setPoisson("");
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tsc-t1">{t("field.initialTemp")}</Label>
              <Input
                id="tsc-t1"
                type="number"
                inputMode="decimal"
                value={initialTemp}
                placeholder={t("placeholder.temp")}
                onChange={(e) => { setInitialTemp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tsc-t2">{t("field.finalTemp")}</Label>
              <Input
                id="tsc-t2"
                type="number"
                inputMode="decimal"
                value={finalTemp}
                placeholder={t("placeholder.temp")}
                onChange={(e) => { setFinalTemp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tsc-alpha">{t("field.expansionCoeff")}</Label>
              <Input
                id="tsc-alpha"
                type="number"
                inputMode="decimal"
                value={alpha}
                placeholder={t("placeholder.alpha")}
                onChange={(e) => { setAlpha(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tsc-e">{t("field.youngsModulus")}</Label>
              <Input
                id="tsc-e"
                type="number"
                inputMode="decimal"
                value={youngsMod}
                placeholder={t("placeholder.youngs")}
                onChange={(e) => { setYoungsMod(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tsc-v">{t("field.poisson")}</Label>
              <Input
                id="tsc-v"
                type="number"
                inputMode="decimal"
                value={poisson}
                placeholder={t("placeholder.poisson")}
                onChange={(e) => { setPoisson(e.target.value); setTouched(true); }}
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.tempChange")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.dT, 2)} °C</div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.thermalStrain")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{result.thermalStrain.toExponential(4)}</div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.uniaxialStress")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.uniaxialStress / 1e6, 2)} MPa</div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.biaxialStress")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.biaxialStress / 1e6, 2)} MPa</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("20", "150", "0.000012", "200", "0.3")}
          >
            {t("examples.loadSteel")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("200", "0", "0.000023", "70", "0.33")}
          >
            {t("examples.loadAluminum")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("25", "80", "0.000017", "110", "0.34")}
          >
            {t("examples.loadCopper")}
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
