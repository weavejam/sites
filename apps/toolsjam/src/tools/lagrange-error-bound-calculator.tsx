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

function factorial(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  // Show up to 6 significant digits, strip trailing fractional zeros only
  const s = n.toPrecision(6);
  if (s.includes(".")) {
    return s.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }
  return s;
}

export default function LagrangeErrorBoundCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.lagrange-error-bound-calculator");

  const [mVal, setMVal] = React.useState("");
  const [nVal, setNVal] = React.useState("");
  const [aVal, setAVal] = React.useState("");
  const [xVal, setXVal] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const m = parseFloat(mVal);
  const n = parseInt(nVal, 10);
  const a = parseFloat(aVal);
  const x = parseFloat(xVal);

  const valid =
    mVal !== "" &&
    nVal !== "" &&
    aVal !== "" &&
    xVal !== "" &&
    Number.isFinite(m) &&
    Number.isFinite(n) &&
    Number.isFinite(a) &&
    Number.isFinite(x) &&
    m >= 0 &&
    n >= 0 &&
    Number.isInteger(n);

  const result = React.useMemo<number | null>(() => {
    if (!valid) return null;
    const fact = factorial(n + 1);
    const distance = Math.pow(Math.abs(x - a), n + 1);
    return (m / fact) * distance;
  }, [valid, m, n, a, x]);

  function reset() {
    setMVal("");
    setNVal("");
    setAVal("");
    setXVal("");
    setTouched(false);
  }

  function loadExample(
    mv: string,
    nv: string,
    av: string,
    xv: string
  ) {
    setMVal(mv);
    setNVal(nv);
    setAVal(av);
    setXVal(xv);
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

  const fact = valid ? factorial(n + 1) : null;
  const distance = valid ? Math.pow(Math.abs(x - a), n + 1) : null;

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
              <Label htmlFor="leb-m">{t("field.maxDerivative")}</Label>
              <Input
                id="leb-m"
                type="number"
                inputMode="decimal"
                value={mVal}
                placeholder={t("placeholder.maxDerivative")}
                onChange={(e) => {
                  setMVal(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leb-n">{t("field.degree")}</Label>
              <Input
                id="leb-n"
                type="number"
                inputMode="numeric"
                value={nVal}
                placeholder={t("placeholder.degree")}
                onChange={(e) => {
                  setNVal(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leb-a">{t("field.expansionPoint")}</Label>
              <Input
                id="leb-a"
                type="number"
                inputMode="decimal"
                value={aVal}
                placeholder={t("placeholder.expansionPoint")}
                onChange={(e) => {
                  setAVal(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leb-x">{t("field.approximationPoint")}</Label>
              <Input
                id="leb-x"
                type="number"
                inputMode="decimal"
                value={xVal}
                placeholder={t("placeholder.approximationPoint")}
                onChange={(e) => {
                  setXVal(e.target.value);
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
                {t("result.bound", { result: formatNum(result) })}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.computation", {
                  m: formatNum(m),
                  factorial: String(fact),
                  distance: formatNum(distance!),
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
            onClick={() => loadExample("1.6487", "3", "0", "0.5")}
          >
            {t("examples.loadEx")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.09983", "2", "0", "0.1")}
          >
            {t("examples.loadCos")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("6", "3", "1", "1.2")}
          >
            {t("examples.loadLn")}
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
