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

function fmt(n: number, dec = 3): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}

function calcImpact(
  v: number,
  velocityAngle: number,
  surfaceAngle: number,
  e: number,
  mass: number
): {
  impactAngle: number;
  exitVelocity: number;
  exitAngle: number;
  energyLossPct: number;
} | null {
  if (
    !Number.isFinite(v) || v <= 0 ||
    !Number.isFinite(velocityAngle) ||
    !Number.isFinite(surfaceAngle) ||
    !Number.isFinite(e) || e < 0 || e > 1 ||
    !Number.isFinite(mass) || mass <= 0
  ) return null;

  const impactAngleDeg = velocityAngle - surfaceAngle;
  if (impactAngleDeg <= 0 || impactAngleDeg > 90) return null;

  const impactAngleRad = impactAngleDeg * (Math.PI / 180);
  const vn = v * Math.sin(impactAngleRad); // normal component
  const vt = v * Math.cos(impactAngleRad); // tangential component

  const vn_out = e * vn;
  const vt_out = vt;

  const exitVelocity = Math.sqrt(vt_out * vt_out + vn_out * vn_out);
  const exitAngleFromSurface = Math.atan2(vn_out, vt_out) * (180 / Math.PI);
  const exitAngle = exitAngleFromSurface + surfaceAngle;

  const keIn = 0.5 * mass * v * v;
  const keOut = 0.5 * mass * exitVelocity * exitVelocity;
  const energyLossPct = ((keIn - keOut) / keIn) * 100;

  return { impactAngle: impactAngleDeg, exitVelocity, exitAngle, energyLossPct };
}

export default function AngleOfImpactCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.angle-of-impact-calculator");

  const [velocity, setVelocity] = React.useState("");
  const [velocityAngle, setVelocityAngle] = React.useState("");
  const [surfaceAngle, setSurfaceAngle] = React.useState("0");
  const [coeff, setCoeff] = React.useState("");
  const [mass, setMass] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    return calcImpact(
      parseFloat(velocity),
      parseFloat(velocityAngle),
      parseFloat(surfaceAngle),
      parseFloat(coeff),
      parseFloat(mass)
    );
  }, [touched, velocity, velocityAngle, surfaceAngle, coeff, mass]);

  function loadExample(v: string, va: string, sa: string, e: string, m: string) {
    setVelocity(v);
    setVelocityAngle(va);
    setSurfaceAngle(sa);
    setCoeff(e);
    setMass(m);
    setTouched(true);
  }

  function reset() {
    setVelocity("");
    setVelocityAngle("");
    setSurfaceAngle("0");
    setCoeff("");
    setMass("");
    setTouched(false);
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
              <Label htmlFor="aic-v">{t("field.initialVelocity")}</Label>
              <Input
                id="aic-v"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={velocity}
                placeholder={t("placeholder.velocity")}
                onChange={(e) => { setVelocity(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aic-va">{t("field.velocityAngle")}</Label>
              <Input
                id="aic-va"
                type="number"
                inputMode="decimal"
                step="any"
                value={velocityAngle}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setVelocityAngle(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aic-sa">{t("field.surfaceAngle")}</Label>
              <Input
                id="aic-sa"
                type="number"
                inputMode="decimal"
                step="any"
                value={surfaceAngle}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setSurfaceAngle(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aic-e">{t("field.coeff")}</Label>
              <Input
                id="aic-e"
                type="number"
                inputMode="decimal"
                min="0"
                max="1"
                step="any"
                value={coeff}
                placeholder={t("placeholder.coeff")}
                onChange={(e) => { setCoeff(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aic-m">{t("field.mass")}</Label>
              <Input
                id="aic-m"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={mass}
                placeholder={t("placeholder.mass")}
                onChange={(e) => { setMass(e.target.value); setTouched(false); }}
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
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.impactAngle")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.impactAngle, 2)}{t("result.unitDeg")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.exitVelocity")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.exitVelocity, 3)} {t("result.unitMs")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.exitAngle")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.exitAngle, 2)}{t("result.unitDeg")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.energyLoss")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.energyLossPct, 1)}{t("result.unitPercent")}
                  </div>
                </div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("3", "30", "0", "0.9", "0.17")}>
            {t("examples.loadBilliard")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("25", "15", "0", "0.75", "0.057")}>
            {t("examples.loadTennis")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("15", "45", "0", "0.2", "1500")}>
            {t("examples.loadCar")}
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
