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

type PvrCategory = "normal" | "mild" | "moderate" | "severe";

interface PvrResult {
  woodUnits: number;
  dynScm5: number;
  category: PvrCategory;
}

function computePvr(
  mpap: number,
  pcwp: number,
  co: number,
): PvrResult | null {
  if (
    !Number.isFinite(mpap) ||
    !Number.isFinite(pcwp) ||
    !Number.isFinite(co) ||
    co <= 0 ||
    mpap < 0 ||
    pcwp < 0 ||
    mpap < pcwp
  )
    return null;
  const woodUnits = (mpap - pcwp) / co;
  const dynScm5 = woodUnits * 80;
  let category: PvrCategory;
  if (woodUnits < 2) category = "normal";
  else if (woodUnits < 4) category = "mild";
  else if (woodUnits < 8) category = "moderate";
  else category = "severe";
  return { woodUnits, dynScm5, category };
}

export default function PvrCalculator(_props: { locale: Locale }) {
  const t = useTranslations(
    "tool.pvr-calculator-pulmonary-vascular-resistance",
  );
  const [mpap, setMpap] = React.useState("");
  const [pcwp, setPcwp] = React.useState("");
  const [co, setCo] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const mpapNum = parseFloat(mpap);
  const pcwpNum = parseFloat(pcwp);
  const coNum = parseFloat(co);

  const result = React.useMemo<PvrResult | null>(() => {
    if (!touched) return null;
    return computePvr(mpapNum, pcwpNum, coNum);
  }, [touched, mpapNum, pcwpNum, coNum]);

  const showError =
    touched &&
    result === null &&
    (mpap !== "" || pcwp !== "" || co !== "");

  function reset() {
    setMpap("");
    setPcwp("");
    setCo("");
    setTouched(false);
  }

  function loadExample(m: string, p: string, c: string) {
    setMpap(m);
    setPcwp(p);
    setCo(c);
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="pvr-mpap">{t("field.mpap")}</Label>
              <Input
                id="pvr-mpap"
                type="number"
                inputMode="decimal"
                value={mpap}
                placeholder={t("placeholder.mpap")}
                onChange={(e) => {
                  setMpap(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("unit.mmhg")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pvr-pcwp">{t("field.pcwp")}</Label>
              <Input
                id="pvr-pcwp"
                type="number"
                inputMode="decimal"
                value={pcwp}
                placeholder={t("placeholder.pcwp")}
                onChange={(e) => {
                  setPcwp(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("unit.mmhg")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pvr-co">{t("field.co")}</Label>
              <Input
                id="pvr-co"
                type="number"
                inputMode="decimal"
                value={co}
                placeholder={t("placeholder.co")}
                onChange={(e) => {
                  setCo(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("unit.lmin")}</p>
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

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.woodUnits")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.woodUnits.toFixed(2)}{" "}
                    <span className="text-base font-normal">{t("unit.wu")}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.dynScm5")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.dynScm5.toFixed(0)}{" "}
                    <span className="text-base font-normal">
                      {t("unit.dynscm5")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.category")}:{" "}
                <span className="font-semibold">
                  {t(`category.${result.category}` as never)}
                </span>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("15", "8", "5")}
          >
            {t("examples.loadNormal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("22", "10", "4")}
          >
            {t("examples.loadMild")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("34", "10", "4")}
          >
            {t("examples.loadModerate")}
          </Button>
        </div>
      </section>

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
