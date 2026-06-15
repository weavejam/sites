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

interface SimResult {
  finalZombies: number;
  finalHumans: number;
  survivalProbability: number;
  outcomeKey: string;
  totalResources: number;
  peakZombies: number;
  speedKey: string;
  safeZoneRadius: number;
}

function simulate(
  Z0: number,
  H0: number,
  beta: number,
  gamma: number,
  mu: number,
  days: number,
  resourceRate: number,
  geo: number
): SimResult {
  let Z = Z0;
  let H = H0;
  let peakZ = Z0;
  let totalResources = 0;
  const dt = 1;

  for (let d = 0; d < days; d++) {
    if (H <= 0 || Z < 0) break;
    const total = H + Z;
    const encounters = (Z * H) / total;
    const newInfected = beta * encounters * geo * dt;
    const cured = gamma * Z * dt;
    const humanDeaths = mu * H * dt;

    const dZ = newInfected - cured;
    const dH = -newInfected - humanDeaths;

    Z = Math.max(0, Z + dZ);
    H = Math.max(0, H + dH);
    peakZ = Math.max(peakZ, Z);
    totalResources += H * resourceRate * dt;
  }

  const survivalRate = Math.max(0, Math.min(1, H / H0));
  let outcomeKey: string;
  if (survivalRate > 0.75) outcomeKey = "humanVictory";
  else if (survivalRate > 0.40) outcomeKey = "partialSurvival";
  else if (survivalRate > 0.10) outcomeKey = "criticalSituation";
  else outcomeKey = "zombieDominance";

  const peakRatio = peakZ / H0;
  let speedKey: string;
  if (peakRatio < 0.05) speedKey = "slow";
  else if (peakRatio < 0.2) speedKey = "moderate";
  else if (peakRatio < 0.6) speedKey = "fast";
  else speedKey = "explosive";

  const safeZoneRadius = Math.round(Math.sqrt(H / Math.max(1, Math.PI)) * 10) / 10;

  return {
    finalZombies: Math.round(Z),
    finalHumans: Math.round(H),
    survivalProbability: Math.round(survivalRate * 1000) / 10,
    outcomeKey,
    totalResources: Math.round(totalResources),
    peakZombies: Math.round(peakZ),
    speedKey,
    safeZoneRadius,
  };
}

