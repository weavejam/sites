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

function formatNum(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function getCategory(
  edpi: number,
  t: ReturnType<typeof useTranslations>
): string {
  if (edpi < 400) return t("category.veryLow");
  if (edpi < 800) return t("category.low");
  if (edpi < 1600) return t("category.medium");
  if (edpi < 3200) return t("category.high");
  return t("category.veryHigh");
}

export default function EdpiCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.edpi-calculator");

  const [dpi, setDpi] = React.useState("");
  const [sensitivity, setSensitivity] = React.useState("");
  const [fov, setFov] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const dpiNum = parseFloat(dpi);
  const sensNum = parseFloat(sensitivity);
  const fovNum = parseFloat(fov);

  const dpiValid = dpi !== "" && Number.isFinite(dpiNum) && dpiNum > 0;
  const sensValid =
    sensitivity !== "" && Number.isFinite(sensNum) && sensNum > 0;
  const fovValid = fov === "" || (Number.isFinite(fovNum) && fovNum > 0 && fovNum <= 360);

  const result = React.useMemo(() => {
    if (!dpiValid || !sensValid) return null;
    const edpi = dpiNum * sensNum;
    // Reference formula: cm/360° = (360 × 2.54) / (eDPI × 0.025), where
    // 0.025°/count is the standard Quake-engine yaw used by most gaming
    // sensitivity references. Equivalent to 36576 / eDPI.
    const cm360 = 36576 / edpi;
    return { edpi, cm360 };
  }, [dpiNum, sensNum, dpiValid, sensValid]);

  function reset() {
    setDpi("");
    setSensitivity("");
    setFov("");
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

  const showError =
    touched && (!dpiValid || !sensValid) && (dpi !== "" || sensitivity !== "");
  const showDpiZero = touched && dpi !== "" && dpiNum <= 0;
  const showSensZero = touched && sensitivity !== "" && sensNum <= 0;

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
              <Label htmlFor="edpi-dpi">{t("field.dpi")}</Label>
              <Input
                id="edpi-dpi"
                type="number"
                inputMode="decimal"
                min={1}
                value={dpi}
                placeholder={t("field.dpiPlaceholder")}
                onChange={(e) => {
                  setDpi(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edpi-sens">{t("field.sensitivity")}</Label>
              <Input
                id="edpi-sens"
                type="number"
                inputMode="decimal"
                step="0.01"
                min={0.01}
                value={sensitivity}
                placeholder={t("field.sensitivityPlaceholder")}
                onChange={(e) => {
                  setSensitivity(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edpi-fov">{t("field.fov")}</Label>
              <Input
                id="edpi-fov"
                type="number"
                inputMode="decimal"
                min={1}
                max={360}
                value={fov}
                placeholder={t("field.fovPlaceholder")}
                onChange={(e) => {
                  setFov(e.target.value);
                  setTouched(true);
                }}
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

          {showError && !showDpiZero && !showSensZero && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showDpiZero && (
            <p className="text-sm text-red-600">{t("error.dpiZero")}</p>
          )}
          {showSensZero && (
            <p className="text-sm text-red-600">{t("error.sensitivityZero")}</p>
          )}

          {touched && result !== null && (
            <div className="space-y-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="mb-3 text-sm font-medium text-zinc-500">
                  {t("result.heading")}
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.edpi")}
                    </div>
                    <div className="mt-0.5 text-2xl font-bold text-zinc-900">
                      {formatNum(result.edpi, 0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.cm360")}
                    </div>
                    <div className="mt-0.5 text-2xl font-bold text-zinc-900">
                      {formatNum(result.cm360, 1)} cm
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-400">
                      {t("result.cm360Note")}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.category")}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-zinc-800">
                      {getCategory(result.edpi, t)}
                    </div>
                  </div>
                </div>
              </div>
              {fov !== "" && fovValid && fovNum > 0 && (
                <p className="text-sm text-zinc-600">
                  {t("result.fovNote", {
                    fov: fovNum,
                    pct: Math.round((fovNum / 90 - 1) * 100),
                  })}
                </p>
              )}
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
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
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
