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

interface ExpandedResult {
  parts: string[];
  expanded: string;
  normalizedInput: string;
}

function addThousandsSeparators(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatInputDisplay(cleaned: string): string {
  const isNegative = cleaned.startsWith("-");
  const raw = isNegative ? cleaned.slice(1) : cleaned;
  const [intPartRaw = "", decPart] = raw.split(".");
  const intPart = intPartRaw.replace(/^0+(?=\d)/, "") || "0";
  const formattedInt = addThousandsSeparators(intPart);
  const value = decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
  return isNegative && value !== "0" ? `-${value}` : value;
}

function expandNumber(input: string): ExpandedResult | null {
  const cleaned = input.replace(/[,\s]/g, "");
  if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null;

  const num = parseFloat(cleaned);
  if (!Number.isFinite(num)) return null;

  const isNegative = cleaned.startsWith("-") && num !== 0;
  const absolute = isNegative ? cleaned.slice(1) : cleaned;
  const [intPart = "", decPart] = absolute.split(".");
  const parts: string[] = [];

  const intDigits = intPart.replace(/^0+/, "") || "0";
  for (let i = 0; i < intDigits.length; i += 1) {
    const digit = parseInt(intDigits[i] ?? "0", 10);
    if (digit !== 0) {
      const placeValue = Math.pow(10, intDigits.length - 1 - i);
      parts.push((digit * placeValue).toLocaleString("en-US"));
    }
  }

  if (decPart) {
    for (let i = 0; i < decPart.length; i += 1) {
      const digit = parseInt(decPart[i] ?? "0", 10);
      if (digit !== 0) {
        parts.push(`0.${"0".repeat(i)}${digit}`);
      }
    }
  }

  if (parts.length === 0) {
    parts.push("0");
  }

  const prefix = isNegative ? "-(" : "";
  const suffix = isNegative ? ")" : "";

  return {
    parts,
    expanded: `${prefix}${parts.join(" + ")}${suffix}`,
    normalizedInput: formatInputDisplay(cleaned),
  };
}

export default function ExpandedFormCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.expanded-form-calculator");
  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!value.trim()) return null;
    return expandNumber(value);
  }, [value]);

  function reset() {
    setValue("");
    setTouched(false);
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

  const showError = touched && value.trim() !== "" && result === null;

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
            <Label htmlFor="expanded-number">{t("field.number")}</Label>
            <Input
              id="expanded-number"
              type="text"
              inputMode="decimal"
              value={value}
              placeholder={t("placeholder.number")}
              onChange={(e) => {
                setValue(e.target.value);
                setTouched(true);
              }}
            />
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
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t("result.expression", {
                  input: result.normalizedInput,
                  expanded: result.expanded,
                })}
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                {t("result.parts", { count: result.parts.length })}
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
