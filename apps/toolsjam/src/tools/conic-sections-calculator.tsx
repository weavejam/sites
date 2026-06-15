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

type ConicKey =
  | "circle"
  | "ellipse"
  | "parabola"
  | "hyperbola"
  | "linear";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e8) / 1e8;
  return rounded.toString();
}

export default function ConicSectionsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.conic-sections-calculator");
  const [a, setA] = React.useState<string>("");
  const [b, setB] = React.useState<string>("");
  const [c, setC] = React.useState<string>("");
  const [d, setD] = React.useState<string>("");
  const [e, setE] = React.useState<string>("");
  const [f, setF] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  function num(v: string): number | null {
    if (v === "") return null;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  }

  const values = {
    A: num(a),
    B: num(b),
    C: num(c),
    D: num(d),
    E: num(e),
    F: num(f),
  };
  const allFilled =
    values.A !== null &&
    values.B !== null &&
    values.C !== null &&
    values.D !== null &&
    values.E !== null &&
    values.F !== null;

  const result = React.useMemo<{
    type: ConicKey;
    discriminant: number;
    explainKey:
      | "explainCircle"
      | "explainEllipse"
      | "explainParabola"
      | "explainHyperbola"
      | null;
  } | null>(() => {
    if (!allFilled) return null;
    const A = values.A as number;
    const B = values.B as number;
    const C = values.C as number;
    const D = values.D as number;
    const E = values.E as number;
    const F = values.F as number;
    if (A === 0 && B === 0 && C === 0) {
      if (D === 0 && E === 0 && F === 0) {
        return null;
      }
      return { type: "linear", discriminant: 0, explainKey: null };
    }
    const disc = B * B - 4 * A * C;
    const tol = 1e-10;
    if (Math.abs(disc) < tol) {
      return { type: "parabola", discriminant: disc, explainKey: "explainParabola" };
    }
    if (disc < 0) {
      if (Math.abs(A - C) < tol && Math.abs(B) < tol) {
        return { type: "circle", discriminant: disc, explainKey: "explainCircle" };
      }
      return { type: "ellipse", discriminant: disc, explainKey: "explainEllipse" };
    }
    return { type: "hyperbola", discriminant: disc, explainKey: "explainHyperbola" };
  }, [allFilled, values.A, values.B, values.C, values.D, values.E, values.F]);

  function reset() {
    setA("");
    setB("");
    setC("");
    setD("");
    setE("");
    setF("");
    setTouched(false);
  }

  function loadExample(va: string, vb: string, vc: string, vd: string, ve: string, vf: string) {
    setA(va);
    setB(vb);
    setC(vc);
    setD(vd);
    setE(ve);
    setF(vf);
    setTouched(true);
  }

  const allZero =
    allFilled &&
    values.A === 0 &&
    values.B === 0 &&
    values.C === 0 &&
    values.D === 0 &&
    values.E === 0 &&
    values.F === 0;

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
        mainEntity: faqItems.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        })),
      },
    ],
  };

  const showInvalid = touched && !allFilled;
  const showZero = touched && allZero;

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
            {[
              { id: "a", label: t("field.a"), value: a, set: setA },
              { id: "b", label: t("field.b"), value: b, set: setB },
              { id: "c", label: t("field.c"), value: c, set: setC },
              { id: "d", label: t("field.d"), value: d, set: setD },
              { id: "e", label: t("field.e"), value: e, set: setE },
              { id: "f", label: t("field.f"), value: f, set: setF },
            ].map((row) => (
              <div key={row.id} className="space-y-2">
                <Label htmlFor={`cs-${row.id}`}>{row.label}</Label>
                <Input
                  id={`cs-${row.id}`}
                  type="number"
                  inputMode="decimal"
                  value={row.value}
                  placeholder={t("placeholder.number")}
                  onChange={(ev) => {
                    row.set(ev.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("1", "0", "1", "0", "0", "-9")}
            >
              {t("button.loadCircle")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("4", "0", "9", "0", "0", "-36")}
            >
              {t("button.loadEllipse")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("1", "0", "0", "0", "-4", "0")}
            >
              {t("button.loadParabola")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("1", "0", "-1", "0", "0", "-1")}
            >
              {t("button.loadHyperbola")}
            </Button>
          </div>

          {showInvalid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showZero && (
            <p className="text-sm text-red-600">{t("error.zero")}</p>
          )}

          {result && !showZero && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t(`result.${result.type}` as never)}
              </div>
              {result.type !== "linear" && (
                <div className="text-sm text-zinc-700">
                  {t("result.discriminant", {
                    value: formatNumber(result.discriminant),
                  })}
                </div>
              )}
              {result.explainKey && (
                <div className="text-sm text-zinc-600">
                  {t(`result.${result.explainKey}` as never)}
                </div>
              )}
              {result.type === "linear" && (
                <div className="text-sm text-zinc-600">
                  {t("error.notConic")}
                </div>
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
          {faqItems.map((qa, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{qa.q}</div>
              <div className="mt-1 text-zinc-700">{qa.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
