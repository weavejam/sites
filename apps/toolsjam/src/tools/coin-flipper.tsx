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

type CoinType = "fair" | "biased";
const COIN_TYPES: CoinType[] = ["fair", "biased"];

interface FlipResult {
  heads: number;
  tails: number;
  sequence: string[];
}

function flipCoins(n: number, headPct: number): FlipResult {
  const p = headPct / 100;
  let heads = 0;
  let tails = 0;
  const sequence: string[] = [];
  for (let i = 0; i < n; i++) {
    if (Math.random() < p) {
      heads++;
      sequence.push("H");
    } else {
      tails++;
      sequence.push("T");
    }
  }
  return { heads, tails, sequence };
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function CoinFlipper(_props: { locale: Locale }) {
  const t = useTranslations("tool.coin-flipper");

  const [numFlips, setNumFlips] = React.useState("10");
  const [coinType, setCoinType] = React.useState<CoinType>("fair");
  const [biasPct, setBiasPct] = React.useState("70");
  const [result, setResult] = React.useState<FlipResult | null>(null);
  const [flipped, setFlipped] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const n = parseInt(numFlips, 10);
  const bias = parseFloat(biasPct);

  function doFlip() {
    const nVal = parseInt(numFlips, 10);
    const biasVal = coinType === "fair" ? 50 : parseFloat(biasPct);
    if (!Number.isInteger(nVal) || nVal < 1 || nVal > 10000) {
      setError("invalid");
      return;
    }
    if (coinType === "biased" && (!Number.isFinite(biasVal) || biasVal < 0 || biasVal > 100)) {
      setError("invalidBias");
      return;
    }
    setError(null);
    setResult(flipCoins(nVal, biasVal));
    setFlipped(true);
  }

  function reset() {
    setNumFlips("10");
    setCoinType("fair");
    setBiasPct("70");
    setResult(null);
    setFlipped(false);
    setError(null);
  }

  function loadExample(vn: string, vt: CoinType, vb: string) {
    setNumFlips(vn);
    setCoinType(vt);
    setBiasPct(vb);
    setResult(null);
    setFlipped(false);
    setError(null);
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

  const displaySequence = result
    ? result.sequence.length > 200
      ? result.sequence.slice(0, 200).join(" ") + " …"
      : result.sequence.join(" ")
    : null;

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
              <Label htmlFor="cf-num">{t("field.numFlips")}</Label>
              <Input
                id="cf-num"
                type="number"
                inputMode="numeric"
                value={numFlips}
                placeholder={t("placeholder.numFlips")}
                onChange={(e) => setNumFlips(e.target.value)}
              />
            </div>

            {coinType === "biased" && (
              <div className="space-y-2">
                <Label htmlFor="cf-bias">{t("field.biasPct")}</Label>
                <Input
                  id="cf-bias"
                  type="number"
                  inputMode="decimal"
                  value={biasPct}
                  placeholder="70"
                  onChange={(e) => setBiasPct(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t("field.coinType")}</Label>
            <div className="flex flex-wrap gap-2">
              {COIN_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={coinType === ct ? "default" : "outline"}
                  onClick={() => setCoinType(ct)}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${coinType}_desc` as never)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={doFlip}>
              {t("button.flip")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {t(`error.${error}` as never)}
            </p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.totalFlips")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.heads + result.tails}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.heads")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.heads}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.tails")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.tails}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.headsPct")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {((result.heads / (result.heads + result.tails)) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
              {displaySequence && n <= 500 && (
                <div>
                  <div className="text-xs text-zinc-500 mb-1">{t("result.sequence")}</div>
                  <div className="font-mono text-sm text-zinc-700 break-all">
                    {displaySequence}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "fair", "50")}
          >
            {t("examples.loadSingle")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("100", "fair", "50")}
          >
            {t("examples.loadHundred")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("500", "biased", "70")}
          >
            {t("examples.loadBiased")}
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
