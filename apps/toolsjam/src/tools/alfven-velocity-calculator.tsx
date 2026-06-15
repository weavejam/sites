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

const MU0 = 4 * Math.PI * 1e-7; // vacuum permeability H/m

function computeAlfvenVelocity(B: number, n: number, m: number): number | null {
  if (!Number.isFinite(B) || !Number.isFinite(n) || !Number.isFinite(m)) return null;
  if (B <= 0 || n <= 0 || m <= 0) return null;
  const rho = n * m;
  return B / Math.sqrt(MU0 * rho);
}

function fmt(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export default function AlfvenVelocityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.alfven-velocity-calculator");

  const [magneticField, setMagneticField] = React.useState("");
  const [plasmaDensity, setPlasmaDensity] = React.useState("");
  const [ionMass, setIonMass] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const bNum = parseFloat(magneticField);
  const nNum = parseFloat(plasmaDensity);
  const mNum = parseFloat(ionMass);

  const result = React.useMemo<number | null>(() => {
    if (!touched) return null;
    return computeAlfvenVelocity(bNum, nNum, mNum);
  }, [touched, bNum, nNum, mNum]);

  function loadExample(b: string, n: string, m: string) {
    setMagneticField(b);
    setPlasmaDensity(n);
    setIonMass(m);
    setTouched(true);
  }

  function reset() {
    setMagneticField("");
    setPlasmaDensity("");
    setIonMass("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const showError = touched && (!Number.isFinite(bNum) || !Number.isFinite(nNum) || !Number.isFinite(mNum) || bNum <= 0 || nNum <= 0 || mNum <= 0);

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="av-b">{t("field.magneticField")}</Label>
              <Input
                id="av-b"
                type="number"
                inputMode="decimal"
                value={magneticField}
                placeholder={t("placeholder.magneticField")}
                onChange={(e) => { setMagneticField(e.target.value); setTouched(false); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.magneticField")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="av-n">{t("field.plasmaDensity")}</Label>
              <Input
                id="av-n"
                type="number"
                inputMode="decimal"
                value={plasmaDensity}
                placeholder={t("placeholder.plasmaDensity")}
                onChange={(e) => { setPlasmaDensity(e.target.value); setTouched(false); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.plasmaDensity")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="av-m">{t("field.ionMass")}</Label>
              <Input
                id="av-m"
                type="number"
                inputMode="decimal"
                value={ionMass}
                placeholder={t("placeholder.ionMass")}
                onChange={(e) => { setIonMass(e.target.value); setTouched(false); }}
              />
              <p className="text-xs text-zinc-500">{t("unit.ionMass")}</p>
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
            <p className="text-sm text-red-600">{t("error.nonPositive")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t("result.label")} {fmt(result)} {t("result.unit")}
              </div>
              {result >= 1000 && (
                <div className="mt-1 text-sm text-zinc-500">
                  ≈ {fmt(result / 1000, 2)} km/s
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("0.00005", "5e11", "1.6726e-27")}>
              {t("examples.loadMagnetosphere")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("0.001", "1e15", "1.6726e-27")}>
              {t("examples.loadCorona")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("5", "1e20", "3.344e-27")}>
              {t("examples.loadTokamak")}
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
