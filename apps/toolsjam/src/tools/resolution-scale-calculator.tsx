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

function gcd(a: number, b: number): number {
  a = Math.round(a); b = Math.round(b);
  return b === 0 ? a : gcd(b, a % b);
}

function getAspectRatio(w: number, h: number): string {
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

function formatPx(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export default function ResolutionScaleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.resolution-scale-calculator");

  const [origWidth, setOrigWidth] = React.useState("");
  const [origHeight, setOrigHeight] = React.useState("");
  const [targetWidth, setTargetWidth] = React.useState("");
  const [targetHeight, setTargetHeight] = React.useState("");
  const [scaleFactor, setScaleFactor] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function parsePositive(val: string): number | null {
    const n = parseFloat(val);
    return val !== "" && Number.isFinite(n) && n > 0 ? n : null;
  }

  const owNum = parsePositive(origWidth);
  const ohNum = parsePositive(origHeight);
  const twNum = parsePositive(targetWidth);
  const thNum = parsePositive(targetHeight);
  const sfNum = parsePositive(scaleFactor);

  const baseValid = owNum !== null && ohNum !== null;
  const hasTarget = twNum !== null || thNum !== null || sfNum !== null;

  const result = React.useMemo(() => {
    if (!baseValid || !hasTarget || owNum === null || ohNum === null) return null;

    let sf: number;
    if (sfNum !== null) {
      sf = sfNum;
    } else if (twNum !== null) {
      sf = twNum / owNum;
    } else if (thNum !== null) {
      sf = thNum / ohNum;
    } else {
      return null;
    }

    const scaledW = owNum * sf;
    const scaledH = ohNum * sf;
    const totalPixels = Math.round(scaledW) * Math.round(scaledH);
    const megapixels = totalPixels / 1_000_000;
    const ar = getAspectRatio(owNum, ohNum);

    return { scaledW, scaledH, sf, totalPixels, megapixels, ar };
  }, [owNum, ohNum, twNum, thNum, sfNum, baseValid, hasTarget]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
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
    setOrigWidth(""); setOrigHeight(""); setTargetWidth(""); setTargetHeight(""); setScaleFactor("");
    setTouched(false);
  }

  const showBaseError = touched && !baseValid;
  const showTargetError = touched && baseValid && !hasTarget;

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
              <Label htmlFor="rsc-ow">{t("field.origWidth")}</Label>
              <Input
                id="rsc-ow"
                type="number"
                inputMode="decimal"
                min="1"
                value={origWidth}
                placeholder={t("placeholder.origWidth")}
                onChange={(e) => { setOrigWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsc-oh">{t("field.origHeight")}</Label>
              <Input
                id="rsc-oh"
                type="number"
                inputMode="decimal"
                min="1"
                value={origHeight}
                placeholder={t("placeholder.origHeight")}
                onChange={(e) => { setOrigHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsc-sf">{t("field.scaleFactor")}</Label>
              <Input
                id="rsc-sf"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={scaleFactor}
                placeholder={t("placeholder.scaleFactor")}
                onChange={(e) => { setScaleFactor(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsc-tw">{t("field.targetWidth")}</Label>
              <Input
                id="rsc-tw"
                type="number"
                inputMode="decimal"
                min="1"
                value={targetWidth}
                placeholder={t("placeholder.targetWidth")}
                onChange={(e) => { setTargetWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsc-th">{t("field.targetHeight")}</Label>
              <Input
                id="rsc-th"
                type="number"
                inputMode="decimal"
                min="1"
                value={targetHeight}
                placeholder={t("placeholder.targetHeight")}
                onChange={(e) => { setTargetHeight(e.target.value); setTouched(true); }}
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

          {showBaseError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showTargetError && (
            <p className="text-sm text-red-600">{t("error.noTarget")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <div className="text-xs text-zinc-500">{t("result.scaledWidth")} × {t("result.scaledHeight")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatPx(result.scaledW)} × {formatPx(result.scaledH)} {t("result.px")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.scaleFactorUsed")}</div>
                  <div className="font-semibold text-zinc-900">
                    {result.sf.toLocaleString("en-US", { maximumFractionDigits: 4 })}×
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.aspectRatio")}</div>
                  <div className="font-semibold text-zinc-900">{result.ar}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-zinc-500">{t("result.totalPixels")}</div>
                  <div className="font-semibold text-zinc-900">
                    {result.totalPixels.toLocaleString("en-US")} px ({result.megapixels.toLocaleString("en-US", { maximumFractionDigits: 2 })} {t("result.megapixels")})
                  </div>
                </div>
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
