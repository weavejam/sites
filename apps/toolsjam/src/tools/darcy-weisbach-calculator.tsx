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

function frictionFactor(re: number, epsilon: number, diameter: number): number {
  if (re < 2300) return 64 / re;
  const relRoughness = epsilon / diameter;
  // Swamee-Jain explicit approximation to Colebrook-White
  const arg = relRoughness / 3.7 + 5.74 / Math.pow(re, 0.9);
  return 0.25 / Math.pow(Math.log10(arg), 2);
}

function formatResult(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 1e-3 || Math.abs(n) >= 1e6) {
    return n.toExponential(3);
  }
  return n.toFixed(decimals);
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

export default function DarcyWeisbachCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.darcy-weisbach-calculator");

  const [diameter, setDiameter] = React.useState("");
  const [length, setLength] = React.useState("");
  const [velocity, setVelocity] = React.useState("");
  const [viscosity, setViscosity] = React.useState("");
  const [roughness, setRoughness] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const dNum = parseFloat(diameter);
  const lNum = parseFloat(length);
  const vNum = parseFloat(velocity);
  const nuNum = parseFloat(viscosity);
  const epsNum = parseFloat(roughness) / 1000; // mm → m

  const allValid =
    diameter !== "" && Number.isFinite(dNum) && dNum > 0 &&
    length !== "" && Number.isFinite(lNum) && lNum > 0 &&
    velocity !== "" && Number.isFinite(vNum) && vNum > 0 &&
    viscosity !== "" && Number.isFinite(nuNum) && nuNum > 0 &&
    roughness !== "" && Number.isFinite(epsNum) && epsNum >= 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const re = (vNum * dNum) / nuNum;
    const f = frictionFactor(re, epsNum, dNum);
    const hf = f * (lNum / dNum) * (vNum * vNum) / (2 * G);
    let regime: "laminar" | "turbulent" | "transitional";
    if (re < 2300) regime = "laminar";
    else if (re > 4000) regime = "turbulent";
    else regime = "transitional";
    return { re, f, hf, regime };
  }, [allValid, dNum, lNum, vNum, nuNum, epsNum]);

  const examplesItems: ExampleRow[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleRow[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  function handleCalculate() {
    setTouched(true);
  }

  function handleReset() {
    setDiameter("");
    setLength("");
    setVelocity("");
    setViscosity("");
    setRoughness("");
    setTouched(false);
  }

  const showError = touched && !allValid;

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
              <Label htmlFor="dw-diameter">{t("field.pipeDiameter")}</Label>
              <Input
                id="dw-diameter"
                type="number"
                inputMode="decimal"
                value={diameter}
                placeholder={t("placeholder.pipeDiameter")}
                min="0"
                step="any"
                onChange={(e) => { setDiameter(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dw-length">{t("field.pipeLength")}</Label>
              <Input
                id="dw-length"
                type="number"
                inputMode="decimal"
                value={length}
                placeholder={t("placeholder.pipeLength")}
                min="0"
                step="any"
                onChange={(e) => { setLength(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dw-velocity">{t("field.velocity")}</Label>
              <Input
                id="dw-velocity"
                type="number"
                inputMode="decimal"
                value={velocity}
                placeholder={t("placeholder.velocity")}
                min="0"
                step="any"
                onChange={(e) => { setVelocity(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dw-viscosity">{t("field.kinematicViscosity")}</Label>
              <Input
                id="dw-viscosity"
                type="number"
                inputMode="decimal"
                value={viscosity}
                placeholder={t("placeholder.kinematicViscosity")}
                min="0"
                step="any"
                onChange={(e) => { setViscosity(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dw-roughness">{t("field.roughness")}</Label>
              <Input
                id="dw-roughness"
                type="number"
                inputMode="decimal"
                value={roughness}
                placeholder={t("placeholder.roughness")}
                min="0"
                step="any"
                onChange={(e) => { setRoughness(e.target.value); setTouched(false); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleCalculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.headLoss")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatResult(result.hf)} {t("result.unit.headLoss")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.reynolds")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {Math.round(result.re).toLocaleString("en-US")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.frictionFactor")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatResult(result.f, 5)}
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.flowRegime")}: <span className="font-medium">{t(`result.${result.regime}` as never)}</span>
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
