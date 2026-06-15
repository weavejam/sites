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

type CalcType = "calculateGain" | "calculateOutput" | "calculateInput";
type QuantityType = "power" | "voltage";

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 1e-6 && n !== 0) return n.toExponential(4);
  if (Math.abs(n) >= 1e9) return n.toExponential(4);
  return parseFloat(n.toFixed(decimals)).toString();
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

export default function DbGainCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.db-gain-calculator");

  const [calcType, setCalcType] = React.useState<CalcType>("calculateGain");
  const [quantityType, setQuantityType] = React.useState<QuantityType>("power");
  const [inputValue, setInputValue] = React.useState("");
  const [outputValue, setOutputValue] = React.useState("");
  const [gainDb, setGainDb] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const inNum = parseFloat(inputValue);
  const outNum = parseFloat(outputValue);
  const gainNum = parseFloat(gainDb);
  const factor = quantityType === "power" ? 10 : 20;

  const result = React.useMemo(() => {
    if (!touched) return null;
    if (calcType === "calculateGain") {
      if (!Number.isFinite(inNum) || inNum <= 0 || !Number.isFinite(outNum) || outNum <= 0) return null;
      return { type: "calculateGain" as const, value: factor * Math.log10(outNum / inNum) };
    } else if (calcType === "calculateOutput") {
      if (!Number.isFinite(inNum) || inNum <= 0 || !Number.isFinite(gainNum)) return null;
      return { type: "calculateOutput" as const, value: inNum * Math.pow(10, gainNum / factor) };
    } else {
      if (!Number.isFinite(outNum) || outNum <= 0 || !Number.isFinite(gainNum)) return null;
      return { type: "calculateInput" as const, value: outNum / Math.pow(10, gainNum / factor) };
    }
  }, [touched, calcType, quantityType, inNum, outNum, gainNum, factor]);

  const showError = touched && result === null;

  const examplesItems: ExampleRow[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleRow[] | undefined;
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

  function handleReset() {
    setInputValue(""); setOutputValue(""); setGainDb(""); setTouched(false);
  }

  const CALC_TYPES: CalcType[] = ["calculateGain", "calculateOutput", "calculateInput"];
  const inputDisabled = calcType === "calculateInput";
  const outputDisabled = calcType === "calculateOutput";
  const gainDisabled = calcType === "calculateGain";

  function buildResultText(): string {
    if (!result) return "";
    const v = formatNum(result.value, 4);
    const qt = quantityType === "power" ? "Power" : "Voltage";
    if (result.type === "calculateGain") {
      return t(`result.gain${qt}` as never, { result: v, output: formatNum(outNum), input: formatNum(inNum) });
    } else if (result.type === "calculateOutput") {
      return t(`result.output${qt}` as never, { result: v });
    } else {
      return t(`result.input${qt}` as never, { result: v });
    }
  }

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
          <div className="space-y-2">
            <Label>{t("field.calcType")}</Label>
            <div className="flex flex-wrap gap-2">
              {CALC_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={calcType === ct ? "default" : "outline"}
                  onClick={() => { setCalcType(ct); setTouched(false); }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">{t(`type.${calcType}_desc` as never)}</p>
          </div>

          <div className="space-y-2">
            <Label>{t("field.quantityType")}</Label>
            <div className="flex gap-2">
              {(["power", "voltage"] as QuantityType[]).map((qt) => (
                <Button
                  key={qt}
                  type="button"
                  variant={quantityType === qt ? "default" : "outline"}
                  onClick={() => { setQuantityType(qt); setTouched(false); }}
                >
                  {t(`quantity.${qt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="dbg-input">{t("field.inputValue")}</Label>
              <Input
                id="dbg-input"
                type="number"
                inputMode="decimal"
                value={inputValue}
                placeholder={inputDisabled ? "—" : t("placeholder.inputValue")}
                disabled={inputDisabled}
                step="any"
                onChange={(e) => { setInputValue(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbg-output">{t("field.outputValue")}</Label>
              <Input
                id="dbg-output"
                type="number"
                inputMode="decimal"
                value={outputValue}
                placeholder={outputDisabled ? "—" : t("placeholder.outputValue")}
                disabled={outputDisabled}
                step="any"
                onChange={(e) => { setOutputValue(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbg-gain">{t("field.gainDb")}</Label>
              <Input
                id="dbg-gain"
                type="number"
                inputMode="decimal"
                value={gainDb}
                placeholder={gainDisabled ? "—" : t("placeholder.gainDb")}
                disabled={gainDisabled}
                step="any"
                onChange={(e) => { setGainDb(e.target.value); setTouched(false); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-xl font-semibold text-zinc-900">{buildResultText()}</div>
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
