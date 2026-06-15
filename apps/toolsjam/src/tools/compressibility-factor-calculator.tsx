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

// Pitzer-Curl correlation (truncated virial equation, acentric factor = 0)
// B0 = 0.083 - 0.422 / Tr^1.6
// Z ≈ 1 + B0 * Pr / Tr
function calcZ(Pr: number, Tr: number): number {
  const B0 = 0.083 - 0.422 / Math.pow(Tr, 1.6);
  return 1 + (B0 * Pr) / Tr;
}

function formatNum(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 0.001 || Math.abs(n) >= 1e6) return n.toExponential(3);
  return parseFloat(n.toPrecision(digits)).toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function CompressibilityFactorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.compressibility-factor-calculator");

  const [pressure, setPressure] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [critPressure, setCritPressure] = React.useState("");
  const [critTemp, setCritTemp] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setPressure(""); setTemperature(""); setCritPressure(""); setCritTemp("");
    setTouched(false);
  }

  function loadExample(p: string, t2: string, pc: string, tc: string) {
    setPressure(p); setTemperature(t2); setCritPressure(pc); setCritTemp(tc);
    setTouched(true);
  }

  const pNum = parseFloat(pressure);
  const tNum = parseFloat(temperature);
  const pcNum = parseFloat(critPressure);
  const tcNum = parseFloat(critTemp);

  const valid =
    pressure !== "" && temperature !== "" && critPressure !== "" && critTemp !== "" &&
    Number.isFinite(pNum) && Number.isFinite(tNum) &&
    Number.isFinite(pcNum) && Number.isFinite(tcNum) &&
    pNum > 0 && tNum > 0 && pcNum > 0 && tcNum > 0;

  const result = React.useMemo<{ Z: number; Pr: number; Tr: number } | null>(() => {
    if (!valid) return null;
    const Pr = pNum / pcNum;
    const Tr = tNum / tcNum;
    const Z = calcZ(Pr, Tr);
    return { Z, Pr, Tr };
  }, [valid, pNum, tNum, pcNum, tcNum]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
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
              <Label htmlFor="cf-p">{t("field.pressure")}</Label>
              <Input
                id="cf-p"
                type="number"
                inputMode="decimal"
                value={pressure}
                placeholder={t("placeholder.pressure")}
                onChange={(e) => { setPressure(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cf-t">{t("field.temperature")}</Label>
              <Input
                id="cf-t"
                type="number"
                inputMode="decimal"
                value={temperature}
                placeholder={t("placeholder.temperature")}
                onChange={(e) => { setTemperature(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cf-pc">{t("field.critPressure")}</Label>
              <Input
                id="cf-pc"
                type="number"
                inputMode="decimal"
                value={critPressure}
                placeholder={t("placeholder.critPressure")}
                onChange={(e) => { setCritPressure(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cf-tc">{t("field.critTemp")}</Label>
              <Input
                id="cf-tc"
                type="number"
                inputMode="decimal"
                value={critTemp}
                placeholder={t("placeholder.critTemp")}
                onChange={(e) => { setCritTemp(e.target.value); setTouched(true); }}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.z", { value: formatNum(result.Z) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.reducedPressure", { value: formatNum(result.Pr) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.reducedTemp", { value: formatNum(result.Tr) })}
              </div>
              <div className="text-sm text-zinc-500">
                {result.Z < 0.98
                  ? t("result.behavior.below")
                  : result.Z > 1.02
                  ? t("result.behavior.above")
                  : t("result.behavior.ideal")}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
            onClick={() => loadExample("1.0", "298.15", "45.99", "190.56")}
          >
            {t("examples.loadMethane")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("100.0", "300.0", "33.6", "126.2")}
          >
            {t("examples.loadNitrogen")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("100.0", "150.0", "12.8", "33.2")}
          >
            {t("examples.loadH2")}
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
