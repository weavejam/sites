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

interface Fib4Result {
  score: number;
  category: string;
}

function computeFib4(
  age: number,
  ast: number,
  alt: number,
  platelets: number,
): Fib4Result | null {
  if (
    !Number.isFinite(age) ||
    !Number.isFinite(ast) ||
    !Number.isFinite(alt) ||
    !Number.isFinite(platelets) ||
    age <= 0 ||
    ast <= 0 ||
    alt <= 0 ||
    platelets <= 0
  )
    return null;

  // FIB-4 = (Age × AST) / (Platelets × √ALT)
  const score = (age * ast) / (platelets * Math.sqrt(alt));

  let category: string;
  if (score < 1.3) category = "low";
  else if (score <= 2.67) category = "intermediate";
  else category = "high";

  return { score, category };
}

export default function Fib4Calculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.fib-4-calculator");

  const [age, setAge] = React.useState("");
  const [ast, setAst] = React.useState("");
  const [alt, setAlt] = React.useState("");
  const [platelets, setPlatelets] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<Fib4Result | null>(() => {
    return computeFib4(
      parseFloat(age),
      parseFloat(ast),
      parseFloat(alt),
      parseFloat(platelets),
    );
  }, [age, ast, alt, platelets]);

  function reset() {
    setAge("");
    setAst("");
    setAlt("");
    setPlatelets("");
    setTouched(false);
  }

  function loadExample(
    a: string,
    astVal: string,
    altVal: string,
    plt: string,
  ) {
    setAge(a);
    setAst(astVal);
    setAlt(altVal);
    setPlatelets(plt);
    setTouched(true);
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
        applicationCategory: "HealthApplication",
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
              <Label htmlFor="fib4-age">{t("field.age")}</Label>
              <Input
                id="fib4-age"
                type="number"
                inputMode="numeric"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => {
                  setAge(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fib4-ast">{t("field.ast")}</Label>
              <Input
                id="fib4-ast"
                type="number"
                inputMode="decimal"
                value={ast}
                placeholder={t("placeholder.ast")}
                onChange={(e) => {
                  setAst(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fib4-alt">{t("field.alt")}</Label>
              <Input
                id="fib4-alt"
                type="number"
                inputMode="decimal"
                value={alt}
                placeholder={t("placeholder.alt")}
                onChange={(e) => {
                  setAlt(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fib4-plt">{t("field.platelets")}</Label>
              <Input
                id="fib4-plt"
                type="number"
                inputMode="decimal"
                value={platelets}
                placeholder={t("placeholder.platelets")}
                onChange={(e) => {
                  setPlatelets(e.target.value);
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

          {result !== null && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {result.score.toFixed(2)}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.fibrosis")}:{" "}
                <span className="font-semibold">
                  {t(`category.${result.category}` as never)}
                </span>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
            onClick={() => loadExample("35", "25", "30", "250")}
          >
            {t("examples.loadLow")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("48", "40", "35", "160")}
          >
            {t("examples.loadIntermediate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("65", "90", "40", "80")}
          >
            {t("examples.loadHigh")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
