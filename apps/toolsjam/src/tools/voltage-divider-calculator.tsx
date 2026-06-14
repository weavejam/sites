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

function formatNumber(value: number, decimals = 6): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return rounded.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

function formatPower(watts: number): string {
  if (!Number.isFinite(watts)) return "—";
  if (watts < 0.001) return `${formatNumber(watts * 1e6, 4)} µW`;
  if (watts < 1) return `${formatNumber(watts * 1000, 4)} mW`;
  return `${formatNumber(watts, 4)} W`;
}

function formatCurrent(amps: number): string {
  if (!Number.isFinite(amps)) return "—";
  if (amps < 0.001) return `${formatNumber(amps * 1e6, 4)} µA`;
  if (amps < 1) return `${formatNumber(amps * 1000, 4)} mA`;
  return `${formatNumber(amps, 4)} A`;
}

export default function VoltageDividerCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.voltage-divider-calculator");
  const [vin, setVin] = React.useState("");
  const [r1, setR1] = React.useState("");
  const [r2, setR2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const parsedVin = vin === "" ? NaN : parseFloat(vin);
  const parsedR1 = r1 === "" ? NaN : parseFloat(r1);
  const parsedR2 = r2 === "" ? NaN : parseFloat(r2);

  const valid =
    Number.isFinite(parsedVin) &&
    Number.isFinite(parsedR1) &&
    Number.isFinite(parsedR2) &&
    parsedVin > 0 &&
    parsedR1 > 0 &&
    parsedR2 > 0;

  const vout = valid ? parsedVin * parsedR2 / (parsedR1 + parsedR2) : null;
  const current = valid ? parsedVin / (parsedR1 + parsedR2) : null;
  const powerR1 = current !== null ? current * current * parsedR1 : null;
  const powerR2 = current !== null ? current * current * parsedR2 : null;
  const powerTotal = current !== null ? current * current * (parsedR1 + parsedR2) : null;

  function reset() {
    setVin("");
    setR1("");
    setR2("");
    setTouched(false);
  }

  function loadExample(nextVin: string, nextR1: string, nextR2: string) {
    setVin(nextVin);
    setR1(nextR1);
    setR2(nextR2);
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
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: t("tagline"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
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
              <Label htmlFor="vd-vin">{t("field.vin")}</Label>
              <Input
                id="vd-vin"
                type="number"
                inputMode="decimal"
                value={vin}
                placeholder={t("placeholder.vin")}
                onChange={(e) => { setVin(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vd-r1">{t("field.r1")}</Label>
              <Input
                id="vd-r1"
                type="number"
                inputMode="decimal"
                value={r1}
                placeholder={t("placeholder.r1")}
                onChange={(e) => { setR1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vd-r2">{t("field.r2")}</Label>
              <Input
                id="vd-r2"
                type="number"
                inputMode="decimal"
                value={r2}
                placeholder={t("placeholder.r2")}
                onChange={(e) => { setR2(e.target.value); setTouched(true); }}
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

          {vout !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelVout")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(vout, 4)} V
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelCurrent")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatCurrent(current!)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.labelPowerTotal")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatPower(powerTotal!)}
                  </div>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 pt-1 text-sm text-zinc-600">
                <div>{t("result.labelPowerR1")}: {formatPower(powerR1!)}</div>
                <div>{t("result.labelPowerR2")}: {formatPower(powerR2!)}</div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("10", "1000", "1000")}
            >
              {t("examples.loadHalf")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("5", "2200", "3300")}
            >
              {t("examples.loadSensor")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("12", "10000", "5000")}
            >
              {t("examples.loadReference")}
            </Button>
          </div>
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
