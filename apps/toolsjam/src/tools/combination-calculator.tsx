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

type CalcType = "combinations" | "permutations" | "both";

const CALC_TYPES: CalcType[] = ["combinations", "permutations", "both"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function combinations(n: number, r: number): number {
  if (r < 0 || r > n) return NaN;
  if (r === 0 || r === n) return 1;
  const rMin = Math.min(r, n - r);
  let result = 1;
  for (let i = 0; i < rMin; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}

function permutations(n: number, r: number): number {
  if (r < 0 || r > n) return NaN;
  if (r === 0) return 1;
  return factorial(n) / factorial(n - r);
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n > 1e15) return n.toExponential(4);
  return Math.round(n).toLocaleString("en-US");
}

export default function CombinationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.combination-calculator");
  const [n, setN] = React.useState<string>("");
  const [r, setR] = React.useState<string>("");
  const [calcType, setCalcType] = React.useState<CalcType>("both");
  const [touched, setTouched] = React.useState(false);

  const nNum = parseFloat(n);
  const rNum = parseFloat(r);
  const nValid = n !== "" && Number.isInteger(nNum) && nNum >= 0;
  const rValid = r !== "" && Number.isInteger(rNum) && rNum >= 0 && (!nValid || rNum <= nNum);

  const combResult = React.useMemo<number | null>(() => {
    if (!nValid || !rValid) return null;
    return combinations(nNum, rNum);
  }, [nNum, rNum, nValid, rValid]);

  const permResult = React.useMemo<number | null>(() => {
    if (!nValid || !rValid) return null;
    return permutations(nNum, rNum);
  }, [nNum, rNum, nValid, rValid]);

  function loadExample(nVal: string, rVal: string, type: CalcType) {
    setN(nVal);
    setR(rVal);
    setCalcType(type);
    setTouched(true);
  }

  function reset() {
    setN("");
    setR("");
    setCalcType("both");
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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
    }
    return arr;
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

  const showError = touched && (!nValid || !rValid);

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
              <Label htmlFor="cc-n">{t("field.n")}</Label>
              <Input
                id="cc-n"
                type="number"
                inputMode="numeric"
                min="0"
                value={n}
                placeholder={t("placeholder.integer")}
                onChange={(e) => {
                  setN(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cc-r">{t("field.r")}</Label>
              <Input
                id="cc-r"
                type="number"
                inputMode="numeric"
                min="0"
                value={r}
                placeholder={t("placeholder.integer")}
                onChange={(e) => {
                  setR(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {CALC_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => setCalcType(ct)}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
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

          {touched && nValid && rValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {(calcType === "combinations" || calcType === "both") && combResult !== null && (
                <div>
                  <div className="text-xs text-zinc-500">{t("result.combFormula", { n: nNum, r: rNum })}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {t("result.combLabel")}: {formatNumber(combResult)}
                  </div>
                </div>
              )}
              {(calcType === "permutations" || calcType === "both") && permResult !== null && (
                <div>
                  <div className="text-xs text-zinc-500">{t("result.permFormula", { n: nNum, r: rNum })}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {t("result.permLabel")}: {formatNumber(permResult)}
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
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("52", "5", "combinations")}>
            {t("examples.loadCards")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("10", "3", "both")}>
            {t("examples.loadTeam")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("10", "4", "permutations")}>
            {t("examples.loadPassword")}
          </Button>
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
