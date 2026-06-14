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
  measuredDensityGml: number | null;
  measuredDensityKgm3: number | null;
  theoreticalDensityGml: number;
  theoreticalDensityKgm3: number;
  differenceGml: number | null;
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function pureWaterDensity(temperature: number): number {
  return (
    999.842594 +
    6.793952e-2 * temperature -
    9.095290e-3 * temperature ** 2 +
    1.001685e-4 * temperature ** 3 -
    1.120083e-6 * temperature ** 4 +
    6.536332e-9 * temperature ** 5
  );
}

function theoreticalWaterDensity(
  temperature: number,
  salinityPercent: number,
  pressureAtm: number,
): number {
  const salinityPpt = salinityPercent * 10;
  const densityWater = pureWaterDensity(temperature);
  const a =
    0.824493 -
    4.0899e-3 * temperature +
    7.6438e-5 * temperature ** 2 -
    8.2467e-7 * temperature ** 3 +
    5.3875e-9 * temperature ** 4;
  const b =
    -5.72466e-3 +
    1.0227e-4 * temperature -
    1.6546e-6 * temperature ** 2;
  const c = 4.8314e-4;
  const densitySalinity =
    densityWater +
    a * salinityPpt +
    b * salinityPpt ** 1.5 +
    c * salinityPpt ** 2;

  return densitySalinity * (1 + 4.6e-5 * (pressureAtm - 1));
}

export default function WaterDensityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.water-density-calculator");
  const [mass, setMass] = React.useState("");
  const [volume, setVolume] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [salinity, setSalinity] = React.useState("");
  const [pressure, setPressure] = React.useState("");
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
    setMass("");
    setVolume("");
    setTemperature("");
    setSalinity("");
    setPressure("");
    clearComputedState();
  }

  function calculate() {
    if (
      temperature.trim() === "" ||
      salinity.trim() === "" ||
      pressure.trim() === ""
    ) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }

    const temperatureValue = Number(temperature);
    const salinityValue = Number(salinity);
    const pressureValue = Number(pressure);
    const hasMass = mass.trim() !== "";
    const hasVolume = volume.trim() !== "";

    if (
      !Number.isFinite(temperatureValue) ||
      !Number.isFinite(salinityValue) ||
      !Number.isFinite(pressureValue)
    ) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }

    if (hasMass !== hasVolume) {
      setError(t("error.massVolume"));
      setResult(null);
      return;
    }

    let measuredDensityGml: number | null = null;
    let measuredDensityKgm3: number | null = null;

    if (hasMass && hasVolume) {
      const massValue = Number(mass);
      const volumeValue = Number(volume);
      if (
        !Number.isFinite(massValue) ||
        !Number.isFinite(volumeValue) ||
        volumeValue <= 0
      ) {
        setError(t("error.invalid"));
        setResult(null);
        return;
      }
      measuredDensityGml = massValue / volumeValue;
      measuredDensityKgm3 = measuredDensityGml * 1000;
    }

    const theoreticalDensityKgm3 = theoreticalWaterDensity(
      temperatureValue,
      salinityValue,
      pressureValue,
    );
    const theoreticalDensityGml = theoreticalDensityKgm3 / 1000;

    setError(null);
    setResult({
      measuredDensityGml,
      measuredDensityKgm3,
      theoreticalDensityGml,
      theoreticalDensityKgm3,
      differenceGml:
        measuredDensityGml === null
          ? null
          : Math.abs(measuredDensityGml - theoreticalDensityGml),
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
            {[
              {
                id: "mass",
                label: t("field.mass"),
                value: mass,
                setValue: setMass,
              },
              {
                id: "volume",
                label: t("field.volume"),
                value: volume,
                setValue: setVolume,
              },
              {
                id: "temperature",
                label: t("field.temperature"),
                value: temperature,
                setValue: setTemperature,
              },
              {
                id: "salinity",
                label: t("field.salinity"),
                value: salinity,
                setValue: setSalinity,
              },
              {
                id: "pressure",
                label: t("field.pressure"),
                value: pressure,
                setValue: setPressure,
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
                {result.measuredDensityGml !== null &&
                  result.measuredDensityKgm3 !== null && (
                    <div className="text-base font-medium">
                      {t("result.measuredDensity", {
                        gml: formatNumber(result.measuredDensityGml),
                        kgm3: formatNumber(result.measuredDensityKgm3),
                      })}
                    </div>
                  )}
                <div className="text-xl font-semibold">
                  {t("result.theoreticalDensity", {
                    gml: formatNumber(result.theoreticalDensityGml),
                    kgm3: formatNumber(result.theoreticalDensityKgm3),
                  })}
                </div>
                {result.differenceGml !== null && (
                  <div className="text-base font-medium">
                    {t("result.difference", {
                      value: formatNumber(result.differenceGml),
                    })}
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
