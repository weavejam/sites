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

function simplifyRadical(n: number): [number, number] {
  if (n < 0) return [0, n];
  if (n === 0) return [0, 0];
  if (!Number.isInteger(n)) {
    const sqrtVal = Math.sqrt(n);
    return [sqrtVal, 1];
  }
  let outside = 1;
  let inside = n;
  for (let i = 2; i * i <= inside; i++) {
    while (inside % (i * i) === 0) {
      outside *= i;
      inside = inside / (i * i);
    }
  }
  return [outside, inside];
}

function formatRadicalResult(coeff: number, inside: number): string {
  if (inside === 0) return "0";
  if (inside === 1) return String(coeff);
  if (coeff === 1) return `√${inside}`;
  return `${coeff}√${inside}`;
}

export default function MultiplyingRadicalsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.multiplying-radicals-calculator");
  const [coeff1, setCoeff1] = React.useState("");
  const [radicand1, setRadicand1] = React.useState("");
  const [coeff2, setCoeff2] = React.useState("");
  const [radicand2, setRadicand2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const c1 = parseFloat(coeff1);
  const r1 = parseFloat(radicand1);
  const c2 = parseFloat(coeff2);
  const r2 = parseFloat(radicand2);

  const allValid =
    coeff1 !== "" && radicand1 !== "" && coeff2 !== "" && radicand2 !== "" &&
    Number.isFinite(c1) && Number.isFinite(r1) &&
    Number.isFinite(c2) && Number.isFinite(r2);

  const negativeRadicand = allValid && (r1 < 0 || r2 < 0);

  const computed = React.useMemo(() => {
    if (!allValid || r1 < 0 || r2 < 0) return null;
    const combinedCoeff = Math.round(c1 * c2 * 1e10) / 1e10;
    const rawProduct = r1 * r2;
    const intProduct = Math.round(rawProduct);
    const combinedRadicand = Math.abs(intProduct - rawProduct) < 1e-9 ? intProduct : rawProduct;
    const [simplOutside, simplInside] = simplifyRadical(combinedRadicand);
    const finalCoeff = Math.round(combinedCoeff * simplOutside * 1e10) / 1e10;
    const simplified = formatRadicalResult(finalCoeff, simplInside);
    const intermediate = combinedCoeff === 1 ? `√${combinedRadicand}` : `${combinedCoeff}√${combinedRadicand}`;
    const wasSimplified = simplInside !== combinedRadicand || simplOutside !== 1;
    return { intermediate, simplified, wasSimplified, combinedRadicand, finalCoeff, simplInside };
  }, [c1, r1, c2, r2, allValid]);

  function reset() {
    setCoeff1(""); setRadicand1(""); setCoeff2(""); setRadicand2("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as Array<{ input: string; output: string; note: string }>;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as Array<{ q: string; a: string }>;
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

  const firstRadical = coeff1 && radicand1 ? formatRadicalResult(c1, r1) : "a√x";
  const secondRadical = coeff2 && radicand2 ? formatRadicalResult(c2, r2) : "b√y";

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
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("card.title")}</CardTitle>
          <CardDescription>{t("card.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 rounded-lg border p-4">
              <p className="font-semibold">{t("field.firstRadical")}</p>
              <div className="space-y-2">
                <Label htmlFor="mr-c1">{t("field.coeff1")}</Label>
                <Input
                  id="mr-c1"
                  type="number"
                  inputMode="decimal"
                  value={coeff1}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setCoeff1(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mr-r1">{t("field.radicand1")}</Label>
                <Input
                  id="mr-r1"
                  type="number"
                  inputMode="decimal"
                  value={radicand1}
                  placeholder={t("placeholder.positiveInt")}
                  onChange={(e) => { setRadicand1(e.target.value); setTouched(false); }}
                />
              </div>
            </div>
            <div className="space-y-4 rounded-lg border p-4">
              <p className="font-semibold">{t("field.secondRadical")}</p>
              <div className="space-y-2">
                <Label htmlFor="mr-c2">{t("field.coeff2")}</Label>
                <Input
                  id="mr-c2"
                  type="number"
                  inputMode="decimal"
                  value={coeff2}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setCoeff2(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mr-r2">{t("field.radicand2")}</Label>
                <Input
                  id="mr-r2"
                  type="number"
                  inputMode="decimal"
                  value={radicand2}
                  placeholder={t("placeholder.positiveInt")}
                  onChange={(e) => { setRadicand2(e.target.value); setTouched(false); }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {touched && negativeRadicand && (
            <p className="text-sm text-red-600">{t("error.negativeRadicand")}</p>
          )}

          {touched && allValid && !negativeRadicand && computed !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-xl font-semibold text-zinc-900 font-mono">
                {firstRadical} × {secondRadical}
                {computed.wasSimplified
                  ? ` = ${computed.intermediate} = ${computed.simplified}`
                  : ` = ${computed.intermediate}`}
              </div>
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
                  <td className="px-3 py-2 text-zinc-800 font-mono">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900 font-mono">{ex.output}</td>
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
