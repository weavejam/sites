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

function isValidBinary(s: string): boolean {
  return s.length > 0 && /^[01]+$/.test(s);
}

function countOnes(s: string): number {
  let count = 0;
  for (const c of s) if (c === "1") count++;
  return count;
}

function computeOddParityBit(data: string): 0 | 1 {
  const ones = countOnes(data);
  return ones % 2 === 0 ? 1 : 0;
}

export default function OddParityBitCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.odd-parity-bit-calculator");

  const [binaryData, setBinaryData] = React.useState("");
  const [receivedData, setReceivedData] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const cleanData = binaryData.trim();
  const cleanReceived = receivedData.trim();

  const dataValid = isValidBinary(cleanData);
  const receivedValid = cleanReceived === "" || isValidBinary(cleanReceived);

  const result = React.useMemo(() => {
    if (!dataValid) return null;
    const ones = countOnes(cleanData);
    const parityBit = computeOddParityBit(cleanData);
    const transmissionString = cleanData + parityBit.toString();
    return { ones, parityBit, transmissionString };
  }, [cleanData, dataValid]);

  const validationResult = React.useMemo(() => {
    if (receivedData.trim() === "" || !isValidBinary(cleanReceived)) return null;
    const totalOnes = countOnes(cleanReceived);
    return { valid: totalOnes % 2 === 1, totalOnes };
  }, [cleanReceived, receivedData]);

  function reset() {
    setBinaryData("");
    setReceivedData("");
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

  const showDataError = touched && binaryData.trim() !== "" && !isValidBinary(binaryData.trim());
  const showEmptyError = touched && binaryData.trim() === "";

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
              <Label htmlFor="opbc-data">{t("field.binaryData")}</Label>
              <Input
                id="opbc-data"
                type="text"
                inputMode="text"
                value={binaryData}
                placeholder={t("field.binaryDataPlaceholder")}
                onChange={(e) => {
                  setBinaryData(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opbc-received">{t("field.receivedData")}</Label>
              <Input
                id="opbc-received"
                type="text"
                inputMode="text"
                value={receivedData}
                placeholder={t("field.receivedDataPlaceholder")}
                onChange={(e) => {
                  setReceivedData(e.target.value);
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

          {showEmptyError && (
            <p className="text-sm text-red-600">{t("error.emptyData")}</p>
          )}
          {showDataError && (
            <p className="text-sm text-red-600">{t("error.invalidBinary")}</p>
          )}
          {touched && receivedData.trim() !== "" && !receivedValid && (
            <p className="text-sm text-red-600">{t("error.invalidReceived")}</p>
          )}

          {touched && result !== null && (
            <div className="space-y-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
                <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.onesCount")}</span>
                    <div className="text-xl font-semibold text-zinc-900">{result.ones}</div>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.parityBit")}</span>
                    <div className="text-xl font-semibold text-zinc-900">{result.parityBit}</div>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.transmissionString")}</span>
                  <div className="mt-1 font-mono text-lg font-semibold text-zinc-900 break-all">
                    {result.transmissionString}
                  </div>
                </div>
              </div>

              {validationResult !== null && (
                <div
                  className={`rounded-lg border p-4 ${
                    validationResult.valid
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="text-sm font-medium text-zinc-500">
                    {t("result.validationHeading")}
                  </div>
                  <div
                    className={`mt-1 font-medium ${
                      validationResult.valid ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {validationResult.valid
                      ? t("result.valid")
                      : t("result.invalid")}
                  </div>
                </div>
              )}
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
                <th className="px-3 py-2 font-semibold">{t("examples.colInput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colOutput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colNote")}</th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 font-mono text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
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
