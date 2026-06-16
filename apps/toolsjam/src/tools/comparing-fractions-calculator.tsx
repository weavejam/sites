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

type Method = "decimal" | "commonDenominator" | "crossMultiplication";

const METHODS: Method[] = ["decimal", "commonDenominator", "crossMultiplication"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    [x, y] = [y, x % y];
  }
  return x;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function normalizeFraction(numerator: number, denominator: number) {
  if (denominator < 0) {
    return { numerator: -numerator, denominator: -denominator };
  }
  return { numerator, denominator };
}

function fractionText(numerator: number, denominator: number): string {
  return `${numerator}/${denominator}`;
}

export default function ComparingFractionsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.comparing-fractions-calculator");
  const [firstNumerator, setFirstNumerator] = React.useState("");
  const [firstDenominator, setFirstDenominator] = React.useState("");
  const [secondNumerator, setSecondNumerator] = React.useState("");
  const [secondDenominator, setSecondDenominator] = React.useState("");
  const [method, setMethod] = React.useState<Method>("crossMultiplication");
  const [touched, setTouched] = React.useState(false);

  const howtoSteps: string[] = React.useMemo(
    () => (t.raw("howto.steps") as string[] | undefined) ?? [],
    [t]
  );

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems: ExampleItem[] = React.useMemo(
    () => (t.raw("examples.items") as ExampleItem[] | undefined) ?? [],
    [t]
  );

  const result = React.useMemo(() => {
    if (!touched) return null;

    if (
      firstNumerator.trim() === "" ||
      firstDenominator.trim() === "" ||
      secondNumerator.trim() === "" ||
      secondDenominator.trim() === ""
    ) {
      return { error: "invalidIntegers" as const };
    }

    const rawValues = [
      Number(firstNumerator),
      Number(firstDenominator),
      Number(secondNumerator),
      Number(secondDenominator),
    ];

    if (rawValues.some((value) => !Number.isInteger(value))) {
      return { error: "invalidIntegers" as const };
    }

    if (rawValues[1] === 0 || rawValues[3] === 0) {
      return { error: "zeroDenominator" as const };
    }

    const left = normalizeFraction(rawValues[0], rawValues[1]);
    const right = normalizeFraction(rawValues[2], rawValues[3]);
    const leftValue = left.numerator / left.denominator;
    const rightValue = right.numerator / right.denominator;
    const leftFraction = fractionText(left.numerator, left.denominator);
    const rightFraction = fractionText(right.numerator, right.denominator);

    const compareValue =
      Math.abs(leftValue - rightValue) < 1e-12
        ? "equal"
        : leftValue > rightValue
          ? "greater"
          : "less";
    const symbol = compareValue === "equal" ? "=" : compareValue === "greater" ? ">" : "<";

    let steps: string[] = [];

    if (method === "decimal") {
      steps = [
        t("step.decimal.entered", {
          leftFraction,
          rightFraction,
        }),
        t("step.decimal.converted", {
          leftFraction,
          leftValue: formatNumber(leftValue),
          rightFraction,
          rightValue: formatNumber(rightValue),
        }),
        t("step.decimal.compared", {
          leftValue: formatNumber(leftValue),
          symbol,
          rightValue: formatNumber(rightValue),
        }),
      ];
    } else if (method === "commonDenominator") {
      const commonDenominator = lcm(left.denominator, right.denominator);
      const leftScaled = left.numerator * (commonDenominator / left.denominator);
      const rightScaled = right.numerator * (commonDenominator / right.denominator);
      steps = [
        t("step.commonDenominator.lcm", {
          firstDenominator: left.denominator,
          secondDenominator: right.denominator,
          commonDenominator,
        }),
        t("step.commonDenominator.converted", {
          leftFraction,
          leftScaled,
          rightFraction,
          rightScaled,
          commonDenominator,
        }),
        t("step.commonDenominator.compared", {
          leftScaled,
          symbol,
          rightScaled,
        }),
      ];
    } else {
      const leftCross = left.numerator * right.denominator;
      const rightCross = right.numerator * left.denominator;
      steps = [
        t("step.crossMultiplication.left", {
          leftNumerator: left.numerator,
          rightDenominator: right.denominator,
          leftCross,
        }),
        t("step.crossMultiplication.right", {
          rightNumerator: right.numerator,
          leftDenominator: left.denominator,
          rightCross,
        }),
        t("step.crossMultiplication.compared", {
          leftCross,
          symbol,
          rightCross,
        }),
      ];
    }

    return {
      leftFraction,
      rightFraction,
      compareValue,
      symbol,
      steps,
    };
  }, [
    firstNumerator,
    firstDenominator,
    secondNumerator,
    secondDenominator,
    method,
    touched,
    t,
  ]);

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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  function reset() {
    setFirstNumerator("");
    setFirstDenominator("");
    setSecondNumerator("");
    setSecondDenominator("");
    setMethod("crossMultiplication");
    setTouched(false);
  }

  function loadExample(
    a: string,
    b: string,
    c: string,
    d: string,
    nextMethod: Method
  ) {
    setFirstNumerator(a);
    setFirstDenominator(b);
    setSecondNumerator(c);
    setSecondDenominator(d);
    setMethod(nextMethod);
    setTouched(true);
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
            <Label>{t("field.method")}</Label>
            <div className="flex flex-wrap gap-2">
              {METHODS.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={method === value ? "default" : "outline"}
                  onClick={() => {
                    setMethod(value);
                    setTouched(false);
                  }}
                >
                  {t(`method.${value}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("field.firstFraction")}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fraction-first-numerator">
                    {t("field.firstNumerator")}
                  </Label>
                  <Input
                    id="fraction-first-numerator"
                    type="number"
                    inputMode="numeric"
                    step={1}
                    value={firstNumerator}
                    placeholder={t("placeholder.integer")}
                    onChange={(event) => {
                      setFirstNumerator(event.target.value);
                      setTouched(false);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fraction-first-denominator">
                    {t("field.firstDenominator")}
                  </Label>
                  <Input
                    id="fraction-first-denominator"
                    type="number"
                    inputMode="numeric"
                    step={1}
                    value={firstDenominator}
                    placeholder={t("placeholder.integer")}
                    onChange={(event) => {
                      setFirstDenominator(event.target.value);
                      setTouched(false);
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("field.secondFraction")}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fraction-second-numerator">
                    {t("field.secondNumerator")}
                  </Label>
                  <Input
                    id="fraction-second-numerator"
                    type="number"
                    inputMode="numeric"
                    step={1}
                    value={secondNumerator}
                    placeholder={t("placeholder.integer")}
                    onChange={(event) => {
                      setSecondNumerator(event.target.value);
                      setTouched(false);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fraction-second-denominator">
                    {t("field.secondDenominator")}
                  </Label>
                  <Input
                    id="fraction-second-denominator"
                    type="number"
                    inputMode="numeric"
                    step={1}
                    value={secondDenominator}
                    placeholder={t("placeholder.integer")}
                    onChange={(event) => {
                      setSecondDenominator(event.target.value);
                      setTouched(false);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result && "error" in result && result.error === "invalidIntegers" && (
            <p className="text-sm text-red-600">{t("error.invalidIntegers")}</p>
          )}
          {result && "error" in result && result.error === "zeroDenominator" && (
            <p className="text-sm text-red-600">{t("error.zeroDenominator")}</p>
          )}

          {result && !("error" in result) && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-[160px,1fr]">
                <Card>
                  <CardContent className="flex h-full flex-col items-center justify-center gap-2 pt-6">
                    <div className="text-sm text-zinc-500">{t("result.comparison")}</div>
                    <div className="text-4xl font-bold text-zinc-900">{result.symbol}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="space-y-2 pt-6">
                    <div className="text-lg font-semibold text-zinc-900">
                      {t(`result.${result.compareValue}` as never, {
                        leftFraction: result.leftFraction,
                        rightFraction: result.rightFraction,
                      })}
                    </div>
                    <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-700">
                      {result.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {example.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("3", "4", "2", "3", "crossMultiplication")}
          >
            {t("examples.loadGreater")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "2", "2", "4", "commonDenominator")}
          >
            {t("examples.loadEqual")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("5", "8", "7", "10", "decimal")}
          >
            {t("examples.loadLess")}
          </Button>
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
