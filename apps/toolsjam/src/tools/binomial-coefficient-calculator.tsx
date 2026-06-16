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

function factorial(n: number): bigint {
  let result = 1n;
  for (let i = 2; i <= n; i++) result *= BigInt(i);
  return result;
}

function binomialCoefficient(n: number, k: number): bigint {
  if (k > n) return 0n;
  if (k === 0 || k === n) return 1n;
  const kk = Math.min(k, n - k);
  return factorial(n) / (factorial(kk) * factorial(n - kk));
}

function formatBigInt(n: bigint): string {
  return n.toLocaleString("en-US");
}

export default function BinomialCoefficientCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.binomial-coefficient-calculator");
  const [nVal, setNVal] = React.useState("");
  const [kVal, setKVal] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const nNum = parseInt(nVal, 10);
  const kNum = parseInt(kVal, 10);
  const nValid = nVal.trim() !== "" && Number.isInteger(nNum) && nNum >= 0 && nVal.trim() === String(nNum);
  const kValid = kVal.trim() !== "" && Number.isInteger(kNum) && kNum >= 0 && kVal.trim() === String(kNum);

  const result = React.useMemo<bigint | null>(() => {
    if (!touched || !nValid || !kValid) return null;
    if (kNum > nNum) return null;
    return binomialCoefficient(nNum, kNum);
  }, [touched, nNum, kNum, nValid, kValid]);

  const showNError = touched && nVal.trim() !== "" && !nValid;
  const showKError = touched && kVal.trim() !== "" && !kValid;
  const showKGreater = touched && nValid && kValid && kNum > nNum;
  const showEmptyError = touched && (nVal.trim() === "" || kVal.trim() === "");

  function reset() {
    setNVal("");
    setKVal("");
    setTouched(false);
  }

  function loadExample(n: string, k: string) {
    setNVal(n);
    setKVal(k);
    setTouched(true);
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
              <Label htmlFor="bcc-n">{t("field.n")}</Label>
              <Input
                id="bcc-n"
                type="number"
                inputMode="numeric"
                min={0}
                value={nVal}
                placeholder={t("field.nPlaceholder")}
                onChange={(e) => { setNVal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bcc-k">{t("field.k")}</Label>
              <Input
                id="bcc-k"
                type="number"
                inputMode="numeric"
                min={0}
                value={kVal}
                placeholder={t("field.kPlaceholder")}
                onChange={(e) => { setKVal(e.target.value); setTouched(true); }}
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

          {showNError && (
            <p className="text-sm text-red-600">{t("error.invalidN")}</p>
          )}
          {showKError && (
            <p className="text-sm text-red-600">{t("error.invalidK")}</p>
          )}
          {showKGreater && (
            <p className="text-sm text-red-600">{t("error.kGreaterThanN")}</p>
          )}
          {showEmptyError && (
            <p className="text-sm text-red-600">{t("error.empty")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.value")}: {formatBigInt(result)}
              </div>
              <div className="text-sm text-zinc-600 font-mono">
                {t("result.formula")}: C({nNum}, {kNum}) = {nNum}! / ({kNum}! × ({nNum}−{kNum})!) = {formatBigInt(result)}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("5", "2")}>
              {t("button.example1")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("52", "5")}>
              {t("button.example2")}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadExample("12", "4")}>
              {t("button.example3")}
            </Button>
          </div>
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
