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

const PT_NORMAL_BASELINE = 12; // seconds

function computeDIC(params: {
  platelets: number;
  fibrinogen: number;
  pt: number;
  ddimer: number;
}): {
  plateletScore: number;
  ddimerScore: number;
  ptScore: number;
  fibrinogenScore: number;
  total: number;
  interpretation: "overt" | "nonOvert" | "normal";
} {
  const { platelets, fibrinogen, pt, ddimer } = params;

  // Platelet score
  const plateletScore = platelets < 50 ? 2 : platelets < 100 ? 1 : 0;

  // D-dimer score
  const ddimerScore = ddimer >= 5 ? 3 : ddimer > 0.5 ? 2 : 0;

  // PT prolongation from baseline
  const ptProlongation = pt - PT_NORMAL_BASELINE;
  const ptScore = ptProlongation > 6 ? 2 : ptProlongation >= 3 ? 1 : 0;

  // Fibrinogen: convert mg/dL to g/L (divide by 100). Score 1 if <= 1 g/L (100 mg/dL)
  const fibrinogenScore = fibrinogen <= 100 ? 1 : 0;

  const total = plateletScore + ddimerScore + ptScore + fibrinogenScore;

  const interpretation =
    total >= 5 ? "overt" : total <= 1 ? "normal" : "nonOvert";

  return { plateletScore, ddimerScore, ptScore, fibrinogenScore, total, interpretation };
}

const INTERP_COLORS = {
  overt: "text-red-700 bg-red-50 border-red-200",
  nonOvert: "text-yellow-700 bg-yellow-50 border-yellow-200",
  normal: "text-green-700 bg-green-50 border-green-200",
};

export default function DicSyndromeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dic-syndrome-calculator");

  const [platelets, setPlatelets] = React.useState("");
  const [fibrinogen, setFibrinogen] = React.useState("");
  const [pt, setPt] = React.useState("");
  const [ddimer, setDdimer] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const plNum = parseFloat(platelets);
  const fibNum = parseFloat(fibrinogen);
  const ptNum = parseFloat(pt);
  const ddNum = parseFloat(ddimer);

  const allValid =
    platelets !== "" && Number.isFinite(plNum) &&
    fibrinogen !== "" && Number.isFinite(fibNum) &&
    pt !== "" && Number.isFinite(ptNum) &&
    ddimer !== "" && Number.isFinite(ddNum);

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return computeDIC({ platelets: plNum, fibrinogen: fibNum, pt: ptNum, ddimer: ddNum });
  }, [allValid, plNum, fibNum, ptNum, ddNum]);

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
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

  function reset() {
    setPlatelets(""); setFibrinogen(""); setPt(""); setDdimer("");
    setTouched(false);
  }

  function loadProfile(pl: string, fib: string, ptV: string, dd: string) {
    setPlatelets(pl); setFibrinogen(fib); setPt(ptV); setDdimer(dd);
    setTouched(true);
  }

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
              <Label htmlFor="dic-platelets">{t("field.platelets")}</Label>
              <Input
                id="dic-platelets"
                type="number"
                inputMode="decimal"
                value={platelets}
                placeholder={t("placeholder.platelets")}
                onChange={(e) => { setPlatelets(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dic-fibrinogen">{t("field.fibrinogen")}</Label>
              <Input
                id="dic-fibrinogen"
                type="number"
                inputMode="decimal"
                value={fibrinogen}
                placeholder={t("placeholder.fibrinogen")}
                onChange={(e) => { setFibrinogen(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dic-pt">{t("field.pt")}</Label>
              <Input
                id="dic-pt"
                type="number"
                inputMode="decimal"
                value={pt}
                placeholder={t("placeholder.pt")}
                onChange={(e) => { setPt(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dic-ddimer">{t("field.ddimer")}</Label>
              <Input
                id="dic-ddimer"
                type="number"
                inputMode="decimal"
                value={ddimer}
                placeholder={t("placeholder.ddimer")}
                onChange={(e) => { setDdimer(e.target.value); setTouched(true); }}
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

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.required")}</p>
          )}

          {result !== null && (
            <div className={`rounded-lg border p-4 space-y-3 ${INTERP_COLORS[result.interpretation]}`}>
              <div className="text-sm font-medium">{t("result.heading")}</div>
              <div className="text-3xl font-bold">
                {t("result.score")}: {result.total} / 8
              </div>
              <div className="text-lg font-semibold">
                {t(`interpretation.${result.interpretation}` as never)}
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="font-medium">{t("result.breakdown")}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
                  <span>{t("result.platelets")}: {result.plateletScore}</span>
                  <span>{t("result.ddimer")}: {result.ddimerScore}</span>
                  <span>{t("result.pt")}: {result.ptScore}</span>
                  <span>{t("result.fibrinogen")}: {result.fibrinogenScore}</span>
                </div>
              </div>
              <p className="mt-2 text-xs opacity-75">{t("result.note")}</p>
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
            onClick={() => loadProfile("250", "300", "12", "0.3")}>
            {t("examples.loadNormal")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("120", "180", "14.5", "2.5")}>
            {t("examples.loadMild")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("80", "120", "18", "8")}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("45", "80", "25", "15")}>
            {t("examples.loadSevere")}
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
