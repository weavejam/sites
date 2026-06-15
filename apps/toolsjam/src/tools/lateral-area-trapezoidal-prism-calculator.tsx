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

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e8) / 1e8;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

export default function LateralAreaTrapezoidalPrismCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations(
    "tool.lateral-area-trapezoidal-prism-calculator"
  );

  const [b1, setB1] = React.useState("");
  const [b2, setB2] = React.useState("");
  const [s1, setS1] = React.useState("");
  const [s2, setS2] = React.useState("");
  const [h, setH] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const b1n = parseFloat(b1);
  const b2n = parseFloat(b2);
  const s1n = parseFloat(s1);
  const s2n = parseFloat(s2);
  const hn = parseFloat(h);

  const valid =
    b1 !== "" &&
    b2 !== "" &&
    s1 !== "" &&
    s2 !== "" &&
    h !== "" &&
    Number.isFinite(b1n) &&
    Number.isFinite(b2n) &&
    Number.isFinite(s1n) &&
    Number.isFinite(s2n) &&
    Number.isFinite(hn) &&
    b1n > 0 &&
    b2n > 0 &&
    s1n > 0 &&
    s2n > 0 &&
    hn > 0;

  const result = React.useMemo<number | null>(() => {
    if (!valid) return null;
    return (b1n + b2n + s1n + s2n) * hn;
  }, [valid, b1n, b2n, s1n, s2n, hn]);

  function reset() {
    setB1("");
    setB2("");
    setS1("");
    setS2("");
    setH("");
    setTouched(false);
  }

  function loadExample(
    vb1: string,
    vb2: string,
    vs1: string,
    vs2: string,
    vh: string
  ) {
    setB1(vb1);
    setB2(vb2);
    setS1(vs1);
    setS2(vs2);
    setH(vh);
    setTouched(true);
  }

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
    const raw = t.raw("faq.items") as
      | { q: string; a: string }[]
      | undefined;
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

  const showError = touched && !valid;

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
              <Label htmlFor="latp-b1">{t("field.base1")}</Label>
              <Input
                id="latp-b1"
                type="number"
                inputMode="decimal"
                value={b1}
                placeholder={t("placeholder.base1")}
                onChange={(e) => {
                  setB1(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latp-b2">{t("field.base2")}</Label>
              <Input
                id="latp-b2"
                type="number"
                inputMode="decimal"
                value={b2}
                placeholder={t("placeholder.base2")}
                onChange={(e) => {
                  setB2(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latp-s1">{t("field.side1")}</Label>
              <Input
                id="latp-s1"
                type="number"
                inputMode="decimal"
                value={s1}
                placeholder={t("placeholder.side1")}
                onChange={(e) => {
                  setS1(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latp-s2">{t("field.side2")}</Label>
              <Input
                id="latp-s2"
                type="number"
                inputMode="decimal"
                value={s2}
                placeholder={t("placeholder.side2")}
                onChange={(e) => {
                  setS2(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latp-h">{t("field.prismHeight")}</Label>
              <Input
                id="latp-h"
                type="number"
                inputMode="decimal"
                value={h}
                placeholder={t("placeholder.prismHeight")}
                onChange={(e) => {
                  setH(e.target.value);
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.lateralArea", { result: formatNum(result) })}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.computation", {
                  b1: formatNum(b1n),
                  b2: formatNum(b2n),
                  s1: formatNum(s1n),
                  s2: formatNum(s2n),
                  h: formatNum(hn),
                  result: formatNum(result),
                })}
              </div>
              <div className="text-xs text-zinc-400">{t("result.formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("10", "6", "5", "5", "12")}
          >
            {t("examples.loadIsosceles")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("8", "5", "4", "5", "10")}
          >
            {t("examples.loadRight")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("15", "10", "7", "8", "20")}
          >
            {t("examples.loadScalene")}
          </Button>
        </div>
      </section>

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
