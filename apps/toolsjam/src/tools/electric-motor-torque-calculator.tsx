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

type Mode = "findTorque" | "findPower" | "findSpeed";
type PowerUnit = "kW" | "HP";
type TorqueUnit = "Nm" | "ftLb";

const MODES: Mode[] = ["findTorque", "findPower", "findSpeed"];
const POWER_UNITS: PowerUnit[] = ["kW", "HP"];
const TORQUE_UNITS: TorqueUnit[] = ["Nm", "ftLb"];
const HP_PER_KW = 1.34102209;
const FTLB_PER_NM = 0.737562149;

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface CalculationResult {
  power: number;
  speed: number;
  torque: number;
  equivalentPower: number;
  equivalentTorque: number;
  formula: string;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1e9 || abs < 1e-4)) {
    return value.toExponential(6);
  }
  const rounded = Math.round(value * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function toFormulaTorque(value: number, powerUnit: PowerUnit, torqueUnit: TorqueUnit): number {
  if (powerUnit === "kW") {
    return torqueUnit === "Nm" ? value : value / FTLB_PER_NM;
  }
  return torqueUnit === "ftLb" ? value : value * FTLB_PER_NM;
}

function fromFormulaTorque(value: number, powerUnit: PowerUnit, torqueUnit: TorqueUnit): number {
  if (powerUnit === "kW") {
    return torqueUnit === "Nm" ? value : value * FTLB_PER_NM;
  }
  return torqueUnit === "ftLb" ? value : value / FTLB_PER_NM;
}

export default function ElectricMotorTorqueCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.electric-motor-torque-calculator");
  const [mode, setMode] = React.useState<Mode>("findTorque");
  const [powerUnit, setPowerUnit] = React.useState<PowerUnit>("kW");
  const [torqueUnit, setTorqueUnit] = React.useState<TorqueUnit>("Nm");
  const [power, setPower] = React.useState("");
  const [speed, setSpeed] = React.useState("");
  const [torque, setTorque] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const result = React.useMemo<CalculationResult | null>(() => {
    const powerValue = power === "" ? NaN : parseFloat(power);
    const speedValue = speed === "" ? NaN : parseFloat(speed);
    const torqueValue = torque === "" ? NaN : parseFloat(torque);
    const constant = powerUnit === "kW" ? 9549.3 : 5252;

    let solvedPower = powerValue;
    let solvedSpeed = speedValue;
    let solvedTorque = torqueValue;

    if (mode === "findTorque") {
      if (!Number.isFinite(powerValue) || powerValue <= 0 || !Number.isFinite(speedValue) || speedValue <= 0) {
        return null;
      }
      const torqueBase = (powerValue * constant) / speedValue;
      solvedTorque = fromFormulaTorque(torqueBase, powerUnit, torqueUnit);
    } else if (mode === "findPower") {
      if (!Number.isFinite(torqueValue) || torqueValue <= 0 || !Number.isFinite(speedValue) || speedValue <= 0) {
        return null;
      }
      const torqueBase = toFormulaTorque(torqueValue, powerUnit, torqueUnit);
      solvedPower = (torqueBase * speedValue) / constant;
    } else {
      if (!Number.isFinite(powerValue) || powerValue <= 0 || !Number.isFinite(torqueValue) || torqueValue <= 0) {
        return null;
      }
      const torqueBase = toFormulaTorque(torqueValue, powerUnit, torqueUnit);
      solvedSpeed = (powerValue * constant) / torqueBase;
    }

    if (![solvedPower, solvedSpeed, solvedTorque].every((value) => Number.isFinite(value) && value > 0)) {
      return null;
    }

    return {
      power: solvedPower,
      speed: solvedSpeed,
      torque: solvedTorque,
      equivalentPower: powerUnit === "kW" ? solvedPower * HP_PER_KW : solvedPower / HP_PER_KW,
      equivalentTorque: torqueUnit === "Nm" ? solvedTorque * FTLB_PER_NM : solvedTorque / FTLB_PER_NM,
      formula: t(powerUnit === "kW" ? "result.formulaMetric" : "result.formulaImperial"),
    };
  }, [mode, power, powerUnit, speed, t, torque, torqueUnit]);

  function reset() {
    setPower("");
    setSpeed("");
    setTorque("");
    setTouched(false);
  }

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
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
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
          <div className="space-y-2">
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant={mode === item ? "default" : "outline"}
                  onClick={() => {
                    setMode(item);
                    setTouched(false);
                  }}
                >
                  {t(`type.${item}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">{t(`type.${mode}_desc` as never)}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("field.powerUnit")}</Label>
              <div className="flex flex-wrap gap-2">
                {POWER_UNITS.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant={powerUnit === item ? "default" : "outline"}
                    onClick={() => setPowerUnit(item)}
                  >
                    {t(`button.${item}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.torqueUnit")}</Label>
              <div className="flex flex-wrap gap-2">
                {TORQUE_UNITS.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant={torqueUnit === item ? "default" : "outline"}
                    onClick={() => setTorqueUnit(item)}
                  >
                    {t(`button.${item}` as never)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mode !== "findPower" && (
              <div className="space-y-2">
                <Label htmlFor="motor-power">{t("field.powerInput", { unit: t(`button.${powerUnit}` as never) })}</Label>
                <Input
                  id="motor-power"
                  type="number"
                  inputMode="decimal"
                  value={power}
                  placeholder={t("placeholder.power")}
                  onChange={(event) => {
                    setPower(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {mode !== "findSpeed" && (
              <div className="space-y-2">
                <Label htmlFor="motor-speed">{t("field.speedInput", { unit: t("result.unitSpeed") })}</Label>
                <Input
                  id="motor-speed"
                  type="number"
                  inputMode="decimal"
                  value={speed}
                  placeholder={t("placeholder.speed")}
                  onChange={(event) => {
                    setSpeed(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {mode !== "findTorque" && (
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="motor-torque">{t("field.torqueInput", { unit: t(`button.${torqueUnit}` as never) })}</Label>
                <Input
                  id="motor-torque"
                  type="number"
                  inputMode="decimal"
                  value={torque}
                  placeholder={t("placeholder.torque")}
                  onChange={(event) => {
                    setTorque(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.power")}</p>
                  <p className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.power)} {t(`button.${powerUnit}` as never)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.speed")}</p>
                  <p className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.speed)} {t("result.unitSpeed")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.torque")}</p>
                  <p className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.torque)} {t(`button.${torqueUnit}` as never)}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.equivalentPower")}</p>
                  <p className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.equivalentPower)} {t(powerUnit === "kW" ? "button.HP" : "button.kW")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.equivalentTorque")}</p>
                  <p className="text-lg font-semibold text-zinc-900">
                    {formatNumber(result.equivalentTorque)} {t(torqueUnit === "Nm" ? "button.ftLb" : "button.Nm")}
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{result.formula}</p>
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{item.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
