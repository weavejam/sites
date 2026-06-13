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

type LogType = "ln" | "log10" | "custom";
type Rule = "product" | "quotient" | "power";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface ExpansionResult {
  symbolic: string;
  numeric: number;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value === Infinity) return "∞";
  if (value === -Infinity) return "-∞";
  return value.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function computeLog(value: number, logType: LogType, base: number): number {
  if (logType === "ln") return Math.log(value);
  if (logType === "log10") return Math.log10(value);
  return Math.log(value) / Math.log(base);
}

function logName(logType: LogType, base: number): string {
  if (logType === "ln") return "ln";
  if (logType === "log10") return "log";
  return `log_${formatNumber(base)}`;
}

export default function ExpandingLogarithmsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.expanding-logarithms-calculator");
  const [logType, setLogType] = React.useState<LogType>("log10");
  const [rule, setRule] = React.useState<Rule>("product");
  const [base, setBase] = React.useState("");
  const [m, setM] = React.useState("");
  const [n, setN] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const baseNum = parseFloat(base);
  const mNum = parseFloat(m);
  const nNum = parseFloat(n);

  const result = React.useMemo<ExpansionResult | null>(() => {
    const baseValue = logType === "custom" ? baseNum : 10;
    const hasValidBase =
      logType !== "custom" ||
      (Number.isFinite(baseValue) && baseValue > 0 && baseValue !== 1);
    const hasValidM = Number.isFinite(mNum) && mNum > 0;
    const hasValidN =
      rule === "power"
        ? Number.isFinite(nNum)
        : Number.isFinite(nNum) && nNum > 0;

    if (!hasValidBase || !hasValidM || !hasValidN) return null;

    const name = logName(logType, baseValue);
    const mValue = formatNumber(mNum);
    const nValue = formatNumber(nNum);

    switch (rule) {
      case "product":
        return {
          symbolic: `${name}(${mValue} · ${nValue}) = ${name}(${mValue}) + ${name}(${nValue})`,
          numeric: computeLog(mNum * nNum, logType, baseValue),
        };
      case "quotient":
        return {
          symbolic: `${name}(${mValue} / ${nValue}) = ${name}(${mValue}) - ${name}(${nValue})`,
          numeric: computeLog(mNum / nNum, logType, baseValue),
        };
      case "power":
        return {
          symbolic: `${name}(${mValue}^${nValue}) = ${nValue} · ${name}(${mValue})`,
          numeric: nNum * computeLog(mNum, logType, baseValue),
        };
    }
  }, [baseNum, logType, mNum, nNum, rule]);

  function reset() {
    setLogType("log10");
    setRule("product");
    setBase("");
    setM("");
    setN("");
    setTouched(false);
  }

  function secondFieldLabel(): string {
    if (rule === "quotient") return t("field.denominator");
    if (rule === "power") return t("field.exponent");
    return t("field.n");
  }

  function firstFieldLabel(): string {
    if (rule === "quotient") return t("field.numerator");
    if (rule === "power") return t("field.argument");
    return t("field.m");
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        description: t("tagline"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const showError = touched && result === null;

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
            <Label>{t("field.logType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["ln", "log10", "custom"] as LogType[]).map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant={logType === item ? "default" : "outline"}
                  onClick={() => {
                    setLogType(item);
                    setTouched(false);
                  }}
                >
                  {t(`logType.${item}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.rule")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["product", "quotient", "power"] as Rule[]).map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant={rule === item ? "default" : "outline"}
                  onClick={() => {
                    setRule(item);
                    setTouched(false);
                  }}
                >
                  {t(`type.${item}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {logType === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="log-base">{t("field.base")}</Label>
                <Input
                  id="log-base"
                  type="number"
                  inputMode="decimal"
                  value={base}
                  placeholder={t("placeholder.base")}
                  onChange={(e) => {
                    setBase(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="log-m">{firstFieldLabel()}</Label>
              <Input
                id="log-m"
                type="number"
                inputMode="decimal"
                value={m}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setM(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="log-n">{secondFieldLabel()}</Label>
              <Input
                id="log-n"
                type="number"
                inputMode="decimal"
                value={n}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setN(e.target.value);
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

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-xl font-semibold text-zinc-900">
                {result.symbolic}
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                {t("result.numericValue", { value: formatNumber(result.numeric) })}
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">
                    {example.note ?? ""}
                  </td>
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
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
