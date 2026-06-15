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

type Field = "p1" | "v1" | "t1" | "p2" | "v2" | "t2";
const FIELDS: Field[] = ["p1", "v1", "t1", "p2", "v2", "t2"];

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e6 || (abs < 0.001 && abs > 0)) {
    return n.toExponential(4);
  }
  return parseFloat(n.toPrecision(6)).toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function solveFor(unknown: Field, vals: Record<Field, number>): number {
  const { p1, v1, t1, p2, v2, t2 } = vals;
  switch (unknown) {
    case "p1": return (p2 * v2 * t1) / (v1 * t2);
    case "v1": return (p2 * v2 * t1) / (p1 * t2);
    case "t1": return (p1 * v1 * t2) / (p2 * v2);
    case "p2": return (p1 * v1 * t2) / (v2 * t1);
    case "v2": return (p1 * v1 * t2) / (p2 * t1);
    case "t2": return (p2 * v2 * t1) / (p1 * v1);
  }
}

export default function CombinedGasLawCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.combined-gas-law-calculator");

  const [inputs, setInputs] = React.useState<Record<Field, string>>({
    p1: "", v1: "", t1: "", p2: "", v2: "", t2: "",
  });
  const [touched, setTouched] = React.useState(false);

  function setField(f: Field, v: string) {
    setInputs((prev) => ({ ...prev, [f]: v }));
    setTouched(true);
  }

  function reset() {
    setInputs({ p1: "", v1: "", t1: "", p2: "", v2: "", t2: "" });
    setTouched(false);
  }

  function loadExample(vals: Partial<Record<Field, string>>) {
    const full: Record<Field, string> = { p1: "", v1: "", t1: "", p2: "", v2: "", t2: "" };
    for (const f of FIELDS) {
      full[f] = vals[f] ?? "";
    }
    setInputs(full);
    setTouched(true);
  }

  const emptyFields = FIELDS.filter((f) => inputs[f].trim() === "");
  const invalidFields = FIELDS.filter(
    (f) => inputs[f].trim() !== "" && !Number.isFinite(parseFloat(inputs[f]))
  );

  const result = React.useMemo<{ field: Field; value: number } | null>(() => {
    if (emptyFields.length !== 1 || invalidFields.length > 0) return null;
    const unknown = emptyFields[0];
    const vals = {} as Record<Field, number>;
    for (const f of FIELDS) {
      if (f !== unknown) {
        const n = parseFloat(inputs[f]);
        if (!Number.isFinite(n) || n <= 0) return null;
        vals[f] = n;
      }
    }
    vals[unknown] = 0;
    const value = solveFor(unknown, vals);
    if (!Number.isFinite(value) || value <= 0) return null;
    return { field: unknown, value };
  }, [emptyFields, invalidFields, inputs]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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

  const showNeedFive = touched && emptyFields.length !== 1;
  const showInvalid = touched && invalidFields.length > 0;

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FIELDS.map((f) => (
              <div key={f} className="space-y-2">
                <Label htmlFor={`cgl-${f}`}>{t(`field.${f}` as never)}</Label>
                <Input
                  id={`cgl-${f}`}
                  type="number"
                  inputMode="decimal"
                  value={inputs[f]}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => setField(f, e.target.value)}
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

          {showNeedFive && (
            <p className="text-sm text-red-600">{t("error.needFive")}</p>
          )}
          {showInvalid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t(`result.${result.field}` as never, { value: formatNumber(result.value) })}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample({ p1: "1.0", v1: "2.0", t1: "273", v2: "1.5", t2: "300" })}
          >
            {t("examples.loadPressure")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample({ p1: "2.0", v1: "1.0", t1: "250", p2: "1.5", t2: "300" })}
          >
            {t("examples.loadVolume")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample({ p1: "1.5", v1: "3.0", t1: "280", p2: "2.0", v2: "2.5" })}
          >
            {t("examples.loadTemp")}
          </Button>
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
