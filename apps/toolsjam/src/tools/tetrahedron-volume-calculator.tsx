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

type Method = "regular" | "baseAndHeight";

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

function computeRegular(a: number): number {
  return (a * a * a * Math.sqrt(2)) / 12;
}

function computeBaseHeight(A: number, h: number): number {
  return (1 / 3) * A * h;
}

export default function TetrahedronVolumeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.tetrahedron-volume-calculator");

  const [method, setMethod] = React.useState<Method | "">("");
  const [edgeLength, setEdgeLength] = React.useState("");
  const [baseArea, setBaseArea] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(edgeLength);
  const aValid = edgeLength !== "" && Number.isFinite(aNum) && aNum > 0;
  const ANum = parseFloat(baseArea);
  const AValid = baseArea !== "" && Number.isFinite(ANum) && ANum > 0;
  const hNum = parseFloat(height);
  const hValid = height !== "" && Number.isFinite(hNum) && hNum > 0;

  const result = React.useMemo<{
    volume: number;
    formula: string;
  } | null>(() => {
    if (!method) return null;
    if (method === "regular") {
      if (!aValid) return null;
      return {
        volume: computeRegular(aNum),
        formula: `V = a³√2 / 12 = ${edgeLength}³ × √2 / 12`,
      };
    }
    if (!AValid || !hValid) return null;
    return {
      volume: computeBaseHeight(ANum, hNum),
      formula: `V = (1/3) × A × h = (1/3) × ${baseArea} × ${height}`,
    };
  }, [method, aValid, aNum, AValid, ANum, hValid, hNum, edgeLength, baseArea, height]);

  function reset() {
    setMethod("");
    setEdgeLength("");
    setBaseArea("");
    setHeight("");
    setTouched(false);
  }

  function loadExample(
    m: Method,
    edge?: string,
    area?: string,
    h?: string
  ) {
    setMethod(m);
    setEdgeLength(edge ?? "");
    setBaseArea(area ?? "");
    setHeight(h ?? "");
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

  const METHODS: Method[] = ["regular", "baseAndHeight"];

  const showMethodError = touched && !method;
  const showInputError =
    touched &&
    !!method &&
    ((method === "regular" && !aValid) ||
      (method === "baseAndHeight" && (!AValid || !hValid)));

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
            <Label>{t("field.calculationType")}</Label>
            <div className="flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={method === m ? "default" : "outline"}
                  onClick={() => {
                    setMethod(m);
                    setTouched(false);
                  }}
                >
                  {t(`field.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {method === "regular" && (
            <div className="space-y-2">
              <Label htmlFor="tv-edge">{t("field.edgeLength")}</Label>
              <Input
                id="tv-edge"
                type="number"
                inputMode="decimal"
                value={edgeLength}
                placeholder={t("field.edgeLengthPlaceholder")}
                onChange={(e) => { setEdgeLength(e.target.value); setTouched(true); }}
              />
            </div>
          )}

          {method === "baseAndHeight" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tv-base">{t("field.baseArea")}</Label>
                <Input
                  id="tv-base"
                  type="number"
                  inputMode="decimal"
                  value={baseArea}
                  placeholder={t("field.baseAreaPlaceholder")}
                  onChange={(e) => { setBaseArea(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tv-height">{t("field.height")}</Label>
                <Input
                  id="tv-height"
                  type="number"
                  inputMode="decimal"
                  value={height}
                  placeholder={t("field.heightPlaceholder")}
                  onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showMethodError && (
            <p className="text-sm text-red-600">{t("error.selectMethod")}</p>
          )}
          {showInputError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && touched && !showMethodError && !showInputError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.volume")}: {formatNum(result.volume)}
              </div>
              <div className="text-xs text-zinc-500">{result.formula}</div>
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
            onClick={() => loadExample("regular", "6")}
          >
            {t("examples.loadExample1")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("regular", "2.5")}
          >
            {t("examples.loadExample2")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("baseAndHeight", undefined, "15", "7")}
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
