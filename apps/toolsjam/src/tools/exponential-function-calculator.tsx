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

interface FunctionResult {
  a: number;
  b: number;
  x: number;
  c: number;
  value: number;
}

function formatNumber(value: number): string {
  if (value === Infinity) return "∞";
  if (value === -Infinity) return "-∞";
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function evaluateExponentialFunction(
  a: number,
  b: number,
  x: number,
  c: number,
): FunctionResult | null {
  if (![a, b, x, c].every(Number.isFinite)) return null;
  if (b <= 0 || b === 1) return null;
  const value = a * Math.pow(b, x) + c;
  if (Number.isNaN(value)) return null;
  return { a, b, x, c, value };
}

export default function ExponentialFunctionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.exponential-function-calculator");
  const [a, setA] = React.useState("1");
  const [b, setB] = React.useState("");
  const [x, setX] = React.useState("");
  const [c, setC] = React.useState("0");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const xNum = parseFloat(x);
  const cNum = parseFloat(c);

  const result = React.useMemo(() => {
    if (b.trim() === "" || x.trim() === "" || a.trim() === "" || c.trim() === "") {
      return null;
    }
    return evaluateExponentialFunction(aNum, bNum, xNum, cNum);
  }, [a, aNum, b, bNum, c, cNum, x, xNum]);

  function reset() {
    setA("1");
    setB("");
    setX("");
    setC("0");
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="expfn-a">{t("field.a")}</Label>
              <Input
                id="expfn-a"
                type="number"
                inputMode="decimal"
                value={a}
                placeholder={t("placeholder.a")}
                onChange={(e) => {
                  setA(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expfn-b">{t("field.b")}</Label>
              <Input
                id="expfn-b"
                type="number"
                inputMode="decimal"
                value={b}
                placeholder={t("placeholder.b")}
                onChange={(e) => {
                  setB(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expfn-x">{t("field.x")}</Label>
              <Input
                id="expfn-x"
                type="number"
                inputMode="decimal"
                value={x}
                placeholder={t("placeholder.x")}
                onChange={(e) => {
                  setX(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expfn-c">{t("field.c")}</Label>
              <Input
                id="expfn-c"
                type="number"
                inputMode="decimal"
                value={c}
                placeholder={t("placeholder.c")}
                onChange={(e) => {
                  setC(e.target.value);
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
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t("result.expression", {
                  x: formatNumber(result.x),
                  a: formatNumber(result.a),
                  b: formatNumber(result.b),
                  c: formatNumber(result.c),
                  result: formatNumber(result.value),
                })}
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
