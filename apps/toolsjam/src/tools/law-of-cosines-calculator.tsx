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

type CalcMode = "findSide" | "findAngle";
const MODES: CalcMode[] = ["findSide", "findAngle"];

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals) + "";
}

export default function LawOfCosinesCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.law-of-cosines-calculator");

  const [mode, setMode] = React.useState<CalcMode | "">("");
  const [sideA, setSideA] = React.useState("");
  const [sideB, setSideB] = React.useState("");
  const [sideC, setSideC] = React.useState("");
  const [angleC, setAngleC] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const an = parseFloat(sideA);
  const bn = parseFloat(sideB);
  const cn = parseFloat(sideC);
  const cn_angle = parseFloat(angleC);

  const { valid, errorKey } = React.useMemo(() => {
    if (!mode) return { valid: false, errorKey: "error.selectMode" };
    if (mode === "findSide") {
      if (
        !sideA ||
        !sideB ||
        !angleC ||
        !Number.isFinite(an) ||
        !Number.isFinite(bn) ||
        !Number.isFinite(cn_angle) ||
        an <= 0 ||
        bn <= 0
      )
        return { valid: false, errorKey: "error.invalid" };
      if (cn_angle <= 0 || cn_angle >= 180)
        return { valid: false, errorKey: "error.invalidAngle" };
    } else {
      if (
        !sideA ||
        !sideB ||
        !sideC ||
        !Number.isFinite(an) ||
        !Number.isFinite(bn) ||
        !Number.isFinite(cn) ||
        an <= 0 ||
        bn <= 0 ||
        cn <= 0
      )
        return { valid: false, errorKey: "error.invalid" };
      const cosC = (an * an + bn * bn - cn * cn) / (2 * an * bn);
      if (cosC <= -1 || cosC >= 1)
        return { valid: false, errorKey: "error.invalidTriangle" };
    }
    return { valid: true, errorKey: "" };
  }, [mode, sideA, sideB, sideC, angleC, an, bn, cn, cn_angle]);

  const result = React.useMemo<number | null>(() => {
    if (!valid || !mode) return null;
    if (mode === "findSide") {
      const angleRad = (cn_angle * Math.PI) / 180;
      const c2 = an * an + bn * bn - 2 * an * bn * Math.cos(angleRad);
      return Math.sqrt(c2);
    } else {
      const cosC = (an * an + bn * bn - cn * cn) / (2 * an * bn);
      return (Math.acos(cosC) * 180) / Math.PI;
    }
  }, [valid, mode, an, bn, cn, cn_angle]);

  function reset() {
    setMode("");
    setSideA("");
    setSideB("");
    setSideC("");
    setAngleC("");
    setTouched(false);
  }

  function loadExample(
    m: CalcMode,
    a: string,
    b: string,
    c: string,
    aC: string
  ) {
    setMode(m);
    setSideA(a);
    setSideB(b);
    setSideC(c);
    setAngleC(aC);
    setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as
      | { q: string; a: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
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
          <div className="space-y-2">
            <Label>{t("field.mode")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => {
                    setMode(m);
                    setTouched(false);
                  }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {mode === "findSide" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="loc-a">{t("field.sideA")}</Label>
                <Input
                  id="loc-a"
                  type="number"
                  inputMode="decimal"
                  value={sideA}
                  placeholder={t("placeholder.side")}
                  onChange={(e) => {
                    setSideA(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loc-b">{t("field.sideB")}</Label>
                <Input
                  id="loc-b"
                  type="number"
                  inputMode="decimal"
                  value={sideB}
                  placeholder={t("placeholder.side")}
                  onChange={(e) => {
                    setSideB(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loc-C">{t("field.angleC")}</Label>
                <Input
                  id="loc-C"
                  type="number"
                  inputMode="decimal"
                  value={angleC}
                  placeholder={t("placeholder.angle")}
                  onChange={(e) => {
                    setAngleC(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

          {mode === "findAngle" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="loc-a2">{t("field.sideA")}</Label>
                <Input
                  id="loc-a2"
                  type="number"
                  inputMode="decimal"
                  value={sideA}
                  placeholder={t("placeholder.side")}
                  onChange={(e) => {
                    setSideA(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loc-b2">{t("field.sideB")}</Label>
                <Input
                  id="loc-b2"
                  type="number"
                  inputMode="decimal"
                  value={sideB}
                  placeholder={t("placeholder.side")}
                  onChange={(e) => {
                    setSideB(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loc-c2">{t("field.sideC")}</Label>
                <Input
                  id="loc-c2"
                  type="number"
                  inputMode="decimal"
                  value={sideC}
                  placeholder={t("placeholder.side")}
                  onChange={(e) => {
                    setSideC(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">
              {t(errorKey as never)}
            </p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {mode === "findSide"
                  ? t("result.side", { result: formatNum(result) })
                  : t("result.angle", { result: formatNum(result) })}
              </div>
              <div className="text-xs text-zinc-400">
                {mode === "findSide"
                  ? t("result.formulaSAS")
                  : t("result.formulaSSS")}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("findSide", "5", "7", "", "45")}
          >
            {t("examples.loadSAS")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("findAngle", "8", "6", "10", "")}
          >
            {t("examples.loadSSS")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("findSide", "10", "12", "", "120")}
          >
            {t("examples.loadObtuse")}
          </Button>
        </div>
      </section>

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
