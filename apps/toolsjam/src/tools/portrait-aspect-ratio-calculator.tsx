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

type Unit = "pixels" | "inches" | "cm" | "mm";
const UNITS: Unit[] = ["pixels", "inches", "cm", "mm"];

function gcd(a: number, b: number): number {
  a = Math.round(a);
  b = Math.round(b);
  while (b > 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function simplifyRatio(w: number, h: number): { rw: number; rh: number } {
  // Work with integers for GCD — scale up if needed
  const scale = 1000;
  const wi = Math.round(w * scale);
  const hi = Math.round(h * scale);
  const d = gcd(wi, hi);
  return { rw: wi / d, rh: hi / d };
}

function parseTargetRatio(str: string): { rw: number; rh: number } | null {
  const m = str.trim().match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/);
  if (!m) return null;
  const rw = parseFloat(m[1]);
  const rh = parseFloat(m[2]);
  if (rw <= 0 || rh <= 0) return null;
  return { rw, rh };
}

export default function PortraitAspectRatioCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.portrait-aspect-ratio-calculator");
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [unit, setUnit] = React.useState<Unit>("pixels");
  const [targetRatio, setTargetRatio] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const wNum = parseFloat(width);
  const hNum = parseFloat(height);
  const valid =
    Number.isFinite(wNum) && wNum > 0 &&
    Number.isFinite(hNum) && hNum > 0;
  const parsedTarget = targetRatio.trim() ? parseTargetRatio(targetRatio) : null;
  const targetError = targetRatio.trim() && !parsedTarget;

  const result = React.useMemo(() => {
    if (!valid) return null;
    const { rw, rh } = simplifyRatio(wNum, hNum);
    const ratio = wNum / hNum;
    const diagonal = Math.sqrt(wNum * wNum + hNum * hNum);
    let orientation: "portrait" | "landscape" | "square";
    if (hNum > wNum) orientation = "portrait";
    else if (wNum > hNum) orientation = "landscape";
    else orientation = "square";

    let scaledWidth: number | null = null;
    let scaledHeight: number | null = null;
    if (parsedTarget) {
      const targetR = parsedTarget.rw / parsedTarget.rh;
      if (ratio > targetR) {
        // image is too wide — scale by height
        scaledHeight = hNum;
        scaledWidth = hNum * targetR;
      } else {
        // image is too tall — scale by width
        scaledWidth = wNum;
        scaledHeight = wNum / targetR;
      }
    }
    return { rw, rh, ratio, diagonal, orientation, scaledWidth, scaledHeight };
  }, [valid, wNum, hNum, parsedTarget]);

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

  function reset() {
    setWidth("");
    setHeight("");
    setUnit("pixels");
    setTargetRatio("");
    setTouched(false);
  }

  const unitLabel = t(`unit.${unit}` as never);

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
          <div className="space-y-2">
            <Label>{t("field.unit")}</Label>
            <div className="flex flex-wrap gap-2">
              {UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={unit === u ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setUnit(u); setTouched(false); }}
                >
                  {t(`unit.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="parc-w">{t("field.width")} ({unitLabel})</Label>
              <Input
                id="parc-w"
                type="number"
                inputMode="decimal"
                min={0}
                value={width}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parc-h">{t("field.height")} ({unitLabel})</Label>
              <Input
                id="parc-h"
                type="number"
                inputMode="decimal"
                min={0}
                value={height}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="parc-tr">{t("field.targetRatio")}</Label>
              <Input
                id="parc-tr"
                type="text"
                value={targetRatio}
                placeholder={t("placeholder.ratio")}
                onChange={(e) => { setTargetRatio(e.target.value); setTouched(true); }}
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
          {touched && targetError && (
            <p className="text-sm text-red-600">{t("error.ratio")}</p>
          )}

          {touched && valid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.aspectRatio")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{result.ratio.toFixed(4)}</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.simplified")}</div>
                  <div className="text-2xl font-bold text-zinc-900">{result.rw}:{result.rh}</div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.diagonal")}</div>
                  <div className="text-xl font-bold text-zinc-900">
                    {result.diagonal.toFixed(2)} {unitLabel}
                  </div>
                </div>
                <div className="rounded border bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.orientation")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t(`result.${result.orientation}` as never)}
                  </div>
                </div>
                {result.scaledWidth !== null && result.scaledHeight !== null && (
                  <>
                    <div className="rounded border bg-white p-3">
                      <div className="text-xs text-zinc-500">{t("result.scaledWidth")}</div>
                      <div className="text-xl font-semibold text-zinc-900">
                        {result.scaledWidth.toFixed(2)} {unitLabel}
                      </div>
                    </div>
                    <div className="rounded border bg-white p-3">
                      <div className="text-xs text-zinc-500">{t("result.scaledHeight")}</div>
                      <div className="text-xl font-semibold text-zinc-900">
                        {result.scaledHeight.toFixed(2)} {unitLabel}
                      </div>
                    </div>
                  </>
                )}
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
