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

type TrigFunction = "sin" | "cos" | "tan";
type Operation = "sum" | "difference";
type AngleUnit = "degrees" | "radians";

function toRadians(angle: number, unit: AngleUnit): number {
  return unit === "degrees" ? (angle * Math.PI) / 180 : angle;
}

function isTanUndefined(fn: TrigFunction, op: Operation, a: number, b: number, unit: AngleUnit): boolean {
  if (fn !== "tan") return false;
  const ar = toRadians(a, unit);
  const br = toRadians(b, unit);
  // tan is undefined when cos is ~0 (odd multiples of π/2)
  if (Math.abs(Math.cos(ar)) < 1e-10 || Math.abs(Math.cos(br)) < 1e-10) return true;
  const ta = Math.tan(ar);
  const tb = Math.tan(br);
  const denom = op === "sum" ? 1 - ta * tb : 1 + ta * tb;
  return Math.abs(denom) < 1e-10;
}

function computeResult(fn: TrigFunction, op: Operation, a: number, b: number, unit: AngleUnit): number {
  const ar = toRadians(a, unit);
  const br = toRadians(b, unit);
  const sa = Math.sin(ar), ca = Math.cos(ar), ta = Math.tan(ar);
  const sb = Math.sin(br), cb = Math.cos(br), tb = Math.tan(br);

  if (fn === "sin") return op === "sum" ? sa * cb + ca * sb : sa * cb - ca * sb;
  if (fn === "cos") return op === "sum" ? ca * cb - sa * sb : ca * cb + sa * sb;
  // tan
  const denom = op === "sum" ? 1 - ta * tb : 1 + ta * tb;
  return op === "sum" ? (ta + tb) / denom : (ta - tb) / denom;
}

function formatResult(n: number): string {
  if (!Number.isFinite(n)) return "undefined";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function SumAndDifferenceIdentitiesCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sum-and-difference-identities-calculator");

  const [fn, setFn] = React.useState<TrigFunction>("sin");
  const [op, setOp] = React.useState<Operation>("sum");
  const [unit, setUnit] = React.useState<AngleUnit>("degrees");
  const [angleA, setAngleA] = React.useState("");
  const [angleB, setAngleB] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(angleA);
  const bNum = parseFloat(angleB);
  const aValid = angleA !== "" && Number.isFinite(aNum);
  const bValid = angleB !== "" && Number.isFinite(bNum);
  const allValid = aValid && bValid;

  const resultValue = React.useMemo<number | null>(() => {
    if (!allValid) return null;
    if (isTanUndefined(fn, op, aNum, bNum, unit)) return null;
    return computeResult(fn, op, aNum, bNum, unit);
  }, [allValid, fn, op, aNum, bNum, unit]);

  const tanUndefined = allValid && isTanUndefined(fn, op, aNum, bNum, unit);

  function reset() {
    setAngleA(""); setAngleB(""); setTouched(false);
    setFn("sin"); setOp("sum"); setUnit("degrees");
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  const showError = touched && !allValid;

  const opSymbol = op === "sum" ? "+" : "−";
  const formulaString = `${fn}(${angleA || "A"} ${opSymbol} ${angleB || "B"})`;

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
              <Label>{t("field.function")}</Label>
              <div className="flex gap-2">
                {(["sin", "cos", "tan"] as TrigFunction[]).map((f) => (
                  <Button
                    key={f}
                    type="button"
                    variant={fn === f ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setFn(f); setTouched(false); }}
                  >
                    {t(`type.${f}` as never)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("field.operation")}</Label>
              <div className="flex gap-2">
                {(["sum", "difference"] as Operation[]).map((o) => (
                  <Button
                    key={o}
                    type="button"
                    variant={op === o ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setOp(o); setTouched(false); }}
                  >
                    {t(`type.${o}` as never)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sadx-a">{t("field.angleA")}</Label>
              <Input
                id="sadx-a"
                type="number"
                inputMode="decimal"
                value={angleA}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setAngleA(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sadx-b">{t("field.angleB")}</Label>
              <Input
                id="sadx-b"
                type="number"
                inputMode="decimal"
                value={angleB}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setAngleB(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("field.unit")}</Label>
              <div className="flex gap-2">
                {(["degrees", "radians"] as AngleUnit[]).map((u) => (
                  <Button
                    key={u}
                    type="button"
                    variant={unit === u ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setUnit(u); setTouched(false); }}
                  >
                    {t(`type.${u}` as never)}
                  </Button>
                ))}
              </div>
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
          {tanUndefined && (
            <p className="text-sm text-red-600">{t("error.tanUndefined")}</p>
          )}

          {resultValue !== null && !tanUndefined && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {formulaString} = {formatResult(resultValue)}
              </div>
              <div className="text-sm text-zinc-500">
                {t("result.valueLabel")}: {formatResult(resultValue)}
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
