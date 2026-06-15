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

type Medium = "vacuum" | "optical_fiber" | "copper" | "air" | "water";

const MEDIUM_SPEEDS: Record<Medium, number> = {
  vacuum: 299792458,
  optical_fiber: 200000000,
  copper: 230000000,
  air: 343,
  water: 1480,
};

const MEDIUMS: Medium[] = ["vacuum", "optical_fiber", "copper", "air", "water"];

function formatSci(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  if (Math.abs(n) < 1e-9) {
    return n.toExponential(3) + " s";
  }
  if (Math.abs(n) < 1e-6) {
    return (n * 1e9).toFixed(3) + " ns";
  }
  if (Math.abs(n) < 1e-3) {
    return (n * 1e6).toFixed(3) + " µs";
  }
  if (Math.abs(n) < 1) {
    return (n * 1e3).toFixed(3) + " ms";
  }
  return n.toFixed(4) + " s";
}

function formatMeters(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n >= 1e6) return (n / 1e3).toFixed(2) + " km";
  if (n >= 1) return n.toFixed(4) + " m";
  if (n >= 1e-2) return (n * 100).toFixed(4) + " cm";
  return (n * 1000).toFixed(4) + " mm";
}

function formatSpeed(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US") + " m/s";
}

export default function PropagationDelayCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.propagation-delay-calculator");

  const [medium, setMedium] = React.useState<Medium>("vacuum");
  const [distance, setDistance] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [temperature, setTemperature] = React.useState("20");
  const [touched, setTouched] = React.useState(false);

  const airSpeed = React.useMemo(() => {
    const temp = parseFloat(temperature);
    if (!Number.isFinite(temp)) return 343;
    return 331.3 + 0.606 * temp;
  }, [temperature]);

  const propagationSpeed = medium === "air" ? airSpeed : MEDIUM_SPEEDS[medium];

  const distNum = parseFloat(distance);
  const freqNum = parseFloat(frequency);
  const distValid = distance !== "" && Number.isFinite(distNum) && distNum > 0;
  const freqValid = frequency !== "" && Number.isFinite(freqNum) && freqNum > 0;

  const delay = distValid ? distNum / propagationSpeed : null;
  const roundTrip = delay !== null ? delay * 2 : null;
  const wavelength = freqValid ? propagationSpeed / freqNum : null;

  function reset() {
    setDistance("");
    setFrequency("");
    setTemperature("20");
    setMedium("vacuum");
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

  const showError = touched && !distValid;

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
            <Label>{t("field.medium")}</Label>
            <div className="flex flex-wrap gap-2">
              {MEDIUMS.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={medium === m ? "default" : "outline"}
                  onClick={() => {
                    setMedium(m);
                    setTouched(false);
                  }}
                >
                  {t(`medium.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pd-distance">{t("field.distance")}</Label>
              <Input
                id="pd-distance"
                type="number"
                inputMode="decimal"
                value={distance}
                placeholder={t("placeholder.distance")}
                onChange={(e) => {
                  setDistance(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pd-speed">{t("field.speed")}</Label>
              <Input
                id="pd-speed"
                type="number"
                value={propagationSpeed.toString()}
                readOnly
                className="bg-zinc-50"
              />
              <p className="text-xs text-zinc-500">
                {formatSpeed(propagationSpeed)}
              </p>
            </div>
          </div>

          {medium === "air" && (
            <div className="space-y-2">
              <Label htmlFor="pd-temperature">{t("field.temperature")}</Label>
              <Input
                id="pd-temperature"
                type="number"
                inputMode="decimal"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="sm:max-w-[200px]"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="pd-frequency">{t("field.frequency")}</Label>
            <Input
              id="pd-frequency"
              type="number"
              inputMode="decimal"
              value={frequency}
              placeholder={t("placeholder.frequency")}
              onChange={(e) => setFrequency(e.target.value)}
              className="sm:max-w-[300px]"
            />
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

          {delay !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-700">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.delay")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatSci(delay)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.roundTrip")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {roundTrip !== null ? formatSci(roundTrip) : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.speed")}
                  </div>
                  <div className="text-lg font-medium text-zinc-800">
                    {formatSpeed(propagationSpeed)}
                  </div>
                </div>
                {wavelength !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.wavelength")}
                    </div>
                    <div className="text-lg font-medium text-zinc-800">
                      {formatMeters(wavelength)}
                    </div>
                  </div>
                )}
              </div>
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
