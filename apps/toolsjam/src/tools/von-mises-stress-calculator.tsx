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

interface ResultState {
  vonMises: number;
  factorOfSafety: number | null;
  isSafe: boolean | null;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function VonMisesStressCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.von-mises-stress-calculator");
  const [sigmaX, setSigmaX] = React.useState("");
  const [sigmaY, setSigmaY] = React.useState("");
  const [sigmaZ, setSigmaZ] = React.useState("");
  const [tauXY, setTauXY] = React.useState("");
  const [tauYZ, setTauYZ] = React.useState("");
  const [tauZX, setTauZX] = React.useState("");
  const [yieldStrength, setYieldStrength] = React.useState("");
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
    setSigmaX("");
    setSigmaY("");
    setSigmaZ("");
    setTauXY("");
    setTauYZ("");
    setTauZX("");
    setYieldStrength("");
    clearComputedState();
  }

  function calculate() {
    if (
      [sigmaX, sigmaY, sigmaZ, tauXY, tauYZ, tauZX].some(
        (value) => value.trim() === "",
      )
    ) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }

    const values = [sigmaX, sigmaY, sigmaZ, tauXY, tauYZ, tauZX].map((value) =>
      Number(value),
    );

    if (values.some((value) => !Number.isFinite(value))) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }

    const [sx, sy, sz, txy, tyz, tzx] = values;
    const vonMises = Math.sqrt(
      0.5 *
        ((sx - sy) ** 2 +
          (sy - sz) ** 2 +
          (sz - sx) ** 2 +
          6 * (txy ** 2 + tyz ** 2 + tzx ** 2)),
    );

    let factorOfSafety: number | null = null;
    let isSafe: boolean | null = null;

    if (yieldStrength.trim() !== "") {
      const yieldValue = Number(yieldStrength);
      if (!Number.isFinite(yieldValue)) {
        setError(t("error.invalid"));
        setResult(null);
        return;
      }
      factorOfSafety = yieldValue / vonMises;
      isSafe = vonMises < yieldValue;
    }

    setError(null);
    setResult({ vonMises, factorOfSafety, isSafe });
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
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                id: "sigma-x",
                label: t("field.sigmaX"),
                value: sigmaX,
                setValue: setSigmaX,
              },
              {
                id: "sigma-y",
                label: t("field.sigmaY"),
                value: sigmaY,
                setValue: setSigmaY,
              },
              {
                id: "sigma-z",
                label: t("field.sigmaZ"),
                value: sigmaZ,
                setValue: setSigmaZ,
              },
              {
                id: "tau-xy",
                label: t("field.tauXY"),
                value: tauXY,
                setValue: setTauXY,
              },
              {
                id: "tau-yz",
                label: t("field.tauYZ"),
                value: tauYZ,
                setValue: setTauYZ,
              },
              {
                id: "tau-zx",
                label: t("field.tauZX"),
                value: tauZX,
                setValue: setTauZX,
              },
              {
                id: "yield-strength",
                label: t("field.yieldStrength"),
                value: yieldStrength,
                setValue: setYieldStrength,
              },
            ].map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type="number"
                  inputMode="decimal"
                  value={field.value}
                  onChange={(e) => {
                    field.setValue(e.target.value);
                    clearComputedState();
                  }}
                />
              </div>
            ))}
          </div>

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
              <div className="mt-3 space-y-2">
                <div className="text-xl font-semibold text-zinc-900">
                  {t("result.vonMises", {
                    value: formatNumber(result.vonMises),
                  })}
                </div>
                {result.factorOfSafety !== null && (
                  <div className="text-base font-medium text-zinc-800">
                    {t("result.factorOfSafety", {
                      value: formatNumber(result.factorOfSafety),
                    })}
                  </div>
                )}
                {result.isSafe !== null && (
                  <div
                    className={`text-base font-semibold ${
                      result.isSafe ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {result.isSafe ? t("result.safe") : t("result.yielding")}
                  </div>
                )}
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
