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

function formatNum(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function BucklingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.buckling-calculator");

  const [appliedLoad, setAppliedLoad] = React.useState("");
  const [length, setLength] = React.useState("");
  const [modulus, setModulus] = React.useState("");
  const [momentOfInertia, setMomentOfInertia] = React.useState("");
  const [kFactor, setKFactor] = React.useState("");
  const [area, setArea] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const pNum = parseFloat(appliedLoad);
  const lNum = parseFloat(length);
  const eNum = parseFloat(modulus) * 1e9; // GPa → Pa
  const iNum = parseFloat(momentOfInertia);
  const kNum = parseFloat(kFactor);
  const aNum = parseFloat(area);

  const allValid = [pNum, lNum, eNum, iNum, kNum, aNum].every(
    (v) => Number.isFinite(v) && v > 0
  ) && [appliedLoad, length, modulus, momentOfInertia, kFactor, area].every(
    (v) => v !== ""
  );

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const Le = kNum * lNum;
    const Pcr = (Math.PI ** 2 * eNum * iNum) / Le ** 2;
    const bucklingStress = Pcr / aNum;
    const safetyFactor = Pcr / pNum;
    const safe = safetyFactor >= 1;
    return { Le, Pcr, bucklingStress, safetyFactor, safe };
  }, [allValid, pNum, lNum, eNum, iNum, kNum, aNum]);

  function loadExample(
    p: string,
    l: string,
    e: string,
    i: string,
    k: string,
    a: string
  ) {
    setAppliedLoad(p);
    setLength(l);
    setModulus(e);
    setMomentOfInertia(i);
    setKFactor(k);
    setArea(a);
    setTouched(true);
  }

  function reset() {
    setAppliedLoad("");
    setLength("");
    setModulus("");
    setMomentOfInertia("");
    setKFactor("");
    setArea("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note: string }[]
      | undefined;
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

  const showError = touched && !allValid;

  const fields: {
    id: string;
    labelKey: string;
    value: string;
    setter: (v: string) => void;
    placeholderKey: string;
  }[] = [
    {
      id: "applied-load",
      labelKey: "field.appliedLoad",
      value: appliedLoad,
      setter: setAppliedLoad,
      placeholderKey: "placeholder.appliedLoad",
    },
    {
      id: "length",
      labelKey: "field.length",
      value: length,
      setter: setLength,
      placeholderKey: "placeholder.length",
    },
    {
      id: "modulus",
      labelKey: "field.modulus",
      value: modulus,
      setter: setModulus,
      placeholderKey: "placeholder.modulus",
    },
    {
      id: "moment-of-inertia",
      labelKey: "field.momentOfInertia",
      value: momentOfInertia,
      setter: setMomentOfInertia,
      placeholderKey: "placeholder.momentOfInertia",
    },
    {
      id: "k-factor",
      labelKey: "field.effectiveLengthFactor",
      value: kFactor,
      setter: setKFactor,
      placeholderKey: "placeholder.effectiveLengthFactor",
    },
    {
      id: "area",
      labelKey: "field.area",
      value: area,
      setter: setArea,
      placeholderKey: "placeholder.area",
    },
  ];

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fields.map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={`buck-${f.id}`}>
                  {t(f.labelKey as never)}
                </Label>
                <Input
                  id={`buck-${f.id}`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={f.value}
                  placeholder={t(f.placeholderKey as never)}
                  onChange={(e) => {
                    f.setter(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ))}
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
            <div
              className={`rounded-lg border p-4 space-y-3 ${
                result.safe
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <p
                className={`text-sm font-semibold ${
                  result.safe ? "text-green-700" : "text-red-700"
                }`}
              >
                {result.safe
                  ? t("result.status.safe")
                  : t("result.status.unsafe")}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.criticalLoad")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.Pcr / 1000)} kN
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.bucklingStress")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.bucklingStress / 1e6)} MPa
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.safetyFactor")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.safetyFactor)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.effectiveLength")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.Le)} m
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
            onClick={() =>
              loadExample("75000", "4.5", "200", "0.00015", "0.7", "0.012")
            }
          >
            {t("examples.loadSteelColumn")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("25000", "2.8", "70", "0.00008", "1.0", "0.008")
            }
          >
            {t("examples.loadAluminum")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("15000", "6.0", "200", "0.00005", "2.0", "0.006")
            }
          >
            {t("examples.loadCantilever")}
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
