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

function teichholzVolume(d: number): number {
  return (7 * d * d * d) / (2.4 + d);
}

interface LVResult {
  edv: number;
  esv: number;
  sv: number;
  lvef: number;
  co: number;
  lvMass: number;
  lvMassIndex: number;
  lvefCategory: string;
}

function computeLV(
  lvedd: number,
  lvesd: number,
  wallThickness: number,
  heartRate: number,
  bsa: number
): LVResult {
  const edv = teichholzVolume(lvedd);
  const esv = teichholzVolume(lvesd);
  const sv = edv - esv;
  const lvef = (sv / edv) * 100;
  const co = (sv * heartRate) / 1000;
  const lvMass =
    0.8 * (1.04 * (Math.pow(lvedd + wallThickness * 2, 3) - Math.pow(lvedd, 3))) + 0.6;
  const lvMassIndex = lvMass / bsa;

  let lvefCategory: string;
  if (lvef >= 55) lvefCategory = "normal";
  else if (lvef >= 45) lvefCategory = "mildlyReduced";
  else if (lvef >= 30) lvefCategory = "moderatelyReduced";
  else lvefCategory = "severelyReduced";

  return { edv, esv, sv, lvef, co, lvMass, lvMassIndex, lvefCategory };
}

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function LvCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.lv-calculator");

  const [lvedd, setLvedd] = React.useState("");
  const [lvesd, setLvesd] = React.useState("");
  const [wallThickness, setWallThickness] = React.useState("");
  const [heartRate, setHeartRate] = React.useState("");
  const [bsa, setBsa] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const lveddN = parseFloat(lvedd);
  const lvesdN = parseFloat(lvesd);
  const wallN = parseFloat(wallThickness);
  const hrN = parseFloat(heartRate);
  const bsaN = parseFloat(bsa);

  const isValid =
    Number.isFinite(lveddN) && lveddN > 0 &&
    Number.isFinite(lvesdN) && lvesdN > 0 && lvesdN < lveddN &&
    Number.isFinite(wallN) && wallN > 0 &&
    Number.isFinite(hrN) && hrN > 0 &&
    Number.isFinite(bsaN) && bsaN > 0;

  const result = React.useMemo<LVResult | null>(() => {
    if (!isValid) return null;
    return computeLV(lveddN, lvesdN, wallN, hrN, bsaN);
  }, [isValid, lveddN, lvesdN, wallN, hrN, bsaN]);

  function reset() {
    setLvedd(""); setLvesd(""); setWallThickness("");
    setHeartRate(""); setBsa(""); setTouched(false);
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
        applicationCategory: "HealthApplication",
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

  const showError = touched && !isValid;

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
              <Label htmlFor="lv-lvedd">{t("field.lvedd")} ({t("field.lvedUnit")})</Label>
              <Input id="lv-lvedd" type="number" inputMode="decimal" value={lvedd}
                placeholder={t("placeholder.lvedd")}
                onChange={(e) => { setLvedd(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lv-lvesd">{t("field.lvesd")} ({t("field.lvedUnit")})</Label>
              <Input id="lv-lvesd" type="number" inputMode="decimal" value={lvesd}
                placeholder={t("placeholder.lvesd")}
                onChange={(e) => { setLvesd(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lv-wall">{t("field.wallThickness")} ({t("field.lvedUnit")})</Label>
              <Input id="lv-wall" type="number" inputMode="decimal" value={wallThickness}
                placeholder={t("placeholder.wallThickness")}
                onChange={(e) => { setWallThickness(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lv-hr">{t("field.heartRate")} ({t("field.hrUnit")})</Label>
              <Input id="lv-hr" type="number" inputMode="numeric" value={heartRate}
                placeholder={t("placeholder.heartRate")}
                onChange={(e) => { setHeartRate(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lv-bsa">{t("field.bsa")} ({t("field.bsaUnit")})</Label>
              <Input id="lv-bsa" type="number" inputMode="decimal" value={bsa}
                placeholder={t("placeholder.bsa")}
                onChange={(e) => { setBsa(e.target.value); setTouched(true); }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-900">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.lvef")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.lvef)}{t("result.percentUnit")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.strokeVolume")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.sv)} {t("result.mlUnit")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.cardiacOutput")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.co, 2)} {t("result.lminUnit")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.edv")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.edv)} {t("result.mlUnit")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.esv")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.esv)} {t("result.mlUnit")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.lvMass")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.lvMass)} {t("result.gUnit")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.lvMassIndex")}: </span>
                  <span className="font-medium text-zinc-900">{fmt(result.lvMassIndex)} {t("result.gm2Unit")}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
