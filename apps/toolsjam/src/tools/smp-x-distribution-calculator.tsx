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

type ProbType = "lessThan" | "greaterThan" | "between";
const PROB_TYPES: ProbType[] = ["lessThan", "greaterThan", "between"];

function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const ax = Math.abs(x);
  const t = 1.0 / (1.0 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t -
      0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

function normalCDF(x: number): number {
  return 0.5 * (1 + erf(x / Math.SQRT2));
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

interface CalcResult {
  se: number;
  z1: number;
  z2?: number;
  probability: number;
}

export default function SmpXDistributionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.smp-x-distribution-calculator");

  const [mu, setMu] = React.useState("");
  const [sigma, setSigma] = React.useState("");
  const [n, setN] = React.useState("");
  const [probType, setProbType] = React.useState<ProbType>("lessThan");
  const [x1, setX1] = React.useState("");
  const [x2, setX2] = React.useState("");
  const [calculated, setCalculated] = React.useState(false);

  const muNum = parseFloat(mu);
  const sigmaNum = parseFloat(sigma);
  const nNum = Number(n);
  const x1Num = parseFloat(x1);
  const x2Num = parseFloat(x2);

  const valid =
    mu !== "" &&
    sigma !== "" &&
    n !== "" &&
    x1 !== "" &&
    Number.isFinite(muNum) &&
    sigmaNum > 0 &&
    Number.isFinite(nNum) &&
    Number.isInteger(nNum) &&
    nNum >= 2 &&
    Number.isFinite(x1Num) &&
    (probType !== "between" ||
      (x2 !== "" && Number.isFinite(x2Num) && x2Num > x1Num));

  const result = React.useMemo<CalcResult | null>(() => {
    if (!valid) return null;
    const se = sigmaNum / Math.sqrt(nNum);
    const z1 = (x1Num - muNum) / se;
    if (probType === "lessThan") {
      return { se, z1, probability: normalCDF(z1) };
    } else if (probType === "greaterThan") {
      return { se, z1, probability: 1 - normalCDF(z1) };
    } else {
      const z2v = (x2Num - muNum) / se;
      return { se, z1, z2: z2v, probability: normalCDF(z2v) - normalCDF(z1) };
    }
  }, [valid, muNum, sigmaNum, nNum, x1Num, x2Num, probType]);

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

  function reset() {
    setMu("");
    setSigma("");
    setN("");
    setX1("");
    setX2("");
    setCalculated(false);
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
          <div className="space-y-2">
            <Label>{t("field.probType")}</Label>
            <div className="flex flex-wrap gap-2">
              {PROB_TYPES.map((pt) => (
                <Button
                  key={pt}
                  type="button"
                  variant={probType === pt ? "default" : "outline"}
                  onClick={() => {
                    setProbType(pt);
                    setCalculated(false);
                  }}
                >
                  {t(`type.${pt}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${probType}_desc` as never)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smp-mu">{t("field.mu")}</Label>
              <Input
                id="smp-mu"
                type="number"
                inputMode="decimal"
                value={mu}
                placeholder={t("placeholder.mu")}
                onChange={(e) => {
                  setMu(e.target.value);
                  setCalculated(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smp-sigma">{t("field.sigma")}</Label>
              <Input
                id="smp-sigma"
                type="number"
                inputMode="decimal"
                value={sigma}
                placeholder={t("placeholder.sigma")}
                onChange={(e) => {
                  setSigma(e.target.value);
                  setCalculated(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smp-n">{t("field.n")}</Label>
              <Input
                id="smp-n"
                type="number"
                inputMode="numeric"
                value={n}
                placeholder={t("placeholder.n")}
                onChange={(e) => {
                  setN(e.target.value);
                  setCalculated(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smp-x1">{t("field.x1")}</Label>
              <Input
                id="smp-x1"
                type="number"
                inputMode="decimal"
                value={x1}
                placeholder={t("placeholder.x1")}
                onChange={(e) => {
                  setX1(e.target.value);
                  setCalculated(false);
                }}
              />
            </div>
            {probType === "between" && (
              <div className="space-y-2">
                <Label htmlFor="smp-x2">{t("field.x2")}</Label>
                <Input
                  id="smp-x2"
                  type="number"
                  inputMode="decimal"
                  value={x2}
                  placeholder={t("placeholder.x2")}
                  onChange={(e) => {
                    setX2(e.target.value);
                    setCalculated(false);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setCalculated(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {calculated && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {calculated && valid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-800">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3 text-sm">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.se")}</div>
                  <div className="text-lg font-semibold">{fmt(result.se)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.z")}</div>
                  <div className="text-lg font-semibold">
                    {fmt(result.z1)}
                    {result.z2 !== undefined && ` / ${fmt(result.z2)}`}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.probability")}
                  </div>
                  <div className="text-lg font-semibold">
                    {fmt(result.probability * 100, 4)}%
                  </div>
                </div>
              </div>
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
