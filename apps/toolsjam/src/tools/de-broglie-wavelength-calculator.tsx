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

const H_PLANCK = 6.62607015e-34; // J·s

type InputMode = "velocity" | "energy" | "momentum";

function formatSci(n: number, sig = 4): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  return n.toExponential(sig);
}

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  if (n < 1e-3 || n >= 1e6) return n.toExponential(4);
  return n.toFixed(decimals);
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

export default function DeBroglieWavelengthCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.de-broglie-wavelength-calculator");

  const [inputMode, setInputMode] = React.useState<InputMode>("velocity");
  const [mass, setMass] = React.useState("");
  const [velocity, setVelocity] = React.useState("");
  const [kineticEnergy, setKineticEnergy] = React.useState("");
  const [momentum, setMomentum] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const mNum = parseFloat(mass);
  const vNum = parseFloat(velocity);
  const eNum = parseFloat(kineticEnergy);
  const pNum = parseFloat(momentum);

  const result = React.useMemo(() => {
    if (!touched) return null;
    let p: number;
    if (inputMode === "velocity") {
      if (!Number.isFinite(mNum) || mNum <= 0 || !Number.isFinite(vNum) || vNum <= 0) return null;
      p = mNum * vNum;
    } else if (inputMode === "energy") {
      if (!Number.isFinite(mNum) || mNum <= 0 || !Number.isFinite(eNum) || eNum <= 0) return null;
      p = Math.sqrt(2 * mNum * eNum);
    } else {
      if (!Number.isFinite(pNum) || pNum <= 0) return null;
      p = pNum;
    }
    const lambda = H_PLANCK / p;
    const lambdaNm = lambda * 1e9;
    const lambdaPm = lambda * 1e12;
    // frequency: E = h*f => f = E/h (if energy mode), else f = v/lambda (if velocity mode)
    let freq: number | null = null;
    if (inputMode === "velocity" && Number.isFinite(vNum) && vNum > 0) {
      freq = vNum / lambda;
    } else if (inputMode === "energy" && Number.isFinite(eNum) && eNum > 0) {
      freq = eNum / H_PLANCK;
    }
    return { lambda, lambdaNm, lambdaPm, p, freq };
  }, [touched, inputMode, mNum, vNum, eNum, pNum]);

  const showError = touched && result === null;

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

  function handleReset() {
    setMass(""); setVelocity(""); setKineticEnergy(""); setMomentum("");
    setTouched(false);
  }

  const INPUT_MODES: InputMode[] = ["velocity", "energy", "momentum"];

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
            <Label>{t("field.inputMode")}</Label>
            <div className="flex flex-wrap gap-2">
              {INPUT_MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={inputMode === m ? "default" : "outline"}
                  onClick={() => { setInputMode(m); setTouched(false); }}
                >
                  {t(`inputMode.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {inputMode !== "momentum" && (
              <div className="space-y-2">
                <Label htmlFor="db-mass">{t("field.mass")}</Label>
                <Input
                  id="db-mass"
                  type="number"
                  inputMode="decimal"
                  value={mass}
                  placeholder={t("placeholder.mass")}
                  min="0"
                  step="any"
                  onChange={(e) => { setMass(e.target.value); setTouched(false); }}
                />
              </div>
            )}
            {inputMode === "velocity" && (
              <div className="space-y-2">
                <Label htmlFor="db-velocity">{t("field.velocity")}</Label>
                <Input
                  id="db-velocity"
                  type="number"
                  inputMode="decimal"
                  value={velocity}
                  placeholder={t("placeholder.velocity")}
                  min="0"
                  step="any"
                  onChange={(e) => { setVelocity(e.target.value); setTouched(false); }}
                />
              </div>
            )}
            {inputMode === "energy" && (
              <div className="space-y-2">
                <Label htmlFor="db-energy">{t("field.kineticEnergy")}</Label>
                <Input
                  id="db-energy"
                  type="number"
                  inputMode="decimal"
                  value={kineticEnergy}
                  placeholder={t("placeholder.kineticEnergy")}
                  min="0"
                  step="any"
                  onChange={(e) => { setKineticEnergy(e.target.value); setTouched(false); }}
                />
              </div>
            )}
            {inputMode === "momentum" && (
              <div className="space-y-2">
                <Label htmlFor="db-momentum">{t("field.momentum")}</Label>
                <Input
                  id="db-momentum"
                  type="number"
                  inputMode="decimal"
                  value={momentum}
                  placeholder={t("placeholder.momentum")}
                  min="0"
                  step="any"
                  onChange={(e) => { setMomentum(e.target.value); setTouched(false); }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.wavelengthM")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.lambda)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.wavelengthNm")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.lambdaNm)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.wavelengthPm")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.lambdaPm)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.momentum")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatSci(result.p)}</div>
                </div>
                {result.freq !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.frequency")}</div>
                    <div className="text-xl font-semibold text-zinc-900">{formatSci(result.freq)}</div>
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
