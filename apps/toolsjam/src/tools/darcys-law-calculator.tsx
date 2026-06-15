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

function formatSci(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  if (Math.abs(n) < 1e-3 || Math.abs(n) >= 1e6) return n.toExponential(4);
  return n.toPrecision(5);
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

export default function DarcysLawCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.darcys-law-calculator");

  const [permeability, setPermeability] = React.useState("");
  const [area, setArea] = React.useState("");
  const [pressureDiff, setPressureDiff] = React.useState("");
  const [viscosity, setViscosity] = React.useState("");
  const [length, setLength] = React.useState("");
  const [porosity, setPorosity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const kNum = parseFloat(permeability);
  const aNum = parseFloat(area);
  const dpNum = parseFloat(pressureDiff);
  const muNum = parseFloat(viscosity);
  const lNum = parseFloat(length);
  const phiNum = parseFloat(porosity);

  const allValid =
    permeability !== "" && Number.isFinite(kNum) && kNum > 0 &&
    area !== "" && Number.isFinite(aNum) && aNum > 0 &&
    pressureDiff !== "" && Number.isFinite(dpNum) && dpNum > 0 &&
    viscosity !== "" && Number.isFinite(muNum) && muNum > 0 &&
    length !== "" && Number.isFinite(lNum) && lNum > 0 &&
    porosity !== "" && Number.isFinite(phiNum) && phiNum > 0 && phiNum < 1;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const Q = (kNum * aNum * dpNum) / (muNum * lNum);
    const darcyVelocity = Q / aNum;
    const seepageVelocity = darcyVelocity / phiNum;
    return { Q, darcyVelocity, seepageVelocity };
  }, [allValid, kNum, aNum, dpNum, muNum, lNum, phiNum]);

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
    setPermeability(""); setArea(""); setPressureDiff("");
    setViscosity(""); setLength(""); setPorosity("");
    setTouched(false);
  }

  const showError = touched && !allValid;
  const showPorosityError = touched && porosity !== "" && Number.isFinite(phiNum) && (phiNum <= 0 || phiNum >= 1);

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
              <Label htmlFor="dl-permeability">{t("field.permeability")}</Label>
              <Input
                id="dl-permeability"
                type="number"
                inputMode="decimal"
                value={permeability}
                placeholder={t("placeholder.permeability")}
                min="0"
                step="any"
                onChange={(e) => { setPermeability(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dl-area">{t("field.area")}</Label>
              <Input
                id="dl-area"
                type="number"
                inputMode="decimal"
                value={area}
                placeholder={t("placeholder.area")}
                min="0"
                step="any"
                onChange={(e) => { setArea(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dl-pressure">{t("field.pressureDiff")}</Label>
              <Input
                id="dl-pressure"
                type="number"
                inputMode="decimal"
                value={pressureDiff}
                placeholder={t("placeholder.pressureDiff")}
                min="0"
                step="any"
                onChange={(e) => { setPressureDiff(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dl-viscosity">{t("field.viscosity")}</Label>
              <Input
                id="dl-viscosity"
                type="number"
                inputMode="decimal"
                value={viscosity}
                placeholder={t("placeholder.viscosity")}
                min="0"
                step="any"
                onChange={(e) => { setViscosity(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dl-length">{t("field.length")}</Label>
              <Input
                id="dl-length"
                type="number"
                inputMode="decimal"
                value={length}
                placeholder={t("placeholder.length")}
                min="0"
                step="any"
                onChange={(e) => { setLength(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dl-porosity">{t("field.porosity")}</Label>
              <Input
                id="dl-porosity"
                type="number"
                inputMode="decimal"
                value={porosity}
                placeholder={t("placeholder.porosity")}
                min="0"
                max="1"
                step="any"
                onChange={(e) => { setPorosity(e.target.value); setTouched(false); }}
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

          {showPorosityError && (
            <p className="text-sm text-red-600">{t("error.invalidPorosity")}</p>
          )}
          {showError && !showPorosityError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.flowRate")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatSci(result.Q)} {t("result.unit.flowRate")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.darcyVelocity")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatSci(result.darcyVelocity)} {t("result.unit.velocity")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.seepageVelocity")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatSci(result.seepageVelocity)} {t("result.unit.velocity")}
                  </div>
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
