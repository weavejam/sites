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

function fmt(n: number, dp = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: dp });
}

function interpretCohenD(d: number): string {
  const abs = Math.abs(d);
  if (abs < 0.2) return "negligible";
  if (abs < 0.5) return "small";
  if (abs < 0.8) return "medium";
  return "large";
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function CohensDCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.cohens-d-calculator");

  const [m1, setM1] = React.useState("");
  const [s1, setS1] = React.useState("");
  const [n1, setN1] = React.useState("");
  const [m2, setM2] = React.useState("");
  const [s2, setS2] = React.useState("");
  const [n2, setN2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const nums = React.useMemo(() => {
    const vals = [m1, s1, n1, m2, s2, n2].map(parseFloat);
    if (vals.some((v) => !Number.isFinite(v))) return null;
    if (vals[2] < 2 || vals[5] < 2) return null;
    if (vals[1] < 0 || vals[4] < 0) return null;
    return vals;
  }, [m1, s1, n1, m2, s2, n2]);

  const result = React.useMemo(() => {
    if (!nums) return null;
    const [mean1, sd1, size1, mean2, sd2, size2] = nums;
    const pooledVar =
      ((size1 - 1) * sd1 * sd1 + (size2 - 1) * sd2 * sd2) /
      (size1 + size2 - 2);
    const pooledSd = Math.sqrt(pooledVar);
    if (pooledSd === 0) return null;
    const d = (mean1 - mean2) / pooledSd;
    return { pooledSd, d };
  }, [nums]);

  function loadExample(
    vm1: string,
    vs1: string,
    vn1: string,
    vm2: string,
    vs2: string,
    vn2: string
  ) {
    setM1(vm1);
    setS1(vs1);
    setN1(vn1);
    setM2(vm2);
    setS2(vs2);
    setN2(vn2);
    setTouched(true);
  }

  function reset() {
    setM1(""); setS1(""); setN1("");
    setM2(""); setS2(""); setN2("");
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

  const showError = touched && !nums;
  const showPooledZero = touched && nums && !result;

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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">{t("field.group1")}</h3>
              <div className="space-y-2">
                <Label htmlFor="cd-m1">{t("field.mean1")}</Label>
                <Input
                  id="cd-m1"
                  type="number"
                  inputMode="decimal"
                  value={m1}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setM1(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cd-s1">{t("field.sd1")}</Label>
                <Input
                  id="cd-s1"
                  type="number"
                  inputMode="decimal"
                  value={s1}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setS1(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cd-n1">{t("field.n1")}</Label>
                <Input
                  id="cd-n1"
                  type="number"
                  inputMode="numeric"
                  value={n1}
                  placeholder={t("placeholder.sampleSize")}
                  onChange={(e) => { setN1(e.target.value); setTouched(true); }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">{t("field.group2")}</h3>
              <div className="space-y-2">
                <Label htmlFor="cd-m2">{t("field.mean2")}</Label>
                <Input
                  id="cd-m2"
                  type="number"
                  inputMode="decimal"
                  value={m2}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setM2(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cd-s2">{t("field.sd2")}</Label>
                <Input
                  id="cd-s2"
                  type="number"
                  inputMode="decimal"
                  value={s2}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setS2(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cd-n2">{t("field.n2")}</Label>
                <Input
                  id="cd-n2"
                  type="number"
                  inputMode="numeric"
                  value={n2}
                  placeholder={t("placeholder.sampleSize")}
                  onChange={(e) => { setN2(e.target.value); setTouched(true); }}
                />
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
          {showPooledZero && (
            <p className="text-sm text-red-600">{t("error.pooledZero")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.pooledSd")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.pooledSd)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.cohensD")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.d)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3 text-center">
                  <div className="text-xs text-zinc-500">{t("result.interpretation")}</div>
                  <div className="text-xl font-semibold text-zinc-900 capitalize">
                    {t(`result.size.${interpretCohenD(result.d)}` as never)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
            onClick={() => loadExample("85", "10", "30", "80", "9", "30")}
          >
            {t("examples.loadEducation")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("120", "15", "50", "130", "16", "50")}
          >
            {t("examples.loadMedical")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("450", "50", "25", "500", "55", "25")}
          >
            {t("examples.loadPsych")}
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
