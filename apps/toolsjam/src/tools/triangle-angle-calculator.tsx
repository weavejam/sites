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

type Method = "fromTwoAngles" | "fromThreeSides";

const METHODS: Method[] = ["fromTwoAngles", "fromThreeSides"];

function formatAngle(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e6) / 1e6).toLocaleString("en-US", {
    maximumFractionDigits: 6,
  });
}

function pos(v: number) {
  return Number.isFinite(v) && v > 0;
}

export default function TriangleAngleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.triangle-angle-calculator");
  const [method, setMethod] = React.useState<Method>("fromTwoAngles");
  const [angleA, setAngleA] = React.useState("");
  const [angleB, setAngleB] = React.useState("");
  const [sideA, setSideA] = React.useState("");
  const [sideB, setSideB] = React.useState("");
  const [sideC, setSideC] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setAngleA(""); setAngleB("");
    setSideA(""); setSideB(""); setSideC("");
    setTouched(false);
  }

  function switchMethod(m: Method) {
    setMethod(m);
    setTouched(false);
  }

  const aAng = parseFloat(angleA);
  const bAng = parseFloat(angleB);
  const aSide = parseFloat(sideA);
  const bSide = parseFloat(sideB);
  const cSide = parseFloat(sideC);

  interface Angles { A: number; B: number; C: number }

  const result = React.useMemo<Angles | null>(() => {
    if (!touched) return null;
    if (method === "fromTwoAngles") {
      if (!pos(aAng) || !pos(bAng)) return null;
      const C = 180 - aAng - bAng;
      if (C <= 0) return null;
      return { A: aAng, B: bAng, C };
    } else {
      if (!pos(aSide) || !pos(bSide) || !pos(cSide)) return null;
      const cosA = (bSide * bSide + cSide * cSide - aSide * aSide) / (2 * bSide * cSide);
      const cosB = (aSide * aSide + cSide * cSide - bSide * bSide) / (2 * aSide * cSide);
      if (cosA < -1 || cosA > 1 || cosB < -1 || cosB > 1) return null;
      const A = (Math.acos(cosA) * 180) / Math.PI;
      const B = (Math.acos(cosB) * 180) / Math.PI;
      const C = 180 - A - B;
      if (A <= 0 || B <= 0 || C <= 0) return null;
      return { A, B, C };
    }
  }, [touched, method, aAng, bAng, aSide, bSide, cSide]);

  const showInputError = React.useMemo(() => {
    if (!touched) return false;
    if (method === "fromTwoAngles") return !pos(aAng) || !pos(bAng);
    return !pos(aSide) || !pos(bSide) || !pos(cSide);
  }, [touched, method, aAng, bAng, aSide, bSide, cSide]);

  const showAngleError =
    touched && !showInputError && method === "fromTwoAngles" && pos(aAng) && pos(bAng) && aAng + bAng >= 180;

  const showTriangleError =
    touched && !showInputError && method === "fromThreeSides" && result === null;

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
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
          <div className="space-y-2">
            <Label>{t("field.method")}</Label>
            <div className="flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={method === m ? "default" : "outline"}
                  onClick={() => switchMethod(m)}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${method}_desc` as never)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {method === "fromTwoAngles" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="tac-a">{t("field.angleA")}</Label>
                  <Input
                    id="tac-a"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="179"
                    placeholder={t("placeholder.angle")}
                    value={angleA}
                    onChange={(e) => { setAngleA(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tac-b">{t("field.angleB")}</Label>
                  <Input
                    id="tac-b"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="179"
                    placeholder={t("placeholder.angle")}
                    value={angleB}
                    onChange={(e) => { setAngleB(e.target.value); setTouched(true); }}
                  />
                </div>
              </>
            )}
            {method === "fromThreeSides" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="tac-sa">{t("field.sideA")}</Label>
                  <Input
                    id="tac-sa"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    placeholder={t("placeholder.side")}
                    value={sideA}
                    onChange={(e) => { setSideA(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tac-sb">{t("field.sideB")}</Label>
                  <Input
                    id="tac-sb"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    placeholder={t("placeholder.side")}
                    value={sideB}
                    onChange={(e) => { setSideB(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tac-sc">{t("field.sideC")}</Label>
                  <Input
                    id="tac-sc"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    placeholder={t("placeholder.side")}
                    value={sideC}
                    onChange={(e) => { setSideC(e.target.value); setTouched(true); }}
                  />
                </div>
              </>
            )}
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
          {showAngleError && (
            <p className="text-sm text-red-600">{t("error.anglesExceed")}</p>
          )}
          {showTriangleError && (
            <p className="text-sm text-red-600">{t("error.invalidTriangle")}</p>
          )}

          {result !== null && !showInputError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-xl font-semibold text-zinc-900">
                {t("result.angleA", { a: formatAngle(result.A) })}
              </div>
              <div className="text-xl font-semibold text-zinc-900">
                {t("result.angleB", { b: formatAngle(result.B) })}
              </div>
              <div className="text-xl font-semibold text-zinc-900">
                {t("result.angleC", { c: formatAngle(result.C) })}
              </div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
