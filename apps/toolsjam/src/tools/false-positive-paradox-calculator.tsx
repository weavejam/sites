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

function fmt(n: number, d = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

interface ExampleItem { input: string; output: string; note?: string }

// ── component ─────────────────────────────────────────────────────────────

export default function FalsePositiveParadoxCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.false-positive-paradox-calculator");
  const [prevalence, setPrevalence] = React.useState("");
  const [sensitivity, setSensitivity] = React.useState("");
  const [specificity, setSpecificity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const prev = parseFloat(prevalence);
  const sens = parseFloat(sensitivity);
  const spec = parseFloat(specificity);

  const valid =
    prevalence !== "" && sensitivity !== "" && specificity !== "" &&
    Number.isFinite(prev) && prev >= 0 && prev <= 100 &&
    Number.isFinite(sens) && sens > 0 && sens <= 100 &&
    Number.isFinite(spec) && spec > 0 && spec <= 100;

  const result = React.useMemo(() => {
    if (!valid) return null;
    const p = prev / 100;
    const se = sens / 100;
    const sp = spec / 100;
    const fpr = 1 - sp;
    const fnr = 1 - se;
    // PPV = P(D+ | T+) via Bayes
    const tpRate = se * p;
    const fpRate = fpr * (1 - p);
    const ppv = tpRate + fpRate > 0 ? tpRate / (tpRate + fpRate) : NaN;
    // NPV = P(D- | T-)
    const tnRate = sp * (1 - p);
    const fnRate = fnr * p;
    const npv = tnRate + fnRate > 0 ? tnRate / (tnRate + fnRate) : NaN;
    // Out of 100,000 hypothetical people
    const n = 100000;
    const tp = Math.round(se * p * n);
    const fp = Math.round(fpr * (1 - p) * n);
    const tn = Math.round(sp * (1 - p) * n);
    const fn = Math.round(fnr * p * n);
    return { ppv, npv, tp, fp, tn, fn };
  }, [valid, prev, sens, spec]);

  function reset() {
    setPrevalence(""); setSensitivity(""); setSpecificity("");
    setTouched(false);
  }

  function loadExample(p: string, se: string, sp: string) {
    setPrevalence(p); setSensitivity(se); setSpecificity(sp);
    setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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
      } catch { break; }
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

  const showError = touched && !valid;

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
          <CardTitle>{t("card.title")}</CardTitle>
          <CardDescription>{t("card.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="fpp-prev">{t("field.prevalence")}</Label>
              <Input
                id="fpp-prev" type="number" inputMode="decimal" min="0" max="100"
                value={prevalence} placeholder={t("placeholder.percent")}
                onChange={(e) => { setPrevalence(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fpp-sens">{t("field.sensitivity")}</Label>
              <Input
                id="fpp-sens" type="number" inputMode="decimal" min="0" max="100"
                value={sensitivity} placeholder={t("placeholder.percent")}
                onChange={(e) => { setSensitivity(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fpp-spec">{t("field.specificity")}</Label>
              <Input
                id="fpp-spec" type="number" inputMode="decimal" min="0" max="100"
                value={specificity} placeholder={t("placeholder.percent")}
                onChange={(e) => { setSpecificity(e.target.value); setTouched(true); }}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && touched && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.ppv")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {fmt(result.ppv * 100, 2)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.npv")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {fmt(result.npv * 100, 2)}%
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-600">{t("result.breakdownHeading")}</div>
                <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                  <div className="rounded border border-green-200 bg-green-50 p-2 text-center">
                    <div className="text-xs text-zinc-500">{t("result.truePositive")}</div>
                    <div className="font-semibold text-green-800">{result.tp.toLocaleString()}</div>
                  </div>
                  <div className="rounded border border-red-200 bg-red-50 p-2 text-center">
                    <div className="text-xs text-zinc-500">{t("result.falsePositive")}</div>
                    <div className="font-semibold text-red-800">{result.fp.toLocaleString()}</div>
                  </div>
                  <div className="rounded border border-blue-200 bg-blue-50 p-2 text-center">
                    <div className="text-xs text-zinc-500">{t("result.trueNegative")}</div>
                    <div className="font-semibold text-blue-800">{result.tn.toLocaleString()}</div>
                  </div>
                  <div className="rounded border border-orange-200 bg-orange-50 p-2 text-center">
                    <div className="text-xs text-zinc-500">{t("result.falseNegative")}</div>
                    <div className="font-semibold text-orange-800">{result.fn.toLocaleString()}</div>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">{t("result.breakdownNote")}</p>
              </div>
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
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0.1", "99", "99")}>
            {t("examples.loadRare")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("10", "95", "90")}>
            {t("examples.loadCommon")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1", "99.9", "98")}>
            {t("examples.loadSpam")}
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
