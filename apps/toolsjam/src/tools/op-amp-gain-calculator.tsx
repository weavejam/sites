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

type AmpType = "inverting" | "noninverting";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

export default function OpAmpGainCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.op-amp-gain-calculator");

  const [ampType, setAmpType] = React.useState<AmpType>("inverting");
  const [rf, setRf] = React.useState("");
  const [rin, setRin] = React.useState("");
  const [vin, setVin] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const rfNum = parseFloat(rf);
  const rinNum = parseFloat(rin);
  const vinNum = parseFloat(vin);

  const rfValid = rf !== "" && Number.isFinite(rfNum) && rfNum > 0;
  const rinValid = rin !== "" && Number.isFinite(rinNum) && rinNum > 0;
  const vinProvided = vin !== "" && Number.isFinite(vinNum);

  const result = React.useMemo(() => {
    if (!rfValid || !rinValid) return null;
    const gain =
      ampType === "inverting"
        ? -(rfNum / rinNum)
        : 1 + rfNum / rinNum;
    const dbGain = 20 * Math.log10(Math.abs(gain));
    const vout = vinProvided ? gain * vinNum : null;
    return { gain, dbGain, vout };
  }, [ampType, rfNum, rinNum, rfValid, rinValid, vinNum, vinProvided]);

  function reset() {
    setRf("");
    setRin("");
    setVin("");
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

  const showError = touched && (!rfValid || !rinValid);

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
            <Label>{t("field.amplifierType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["inverting", "noninverting"] as AmpType[]).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={ampType === type ? "default" : "outline"}
                  onClick={() => {
                    setAmpType(type);
                    setTouched(false);
                  }}
                >
                  {t(`type.${type}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="opamp-rf">
                {t("field.rf")} ({t("field.rfUnit")})
              </Label>
              <Input
                id="opamp-rf"
                type="number"
                inputMode="decimal"
                value={rf}
                placeholder={t("field.placeholder.rf")}
                onChange={(e) => {
                  setRf(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opamp-rin">
                {t("field.rin")} ({t("field.rfUnit")})
              </Label>
              <Input
                id="opamp-rin"
                type="number"
                inputMode="decimal"
                value={rin}
                placeholder={t("field.placeholder.rin")}
                onChange={(e) => {
                  setRin(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opamp-vin">{t("field.vin")}</Label>
              <Input
                id="opamp-vin"
                type="number"
                inputMode="decimal"
                value={vin}
                placeholder={t("field.placeholder.vin")}
                onChange={(e) => {
                  setVin(e.target.value);
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.voltageGain")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.gain, 4)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dbGain")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(result.dbGain, 2)} {t("result.dbUnit")}
                  </div>
                </div>
                {result.vout !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.outputVoltage")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNum(result.vout, 4)} {t("result.voltUnit")}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.formula")}:{" "}
                {ampType === "inverting"
                  ? t("result.invertingFormula")
                  : t("result.noninvertingFormula")}
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
