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

interface Pair {
  x: string;
  y: string;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number, d = 6): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(d)).toString();
}

export default function ConstantOfProportionalityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.constant-of-proportionality-calculator");
  const [pairs, setPairs] = React.useState<Pair[]>([{ x: "", y: "" }]);
  const [touched, setTouched] = React.useState(false);

  function updatePair(idx: number, field: "x" | "y", val: string) {
    setPairs((prev) => prev.map((p, i) => (i === idx ? { ...p, [field]: val } : p)));
    setTouched(true);
  }

  function addPair() {
    setPairs((prev) => [...prev, { x: "", y: "" }]);
  }

  function removePair(idx: number) {
    setPairs((prev) => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  }

  function reset() {
    setPairs([{ x: "", y: "" }]);
    setTouched(false);
  }

  const validPairs = pairs
    .map((p) => ({ x: parseFloat(p.x), y: parseFloat(p.y) }))
    .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y) && p.x !== 0);

  const kValues = validPairs.map((p) => p.y / p.x);
  const kMean = kValues.length > 0 ? kValues.reduce((a, b) => a + b, 0) / kValues.length : null;
  const isConsistent = kValues.length > 1 && kValues.every((k) => Math.abs(k - kValues[0]) < 1e-9);
  const isApproxConsistent = kValues.length > 1 && kValues.every((k) => Math.abs(k - (kMean ?? 0)) / Math.abs(kMean ?? 1) < 0.0001);

  const result = validPairs.length > 0 ? kValues[0] : null;

  function loadExample(prs: Pair[]) {
    setPairs(prs);
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
          <div className="space-y-3">
            {pairs.map((pair, idx) => (
              <div key={idx} className="flex items-end gap-3">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`cop-x-${idx}`}>{t("field.x", { n: idx + 1 })}</Label>
                  <Input
                    id={`cop-x-${idx}`}
                    type="number"
                    inputMode="decimal"
                    value={pair.x}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => updatePair(idx, "x", e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`cop-y-${idx}`}>{t("field.y", { n: idx + 1 })}</Label>
                  <Input
                    id={`cop-y-${idx}`}
                    type="number"
                    inputMode="decimal"
                    value={pair.y}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => updatePair(idx, "y", e.target.value)}
                  />
                </div>
                {pairs.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePair(idx)}
                    className="mb-0.5"
                  >
                    {t("button.remove")}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={addPair}>
              {t("button.addPair")}
            </Button>
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && validPairs.length === 0 && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                k = {fmt(result)}
              </div>
              <div className="text-sm text-zinc-600">{t("result.equation", { k: fmt(result) })}</div>
              {kValues.length > 1 && (
                <div className="mt-2 text-sm">
                  {isConsistent || isApproxConsistent ? (
                    <span className="text-green-700">{t("result.consistent")}</span>
                  ) : (
                    <span className="text-amber-600">{t("result.inconsistent")}</span>
                  )}
                  <div className="mt-1 text-zinc-600">
                    {t("result.perPair")}:&nbsp;
                    {kValues.map((k, i) => `k${i + 1}=${fmt(k)}`).join(", ")}
                  </div>
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample([{ x: "10", y: "300" }])}>
            {t("examples.loadFuel")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample([{ x: "3", y: "12" }])}>
            {t("examples.loadOhm")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample([{ x: "8", y: "2" }])}>
            {t("examples.loadRecipe")}
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
