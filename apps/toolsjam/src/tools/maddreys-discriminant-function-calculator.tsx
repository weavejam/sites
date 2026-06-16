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

type RiskCategory = "lowRisk" | "severeRisk" | "highRisk";

interface MaddreysResult {
  score: number;
  riskCategory: RiskCategory;
}

function computeMaddrey(pt: number, controlPt: number, bilirubin: number): MaddreysResult {
  const score = 4.6 * (pt - controlPt) + bilirubin;
  let riskCategory: RiskCategory;
  if (score >= 54) riskCategory = "highRisk";
  else if (score >= 32) riskCategory = "severeRisk";
  else riskCategory = "lowRisk";
  return { score, riskCategory };
}

export default function MaddreysDFCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.maddreys-discriminant-function-calculator");

  const [pt, setPt] = React.useState("");
  const [controlPt, setControlPt] = React.useState("");
  const [bilirubin, setBilirubin] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const ptN = parseFloat(pt);
  const controlPtN = parseFloat(controlPt);
  const bilirubinN = parseFloat(bilirubin);

  const isValid =
    Number.isFinite(ptN) && ptN > 0 &&
    Number.isFinite(controlPtN) && controlPtN > 0 &&
    Number.isFinite(bilirubinN) && bilirubinN >= 0;

  const result = React.useMemo<MaddreysResult | null>(() => {
    if (!isValid) return null;
    return computeMaddrey(ptN, controlPtN, bilirubinN);
  }, [isValid, ptN, controlPtN, bilirubinN]);

  function reset() {
    setPt(""); setControlPt(""); setBilirubin(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
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

  const riskColorClass = result
    ? result.riskCategory === "lowRisk"
      ? "text-green-700"
      : result.riskCategory === "severeRisk"
      ? "text-amber-700"
      : "text-red-700"
    : "";

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="mdf-pt">{t("field.pt")} ({t("field.ptUnit")})</Label>
              <Input id="mdf-pt" type="number" inputMode="decimal" value={pt}
                placeholder={t("placeholder.pt")}
                onChange={(e) => { setPt(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mdf-cpt">{t("field.controlPt")} ({t("field.ptUnit")})</Label>
              <Input id="mdf-cpt" type="number" inputMode="decimal" value={controlPt}
                placeholder={t("placeholder.controlPt")}
                onChange={(e) => { setControlPt(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mdf-bili">{t("field.bilirubin")} ({t("field.bilirubinUnit")})</Label>
              <Input id="mdf-bili" type="number" inputMode="decimal" value={bilirubin}
                placeholder={t("placeholder.bilirubin")}
                onChange={(e) => { setBilirubin(e.target.value); setTouched(true); }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && !isValid && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-900">{t("result.heading")}</div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.score")}: </span>
                  <span className="text-2xl font-bold text-zinc-900">{result.score.toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.riskCategory")}: </span>
                  <span className={`font-semibold ${riskColorClass}`}>
                    {t(`result.${result.riskCategory}` as never)}
                  </span>
                </div>
                <div className="mt-2 rounded border border-zinc-200 bg-white p-3 text-zinc-700">
                  <span className="font-medium">{t("result.recommendation")}: </span>
                  {t(`result.${result.riskCategory}Rec` as never)}
                </div>
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
