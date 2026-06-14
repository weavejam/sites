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

function fmtNum(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

interface ThreePhaseResult {
  S: number;
  P: number;
  Q: number;
  pf: number;
  V: number;
  I: number;
  phiDeg: number;
  efficiency: number;
}

export default function ThreePhaseCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.three-phase-calculator");

  const [voltage, setVoltage] = React.useState("");
  const [current, setCurrent] = React.useState("");
  const [power, setPower] = React.useState("");
  const [powerFactor, setPowerFactor] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const sqrt3 = Math.sqrt(3);

  const result = React.useMemo<ThreePhaseResult | null>(() => {
    if (!touched) return null;
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const P = parseFloat(power);
    const pf = parseFloat(powerFactor);

    const hasV = Number.isFinite(V) && V > 0;
    const hasI = Number.isFinite(I) && I > 0;
    const hasP = Number.isFinite(P) && P >= 0;
    const hasPF = Number.isFinite(pf) && pf > 0 && pf <= 1;

    let resV: number, resI: number, resP: number, resPF: number;

    // Need at least 3 of the 4 inputs (V, I, P, PF) to solve
    if (hasV && hasI && hasPF) {
      resV = V;
      resI = I;
      resPF = pf;
      const S = sqrt3 * V * I;
      resP = S * pf;
    } else if (hasV && hasI && hasP) {
      resV = V;
      resI = I;
      resP = P;
      const S = sqrt3 * V * I;
      if (P > S + 0.001) return null; // P cannot exceed S
      resPF = S > 0 ? Math.min(1, P / S) : 1;
    } else if (hasV && hasP && hasPF) {
      resV = V;
      resPF = pf;
      resP = P;
      resI = P / (sqrt3 * V * pf);
    } else if (hasI && hasP && hasPF) {
      resI = I;
      resPF = pf;
      resP = P;
      resV = P / (sqrt3 * I * pf);
    } else {
      return null;
    }

    const S = sqrt3 * resV * resI;
    const Q = Math.sqrt(Math.max(0, S * S - resP * resP));
    const phiDeg = Math.acos(Math.min(1, resPF)) * (180 / Math.PI);

    return {
      S,
      P: resP,
      Q,
      pf: resPF,
      V: resV,
      I: resI,
      phiDeg,
      efficiency: resPF * 100,
    };
  }, [touched, voltage, current, power, powerFactor, sqrt3]);

  function loadExample(v: string, i: string, p: string, pf: string) {
    setVoltage(v);
    setCurrent(i);
    setPower(p);
    setPowerFactor(pf);
    setTouched(true);
  }

  function reset() {
    setVoltage("");
    setCurrent("");
    setPower("");
    setPowerFactor("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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
          <p className="text-sm text-zinc-500">{t("field.hint")}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tp-v">{t("field.voltage")}</Label>
              <Input
                id="tp-v"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.voltage")}
                value={voltage}
                onChange={(e) => { setVoltage(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tp-i">{t("field.current")}</Label>
              <Input
                id="tp-i"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.current")}
                value={current}
                onChange={(e) => { setCurrent(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tp-p">{t("field.activePower")}</Label>
              <Input
                id="tp-p"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.activePower")}
                value={power}
                onChange={(e) => { setPower(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tp-pf">{t("field.powerFactor")}</Label>
              <Input
                id="tp-pf"
                type="number"
                inputMode="decimal"
                min={0}
                max={1}
                step="any"
                  placeholder={t("field.placeholder.powerFactor")}
                value={powerFactor}
                onChange={(e) => { setPowerFactor(e.target.value); setTouched(true); }}
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

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.apparentPower")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.S)} VA</p>
                  <p className="text-sm text-zinc-500">({fmtNum(result.S / 1000, 3)} kVA)</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.activePower")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.P)} W</p>
                  <p className="text-sm text-zinc-500">({fmtNum(result.P / 1000, 3)} kW)</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.reactivePower")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.Q)} VAR</p>
                  <p className="text-sm text-zinc-500">({fmtNum(result.Q / 1000, 3)} kVAR)</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.powerFactor")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.pf, 4)}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.phaseAngle")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.phiDeg, 2)}°</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.lineVoltage")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.V, 1)} V</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("400", "50", "", "0.85")}>
              {t("examples.loadIndustrial")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("11000", "100", "", "0.9")}>
              {t("examples.loadHighVoltage")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("480", "", "75000", "0.95")}>
              {t("examples.loadMotor")}
            </Button>
          </div>
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
