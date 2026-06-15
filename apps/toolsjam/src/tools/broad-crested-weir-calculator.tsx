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

const G = 9.81; // m/s²

interface WeirResult {
  discharge: number;
  criticalDepth: number;
  criticalVelocity: number;
  froudeNumber: number;
  totalHead: number;
  frictionHeadLoss: number;
  effectiveHead: number;
}

// Q = Cd × (2/3) × B × √(2g/3) × H_eff^(3/2)
// Manning friction head loss over weir crest (L_crest ≈ 1.5 × H rule of thumb)
function calcWeir(
  width: number,
  head: number,
  height: number,
  manning: number,
  cd: number
): WeirResult {
  const yc = (2 / 3) * head;
  const vc = Math.sqrt(G * yc);
  // Estimate friction head loss over crest length (L_c = 1.5 × H)
  const Lc = 1.5 * head;
  const Sf = Math.pow((vc * manning) / Math.pow(yc, 2 / 3), 2);
  const frictionHeadLoss = Sf * Lc;
  const effectiveHead = Math.max(head - frictionHeadLoss, head * 0.99);
  const discharge = cd * (2 / 3) * width * Math.sqrt((2 * G) / 3) * Math.pow(effectiveHead, 1.5);
  const criticalDepth = yc;
  const criticalVelocity = vc;
  const froudeNumber = 1.0;
  const totalHead = head + height;
  return { discharge, criticalDepth, criticalVelocity, froudeNumber, totalHead, frictionHeadLoss, effectiveHead };
}

function fmt(n: number, decimals = 3): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  return n.toFixed(decimals);
}

export default function BroadCrestedWeirCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.broad-crested-weir-calculator");

  const [width, setWidth] = React.useState("");
  const [head, setHead] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [manning, setManning] = React.useState("0.013");
  const [cd, setCd] = React.useState("0.85");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<WeirResult | null>(() => {
    const b = parseFloat(width);
    const h = parseFloat(head);
    const p = parseFloat(height);
    const n = parseFloat(manning);
    const c = parseFloat(cd);
    if ([b, h, p, n, c].some((x) => !Number.isFinite(x) || x <= 0)) return null;
    if (c > 1) return null;
    return calcWeir(b, h, p, n, c);
  }, [width, head, height, manning, cd]);

  function reset() {
    setWidth("");
    setHead("");
    setHeight("");
    setManning("0.013");
    setCd("0.85");
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

  const showError = touched && result === null;

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
              <Label htmlFor="bcw-width">{t("field.width")}</Label>
              <Input
                id="bcw-width"
                type="number"
                inputMode="decimal"
                value={width}
                placeholder="3.0"
                onChange={(e) => { setWidth(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bcw-head">{t("field.head")}</Label>
              <Input
                id="bcw-head"
                type="number"
                inputMode="decimal"
                value={head}
                placeholder="0.75"
                onChange={(e) => { setHead(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bcw-height">{t("field.height")}</Label>
              <Input
                id="bcw-height"
                type="number"
                inputMode="decimal"
                value={height}
                placeholder="1.5"
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bcw-manning">{t("field.manning")}</Label>
              <Input
                id="bcw-manning"
                type="number"
                inputMode="decimal"
                value={manning}
                placeholder="0.013"
                onChange={(e) => { setManning(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bcw-cd">{t("field.cd")}</Label>
              <Input
                id="bcw-cd"
                type="number"
                inputMode="decimal"
                value={cd}
                placeholder="0.85"
                onChange={(e) => { setCd(e.target.value); setTouched(true); }}
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

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-3xl font-bold text-zinc-900">
                Q = {fmt(result.discharge)} <span className="text-xl font-normal">{t("result.unit.discharge")}</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.frictionHeadLoss")}: </span>
                  <span className="font-semibold">{fmt(result.frictionHeadLoss, 4)} {t("result.unit.depth")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.effectiveHead")}: </span>
                  <span className="font-semibold">{fmt(result.effectiveHead)} {t("result.unit.depth")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.criticalDepth")}: </span>
                  <span className="font-semibold">{fmt(result.criticalDepth)} {t("result.unit.depth")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.criticalVelocity")}: </span>
                  <span className="font-semibold">{fmt(result.criticalVelocity)} {t("result.unit.velocity")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.froudeNumber")}: </span>
                  <span className="font-semibold">{result.froudeNumber.toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.totalHead")}: </span>
                  <span className="font-semibold">{fmt(result.totalHead)} {t("result.unit.depth")}</span>
                </div>
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
