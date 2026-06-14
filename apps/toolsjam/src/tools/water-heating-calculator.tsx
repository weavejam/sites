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

type VolumeUnit = "liters" | "gallons";

interface ResultState {
  heatEnergyKwh: number;
  actualEnergyKwh: number;
  heatingTimeHours: number;
  cost: number;
  co2: number;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function WaterHeatingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.water-heating-calculator");
  const [volume, setVolume] = React.useState("");
  const [unit, setUnit] = React.useState<VolumeUnit>("liters");
  const [initialTemp, setInitialTemp] = React.useState("");
  const [targetTemp, setTargetTemp] = React.useState("");
  const [power, setPower] = React.useState("");
  const [efficiency, setEfficiency] = React.useState("");
  const [costPerKwh, setCostPerKwh] = React.useState("");
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
    setVolume("");
    setUnit("liters");
    setInitialTemp("");
    setTargetTemp("");
    setPower("");
    setEfficiency("");
    setCostPerKwh("");
    clearComputedState();
  }

  function calculate() {
    if (
      [volume, initialTemp, targetTemp, power, efficiency, costPerKwh].some(
        (value) => value.trim() === "",
      )
    ) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }

    const volumeValue = Number(volume);
    const initialValue = Number(initialTemp);
    const targetValue = Number(targetTemp);
    const powerValue = Number(power);
    const efficiencyValue = Number(efficiency);
    const costValue = Number(costPerKwh);

    if (
      !Number.isFinite(volumeValue) ||
      !Number.isFinite(initialValue) ||
      !Number.isFinite(targetValue) ||
      !Number.isFinite(powerValue) ||
      !Number.isFinite(efficiencyValue) ||
      !Number.isFinite(costValue) ||
      volumeValue <= 0 ||
      powerValue <= 0 ||
      efficiencyValue <= 0 ||
      costValue <= 0
    ) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }

    if (targetValue <= initialValue) {
      setError(t("error.tempRange"));
      setResult(null);
      return;
    }

    const volumeLiters = unit === "gallons" ? volumeValue * 3.78541 : volumeValue;
    const heatEnergyKwh =
      (volumeLiters * 4186 * (targetValue - initialValue)) / 3600000;
    const actualEnergyKwh = heatEnergyKwh / (efficiencyValue / 100);
    const heatingTimeHours = actualEnergyKwh / powerValue;
    const cost = actualEnergyKwh * costValue;
    const co2 = actualEnergyKwh * 0.233;

    setError(null);
    setResult({
      heatEnergyKwh,
      actualEnergyKwh,
      heatingTimeHours: heatingTimeHours,
      cost,
      co2,
    });
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
            <div className="space-y-2">
              <Label htmlFor="volume">{t("field.volume")}</Label>
              <div className="flex gap-2">
                <Input
                  id="volume"
                  type="number"
                  inputMode="decimal"
                  value={volume}
                  onChange={(e) => {
                    setVolume(e.target.value);
                    clearComputedState();
                  }}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={unit === "liters" ? "default" : "outline"}
                    onClick={() => {
                      setUnit("liters");
                      clearComputedState();
                    }}
                  >
                    {t("type.liters")}
                  </Button>
                  <Button
                    type="button"
                    variant={unit === "gallons" ? "default" : "outline"}
                    onClick={() => {
                      setUnit("gallons");
                      clearComputedState();
                    }}
                  >
                    {t("type.gallons")}
                  </Button>
                </div>
              </div>
            </div>
            {[
              {
                id: "initial-temp",
                label: t("field.initialTemp"),
                value: initialTemp,
                setValue: setInitialTemp,
              },
              {
                id: "target-temp",
                label: t("field.targetTemp"),
                value: targetTemp,
                setValue: setTargetTemp,
              },
              {
                id: "power",
                label: t("field.power"),
                value: power,
                setValue: setPower,
              },
              {
                id: "efficiency",
                label: t("field.efficiency"),
                value: efficiency,
                setValue: setEfficiency,
              },
              {
                id: "cost-per-kwh",
                label: t("field.costPerKwh"),
                value: costPerKwh,
                setValue: setCostPerKwh,
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
              <div className="mt-3 space-y-2 text-zinc-900">
                <div className="text-base font-medium">
                  {t("result.heatEnergy", {
                    value: formatNumber(result.heatEnergyKwh),
                  })}
                </div>
                <div className="text-base font-medium">
                  {t("result.actualEnergy", {
                    value: formatNumber(result.actualEnergyKwh),
                  })}
                </div>
                <div className="text-xl font-semibold">
                  {t("result.heatingTime", {
                    value: (() => {
                      const h = Math.floor(result.heatingTimeHours);
                      let m = Math.round((result.heatingTimeHours - h) * 60);
                      let nh = h;
                      if (m === 60) { nh += 1; m = 0; }
                      return `${nh}${t("unit.hours")} ${m}${t("unit.minutes")}`;
                    })(),
                  })}
                </div>
                <div className="text-base font-medium">
                  {t("result.cost", { value: formatNumber(result.cost) })}
                </div>
                <div className="text-base font-medium">
                  {t("result.co2", { value: formatNumber(result.co2) })}
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
