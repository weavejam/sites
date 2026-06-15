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

// Speed of light in m/s
const C = 299792458;

function formatNum(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function formatSci(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / 10 ** exp;
  return `${mantissa.toLocaleString("en-US", { maximumFractionDigits: 4 })} × 10^${exp}`;
}

export default function BugRivetParadox(_props: { locale: Locale }) {
  const t = useTranslations("tool.bug-rivet-paradox");

  const [rivetLength, setRivetLength] = React.useState("");
  const [holeLength, setHoleLength] = React.useState("");
  const [velocity, setVelocity] = React.useState("");
  const [diameter, setDiameter] = React.useState("");
  const [density, setDensity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const r0 = parseFloat(rivetLength);
  const h0 = parseFloat(holeLength);
  const v = parseFloat(velocity);
  const d = parseFloat(diameter);
  const rho = parseFloat(density);

  const allFilled = [rivetLength, holeLength, velocity, diameter, density].every(
    (s) => s !== ""
  );
  const velocityValid = Number.isFinite(v) && v > 0 && v < 1;
  const allValid =
    allFilled &&
    [r0, h0, d, rho].every((x) => Number.isFinite(x) && x > 0) &&
    velocityValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    const gamma = 1 / Math.sqrt(1 - v * v);
    const contractedRivetLength = r0 / gamma;
    const fitsInHole = contractedRivetLength <= h0;
    // Volume of rivet (cylinder): π/4 * d² * r0
    const volume = (Math.PI / 4) * d * d * r0;
    const restMass = rho * volume;
    // Kinetic energy: (γ - 1) × m₀c²
    const kineticEnergy = (gamma - 1) * restMass * C * C;
    return { gamma, contractedRivetLength, fitsInHole, restMass, kineticEnergy };
  }, [allValid, r0, h0, v, d, rho]);

  function loadExample(
    rl: string,
    hl: string,
    vel: string,
    di: string,
    den: string
  ) {
    setRivetLength(rl);
    setHoleLength(hl);
    setVelocity(vel);
    setDiameter(di);
    setDensity(den);
    setTouched(true);
  }

  function reset() {
    setRivetLength("");
    setHoleLength("");
    setVelocity("");
    setDiameter("");
    setDensity("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const showError = touched && !allValid;
  const showVelocityError = touched && allFilled && !velocityValid;

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="brp-rivet-length">{t("field.rivetLength")}</Label>
              <Input
                id="brp-rivet-length"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={rivetLength}
                placeholder={t("placeholder.rivetLength")}
                onChange={(e) => {
                  setRivetLength(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brp-hole-length">{t("field.holeLength")}</Label>
              <Input
                id="brp-hole-length"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={holeLength}
                placeholder={t("placeholder.holeLength")}
                onChange={(e) => {
                  setHoleLength(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brp-velocity">{t("field.velocity")}</Label>
              <Input
                id="brp-velocity"
                type="number"
                inputMode="decimal"
                min="0"
                max="0.9999"
                step="any"
                value={velocity}
                placeholder={t("placeholder.velocity")}
                onChange={(e) => {
                  setVelocity(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brp-diameter">{t("field.rivetDiameter")}</Label>
              <Input
                id="brp-diameter"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={diameter}
                placeholder={t("placeholder.rivetDiameter")}
                onChange={(e) => {
                  setDiameter(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brp-density">{t("field.density")}</Label>
              <Input
                id="brp-density"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={density}
                placeholder={t("placeholder.density")}
                onChange={(e) => {
                  setDensity(e.target.value);
                  setTouched(true);
                }}
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

          {showVelocityError && (
            <p className="text-sm text-red-600">{t("error.velocityRange")}</p>
          )}
          {showError && !showVelocityError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <p
                className={`text-sm font-semibold ${
                  result.fitsInHole ? "text-green-700" : "text-amber-700"
                }`}
              >
                {result.fitsInHole
                  ? t("result.fitsInHole.yes")
                  : t("result.fitsInHole.no")}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.lorentzFactor")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.gamma)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.contractedLength")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.contractedRivetLength)} m
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.timeDilation")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.gamma)}×
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.restMass")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.restMass, 6)} kg
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.kineticEnergy")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatSci(result.kineticEnergy)} J
                  </div>
                </div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
            onClick={() =>
              loadExample("0.1", "0.08", "0.8", "0.01", "7850")
            }
          >
            {t("examples.loadClassic")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("0.15", "0.1", "0.95", "0.015", "2700")
            }
          >
            {t("examples.loadExtreme")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("0.12", "0.09", "0.6", "0.012", "11340")
            }
          >
            {t("examples.loadModerate")}
          </Button>
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
