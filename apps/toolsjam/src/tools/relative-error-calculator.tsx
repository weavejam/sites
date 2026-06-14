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

function fmt(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

interface RelativeErrorResult {
  absoluteError: number;
  relativeError: number;
  percentageError: number;
}

function compute(
  trueVal: number,
  observedVal: number
): RelativeErrorResult | null {
  if (!Number.isFinite(trueVal) || !Number.isFinite(observedVal)) return null;
  if (trueVal === 0) return null;
  const absoluteError = Math.abs(observedVal - trueVal);
  const relativeError = absoluteError / Math.abs(trueVal);
  const percentageError = relativeError * 100;
  return { absoluteError, relativeError, percentageError };
}

export default function RelativeErrorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.relative-error-calculator");
  const [trueVal, setTrueVal] = React.useState<string>("");
  const [observedVal, setObservedVal] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const trueNum = parseFloat(trueVal);
  const observedNum = parseFloat(observedVal);
  const trueValid =
    trueVal !== "" && Number.isFinite(trueNum) && trueNum !== 0;
  const observedValid = observedVal !== "" && Number.isFinite(observedNum);

  const result = React.useMemo<RelativeErrorResult | null>(() => {
    if (!trueValid || !observedValid) return null;
    return compute(trueNum, observedNum);
  }, [trueNum, observedNum, trueValid, observedValid]);

  function loadExample(tv: string, ov: string) {
    setTrueVal(tv);
    setObservedVal(ov);
    setTouched(true);
  }

  function reset() {
    setTrueVal("");
    setObservedVal("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
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

  const showError = touched && (!trueValid || !observedValid);
  const showZeroError =
    touched &&
    trueVal !== "" &&
    Number.isFinite(trueNum) &&
    trueNum === 0;

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
              <Label htmlFor="rec-true">{t("field.trueValue")}</Label>
              <Input
                id="rec-true"
                type="number"
                inputMode="decimal"
                value={trueVal}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setTrueVal(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rec-observed">{t("field.observedValue")}</Label>
              <Input
                id="rec-observed"
                type="number"
                inputMode="decimal"
                value={observedVal}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setObservedVal(e.target.value);
                  setTouched(true);
                }}
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

          {showZeroError && (
            <p className="text-sm text-red-600">{t("error.trueZero")}</p>
          )}
          {showError && !showZeroError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && !showError && !showZeroError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.absoluteError")}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    {fmt(result.absoluteError)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.relativeError")}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    {fmt(result.relativeError)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.percentageError")}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    {fmt(result.percentageError)}%
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("formula")}</p>
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
            onClick={() => loadExample("10.5", "10.2")}
          >
            {t("examples.loadChemistry")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("9.81", "9.7")}
          >
            {t("examples.loadPhysics")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("50", "50.1")}
          >
            {t("examples.loadManufacturing")}
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
