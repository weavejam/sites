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

function fmt(n: number, dec = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

export default function StreamingServicesRoyaltiesCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.streaming-services-royalties-calculator");

  const [totalStreams, setTotalStreams] = React.useState("");
  const [perStreamRate, setPerStreamRate] = React.useState("");
  const [platformFee, setPlatformFee] = React.useState("");
  const [royaltyRate, setRoyaltyRate] = React.useState("");
  const [additionalFees, setAdditionalFees] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    const streams = parseFloat(totalStreams);
    const rate = parseFloat(perStreamRate);
    const pf = parseFloat(platformFee);
    const rr = parseFloat(royaltyRate);
    const af = parseFloat(additionalFees) || 0;

    if (![streams, rate, pf, rr].every((v) => Number.isFinite(v) && v >= 0)) return null;
    if (streams <= 0 || rate <= 0) return null;

    const grossEarnings = streams * rate;
    const platformFeeAmt = grossEarnings * (pf / 100);
    const netEarnings = grossEarnings - platformFeeAmt;
    const artistRoyaltiesGross = netEarnings * (rr / 100);
    const artistRoyalties = artistRoyaltiesGross - af;
    const effectiveRate = streams > 0 ? artistRoyalties / streams : 0;

    return { grossEarnings, platformFeeAmt, netEarnings, artistRoyalties, effectiveRate };
  }, [totalStreams, perStreamRate, platformFee, royaltyRate, additionalFees]);

  const showError = touched && !result;

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  function reset() {
    setTotalStreams("");
    setPerStreamRate("");
    setPlatformFee("");
    setRoyaltyRate("");
    setAdditionalFees("");
    setTouched(false);
  }

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
              <Label htmlFor="src-streams">{t("field.totalStreams")}</Label>
              <Input
                id="src-streams"
                type="number"
                inputMode="decimal"
                value={totalStreams}
                placeholder={t("placeholder.streams")}
                min={0}
                onChange={(e) => { setTotalStreams(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="src-rate">{t("field.perStreamRate")}</Label>
              <Input
                id="src-rate"
                type="number"
                inputMode="decimal"
                value={perStreamRate}
                placeholder={t("placeholder.rate")}
                min={0}
                step="0.0001"
                onChange={(e) => { setPerStreamRate(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="src-pf">{t("field.platformFeePercentage")}</Label>
              <Input
                id="src-pf"
                type="number"
                inputMode="decimal"
                value={platformFee}
                placeholder={t("placeholder.platformFee")}
                min={0}
                max={100}
                onChange={(e) => { setPlatformFee(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="src-rr">{t("field.royaltyRatePercentage")}</Label>
              <Input
                id="src-rr"
                type="number"
                inputMode="decimal"
                value={royaltyRate}
                placeholder={t("placeholder.royaltyRate")}
                min={0}
                max={100}
                onChange={(e) => { setRoyaltyRate(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="src-af">{t("field.additionalFees")}</Label>
              <Input
                id="src-af"
                type="number"
                inputMode="decimal"
                value={additionalFees}
                placeholder={t("placeholder.additionalFees")}
                min={0}
                onChange={(e) => { setAdditionalFees(e.target.value); setTouched(true); }}
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

          {result && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.grossEarnings")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{t("result.dollar")}{fmt(result.grossEarnings)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.platformFees")}</div>
                  <div className="text-xl font-semibold text-zinc-900">−{t("result.dollar")}{fmt(result.platformFeeAmt)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.netEarnings")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{t("result.dollar")}{fmt(result.netEarnings)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 border-2 border-zinc-300">
                  <div className="text-xs text-zinc-500">{t("result.artistRoyalties")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{t("result.dollar")}{fmt(result.artistRoyalties)}</div>
                </div>
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.effectiveRate")}: <span className="font-medium text-zinc-900">{t("result.dollar")}{fmt(result.effectiveRate, 6)}</span> {t("result.perStream")}
              </div>
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
