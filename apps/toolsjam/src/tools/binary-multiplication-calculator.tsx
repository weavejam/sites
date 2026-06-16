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

function isValidBinaryInt(s: string): boolean {
  return /^[01]+$/.test(s.trim());
}

function multiplyBinary(
  a: string,
  b: string,
  tFn: (key: string, vals?: Record<string, string | number>) => string
): { product: string; decimal: number; steps: string[] } {
  // Convert to decimal for result verification
  const decA = parseInt(a, 2);
  const decB = parseInt(b, 2);
  const decProduct = decA * decB;
  const binaryProduct = decProduct.toString(2);

  // Generate step-by-step partial products
  const steps: string[] = [];
  const bLen = b.length;
  const partials: string[] = [];

  for (let i = bLen - 1; i >= 0; i--) {
    const bit = b[i];
    const shift = bLen - 1 - i;
    if (bit === "1") {
      const partial = a + "0".repeat(shift);
      partials.push(partial);
      steps.push(tFn("result.stepBit1", { shift, a, partial }));
    } else {
      const partial = "0".repeat(a.length + shift);
      partials.push(partial);
      steps.push(tFn("result.stepBit0", { shift, a, zeros: partial }));
    }
  }
  steps.push(tFn("result.stepSum", { product: binaryProduct, dec: decProduct }));

  return { product: binaryProduct, decimal: decProduct, steps };
}

export default function BinaryMultiplicationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.binary-multiplication-calculator");
  const [first, setFirst] = React.useState("");
  const [second, setSecond] = React.useState("");
  const [showSteps, setShowSteps] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const firstValid = first.trim() !== "" && isValidBinaryInt(first.trim());
  const secondValid = second.trim() !== "" && isValidBinaryInt(second.trim());

  const result = React.useMemo(() => {
    if (!touched || !firstValid || !secondValid) return null;
    return multiplyBinary(first.trim(), second.trim(), (key, vals) => t(key as never, vals));
  }, [touched, first, second, firstValid, secondValid, t]);

  const showFirstError = touched && first.trim() !== "" && !isValidBinaryInt(first.trim());
  const showSecondError = touched && second.trim() !== "" && !isValidBinaryInt(second.trim());
  const showEmptyError = touched && (first.trim() === "" || second.trim() === "");

  function reset() {
    setFirst("");
    setSecond("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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
              <Label htmlFor="bmc-first">{t("field.first")}</Label>
              <Input
                id="bmc-first"
                type="text"
                value={first}
                placeholder={t("field.firstPlaceholder")}
                onChange={(e) => { setFirst(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bmc-second">{t("field.second")}</Label>
              <Input
                id="bmc-second"
                type="text"
                value={second}
                placeholder={t("field.secondPlaceholder")}
                onChange={(e) => { setSecond(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="bmc-steps"
              type="checkbox"
              checked={showSteps}
              onChange={(e) => setShowSteps(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300"
            />
            <Label htmlFor="bmc-steps">{t("field.showSteps")}</Label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showFirstError && (
            <p className="text-sm text-red-600">{t("error.invalidFirst")}</p>
          )}
          {showSecondError && (
            <p className="text-sm text-red-600">{t("error.invalidSecond")}</p>
          )}
          {showEmptyError && (
            <p className="text-sm text-red-600">{t("error.empty")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.product")}: {result.product}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.decimal")}: {result.decimal}
              </div>
              {showSteps && result.steps.length > 0 && (
                <div className="mt-3 space-y-1">
                  <div className="text-sm font-medium text-zinc-500">{t("result.steps")}</div>
                  <ul className="text-sm text-zinc-700 space-y-1 font-mono">
                    {result.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
