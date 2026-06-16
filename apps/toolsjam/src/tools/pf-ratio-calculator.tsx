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

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

function interpretAGRatio(
  ag: number,
  gamma: number
): "normal" | "low_ag" | "high_ag" | "elevated_gamma" {
  if (ag < 1.0) return "low_ag";
  if (ag > 2.5) return "high_ag";
  if (gamma > 1.6) return "elevated_gamma";
  return "normal";
}

export default function PfRatioCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pf-ratio-calculator");

  const [albumin, setAlbumin] = React.useState("");
  const [alpha1, setAlpha1] = React.useState("");
  const [alpha2, setAlpha2] = React.useState("");
  const [beta, setBeta] = React.useState("");
  const [gamma, setGamma] = React.useState("");
  const [totalProtein, setTotalProtein] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const albNum = parseFloat(albumin);
  const a1Num = parseFloat(alpha1);
  const a2Num = parseFloat(alpha2);
  const btNum = parseFloat(beta);
  const gmNum = parseFloat(gamma);
  const tpNum = parseFloat(totalProtein);

  const allValid =
    albumin !== "" && Number.isFinite(albNum) && albNum > 0 &&
    alpha1 !== "" && Number.isFinite(a1Num) && a1Num >= 0 &&
    alpha2 !== "" && Number.isFinite(a2Num) && a2Num >= 0 &&
    beta !== "" && Number.isFinite(btNum) && btNum >= 0 &&
    gamma !== "" && Number.isFinite(gmNum) && gmNum >= 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const totalGlobulin = a1Num + a2Num + btNum + gmNum;
    if (totalGlobulin <= 0) return null;
    const agRatio = albNum / totalGlobulin;
    const tpValue = totalProtein !== "" && Number.isFinite(tpNum) && tpNum > 0
      ? tpNum
      : albNum + totalGlobulin;
    const albPct = (albNum / tpValue) * 100;
    const interpretation = interpretAGRatio(agRatio, gmNum);
    return { agRatio, totalGlobulin, albPct, tpValue, interpretation };
  }, [allValid, albNum, a1Num, a2Num, btNum, gmNum, totalProtein, tpNum]);

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

  function reset() {
    setAlbumin("");
    setAlpha1("");
    setAlpha2("");
    setBeta("");
    setGamma("");
    setTotalProtein("");
    setTouched(false);
  }

  const showError = touched && !allValid;

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
              <Label htmlFor="pf-albumin">{t("field.albumin")}</Label>
              <Input
                id="pf-albumin"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={albumin}
                placeholder={t("placeholder.albumin")}
                onChange={(e) => { setAlbumin(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-alpha1">{t("field.alpha1Globulin")}</Label>
              <Input
                id="pf-alpha1"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={alpha1}
                placeholder={t("placeholder.alpha1")}
                onChange={(e) => { setAlpha1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-alpha2">{t("field.alpha2Globulin")}</Label>
              <Input
                id="pf-alpha2"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={alpha2}
                placeholder={t("placeholder.alpha2")}
                onChange={(e) => { setAlpha2(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-beta">{t("field.betaGlobulin")}</Label>
              <Input
                id="pf-beta"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={beta}
                placeholder={t("placeholder.beta")}
                onChange={(e) => { setBeta(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-gamma">{t("field.gammaGlobulin")}</Label>
              <Input
                id="pf-gamma"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={gamma}
                placeholder={t("placeholder.gamma")}
                onChange={(e) => { setGamma(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-total">{t("field.totalProtein")}</Label>
              <Input
                id="pf-total"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={totalProtein}
                placeholder={t("placeholder.total")}
                onChange={(e) => { setTotalProtein(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.agRatio", { ratio: fmt(result.agRatio) })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.totalGlobulin", { value: fmt(result.totalGlobulin) })}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.albuminPct", { pct: fmt(result.albPct, 1) })}
              </div>
              <div className="mt-2 rounded border-l-4 border-blue-400 bg-blue-50 px-3 py-2 text-sm text-blue-900">
                {t(`result.${result.interpretation}` as never)}
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
