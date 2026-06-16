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

function fmt(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(decimals);
}

export default function RsbiCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.rsbi-calculator-rapid-shallow-breathing-index");

  const [respiratoryRate, setRespiratoryRate] = React.useState("");
  const [tidalVolume, setTidalVolume] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const rrNum = parseFloat(respiratoryRate);
  const tvNum = parseFloat(tidalVolume);

  const rrValid = respiratoryRate !== "" && Number.isFinite(rrNum) && rrNum > 0;
  const tvValid = tidalVolume !== "" && Number.isFinite(tvNum) && tvNum > 0;

  const result = React.useMemo(() => {
    if (!rrValid || !tvValid) return null;
    const rsbi = rrNum / (tvNum / 1000);
    let category: "favorable" | "borderline" | "not_ready";
    if (rsbi < 80) category = "favorable";
    else if (rsbi <= 105) category = "borderline";
    else category = "not_ready";
    return { rsbi, category };
  }, [rrNum, rrValid, tvNum, tvValid]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: FaqItem[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "HealthApplication",
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

  function loadExample(rr: string, tv: string) {
    setRespiratoryRate(rr);
    setTidalVolume(tv);
    setTouched(true);
  }

  function reset() {
    setRespiratoryRate("");
    setTidalVolume("");
    setTouched(false);
  }

  const showError = touched && (!rrValid || !tvValid);

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              <Label htmlFor="rsbi-rr">{t("field.respiratoryRate")}</Label>
              <Input
                id="rsbi-rr"
                type="number"
                inputMode="decimal"
                min="0"
                value={respiratoryRate}
                placeholder={t("placeholder.respiratoryRate")}
                onChange={(e) => {
                  setRespiratoryRate(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsbi-tv">{t("field.tidalVolume")}</Label>
              <Input
                id="rsbi-tv"
                type="number"
                inputMode="decimal"
                min="0"
                value={tidalVolume}
                placeholder={t("placeholder.tidalVolume")}
                onChange={(e) => {
                  setTidalVolume(e.target.value);
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

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-3xl font-semibold text-zinc-900">{fmt(result.rsbi)}</div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.interpretation")}</div>
                <div className="text-base font-semibold text-zinc-900">
                  {t(`category.${result.category}` as never)}
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{example.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("20", "500")}>
            {t("examples.loadFavorable")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("28", "300")}>
            {t("examples.loadBorderline")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("35", "250")}>
            {t("examples.loadNotReady")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
