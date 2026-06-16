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

interface FeureaResult {
  feurea: number;
  interpretation: string;
}

function computeFeurea(
  urineUrea: number,
  serumUrea: number,
  urineCreatinine: number,
  serumCreatinine: number,
): FeureaResult | null {
  if (
    !Number.isFinite(urineUrea) ||
    !Number.isFinite(serumUrea) ||
    !Number.isFinite(urineCreatinine) ||
    !Number.isFinite(serumCreatinine) ||
    serumUrea <= 0 ||
    urineCreatinine <= 0
  )
    return null;

  // FEUrea (%) = (Urine Urea / Serum Urea) × (Serum Creatinine / Urine Creatinine) × 100
  const feurea =
    (urineUrea / serumUrea) * (serumCreatinine / urineCreatinine) * 100;

  let interpretation: string;
  if (feurea < 35) interpretation = "prerenal";
  else if (feurea <= 50) interpretation = "indeterminate";
  else interpretation = "intrinsic";

  return { feurea, interpretation };
}

export default function FeureaCalculator(_props: { locale: Locale }) {
  const t = useTranslations(
    "tool.feurea-calculator-acute-kidney-injury-cause-differentiation",
  );

  const [urineUrea, setUrineUrea] = React.useState("");
  const [serumUrea, setSerumUrea] = React.useState("");
  const [urineCreatinine, setUrineCreatinine] = React.useState("");
  const [serumCreatinine, setSerumCreatinine] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<FeureaResult | null>(() => {
    return computeFeurea(
      parseFloat(urineUrea),
      parseFloat(serumUrea),
      parseFloat(urineCreatinine),
      parseFloat(serumCreatinine),
    );
  }, [urineUrea, serumUrea, urineCreatinine, serumCreatinine]);

  function reset() {
    setUrineUrea("");
    setSerumUrea("");
    setUrineCreatinine("");
    setSerumCreatinine("");
    setTouched(false);
  }

  function loadExample(uu: string, su: string, uc: string, sc: string) {
    setUrineUrea(uu);
    setSerumUrea(su);
    setUrineCreatinine(uc);
    setSerumCreatinine(sc);
    setTouched(true);
  }

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

  const showError = touched && result === null;

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
              <Label htmlFor="feurea-uu">{t("field.urineUrea")}</Label>
              <Input
                id="feurea-uu"
                type="number"
                inputMode="decimal"
                value={urineUrea}
                placeholder={t("placeholder.urineUrea")}
                onChange={(e) => {
                  setUrineUrea(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feurea-su">{t("field.serumUrea")}</Label>
              <Input
                id="feurea-su"
                type="number"
                inputMode="decimal"
                value={serumUrea}
                placeholder={t("placeholder.serumUrea")}
                onChange={(e) => {
                  setSerumUrea(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feurea-uc">{t("field.urineCreatinine")}</Label>
              <Input
                id="feurea-uc"
                type="number"
                inputMode="decimal"
                value={urineCreatinine}
                placeholder={t("placeholder.urineCreatinine")}
                onChange={(e) => {
                  setUrineCreatinine(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feurea-sc">{t("field.serumCreatinine")}</Label>
              <Input
                id="feurea-sc"
                type="number"
                inputMode="decimal"
                value={serumCreatinine}
                placeholder={t("placeholder.serumCreatinine")}
                onChange={(e) => {
                  setSerumCreatinine(e.target.value);
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

          {result !== null && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {result.feurea.toFixed(1)}%
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.interpretation")}:{" "}
                <span className="font-semibold">
                  {t(`interp.${result.interpretation}` as never)}
                </span>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
            onClick={() => loadExample("200", "20", "120", "1.0")}
          >
            {t("examples.loadPrerenal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("300", "25", "60", "3.0")}
          >
            {t("examples.loadIntrinsic")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("100", "20", "50", "4.0")}
          >
            {t("examples.loadNormal")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
