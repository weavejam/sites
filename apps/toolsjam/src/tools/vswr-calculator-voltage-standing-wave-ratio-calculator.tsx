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

type Mode = "power" | "impedance";

interface ResultState {
  gamma: number;
  vswr: number;
  returnLoss: number;
  mismatchLoss: number;
  efficiency: number;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function VswrCalculatorVoltageStandingWaveRatioCalculator(
  _props: { locale: Locale },
) {
  const t = useTranslations(
    "tool.vswr-calculator-voltage-standing-wave-ratio-calculator",
  );
  const [mode, setMode] = React.useState<Mode>("power");
  const [forwardPower, setForwardPower] = React.useState("");
  const [reflectedPower, setReflectedPower] = React.useState("");
  const [loadImpedance, setLoadImpedance] = React.useState("");
  const [charImpedance, setCharImpedance] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<ResultState | null>(null);

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

  function clearComputedState() {
    setError(null);
    setResult(null);
  }

  function reset() {
    setMode("power");
    setForwardPower("");
    setReflectedPower("");
    setLoadImpedance("");
    setCharImpedance("");
    clearComputedState();
  }

  function calculate() {
    let gamma: number;

    if (mode === "power") {
      if (forwardPower.trim() === "" || reflectedPower.trim() === "") {
        setError(t("error.invalid"));
        setResult(null);
        return;
      }

      const pf = Number(forwardPower);
      const pr = Number(reflectedPower);

      if (!Number.isFinite(pf) || !Number.isFinite(pr) || pr < 0) {
        setError(t("error.invalid"));
        setResult(null);
        return;
      }
      if (pf === 0) {
        setError(t("error.forwardZero"));
        setResult(null);
        return;
      }
      if (pf < 0) {
        setError(t("error.invalid"));
        setResult(null);
        return;
      }
      if (pr > pf) {
        setError(t("error.reflectedExceedsForward"));
        setResult(null);
        return;
      }
      gamma = Math.sqrt(pr / pf);
    } else {
      if (loadImpedance.trim() === "" || charImpedance.trim() === "") {
        setError(t("error.invalid"));
        setResult(null);
        return;
      }

      const zl = Number(loadImpedance);
      const z0 = Number(charImpedance);

      if (!Number.isFinite(zl) || !Number.isFinite(z0) || zl <= 0 || z0 <= 0) {
        setError(t("error.invalid"));
        setResult(null);
        return;
      }
      if (zl + z0 === 0) {
        setError(t("error.impedanceShort"));
        setResult(null);
        return;
      }
      gamma = Math.abs((zl - z0) / (zl + z0));
    }

    const vswr = gamma >= 1 ? Number.POSITIVE_INFINITY : (1 + gamma) / (1 - gamma);
    const returnLoss =
      gamma === 0 ? Number.POSITIVE_INFINITY : -20 * Math.log10(gamma);
    const mismatchLoss =
      gamma >= 1 ? Number.POSITIVE_INFINITY : -10 * Math.log10(1 - gamma ** 2);
    const efficiency = (1 - gamma ** 2) * 100;

    setError(null);
    setResult({ gamma, vswr, returnLoss, mismatchLoss, efficiency });
  }

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
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={mode === "power" ? "default" : "outline"}
                onClick={() => {
                  setMode("power");
                  clearComputedState();
                }}
              >
                {t("type.powerMode")}
              </Button>
              <Button
                type="button"
                variant={mode === "impedance" ? "default" : "outline"}
                onClick={() => {
                  setMode("impedance");
                  clearComputedState();
                }}
              >
                {t("type.impedanceMode")}
              </Button>
            </div>
          </div>

          {mode === "power" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="forward-power">{t("field.forwardPower")}</Label>
                <Input
                  id="forward-power"
                  type="number"
                  inputMode="decimal"
                  value={forwardPower}
                  onChange={(e) => {
                    setForwardPower(e.target.value);
                    clearComputedState();
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reflected-power">
                  {t("field.reflectedPower")}
                </Label>
                <Input
                  id="reflected-power"
                  type="number"
                  inputMode="decimal"
                  value={reflectedPower}
                  onChange={(e) => {
                    setReflectedPower(e.target.value);
                    clearComputedState();
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="load-impedance">{t("field.loadImpedance")}</Label>
                <Input
                  id="load-impedance"
                  type="number"
                  inputMode="decimal"
                  value={loadImpedance}
                  onChange={(e) => {
                    setLoadImpedance(e.target.value);
                    clearComputedState();
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="char-impedance">
                  {t("field.charImpedance")}
                </Label>
                <Input
                  id="char-impedance"
                  type="number"
                  inputMode="decimal"
                  value={charImpedance}
                  onChange={(e) => {
                    setCharImpedance(e.target.value);
                    clearComputedState();
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-3 space-y-2 text-zinc-900">
                <div className="text-base font-medium">
                  {t("result.gamma", { value: formatNumber(result.gamma) })}
                </div>
                <div className="text-xl font-semibold">
                  {t("result.vswr", {
                    value:
                      result.vswr === Number.POSITIVE_INFINITY
                        ? "∞"
                        : formatNumber(result.vswr),
                  })}
                </div>
                <div className="text-base font-medium">
                  {t("result.returnLoss", {
                    value:
                      result.returnLoss === Number.POSITIVE_INFINITY
                        ? "∞"
                        : formatNumber(result.returnLoss),
                  })}
                </div>
                <div className="text-base font-medium">
                  {t("result.mismatchLoss", {
                    value:
                      result.mismatchLoss === Number.POSITIVE_INFINITY
                        ? "∞"
                        : formatNumber(result.mismatchLoss),
                  })}
                </div>
                <div className="text-base font-medium">
                  {t("result.efficiency", {
                    value: formatNumber(result.efficiency),
                  })}
                </div>
              </div>
              <div className="mt-3 text-xs text-zinc-500">{t("formula")}</div>
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
