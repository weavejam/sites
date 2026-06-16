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

type InputFormat = "decimal" | "binary";
type ShiftType = "leftShift" | "logicalRightShift" | "arithmeticRightShift";

const SHIFT_TYPES: ShiftType[] = ["leftShift", "logicalRightShift", "arithmeticRightShift"];

interface ShiftResult {
  binary: string;
  decimal: number;
  hex: string;
}

function computeShift(value: number, shiftType: ShiftType, amount: number): ShiftResult {
  let resultNum: number;
  if (shiftType === "leftShift") {
    resultNum = value << amount;
  } else if (shiftType === "logicalRightShift") {
    resultNum = value >>> amount;
  } else {
    resultNum = value >> amount;
  }
  const binary = resultNum < 0
    ? (resultNum >>> 0).toString(2)
    : resultNum.toString(2);
  const hex = (resultNum >>> 0).toString(16).toUpperCase();
  return { binary, decimal: resultNum, hex };
}

export default function BitShiftCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.bit-shift-calculator");
  const [inputFormat, setInputFormat] = React.useState<InputFormat>("decimal");
  const [number, setNumber] = React.useState("");
  const [shiftType, setShiftType] = React.useState<ShiftType>("leftShift");
  const [shiftAmount, setShiftAmount] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const shiftAmountNum = parseInt(shiftAmount, 10);
  const shiftAmountValid = !isNaN(shiftAmountNum) && shiftAmountNum >= 0 && shiftAmountNum <= 31;

  const parsedValue = React.useMemo<number | null>(() => {
    if (!number.trim()) return null;
    if (inputFormat === "decimal") {
      const n = parseInt(number.trim(), 10);
      return Number.isInteger(n) ? n : null;
    } else {
      if (!/^[01]+$/.test(number.trim())) return null;
      return parseInt(number.trim(), 2);
    }
  }, [number, inputFormat]);

  const result = React.useMemo<ShiftResult | null>(() => {
    if (!touched || parsedValue === null || !shiftAmountValid) return null;
    return computeShift(parsedValue, shiftType, shiftAmountNum);
  }, [touched, parsedValue, shiftType, shiftAmountNum, shiftAmountValid]);

  const showNumberError =
    touched &&
    number.trim() !== "" &&
    parsedValue === null;

  const showShiftError = touched && shiftAmount.trim() !== "" && !shiftAmountValid;
  const showEmptyError = touched && (number.trim() === "" || shiftAmount.trim() === "");

  function reset() {
    setNumber("");
    setShiftAmount("");
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
            <Label>{t("field.inputFormat")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["decimal", "binary"] as InputFormat[]).map((fmt) => (
                <Button
                  key={fmt}
                  type="button"
                  variant={inputFormat === fmt ? "default" : "outline"}
                  onClick={() => { setInputFormat(fmt); setTouched(false); setNumber(""); }}
                >
                  {t(`type.${fmt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bsc-number">{t("field.number")}</Label>
              <Input
                id="bsc-number"
                type="text"
                value={number}
                placeholder={
                  inputFormat === "decimal"
                    ? t("field.numberDecimalPlaceholder")
                    : t("field.numberBinaryPlaceholder")
                }
                onChange={(e) => { setNumber(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bsc-amount">{t("field.shiftAmount")}</Label>
              <Input
                id="bsc-amount"
                type="number"
                inputMode="numeric"
                min={0}
                max={31}
                value={shiftAmount}
                placeholder={t("field.shiftAmountPlaceholder")}
                onChange={(e) => { setShiftAmount(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.shiftType")}</Label>
            <div className="flex flex-wrap gap-2">
              {SHIFT_TYPES.map((st) => (
                <Button
                  key={st}
                  type="button"
                  variant={shiftType === st ? "default" : "outline"}
                  onClick={() => { setShiftType(st); setTouched(false); }}
                >
                  {t(`type.${st}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${shiftType}_desc` as never)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showNumberError && inputFormat === "decimal" && (
            <p className="text-sm text-red-600">{t("error.invalidDecimal")}</p>
          )}
          {showNumberError && inputFormat === "binary" && (
            <p className="text-sm text-red-600">{t("error.invalidBinary")}</p>
          )}
          {showShiftError && (
            <p className="text-sm text-red-600">{t("error.invalidShiftAmount")}</p>
          )}
          {showEmptyError && (
            <p className="text-sm text-red-600">{t("error.empty")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.binary")}</div>
                  <div className="text-lg font-semibold text-zinc-900 font-mono">{result.binary}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.decimal")}</div>
                  <div className="text-lg font-semibold text-zinc-900">{result.decimal}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.hex")}</div>
                  <div className="text-lg font-semibold text-zinc-900 font-mono">0x{result.hex}</div>
                </div>
              </div>
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
