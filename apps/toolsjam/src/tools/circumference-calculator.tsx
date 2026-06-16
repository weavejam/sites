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

type InputType = "radius" | "diameter";

function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
}

export default function CircumferenceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.circumference-calculator");

  const [inputType, setInputType] = React.useState<InputType>("radius");
  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);

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

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const numVal = parseFloat(value);

  const result = React.useMemo<{
    circumference: number | null;
    radius: number | null;
    diameter: number | null;
  }>(() => {
    if (!touched || !Number.isFinite(numVal) || numVal <= 0)
      return { circumference: null, radius: null, diameter: null };
    const r = inputType === "radius" ? numVal : numVal / 2;
    return {
      circumference: 2 * Math.PI * r,
      radius: r,
      diameter: 2 * r,
    };
  }, [touched, inputType, numVal]);

  const showError = touched && result.circumference === null;

  function reset() {
    setValue("");
    setTouched(false);
  }

  function loadExample(type: InputType, v: string) {
    setInputType(type);
    setValue(v);
    setTouched(true);
  }

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
          <div className="space-y-2">
            <Label>{t("field.inputType")}</Label>
            <div className="flex gap-2">
              {(["radius", "diameter"] as InputType[]).map((it) => (
                <Button
                  key={it}
                  type="button"
                  variant={inputType === it ? "default" : "outline"}
                  onClick={() => {
                    setInputType(it);
                    setTouched(false);
                  }}
                >
                  {t(`type.${it}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="circ-value">
              {inputType === "radius" ? t("field.radius") : t("field.diameter")}
            </Label>
            <Input
              id="circ-value"
              type="number"
              inputMode="decimal"
              value={value}
              placeholder={t("placeholder.positive")}
              onChange={(e) => {
                setValue(e.target.value);
                setTouched(true);
              }}
            />
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

          {result.circumference !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {fmtNum(result.circumference)}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div className="rounded border border-zinc-200 bg-white p-2">
                  <span className="text-zinc-500">{t("result.radius")}: </span>
                  <span className="font-medium text-zinc-900">
                    {fmtNum(result.radius!)}
                  </span>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-2">
                  <span className="text-zinc-500">
                    {t("result.diameter")}:{" "}
                  </span>
                  <span className="font-medium text-zinc-900">
                    {fmtNum(result.diameter!)}
                  </span>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-700">
              {t("examples.loadLabel")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("radius", "7")}
              >
                {t("examples.loadRadius")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("diameter", "14")}
              >
                {t("examples.loadDiameter")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("radius", "1")}
              >
                {t("examples.loadUnit")}
              </Button>
            </div>
          </div>
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
