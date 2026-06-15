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

type AngleUnit = "degrees" | "radians";
type Quadrant = "auto" | "1" | "2" | "3" | "4";

const EPSILON = 1e-12;

function formatFixed(value: number): string {
  return value.toFixed(6);
}

function signOf(value: number): -1 | 0 | 1 {
  if (Math.abs(value) < EPSILON) return 0;
  return value > 0 ? 1 : -1;
}

function normalizeRadians(value: number): number {
  const tau = Math.PI * 2;
  const normalized = value % tau;
  return normalized < 0 ? normalized + tau : normalized;
}

export default function HalfAngleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.half-angle-calculator");
  const [angle, setAngle] = React.useState("");
  const [angleUnit, setAngleUnit] = React.useState<AngleUnit>("degrees");
  const [quadrant, setQuadrant] = React.useState<Quadrant>("auto");
  const [submitted, setSubmitted] = React.useState(false);

  const howtoSteps = t.raw("howto.steps") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const examplesItems = t.raw("examples.items") as {
    input: string;
    output: string;
    note?: string;
  }[];

  const result = React.useMemo(() => {
    if (!submitted) return null;
    const angleValue = Number(angle);
    if (!angle.trim() || !Number.isFinite(angleValue)) {
      return { error: "invalid" as const };
    }

    const thetaRad =
      angleUnit === "degrees" ? (angleValue * Math.PI) / 180 : angleValue;
    const halfRad = thetaRad / 2;
    const cosTheta = Math.cos(thetaRad);
    const sinMagnitude = Math.sqrt(Math.max(0, (1 - cosTheta) / 2));
    const cosMagnitude = Math.sqrt(Math.max(0, (1 + cosTheta) / 2));

    const signs =
      quadrant === "auto"
        ? {
            sin: signOf(Math.sin(normalizeRadians(halfRad))),
            cos: signOf(Math.cos(normalizeRadians(halfRad))),
          }
        : quadrant === "1"
          ? { sin: 1, cos: 1 }
          : quadrant === "2"
            ? { sin: 1, cos: -1 }
            : quadrant === "3"
              ? { sin: -1, cos: -1 }
              : { sin: -1, cos: 1 };

    const sinHalf = signs.sin === 0 ? 0 : sinMagnitude * signs.sin;
    const cosHalf = signs.cos === 0 ? 0 : cosMagnitude * signs.cos;
    const tanHalf =
      Math.abs(cosHalf) < EPSILON ? null : sinHalf / cosHalf;

    return {
      halfAngle:
        angleUnit === "degrees" ? (halfRad * 180) / Math.PI : halfRad,
      sinHalf,
      cosHalf,
      tanHalf,
    };
  }, [angle, angleUnit, quadrant, submitted]);

  function reset() {
    setAngle("");
    setAngleUnit("degrees");
    setQuadrant("auto");
    setSubmitted(false);
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
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="half-angle-input">{t("field.angle")}</Label>
              <Input
                id="half-angle-input"
                type="number"
                inputMode="decimal"
                value={angle}
                onChange={(event) => {
                  setAngle(event.target.value);
                  setSubmitted(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="angleUnit">{t("field.angleUnit")}</Label>
              <select
                id="angleUnit"
                value={angleUnit}
                onChange={(e) => {
                  setAngleUnit(e.target.value as AngleUnit);
                  setSubmitted(false);
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px]"
              >
                <option value="degrees">{t("type.angleUnit.degrees")}</option>
                <option value="radians">{t("type.angleUnit.radians")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quadrant">{t("field.quadrant")}</Label>
              <select
                id="quadrant"
                value={quadrant}
                onChange={(e) => {
                  setQuadrant(e.target.value as Quadrant);
                  setSubmitted(false);
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px]"
              >
                <option value="auto">{t("type.quadrant.auto")}</option>
                <option value="1">{t("type.quadrant.q1")}</option>
                <option value="2">{t("type.quadrant.q2")}</option>
                <option value="3">{t("type.quadrant.q3")}</option>
                <option value="4">{t("type.quadrant.q4")}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setSubmitted(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result && "error" in result && (
            <p className="text-sm text-red-600">{t(`error.${result.error}` as never)}</p>
          )}

          {result && !("error" in result) && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-zinc-800">
                {t("result.angle", {
                  value: formatFixed(result.halfAngle),
                  unit: t(`type.angleUnit.${angleUnit}` as never),
                })}
              </div>
              <div className="font-semibold text-zinc-900">
                {t("result.sin", { value: formatFixed(result.sinHalf) })}
              </div>
              <div className="font-semibold text-zinc-900">
                {t("result.cos", { value: formatFixed(result.cosHalf) })}
              </div>
              <div className="font-semibold text-zinc-900">
                {result.tanHalf === null
                  ? t("result.tanUndefined")
                  : t("result.tan", { value: formatFixed(result.tanHalf) })}
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{example.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
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
