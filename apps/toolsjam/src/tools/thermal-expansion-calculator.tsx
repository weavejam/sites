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

// Thermal expansion coefficients (1/°C)
const MATERIAL_COEFFICIENTS: Record<string, number> = {
  steel: 11.7e-6,
  aluminum: 23.1e-6,
  copper: 16.5e-6,
  glass: 9.0e-6,
  concrete: 12.0e-6,
  custom: 0,
};

type MaterialKey = keyof typeof MATERIAL_COEFFICIENTS;
type CalcType = "linear" | "area" | "volume";

function fmt(n: number, d = 6): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 1e-4 && n !== 0) {
    return n.toExponential(4);
  }
  return (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toLocaleString("en-US", {
    maximumFractionDigits: d,
  });
}

export default function ThermalExpansionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.thermal-expansion-calculator");

  const [length, setLength] = React.useState("");
  const [deltaTemp, setDeltaTemp] = React.useState("");
  const [material, setMaterial] = React.useState<MaterialKey>("steel");
  const [customCoeff, setCustomCoeff] = React.useState("");
  const [calcType, setCalcType] = React.useState<CalcType>("linear");
  const [touched, setTouched] = React.useState(false);

  const L0 = parseFloat(length);
  const dT = parseFloat(deltaTemp);
  const alpha =
    material === "custom"
      ? parseFloat(customCoeff)
      : MATERIAL_COEFFICIENTS[material];

  const valid =
    length !== "" && Number.isFinite(L0) && L0 > 0 &&
    deltaTemp !== "" && Number.isFinite(dT) &&
    Number.isFinite(alpha) && alpha > 0;

  const result = React.useMemo(() => {
    if (!valid) return null;
    let expansion = 0;
    let finalValue = 0;
    let formulaKey = "";
    if (calcType === "linear") {
      expansion = alpha * L0 * dT;
      finalValue = L0 + expansion;
      formulaKey = "ΔL = α × L₀ × ΔT";
    } else if (calcType === "area") {
      expansion = 2 * alpha * L0 * L0 * dT;
      finalValue = L0 * L0 + expansion;
      formulaKey = "ΔA = 2α × A₀ × ΔT";
    } else {
      expansion = 3 * alpha * L0 * L0 * L0 * dT;
      finalValue = L0 * L0 * L0 + expansion;
      formulaKey = "ΔV = 3α × V₀ × ΔT";
    }
    const strain = alpha * dT;
    return { expansion, finalValue, strain, formulaKey };
  }, [valid, alpha, L0, dT, calcType]);

  function loadExample(lv: string, dtv: string, mat: MaterialKey, ct: CalcType, cv = "") {
    setLength(lv);
    setDeltaTemp(dtv);
    setMaterial(mat);
    setCalcType(ct);
    setCustomCoeff(cv);
    setTouched(true);
  }

  function reset() {
    setLength("");
    setDeltaTemp("");
    setMaterial("steel");
    setCustomCoeff("");
    setCalcType("linear");
    setTouched(false);
  }

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

  const CALC_TYPES: CalcType[] = ["linear", "area", "volume"];
  const MATERIALS: MaterialKey[] = ["steel", "aluminum", "copper", "glass", "concrete", "custom"];

  const showError = touched && !valid;

  const unitLabel =
    calcType === "linear" ? "m" : calcType === "area" ? "m²" : "m³";

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
          <div className="space-y-2">
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {CALC_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => { setCalcType(ct); setTouched(false); }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.material")}</Label>
            <div className="flex flex-wrap gap-2">
              {MATERIALS.map((mat) => (
                <Button
                  key={mat}
                  type="button"
                  variant={material === mat ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setMaterial(mat); setTouched(false); }}
                >
                  {t(`material.${mat}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {material !== "custom" && (
            <p className="text-sm text-zinc-500">
              {t("field.coefficientNote", { value: (MATERIAL_COEFFICIENTS[material] * 1e6).toFixed(1) })}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tex-length">{t("field.initialLength")}</Label>
              <Input
                id="tex-length"
                type="number"
                inputMode="decimal"
                value={length}
                placeholder={t("placeholder.length")}
                onChange={(e) => { setLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tex-dt">{t("field.tempChange")}</Label>
              <Input
                id="tex-dt"
                type="number"
                inputMode="decimal"
                value={deltaTemp}
                placeholder={t("placeholder.deltaTemp")}
                onChange={(e) => { setDeltaTemp(e.target.value); setTouched(true); }}
              />
            </div>
            {material === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="tex-coeff">{t("field.customCoeff")}</Label>
                <Input
                  id="tex-coeff"
                  type="number"
                  inputMode="decimal"
                  value={customCoeff}
                  placeholder={t("placeholder.coeff")}
                  onChange={(e) => { setCustomCoeff(e.target.value); setTouched(true); }}
                />
              </div>
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.expansion")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.expansion)} {unitLabel}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.finalValue")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.finalValue)} {unitLabel}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.thermalStrain")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.strain, 6)}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{result.formulaKey}</div>
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("10", "30", "steel", "linear")}
          >
            {t("examples.loadSteelBridge")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.5", "150", "aluminum", "area")}
          >
            {t("examples.loadAluminumPlate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.1", "-200", "copper", "volume")}
          >
            {t("examples.loadCopperWire")}
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
