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

function fmt(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

function calcImpedanceMatching(
  zSR: number,
  zSI: number,
  zLR: number,
  zLI: number
): {
  gammaRe: number;
  gammaIm: number;
  gammaMag: number;
  vswr: number;
  returnLossDb: number;
  powerTransferPct: number;
  mismatchLossDb: number;
} | null {
  // Γ = (ZL - ZS) / (ZL + ZS) for complex impedances
  const numRe = zLR - zSR;
  const numIm = zLI - zSI;
  const denRe = zLR + zSR;
  const denIm = zLI + zSI;
  const denMagSq = denRe * denRe + denIm * denIm;
  if (denMagSq === 0) return null;

  const gammaRe = (numRe * denRe + numIm * denIm) / denMagSq;
  const gammaIm = (numIm * denRe - numRe * denIm) / denMagSq;
  const gammaMag = Math.sqrt(gammaRe * gammaRe + gammaIm * gammaIm);

  const vswr = gammaMag >= 1 ? Infinity : (1 + gammaMag) / (1 - gammaMag);
  const returnLossDb = gammaMag === 0 ? Infinity : -20 * Math.log10(gammaMag);
  const powerTransferPct = (1 - gammaMag * gammaMag) * 100;
  const mismatchLossDb =
    powerTransferPct <= 0
      ? Infinity
      : -10 * Math.log10(powerTransferPct / 100);

  return {
    gammaRe,
    gammaIm,
    gammaMag,
    vswr,
    returnLossDb,
    powerTransferPct,
    mismatchLossDb,
  };
}

export default function ImpedanceMatchingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.impedance-matching-calculator");
  const [srcReal, setSrcReal] = React.useState<string>("50");
  const [srcImag, setSrcImag] = React.useState<string>("0");
  const [loadReal, setLoadReal] = React.useState<string>("");
  const [loadImag, setLoadImag] = React.useState<string>("0");
  const [touched, setTouched] = React.useState(false);

  const zSR = parseFloat(srcReal);
  const zSI = parseFloat(srcImag || "0");
  const zLR = parseFloat(loadReal);
  const zLI = parseFloat(loadImag || "0");

  const isValid =
    srcReal !== "" &&
    loadReal !== "" &&
    Number.isFinite(zSR) &&
    Number.isFinite(zSI) &&
    Number.isFinite(zLR) &&
    Number.isFinite(zLI);

  const result = React.useMemo(() => {
    if (!isValid) return null;
    return calcImpedanceMatching(zSR, zSI, zLR, zLI);
  }, [isValid, zSR, zSI, zLR, zLI]);

  function getMatchLabel(vswr: number): string {
    if (vswr <= 1.001) return t("result.perfectMatch");
    if (vswr < 2) return t("result.goodMatch");
    return t("result.poorMatch");
  }

  function reset() {
    setSrcReal("50");
    setSrcImag("0");
    setLoadReal("");
    setLoadImag("0");
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

  const showError = touched && !isValid;

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
              <Label htmlFor="imc-src-real">{t("field.sourceReal")}</Label>
              <Input
                id="imc-src-real"
                type="number"
                inputMode="decimal"
                value={srcReal}
                placeholder={t("placeholder.sourceReal")}
                onChange={(e) => {
                  setSrcReal(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imc-src-imag">{t("field.sourceImag")}</Label>
              <Input
                id="imc-src-imag"
                type="number"
                inputMode="decimal"
                value={srcImag}
                placeholder={t("placeholder.sourceImag")}
                onChange={(e) => {
                  setSrcImag(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imc-load-real">{t("field.loadReal")}</Label>
              <Input
                id="imc-load-real"
                type="number"
                inputMode="decimal"
                value={loadReal}
                placeholder={t("placeholder.loadReal")}
                onChange={(e) => {
                  setLoadReal(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imc-load-imag">{t("field.loadImag")}</Label>
              <Input
                id="imc-load-imag"
                type="number"
                inputMode="decimal"
                value={loadImag}
                placeholder={t("placeholder.loadImag")}
                onChange={(e) => {
                  setLoadImag(e.target.value);
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
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.reflectionCoeff")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.gammaMag, 4)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.vswr")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {Number.isFinite(result.vswr)
                      ? fmt(result.vswr, 2) + ":1"
                      : "∞"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.returnLoss")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {Number.isFinite(result.returnLossDb)
                      ? fmt(result.returnLossDb, 2) + " dB"
                      : "∞ dB"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.powerTransfer")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.powerTransferPct, 1)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.mismatchLoss")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {Number.isFinite(result.mismatchLossDb)
                      ? fmt(result.mismatchLossDb, 3) + " dB"
                      : "∞ dB"}
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-600">
                {getMatchLabel(result.vswr)}
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
