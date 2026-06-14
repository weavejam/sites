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

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

interface RiskResult {
  riskExposed: number;
  riskUnexposed: number;
  rr: number;
  arr: number;
  nnt: number | null;
}

function calcRisk(a: number, b: number, c: number, d: number): RiskResult | null {
  const totalExposed = a + b;
  const totalUnexposed = c + d;
  if (totalExposed <= 0 || totalUnexposed <= 0) return null;
  const riskExposed = a / totalExposed;
  const riskUnexposed = c / totalUnexposed;
  if (riskUnexposed === 0) return null;
  const rr = riskExposed / riskUnexposed;
  const arr = riskUnexposed - riskExposed;
  const nnt = arr === 0 ? null : Math.abs(1 / arr);
  return { riskExposed, riskUnexposed, rr, arr, nnt };
}

export default function RiskCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.risk-calculator");
  const [aVal, setAVal] = React.useState("");
  const [bVal, setBVal] = React.useState("");
  const [cVal, setCVal] = React.useState("");
  const [dVal, setDVal] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const a = parseInt(aVal, 10);
  const b = parseInt(bVal, 10);
  const c = parseInt(cVal, 10);
  const d = parseInt(dVal, 10);

  const allValid =
    Number.isFinite(a) && a >= 0 &&
    Number.isFinite(b) && b >= 0 &&
    Number.isFinite(c) && c >= 0 &&
    Number.isFinite(d) && d >= 0;

  const result = React.useMemo(
    () => (touched && allValid ? calcRisk(a, b, c, d) : null),
    [touched, allValid, a, b, c, d]
  );

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

  const showError = touched && (!allValid || !result);

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
              <Label htmlFor="risk-a">{t("field.exposedWithOutcome")}</Label>
              <Input
                id="risk-a"
                type="number"
                min="0"
                step="1"
                placeholder={t("placeholder.count")}
                value={aVal}
                onChange={(e) => { setAVal(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="risk-b">{t("field.exposedWithoutOutcome")}</Label>
              <Input
                id="risk-b"
                type="number"
                min="0"
                step="1"
                placeholder={t("placeholder.count")}
                value={bVal}
                onChange={(e) => { setBVal(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="risk-c">{t("field.unexposedWithOutcome")}</Label>
              <Input
                id="risk-c"
                type="number"
                min="0"
                step="1"
                placeholder={t("placeholder.count")}
                value={cVal}
                onChange={(e) => { setCVal(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="risk-d">{t("field.unexposedWithoutOutcome")}</Label>
              <Input
                id="risk-d"
                type="number"
                min="0"
                step="1"
                placeholder={t("placeholder.count")}
                value={dVal}
                onChange={(e) => { setDVal(e.target.value); setTouched(false); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => { setAVal(""); setBVal(""); setCVal(""); setDVal(""); setTouched(false); }}
            >
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.riskExposed")}</div>
                  <div className="text-xl font-semibold">
                    {fmt(result.riskExposed * 100, 2)}%
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.riskUnexposed")}</div>
                  <div className="text-xl font-semibold">
                    {fmt(result.riskUnexposed * 100, 2)}%
                  </div>
                </div>
                <div className="rounded border border-blue-300 bg-blue-50 p-3">
                  <div className="text-xs text-blue-600">{t("result.rr")}</div>
                  <div className="text-2xl font-bold text-blue-700">{fmt(result.rr, 3)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.arr")}</div>
                  <div className="text-xl font-semibold">
                    {fmt(Math.abs(result.arr) * 100, 2)}%
                    <span className="ml-1 text-xs text-zinc-400">
                      ({result.arr >= 0 ? t("result.reduction") : t("result.increase")})
                    </span>
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.nnt")}</div>
                  <div className="text-xl font-semibold">
                    {result.nnt !== null ? fmt(result.nnt, 1) : "∞"}
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
