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

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function DividingExponentsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dividing-exponents-calculator");
  const [numBase, setNumBase] = React.useState("");
  const [numExp, setNumExp] = React.useState("");
  const [denBase, setDenBase] = React.useState("");
  const [denExp, setDenExp] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(numBase);
  const mNum = parseFloat(numExp);
  const bNum = parseFloat(denBase);
  const nNum = parseFloat(denExp);

  const aValid = numBase !== "" && Number.isFinite(aNum);
  const mValid = numExp !== "" && Number.isFinite(mNum);
  const bValid = denBase !== "" && Number.isFinite(bNum);
  const nValid = denExp !== "" && Number.isFinite(nNum);
  const allValid = aValid && mValid && bValid && nValid;

  type CalcResult =
    | { kind: "sameBase"; base: number; m: number; n: number; newExp: number; value: number }
    | { kind: "diffBase"; value: number }
    | { kind: "divZero" }
    | { kind: "indeterminate" };

  const result = React.useMemo<CalcResult | null>(() => {
    if (!allValid) return null;
    // 0^0 is indeterminate
    if (aNum === 0 && mNum === 0) return { kind: "indeterminate" };
    if (bNum === 0 && nNum === 0) return { kind: "indeterminate" };
    const denomValue = Math.pow(bNum, nNum);
    if (denomValue === 0) return { kind: "divZero" };
    if (aNum === bNum) {
      const newExp = mNum - nNum;
      const value = Math.pow(aNum, newExp);
      return { kind: "sameBase", base: aNum, m: mNum, n: nNum, newExp, value };
    }
    const value = Math.pow(aNum, mNum) / denomValue;
    return { kind: "diffBase", value };
  }, [aNum, mNum, bNum, nNum, allValid]);

  function reset() {
    setNumBase("");
    setNumExp("");
    setDenBase("");
    setDenExp("");
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
  const showIndeterminate = touched && allValid && result?.kind === "indeterminate";

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
              <Label htmlFor="de-numbase">{t("field.numBase")}</Label>
              <Input
                id="de-numbase"
                type="number"
                inputMode="decimal"
                value={numBase}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setNumBase(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="de-numexp">{t("field.numExp")}</Label>
              <Input
                id="de-numexp"
                type="number"
                inputMode="decimal"
                value={numExp}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setNumExp(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="de-denbase">{t("field.denBase")}</Label>
              <Input
                id="de-denbase"
                type="number"
                inputMode="decimal"
                value={denBase}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setDenBase(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="de-denexp">{t("field.denExp")}</Label>
              <Input
                id="de-denexp"
                type="number"
                inputMode="decimal"
                value={denExp}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setDenExp(e.target.value);
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
          {showIndeterminate && (
            <p className="text-sm text-red-600">{t("error.indeterminate")}</p>
          )}

          {result !== null &&
            result.kind !== "divZero" &&
            result.kind !== "indeterminate" &&
            !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-xl font-semibold text-zinc-900 break-all">
                {result.kind === "sameBase"
                  ? t("result.sameBase" as never, {
                      a: formatNum(result.base),
                      m: formatNum(result.m),
                      n: formatNum(result.n),
                      exp: formatNum(result.newExp),
                      result: formatNum(result.value),
                    })
                  : t("result.diffBase" as never, {
                      a: formatNum(aNum),
                      m: formatNum(mNum),
                      b: formatNum(bNum),
                      n: formatNum(nNum),
                      result: formatNum(result.value),
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
