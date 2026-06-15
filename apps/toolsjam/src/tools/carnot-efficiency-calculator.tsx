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

function fmtPct(n: number): string {
  return parseFloat((n * 100).toFixed(4)).toLocaleString("en-US", {
    maximumFractionDigits: 4,
  });
}

export default function CarnotEfficiencyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.carnot-efficiency-calculator");

  const [hotTemp, setHotTemp] = React.useState("");
  const [coldTemp, setColdTemp] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const hotNum = parseFloat(hotTemp);
  const coldNum = parseFloat(coldTemp);

  const hotValid = hotTemp !== "" && Number.isFinite(hotNum) && hotNum > 0;
  const coldValid = coldTemp !== "" && Number.isFinite(coldNum) && coldNum > 0;
  const orderValid = hotValid && coldValid && hotNum > coldNum;

  const efficiency = React.useMemo<number | null>(() => {
    if (!hotValid || !coldValid || hotNum <= coldNum) return null;
    return 1 - coldNum / hotNum;
  }, [hotValid, coldValid, hotNum, coldNum]);

  function reset() {
    setHotTemp("");
    setColdTemp("");
    setTouched(false);
  }

  function loadExample(hot: string, cold: string) {
    setHotTemp(hot);
    setColdTemp(cold);
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

  const showInvalid = touched && (!hotValid || !coldValid);
  const showOrderError = touched && hotValid && coldValid && !orderValid;

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
              <Label htmlFor="carnot-hot">{t("field.hotTemp")}</Label>
              <Input
                id="carnot-hot"
                type="number"
                inputMode="decimal"
                min="0"
                value={hotTemp}
                placeholder={t("placeholder.hotTemp")}
                onChange={(e) => { setHotTemp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carnot-cold">{t("field.coldTemp")}</Label>
              <Input
                id="carnot-cold"
                type="number"
                inputMode="decimal"
                min="0"
                value={coldTemp}
                placeholder={t("placeholder.coldTemp")}
                onChange={(e) => { setColdTemp(e.target.value); setTouched(true); }}
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

          {showInvalid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showOrderError && (
            <p className="text-sm text-red-600">{t("error.order")}</p>
          )}

          {efficiency !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.efficiencyLabel")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmtPct(efficiency)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.efficiencyDecimal")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {parseFloat(efficiency.toFixed(6)).toLocaleString("en-US", { maximumFractionDigits: 6 })}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("773", "303")}
          >
            {t("examples.loadSteamPlant")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2000", "300")}
          >
            {t("examples.loadEngine")}
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
