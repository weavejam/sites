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

interface FaqItem {
  q: string;
  a: string;
}

type BaseType = "log10" | "ln" | "log2" | "custom";

const BASE_TYPES: BaseType[] = ["log10", "ln", "log2", "custom"];

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function LogCalculator(_props: { locale: Locale }): React.ReactNode {
  const t = useTranslations("tool.log-calculator");
  const [x, setX] = React.useState("");
  const [baseType, setBaseType] = React.useState<BaseType>("log10");
  const [customBase, setCustomBase] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const xNum = Number.parseFloat(x);
  const baseNum = Number.parseFloat(customBase);
  const isCustom = baseType === "custom";
  const xValid = x.trim() !== "" && Number.isFinite(xNum) && xNum > 0;
  const baseValid = !isCustom || (customBase.trim() !== "" && Number.isFinite(baseNum) && baseNum > 0 && baseNum !== 1);

  const result = React.useMemo<number | null>(() => {
    if (!xValid || !baseValid) return null;
    if (baseType === "log10") return Math.log10(xNum);
    if (baseType === "ln") return Math.log(xNum);
    if (baseType === "log2") return Math.log2(xNum);
    return Math.log(xNum) / Math.log(baseNum);
  }, [baseType, baseNum, baseValid, xNum, xValid]);

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

  function reset() {
    setX("");
    setBaseType("log10");
    setCustomBase("");
    setTouched(false);
  }

  const errorMessage = touched
    ? !xValid
      ? t("error.invalidNumber")
      : !baseValid
        ? t("error.invalidBase")
        : null
    : null;

  const expressionKey = baseType === "custom" ? "result.expression.custom" : `result.expression.${baseType}`;

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
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
            <Label htmlFor="log-number">{t("field.number")}</Label>
            <Input
              id="log-number"
              type="number"
              inputMode="decimal"
              value={x}
              onChange={(event) => {
                setX(event.target.value);
                setTouched(true);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("field.baseType")}</Label>
            <div className="flex flex-wrap gap-2">
              {BASE_TYPES.map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={baseType === option ? "default" : "outline"}
                  onClick={() => {
                    setBaseType(option);
                    setTouched(false);
                  }}
                >
                  {t(`field.baseTypeOptions.${option}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {isCustom && (
            <div className="space-y-2">
              <Label htmlFor="log-custom-base">{t("field.customBase")}</Label>
              <Input
                id="log-custom-base"
                type="number"
                inputMode="decimal"
                value={customBase}
                onChange={(event) => {
                  setCustomBase(event.target.value);
                  setTouched(true);
                }}
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t(expressionKey as never, {
                  x: formatNumber(xNum),
                  base: formatNumber(baseNum),
                  result: formatNumber(result),
                })}
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{item.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
