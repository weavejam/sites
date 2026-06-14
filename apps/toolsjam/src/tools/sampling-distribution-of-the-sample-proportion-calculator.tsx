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

function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const poly =
    t *
    (0.254829592 +
      t *
        (-0.284496736 +
          t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const result = 1 - poly * Math.exp(-x * x);
  return x >= 0 ? result : -result;
}

function normalCDF(z: number): number {
  return (1 + erf(z / Math.sqrt(2))) / 2;
}

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function SamplingDistributionProportionCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations(
    "tool.sampling-distribution-of-the-sample-proportion-calculator"
  );

  const [p, setP] = React.useState<string>("");
  const [n, setN] = React.useState<string>("");
  const [pHat, setPHat] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const pNum = parseFloat(p);
  const nNum = parseFloat(n);
  const pHatNum = parseFloat(pHat);

  const pValid = p !== "" && Number.isFinite(pNum) && pNum > 0 && pNum < 1;
  const nValid =
    n !== "" &&
    Number.isFinite(nNum) &&
    nNum >= 1 &&
    Number.isInteger(nNum);
  const pHatValid =
    pHat === "" ||
    (Number.isFinite(pHatNum) && pHatNum >= 0 && pHatNum <= 1);

  const result = React.useMemo(() => {
    if (!pValid || !nValid) return null;
    const mean = pNum;
    const se = Math.sqrt((pNum * (1 - pNum)) / nNum);
    const np = pNum * nNum;
    const nq = (1 - pNum) * nNum;
    const normalityPassed = np >= 10 && nq >= 10;

    let zScore: number | null = null;
    let probLess: number | null = null;
    let probGreater: number | null = null;

    if (pHat !== "" && pHatValid && Number.isFinite(pHatNum) && se > 0) {
      zScore = (pHatNum - mean) / se;
      probLess = normalCDF(zScore);
      probGreater = 1 - probLess;
    }

    return {
      mean,
      se,
      np,
      nq,
      normalityPassed,
      zScore,
      probLess,
      probGreater,
    };
  }, [pValid, nValid, pHatValid, pNum, nNum, pHat, pHatNum]);

  function reset() {
    setP("");
    setN("");
    setPHat("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const showError = touched && (!pValid || !nValid || !pHatValid);

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
              <Label htmlFor="sdsp-p">{t("field.populationProportion")}</Label>
              <Input
                id="sdsp-p"
                type="number"
                inputMode="decimal"
                min="0"
                max="1"
                step="any"
                value={p}
                placeholder={t("placeholder.proportion")}
                onChange={(e) => {
                  setP(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sdsp-n">{t("field.sampleSize")}</Label>
              <Input
                id="sdsp-n"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={n}
                placeholder={t("placeholder.integer")}
                onChange={(e) => {
                  setN(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="sdsp-phat">{t("field.sampleProportion")}</Label>
              <Input
                id="sdsp-phat"
                type="number"
                inputMode="decimal"
                min="0"
                max="1"
                step="any"
                value={pHat}
                placeholder={t("placeholder.optional")}
                onChange={(e) => {
                  setPHat(e.target.value);
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.mean")}</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    {formatNum(result.mean, 4)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.standardError")}</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    {formatNum(result.se, 4)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.normalityCheck")}</div>
                  <div
                    className={`mt-1 text-lg font-semibold ${result.normalityPassed ? "text-green-700" : "text-red-600"}`}
                  >
                    {result.normalityPassed
                      ? t("result.normalityPassed")
                      : t("result.normalityFailed")}
                  </div>
                </div>
              </div>

              {result.zScore !== null && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mt-2">
                  <div className="rounded border border-zinc-200 bg-white p-3">
                    <div className="text-xs text-zinc-500">{t("result.zScore")}</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">
                      {formatNum(result.zScore, 4)}
                    </div>
                  </div>
                  <div className="rounded border border-zinc-200 bg-white p-3">
                    <div className="text-xs text-zinc-500">{t("result.probLess")}</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">
                      {formatNum(result.probLess!, 4)}
                    </div>
                  </div>
                  <div className="rounded border border-zinc-200 bg-white p-3">
                    <div className="text-xs text-zinc-500">{t("result.probGreater")}</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">
                      {formatNum(result.probGreater!, 4)}
                    </div>
                  </div>
                </div>
              )}
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
