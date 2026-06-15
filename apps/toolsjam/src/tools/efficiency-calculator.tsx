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

type SystemType =
  | ""
  | "electricMotor"
  | "heatEngine"
  | "mechanicalSystem"
  | "electricalSystem"
  | "hvacSystem"
  | "other";

const SYSTEM_TYPES: SystemType[] = [
  "electricMotor",
  "heatEngine",
  "mechanicalSystem",
  "electricalSystem",
  "hvacSystem",
  "other",
];

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
}

export default function EfficiencyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.efficiency-calculator");

  const [inputEnergy, setInputEnergy] = React.useState("");
  const [outputEnergy, setOutputEnergy] = React.useState("");
  const [inputPower, setInputPower] = React.useState("");
  const [outputPower, setOutputPower] = React.useState("");
  const [systemType, setSystemType] = React.useState<SystemType>("");
  const [operatingTime, setOperatingTime] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const eIn = parseFloat(inputEnergy);
  const eOut = parseFloat(outputEnergy);
  const pIn = parseFloat(inputPower);
  const pOut = parseFloat(outputPower);

  const hasEnergy = inputEnergy !== "" && outputEnergy !== "" && Number.isFinite(eIn) && Number.isFinite(eOut) && eIn > 0;
  const hasPower = inputPower !== "" && outputPower !== "" && Number.isFinite(pIn) && Number.isFinite(pOut) && pIn > 0;

  const energyEfficiency = hasEnergy ? (eOut / eIn) * 100 : null;
  const powerEfficiency = hasPower ? (pOut / pIn) * 100 : null;
  const energyLoss = hasEnergy ? eIn - eOut : null;
  const powerLoss = hasPower ? pIn - pOut : null;

  const showError = touched && !hasEnergy && !hasPower;

  function reset() {
    setInputEnergy("");
    setOutputEnergy("");
    setInputPower("");
    setOutputPower("");
    setSystemType("");
    setOperatingTime("");
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
              <Label htmlFor="eff-inputEnergy">{t("field.inputEnergy")}</Label>
              <Input
                id="eff-inputEnergy"
                type="number"
                inputMode="decimal"
                value={inputEnergy}
                placeholder={t("placeholder.inputEnergy")}
                onChange={(e) => { setInputEnergy(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eff-outputEnergy">{t("field.outputEnergy")}</Label>
              <Input
                id="eff-outputEnergy"
                type="number"
                inputMode="decimal"
                value={outputEnergy}
                placeholder={t("placeholder.outputEnergy")}
                onChange={(e) => { setOutputEnergy(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eff-inputPower">{t("field.inputPower")}</Label>
              <Input
                id="eff-inputPower"
                type="number"
                inputMode="decimal"
                value={inputPower}
                placeholder={t("placeholder.inputPower")}
                onChange={(e) => { setInputPower(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eff-outputPower">{t("field.outputPower")}</Label>
              <Input
                id="eff-outputPower"
                type="number"
                inputMode="decimal"
                value={outputPower}
                placeholder={t("placeholder.outputPower")}
                onChange={(e) => { setOutputPower(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eff-systemType">{t("field.systemType")}</Label>
              <select
                id="eff-systemType"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={systemType}
                onChange={(e) => setSystemType(e.target.value as SystemType)}
              >
                <option value="">{t("systemType.placeholder")}</option>
                {SYSTEM_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {t(`systemType.${s}` as never)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eff-operatingTime">{t("field.operatingTime")}</Label>
              <Input
                id="eff-operatingTime"
                type="number"
                inputMode="decimal"
                value={operatingTime}
                placeholder={t("placeholder.operatingTime")}
                onChange={(e) => { setOperatingTime(e.target.value); setTouched(false); }}
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

          {touched && (hasEnergy || hasPower) && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {energyEfficiency !== null && (
                  <>
                    <div>
                      <span className="text-xs text-zinc-500">{t("result.energyEfficiency")}: </span>
                      <span className="text-xl font-semibold">{fmt(energyEfficiency)}%</span>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500">{t("result.energyLoss")}: </span>
                      <span className="font-semibold">{fmt(energyLoss!)} J</span>
                    </div>
                  </>
                )}
                {powerEfficiency !== null && (
                  <>
                    <div>
                      <span className="text-xs text-zinc-500">{t("result.powerEfficiency")}: </span>
                      <span className="text-xl font-semibold">{fmt(powerEfficiency)}%</span>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500">{t("result.powerLoss")}: </span>
                      <span className="font-semibold">{fmt(powerLoss!)} W</span>
                    </div>
                  </>
                )}
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
