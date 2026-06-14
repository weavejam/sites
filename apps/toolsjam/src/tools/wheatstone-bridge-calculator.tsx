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

function formatNum(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

export default function WheatstoneBridgeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.wheatstone-bridge-calculator");

  const [r1, setR1] = React.useState("");
  const [r2, setR2] = React.useState("");
  const [r3, setR3] = React.useState("");
  const [vr, setVr] = React.useState("");
  const [vs, setVs] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const r1n = parseFloat(r1);
  const r2n = parseFloat(r2);
  const r3n = parseFloat(r3);
  const vrn = parseFloat(vr);
  const vsn = parseFloat(vs);

  const valid =
    r1 !== "" && r2 !== "" && r3 !== "" && vr !== "" && vs !== "" &&
    Number.isFinite(r1n) && Number.isFinite(r2n) && Number.isFinite(r3n) &&
    Number.isFinite(vrn) && Number.isFinite(vsn) &&
    r1n > 0 && r2n > 0 && r3n > 0 && vsn > 0;

  const result = React.useMemo<{
    rx: number;
    vout: number;
    balanced: boolean;
  } | null>(() => {
    if (!valid) return null;
    // Vout = Vs * (Rx/(R2+Rx) - R3/(R1+R3))
    // Solving for Rx: ratio = Vout/Vs + R3/(R1+R3)
    // Rx = ratio * R2 / (1 - ratio)
    const ratio = vrn / vsn + r3n / (r1n + r3n);
    if (ratio <= 0 || ratio >= 1) return null;
    const rx = (ratio * r2n) / (1 - ratio);
    const vout = vsn * (rx / (r2n + rx) - r3n / (r1n + r3n));
    const balanced = Math.abs(vout) < 0.001;
    return { rx, vout, balanced };
  }, [valid, r1n, r2n, r3n, vrn, vsn]);

  function loadExample(
    r1v: string, r2v: string, r3v: string, vrv: string, vsv: string
  ) {
    setR1(r1v); setR2(r2v); setR3(r3v); setVr(vrv); setVs(vsv);
    setTouched(true);
  }

  function reset() {
    setR1(""); setR2(""); setR3(""); setVr(""); setVs("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="wb-r1">{t("field.r1")}</Label>
              <Input
                id="wb-r1"
                type="number"
                inputMode="decimal"
                value={r1}
                placeholder={t("placeholder.r1")}
                onChange={(e) => { setR1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wb-r2">{t("field.r2")}</Label>
              <Input
                id="wb-r2"
                type="number"
                inputMode="decimal"
                value={r2}
                placeholder={t("placeholder.r2")}
                onChange={(e) => { setR2(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wb-r3">{t("field.r3")}</Label>
              <Input
                id="wb-r3"
                type="number"
                inputMode="decimal"
                value={r3}
                placeholder={t("placeholder.r3")}
                onChange={(e) => { setR3(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wb-vr">{t("field.voltageRatio")}</Label>
              <Input
                id="wb-vr"
                type="number"
                inputMode="decimal"
                value={vr}
                placeholder={t("placeholder.voltageRatio")}
                onChange={(e) => { setVr(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wb-vs">{t("field.supplyVoltage")}</Label>
              <Input
                id="wb-vs"
                type="number"
                inputMode="decimal"
                value={vs}
                placeholder={t("placeholder.supplyVoltage")}
                onChange={(e) => { setVs(e.target.value); setTouched(true); }}
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
          {touched && valid && result === null && (
            <p className="text-sm text-red-600">{t("error.outOfRange")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.rx", { value: formatNum(result.rx) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.vout", { value: formatNum(result.vout, 4) })}
              </div>
              <div className="text-sm text-zinc-600">
                {result.balanced ? t("result.balanced") : t("result.unbalanced")}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

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
            type="button" variant="outline" size="sm"
            onClick={() => loadExample("1000", "1000", "500", "0", "5")}
          >
            {t("examples.loadBalanced")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadExample("1000", "1000", "750", "0.25", "10")}
          >
            {t("examples.loadUnbalanced")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadExample("120", "120", "120", "0.05", "5")}
          >
            {t("examples.loadStrainGauge")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
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
