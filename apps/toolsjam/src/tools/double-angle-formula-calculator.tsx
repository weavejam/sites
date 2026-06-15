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

type Unit = "degrees" | "radians";
type FormulaType = "allFormulas" | "sineOnly" | "cosineOnly" | "tangentOnly";

const FORMULA_TYPES: FormulaType[] = ["allFormulas", "sineOnly", "cosineOnly", "tangentOnly"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e10) / 1e10;
  return r.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function DoubleAngleFormulaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.double-angle-formula-calculator");
  const [angleStr, setAngleStr] = React.useState("");
  const [unit, setUnit] = React.useState<Unit>("degrees");
  const [formulaType, setFormulaType] = React.useState<FormulaType>("allFormulas");
  const [touched, setTouched] = React.useState(false);

  const angleNum = parseFloat(angleStr);
  const angleValid = angleStr !== "" && Number.isFinite(angleNum);

  const result = React.useMemo(() => {
    if (!angleValid) return null;
    const rad = unit === "degrees" ? (angleNum * Math.PI) / 180 : angleNum;
    const sinX = Math.sin(rad);
    const cosX = Math.cos(rad);
    const sin2x = 2 * sinX * cosX;
    const cos2x = cosX ** 2 - sinX ** 2;
    const denom = 1 - Math.tan(rad) ** 2;
    const tan2x = Math.abs(denom) < 1e-10 ? null : (2 * Math.tan(rad)) / denom;
    const doubleAngle = unit === "degrees"
      ? `${fmt(angleNum * 2)}${t("result.degUnit")}`
      : `${fmt(angleNum * 2)} ${t("result.radUnit")}`;
    const originalAngle = unit === "degrees"
      ? `${fmt(angleNum)}${t("result.degUnit")}`
      : `${fmt(angleNum)} ${t("result.radUnit")}`;
    return { sin2x, cos2x, tan2x, originalAngle, doubleAngle };
  }, [angleValid, angleNum, unit]);

  function reset() {
    setAngleStr("");
    setTouched(false);
  }

  const showSin = formulaType === "allFormulas" || formulaType === "sineOnly";
  const showCos = formulaType === "allFormulas" || formulaType === "cosineOnly";
  const showTan = formulaType === "allFormulas" || formulaType === "tangentOnly";

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
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
              <Label htmlFor="daf-angle">{t("field.angle")}</Label>
              <Input
                id="daf-angle"
                type="number"
                inputMode="decimal"
                step="any"
                value={angleStr}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setAngleStr(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.unit")}</Label>
              <div className="flex gap-2">
                {(["degrees", "radians"] as Unit[]).map((u) => (
                  <Button
                    key={u}
                    type="button"
                    variant={unit === u ? "default" : "outline"}
                    onClick={() => setUnit(u)}
                  >
                    {t(`field.${u}` as never)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.formulaType")}</Label>
            <div className="flex flex-wrap gap-2">
              {FORMULA_TYPES.map((ft) => (
                <Button
                  key={ft}
                  type="button"
                  variant={formulaType === ft ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormulaType(ft)}
                >
                  {t(`field.${ft}` as never)}
                </Button>
              ))}
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

          {touched && angleStr !== "" && !angleValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && touched && angleValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.originalAngle")}</div>
                  <div className="text-lg font-semibold text-zinc-900">{result.originalAngle}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.doubleAngle")}</div>
                  <div className="text-lg font-semibold text-zinc-900">{result.doubleAngle}</div>
                </div>
                {showSin && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.sin2x")}</div>
                    <div className="text-2xl font-bold text-zinc-900">{fmt(result.sin2x)}</div>
                  </div>
                )}
                {showCos && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.cos2x")}</div>
                    <div className="text-2xl font-bold text-zinc-900">{fmt(result.cos2x)}</div>
                  </div>
                )}
                {showTan && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.tan2x")}</div>
                    <div className="text-2xl font-bold text-zinc-900">
                      {result.tan2x === null ? t("result.undefined") : fmt(result.tan2x)}
                    </div>
                    {result.tan2x === null && (
                      <p className="text-xs text-amber-600 mt-1">{t("error.tanUndefined")}</p>
                    )}
                  </div>
                )}
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
