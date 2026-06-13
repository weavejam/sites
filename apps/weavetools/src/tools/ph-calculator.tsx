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

type Mode = "strongAcid" | "weakAcid" | "strongBase" | "weakBase" | "buffer";

const MODES: Mode[] = [
  "strongAcid",
  "weakAcid",
  "strongBase",
  "weakBase",
  "buffer",
];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface PhResult {
  pH: number;
  pOH: number;
  h: number;
  oh: number;
}

function num(s: string): number {
  return s === "" ? NaN : parseFloat(s);
}

function buildResult(pH: number): PhResult {
  const pOH = 14 - pH;
  return { pH, pOH, h: Math.pow(10, -pH), oh: Math.pow(10, -pOH) };
}

function computePh(
  mode: Mode,
  conc: number,
  pKa: number,
  pKb: number,
  haConc: number,
  aConc: number,
): PhResult | null {
  switch (mode) {
    case "strongAcid":
      if (!(conc > 0)) return null;
      return buildResult(-Math.log10(conc));
    case "strongBase": {
      if (!(conc > 0)) return null;
      const pOH = -Math.log10(conc);
      return buildResult(14 - pOH);
    }
    case "weakAcid": {
      if (!(conc > 0) || !Number.isFinite(pKa)) return null;
      const ka = Math.pow(10, -pKa);
      const h = Math.sqrt(ka * conc);
      return buildResult(-Math.log10(h));
    }
    case "weakBase": {
      if (!(conc > 0) || !Number.isFinite(pKb)) return null;
      const kb = Math.pow(10, -pKb);
      const oh = Math.sqrt(kb * conc);
      const pOH = -Math.log10(oh);
      return buildResult(14 - pOH);
    }
    case "buffer": {
      if (!Number.isFinite(pKa) || !(haConc > 0) || !(aConc > 0)) return null;
      return buildResult(pKa + Math.log10(aConc / haConc));
    }
  }
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(2);
}

function fmtSci(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toExponential(3);
}

export default function PhCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ph-calculator");
  const [mode, setMode] = React.useState<Mode>("strongAcid");
  const [conc, setConc] = React.useState("");
  const [pKa, setPKa] = React.useState("");
  const [pKb, setPKb] = React.useState("");
  const [haConc, setHaConc] = React.useState("");
  const [aConc, setAConc] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<PhResult | null>(() => {
    return computePh(
      mode,
      num(conc),
      num(pKa),
      num(pKb),
      num(haConc),
      num(aConc),
    );
  }, [mode, conc, pKa, pKb, haConc, aConc]);

  function reset() {
    setConc("");
    setPKa("");
    setPKb("");
    setHaConc("");
    setAConc("");
    setTouched(false);
  }

  function loadExample(m: Mode, values: Partial<Record<string, string>>) {
    setMode(m);
    setConc(values.conc ?? "");
    setPKa(values.pKa ?? "");
    setPKb(values.pKb ?? "");
    setHaConc(values.haConc ?? "");
    setAConc(values.aConc ?? "");
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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

  const showConc = mode !== "buffer";
  const showPKa = mode === "weakAcid" || mode === "buffer";
  const showPKb = mode === "weakBase";
  const showBuffer = mode === "buffer";
  const showError = touched && result === null;

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
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => {
                    setMode(m);
                    setTouched(false);
                  }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {showConc && (
              <div className="space-y-2">
                <Label htmlFor="ph-conc">{t("field.concentration")}</Label>
                <Input
                  id="ph-conc"
                  type="number"
                  inputMode="decimal"
                  value={conc}
                  placeholder={t("placeholder.concentration")}
                  onChange={(e) => {
                    setConc(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            {showPKa && (
              <div className="space-y-2">
                <Label htmlFor="ph-pka">{t("field.pKa")}</Label>
                <Input
                  id="ph-pka"
                  type="number"
                  inputMode="decimal"
                  value={pKa}
                  placeholder={t("placeholder.pKa")}
                  onChange={(e) => {
                    setPKa(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            {showPKb && (
              <div className="space-y-2">
                <Label htmlFor="ph-pkb">{t("field.pKb")}</Label>
                <Input
                  id="ph-pkb"
                  type="number"
                  inputMode="decimal"
                  value={pKb}
                  placeholder={t("placeholder.pKb")}
                  onChange={(e) => {
                    setPKb(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            {showBuffer && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="ph-ha">{t("field.haConc")}</Label>
                  <Input
                    id="ph-ha"
                    type="number"
                    inputMode="decimal"
                    value={haConc}
                    placeholder={t("placeholder.haConc")}
                    onChange={(e) => {
                      setHaConc(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ph-a">{t("field.aConc")}</Label>
                  <Input
                    id="ph-a"
                    type="number"
                    inputMode="decimal"
                    value={aConc}
                    placeholder={t("placeholder.aConc")}
                    onChange={(e) => {
                      setAConc(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              </>
            )}
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
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.pH")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmt(result.pH)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.pOH")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {fmt(result.pOH)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.h")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtSci(result.h)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.oh")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {fmtSci(result.oh)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
            onClick={() => loadExample("strongAcid", { conc: "0.01" })}
          >
            {t("examples.loadStrongAcid")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("weakAcid", { conc: "0.1", pKa: "4.75" })
            }
          >
            {t("examples.loadWeakAcid")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("buffer", {
                pKa: "4.76",
                haConc: "0.1",
                aConc: "0.1",
              })
            }
          >
            {t("examples.loadBuffer")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
