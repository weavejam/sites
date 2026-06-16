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

interface FaqItem {
  q: string;
  a: string;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e10) / 1e10;
  return r.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function AdditionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.addition-calculator");

  const [num1, setNum1] = React.useState("");
  const [num2, setNum2] = React.useState("");
  const [num3, setNum3] = React.useState("");
  const [num4, setNum4] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  const n3 = num3 !== "" ? parseFloat(num3) : null;
  const n4 = num4 !== "" ? parseFloat(num4) : null;

  const num1Valid = num1 !== "" && Number.isFinite(n1);
  const num2Valid = num2 !== "" && Number.isFinite(n2);
  const num3Valid = num3 === "" || Number.isFinite(n3!);
  const num4Valid = num4 === "" || Number.isFinite(n4!);

  const result = React.useMemo(() => {
    if (!num1Valid || !num2Valid || !num3Valid || !num4Valid) return null;
    const nums = [n1, n2];
    if (n3 !== null) nums.push(n3);
    if (n4 !== null) nums.push(n4);
    const sum = nums.reduce((a, b) => a + b, 0);
    const average = sum / nums.length;
    return { sum, average, count: nums.length };
  }, [n1, n2, n3, n4, num1Valid, num2Valid, num3Valid, num4Valid]);

  function reset() {
    setNum1("");
    setNum2("");
    setNum3("");
    setNum4("");
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
    touched && (!num1Valid || !num2Valid || !num3Valid || !num4Valid);

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
              <Label htmlFor="add-n1">{t("field.num1")}</Label>
              <Input
                id="add-n1"
                type="number"
                inputMode="decimal"
                value={num1}
                placeholder={t("placeholder.required")}
                onChange={(e) => {
                  setNum1(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-n2">{t("field.num2")}</Label>
              <Input
                id="add-n2"
                type="number"
                inputMode="decimal"
                value={num2}
                placeholder={t("placeholder.required")}
                onChange={(e) => {
                  setNum2(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-n3">{t("field.num3")}</Label>
              <Input
                id="add-n3"
                type="number"
                inputMode="decimal"
                value={num3}
                placeholder={t("placeholder.optional")}
                onChange={(e) => {
                  setNum3(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-n4">{t("field.num4")}</Label>
              <Input
                id="add-n4"
                type="number"
                inputMode="decimal"
                value={num4}
                placeholder={t("placeholder.optional")}
                onChange={(e) => {
                  setNum4(e.target.value);
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
            <div className="space-y-1 text-sm text-red-600">
              {!num1Valid && <p>{t("error.invalidNum1")}</p>}
              {num1Valid && !num2Valid && <p>{t("error.invalidNum2")}</p>}
              {num1Valid && num2Valid && !num3Valid && (
                <p>{t("error.invalidNum3")}</p>
              )}
              {num1Valid && num2Valid && num3Valid && !num4Valid && (
                <p>{t("error.invalidNum4")}</p>
              )}
            </div>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-3xl font-semibold text-zinc-900">
                {t("result.sum", { sum: formatNumber(result.sum) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.average", { avg: formatNumber(result.average) })}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.count", { count: result.count })}
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
