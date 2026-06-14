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

type CalcMode = "proportion" | "mean";

const Z_SCORES: Record<string, number> = {
  "80": 1.282,
  "90": 1.645,
  "95": 1.960,
  "99": 2.576,
};

const CONFIDENCE_LEVELS = ["80", "90", "95", "99"];

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function SamplingErrorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sampling-error-calculator");

  const [mode, setMode] = React.useState<CalcMode>("proportion");
  const [sampleProp, setSampleProp] = React.useState<string>("");
  const [sampleMean, setSampleMean] = React.useState<string>("");
  const [sampleSD, setSampleSD] = React.useState<string>("");
  const [sampleSize, setSampleSize] = React.useState<string>("");
  const [populationSize, setPopulationSize] = React.useState<string>("");
  const [confidenceLevel, setConfidenceLevel] = React.useState<string>("95");
  const [touched, setTouched] = React.useState(false);

  const propNum = parseFloat(sampleProp);
  const meanNum = parseFloat(sampleMean);
  const sdNum = parseFloat(sampleSD);
  const nNum = parseFloat(sampleSize);
  const popNum = parseFloat(populationSize);

  const propValid =
    sampleProp !== "" &&
    Number.isFinite(propNum) &&
    propNum > 0 &&
    propNum < 1;
  const meanValid = sampleMean !== "" && Number.isFinite(meanNum);
  const sdValid =
    sampleSD !== "" && Number.isFinite(sdNum) && sdNum >= 0;
  const nValid =
    sampleSize !== "" &&
    Number.isFinite(nNum) &&
    nNum >= 1 &&
    Number.isInteger(nNum);
  const popValid =
    populationSize === "" ||
    (Number.isFinite(popNum) && popNum > 0 && Number.isInteger(popNum) &&
      (sampleSize === "" || !Number.isFinite(nNum) || popNum >= nNum));

  const inputsValid =
    mode === "proportion"
      ? propValid && nValid && popValid
      : meanValid && sdValid && nValid && popValid;

  const result = React.useMemo(() => {
    if (!inputsValid) return null;
    const z = Z_SCORES[confidenceLevel] ?? 1.96;

    let se: number;
    if (mode === "proportion") {
      se = Math.sqrt((propNum * (1 - propNum)) / nNum);
    } else {
      se = sdNum / Math.sqrt(nNum);
    }

    if (
      populationSize !== "" &&
      Number.isFinite(popNum) &&
      popNum > 0 &&
      popNum >= nNum &&
      nNum / popNum > 0.05
    ) {
      const fpc = Math.sqrt((popNum - nNum) / (popNum - 1));
      se = se * fpc;
    }

    const moe = z * se;
    return { se, moe };
  }, [
    inputsValid,
    mode,
    propNum,
    meanNum,
    sdNum,
    nNum,
    popNum,
    populationSize,
    confidenceLevel,
  ]);

  function reset() {
    setSampleProp("");
    setSampleMean("");
    setSampleSD("");
    setSampleSize("");
    setPopulationSize("");
    setConfidenceLevel("95");
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

  const showError = touched && !inputsValid;

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
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["proportion", "mean"] as CalcMode[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => {
                    setMode(m);
                    setTouched(false);
                  }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${mode}_desc` as never)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mode === "proportion" ? (
              <div className="space-y-2">
                <Label htmlFor="se-prop">{t("field.sampleProportion")}</Label>
                <Input
                  id="se-prop"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="1"
                  step="any"
                  value={sampleProp}
                  placeholder={t("placeholder.proportion")}
                  onChange={(e) => {
                    setSampleProp(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="se-mean">{t("field.sampleMean")}</Label>
                  <Input
                    id="se-mean"
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={sampleMean}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => {
                      setSampleMean(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="se-sd">{t("field.sampleSD")}</Label>
                  <Input
                    id="se-sd"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={sampleSD}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => {
                      setSampleSD(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="se-n">{t("field.sampleSize")}</Label>
              <Input
                id="se-n"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={sampleSize}
                placeholder={t("placeholder.integer")}
                onChange={(e) => {
                  setSampleSize(e.target.value);
                  setTouched(true);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="se-pop">{t("field.populationSize")}</Label>
              <Input
                id="se-pop"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={populationSize}
                placeholder={t("placeholder.optional")}
                onChange={(e) => {
                  setPopulationSize(e.target.value);
                  setTouched(true);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="se-cl">{t("field.confidenceLevel")}</Label>
              <select
                id="se-cl"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(e.target.value)}
              >
                {CONFIDENCE_LEVELS.map((cl) => (
                  <option key={cl} value={cl}>
                    {cl}%
                  </option>
                ))}
              </select>
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
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.standardError")}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-zinc-900">
                    {formatNum(result.se, 4)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.marginOfError")}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-zinc-900">
                    ±{formatNum(result.moe, 4)}
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
