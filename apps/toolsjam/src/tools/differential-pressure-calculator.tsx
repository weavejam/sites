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

type ComponentType = "valve" | "filter" | "pipe" | "orifice";

const COMPONENT_TYPES: ComponentType[] = ["valve", "filter", "pipe", "orifice"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface DiffPressureResult {
  deltaP: number;
  deltaPKPa: number;
  deltaPBar: number;
  dynamicPressure: number | null;
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function calculate(
  p1: number,
  p2: number,
  density: number | null,
  velocity: number | null,
): DiffPressureResult {
  const deltaP = p1 - p2;
  const deltaPKPa = deltaP / 1000;
  const deltaPBar = deltaP / 100000;
  let dynamicPressure: number | null = null;
  if (density !== null && velocity !== null && Number.isFinite(density) && Number.isFinite(velocity)) {
    dynamicPressure = 0.5 * density * velocity * velocity;
  }
  return { deltaP, deltaPKPa, deltaPBar, dynamicPressure };
}

export default function DifferentialPressureCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.differential-pressure-calculator");

  const [upstreamPressure, setUpstreamPressure] = React.useState("");
  const [downstreamPressure, setDownstreamPressure] = React.useState("");
  const [fluidDensity, setFluidDensity] = React.useState("");
  const [flowVelocity, setFlowVelocity] = React.useState("");
  const [componentType, setComponentType] = React.useState<ComponentType>("valve");
  const [touched, setTouched] = React.useState(false);

  const p1 = upstreamPressure === "" ? NaN : parseFloat(upstreamPressure);
  const p2 = downstreamPressure === "" ? NaN : parseFloat(downstreamPressure);
  const density = fluidDensity === "" ? null : parseFloat(fluidDensity);
  const velocity = flowVelocity === "" ? null : parseFloat(flowVelocity);

  const result = React.useMemo<DiffPressureResult | null>(() => {
    if (!Number.isFinite(p1) || !Number.isFinite(p2)) return null;
    return calculate(p1, p2, density, velocity);
  }, [p1, p2, density, velocity]);

  function reset() {
    setUpstreamPressure("");
    setDownstreamPressure("");
    setFluidDensity("");
    setFlowVelocity("");
    setComponentType("valve");
    setTouched(false);
  }

  function loadExample(p1: string, p2: string, d: string, v: string, comp: ComponentType) {
    setUpstreamPressure(p1);
    setDownstreamPressure(p2);
    setFluidDensity(d);
    setFlowVelocity(v);
    setComponentType(comp);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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

  const showError = touched && (!Number.isFinite(p1) || !Number.isFinite(p2));

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
              <Label htmlFor="dp-upstream">{t("field.upstreamPressure")}</Label>
              <Input
                id="dp-upstream"
                type="number"
                inputMode="decimal"
                value={upstreamPressure}
                placeholder={t("placeholder.upstreamPressure")}
                onChange={(e) => { setUpstreamPressure(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dp-downstream">{t("field.downstreamPressure")}</Label>
              <Input
                id="dp-downstream"
                type="number"
                inputMode="decimal"
                value={downstreamPressure}
                placeholder={t("placeholder.downstreamPressure")}
                onChange={(e) => { setDownstreamPressure(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dp-density">{t("field.fluidDensity")}</Label>
              <Input
                id="dp-density"
                type="number"
                inputMode="decimal"
                value={fluidDensity}
                placeholder={t("placeholder.fluidDensity")}
                onChange={(e) => { setFluidDensity(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dp-velocity">{t("field.flowVelocity")}</Label>
              <Input
                id="dp-velocity"
                type="number"
                inputMode="decimal"
                value={flowVelocity}
                placeholder={t("placeholder.flowVelocity")}
                onChange={(e) => { setFlowVelocity(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.componentType")}</Label>
            <div className="flex flex-wrap gap-2">
              {COMPONENT_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={componentType === ct ? "default" : "outline"}
                  onClick={() => setComponentType(ct)}
                >
                  {t(`type.${ct}` as never)}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.differentialPressure")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.deltaP)} {t("result.unitPa")}
                  </div>
                  <div className="text-sm text-zinc-600">
                    {fmt(result.deltaPKPa, 6)} {t("result.unitKPa")} / {fmt(result.deltaPBar, 8)} {t("result.unitBar")}
                  </div>
                </div>
                {result.dynamicPressure !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.dynamicPressure")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt(result.dynamicPressure)} {t("result.unitPa")}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">{t("result.pressureRatio")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(p2 !== 0 ? p1 / p2 : NaN, 4)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
            onClick={() => loadExample("150000", "120000", "1000", "3.0", "valve")}
          >
            {t("examples.loadValve")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("101325", "100000", "1.225", "5.0", "filter")}
          >
            {t("examples.loadFilter")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("200000", "180000", "850", "2.0", "pipe")}
          >
            {t("examples.loadPipe")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
