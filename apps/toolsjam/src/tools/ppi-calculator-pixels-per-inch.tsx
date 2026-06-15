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

function getQualityKey(ppi: number): "low" | "medium" | "good" | "high" | "ultra" {
  if (ppi < 100) return "low";
  if (ppi < 150) return "medium";
  if (ppi < 200) return "good";
  if (ppi < 300) return "high";
  return "ultra";
}

export default function PpiCalculatorPixelsPerInch(_props: { locale: Locale }) {
  const t = useTranslations("tool.ppi-calculator-pixels-per-inch");
  const [pixelWidth, setPixelWidth] = React.useState("");
  const [pixelHeight, setPixelHeight] = React.useState("");
  const [diagonal, setDiagonal] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const pwNum = parseFloat(pixelWidth);
  const phNum = parseFloat(pixelHeight);
  const dNum = parseFloat(diagonal);

  const valid =
    Number.isFinite(pwNum) && pwNum > 0 &&
    Number.isFinite(phNum) && phNum > 0 &&
    Number.isFinite(dNum) && dNum > 0;

  const result = React.useMemo(() => {
    if (!valid) return null;
    const diagonalPx = Math.sqrt(pwNum * pwNum + phNum * phNum);
    const ppi = diagonalPx / dNum;
    const dotPitch = 25.4 / ppi;
    const qualityKey = getQualityKey(ppi);
    return { diagonalPx, ppi, dotPitch, qualityKey };
  }, [valid, pwNum, phNum, dNum]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  function loadExample(pw: string, ph: string, d: string) {
    setPixelWidth(pw);
    setPixelHeight(ph);
    setDiagonal(d);
    setTouched(true);
  }

  function reset() {
    setPixelWidth("");
    setPixelHeight("");
    setDiagonal("");
    setTouched(false);
  }

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
              <Label htmlFor="ppi-pw">{t("field.pixelWidth")}</Label>
              <Input
                id="ppi-pw"
                type="number"
                inputMode="numeric"
                min={1}
                value={pixelWidth}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setPixelWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ppi-ph">{t("field.pixelHeight")}</Label>
              <Input
                id="ppi-ph"
                type="number"
                inputMode="numeric"
                min={1}
                value={pixelHeight}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setPixelHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ppi-d">{t("field.diagonal")}</Label>
              <Input
                id="ppi-d"
                type="number"
                inputMode="decimal"
                min={0.1}
                step={0.1}
                value={diagonal}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setDiagonal(e.target.value); setTouched(true); }}
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

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && valid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.ppi")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{result.ppi.toFixed(1)}</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.dotPitch")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{result.dotPitch.toFixed(4)} mm</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.diagonalPx")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{Math.round(result.diagonalPx).toLocaleString()} px</div>
                </div>
                <div className="rounded border bg-white p-3 sm:col-span-1">
                  <div className="text-xs text-zinc-500">{t("result.quality")}</div>
                  <div className="text-sm font-semibold text-zinc-900">{t(`quality.${result.qualityKey}` as never)}</div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("result.formula")}</p>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1920", "1080", "24")}>
            HD Monitor (24&quot;)
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("3840", "2160", "55")}>
            4K TV (55&quot;)
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1170", "2532", "6.1")}>
            Smartphone (6.1&quot;)
          </Button>
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
