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

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e8) / 1e8;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

export default function ThreeDimensionalDistanceCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.three-dimensional-distance-calculator");

  const [x1, setX1] = React.useState("");
  const [y1, setY1] = React.useState("");
  const [z1, setZ1] = React.useState("");
  const [x2, setX2] = React.useState("");
  const [y2, setY2] = React.useState("");
  const [z2, setZ2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const coords = [x1, y1, z1, x2, y2, z2].map(parseFloat);
  const allValid = [x1, y1, z1, x2, y2, z2].every(
    (v, i) => v !== "" && Number.isFinite(coords[i])
  );

  const result = React.useMemo<number | null>(() => {
    if (!allValid) return null;
    const [cx1, cy1, cz1, cx2, cy2, cz2] = coords;
    const dx = cx2 - cx1;
    const dy = cy2 - cy1;
    const dz = cz2 - cz1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }, [allValid, coords]);

  function reset() {
    setX1("");
    setY1("");
    setZ1("");
    setX2("");
    setY2("");
    setZ2("");
    setTouched(false);
  }

  function loadExample(
    cx1: string,
    cy1: string,
    cz1: string,
    cx2: string,
    cy2: string,
    cz2: string
  ) {
    setX1(cx1);
    setY1(cy1);
    setZ1(cz1);
    setX2(cx2);
    setY2(cy2);
    setZ2(cz2);
    setTouched(true);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  const showError = touched && !allValid;

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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">{t("field.point1Label")}</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="d3-x1">{t("field.x1")}</Label>
                  <Input
                    id="d3-x1"
                    type="number"
                    inputMode="decimal"
                    value={x1}
                    placeholder={t("field.x1Placeholder")}
                    onChange={(e) => { setX1(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="d3-y1">{t("field.y1")}</Label>
                  <Input
                    id="d3-y1"
                    type="number"
                    inputMode="decimal"
                    value={y1}
                    placeholder={t("field.y1Placeholder")}
                    onChange={(e) => { setY1(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="d3-z1">{t("field.z1")}</Label>
                  <Input
                    id="d3-z1"
                    type="number"
                    inputMode="decimal"
                    value={z1}
                    placeholder={t("field.z1Placeholder")}
                    onChange={(e) => { setZ1(e.target.value); setTouched(true); }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">{t("field.point2Label")}</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="d3-x2">{t("field.x2")}</Label>
                  <Input
                    id="d3-x2"
                    type="number"
                    inputMode="decimal"
                    value={x2}
                    placeholder={t("field.x2Placeholder")}
                    onChange={(e) => { setX2(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="d3-y2">{t("field.y2")}</Label>
                  <Input
                    id="d3-y2"
                    type="number"
                    inputMode="decimal"
                    value={y2}
                    placeholder={t("field.y2Placeholder")}
                    onChange={(e) => { setY2(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="d3-z2">{t("field.z2")}</Label>
                  <Input
                    id="d3-z2"
                    type="number"
                    inputMode="decimal"
                    value={z2}
                    placeholder={t("field.z2Placeholder")}
                    onChange={(e) => { setZ2(e.target.value); setTouched(true); }}
                  />
                </div>
              </div>
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
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.distance")}: {formatNum(result)}
              </div>
              <div className="text-xs text-zinc-500">{t("result.formulaDisplay")}</div>
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "2", "3", "4", "6", "8")}
          >
            {t("examples.loadExample1")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("-1", "0", "5", "2", "-4", "1")}
          >
            {t("examples.loadExample2")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2", "3", "5", "8", "7", "1")}
          >
            {t("examples.loadExample3")}
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
