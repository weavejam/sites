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

const G0 = 9.80665; // m/s²

function fmtNum(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

interface DeltaVResult {
  deltaV: number;
  fuelMass: number;
  massRatio: number;
  isp: number;
}

export default function DeltaVCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.delta-v-calculator");

  const [initialMass, setInitialMass] = React.useState("");
  const [finalMass, setFinalMass] = React.useState("");
  const [exhaustVelocity, setExhaustVelocity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const m0 = parseFloat(initialMass);
  const mf = parseFloat(finalMass);
  const ve = parseFloat(exhaustVelocity);

  const m0Valid = initialMass !== "" && Number.isFinite(m0) && m0 > 0;
  const mfValid = finalMass !== "" && Number.isFinite(mf) && mf > 0;
  const veValid = exhaustVelocity !== "" && Number.isFinite(ve) && ve > 0;
  const allInputsValid = m0Valid && mfValid && veValid;
  const massRatioValid = allInputsValid && m0 > mf;

  const result = React.useMemo<DeltaVResult | null>(() => {
    if (!massRatioValid) return null;
    const dv = ve * Math.log(m0 / mf);
    return {
      deltaV: dv,
      fuelMass: m0 - mf,
      massRatio: m0 / mf,
      isp: ve / G0,
    };
  }, [massRatioValid, ve, m0, mf]);

  function reset() {
    setInitialMass("");
    setFinalMass("");
    setExhaustVelocity("");
    setTouched(false);
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

  const showInvalidError = touched && !allInputsValid;
  const showMassRatioError = touched && allInputsValid && !massRatioValid;

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="dv-m0">{t("field.initialMass")}</Label>
              <Input
                id="dv-m0"
                type="number"
                inputMode="decimal"
                min="0"
                value={initialMass}
                placeholder="0"
                onChange={(e) => { setInitialMass(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dv-mf">{t("field.finalMass")}</Label>
              <Input
                id="dv-mf"
                type="number"
                inputMode="decimal"
                min="0"
                value={finalMass}
                placeholder="0"
                onChange={(e) => { setFinalMass(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dv-ve">{t("field.exhaustVelocity")}</Label>
              <Input
                id="dv-ve"
                type="number"
                inputMode="decimal"
                min="0"
                value={exhaustVelocity}
                placeholder="0"
                onChange={(e) => { setExhaustVelocity(e.target.value); setTouched(true); }}
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

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showMassRatioError && (
            <p className="text-sm text-red-600">{t("error.massRatio")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.deltaV")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.deltaV)} {t("result.unit.ms")}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {fmtNum(result.deltaV / 1000, 3)} {t("result.unit.kms")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.fuelMass")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.fuelMass)} {t("result.unit.kg")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.massRatio")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.massRatio, 4)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.specificImpulse")}</div>
                  <div className="text-xl font-semibold">
                    {fmtNum(result.isp, 1)} {t("result.unit.s")}
                  </div>
                </div>
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
