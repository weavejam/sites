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

type Kinetics = "slow" | "moderate" | "rapid" | "veryRapid";

function getKinetics(months: number): Kinetics {
  if (months > 12) return "slow";
  if (months > 6) return "moderate";
  if (months > 3) return "rapid";
  return "veryRapid";
}

function formatMonths(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  return (Math.round(n * 10) / 10).toFixed(1);
}

export default function PsaDoublingTimeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.psa-doubling-time-calculator");

  const [initialPsa, setInitialPsa] = React.useState("");
  const [currentPsa, setCurrentPsa] = React.useState("");
  const [timeInterval, setTimeInterval] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const initialNum = parseFloat(initialPsa);
  const currentNum = parseFloat(currentPsa);
  const timeNum = parseFloat(timeInterval);

  const initialValid =
    initialPsa !== "" && Number.isFinite(initialNum) && initialNum > 0;
  const currentValid =
    currentPsa !== "" && Number.isFinite(currentNum) && currentNum > 0;
  const timeValid =
    timeInterval !== "" && Number.isFinite(timeNum) && timeNum > 0;

  const psaRising =
    initialValid && currentValid && currentNum > initialNum;

  const result = React.useMemo<{
    months: number;
    kinetics: Kinetics;
  } | null>(() => {
    if (!initialValid || !currentValid || !timeValid || !psaRising) return null;
    const psadt =
      (Math.LN2 * timeNum) / Math.log(currentNum / initialNum);
    if (psadt <= 0 || !Number.isFinite(psadt)) return null;
    return { months: psadt, kinetics: getKinetics(psadt) };
  }, [initialValid, currentValid, timeValid, psaRising, initialNum, currentNum, timeNum]);

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
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const showInputError = touched && (!initialValid || !currentValid || !timeValid);
  const showPsaError = touched && initialValid && currentValid && !psaRising;

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

  function reset() {
    setInitialPsa("");
    setCurrentPsa("");
    setTimeInterval("");
    setTouched(false);
  }

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
              <Label htmlFor="psadt-initial">{t("field.initialPsa")}</Label>
              <Input
                id="psadt-initial"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={initialPsa}
                placeholder={t("placeholder.initialPsa")}
                onChange={(e) => {
                  setInitialPsa(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="psadt-current">{t("field.currentPsa")}</Label>
              <Input
                id="psadt-current"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={currentPsa}
                placeholder={t("placeholder.currentPsa")}
                onChange={(e) => {
                  setCurrentPsa(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="psadt-interval">{t("field.timeInterval")}</Label>
              <Input
                id="psadt-interval"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={timeInterval}
                placeholder={t("placeholder.timeInterval")}
                onChange={(e) => {
                  setTimeInterval(e.target.value);
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

          {showInputError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showPsaError && (
            <p className="text-sm text-red-600">{t("error.psaNotRising")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.value", { months: formatMonths(result.months) })}
              </div>
              <div className="mt-1 text-sm text-zinc-700">
                {t("result.interpretation", {
                  label: t(`result.${result.kinetics}` as never),
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
