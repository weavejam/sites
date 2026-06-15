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

type AngleUnit = "degrees" | "radians" | "gradians";

const UNITS: AngleUnit[] = ["degrees", "radians", "gradians"];
const COUNTS = [1, 2, 3, 4, 5];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fullRotation(unit: AngleUnit): number {
  if (unit === "degrees") return 360;
  if (unit === "radians") return 2 * Math.PI;
  return 400;
}

function fmt(n: number, unit: AngleUnit): string {
  if (unit === "radians") {
    return parseFloat(n.toFixed(6)).toString() + " rad";
  }
  return parseFloat(n.toFixed(4)).toString() + (unit === "gradians" ? "g" : "°");
}

export default function CoterminalAngleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.coterminal-angle-calculator");
  const [angle, setAngle] = React.useState("");
  const [unit, setUnit] = React.useState<AngleUnit>("degrees");
  const [count, setCount] = React.useState(3);
  const [touched, setTouched] = React.useState(false);

  interface CoterminalResult {
    positive: number[];
    negative: number[];
    standard: number;
  }

  const result = React.useMemo<CoterminalResult | null>(() => {
    if (!touched) return null;
    const a = parseFloat(angle);
    if (!Number.isFinite(a)) return null;
    const rot = fullRotation(unit);
    const positive: number[] = [];
    const negative: number[] = [];
    for (let i = 1; i <= count; i++) {
      positive.push(a + i * rot);
      negative.push(a - i * rot);
    }
    const standard = ((a % rot) + rot) % rot;
    return { positive, negative, standard };
  }, [touched, angle, unit, count]);

  function loadExample(a: string, u: AngleUnit) {
    setAngle(a);
    setUnit(u);
    setTouched(true);
  }

  function reset() {
    setAngle("");
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

  const showError = touched && angle !== "" && !Number.isFinite(parseFloat(angle));

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
              <Label htmlFor="cta-angle">{t("field.angle")}</Label>
              <Input
                id="cta-angle"
                type="number"
                inputMode="decimal"
                value={angle}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setAngle(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.angleHint")}</p>
            </div>
            <div className="space-y-2">
              <Label>{t("field.unit")}</Label>
              <div className="flex flex-wrap gap-2">
                {UNITS.map((u) => (
                  <Button
                    key={u}
                    type="button"
                    size="sm"
                    variant={unit === u ? "default" : "outline"}
                    onClick={() => {
                      setUnit(u);
                      setTouched(false);
                    }}
                  >
                    {t(`unit.${u}` as never)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.count")}</Label>
            <div className="flex flex-wrap gap-2">
              {COUNTS.map((n) => (
                <Button
                  key={n}
                  type="button"
                  size="sm"
                  variant={count === n ? "default" : "outline"}
                  onClick={() => setCount(n)}
                >
                  {n}
                </Button>
              ))}
            </div>
            <p className="text-xs text-zinc-500">{t("field.countHint")}</p>
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

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}:{" "}
                <span className="font-semibold text-zinc-900">
                  {fmt(parseFloat(angle), unit)}
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {t("result.standard")}
                </div>
                <div className="text-lg font-semibold text-zinc-900">
                  {fmt(result.standard, unit)}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-1">
                    {t("result.positive")}
                  </div>
                  <ul className="space-y-1">
                    {result.positive.map((v, i) => (
                      <li key={i} className="text-zinc-800 text-sm">
                        {fmt(v, unit)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-1">
                    {t("result.negative")}
                  </div>
                  <ul className="space-y-1">
                    {result.negative.map((v, i) => (
                      <li key={i} className="text-zinc-800 text-sm">
                        {fmt(v, unit)}
                      </li>
                    ))}
                  </ul>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("45", "degrees")}
          >
            {t("examples.load45")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("-30", "degrees")}
          >
            {t("examples.loadNeg30")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1.0472", "radians")}
          >
            {t("examples.loadRad")}
          </Button>
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
