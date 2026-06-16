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

type Method = "standardBorrowing" | "twosComplement";
const METHODS: Method[] = ["standardBorrowing", "twosComplement"];

function isValidBinaryInt(s: string): boolean {
  return /^[01]+$/.test(s.trim());
}

interface SubtractionResult {
  difference: string;
  decimal: number;
  steps: string[];
  isNegative: boolean;
}

function subtractBinary(
  minuend: string,
  subtrahend: string,
  method: Method,
  tFn: (key: string, vals?: Record<string, string | number>) => string
): SubtractionResult {
  const decA = parseInt(minuend, 2);
  const decB = parseInt(subtrahend, 2);
  const diff = decA - decB;
  const steps: string[] = [];
  let binaryDiff: string;
  let isNegative = false;

  if (method === "standardBorrowing") {
    if (diff < 0) {
      isNegative = true;
      binaryDiff = Math.abs(diff).toString(2);
      steps.push(tFn("result.stepNegativeFlag", { a: minuend, b: subtrahend }));
      steps.push(tFn("result.stepAbsDiff", { decA, decB, abs: Math.abs(diff), bin: binaryDiff }));
    } else {
      binaryDiff = diff.toString(2);
      steps.push(tFn("result.stepMinuend", { a: minuend, decA }));
      steps.push(tFn("result.stepSubtrahend", { b: subtrahend, decB }));
      steps.push(tFn("result.stepSubtractColumns", {}));
      steps.push(tFn("result.stepDifference", { bin: binaryDiff, dec: diff }));
    }
  } else {
    // Two's complement
    const width = Math.max(minuend.length, subtrahend.length) + 1;
    const paddedB = subtrahend.padStart(width, "0");
    const onesComp = paddedB.split("").map((b) => (b === "0" ? "1" : "0")).join("");
    const twosComp = (parseInt(onesComp, 2) + 1).toString(2).padStart(width, "0");
    const paddedA = minuend.padStart(width, "0");
    const sumDec = parseInt(paddedA, 2) + parseInt(twosComp, 2);
    const mask = (1 << width) - 1;
    const maskedSum = sumDec & mask;
    binaryDiff = maskedSum.toString(2);
    steps.push(tFn("result.stepSubtrahendPadded", { b: paddedB }));
    steps.push(tFn("result.stepOnesComp", { ones: onesComp }));
    steps.push(tFn("result.stepTwosComp", { twos: twosComp }));
    steps.push(tFn("result.stepMinuendPadded", { a: paddedA }));
    steps.push(tFn("result.stepSumResult", { a: paddedA, twos: twosComp, sum: sumDec.toString(2), result: binaryDiff }));
    steps.push(tFn("result.stepDecResult", { dec: diff }));
    isNegative = diff < 0;
  }

  return { difference: binaryDiff, decimal: diff, steps, isNegative };
}

export default function BinarySubtractionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.binary-subtraction-calculator");
  const [minuend, setMinuend] = React.useState("");
  const [subtrahend, setSubtrahend] = React.useState("");
  const [method, setMethod] = React.useState<Method>("standardBorrowing");
  const [showSteps, setShowSteps] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const minuendValid = minuend.trim() !== "" && isValidBinaryInt(minuend.trim());
  const subtrahendValid = subtrahend.trim() !== "" && isValidBinaryInt(subtrahend.trim());

  const result = React.useMemo<SubtractionResult | null>(() => {
    if (!touched || !minuendValid || !subtrahendValid) return null;
    return subtractBinary(minuend.trim(), subtrahend.trim(), method, (key, vals) => t(key as never, vals));
  }, [touched, minuend, subtrahend, method, minuendValid, subtrahendValid, t]);

  const showMinuendError = touched && minuend.trim() !== "" && !isValidBinaryInt(minuend.trim());
  const showSubtrahendError = touched && subtrahend.trim() !== "" && !isValidBinaryInt(subtrahend.trim());
  const showEmptyError = touched && (minuend.trim() === "" || subtrahend.trim() === "");
  const showNegativeError = result?.isNegative && method === "standardBorrowing";

  function reset() {
    setMinuend("");
    setSubtrahend("");
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
              <Label htmlFor="bsc-minuend">{t("field.minuend")}</Label>
              <Input
                id="bsc-minuend"
                type="text"
                value={minuend}
                placeholder={t("field.minuendPlaceholder")}
                onChange={(e) => { setMinuend(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bsc-subtrahend">{t("field.subtrahend")}</Label>
              <Input
                id="bsc-subtrahend"
                type="text"
                value={subtrahend}
                placeholder={t("field.subtrahendPlaceholder")}
                onChange={(e) => { setSubtrahend(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.method")}</Label>
            <div className="flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={method === m ? "default" : "outline"}
                  onClick={() => { setMethod(m); setTouched(false); }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${method}_desc` as never)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="bsc-steps"
              type="checkbox"
              checked={showSteps}
              onChange={(e) => setShowSteps(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300"
            />
            <Label htmlFor="bsc-steps">{t("field.showSteps")}</Label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showMinuendError && (
            <p className="text-sm text-red-600">{t("error.invalidMinuend")}</p>
          )}
          {showSubtrahendError && (
            <p className="text-sm text-red-600">{t("error.invalidSubtrahend")}</p>
          )}
          {showEmptyError && (
            <p className="text-sm text-red-600">{t("error.empty")}</p>
          )}
          {showNegativeError && (
            <p className="text-sm text-amber-600">{t("error.negative")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.difference")}: {result.isNegative && method === "standardBorrowing" ? "−" : ""}{result.difference}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.decimal")}: {result.decimal}
              </div>
              {showSteps && result.steps.length > 0 && (
                <div className="mt-3 space-y-1">
                  <div className="text-sm font-medium text-zinc-500">{t("result.steps")}</div>
                  <ul className="text-sm text-zinc-700 space-y-1 font-mono">
                    {result.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
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