export default function ZombieInvasionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.zombie-invasion-calculator");

  const [zombies, setZombies] = React.useState("");
  const [humans, setHumans] = React.useState("");
  const [infectionRate, setInfectionRate] = React.useState("");
  const [cureRate, setCureRate] = React.useState("");
  const [deathRate, setDeathRate] = React.useState("");
  const [days, setDays] = React.useState("");
  const [resourceRate, setResourceRate] = React.useState("");
  const [geoFactor, setGeoFactor] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const zNum = parseFloat(zombies);
  const hNum = parseFloat(humans);
  const betaNum = parseFloat(infectionRate);
  const gammaNum = parseFloat(cureRate);
  const muNum = parseFloat(deathRate);
  const daysNum = parseInt(days, 10);
  const resNum = parseFloat(resourceRate);
  const geoNum = parseFloat(geoFactor);

  const valid =
    zombies !== "" && Number.isFinite(zNum) && zNum >= 0 &&
    humans !== "" && Number.isFinite(hNum) && hNum > 0 &&
    infectionRate !== "" && Number.isFinite(betaNum) && betaNum >= 0 && betaNum <= 1 &&
    cureRate !== "" && Number.isFinite(gammaNum) && gammaNum >= 0 && gammaNum <= 1 &&
    deathRate !== "" && Number.isFinite(muNum) && muNum >= 0 && muNum <= 1 &&
    days !== "" && Number.isFinite(daysNum) && daysNum > 0 &&
    resourceRate !== "" && Number.isFinite(resNum) && resNum >= 0 &&
    geoFactor !== "" && Number.isFinite(geoNum) && geoNum > 0;

  const result = React.useMemo<SimResult | null>(() => {
    if (!valid) return null;
    return simulate(zNum, hNum, betaNum, gammaNum, muNum, daysNum, resNum, geoNum);
  }, [valid, zNum, hNum, betaNum, gammaNum, muNum, daysNum, resNum, geoNum]);

  function loadScenario(z: string, h: string, inf: string, cur: string, death: string, d: string, res: string, geo: string) {
    setZombies(z); setHumans(h); setInfectionRate(inf); setCureRate(cur);
    setDeathRate(death); setDays(d); setResourceRate(res); setGeoFactor(geo);
    setTouched(true);
  }

  function reset() {
    setZombies(""); setHumans(""); setInfectionRate(""); setCureRate("");
    setDeathRate(""); setDays(""); setResourceRate(""); setGeoFactor("");
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
              <Label htmlFor="zic-zombies">{t("field.initialZombies")}</Label>
              <Input id="zic-zombies" type="number" inputMode="numeric" min="0" step="1" value={zombies}
                placeholder={t("placeholder.initialZombies")}
                onChange={(e) => { setZombies(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zic-humans">{t("field.initialHumans")}</Label>
              <Input id="zic-humans" type="number" inputMode="numeric" min="1" step="1" value={humans}
                placeholder={t("placeholder.initialHumans")}
                onChange={(e) => { setHumans(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zic-infection">{t("field.infectionRate")}</Label>
              <Input id="zic-infection" type="number" inputMode="decimal" min="0" max="1" step="0.01" value={infectionRate}
                placeholder={t("placeholder.rate")}
                onChange={(e) => { setInfectionRate(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zic-cure">{t("field.cureRate")}</Label>
              <Input id="zic-cure" type="number" inputMode="decimal" min="0" max="1" step="0.01" value={cureRate}
                placeholder={t("placeholder.rate")}
                onChange={(e) => { setCureRate(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zic-death">{t("field.humanDeathRate")}</Label>
              <Input id="zic-death" type="number" inputMode="decimal" min="0" max="1" step="0.01" value={deathRate}
                placeholder={t("placeholder.rate")}
                onChange={(e) => { setDeathRate(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zic-days">{t("field.timePeriod")}</Label>
              <Input id="zic-days" type="number" inputMode="numeric" min="1" max="365" step="1" value={days}
                placeholder={t("placeholder.days")}
                onChange={(e) => { setDays(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zic-resource">{t("field.resourceRate")}</Label>
              <Input id="zic-resource" type="number" inputMode="decimal" min="0" step="0.1" value={resourceRate}
                placeholder={t("placeholder.resourceRate")}
                onChange={(e) => { setResourceRate(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zic-geo">{t("field.geoFactor")}</Label>
              <Input id="zic-geo" type="number" inputMode="decimal" min="0.1" step="0.1" value={geoFactor}
                placeholder={t("placeholder.geoFactor")}
                onChange={(e) => { setGeoFactor(e.target.value); setTouched(true); }} />
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
              onClick={() => loadScenario("5","100000","0.1","0.05","0.01","30","2.5","0.3")}>
              {t("button.slowOutbreak")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadScenario("20","50000","0.8","0.02","0.15","14","3.0","1.5")}>
              {t("button.fastOutbreak")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadScenario("15","250000","0.4","0.03","0.08","21","2.0","1.2")}>
              {t("button.urbanScenario")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.outcome")}: </span>
                  <span className="font-bold text-zinc-900">{t(`result.outcomeLabel.${result.outcomeKey}` as never)}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.survivalProbability")}: </span>
                  <span className="font-bold text-zinc-900">{result.survivalProbability}%</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.finalHumans")}: </span>
                  <span className="font-semibold text-zinc-800">{result.finalHumans.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.finalZombies")}: </span>
                  <span className="font-semibold text-zinc-800">{result.finalZombies.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.peakZombies")}: </span>
                  <span className="font-semibold text-zinc-800">{result.peakZombies.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.outbreakSpeed")}: </span>
                  <span className="font-semibold text-zinc-800">{t(`result.speedLabel.${result.speedKey}` as never)}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.resourcesNeeded")}: </span>
                  <span className="font-semibold text-zinc-800">{result.totalResources.toLocaleString()} {t("result.resourcesUnit")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.safeZoneRadius")}: </span>
                  <span className="font-semibold text-zinc-800">{result.safeZoneRadius} {t("result.safeZoneUnit")}</span>
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
