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

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a === 0 ? 1 : a;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function DividingRadicalsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dividing-radicals-calculator");
  const [radicandA, setRadicandA] = React.useState("");
  const [radicandB, setRadicandB] = React.useState("");
  const [index, setIndex] = React.useState("2");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(radicandA);
  const bNum = parseFloat(radicandB);
  const nNum = parseFloat(index);

  const aValid = radicandA !== "" && Number.isFinite(aNum);
  const bValid = radicandB !== "" && Number.isFinite(bNum) && bNum !== 0;
  const nValid = index !== "" && Number.isFinite(nNum) && Number.isInteger(nNum) && nNum >= 1;
  const allValid = aValid && bValid && nValid;

  type CalcResult =
    | { kind: "ok"; rn: number; rd: number; decimal: number }
    | { kind: "divZero" }
    | { kind: "negative" };

  const result = React.useMemo<CalcResult | null>(() => {
    if (!allValid) return null;
    if (bNum === 0) return { kind: "divZero" };
    const isEven = nNum % 2 === 0;
    if (isEven && (aNum < 0 || bNum < 0)) return { kind: "negative" };

    // Represent a/b as fraction in lowest terms using integer approximation for
    // radicands that are integers; fall back to decimal otherwise.
    const isIntA = Number.isInteger(aNum);
    const isIntB = Number.isInteger(bNum);
    let rn: number;
    let rd: number;
    if (isIntA && isIntB) {
      const g = gcd(Math.abs(aNum), Math.abs(bNum));
      rn = aNum / g;
      rd = bNum / g;
    } else {
      rn = aNum;
      rd = bNum;
    }
    const ratio = aNum / bNum;
    // Use signed power for odd-index roots of negative ratios
    const decimal =
      ratio < 0 && nNum % 2 === 1
        ? -Math.pow(-ratio, 1 / nNum)
        : Math.pow(ratio, 1 / nNum);
    return { kind: "ok", rn, rd, decimal };
  }, [aNum, bNum, nNum, allValid]);

  function reset() {
    setRadicandA("");
    setRadicandB("");
    setIndex("2");
    setTouched(false);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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

  const showError = touched && !allValid;
  const showDivZero = touched && allValid && result?.kind === "divZero";
  const showNegative = touched && allValid && result?.kind === "negative";

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="dr-a">{t("field.radicandA")}</Label>
              <Input
                id="dr-a"
                type="number"
                inputMode="decimal"
                value={radicandA}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setRadicandA(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dr-b">{t("field.radicandB")}</Label>
              <Input
                id="dr-b"
                type="number"
                inputMode="decimal"
                value={radicandB}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setRadicandB(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dr-n">{t("field.index")}</Label>
              <Input
                id="dr-n"
                type="number"
                inputMode="numeric"
                value={index}
                placeholder={t("placeholder.index")}
                onChange={(e) => {
                  setIndex(e.target.value);
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
          {showDivZero && (
            <p className="text-sm text-red-600">{t("error.divByZero")}</p>
          )}
          {showNegative && (
            <p className="text-sm text-red-600">{t("error.negative")}</p>
          )}

          {result !== null && result.kind === "ok" && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-xl font-semibold text-zinc-900">
                {t("result.quotient" as never, {
                  a: formatNum(aNum),
                  b: formatNum(bNum),
                  n: String(nNum),
                  rn: formatNum(result.rn),
                  rd: formatNum(result.rd),
                })}
              </div>
              <div className="text-zinc-600 text-sm">
                {t("result.decimal" as never, {
                  decimal: formatNum(result.decimal),
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
