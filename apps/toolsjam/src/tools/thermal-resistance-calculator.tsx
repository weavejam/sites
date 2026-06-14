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

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 1e-3 && n !== 0) return n.toExponential(4);
  return (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toLocaleString("en-US", {
    maximumFractionDigits: d,
  });
}

export default function ThermalResistanceCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.thermal-resistance-calculator");

  const [thickness, setThickness] = React.useState("");
  const [conductivity, setConductivity] = React.useState("");
  const [areaVal, setAreaVal] = React.useState("");
  const [tempDiff, setTempDiff] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const L = parseFloat(thickness);
  const k = parseFloat(conductivity);
  const A = parseFloat(areaVal);
  const dT = parseFloat(tempDiff);

  const valid =
    thickness !== "" && Number.isFinite(L) && L > 0 &&
    conductivity !== "" && Number.isFinite(k) && k > 0 &&
    areaVal !== "" && Number.isFinite(A) && A > 0 &&
    tempDiff !== "" && Number.isFinite(dT);

  const result = React.useMemo(() => {
    if (!valid) return null;
    // R = L / (k * A)
    const R = L / (k * A);
    // Q = ΔT / R
    const Q = dT / R;
    // Temperature gradient = ΔT / L
    const gradient = dT / L;
    // R-value (per unit area) = L / k
    const rValue = L / k;
    return { R, Q, gradient, rValue };
  }, [valid, L, k, A, dT]);

  function loadExample(lv: string, kv: string, av: string, dtv: string) {
    setThickness(lv);
    setConductivity(kv);
    setAreaVal(av);
    setTempDiff(dtv);
    setTouched(true);
  }

  function reset() {
    setThickness("");
    setConductivity("");
    setAreaVal("");
    setTempDiff("");
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

  const showError = touched && !valid;

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
              <Label htmlFor="trc-thickness">{t("field.thickness")}</Label>
              <Input
                id="trc-thickness"
                type="number"
                inputMode="decimal"
                value={thickness}
                placeholder={t("placeholder.thickness")}
                onChange={(e) => { setThickness(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trc-conductivity">{t("field.conductivity")}</Label>
              <Input
                id="trc-conductivity"
                type="number"
                inputMode="decimal"
                value={conductivity}
                placeholder={t("placeholder.conductivity")}
                onChange={(e) => { setConductivity(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trc-area">{t("field.area")}</Label>
              <Input
                id="trc-area"
                type="number"
                inputMode="decimal"
                value={areaVal}
                placeholder={t("placeholder.area")}
                onChange={(e) => { setAreaVal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trc-dt">{t("field.tempDiff")}</Label>
              <Input
                id="trc-dt"
                type="number"
                inputMode="decimal"
                value={tempDiff}
                placeholder={t("placeholder.tempDiff")}
                onChange={(e) => { setTempDiff(e.target.value); setTouched(true); }}
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.resistance")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.R)} K/W</div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.heatFlow")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.Q)} W</div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.gradient")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.gradient)} K/m</div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.rValue")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.rValue)} m²·K/W</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
            onClick={() => loadExample("0.15", "0.04", "10.0", "25")}
          >
            {t("examples.loadFiberglass")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.2", "1.4", "20.0", "15")}
          >
            {t("examples.loadConcrete")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.01", "50.0", "5.0", "100")}
          >
            {t("examples.loadSteel")}
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
