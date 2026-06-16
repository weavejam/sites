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

type FunctionType = "sin" | "cos" | "tan" | "cot" | "sec" | "csc";
type AngleUnit = "degrees" | "radians";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

const FUNCTION_TYPES: FunctionType[] = ["sin", "cos", "tan", "cot", "sec", "csc"];
const ANGLE_UNITS: AngleUnit[] = ["degrees", "radians"];
const COFUNCTIONS: Record<FunctionType, FunctionType> = {
  sin: "cos",
  cos: "sin",
  tan: "cot",
  cot: "tan",
  sec: "csc",
  csc: "sec",
};
const EPSILON = 1e-10;

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function evaluateFunction(type: FunctionType, angleRad: number): number {
  switch (type) {
    case "sin":
      return Math.sin(angleRad);
    case "cos":
      return Math.cos(angleRad);
    case "tan":
      return Math.tan(angleRad);
    case "cot":
      return 1 / Math.tan(angleRad);
    case "sec":
      return 1 / Math.cos(angleRad);
    case "csc":
      return 1 / Math.sin(angleRad);
  }
}

function hasDomainError(type: FunctionType, angleRad: number): boolean {
  if (type === "tan" || type === "sec") {
    return Math.abs(Math.cos(angleRad)) < EPSILON;
  }
  if (type === "cot" || type === "csc") {
    return Math.abs(Math.sin(angleRad)) < EPSILON;
  }
  return false;
}

export default function CofunctionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.cofunction-calculator");
  const [functionType, setFunctionType] = React.useState<FunctionType>("sin");
  const [angleUnit, setAngleUnit] = React.useState<AngleUnit>("degrees");
  const [angle, setAngle] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const angleNum = parseFloat(angle);
  const angleValid = angle !== "" && Number.isFinite(angleNum);

  const result = React.useMemo(() => {
    if (!angleValid) return null;

    const angleRad =
      angleUnit === "degrees" ? (angleNum * Math.PI) / 180 : angleNum;
    const complementaryAngleRad = Math.PI / 2 - angleRad;
    const cofunctionType = COFUNCTIONS[functionType];

    if (
      hasDomainError(functionType, angleRad) ||
      hasDomainError(cofunctionType, complementaryAngleRad)
    ) {
      return { error: "domain" as const };
    }

    return {
      originalValue: evaluateFunction(functionType, angleRad),
      cofunctionType,
      cofunctionValue: evaluateFunction(cofunctionType, complementaryAngleRad),
      complementaryAngle:
        angleUnit === "degrees" ? 90 - angleNum : Math.PI / 2 - angleNum,
    };
  }, [angleNum, angleUnit, angleValid, functionType]);

  function formatAngle(value: number, unit: AngleUnit): string {
    const unitText = t(`unitShort.${unit}` as never);
    return unit === "degrees"
      ? `${formatNumber(value)}${unitText}`
      : `${formatNumber(value)} ${unitText}`;
  }

  function loadExample(type: FunctionType, value: string, unit: AngleUnit) {
    setFunctionType(type);
    setAngle(value);
    setAngleUnit(unit);
    setTouched(true);
  }

  function reset() {
    setFunctionType("sin");
    setAngleUnit("degrees");
    setAngle("");
    setTouched(false);
  }

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

  const showInvalidError = touched && !angleValid;
  const showDomainError = touched && result !== null && "error" in result;

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="cofunction-type">{t("field.functionType")}</Label>
              <select
                id="cofunction-type"
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                value={functionType}
                onChange={(e) => {
                  setFunctionType(e.target.value as FunctionType);
                  setTouched(angle !== "");
                }}
              >
                {FUNCTION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {t(`type.${type}` as never)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cofunction-unit">{t("field.angleUnit")}</Label>
              <select
                id="cofunction-unit"
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                value={angleUnit}
                onChange={(e) => {
                  setAngleUnit(e.target.value as AngleUnit);
                  setTouched(angle !== "");
                }}
              >
                {ANGLE_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {t(`type.${unit}` as never)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cofunction-angle">{t("field.angle")}</Label>
              <Input
                id="cofunction-angle"
                type="number"
                inputMode="decimal"
                value={angle}
                placeholder={t("field.anglePlaceholder")}
                onChange={(e) => {
                  setAngle(e.target.value);
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

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalidAngle")}</p>
          )}
          {showDomainError && (
            <p className="text-sm text-red-600">{t("error.domainError")}</p>
          )}

          {result !== null && !("error" in result) && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.originalValue")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.originalValue)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.cofunctionValue")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNumber(result.cofunctionValue)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.complementaryAngle")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {formatAngle(result.complementaryAngle, angleUnit)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.cofunctionIdentity")}
                  </div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {`${t(`type.${functionType}` as never)}(${formatAngle(
                      angleNum,
                      angleUnit
                    )}) = ${t(`type.${result.cofunctionType}` as never)}(${formatAngle(
                      result.complementaryAngle,
                      angleUnit
                    )})`}
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
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
            onClick={() => loadExample("sin", "30", "degrees")}
          >
            {t("examples.loadSin30")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("tan", "45", "degrees")}
          >
            {t("examples.loadTan45")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("sec", "60", "degrees")}
          >
            {t("examples.loadSec60")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("cos", "1.047", "radians")}
          >
            {t("examples.loadCosRad")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
