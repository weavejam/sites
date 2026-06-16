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

type Operation = "add" | "subtract";

interface FaqItem {
  q: string;
  a: string;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

interface FractionResult {
  num: number;
  den: number;
  lcd: number;
  n1Converted: number;
  n2Converted: number;
  rawNum: number;
}

function computeFraction(
  num1: number,
  den1: number,
  num2: number,
  den2: number,
  op: Operation
): FractionResult {
  const lcd = lcm(Math.abs(den1), Math.abs(den2));
  const factor1 = (lcd / Math.abs(den1)) * Math.sign(den1);
  const factor2 = (lcd / Math.abs(den2)) * Math.sign(den2);
  const n1 = num1 * factor1;
  const n2 = num2 * factor2;
  const rawNum = op === "add" ? n1 + n2 : n1 - n2;
  const g = gcd(Math.abs(rawNum), lcd);
  return {
    num: rawNum / g,
    den: lcd / g,
    lcd,
    n1Converted: n1,
    n2Converted: n2,
    rawNum,
  };
}

export default function AddingAndSubtractingFractionsCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations(
    "tool.adding-and-subtracting-fractions-calculator"
  );

  const [op, setOp] = React.useState<Operation>("add");
  const [num1, setNum1] = React.useState("");
  const [den1, setDen1] = React.useState("");
  const [num2, setNum2] = React.useState("");
  const [den2, setDen2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const n1 = parseFloat(num1);
  const d1 = parseFloat(den1);
  const n2 = parseFloat(num2);
  const d2 = parseFloat(den2);

  const num1Valid = num1 !== "" && Number.isInteger(n1);
  const den1Valid = den1 !== "" && Number.isInteger(d1) && d1 !== 0;
  const num2Valid = num2 !== "" && Number.isInteger(n2);
  const den2Valid = den2 !== "" && Number.isInteger(d2) && d2 !== 0;

  const result = React.useMemo<FractionResult | null>(() => {
    if (!num1Valid || !den1Valid || !num2Valid || !den2Valid) return null;
    return computeFraction(n1, d1, n2, d2, op);
  }, [n1, d1, n2, d2, op, num1Valid, den1Valid, num2Valid, den2Valid]);

  function reset() {
    setNum1("");
    setDen1("");
    setNum2("");
    setDen2("");
    setOp("add");
    setTouched(false);
  }

  const faqItems: FaqItem[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as {
      input: string;
      output: string;
      note: string;
    }[];
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

  const showError =
    touched && (!num1Valid || !den1Valid || !num2Valid || !den2Valid);

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
            <Label>{t("field.operation")}</Label>
            <div className="flex gap-2">
              {(["add", "subtract"] as Operation[]).map((o) => (
                <Button
                  key={o}
                  type="button"
                  variant={op === o ? "default" : "outline"}
                  onClick={() => {
                    setOp(o);
                    setTouched(false);
                  }}
                >
                  {t(`type.${o}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="text-sm font-medium">{t("field.fraction1")}</div>
                <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="asf-n1">{t("field.num1")}</Label>
                  <Input
                    id="asf-n1"
                    type="number"
                    inputMode="numeric"
                    value={num1}
                    placeholder={t("placeholder.num")}
                    onChange={(e) => {
                      setNum1(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="asf-d1">{t("field.den1")}</Label>
                  <Input
                    id="asf-d1"
                    type="number"
                    inputMode="numeric"
                    value={den1}
                    placeholder={t("placeholder.den")}
                    onChange={(e) => {
                      setDen1(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium">{t("field.fraction2")}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="asf-n2">{t("field.num2")}</Label>
                  <Input
                    id="asf-n2"
                    type="number"
                    inputMode="numeric"
                    value={num2}
                    placeholder={t("placeholder.num")}
                    onChange={(e) => {
                      setNum2(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="asf-d2">{t("field.den2")}</Label>
                  <Input
                    id="asf-d2"
                    type="number"
                    inputMode="numeric"
                    value={den2}
                    placeholder={t("placeholder.den")}
                    onChange={(e) => {
                      setDen2(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              </div>
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
            <div className="space-y-1 text-sm text-red-600">
              {!num1Valid && <p>{t("error.invalidNum1")}</p>}
              {num1Valid && !den1Valid && <p>{t("error.invalidDen1")}</p>}
              {num1Valid && den1Valid && !num2Valid && (
                <p>{t("error.invalidNum2")}</p>
              )}
              {num1Valid && den1Valid && num2Valid && !den2Valid && (
                <p>{t("error.invalidDen2")}</p>
              )}
            </div>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {result.den === 1
                  ? result.num
                  : t("result.fraction", {
                      num: result.num,
                      den: result.den,
                    })}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.steps", {
                  lcd: result.lcd,
                  n1: result.n1Converted,
                  n2: result.n2Converted,
                  rn: result.rawNum,
                  op: op === "add" ? "+" : "−",
                  num: result.num,
                  den: result.den,
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
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
