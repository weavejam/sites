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

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export default function BuoyancyExperimentCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.buoyancy-experiment-calculator");
  const [mass, setMass] = React.useState<string>("");
  const [volume, setVolume] = React.useState<string>("");
  const [fluidDensity, setFluidDensity] = React.useState<string>("1000");
  const [gravity, setGravity] = React.useState<string>("9.81");
  const [touched, setTouched] = React.useState(false);

  const m = parseFloat(mass);
  const V = parseFloat(volume);
  const rho = parseFloat(fluidDensity);
  const g = parseFloat(gravity);

  const allValid =
    mass !== "" && Number.isFinite(m) && m > 0 &&
    volume !== "" && Number.isFinite(V) && V > 0 &&
    fluidDensity !== "" && Number.isFinite(rho) && rho > 0 &&
    gravity !== "" && Number.isFinite(g) && g > 0;

  const results = React.useMemo(() => {
    if (!allValid) return null;
    const buoyantForce = rho * V * g;
    const objectWeight = m * g;
    const netForce = buoyantForce - objectWeight;
    const objectDensity = m / V;
    const densityRatio = objectDensity / rho;
    return { buoyantForce, objectWeight, netForce, objectDensity, densityRatio };
  }, [m, V, rho, g, allValid]);

  function behaviourLabel(): string {
    if (!results) return "";
    const { densityRatio } = results;
    if (Math.abs(densityRatio - 1) < 0.0001) return t("result.neutral");
    return densityRatio < 1 ? t("result.floats") : t("result.sinks");
  }

  function reset() {
    setMass("");
    setVolume("");
    setFluidDensity("1000");
    setGravity("9.81");
    setTouched(false);
  }

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

  interface ExampleItem { input: string; output: string; note?: string }
  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
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
              <Label htmlFor="bec2-mass">{t("field.mass")}</Label>
              <Input
                id="bec2-mass"
                type="number"
                inputMode="decimal"
                value={mass}
                placeholder={t("placeholder.mass")}
                onChange={(e) => { setMass(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bec2-volume">{t("field.volume")}</Label>
              <Input
                id="bec2-volume"
                type="number"
                inputMode="decimal"
                value={volume}
                placeholder={t("placeholder.volume")}
                onChange={(e) => { setVolume(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bec2-fluid">{t("field.fluidDensity")}</Label>
              <Input
                id="bec2-fluid"
                type="number"
                inputMode="decimal"
                value={fluidDensity}
                placeholder={t("placeholder.fluidDensity")}
                onChange={(e) => { setFluidDensity(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bec2-gravity">{t("field.gravity")}</Label>
              <Input
                id="bec2-gravity"
                type="number"
                inputMode="decimal"
                value={gravity}
                placeholder={t("placeholder.gravity")}
                onChange={(e) => { setGravity(e.target.value); setTouched(true); }}
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

          {results !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.buoyantForce")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(results.buoyantForce)} <span className="text-sm font-normal">{t("result.buoyantForceUnit")}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.objectWeight")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(results.objectWeight)} <span className="text-sm font-normal">{t("result.objectWeightUnit")}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.netForce")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(results.netForce)} <span className="text-sm font-normal">{t("result.netForceUnit")}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.objectDensity")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(results.objectDensity, 1)} <span className="text-sm font-normal">{t("result.objectDensityUnit")}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.densityRatio")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(results.densityRatio, 4)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.behaviour")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {behaviourLabel()}
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
