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

interface FaqItem {
  q: string;
  a: string;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

type RiskKey = "optimal" | "borderline" | "high";

function riskForTotalHdl(r: number): RiskKey {
  if (r < 3.5) return "optimal";
  if (r <= 5.0) return "borderline";
  return "high";
}

function riskForLdlHdl(r: number): RiskKey {
  if (r < 2.0) return "optimal";
  if (r <= 3.0) return "borderline";
  return "high";
}

function riskForNonHdl(v: number): RiskKey {
  if (v < 130) return "optimal";
  if (v <= 160) return "borderline";
  return "high";
}

export default function CholesterolRatioCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.cholesterol-ratio-calculator");

  const [total, setTotal] = React.useState("");
  const [hdl, setHdl] = React.useState("");
  const [ldl, setLdl] = React.useState("");
  const [trig, setTrig] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const totalNum = parseFloat(total);
  const hdlNum = parseFloat(hdl);
  const ldlNum = parseFloat(ldl);

  const totalValid = total !== "" && Number.isFinite(totalNum) && totalNum > 0;
  const hdlValid = hdl !== "" && Number.isFinite(hdlNum) && hdlNum > 0;
  const ldlProvided = ldl !== "" && Number.isFinite(ldlNum) && ldlNum > 0;

  const result = React.useMemo(() => {
    if (!totalValid || !hdlValid) return null;
    const totalHdlRatio = totalNum / hdlNum;
    const nonHdl = totalNum - hdlNum;
    const ldlHdlRatio = ldlProvided ? ldlNum / hdlNum : null;
    return {
      totalHdlRatio,
      nonHdl,
      ldlHdlRatio,
      totalHdlRisk: riskForTotalHdl(totalHdlRatio),
      ldlHdlRisk: ldlHdlRatio !== null ? riskForLdlHdl(ldlHdlRatio) : null,
      nonHdlRisk: riskForNonHdl(nonHdl),
    };
  }, [totalValid, hdlValid, ldlProvided, totalNum, hdlNum, ldlNum]);

  function reset() {
    setTotal(""); setHdl(""); setLdl(""); setTrig("");
    setTouched(false);
  }

  function loadExample(t: string, h: string, l: string, tr: string) {
    setTotal(t); setHdl(h); setLdl(l); setTrig(tr);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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

  const showError = touched && (!totalValid || !hdlValid);

  const riskColorClass = (risk: RiskKey | null) => {
    if (!risk) return "text-zinc-700";
    if (risk === "optimal") return "text-green-700";
    if (risk === "borderline") return "text-yellow-700";
    return "text-red-700";
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="crc-total">{t("field.total")}</Label>
              <Input
                id="crc-total"
                type="number"
                inputMode="decimal"
                min="0"
                value={total}
                placeholder={t("placeholder.total")}
                onChange={(e) => { setTotal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crc-hdl">{t("field.hdl")}</Label>
              <Input
                id="crc-hdl"
                type="number"
                inputMode="decimal"
                min="0"
                value={hdl}
                placeholder={t("placeholder.hdl")}
                onChange={(e) => { setHdl(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crc-ldl">{t("field.ldl")}</Label>
              <Input
                id="crc-ldl"
                type="number"
                inputMode="decimal"
                min="0"
                value={ldl}
                placeholder={t("placeholder.ldl")}
                onChange={(e) => { setLdl(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crc-trig">{t("field.triglycerides")}</Label>
              <Input
                id="crc-trig"
                type="number"
                inputMode="decimal"
                min="0"
                value={trig}
                placeholder={t("placeholder.triglycerides")}
                onChange={(e) => { setTrig(e.target.value); setTouched(true); }}
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

          {result !== null && !showError && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalHdlLabel")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.totalHdlRatio.toFixed(2)}
                  </div>
                  <div className={`text-sm font-medium ${riskColorClass(result.totalHdlRisk)}`}>
                    {t(`risk.${result.totalHdlRisk}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.nonHdlLabel")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.nonHdl.toFixed(1)} {t("unit.mgdl")}
                  </div>
                  <div className={`text-sm font-medium ${riskColorClass(result.nonHdlRisk)}`}>
                    {t(`risk.${result.nonHdlRisk}` as never)}
                  </div>
                </div>
                {result.ldlHdlRatio !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.ldlHdlLabel")}</div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {result.ldlHdlRatio.toFixed(2)}
                    </div>
                    <div className={`text-sm font-medium ${riskColorClass(result.ldlHdlRisk)}`}>
                      {t(`risk.${result.ldlHdlRisk}` as never)}
                    </div>
                  </div>
                )}
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
            onClick={() => loadExample("180", "65", "95", "120")}>
            {t("examples.loadOptimal")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("240", "45", "160", "200")}>
            {t("examples.loadBorderline")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("280", "35", "190", "300")}>
            {t("examples.loadHighRisk")}
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
