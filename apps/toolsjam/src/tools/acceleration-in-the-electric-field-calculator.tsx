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

function fmtSci(n: number, sig = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(n)));
  if (Math.abs(exp) < 4) {
    return parseFloat(n.toPrecision(sig)).toLocaleString("en-US", { maximumSignificantDigits: sig });
  }
  return n.toExponential(sig - 1);
}

interface EfResult {
  force: number;
  acceleration: number;
  finalVelocity: number;
  deltaKE: number;
  time: number | null;
}

export default function AccelerationInTheElectricFieldCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.acceleration-in-the-electric-field-calculator");

  const [charge, setCharge] = React.useState("");
  const [eField, setEField] = React.useState("");
  const [mass, setMass] = React.useState("");
  const [v0, setV0] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<EfResult | null>(() => {
    if (!touched) return null;
    const q = parseFloat(charge);
    const E = parseFloat(eField);
    const m = parseFloat(mass);
    const v0n = parseFloat(v0);
    const d = parseFloat(distance);
    if (!Number.isFinite(q) || !Number.isFinite(E) || !Number.isFinite(m) || m <= 0) return null;
    if (!Number.isFinite(v0n) || !Number.isFinite(d) || d < 0) return null;
    const F = q * E;
    const a = F / m;
    // Work done by field = F·d = q*E*d (signed). KE gained = q*E*d.
    const deltaKE = q * E * d;
    const ke0 = 0.5 * m * v0n * v0n;
    const keFinal = ke0 + deltaKE;
    const vf = keFinal >= 0 ? Math.sqrt(2 * keFinal / m) : NaN;
    let time: number | null = null;
    if (Number.isFinite(a) && a !== 0) {
      // d = v0*t + 0.5*a*t^2  => 0.5*a*t^2 + v0*t - d = 0
      const disc = v0n * v0n + 2 * a * d;
      if (disc >= 0) {
        const t1 = (-v0n + Math.sqrt(disc)) / a;
        const t2 = (-v0n - Math.sqrt(disc)) / a;
        const candidates = [t1, t2].filter((x) => Number.isFinite(x) && x >= 0);
        if (candidates.length > 0) time = Math.min(...candidates);
      }
    } else if (a === 0 && v0n !== 0 && d >= 0) {
      time = d / v0n;
    }
    return { force: F, acceleration: a, finalVelocity: vf, deltaKE, time };
  }, [touched, charge, eField, mass, v0, distance]);

  function loadExample(q: string, E: string, m: string, v0v: string, d: string) {
    setCharge(q); setEField(E); setMass(m); setV0(v0v); setDistance(d); setTouched(true);
  }

  function reset() {
    setCharge(""); setEField(""); setMass(""); setV0(""); setDistance(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  const showError = touched && result === null;

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
              <Label htmlFor="ef-q">{t("field.charge")}</Label>
              <Input
                id="ef-q"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder={t("field.placeholder.charge")}
                value={charge}
                onChange={(e) => { setCharge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ef-e">{t("field.electricField")}</Label>
              <Input
                id="ef-e"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder={t("field.placeholder.electricField")}
                value={eField}
                onChange={(e) => { setEField(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ef-m">{t("field.mass")}</Label>
              <Input
                id="ef-m"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder={t("field.placeholder.mass")}
                value={mass}
                onChange={(e) => { setMass(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ef-v0">{t("field.initialVelocity")}</Label>
              <Input
                id="ef-v0"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder={t("field.placeholder.initialVelocity")}
                value={v0}
                onChange={(e) => { setV0(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ef-d">{t("field.distance")}</Label>
              <Input
                id="ef-d"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder={t("field.placeholder.distance")}
                value={distance}
                onChange={(e) => { setDistance(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.force")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtSci(result.force)} N</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.acceleration")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtSci(result.acceleration)} m/s²</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.finalVelocity")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtSci(result.finalVelocity)} m/s</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.kineticEnergyGained")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtSci(result.deltaKE)} J</p>
                </div>
                {result.time !== null && Number.isFinite(result.time) && result.time >= 0 && (
                  <div>
                    <p className="text-sm text-zinc-500">{t("result.timeToTravel")}</p>
                    <p className="text-xl font-semibold font-mono">{fmtSci(result.time)} s</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("-1.602e-19", "-50000", "9.109e-31", "0", "0.05")}>
              {t("examples.loadElectron")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("1.602e-19", "1000000", "1.673e-27", "1000000", "0.1")}>
              {t("examples.loadProton")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("1.602e-19", "10000", "6.64e-26", "50000", "0.02")}>
              {t("examples.loadIon")}
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
