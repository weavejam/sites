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

type TimerMode = "astable" | "monostable";

interface AstableResult {
  mode: "astable";
  frequency: number;
  period: number;
  tHigh: number;
  tLow: number;
  dutyCycle: number;
}

interface MonostableResult {
  mode: "monostable";
  pulseWidth: number;
}

type TimerResult = AstableResult | MonostableResult;

function formatHz(f: number): string {
  if (f >= 1e6) return `${(f / 1e6).toLocaleString("en-US", { maximumFractionDigits: 4 })} MHz`;
  if (f >= 1e3) return `${(f / 1e3).toLocaleString("en-US", { maximumFractionDigits: 4 })} kHz`;
  return `${f.toLocaleString("en-US", { maximumFractionDigits: 6 })} Hz`;
}

function formatTime(seconds: number): string {
  if (seconds >= 1) return `${seconds.toLocaleString("en-US", { maximumFractionDigits: 4 })} s`;
  if (seconds >= 1e-3) return `${(seconds * 1e3).toLocaleString("en-US", { maximumFractionDigits: 4 })} ms`;
  if (seconds >= 1e-6) return `${(seconds * 1e6).toLocaleString("en-US", { maximumFractionDigits: 4 })} µs`;
  return `${(seconds * 1e9).toLocaleString("en-US", { maximumFractionDigits: 4 })} ns`;
}

function calcAstable(R1: number, R2: number, C_uF: number): AstableResult {
  const C = C_uF * 1e-6;
  const tHigh = 0.693 * (R1 + R2) * C;
  const tLow = 0.693 * R2 * C;
  const period = tHigh + tLow;
  const frequency = 1 / period;
  const dutyCycle = (tHigh / period) * 100;
  return { mode: "astable", frequency, period, tHigh, tLow, dutyCycle };
}

function calcMonostable(R1: number, C_uF: number): MonostableResult {
  const C = C_uF * 1e-6;
  const pulseWidth = 1.1 * R1 * C;
  return { mode: "monostable", pulseWidth };
}

export default function Timer555Calculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.555-timer-calculator");

  const [timerMode, setTimerMode] = React.useState<TimerMode>("astable");
  const [r1, setR1] = React.useState("");
  const [r2, setR2] = React.useState("");
  const [cap, setCap] = React.useState("");
  const [vcc, setVcc] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const r1Num = parseFloat(r1);
  const r2Num = parseFloat(r2);
  const capNum = parseFloat(cap);
  const vccNum = parseFloat(vcc);

  const r1Valid = r1 !== "" && Number.isFinite(r1Num) && r1Num > 0;
  const r2Valid = timerMode === "monostable" || (r2 !== "" && Number.isFinite(r2Num) && r2Num > 0);
  const capValid = cap !== "" && Number.isFinite(capNum) && capNum > 0;

  const result = React.useMemo<TimerResult | null>(() => {
    if (!r1Valid || !r2Valid || !capValid) return null;
    if (timerMode === "astable") {
      return calcAstable(r1Num, r2Num, capNum);
    }
    return calcMonostable(r1Num, capNum);
  }, [r1Valid, r2Valid, capValid, timerMode, r1Num, r2Num, capNum]);

  function loadExample(mode: TimerMode, _r1: string, _r2: string, _c: string, _vcc: string) {
    setTimerMode(mode);
    setR1(_r1);
    setR2(_r2);
    setCap(_c);
    setVcc(_vcc);
    setTouched(true);
  }

  function reset() {
    setR1(""); setR2(""); setCap(""); setVcc("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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

  const showError = touched && (!r1Valid || !r2Valid || !capValid);

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
            <Label>{t("field.mode")}</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={timerMode === "astable" ? "default" : "outline"}
                onClick={() => { setTimerMode("astable"); setTouched(false); }}
              >
                {t("type.astable")}
              </Button>
              <Button
                type="button"
                variant={timerMode === "monostable" ? "default" : "outline"}
                onClick={() => { setTimerMode("monostable"); setTouched(false); }}
              >
                {t("type.monostable")}
              </Button>
            </div>
            <p className="text-sm text-zinc-500">
              {timerMode === "astable" ? t("type.astable_desc") : t("type.monostable_desc")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="t555-r1">{t("field.r1")}</Label>
              <Input id="t555-r1" type="number" inputMode="decimal" min="0" step="any" value={r1}
                placeholder={t("placeholder.resistance")}
                onChange={(e) => { setR1(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t555-r2">
                {t("field.r2")}
                {timerMode === "monostable" && (
                  <span className="ml-1 text-xs text-zinc-400">({t("field.r2NotUsed")})</span>
                )}
              </Label>
              <Input id="t555-r2" type="number" inputMode="decimal" min="0" step="any" value={r2}
                disabled={timerMode === "monostable"}
                placeholder={timerMode === "monostable" ? t("placeholder.notApplicable") : t("placeholder.resistance")}
                onChange={(e) => { setR2(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t555-cap">{t("field.capacitor")}</Label>
              <Input id="t555-cap" type="number" inputMode="decimal" min="0" step="any" value={cap}
                placeholder={t("placeholder.capacitance")}
                onChange={(e) => { setCap(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t555-vcc">{t("field.vcc")}</Label>
              <Input id="t555-vcc" type="number" inputMode="decimal" min="0" step="any" value={vcc}
                placeholder={t("placeholder.voltage")}
                onChange={(e) => { setVcc(e.target.value); setTouched(true); }} />
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

          <div className="flex flex-wrap gap-2 text-xs">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("astable", "10000", "10000", "47", "5")}>
              {t("button.load1HzAstable")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("astable", "480", "480", "0.1", "5")}>
              {t("button.load10kHzAstable")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("monostable", "100000", "", "10", "5")}>
              {t("button.load1sMonostable")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              {result.mode === "astable" ? (
                <div className="grid gap-3 sm:grid-cols-2 text-sm">
                  <div>
                    <span className="text-zinc-500">{t("result.frequency")}: </span>
                    <span className="font-bold text-zinc-900 text-lg">{formatHz(result.frequency)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">{t("result.period")}: </span>
                    <span className="font-bold text-zinc-900 text-lg">{formatTime(result.period)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">{t("result.tHigh")}: </span>
                    <span className="font-semibold text-zinc-800">{formatTime(result.tHigh)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">{t("result.tLow")}: </span>
                    <span className="font-semibold text-zinc-800">{formatTime(result.tLow)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">{t("result.dutyCycle")}: </span>
                    <span className="font-semibold text-zinc-800">{(Math.round(result.dutyCycle * 100) / 100).toFixed(2)}%</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm">
                  <span className="text-zinc-500">{t("result.pulseWidth")}: </span>
                  <span className="font-bold text-zinc-900 text-2xl">{formatTime(result.pulseWidth)}</span>
                </div>
              )}
              <p className="text-xs text-zinc-500">{t("result.formulaNote")}</p>
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
