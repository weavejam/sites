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

export default function SaagCalculator(_props: { locale: Locale }) {
  const t = useTranslations(
    "tool.saag-calculator-serum-ascites-albumin-gradient"
  );

  const [serumAlbumin, setSerumAlbumin] = React.useState("");
  const [ascitesAlbumin, setAscitesAlbumin] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const serumNum = parseFloat(serumAlbumin);
  const ascitesNum = parseFloat(ascitesAlbumin);

  const serumValid =
    serumAlbumin !== "" && Number.isFinite(serumNum) && serumNum >= 0;
  const ascitesValid =
    ascitesAlbumin !== "" && Number.isFinite(ascitesNum) && ascitesNum >= 0;

  const result = React.useMemo(() => {
    if (!serumValid || !ascitesValid) return null;
    const saag = serumNum - ascitesNum;
    const category = saag >= 1.1 ? "portal_hypertension" : "non_portal";
    return { saag, category };
  }, [ascitesNum, ascitesValid, serumNum, serumValid]);

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

  function loadExample(serum: string, ascites: string) {
    setSerumAlbumin(serum);
    setAscitesAlbumin(ascites);
    setTouched(true);
  }

  function reset() {
    setSerumAlbumin("");
    setAscitesAlbumin("");
    setTouched(false);
  }

  const showError = touched && (!serumValid || !ascitesValid);

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
              <Label htmlFor="saag-serum">{t("field.serumAlbumin")}</Label>
              <Input
                id="saag-serum"
                type="number"
                inputMode="decimal"
                min="0"
                value={serumAlbumin}
                placeholder={t("placeholder.serumAlbumin")}
                onChange={(e) => {
                  setSerumAlbumin(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saag-ascites">{t("field.ascitesAlbumin")}</Label>
              <Input
                id="saag-ascites"
                type="number"
                inputMode="decimal"
                min="0"
                value={ascitesAlbumin}
                placeholder={t("placeholder.ascitesAlbumin")}
                onChange={(e) => {
                  setAscitesAlbumin(e.target.value);
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
              <div className="text-3xl font-semibold text-zinc-900">
                {fmt(result.saag)} {t("result.unit")}
              </div>
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("3.4", "1.8")}>
            {t("examples.loadPortal")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("2.8", "2.2")}>
            {t("examples.loadNonPortal")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample("4.0", "3.0")}>
            {t("examples.loadBorderline")}
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
