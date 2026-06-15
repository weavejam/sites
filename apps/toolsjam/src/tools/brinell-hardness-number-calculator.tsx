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

// BHN = 2F / (π × D × (D − √(D² − d²)))
function calcBHN(loadKgf: number, ballDiamMm: number, indentDiamMm: number): number {
  const D = ballDiamMm;
  const d = indentDiamMm;
  const area = (Math.PI * D * (D - Math.sqrt(D * D - d * d))) / 2;
  return loadKgf / area;
}

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  return n.toFixed(decimals);
}

export default function BrinellHardnessNumberCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.brinell-hardness-number-calculator");

  const [load, setLoad] = React.useState("");
  const [ballDiam, setBallDiam] = React.useState("");
  const [indentDiam, setIndentDiam] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const loadNum = parseFloat(load);
  const ballNum = parseFloat(ballDiam);
  const indentNum = parseFloat(indentDiam);

  const loadValid = load !== "" && Number.isFinite(loadNum) && loadNum > 0;
  const ballValid = ballDiam !== "" && Number.isFinite(ballNum) && ballNum > 0;
  const indentValid = indentDiam !== "" && Number.isFinite(indentNum) && indentNum > 0;
  const geometryValid = loadValid && ballValid && indentValid && indentNum < ballNum;

  const result = React.useMemo<{ bhn: number; area: number } | null>(() => {
    if (!geometryValid) return null;
    const D = ballNum;
    const d = indentNum;
    const area = (Math.PI * D * (D - Math.sqrt(D * D - d * d))) / 2;
    const bhn = loadNum / area;
    return { bhn, area };
  }, [loadNum, ballNum, indentNum, geometryValid]);

  const showInputError = touched && (!loadValid || !ballValid || !indentValid);
  const showGeomError = touched && loadValid && ballValid && indentValid && indentNum >= ballNum;

  function reset() {
    setLoad("");
    setBallDiam("");
    setIndentDiam("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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
              <Label htmlFor="bhn-load">{t("field.load")}</Label>
              <Input
                id="bhn-load"
                type="number"
                inputMode="decimal"
                value={load}
                placeholder="3000"
                onChange={(e) => { setLoad(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bhn-ball">{t("field.ballDiameter")}</Label>
              <Input
                id="bhn-ball"
                type="number"
                inputMode="decimal"
                value={ballDiam}
                placeholder="10"
                onChange={(e) => { setBallDiam(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bhn-indent">{t("field.indentDiameter")}</Label>
              <Input
                id="bhn-indent"
                type="number"
                inputMode="decimal"
                value={indentDiam}
                placeholder="3.2"
                onChange={(e) => { setIndentDiam(e.target.value); setTouched(true); }}
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

          {showInputError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showGeomError && (
            <p className="text-sm text-red-600">{t("error.geometry")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-3xl font-bold text-zinc-900">
                {fmt(result.bhn, 1)} <span className="text-xl font-semibold">{t("result.unit.bhn")}</span>
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.indentArea")}: {fmt(result.area, 4)} {t("result.unit.area")}
              </div>
              <div className="text-xs text-zinc-500">
                BHN = 2 × {loadNum} / (π × {ballNum} × ({ballNum} − √({ballNum}² − {indentNum}²)))
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
