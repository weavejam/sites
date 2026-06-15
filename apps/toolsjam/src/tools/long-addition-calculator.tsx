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

const PLACE_KEYS = ["ones", "tens", "hundreds", "thousands", "tenThousands", "hundredThousands"] as const;

function formatBigInt(n: bigint): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isWholeNumber(value: string): boolean {
  return /^\d+$/.test(value.trim());
}

function placeLabel(index: number, t: ReturnType<typeof useTranslations>): string {
  return index < PLACE_KEYS.length
    ? t(`place.${PLACE_KEYS[index]}` as never)
    : t("place.higher", { n: index + 1 });
}

export default function LongAdditionCalculator(_props: { locale: Locale }): React.ReactNode {
  const t = useTranslations("tool.long-addition-calculator");
  const [addend1, setAddend1] = React.useState("");
  const [addend2, setAddend2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const valid = isWholeNumber(addend1) && isWholeNumber(addend2);

  const calculation = React.useMemo(() => {
    if (!valid) return null;

    const leftBig = BigInt(addend1.trim());
    const rightBig = BigInt(addend2.trim());
    const sumBig = leftBig + rightBig;
    const left = leftBig.toString();
    const right = rightBig.toString();
    const sum = sumBig.toString();
    const maxLen = Math.max(left.length, right.length, sum.length);
    const carries = Array.from({ length: maxLen }, () => " ");
    const steps: string[] = [];
    let carry = 0;

    for (let index = 0; index < maxLen; index += 1) {
      const aDigit = Number(left[left.length - 1 - index] ?? 0);
      const bDigit = Number(right[right.length - 1 - index] ?? 0);
      const carryIn = carry;
      const total = aDigit + bDigit + carryIn;
      const digit = total % 10;
      carry = Math.floor(total / 10);

      if (carry > 0 && index + 1 < maxLen) {
        carries[maxLen - index - 2] = String(carry);
      }

      const place = placeLabel(index, t);
      if (carryIn === 0 && carry === 0) {
        steps.push(t("result.stepPlain", { place, a: aDigit, b: bDigit, total, digit }));
      } else if (carryIn > 0 && carry === 0) {
        steps.push(t("result.stepIncoming", { place, a: aDigit, b: bDigit, carryIn, total, digit }));
      } else if (carryIn === 0 && carry > 0) {
        steps.push(t("result.stepCarry", { place, a: aDigit, b: bDigit, total, digit, carryOut: carry }));
      } else {
        steps.push(
          t("result.stepIncomingCarry", {
            place,
            a: aDigit,
            b: bDigit,
            carryIn,
            total,
            digit,
            carryOut: carry,
          }),
        );
      }
    }

    const lines = [] as string[];
    const carryLine = carries.join("");
    if (carryLine.trim()) lines.push(`  ${carryLine}`);
    lines.push(`  ${left.padStart(maxLen, " ")}`);
    lines.push(`+ ${right.padStart(maxLen, " ")}`);
    lines.push(`  ${"-".repeat(maxLen)}`);
    lines.push(`  ${sum.padStart(maxLen, " ")}`);

    return { sumDisplay: formatBigInt(sumBig), addend1Display: formatBigInt(leftBig), addend2Display: formatBigInt(rightBig), visual: lines.join("\n"), steps };
  }, [addend1, addend2, t, valid]);

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
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  function reset() {
    setAddend1("");
    setAddend2("");
    setTouched(false);
  }

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
              <Label htmlFor="long-addition-a">{t("field.addend1")}</Label>
              <Input id="long-addition-a" type="text" inputMode="numeric" pattern="[0-9]*" value={addend1} onChange={(event) => {
                setAddend1(event.target.value);
                setTouched(true);
              }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="long-addition-b">{t("field.addend2")}</Label>
              <Input id="long-addition-b" type="text" inputMode="numeric" pattern="[0-9]*" value={addend2} onChange={(event) => {
                setAddend2(event.target.value);
                setTouched(true);
              }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>
          {touched && !valid && <p className="text-sm text-red-600">{t("error.invalid")}</p>}
          {calculation && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div>
                <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
                <div className="mt-1 text-2xl font-semibold text-zinc-900">{t("result.value", { addend1: calculation.addend1Display, addend2: calculation.addend2Display, result: calculation.sumDisplay })}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-500">{t("result.visualHeading")}</div>
                <pre className="mt-2 overflow-x-auto rounded-md bg-white p-4 font-mono text-sm text-zinc-900">{calculation.visual}</pre>
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-500">{t("result.stepsHeading")}</div>
                <ol className="mt-2 list-decimal space-y-2 pl-6 text-zinc-700">
                  {calculation.steps.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{item.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">{howtoSteps.map((step, index) => <li key={index}>{step}</li>)}</ol>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">{faqItems.map((item, index) => <div key={index} className="rounded-lg border border-zinc-200 p-4"><div className="font-semibold text-zinc-900">{item.q}</div><div className="mt-1 text-zinc-700">{item.a}</div></div>)}</div>
      </section>
    </div>
  );
}
