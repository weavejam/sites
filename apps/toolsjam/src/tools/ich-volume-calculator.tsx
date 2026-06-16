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

type VolumeMethod = "abc2" | "ellipsoid";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function IchVolumeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ich-volume-calculator");

  const [diameterA, setDiameterA] = React.useState("");
  const [diameterB, setDiameterB] = React.useState("");
  const [diameterC, setDiameterC] = React.useState("");
  const [method, setMethod] = React.useState<VolumeMethod>("abc2");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(diameterA);
  const bNum = parseFloat(diameterB);
  const cNum = parseFloat(diameterC);

  const aValid = diameterA !== "" && Number.isFinite(aNum) && aNum > 0;
  const bValid = diameterB !== "" && Number.isFinite(bNum) && bNum > 0;
  const cValid = diameterC !== "" && Number.isFinite(cNum) && cNum > 0;

  const volume = React.useMemo<number | null>(() => {
    if (!aValid || !bValid || !cValid) return null;
    if (method === "abc2") return (aNum * bNum * cNum) / 2;
    return (Math.PI * aNum * bNum * cNum) / 6;
  }, [aNum, aValid, bNum, bValid, cNum, cValid, method]);

  const severityKey = React.useMemo(() => {
    if (volume === null) return null;
    if (volume < 10) return "mild";
    if (volume <= 30) return "moderate";
    if (volume <= 60) return "large";
    return "massive";
  }, [volume]);

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
    for (let i = 1; i <= 5; i++) {
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

  function reset() {
    setDiameterA("");
    setDiameterB("");
    setDiameterC("");
    setMethod("abc2");
    setTouched(false);
  }

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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const showError = touched && (!aValid || !bValid || !cValid);

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
              <Label htmlFor="ich-volume-a">{t("field.diameterA")}</Label>
              <Input
                id="ich-volume-a"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={diameterA}
                onChange={(e) => {
                  setDiameterA(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ich-volume-b">{t("field.diameterB")}</Label>
              <Input
                id="ich-volume-b"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={diameterB}
                onChange={(e) => {
                  setDiameterB(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ich-volume-c">{t("field.diameterC")}</Label>
              <Input
                id="ich-volume-c"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={diameterC}
                onChange={(e) => {
                  setDiameterC(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.method")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["abc2", "ellipsoid"] as VolumeMethod[]).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={method === value ? "default" : "outline"}
                  onClick={() => {
                    setMethod(value);
                    setTouched(true);
                  }}
                >
                  {t(`type.${value}` as never)}
                </Button>
              ))}
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
            <p className="text-sm text-red-600">{t("error.invalidDiameter")}</p>
          )}

          {!showError && volume !== null && severityKey !== null && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.volume")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(volume, 2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.severity")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t(`severity.${severityKey}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.note")}</div>
                  <div className="text-sm font-medium text-zinc-900">
                    {t(`result.note${capitalize(severityKey)}` as never)}
                  </div>
                </div>
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {item.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
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
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
