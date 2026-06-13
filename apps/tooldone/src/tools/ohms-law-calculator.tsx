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

interface FaqItem {
  q: string;
  a: string;
}

interface OhmResult {
  v: number;
  i: number;
  r: number;
  p: number;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function solveOhms(
  v: number,
  i: number,
  r: number,
  p: number,
): OhmResult | null {
  const has = {
    v: Number.isFinite(v),
    i: Number.isFinite(i),
    r: Number.isFinite(r),
    p: Number.isFinite(p),
  };
  const count = Number(has.v) + Number(has.i) + Number(has.r) + Number(has.p);
  if (count !== 2) return null;

  let V = v;
  let I = i;
  let R = r;
  let P = p;

  if (has.v && has.i) {
    R = I === 0 ? NaN : V / I;
    P = V * I;
  } else if (has.v && has.r) {
    if (R === 0) return null;
    I = V / R;
    P = (V * V) / R;
  } else if (has.v && has.p) {
    if (V === 0) return null;
    I = P / V;
    R = (V * V) / P;
  } else if (has.i && has.r) {
    V = I * R;
    P = I * I * R;
  } else if (has.i && has.p) {
    if (I === 0) return null;
    V = P / I;
    R = P / (I * I);
  } else if (has.r && has.p) {
    if (R < 0 || P < 0) return null;
    I = Math.sqrt(P / R);
    V = Math.sqrt(P * R);
  }

  if (![V, I, R, P].every(Number.isFinite)) return null;
  return { v: V, i: I, r: R, p: P };
}

export default function OhmsLawCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ohms-law-calculator");
  const [voltage, setVoltage] = React.useState("");
  const [current, setCurrent] = React.useState("");
  const [resistance, setResistance] = React.useState("");
  const [power, setPower] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<OhmResult | null>(() => {
    return solveOhms(
      voltage === "" ? NaN : parseFloat(voltage),
      current === "" ? NaN : parseFloat(current),
      resistance === "" ? NaN : parseFloat(resistance),
      power === "" ? NaN : parseFloat(power),
    );
  }, [voltage, current, resistance, power]);

  function reset() {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setPower("");
    setTouched(false);
  }

  function loadExample(v: string, i: string, r: string, p: string) {
    setVoltage(v);
    setCurrent(i);
    setResistance(r);
    setPower(p);
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

  const filledCount =
    Number(voltage !== "") +
    Number(current !== "") +
    Number(resistance !== "") +
    Number(power !== "");
  const showError = touched && result === null && filledCount !== 2;

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
              <Label htmlFor="ohm-v">{t("field.voltage")}</Label>
              <Input
                id="ohm-v"
                type="number"
                inputMode="decimal"
                value={voltage}
                placeholder={t("placeholder.voltage")}
                onChange={(e) => {
                  setVoltage(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ohm-i">{t("field.current")}</Label>
              <Input
                id="ohm-i"
                type="number"
                inputMode="decimal"
                value={current}
                placeholder={t("placeholder.current")}
                onChange={(e) => {
                  setCurrent(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ohm-r">{t("field.resistance")}</Label>
              <Input
                id="ohm-r"
                type="number"
                inputMode="decimal"
                value={resistance}
                placeholder={t("placeholder.resistance")}
                onChange={(e) => {
                  setResistance(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ohm-p">{t("field.power")}</Label>
              <Input
                id="ohm-p"
                type="number"
                inputMode="decimal"
                value={power}
                placeholder={t("placeholder.power")}
                onChange={(e) => {
                  setPower(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          <p className="text-sm text-zinc-500">{t("hint")}</p>

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
              <div className="grid gap-3 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.voltage")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.v)} {t("result.unitVoltage")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.current")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.i)} {t("result.unitCurrent")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.resistance")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.r)} {t("result.unitResistance")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.power")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.p)} {t("result.unitPower")}
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("5", "0.02", "", "")}
          >
            {t("examples.loadLed")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("12", "", "100", "")}
          >
            {t("examples.loadResistor")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("9", "", "", "15")}
          >
            {t("examples.loadBattery")}
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
