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

type TestType = "common" | "custom";

const COMMON_DIVISORS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface DivisorResult {
  divisor: number;
  isDivisible: boolean;
  remainder: number;
}

export default function DivisibilityTestCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.divisibility-test-calculator");
  const [number, setNumber] = React.useState("");
  const [testType, setTestType] = React.useState<TestType>("common");
  const [customInput, setCustomInput] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const numFloat = parseFloat(number);
  const numVal = numFloat;
  const numValid =
    number !== "" &&
    Number.isFinite(numFloat) &&
    numFloat > 0 &&
    Number.isInteger(numFloat);

  const customDivisors: number[] = React.useMemo(() => {
    if (testType !== "custom") return [];
    return customInput
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => Number.isFinite(n) && Number.isInteger(n) && n > 0);
  }, [customInput, testType]);

  const customValid = testType !== "custom" || customDivisors.length > 0;

  const results: DivisorResult[] = React.useMemo(() => {
    if (!numValid || !customValid || !touched) return [];
    const divisors = testType === "common" ? COMMON_DIVISORS : customDivisors;
    return divisors.map((d) => ({
      divisor: d,
      remainder: numVal % d,
      isDivisible: numVal % d === 0,
    }));
  }, [numVal, testType, customDivisors, numValid, customValid, touched]);

  function reset() {
    setNumber("");
    setCustomInput("");
    setTestType("common");
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

  const showNumError = touched && !numValid;
  const showCustomError = touched && testType === "custom" && !customValid;

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
            <Label htmlFor="dt-number">{t("field.number")}</Label>
            <Input
              id="dt-number"
              type="number"
              inputMode="numeric"
              value={number}
              placeholder={t("placeholder.number")}
              onChange={(e) => {
                setNumber(e.target.value);
                setTouched(true);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("field.testType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["common", "custom"] as TestType[]).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={testType === type ? "default" : "outline"}
                  onClick={() => {
                    setTestType(type);
                    setTouched(false);
                  }}
                >
                  {t(`type.${type}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {testType === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="dt-custom">{t("field.customDivisors")}</Label>
              <Input
                id="dt-custom"
                type="text"
                inputMode="numeric"
                value={customInput}
                placeholder={t("placeholder.custom")}
                onChange={(e) => {
                  setCustomInput(e.target.value);
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

          {showNumError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showCustomError && (
            <p className="text-sm text-red-600">{t("error.customInvalid")}</p>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50">
                      <th className="px-3 py-2 font-semibold">
                        {t("result.divisor")}
                      </th>
                      <th className="px-3 py-2 font-semibold">
                        {t("result.divisible")}
                      </th>
                      <th className="px-3 py-2 font-semibold">
                        {t("result.remainder")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr
                        key={r.divisor}
                        className={`border-b border-zinc-100 ${
                          r.isDivisible ? "bg-green-50" : ""
                        }`}
                      >
                        <td className="px-3 py-2 font-medium text-zinc-900">
                          {r.divisor}
                        </td>
                        <td
                          className={`px-3 py-2 font-semibold ${
                            r.isDivisible
                              ? "text-green-700"
                              : "text-zinc-500"
                          }`}
                        >
                          {r.isDivisible
                            ? t("result.yes")
                            : t("result.no")}
                        </td>
                        <td className="px-3 py-2 text-zinc-600">
                          {r.remainder}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
