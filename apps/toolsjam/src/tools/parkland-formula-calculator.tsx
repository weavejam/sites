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

type PatientType = "adult" | "pediatric";
type BurnDepth = "superficial" | "partial" | "full";

interface CalcResult {
  totalFluidMl: number;
  first8hMl: number;
  next16hMl: number;
  rateFirst8hMlHr: number;
  rateNext16hMlHr: number;
  isSuperficial: boolean;
}

function fmt(n: number, decimals = 0): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ParklandFormulaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.parkland-formula-calculator");

  const [weight, setWeight] = React.useState("");
  const [tbsa, setTbsa] = React.useState("");
  const [timeSinceBurn, setTimeSinceBurn] = React.useState("");
  const [patientType, setPatientType] = React.useState<PatientType>("adult");
  const [burnDepth, setBurnDepth] = React.useState<BurnDepth>("partial");
  const [result, setResult] = React.useState<CalcResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);

  function calculate() {
    setTouched(true);
    const w = parseFloat(weight);
    const tbsaVal = parseFloat(tbsa);
    const timeVal = parseFloat(timeSinceBurn) || 0;

    if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(tbsaVal) || tbsaVal <= 0) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }
    if (tbsaVal > 100) {
      setError(t("error.tbsaRange"));
      setResult(null);
      return;
    }
    if (Number.isFinite(timeVal) && timeVal < 0) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }

    const isSuperficial = burnDepth === "superficial";
    if (isSuperficial) {
      setResult({
        totalFluidMl: 0,
        first8hMl: 0,
        next16hMl: 0,
        rateFirst8hMlHr: 0,
        rateNext16hMlHr: 0,
        isSuperficial: true,
      });
      setError(null);
      return;
    }

    const totalFluidMl = 4 * w * tbsaVal;
    const half = totalFluidMl / 2;
    const sanitizedTime = Math.max(0, timeVal);
    const remainingFirst8h = Math.max(0, 8 - Math.min(sanitizedTime, 8));
    const rateFirst8hMlHr = remainingFirst8h > 0 ? half / remainingFirst8h : 0;
    const rateNext16hMlHr = half / 16;

    setResult({
      totalFluidMl,
      first8hMl: half,
      next16hMl: half,
      rateFirst8hMlHr,
      rateNext16hMlHr,
      isSuperficial: false,
    });
    setError(null);
  }

  function reset() {
    setWeight("");
    setTbsa("");
    setTimeSinceBurn("");
    setPatientType("adult");
    setBurnDepth("partial");
    setResult(null);
    setError(null);
    setTouched(false);
  }

  function loadExample(w: string, tb: string, time: string, pt: PatientType, bd: BurnDepth) {
    setWeight(w);
    setTbsa(tb);
    setTimeSinceBurn(time);
    setPatientType(pt);
    setBurnDepth(bd);
    setTouched(false);
    setResult(null);
    setError(null);
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
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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
              <Label htmlFor="park-weight">{t("field.weight")}</Label>
              <Input
                id="park-weight"
                type="number"
                inputMode="decimal"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="park-tbsa">{t("field.tbsa")}</Label>
              <Input
                id="park-tbsa"
                type="number"
                inputMode="decimal"
                value={tbsa}
                placeholder={t("placeholder.tbsa")}
                onChange={(e) => setTbsa(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="park-time">{t("field.timeSinceBurn")}</Label>
              <Input
                id="park-time"
                type="number"
                inputMode="decimal"
                value={timeSinceBurn}
                placeholder={t("placeholder.timeSinceBurn")}
                onChange={(e) => setTimeSinceBurn(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.patientType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["adult", "pediatric"] as PatientType[]).map((pt) => (
                <Button
                  key={pt}
                  type="button"
                  variant={patientType === pt ? "default" : "outline"}
                  onClick={() => setPatientType(pt)}
                >
                  {t(`type.${pt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.burnDepth")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["superficial", "partial", "full"] as BurnDepth[]).map((bd) => (
                <Button
                  key={bd}
                  type="button"
                  variant={burnDepth === bd ? "default" : "outline"}
                  onClick={() => setBurnDepth(bd)}
                >
                  {t(`burnDepth.${bd}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && touched && <p className="text-sm text-red-600">{error}</p>}

          {result && !error && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              {result.isSuperficial ? (
                <p className="text-sm text-amber-700">{t("error.superficialNote")}</p>
              ) : (
                <>
                  <div className="text-xs text-zinc-500 italic">{t("result.formula")}</div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <div className="text-xs text-zinc-500">{t("result.totalFluid")}</div>
                      <div className="text-2xl font-semibold text-zinc-900">
                        {fmt(result.totalFluidMl)} {t("result.unit")}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">{t("result.first8h")}</div>
                      <div className="text-xl font-semibold text-zinc-900">
                        {fmt(result.first8hMl)} {t("result.unit")}
                      </div>
                      <div className="text-sm text-zinc-600">
                        ({fmt(result.rateFirst8hMlHr, 0)} {t("result.unitRate")})
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">{t("result.next16h")}</div>
                      <div className="text-xl font-semibold text-zinc-900">
                        {fmt(result.next16hMl)} {t("result.unit")}
                      </div>
                      <div className="text-sm text-zinc-600">
                        ({fmt(result.rateNext16hMlHr, 0)} {t("result.unitRate")})
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-amber-700">{t("result.note")}</p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <p className="text-sm font-medium text-zinc-600">{t("examples.intro")}</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("75", "40", "1", "adult", "full")}
          >
            {t("examples.loadSevere")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("65", "25", "2", "adult", "partial")}
          >
            {t("examples.loadModerate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("30", "15", "1", "pediatric", "partial")}
          >
            {t("examples.loadPediatric")}
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
