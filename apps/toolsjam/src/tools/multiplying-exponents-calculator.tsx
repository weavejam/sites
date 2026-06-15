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

function safeNum(s: string): number | null {
  if (s.trim() === "") return null;
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
}

function round(n: number): number {
  return Math.round(n * 1e10) / 1e10;
}

function formatResult(
  b1: number, e1: number,
  b2: number, e2: number,
): { display: string; value: number | null } {
  if (b1 === b2) {
    const newExp = round(e1 + e2);
    const value = round(Math.pow(b1, newExp));
    if (!Number.isFinite(value)) return { display: "undefined (invalid base/exponent combination)", value: null };
    const display = `${b1}^${e1} × ${b1}^${e2} = ${b1}^(${e1}+${e2}) = ${b1}^${newExp} = ${value}`;
    return { display, value };
  } else {
    const v1 = round(Math.pow(b1, e1));
    const v2 = round(Math.pow(b2, e2));
    if (!Number.isFinite(v1) || !Number.isFinite(v2)) return { display: "undefined (invalid base/exponent combination)", value: null };
    const value = round(v1 * v2);
    const display = `${b1}^${e1} × ${b2}^${e2} = ${v1} × ${v2} = ${value}`;
    return { display, value };
  }
}

export default function MultiplyingExponentsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.multiplying-exponents-calculator");
  const [base1, setBase1] = React.useState("");
  const [exp1, setExp1] = React.useState("");
  const [base2, setBase2] = React.useState("");
  const [exp2, setExp2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const b1 = safeNum(base1);
  const e1 = safeNum(exp1);
  const b2 = safeNum(base2);
  const e2 = safeNum(exp2);

  const allValid = b1 !== null && e1 !== null && b2 !== null && e2 !== null;

  const computed = React.useMemo(() => {
    if (!allValid || b1 === null || e1 === null || b2 === null || e2 === null) return null;
    return formatResult(b1, e1, b2, e2);
  }, [b1, e1, b2, e2, allValid]);

  const sameBase = b1 !== null && b2 !== null && b1 === b2;

  function reset() {
    setBase1(""); setExp1(""); setBase2(""); setExp2("");
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
              <p className="font-semibold">{t("field.firstTerm")}</p>
              <div className="space-y-2">
                <Label htmlFor="me-base1">{t("field.base1")}</Label>
                <Input
                  id="me-base1"
                  type="number"
                  inputMode="decimal"
                  value={base1}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setBase1(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="me-exp1">{t("field.exp1")}</Label>
                <Input
                  id="me-exp1"
                  type="number"
                  inputMode="decimal"
                  value={exp1}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setExp1(e.target.value); setTouched(false); }}
                />
              </div>
            </div>
            <div className="space-y-4 rounded-lg border p-4">
              <p className="font-semibold">{t("field.secondTerm")}</p>
              <div className="space-y-2">
                <Label htmlFor="me-base2">{t("field.base2")}</Label>
                <Input
                  id="me-base2"
                  type="number"
                  inputMode="decimal"
                  value={base2}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setBase2(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="me-exp2">{t("field.exp2")}</Label>
                <Input
                  id="me-exp2"
                  type="number"
                  inputMode="decimal"
                  value={exp2}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setExp2(e.target.value); setTouched(false); }}
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

          {touched && allValid && computed !== null && computed.value === null && (
            <p className="text-sm text-red-600">{t("error.undefined")}</p>
          )}

          {touched && allValid && computed !== null && computed.value !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-xl font-semibold text-zinc-900 font-mono">
                {computed.display}
              </div>
              <div className="text-sm text-zinc-600">
                {sameBase ? t("result.sameBaseNote") : t("result.diffBaseNote")}
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
