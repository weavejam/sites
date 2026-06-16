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

type ConversionType = "binaryToDecimal" | "decimalToBinary";

const TYPES: ConversionType[] = ["binaryToDecimal", "decimalToBinary"];

function isValidBinary(s: string): boolean {
  return /^[01]+(\.[01]+)?$/.test(s.trim());
}

function binaryFractionToDecimal(s: string): number {
  const [intPart = "0", fracPart = ""] = s.split(".");
  let result = 0;
  for (let i = 0; i < intPart.length; i++) {
    result += parseInt(intPart[intPart.length - 1 - i], 10) * Math.pow(2, i);
  }
  for (let i = 0; i < fracPart.length; i++) {
    result += parseInt(fracPart[i], 10) * Math.pow(2, -(i + 1));
  }
  return result;
}

function decimalToBinaryFraction(value: number, precision: number): string {
  if (value < 0) return "";
  const intPart = Math.floor(value);
  let fracPart = value - intPart;

  // Integer to binary
  let intBin = intPart === 0 ? "0" : intPart.toString(2);

  // Fractional part by repeated doubling
  let fracBin = "";
  let remaining = fracPart;
  for (let i = 0; i < precision && remaining > 0; i++) {
    remaining *= 2;
    if (remaining >= 1) {
      fracBin += "1";
      remaining -= 1;
    } else {
      fracBin += "0";
    }
  }

  return fracBin.length > 0 ? `${intBin}.${fracBin}` : intBin;
}

export default function BinaryFractionConverter(_props: { locale: Locale }) {
  const t = useTranslations("tool.binary-fraction-converter");
  const [convType, setConvType] = React.useState<ConversionType>("binaryToDecimal");
  const [value, setValue] = React.useState("");
  const [precision, setPrecision] = React.useState("8");
  const [touched, setTouched] = React.useState(false);

  const precisionNum = parseInt(precision, 10);
  const precisionValid = Number.isFinite(precisionNum) && precisionNum >= 1 && precisionNum <= 32;

  const result = React.useMemo<string | null>(() => {
    if (!touched || !value.trim()) return null;
    if (convType === "binaryToDecimal") {
      if (!isValidBinary(value.trim())) return null;
      const dec = binaryFractionToDecimal(value.trim());
      return dec.toString();
    } else {
      const num = parseFloat(value);
      if (!Number.isFinite(num) || num < 0) return null;
      if (!precisionValid) return null;
      return decimalToBinaryFraction(num, precisionNum);
    }
  }, [touched, value, convType, precisionNum, precisionValid]);

  const showBinaryError =
    touched && convType === "binaryToDecimal" && value.trim() !== "" && !isValidBinary(value.trim());
  const showDecimalError =
    touched && convType === "decimalToBinary" && value.trim() !== "" && (isNaN(parseFloat(value)) || parseFloat(value) < 0);
  const showPrecisionError = touched && convType === "decimalToBinary" && !precisionValid;

  function reset() {
    setValue("");
    setPrecision("8");
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
          <div className="space-y-2">
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={convType === ct ? "default" : "outline"}
                  onClick={() => {
                    setConvType(ct);
                    setTouched(false);
                  }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${convType}_desc` as never)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bfc-value">{t("field.value")}</Label>
              <Input
                id="bfc-value"
                type="text"
                value={value}
                placeholder={
                  convType === "binaryToDecimal"
                    ? t("field.valuePlaceholder")
                    : t("field.decimalPlaceholder")
                }
                onChange={(e) => {
                  setValue(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            {convType === "decimalToBinary" && (
              <div className="space-y-2">
                <Label htmlFor="bfc-precision">{t("field.precision")}</Label>
                <Input
                  id="bfc-precision"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={32}
                  value={precision}
                  placeholder={t("field.precisionPlaceholder")}
                  onChange={(e) => {
                    setPrecision(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.convert")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showBinaryError && (
            <p className="text-sm text-red-600">{t("error.invalidBinary")}</p>
          )}
          {showDecimalError && (
            <p className="text-sm text-red-600">{t("error.invalidDecimal")}</p>
          )}
          {showPrecisionError && (
            <p className="text-sm text-red-600">{t("error.invalidPrecision")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {convType === "binaryToDecimal"
                  ? `${t("result.decimalValue")}: ${result}`
                  : `${t("result.binaryValue")}: ${result}`}
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
