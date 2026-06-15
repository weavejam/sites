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

function formatBigInt(n: bigint): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isWholeNumber(value: string): boolean {
  return /^\d+$/.test(value.trim());
}

export default function LongDivisionCalculator(_props: { locale: Locale }): React.ReactNode {
  const t = useTranslations("tool.long-division-calculator");
  const [dividend, setDividend] = React.useState("");
  const [divisor, setDivisor] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const dividendValid = isWholeNumber(dividend);
  const divisorValid = isWholeNumber(divisor);
  const divisorBig = divisorValid && divisor.trim() !== "" ? BigInt(divisor.trim()) : 0n;
  const valid = dividendValid && divisorValid && divisorBig > 0n;

  const calculation = React.useMemo(() => {
    if (!valid) return null;

    const dividendBig = BigInt(dividend.trim());
    const divisorBigVal = BigInt(divisor.trim());
    const quotient = dividendBig / divisorBigVal;
    const remainder = dividendBig % divisorBigVal;
    const steps: string[] = [];
    const dividendStr = dividendBig.toString();
    let carry = 0n;

    for (const char of dividendStr) {
      const current = carry * 10n + BigInt(char);
      if (current < divisorBigVal && steps.length === 0 && dividendStr.length > 1) {
        steps.push(t("result.stepBringDownOnly", { current: current.toString(), divisor: divisorBigVal.toString() }));
        carry = current;
        continue;
      }
      const quotientDigit = current / divisorBigVal;
      const product = quotientDigit * divisorBigVal;
      const nextRemainder = current - product;
      steps.push(t("result.stepDivision", { current: current.toString(), divisor: divisorBigVal.toString(), quotientDigit: quotientDigit.toString(), product: product.toString(), remainder: nextRemainder.toString() }));
      carry = nextRemainder;
    }

    const rAbbr = t("result.remainderAbbr");
    const decimalStr = dividendBig === 0n ? "0" : (() => {
      const intPart = dividendBig / divisorBigVal;
      const rem = dividendBig % divisorBigVal;
      if (rem === 0n) return intPart.toString();
      const precision = 6;
      let frac = (rem * BigInt(10 ** precision)) / divisorBigVal;
      return `${intPart}.${frac.toString().padStart(precision, "0").replace(/0+$/, "")}`;
    })();

    const visual = [
      `${quotient.toString()} ${rAbbr}${remainder.toString()}`,
      `${divisorBigVal.toString()} ) ${dividendBig.toString()}`,
      `≈ ${decimalStr}`,
    ].join("\n");
    return { dividendDisplay: formatBigInt(dividendBig), divisorDisplay: formatBigInt(divisorBigVal), quotientDisplay: formatBigInt(quotient), remainderDisplay: formatBigInt(remainder), decimalStr, visual, steps };
  }, [dividend, divisor, t, valid]);

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
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        description: t("tagline"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a }
        }))
      }
    ]
  };

  function reset() {
    setDividend("");
    setDivisor("");
    setTouched(false);
  }

  const errorMessage = touched
    ? !dividendValid || !divisorValid
      ? t("error.invalid")
      : divisorBig === 0n
        ? t("error.divisorZero")
        : null
    : null;

  return (
    <div className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
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
              <Label htmlFor="long-division-dividend">{t("field.dividend")}</Label>
              <Input id="long-division-dividend" type="text" inputMode="numeric" pattern="[0-9]*" value={dividend} onChange={(event) => {
                setDividend(event.target.value);
                setTouched(true);
              }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="long-division-divisor">{t("field.divisor")}</Label>
              <Input id="long-division-divisor" type="text" inputMode="numeric" pattern="[0-9]*" value={divisor} onChange={(event) => {
                setDivisor(event.target.value);
                setTouched(true);
              }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
          {calculation && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div>
                <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
                <div className="mt-1 text-2xl font-semibold text-zinc-900">{t("result.value", { dividend: calculation.dividendDisplay, divisor: calculation.divisorDisplay, quotient: calculation.quotientDisplay, remainder: calculation.remainderDisplay })}</div>
                <div className="mt-2 text-sm text-zinc-600">{t("result.decimal", { decimal: calculation.decimalStr })}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-500">{t("result.visualHeading")}</div>
                <pre className="mt-2 overflow-x-auto rounded-md bg-white p-4 font-mono text-sm text-zinc-900">{calculation.visual}</pre>
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-500">{t("result.stepsHeading")}</div>
                <ol className="mt-2 list-decimal space-y-2 pl-6 text-zinc-700">{calculation.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <section className="space-y-4"><h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2><div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div></section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
        <p className="text-zinc-600">{t("examples.intro")}</p>
        <div className="overflow-x-auto"><table className="w-full border-collapse text-left text-sm"><thead><tr className="border-b border-zinc-200 bg-zinc-50"><th className="px-3 py-2 font-semibold">{t("examples.colInput")}</th><th className="px-3 py-2 font-semibold">{t("examples.colOutput")}</th><th className="px-3 py-2 font-semibold">{t("examples.colNote")}</th></tr></thead><tbody>{examplesItems.map((item, index) => <tr key={index} className="border-b border-zinc-100 align-top"><td className="px-3 py-2 text-zinc-800">{item.input}</td><td className="px-3 py-2 font-medium text-zinc-900">{item.output}</td><td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td></tr>)}</tbody></table></div>
      </section>
      <section className="space-y-4"><h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2><ol className="list-decimal space-y-2 pl-6 text-zinc-700">{howtoSteps.map((step, index) => <li key={index}>{step}</li>)}</ol></section>
      <section className="space-y-4"><h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2><div className="space-y-4">{faqItems.map((item, index) => <div key={index} className="rounded-lg border border-zinc-200 p-4"><div className="font-semibold text-zinc-900">{item.q}</div><div className="mt-1 text-zinc-700">{item.a}</div></div>)}</div></section>
    </div>
  );
}
