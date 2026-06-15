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

function formatNum(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

function calcEV(aperture: number, shutter: number, iso: number, ec: number): number {
  // EV (scene) = log2(N²/t) + log2(ISO/100) + EC
  return Math.log2((aperture * aperture) / shutter) + Math.log2(iso / 100) + ec;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function ExposureCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.exposure-calculator");

  const [aperture, setAperture] = React.useState("");
  const [shutter, setShutter] = React.useState("");
  const [iso, setIso] = React.useState("");
  const [ec, setEc] = React.useState("0");
  const [touched, setTouched] = React.useState(false);

  const apertureNum = parseFloat(aperture);
  const shutterNum = parseFloat(shutter);
  const isoNum = parseFloat(iso);
  const ecNum = parseFloat(ec) || 0;

  const valid =
    aperture !== "" && Number.isFinite(apertureNum) && apertureNum > 0 &&
    shutter !== "" && Number.isFinite(shutterNum) && shutterNum > 0 &&
    iso !== "" && Number.isFinite(isoNum) && isoNum > 0;

  const ev = React.useMemo(() => {
    if (!valid) return null;
    return calcEV(apertureNum, shutterNum, isoNum, ecNum);
  }, [valid, apertureNum, shutterNum, isoNum, ecNum]);

  const evBase = React.useMemo(() => {
    if (!valid) return null;
    return Math.log2((apertureNum * apertureNum) / shutterNum);
  }, [valid, apertureNum, shutterNum]);

  function loadExample(a: string, s: string, i: string, e: string) {
    setAperture(a);
    setShutter(s);
    setIso(i);
    setEc(e);
    setTouched(true);
  }

  function reset() {
    setAperture("");
    setShutter("");
    setIso("");
    setEc("0");
    setTouched(false);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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
              <Label htmlFor="ec-aperture">{t("field.aperture")}</Label>
              <Input
                id="ec-aperture"
                type="number"
                inputMode="decimal"
                min="0.7"
                step="0.1"
                value={aperture}
                placeholder={t("placeholder.aperture")}
                onChange={(e) => { setAperture(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec-shutter">{t("field.shutter")}</Label>
              <Input
                id="ec-shutter"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={shutter}
                placeholder={t("placeholder.shutter")}
                onChange={(e) => { setShutter(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec-iso">{t("field.iso")}</Label>
              <Input
                id="ec-iso"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={iso}
                placeholder={t("placeholder.iso")}
                onChange={(e) => { setIso(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec-ec">{t("field.ec")}</Label>
              <Input
                id="ec-ec"
                type="number"
                inputMode="decimal"
                step="0.3"
                value={ec}
                placeholder="0"
                onChange={(e) => { setEc(e.target.value); setTouched(true); }}
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

          {ev !== null && evBase !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.ev", { ev: formatNum(ev, 1) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.evBase", { evBase: formatNum(evBase, 1) })}
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("8", "0.008", "100", "0")}>
            {t("examples.loadSunny")}
          </Button>
          <Button type="button" variant="outline" size="sm"
                onClick={() => loadExample("2.8", "0.0167", "400", "0")}>
            {t("examples.loadIndoor")}
          </Button>
          <Button type="button" variant="outline" size="sm"
                onClick={() => loadExample("1.4", "0.0333", "1600", "0")}>
            {t("examples.loadLowLight")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
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
