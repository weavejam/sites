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

function calcMeld(
  creatinine: number,
  bilirubin: number,
  inr: number,
  onDialysis: boolean,
  sodium: number
): { meld: number; meldNa: number; risk: string; mortality: string } | null {
  if (
    !Number.isFinite(creatinine) || creatinine <= 0 ||
    !Number.isFinite(bilirubin) || bilirubin <= 0 ||
    !Number.isFinite(inr) || inr <= 0 ||
    !Number.isFinite(sodium) || sodium <= 0
  ) return null;

  let cr = creatinine;
  if (onDialysis) cr = 2.0;
  else cr = Math.min(cr, 4.0);
  cr = Math.max(cr, 1.0);

  const bili = Math.max(bilirubin, 1.0);
  const inrVal = Math.max(inr, 1.0);

  const meldRaw = 3.78 * Math.log(bili) + 11.2 * Math.log(inrVal) + 9.57 * Math.log(cr) + 6.43;
  const meld = Math.round(meldRaw);

  const na = Math.max(125, Math.min(137, sodium));
  const meldNaRaw = meld + 1.32 * (137 - na) - 0.033 * meld * (137 - na);
  const meldNa = Math.round(meldNaRaw);

  let risk: string;
  let mortality: string;
  if (meld < 10) { risk = "stable"; mortality = "~1.9%"; }
  else if (meld < 20) { risk = "moderate"; mortality = "~6%"; }
  else if (meld < 30) { risk = "serious"; mortality = "~19.6%"; }
  else if (meld < 40) { risk = "severe"; mortality = "~52.6%"; }
  else { risk = "critical"; mortality = "~71.3%"; }

  return { meld, meldNa, risk, mortality };
}

export default function MeldCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.meld-calculator-model-for-end-stage-liver-disease");

  const [creatinine, setCreatinine] = React.useState("");
  const [bilirubin, setBilirubin] = React.useState("");
  const [inr, setInr] = React.useState("");
  const [onDialysis, setOnDialysis] = React.useState(false);
  const [sodium, setSodium] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const crNum = parseFloat(creatinine);
  const biliNum = parseFloat(bilirubin);
  const inrNum = parseFloat(inr);
  const naNum = parseFloat(sodium);

  const allValid =
    creatinine !== "" && Number.isFinite(crNum) && crNum > 0 &&
    bilirubin !== "" && Number.isFinite(biliNum) && biliNum > 0 &&
    inr !== "" && Number.isFinite(inrNum) && inrNum > 0 &&
    sodium !== "" && Number.isFinite(naNum) && naNum > 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return calcMeld(crNum, biliNum, inrNum, onDialysis, naNum);
  }, [allValid, crNum, biliNum, inrNum, onDialysis, naNum]);

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
        applicationCategory: "HealthApplication",
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

  function reset() {
    setCreatinine(""); setBilirubin(""); setInr(""); setSodium("");
    setOnDialysis(false); setTouched(false);
  }

  const showError = touched && !allValid;

  const riskColors: Record<string, string> = {
    stable: "text-green-700",
    moderate: "text-yellow-700",
    serious: "text-orange-600",
    severe: "text-red-600",
    critical: "text-red-800",
  };

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="meld-cr">{t("field.creatinine")}</Label>
              <Input id="meld-cr" type="number" inputMode="decimal" value={creatinine} placeholder="1.0"
                onChange={(e) => { setCreatinine(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meld-bili">{t("field.bilirubin")}</Label>
              <Input id="meld-bili" type="number" inputMode="decimal" value={bilirubin} placeholder="1.0"
                onChange={(e) => { setBilirubin(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meld-inr">{t("field.inr")}</Label>
              <Input id="meld-inr" type="number" inputMode="decimal" value={inr} placeholder="1.0"
                onChange={(e) => { setInr(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meld-na">{t("field.sodium")}</Label>
              <Input id="meld-na" type="number" inputMode="decimal" value={sodium} placeholder="137"
                onChange={(e) => { setSodium(e.target.value); setTouched(true); }} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="meld-dialysis"
              type="checkbox"
              checked={onDialysis}
              onChange={(e) => { setOnDialysis(e.target.checked); setTouched(true); }}
              className="h-4 w-4 rounded border-zinc-300"
            />
            <Label htmlFor="meld-dialysis">{t("field.dialysis")}</Label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="flex gap-8">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.meld")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{result.meld}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.meldNa")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{result.meldNa}</div>
                </div>
              </div>
              <div className={`text-sm font-medium ${riskColors[result.risk] ?? "text-zinc-700"}`}>
                {t(`result.${result.risk}` as never)} — {t("result.mortality")}: {result.mortality}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
