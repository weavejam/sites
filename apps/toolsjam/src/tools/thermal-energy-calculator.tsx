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

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return rounded.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

function formatEnergy(joules: number): string {
  if (!Number.isFinite(joules)) return "—";
  if (Math.abs(joules) >= 1_000_000) {
    return `${formatNum(joules / 1_000_000, 4)} MJ (${formatNum(joules, 2)} J)`;
  }
  if (Math.abs(joules) >= 1_000) {
    return `${formatNum(joules / 1_000, 4)} kJ (${formatNum(joules, 2)} J)`;
  }
  return `${formatNum(joules, 2)} J`;
}

export default function ThermalEnergyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.thermal-energy-calculator");

  const [mass, setMass] = React.useState("");
  const [specificHeat, setSpecificHeat] = React.useState("");
  const [initialTemp, setInitialTemp] = React.useState("");
  const [finalTemp, setFinalTemp] = React.useState("");
  const [latentHeat, setLatentHeat] = React.useState("");
  const [power, setPower] = React.useState("");
  const [time, setTime] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const m = parseFloat(mass);
  const c = parseFloat(specificHeat);
  const T1 = parseFloat(initialTemp);
  const T2 = parseFloat(finalTemp);
  const L = latentHeat !== "" ? parseFloat(latentHeat) : null;
  const P = power !== "" ? parseFloat(power) : null;
  const t_s = time !== "" ? parseFloat(time) : null;

  const valid =
    mass !== "" && Number.isFinite(m) && m > 0 &&
    specificHeat !== "" && Number.isFinite(c) && c > 0 &&
    initialTemp !== "" && Number.isFinite(T1) &&
    finalTemp !== "" && Number.isFinite(T2);

  const result = React.useMemo(() => {
    if (!valid) return null;
    const deltaT = T2 - T1;
    const sensibleHeat = m * c * Math.abs(deltaT);
    const phaseHeat = L !== null && Number.isFinite(L) && L > 0 ? m * L : 0;
    const totalHeat = sensibleHeat + phaseHeat;
    const heatingTime = P !== null && Number.isFinite(P) && P > 0 ? totalHeat / P : null;
    const electricalEnergy =
      P !== null && Number.isFinite(P) && P > 0 && t_s !== null && Number.isFinite(t_s) && t_s > 0
        ? P * t_s
        : null;
    return { sensibleHeat, phaseHeat, totalHeat, heatingTime, electricalEnergy, deltaT };
  }, [valid, m, c, T1, T2, L, P, t_s]);

  function loadExample(
    massVal: string,
    shVal: string,
    t1Val: string,
    t2Val: string,
    lhVal: string,
    pwrVal: string,
    timeVal: string
  ) {
    setMass(massVal);
    setSpecificHeat(shVal);
    setInitialTemp(t1Val);
    setFinalTemp(t2Val);
    setLatentHeat(lhVal);
    setPower(pwrVal);
    setTime(timeVal);
    setTouched(true);
  }

  function reset() {
    setMass("");
    setSpecificHeat("");
    setInitialTemp("");
    setFinalTemp("");
    setLatentHeat("");
    setPower("");
    setTime("");
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
              <Label htmlFor="tec-mass">{t("field.mass")}</Label>
              <Input
                id="tec-mass"
                type="number"
                inputMode="decimal"
                value={mass}
                placeholder={t("placeholder.mass")}
                onChange={(e) => { setMass(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tec-sh">{t("field.specificHeat")}</Label>
              <Input
                id="tec-sh"
                type="number"
                inputMode="decimal"
                value={specificHeat}
                placeholder={t("placeholder.specificHeat")}
                onChange={(e) => { setSpecificHeat(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tec-t1">{t("field.initialTemp")}</Label>
              <Input
                id="tec-t1"
                type="number"
                inputMode="decimal"
                value={initialTemp}
                placeholder={t("placeholder.temp")}
                onChange={(e) => { setInitialTemp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tec-t2">{t("field.finalTemp")}</Label>
              <Input
                id="tec-t2"
                type="number"
                inputMode="decimal"
                value={finalTemp}
                placeholder={t("placeholder.temp")}
                onChange={(e) => { setFinalTemp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tec-lh">{t("field.latentHeat")}</Label>
              <Input
                id="tec-lh"
                type="number"
                inputMode="decimal"
                value={latentHeat}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setLatentHeat(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tec-power">{t("field.power")}</Label>
              <Input
                id="tec-power"
                type="number"
                inputMode="decimal"
                value={power}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setPower(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tec-time">{t("field.time")}</Label>
              <Input
                id="tec-time"
                type="number"
                inputMode="decimal"
                value={time}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setTime(e.target.value); setTouched(true); }}
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
                  <span className="text-xs text-zinc-500">{t("result.sensibleHeat")}</span>
                  <div className="text-lg font-semibold text-zinc-900">{formatEnergy(result.sensibleHeat)}</div>
                </div>
                {result.phaseHeat > 0 && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.phaseHeat")}</span>
                    <div className="text-lg font-semibold text-zinc-900">{formatEnergy(result.phaseHeat)}</div>
                  </div>
                )}
                <div>
                  <span className="text-xs text-zinc-500">{t("result.totalHeat")}</span>
                  <div className="text-lg font-semibold text-zinc-900">{formatEnergy(result.totalHeat)}</div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.tempChange")}</span>
                  <div className="text-lg font-semibold text-zinc-900">{formatNum(result.deltaT, 2)} °C</div>
                </div>
                {result.heatingTime !== null && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.heatingTime")}</span>
                    <div className="text-lg font-semibold text-zinc-900">{formatNum(result.heatingTime, 2)} s</div>
                  </div>
                )}
                {result.electricalEnergy !== null && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.electricalEnergy")}</span>
                    <div className="text-lg font-semibold text-zinc-900">{formatEnergy(result.electricalEnergy)}</div>
                  </div>
                )}
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
            onClick={() => loadExample("1", "4186", "25", "100", "2260000", "2000", "1200")}
          >
            {t("examples.loadBoilingWater")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("2", "900", "20", "150", "", "1500", "600")}
          >
            {t("examples.loadHeatingAluminum")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0.5", "2100", "0", "0", "334000", "500", "300")}
          >
            {t("examples.loadMeltingIce")}
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
