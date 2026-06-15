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

export default function PayGapCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pay-gap-calculator");
  const [salary1, setSalary1] = React.useState("");
  const [salary2, setSalary2] = React.useState("");
  const [currency, setCurrency] = React.useState("$");
  const [touched, setTouched] = React.useState(false);

  const s1 = parseFloat(salary1);
  const s2 = parseFloat(salary2);
  const isValid =
    salary1 !== "" &&
    salary2 !== "" &&
    Number.isFinite(s1) &&
    Number.isFinite(s2) &&
    s1 > 0 &&
    s2 > 0;

  const result = React.useMemo(() => {
    if (!isValid) return null;
    const payGapPercent = ((s1 - s2) / s1) * 100;
    const payRatio = (s2 / s1) * 100;
    const absoluteDiff = s1 - s2;
    const perDollar = s2 / s1;
    return { payGapPercent, payRatio, absoluteDiff, perDollar };
  }, [isValid, s1, s2]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  function reset() {
    setSalary1("");
    setSalary2("");
    setCurrency("$");
    setTouched(false);
  }

  function fmt(n: number) {
    return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pgc-s1">{t("field.salary1")}</Label>
              <Input
                id="pgc-s1"
                type="number"
                inputMode="decimal"
                value={salary1}
                placeholder={t("placeholder.salary")}
                onChange={(e) => {
                  setSalary1(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pgc-s2">{t("field.salary2")}</Label>
              <Input
                id="pgc-s2"
                type="number"
                inputMode="decimal"
                value={salary2}
                placeholder={t("placeholder.salary")}
                onChange={(e) => {
                  setSalary2(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pgc-currency">{t("field.currency")}</Label>
            <Input
              id="pgc-currency"
              type="text"
              value={currency}
              placeholder={t("placeholder.currency")}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-24"
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

          {touched && !isValid && (
            <p className="text-sm text-red-600">
              {salary1 !== "" &&
              salary2 !== "" &&
              (s1 <= 0 || s2 <= 0)
                ? t("error.zero")
                : t("error.invalid")}
            </p>
          )}

          {touched && isValid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.payGapPercent")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.payGapPercent.toFixed(1)}%
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.payRatio")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.payRatio.toFixed(1)}%
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.absoluteDiff")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {currency}
                    {fmt(result.absoluteDiff)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.perDollarEarned")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {(result.perDollar * 100).toFixed(1)}¢
                  </div>
                </div>
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
